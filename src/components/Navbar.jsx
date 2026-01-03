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
          <div className="relative group/portal">
            <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-400 font-black uppercase tracking-tighter border border-gray-200 dark:border-white/5 cursor-not-allowed">
              Portal
            </span>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-white text-[8px] rounded opacity-0 group-hover/portal:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Client Login Coming Soon
            </span>
          </div>
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
        {/* 1. Glassmorphism Base Layer (Slightly Transparent as requested) */}
        <div className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-3xl support-[backdrop-filter]:bg-white/60" />

        {/* 2. "Nice" Gradient Overlay - Subtle & Lightweight */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-blue-50/30 dark:from-black/0 dark:via-black/50 dark:to-blue-900/10 pointer-events-none" />

        {/* 3. Decorative Blobs for Premium Feel - Very Subtle */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-400/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center gap-10 p-6">
          
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-2 text-4xl text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>

          {/* Mobile Links - Clean, Aesthetic, Lightweight (No heavy boxes) */}
          <nav className="flex flex-col items-center gap-8 w-full">
            <a 
              onClick={() => setSidebarOpen(false)} 
              href="#hero" 
              className="text-4xl font-syne font-bold text-gray-900 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              Home
            </a>
            <a 
              onClick={() => setSidebarOpen(false)} 
              href="#casestudies" 
              className="text-4xl font-syne font-bold text-gray-900 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              Case Studies
            </a>
            <a 
              onClick={() => setSidebarOpen(false)} 
              href="#pricing" 
              className="text-4xl font-syne font-bold text-gray-900 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              Services
            </a>
            <a 
              onClick={() => setSidebarOpen(false)} 
              href="#roi" 
              className="text-4xl font-syne font-bold text-gray-900 dark:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              Calculator
            </a>
          </nav>

          {/* Mobile CTA - Premium & Distinct */}
          <a
            href="https://calendly.com/replyflow"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-lg mt-4 shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
          >
            Book Audit <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
