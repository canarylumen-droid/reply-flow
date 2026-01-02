import React from 'react'
import { motion } from "framer-motion"

const SimpleSetup = () => {
    const steps = [
        { num: '01', title: 'Intelligence Gathering', desc: 'We deep-dive into your existing funnel to identify exactly where leads are going cold and what makes them buy.' },
        { num: '02', title: 'Infrastructure Build', desc: 'We build the custom AI engines and train them on your top sales calls and winning scripts.' },
        { num: '03', title: 'Seamless Integration', desc: 'We connect the machine directly into your CRM, existing workflows, and multi-channel ad accounts.' },
        { num: '04', title: 'Managed Scalability', desc: 'Our team monitors, optimizes, and scales your sales operation daily. You just show up to the calls.' }
    ]

    return (
        <section id="process" className='py-32 px-6 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-24'>
                    <h2 className='text-4xl md:text-5xl font-black mb-6 tracking-tight font-syne uppercase'>How We Scale Your Revenue</h2>
                    <p className='text-xl text-gray-500 max-w-2xl mx-auto'>You don't lift a finger. We handle everything from the initial build-out to daily performance optimization.</p>
                </div>

                <div className='relative'>
                    {/* Connecting Line (hidden on mobile) */}
                    <div className='hidden md:block absolute top-[28px] left-0 w-full h-0.5 bg-gray-200 dark:bg-zinc-800 -z-0' />

                    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className='relative z-10 flex flex-col items-center text-center'
                            >
                                <div className='w-14 h-14 rounded-full bg-white dark:bg-black border-2 border-primary flex items-center justify-center text-xl font-bold mb-4 shadow-lg'>
                                    {step.num}
                                </div>
                                <h3 className='text-lg font-bold mb-2'>{step.title}</h3>
                                <p className='text-sm text-gray-500 dark:text-gray-400'>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className='text-center mt-12 pt-12 border-t border-gray-200 dark:border-zinc-800'>
                    <p className='text-xl italic font-medium text-gray-800 dark:text-gray-200'>
                        "We handle the tech. You handle the handshake."
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SimpleSetup
