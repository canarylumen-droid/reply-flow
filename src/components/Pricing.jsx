import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon, ArrowRightIcon, BrainIcon } from './Icons'
import { TiltCard } from './TiltCard'

const Pricing = () => {
    return (
        <section id="pricing" className='py-32 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden'>

            {/* Background Accent */}
            <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] pointer-events-none' />

            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='text-center mb-16 md:mb-24'>
                    <div className='inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6'>
                        The 2026 Partnership Model
                    </div>
                    <h2 className='text-3xl sm:text-5xl md:text-7xl font-black mb-8 tracking-tighter'>
                        Real Offers. Real Solutions. <br />
                        <span className='text-blue-600 underline decoration-blue-500/30 underline-offset-8'>Zero Retainer Fluff.</span>
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
                        We spent 2025 watching the "AI Hype" fail businesses with flashy tools that don't book calls. <br className='hidden md:block' />
                        The era of chasing clout is over. <span className='font-bold text-gray-900 dark:text-white'>We charge a setup fee and a 15% success fee. We only win when you close.</span>
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch'>

                    {/* Revenue Miner */}
                    <div className='p-10 rounded-[40px] bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 flex flex-col group hover:border-blue-500/30 transition-all duration-500'>
                        <div className='mb-8'>
                            <h3 className='text-2xl font-black mb-2'>Revenue Miner</h3>
                            <div className='inline-block px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6'>
                                Database Reactivation
                            </div>
                            <p className='text-gray-500 dark:text-gray-400 leading-relaxed font-medium'>
                                We dig through your "dead" database and extract hidden revenue. Perfect for clearing the low-hanging fruit before scaling.
                            </p>
                        </div>

                        <div className='mb-10'>
                            <div className='text-xs font-black text-gray-400 uppercase tracking-widest mb-4'>Pricing Structure</div>
                            <div className='text-3xl font-black text-gray-900 dark:text-white mb-2'>Setup Fee + 10%</div>
                            <div className='text-sm text-blue-600 font-bold'>Commission on recovered revenue</div>
                        </div>

                        <ul className='space-y-4 mb-12 flex-grow'>
                            <li className='flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300'>
                                <div className='w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center'><CheckIcon className="w-3 h-3 text-emerald-500" /></div>
                                Leads Database Auditing
                            </li>
                            <li className='flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300'>
                                <div className='w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center'><CheckIcon className="w-3 h-3 text-emerald-500" /></div>
                                Multi-Channel Reactivation
                            </li>
                            <li className='flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300'>
                                <div className='w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center'><CheckIcon className="w-3 h-3 text-emerald-500" /></div>
                                Zero Management Retainer
                            </li>
                        </ul>

                        <a
                            href="https://calendly.com/replyflow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='w-full py-4 rounded-2xl border-2 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-black text-sm uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-center block'
                        >
                            Inquire Now
                        </a>
                    </div>

                    {/* Managed Closer - MAIN OFFER */}
                    <TiltCard className='p-10 lg:p-12 rounded-[40px] bg-white dark:bg-black border-2 border-primary relative overflow-hidden flex flex-col shadow-[0_32px_64px_-16px_rgba(0,105,255,0.25)] md:-translate-y-8'>
                        <div className='absolute top-0 right-0 px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-3xl z-20'>
                            Most Requested
                        </div>

                        {/* Subtle Logo Background */}
                        <div className='absolute -top-10 -right-10 w-40 h-40 opacity-[0.03] dark:opacity-[0.05] pointer-events-none'>
                            <BrainIcon className='w-full h-full' />
                        </div>

                        <div className='mb-8 relative z-10'>
                            <h3 className='text-3xl font-black mb-2 font-syne uppercase tracking-tighter'>Managed Closer</h3>
                            <div className='inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6'>
                                Full Infrastructure Deployment
                            </div>
                            <p className='text-gray-500 dark:text-gray-300 leading-relaxed font-bold'>
                                A custom-trained AI Sales Agent that handles 100% of incoming traffic. We build, manage, and optimize the machine.
                            </p>
                        </div>

                        <div className='mb-10 p-6 rounded-3xl bg-primary/5 border border-primary/10 relative z-10'>
                            <div className='text-xs font-black text-gray-400 uppercase tracking-widest mb-4'>Partnership Terms</div>
                            <div className='text-4xl font-black text-primary mb-2'>Setup Fee + 15%</div>
                            <div className='text-sm text-gray-500 font-bold'>We only win when you close deals</div>
                        </div>

                        <ul className='space-y-4 mb-12 flex-grow relative z-10'>
                            {[
                                "90-Second Response Time (24/7)",
                                "Complex Objection Handling",
                                "Direct Calendar Booking",
                                "Full Pipeline Management",
                                "Human Oversight Included"
                            ].map((item, i) => (
                                <li key={i} className='flex items-center gap-3 text-sm font-bold text-gray-900 dark:text-white'>
                                    <div className='w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30'><CheckIcon className="w-3.5 h-3.5 text-white" /></div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://calendly.com/replyflow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='w-full py-5 lg:py-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-base lg:text-lg uppercase tracking-widest shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 relative z-10'
                        >
                            Build My Department <ArrowRightIcon className='w-5 h-5' />
                        </a>
                    </TiltCard>

                    {/* JV Partner */}
                    <div className='p-10 rounded-[40px] bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 flex flex-col group hover:border-purple-500/30 transition-all duration-500'>
                        <div className='mb-8'>
                            <h3 className='text-2xl font-black mb-2'>Revenue Partner</h3>
                            <div className='inline-block px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 text-[10px] font-black uppercase tracking-widest mb-6'>
                                Joint Venture ($100k+/mo)
                            </div>
                            <p className='text-gray-500 dark:text-gray-400 leading-relaxed font-medium'>
                                Reserved for established businesses. We become your fully outsourced sales and lead gen office. Full architecture, zero friction.
                            </p>
                        </div>

                        <div className='mb-10'>
                            <div className='text-xs font-black text-gray-400 uppercase tracking-widest mb-4'>Strategic Pricing</div>
                            <div className='text-3xl font-black text-gray-900 dark:text-white mb-2'>Custom JV Model</div>
                            <div className='text-sm text-purple-600 font-bold'>Equity or High-Share Partnership</div>
                        </div>

                        <ul className='space-y-4 mb-12 flex-grow'>
                            <li className='flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300'>
                                <div className='w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center'><CheckIcon className="w-3 h-3 text-purple-500" /></div>
                                Full Funnel Architecture
                            </li>
                            <li className='flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300'>
                                <div className='w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center'><CheckIcon className="w-3 h-3 text-purple-500" /></div>
                                Sales Process Optimization
                            </li>
                            <li className='flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300'>
                                <div className='w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center'><CheckIcon className="w-3 h-3 text-purple-500" /></div>
                                Dedicated Growth Partner
                            </li>
                        </ul>

                        <a
                            href="mailto:team@replyflow.pro?subject=Partnership%20Application%20-%20%5BAgency%20Name%5D&body=Hi%20ReplyFlow%20Team%2C%0A%0AI%20am%20submitting%20my%20application%20for%20a%20growth%20partnership.%20We%20are%20ready%20to%20deploy%20AI%20infrastructure%20to%20scale%20our%20revenue.%0A%0AHere%20are%20my%20agency%20details%3A%0A%0ACurrent%20Monthly%20Revenue%3A%20%0ANiche%20%2F%20Industry%3A%20%0AWebsite%3A%20%0A%0ALooking%20forward%20to%20the%20potential%20fit."
                            className='w-full py-4 rounded-2xl border-2 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-black text-sm uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-center block'
                        >
                            Apply for Partnership
                        </a>
                    </div>
                </div>

                {/* Deep Insights Footer */}
                <div className='mt-32 max-w-4xl mx-auto'>
                    <div className='p-12 rounded-[40px] bg-zinc-900 text-white relative overflow-hidden'>
                        <div className='absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mb-32' />

                        <div className='flex items-center gap-3 mb-8'>
                            <div className='w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500'>
                                <BrainIcon className='w-6 h-6' />
                            </div>
                            <h3 className='text-2xl font-black uppercase tracking-tight'>What We Learned in 2025</h3>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 leading-relaxed'>
                            <p className='text-gray-400'>
                                Everything is currently hype. Most "AI Influencers" are just selling prompt templates that don't produce real ROI. We realized that <span className='text-white font-bold'>real solutions aren't flashy</span>—they're robust, consistent, and invisible.
                            </p>
                            <p className='text-gray-400'>
                                In 2026, automation isn't about saving time; it's about <span className='text-white font-bold'>never missing a dollar.</span> Our model reflects this. We charge for the setup of your infrastructure, then we take our cut only when that infrastructure produces cash for you. No flash. Just math.
                            </p>
                        </div>

                        <div className='mt-10 pt-10 border-t border-white/5 text-center'>
                            <p className='text-blue-500 font-bold uppercase tracking-widest text-xs'>"The era of the automated closer is here. Double down or be left behind."</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pricing
