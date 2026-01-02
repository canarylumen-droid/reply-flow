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
    const isMobile = window.innerWidth < 1024
    const particleCount = isMobile ? 60 : 180 
    const connectionDistance = isMobile ? 30 : 50
    const rotationSpeed = 0.0015

    // State
    let angleY = 0
    let angleX = 0
    let particles = []
    let canvasWidth, canvasHeight, centerX, centerY, globeRadius
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

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
      
      // Auto-adjust globe radius to fit PERFECTLY on any screen
      globeRadius = Math.min(canvasWidth, canvasHeight) * (isMobile ? 0.35 : 0.4)
      initParticles()
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
          baseZ: Math.sin(theta) * radius * globeRadius
        })
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      // Center relative coordinates (-1 to 1)
      targetMouseX = ((e.clientX - rect.left) / canvasWidth) * 2 - 1
      targetMouseY = ((e.clientY - rect.top) / canvasHeight) * 2 - 1
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      // Buttery smooth lerping (GSAP-like feel)
      mouseX += (targetMouseX - mouseX) * 0.1
      mouseY += (targetMouseY - mouseY) * 0.1

      // Global Sphere Tilt (Responsive 360 feel)
      angleY += rotationSpeed + (mouseX * 0.02)
      angleX += rotationSpeed * 0.3 + (mouseY * 0.02)

      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      const projected = particles.map(p => {
        // Base 3D rotation
        let x1 = p.baseX * cosY - p.baseZ * sinY
        let z1 = p.baseZ * cosY + p.baseX * sinY
        let y1 = p.baseY * cosX - z1 * sinX
        let z2 = z1 * cosX + p.baseY * sinX

        // Spatial 3D Magnetism
        if (!isMobile) {
          // Convert mouse (-1 to 1) to canvas units
          const worldMouseX = mouseX * (globeRadius * 1.8)
          const worldMouseY = mouseY * (globeRadius * 1.8)
          
          const dx = worldMouseX - x1
          const dy = worldMouseY - y1
          const dist = Math.sqrt(dx * dx + dy * dy)
          const limit = globeRadius * 2
          
          if (dist < limit) {
            const force = (1 - dist / limit) * 0.5
            x1 += dx * force
            y1 += dy * force
            // Pull Z towards mouse for depth interactivity
            z2 -= force * 40 
          }
        }

        const scaleProj = 400 / (400 + z2)
        return {
          sx: x1 * scaleProj + centerX,
          sy: y1 * scaleProj + centerY,
          z2,
          scale: scaleProj
        }
      })

      // Draw Connections
      ctx.beginPath()
      ctx.strokeStyle = `rgba(147, 51, 234, ${isMobile ? 0.08 : 0.12})`
      ctx.lineWidth = isMobile ? 0.4 : 0.7
      
      const distLimitSq = connectionDistance * connectionDistance
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i]
        for (let j = i + 1; j < projected.length; j++) {
            const p2 = projected[j]
            const dx = p1.sx - p2.sx
            const dy = p1.sy - p2.sy
            const distanceSq = dx * dx + dy * dy

            if (distanceSq < distLimitSq) {
                ctx.moveTo(p1.sx, p1.sy)
                ctx.lineTo(p2.sx, p2.sy)
            }
        }
      }
      ctx.stroke()

      // Dots
      projected.forEach(p => {
        const alpha = Math.max(0, (p.z2 + globeRadius) / (2 * globeRadius))
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, (isMobile ? 1.0 : 1.6) * p.scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 105, 255, ${alpha * 0.9})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseLeave = () => {
      targetMouseX = 0
      targetMouseY = 0
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseleave', handleMouseLeave)
    }
    window.addEventListener('resize', resize)
    resize()
    initParticles()
    draw()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
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
