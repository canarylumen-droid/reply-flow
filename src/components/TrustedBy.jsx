import React from 'react'
import { motion } from "framer-motion"

const TrustedBy = () => {
  const brands = [
    { name: "KREATEYO", color: "text-blue-500" },
    { name: "KYNOX AI", color: "text-purple-500" },
    { name: "AUDNIX AI", color: "text-primary" },
    { name: "ORBIEON", color: "text-emerald-500" },
    { name: "SAS REC", color: "text-rose-500" },
    { name: "FANTASY LUXE", color: "text-amber-500" },
  ]

  return (
    <section className='py-20 bg-white dark:bg-black border-y border-gray-100 dark:border-white/5 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 mb-12 text-center'>
        <span className='text-[10px] font-black tracking-[0.4em] text-gray-400 dark:text-zinc-600 uppercase mb-4 block'>CLIENTS &amp; PARTNERS</span>
        <div className='w-12 h-1 bg-primary/20 rounded-full mx-auto'></div>
      </div>
      
      <div className='relative flex items-center overflow-hidden'>
        {/* Gradient Masks */}
        <div className='absolute top-0 left-0 h-full w-20 sm:w-40 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none' />
        <div className='absolute top-0 right-0 h-full w-20 sm:w-40 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none' />

        <div className='flex gap-16 sm:gap-32 flex-wrap justify-center px-10'>
          {brands.map((brand, index) => (
            brand.name === 'AUDNIX AI' ? (
              <a
                key={index}
                href="https://audnixai.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Audnix.ai (external)"
                className='flex items-center gap-4 group cursor-pointer'
              >
                <div className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center font-bold ${brand.color} text-xl shadow-sm border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform`}>
                  {brand.name[0]}
                </div>
                <span className='text-2xl sm:text-3xl font-black font-syne tracking-tighter text-gray-300 dark:text-zinc-800 group-hover:text-gray-900 dark:group-hover:text-white transition-colors'>
                  {brand.name}
                </span>
              </a>
            ) : (
              <div key={index} className='flex items-center gap-4 group cursor-default'>
                <div className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-zinc-900 flex items-center justify-center font-bold ${brand.color} text-xl shadow-sm border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform`}>
                  {brand.name[0]}
                </div>
                <span className='text-2xl sm:text-3xl font-black font-syne tracking-tighter text-gray-300 dark:text-zinc-800 group-hover:text-gray-900 dark:group-hover:text-white transition-colors'>
                  {brand.name}
                </span>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
