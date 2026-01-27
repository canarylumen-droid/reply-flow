import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRightIcon, BrainIcon } from './Icons';
import AiBrain from './AiBrain';

const Hero = () => {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // ... rest of logic updated in JSX below ...
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  // ...

  // Dashboard Transformation (Exit) - happens in first 40% of scroll
  const scale = useTransform(smoothScroll, [0, 0.4], [1, 0.8]); 
  const opacity = useTransform(smoothScroll, [0, 0.4], [1, 0]); 
  const y = useTransform(smoothScroll, [0, 0.4], [0, 100]);
  const rotateX = useTransform(smoothScroll, [0, 0.4], [0, 20]);
  const rotateZ = useTransform(smoothScroll, [0, 0.4], [0, 5]);

  // AI Brain Transformation (Entry) - happens in first 50% of scroll
  const isMobile = !isDesktop;
  const brainOpacity = useTransform(smoothScroll, [0.1, 0.5], [0, 1]);
  const brainScale = useTransform(smoothScroll, [0.1, 0.8], [0.6, isMobile ? 1.5 : 2.2]); 
  const brainY = useTransform(smoothScroll, [0.1, 0.8], [100, isMobile ? 0 : -20]); // Center for mobile/tablet
  
  // Transition to center for Desktop (starts at right, moves to center)
  const brainX = useTransform(smoothScroll, [0.3, 0.7], [0, "-50%"]); 

  // Copy Fade Out - fade out text as we scroll deep
  const copyOpacity = useTransform(smoothScroll, [0.3, 0.5], [1, 0]);
  const copyY = useTransform(smoothScroll, [0.3, 0.5], [0, -100]);

  return (
    <section ref={containerRef} id='hero' className='relative min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 py-20 lg:py-0'>
      
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className='max-w-5xl w-full flex flex-col items-center text-center z-10 px-6'>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='flex flex-col items-center gap-6 relative z-20'
        >
          <div className='flex items-center gap-3 text-primary dark:text-blue-500 font-bold uppercase text-[10px] tracking-[0.4em] font-syne'>
            <div className='w-2 h-2 rounded-full bg-primary dark:bg-blue-500 shadow-[0_0_10px_rgba(0,105,255,0.8)]' />
            <span>ELITE SALES INFRASTRUCTURE</span>
          </div>

          <h1 className='text-5xl sm:text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight text-gray-900 dark:text-white max-w-4xl'>
            Let us worry about <br />
            <span className='italic relative'>
              your Problems
              <div className='absolute bottom-2 left-0 w-full h-3 bg-yellow-400/30 -z-10' />
            </span>
          </h1>

          <p className='text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium'>
            We design, build, and manage high-fidelity AI Sales Departments for elite agencies. Capture every lead, handle every objection, book every meeting.
          </p>

          <div className='flex flex-wrap justify-center gap-4 pt-4'>
            <a
              href="https://calendly.com/replyflow"
              target="_blank"
              rel="noopener noreferrer"
              className='px-10 py-4 bg-primary dark:bg-white dark:text-black text-white rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-xl flex items-center gap-3'
            >
              Book a FREE call
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>

          <p className='text-xs text-gray-400 dark:text-gray-500 mt-4 uppercase tracking-[0.2em] font-bold'>
            Brands that trust us
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
