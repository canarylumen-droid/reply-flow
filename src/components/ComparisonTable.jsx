import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon, XIcon, ArrowRightIcon } from './Icons'

const ComparisonTable = () => {
    const rows = [
        { service: "Personalised training on your data",    saas: false, traditional: false, agency: true },
        { service: "Daily strategic management",            saas: false, traditional: true,  agency: true },
        { service: "Multi-channel (Email, SMS, DM)",        saas: true,  traditional: false, agency: true },
        { service: "Complex objection handling",            saas: false, traditional: true,  agency: true },
        { service: "Direct calendar booking",               saas: false, traditional: true,  agency: true },
        { service: "24/7 response speed (< 90s)",           saas: true,  traditional: false, agency: true },
        { service: "Zero management overhead for you",      saas: false, traditional: false, agency: true },
    ]

    return (
        <section className='py-24 px-5 md:px-12 lg:px-24 bg-white dark:bg-black overflow-hidden relative border-b border-gray-100 dark:border-white/5'>
            <div className='max-w-6xl mx-auto'>
                <div className='text-center mb-14'>
                    <div className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold uppercase tracking-[0.25em] mb-5'>
                        How We Compare
                    </div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight font-syne'>
                        A different model to <span className='text-primary'>SaaS tools & old agencies</span>
                    </h2>
                    <p className='text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto'>
                        SaaS tools sell features. Traditional agencies sell manual labor. We build and manage the AI infrastructure that handles sales for you.
                    </p>
                </div>

                {/* Desktop Table */}
                <div className='hidden md:block overflow-x-auto pb-4'>
                    <table className='w-full text-left border-collapse min-w-[820px]'>
                        <thead>
                            <tr className='border-b border-gray-200 dark:border-white/10'>
                                <th className='py-7 pl-4 text-base font-semibold text-gray-500 dark:text-gray-400 w-2/5'>Capability</th>
                                <th className='py-7 px-4 text-center'>
                                    <div className='text-[10px] text-gray-400 font-semibold uppercase tracking-[0.2em] mb-1'>Tooling</div>
                                    <div className='text-base font-semibold text-gray-500 dark:text-gray-400'>SaaS Tools</div>
                                </th>
                                <th className='py-7 px-4 text-center'>
                                    <div className='text-[10px] text-gray-400 font-semibold uppercase tracking-[0.2em] mb-1'>Manual</div>
                                    <div className='text-base font-semibold text-gray-500 dark:text-gray-400'>Standard Agency</div>
                                </th>
                                <th className='py-7 px-4 text-center relative'>
                                    <div className='absolute inset-0 bg-primary/5 dark:bg-primary/10 -z-10 rounded-t-3xl' />
                                    <div className='text-[10px] text-primary font-semibold uppercase tracking-[0.2em] mb-1'>Done-For-You</div>
                                    <div className='text-lg font-bold text-gray-900 dark:text-white'>ReplyFlow</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className='border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors'>
                                    <td className='py-5 pl-4 text-sm font-medium text-gray-700 dark:text-gray-300'>{row.service}</td>
                                    <td className='py-5 px-4 text-center'>
                                        {row.saas ? <CheckIcon className='w-5 h-5 text-gray-400 mx-auto' /> : <span className='text-gray-300 dark:text-gray-700 text-lg'>—</span>}
                                    </td>
                                    <td className='py-5 px-4 text-center'>
                                        {row.traditional ? <CheckIcon className='w-5 h-5 text-gray-400 mx-auto' /> : <span className='text-gray-300 dark:text-gray-700 text-lg'>—</span>}
                                    </td>
                                    <td className='py-5 px-4 text-center relative'>
                                        <div className='absolute inset-y-0 inset-x-0 bg-primary/5 dark:bg-primary/10 -z-10' />
                                        <CheckIcon className='w-6 h-6 text-primary mx-auto' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className='py-8 text-right pr-12 text-gray-400 italic text-sm font-syne'>
                                    "Leads think they're talking to you — not a bot."
                                </td>
                                <td className='py-8 text-center relative'>
                                    <div className='absolute inset-0 bg-primary/5 dark:bg-primary/10 -z-10 rounded-b-3xl' />
                                    <button
                                        onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                                        className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold text-sm shadow-lg shadow-primary/20 hover:scale-[1.03] transition-transform'
                                    >
                                        Get Started <ArrowRightIcon className='w-4 h-4' />
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Mobile Card */}
                <div className='md:hidden space-y-4'>
                    <div className='p-7 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden'>
                        <div className='absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-14 -mt-14 blur-2xl' />
                        <h3 className='text-xl font-bold mb-5 font-syne'>Why ReplyFlow Wins</h3>
                        <div className='space-y-3.5'>
                            {rows.map((row, i) => (
                                <div key={i} className='flex items-start gap-3 border-b border-white/10 pb-3.5 last:border-0'>
                                    <CheckIcon className='w-4 h-4 text-blue-200 shrink-0 mt-0.5' />
                                    <div>
                                        <p className='font-medium text-sm leading-tight'>{row.service}</p>
                                        <p className='text-[10px] text-blue-200 mt-0.5 tracking-wide'>Fully managed</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                            className='w-full mt-7 py-3.5 bg-white text-primary font-bold rounded-xl text-sm'
                        >
                            Get Started
                        </button>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        <div className='p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/5 opacity-60'>
                            <p className='text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300'>SaaS Tools</p>
                            <p className='text-xs text-gray-500'>Lacks strategic management and custom training.</p>
                        </div>
                        <div className='p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/5 opacity-60'>
                            <p className='text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300'>Old Agency</p>
                            <p className='text-xs text-gray-500'>Manual labor — expensive and slow to respond.</p>
                        </div>
                    </div>
                </div>

                <p className='text-center text-sm text-gray-400 mt-10'>You don't lift a finger. We handle everything from setup to daily optimisation.</p>
            </div>
        </section>
    )
}

export default ComparisonTable
