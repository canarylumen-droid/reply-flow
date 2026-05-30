import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from './Icons'
import Navbar from './Navbar'
import Footer from './Footer'

const API_BASE = import.meta.env.VITE_BLOG_API_URL || (typeof window !== 'undefined' ? window.location.origin : '')

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function formatDate(str) {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d)) return str
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function readingTime(excerpt) {
  const words = (excerpt || '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 220))
}

const BlogIndex = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.title = 'Blog — ReplyFlow | AI Lead Follow-Up & Sales Automation Insights'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Expert insights on AI lead follow-up automation, sales response time, lost lead recovery, and revenue optimization for agencies.')
  }, [])

  useEffect(() => {
    let mounted = true
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/posts`)
        if (!res.ok) throw new Error('fetch_failed')
        const json = await res.json()
        if (mounted) setPosts(json.items || json || [])
      } catch (err) {
        console.error('Blog fetch error:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchPosts()
    return () => { mounted = false }
  }, [])

  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Hero */}
      <div className="relative border-b border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-60 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_100%,#000_40%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-black uppercase tracking-[0.3em] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            ReplyFlow Blog
          </div>
          <h1 className="text-4xl sm:text-6xl font-syne font-black tracking-tighter mb-4 text-gray-900 dark:text-white leading-[1.1]">
            Insights That <span className="text-primary">Close Deals</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Deep-dives on AI lead follow-up, response time, lost lead recovery, and building automated sales systems that actually convert.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-semibold mb-2">No posts yet</p>
            <p className="text-sm">Check back soon — we're writing.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <div className="mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-5">Latest Article</p>
                <a
                  href={`/blog/${featured.slug}`}
                  className="group block rounded-3xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/60 p-7 sm:p-10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {featured.publishedAt && (
                      <span className="text-xs text-gray-400 font-medium">{formatDate(featured.publishedAt)}</span>
                    )}
                    <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-bold">Featured</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200 leading-tight mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-base max-w-3xl line-clamp-3">
                    {featured.description || featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Read article
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            )}

            {/* Rest of posts */}
            {rest.length > 0 && (
              <>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">More Articles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {rest.map(p => (
                    <a
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group block rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-900/40 p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      {p.publishedAt && (
                        <p className="text-[11px] text-gray-400 font-medium mb-3">{formatDate(p.publishedAt)}</p>
                      )}
                      <h3 className="text-lg font-syne font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-3">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {p.description || p.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                        Read article
                        <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gray-900 dark:bg-zinc-900 border border-white/5 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/10 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Ready to Stop Losing Leads?</p>
            <h3 className="text-2xl sm:text-3xl font-syne font-black mb-3 tracking-tight">
              Install an AI Sales Department Today
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Every minute without a follow-up system is revenue walking out your door. Let's fix that in 72 hours.
            </p>
            <a
              href="https://calendly.com/replyflow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:scale-[1.02]"
            >
              Book a Free Strategy Call <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BlogIndex
