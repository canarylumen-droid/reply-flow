import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import slugify from 'slugify'
import { fileURLToPath } from 'url'
import { Post, initPostModel } from './models/Post.js'
import { parseMarkdownFile } from './utils/markdown.js'
import { notifyGoogleIndexing, notifyIndexNow } from './utils/indexing.js'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.join(__dirname, '..', '..', 'content', 'posts')

export let sequelize: Sequelize

export async function connectDB(): Promise<Sequelize> {
  const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_URL || 'mysql://root:root@localhost:3306/replyflow'
  const maxAttempts = 5
  let attempt = 0

  try {
    const masked = dbUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
    console.log('Connecting to MySQL:', masked.split('?')[0])
  } catch (e) { /* ignore */ }

  async function tryConnect(url: string): Promise<Sequelize> {
    const s = new Sequelize(url, { dialect: 'mysql', logging: false, pool: { max: 5, min: 0, acquire: 30000, idle: 10000 } })
    await s.authenticate()
    return s
  }

  while (attempt < maxAttempts) {
    try {
      attempt++
      sequelize = await tryConnect(dbUrl)
      console.log('MySQL connected')
      initPostModel(sequelize)
      await sequelize.sync()
      console.log('MySQL tables synced')
      return sequelize
    } catch (err: any) {
      const msg = (err as Error).message.toLowerCase()
      if (msg.includes('unknown database') || msg.includes('database doesn\'t exist')) {
        console.log('Database does not exist — creating it...')
        try {
          const noDbUrl = dbUrl.replace(/\/\d+$/, '').replace(/\/[^/]+$/, '/mysql')
          const tempSeq = new Sequelize(noDbUrl, { dialect: 'mysql', logging: false })
          await tempSeq.authenticate()
          const dbName = dbUrl.split('/').pop()!.split('?')[0]
          await tempSeq.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`)
          await tempSeq.close()
          sequelize = await tryConnect(dbUrl)
          console.log('MySQL connected after creating database')
          initPostModel(sequelize)
          await sequelize.sync()
          console.log('MySQL tables synced')
          return sequelize
        } catch (createErr) {
          console.error('Failed to create database:', (createErr as Error).message)
          throw createErr
        }
      }
      console.error(`MySQL connect attempt ${attempt} failed:`, msg)
      if (attempt >= maxAttempts) throw err
      const backoff = 1000 * Math.pow(2, attempt - 1)
      console.log(`Retrying in ${backoff}ms...`)
      await new Promise(resolve => setTimeout(resolve, backoff))
    }
  }
  throw new Error('Could not connect to MySQL')
}

export async function disconnectDB() {
  if (sequelize) await sequelize.close()
}

function sha256(text: string) {
  return crypto.createHash('sha256').update(text).digest('hex')
}

function makeSlug(mdData: any, filename: string) {
  if (mdData.slug) return mdData.slug
  if (mdData.title) return slugify(mdData.title, { lower: true, strict: true })
  return slugify(path.basename(filename, path.extname(filename)), { lower: true, strict: true })
}

async function syncOne(filePath: string) {
  const parsed = await parseMarkdownFile(filePath)
  const fileHash = sha256(parsed.data.title + '\n' + parsed.content)
  const slug = makeSlug(parsed.data, path.basename(filePath))

  const existing = await Post.findOne({ where: { slug } })
  const shouldNotify = !existing || existing.hash !== fileHash

  const keywords = parsed.data.keywords || parsed.data.tags || ''
  const kwStr = Array.isArray(keywords) ? keywords.join(', ') : String(keywords)

  const doc = {
    title: parsed.data.title || slug,
    slug,
    content: parsed.html,
    description: parsed.data.description || parsed.content.slice(0, 160),
    keywords: kwStr,
    ogImage: parsed.data.ogImage || '',
    canonicalUrl: parsed.data.canonicalUrl || '',
    publishedAt: parsed.data.date ? new Date(parsed.data.date) : new Date(),
    hash: fileHash,
  }

  if (existing) {
    await Post.update(doc, { where: { slug } })
  } else {
    await Post.create(doc)
  }

  const canonical = doc.canonicalUrl || `https://www.replyflow.pro/blog/${slug}`
  if (shouldNotify && canonical) {
    notifyGoogleIndexing(canonical).catch(() => {})
    notifyIndexNow(canonical).catch(() => {})
  }
}

export async function syncAll() {
  const postsPath = POSTS_DIR
  if (!fs.existsSync(postsPath)) {
    console.log('No posts directory found at', postsPath)
    return
  }
  const files = fs.readdirSync(postsPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
  for (const file of files) {
    try {
      await syncOne(path.join(postsPath, file))
    } catch (err) {
      console.error('Failed to sync', file, (err as Error).message)
    }
  }
}

export function watchPosts() {
  const postsPath = POSTS_DIR
  if (!fs.existsSync(postsPath)) return

  let timer: NodeJS.Timeout | null = null
  const debouncedSync = (file?: string) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(async () => {
      try {
        if (file) {
          await syncOne(path.join(postsPath, file))
        } else {
          await syncAll()
        }
      } catch (err) {
        console.error('Watch-sync error:', (err as Error).message)
      }
    }, 300)
  }

  fs.watch(postsPath, { persistent: true }, (eventType, filename) => {
    if (filename) debouncedSync(filename)
    else debouncedSync()
  })
  console.log('Watching posts directory for changes:', postsPath)
}
