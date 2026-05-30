import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from './Icons'
import Navbar from './Navbar'
import Footer from './Footer'

const API_BASE = import.meta.env.VITE_BLOG_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '')

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch { return 'dark' }
}

function formatDate(str) {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d)) return str
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function seedViews(slug) {
  const n = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return 140 + (n % 360)
}

const BlogIndex = () => {
  const [posts, setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [theme, setTheme]   = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.title = 'Blog — ReplyFlow | AI Lead Follow-Up & Sales Automation'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', 'Expert insights on AI lead follow-up automation, sales response time, lost lead recovery, and revenue systems for agencies.')
  }, [])

  useEffect(() => {
    let mounted = true
    const fetch_ = async () => {
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
    fetch_()
    return () => { mounted = false }
  }, [])

  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Hero banner */}
      <div className="relative border-b border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-70 [mask-image:radial-gradient(ellipse_80%_100%_at_50%_0%,#000_50%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 pt-16 pb-14 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
              ReplyFlow Blog
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-bold tracking-tight mb-4 text-gray-900 dark:text-white leading-[1.15]">
              Insights That <span className="text-primary">Close Deals</span>
            </h1>
            <p className="text-[15px] sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              Deep-dives on AI lead follow-up, response time, lost lead recovery, and sales systems that actually convert for agencies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14">
        {loading ? (
          <div className="space-y-5">
            {[1,2,3].map(i => (
              <div key={i} className="h-36 bg-gray-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-base font-medium mb-1">No posts yet</p>
            <p className="text-sm">Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Latest Article</p>
                <a href={`/blog/${featured.slug}`}
                  className="group block rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50 p-6 sm:p-8 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    {featured.publishedAt && (
                      <span className="text-[12px] text-gray-400">{formatDate(featured.publishedAt)}</span>
                    )}
                    {featured.readingTime && (
                      <span className="text-[12px] text-gray-400">· {featured.readingTime} min read</span>
                    )}
                    <span className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-semibold">Latest</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-syne font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5 line-clamp-2">
                    {featured.description || featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </motion.div>
            )}

            {/* More articles */}
            {rest.length > 0 && (
              <>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">More Articles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rest.map((p, i) => (
                    <motion.a
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="group block rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-900/30 p-5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {p.publishedAt && <span className="text-[11px] text-gray-400">{formatDate(p.publishedAt)}</span>}
                        {p.readingTime  && <span className="text-[11px] text-gray-400">· {p.readingTime} min</span>}
                        <span className="text-[11px] text-gray-300 dark:text-gray-600">
                          · {(seedViews(p.slug) + parseInt(
                            (typeof localStorage !== 'undefined' ? localStorage.getItem(`rf_views_${p.slug}`) : null) || '0'
                          )).toLocaleString()} reads
                        </span>
                      </div>
                      <h3 className="text-base font-syne font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors leading-snug mb-2">
                        {p.title}
                      </h3>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {p.description || p.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary">
                        Read <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 sm:p-10 rounded-3xl bg-gray-900 dark:bg-zinc-900 border border-white/5 text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-purple-600/5 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Built for Agencies</p>
            <h3 className="text-xl sm:text-2xl font-syne font-bold mb-3">
              Install an AI Follow-Up System in 72 Hours
            </h3>
            <p className="text-gray-400 mb-7 max-w-md mx-auto text-sm leading-relaxed">
              Fully managed. Done for you. We handle setup, optimisation, and ongoing performance — you just close the meetings we book.
            </p>
            <a href="https://calendly.com/replyflow" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]">
              Book a Free Strategy Call <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default BlogIndex
