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
    const particleCount = isMobile ? 450 : 180 // Ultra-dense for mobile 'Orb' feel
    const connectionDistance = isMobile ? 0 : 50 // No lines on mobile for 'rounded' feel
    const rotationSpeed = isMobile ? 0.005 : 0.0015

    // State
    let angleY = 0
    let angleX = 0
    let particles = []
    let canvasWidth, canvasHeight, centerX, centerY, globeRadius
    let targetMouseX = 0
    let targetMouseY = 0
    let mouseX = 0
    let mouseY = 0

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
      
      // Fitting logic
      globeRadius = Math.min(canvasWidth, canvasHeight) * (isMobile ? 0.3 : 0.4)
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
          baseZ: Math.sin(theta) * radius * globeRadius,
          phase: Math.random() * Math.PI * 2 // For pulsing effect
        })
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseX = ((e.clientX - rect.left) / canvasWidth) * 2 - 1
      targetMouseY = ((e.clientY - rect.top) / canvasHeight) * 2 - 1
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      // Interactions
      mouseX += (targetMouseX - mouseX) * 0.1
      mouseY += (targetMouseY - mouseY) * 0.1

      const tiltX = mouseX * (isMobile ? 0.05 : 0.1)
      const tiltY = mouseY * (isMobile ? 0.05 : 0.1)

      angleY += rotationSpeed + tiltX
      angleX += rotationSpeed * 0.3 + tiltY

      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      const time = Date.now() * 0.001

      const projected = particles.map(p => {
        // Core 3D rotation
        let x1 = p.baseX * cosY - p.baseZ * sinY
        let z1 = p.baseZ * cosY + p.baseX * sinY
        let y1 = p.baseY * cosX - z1 * sinX
        let z2 = z1 * cosX + p.baseY * sinX

        // Pulse effect for mobile 'rounded' orb feel - More subtle for professional look
        if (isMobile) {
            const pulse = 1 + Math.sin(time * 0.5 + p.phase) * 0.03
            x1 *= pulse
            y1 *= pulse
            z2 *= pulse
        }

        // Magnetism
        if (!isMobile) {
          const worldMouseX = mouseX * globeRadius * 1.5
          const worldMouseY = mouseY * globeRadius * 1.5
          const dx = worldMouseX - x1
          const dy = worldMouseY - y1
          const dist = Math.sqrt(dx * dx + dy * dy)
          const limit = globeRadius * 1.5
          
          if (dist < limit) {
            const force = (1 - dist / limit) * 0.4
            x1 += dx * force
            y1 += dy * force
            z2 -= force * 30
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

      // Rendering logic
      if (!isMobile) {
        // 1. Draw Connections (PC only - Neural Net)
        ctx.beginPath()
        ctx.strokeStyle = `rgba(147, 51, 234, 0.1)`
        ctx.lineWidth = 0.6
        const distLimitSq = connectionDistance * connectionDistance
        for (let i = 0; i < projected.length; i++) {
            const p1 = projected[i]
            for (let j = i + 1; j < projected.length; j++) {
                const p2 = projected[j]
                const dx = p1.sx - p2.sx
                const dy = p1.sy - p2.sy
                if (dx*dx + dy*dy < distLimitSq) {
                    ctx.moveTo(p1.sx, p1.sy)
                    ctx.lineTo(p2.sx, p2.sy)
                }
            }
        }
        ctx.stroke()
      } else {
          // 2. Draw Core Glow for Mobile 'Orb' (Cleaner & more focused)
          const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, globeRadius * 1.5)
          grad.addColorStop(0, 'rgba(0, 105, 255, 0.05)')
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(centerX, centerY, globeRadius * 1.5, 0, Math.PI * 2)
          ctx.fill()
      }

      // 3. Draw Particles (Both)
      projected.forEach(p => {
        const alpha = Math.max(0, (p.z2 + globeRadius) / (2 * globeRadius))
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, (isMobile ? 0.9 : 1.6) * p.scale, 0, Math.PI * 2)
        
        if (isMobile) {
            // High-fidelity 3D dot for mobile
            ctx.fillStyle = `rgba(0, 105, 255, ${alpha * 0.7})`
        } else {
            ctx.fillStyle = `rgba(0, 105, 255, ${alpha * 0.8})`
        }
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
    draw()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden rounded-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full will-change-transform"
        style={{
          opacity: opacity,
          transition: 'opacity 0.3s ease-out'
        }}
      />
    </div>
  )
}

export default AiBrain
