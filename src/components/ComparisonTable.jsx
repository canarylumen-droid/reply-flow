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
                    <div className='inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6'>
                        The Competitive Edge
                    </div>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight'>
                        A Different World From <span className='text-blue-500 underline decoration-blue-500/30 underline-offset-8 transition-all hover:decoration-blue-500 duration-500'>SaaS & Old Agencies</span>
                    </h2>
                    <p className='text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto'>
                        SaaS tools sell you features. Traditional agencies sell you manual labor. <br />
                        <span className='font-bold text-gray-900 dark:text-white'>We build and manage the AI infrastructure that sells for you.</span>
                    </p>
                </div>

                <div className='overflow-x-auto pb-4'>
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
                                <td colSpan={3} className='py-8 text-right pr-12 text-gray-500 italic'>
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
                <p className='text-center text-sm text-gray-500 mt-12'>You don't lift a finger. We handle everything from setup to daily performance optimization.</p>
            </div>
        </section>
    )
}

export default ComparisonTable
