import React from 'react'
import { motion } from "framer-motion"
import { XIcon, CheckIcon, ClockIcon } from './Icons'
import { TiltCard } from './TiltCard'

const WhyLosingMoney = () => {
    return (
        <section className='py-32 px-6 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 border-t border-b border-gray-200 dark:border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-center mb-20'
                >
                    <div className='inline-block px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-6'>
                        The Real Problem
                    </div>
                    <h2 className='text-4xl sm:text-5xl font-bold mb-6 dark:text-white'>
                        You're Not Losing Leads Because <br />
                        <span className='text-red-500'>Your Offer Is Bad.</span>
                    </h2>
                    <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12'>
                        You're losing them because by the time you reply, they've already moved on to the next guy who answered faster. Speed wins. Every single time.
                    </p>

                    {/* Statistics Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className='bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-white/5'
                        >
                            <div className='text-4xl font-black text-red-500 mb-2'>5 min</div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>is all you have before they forget about you</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className='bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-white/5'
                        >
                            <div className='text-4xl font-black text-orange-500 mb-2'>1 hour</div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>late and your conversion rate drops by 90%</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
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
                    viewport={{ once: true }}
                    className='mb-12 bg-white dark:bg-black p-8 rounded-3xl border border-gray-200 dark:border-white/5'
                >
                    <h3 className='text-2xl font-bold mb-8 text-center dark:text-white'>What Happens When You Wait</h3>
                    <div className='relative'>
                        <div className='absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500'></div>
                        <div className='grid grid-cols-4 gap-4'>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0 }}
                                viewport={{ once: true }}
                                className='relative text-center'
                            >
                                <div className='w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm mb-3 relative z-10 border-4 border-white dark:border-black'>
                                    21%
                                </div>
                                <div className='text-xs font-bold text-gray-900 dark:text-white mb-1'>0-5 min</div>
                                <div className='text-xs font-semibold text-green-600 dark:text-green-400'>HOT</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                viewport={{ once: true }}
                                className='relative text-center'
                            >
                                <div className='w-16 h-16 mx-auto rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm mb-3 relative z-10 border-4 border-white dark:border-black'>
                                    8%
                                </div>
                                <div className='text-xs font-bold text-gray-900 dark:text-white mb-1'>5-30 min</div>
                                <div className='text-xs font-semibold text-yellow-600 dark:text-yellow-400'>WARM</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                className='relative text-center'
                            >
                                <div className='w-16 h-16 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm mb-3 relative z-10 border-4 border-white dark:border-black'>
                                    3%
                                </div>
                                <div className='text-xs font-bold text-gray-900 dark:text-white mb-1'>30min-2hr</div>
                                <div className='text-xs font-semibold text-orange-600 dark:text-orange-400'>COOL</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                                className='relative text-center'
                            >
                                <div className='w-16 h-16 mx-auto rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm mb-3 relative z-10 border-4 border-white dark:border-black'>
                                    0.2%
                                </div>
                                <div className='text-xs font-bold text-gray-900 dark:text-white mb-1'>2hr+</div>
                                <div className='text-xs font-semibold text-red-600 dark:text-red-400'>DEAD</div>
                            </motion.div>
                        </div>
                    </div>
                    <p className='text-center text-sm text-gray-500 mt-8 italic'>
                        The clock starts ticking the second they reach out. Every minute you wait, they get colder.
                    </p>
                </motion.div>

                {/* Transition: This is why we exist */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                    <div className='relative'>
                        <div className='absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-2xl z-10' />
                        <TiltCard
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className='relative group rounded-2xl bg-white dark:bg-black p-8 border border-red-500/20 shadow-xl'
                        >
                            <div className='absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl' />

                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center'>
                                    <XIcon className='w-6 h-6 text-red-500' />
                                </div>
                                <div>
                                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Doing It Yourself</h3>
                                    <p className='text-sm text-gray-500'>What's actually happening</p>
                                </div>
                            </div>

                            <ul className='space-y-4 mb-6'>
                                <li className='flex items-start gap-3'>
                                    <ClockIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                    <div>
                                        <div className='text-gray-800 dark:text-gray-200 font-medium'>You're asleep when they message at 2 AM</div>
                                        <div className='text-xs text-gray-500 mt-1'>By morning, they've already hired someone else</div>
                                    </div>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <XIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                    <div>
                                        <div className='text-gray-800 dark:text-gray-200 font-medium'>You forget to follow up the 3rd time</div>
                                        <div className='text-xs text-gray-500 mt-1'>Most deals close after 5-7 touches. You stop at 2.</div>
                                    </div>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <ClockIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                    <div>
                                        <div className='text-gray-800 dark:text-gray-200 font-medium'>You reply 6 hours later</div>
                                        <div className='text-xs text-gray-500 mt-1'>They've moved on. You're too late.</div>
                                    </div>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <XIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                    <div>
                                        <div className='text-gray-800 dark:text-gray-200 font-medium'>Your competitor answered in 2 minutes</div>
                                        <div className='text-xs text-gray-500 mt-1'>Game over. They win.</div>
                                    </div>
                                </li>
                            </ul>

                            <div className='pt-4 border-t border-red-500/20'>
                                <div className='text-sm text-gray-500'>What this costs you</div>
                                <div className='text-2xl font-black text-red-500'>Deals you'll never even know about</div>
                            </div>
                        </TiltCard>
                    </div>

                    {/* Reply Flow Card */}
                    <div className='relative'>
                        <div className='absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-2xl z-10' />
                        <TiltCard
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className='relative group rounded-2xl bg-white dark:bg-black p-8 border border-green-500/20 shadow-xl'
                        >
                            <div className='absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl' />

                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                                    <CheckIcon className='w-6 h-6 text-green-500' />
                                </div>
                                <div>
                                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>We Handle It</h3>
                                    <p className='text-sm text-green-600 dark:text-green-400'>Done-For-You Service</p>
                                </div>
                            </div>

                            <ul className='space-y-4 mb-6'>
                                <li className='flex items-start gap-3'>
                                    <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                    <div>
                                        <div className='text-gray-800 dark:text-gray-200 font-medium'>We reply in under 90 seconds</div>
                                        <div className='text-xs text-green-600 dark:text-green-400 mt-1'>24/7. Even at 3 AM on Christmas.</div>
                                    </div>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                    <div>
                                        <div className='text-gray-800 dark:text-gray-200 font-medium'>We follow up 7 times automatically</div>
                                        <div className='text-xs text-green-600 dark:text-green-400 mt-1'>Perfectly timed. Never pushy. Always converting.</div>
                                    </div>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                    <div>
                                        <div className='text-gray-800 dark:text-gray-200 font-medium'>We book calls straight to your calendar</div>
                                        <div className='text-xs text-green-600 dark:text-green-400 mt-1'>Only qualified leads. No tire-kickers.</div>
                                    </div>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                    <div>
                                        <div className='text-gray-800 dark:text-gray-200 font-medium'>We handle objections instantly</div>
                                        <div className='text-xs text-green-600 dark:text-green-400 mt-1'>Price concerns? Timing issues? We've got scripts for everything.</div>
                                    </div>
                                </li>
                            </ul>

                            <div className='pt-4 border-t border-green-500/20'>
                                <div className='text-sm text-gray-500'>What you get</div>
                                <div className='text-2xl font-black text-green-500'>Your calendar filled with ready-to-buy leads</div>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyLosingMoney
