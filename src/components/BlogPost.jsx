import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from './Icons'
import Navbar from './Navbar'

const API_BASE = import.meta.env.VITE_BLOG_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4000'))

const BlogPost = ({ slug }) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState('dark')

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

  if (loading) return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="px-6 py-12 max-w-3xl mx-auto text-gray-400">Loading…</div>
    </>
  )
  if (error) return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="px-6 py-12 max-w-3xl mx-auto text-center">
        <p className="mb-4 text-gray-400">Could not load post.</p>
        <a href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors">Back to blog <ArrowRightIcon className="w-4 h-4" /></a>
      </div>
    </>
  )

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="min-h-screen py-12 bg-black text-white">
        <article className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-syne font-bold mb-4 text-white">{post.title}</h1>
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-800">
            <img src="https://replyflow.pro/reply_flow_logo.png" alt="Reply Flow" className="h-12 w-auto rounded-md" />
            <div>
              <div className="text-sm font-syne font-semibold text-white">Reply Flow</div>
              <div className="text-xs text-gray-500">Autonomous Sales Engine</div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <style>{`
              .prose { color: #e5e7eb; }
              .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { 
                color: #ffffff; 
                font-family: 'Syne', system-ui, sans-serif;
                font-weight: 600;
              }
              .prose h2 { font-size: 1.875rem; margin-top: 1.5em; margin-bottom: 0.5em; }
              .prose h3 { font-size: 1.5rem; margin-top: 1.5em; margin-bottom: 0.5em; }
              .prose a { color: #60a5fa; text-decoration: none; }
              .prose a:hover { color: #93c5fd; }
              .prose p { line-height: 1.8; margin-bottom: 1.25em; }
              .prose ul, .prose ol { margin-bottom: 1.25em; }
              .prose li { margin-bottom: 0.5em; }
              .prose blockquote { 
                border-left-color: #4b5563; 
                color: #d1d5db;
              }
              .prose code { 
                color: #fca5a5; 
                background: #1f2937; 
                padding: 0.125em 0.375em;
                border-radius: 0.25rem;
                font-family: 'Monaco', 'Courier New', monospace;
              }
              .prose pre { 
                background: #111827; 
                border: 1px solid #374151;
              }
            `}</style>
            <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <a href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors">
              Back to blog
            </a>
          </div>
        </article>
      </div>
    </>
  )
}

export default BlogPost
