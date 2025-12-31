import React from 'react'
import { motion } from "framer-motion"

const Intelligence = () => {
    const points = [
        {
            title: "24/7 Human Oversight",
            desc: "Our team doesn't just set it and forget it. We monitor every conversation in real-time to ensure the highest quality delivery.",
            icon: "🛡️"
        },
        {
            title: "Brand Safety Guarantee",
            desc: "The system is programmed with your strict 'No-No' list. It will never misrepresent your pricing or damage your reputation.",
            icon: "💎"
        },
        {
            title: "Continuous Optimization",
            desc: "We analyze every objection that isn't handled perfectly and refine the AI's logic daily. It gets smarter every single day.",
            icon: "📈"
        },
        {
            title: "Seamless Escalation",
            desc: "The second a lead asks for a human or a complex custom quote, our system alerts you immediately. You step in exactly when needed.",
            icon: "📲"
        }
    ]

    return (
        <section className='py-32 px-6 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
                    <div>
                        <div className='inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-black uppercase tracking-widest mb-6'>
                            Absolute Control
                        </div>
                        <h2 className='text-4xl md:text-6xl font-black mb-8 tracking-tighter font-syne uppercase'>
                            The AI Sells. <br />
                            <span className='text-green-600'>We Supervise.</span>
                        </h2>
                        <p className='text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-12'>
                            Building a tool is easy. Building a system that you can trust with your brand reputation is what we do. We combine the scale of AI with the strategic oversight of seasoned sales managers.
                        </p>

                        <div className='space-y-6'>
                            {points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className='flex gap-6 p-6 rounded-2xl bg-white dark:bg-black border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all'
                                >
                                    <div className='text-3xl'>{point.icon}</div>
                                    <div>
                                        <h4 className='font-bold text-gray-900 dark:text-white mb-1'>{point.title}</h4>
                                        <p className='text-sm text-gray-500 dark:text-gray-400'>{point.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className='relative'>
                        <div className='absolute -inset-10 bg-green-500/5 blur-3xl rounded-full' />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className='relative bg-white dark:bg-black p-10 rounded-[40px] border border-green-500/20 shadow-2xl overflow-hidden'
                        >
                            <div className='flex items-center gap-2 mb-8'>
                                <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse' />
                                <span className='text-sm font-black uppercase tracking-widest text-gray-400'>Live Optimization Log</span>
                            </div>

                            <div className='space-y-6 font-mono text-xs'>
                                <div className='p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10'>
                                    <div className='text-green-500 mb-1'>[OPTIMIZATION] 13:42:01</div>
                                    <div className='text-gray-400'>Objection "Too expensive" detected in conversation #492. Script updated with new ROI case study #A12.</div>
                                </div>
                                <div className='p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10'>
                                    <div className='text-green-500 mb-1'>[BRAND_CHECK] 14:15:22</div>
                                    <div className='text-gray-400'>Lead asked about custom feature #X. System deferred to human manager for custom quote. Escalation sent to user.</div>
                                </div>
                                <div className='p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10'>
                                    <div className='text-green-500 mb-1'>[NURTURING] 15:00:00</div>
                                    <div className='text-gray-400'>Re-engagement sequence triggered for 12 cold leads. Content focus: "New Industry Results".</div>
                                </div>
                            </div>

                            <div className='mt-10 pt-10 border-t border-gray-100 dark:border-white/5 text-center'>
                                <p className='text-gray-500 italic'>"We monitor the tech. You handle the checks."</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Intelligence
