import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon } from './Icons'
import { TiltCard } from './TiltCard'

const Pricing = () => {
    return (
        <section className='py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black text-gray-900 dark:text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl font-bold mb-4'>Our Service Levels</h2>
                    <p className='text-gray-500'>We don't sell tools. We sell results.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Database Reactivation */}
                    <div className='p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-primary/50 transition-all'>
                        <h3 className='text-xl font-bold mb-2'>Reactivation</h3>
                        <div className='text-3xl font-bold mb-4'>Performance Based</div>
                        <p className='text-sm text-gray-500 mb-6 font-normal'>We wake up your dead leads and book appointments instantly.</p>
                        <ul className='space-y-3 mb-8'>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Old Database Mining</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>SMS & Email AI</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Pay Per Booked Call</span></li>
                        </ul>
                        <a href="#book" className='block w-full py-3 rounded-lg border border-gray-300 dark:border-zinc-700 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-900 text-center'>Inquire Now</a>
                    </div>

                    {/* Full Management */}
                    <TiltCard className='p-8 rounded-2xl border border-primary bg-primary/5 relative transform md:-translate-y-4 shadow-xl'>
                        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full'>
                            CORE OFFER
                        </div>
                        <h3 className='text-xl font-bold mb-2'>Inbound Closer</h3>
                        <div className='text-3xl font-bold mb-4'>Monthly Retainer</div>
                        <p className='text-sm text-gray-200 mb-6 font-normal'>24/7 AI Sales Agent handling all your new ad traffic.</p>
                        <ul className='space-y-3 mb-8'>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Instant Lead Response</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Objection Handling</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Calendar Booking</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>CRM Integration</span></li>
                        </ul>
                        <a href="#book" className='block w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/25 text-center'>Book Strategy Call</a>
                    </TiltCard>

                    {/* Growth Partner */}
                    <div className='p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-primary/50 transition-all'>
                        <h3 className='text-xl font-bold mb-2'>Growth Partner</h3>
                        <div className='text-3xl font-bold mb-4'>Rev Share / Custom</div>
                        <p className='text-sm text-gray-500 mb-6 font-normal'>For established businesses doing $50k+/mo.</p>
                        <ul className='space-y-3 mb-8'>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Full Funnel Build</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Sales Optimization</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Dedicated Success Manager</span></li>
                        </ul>
                        <a href="#book" className='block w-full py-3 rounded-lg border border-gray-300 dark:border-zinc-700 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-900 text-center'>Apply for Partner</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pricing
