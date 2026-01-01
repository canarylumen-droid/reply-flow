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

                    {/* Column 1 - Discord Vibes */}
                    <div className='space-y-6 pt-10'>
                        <DiscordCard
                            user="Alex (Director of Sales)"
                            message="The reactivation campaign you guys built is printing. We just closed an extra $2.4M in property value this month solely from leads we thought were dead."
                            revenue="$60k Commission Added"
                            delay={0.1}
                        />
                        <InstagramCard
                            user="Dr. Sarah (Clinic Owner)"
                            message="We used to hire front desk staff just to chase leads. Now your AI does it instantly. Our show-up rate literally doubled in 30 days."
                            revenue="$15k New Revenue"
                            delay={0.2}
                        />
                    </div>

                    {/* Column 2 - High Value */}
                    <div className='space-y-6'>
                        <DiscordCard
                            user="Marcus (Dealership GM)"
                            message="I was skeptical about 'AI' handling my customers. But listening to the calls... it sounds more professional than my junior sales reps. It handled the financing objection perfectly."
                            revenue="$120k Pipeline Saved"
                            delay={0.3}
                        />
                        <DiscordCard
                            user="Jennifer (Law Partner)"
                            message="Speed is everything in law. We are now the first to reply to every inquiry 24/7. Validated my decision to partner with Reply Flow."
                            revenue="3 Retainers Secured this week"
                            delay={0.4}
                        />
                    </div>

                    {/* Column 3 - Fast scale */}
                    <div className='space-y-6 pt-10 sm:pt-20'>
                        <InstagramCard
                            user="FitnessChain_CEO"
                            message="I almost hired a call center. Glad you stopped me. This system recovered $50k in membership fees without me managing a single human."
                            revenue="$50k Recovered"
                            delay={0.5}
                        />
                        <DiscordCard
                            user="Mike (Roofing Contractor)"
                            message="My guys are good at roofing, not texting. Having this system filter the tire-kickers has saved my sanity. We only visit qualified homes now."
                            revenue="15 Qualified Estimates"
                            delay={0.6}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Testimonials
