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
  
  // Cursor effect: symmetrical reverse/forward
  const cursorOpacity = useTransform(
    progress, 
    [range[0], range[0] + (range[1]-range[0])*0.1, range[1] - (range[1]-range[0])*0.1, range[1]], 
    [0, 1, 1, 0]
  )

  return (
    <span className="grid place-items-center relative">
      {/* 1. Ghost Layer */}
      <span className="opacity-10 text-gray-900 dark:text-white transition-colors cursor-default select-none pointer-events-none col-start-1 row-start-1">
        {children}
      </span>
      
      {/* 2. Highlight Layer */}
      <motion.span 
        style={{ opacity, y, x, scale }} 
        className="text-gray-900 dark:text-white transition-colors pointer-events-none col-start-1 row-start-1 z-10 will-change-transform"
      >
        {children}
      </motion.span>

      {/* 3. Typing Cursor */}
      <motion.span
        style={{ opacity: cursorOpacity }}
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary blur-[2px] z-20 pointer-events-none"
      />
    </span>
  )
}

const ScrollReveal = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the scroll for a liquid "slow" move feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  return (
    <section ref={containerRef} className="bg-white dark:bg-black relative h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Animated Blobs - now linked to progress */}
        <motion.div 
          style={{ 
            scale: useTransform(smoothProgress, [0, 1], [1, 1.5]),
            opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.2, 0.1])
          }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10"
        />

        {/* Digital Dust / Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: [null, "-20%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                delay: Math.random() * 5 
              }}
              className="absolute w-1 h-1 bg-primary rounded-full"
            />
          ))}
        </div>
        
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
