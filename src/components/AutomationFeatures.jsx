import React from 'react'
import { motion } from "framer-motion"

const AutomationFeatures = () => {
    return (
        <section className='py-24 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 overflow-hidden relative'>

            {/* Decorative Background */}
            <div className='absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-gray-200 dark:from-black/50 to-transparent pointer-events-none' />

            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>

                    {/* Email Timeline */}
                    <div>
                        <h3 className='text-3xl font-bold dark:text-white mb-4 flex items-center gap-3'>
                            <span>📧</span> Persistent Nurturing
                        </h3>
                        <p className='text-gray-500 dark:text-gray-400 mb-8 max-w-md'>
                            Most sales teams give up after 2 attempts. We don't. Our systems follow up up to 7 times with varied, value-driven messages that keep you top-of-mind without being a nuisance.
                        </p>

                        <div className='relative pl-8 border-l-2 border-gray-200 dark:border-white/10 space-y-12'>
                            {[
                                { day: 'Initial Contact', subject: 'Re: Your request', status: 'Immediate personal outreach' },
                                { day: 'Day 2', subject: 'Re: Quick question?', status: 'Value-add follow-up if no reply' },
                                { day: 'Day 5', subject: 'Case Study: 312% ROI', status: 'Social proof proof to build trust' },
                                { day: 'Day 10', subject: 'Is this still a priority?', status: 'The "Breakup" email (highest reply rate)' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className='relative'
                                >
                                    <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-gray-50 dark:border-zinc-900 ${i === 0 ? 'bg-green-500' : 'bg-primary'}`} />
                                    <div className='font-bold text-sm text-primary mb-1'>{item.day}</div>
                                    <div className='bg-white dark:bg-black p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm'>
                                        <div className='text-gray-900 dark:text-white font-medium mb-1'>{item.subject}</div>
                                        <div className='text-xs text-gray-500'>{item.status}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Instagram & Voice Clones */}
                    <div>
                        <h3 className='text-3xl font-bold dark:text-white mb-4 flex items-center gap-3'>
                            <span>📸</span> Multi-Channel Dominance
                        </h3>
                        <p className='text-gray-500 dark:text-gray-400 mb-8 max-w-md'>
                            We don't just sit in the inbox. We reach your leads where they are—whether that's Instagram DMs, SMS, or LinkedIn—creating a seamless brand presence.
                        </p>

                        <div className='bg-white dark:bg-black p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl relative overflow-hidden group'>
                            <div className='absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                            <div className='space-y-8 relative z-10'>
                                <div>
                                    <h4 className='font-bold text-xl dark:text-white mb-2'>AI Voice Concierge</h4>
                                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                                        For high-value leads, we can deploy a custom-trained voice clone that sends personalized audio DMs. It sounds human, feels personal, and gets 4x more replies than text.
                                    </p>

                                    {/* Audio Visualizer Dummy */}
                                    <div className='flex items-center gap-1 h-8'>
                                        {[...Array(20)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [10, 24, 10] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                                                className='w-1 bg-primary rounded-full'
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className='pt-6 border-t border-gray-100 dark:border-white/5'>
                                    <div className='flex gap-3 mb-4'>
                                        <span className='px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300'>24/7 Monitoring</span>
                                        <span className='px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300'>Human Oversight</span>
                                        <span className='px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300'>Brand Safe</span>
                                    </div>
                                    <p className='text-xs text-gray-400'>
                                        Our team monitors these conversations daily to ensure perfect delivery and brand alignment.
                                    </p>
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
