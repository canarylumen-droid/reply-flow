import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

function parseFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, content: md }
  const raw = m[1]
  const content = m[2]
  const data = {}
  raw.split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':')
    if (idx > -1) {
      const key = line.slice(0, idx).trim()
      let val = line.slice(idx + 1).trim()
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
      data[key] = val
    }
  })
  return { data, content }
}

function mdToHtml(md) {
  const lines = md.split(/\r?\n/)
  const out = []
  let buf = []
  let inList = false

  const flushBuf = () => {
    if (buf.length) {
      out.push(`<p>${buf.join(' ').trim()}</p>`)
      buf = []
    }
  }
  const closeList = () => {
    if (inList) { out.push('</ul>'); inList = false }
  }
  const processInline = (str) => {
    return str
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  }

  for (let line of lines) {
    const trimmed = line.trim()
    if (!trimmed) { flushBuf(); closeList(); continue }
    if (trimmed.startsWith('### ')) { flushBuf(); closeList(); out.push(`<h3>${processInline(trimmed.slice(4))}</h3>`); continue }
    if (trimmed.startsWith('## ')) { flushBuf(); closeList(); out.push(`<h2>${processInline(trimmed.slice(3))}</h2>`); continue }
    if (trimmed.startsWith('# ')) { flushBuf(); closeList(); out.push(`<h1>${processInline(trimmed.slice(2))}</h1>`); continue }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushBuf()
      if (!inList) { out.push('<ul>'); inList = true }
      out.push(`<li>${processInline(trimmed.slice(2))}</li>`)
      continue
    }
    if (/^\d+\.\s/.test(trimmed)) {
      flushBuf(); closeList()
      out.push(`<li>${processInline(trimmed.replace(/^\d+\.\s/, ''))}</li>`)
      continue
    }
    if (trimmed.startsWith('> ')) {
      flushBuf(); closeList()
      out.push(`<blockquote>${processInline(trimmed.slice(2))}</blockquote>`)
      continue
    }
    closeList()
    buf.push(processInline(trimmed))
  }
  flushBuf()
  closeList()
  return out.join('\n')
}

const SITE_URL = 'https://replyflow.pro'

function generateSitemap(posts) {
  const today = new Date().toISOString().split('T')[0]
  const staticPages = [
    { loc: `${SITE_URL}/`,              priority: '1.0', changefreq: 'weekly',  lastmod: today },
    { loc: `${SITE_URL}/blog`,          priority: '0.9', changefreq: 'weekly',  lastmod: today },
    { loc: `${SITE_URL}/#pricing`,      priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/#casestudies`,  priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/#process`,      priority: '0.6', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/#roi`,          priority: '0.6', changefreq: 'monthly', lastmod: today },
  ]
  const postUrls = posts.map(p => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: p.publishedAt || today
  }))
  const urls = [...staticPages, ...postUrls]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

function blogApiPlugin() {
  const POSTS_DIR = path.resolve('content/posts')

  return {
    name: 'blog-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {

        /* ── Dynamic Sitemap ── */
        if (req.url === '/sitemap.xml' && req.method === 'GET') {
          try {
            const files = fs.existsSync(POSTS_DIR)
              ? fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
              : []
            const posts = files.map(f => {
              const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
              const { data } = parseFrontmatter(raw)
              return { slug: data.slug || f.replace(/\.md$/, ''), publishedAt: data.date || null, draft: data.draft === 'true' }
            }).filter(p => !p.draft)
            res.setHeader('Content-Type', 'application/xml; charset=utf-8')
            res.setHeader('Cache-Control', 'public, max-age=3600')
            return res.end(generateSitemap(posts))
          } catch (err) {
            console.error(err)
            res.statusCode = 500
            return res.end('Error generating sitemap')
          }
        }

        if (req.url === '/api/posts' && req.method === 'GET') {
          try {
            if (!fs.existsSync(POSTS_DIR)) {
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ items: [], total: 0 }))
            }
            const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
            const items = files.map(f => {
              const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
              const { data, content } = parseFrontmatter(raw)
              const clean = content.replace(/#+\s[^\n]*/g, '').replace(/\*\*/g, '').replace(/\*/g, '').trim()
              const excerpt = clean.split(/\n\n/)[0].replace(/\n/g, ' ').slice(0, 240)
              return {
                title: data.title || f.replace(/\.md$/, ''),
                slug: data.slug || f.replace(/\.md$/, ''),
                description: data.description || '',
                publishedAt: data.date || null,
                ogImage: data.ogImage || '',
                canonicalUrl: data.canonical || '',
                tags: data.tags || '',
                excerpt,
                draft: data.draft === 'true'
              }
            }).filter(p => !p.draft).sort((a, b) => {
              if (!a.publishedAt) return 1
              if (!b.publishedAt) return -1
              return new Date(b.publishedAt) - new Date(a.publishedAt)
            })
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ items, total: items.length, page: 1, perPage: items.length }))
          } catch (err) {
            console.error(err)
            res.statusCode = 500
            return res.end(JSON.stringify({ error: 'server_error' }))
          }
        }

        const postMatch = req.url.match(/^\/api\/post\/(.+)$/)
        if (postMatch && req.method === 'GET') {
          const slug = decodeURIComponent(postMatch[1])
          try {
            if (!fs.existsSync(POSTS_DIR)) {
              res.statusCode = 404
              return res.end(JSON.stringify({ error: 'not_found' }))
            }
            const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
            for (const f of files) {
              const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
              const { data, content } = parseFrontmatter(raw)
              const fileSlug = data.slug || f.replace(/\.md$/, '')
              if (fileSlug === slug) {
                const wordCount = content.trim().split(/\s+/).length
                const readingTime = Math.max(1, Math.ceil(wordCount / 220))
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({
                  title: data.title || fileSlug,
                  slug: fileSlug,
                  description: data.description || '',
                  tags: data.tags || '',
                  ogImage: data.ogImage || '',
                  canonicalUrl: data.canonical || '',
                  publishedAt: data.date || null,
                  readingTime,
                  content: mdToHtml(content)
                }))
              }
            }
            res.statusCode = 404
            return res.end(JSON.stringify({ error: 'not_found' }))
          } catch (err) {
            console.error(err)
            res.statusCode = 500
            return res.end(JSON.stringify({ error: 'server_error' }))
          }
        }

        next()
      })
    }
  }
}

function staticSitemapPlugin() {
  const POSTS_DIR = path.resolve('content/posts')
  return {
    name: 'static-sitemap',
    closeBundle() {
      try {
        const posts = fs.existsSync(POSTS_DIR)
          ? fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).map(f => {
              const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
              const { data } = parseFrontmatter(raw)
              return { slug: data.slug || f.replace(/\.md$/, ''), publishedAt: data.date || null, draft: data.draft }
            }).filter(p => p.draft !== 'true')
          : []
        const xml = generateSitemap(posts)
        const outDir = path.resolve('dist')
        if (fs.existsSync(outDir)) {
          fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
          console.log(`\u2713 Generated dist/sitemap.xml (${posts.length + 6} URLs)`)
        }
      } catch (e) {
        console.warn('sitemap generation skipped:', e.message)
      }
    }
  }
}

function prerenderBlogPlugin() {
  const POSTS_DIR = path.resolve('content/posts')
  const SITE = 'https://replyflow.pro'

  function escapeHtml(s) {
    if (!s) return ''
    return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  }

  return {
    name: 'prerender-blog',
    closeBundle() {
      const outDir = path.resolve('dist')
      const indexPath = path.join(outDir, 'index.html')
      if (!fs.existsSync(indexPath)) return
      if (!fs.existsSync(POSTS_DIR)) { console.log('  prerender skipped (no posts dir)'); return }

      const template = fs.readFileSync(indexPath, 'utf8')
      const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
      let count = 0

      for (const f of files) {
        try {
          const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
          const { data, content } = parseFrontmatter(raw)
          if (data.draft === 'true') continue

          const slug = data.slug || f.replace(/\.md$/, '')
          const title = data.title || slug
          const description = data.description || ''
          const tags = data.tags || ''
          const ogImage = data.ogImage || `${SITE}/reply_flow_logo.png`
          const canonicalUrl = data.canonical || `${SITE}/blog/${slug}`
          const publishedAt = data.date || ''
          const htmlContent = mdToHtml(content)
          const wordCount = content.trim().split(/\s+/).length
          const readingTime = Math.max(1, Math.ceil(wordCount / 220))
          const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

          const breadcrumbJson = JSON.stringify({
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Blog', item: `${SITE}/blog` },
              { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl },
            ],
          })

          const blogPostingJson = JSON.stringify({
            '@context': 'https://schema.org', '@type': 'BlogPosting',
            headline: title, description, datePublished: publishedAt, image: ogImage, url: canonicalUrl,
            author: { '@type': 'Organization', name: 'ReplyFlow Agency', url: SITE },
            publisher: { '@type': 'Organization', name: 'ReplyFlow Agency', logo: { '@type': 'ImageObject', url: `${SITE}/reply_flow_logo.png` } },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
          })

          const rootContent = `<div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <article class="max-w-2xl mx-auto px-5 sm:px-8 py-20">
        <a href="/blog" class="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-primary transition-colors font-medium mb-7">← Blog</a>
        <div class="flex flex-wrap items-center gap-3 mb-5 text-[13px] text-gray-400">
          ${formattedDate ? `<span>${escapeHtml(formattedDate)}</span>` : ''}
          <span>· ${readingTime} min read</span>
        </div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-syne font-bold leading-[1.18] text-gray-900 dark:text-white mb-5">${escapeHtml(title)}</h1>
        ${description ? `<p class="text-[15px] sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8">${escapeHtml(description)}</p>` : ''}
        <div class="blog-prose">${htmlContent}</div>
      </article>
    </div>`

          const metaTags = `
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(tags)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)} — ReplyFlow" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="article:published_time" content="${escapeHtml(publishedAt)}" />
    <meta name="twitter:title" content="${escapeHtml(title)} — ReplyFlow" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <script type="application/ld+json">${breadcrumbJson}</script>
    <script type="application/ld+json">${blogPostingJson}</script>`

          let page = template
            .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)} — ReplyFlow</title>`)
            .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${rootContent}</div>`)
            .replace(/<meta name="description"[^>]*\/>/, '')
            .replace(/<link rel="canonical"[^>]*\/>/, '')
            .replace(/<meta (name|property)="(og|article|twitter):[^>]*\/>/g, '')
            .replace(/<\/head>/, `${metaTags}\n</head>`)

          const slugDir = path.join(outDir, 'blog', slug)
          fs.mkdirSync(slugDir, { recursive: true })
          fs.writeFileSync(path.join(slugDir, 'index.html'), page, 'utf8')
          count++
        } catch (e) {
          console.warn('  prerender failed for', f, e.message)
        }
      }

      console.log(`\u2713 Prerendered ${count} blog posts to dist/blog/*/index.html`)
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), blogApiPlugin(), staticSitemapPlugin(), prerenderBlogPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})
