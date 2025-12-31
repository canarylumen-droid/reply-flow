import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { ArrowRightIcon, BrainIcon } from './Icons';

const Hero = () => {

  return (
    <section id='hero' className='relative min-h-[90vh] flex items-center justify-center p-6 sm:p-12 overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300'>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10'>

        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='flex flex-col gap-6 text-left'
        >
          <div className='flex items-center gap-2 text-primary font-semibold tracking-wide uppercase text-xs sm:text-sm'>
            <BrainIcon className="w-5 h-5" />
            <span>Premier Outcome-Driven Agency</span>
          </div>

          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight'>
            We Build Your <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>
              AI Sales Department
            </span>
          </h1>

          <p className='text-lg sm:text-x text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed'>
            We don't just sell software. We design, build, and manage fully autonomous <span className='font-semibold text-gray-800 dark:text-gray-200'>AI Sales Agents</span> that work 24/7 to fill your calendar with qualified meetings.
          </p>

          <div className='flex flex-wrap gap-4 pt-4'>
            <a
              href="https://calendly.com/replyflow"
              target="_blank"
              rel="noopener noreferrer"
              className='px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/50 flex items-center gap-2'
            >
              Get Your Free Audit
              <ArrowRightIcon className="w-5 h-5" />
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' })}
              className='px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all'
            >
              View Case Studies
            </motion.button>
          </div>

          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2'>
            Performance-based options available. 100% Done-For-You.
          </p>
        </motion.div>

        {/* Right: Live AI Dashboard Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='relative w-full h-[500px] sm:h-[600px] flex items-center justify-center'
        >
          <div className='relative w-full max-w-lg h-full'>

            {/* Main Dashboard Container */}
            <div className='absolute inset-0 bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden'>

              {/* Header Bar */}
              <div className='bg-zinc-800/50 border-b border-zinc-700 px-4 py-3 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='flex gap-1.5'>
                    <div className='w-3 h-3 rounded-full bg-red-500/80'></div>
                    <div className='w-3 h-3 rounded-full bg-yellow-500/80'></div>
                    <div className='w-3 h-3 rounded-full bg-green-500/80'></div>
                  </div>
                  <span className='text-xs text-zinc-400 ml-3 font-mono'>reply-flow-agent.ai</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
                  <span className='text-[10px] text-green-400 font-semibold'>LIVE</span>
                </div>
              </div>

              {/* Content Area */}
              <div className='p-6 space-y-4 h-[calc(100%-56px)] overflow-hidden'>

                {/* Real-time Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='grid grid-cols-3 gap-3'
                >
                  <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50'>
                    <div className='text-[10px] text-zinc-500 uppercase tracking-wider mb-1'>Active Leads</div>
                    <div className='text-2xl font-bold text-white'>247</div>
                  </div>
                  <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50'>
                    <div className='text-[10px] text-zinc-500 uppercase tracking-wider mb-1'>Response Time</div>
                    <div className='text-2xl font-bold text-green-400'>1.2s</div>
                  </div>
                  <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50'>
                    <div className='text-[10px] text-zinc-500 uppercase tracking-wider mb-1'>Booked Today</div>
                    <div className='text-2xl font-bold text-blue-400'>18</div>
                  </div>
                </motion.div>

                {/* Terminal-style Activity Log */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className='bg-black/40 rounded-lg p-4 border border-zinc-800 font-mono text-xs space-y-2 h-48 overflow-hidden'
                >
                  <div className='flex items-start gap-2'>
                    <span className='text-zinc-600'>14:23:41</span>
                    <span className='text-green-400'>✓</span>
                    <span className='text-zinc-300'>Lead <span className='text-blue-400'>Sarah M.</span> qualified → Intent: 92%</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-zinc-600'>14:23:38</span>
                    <span className='text-yellow-400'>⚡</span>
                    <span className='text-zinc-300'>Objection detected: "Price concern"</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-zinc-600'>14:23:35</span>
                    <span className='text-purple-400'>→</span>
                    <span className='text-zinc-300'>Sent: ROI breakdown + case study</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-zinc-600'>14:23:12</span>
                    <span className='text-green-400'>✓</span>
                    <span className='text-zinc-300'>Meeting booked: <span className='text-green-400'>John D.</span> → Jan 3, 2:30 PM</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-zinc-600'>14:22:58</span>
                    <span className='text-blue-400'>◆</span>
                    <span className='text-zinc-300'>New lead: <span className='text-blue-400'>Mike R.</span> from Instagram</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-zinc-600'>14:22:45</span>
                    <span className='text-purple-400'>→</span>
                    <span className='text-zinc-300'>Reactivation sent to 47 cold leads</span>
                  </div>
                </motion.div>

                {/* Live Conversation Preview */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className='bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/50'
                >
                  <div className='flex items-center gap-2 mb-3'>
                    <div className='w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center'>
                      <BrainIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className='text-xs font-semibold text-zinc-300'>AI Agent → John D.</span>
                    <span className='text-[10px] text-zinc-500 ml-auto'>Just now</span>
                  </div>
                  <div className='bg-blue-500/10 border border-blue-500/20 rounded-lg p-3'>
                    <p className='text-xs text-zinc-300 leading-relaxed'>
                      "Hi John! I noticed you checked out our pricing page earlier. Based on your business size, our Growth Partner model could add an estimated <span className='text-green-400 font-semibold'>$45k/month</span> in recovered revenue. Want to see a custom projection?"
                    </p>
                  </div>
                  <div className='mt-2 flex items-center gap-2 text-[10px] text-zinc-500'>
                    <span className='flex items-center gap-1'>
                      <div className='w-1.5 h-1.5 rounded-full bg-green-500'></div>
                      Delivered
                    </span>
                    <span>•</span>
                    <span>Personalized using: visit history, company size, industry</span>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Floating Accent Glow */}
            <div className='absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl -z-10'></div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}


export default Hero
