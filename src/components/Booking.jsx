import React from 'react'

const Booking = () => {
    return (
        <section id="booking-calendar" className='py-20 px-4 bg-white dark:bg-black'>
            <div className='max-w-5xl mx-auto'>
                <div className='text-center mb-10'>
                    <h2 className='text-3xl font-bold mb-4 dark:text-white'>Schedule Your Strategy Session</h2>
                    <p className='text-gray-500'>Our AI experts will analyze your current follow-up process and show you exactly where you're losing money.</p>
                </div>

                {/* Calendly Inline Widget Placeholder */}
                {/* In a real app, you would use react-calendly or a script tag. Here we simulate the embed visually */}
                <div className='w-full h-[700px] border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900 flex items-center justify-center relative'>
                    <div className='text-center p-8 absolute z-0 opacity-50 pointer-events-none'>
                        <p className='text-sm text-gray-400 mb-2'>Loading Calendar...</p>
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                    {/* Visual Placeholder for the iframe */}
                    <iframe
                        src="https://calendly.com/desire-test/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Calendly Scheduling Page"
                        className="relative z-10"
                    ></iframe>
                </div>
            </div>
        </section>
    )
}

export default Booking
