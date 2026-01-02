import React from 'react'
import { motion } from "framer-motion"
import { XIcon, CheckIcon, ClockIcon } from './Icons'
import { TiltCard } from './TiltCard'
// WhyLosingMoney component - Optimized for Agency Done-For-You service
const WhyLosingMoney = () => {
    return (
        <section className='py-32 px-6 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 border-t border-b border-gray-200 dark:border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className='text-center mb-12 sm:mb-20'
                >
                    <div className='inline-block px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-6'>
                        The Real Problem
                    </div>
                    <h2 className='text-3xl sm:text-5xl md:text-6xl font-black mb-8 dark:text-white font-syne uppercase tracking-tighter'>
                        Why Your Current Lead Follow Up <br />
                        <span className='text-red-500'>Is Costing You Money.</span>
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
                        You're losing them because by the time you reply, they've already moved on. <span className='font-bold text-gray-900 dark:text-white underline decoration-red-500/50 uppercase tracking-tight'>Every minute you wait, your conversion rate drops exponentially.</span> Speed wins. Every single time.
                    </p>

                    {/* Statistics Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className='bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-white/5'
                        >
                            <div className='text-4xl font-black text-red-500 mb-2'>5 min</div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>is all you have before they forget about you</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-white/5'
                        >
                            <div className='text-4xl font-black text-orange-500 mb-2'>1 hour</div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>late and your conversion rate drops by 90%</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className='bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-white/5'
                        >
                            <div className='text-4xl font-black text-yellow-500 mb-2'>78%</div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>of buyers choose whoever responds first</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Lead Decay Timeline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className='mb-24 relative'
                >
                    <div className='absolute inset-0 bg-primary/5 dark:bg-primary/5 rounded-[40px] blur-3xl pointer-events-none' />

                    <div className='relative bg-white dark:bg-black p-12 rounded-[40px] border border-gray-200 dark:border-white/5 overflow-hidden shadow-2xl'>
                        <h3 className='text-3xl font-black mb-16 text-center dark:text-white font-syne uppercase tracking-tighter'>The Decay of a Lead</h3>

                        <div className='relative max-w-5xl mx-auto px-4'>
                            {/* Animated Glowing Connector Line */}
                            <div className='absolute top-8 left-0 right-0 h-[2px] bg-gray-100 dark:bg-zinc-800 hidden md:block'>
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className='w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent'
                                />
                            </div>

                            <div className='grid grid-cols-2 md:grid-cols-4 gap-12 relative'>
                                {[
                                    { pct: "21%", time: "0-5 min", label: "HOT", color: "from-green-500 to-emerald-400", glow: "shadow-green-500/50" },
                                    { pct: "8%", time: "5-30 min", label: "WARM", color: "from-yellow-400 to-orange-400", glow: "shadow-yellow-500/50" },
                                    { pct: "3%", time: "30min-2hr", label: "COOL", color: "from-orange-500 to-red-400", glow: "shadow-orange-500/50" },
                                    { pct: "0.2%", time: "2hr+", label: "DEAD", color: "from-red-600 to-red-400", glow: "shadow-red-600/50" }
                                ].map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.15 }}
                                        className='flex flex-col items-center group'
                                    >
                                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} ${step.glow} shadow-[0_0_20px_rgba(0,0,0,0.1)] group-hover:shadow-[0_0_40px_rgba(0,0,0,0.2)] transition-all duration-500 flex flex-col items-center justify-center text-white relative z-10 border-4 border-white dark:border-black transform group-hover:scale-110`}>
                                            <span className='text-xl font-black leading-none'>{step.pct}</span>
                                            <span className='text-[8px] font-black tracking-tighter uppercase opacity-80'>Conv Rate</span>
                                        </div>
                                        <div className='mt-6 text-center'>
                                            <div className='text-sm font-black text-gray-900 dark:text-white mb-1 font-syne'>{step.time}</div>
                                            <div className={`text-xs font-black tracking-widest px-3 py-1 rounded-full border border-current opacity-60 group-hover:opacity-100 transition-opacity`}>{step.label}</div>
                                        </div>

                                        {/* Mobile link icons / dots */}
                                        <div className='md:hidden absolute top-10 left-[50%] translate-x-[50%] flex gap-1 opacity-20'>
                                            <div className='w-1 h-1 rounded-full bg-gray-400' />
                                            <div className='w-1 h-1 rounded-full bg-gray-400' />
                                            <div className='w-1 h-1 rounded-full bg-gray-400' />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-16 text-center'>
                            <p className='text-gray-500 font-medium italic max-w-xl mx-auto'>
                                The data is brutal: You have 300 seconds to capture their attention before they're gone forever. <span className='text-primary font-bold'>We never miss a window.</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Transition: This is why we exist */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className='mb-20 text-center max-w-4xl mx-auto'
                >
                    <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl text-white'>
                        <h3 className='text-3xl font-bold mb-4'>This Is Exactly Why We Exist</h3>
                        <p className='text-xl leading-relaxed opacity-90'>
                            You can't be awake 24/7. You can't reply in 90 seconds while you're in a meeting. You can't remember to follow up 7 times with perfect timing. <span className='font-bold'>But we can.</span>
                        </p>
                        <p className='text-lg mt-4 opacity-75'>
                            We built Reply Flow to solve this exact problem. Here's how we do it:
                        </p>
                    </div>
                </motion.div>

                {/* Comparison Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* Manual Follow-Up Card */}
                    <TiltCard
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className='relative group rounded-3xl bg-white dark:bg-black p-10 border border-red-500/20 shadow-2xl overflow-hidden text-center'
                    >


                        <div className='flex flex-col items-center mb-10'>
                            <div className='w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 shadow-lg shadow-red-500/5 transition-transform group-hover:scale-110 duration-500'>
                                <XIcon className='w-10 h-10 text-red-500' />
                            </div>
                            <div className='inline-block px-4 py-1.5 rounded-full bg-red-500/5 border border-red-500/10 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest'>
                                The Failure Loop
                            </div>
                        </div>

                        <div className='space-y-8 mb-12'>
                            {[
                                { icon: ClockIcon, title: "You're asleep when they message at 2 AM", sub: "By morning, they've already hired someone else" },
                                { icon: XIcon, title: "You forget to follow up the 3rd time", sub: "Most deals close after 5-7 touches. You stop at 2." },
                                { icon: ClockIcon, title: "You reply 6 hours later", sub: "They've moved on. You're too late." },
                                { icon: XIcon, title: "Your competitor answered in 2 minutes", sub: "Game over. They win." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className='flex flex-col items-center group/item'
                                >
                                    <div className='w-12 h-12 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-4 group-hover/item:bg-red-500/10 transition-all duration-300'>
                                        <item.icon className='w-6 h-6 text-red-400 group-hover/item:text-red-500 transition-colors' />
                                    </div>
                                    <div className='text-gray-900 dark:text-gray-100 font-bold text-lg mb-1 leading-tight'>{item.title}</div>
                                    <div className='text-sm text-gray-500 dark:text-gray-400 max-w-[250px]'>{item.sub}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className='pt-8 border-t border-red-500/10'>
                            <div className='text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4'>What this costs you</div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className='p-6 rounded-2xl bg-red-500/5 border border-red-500/10 shadow-lg shadow-red-500/5'
                            >
                                <div className='text-2xl font-black text-red-600 dark:text-red-500 leading-tight'>Deals you'll never even know about</div>
                            </motion.div>
                        </div>
                    </TiltCard>

                    {/* Reply Flow Card */}
                    <TiltCard
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className='relative group rounded-3xl bg-white dark:bg-black p-10 border border-green-500/20 shadow-2xl overflow-hidden text-center'
                    >


                        <div className='flex flex-col items-center mb-10'>
                            <div className='w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20 shadow-lg shadow-green-500/5 transition-transform group-hover:scale-110 duration-500'>
                                <CheckIcon className='w-10 h-10 text-green-500' />
                            </div>
                            <div className='inline-block px-4 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-green-600 dark:text-green-400 text-xs font-black uppercase tracking-widest'>
                                Done-For-You Dominance
                            </div>
                        </div>

                        <div className='space-y-8 mb-12'>
                            {[
                                { title: "We reply in under 90 seconds", sub: "24/7. Even at 3 AM on Christmas." },
                                { title: "We follow up 7 times automatically", sub: "Perfectly timed. Never pushy. Always converting." },
                                { title: "We book calls straight to your calendar", sub: "Only qualified leads. No tire-kickers." },
                                { title: "We handle objections instantly", sub: "Price concerns? Timing issues? We've got scripts." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                    className='flex flex-col items-center group/item'
                                >
                                    <div className='w-12 h-12 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-4 group-hover/item:bg-green-500/10 transition-all duration-300'>
                                        <CheckIcon className='w-6 h-6 text-green-500' />
                                    </div>
                                    <div className='text-gray-900 dark:text-gray-100 font-bold text-lg mb-1 leading-tight'>{item.title}</div>
                                    <div className='text-sm text-gray-500 dark:text-gray-400 max-w-[250px]'>{item.sub}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className='pt-8 border-t border-green-500/10'>
                            <div className='text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4'>What you get</div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className='p-6 rounded-2xl bg-green-500/5 border border-green-500/10 shadow-lg shadow-green-500/5'
                            >
                                <div className='text-2xl font-black text-green-600 dark:text-green-500 leading-tight'>Your calendar filled with ready-to-buy leads</div>
                            </motion.div>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    )
}

export default WhyLosingMoney
