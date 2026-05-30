import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon, ArrowRightIcon } from './Icons'

const Infrastructure = () => {
    return (
        <section className='relative py-24 px-5 md:px-12 lg:px-24 bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden'>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] dark:opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"></div>
            </div>

            <div className='relative z-10 max-w-6xl mx-auto'>
                <div className='mb-20 text-center'>
                    <div className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold uppercase tracking-[0.25em] mb-5'>
                        Custom-Built Infrastructure
                    </div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight font-syne'>
                        We respond to every lead<br />
                        <span className='text-primary'>in under 90 seconds.</span>
                    </h2>
                    <p className='text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed'>
                        Most agencies hand you a strategy deck. We build the AI infrastructure that actually executes. Trained on how you sell — sounds like you, runs without you.
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
                    {/* Left: What we learn */}
                    <div>
                        <div className='inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-sm mb-10'>
                            <div className='w-2.5 h-2.5 rounded-full bg-primary animate-pulse' />
                            <span className='text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-[0.2em]'>Phase 1 — Deep Study</span>
                        </div>

                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight'>What we learn from you</h3>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {[
                                { title: "Your Unique Value Prop",    desc: "The specific 'why' that makes people choose you over everyone else." },
                                { title: "Your Best Client Stories",  desc: "Specific wins we'll reference mid-conversation to build trust." },
                                { title: "Your Pricing & Packages",   desc: "The math of your business, deal boundaries, and upsell triggers." },
                                { title: "How You Handle Objections", desc: "Your counters for price, timing, and trust concerns." },
                                { title: "Words You Never Use",       desc: "Your vocabulary and specific phrases that are off-limits." },
                                { title: "Your Ideal Lead Profile",   desc: "The signals that tell us a lead is worth your personal time." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className='p-5 rounded-2xl bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 hover:border-primary/25 transition-all duration-300'
                                >
                                    <h4 className='font-semibold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2 text-sm'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-primary shrink-0' />
                                        {item.title}
                                    </h4>
                                    <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Result card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className='relative lg:sticky lg:top-24'
                    >
                        <div className='absolute -inset-4 bg-gradient-to-tr from-primary/10 to-purple-600/10 blur-3xl opacity-25 pointer-events-none rounded-full' />
                        <div className='relative bg-white dark:bg-zinc-950 rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-xl overflow-hidden'>
                            <div className='absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full -mr-14 -mt-14' />

                            <h3 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-7 tracking-tight'>The result: messages that sound like you</h3>

                            <div className='space-y-8'>
                                <div className='flex gap-5'>
                                    <div className='shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
                                        <CheckIcon className='w-5 h-5 text-primary' />
                                    </div>
                                    <div>
                                        <h4 className='text-base font-semibold text-gray-900 dark:text-white mb-1.5'>Extreme personalisation</h4>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                                            We reference your specific success stories and your way of explaining things — leads can't tell it's not you.
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-5'>
                                    <div className='shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
                                        <CheckIcon className='w-5 h-5 text-primary' />
                                    </div>
                                    <div>
                                        <h4 className='text-base font-semibold text-gray-900 dark:text-white mb-1.5'>Consistent brand voice</h4>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                                            Whether you're corporate or casual, we match your tone precisely. Every message, every time.
                                        </p>
                                    </div>
                                </div>

                                <div className='flex gap-5'>
                                    <div className='shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
                                        <CheckIcon className='w-5 h-5 text-primary' />
                                    </div>
                                    <div>
                                        <h4 className='text-base font-semibold text-gray-900 dark:text-white mb-1.5'>Zero management overhead</h4>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                                            Once deployed, we monitor and optimise daily. You just show up to the booked calls.
                                        </p>
                                    </div>
                                </div>

                                <div className='pt-6 border-t border-gray-100 dark:border-white/5'>
                                    <div className='p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-dashed border-gray-200 dark:border-white/10'>
                                        <p className='text-sm text-gray-600 dark:text-gray-300 italic'>
                                            "It's like having your best sales conversation running on autopilot, 24 hours a day."
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
