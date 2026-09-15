import React from "react";
import { motion } from "framer-motion";
import { BrainIcon } from "./Icons";

const Footer = () => {
  const isLanding = typeof window !== 'undefined' && window.location.pathname === '/';

  const scrollToBook = () => {
    const el = document.getElementById('book');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = '/#book';
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-50 dark:bg-black pt-16 pb-10 px-5 sm:px-12 lg:px-24 border-t border-gray-200 dark:border-white/8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-14 items-start">

          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/15">
                <BrainIcon className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-gray-900 dark:text-white font-syne uppercase tracking-tight">REPLYFLOW</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              AI-powered lead follow-up and sales automation for agencies. Built and managed â€” done for you.
            </p>
            <a
              href="mailto:team@replyflow.pro"
              className="inline-block text-sm text-primary font-medium hover:underline"
            >
              team@replyflow.pro
            </a>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm flex-1">
            <div className="space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Navigation</p>
              <a href="/" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
              <a href="/#pricing" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Services</a>
              <a href="/blog" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Blog & Guides</a>
              <a href="/#roi" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">ROI Calculator</a>
              <a href="/#casestudies" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Case Studies</a>
              <a href="/#faq" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</a>
            </div>

            <div className="space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Growth Guides</p>
              <a href="/blog/how-to-get-more-clients-for-business" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Get More Clients</a>
              <a href="/blog/how-to-scale-a-service-business" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Scale to $100k/Mo</a>
              <a href="/blog/how-to-make-money-online-with-an-agency" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Make Money Online</a>
              <a href="/blog/best-agency-to-help-my-business-grow" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Best Growth Agency</a>
              <a href="/blog/b2b-lead-generation-strategies" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">B2B Lead Generation</a>
              <a href="/blog" className="block text-primary font-medium hover:underline text-xs pt-1">All 24 Playbooks â†’</a>
            </div>

            <div className="space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Sales Playbooks</p>
              <a href="/blog/how-to-increase-lead-conversion-rate" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Increase Conversion Rate</a>
              <a href="/blog/how-to-automate-sales-process" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Automate Sales Process</a>
              <a href="/blog/how-to-convert-leads-into-customers" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Convert Leads to Buyers</a>
              <a href="/blog/sales-response-time" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">90-Sec Response Time</a>
              <a href="/blog/dead-lead-reactivation-campaign-guide" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Dead Lead Reactivation</a>
              <a href="/blog/ai-sdr-replace-sales-rep-2026" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">AI SDR vs Human Reps</a>
            </div>

            <div className="space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Get Started</p>
              <button onClick={scrollToBook} className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-left">Book Strategy Call</button>
              <a href="https://calendly.com/replyflow" target="_blank" rel="noopener noreferrer" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Schedule Audit</a>
              <a href="mailto:team@replyflow.pro" className="block text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-zinc-800 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] text-gray-400">
          <p>Â© 2026 ReplyFlow Agency. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:team@replyflow.pro" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">team@replyflow.pro</a>
            <span>Â·</span>
            <a href="https://www.replyflow.pro" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">replyflow.pro</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
