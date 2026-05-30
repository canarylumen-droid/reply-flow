import React from 'react'
import { motion } from "framer-motion"

const SimpleSetup = () => {
    const steps = [
        { num: '01', title: 'Intelligence Gathering', desc: 'We deep-dive into your funnel to find exactly where leads go cold and what makes your best clients buy.' },
        { num: '02', title: 'Custom Build',            desc: 'We build and train the AI system on your sales calls, scripts, and brand voice — not a generic template.' },
        { num: '03', title: 'Seamless Integration',   desc: 'We connect directly into your CRM, existing workflows, and multi-channel accounts. No disruption.' },
        { num: '04', title: 'Managed Daily',           desc: 'Our team monitors, optimises, and scales your sales operation. You show up to the calls we book.' },
    ]

    return (
        <section id="process" className='py-24 px-5 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white'>
            <div className='max-w-5xl mx-auto'>
                <div className='text-center mb-16'>
                    <div className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold uppercase tracking-[0.25em] mb-5'>
                        How It Works
                    </div>
                    <h2 className='text-3xl sm:text-4xl font-bold mb-4 tracking-tight font-syne'>From zero to running in 72 hours</h2>
                    <p className='text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto'>You don't lift a finger. We handle everything from the initial build to daily performance management.</p>
                </div>

                <div className='relative'>
                    <div className='hidden md:block absolute top-7 left-0 w-full h-px bg-gray-200 dark:bg-zinc-800' />

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className='relative z-10 flex flex-col items-center text-center'
                            >
                                <div className='w-14 h-14 rounded-full bg-white dark:bg-black border-2 border-primary flex items-center justify-center text-base font-bold text-primary mb-5 shadow-md shadow-primary/10'>
                                    {step.num}
                                </div>
                                <h3 className='text-base font-semibold mb-2'>{step.title}</h3>
                                <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className='text-center mt-14 pt-10 border-t border-gray-200 dark:border-zinc-800'>
                    <p className='text-base italic text-gray-500 dark:text-gray-400'>
                        "We handle the tech. You handle the handshake."
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SimpleSetup
