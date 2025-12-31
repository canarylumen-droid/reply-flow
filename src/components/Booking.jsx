import React, { useEffect } from 'react'

const Booking = () => {
    useEffect(() => {
        const head = document.querySelector("head");

        // Load CSS for Calendly
        const link = document.createElement("link");
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        link.rel = "stylesheet";
        head.appendChild(link);

        // Load JS for Calendly
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;

        script.onload = () => {
            // Initialize Badge Widget only after script is loaded
            if (window.Calendly) {
                window.Calendly.initBadgeWidget({
                    url: 'https://calendly.com/replyflow?hide_landing_page_details=1&hide_gdpr_banner=1',
                    text: 'Schedule time with me',
                    color: '#0069ff',
                    textColor: '#ffffff',
                    branding: true
                });
            }
        };

        head.appendChild(script);

        return () => {
            // Cleanup: remove badge widget from DOM if it exists
            const badge = document.querySelector('.calendly-badge-widget');
            if (badge) badge.remove();
            head.removeChild(script);
            head.removeChild(link);
        }
    }, []);

    return (
        <section id="booking-calendar" className='py-24 px-4 bg-white dark:bg-[#0A0A0B] border-t border-gray-100 dark:border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className='inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6'
                    >
                        Strategic Deployment
                    </motion.div>
                    <h2 className='text-4xl md:text-6xl font-black mb-6 dark:text-white tracking-tighter'>Review Your Strategy</h2>
                    <p className='text-xl text-gray-500 max-w-2xl mx-auto'>Our team will analyze your current infrastructure and show you exactly where revenue is leaking in real-time.</p>
                </div>

                <div
                    className="calendly-inline-widget w-full rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,105,255,0.05)] bg-white dark:bg-black border border-gray-100 dark:border-white/5"
                    data-url="https://calendly.com/replyflow?hide_landing_page_details=1&hide_gdpr_banner=1"
                    style={{ minWidth: '320px', height: '700px' }}
                />
            </div>
        </section>
    )
}

export default Booking
