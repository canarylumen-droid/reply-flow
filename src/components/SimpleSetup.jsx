import React from 'react'
import { motion } from "framer-motion"

const SimpleSetup = () => {
    const steps = [
        { num: '1', title: 'Audit & Strategy', desc: 'We analyze your current lead flow and leaks.' },
        { num: '2', title: 'Custom Build', desc: 'We train the AI on your best sales calls.' },
        { num: '3', title: 'Integration', desc: 'Securely connects to your CRM & ads.' },
        { num: '4', title: 'Launch & Scale', desc: 'We go live and optimize conversions.' }
    ]

    return (
        <section id="process" className='py-20 px-6 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>How We Work Together</h2>
                    <p className='text-gray-500'>We build it. We train it. We manage it. You close deals.</p>
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
                                viewport={{ once: true }}
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
