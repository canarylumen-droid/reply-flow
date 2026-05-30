import React, { useEffect, useState, useRef } from 'react'
import { motion } from "framer-motion";
import { ArrowRightIcon } from './Icons';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: '90s', label: 'Response Time' },
    { value: '78%', label: 'Leads Buy from First Responder' },
    { value: '5min', label: 'Before They Move On' },
  ];

  return (
    <section id='hero' className='relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden'>

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-[-10%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className='relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center pt-16 pb-12 sm:pt-24 sm:pb-16'>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='flex items-center gap-2 mb-6 sm:mb-8'
        >
          <div className='flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary'>
            <div className='w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,105,255,0.8)] animate-pulse' />
            <span className='text-[11px] font-black uppercase tracking-[0.35em] font-syne'>Elite Sales Infrastructure</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='text-[2.6rem] sm:text-6xl lg:text-[5.5rem] font-serif leading-[1.08] tracking-tight text-gray-900 dark:text-white max-w-4xl mb-6 sm:mb-8'
        >
          Let us worry about{' '}
          <br className="hidden sm:block" />
          <span className='italic relative inline-block'>
            your Problems
            <span className='absolute bottom-1 left-0 w-full h-3 sm:h-4 bg-primary/15 -z-10 rounded' />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className='text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-8 sm:mb-10'
        >
          We design, build, and manage high-fidelity AI Sales Departments for elite agencies.{' '}
          <span className='text-gray-700 dark:text-gray-200 font-semibold'>Capture every lead, handle every objection, book every meeting.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className='flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-12 sm:mb-16'
        >
          <a
            href="https://calendly.com/replyflow"
            target="_blank"
            rel="noopener noreferrer"
            className='w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]'
          >
            Book a FREE Call
            <ArrowRightIcon className="w-5 h-5" />
          </a>
          <a
            href="#pricing"
            className='w-full sm:w-auto px-8 py-4 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-full font-bold text-base hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2.5'
          >
            See Pricing
          </a>
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className='w-full max-w-2xl'
        >
          <p className='text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] font-bold mb-5 text-center'>
            Why speed wins every time
          </p>
          <div className='grid grid-cols-3 gap-3 sm:gap-6'>
            {stats.map((s, i) => (
              <div key={i} className='flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5'>
                <span className='text-xl sm:text-2xl lg:text-3xl font-black text-primary font-syne mb-1'>{s.value}</span>
                <span className='text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center leading-tight font-medium'>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-10" />
    </section>
  )
}

export default Hero
