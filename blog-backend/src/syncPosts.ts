import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import slugify from 'slugify'
import { fileURLToPath } from 'url'
import PostModel from './models/Post.js'
import { parseMarkdownFile } from './utils/markdown.js'
import { notifyGoogleIndexing, notifyIndexNow } from './utils/indexing.js'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MONGO = process.env.MONGO_URI || process.env.DATABASE_URL_MONGODB_URI || 'mongodb://localhost:27017/replyflow-blog'
const POSTS_DIR = path.join(__dirname, '..', '..', 'content', 'posts')

export async function connectDB() {
  return mongoose.connect(MONGO)
}

export async function disconnectDB() {
  return mongoose.disconnect()
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

  const existing: any = await PostModel.findOne({ slug }).lean()
  const shouldNotify = !existing || existing.hash !== fileHash

  const doc = {
    title: parsed.data.title || slug,
    slug,
    content: parsed.html,
    description: parsed.data.description || parsed.content.slice(0, 160),
    keywords: parsed.data.keywords || parsed.data.tags || [],
    ogImage: parsed.data.ogImage,
    canonicalUrl: parsed.data.canonicalUrl,
    publishedAt: parsed.data.date ? new Date(parsed.data.date) : new Date(),
    hash: fileHash
  }

  await PostModel.findOneAndUpdate({ slug }, doc, { upsert: true, new: true })

  if (shouldNotify && doc.canonicalUrl) {
    // fire-and-forget
    notifyGoogleIndexing(doc.canonicalUrl).catch(() => {})
    notifyIndexNow(doc.canonicalUrl).catch(() => {})
  }
}

export async function syncAll() {
  const postsPath = POSTS_DIR
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
    // filename can be null on some platforms
    if (filename) {
      debouncedSync(filename)
    } else {
      debouncedSync()
    }
  })
  console.log('Watching posts directory for changes:', postsPath)
}
