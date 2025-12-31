import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, PlusIcon, MinusIcon } from './Icons'

const FAQ = () => {
    const faqs = [
        {
            question: "How is this different from a standard chatbot?",
            answer: "Standard chatbots are reactive—they wait for customers to message. Our AI Agents are proactive. They reach out to dead leads, follow up on new inquiries instantly, and are trained on proven high-ticket sales scripts, not just support docs."
        },
        {
            question: "Do you replace my sales team?",
            answer: "We support them. We handle the grueling 'speed-to-lead' and qualification work (the top of funnel). Your closers only speak to qualified, booked appointments. This typically doubles their closing efficiency."
        },
        {
            question: "What happens if the AI doesn't know the answer?",
            answer: "Our system detects uncertainty instantly. If a question falls outside its training, it seamlessly alerts your team or prompts the user to book a call for complex questions. It never guesses."
        },
        {
            question: "How long does onboarding take?",
            answer: "Since we build this FOR you, we can have your AI Sales Department live in 48-72 hours. We handle the script training, CRM integration, and testing."
        },
        {
            question: "Does it work with my current CRM?",
            answer: "Yes. We integrate directly with GoHighLevel, HubSpot, Salesforce, and 30+ other major CRMs. The AI updates lead status in real-time."
        }
    ]

    const [openIndex, setOpenIndex] = useState(null)

    return (
        <section className='py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-5xl font-bold mb-6'>Common Questions</h2>
                    <p className='text-gray-500'>Everything you need to know about our managed service.</p>
                </div>

                <div className='space-y-4'>
                    {faqs.map((faq, index) => (
                        <div key={index} className='border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 transition-colors'>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className='w-full flex items-center justify-between p-6 text-left'
                            >
                                <span className='text-lg font-bold text-gray-900 dark:text-gray-100 pr-8'>{faq.question}</span>
                                <div className={`w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700 flex items-center justify-center transition-colors ${openIndex === index ? 'bg-primary text-white border-primary' : ''}`}>
                                    {openIndex === index ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className='overflow-hidden'
                                    >
                                        <div className='p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200/50 dark:border-white/5 mt-2'>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className='mt-16 text-center'>
                    <p className='text-gray-500 mb-6'>Still have specific requirements?</p>
                    <button onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })} className='inline-flex items-center gap-2 font-bold text-primary hover:underline underline-offset-4'>
                        Book a scoping call <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FAQ
