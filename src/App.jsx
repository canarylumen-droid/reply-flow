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
  const outlineRef = useRef(null)

  // Refs for custom cursor position tracking 
  const mouse = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const w = window.innerWidth;
    if (w < 768) return; // Disable custom cursor on mobile for performance

    const handelMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handelMouseMove)

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.15
      position.current.y += (mouse.current.y - position.current.y) * 0.15

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3D(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`
        outlineRef.current.style.transform = `translate3D(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`
      }
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', handelMouseMove)
    }
  }, [])

  return (
    <div className="relative bg-white dark:bg-black transition-colors min-h-screen cursor-none">
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
        {/* <Team /> */}
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

      {/* Custom Premium Cursor */}
      {/* Ring: Large, transparent with border, slight blur */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-12 w-12 rounded-full border border-gray-400 dark:border-white/30 pointer-events-none z-[9999] hidden md:block mix-blend-difference backdrop-blur-[1px]"
        style={{ transition: 'transform 0.1s ease-out' }}
      />

      {/* Dot: Solid white, blending difference to invert colors */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-white pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      />
    </div>
  )
}

export default App
