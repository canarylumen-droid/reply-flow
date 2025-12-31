import React from 'react'
import { motion } from "framer-motion"
import { BrainIcon, ClockIcon, ZapIcon, CheckIcon } from './Icons'

const Intelligence = () => {

    const features = [
        {
            title: "We Study Your Leads",
            desc: "Our team analyzes when each of your leads is most active and responsive, then schedules outreach for maximum engagement.",
            icon: ClockIcon,
        },
        {
            title: "We Remember Everything",
            desc: "Every conversation, every question, every objection is tracked. We never ask your leads the same question twice.",
            icon: BrainIcon,
        },
        {
            title: "We Prioritize Your Pipeline",
            desc: "We score every lead based on buying signals and alert you immediately when someone's ready to close.",
            icon: ZapIcon,
        },
        {
            title: "We Handle Objections",
            desc: "When leads hesitate, we respond instantly with proven counters and case studies—just like your best closer would.",
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
                        Full-Service Management
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='text-4xl md:text-6xl font-bold mb-6'
                    >
                        We Don't Sell You Software. <br className="hidden md:block" />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>We Run It For You.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='text-gray-500 max-w-3xl mx-auto text-xl leading-relaxed'
                    >
                        Our team builds, trains, and manages your entire AI sales operation. You just show up to close the deals we book. Clients typically see <span className='font-bold text-gray-900 dark:text-white'>3× more qualified meetings</span> and <span className='font-bold text-gray-900 dark:text-white'>2× faster sales cycles</span>.
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
                                <div className='text-xs font-bold text-primary uppercase tracking-wider mb-2'>Client Example</div>
                                <p className='text-sm text-gray-600 dark:text-gray-400 italic'>
                                    {index === 0 && "We noticed John always engages with emails on Tuesday afternoons. We scheduled his follow-up for 2:25 PM and he booked a call within 10 minutes."}
                                    {index === 1 && "When a lead asked 'Do you work with real estate?', we instantly pulled up their initial inquiry about property investment from 3 weeks ago and personalized our response."}
                                    {index === 2 && "Sarah visited your pricing page 3 times and downloaded a case study. We scored her 94% hot and sent you an immediate Slack alert. You closed her the same day."}
                                    {index === 3 && "Lead said 'Too expensive.' Within 30 seconds, we sent them your ROI calculator, a payment plan, and a case study from their industry. They booked a call to discuss."}
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
                    <h3 className='text-2xl font-bold mb-8 text-center'>What You Get vs. What Others Offer</h3>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-gray-200 dark:border-white/10'>
                                    <th className='text-left py-4 px-4 font-bold text-gray-900 dark:text-white'>Service</th>
                                    <th className='text-center py-4 px-4 font-bold text-gray-500'>DIY Chatbots</th>
                                    <th className='text-center py-4 px-4 font-bold text-gray-500'>Email Tools</th>
                                    <th className='text-center py-4 px-4 font-bold text-primary'>Reply Flow</th>
                                </tr>
                            </thead>
                            <tbody className='text-sm'>
                                {[
                                    { feature: 'We Build It For You', basic: false, email: false, us: true },
                                    { feature: 'We Train It On Your Data', basic: false, email: false, us: true },
                                    { feature: 'We Manage It Daily', basic: false, email: false, us: true },
                                    { feature: 'Multi-Channel (Email, SMS, IG)', basic: false, email: true, us: true },
                                    { feature: 'We Handle Objections', basic: false, email: false, us: true },
                                    { feature: 'We Book Calls Directly', basic: false, email: false, us: true },
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
                    <p className='text-center text-sm text-gray-500 mt-6 italic'>
                        You don't lift a finger. We handle everything from setup to optimization.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default Intelligence
