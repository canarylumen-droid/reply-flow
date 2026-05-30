import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from './Icons'

const API_BASE = import.meta.env.VITE_BLOG_API_URL || 'http://localhost:4000'

const BlogPost = ({ slug }) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE}/api/post/${encodeURIComponent(slug)}`)
        if (!res.ok) throw new Error('post_not_found')
        const data = await res.json()
        setPost(data)
      } catch (err) {
        setError(err.message || 'fetch_error')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  if (loading) return <div className="px-6 py-12 max-w-3xl mx-auto">Loading…</div>
  if (error) return (
    <div className="px-6 py-12 max-w-3xl mx-auto text-center">
      <p className="mb-4">Could not load post.</p>
      <a href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-bold">Back to blog <ArrowRightIcon className="w-4 h-4" /></a>
    </div>
  )

  return (
    <div className="min-h-screen py-8 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <header className="flex items-center gap-4 mb-4">
          <a href="/" className="flex items-center gap-3">
            <img src="https://www.replyflow.pro/reply_flow_logo.png" alt="Reply Flow" className="h-10 w-auto rounded-md" />
            <div>
              <div className="text-sm font-syne font-bold tracking-tight">Reply Flow</div>
              <div className="text-[11px] text-gray-500">Autonomous Sales Engine</div>
            </div>
          </a>
        </header>

        <article className="prose sm:prose md:prose-lg dark:prose-invert mx-auto">
          <h1 className="mt-2 mb-2 text-2xl sm:text-3xl font-syne font-black leading-tight">{post.title}</h1>
          <div className="prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  )
}

export default BlogPost
