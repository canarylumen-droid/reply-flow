import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import PostModel from './models/Post.js'
import { JSDOM } from 'jsdom'
import createDOMPurify from 'dompurify'
import { connectDB, syncAll, watchPosts } from './syncPosts.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

// Enable CORS for development and production
app.use((req: Request, res: Response, next: any) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    const state = mongoose.connection.readyState
    const status = state === 1 ? 'ok' : 'unavailable'
    const uptime = process.uptime()
    res.json({ status, readyState: state, uptime, mongoUri: process.env.MONGO_URI ? 'configured' : 'missing' })
  } catch (err) {
    res.status(500).json({ status: 'error', message: (err as Error).message })
  }
})

app.get('/api/post/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug
    const post: any = await PostModel.findOne({ slug }).lean()
    if (!post) return res.status(404).json({ error: 'not_found' })
    res.json({
      title: post.title,
      slug: post.slug,
      content: post.content,
      description: post.description,
      keywords: post.keywords,
      ogImage: post.ogImage,
      canonicalUrl: post.canonicalUrl,
      publishedAt: post.publishedAt
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

// List posts with pagination (server-side) - returns minimal fields for index pages
app.get('/api/posts', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page || '1'), 10))
    const perPage = Math.min(50, parseInt(String(req.query.perPage || '10'), 10))
    const skip = (page - 1) * perPage
    const [items, total] = await Promise.all([
      PostModel.find().sort({ publishedAt: -1 }).skip(skip).limit(perPage).lean(),
      PostModel.countDocuments()
    ])
    const mapped = items.map(p => ({
      title: p.title,
      slug: p.slug,
      description: p.description,
      publishedAt: p.publishedAt,
      ogImage: p.ogImage,
      canonicalUrl: p.canonicalUrl,
      excerpt: stripHtml(p.content).slice(0, 220)
    }))
    res.json({ items: mapped, total, page, perPage })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

// RSS feed
app.get('/rss.xml', async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().sort({ publishedAt: -1 }).limit(50).lean()
    const site = process.env.SITE_HOST || 'http://localhost:4000'
    const items = posts.map(p => `
      <item>
        <title>${escapeHtml(p.title)}</title>
        <link>${escapeHtml(p.canonicalUrl || `${site}/blog/${p.slug}`)}</link>
        <guid>${escapeHtml(p.canonicalUrl || `${site}/blog/${p.slug}`)}</guid>
        <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
        <description>${escapeHtml(p.description || stripHtml(p.content).slice(0,200))}</description>
      </item>
    `).join('\n')
    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>Blog</title>
          <link>${site}</link>
          <description>Latest posts</description>
          ${items}
        </channel>
      </rss>`
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.send(feed)
  } catch (err) {
    console.error(err)
    res.status(500).send('server error')
  }
})

// Sitemap
app.get('/sitemap.xml', async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().sort({ publishedAt: -1 }).lean()
    const site = process.env.SITE_HOST || 'http://localhost:4000'
    const urls = posts.map(p => `
      <url>
        <loc>${escapeHtml(p.canonicalUrl || `${site}/blog/${p.slug}`)}</loc>
        <lastmod>${new Date(p.publishedAt).toISOString()}</lastmod>
      </url>
    `).join('\n')
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>`
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.send(xml)
  } catch (err) {
    console.error(err)
    res.status(500).send('server error')
  }
})

// Server-rendered blog page with mobile-first responsive styles and good typography
app.get('/blog/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug
    const post: any = await PostModel.findOne({ slug }).lean()
    if (!post) return res.status(404).send('Not found')

    const window = new JSDOM('').window as any
    const DOMPurify = createDOMPurify(window)
    const safeHtml = DOMPurify.sanitize(post.content)

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description || '',
      "url": post.canonicalUrl || `${process.env.SITE_HOST || ''}/blog/${post.slug}`,
      "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
      "image": post.ogImage || ''
    }

    const head = `
      <title>${escapeHtml(post.title)}</title>
      <meta name="description" content="${escapeHtml(post.description || '')}" />
      <meta name="keywords" content="${(post.keywords || []).map(escapeHtml).join(',')}" />
      <link rel="canonical" href="${escapeHtml(post.canonicalUrl || `${process.env.SITE_HOST || ''}/blog/${post.slug}`)}" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      <!-- Open Graph -->
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Reply Flow" />
      <meta property="og:title" content="${escapeHtml(post.title)}" />
      <meta property="og:description" content="${escapeHtml(post.description || '')}" />
      <meta property="og:url" content="${escapeHtml(post.canonicalUrl || `${process.env.SITE_HOST || ''}/blog/${post.slug}`)}" />
      <meta property="og:image" content="${escapeHtml(post.ogImage || '')}" />
      <meta property="og:image:alt" content="Reply Flow logo" />

      <!-- Twitter -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Reply Flow logo" />
      <meta name="twitter:title" content="${escapeHtml(post.title)}" />
      <meta name="twitter:description" content="${escapeHtml(post.description || '')}" />
      <meta name="twitter:image" content="${escapeHtml(post.ogImage || '')}" />
      <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    `

    const styles = `
      :root{--max-w:760px;--accent:#0ea5e9}
      html,body{height:100%}
      body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial;line-height:1.65;color:#0f172a;margin:0;padding:18px;background:#fff;-webkit-font-smoothing:antialiased}
      .wrap{max-width:var(--max-w);margin:0 auto}
      header.site-header{display:flex;align-items:center;gap:12px;padding:12px 0 8px}
      header.site-header img{height:42px;width:auto;border-radius:6px}
      header.site-header a{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit}
      header.site-header h2{margin:0;font-size:1rem;letter-spacing:0.08em}
      article{padding:8px 0}
      h1{font-size:clamp(1.6rem,3.2vw,2.6rem);margin:0 0 8px;font-family:Playfair Display,serif}
      time{color:#64748b;font-size:0.9rem}
      .content{margin-top:18px;font-size:clamp(1rem,1.6vw,1.125rem);color:#0f172a;word-break:break-word}
      img{max-width:100%;height:auto;border-radius:8px}
      pre{background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;overflow:auto}
      code{background:#f1f5f9;padding:2px 6px;border-radius:6px}
      @media (prefers-color-scheme:dark){body{background:#000;color:#e6edf3}.content{color:#dbeafe}}
      @media (min-width:900px){body{padding:36px}.wrap{padding:0 20px}}
    `

    const html = `<!doctype html>
    <html lang="en">
      <head>
        ${head}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>${styles}</style>
      </head>
      <body>
        <div class="wrap">
          <header class="site-header">
            <a href="/">
              <img src="https://replyflow.pro/reply_flow_logo.png" alt="Reply Flow logo" />
              <h2>Reply Flow — Autonomous Sales Engine</h2>
            </a>
          </header>
          <article>
            <h1>${escapeHtml(post.title)}</h1>
            <div class="content">${safeHtml}</div>
          </article>
        </div>
      </body>
    </html>`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(html)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

async function main() {
  await connectDB()
  // ensure posts are synced from repo on startup
  try {
    await syncAll()
  } catch (err) {
    console.error('Initial sync failed:', (err as Error).message)
  }

  // Optionally watch for file changes during development
  if (process.env.DEV_WATCH === 'true' || process.env.NODE_ENV === 'development') {
    try { watchPosts() } catch (e) { console.error('watchPosts failed', (e as Error).message) }
  }

  app.listen(PORT, () => console.log(`Blog server running on http://localhost:${PORT}`))
}

function escapeHtml(s: any) {
  if (!s) return ''
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function stripHtml(html: string) {
  if (!html) return ''
  return String(html).replace(/<[^>]*>/g, '')
}

main().catch(err => { console.error(err); process.exit(1) })
