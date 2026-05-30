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

const BlogPost = ({ slug }) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE}/api/post/${encodeURIComponent(slug)}`)
        if (!res.ok) throw new Error('post_not_found')
        const data = await res.json()
        setPost(data)

        document.title = `${data.title} — ReplyFlow Blog`
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc && data.description) metaDesc.setAttribute('content', data.description)
        const ogTitle = document.querySelector('meta[property="og:title"]')
        if (ogTitle) ogTitle.setAttribute('content', data.title + ' — ReplyFlow')
        const ogDesc = document.querySelector('meta[property="og:description"]')
        if (ogDesc && data.description) ogDesc.setAttribute('content', data.description)
        if (data.canonicalUrl) {
          let canonical = document.querySelector('link[rel="canonical"]')
          if (!canonical) {
            canonical = document.createElement('link')
            canonical.setAttribute('rel', 'canonical')
            document.head.appendChild(canonical)
          }
          canonical.setAttribute('href', data.canonicalUrl)
        }

        const existingLd = document.querySelector('script[data-blog-post]')
        if (existingLd) existingLd.remove()
        const ld = document.createElement('script')
        ld.type = 'application/ld+json'
        ld.setAttribute('data-blog-post', '1')
        ld.text = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          description: data.description,
          datePublished: data.publishedAt,
          image: data.ogImage || 'https://replyflow.pro/reply_flow_logo.png',
          url: data.canonicalUrl || `https://replyflow.pro/blog/${data.slug}`,
          author: { '@type': 'Organization', name: 'ReplyFlow Agency', url: 'https://replyflow.pro' },
          publisher: { '@type': 'Organization', name: 'ReplyFlow Agency', logo: { '@type': 'ImageObject', url: 'https://replyflow.pro/reply_flow_logo.png' } }
        })
        document.head.appendChild(ld)
      } catch (err) {
        setError(err.message || 'fetch_error')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
    return () => {
      const ld = document.querySelector('script[data-blog-post]')
      if (ld) ld.remove()
    }
  }, [slug])

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 space-y-4 animate-pulse">
        <div className="h-8 bg-gray-100 dark:bg-zinc-800 rounded-xl w-1/3" />
        <div className="h-14 bg-gray-100 dark:bg-zinc-800 rounded-xl" />
        <div className="h-14 bg-gray-100 dark:bg-zinc-800 rounded-xl w-4/5" />
        <div className="h-4 bg-gray-100 dark:bg-zinc-800 rounded-xl w-2/5 mt-4" />
        <div className="h-px bg-gray-200 dark:bg-zinc-700 my-6" />
        {[1,2,3,4].map(i => <div key={i} className="h-4 bg-gray-100 dark:bg-zinc-800 rounded-lg" />)}
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-syne font-black text-gray-900 dark:text-white mb-3">Post Not Found</h1>
        <p className="text-gray-500 mb-8">This article might have moved or been removed.</p>
        <a href="/blog" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all">
          ← Back to Blog
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Post Header */}
      <div className="border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 pb-10">
          <a href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors font-semibold mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </a>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            {post.publishedAt && (
              <span className="text-sm text-gray-400">{formatDate(post.publishedAt)}</span>
            )}
            {post.readingTime && (
              <>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <span className="text-sm text-gray-400">{post.readingTime} min read</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-black leading-[1.12] tracking-tight text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              {post.description}
            </p>
          )}

          {/* Author */}
          <div className="flex items-center gap-3 mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-syne font-black text-sm shadow-lg shadow-primary/25">
              RF
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">ReplyFlow Agency</p>
              <p className="text-xs text-gray-400">Autonomous Sales Engine</p>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <article className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div
          className="blog-prose text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Post Footer / CTA */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
        <div className="rounded-3xl bg-gray-900 dark:bg-zinc-900 border border-white/5 p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none rounded-3xl" />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">Take the Next Step</p>
            <h3 className="text-2xl sm:text-3xl font-syne font-black mb-3 tracking-tight">
              Ready to Never Miss a Lead Again?
            </h3>
            <p className="text-gray-400 mb-7 text-sm leading-relaxed max-w-lg">
              Stop losing deals to slow follow-up. We'll install a fully managed AI Sales Department for your agency in 72 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://calendly.com/replyflow"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                Book a Free Strategy Call <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a
                href="/blog"
                className="inline-flex items-center justify-center gap-2 border border-white/10 text-gray-300 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-all"
              >
                ← More Articles
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BlogPost
