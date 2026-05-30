import React from 'react'
import { motion } from "framer-motion"

const AutomationFeatures = () => {
    return (
        <section className='py-24 px-5 md:px-12 lg:px-24 bg-white dark:bg-black overflow-hidden relative'>
            <div className='absolute left-0 top-0 w-1/2 h-full bg-primary/[0.03] blur-[120px] pointer-events-none' />

            <div className='max-w-6xl mx-auto relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-start'>

                    {/* Left: Email timeline */}
                    <div>
                        <div className='mb-10'>
                            <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3 font-syne'>
                                <span className='text-2xl'>📧</span> Persistent Nurturing
                            </h3>
                            <p className='text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed'>
                                Most sales teams give up after 2 attempts. Our systems follow up up to <span className='text-primary font-medium'>7 times</span> with varied, value-driven messages — perfectly spaced, never annoying.
                            </p>
                        </div>

                        <div className='relative pl-8 border-l-2 border-gray-100 dark:border-white/5 space-y-8'>
                            {[
                                { day: 'Immediate',  subject: 'Re: Your request',              status: 'Personal outreach within 90 seconds' },
                                { day: 'Day 2',      subject: 'Re: Quick question?',            status: 'Value-add follow-up if no reply' },
                                { day: 'Day 5',      subject: 'Case Study: $8,900 Recovered',   status: 'Social proof to build trust' },
                                { day: 'Day 10',     subject: 'Is this still a priority?',      status: '"Breakup" email — highest reply rate' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className='relative'
                                >
                                    <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 border-white dark:border-black ${i === 0 ? 'bg-green-500' : 'bg-primary'}`} />
                                    <div className='text-[10px] font-semibold text-primary uppercase tracking-[0.2em] mb-2'>{item.day}</div>
                                    <div className='bg-gray-50 dark:bg-white/[0.03] p-5 rounded-2xl border border-gray-100 dark:border-white/5 hover:translate-x-1.5 transition-transform duration-300'>
                                        <div className='text-gray-900 dark:text-white font-medium text-sm mb-1'>{item.subject}</div>
                                        <div className='text-xs text-gray-400'>{item.status}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Multi-channel */}
                    <div className='lg:sticky lg:top-24'>
                        <div className='mb-10'>
                            <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3 font-syne'>
                                <span className='text-2xl'>📸</span> Multi-Channel Coverage
                            </h3>
                            <p className='text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed'>
                                We reach your leads where they are — creating a consistent <span className='text-primary font-medium'>brand presence</span> across email, DM, and voice.
                            </p>
                        </div>

                        <div className='space-y-6'>
                            {/* Voice card */}
                            <div className='bg-white dark:bg-black p-8 rounded-3xl border border-primary/20 shadow-sm relative overflow-hidden group'>
                                <div className='absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-purple-600/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                                <div className='relative z-10'>
                                    <div className='flex items-center gap-4 mb-6'>
                                        <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl'>
                                            🎙️
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-lg dark:text-white'>AI Voice Concierge</h4>
                                            <div className='text-[11px] font-medium text-primary uppercase tracking-[0.15em]'>High-value leads</div>
                                        </div>
                                    </div>

                                    <p className='text-sm text-gray-500 dark:text-gray-400 mb-7 leading-relaxed'>
                                        Custom-trained voice messages sent as personalised audio DMs. Sounds human, feels personal — gets significantly more replies than plain text.
                                    </p>

                                    {/* Audio visualizer */}
                                    <div className='flex items-center gap-1 h-10 mb-8'>
                                        {[...Array(28)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [8, 32, 8] }}
                                                transition={{ repeat: Infinity, duration: 0.7 + (i % 5) * 0.15, delay: i * 0.04 }}
                                                className='w-1 bg-primary rounded-full'
                                            />
                                        ))}
                                    </div>

                                    <div className='pt-6 border-t border-gray-100 dark:border-white/5'>
                                        <div className='grid grid-cols-3 gap-2 mb-5'>
                                            {['24/7 Active', 'Brand-safe', 'Human oversight'].map((tag) => (
                                                <div key={tag} className='px-3 py-2 bg-gray-50 dark:bg-white/[0.03] rounded-xl text-[11px] font-medium text-gray-600 dark:text-gray-400 text-center border border-gray-100 dark:border-white/8'>
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                        <p className='text-xs text-gray-400 italic text-center'>
                                            Our team reviews these conversations daily to ensure quality and brand alignment.
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
