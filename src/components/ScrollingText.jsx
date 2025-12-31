import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

const ScrollingText = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Text movement and effects
    const xLeft = useTransform(scrollYProgress, [0, 1], [0, -800])
    const xRight = useTransform(scrollYProgress, [0, 1], [0, 800])

    // Symmetric opacity: Fades in, stays, fades out. Reverses perfectly on scroll up.
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    // Symmetric scale: Grows slightly while visible
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1])

    const blurValue = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [10, 0, 0, 10])
    const blur = useMotionTemplate`blur(${blurValue}px)`

    return (
        <section
            ref={containerRef}
            className='py-40 bg-white dark:bg-black overflow-hidden relative min-h-[60vh] flex flex-col justify-center'
        >
            <motion.div
                style={{ opacity, scale, filter: blur }}
                className='relative z-10 flex flex-col items-center select-none'
            >
                <motion.h2
                    style={{ x: xLeft }}
                    className='text-[12vw] md:text-[15vw] font-black leading-none tracking-tighter text-gray-900 dark:text-white font-syne'
                >
                    REPLY
                </motion.h2>
                <motion.h2
                    style={{ x: xRight }}
                    className='text-[12vw] md:text-[15vw] font-black leading-none tracking-tighter text-primary font-syne italic mt-[-2vw]'
                >
                    FLOW
                </motion.h2>

                {/* Secondary evaporated text background */}
                <div className='absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none'>
                    <h2 className='text-[25vw] font-black text-primary blur-3xl'>RF</h2>
                </div>
            </motion.div>

            {/* Background elements */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-primary/5 to-transparent pointer-events-none' />
        </section>
    )
}

export default ScrollingText
