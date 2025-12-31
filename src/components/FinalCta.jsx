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
                    className='text-4xl md:text-7xl font-bold mb-8 leading-tight'
                >
                    Stop Letting Potential <br />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>Deals Slip Away.</span>
                </motion.h2>
                <p className='text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed'>
                    Every minute you wait is a lead you've lost. Let us install the high-performance sales infrastructure your business deserves.
                </p>

                <a
                    href="https://calendly.com/replyflow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='px-10 py-5 bg-white text-black font-bold text-xl rounded-full shadow-2xl hover:shadow-white/25 transition-all flex items-center gap-3 mx-auto w-fit'
                >
                    Book Strategy Call
                    <ArrowRightIcon className="w-6 h-6" />
                </a>
                <p className='mt-6 text-sm text-gray-400 font-medium tracking-wide'>LIMITED SPOTS AVAILABLE FOR Q1 2026</p>
            </div>
        </section>
    )
}

export default FinalCta
