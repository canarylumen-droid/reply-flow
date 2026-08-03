import express from 'express'
import path from 'path'
import fs from 'fs'

const app = express()
const port = process.env.PORT || 3000
const distDir = path.join(process.cwd(), 'dist')
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

app.use(express.json())

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
    if (buf.length) { out.push(`<p>${buf.join(' ').trim()}</p>`); buf = [] }
  }
  const closeList = () => {
    if (inList) { out.push('</ul>'); inList = false }
  }
  const processInline = (str) => str
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

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
    if (/^\d+\.\s/.test(trimmed)) { flushBuf(); closeList(); out.push(`<li>${processInline(trimmed.replace(/^\d+\.\s/, ''))}</li>`); continue }
    if (trimmed.startsWith('> ')) { flushBuf(); closeList(); out.push(`<blockquote>${processInline(trimmed.slice(2))}</blockquote>`); continue }
    closeList()
    buf.push(processInline(trimmed))
  }
  flushBuf()
  closeList()
  return out.join('\n')
}

const SITE_URL = 'https://www.replyflow.pro'

function generateSitemap(posts) {
  const today = new Date().toISOString().split('T')[0]
  const staticPages = [
    { loc: `${SITE_URL}/`,             priority: '1.0', changefreq: 'weekly',  lastmod: today },
    { loc: `${SITE_URL}/blog`,         priority: '0.9', changefreq: 'weekly',  lastmod: today },
    { loc: `${SITE_URL}/#pricing`,     priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/#casestudies`, priority: '0.7', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/#process`,     priority: '0.6', changefreq: 'monthly', lastmod: today },
    { loc: `${SITE_URL}/#roi`,         priority: '0.6', changefreq: 'monthly', lastmod: today },
  ]
  const postUrls = posts.map(p => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: p.publishedAt || today
  }))
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${[...staticPages, ...postUrls].map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

app.get('/sitemap.xml', (req, res) => {
  try {
    const posts = fs.existsSync(POSTS_DIR)
      ? fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).map(f => {
          const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
          const { data } = parseFrontmatter(raw)
          return { slug: data.slug || f.replace(/\.md$/, ''), publishedAt: data.date || null, draft: data.draft === 'true' }
        }).filter(p => !p.draft)
      : []
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.send(generateSitemap(posts))
  } catch (err) { console.error(err); res.status(500).send('Error generating sitemap') }
})

if (fs.existsSync(POSTS_DIR)) {
  app.get('/api/posts', (req, res) => {
    try {
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
      res.json({ items, total: items.length, page: 1, perPage: items.length })
    } catch (err) { console.error(err); res.status(500).json({ error: 'server_error' }) }
  })

  app.get('/api/post/:slug', (req, res) => {
    try {
      const slug = req.params.slug
      const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
      for (const f of files) {
        const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
        const { data, content } = parseFrontmatter(raw)
        const fileSlug = data.slug || f.replace(/\.md$/, '')
        if (fileSlug === slug) {
          const wordCount = content.trim().split(/\s+/).length
          const readingTime = Math.max(1, Math.ceil(wordCount / 220))
          return res.json({
            title: data.title || fileSlug,
            slug: fileSlug,
            description: data.description || '',
            tags: data.tags || '',
            ogImage: data.ogImage || '',
            canonicalUrl: data.canonical || '',
            publishedAt: data.date || null,
            readingTime,
            content: mdToHtml(content)
          })
        }
      }
      return res.status(404).json({ error: 'not_found' })
    } catch (err) { console.error(err); res.status(500).json({ error: 'server_error' }) }
  })
}

// Serve static files
app.use(express.static(distDir))

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  const indexPath = path.join(distDir, 'index.html')
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else {
    res.status(503).send('Build not found. Run npm run build.')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
