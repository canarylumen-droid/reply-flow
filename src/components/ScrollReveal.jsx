import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const Paragraph = ({ value }) => {
  const element = useRef(null)
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.8', 'start 0.3'] // Tighter range for faster reveal
  })

  // Use a snappier spring for more "tactile" scroll typing
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25, restDelta: 0.001 })

  const words = value.split(' ')

  return (
    <p 
      ref={element}
      className="flex flex-wrap text-4xl md:text-6xl lg:text-8xl font-black leading-[1.0] tracking-tighter p-10 max-w-7xl mx-auto font-syne"
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={smoothProgress} range={[start, end]}>{word}</Word>
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
  const y = useTransform(progress, range, [15, 0])
  const scale = useTransform(progress, range, [0.8, 1])
  
  // Highlight/Glow effect for the "current" character being "typed"
  const glow = useTransform(progress, range, [0, 1])

  return (
    <span className="relative inline-block">
      {/* 1. Base Layer (Faint) */}
      <span className="opacity-10 text-gray-900 dark:text-white transition-colors">
        {children}
      </span>
      
      {/* 2. Highlight Layer (Typing Effect) */}
      <motion.span 
        style={{ opacity, y, scale }} 
        className="absolute inset-0 text-gray-900 dark:text-white z-10 transition-colors pointer-events-none"
      >
        {children}
      </motion.span>

      {/* 3. Typing Cursor/Sparkle (Active Character) */}
      <motion.span
        style={{ opacity: glow }}
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary blur-[2px] z-20"
      />
    </span>
  )
}

const ScrollReveal = () => {
  return (
    <section className="bg-white dark:bg-black min-h-[70vh] flex items-center justify-center py-32 sm:py-48 relative overflow-hidden">
      {/* Background Animated Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
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
        <Paragraph value="We bridge the gap between AI automation and human-level conversion. No more missed calls. No more lost leads. Just results." />
      </div>
    </section>
  )
}

export default ScrollReveal
