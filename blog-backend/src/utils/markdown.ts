import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type ParsedMD = {
  data: any
  content: string
  html: string
}

export async function parseMarkdownFile(path: string): Promise<ParsedMD> {
  const raw = await readFile(path, 'utf-8')
  const parsed = matter(raw)
  const processed = await remark().use(html).process(parsed.content)
  return { data: parsed.data, content: parsed.content, html: String(processed) }
}
