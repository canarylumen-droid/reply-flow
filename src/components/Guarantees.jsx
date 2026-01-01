import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon } from './Icons'

const Guarantees = () => {
    const items = [
        {
            title: "Performance Bond",
            desc: "We don't hide behind retainers. If our infrastructure doesn't outperform your current sales speed, we adjust our success fees until it does.",
            icon: "💎"
        },
        {
            title: "Zero Bot-Speak",
            desc: "If a lead ever identifies the system as a 'bot' due to poor logic, we manually rewrite that entire branch within 24 hours.",
            icon: "🗣️"
        },
        {
            title: "Data Sovereignty",
            desc: "You own the AI models, the lead logs, and the trained logic. If we part ways, the infrastructure stays in your CRM.",
            icon: "🔐"
        }
    ]

    return (
        <section className='py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className='relative p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all group'
                        >
                            <div className='text-4xl mb-6 group-hover:scale-110 transition-transform inline-block'>{item.icon}</div>
                            <h3 className='text-xl font-black mb-4 dark:text-white uppercase tracking-tight font-syne'>{item.title}</h3>
                            <p className='text-gray-500 dark:text-gray-400 leading-relaxed font-medium'>
                                {item.desc}
                            </p>
                            
                            <div className='absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity'>
                                <CheckIcon className='w-5 h-5 text-primary' />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Guarantees
