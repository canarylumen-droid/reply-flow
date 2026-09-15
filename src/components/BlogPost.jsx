import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon } from './Icons'
import Navbar from './Navbar'
import Footer from './Footer'
import SeoMeta from './SeoMeta'

const API_BASE = import.meta.env.VITE_BLOG_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '')

const SITE = 'https://www.replyflow.pro'

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

const ALL_PLAYBOOKS = [
  {
    slug: 'how-to-get-more-clients-for-business',
    title: 'How to Get More Clients for Your Business in 2026: The Predictable Acquisition System',
    category: 'Client Acquisition',
    readingTime: 8,
    desc: 'The complete 4-pillar framework to break free from word-of-mouth and generate high-paying clients on demand.'
  },
  {
    slug: 'how-to-scale-a-service-business',
    title: 'How to Scale a Service Business from $10k to $100k/Month Without Burning Out',
    category: 'Agency Scale',
    readingTime: 10,
    desc: 'How modern operators eliminate sales latency, automate follow-up, and scale to $100k monthly recurring revenue.'
  },
  {
    slug: 'b2b-lead-generation-strategies',
    title: 'Top B2B Lead Generation Strategies for 2026: What Actually Works',
    category: 'B2B Lead Gen',
    readingTime: 9,
    desc: 'Why traditional cold blasts are dead and how intent-driven outreach paired with 90-second response closes pipeline.'
  },
  {
    slug: 'how-to-automate-sales-process',
    title: 'How to Automate Your Sales Process in 2026: The Hands-Free Revenue Playbook',
    category: 'Sales Automation',
    readingTime: 9,
    desc: 'The 5-stage architecture from instant capture and conversational qualification to automated calendar booking.'
  },
  {
    slug: 'how-to-increase-lead-conversion-rate',
    title: 'How to Increase Inbound Lead Conversion Rate: The 90-Second Playbook',
    category: 'Conversion Optimization',
    readingTime: 7,
    desc: 'The mathematical levers to double closed deals from your existing traffic by eliminating response latency.'
  },
  {
    slug: 'how-to-make-money-online-with-an-agency',
    title: 'How to Make Money Online in 2026: The Complete Agency Blueprint',
    category: 'Agency Blueprint',
    readingTime: 14,
    desc: 'Step-by-step guide to choosing high-income services, building authority, deploying ReplyFlow, and collecting retainers.'
  },
  {
    slug: 'best-agency-to-help-my-business-grow',
    title: 'Best Agency to Help My Business Grow in 2026: The Honest Evaluation',
    category: 'Growth Agency',
    readingTime: 11,
    desc: 'The 7 non-negotiable qualities, 5 red flags, and performance benchmarks to demand from a growth partner.'
  },
  {
    slug: 'how-to-convert-leads-into-customers',
    title: 'How to Convert Leads into Customers: The Complete Guide',
    category: 'Lead Conversion',
    readingTime: 12,
    desc: 'The step-by-step conversion framework from first touchpoint to signed contract.'
  },
  {
    slug: 'sales-response-time',
    title: 'Why Response Time is the #1 Factor in Lead Conversion',
    category: 'Speed to Lead',
    readingTime: 8,
    desc: 'Why 78% of deals go to the first to respond and how to automate 90-second response times.'
  },
  {
    slug: 'how-to-generate-sales-for-clients',
    title: 'How to Generate Sales for Your Clients: Agency Blueprint',
    category: 'Client Results',
    readingTime: 10,
    desc: 'The client fulfillment framework that drives measurable revenue outcomes and eliminates client churn.'
  },
  {
    slug: 'how-to-generate-more-sales-for-business',
    title: 'How to Generate More Sales for Your Business in 2026',
    category: 'Revenue Growth',
    readingTime: 10,
    desc: 'Four revenue levers to scale any high-ticket service business without burning out.'
  },
  {
    slug: 'dead-lead-reactivation-campaign-guide',
    title: 'Dead Lead Reactivation Campaign Guide: Revive Cold Leads',
    category: 'Revenue Recovery',
    readingTime: 15,
    desc: 'Step-by-step framework to re-engage cold contacts in your CRM with automated AI sequences.'
  },
  {
    slug: 'dead-lead-recovery',
    title: 'How to Recover Revenue from Dead Leads with AI Automation',
    category: 'Lead Recovery',
    readingTime: 7,
    desc: 'Turn your forgotten CRM leads into booked sales calls using automated 7-touch AI sequences.'
  },
  {
    slug: 'AI-for-lead-followup',
    title: 'AI for Lead Follow-Up: Why AI Outperforms Human Sales Teams',
    category: 'AI Sales',
    readingTime: 6,
    desc: 'The operational mechanics of replacing human follow-up latency with always-on conversational AI.'
  },
  {
    slug: 'agency-lead-nurture-system-2026',
    title: 'The Complete Agency Lead Nurture System for 2026',
    category: 'Lead Nurture',
    readingTime: 12,
    desc: 'Stop losing clients to competitors who reply faster with a multi-touch automated nurture architecture.'
  },
  {
    slug: 'ai-appointment-setting-book-more-calls',
    title: 'AI Appointment Setting: How to Book 2â€“3x More Sales Calls',
    category: 'Appointment Setting',
    readingTime: 10,
    desc: 'How AI agents qualify inbound leads and book discovery calls automatically around the clock.'
  },
  {
    slug: 'ai-sdr-replace-sales-rep-2026',
    title: 'Will AI SDRs Replace Sales Reps in 2026? The Real Math',
    category: 'AI SDRs',
    readingTime: 11,
    desc: 'A data-backed breakdown of AI SDR performance vs. human sales development representatives.'
  },
  {
    slug: 'cold-email-ai-2026-complete-guide',
    title: 'Cold Email + AI in 2026: The Complete Playbook',
    category: 'Cold Outreach',
    readingTime: 14,
    desc: 'Everything you need to know about deliverability, AI copy generation, and multi-channel outreach.'
  },
  {
    slug: 'why-most-businesses-fail-with-high-traffic',
    title: 'Why Most Businesses Fail Even with High Traffic',
    category: 'Conversion Optimization',
    readingTime: 11,
    desc: 'Why pageviews do not equal profit and how to fix the invisible leaks in your sales funnel.'
  },
  {
    slug: 'how-to-fix-leaky-sales-funnel',
    title: 'How to Fix a Leaky Sales Funnel: The 5 Invisible Revenue Leaks',
    category: 'Funnel Optimization',
    readingTime: 9,
    desc: 'Diagnose and patch the 5 invisible sales funnel leaks draining your pipeline and double closed revenue.'
  },
  {
    slug: 'speed-to-lead-statistics-benchmarks-2026',
    title: 'Speed to Lead Statistics & Benchmarks for 2026: Why 90 Seconds Wins',
    category: 'Speed to Lead',
    readingTime: 8,
    desc: 'The definitive data study on response time vs conversion rate: why 90 seconds gives you a 391% advantage.'
  },
  {
    slug: 'inbound-lead-qualification-framework',
    title: 'Inbound Lead Qualification Framework: Filter Tire-Kickers in 90s',
    category: 'Lead Qualification',
    readingTime: 9,
    desc: 'How to eliminate wasted discovery calls, qualify inbound buyers via conversational AI, and protect your calendar.'
  },
  {
    slug: 'lead-nurture-email-sequences-templates',
    title: 'High-Converting Lead Nurture Email Sequences: 7 Battle-Tested Templates',
    category: 'Lead Nurture',
    readingTime: 12,
    desc: 'Copy and deploy 7 proven follow-up templates that revive ghosted leads and turn cold CRM contacts into sales calls.'
  },
  {
    slug: 'ai-sales-pipeline-management',
    title: 'AI Sales Pipeline Management: How Autonomous Systems Manage Deals 24/7',
    category: 'Pipeline Automation',
    readingTime: 10,
    desc: 'Automate lead routing, instant qualification, objective stage scoring, and zero-drop nurture with AI.'
  }
]

const TOPIC_NEXT_MAP = {
  'how-to-make-money-online-with-an-agency': 'how-to-scale-a-service-business',
  'how-to-scale-a-service-business': 'how-to-get-more-clients-for-business',
  'how-to-get-more-clients-for-business': 'how-to-increase-lead-conversion-rate',
  'how-to-increase-lead-conversion-rate': 'sales-response-time',
  'sales-response-time': 'how-to-automate-sales-process',
  'how-to-automate-sales-process': 'b2b-lead-generation-strategies',
  'b2b-lead-generation-strategies': 'best-agency-to-help-my-business-grow',
  'best-agency-to-help-my-business-grow': 'how-to-convert-leads-into-customers',
  'how-to-convert-leads-into-customers': 'how-to-generate-sales-for-clients',
  'how-to-generate-sales-for-clients': 'how-to-generate-more-sales-for-business',
  'how-to-generate-more-sales-for-business': 'dead-lead-reactivation-campaign-guide',
  'dead-lead-reactivation-campaign-guide': 'dead-lead-recovery',
  'dead-lead-recovery': 'AI-for-lead-followup',
  'AI-for-lead-followup': 'ai-appointment-setting-book-more-calls',
  'ai-appointment-setting-book-more-calls': 'ai-sdr-replace-sales-rep-2026',
  'ai-sdr-replace-sales-rep-2026': 'cold-email-ai-2026-complete-guide',
  'cold-email-ai-2026-complete-guide': 'agency-lead-nurture-system-2026',
  'agency-lead-nurture-system-2026': 'why-most-businesses-fail-with-high-traffic',
  'why-most-businesses-fail-with-high-traffic': 'how-to-fix-leaky-sales-funnel',
  'how-to-fix-leaky-sales-funnel': 'speed-to-lead-statistics-benchmarks-2026',
  'speed-to-lead-statistics-benchmarks-2026': 'inbound-lead-qualification-framework',
  'inbound-lead-qualification-framework': 'lead-nurture-email-sequences-templates',
  'lead-nurture-email-sequences-templates': 'ai-sales-pipeline-management',
  'ai-sales-pipeline-management': 'how-to-make-money-online-with-an-agency'
}

function getRecommendations(currentSlug) {
  const others = ALL_PLAYBOOKS.filter(p => p.slug !== currentSlug)
  const mappedTarget = TOPIC_NEXT_MAP[currentSlug]
  let nextPost = others.find(p => p.slug === mappedTarget)
  if (!nextPost) {
    const currIdx = ALL_PLAYBOOKS.findIndex(p => p.slug === currentSlug)
    nextPost = currIdx > -1 ? ALL_PLAYBOOKS[(currIdx + 1) % ALL_PLAYBOOKS.length] : others[0]
  }
  const remaining = others.filter(p => p.slug !== nextPost.slug)
  const relatedPosts = remaining.slice(0, 3)
  const sidebarPosts = remaining.slice(0, 5)
  return { nextPost, relatedPosts, sidebarPosts }
}

const BlogPost = ({ slug }) => {
  const [post, setPost]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [theme, setTheme]     = useState(getInitialTheme)
  const [copied, setCopied]   = useState(false)
  const [views, setViews]     = useState(0)
  const [seoProps, setSeoProps] = useState(null)
  const [dismissedFloating, setDismissedFloating] = useState(false)
  const [showFloatingNext, setShowFloatingNext] = useState(false)

  const { nextPost, relatedPosts, sidebarPosts } = getRecommendations(slug)

  useEffect(() => {
    const handleScroll = () => {
      if (dismissedFloating) return
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      const currentProgress = window.scrollY / totalHeight
      if (currentProgress > 0.55) {
        setShowFloatingNext(true)
      } else {
        setShowFloatingNext(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissedFloating])

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
          title: `${data.title} â€” ReplyFlow`,
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

  /* â”€â”€ Loading skeleton â”€â”€ */
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

  /* â”€â”€ Error state â”€â”€ */
  if (error) return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-28 text-center">
        <p className="text-4xl mb-4">ðŸ”</p>
        <h1 className="text-2xl font-syne font-bold text-gray-900 dark:text-white mb-3">Article Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">This article may have moved or the link is incorrect.</p>
        <a href="/blog" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all">
          â† Back to Blog
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      {seoProps && <SeoMeta {...seoProps} />}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* â”€â”€ Article header â€” full width, expands on desktop â”€â”€ */}
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
                <span className="opacity-30">Â·</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
            {views > 0 && (
              <>
                <span className="opacity-30">Â·</span>
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
                <p className="text-[11px] text-gray-400">replyflow.pro Â· AI Sales Automation</p>
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

      {/* â”€â”€ Two-column desktop layout â”€â”€ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <div className="flex gap-12 xl:gap-16 items-start">

          {/* â”€â”€ Main article column â”€â”€ */}
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

            {/* â”€â”€ Bottom share strip â”€â”€ */}
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

            {/* â”€â”€ CTA inside article â”€â”€ */}
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
                      â† More Articles
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* â”€â”€ Up Next: Next Recommended Article â”€â”€ */}
            {nextPost && (
              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Up Next For You
                  </span>
                  <span className="text-[12px] text-gray-400 dark:text-gray-500">Recommended follow-up read</span>
                </div>

                <a
                  href={`/blog/${nextPost.slug}`}
                  className="group block p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900/70 dark:to-zinc-900/30 border border-gray-200 dark:border-white/10 hover:border-primary/40 dark:hover:border-primary/40 shadow-lg hover:shadow-xl hover:shadow-primary/5 transition-all relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                    <span className="font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                      {nextPost.category}
                    </span>
                    <span className="text-gray-400">Â·</span>
                    <span className="text-gray-400 dark:text-gray-400">{nextPost.readingTime} min read</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-syne text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight mb-3">
                    {nextPost.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-6">
                    {nextPost.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary px-5 py-2.5 rounded-full group-hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                    <span>Read Next Playbook</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </div>
            )}

            {/* â”€â”€ More Curated Playbooks â”€â”€ */}
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">More Growth Playbooks</p>
                <a href="/blog" className="text-xs font-semibold text-primary hover:underline">
                  All 24 Guides â†’
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map(p => (
                  <a
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col justify-between p-4 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-900/30 hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-zinc-900/60 transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {p.category}
                      </span>
                      <p className="text-[13px] font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors leading-snug mt-1 line-clamp-2">
                        {p.title}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
                      <span>{p.readingTime} min</span>
                      <span className="text-primary font-semibold group-hover:translate-x-0.5 transition-transform">Read â†’</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.article>

          {/* â”€â”€ Sticky sidebar â€” desktop only â”€â”€ */}
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
                  Book a Free Call â†’
                </a>
              </div>
            </div>

            {/* Related posts */}
            <div className="rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/40 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Related Articles</p>
              <div className="flex flex-col gap-3">
                {sidebarPosts.map(p => (
                  <a key={p.slug} href={`/blog/${p.slug}`}
                    className="group flex items-start gap-2.5 py-2.5 border-b border-gray-100 dark:border-white/5 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[5px] shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-[12px] text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors leading-snug font-medium">
                      {p.title}
                    </span>
                  </a>
                ))}
              </div>
              <a href="/blog" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:opacity-75 transition-opacity">
                View all 24 playbooks â†’
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

      {/* â”€â”€ Floating Up-Next Toast when scrolling near the end â”€â”€ */}
      <AnimatePresence>
        {showFloatingNext && nextPost && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-sm sm:max-w-md bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-black/25 flex items-start gap-3.5"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
              <span className="text-base">ðŸ“–</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Finished Reading? Up Next</span>
                <button
                  onClick={() => setDismissedFloating(true)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs p-0.5 rounded transition-colors"
                  aria-label="Close"
                >
                  âœ•
                </button>
              </div>
              <p className="text-[13px] font-bold font-syne text-gray-900 dark:text-white truncate">
                {nextPost.title}
              </p>
              <div className="mt-2.5 flex items-center gap-3">
                <a
                  href={`/blog/${nextPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary px-3.5 py-1.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30"
                >
                  <span>Read Next Guide</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </a>
                <span className="text-[11px] text-gray-400">{nextPost.readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default BlogPost
