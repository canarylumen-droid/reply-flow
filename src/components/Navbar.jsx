import React, { useState, useEffect } from "react";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion } from "framer-motion";
import { BrainIcon, ArrowRightIcon } from "./Icons";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-6 sticky top-0 z-50 backdrop-blur-xl font-medium bg-white/80 dark:bg-black/80 border-b border-gray-100 dark:border-white/10 transition-colors duration-300"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer relative" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-primary flex items-center justify-center text-white rounded-xl shadow-[0_0_20px_rgba(0,105,255,0.3)] rotate-[-5deg] group-hover:rotate-0 transition-transform relative z-10">
            <BrainIcon className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <h1 className="text-2xl font-[900] tracking-tighter leading-none font-syne uppercase text-gray-900 dark:text-white">REPLYFLOW</h1>
            <p className="text-[9px] text-primary uppercase tracking-[0.3em] font-black mt-1">Infrastructure agency</p>
          </div>
        </div>

        {/* Desktop Nav Links (Hidden on Mobile) */}
        <div className="hidden sm:flex items-center gap-8">
          <a href="#hero" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all font-bold relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a href="#casestudies" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all font-bold relative group">
            Case Studies
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a href="#pricing" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all font-bold relative group">
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a href="#roi" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all font-bold relative group">
            Calculator
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-4 relative z-[10]">
          {/* Theme Toggle */}
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="sm:hidden p-2 text-2xl text-gray-900 dark:text-white focus:outline-none"
          >
            &#9776;
          </button>

          {/* Contact Button (Desktop Only) */}
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

      {/* Mobile Menu Drawer (Fixed to Viewport) */}
      <div
        className={`fixed inset-0 z-[9999] overflow-hidden transition-transform duration-300 ease-in-out sm:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 1. Solid Base Layer (Guarantees No Transparency) */}
        <div className="absolute inset-0 bg-white dark:bg-black" />

        {/* 2. "Nice" Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-black dark:to-zinc-900 opacity-80" />

        {/* 3. Decorative Blobs for Premium Feel */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[100px]" />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center gap-8 p-6">
          
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-4xl text-gray-400 hover:text-primary transition-colors focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>

          {/* Mobile Links */}
          <a 
            onClick={() => setSidebarOpen(false)} 
            href="#hero" 
            className="w-full max-w-sm text-center px-6 py-5 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-xl text-gray-900 dark:text-white font-bold hover:bg-primary hover:text-white dark:hover:bg-primary hover:border-transparent transition-all shadow-xl hover:scale-[1.02]"
          >
            Home
          </a>
          <a 
            onClick={() => setSidebarOpen(false)} 
            href="#casestudies" 
            className="w-full max-w-sm text-center px-6 py-5 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-xl text-gray-900 dark:text-white font-bold hover:bg-primary hover:text-white dark:hover:bg-primary hover:border-transparent transition-all shadow-xl hover:scale-[1.02]"
          >
            Case Studies
          </a>
          <a 
            onClick={() => setSidebarOpen(false)} 
            href="#pricing" 
            className="w-full max-w-sm text-center px-6 py-5 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-xl text-gray-900 dark:text-white font-bold hover:bg-primary hover:text-white dark:hover:bg-primary hover:border-transparent transition-all shadow-xl hover:scale-[1.02]"
          >
            Services
          </a>
          <a 
            onClick={() => setSidebarOpen(false)} 
            href="#roi" 
            className="w-full max-w-sm text-center px-6 py-5 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-xl text-gray-900 dark:text-white font-bold hover:bg-primary hover:text-white dark:hover:bg-primary hover:border-transparent transition-all shadow-xl hover:scale-[1.02]"
          >
            Calculator
          </a>

          {/* Mobile CTA */}
          <a
            href="https://calendly.com/replyflow"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-sm flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white py-5 rounded-2xl font-bold text-xl mt-4 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all"
          >
            Book Audit <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
