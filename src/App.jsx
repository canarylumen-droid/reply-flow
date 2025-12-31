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
  const mouse = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.15
      position.current.y += (mouse.current.y - position.current.y) * 0.15

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3D(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`
        outlineRef.current.style.transform = `translate3D(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`
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

      {/* Premium Cursor Elements */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary/40 pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
        style={{ transition: 'transform 0.05s ease-out' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-primary pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
      />
    </div>
  )
}

export default App
