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
  const brainOpacity = useTransform(smoothScroll, [0.1, 0.5], [0, 1]);
  const brainScale = useTransform(smoothScroll, [0.1, 0.8], [0.6, 2.2]); // Grows much larger
  const brainY = useTransform(smoothScroll, [0.1, 0.8], [100, -20]); // Arrives from below, then stays
  
  // Transition to center for Desktop (starts at right, moves to center)
  const brainX = useTransform(smoothScroll, [0.3, 0.7], [0, "-50%"]); 

  // Copy Fade Out - fade out text as we scroll deep
  const copyOpacity = useTransform(smoothScroll, [0.3, 0.5], [1, 0]);
  const copyY = useTransform(smoothScroll, [0.3, 0.5], [0, -100]);

  return (
    <section ref={containerRef} id='hero' className='relative h-[250vh] bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300'>
      
      {/* Sticky Container - Pins content relative to viewport */}
      <div className='sticky top-0 h-[100svh] flex flex-col items-center justify-start overflow-hidden p-6 sm:p-12 pt-8 lg:pt-10'>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-40 items-start z-10'>

          {/* Left: Copy */}
          <motion.div
            style={{ 
              opacity: copyOpacity, 
              y: useTransform(smoothScroll, [0, 0.5], [0, -40]) // Subtle parallax rise
            }}
            className='flex flex-col gap-6 text-left relative z-20'
          >
            {/* ... Content remains same ... */}
            <div className='flex items-center gap-3 text-primary font-bold uppercase text-[10px] tracking-[0.4em] font-syne opacity-80'>
              <div className='w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,105,255,0.8)]' />
              <span>ELITE SALES INFRASTRUCTURE</span>
            </div>

            <h1 className='text-4xl sm:text-7xl lg:text-[9.5rem] font-extrablack leading-[0.8] tracking-tighter font-syne uppercase'>
              The AI <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500'>
                Machine
              </span> <br />
              That Closes.
            </h1>

            <p className='text-lg sm:text-2xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium mt-4'>
              We don't just sell software. We design, build, and manage high-fidelity AI Sales Departments for elite agencies.
            </p>

            <div className='flex flex-wrap gap-4 pt-4'>
              <a
                href="https://calendly.com/replyflow"
                target="_blank"
                rel="noopener noreferrer"
                className='px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/50 flex items-center gap-2'
              >
                Get Your Free Audit
                <ArrowRightIcon className="w-5 h-5" />
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' })}
                className='px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all'
              >
                View Case Studies
              </motion.button>
            </div>

            <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2'>
              Performance-based options available. 100% Done-For-You.
            </p>
          </motion.div>

          {/* Right: Dashboard Morphing Container */}
          <div className='relative w-full h-[300px] sm:h-[450px] lg:h-[600px] flex items-center justify-center perspective-[1000px]'>
              
              {/* 1. Dashboard Visual (Fades Out) */}
              <motion.div
                  style={{ scale, opacity, y, rotateX, rotateZ }}
                  className='absolute inset-0 z-10 origin-center will-change-transform will-change-opacity'
              >
              <div className='relative w-full max-w-lg h-full mx-auto'>
                  <div className='absolute inset-0 bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden'>
                  
                  {/* Header Bar */}
                  <div className='bg-zinc-800/50 border-b border-zinc-700 px-4 py-3 flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <div className='flex gap-1.5'>
                            <div className='w-3 h-3 rounded-full bg-red-500/80'></div>
                            <div className='w-3 h-3 rounded-full bg-yellow-500/80'></div>
                            <div className='w-3 h-3 rounded-full bg-green-500/80'></div>
                        </div>
                        <span className='text-xs text-zinc-400 ml-3 font-mono'>reply-flow-agent.ai</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
                        <span className='text-[10px] text-green-400 font-semibold'>LIVE</span>
                      </div>
                  </div>

                  {/* Content Area */}
                  <div className='p-6 space-y-4 h-[calc(100%-56px)] overflow-hidden'>
                      {/* Real-time Metrics */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='grid grid-cols-3 gap-3'
                      >
                        <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50'>
                            <div className='text-[10px] text-zinc-500 uppercase tracking-wider mb-1'>Active Leads</div>
                            <div className='text-2xl font-bold text-white'>247</div>
                        </div>
                        <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50'>
                            <div className='text-[10px] text-zinc-500 uppercase tracking-wider mb-1'>Response</div>
                            <div className='text-2xl font-bold text-green-400'>1.2s</div>
                        </div>
                        <div className='bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50'>
                            <div className='text-[10px] text-zinc-500 uppercase tracking-wider mb-1'>Booked</div>
                            <div className='text-2xl font-bold text-blue-400'>18</div>
                        </div>
                      </motion.div>

                      {/* Terminal-style Activity Log */}
                      <div className='bg-black/40 rounded-lg p-4 border border-zinc-800 font-mono text-xs space-y-2 h-44 overflow-hidden'>
                          <div className='flex items-start gap-2'>
                              <span className='text-zinc-600'>14:23:41</span>
                              <span className='text-green-400'>✓</span>
                              <span className='text-zinc-300'>Lead <span className='text-blue-400'>Sarah M.</span> qualified.</span>
                          </div>
                          <div className='flex items-start gap-2'>
                              <span className='text-zinc-600'>14:23:38</span>
                              <span className='text-yellow-400'>⚡</span>
                              <span className='text-zinc-300'>Objection: "Price concern" handled.</span>
                          </div>
                          <div className='flex items-start gap-2'>
                              <span className='text-zinc-600'>14:23:12</span>
                              <span className='text-green-400'>✓</span>
                              <span className='text-zinc-300'>Meeting booked: <span className='text-green-400'>John D.</span></span>
                          </div>
                      </div>

                      {/* Live Conversation with Bot */}
                      <div className='bg-zinc-800/30 rounded-lg p-3 border border-zinc-700/50 mt-2'>
                          <div className='flex items-center gap-2 mb-2'>
                              <BrainIcon className="w-3 h-3 text-primary" />
                              <span className='text-[10px] text-zinc-400'>AI Agent replying...</span>
                          </div>
                          <div className='text-xs text-zinc-300 italic'>"I can show you a custom projection of your potential ROI..."</div>
                      </div>
                  </div>
                  </div>
                  {/* Glow */}
                  <div className='absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-2xl -z-10'></div>
              </div>
              </motion.div>

              {/* 2. AI Brain Visual (Fades/Scales In + Moves to Center) */}
              <motion.div 
                  style={{ 
                    opacity: brainOpacity, 
                    scale: brainScale, 
                    y: brainY,
                    x: isDesktop ? brainX : 0 
                  }}
                  className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform will-change-opacity"
              >
                  <div className="w-[450px] h-[450px] md:w-[700px] md:h-[700px] relative">
                      <AiBrain scale={1.8} opacity={1} />
                      {/* Central Core Glow - Bolder and more central */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px]" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px]" />
                  </div>
              </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
