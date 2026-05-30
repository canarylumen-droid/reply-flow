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

function blogApiPlugin() {
  const POSTS_DIR = path.resolve('content/posts')

  return {
    name: 'blog-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
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

export default defineConfig({
  plugins: [react(), tailwindcss(), blogApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})
