import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.resolve(__dirname, '..', '..', 'content', 'posts')

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
  let inOl = false
  const flush = () => { if (buf.length) { out.push(`<p>${buf.join(' ').trim()}</p>`); buf = [] } }
  const close = () => {
    if (inList) { out.push('</ul>'); inList = false }
    if (inOl) { out.push('</ol>'); inOl = false }
  }
  const inline = (s) => s
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
      const isInternal = href.startsWith('/') || href.includes('replyflow.pro')
      const attrs = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"'
      return `<a href="${href}"${attrs}>${text}</a>`
    })
  for (const line of lines) {
    const t = line.trim()
    if (!t || t === '---') { flush(); close(); continue }
    if (t.startsWith('#### ')) { flush(); close(); out.push(`<h4>${inline(t.slice(5))}</h4>`); continue }
    if (t.startsWith('### ')) { flush(); close(); out.push(`<h3>${inline(t.slice(4))}</h3>`); continue }
    if (t.startsWith('## ')) { flush(); close(); out.push(`<h2>${inline(t.slice(3))}</h2>`); continue }
    if (t.startsWith('# ')) { flush(); close(); out.push(`<h1>${inline(t.slice(2))}</h1>`); continue }
    if (t.startsWith('> ')) { flush(); close(); out.push(`<blockquote>${inline(t.slice(2))}</blockquote>`); continue }
    if (t.startsWith('- ') || t.startsWith('* ')) {
      flush(); if (!inList) { close(); out.push('<ul>'); inList = true }
      out.push(`<li>${inline(t.slice(2))}</li>`); continue
    }
    if (/^\d+\.\s/.test(t)) {
      flush(); if (!inOl) { close(); out.push('<ol>'); inOl = true }
      out.push(`<li>${inline(t.replace(/^\d+\.\s/, ''))}</li>`); continue
    }
    close(); buf.push(inline(t))
  }
  flush(); close()
  return out.join('\n')
}

function readFromFilesystem(slug) {
  if (!fs.existsSync(POSTS_DIR)) return null
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  for (const f of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
    const { data, content } = parseFrontmatter(raw)
    const fileSlug = data.slug || f.replace(/\.md$/, '')
    if (fileSlug === slug) {
      if (data.draft === 'true') return null
      const wordCount = content.trim().split(/\s+/).length
      return {
        title: data.title || fileSlug,
        slug: fileSlug,
        description: data.description || '',
        tags: data.tags || '',
        ogImage: data.ogImage || '',
        canonicalUrl: data.canonical || '',
        publishedAt: data.date || null,
        readingTime: Math.max(1, Math.ceil(wordCount / 220)),
        content: mdToHtml(content)
      }
    }
  }
  return null
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' })

  try {
    const slug = req.query.slug
    if (!slug) return res.status(400).json({ error: 'missing_slug' })

    const post = readFromFilesystem(slug)
    if (!post) return res.status(404).json({ error: 'not_found' })

    res.status(200).json(post)
  } catch (err) {
    console.error('[api/post/[slug]] error:', err.message)
    res.status(500).json({ error: 'server_error' })
  }
}
