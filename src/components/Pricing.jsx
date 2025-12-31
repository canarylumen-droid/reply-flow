import React from 'react'
import { motion } from "framer-motion"
import { CheckIcon } from './Icons'
import { TiltCard } from './TiltCard'

const Pricing = () => {
    return (
        <section className='py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black text-gray-900 dark:text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-6xl font-bold mb-4'>How We Partner</h2>
                    <p className='text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed'>
                        We don't sell tools. We partner with businesses that are ready to scale and need an elite sales infrastructure.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Database Reactivation */}
                    <div className='p-10 rounded-3xl border border-gray-200 dark:border-zinc-800 hover:border-primary/50 transition-all flex flex-col'>
                        <h3 className='text-2xl font-bold mb-2'>Revenue Miner</h3>
                        <div className='text-3xl font-black text-primary mb-4'>Performance-Based</div>
                        <p className='text-gray-500 mb-8 font-normal leading-relaxed'>We dig through your "dead" database of old leads and extract hidden revenue by booking them into appointments. You only pay when we deliver results.</p>
                        <ul className='space-y-4 mb-10 flex-grow'>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span className='text-gray-700 dark:text-gray-300'>Leads Database Auditing</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span className='text-gray-700 dark:text-gray-300'>Omnichannel Reach Out</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span className='text-gray-700 dark:text-gray-300'>Pay Per Booked Appointment</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span className='text-gray-700 dark:text-gray-300'>Zero Upfront Risk</span></li>
                        </ul>
                        <a href="#book" className='block w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors text-center'>Inquire Now</a>
                    </div>

                    {/* Full Management */}
                    <TiltCard className='p-10 rounded-3xl border-2 border-primary bg-primary/5 relative transform md:-translate-y-6 shadow-2xl flex flex-col'>
                        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black px-4 py-1.5 rounded-full tracking-tighter uppercase'>
                            Most Requested
                        </div>
                        <h3 className='text-2xl font-bold mb-2'>Managed Closer</h3>
                        <div className='text-3xl font-black text-primary mb-4'>Retainer + Success Fee</div>
                        <p className='text-gray-200 mb-8 font-normal leading-relaxed'>A dedicated, custom-trained AI Sales Agent that handles 100% of your incoming traffic. This is the last sales department you'll ever need to hire.</p>
                        <ul className='space-y-4 mb-10 flex-grow text-gray-100'>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span>90-Second Response Time</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Complex Objection Handling</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Direct Calendar Booking</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span>Full Pipeline Management</span></li>
                        </ul>
                        <a href="#book" className='block w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-xl shadow-primary/30 text-center text-lg'>Build My Department</a>
                    </TiltCard>

                    {/* Growth Partner */}
                    <div className='p-10 rounded-3xl border border-gray-200 dark:border-zinc-800 hover:border-primary/50 transition-all flex flex-col'>
                        <h3 className='text-2xl font-bold mb-2'>Strategic Revenue Partner</h3>
                        <div className='text-3xl font-black text-primary mb-4'>Joint Venture Model</div>
                        <p className='text-gray-500 mb-8 font-normal leading-relaxed'>For established high-ticket businesses scaling past $100k/mo. We become your fully outsourced sales and lead gen office.</p>
                        <ul className='space-y-4 mb-10 flex-grow'>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span className='text-gray-700 dark:text-gray-300'>Full Funnel Architecture</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span className='text-gray-700 dark:text-gray-300'>Sales Process Optimization</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span className='text-gray-700 dark:text-gray-300'>Dedicated Account Partner</span></li>
                            <li className='flex items-center gap-3'><CheckIcon className="w-5 h-5 text-green-500" /> <span className='text-gray-700 dark:text-gray-300'>Revenue Share Incentives</span></li>
                        </ul>
                        <a href="#book" className='block w-full py-4 rounded-xl border border-gray-300 dark:border-zinc-700 font-semibold hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors text-center'>Apply for Partnership</a>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Pricing
