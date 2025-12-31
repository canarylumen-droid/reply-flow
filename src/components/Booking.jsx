import React, { useEffect } from 'react'

const Booking = () => {
    useEffect(() => {
        const head = document.querySelector("head");
        const script = document.createElement("script");
        script.setAttribute("src", "https://assets.calendly.com/assets/external/widget.js");
        head.appendChild(script);

        return () => {
            // Cleanup if necessary, though Calendly widget might persist in global scope
            head.removeChild(script);
        }
    }, []);

    return (
        <section id="booking-calendar" className='py-20 px-4 bg-white dark:bg-black'>
            <div className='max-w-5xl mx-auto'>
                <div className='text-center mb-10'>
                    <h2 className='text-3xl font-bold mb-4 dark:text-white'>Schedule Your Strategy Session</h2>
                    <p className='text-gray-500'>Our AI experts will analyze your current follow-up process and show you exactly where you're losing money.</p>
                </div>

                <div
                    className="calendly-inline-widget w-full rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900"
                    data-url="https://calendly.com/treasurenleanyachukwu/reply-flow-discovery-call?hide_gdpr_banner=1"
                    style={{ minWidth: '320px', height: '700px' }}
                />
            </div>
        </section>
    )
}

export default Booking
