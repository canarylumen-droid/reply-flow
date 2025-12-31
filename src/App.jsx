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

  return (
    <div className="relative bg-white dark:bg-black transition-colors min-h-screen">
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
    </div>
  )
}

export default App
