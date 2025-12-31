import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { DollarSignIcon, ArrowRightIcon } from './Icons'

const RoiCalculator = () => {
    // State for inputs
    const [leads, setLeads] = useState(500)
    const [dealValue, setDealValue] = useState(5000)
    const [closeRate, setCloseRate] = useState(10) // Percent

    // Professional Realistic Math:
    // 1. Current Revenue = leads * (closeRate/100) * dealValue
    // 2. The Leak = leads * (1 - closeRate/100) * dealValue (Total potential ignored)
    // 3. Realistic Recovery = We capture an additional 15% of those 'lost' leads through 90s response and 7-touch nurturing.
    // 4. Why? Industry data shows 78% of leads buy from the first responder. 

    const stats = useMemo(() => {
        const currentRevenue = leads * (closeRate / 100) * dealValue
        const lostRevenue = leads * (1 - (closeRate / 100)) * dealValue
        // 15% recovery is conservative and professional for a high-end agency
        const recoveredLeads = (leads * (1 - (closeRate / 100))) * 0.15
        const recoveredRevenue = recoveredLeads * dealValue
        const totalNewRevenue = currentRevenue + recoveredRevenue

        return {
            currentRevenue,
            lostRevenue,
            recoveredRevenue,
            totalNewRevenue,
            recoveredLeads: Math.floor(recoveredLeads)
        }
    }, [leads, dealValue, closeRate])

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val)
    }

    return (
        <section className='py-32 px-6 sm:px-12 lg:px-24 bg-[#0a0a0a] text-white overflow-hidden relative border-t border-white/5'>
            {/* Background Texture */}
            <div className='absolute inset-0 opacity-20 pointer-events-none'
                style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}
            />

            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='text-center mb-20'>
                    <div className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6 font-syne'>
                        Revenue Forensic Audit
                    </div>
                    <h2 className='text-5xl md:text-7xl font-black mb-8 tracking-tighter font-syne uppercase'>
                        Stop The <span className='text-red-500'>$0.00</span> Leaking <br />
                        <span className='text-primary underline decoration-primary/30 underline-offset-8 transition-all hover:decoration-primary duration-500'>Through Your CRM</span>
                    </h2>
                    <p className='text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed'>
                        Most businesses close the 10% that are "easy." We build the infrastructure to capture the 90% you're currently ignoring. See the real math.
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch'>

                    {/* Left: Controls (4 cols) */}
                    <div className='lg:col-span-4 bg-zinc-900/50 backdrop-blur-xl rounded-[40px] p-10 border border-white/5 flex flex-col justify-between'>
                        <div className='space-y-12'>
                            <div>
                                <div className='flex justify-between items-end mb-4'>
                                    <label className='text-sm font-black text-gray-400 uppercase tracking-widest'>Monthly Lead Volume</label>
                                    <div className='text-2xl font-black text-blue-500'>{leads.toLocaleString()}</div>
                                </div>
                                <input
                                    type="range"
                                    min="10" max="20000" step="50"
                                    value={leads}
                                    onChange={(e) => setLeads(Number(e.target.value))}
                                    className='w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500'
                                />
                            </div>

                            <div>
                                <div className='flex justify-between items-end mb-4'>
                                    <label className='text-sm font-black text-gray-400 uppercase tracking-widest'>Average Deal Value</label>
                                    <div className='text-2xl font-black text-blue-500'>{formatCurrency(dealValue)}</div>
                                </div>
                                <input
                                    type="range"
                                    min="500" max="20000" step="500"
                                    value={dealValue}
                                    onChange={(e) => setDealValue(Number(e.target.value))}
                                    className='w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500'
                                />
                            </div>

                            <div>
                                <div className='flex justify-between items-end mb-4'>
                                    <label className='text-sm font-black text-gray-400 uppercase tracking-widest'>Current Conversion</label>
                                    <div className='text-2xl font-black text-blue-500'>{closeRate}%</div>
                                </div>
                                <input
                                    type="range"
                                    min="1" max="50" step="1"
                                    value={closeRate}
                                    onChange={(e) => setCloseRate(Number(e.target.value))}
                                    className='w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500'
                                />
                            </div>
                        </div>

                        <div className='mt-12 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 italic text-sm text-gray-400'>
                            "The industry standard for manual follow-up is 12-24 hours. We bring that to 90 seconds. That's where the recovery happens."
                        </div>
                    </div>

                    {/* Right: Detailed Math Analysis (8 cols) */}
                    <div className='lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8'>

                        {/* The Leak Panel */}
                        <div className='bg-red-500/5 backdrop-blur-xl rounded-[40px] p-10 border border-red-500/20'>
                            <div className='flex items-center gap-3 mb-8'>
                                <div className='w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold'>!</div>
                                <h3 className='text-xl font-black uppercase tracking-tight'>The Monthly Leakage</h3>
                            </div>

                            <div className='space-y-6'>
                                <div className='flex justify-between items-center py-4 border-b border-red-500/10'>
                                    <span className='text-gray-400'>Current Monthly Revenue</span>
                                    <span className='font-bold'>{formatCurrency(stats.currentRevenue)}</span>
                                </div>
                                <div className='flex justify-between items-center py-4 border-b border-red-500/10'>
                                    <span className='text-gray-400'>Ignoring (Leads)</span>
                                    <span className='font-bold text-red-400'>{(leads - (leads * closeRate / 100)).toLocaleString()} leads</span>
                                </div>
                                <div className='pt-4'>
                                    <div className='text-xs text-red-500/70 uppercase font-black tracking-widest mb-2'>Total Capital Left On Table</div>
                                    <div className='text-4xl sm:text-5xl font-black text-red-500 tracking-tighter'>
                                        {formatCurrency(stats.lostRevenue)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* The Recovery Panel */}
                        <div className='bg-green-500/5 backdrop-blur-xl rounded-[40px] p-10 border border-green-500/30 relative overflow-hidden'>
                            <div className='absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16' />

                            <div className='flex items-center gap-3 mb-8'>
                                <div className='w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500'>
                                    <DollarSignIcon className='w-5 h-5' />
                                </div>
                                <h3 className='text-xl font-black uppercase tracking-tight text-white'>Recovery Potential</h3>
                            </div>

                            <div className='space-y-6'>
                                <div className='flex justify-between items-center py-4 border-b border-green-500/10'>
                                    <span className='text-gray-400'>Recovered Leads (Monthly)</span>
                                    <span className='font-bold text-green-400'>+ {stats.recoveredLeads}</span>
                                </div>
                                <div className='flex justify-between items-center py-4 border-b border-green-500/10'>
                                    <span className='text-gray-400'>New Top-Line Revenue</span>
                                    <span className='font-bold text-green-400'>{formatCurrency(stats.recoveredRevenue)} /mo</span>
                                </div>

                                <div className='pt-4'>
                                    <div className='text-xs text-green-500/70 uppercase font-black tracking-widest mb-2'>Projected Annual Gains</div>
                                    <motion.div
                                        key={stats.recoveredRevenue}
                                        initial={{ scale: 0.95 }}
                                        animate={{ scale: 1 }}
                                        className='text-4xl sm:text-5xl font-black text-green-500 tracking-tighter'
                                    >
                                        {formatCurrency(stats.recoveredRevenue * 12)}
                                    </motion.div>
                                </div>
                            </div>

                            <button
                                onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })}
                                className='mt-10 w-full py-5 bg-green-600 hover:bg-green-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-green-600/20 flex items-center justify-center gap-3 group'
                            >
                                Plug The Leak Now
                                <ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Footnote about realism */}
                <div className='mt-12 text-center'>
                    <p className='text-gray-500 text-sm max-w-2xl mx-auto'>
                        *This analysis uses a conservative 15% recovery rate of ignored leads. <br className='hidden sm:block' />
                        Real-world results vary based on industry and current response times, but most clients see immediate uplift by capturing the "Speed To Lead" advantage.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default RoiCalculator
