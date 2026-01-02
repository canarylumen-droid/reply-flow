import React, { useEffect, useRef, useState } from 'react'

const AiBrain = ({ scale = 1, opacity = 1 }) => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection Observer to pause when not in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true }) // Optimize canvas context
    let animationFrameId
    
    // Configuration based on device capability
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 80 : 200 // Further reduced for zero lag
    const connectionDistance = isMobile ? 35 : 45
    const globeRadius = isMobile ? 70 : 120
    const rotationSpeed = 0.002 // Slightly slower for smoother look

    // State
    let angleY = 0
    let angleX = 0
    let particles = []
    let canvasWidth, canvasHeight, centerX, centerY

    const resize = () => {
      if (!canvas.parentNode) return
      const rect = canvas.parentNode.getBoundingClientRect()
      canvasWidth = rect.width
      canvasHeight = rect.height
      canvas.width = canvasWidth * window.devicePixelRatio
      canvas.height = canvasHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      centerX = canvasWidth / 2
      centerY = canvasHeight / 2
    }

    const initParticles = () => {
      particles = []
      const phi = Math.PI * (3 - Math.sqrt(5))

      for (let i = 0; i < particleCount; i++) {
        const y = 1 - (i / (particleCount - 1)) * 2
        const radius = Math.sqrt(1 - y * y)
        const theta = phi * i
        
        particles.push({
          baseX: Math.cos(theta) * radius * globeRadius,
          baseY: y * globeRadius,
          baseZ: Math.sin(theta) * radius * globeRadius,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      angleY += rotationSpeed
      angleX += rotationSpeed * 0.3

      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      // Pre-calculate positions
      const projected = particles.map(p => {
        // Rotation Y
        let x1 = p.baseX * cosY - p.baseZ * sinY
        let z1 = p.baseZ * cosY + p.baseX * sinY
        
        // Rotation X
        let y1 = p.baseY * cosX - z1 * sinX
        let z2 = z1 * cosX + p.baseY * sinX

        const scaleProj = 400 / (400 + z2)
        return {
          sx: x1 * scaleProj + centerX,
          sy: y1 * scaleProj + centerY,
          z2,
          scale: scaleProj
        }
      })

      // Draw Connections (Neural Network effect)
      ctx.beginPath()
      ctx.strokeStyle = `rgba(147, 51, 234, ${isMobile ? 0.1 : 0.15})`
      ctx.lineWidth = isMobile ? 0.5 : 0.8 // Bolder for desktop
      
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
            const dx = projected[i].sx - projected[j].sx
            const dy = projected[i].sy - projected[j].sy
            const distanceSq = dx * dx + dy * dy

            if (distanceSq < connectionDistance * connectionDistance) {
                ctx.moveTo(projected[i].sx, projected[i].sy)
                ctx.lineTo(projected[j].sx, projected[j].sy)
            }
        }
      }
      ctx.stroke()

      // Draw Dots
      projected.forEach(p => {
        const alpha = Math.max(0, (p.z2 + globeRadius) / (2 * globeRadius))
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, (isMobile ? 1.2 : 1.8) * p.scale, 0, Math.PI * 2) // Bolder dots
        ctx.fillStyle = `rgba(0, 105, 255, ${alpha * 0.9})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    initParticles()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full will-change-transform"
        style={{
          opacity: opacity,
          transform: `scale(${scale})`,
          transition: 'opacity 0.3s ease-out'
        }}
      />
    </div>
  )
}

export default AiBrain
