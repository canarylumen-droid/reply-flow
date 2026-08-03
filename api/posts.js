import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getDb } from './db.js'

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

function stripHtml(html) {
  if (!html) return ''
  return String(html).replace(/<[^>]*>/g, '')
}

function mdToHtml(md) {
  const lines = md.split(/\r?\n/)
  const out = []
  let buf = []
  let inList = false
  const flush = () => { if (buf.length) { out.push(`<p>${buf.join(' ').trim()}</p>`); buf = [] } }
  const close = () => { if (inList) { out.push('</ul>'); inList = false } }
  const inline = (s) => s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
    const isInternal = href.startsWith('/') || href.includes('replyflow.pro')
    return `<a href="${href}"${isInternal ? '' : ' target="_blank" rel="noopener noreferrer"'}>${text}</a>`
  })
  for (const line of lines) {
    const t = line.trim()
    if (!t) { flush(); close(); continue }
    if (t.startsWith('### ')) { flush(); close(); out.push(`<h3>${inline(t.slice(4))}</h3>`); continue }
    if (t.startsWith('## ')) { flush(); close(); out.push(`<h2>${inline(t.slice(3))}</h2>`); continue }
    if (t.startsWith('# ')) { flush(); close(); out.push(`<h1>${inline(t.slice(2))}</h1>`); continue }
    if (t.startsWith('- ') || t.startsWith('* ')) { flush(); if (!inList) { out.push('<ul>'); inList = true } out.push(`<li>${inline(t.slice(2))}</li>`); continue }
    if (t.startsWith('> ')) { flush(); close(); out.push(`<blockquote>${inline(t.slice(2))}</blockquote>`); continue }
    close(); buf.push(inline(t))
  }
  flush(); close()
  return out.join('\n')
}

function readFromFilesystem() {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  return files.map(f => {
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
      readingTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220)),
      draft: data.draft === 'true'
    }
  }).filter(p => !p.draft).sort((a, b) => {
    if (!a.publishedAt) return 1
    if (!b.publishedAt) return -1
    return new Date(b.publishedAt) - new Date(a.publishedAt)
  })
}

async function readFromDb() {
  const db = await getDb()
  if (!db) return null
  try {
    const [rows] = await db.execute('SELECT title, slug, description, publishedAt, ogImage, canonicalUrl, keywords as tags, content FROM posts ORDER BY publishedAt DESC')
    return rows.map(r => ({
      title: r.title,
      slug: r.slug,
      description: r.description || '',
      publishedAt: r.publishedAt,
      ogImage: r.ogImage || '',
      canonicalUrl: r.canonicalUrl || '',
      tags: r.tags || '',
      excerpt: stripHtml(r.content || '').slice(0, 220),
      readingTime: Math.max(1, Math.ceil((r.content || '').split(/\s+/).length / 220)),
    }))
  } catch { return null }
}

async function initDb() {
  const db = await getDb()
  if (!db) return
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      content LONGTEXT NOT NULL,
      description TEXT,
      keywords TEXT DEFAULT '',
      ogImage VARCHAR(500) DEFAULT '',
      canonicalUrl VARCHAR(500) DEFAULT '',
      publishedAt DATETIME,
      hash VARCHAR(64) DEFAULT '',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`)
    await syncToDb(db)
  } catch {}
}

async function syncToDb(db) {
  if (!fs.existsSync(POSTS_DIR)) return
  const crypto = await import('crypto')
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  for (const f of files) {
    try {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
      const { data, content } = parseFrontmatter(raw)
      if (data.draft === 'true') continue
      const slug = data.slug || f.replace(/\.md$/, '')
      const hash = crypto.createHash('sha256').update((data.title || '') + '\n' + content).digest('hex')
      const [existing] = await db.execute('SELECT hash FROM posts WHERE slug = ?', [slug])
      if (existing.length > 0 && existing[0].hash === hash) continue
      const html = mdToHtml(content)
      const kw = data.tags || data.keywords || ''
      await db.execute(
        `INSERT INTO posts (title, slug, content, description, keywords, ogImage, canonicalUrl, publishedAt, hash)
         VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE title=VALUES(title), content=VALUES(content),
         description=VALUES(description), keywords=VALUES(keywords), ogImage=VALUES(ogImage),
         canonicalUrl=VALUES(canonicalUrl), publishedAt=VALUES(publishedAt), hash=VALUES(hash)`,
        [data.title || slug, slug, html, data.description || '', String(kw), data.ogImage || '', data.canonical || '', data.date ? new Date(data.date) : new Date(), hash]
      )
    } catch {}
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' })

  try {
    if (req.query?.wakeup === 'true') {
      await initDb()
      return res.status(200).json({ ok: true })
    }

    let items = null
    if (req.query?.db !== 'false') items = await readFromDb()
    if (!items) items = readFromFilesystem()

    const page = Math.max(1, parseInt(req.query?.page || '1', 10))
    const perPage = Math.min(50, parseInt(req.query?.perPage || '20', 10))
    const start = (page - 1) * perPage
    const paged = items.slice(start, start + perPage)

    if (items.length > 0 && !items[0].readingTime) {
      items.forEach(i => { if (!i.readingTime) i.readingTime = 5 })
    }

    res.status(200).json({ items: paged, total: items.length, page, perPage })
  } catch (err) {
    console.error('[api/posts] error:', err.message)
    const items = readFromFilesystem()
    const page = Math.max(1, parseInt(req.query?.page || '1', 10))
    const perPage = Math.min(50, parseInt(req.query?.perPage || '20', 10))
    res.status(200).json({ items: items.slice((page-1)*perPage, (page-1)*perPage+perPage), total: items.length, page, perPage })
  }
}
