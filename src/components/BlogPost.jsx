import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from './Icons'
import Navbar from './Navbar'
import Footer from './Footer'
import SeoMeta from './SeoMeta'

const API_BASE = import.meta.env.VITE_BLOG_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '')

const SITE = 'https://replyflow.pro'

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
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

/* Deterministic seeded base so "views" look real from day one */
function seedViews(slug) {
  const n = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return 140 + (n % 360)
}

/* Share icons as inline SVG */
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const CopyIcon = ({ checked }) => checked ? (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
) : (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
)

const BlogPost = ({ slug }) => {
  const [post, setPost]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [theme, setTheme]     = useState(getInitialTheme)
  const [copied, setCopied]   = useState(false)
  const [views, setViews]     = useState(0)
  const [seoProps, setSeoProps] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  /* Track views */
  useEffect(() => {
    if (!slug) return
    const key = `rf_views_${slug}`
    const stored = parseInt(localStorage.getItem(key) || '0')
    const next = stored + 1
    localStorage.setItem(key, String(next))
    setViews(seedViews(slug) + next)
  }, [slug])

  /* Fetch post + inject SEO */
  useEffect(() => {
    if (!slug) { setLoading(false); setError('post_not_found'); return }

    const initial = typeof window !== 'undefined' ? window.__INITIAL_STATE__ : null
    const needsFetch = !initial || initial.slug !== slug

    if (!needsFetch) {
      setPost(initial)
      setLoading(false)
      return
    }

    const fetchPost = async () => {
      setLoading(true); setError(null)
      try {
        const res = await fetch(`${API_BASE}/api/post/${encodeURIComponent(slug)}`)
        if (!res.ok) throw new Error('post_not_found')
        const data = await res.json()
        setPost(data)

        const canonicalUrl = data.canonicalUrl || `${SITE}/blog/${data.slug}`
        setSeoProps({
          title: `${data.title} — ReplyFlow`,
          description: data.description,
          canonicalUrl,
          ogImage: data.ogImage || `${SITE}/reply_flow_logo.png`,
          ogType: 'article',
          keywords: data.tags || '',
          publishedTime: data.publishedAt,
          modifiedTime: data.updatedAt || data.publishedAt,
          tags: data.tags || '',
          breadcrumbs: [
            { name: 'Blog', item: `${SITE}/blog` },
            { name: data.title, item: canonicalUrl },
          ],
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${canonicalUrl}#article`,
            headline: data.title,
            name: data.title,
            description: data.description,
            datePublished: data.publishedAt,
            dateModified: data.updatedAt || data.publishedAt,
            image: {
              '@type': 'ImageObject',
              url: data.ogImage || `${SITE}/reply_flow_logo.png`,
              width: 1200,
              height: 630,
            },
            url: canonicalUrl,
            inLanguage: 'en-US',
            isPartOf: { '@type': 'Blog', name: 'ReplyFlow Blog', url: `${SITE}/blog` },
            author: {
              '@type': 'Organization',
              name: 'ReplyFlow Agency',
              url: SITE,
            },
            publisher: {
              '@type': 'Organization',
              '@id': `${SITE}/#organization`,
              name: 'ReplyFlow',
              logo: { '@type': 'ImageObject', url: `${SITE}/reply_flow_logo.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
            keywords: data.tags || '',
          },
        })
      } catch (err) {
        setError(err.message || 'fetch_error')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  const postUrl = `${SITE}/blog/${slug}`

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(postUrl) } catch { /* fallback */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = post ? [
    { label: 'X / Twitter', icon: <TwitterIcon />, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}&via=replyflow` },
    { label: 'LinkedIn',    icon: <LinkedInIcon />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}` },
    { label: 'WhatsApp',    icon: <WhatsAppIcon />, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + '\n' + postUrl)}` },
  ] : []

  /* ── Loading skeleton ── */
  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 space-y-4 animate-pulse">
        <div className="h-5 bg-gray-100 dark:bg-zinc-800 rounded-lg w-1/4" />
        <div className="h-10 bg-gray-100 dark:bg-zinc-800 rounded-xl" />
        <div className="h-10 bg-gray-100 dark:bg-zinc-800 rounded-xl w-5/6" />
        <div className="h-4 bg-gray-100 dark:bg-zinc-800 rounded-lg w-1/3 mt-4" />
        <div className="h-px bg-gray-200 dark:bg-zinc-800 my-8" />
        {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-100 dark:bg-zinc-800 rounded-md" style={{ width: `${75 + (i * 5) % 25}%` }} />)}
      </div>
    </div>
  )

  /* ── Error state ── */
  if (error) return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-28 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h1 className="text-2xl font-syne font-bold text-gray-900 dark:text-white mb-3">Article Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">This article may have moved or the link is incorrect.</p>
        <a href="/blog" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all">
          ← Back to Blog
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      {seoProps && <SeoMeta {...seoProps} />}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* ── Article header — full width, expands on desktop ── */}
      <header className="border-b border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 pb-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-gray-400 mb-7">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
            <span>/</span>
            <span className="text-gray-600 dark:text-gray-300 truncate max-w-[240px] sm:max-w-sm">{post.title}</span>
          </nav>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-5 text-[13px] text-gray-400">
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.readingTime && (
              <>
                <span className="opacity-30">·</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
            {views > 0 && (
              <>
                <span className="opacity-30">·</span>
                <span>{views.toLocaleString()} reads</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-syne font-bold leading-[1.15] text-gray-900 dark:text-white mb-5 max-w-4xl">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-7 font-normal max-w-3xl">
              {post.description}
            </p>
          )}

          {/* Author + share row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-gray-200 dark:border-white/8">
            <div className="flex items-center gap-2.5 flex-1">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-syne font-bold text-[11px] shadow-md shadow-primary/20 shrink-0">
                RF
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-900 dark:text-white leading-tight">ReplyFlow Agency</p>
                <p className="text-[11px] text-gray-400">replyflow.pro · AI Sales Automation</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400 font-medium mr-1 hidden sm:block">Share</span>
              {shareLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Share on ${s.label}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-primary hover:border-primary/40 dark:hover:text-primary transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Two-column desktop layout ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <div className="flex gap-12 xl:gap-16 items-start">

          {/* ── Main article column ── */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="min-w-0 flex-1"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <meta itemProp="headline" content={post.title} />
            <meta itemProp="datePublished" content={post.publishedAt} />
            <meta itemProp="author" content="ReplyFlow Agency" />

            {/* Article body */}
            <div
              className="blog-prose"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ── Bottom share strip ── */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/40">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 flex-1">Found this useful? Share it with your team.</p>
                <div className="flex items-center gap-2">
                  {shareLinks.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/30 transition-all">
                      {s.icon} <span className="hidden sm:inline">{s.label}</span>
                    </a>
                  ))}
                  <button onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all ${copied ? 'border-emerald-300 text-emerald-600' : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/30'}`}>
                    <CopyIcon checked={copied} />
                    <span>{copied ? 'Copied!' : 'Copy link'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── CTA inside article ── */}
            <div className="mt-8 mb-4">
              <div className="rounded-3xl bg-gray-900 dark:bg-zinc-900 border border-white/5 p-8 sm:p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none rounded-3xl" />
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Take Action</p>
                  <h3 className="text-xl sm:text-2xl font-syne font-bold mb-3 leading-snug">
                    Ready to stop losing leads to slow follow-up?
                  </h3>
                  <p className="text-gray-400 mb-7 text-sm leading-relaxed">
                    We build and manage AI-powered lead follow-up systems for agencies. Fully done-for-you, deployed in 72 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://calendly.com/replyflow" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                      Book a Free Strategy Call <ArrowRightIcon className="w-4 h-4" />
                    </a>
                    <a href="/blog"
                      className="inline-flex items-center justify-center gap-2 border border-white/10 text-gray-300 px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/5 transition-all">
                      ← More Articles
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Internal links — more articles ── */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-5">More from the blog</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="/blog/ai-sdr-vs-human-sales-rep-2026" className="group block p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-primary/25 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all">
                  <p className="text-[13px] font-semibold text-gray-800 dark:text-white group-hover:text-primary transition-colors leading-snug">Will AI SDRs Replace Sales Reps in 2026?</p>
                  <p className="text-[11px] text-gray-400 mt-1">The shift from human to AI-powered outbound →</p>
                </a>
                <a href="/blog/cold-email-ai-2026-complete-guide" className="group block p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-primary/25 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all">
                  <p className="text-[13px] font-semibold text-gray-800 dark:text-white group-hover:text-primary transition-colors leading-snug">Cold Email + AI in 2026: The Complete Guide</p>
                  <p className="text-[11px] text-gray-400 mt-1">Everything you need to book more meetings →</p>
                </a>
                <a href="/blog/dead-lead-reactivation-campaign-guide" className="group block p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-primary/25 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all">
                  <p className="text-[13px] font-semibold text-gray-800 dark:text-white group-hover:text-primary transition-colors leading-snug">Dead Lead Reactivation Campaign Guide</p>
                  <p className="text-[11px] text-gray-400 mt-1">Win back cold leads that went silent →</p>
                </a>
                <a href="/blog/ai-appointment-setting-book-more-calls-2026" className="group block p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-primary/25 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all">
                  <p className="text-[13px] font-semibold text-gray-800 dark:text-white group-hover:text-primary transition-colors leading-snug">AI Appointment Setting: Book More Calls</p>
                  <p className="text-[11px] text-gray-400 mt-1">How AI fills your calendar automatically →</p>
                </a>
              </div>
              <a href="/blog" className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:opacity-80 transition-opacity">
                ← View all articles
              </a>
            </div>
          </motion.article>

          {/* ── Sticky sidebar — desktop only ── */}
          <aside className="hidden lg:flex flex-col gap-5 w-72 xl:w-80 shrink-0 sticky top-24 self-start">

            {/* CTA card */}
            <div className="rounded-2xl bg-gray-900 dark:bg-zinc-900 border border-white/5 p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/25 to-transparent pointer-events-none rounded-2xl" />
              <div className="relative z-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Free Strategy Call</p>
                <h3 className="text-[15px] font-syne font-bold mb-2 leading-snug">
                  Stop losing leads to slow follow-up
                </h3>
                <p className="text-gray-400 text-[12px] leading-relaxed mb-4">
                  AI lead follow-up system, deployed in 72 hours. No hiring needed.
                </p>
                <a href="https://calendly.com/replyflow" target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-primary text-white px-4 py-2.5 rounded-full font-semibold text-[12px] hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                  Book a Free Call →
                </a>
              </div>
            </div>

            {/* Related posts */}
            <div className="rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/40 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Related Articles</p>
              <div className="flex flex-col gap-3">
                {[
                  { href: '/blog/ai-sdr-vs-human-sales-rep-2026', title: 'Will AI SDRs Replace Sales Reps in 2026?' },
                  { href: '/blog/cold-email-ai-2026-complete-guide', title: 'Cold Email + AI in 2026: Complete Guide' },
                  { href: '/blog/dead-lead-reactivation-campaign-guide', title: 'Dead Lead Reactivation Campaign Guide' },
                  { href: '/blog/agency-lead-nurture-system-2026', title: 'Agency Lead Nurture System for 2026' },
                  { href: '/blog/sales-response-time-lead-conversion', title: 'Sales Response Time: Why Speed Wins Deals' },
                ].map(p => (
                  <a key={p.href} href={p.href}
                    className="group flex items-start gap-2.5 py-2.5 border-b border-gray-100 dark:border-white/5 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[5px] shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-[12px] text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors leading-snug font-medium">
                      {p.title}
                    </span>
                  </a>
                ))}
              </div>
              <a href="/blog" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:opacity-75 transition-opacity">
                View all articles →
              </a>
            </div>

            {/* Share card */}
            <div className="rounded-2xl border border-gray-100 dark:border-white/5 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Share this article</p>
              <div className="flex gap-2">
                {shareLinks.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-[11px] font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/30 transition-all">
                    {s.icon}
                  </a>
                ))}
                <button onClick={handleCopy}
                  className={`flex-1 flex items-center justify-center py-2 rounded-lg border text-[11px] font-medium transition-all ${copied ? 'border-emerald-300 text-emerald-600' : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/30'}`}>
                  <CopyIcon checked={copied} />
                </button>
              </div>
            </div>

          </aside>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BlogPost
