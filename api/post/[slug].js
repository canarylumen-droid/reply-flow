import fs from 'fs'
import path from 'path'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

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

  const flushBuf = () => {
    if (buf.length) { out.push(`<p>${buf.join(' ').trim()}</p>`); buf = [] }
  }
  const closeList = () => {
    if (inList) { out.push('</ul>'); inList = false }
    if (inOl) { out.push('</ol>'); inOl = false }
  }
  const processInline = (str) => str
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed === '---') { flushBuf(); closeList(); continue }
    if (trimmed.startsWith('#### ')) { flushBuf(); closeList(); out.push(`<h4>${processInline(trimmed.slice(5))}</h4>`); continue }
    if (trimmed.startsWith('### ')) { flushBuf(); closeList(); out.push(`<h3>${processInline(trimmed.slice(4))}</h3>`); continue }
    if (trimmed.startsWith('## ')) { flushBuf(); closeList(); out.push(`<h2>${processInline(trimmed.slice(3))}</h2>`); continue }
    if (trimmed.startsWith('# ')) { flushBuf(); closeList(); out.push(`<h1>${processInline(trimmed.slice(2))}</h1>`); continue }
    if (trimmed.startsWith('> ')) { flushBuf(); closeList(); out.push(`<blockquote>${processInline(trimmed.slice(2))}</blockquote>`); continue }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushBuf()
      if (!inList) { closeList(); out.push('<ul>'); inList = true }
      out.push(`<li>${processInline(trimmed.slice(2))}</li>`)
      continue
    }
    if (/^\d+\.\s/.test(trimmed)) {
      flushBuf()
      if (!inOl) { closeList(); out.push('<ol>'); inOl = true }
      out.push(`<li>${processInline(trimmed.replace(/^\d+\.\s/, ''))}</li>`)
      continue
    }
    closeList()
    buf.push(processInline(trimmed))
  }
  flushBuf()
  closeList()
  return out.join('\n')
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' })

  try {
    const slug = req.query.slug
    if (!slug) return res.status(400).json({ error: 'missing_slug' })

    if (!fs.existsSync(POSTS_DIR)) return res.status(404).json({ error: 'not_found' })

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
    for (const f of files) {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')
      const { data, content } = parseFrontmatter(raw)
      const fileSlug = data.slug || f.replace(/\.md$/, '')
      if (fileSlug === slug) {
        if (data.draft === 'true') return res.status(404).json({ error: 'not_found' })
        const wordCount = content.trim().split(/\s+/).length
        const readingTime = Math.max(1, Math.ceil(wordCount / 220))
        return res.status(200).json({
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
  } catch (err) {
    console.error('[api/post/[slug]]', err)
    res.status(500).json({ error: 'server_error' })
  }
}
