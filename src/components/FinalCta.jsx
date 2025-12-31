import React from 'react'
import { motion } from "framer-motion"
import { ArrowRightIcon } from './Icons'

const FinalCta = () => {
    return (
        <section className='py-32 px-6 sm:px-12 lg:px-24 bg-[#0A0A0B] text-white text-center relative overflow-hidden'>

            {/* Premium Glow Effects */}
            <div className='absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] pointer-events-none' />
            <div className='absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none' />

            <div className='relative z-10 max-w-5xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <h2 className='text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter'>
                        Stop Letting Potential <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500'>Deals Slip Away.</span>
                    </h2>

                    <p className='text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto font-medium leading-relaxed'>
                        Every minute you wait is a lead you've lost. <br className="hidden md:block" /> Let us install the high-performance sales infrastructure your business deserves.
                    </p>

                    <div className='flex flex-col items-center gap-8'>
                        <a
                            href="https://calendly.com/replyflow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='group relative px-12 py-6 bg-white text-black font-black text-xl rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-4 shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)]'
                        >
                            Book Strategy Call
                            <ArrowRightIcon className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                        </a>

                        <div className='flex flex-col items-center gap-2'>
                            <p className='text-xs text-primary font-black uppercase tracking-[0.3em]'>Limited capacity for Q1 2026</p>
                            <div className='h-px w-12 bg-primary/30' />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Grid Overlay */}
            <div className='absolute inset-0 opacity-[0.03] pointer-events-none'
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </section>
    )
}

export default FinalCta
