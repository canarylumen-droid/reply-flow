import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
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

const BlogIndex = lazy(() => import('./components/BlogIndex'))
const BlogPost = lazy(() => import('./components/BlogPost'))

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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const dotRef = useRef(null)
  const trailRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const trailPos = useRef({ x: 0, y: 0 })

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const isBlogIndex = currentPath === '/blog' || currentPath === '/blog/'
  const isBlogPost = currentPath.startsWith('/blog/') && currentPath.split('/').filter(Boolean).length > 1
  const blogSlug = isBlogPost ? currentPath.split('/').filter(Boolean).slice(1).join('/') : ''
  console.log('[App] path:', currentPath, 'isBlogIndex:', isBlogIndex, 'isBlogPost:', isBlogPost, 'slug:', blogSlug)

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
    <div className="relative bg-white dark:bg-black transition-colors min-h-screen lg:cursor-auto">
      <ScrollProgress />
      {isBlogIndex ? (
        <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black" />}>
          <BlogIndex />
        </Suspense>
      ) : isBlogPost && blogSlug ? (
        <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black" />}>
          <BlogPost slug={blogSlug} />
        </Suspense>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default App
