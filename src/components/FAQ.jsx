import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, PlusIcon, MinusIcon } from './Icons'

const FAQ = () => {
    const faqs = [
        {
            question: "How is this different from a standard chatbot?",
            answer: "Standard chatbots are reactive, decision-tree scripts that frustrate users. Our Sales Infrastructure is built on proprietary LLM architectures that utilize behavioral heuristics. It doesn't just answer; it detects buying intent, handles complex objections, and pivots the conversation toward high-ticket conversion in real-time."
        },
        {
            question: "Do you replace my sales team?",
            answer: "We weaponize them. By automating the grueling 90% of qualification and follow-up, we remove 'tire-kickers' from your pipeline. Your closers stop chasing leads and start closing them. We handle the top-of-funnel noise so your team can focus exclusively on high-value revenue activities."
        },
        {
            question: "What happens if the AI doesn't know the answer?",
            answer: "Our 'Human-in-the-Loop' safety protocol ensures 100% accuracy. If the AI detects a query outside its custom-trained Knowledge Base, it doesn't guess. It intelligently pauses the automation, tags your team for a manual takeover, or seamlessly pivots to a scoping call booking based on the lead's intent score."
        },
        {
            question: "How long does onboarding take?",
            answer: "We move at the speed of scale. Because this is a fully Managed Service, we handle the heavy lifting. Standard deployment is 48-72 hours. For complex enterprise integrations, our 'Deep-Dive' onboarding takes 7 days—covering custom prompt engineering, CRM mapping, and rigorous stress-testing against your historical objections."
        },
        {
            question: "Does it work with my current CRM?",
            answer: "We don't just 'integrate'; we synchronize. We build custom logic bridges for HubSpot, Salesforce, GoHighLevel, and 30+ other platforms. The AI updates lead stages, records sentiment analysis, and triggers internal workflows automatically, ensuring your CRM becomes a high-fidelity record of truth."
        }
    ]

    const [openIndex, setOpenIndex] = useState(null)

    return (
        <section className='py-24 px-6 sm:px-12 lg:px-24 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-16'>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className='text-3xl md:text-5xl font-bold mb-6'
                    >
                        Intelligence & Infrastructure
                    </motion.h2>
                    <p className='text-gray-500 text-lg'>Everything you need to know about our high-performance managed service.</p>
                </div>

                <div className='space-y-4'>
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`border rounded-2xl overflow-hidden transition-all duration-300 group ${openIndex === index
                                    ? 'border-primary/30 bg-primary/5 dark:bg-primary/5 shadow-lg shadow-primary/5'
                                    : 'border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 hover:border-primary/20 hover:shadow-md'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className='w-full flex items-center justify-between p-7 text-left'
                            >
                                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-primary' : 'text-gray-900 dark:text-gray-100'}`}>
                                    {faq.question}
                                </span>
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === index
                                        ? 'bg-primary text-white border-primary rotate-180'
                                        : 'border-gray-300 dark:border-zinc-700 group-hover:border-primary/50'
                                    }`}>
                                    {openIndex === index ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className='overflow-hidden'
                                    >
                                        <div className='p-7 pt-0 text-gray-600 dark:text-gray-400 text-base leading-relaxed border-t border-gray-200/50 dark:border-white/5 mt-2'>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className='mt-16 text-center bg-gray-50 dark:bg-zinc-900/40 p-10 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-800'>
                    <p className='text-gray-900 dark:text-gray-100 text-xl font-bold mb-4'>Still have specific requirements?</p>
                    <p className='text-gray-500 mb-8 max-w-lg mx-auto'>We handle custom workflows, proprietary integrations, and unique objection-handling for industry leaders.</p>
                    <a
                        href="https://calendly.com/replyflow"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-primary/20'
                    >
                        Book a scoping call <ArrowRightIcon className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default FAQ
