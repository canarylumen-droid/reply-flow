import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
  title: string
  slug: string
  content: string // HTML
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  publishedAt?: Date
  hash?: string
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  content: { type: String, required: true },
  description: { type: String },
  keywords: { type: [String], default: [] },
  ogImage: { type: String },
  canonicalUrl: { type: String },
  publishedAt: { type: Date },
  hash: { type: String, index: true }
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
