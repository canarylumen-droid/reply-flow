import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, BrainIcon } from './Icons'

const GUIDES = [
  {
    title: "How to Get More Clients for Your Business in 2026",
    slug: "how-to-get-more-clients-for-business",
    category: "Client Acquisition",
    readTime: "8 min read",
    desc: "The predictable 4-pillar system to break free from word-of-mouth and generate high-ticket clients on demand."
  },
  {
    title: "How to Scale a Service Business from $10k to $100k/Month",
    slug: "how-to-scale-a-service-business",
    category: "Agency Scale",
    readTime: "10 min read",
    desc: "How modern operators eliminate sales latency, automate follow-up, and double profit margins without hiring bloated SDR teams."
  },
  {
    title: "Top B2B Lead Generation Strategies for 2026",
    slug: "b2b-lead-generation-strategies",
    category: "B2B Lead Gen",
    readTime: "9 min read",
    desc: "Why traditional cold blasts are dead and how intent-driven outreach paired with 90-second response closes pipeline."
  },
  {
    title: "How to Increase Inbound Lead Conversion Rate (90-Sec Playbook)",
    slug: "how-to-increase-lead-conversion-rate",
    category: "Conversion Optimization",
    readTime: "7 min read",
    desc: "The mathematical levers to double closed deals from your existing traffic by eliminating response latency."
  },
  {
    title: "How to Automate Your Sales Process: Hands-Free Revenue",
    slug: "how-to-automate-sales-process",
    category: "Sales Automation",
    readTime: "9 min read",
    desc: "The 5-stage architecture from instant capture and conversational qualification to automated calendar booking."
  },
  {
    title: "Best Agency to Help My Business Grow in 2026",
    slug: "best-agency-to-help-my-business-grow",
    category: "Agency Selection",
    readTime: "11 min read",
    desc: "The 7 critical quality criteria, 5 red flags, and performance benchmarks to demand from a growth partner."
  }
]

const FeaturedGuides = () => {
  return (
    <section className="py-24 px-5 sm:px-12 lg:px-24 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <BrainIcon className="w-3.5 h-3.5" />
              <span>Growth Intelligence & Playbooks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-syne text-gray-900 dark:text-white tracking-tight">
              Actionable Strategies to <span className="text-primary">Scale Revenue</span>
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl text-base">
              Proven frameworks on speed-to-lead, AI sales automation, and client acquisition engineered for modern B2B businesses.
            </p>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-600 transition-colors group whitespace-nowrap"
          >
            <span>Explore All 24 Playbooks</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide, idx) => (
            <motion.a
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group flex flex-col justify-between p-7 rounded-2xl bg-gray-50 dark:bg-zinc-900/40 border border-gray-200/80 dark:border-white/5 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {guide.category}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500">{guide.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-syne group-hover:text-primary transition-colors leading-snug mb-3">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {guide.desc}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-200/60 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                <span>Read Full Playbook</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedGuides
