import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import WhyLosingMoney from './components/WhyLosingMoney'
import ComparisonTable from './components/ComparisonTable'
import Intelligence from './components/Intelligence'
import Infrastructure from './components/Infrastructure'
import AutomationFeatures from './components/AutomationFeatures'
import Testimonials from './components/Testimonials'
import SimpleSetup from './components/SimpleSetup'
import Team from './components/Team'
import RoiCalculator from './components/RoiCalculator'
import Pricing from './components/Pricing'
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
  const shadowRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const trailPos = useRef({ x: 0, y: 0 })
  const shadowPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      // Different damping for each element creates the 'trail' effect
      dotPos.current.x = mouse.current.x
      dotPos.current.y = mouse.current.y

      trailPos.current.x += (mouse.current.x - trailPos.current.x) * 0.15
      trailPos.current.y += (mouse.current.y - trailPos.current.y) * 0.15

      shadowPos.current.x += (mouse.current.x - shadowPos.current.x) * 0.08
      shadowPos.current.y += (mouse.current.y - shadowPos.current.y) * 0.08

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate3d(${shadowPos.current.x}px, ${shadowPos.current.y}px, 0) translate(-50%, -50%)`
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
        <ComparisonTable />
        <Intelligence />
        <Infrastructure />
        <AutomationFeatures />
        <Testimonials />
        <SimpleSetup />
        <div id="roi">
          <RoiCalculator />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <FAQ />
        <ScrollingText />
        <div id="book">
          <FinalCta />
          <Booking />
        </div>
      </main>

      <Footer theme={theme} />

      {/* Premium Multi-Stage Cursor Trail */}
      {/* 1. Main Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-primary pointer-events-none z-[9999] hidden lg:block"
      />

      {/* 2. Fluid Trail Ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 h-8 w-8 rounded-full border border-primary/30 pointer-events-none z-[9998] hidden lg:block mix-blend-difference"
      />

      {/* 3. Shadow Follower (The 'Dark' Trail) */}
      <div
        ref={shadowRef}
        className="fixed top-0 left-0 h-12 w-12 rounded-full bg-primary/5 dark:bg-primary/20 blur-xl pointer-events-none z-[9997] hidden lg:block"
      />
    </div>
  )
}

export default App
