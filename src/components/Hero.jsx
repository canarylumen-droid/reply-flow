import React from 'react'
import { motion } from "framer-motion";
import { ArrowRightIcon } from './Icons';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
})

const Hero = () => {
  const stats = [
    { value: '90s',  label: 'Response guarantee' },
    { value: '78%',  label: 'Buy from first responder' },
    { value: '5 min', label: 'Before intent fades' },
  ]

  return (
    <section id='hero' className='relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden'>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,#000_55%,transparent_100%)]" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-8%] w-[280px] h-[280px] bg-purple-500/4 rounded-full blur-[90px] pointer-events-none" />

      <div className='relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center pt-20 pb-16 sm:pt-28 sm:pb-20'>

        {/* Status badge */}
        <motion.div {...fade(0.05)} className='mb-7 sm:mb-8'>
          <div className='inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary'>
            <span className='w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(0,105,255,0.9)] animate-pulse inline-block' />
            <span className='text-[10px] font-bold uppercase tracking-[0.4em] font-syne'>Done-For-You AI Sales</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fade(0.15)}
          className='text-[2.5rem] sm:text-[3.6rem] lg:text-[4.75rem] font-serif leading-[1.1] tracking-tight text-gray-900 dark:text-white max-w-3xl mb-5 sm:mb-6'>
          We handle your
          <br className="hidden sm:block" />
          {' '}<span className='italic relative inline-block'>
            lead follow-up.
            <span className='absolute bottom-1 left-0 w-full h-2.5 sm:h-3.5 bg-primary/12 -z-10 rounded' />
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p {...fade(0.28)}
          className='text-[15px] sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mb-8 sm:mb-10'>
          We build, deploy, and manage AI sales systems for agencies.{' '}
          <span className='text-gray-700 dark:text-gray-200 font-medium'>Every lead responded to. Every objection handled. Every meeting booked.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.4)} className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-14 sm:mb-16'>
          <a
            href="https://calendly.com/replyflow"
            target="_blank"
            rel="noopener noreferrer"
            className='sm:w-auto px-8 py-3.5 bg-primary text-white rounded-full font-semibold text-[15px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]'
          >
            Book a Free Call
            <ArrowRightIcon className="w-4 h-4" />
          </a>
          <a
            href="#pricing"
            className='sm:w-auto px-8 py-3.5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 rounded-full font-semibold text-[15px] hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center'
          >
            See How It Works
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fade(0.52)} className='w-full max-w-lg'>
          <p className='text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] font-medium mb-4 text-center'>
            The data behind why speed wins
          </p>
          <div className='grid grid-cols-3 gap-2.5 sm:gap-4'>
            {stats.map((s, i) => (
              <div key={i} className='flex flex-col items-center p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]'>
                <span className='text-lg sm:text-2xl font-black text-primary font-syne mb-0.5 leading-none'>{s.value}</span>
                <span className='text-[9px] sm:text-[11px] text-gray-400 dark:text-gray-500 text-center leading-tight font-medium mt-1'>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-10" />
    </section>
  )
}

export default Hero
