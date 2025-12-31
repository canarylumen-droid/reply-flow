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
            <span>Powered by Audnix Intelligence</span>
          </div>

          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight'>
            AI Sales Closer <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>
              with Predictive Intelligence
            </span>
          </h1>

          <p className='text-lg sm:text-x text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed'>
            Stop letting warm leads go cold. <span className='font-semibold text-gray-800 dark:text-gray-200'>Reply Flow</span> learns each lead’s behavior, predicts the perfect follow-up time, and only reaches out when it’ll actually convert.
          </p>

          <div className='flex flex-wrap gap-4 pt-4'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/50 flex items-center gap-2'
            >
              Recover My Lost Clients
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all'
            >
              See How It Works
            </motion.button>
          </div>

          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2'>
            No spam. No pushy timing. Just intelligent outreach.
          </p>
        </motion.div>

        {/* Right: Visualization (Abstract UI Representation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='relative w-full h-[400px] sm:h-[500px] flex items-center justify-center'
        >
          {/* Abstract Floating Cards / UI */}
          <div className='relative w-full max-w-md aspect-square'>
            <div className='absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-3xl border border-gray-200 dark:border-white/10 backdrop-blur-sm' />

            {/* Floating Element 1: Lead Detected */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className='absolute top-10 left-[-20px] sm:left-0 bg-white dark:bg-[#111] p-4 rounded-xl shadow-xl border border-gray-100 dark:border-white/5 w-64'
            >
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs font-bold'>JL</div>
                <div>
                  <div className='text-sm font-bold'>John Lead</div>
                  <div className='text-xs text-gray-500'>Just visited pricing</div>
                </div>
              </div>
              <div className='h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden'>
                <div className='h-full w-[85%] bg-green-500 rounded-full' />
              </div>
              <div className='flex justify-between mt-1'>
                <span className='text-[10px] text-gray-400'>Buying Intent</span>
                <span className='text-[10px] text-green-500 font-bold'>85%</span>
              </div>
            </motion.div>

            {/* Floating Element 2: Smart Reply */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className='absolute bottom-20 right-[-20px] sm:right-0 bg-white dark:bg-[#111] p-4 rounded-xl shadow-xl border border-gray-100 dark:border-white/5 w-60 z-20'
            >
              <div className='flex items-center gap-2 mb-2'>
                <BrainIcon className="w-4 h-4 text-purple-500" />
                <span className='text-xs font-bold text-purple-500'>Audnix Intelligence</span>
              </div>
              <p className='text-xs text-gray-600 dark:text-gray-300 italic'>
                "Drafting follow-up for optimal 2:30 PM delivery based on John's activity patterns..."
              </p>
            </motion.div>

            {/* Center Element: The Core */}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-[40px] opacity-20 animate-pulse' />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center shadow-2xl z-10'>
              <BrainIcon className="w-10 h-10 text-primary" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}


export default Hero
