import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { DollarSignIcon, ArrowRightIcon } from './Icons'

const RoiCalculator = () => {
    const [leads, setLeads]         = useState(45)
    const [dealValue, setDealValue] = useState(1200)
    const [closeRate, setCloseRate] = useState(10)

    const stats = useMemo(() => {
        const currentRevenue    = leads * (closeRate / 100) * dealValue
        const lostRevenue       = leads * (1 - (closeRate / 100)) * dealValue
        const recoveredLeads    = (leads * (1 - (closeRate / 100))) * 0.08
        const recoveredRevenue  = recoveredLeads * dealValue
        return {
            currentRevenue,
            lostRevenue,
            recoveredRevenue,
            recoveredLeads: Math.floor(recoveredLeads)
        }
    }, [leads, dealValue, closeRate])

    const fmt = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

    return (
        <section id="roi" className='py-24 px-5 sm:px-12 lg:px-24 bg-[#080810] text-white overflow-hidden relative border-t border-white/5'>
            <div className='absolute inset-0 opacity-[0.15] pointer-events-none'
                style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)`, backgroundSize: '36px 36px' }} />

            <div className='max-w-6xl mx-auto relative z-10'>
                <div className='text-center mb-12 sm:mb-16'>
                    <div className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold uppercase tracking-[0.25em] mb-5'>
                        Revenue Calculator
                    </div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight font-syne'>
                        How much is slow<br />
                        <span className='text-primary'>follow-up costing you?</span>
                    </h2>
                    <p className='text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed'>
                        Most businesses only close the easiest 10%. We build the infrastructure that captures the rest. See the real numbers.
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch'>

                    {/* Controls */}
                    <div className='lg:col-span-4 bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-7 sm:p-8 border border-white/5 flex flex-col justify-between'>
                        <div className='space-y-10'>
                            {[
                                { label: 'Monthly Lead Volume', val: leads, set: setLeads, min: 10, max: 10000, step: 10, fmt: (v) => v.toLocaleString() },
                                { label: 'Average Deal Value',  val: dealValue, set: setDealValue, min: 500, max: 5000, step: 100, fmt: (v) => fmt(v) },
                                { label: 'Current Close Rate', val: closeRate, set: setCloseRate, min: 0.5, max: 8, step: 0.5, fmt: (v) => `${v}%` },
                            ].map((s) => (
                                <div key={s.label}>
                                    <div className='flex justify-between items-end mb-3'>
                                        <label className='text-xs font-medium text-gray-400 uppercase tracking-[0.15em]'>{s.label}</label>
                                        <div className='text-xl font-bold text-primary'>{s.fmt(s.val)}</div>
                                    </div>
                                    <input
                                        type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                                        onChange={(e) => s.set(Number(e.target.value))}
                                        className='w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer'
                                        style={{ accentColor: 'var(--primary)' }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='mt-10 p-5 rounded-2xl bg-primary/5 border border-primary/10 italic text-xs text-gray-400 leading-relaxed'>
                            "We bring response time from 12–24 hours down to 90 seconds. That's where the recovery happens."
                        </div>
                    </div>

                    {/* Results */}
                    <div className='lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5'>

                        {/* Leakage */}
                        <div className='bg-red-500/[0.06] rounded-3xl p-6 sm:p-8 border border-red-500/20'>
                            <div className='flex items-center gap-3 mb-7'>
                                <div className='w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-sm'>!</div>
                                <h3 className='text-base font-bold uppercase tracking-wide'>Monthly Leakage</h3>
                            </div>

                            <div className='space-y-4 text-sm'>
                                <div className='flex justify-between items-center py-3 border-b border-red-500/10'>
                                    <span className='text-gray-400'>Current monthly revenue</span>
                                    <span className='font-medium'>{fmt(stats.currentRevenue)}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 border-b border-red-500/10'>
                                    <span className='text-gray-400'>Leads you're not converting</span>
                                    <span className='font-medium text-red-400'>{(leads - (leads * closeRate / 100)).toLocaleString()} leads</span>
                                </div>
                                <div className='pt-2'>
                                    <div className='text-[10px] text-red-500/60 uppercase font-semibold tracking-[0.2em] mb-2'>Revenue left on the table</div>
                                    <div className='text-3xl sm:text-4xl font-black text-red-500 tracking-tight'>
                                        {fmt(stats.lostRevenue)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recovery */}
                        <div className='bg-green-500/[0.06] rounded-3xl p-6 sm:p-8 border border-green-500/25 relative overflow-hidden'>
                            <div className='absolute top-0 right-0 w-28 h-28 bg-green-500/10 rounded-full blur-3xl -mr-14 -mt-14 pointer-events-none' />

                            <div className='flex items-center gap-3 mb-7 relative z-10'>
                                <div className='w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500'>
                                    <DollarSignIcon className='w-4 h-4' />
                                </div>
                                <h3 className='text-base font-bold uppercase tracking-wide'>Recovery Potential</h3>
                            </div>

                            <div className='space-y-4 text-sm relative z-10'>
                                <div className='flex justify-between items-center py-3 border-b border-green-500/10'>
                                    <span className='text-gray-400'>Recovered leads (monthly)</span>
                                    <span className='font-medium text-green-400'>+ {stats.recoveredLeads}</span>
                                </div>
                                <div className='flex justify-between items-center py-3 border-b border-green-500/10'>
                                    <span className='text-gray-400'>Additional monthly revenue</span>
                                    <span className='font-medium text-green-400'>{fmt(stats.recoveredRevenue)}</span>
                                </div>
                                <div className='pt-2'>
                                    <div className='text-[10px] text-green-500/60 uppercase font-semibold tracking-[0.2em] mb-2'>Projected annual gain</div>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={stats.recoveredRevenue}
                                            initial={{ opacity: 0.7, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className='text-3xl sm:text-4xl font-black text-green-500 tracking-tight'
                                        >
                                            {fmt(stats.recoveredRevenue * 12)}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <button
                                onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                                className='mt-8 w-full py-4 bg-green-600 hover:bg-green-500 text-white font-semibold text-sm rounded-2xl transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 group relative z-10'
                            >
                                Book a Free Audit
                                <ArrowRightIcon className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
                            </button>
                        </div>
                    </div>
                </div>

                <p className='mt-10 text-center text-xs text-gray-600 max-w-xl mx-auto'>
                    Based on an 8% recovery rate of uncontacted leads using automated multi-channel follow-up. Actual results vary by industry and current response times.
                </p>
            </div>
        </section>
    )
}

export default RoiCalculator
