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
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
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
            AI sales intelligence powered by <strong className="text-gray-800 dark:text-gray-200">Audnix</strong>.
            We turn cold traffic into booked calls with zero friction.
          </p>

          <a href="mailto:info@replyflow.pro" className="inline-block text-primary font-semibold hover:underline">
            info@replyflow.pro
          </a>

          <div className="flex gap-4 pt-4">
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-400 font-medium">SOC2 Compliant</span>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded dark:bg-blue-900/30 dark:text-blue-400 font-medium">GDPR Ready</span>
          </div>
        </motion.div>

        <div className="flex gap-16 text-sm">
          <div>
            <h4 className="font-bold mb-4 dark:text-white">Product</h4>
            <ul className="space-y-3 text-gray-500 dark:text-gray-400">
              <li><a href="#roi" className="hover:text-primary">DOI Calculator</a></li>
              <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
              <li><a href="#book" className="hover:text-primary">Book Demo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 dark:text-white">Legal</h4>
            <ul className="space-y-3 text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Data Deletion</a></li>
            </ul>
          </div>
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

