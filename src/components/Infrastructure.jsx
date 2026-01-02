import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon, ArrowRightIcon } from './Icons'

const Infrastructure = () => {
    return (
        <section className='py-32 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 overflow-hidden'>
            <div className='max-w-7xl mx-auto'>

                {/* Section Header */}
                <div className='mb-24 text-center'>
                    <h2 className='text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter font-syne uppercase'>
                        Respond to Every Missed Call <br />
                        <span className='text-primary'>And Message in Seconds.</span>
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
                        Most agencies give you a "strategy deck." We build the AI infrastructure that actually executes it. We analyze how <span className='font-bold text-gray-900 dark:text-white underline decoration-blue-500/50 underline-offset-4'>YOU</span> sell, then build a custom system that sounds exactly like you.
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>

                    {/* Onboarding - Left Column */}
                    <div>
                        <div className='inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-sm mb-12'>
                            <div className='w-3 h-3 rounded-full bg-blue-500 animate-pulse' />
                            <span className='text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest'>Phase 1: Deep Study</span>
                        </div>

                        <h3 className='text-3xl font-black text-gray-900 dark:text-white mb-10 tracking-tight'>What We Learn From You</h3>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            {[
                                { title: "Your Unique Value Prop", desc: "The specific 'why' that makes people choose you over everyone else." },
                                { title: "Your Best Client Wins", desc: "Specific success stories and case studies we'll pull mid-conversation." },
                                { title: "Your Pricing & Packages", desc: "The math of your business, deal boundaries, and upsell triggers." },
                                { title: "How You Handle Objections", desc: "Your specific counters for price, timing, and trust concerns." },
                                { title: "Words You Never Use", desc: "Your specific vocabulary and internal 'blacklisted' phrases." },
                                { title: "Your Ideal Lead Profile", desc: "The signals that tell us a lead is worth your personal time." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className='p-6 rounded-2xl bg-white dark:bg-black border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300'
                                >
                                    <h4 className='font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
                                        <div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
                                        {item.title}
                                    </h4>
                                    <p className='text-sm text-gray-500 dark:text-gray-400'>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Result Card - Right Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className='relative'
                    >
                        <div className='absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl opacity-30 pointer-events-none' />
                        <div className='relative bg-white dark:bg-black rounded-[40px] p-12 border border-blue-500/20 shadow-2xl overflow-hidden'>
                            <div className='absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16' />

                            <h3 className='text-3xl font-black text-gray-900 dark:text-white mb-8'>The Result: Messages That Sound Like You</h3>

                            <div className='space-y-10'>
                                <div className='flex gap-6'>
                                    <div className='shrink-0 w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center'>
                                        <CheckIcon className='w-6 h-6 text-blue-600' />
                                    </div>
                                    <div>
                                        <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>Extreme Personalization</h4>
                                        <p className='text-gray-500 dark:text-gray-400'>
                                            Leads can't tell it's not you. We reference YOUR specific success stories and YOUR way of explaining things.
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-6'>
                                    <div className='shrink-0 w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center'>
                                        <CheckIcon className='w-6 h-6 text-blue-600' />
                                    </div>
                                    <div>
                                        <h4 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>Consistent Brand Voice</h4>
                                        <p className='text-gray-500 dark:text-gray-400'>
                                            Whether you're "professional corporate" or "casual startup", we match your tone perfectly. Every single time.
                                        </p>
                                    </div>
                                </div>

                                <div className='pt-8 border-t border-gray-100 dark:border-white/5'>
                                    <div className='p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10'>
                                        <p className='text-lg font-medium text-gray-800 dark:text-gray-200 italic'>
                                            "It's like having a clone of your best closer working 24/7."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Infrastructure
