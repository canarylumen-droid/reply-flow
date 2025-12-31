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
                        The Hidden Revenue Leak
                    </div>
                    <h2 className='text-4xl sm:text-5xl font-bold mb-6 dark:text-white'>
                        Leads don't die because they don't want your offer. <br />
                        <span className='text-red-500'>They die because you're slow.</span>
                    </h2>
                    <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12'>
                        Harvard Business Review found that companies who respond to leads within 5 minutes are <span className='font-bold text-gray-900 dark:text-white'>100x more likely</span> to convert them than those who wait 30 minutes.
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
                            <div className='text-4xl font-black text-red-500 mb-2'>78%</div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>of leads buy from the first responder</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className='bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-white/5'
                        >
                            <div className='text-4xl font-black text-orange-500 mb-2'>5 min</div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>optimal response window for qualification</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className='bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-white/5'
                        >
                            <div className='text-4xl font-black text-yellow-500 mb-2'>400%</div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>increase in conversion with instant follow-up</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Lead Decay Timeline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className='mb-20 bg-white dark:bg-black p-8 rounded-3xl border border-gray-200 dark:border-white/5'
                >
                    <h3 className='text-2xl font-bold mb-8 text-center dark:text-white'>The Lead Decay Timeline</h3>
                    <div className='relative'>
                        <div className='absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500'></div>
                        <div className='grid grid-cols-4 gap-4'>
                            {[
                                { time: '0-5 min', temp: 'HOT', color: 'green', conversion: '21%' },
                                { time: '5-30 min', temp: 'WARM', color: 'yellow', conversion: '8%' },
                                { time: '30min-2hr', temp: 'COOL', color: 'orange', conversion: '3%' },
                                { time: '2hr+', temp: 'COLD', color: 'red', conversion: '0.2%' }
                            ].map((stage, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className='relative text-center'
                                >
                                    <div className={`w-16 h-16 mx-auto rounded-full bg-${stage.color}-500 flex items-center justify-center text-white font-bold text-sm mb-3 relative z-10 border-4 border-white dark:border-black`}>
                                        {stage.conversion}
                                    </div>
                                    <div className='text-xs font-bold text-gray-900 dark:text-white mb-1'>{stage.time}</div>
                                    <div className={`text-xs font-semibold text-${stage.color}-600 dark:text-${stage.color}-400`}>{stage.temp}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <p className='text-center text-sm text-gray-500 mt-8 italic'>
                        Every minute you wait, your conversion rate drops exponentially.
                    </p>
                </motion.div>

                {/* Comparison Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* Manual Follow-Up Card */}
                    <TiltCard
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className='relative group overflow-hidden rounded-2xl bg-white dark:bg-black p-8 border border-red-500/20 shadow-xl'
                    >
                        <div className='absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
                        <div className='absolute top-0 left-0 w-1 h-full bg-red-500' />

                        <div className='flex items-center gap-3 mb-6'>
                            <div className='w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center'>
                                <XIcon className='w-6 h-6 text-red-500' />
                            </div>
                            <div>
                                <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Manual Follow-Up</h3>
                                <p className='text-sm text-gray-500'>The old way</p>
                            </div>
                        </div>

                        <ul className='space-y-4 mb-6'>
                            <li className='flex items-start gap-3'>
                                <ClockIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                <div>
                                    <div className='text-gray-800 dark:text-gray-200 font-medium'>Miss messages while sleeping or working</div>
                                    <div className='text-xs text-gray-500 mt-1'>Average response time: 4-8 hours</div>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <XIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                <div>
                                    <div className='text-gray-800 dark:text-gray-200 font-medium'>Forget to follow up 2nd, 3rd, or 4th time</div>
                                    <div className='text-xs text-gray-500 mt-1'>80% of sales require 5+ touchpoints</div>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <ClockIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                <div>
                                    <div className='text-gray-800 dark:text-gray-200 font-medium'>Reply hours later when lead is cold</div>
                                    <div className='text-xs text-gray-500 mt-1'>Conversion drops 90% after 1 hour</div>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <XIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                <div>
                                    <div className='text-gray-800 dark:text-gray-200 font-medium'>Lose hot deals to faster competitors</div>
                                    <div className='text-xs text-gray-500 mt-1'>First responder wins 78% of the time</div>
                                </div>
                            </li>
                        </ul>

                        <div className='pt-4 border-t border-red-500/20'>
                            <div className='text-sm text-gray-500'>Estimated Revenue Loss</div>
                            <div className='text-3xl font-black text-red-500'>-$50k-$200k/year</div>
                        </div>
                    </TiltCard>

                    {/* Reply Flow Card */}
                    <TiltCard
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className='relative group overflow-hidden rounded-2xl bg-white dark:bg-black p-8 border border-green-500/20 shadow-xl'
                    >
                        <div className='absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
                        <div className='absolute top-0 left-0 w-1 h-full bg-green-500' />

                        <div className='flex items-center gap-3 mb-6'>
                            <div className='w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                                <CheckIcon className='w-6 h-6 text-green-500' />
                            </div>
                            <div>
                                <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>Reply Flow</h3>
                                <p className='text-sm text-green-600 dark:text-green-400'>AI-Powered Agency Service</p>
                            </div>
                        </div>

                        <ul className='space-y-4 mb-6'>
                            <li className='flex items-start gap-3'>
                                <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                <div>
                                    <div className='text-gray-800 dark:text-gray-200 font-medium'>Replies in under 2 minutes, 24/7/365</div>
                                    <div className='text-xs text-green-600 dark:text-green-400 mt-1'>Never miss a lead again</div>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                <div>
                                    <div className='text-gray-800 dark:text-gray-200 font-medium'>Automated 7-touch nurture sequence</div>
                                    <div className='text-xs text-green-600 dark:text-green-400 mt-1'>Handles objections like your best closer</div>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                <div>
                                    <div className='text-gray-800 dark:text-gray-200 font-medium'>Auto-books qualified calls on your calendar</div>
                                    <div className='text-xs text-green-600 dark:text-green-400 mt-1'>Only talk to hot, ready-to-buy leads</div>
                                </div>
                            </li>
                            <li className='flex items-start gap-3'>
                                <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                <div>
                                    <div className='text-gray-800 dark:text-gray-200 font-medium'>Converts leads while you sleep</div>
                                    <div className='text-xs text-green-600 dark:text-green-400 mt-1'>Works across email, SMS, and Instagram</div>
                                </div>
                            </li>
                        </ul>

                        <div className='pt-4 border-t border-green-500/20'>
                            <div className='text-sm text-gray-500'>Estimated Revenue Recovery</div>
                            <div className='text-3xl font-black text-green-500'>+$100k-$500k/year</div>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    )
}

export default WhyLosingMoney
