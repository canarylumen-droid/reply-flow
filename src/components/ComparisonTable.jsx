import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon, XIcon, ArrowRightIcon } from './Icons'

const ComparisonTable = () => {
    const rows = [
        { service: "Personalized Training On Your Data", saas: false, traditional: false, agency: true },
        { service: "Daily Strategic Management", saas: false, traditional: true, agency: true },
        { service: "Multi-Channel (Email, SMS, IG)", saas: true, traditional: false, agency: true },
        { service: "Complex Objection Handling", saas: false, traditional: true, agency: true },
        { service: "Direct Calendar Booking", saas: false, traditional: true, agency: true },
        { service: "24/7 Response Speed (< 90s)", saas: true, traditional: false, agency: true },
        { service: "Zero Management Overhead", saas: false, traditional: false, agency: true },
    ]

    return (
        <section className='py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-black overflow-hidden relative border-b border-gray-100 dark:border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <div className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6 font-syne'>
                        The Competitive Edge
                    </div>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight font-syne uppercase'>
                        A Different World From <span className='text-primary underline decoration-primary/30 underline-offset-8 transition-all hover:decoration-primary duration-500'>SaaS & Old Agencies</span>
                    </h2>
                    <p className='text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto'>
                        SaaS tools sell you features. Traditional agencies sell you manual labor. <br />
                        <span className='font-bold text-gray-900 dark:text-white'>We build and manage the AI infrastructure that sells for you.</span>
                    </p>
                </div>

                <div className='hidden md:block overflow-x-auto pb-4'>
                    <table className='w-full text-left border-collapse min-w-[900px]'>
                        <thead>
                            <tr className='border-b border-gray-200 dark:border-white/10'>
                                <th className='py-8 pl-4 text-xl font-black text-gray-900 dark:text-white w-1/4'>Service</th>
                                <th className='py-8 px-4 text-center'>
                                    <div className='text-gray-400 text-sm font-bold uppercase tracking-widest mb-2'>Tooling</div>
                                    <div className='text-lg font-black text-gray-600 dark:text-gray-400'>SaaS Tools</div>
                                </th>
                                <th className='py-8 px-4 text-center'>
                                    <div className='text-gray-400 text-sm font-bold uppercase tracking-widest mb-2'>Manual</div>
                                    <div className='text-lg font-black text-gray-600 dark:text-gray-400'>Standard Agency</div>
                                </th>
                                <th className='py-8 px-4 text-center relative'>
                                    <div className='absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 -z-10 rounded-t-3xl' />
                                    <div className='text-blue-500 text-sm font-black uppercase tracking-widest mb-2'>Outcome-Driven</div>
                                    <div className='text-2xl font-black text-gray-900 dark:text-white'>Reply Flow</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className='border-b border-gray-100 dark:border-white/5 group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors'>
                                    <td className='py-6 pl-4 font-bold text-gray-700 dark:text-gray-300'>{row.service}</td>
                                    <td className='py-6 px-4 text-center'>
                                        {row.saas ? <CheckIcon className='w-6 h-6 text-gray-400 mx-auto' /> : <span className='text-gray-400 opacity-30'>—</span>}
                                    </td>
                                    <td className='py-6 px-4 text-center'>
                                        {row.traditional ? <CheckIcon className='w-6 h-6 text-gray-400 mx-auto' /> : <span className='text-gray-400 opacity-30'>—</span>}
                                    </td>
                                    <td className='py-6 px-4 text-center relative'>
                                        <div className='absolute inset-y-0 inset-x-0 bg-blue-500/5 dark:bg-blue-500/10 -z-10' />
                                        <CheckIcon className='w-8 h-8 text-blue-500 mx-auto' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className='py-8 text-right pr-12 text-gray-500 italic font-syne'>
                                    "Leads think they're talking to you — not a bot."
                                </td>
                                <td className='py-8 text-center relative'>
                                    <div className='absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 -z-10 rounded-b-3xl' />
                                    <div className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-black shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform cursor-pointer' onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })}>
                                        See The Difference <ArrowRightIcon className='w-4 h-4' />
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Mobile View: High Impact Cards */}
                <div className='md:hidden space-y-4'>
                    <div className='p-8 rounded-3xl bg-blue-600 text-white shadow-2xl relative overflow-hidden'>
                        <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl' />
                        <h3 className='text-2xl font-black mb-6 uppercase tracking-tight font-syne'>Why Reply Flow Wins</h3>
                        <div className='space-y-4'>
                            {rows.map((row, i) => (
                                <div key={i} className='flex items-start gap-3 border-b border-white/10 pb-4 last:border-0'>
                                    <CheckIcon className='w-5 h-5 text-blue-200 shrink-0 mt-0.5' />
                                    <div>
                                        <p className='font-bold text-sm leading-tight'>{row.service}</p>
                                        <p className='text-[10px] text-blue-100 uppercase mt-1 tracking-widest'>Fully Managed Infrastructure</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })}
                            className='w-full mt-8 py-4 bg-white text-blue-600 font-black rounded-xl uppercase tracking-widest text-sm shadow-xl'
                        >
                            Get Started
                        </button>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='p-6 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-white/5 opacity-60'>
                            <p className='text-xs font-black uppercase tracking-widest mb-4'>SaaS Tools</p>
                            <p className='text-[10px] text-gray-500'>Lacks strategic management and high-fidelity training.</p>
                        </div>
                        <div className='p-6 rounded-3xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-white/5 opacity-60'>
                            <p className='text-xs font-black uppercase tracking-widest mb-4'>Old Agency</p>
                            <p className='text-[10px] text-gray-500'>Expensive manual labor with slow response times.</p>
                        </div>
                    </div>
                </div>

                <p className='text-center text-sm text-gray-500 mt-12'>You don't lift a finger. We handle everything from setup to daily performance optimization.</p>

            </div>
        </section>
    )
}

export default ComparisonTable
