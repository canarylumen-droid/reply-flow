import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon, ArrowRightIcon, BrainIcon } from './Icons'
import { TiltCard } from './TiltCard'

const Pricing = () => {
    return (
        <section id="pricing" className='relative py-24 px-5 sm:px-12 lg:px-24 bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden'>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] dark:opacity-[0.06]">
                <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px]"></div>
            </div>
            <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none' />

            <div className='max-w-6xl mx-auto relative z-10'>
                <div className='text-center mb-14 md:mb-20'>
                    <div className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold uppercase tracking-[0.25em] mb-5'>
                        ReplyFlow Pricing
                    </div>
                    <h2 className='text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight font-syne'>
                        Clear offers.<br />
                        <span className='text-primary'>No retainer fluff.</span>
                    </h2>
                    <p className='text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed'>
                        We charge a setup fee and a success fee. <span className='font-medium text-gray-700 dark:text-gray-200'>We only win when you close.</span>
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch'>

                    {/* Revenue Miner */}
                    <div className='p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 flex flex-col group hover:border-primary/25 transition-all duration-500'>
                        <div className='mb-7'>
                            <h3 className='text-xl font-bold mb-2'>Revenue Miner</h3>
                            <div className='inline-block px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold uppercase tracking-wider mb-5'>
                                Database Reactivation
                            </div>
                            <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                                We dig through your existing lead database and run structured reactivation campaigns to surface deals that went cold.
                            </p>
                        </div>

                        <div className='mb-8'>
                            <div className='text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3'>Pricing</div>
                            <div className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>Setup Fee + 10%</div>
                            <div className='text-sm text-emerald-600 font-medium'>Commission on recovered revenue</div>
                        </div>

                        <ul className='space-y-3 mb-10 flex-grow'>
                            {['Lead database auditing', 'Multi-channel reactivation', 'No ongoing management retainer'].map((item, i) => (
                                <li key={i} className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
                                    <div className='w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0'>
                                        <CheckIcon className="w-2.5 h-2.5 text-emerald-500" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="https://calendly.com/replyflow" target="_blank" rel="noopener noreferrer"
                            className='w-full py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-center block'>
                            Enquire Now
                        </a>
                    </div>

                    {/* Managed Closer — main */}
                    <TiltCard className='p-8 lg:p-10 rounded-3xl bg-white dark:bg-black border-2 border-primary relative overflow-hidden flex flex-col shadow-[0_24px_60px_-12px_rgba(37,99,235,0.22)] md:-translate-y-6'>
                        <div className='absolute top-0 right-0 px-5 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-bl-2xl z-20'>
                            Most Popular
                        </div>
                        <div className='absolute -top-8 -right-8 w-36 h-36 opacity-[0.04] pointer-events-none'>
                            <BrainIcon className='w-full h-full' />
                        </div>

                        <div className='mb-7 relative z-10'>
                            <h3 className='text-2xl font-bold mb-2 font-syne'>Managed Closer</h3>
                            <div className='inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider mb-5'>
                                Full Infrastructure
                            </div>
                            <p className='text-sm text-gray-500 dark:text-gray-300 leading-relaxed'>
                                A custom-trained AI sales agent handling 100% of incoming leads. We build, manage, and optimise the system — you just close.
                            </p>
                        </div>

                        <div className='mb-8 p-5 rounded-2xl bg-primary/5 border border-primary/15 relative z-10'>
                            <div className='text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3'>Partnership terms</div>
                            <div className='text-3xl font-bold text-primary mb-1'>Setup Fee + 15%</div>
                            <div className='text-sm text-gray-400'>We only earn when you close deals</div>
                        </div>

                        <ul className='space-y-3 mb-10 flex-grow relative z-10'>
                            {[
                                '90-second response time (24/7)',
                                'Complex objection handling',
                                'Direct calendar booking',
                                'Full pipeline management',
                                'Human oversight included',
                            ].map((item, i) => (
                                <li key={i} className='flex items-center gap-3 text-sm text-gray-800 dark:text-white font-medium'>
                                    <div className='w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/25 shrink-0'>
                                        <CheckIcon className="w-3 h-3 text-white" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="https://calendly.com/replyflow" target="_blank" rel="noopener noreferrer"
                            className='w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2.5 relative z-10'>
                            Build My System <ArrowRightIcon className='w-4 h-4' />
                        </a>
                    </TiltCard>

                    {/* Revenue Partner */}
                    <div className='p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 flex flex-col group hover:border-purple-500/25 transition-all duration-500'>
                        <div className='mb-7'>
                            <h3 className='text-xl font-bold mb-2'>Revenue Partner</h3>
                            <div className='inline-block px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 text-[10px] font-semibold uppercase tracking-wider mb-5'>
                                Joint Venture ($100k+/mo)
                            </div>
                            <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
                                For established agencies ready to fully outsource their sales and lead generation. Full architecture, dedicated team.
                            </p>
                        </div>

                        <div className='mb-8'>
                            <div className='text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3'>Pricing</div>
                            <div className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>Custom JV Model</div>
                            <div className='text-sm text-purple-600 font-medium'>Equity or high-share partnership</div>
                        </div>

                        <ul className='space-y-3 mb-10 flex-grow'>
                            {['Full funnel architecture', 'Sales process optimisation', 'Dedicated growth partner'].map((item, i) => (
                                <li key={i} className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
                                    <div className='w-4 h-4 rounded-full bg-purple-500/15 flex items-center justify-center shrink-0'>
                                        <CheckIcon className="w-2.5 h-2.5 text-purple-500" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="mailto:team@replyflow.pro?subject=Revenue%20Partnership%20Enquiry"
                            className='w-full py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-medium text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-center block'>
                            Apply for Partnership
                        </a>
                    </div>
                </div>

                {/* Insight block */}
                <div className='mt-24 max-w-3xl mx-auto'>
                    <div className='p-8 sm:p-10 rounded-3xl bg-zinc-900 text-white relative overflow-hidden'>
                        <div className='absolute bottom-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl -mr-28 -mb-28 pointer-events-none' />

                        <div className='flex items-center gap-3 mb-6'>
                            <div className='w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary'>
                                <BrainIcon className='w-5 h-5' />
                            </div>
                            <h3 className='text-lg font-bold'>Why this model works</h3>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed'>
                            <p className='text-gray-400'>
                                Most "AI agencies" sell you a Zapier workflow dressed up as an AI system. Real infrastructure is built on your data, your voice, and your sales logic — not a template.
                            </p>
                            <p className='text-gray-400'>
                                We take a commission because it aligns our incentives with yours. <span className='text-white font-medium'>We only earn when you close.</span> No retainer means no reason to coast.
                            </p>
                        </div>

                        <div className='mt-8 pt-7 border-t border-white/5 text-center'>
                            <p className='text-primary font-medium text-xs uppercase tracking-[0.25em]'>Setup fee covers build. Commission covers performance. Simple.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pricing
