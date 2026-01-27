import React from 'react'
import { motion } from "framer-motion"
import { BrainIcon, ArrowRightIcon } from './Icons'

const ProofMockup = ({ type, user, message, delay }) => {
    if (type === 'discord') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.2 }}
                className='bg-[#313338] text-gray-100 p-3 rounded-xl font-sans shadow-lg border-l-4 border-indigo-500 my-4 text-left'
            >
                <div className='flex items-start gap-2'>
                    <div className='w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white shrink-0 text-xs'>
                        {user.charAt(0)}
                    </div>
                    <div>
                        <div className='flex items-baseline gap-1.5'>
                            <span className='font-semibold text-white text-xs hover:underline cursor-pointer'>{user}</span>
                            <span className='text-[10px] text-gray-400'>Today at 9:41 AM</span>
                        </div>
                        <p className='text-[11px] text-gray-300 mt-0.5 leading-relaxed opacity-90'>
                            {message}
                        </p>
                    </div>
                </div>
            </motion.div>
        )
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2 }}
            className='bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 p-4 rounded-2xl my-4 text-left relative'
        >
            <div className='flex justify-between items-center mb-1'>
                <span className='text-[9px] font-bold text-gray-400 uppercase tracking-wide italic'>Direct Message</span>
                <div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
            </div>
            <p className='text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed italic'>
                "{message}"
            </p>
        </motion.div>
    )
}

const CaseStudyCard = ({ industry, problem, solution, metric, delay, proofType, proofUser, proofMessage }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.8 }}
        viewport={{ once: true }}
        className='group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-8 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm flex flex-col min-h-[400px]'
    >
        <div className='flex items-center gap-2 mb-6'>
            <div className='px-3 py-1 bg-primary/5 dark:bg-blue-500/10 text-primary dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full'>
                {industry}
            </div>
        </div>

        <h3 className='text-2xl font-serif text-gray-900 dark:text-white mb-6 leading-tight'>
            {problem}
        </h3>

        <div className='flex-1'>
            <ProofMockup type={proofType} user={proofUser} message={proofMessage} delay={delay} />
        </div>

        <div className='pt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between mt-auto'>
            <div>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1'>Outcome</p>
                <p className='text-3xl font-black text-primary dark:text-white font-syne'>{metric}</p>
            </div>
            <div className='w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0'>
                <ArrowRightIcon className="w-5 h-5" />
            </div>
        </div>
    </motion.div>
)

const CaseStudies = () => {
    const studies = [
        {
            industry: "Coaching",
            problem: "Losing 40% of leads due to 4+ hour response times.",
            solution: "AI Nurture Layer with 90s response latency.",
            metric: "$9,450 Recovered",
            proofType: 'discord',
            proofUser: 'Jonathan D.',
            proofMessage: 'The reactivation campaign is printing. show-up rates literally doubled and we salvaged $9,450 in revenue.',
            delay: 0.1
        },
        {
            industry: "B2B Lead Gen",
            problem: "Saturated inbox leading to missed discovery calls.",
            solution: "Intent-based AI Filtering & automated calendar scheduling.",
            metric: "$4,200 Recovered",
            proofType: 'dm',
            proofUser: 'Alex G.',
            proofMessage: 'I almost hired a call center. Glad I didn\'t. This recovered $4,200 this month without me managing a human.',
            delay: 0.2
        },
        {
            industry: "E-commerce",
            problem: "Manual follow-up fatigue resulting in abandoned decay.",
            solution: "Persistent Multi-Channel Automation (Email + DM).",
            metric: "$3,850 Recovered",
            proofType: 'discord',
            proofUser: 'Marcus T.',
            proofMessage: 'My guys are good at sales, not texting. Having this system filter tire-kickers has salvaged $3,850 so far.',
            delay: 0.3
        }
    ]

    return (
        <section id='casestudies' className='py-32 bg-white dark:bg-black relative overflow-hidden'>
             <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-40"></div>
            </div>
            
            <div className='max-w-7xl mx-auto px-6 relative z-10'>
                <div className='text-center mb-20'>
                    <h2 className='text-4xl sm:text-6xl font-serif text-gray-900 dark:text-white mb-6'>
                        Alpha Results
                    </h2>
                    <p className='text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto'>
                        Visual proof of our active sales machines. measurable recovery across every channel.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {studies.map((study, idx) => (
                        <CaseStudyCard key={idx} {...study} />
                    ))}
                </div>
            </div>
        </section>
    )
}

                {/* Performance Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className='mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-12'
                >
                    <div className='flex items-center gap-6'>
                        <div className='w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20'>
                            <BrainIcon className="w-10 h-10" />
                        </div>
                        <div>
                            <p className='text-xl font-bold text-gray-900 dark:text-white'>Ready to be our next alpha result?</p>
                            <p className='text-gray-500 dark:text-gray-400'>Let's audit your current leakage and build your recovery plan.</p>
                        </div>
                    </div>
                    <a href="https://calendly.com/replyflow" target="_blank" className='w-full md:w-auto px-10 py-5 bg-primary text-white rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20'>
                        Start Your Infrastructure Audit
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default CaseStudies
