import React, { useState, useEffect } from "react";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion } from "framer-motion";
import { BrainIcon, ArrowRightIcon } from "./Icons";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [sidebarOpen]);

  const isOnLandingPage = typeof window !== 'undefined' && window.location.pathname === '/';

  const handleLogoClick = () => {
    if (isOnLandingPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/';
    }
  };

  const navLinks = [
    { label: 'Home', href: isOnLandingPage ? '#hero' : '/#hero' },
    { label: 'Case Studies', href: isOnLandingPage ? '#casestudies' : '/#casestudies' },
    { label: 'Services', href: isOnLandingPage ? '#pricing' : '/#pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Calculator', href: isOnLandingPage ? '#roi' : '/#roi' },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`flex justify-between items-center px-4 sm:px-10 lg:px-20 xl:px-32 py-4 sticky top-0 z-50 backdrop-blur-xl font-medium transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-black/95 shadow-sm border-b border-gray-100 dark:border-white/10'
            : 'bg-white/80 dark:bg-black/80 border-b border-gray-100/50 dark:border-white/5'
        }`}
      >
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 group cursor-pointer relative"
        >
          <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          <div className="w-10 h-10 bg-primary flex items-center justify-center text-white rounded-xl shadow-[0_0_20px_rgba(0,105,255,0.3)] rotate-[-5deg] group-hover:rotate-0 transition-transform relative z-10 shrink-0">
            <BrainIcon className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <span className="block text-xl font-[900] tracking-tighter leading-none font-syne uppercase text-gray-900 dark:text-white">REPLYFLOW</span>
            <span className="block text-[8px] text-primary uppercase tracking-[0.25em] font-black mt-0.5">Autonomous Sales Engine</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-semibold relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <span className="relative group/portal">
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-400 font-bold uppercase tracking-wider border border-gray-200 dark:border-white/5 cursor-not-allowed select-none">
              Portal
            </span>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 text-white text-[8px] rounded opacity-0 group-hover/portal:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              Client Login — Coming Soon
            </span>
          </span>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <a
            href="https://calendly.com/replyflow"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 shrink-0"
          >
            Book Audit <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-zinc-950 shadow-2xl flex flex-col transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/10">
            <button onClick={handleLogoClick} className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary flex items-center justify-center text-white rounded-xl shadow-lg">
                <BrainIcon className="w-5 h-5" />
              </div>
              <span className="font-syne font-black text-lg text-gray-900 dark:text-white uppercase tracking-tighter">REPLYFLOW</span>
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col p-6 gap-1 flex-1">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-bold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary dark:hover:text-primary transition-all"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
                <ArrowRightIcon className="w-4 h-4 opacity-30" />
              </a>
            ))}
          </nav>

          {/* Drawer CTA */}
          <div className="p-6 border-t border-gray-100 dark:border-white/10 space-y-3">
            <a
              href="https://calendly.com/replyflow"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setSidebarOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
            >
              Book Free Audit <ArrowRightIcon className="w-5 h-5" />
            </a>
            <p className="text-center text-xs text-gray-400">No commitment · 30-min strategy call</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
