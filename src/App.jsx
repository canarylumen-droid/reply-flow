import React, { useEffect, useRef, useState } from 'react'
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
  return 'dark' // Default to dark for premium feel
}

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const dotRef = useRef(null)
  const trailRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const trailPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      dotPos.current.x = mouse.current.x
      dotPos.current.y = mouse.current.y

      trailPos.current.x += (mouse.current.x - trailPos.current.x) * 0.12
      trailPos.current.y += (mouse.current.y - trailPos.current.y) * 0.12

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
  }, [])

  return (
    <div className="relative bg-white dark:bg-black transition-colors min-h-screen lg:cursor-none">
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

      {/* Primary Dot - Crisp & Bright */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1 w-1 rounded-full bg-primary pointer-events-none z-[9999] hidden lg:block"
      />

      {/* Follower Ring - Thin & Professional */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary/50 pointer-events-none z-[9998] hidden lg:block mix-blend-difference shadow-[0_0_15px_rgba(0,105,255,0.1)]"
      />
    </div>
  )
}

export default App
