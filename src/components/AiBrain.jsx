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
    const particleCount = isMobile ? 50 : 150 
    const connectionDistance = isMobile ? 35 : 55
    const rotationSpeed = 0.001

    // State
    let angleY = 0
    let angleX = 0
    let targetAngleY = 0
    let targetAngleX = 0
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
      globeRadius = Math.min(canvasWidth, canvasHeight) * (isMobile ? 0.3 : 0.4)
      initParticles()
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particleCount)
        const theta = Math.sqrt(particleCount * Math.PI) * phi
        
        particles.push({
          baseX: Math.cos(theta) * Math.sin(phi) * globeRadius,
          baseY: Math.sin(theta) * Math.sin(phi) * globeRadius,
          baseZ: Math.cos(phi) * globeRadius,
          vx: 0, vy: 0, vz: 0
        })
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseX = e.clientX - rect.left
      targetMouseY = e.clientY - rect.top
      
      // Influence rotation target
      targetAngleY = (targetMouseX - centerX) * 0.0005
      targetAngleX = (targetMouseY - centerY) * 0.0005
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      // Physics-based smoothing (Better than simple lerp)
      mouseX += (targetMouseX - mouseX) * 0.1
      mouseY += (targetMouseY - mouseY) * 0.1
      
      angleY += (targetAngleY + rotationSpeed - (angleY - targetAngleY) * 0.05)
      angleX += (targetAngleX + rotationSpeed * 0.3 - (angleX - targetAngleX) * 0.05)

      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      // Project particles with 360-degree gravitational influence
      const projected = particles.map(p => {
        // 3D Rotation
        let x1 = p.baseX * cosY - p.baseZ * sinY
        let z1 = p.baseZ * cosY + p.baseX * sinY
        let y1 = p.baseY * cosX - z1 * sinX
        let z2 = z1 * cosX + p.baseY * sinX

        // Interaction in 3D space
        if (!isMobile) {
          const px = x1 + centerX
          const py = y1 + centerY
          const dx = mouseX - px
          const dy = mouseY - py
          const dist = Math.sqrt(dx * dx + dy * dy)
          const limit = globeRadius * 1.8
          
          if (dist < limit) {
            const force = (limit - dist) / limit
            x1 += dx * force * 0.45
            y1 += dy * force * 0.45
            z2 -= force * 30 // Pull forward for depth feel
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

      // Draw Connections (Optimized loop)
      ctx.beginPath()
      ctx.strokeStyle = `rgba(147, 51, 234, ${isMobile ? 0.06 : 0.1})`
      ctx.lineWidth = isMobile ? 0.4 : 0.6
      
      const distLimitSq = connectionDistance * connectionDistance
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i]
        // Skip connections for distant particles (optimized)
        if (p1.z2 < -globeRadius * 0.5) continue 

        for (let j = i + 1; j < projected.length; j++) {
            const p2 = projected[j]
            const dx = p1.sx - p2.sx
            const dy = p1.sy - p2.sy
            if (dx * dx + dy * dy < distLimitSq) {
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
        ctx.arc(p.sx, p.sy, (isMobile ? 0.8 : 1.4) * p.scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 105, 255, ${alpha * 0.85})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseLeave = () => {
      targetMouseX = centerX
      targetMouseY = centerY
      targetAngleX = 0
      targetAngleY = 0
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
