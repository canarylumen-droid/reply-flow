import React from 'react'
import { motion } from "framer-motion"
import { BrainIcon, ClockIcon, ZapIcon, CheckIcon } from './Icons'

const Intelligence = () => {

    const features = [
        {
            title: "Smart Timing",
            desc: "Knows exactly when each lead is most likely to reply based on their activity.",
            icon: ClockIcon,
        },
        {
            title: "Memory + Context",
            desc: "Never forgets a conversation. Stores every detail so it never asks twice.",
            icon: BrainIcon,
        },
        {
            title: "Intent Scoring",
            desc: "Ranks leads by purchasing signals. You talk to the hottest leads first.",
            icon: ZapIcon,
        },
        {
            title: "Objection Handling",
            desc: "Detects hesitation and responds with proven counters like your best closer.",
            icon: CheckIcon,
        }
    ]

    return (
        <section className='py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black text-gray-900 dark:text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className='text-primary font-medium tracking-widest uppercase text-sm mb-4'
                    >
                        Authority & Precision
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='text-3xl md:text-5xl font-bold mb-6'
                    >
                        This Isn’t Automation. <br className="hidden md:block" />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>It’s Intelligence.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='text-gray-500 max-w-2xl mx-auto text-lg'
                    >
                        Teams typically see 3× higher response rates and 2× faster deal cycles.
                    </motion.p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className='p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300'
                        >
                            <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary'>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className='text-xl font-bold mb-3'>{item.title}</h3>
                            <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Intelligence
