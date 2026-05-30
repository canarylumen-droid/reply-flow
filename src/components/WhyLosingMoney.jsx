import React from 'react'
import { motion } from "framer-motion"
import { XIcon, CheckIcon, ClockIcon } from './Icons'
import { TiltCard } from './TiltCard'

const WhyLosingMoney = () => {
    return (
        <section className='py-24 px-5 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 border-t border-b border-gray-200 dark:border-white/5'>
            <div className='max-w-6xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-center mb-14'
                >
                    <div className='inline-block px-4 py-1.5 rounded-full border border-red-400/30 bg-red-500/5 text-red-500 dark:text-red-400 text-[11px] font-semibold uppercase tracking-[0.25em] mb-5'>
                        The Real Problem
                    </div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6 dark:text-white font-syne tracking-tight'>
                        Why slow follow-up<br />
                        <span className='text-red-500'>is costing you deals.</span>
                    </h2>
                    <p className='text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed'>
                        By the time you reply, they've already moved on. Speed isn't a nice-to-have — it's the single biggest lever in your sales funnel.
                    </p>

                    {/* Stats */}
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10 mb-4'>
                        {[
                            { val: '5 min', label: 'before intent fades', color: 'text-red-500' },
                            { val: '1 hr',  label: 'late = 90% drop in conversion', color: 'text-orange-500' },
                            { val: '78%',   label: 'of buyers choose first responder', color: 'text-amber-500' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className='bg-white dark:bg-black p-5 rounded-2xl border border-gray-200 dark:border-white/5'
                            >
                                <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.val}</div>
                                <div className='text-xs text-gray-500 dark:text-gray-400 leading-snug'>{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Lead Decay Timeline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className='mb-20 relative'
                >
                    <div className='relative bg-white dark:bg-black p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm'>
                        <h3 className='text-xl sm:text-2xl font-bold mb-12 text-center dark:text-white font-syne'>Lead Intent Over Time</h3>

                        <div className='relative max-w-4xl mx-auto px-4'>
                            <div className='absolute top-8 left-0 right-0 h-[2px] bg-gray-100 dark:bg-zinc-800 hidden md:block'>
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className='w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent'
                                />
                            </div>

                            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 relative'>
                                {[
                                    { pct: "21%", time: "0–5 min", label: "HOT",  color: "from-green-500 to-emerald-400" },
                                    { pct: "8%",  time: "5–30 min", label: "WARM", color: "from-yellow-400 to-orange-400" },
                                    { pct: "3%",  time: "30m–2hr",  label: "COOL", color: "from-orange-500 to-red-400" },
                                    { pct: "0.2%",time: "2hr+",     label: "DEAD", color: "from-red-600 to-red-400" },
                                ].map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.12 }}
                                        className='flex flex-col items-center group'
                                    >
                                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${step.color} shadow-lg flex flex-col items-center justify-center text-white relative z-10 border-4 border-white dark:border-black group-hover:scale-105 transition-transform`}>
                                            <span className='text-lg sm:text-xl font-black leading-none'>{step.pct}</span>
                                            <span className='text-[7px] font-bold uppercase opacity-75'>Conv.</span>
                                        </div>
                                        <div className='mt-5 text-center'>
                                            <div className='text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 font-syne'>{step.time}</div>
                                            <div className='text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full border border-current opacity-50 group-hover:opacity-100 transition-opacity'>{step.label}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-12 text-center'>
                            <p className='text-sm text-gray-400 italic max-w-lg mx-auto'>
                                You have roughly 5 minutes before intent drops significantly. <span className='text-primary font-medium not-italic'>Our systems respond in under 90 seconds.</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Why we exist */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='mb-16 text-center max-w-3xl mx-auto'
                >
                    <div className='bg-primary p-7 sm:p-8 rounded-2xl text-white'>
                        <h3 className='text-xl sm:text-2xl font-bold mb-3'>This Is Why We Built ReplyFlow</h3>
                        <p className='text-base leading-relaxed text-blue-100'>
                            You can't reply in 90 seconds while you're in a meeting. You can't follow up 7 times with perfect timing. You can't be awake at 3 AM when a lead comes in. <span className='font-semibold text-white'>We handle all of that for you.</span>
                        </p>
                    </div>
                </motion.div>

                {/* Comparison Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Manual */}
                    <TiltCard className='relative group rounded-3xl bg-white dark:bg-black p-8 sm:p-10 border border-red-500/20 shadow-sm overflow-hidden text-center'>
                        <div className='flex flex-col items-center mb-8'>
                            <div className='w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-5 border border-red-500/15 group-hover:scale-110 transition-transform duration-300'>
                                <XIcon className='w-8 h-8 text-red-500' />
                            </div>
                            <div className='text-[10px] px-3 py-1 rounded-full bg-red-500/5 border border-red-500/10 text-red-500 font-semibold uppercase tracking-[0.2em]'>
                                Without ReplyFlow
                            </div>
                        </div>

                        <div className='space-y-6 mb-10'>
                            {[
                                { title: "You're asleep when leads message at 2 AM", sub: "By morning, they've already hired someone else." },
                                { title: "You forget to follow up the 3rd time", sub: "Most deals close after 5–7 touches. Most teams stop at 2." },
                                { title: "You reply 6 hours later", sub: "They've moved on. Timing is everything." },
                                { title: "Your competitor answered in 2 minutes", sub: "Speed wins. Every single time." },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className='flex flex-col items-center'>
                                    <div className='text-gray-800 dark:text-gray-100 font-medium text-base mb-1 leading-tight'>{item.title}</div>
                                    <div className='text-sm text-gray-400 max-w-[240px]'>{item.sub}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className='pt-6 border-t border-red-500/10'>
                            <div className='p-5 rounded-2xl bg-red-500/5 border border-red-500/10'>
                                <div className='text-lg font-semibold text-red-600 dark:text-red-400 leading-tight'>Revenue you'll never know you lost</div>
                            </div>
                        </div>
                    </TiltCard>

                    {/* ReplyFlow */}
                    <TiltCard className='relative group rounded-3xl bg-white dark:bg-black p-8 sm:p-10 border border-green-500/20 shadow-sm overflow-hidden text-center'>
                        <div className='flex flex-col items-center mb-8'>
                            <div className='w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-5 border border-green-500/15 group-hover:scale-110 transition-transform duration-300'>
                                <CheckIcon className='w-8 h-8 text-green-500' />
                            </div>
                            <div className='text-[10px] px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10 text-green-600 font-semibold uppercase tracking-[0.2em]'>
                                With ReplyFlow
                            </div>
                        </div>

                        <div className='space-y-6 mb-10'>
                            {[
                                { title: "We reply in under 90 seconds", sub: "24/7. Even at 3 AM on a Sunday." },
                                { title: "We follow up 7 times automatically", sub: "Perfectly timed. Never pushy. Always on-brand." },
                                { title: "We book calls straight to your calendar", sub: "Only qualified leads. We pre-screen for you." },
                                { title: "We handle objections on the spot", sub: "Price, timing, trust — all covered in the conversation." },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.1 }} className='flex flex-col items-center'>
                                    <div className='text-gray-800 dark:text-gray-100 font-medium text-base mb-1 leading-tight'>{item.title}</div>
                                    <div className='text-sm text-gray-400 max-w-[240px]'>{item.sub}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className='pt-6 border-t border-green-500/10'>
                            <div className='p-5 rounded-2xl bg-green-500/5 border border-green-500/10'>
                                <div className='text-lg font-semibold text-green-600 dark:text-green-400 leading-tight'>Your calendar filled with qualified meetings</div>
                            </div>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    )
}

export default WhyLosingMoney
