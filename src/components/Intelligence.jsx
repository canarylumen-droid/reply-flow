import React from 'react'
import { motion } from "framer-motion"

const Intelligence = () => {
    const points = [
        {
            title: "Daily human oversight",
            desc: "We monitor conversations in real-time — not just set and forget. If something isn't converting, we fix it that day.",
            icon: "🛡️"
        },
        {
            title: "Brand safety built in",
            desc: "The system works from your strict 'never say' list. It won't misrepresent your pricing, make up features, or go off-script.",
            icon: "🔒"
        },
        {
            title: "Continuous improvement",
            desc: "Every objection that isn't handled perfectly gets reviewed. We update the logic and test the fix — it gets sharper over time.",
            icon: "📈"
        },
        {
            title: "Seamless escalation",
            desc: "The moment a lead asks for a human or needs a custom quote, you get notified immediately. You step in exactly when it matters.",
            icon: "📲"
        }
    ]

    return (
        <section className='relative py-24 px-5 sm:px-12 lg:px-24 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 overflow-hidden'>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)]"></div>
            </div>

            <div className='relative z-10 max-w-6xl mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                    <div>
                        <div className='inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-[11px] font-semibold uppercase tracking-[0.25em] mb-5'>
                            Human + AI
                        </div>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight font-syne'>
                            The AI sells.<br />
                            <span className='text-green-600 dark:text-green-500'>We supervise.</span>
                        </h2>
                        <p className='text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10'>
                            Building a chatbot is easy. Building a system you can trust with your brand reputation is what we do — AI scale with strategic human oversight.
                        </p>

                        <div className='space-y-4'>
                            {points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className='flex gap-5 p-5 rounded-2xl bg-white dark:bg-black border border-gray-100 dark:border-white/5 hover:border-primary/20 hover:shadow-sm transition-all'
                                >
                                    <div className='text-2xl mt-0.5'>{point.icon}</div>
                                    <div>
                                        <h4 className='font-semibold text-gray-900 dark:text-white mb-1 text-[15px]'>{point.title}</h4>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>{point.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Live log mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className='relative'
                    >
                        <div className='absolute -inset-6 bg-green-500/5 blur-3xl rounded-full pointer-events-none' />
                        <div className='relative bg-white dark:bg-black p-8 rounded-3xl border border-green-500/20 shadow-xl overflow-hidden'>
                            <div className='flex items-center gap-2 mb-7'>
                                <div className='w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse' />
                                <span className='text-xs font-semibold uppercase tracking-[0.2em] text-gray-400'>Live Optimisation Log</span>
                            </div>

                            <div className='space-y-4 font-mono text-xs'>
                                {[
                                    { tag: '[OPTIMISED]', time: '13:42:01', msg: 'Objection "too expensive" detected in convo #492. Script updated with ROI case study #A12.' },
                                    { tag: '[ESCALATED]', time: '14:15:22', msg: 'Lead asked about custom scope. System deferred to human and sent you an alert.' },
                                    { tag: '[REENGAGED]', time: '15:00:00', msg: 'Re-engagement sequence sent to 12 cold leads. Subject focus: "New client results."' },
                                ].map((log, i) => (
                                    <div key={i} className='p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/8'>
                                        <div className='text-green-500 mb-1'>{log.tag} {log.time}</div>
                                        <div className='text-gray-400 leading-relaxed'>{log.msg}</div>
                                    </div>
                                ))}
                            </div>

                            <div className='mt-8 pt-7 border-t border-gray-100 dark:border-white/5 text-center'>
                                <p className='text-sm text-gray-400 italic'>"We monitor the tech. You handle the handshake."</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Intelligence
