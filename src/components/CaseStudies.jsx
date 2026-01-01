import React from 'react'
import { motion } from "framer-motion"
import { BrainIcon, ArrowRightIcon } from './Icons'

const CaseStudyCard = ({ industry, problem, solution, metric, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.8 }}
        viewport={{ once: true }}
        className='group bg-white dark:bg-black border border-gray-100 dark:border-white/5 rounded-3xl p-8 hover:border-primary/50 transition-all shadow-2xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden'
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

        <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors'>
            {problem}
        </h3>

        <div className='space-y-4 mb-8'>
            <div className='flex items-start gap-3'>
                <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0' />
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                    <span className='text-gray-900 dark:text-white font-semibold'>Infrastructure:</span> {solution}
                </p>
            </div>
        </div>

        <div className='pt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between'>
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
            metric: "$14,500 Recovered",
            delay: 0.1
        },
        {
            industry: "B2B SaaS Agency",
            problem: "Saturated inbox leading to missed high-value discovery calls.",
            solution: "Intent-based AI Filtering & automated calendar scheduling.",
            metric: "$8,200 New Pipeline",
            delay: 0.2
        },
        {
            industry: "E-commerce Agency",
            problem: "Manual follow-up fatigue resulting in cart abandonment decay.",
            solution: "Persistent Multi-Channel Automation (Email + DM).",
            metric: "$12,400 Revenue Sync",
            delay: 0.3
        },
        {
            industry: "Consulting Firm",
            problem: "Cold leads going stagnant after initial inquiry.",
            solution: "AI-Driven Reactivation engine with dynamic personalization.",
            metric: "$17,800 Recaptured",
            delay: 0.4
        },
        {
            industry: "Real Estate Team",
            problem: "Weekend inquiries ignored until Monday morning.",
            solution: "24/7 Managed Infrastructure for instant lead qualification.",
            metric: "$9,500 Commission Saved",
            delay: 0.5
        },
        {
            industry: "Growth Agency",
            problem: "Operationally heavy manual lead vetting process.",
            solution: "High-Fidelity AI Sales Closer for 1st-level qualification.",
            metric: "$11,200 Op-Ex Saved",
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
                            We don't sell theory. We deploy high-fidelity sales machines that deliver measurable revenue recovery. These are the benchmarks of our active deployments.
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
