import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.resolve(__dirname, '..', 'content', 'posts')

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

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' })

  try {
    if (!fs.existsSync(POSTS_DIR)) {
      console.error('[api/posts] POSTS_DIR not found:', POSTS_DIR)
      return res.status(200).json({ items: [], total: 0, page: 1, perPage: 20 })
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

    const page = Math.max(1, parseInt(req.query?.page || '1', 10))
    const perPage = Math.min(50, parseInt(req.query?.perPage || '20', 10))
    const start = (page - 1) * perPage
    const paged = items.slice(start, start + perPage)

    res.status(200).json({ items: paged, total: items.length, page, perPage })
  } catch (err) {
    console.error('[api/posts] error:', err.message)
    res.status(500).json({ error: 'server_error', detail: err.message })
  }
}
