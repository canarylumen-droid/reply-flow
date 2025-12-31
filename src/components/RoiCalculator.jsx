import React, { useState } from 'react'
import { motion } from "framer-motion"
import { DollarSignIcon } from './Icons'

const RoiCalculator = () => {

    // State for inputs
    const [leads, setLeads] = useState(100)

    const [offerPrice, setOfferPrice] = useState(2000)
    const [closeRate, setCloseRate] = useState(10) // Percent

    // Metrics for calculation (Simulated improvements from Reply Flow)
    // Assume Reply Flow improves close rate by +5% (absolute) and recovers 20% of lost leads

    // Calculations
    const monthlyRevenue = leads * (closeRate / 100) * offerPrice
    const lostLeads = leads * (1 - (closeRate / 100))
    // Improving conversion by 20% relative, or recovering 20% of lost?
    // Let's say we recover 20% of leads that didn't buy.
    const recoveredRevenue = lostLeads * 0.2 * offerPrice

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
    }

    return (
        <section className='py-20 px-6 sm:px-12 lg:px-24 bg-gray-900 text-white overflow-hidden relative'>

            {/* Background Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none' />

            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-6xl font-black mb-4'>The Hidden Revenue Leak</h2>
                    <p className='text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed'>
                        Calculate exactly how much revenue you're leaving on the table right now by letting leads go cold.
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10'>

                    {/* Controls */}
                    <div className='space-y-8'>
                        <div>
                            <label className='block text-sm font-medium text-gray-400 mb-2'>Monthly Inbound Leads</label>
                            <input
                                type="range"
                                min="10" max="1000" step="10"
                                value={leads}
                                onChange={(e) => setLeads(Number(e.target.value))}
                                className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary'
                            />
                            <div className='mt-2 text-xl font-bold'>{leads} leads</div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-400 mb-2'>Average Deal Value ($)</label>
                            <input
                                type="range"
                                min="500" max="20000" step="500"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(Number(e.target.value))}
                                className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary'
                            />
                            <div className='mt-2 text-xl font-bold'>{formatCurrency(offerPrice)}</div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-400 mb-2'>Current Team Conversion (%)</label>
                            <input
                                type="range"
                                min="1" max="50" step="1"
                                value={closeRate}
                                onChange={(e) => setCloseRate(Number(e.target.value))}
                                className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary'
                            />
                            <div className='mt-2 text-xl font-bold'>{closeRate}%</div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className='bg-zinc-900 rounded-3xl p-10 border-2 border-green-500/30 text-center relative overflow-hidden'>
                        <div className='absolute top-0 w-full h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 left-0' />

                        <p className='text-xs text-gray-400 uppercase tracking-[0.2em] font-bold mb-4'>Revenue We Can Recover</p>
                        <motion.div
                            key={recoveredRevenue}
                            initial={{ scale: 0.9, opacity: 0.8 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className='text-6xl sm:text-7xl font-black text-green-400 mb-6 tracking-tighter'
                        >
                            + {formatCurrency(recoveredRevenue)}
                        </motion.div>
                        <p className='text-gray-500 text-lg mb-10 font-medium'>Monthly Added Top-Line Revenue</p>

                        <div className='pt-8 border-t border-white/10'>
                            <p className='text-xs text-gray-400 mb-2 uppercase tracking-widest'>Potential Annual Loss Stopped</p>
                            <div className='text-4xl font-black text-white'>{formatCurrency(recoveredRevenue * 12)}</div>
                        </div>

                        <button onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })} className='mt-10 w-full py-5 bg-primary text-white font-black text-lg rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest'>
                            Stop The Leak Now
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default RoiCalculator
