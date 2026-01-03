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
        className='group bg-white dark:bg-black border border-gray-100 dark:border-white/5 rounded-3xl p-8 hover:border-primary/50 transition-all shadow-2xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden flex flex-col'
    >
        <div className='absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity'>
            <BrainIcon className="w-24 h-24" />
        </div>

        <div className='flex items-center gap-2 mb-6'>
            <div className='px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20'>
                {industry}
            </div>
            <div className='h-px flex-1 bg-gray-100 dark:bg-white/10' />
        </div>

        <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight'>
            {problem}
        </h3>

        <div className='space-y-4 mb-2'>
            <div className='flex items-start gap-3'>
                <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0' />
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                    <span className='text-gray-900 dark:text-white font-semibold'>Infrastructure:</span> {solution}
                </p>
            </div>
        </div>

        {/* Visual Proof Section */}
        <div className='flex-1'>
            <ProofMockup type={proofType} user={proofUser} message={proofMessage} delay={delay} />
        </div>

        <div className='pt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between mt-auto'>
            <div>
                <p className='text-[10px] text-gray-400 uppercase font-bold tracking-tighter mb-1'>Verified Outcome</p>
                <p className='text-2xl font-black text-primary font-syne'>{metric}</p>
            </div>
            <div className='w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all'>
                <ArrowRightIcon className="w-5 h-5" />
            </div>
        </div>
    </motion.div>
)

const CaseStudies = () => {
    const studies = [
        {
            industry: "High-Ticket Coaching",
            problem: "Losing 40% of leads due to 4+ hour response times.",
            solution: "Bespoke AI Nurture Layer with 90s response latency.",
            metric: "$9,450 Recovered",
            proofType: 'discord',
            proofUser: 'Jonathan D. (Ops)',
            proofMessage: 'The reactivation campaign is printing. show-up rates literally doubled and we salvaged $9,450 in revenue.',
            delay: 0.1
        },
        {
            industry: "B2B Lead Gen",
            problem: "Saturated inbox leading to missed discovery calls.",
            solution: "Intent-based AI Filtering & automated calendar scheduling.",
            metric: "$4,200 Recovered",
            proofType: 'dm',
            proofMessage: 'I almost hired a call center. Glad I didn\'t. This recovered $4,200 this month without me managing a human.',
            delay: 0.2
        },
        {
            industry: "E-commerce Support",
            problem: "Manual follow-up fatigue resulting in abandoned decay.",
            solution: "Persistent Multi-Channel Automation (Email + DM).",
            metric: "$3,850 Recovered",
            proofType: 'discord',
            proofUser: 'Marcus T. (Founder)',
            proofMessage: 'My guys are good at sales, not texting. Having this system filter tire-kickers has salvaged $3,850 so far.',
            delay: 0.3
        },
        {
            industry: "Consulting Firm",
            problem: "Cold leads going stagnant after initial inquiry.",
            solution: "AI-Driven Reactivation engine with dynamic personalization.",
            metric: "3.5x Pipeline Velocity",
            proofType: 'dm',
            proofMessage: 'The objection handling is insane. It sounds more professional than my junior reps. Financing objections cleared!',
            delay: 0.4
        },
        {
            industry: "Real Estate Team",
            problem: "Weekend inquiries ignored until Monday morning.",
            solution: "24/7 Managed Infrastructure for instant lead qualification.",
            metric: "$8,900 Recovered",
            proofType: 'discord',
            proofUser: 'Elena R. (Lead)',
            proofMessage: 'We are now the first to reply to every inquiry 24/7. Speed is everything and we just booked $8,900 in value.',
            delay: 0.5
        },
        {
            industry: "Growth Agency",
            problem: "Operationally heavy manual lead vetting process.",
            solution: "High-Fidelity AI Sales Closer for 1st-level qualification.",
            metric: "$7,200 Recovered",
            proofType: 'dm',
            proofMessage: 'We recovered $7,200 that would have decayed. Our show-up rate is up 30% from the AI qualification.',
            delay: 0.6
        }
    ]

    return (
        <section id='casestudies' className='py-24 px-6 bg-white dark:bg-[#050505] relative overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20'>
                    <div className='max-w-2xl'>
                        <div className='flex items-center gap-3 text-primary font-bold uppercase text-[10px] tracking-[0.4em] font-syne mb-4'>
                            <div className='w-2 h-2 rounded-full bg-primary' />
                            <span>Proof of Infrastructure</span>
                        </div>
                        <h2 className='text-4xl sm:text-6xl font-black text-gray-900 dark:text-white uppercase font-syne leading-none mb-6'>
                            Alpha Results <br />
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400'>Field Verified</span>
                        </h2>
                        <p className='text-lg text-gray-500 dark:text-gray-400'>
                            Visual proof of our active sales machines. We don't sell theory—we deploy infrastructure that delivers measurable recovery across every channel.
                        </p>
                    </div>
                    
                    <button className='px-8 py-4 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-full font-bold hover:bg-primary hover:text-white transition-all border border-gray-200 dark:border-white/10'>
                        View All Performance Reports
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {studies.map((study, idx) => (
                        <CaseStudyCard key={idx} {...study} />
                    ))}
                </div>

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
