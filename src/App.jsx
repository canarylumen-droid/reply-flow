import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import WhyLosingMoney from './components/WhyLosingMoney'
import ScrollReveal from './components/ScrollReveal'
import ComparisonTable from './components/ComparisonTable'
import Intelligence from './components/Intelligence'
import Infrastructure from './components/Infrastructure'
import AutomationFeatures from './components/AutomationFeatures'
import CaseStudies from './components/CaseStudies'
import SimpleSetup from './components/SimpleSetup'
import Team from './components/Team'
import RoiCalculator from './components/RoiCalculator'
import Pricing from './components/Pricing'
import Guarantees from './components/Guarantees'
import FinalCta from './components/FinalCta'
import FAQ from './components/FAQ'
import Booking from './components/Booking'
import ScrollingText from './components/ScrollingText'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import { Toaster } from 'react-hot-toast'

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'dark'
}

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800) // Minimum 1.8s for premium feel
    
    // Also clear if window loads faster
    const handleLoad = () => clearTimeout(timer) || setIsLoading(false)
    window.addEventListener('load', handleLoad)
    
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  const dotRef = useRef(null)
  const trailRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const trailPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.innerWidth < 1024 || isLoading) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      dotPos.current.x = mouse.current.x
      dotPos.current.y = mouse.current.y

      trailPos.current.x += (mouse.current.x - trailPos.current.x) * 0.1
      trailPos.current.y += (mouse.current.y - trailPos.current.y) * 0.1

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`
      }

      requestAnimationFrame(animate)
    }
    const frame = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frame)
    }
  }, [isLoading])

  return (
    <div className="relative bg-white dark:bg-black transition-colors min-h-screen lg:cursor-none">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "circIn" } }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center gap-6"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="w-16 h-16 bg-primary rounded-full blur-[20px] opacity-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-white font-syne font-black text-2xl tracking-tighter uppercase">ReplyFlow</span>
              <div className="h-[2px] w-24 bg-zinc-800 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-primary"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ScrollProgress />
            <Toaster />
            <Navbar theme={theme} setTheme={setTheme} />

            <main>
              <Hero />
              <TrustedBy />
              <WhyLosingMoney />
              <ScrollReveal />
              <ComparisonTable />
              <Intelligence />
              <Infrastructure />
              <AutomationFeatures />
              <CaseStudies />
              <SimpleSetup />
              <div id="roi">
                <RoiCalculator />
              </div>
              <div id="pricing">
                <Pricing />
              </div>
              <Guarantees />
              <FAQ />
              <ScrollingText />
              <div id="book">
                <FinalCta />
                <Booking />
              </div>
            </main>

            <Footer theme={theme} />

            {/* Primary Dot */}
            <div
              ref={dotRef}
              className="fixed top-0 left-0 h-1 w-1 rounded-full bg-primary pointer-events-none z-[9999] hidden lg:block"
            />

            {/* Follower Ring */}
            <div
              ref={trailRef}
              className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary/50 pointer-events-none z-[9998] hidden lg:block mix-blend-difference shadow-[0_0_15px_rgba(0,105,255,0.1)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
