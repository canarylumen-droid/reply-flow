import React from "react";
import { motion } from "framer-motion";
import { BrainIcon } from "./Icons";

const Footer = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-50 dark:bg-black pt-20 pb-10 px-4 sm:px-12 lg:px-24 border-t border-gray-200 dark:border-white/10"
    >
      {/* Footer Top */}
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-16 items-start">
        <motion.div
          className="space-y-4 max-w-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
              <BrainIcon className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold dark:text-white">Reply Flow</span>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Premier AI Sales Infrastructure for High-Ticket Agencies.
            <br />
            Powered by <strong className="text-gray-800 dark:text-gray-200">Audnix Intelligence</strong>.
          </p>

          <a href="mailto:info@replyflow.pro" className="inline-block text-primary font-semibold hover:underline">
            info@replyflow.pro
          </a>

          <div className="flex gap-4 pt-4">
            <span className="text-xs px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full dark:bg-white/5 dark:text-zinc-400 border border-zinc-200 dark:border-white/5 font-medium">SOC2 Compliant</span>
            <span className="text-xs px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full dark:bg-white/5 dark:text-zinc-400 border border-zinc-200 dark:border-white/5 font-medium">Enterprise Grade</span>
          </div>
        </motion.div>

        {/* Minimal Right Side */}
        <div className="flex flex-col items-start md:items-end gap-4 text-sm text-gray-500">
          <a onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer hover:text-white transition-colors">Start Your Application</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800 my-8" />

      {/* footer bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
        <p>© 2026 Reply Flow (Audnix AI). All rights reserved.</p>
        <p>info@replyflow.pro</p>
      </div>
    </motion.div>
  );
};

export default Footer;

