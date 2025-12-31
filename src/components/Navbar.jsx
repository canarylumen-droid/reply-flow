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
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
          <BrainIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-none">Reply Flow</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Outcome-Based AI Sales</p>
        </div>
      </div>

      {/* Sidebar / Menu Links */}
      <div
        className={`text-gray-700 dark:text-gray-300 text-sm font-semibold fixed sm:static top-0 bottom-0 right-0 h-full sm:h-auto flex flex-col sm:flex-row sm:items-center gap-8 sm:bg-transparent transition-all duration-300 z-50 shadow-2xl sm:shadow-none
          ${sidebarOpen ? "w-64 pl-8 bg-white dark:bg-zinc-900 pt-24" : "w-0 overflow-hidden sm:w-auto sm:pl-0 sm:pt-0"}`}
      >
        {/* Close Button (Mobile Only) */}
        <button
          className="absolute right-6 top-6 sm:hidden text-2xl"
          onClick={() => setSidebarOpen(false)}
        >
          &times;
        </button>

        <a onClick={() => setSidebarOpen(false)} href="#hero" className="hover:text-primary transition-colors">
          Home
        </a>
        <a onClick={() => setSidebarOpen(false)} href="#testimonials" className="hover:text-primary transition-colors">
          Case Studies
        </a>
        <a onClick={() => setSidebarOpen(false)} href="#pricing" className="hover:text-primary transition-colors">
          Services
        </a>
        <a onClick={() => setSidebarOpen(false)} href="#roi" className="hover:text-primary transition-colors">
          Calculator
        </a>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden p-2 text-2xl"
        >
          &#9776;
        </button>

        {/* Contact Button (hidden on small screens) */}
        <a
          href="#book"
          className="text-sm hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full cursor-pointer hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 font-bold"
        >
          Book Audit <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default Navbar;
