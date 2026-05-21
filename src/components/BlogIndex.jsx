import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from './Icons'

const API_BASE = import.meta.env.VITE_BLOG_API_URL || 'http://localhost:4000'

const BlogIndex = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/posts`)
        const json = await res.json()
        if (mounted) setPosts(json.items || [])
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchPosts()
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="px-6 py-12 max-w-3xl mx-auto">Loading posts…</div>

  return (
    <div className="min-h-screen py-8 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-syne font-black mb-4">Blog</h1>
        <div className="space-y-6">
          {posts.map(p => (
            <article key={p.slug} className="border-b border-gray-100 pb-4">
              <a href={`/blog/${p.slug}`} className="text-xl font-bold text-primary hover:underline">{p.title}</a>
              <p className="text-gray-700 mb-2">{p.excerpt}</p>
              <a href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary">Read article <ArrowRightIcon className="w-4 h-4" /></a>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogIndex
