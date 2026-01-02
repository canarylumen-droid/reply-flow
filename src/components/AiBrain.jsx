import React, { useEffect, useRef } from 'react'

const AiBrain = ({ scale = 1, opacity = 1 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const ctx = canvas.getContext('2d')
    if (!ctx) return;
    let animationFrameId
    
    // Configuration based on device capability
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 100 : 250
    const connectionDistance = isMobile ? 35 : 40 
    const globeRadius = isMobile ? 80 : 120
    const rotationSpeed = 0.003

    // State
    let angleY = 0
    let angleX = 0
    let particles = []

    const initParticles = () => {
      particles = []
      const phi = Math.PI * (3 - Math.sqrt(5))

      for (let i = 0; i < particleCount; i++) {
        const y = 1 - (i / (particleCount - 1)) * 2 
        const radius = Math.sqrt(1 - y * y) 
        const theta = phi * i
        
        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius

        particles.push({
          x: x * globeRadius,
          y: y * globeRadius,
          z: z * globeRadius,
          baseX: x * globeRadius,
          baseY: y * globeRadius,
          baseZ: z * globeRadius,
        })
      }
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentNode) return;
      const rect = canvas.parentNode.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    const draw = () => {
      try {
        if (!canvas || !ctx) return;
        
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        angleY += rotationSpeed
        angleX += rotationSpeed * 0.2

        const cosY = Math.cos(angleY)
        const sinY = Math.sin(angleY)
        const cosX = Math.cos(angleX)
        const sinX = Math.sin(angleX)

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          let x1 = p.baseX * cosY - p.baseZ * sinY
          let z1 = p.baseZ * cosY + p.baseX * sinY
          let y1 = p.baseY * cosX - z1 * sinX
          let z2 = z1 * cosX + p.baseY * sinX

          const scaleProj = 400 / (400 + z2) 
          const x2d = x1 * scaleProj + centerX
          const y2d = y1 * scaleProj + centerY

          p.sx = x2d
          p.sy = y2d

          const alpha = Math.max(0, (z2 + globeRadius) / (2 * globeRadius)) 
          ctx.beginPath()
          ctx.arc(x2d, y2d, Math.max(0.1, 1.5 * scaleProj), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 105, 255, ${alpha})`
          ctx.fill()
        }

        ctx.strokeStyle = `rgba(147, 51, 234, 0.1)` 
        ctx.lineWidth = 0.5
        
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j += (isMobile ? 3 : 2)) {
              const p2 = particles[j];
              const dx = p1.sx - p2.sx
              const dy = p1.sy - p2.sy
              const distSq = dx * dx + dy * dy;
              if (distSq < connectionDistance * connectionDistance) {
                  ctx.beginPath()
                  ctx.moveTo(p1.sx, p1.sy)
                  ctx.lineTo(p2.sx, p2.sy)
                  ctx.stroke()
              }
          }
        }

        animationFrameId = requestAnimationFrame(draw)
      } catch (e) {
        console.error("AiBrain Draw Error:", e)
      }
    }

    window.addEventListener('resize', handleResize)
    initParticles()
    handleResize()
    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
      style={{
        opacity: opacity,
        transform: `scale(${scale})`,
        pointerEvents: 'none',
        willChange: 'transform, opacity'
      }}
    />
  )
}

export default AiBrain
