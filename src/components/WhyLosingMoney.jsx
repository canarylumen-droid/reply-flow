import React from 'react'
import { motion } from "framer-motion"
import { XIcon, CheckIcon, ClockIcon } from './Icons'
import { TiltCard } from './TiltCard'

const WhyLosingMoney = () => {
    return (
        <section className='py-20 px-6 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 border-t border-b border-gray-200 dark:border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'
                >
                    <h2 className='text-3xl sm:text-4xl font-bold mb-4 dark:text-white'>
                        Leads don’t die because they don’t want your offer. <br />
                        <span className='text-red-500'>They die because you’re slow.</span>
                    </h2>
                </motion.div>

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
                            <div className='w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center'>
                                <XIcon className='w-5 h-5 text-red-500' />
                            </div>
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white'>Manual Follow-Up</h3>
                        </div>

                        <ul className='space-y-4'>
                            <li className='flex items-start gap-3'>
                                <ClockIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                <span className='text-gray-600 dark:text-gray-400'>Miss messages while sleeping or working.</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <XIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                <span className='text-gray-600 dark:text-gray-400'>Forget to follow up 2nd, 3rd, or 4th time.</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <ClockIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                <span className='text-gray-600 dark:text-gray-400'>Reply hours later when lead is cold.</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <XIcon className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                <span className='text-gray-600 dark:text-gray-400'>Lose hot deals to faster competitors.</span>
                            </li>
                        </ul>
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
                            <div className='w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                                <CheckIcon className='w-5 h-5 text-green-500' />
                            </div>
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white'>Reply Flow</h3>
                        </div>

                        <ul className='space-y-4'>
                            <li className='flex items-start gap-3'>
                                <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                <span className='text-gray-800 dark:text-gray-200 font-medium'>Replies in minutes, 24/7.</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                <span className='text-gray-800 dark:text-gray-200 font-medium'>Handles objections automatically.</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                <span className='text-gray-800 dark:text-gray-200 font-medium'>Auto-books calls on your calendar.</span>
                            </li>
                            <li className='flex items-start gap-3'>
                                <CheckIcon className='w-5 h-5 text-green-500 mt-0.5 shrink-0' />
                                <span className='text-gray-800 dark:text-gray-200 font-medium'>Converts leads while you sleep.</span>
                            </li>
                        </ul>
                    </TiltCard>
                </div>
            </div>
        </section>
    )
}

export default WhyLosingMoney
