import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon } from './Icons'
import { TiltCard } from './TiltCard'

const Pricing = () => {
    return (
        <section className='py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black text-gray-900 dark:text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl font-bold mb-4'>Simple Pricing</h2>
                    <p className='text-gray-500'>You're not buying software. You're hiring a closer.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Starter */}
                    <div className='p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-primary/50 transition-all'>
                        <h3 className='text-xl font-bold mb-2'>Starter</h3>
                        <div className='text-4xl font-bold mb-6'>$49<span className='text-lg font-normal text-gray-500'>/mo</span></div>
                        <ul className='space-y-3 mb-8'>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>500 Leads/mo</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Basic Auto-reply</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Standard Support</span></li>
                        </ul>
                        <button className='w-full py-3 rounded-lg border border-gray-300 dark:border-zinc-700 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-900'>Get Started</button>
                    </div>

                    {/* Pro */}
                    <TiltCard className='p-8 rounded-2xl border border-primary bg-primary/5 relative transform md:-translate-y-4 shadow-xl'>
                        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full'>
                            MOST POPULAR
                        </div>
                        <h3 className='text-xl font-bold mb-2'>Pro</h3>
                        <div className='text-4xl font-bold mb-6'>$99<span className='text-lg font-normal text-gray-500'>/mo</span></div>
                        <ul className='space-y-3 mb-8'>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Unlimited Leads</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Advanced AI Context</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Objection Handling</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Priority Support</span></li>
                        </ul>
                        <button className='w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/25'>Recover Lost Revenue</button>
                    </TiltCard>

                    {/* Enterprise */}
                    <div className='p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-primary/50 transition-all'>
                        <h3 className='text-xl font-bold mb-2'>Enterprise</h3>
                        <div className='text-4xl font-bold mb-6'>$199<span className='text-lg font-normal text-gray-500'>/mo</span></div>
                        <ul className='space-y-3 mb-8'>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Custom Integrations</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Dedicated AC Manager</span></li>
                            <li className='flex items-center gap-2'><CheckIcon className="w-5 h-5 text-green-500" /> <span>White-labeling</span></li>
                        </ul>
                        <button className='w-full py-3 rounded-lg border border-gray-300 dark:border-zinc-700 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-900'>Contact Sales</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pricing
