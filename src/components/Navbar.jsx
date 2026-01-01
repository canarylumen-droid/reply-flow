import React, { useState } from "react";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion } from "framer-motion";
import { BrainIcon, ArrowRightIcon } from "./Icons";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-6 sticky top-0 z-50 backdrop-blur-xl font-medium bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-white/10"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 group cursor-pointer relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-12 h-12 bg-primary flex items-center justify-center text-white rounded-xl shadow-[0_0_20px_rgba(0,105,255,0.3)] rotate-[-5deg] group-hover:rotate-0 transition-transform relative z-10 overflow-hidden">
          <img src="/reply_flow_logo.png" alt="Reply Flow Logo" className="w-8 h-8 object-contain" />
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl font-[900] tracking-tighter text-gray-900 dark:text-white leading-none font-syne uppercase">REPLYFLOW</h1>
          <p className="text-[9px] text-primary uppercase tracking-[0.3em] font-black mt-1">Infrastructure agency</p>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar / Menu Links */}
      <div
        className={`fixed sm:static top-0 right-0 h-full sm:h-auto flex flex-col sm:flex-row sm:items-center gap-8 bg-white dark:bg-zinc-900 sm:bg-transparent transition-all duration-300 z-[60] shadow-2xl sm:shadow-none
          ${sidebarOpen ? "w-72 px-8 pt-24" : "w-0 overflow-hidden sm:w-auto sm:px-0 sm:pt-0"}`}
      >
        {/* Close Button (Mobile Only) */}
        <button
          className="absolute right-6 top-6 sm:hidden text-3xl text-gray-500 hover:text-primary transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          &times;
        </button>

        <a onClick={() => setSidebarOpen(false)} href="#hero" className="text-lg sm:text-sm hover:text-primary transition-colors font-bold sm:font-semibold">
          Home
        </a>
        <a onClick={() => setSidebarOpen(false)} href="#testimonials" className="text-lg sm:text-sm hover:text-primary transition-colors font-bold sm:font-semibold">
          Case Studies
        </a>
        <a onClick={() => setSidebarOpen(false)} href="#pricing" className="text-lg sm:text-sm hover:text-primary transition-colors font-bold sm:font-semibold">
          Services
        </a>
        <a onClick={() => setSidebarOpen(false)} href="#roi" className="text-lg sm:text-sm hover:text-primary transition-colors font-bold sm:font-semibold">
          Calculator
        </a>
        
        {/* Mobile-only CTA */}
        <a
          href="https://calendly.com/replyflow"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold mt-4"
        >
          Book Audit <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 sm:gap-4 relative z-[10]">
        {/* Theme Toggle */}
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden p-2 text-2xl text-gray-900 dark:text-white"
        >
          &#9776;
        </button>

        {/* Contact Button (hidden on small screens) */}
        <a
          href="https://calendly.com/replyflow"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full cursor-pointer hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 font-bold"
        >
          Book Audit <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default Navbar;
