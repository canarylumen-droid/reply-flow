import React from 'react'
import { motion } from "framer-motion"
import { ArrowRightIcon } from './Icons'

const FinalCta = () => {
    return (
        <section className='py-24 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-blue-900 to-black text-white text-center relative overflow-hidden'>

            {/* Glow Effects */}
            <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none' />
            <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none' />

            <div className='relative z-10 max-w-4xl mx-auto'>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className='text-4xl md:text-6xl font-bold mb-6'
                >
                    Stop Losing Deals to Slow Follow-Up.
                </motion.h2>
                <p className='text-xl text-gray-300 mb-10'>
                    Let Reply Flow handle replies, objections, and bookings. You close the deals.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-10 py-5 bg-white text-black font-bold text-xl rounded-full shadow-2xl hover:shadow-white/25 transition-all flex items-center gap-3 mx-auto'
                >
                    Recover My Lost Leads
                    <ArrowRightIcon className="w-6 h-6" />
                </motion.button>
                <p className='mt-4 text-sm text-gray-400'>No card required • Setup in minutes</p>
            </div>
        </section>
    )
}

export default FinalCta
