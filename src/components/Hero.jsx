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
    <section ref={containerRef} id='hero' className='relative h-[180vh] bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300'>
      
      {/* Mesh Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Sticky Container */}
      <div className='sticky top-0 h-[100svh] flex flex-col items-center justify-center overflow-hidden p-6 sm:p-12'>

        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[20%] w-[60%] h-[40%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className='max-w-5xl w-full flex flex-col items-center text-center z-10 space-y-8'>

          {/* Center: Copy */}
          <motion.div
            style={{ 
              opacity: copyOpacity, 
              y: useTransform(smoothScroll, [0, 0.5], [0, -40])
            }}
            className='flex flex-col items-center gap-6 relative z-20'
          >
            <div className='flex items-center gap-3 text-primary font-bold uppercase text-[10px] tracking-[0.4em] font-syne opacity-80'>
              <div className='w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,105,255,0.8)]' />
              <span>ELITE SALES INFRASTRUCTURE</span>
            </div>

            <h1 className='text-5xl sm:text-7xl lg:text-[7rem] font-extrablack leading-[0.9] tracking-tighter font-syne uppercase max-w-4xl'>
              The Autonomous <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500'>
                Sales Engine
              </span> <br />
              That Never Sleeps.
            </h1>

            <p className='text-lg sm:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium'>
              We design, build, and manage high-fidelity AI Sales Departments for elite agencies. Capture every lead, handle every objection, book every meeting.
            </p>

            <div className='flex flex-wrap justify-center gap-4 pt-4'>
              <a
                href="https://calendly.com/replyflow"
                target="_blank"
                rel="noopener noreferrer"
                className='px-10 py-5 bg-primary text-white rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-xl hover:shadow-primary/50 flex items-center gap-3'
              >
                Get Your Free Audit
                <ArrowRightIcon className="w-6 h-6" />
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('casestudies').scrollIntoView({ behavior: 'smooth' })}
                className='px-10 py-5 bg-transparent border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-full font-bold text-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all'
              >
                View Case Studies
              </motion.button>
            </div>

            <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2 font-semibold'>
              Performance-based options available. 100% Done-For-You.
            </p>
          </motion.div>

          {/* Interactive Element (Shifted down/smaller) */}
          <motion.div
            style={{ scale: useTransform(smoothScroll, [0, 0.5], [0.8, 1]), opacity: brainOpacity }}
            className='w-full max-w-4xl mt-12'
          >
            <div className='relative aspect-video w-full flex items-center justify-center perspective-[1000px]'>
               <motion.div 
                  style={{ rotateX, rotateZ }}
                  className='w-full max-w-lg h-64 relative bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden'
               >
                  {/* Minified Dashboard Preview */}
                  <div className='bg-zinc-800/50 border-b border-zinc-700 px-4 py-2 flex items-center justify-between'>
                      <div className='flex gap-1.5'>
                          <div className='w-2 h-2 rounded-full bg-red-500/50'></div>
                          <div className='w-2 h-2 rounded-full bg-yellow-500/50'></div>
                          <div className='w-2 h-2 rounded-full bg-green-500/50'></div>
                      </div>
                      <span className='text-[8px] text-zinc-500 font-mono'>audnix-engine.ai</span>
                  </div>
                  <div className='p-4 space-y-3'>
                      <div className='grid grid-cols-3 gap-2'>
                          <div className='bg-zinc-800/30 rounded-lg p-2 border border-white/5'>
                              <div className='text-[8px] text-zinc-500'>ROI</div>
                              <div className='text-sm font-bold'>+420%</div>
                          </div>
                          <div className='bg-zinc-800/30 rounded-lg p-2 border border-white/5'>
                              <div className='text-[8px] text-zinc-500'>SPEED</div>
                              <div className='text-sm font-bold'>0.8s</div>
                          </div>
                          <div className='bg-zinc-800/30 rounded-lg p-2 border border-white/5'>
                              <div className='text-[8px] text-zinc-500'>CLOSED</div>
                              <div className='text-sm font-bold'>12</div>
                          </div>
                      </div>
                      <div className='bg-black/20 rounded p-3 border border-white/5 font-mono text-[9px] text-zinc-400'>
                         {">"} Objection handled: "Budget constraint" <br/>
                         {">"} Analyzing lead sentiment... High Intent <br/>
                         {">"} Meeting link sent to Prospect.
                      </div>
                  </div>
               </motion.div>
               {/* Ambient Glow */}
               <div className='absolute -inset-10 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse'></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
