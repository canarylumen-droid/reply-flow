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
        <section className='py-32 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black text-gray-900 dark:text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-20'>
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
                        className='text-4xl md:text-6xl font-bold mb-6'
                    >
                        This Isn't Automation. <br className="hidden md:block" />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>It's Intelligence.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='text-gray-500 max-w-3xl mx-auto text-xl leading-relaxed'
                    >
                        Our AI doesn't just send messages. It analyzes behavior patterns, predicts intent, and adapts its strategy in real-time. Teams typically see <span className='font-bold text-gray-900 dark:text-white'>3× higher response rates</span> and <span className='font-bold text-gray-900 dark:text-white'>2× faster deal cycles</span>.
                    </motion.p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className='p-8 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 group'
                        >
                            <div className='flex items-start gap-4 mb-6'>
                                <div className='w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform'>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className='text-2xl font-bold mb-2'>{item.title}</h3>
                                    <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>{item.desc}</p>
                                </div>
                            </div>

                            {/* Example Use Case */}
                            <div className='bg-white dark:bg-black p-4 rounded-xl border border-gray-200 dark:border-white/5 mt-4'>
                                <div className='text-xs font-bold text-primary uppercase tracking-wider mb-2'>Real Example</div>
                                <p className='text-sm text-gray-600 dark:text-gray-400 italic'>
                                    {index === 0 && "John opens emails at 2:30 PM every Tuesday. The AI waits until 2:25 PM to send his follow-up for maximum engagement."}
                                    {index === 1 && "Lead asks 'Do you work with real estate?' AI instantly recalls they mentioned property investment 3 weeks ago and personalizes the response."}
                                    {index === 2 && "Sarah visited pricing 3x, downloaded a case study, and asked about ROI. AI scores her 94% and alerts your team immediately."}
                                    {index === 3 && "Lead says 'Too expensive.' AI detects price objection and automatically sends ROI calculator + payment plan options within seconds."}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-black p-8 rounded-3xl border border-gray-200 dark:border-white/5'
                >
                    <h3 className='text-2xl font-bold mb-8 text-center'>How We Compare</h3>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-gray-200 dark:border-white/10'>
                                    <th className='text-left py-4 px-4 font-bold text-gray-900 dark:text-white'>Feature</th>
                                    <th className='text-center py-4 px-4 font-bold text-gray-500'>Basic Chatbots</th>
                                    <th className='text-center py-4 px-4 font-bold text-gray-500'>Email Automation</th>
                                    <th className='text-center py-4 px-4 font-bold text-primary'>Reply Flow</th>
                                </tr>
                            </thead>
                            <tbody className='text-sm'>
                                {[
                                    { feature: '24/7 Response', basic: true, email: false, us: true },
                                    { feature: 'Behavioral Analysis', basic: false, email: false, us: true },
                                    { feature: 'Intent Prediction', basic: false, email: false, us: true },
                                    { feature: 'Multi-Channel (Email, SMS, IG)', basic: false, email: true, us: true },
                                    { feature: 'Objection Handling', basic: false, email: false, us: true },
                                    { feature: 'Calendar Booking', basic: false, email: false, us: true },
                                ].map((row, i) => (
                                    <tr key={i} className='border-b border-gray-100 dark:border-white/5'>
                                        <td className='py-4 px-4 font-medium'>{row.feature}</td>
                                        <td className='text-center py-4 px-4'>
                                            {row.basic ? <span className='text-green-500'>✓</span> : <span className='text-gray-300'>—</span>}
                                        </td>
                                        <td className='text-center py-4 px-4'>
                                            {row.email ? <span className='text-green-500'>✓</span> : <span className='text-gray-300'>—</span>}
                                        </td>
                                        <td className='text-center py-4 px-4'>
                                            <span className='text-primary font-bold text-lg'>✓</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Intelligence
