import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const Paragraph = ({ value, progress }) => {
  const words = value.split(' ')

  return (
    <p 
      className="flex flex-wrap text-4xl md:text-6xl lg:text-8xl font-black leading-[1.0] tracking-tighter p-10 max-w-7xl mx-auto font-syne"
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={progress} range={[start, end]}>{word}</Word>
      })}
    </p>
  )
}

const Word = ({ children, progress, range }) => {
  const characters = children.split('')
  const amount = range[1] - range[0]
  const step = amount / characters.length

  return (
    <span className="relative inline-flex mr-[0.5ch] mb-4">
      {characters.map((char, i) => {
        const start = range[0] + (i * step)
        const end = range[0] + ((i + 1) * step)
        return (
          <Character key={i} progress={progress} range={[start, end]}>
            {char}
          </Character>
        )
      })}
    </span>
  )
}

const Character = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [20, 0])
  const x = useTransform(progress, range, [-4, 0])
  const scale = useTransform(progress, range, [0.4, 1])
  
  // High-speed typing effect
  const cursorOpacity = useTransform(
    progress, 
    [range[0], range[0] + (range[1]-range[0])*0.05, range[1] - (range[1]-range[0])*0.05, range[1]], 
    [0, 1, 1, 0]
  )

  return (
    <motion.span 
      className="grid place-items-center relative group cursor-default"
    >
      {/* 1. Ghost Layer */}
      <span className="opacity-10 text-gray-900 dark:text-white transition-colors select-none pointer-events-none col-start-1 row-start-1">
        {children}
      </span>
      
      {/* 2. Highlight Layer */}
      <motion.span 
        style={{ opacity, y, x, scale }} 
        className="text-gray-900 dark:text-white transition-colors pointer-events-none col-start-1 row-start-1 z-10 will-change-transform"
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

const ScrollReveal = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Fast-reacting scroll
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <section ref={containerRef} className="relative bg-[#080808] text-white h-[120vh] overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <Paragraph 
            progress={smoothProgress}
            value="We bridge the gap between AI automation and human-level conversion. No more missed calls. No more lost leads. Just results." 
          />
        </div>
      </div>
    </section>
  )
}

export default ScrollReveal

