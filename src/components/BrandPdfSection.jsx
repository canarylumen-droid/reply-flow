import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon, BrainIcon } from './Icons'

const BrandPdfSection = () => {
    return (
        <section className='py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6'
                    >
                        Differentiation
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className='text-3xl md:text-5xl font-bold dark:text-white mb-6'
                    >
                        Upload Your Brand PDF <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500'>→ AI Learns Your Voice</span>
                    </motion.h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center'>

                    {/* Left: What AI Extracts (Visualized as a document scan) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className='relative p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 overflow-hidden'
                    >
                        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-scan' />

                        <h3 className='text-lg font-bold mb-6 text-gray-400 uppercase tracking-widest'>What The AI Extracts</h3>

                        <div className='space-y-4'>
                            {['Value Proposition', 'Client Testimonials', 'Key Metrics', 'Positioning Statement', 'Tone & Forbidden Words'].map((item, i) => (
                                <div key={i} className='flex items-center gap-4 bg-white dark:bg-black p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5'>
                                    <div className='w-2 h-2 rounded-full bg-blue-500' />
                                    <span className='font-medium dark:text-gray-200'>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: How AI Uses It */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className='space-y-8'
                    >
                        <h3 className='text-2xl font-bold dark:text-white'>The Result:</h3>

                        <div className='space-y-6'>
                            <div className='flex gap-4'>
                                <div className='w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0'>
                                    <BrainIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className='text-lg font-bold dark:text-white mb-1'>Hyper-Personalized Replies</h4>
                                    <p className='text-gray-500 dark:text-gray-400'>It references your specific case studies when answering questions.</p>
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <div className='w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0'>
                                    <CheckIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className='text-lg font-bold dark:text-white mb-1'>Consistent Brand Voice</h4>
                                    <p className='text-gray-500 dark:text-gray-400'>Whether you're "professional corporate" or "casual startup", the AI matches you perfectly.</p>
                                </div>
                            </div>
                        </div>

                        <div className='pt-6 border-t border-gray-200 dark:border-white/10'>
                            <p className='text-xl italic font-serif text-gray-800 dark:text-gray-200'>
                                "Messages that sound like <span className='text-primary'>you</span> — not a bot."
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default BrandPdfSection
