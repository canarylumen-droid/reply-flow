import React from 'react'
import { motion } from "framer-motion"

// Discord-style card component
const DiscordCard = ({ user, handle, message, revenue, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay, duration: 0.5 }}
        className='bg-[#313338] text-gray-100 p-4 rounded-lg max-w-sm w-full font-sans shadow-xl border-l-4 border-indigo-500 mb-6 mx-auto'
    >
        <div className='flex items-start gap-3'>
            <div className='w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white shrink-0'>
                {user.charAt(0)}
            </div>
            <div>
                <div className='flex items-baseline gap-2'>
                    <span className='font-semibold text-white hover:underline cursor-pointer'>{user}</span>
                    <span className='text-xs text-gray-400'>Today at 9:41 AM</span>
                </div>
                <p className='text-sm text-gray-300 mt-1 leading-relaxed opacity-90'>
                    {message}
                </p>
                {revenue && (
                    <div className='mt-3 inline-flex items-center gap-2 bg-[#2B2D31] px-3 py-1.5 rounded text-xs font-bold text-green-400 border border-green-500/20'>
                        <span>💸 Recovered: {revenue}</span>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
)

// Instagram-style DM component
const InstagramCard = ({ user, message, revenue, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: delay, duration: 0.5 }}
        className='bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 p-5 rounded-2xl max-w-sm w-full shadow-lg mb-6 mx-auto relative'
    >
        <div className='absolute -left-2 top-8 w-4 h-4 bg-white dark:bg-black border-l border-b border-gray-200 dark:border-zinc-800 transform rotate-45' />
        <div className='flex justify-between items-center mb-2'>
            <span className='text-xs font-bold text-gray-500 uppercase tracking-wide'>Direct Message</span>
            <div className='w-2 h-2 rounded-full bg-blue-500' />
        </div>
        <p className='text-gray-800 dark:text-gray-200 text-sm mb-3'>
            {message}
        </p>
        {revenue && (
            <p className='text-green-600 dark:text-green-500 font-bold text-sm'>
                + {revenue} added to pipeline
            </p>
        )}
    </motion.div>
)

const Testimonials = () => {
    return (
        <section className='py-24 px-6 bg-gray-50 dark:bg-[#050505] overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className='text-3xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white'
                    >
                        Results You Can Deposit.
                    </motion.h2>
                    <p className='text-gray-500 dark:text-gray-400 max-w-xl mx-auto'>
                        We don't sell "engagement". We sell revenue recovery. See what our partners are saying in the active channels.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

                    {/* Column 1 - Service Sectors */}
                    <div className='space-y-6 pt-10'>
                        <DiscordCard
                            user="Modern Arc Realty (Manager)"
                            message="The reactivation engine is insane. Just recovered two high-intent purchasers from a dead 2023 list. That's nearly $85k in commission equity back on the table."
                            revenue="$85,000 Equity Recovered"
                            delay={0.1}
                        />
                        <InstagramCard
                            user="Elite Wellness Systems"
                            message="Our biggest leak was the weekend gap. People would inquire Saturday and we'd reply Monday. Your AI now closes them in 30 seconds on Saturday night. Booking rates are up 40%."
                            revenue="12 New Consults/Week"
                            delay={0.2}
                        />
                    </div>

                    {/* Column 2 - Agency & Founder Focus */}
                    <div className='space-y-6'>
                        <DiscordCard
                            user="Growth Ops (Founder)"
                            message="I was worried about the AI sounding 'botty' for a tech audience. But it handles the technical integration questions better than our junior SDRs. The 15% recovery model is a steal."
                            revenue="$12k MRR Saved"
                            delay={0.3}
                        />
                        <DiscordCard
                            user="Scale Media Group"
                            message="Client intake is now 100% autonomous. The speed-to-lead is actually 2 seconds. For a scaling agency, if you aren't first, you're last. This puts us first every single time."
                            revenue="9 Retainers Signed"
                            delay={0.4}
                        />
                    </div>

                    {/* Column 3 - High-Intent Niche */}
                    <div className='space-y-6 pt-10 sm:pt-20'>
                        <InstagramCard
                            user="Summit Solar Partners"
                            message="We stopped buying new leads because we had 5,000 old ones sitting there. Your system has turned that 'trash' into 20 qualified site surveys in two weeks."
                            revenue="20 Validated Surveys"
                            delay={0.5}
                        />
                        <DiscordCard
                            user="Pro-Line Exterior Solutions"
                            message="I don't have to manage my sales guys' follow-ups anymore. The AI does the heavy lifting of chasing. We only step in when the contract is ready to sign."
                            revenue="$45k Pipeline Velocity"
                            delay={0.6}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Testimonials
