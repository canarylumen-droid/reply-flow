import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Paragraph = ({ value }) => {
  const element = useRef(null)
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.25']
  })

  const words = value.split(' ')

  return (
    <p 
      className="flex flex-wrap text-4xl md:text-6xl lg:text-8xl font-black leading-[1.0] tracking-tighter p-10 max-w-7xl mx-auto font-syne"
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })}
    </p>
  )
}

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1])

  return (
    <span className="relative mr-3 mt-3 lg:mr-5 lg:mt-5 inline-block">
      <motion.span 
        style={{ opacity }} 
        className="text-gray-900 dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  )
}

const ScrollReveal = () => {
  return (
    <section className="bg-white dark:bg-black min-h-[50vh] flex items-center justify-center py-24 sm:py-40">
      <div className="container px-4 mx-auto">
        <Paragraph value="We bridge the gap between AI automation and human-level conversion. No more missed calls. No more lost leads. Just results." />
      </div>
    </section>
  )
}

export default ScrollReveal
