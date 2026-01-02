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
    const width = window.innerWidth
    const isSmallMobile = width < 768
    const isTabletOrDesktop = width >= 768
    const isMobileUI = width < 1024 // For general UI layout

    const particleCount = isSmallMobile ? 450 : 180 
    const connectionDistance = isSmallMobile ? 0 : 50 
    const rotationSpeed = isSmallMobile ? 0.002 : 0.0008 

    // State
    let angleY = 0
    let angleX = 0
    let particles = []
    let canvasWidth, canvasHeight, centerX, centerY, globeRadius
    let targetMouseX = 0
    let targetMouseY = 0
    let mouseX = 0
    let mouseY = 0
    let hoverAlpha = 0 
    let isCurrentlyHovered = false
    let revealedLetters = new Array(9).fill(0) // Logic for "REPLY FLOW" random reveal
    const agencyName = "REPLYFLOW"

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
      globeRadius = Math.min(canvasWidth, canvasHeight) * (isSmallMobile ? 0.3 : 0.4)
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
      isCurrentlyHovered = true
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      // Zero-latency smooth tracking (Viscous feel)
      mouseX += (targetMouseX - mouseX) * 0.08
      mouseY += (targetMouseY - mouseY) * 0.08

      // High-Precision Spatial Tilt
      const tiltX = mouseX * (isSmallMobile ? 0.08 : 0.15)
      const tiltY = mouseY * (isSmallMobile ? 0.08 : 0.15)

      angleY += rotationSpeed + tiltX * 0.1
      angleX += rotationSpeed * 0.3 + tiltY * 0.1

      const cosY = Math.cos(angleY + tiltX)
      const sinY = Math.sin(angleY + tiltX)
      const cosX = Math.cos(angleX + tiltY)
      const sinX = Math.sin(angleX + tiltY)

      const time = Date.now() * 0.001

      const projected = particles.map(p => {
        // Core 3D rotation
        let x1 = p.baseX * cosY - p.baseZ * sinY
        let z1 = p.baseZ * cosY + p.baseX * sinY
        let y1 = p.baseY * cosX - z1 * sinX
        let z2 = z1 * cosX + p.baseY * sinX

        // Pulse effect for mobile 'rounded' orb feel
        if (isSmallMobile) {
            const pulse = 1 + Math.sin(time * 0.3 + p.phase) * 0.03
            x1 *= pulse
            y1 *= pulse
            z2 *= pulse
        }

        // High-Precision Spatial Magnetism (Stretchy & Elastic)
        if (isTabletOrDesktop) {
          const worldMouseX = mouseX * globeRadius * 1.8
          const worldMouseY = mouseY * globeRadius * 1.8
          const dx = worldMouseX - x1
          const dy = worldMouseY - y1
          const dist = Math.sqrt(dx * dx + dy * dy)
          const limit = globeRadius * 2.2 // Wider range
          
          if (dist < limit) {
            // Elastic cubic easing
            const force = Math.pow(1 - dist / limit, 2.5) * 0.7
            x1 += dx * force
            y1 += dy * force
            z2 -= force * 40 // Depth displacement
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
      
      // Interpolate Hover Alpha for agency name reveal
      const targetAlpha = isCurrentlyHovered && (Math.abs(targetMouseX) < 0.8 && Math.abs(targetMouseY) < 0.8) ? 1 : 0
      hoverAlpha += (targetAlpha - hoverAlpha) * 0.05

      // 1. Draw "Atmosphere" (Glassmorphic Outer Glow)
      const atmosphereGrad = ctx.createRadialGradient(
        centerX + mouseX * 20, 
        centerY + mouseY * 20, 
        0, 
        centerX, 
        centerY, 
        globeRadius * 1.5
      )
      atmosphereGrad.addColorStop(0, `rgba(0, 105, 255, ${0.03 + hoverAlpha * 0.05})`)
      atmosphereGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = atmosphereGrad
      ctx.beginPath()
      ctx.arc(centerX, centerY, globeRadius * 1.8, 0, Math.PI * 2)
      ctx.fill()

      if (isTabletOrDesktop) {
        // 2. Draw Connections (PC/Tablet only - Neural Net) - Thicker & Darker for Premium Feel
        ctx.beginPath()
        ctx.strokeStyle = `rgba(0, 80, 200, ${0.12 - hoverAlpha * 0.04})` // Darker blue
        ctx.lineWidth = 0.8 // Thicker
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

        // 2b. Agency Name Reveal (Glassmorphic Inline Reveal)
        if (hoverAlpha > 0.01) {
          ctx.save()
          ctx.translate(centerX + mouseX * 50, centerY + mouseY * 50)
          
          // Apply 3D Tilt
          const textTiltX = tiltX * 0.4
          const textTiltY = tiltY * 0.4
          ctx.transform(1, textTiltY, textTiltX, 1, 0, 0)

          // 1. Draw Glassmorphic Backdrop Plate
          const plateW = globeRadius * 1.2
          const plateH = globeRadius * 0.35
          ctx.beginPath()
          ctx.roundRect(-plateW/2, -plateH/2, plateW, plateH, 12)
          ctx.fillStyle = `rgba(255, 255, 255, ${hoverAlpha * 0.05})` // Super transparent glass
          ctx.fill()
          ctx.strokeStyle = `rgba(255, 255, 255, ${hoverAlpha * 0.1})`
          ctx.lineWidth = 1
          ctx.stroke()
          
          // 2. Random Letter Uncover Logic
          // The more alpha, the more random letters turn high-alpha
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.font = `bold ${Math.floor(globeRadius * 0.18)}px Syne` // Smaller, more professional
          ctx.letterSpacing = "4px"

          const fullText = "REPLY FLOW"
          const chars = fullText.split("")
          const charWidth = (globeRadius * 0.1)
          const startX = -((chars.length - 1) * charWidth) / 2

          chars.forEach((char, idx) => {
            // Pseudo-random reveal based on hover progress
            const threshold = (idx / chars.length) * 0.8
            const charAlpha = Math.max(0, Math.min(1, (hoverAlpha - threshold) * 5))
            
            ctx.fillStyle = char === " " 
                ? "transparent" 
                : `rgba(255, 255, 255, ${charAlpha * 0.95})`
            
            if (charAlpha > 0) {
              ctx.shadowBlur = 10 * charAlpha
              ctx.shadowColor = 'rgba(0, 105, 255, 0.4)'
              ctx.fillText(char, startX + idx * charWidth, 0)
            }
          })
          
          ctx.restore()
        }
      }

      // 3. Draw Core Glow (Central Glass Orb)
      const coreGrad = ctx.createRadialGradient(
        centerX + mouseX * 40, 
        centerY + mouseY * 40, 
        0, 
        centerX + mouseX * 40, 
        centerY + mouseY * 40, 
        globeRadius * (0.8 + hoverAlpha * 0.2)
      )
      coreGrad.addColorStop(0, `rgba(0, 105, 255, ${0.08 + hoverAlpha * 0.1})`)
      coreGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(centerX + mouseX * 40, centerY + mouseY * 40, globeRadius * (1 + hoverAlpha * 0.2), 0, Math.PI * 2)
      ctx.fill()

      // 4. Draw Particles (Both)
      projected.forEach(p => {
        const alpha = Math.max(0, (p.z2 + globeRadius) / (2 * globeRadius))
        const pSize = (isSmallMobile ? 0.9 : 1.6) * p.scale // Slightly larger
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, pSize, 0, Math.PI * 2)
        
        if (isSmallMobile) {
            ctx.fillStyle = `rgba(0, 80, 200, ${alpha * 0.85})` // Darker branding blue
        } else {
            // Specular highlighting
            const spec = Math.pow(alpha, 3) * 0.6
            // Particles fade slightly to show text better
            const pAlpha = (alpha * 0.8 + spec) * (1 - hoverAlpha * 0.4)
            ctx.fillStyle = `rgba(0, 90, 220, ${pAlpha})`
        }
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseLeave = () => {
      targetMouseX = 0
      targetMouseY = 0
      isCurrentlyHovered = false
    }

    if (isTabletOrDesktop) {
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
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden rounded-full filter drop-shadow-[0_0_30px_rgba(0,105,255,0.1)]">
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
