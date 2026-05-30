import express from 'express'
import path from 'path'

const app = express()
const port = process.env.PORT || 3000
const distDir = path.join(process.cwd(), 'dist')

// Simple proxy for API requests (useful for local testing)
const API_PROXY_TARGET = process.env.BLOG_BACKEND_URL || process.env.VITE_BLOG_API_URL || 'http://localhost:4000'
app.use(express.json())
// Local content-backed blog API (falls back when backend isn't running)
import fs from 'fs'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function parseFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
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
  // very small subset: headings and paragraphs and links
  const lines = md.split(/\r?\n/)
  const out = []
  let buf = []
  const flush = () => { if (buf.length) { out.push(`<p>${buf.join(' ').trim()}</p>`); buf = [] } }
  for (let line of lines) {
    line = line.trim()
    if (!line) { flush(); continue }
    if (line.startsWith('### ')) { flush(); out.push(`<h3>${line.slice(4)}</h3>`); continue }
    if (line.startsWith('## ')) { flush(); out.push(`<h2>${line.slice(3)}</h2>`); continue }
    if (line.startsWith('# ')) { flush(); out.push(`<h1>${line.slice(2)}</h1>`); continue }
    // links [text](url)
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    buf.push(line)
  }
  flush()
  return out.join('\n')
}

// Serve local posts if content directory exists
if (fs.existsSync(POSTS_DIR)) {
  app.get('/api/posts', (req, res) => {
    try {
      const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
      const items = files.map(f => {
        const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
        const { data, content } = parseFrontmatter(raw)
        const excerpt = content.split(/\n\n/)[0].replace(/\n/g, ' ').slice(0, 220)
        return {
          title: data.title || f.replace(/\.md$/, ''),
          slug: data.slug || f.replace(/\.md$/, ''),
          description: data.description || '',
          publishedAt: data.date || null,
          ogImage: data.ogImage || '',
          canonicalUrl: data.canonical || '',
          excerpt
        }
      })
      return res.json({ items, total: items.length, page: 1, perPage: items.length })
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
          return res.json({
            title: data.title || fileSlug,
            slug: fileSlug,
            description: data.description || '',
            keywords: data.tags || [],
            ogImage: data.ogImage || '',
            canonicalUrl: data.canonical || '',
            publishedAt: data.date || null,
            content: mdToHtml(content)
          })
        }
      }
      return res.status(404).json({ error: 'not_found' })
    } catch (err) { console.error(err); res.status(500).json({ error: 'server_error' }) }
  })
}

app.use('/api', async (req, res, next) => {
  try {
    const targetUrl = `${API_PROXY_TARGET}${req.originalUrl}`
    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers }
    }
    // Remove host header to avoid conflicts
    delete fetchOptions.headers.host
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      fetchOptions.body = JSON.stringify(req.body)
      fetchOptions.headers['content-type'] = req.headers['content-type'] || 'application/json'
    }
    const proxied = await fetch(targetUrl, fetchOptions)
    // copy headers
    proxied.headers.forEach((v, k) => {
      if (k.toLowerCase() === 'transfer-encoding') return
      res.setHeader(k, v)
    })
    res.status(proxied.status)
    const buf = await proxied.arrayBuffer()
    return res.send(Buffer.from(buf))
  } catch (err) {
    console.error('API proxy error:', err)
    return res.status(502).json({ error: 'bad_gateway', message: err.message })
  }
})

// Serve static files
app.use(express.static(distDir))

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Static server running on port ${port}, serving ${distDir}`)
})
