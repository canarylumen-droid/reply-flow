import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from './Icons'
import Navbar from './Navbar'
import ThemeToggleBtn from './ThemeToggleBtn'

const API_BASE = import.meta.env.VITE_BLOG_API_URL || 'http://localhost:4000'

const BlogIndex = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

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

  if (loading) return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="px-6 py-12 max-w-3xl mx-auto text-gray-400">Loading posts…</div>
    </>
  )

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="min-h-screen py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-syne font-bold mb-2 text-white">Blog</h1>
          <p className="text-gray-400 mb-12 text-lg">Insights on AI automation, lead follow-up, and revenue recovery</p>
          <div className="space-y-8">
            {posts.map(p => (
              <article key={p.slug} className="border-b border-gray-800 pb-8 hover:border-gray-700 transition-colors">
                <a href={`/blog/${p.slug}`} className="block group">
                  <h2 className="text-2xl sm:text-3xl font-syne font-bold mb-3 text-white group-hover:text-gray-300 transition-colors">{p.title}</h2>
                </a>
                <p className="text-gray-400 mb-4 leading-relaxed text-base">{p.excerpt}</p>
                <a href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                  Read article <ArrowRightIcon className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogIndex
