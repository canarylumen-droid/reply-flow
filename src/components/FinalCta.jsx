import React from 'react'
import { motion } from "framer-motion"
import { ArrowRightIcon } from './Icons'

const FinalCta = () => {
    return (
        <section className='py-28 px-5 sm:px-12 lg:px-24 bg-[#050508] text-white text-center relative overflow-hidden'>

            {/* Glow */}
            <div className='absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px] pointer-events-none' />
            <div className='absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[140px] pointer-events-none' />

            <div className='relative z-10 max-w-4xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className='text-[10px] font-bold uppercase tracking-[0.35em] text-primary mb-6'>For Agencies Ready to Scale</p>

                    <h2 className='text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.0] tracking-tighter font-syne'>
                        Stop Letting Deals
                        <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400'>Slip Through the Cracks.</span>
                    </h2>

                    <p className='text-base sm:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed'>
                        Every minute without a follow-up system is revenue you're handing to competitors.
                        We install the infrastructure, manage it, and stay accountable to your results.
                    </p>

                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                        <a
                            href="https://calendly.com/replyflow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='group px-10 py-4 bg-white text-black font-bold text-base rounded-full transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]'
                        >
                            Book a Free Strategy Call
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="mailto:team@replyflow.pro"
                            className='px-10 py-4 border border-white/10 text-gray-300 font-medium text-base rounded-full hover:bg-white/5 transition-all'
                        >
                            Email Us Directly
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Dot grid */}
            <div className='absolute inset-0 opacity-[0.025] pointer-events-none'
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '36px 36px' }} />
        </section>
    )
}

export default FinalCta
