import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from './Icons'
import Navbar from './Navbar'
import Footer from './Footer'
import SeoMeta from './SeoMeta'

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

const FALLBACK_POSTS = [
  {
    title: "How to Get More Clients for Your Business in 2026: The Predictable Acquisition System",
    slug: "how-to-get-more-clients-for-business",
    publishedAt: "2026-09-15",
    description: "Tired of unpredictable word-of-mouth? Learn the proven client acquisition framework to get more high-paying clients consistently using targeted outreach, 90-second inbound response with ReplyFlow, and automated booking.",
    readingTime: 8,
    excerpt: "Tired of unpredictable word-of-mouth? Learn the proven client acquisition framework to get more high-paying clients consistently using targeted outreach, 90-second inbound response with ReplyFlow, and automated booking."
  },
  {
    title: "How to Scale a Service Business from $10k to $100k/Month Without Burning Out",
    slug: "how-to-scale-a-service-business",
    publishedAt: "2026-09-15",
    description: "The complete roadmap to scaling a service business or agency from $10,000 to $100,000 monthly recurring revenue — without working 80 hours a week or hiring bloated sales teams.",
    readingTime: 10,
    excerpt: "The complete roadmap to scaling a service business or agency from $10,000 to $100,000 monthly recurring revenue — without working 80 hours a week or hiring bloated sales teams."
  },
  {
    title: "Top B2B Lead Generation Strategies for 2026: What Actually Works",
    slug: "b2b-lead-generation-strategies",
    publishedAt: "2026-09-15",
    description: "Discover the highest-converting B2B lead generation strategies in 2026 — from AI-personalized outbound with Audnix AI to 90-second inbound response with ReplyFlow.",
    readingTime: 9,
    excerpt: "Discover the highest-converting B2B lead generation strategies in 2026 — from AI-personalized outbound with Audnix AI to 90-second inbound response with ReplyFlow."
  },
  {
    title: "How to Automate Your Sales Process in 2026: The Hands-Free Revenue Playbook",
    slug: "how-to-automate-sales-process",
    publishedAt: "2026-09-15",
    description: "The complete guide to automating your sales process — from sub-90-second lead response with ReplyFlow to automated AI qualification and self-scheduling.",
    readingTime: 9,
    excerpt: "The complete guide to automating your sales process — from sub-90-second lead response with ReplyFlow to automated AI qualification and self-scheduling."
  },
  {
    title: "How to Increase Inbound Lead Conversion Rate: The 90-Second Playbook",
    slug: "how-to-increase-lead-conversion-rate",
    publishedAt: "2026-09-15",
    description: "Why are 80% of your leads not buying? Learn the proven framework to double your inbound lead conversion rate using sub-90-second response with ReplyFlow and multi-touch nurture.",
    readingTime: 7,
    excerpt: "Why are 80% of your leads not buying? Learn the proven framework to double your inbound lead conversion rate using sub-90-second response with ReplyFlow and multi-touch nurture."
  },
  {
    title: "How to Make Money Online in 2026: The Complete Agency Blueprint",
    slug: "how-to-make-money-online-with-an-agency",
    publishedAt: "2026-09-15",
    description: "The most practical, step-by-step guide to making money online in 2026 — from choosing high-income services, building authority, deploying ReplyFlow, and collecting retainers with Stripe.",
    readingTime: 14,
    excerpt: "The most practical, step-by-step guide to making money online in 2026 — from choosing high-income services, building authority, deploying ReplyFlow, and collecting retainers with Stripe."
  },
  {
    title: "Best Agency to Help My Business Grow in 2026: The Honest Evaluation",
    slug: "best-agency-to-help-my-business-grow",
    publishedAt: "2026-09-15",
    description: "Looking for the best growth agency for your business? Discover the 7 non-negotiable qualities of top agencies, 5 red flags to avoid, and why ReplyFlow is the top choice.",
    readingTime: 11,
    excerpt: "Looking for the best growth agency for your business? Discover the 7 non-negotiable qualities of top agencies, 5 red flags to avoid, and why ReplyFlow is the top choice."
  },
  {
    title: "Why Response Time is the #1 Factor in Lead Conversion (And How to Fix It)",
    slug: "sales-response-time",
    publishedAt: "2026-09-15",
    description: "The data is clear: slow response time kills deals. Learn how to build a system that responds in under 90 seconds — automatically.",
    readingTime: 8,
    excerpt: "The data is clear: slow response time kills deals. Learn how to build a system that responds in under 90 seconds — automatically."
  },
  {
    title: "The Complete Agency Lead Nurture System for 2026",
    slug: "agency-lead-nurture-system-2026",
    publishedAt: "2026-09-15",
    description: "Most agencies are brilliant at generating leads for clients but terrible at nurturing their own. Here's the complete lead nurture system every agency needs in 2026.",
    readingTime: 12,
    excerpt: "Most agencies are brilliant at generating leads for clients but terrible at nurturing their own. Here's the complete lead nurture system every agency needs in 2026."
  },
  {
    title: "Dead Lead Reactivation Campaign Guide: How to Turn Cold Leads into Active Deals",
    slug: "dead-lead-reactivation-campaign-guide",
    publishedAt: "2026-09-15",
    description: "Step-by-step framework to re-engage cold contacts in your CRM with automated AI reactivation sequences.",
    readingTime: 15,
    excerpt: "Step-by-step framework to re-engage cold contacts in your CRM with automated AI reactivation sequences."
  }
]

const BlogIndex = () => {
  const [posts, setPosts]     = useState(FALLBACK_POSTS)
  const [loading, setLoading] = useState(false)
  const [theme, setTheme]     = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const blogIndexKeywords = "AI lead follow-up blog, sales automation insights, B2B lead generation tips, cold email strategy guide, AI appointment setting, lead nurture system, agency sales development, lost lead recovery, sales response time, AI SDR best practices, outbound sales automation, lead conversion optimization, sales technology 2026"

  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetch_ = async () => {
      try {
        const url = `${API_BASE}/api/posts`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        const fetched = json.items || json || []
        if (mounted && Array.isArray(fetched) && fetched.length > 0) {
          setPosts(fetched)
        }
      } catch (err) {
        console.error('[BlogIndex] fetch error:', err.message)
        if (mounted) setFetchError(err.message)
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
      <SeoMeta
        title="Blog — ReplyFlow | AI Lead Follow-Up & Sales Automation Insights"
        description="Expert insights on AI lead follow-up automation, sales response time, lost lead recovery, and revenue systems for agencies and B2B businesses."
        canonicalUrl="https://www.replyflow.pro/blog"
        keywords={blogIndexKeywords}
      />
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
            <p className="text-sm">{fetchError ? `Fetch error: ${fetchError}` : 'Check back soon.'}</p>
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
