import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import { Op } from 'sequelize'
import { Post } from './models/Post.js'
import { parseMarkdownFile } from './utils/markdown.js'
import { JSDOM } from 'jsdom'
import createDOMPurify from 'dompurify'
import { connectDB, syncAll, watchPosts } from './syncPosts.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const SITE = process.env.SITE_HOST || 'https://replyflow.pro'
let db: Sequelize | null = null

app.use(express.json())
app.use((req: Request, res: Response, next: any) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

function stripHtml(html: string) {
  if (!html) return ''
  return String(html).replace(/<[^>]*>/g, '')
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

app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    if (db) await db.authenticate()
    res.json({ status: db ? 'ok' : 'unavailable', uptime: process.uptime() })
  } catch {
    res.status(500).json({ status: 'unavailable', error: 'database connection failed' })
  }
})

app.get('/api/post/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug
    if (db) {
      const post: any = await Post.findOne({ where: { slug }, raw: true })
      if (post) {
        return res.json({
          title: post.title,
          slug: post.slug,
          content: post.content,
          description: post.description,
          tags: post.keywords || '',
          ogImage: post.ogImage || '',
          canonicalUrl: post.canonicalUrl || '',
          publishedAt: post.publishedAt || null,
          readingTime: Math.max(1, Math.ceil((post.content?.split(/\s+/).length || 0) / 220)),
        })
      }
    }

    const postsPath = path.join(process.cwd(), 'content', 'posts')
    if (!fs.existsSync(postsPath)) return res.status(404).json({ error: 'not_found' })
    const files = fs.readdirSync(postsPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    for (const f of files) {
      try {
        const parsed = await parseMarkdownFile(path.join(postsPath, f))
        const fileSlug = parsed.data.slug || f.replace(/\.mdx?$/, '')
        if (fileSlug === slug) {
          const kws = parsed.data.keywords || parsed.data.tags || []
          return res.json({
            title: parsed.data.title || fileSlug,
            slug: fileSlug,
            content: parsed.html,
            description: parsed.data.description || '',
            tags: Array.isArray(kws) ? kws.join(', ') : String(kws),
            ogImage: parsed.data.ogImage || '',
            canonicalUrl: parsed.data.canonicalUrl || '',
            publishedAt: parsed.data.date || null,
            readingTime: Math.max(1, Math.ceil(parsed.html.split(/\s+/).length / 220)),
          })
        }
      } catch (e) { continue }
    }
    return res.status(404).json({ error: 'not_found' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

app.get('/api/posts', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page || '1'), 10))
    const perPage = Math.min(50, parseInt(String(req.query.perPage || '10'), 10))
    const skip = (page - 1) * perPage

    if (db) {
      const { rows, count } = await Post.findAndCountAll({
        order: [['publishedAt', 'DESC']],
        offset: skip,
        limit: perPage,
        raw: true,
      })
      const items = rows.map((p: any) => ({
        title: p.title,
        slug: p.slug,
        description: p.description,
        publishedAt: p.publishedAt,
        ogImage: p.ogImage || '',
        canonicalUrl: p.canonicalUrl || '',
        excerpt: stripHtml(p.content).slice(0, 220),
        readingTime: Math.max(1, Math.ceil((p.content?.split(/\s+/).length || 0) / 220)),
      }))
      return res.json({ items, total: count, page, perPage })
    }

    const postsPath = path.join(process.cwd(), 'content', 'posts')
    if (!fs.existsSync(postsPath)) return res.json({ items: [], total: 0, page, perPage })
    const files = fs.readdirSync(postsPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    const items = (await Promise.all(files.map(async f => {
      try {
        const parsed = await parseMarkdownFile(path.join(postsPath, f))
        const slug = parsed.data.slug || f.replace(/\.mdx?$/, '')
        return {
          title: parsed.data.title || slug,
          slug,
          description: parsed.data.description || '',
          publishedAt: parsed.data.date || null,
          ogImage: parsed.data.ogImage || '',
          canonicalUrl: parsed.data.canonicalUrl || '',
          excerpt: stripHtml(parsed.html).slice(0, 220),
          readingTime: Math.max(1, Math.ceil(parsed.html.split(/\s+/).length / 220)),
        }
      } catch (e) { return null }
    }))).filter(Boolean)
    return res.json({ items: items.slice(skip, skip + perPage), total: items.length, page, perPage })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

app.get('/rss.xml', async (req: Request, res: Response) => {
  try {
    let items: any[] = []
    if (db) {
      const rows = await Post.findAll({ order: [['publishedAt', 'DESC']], limit: 50, raw: true })
      items = rows.map((p: any) => ({
        title: p.title,
        url: p.canonicalUrl || `${SITE}/blog/${p.slug}`,
        date: p.publishedAt,
        desc: p.description || stripHtml(p.content).slice(0, 200),
      }))
    }
    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>ReplyFlow Blog</title>
          <link>${SITE}</link>
          <description>AI Lead Follow-Up & Sales Automation Insights</description>
          ${items.map(p => `
          <item>
            <title>${escapeHtml(p.title)}</title>
            <link>${escapeHtml(p.url)}</link>
            <guid>${escapeHtml(p.url)}</guid>
            <pubDate>${new Date(p.date).toUTCString()}</pubDate>
            <description>${escapeHtml(p.desc)}</description>
          </item>`).join('\n')}
        </channel>
      </rss>`
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.send(feed)
  } catch (err) {
    console.error(err)
    res.status(500).send('server error')
  }
})

app.get('/sitemap.xml', async (req: Request, res: Response) => {
  try {
    let urls: string[] = []
    if (db) {
      const rows = await Post.findAll({ order: [['publishedAt', 'DESC']], raw: true })
      urls = rows.map((p: any) => {
        const loc = p.canonicalUrl || `${SITE}/blog/${p.slug}`
        const lastmod = p.publishedAt ? new Date(p.publishedAt).toISOString() : new Date().toISOString()
        return `<url><loc>${escapeHtml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`
      })
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join('\n')}
      </urlset>`
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.send(xml)
  } catch (err) {
    console.error(err)
    res.status(500).send('server error')
  }
})

app.get('/blog/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug
    let post: any = null

    if (db) {
      post = await Post.findOne({ where: { slug }, raw: true })
    }

    if (!post) {
      const postsPath = path.join(process.cwd(), 'content', 'posts')
      if (fs.existsSync(postsPath)) {
        const files = fs.readdirSync(postsPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
        for (const f of files) {
          try {
            const parsed = await parseMarkdownFile(path.join(postsPath, f))
            const fileSlug = parsed.data.slug || f.replace(/\.mdx?$/, '')
            if (fileSlug === slug) {
              const window = new JSDOM('').window as any
              const DOMPurify = createDOMPurify(window)
              post = {
                title: parsed.data.title || fileSlug,
                content: DOMPurify.sanitize(parsed.html),
                description: parsed.data.description || '',
                slug: fileSlug,
                canonicalUrl: parsed.data.canonicalUrl || '',
                ogImage: parsed.data.ogImage || '',
                publishedAt: parsed.data.date || null,
                keywords: parsed.data.keywords || parsed.data.tags || '',
              }
              break
            }
          } catch (e) { continue }
        }
      }
    }

    if (!post) return res.status(404).send('Not found')

    const window = new JSDOM('').window as any
    const DOMPurify = createDOMPurify(window)
    const safeHtml = DOMPurify.sanitize(post.content)
    const canonicalUrl = post.canonicalUrl || `${SITE}/blog/${post.slug}`
    const publishedAt = post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString()
    const kws = post.keywords || ''

    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description || '',
      "url": canonicalUrl,
      "datePublished": publishedAt,
      "image": post.ogImage || `${SITE}/reply_flow_logo.png`,
    })

    const head = `
      <title>${escapeHtml(post.title)} — ReplyFlow</title>
      <meta name="description" content="${escapeHtml(post.description || '')}" />
      <meta name="keywords" content="${escapeHtml(kws)}" />
      <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="${escapeHtml(post.title)} — ReplyFlow" />
      <meta property="og:description" content="${escapeHtml(post.description || '')}" />
      <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
      <meta property="og:image" content="${escapeHtml(post.ogImage || `${SITE}/reply_flow_logo.png`)}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${escapeHtml(post.title)} — ReplyFlow" />
      <meta name="twitter:description" content="${escapeHtml(post.description || '')}" />
      <meta name="twitter:image" content="${escapeHtml(post.ogImage || `${SITE}/reply_flow_logo.png`)}" />
      <script type="application/ld+json">${jsonLd}</script>`

    const styles = `
      :root{--max-w:760px;--accent:#0ea5e9}
      html,body{height:100%}
      body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial;line-height:1.65;color:#0f172a;margin:0;padding:18px;background:#fff}
      .wrap{max-width:var(--max-w);margin:0 auto}
      header.site-header{display:flex;align-items:center;gap:12px;padding:12px 0 8px}
      header.site-header img{height:42px;width:auto;border-radius:6px}
      header.site-header a{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit}
      header.site-header h2{margin:0;font-size:1rem;letter-spacing:0.08em}
      article{padding:8px 0}
      h1{font-size:clamp(1.6rem,3.2vw,2.6rem);margin:0 0 8px}
      time{color:#64748b;font-size:0.9rem}
      .content{margin-top:18px;font-size:clamp(1rem,1.6vw,1.125rem);color:#0f172a}
      img{max-width:100%;height:auto;border-radius:8px}
      pre{background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;overflow:auto}
      code{background:#f1f5f9;padding:2px 6px;border-radius:6px}
      @media (prefers-color-scheme:dark){body{background:#000;color:#e6edf3}.content{color:#dbeafe}}
      @media (min-width:900px){body{padding:36px}.wrap{padding:0 20px}}`

    const html = `<!doctype html>
    <html lang="en">
      <head>${head}<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><style>${styles}</style></head>
      <body>
        <div class="wrap">
          <header class="site-header">
            <a href="/"><img src="https://replyflow.pro/reply_flow_logo.png" alt="ReplyFlow" /><h2>ReplyFlow — Autonomous Sales Engine</h2></a>
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

let initPromise: Promise<void> | null = null

async function ensureInit() {
  if (initPromise) return initPromise
  initPromise = (async () => {
    try {
      db = await connectDB()
      await syncAll()
      console.log('DB initialized and posts synced')
    } catch (err) {
      console.error('DB init failed:', (err as Error).message)
    }
  })()
  return initPromise
}

app.use((req, res, next) => {
  if (req.url.startsWith('/api/health')) return next()
  ensureInit().finally(() => next())
})

async function main() {
  await ensureInit()
  if (process.env.DEV_WATCH === 'true' || process.env.NODE_ENV === 'development') {
    try { watchPosts() } catch (e) { console.error('watchPosts failed', (e as Error).message) }
  }
  app.listen(PORT, () => console.log(`Blog server running on http://localhost:${PORT}`))
}

if (!process.env.VERCEL) {
  main().catch(err => { console.error(err); process.exit(1) })
}

export default app
