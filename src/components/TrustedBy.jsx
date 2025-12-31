import React from 'react'
import { motion } from "framer-motion"

const TrustedBy = () => {
  // Premium sounding local businesses
  const brands = [
    "VANGUARD REALTY",
    "APEX LEGAL GROUP",
    "SUMMIT HEALTH",
    "LUXE MOTORS",
    "PRIME DENTAL",
    "ELITE FITNESS",
    "URBAN ARCHITECTS"
  ]

  return (
    <section className='py-16 bg-white dark:bg-black border-b border-gray-100 dark:border-white/5 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 mb-8 text-center'>
        <p className='text-xs font-bold tracking-[0.2em] text-gray-400 uppercase'>Partnering with Industry Leaders</p>
      </div>
      <div className='flex items-center gap-12 sm:gap-24 overflow-hidden relative'>

        {/* Gradient Masks */}
        <div className='absolute top-0 left-0 h-full w-20 sm:w-40 bg-gradient-to-r from-white dark:from-black to-transparent z-10' />
        <div className='absolute top-0 right-0 h-full w-20 sm:w-40 bg-gradient-to-l from-white dark:from-black to-transparent z-10' />

        {/* Marquee Animation */}
        <motion.div
          className='flex gap-16 sm:gap-32 whitespace-nowrap'
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className='text-xl sm:text-2xl font-semibold text-gray-400 dark:text-zinc-600 hover:text-gray-900 dark:hover:text-white transition-colors cursor-default tracking-tight'>
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedBy
