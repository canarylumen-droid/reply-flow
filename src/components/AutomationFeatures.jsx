import React from 'react'
import { motion } from "framer-motion"

const AutomationFeatures = () => {
    return (
        <section className='py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-black overflow-hidden relative'>

            {/* Background elements */}
            <div className='absolute left-0 top-0 w-1/2 h-full bg-blue-500/5 blur-[120px] pointer-events-none' />

            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-start'>

                    {/* Left: Email Timeline */}
                    <div>
                        <div className='mb-12'>
                            <h3 className='text-4xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-4 font-syne uppercase tracking-tighter'>
                                <span className='text-3xl'>📧</span> Persistent Nurturing
                            </h3>
                            <p className='text-xl text-gray-600 dark:text-gray-400 max-w-md leading-relaxed'>
                                Most sales teams give up after 2 attempts. We don't. Our systems follow up up to <span className='text-blue-600 font-bold'>7 times</span> with varied, value-driven messages that keep you top-of-mind.
                            </p>
                        </div>

                        <div className='relative pl-10 border-l-2 border-gray-100 dark:border-white/5 space-y-10'>
                            {[
                                { day: 'Initial Contact', subject: 'Re: Your request', status: 'Immediate personal outreach' },
                                { day: 'Day 2', subject: 'Re: Quick question?', status: 'Value-add follow-up if no reply' },
                                { day: 'Day 5', subject: 'Case Study: 312% ROI', status: 'Social proof to build trust' },
                                { day: 'Day 10', subject: 'Is this still a priority?', status: 'The "Breakup" email (Highest reply rate)' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className='relative'
                                >
                                    <div className={`absolute -left-[51px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-black ${i === 0 ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]'}`} />
                                    <div className='font-black text-xs text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-3'>{item.day}</div>
                                    <div className='bg-gray-50 dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:translate-x-2 transition-transform duration-300'>
                                        <div className='text-gray-900 dark:text-white font-bold text-lg mb-1'>{item.subject}</div>
                                        <div className='text-sm text-gray-500'>{item.status}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Instagram & Voice */}
                    <div className='lg:sticky lg:top-24'>
                        <div className='mb-12'>
                            <h3 className='text-4xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-4 font-syne uppercase tracking-tighter'>
                                <span className='text-3xl'>📸</span> Multi-Channel Dominance
                            </h3>
                            <p className='text-xl text-gray-600 dark:text-gray-400 max-w-md leading-relaxed'>
                                We don't just sit in the inbox. We reach your leads where they are—creating a <span className='text-blue-600 font-bold'>seamless brand presence</span> across all channels.
                            </p>
                        </div>

                        <div className='space-y-8'>
                            {/* Voice Concierge Card */}
                            <div className='bg-white dark:bg-black p-10 rounded-[40px] border border-blue-500/20 shadow-2xl relative overflow-hidden group'>
                                <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                <div className='relative z-10'>
                                    <div className='flex items-center gap-4 mb-8'>
                                        <div className='w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-3xl'>
                                            🎙️
                                        </div>
                                        <div>
                                            <h4 className='font-black text-2xl dark:text-white'>AI Voice Concierge</h4>
                                            <div className='text-xs font-bold text-blue-600 uppercase tracking-widest'>High-Value Leads</div>
                                        </div>
                                    </div>

                                    <p className='text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed'>
                                        We deploy custom-trained voice clones that send personalized audio DMs. It sounds human, feels personal, and gets 4x more replies than text.
                                    </p>

                                    {/* Audio Visualizer */}
                                    <div className='flex items-center gap-1.5 h-12 mb-10'>
                                        {[...Array(24)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [12, 40, 12] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 0.8 + Math.random(),
                                                    delay: i * 0.05
                                                }}
                                                className='w-1.5 bg-blue-600 rounded-full'
                                            />
                                        ))}
                                    </div>

                                    <div className='pt-10 border-t border-gray-100 dark:border-white/5'>
                                        <div className='grid grid-cols-2 gap-3 mb-8'>
                                            <div className='px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-xs font-black text-gray-700 dark:text-gray-300 text-center border border-gray-100 dark:border-white/10'>
                                                24/7 Monitoring
                                            </div>
                                            <div className='px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-xs font-black text-gray-700 dark:text-gray-300 text-center border border-gray-100 dark:border-white/10'>
                                                Human Oversight
                                            </div>
                                            <div className='col-span-2 px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-xs font-black text-gray-700 dark:text-gray-300 text-center border border-gray-100 dark:border-white/10'>
                                                Brand Safety Guarantee
                                            </div>
                                        </div>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 text-center italic'>
                                            Our team monitors these conversations daily to ensure perfect delivery and brand alignment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AutomationFeatures
