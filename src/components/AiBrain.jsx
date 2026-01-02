import React, { useEffect, useRef } from 'react'

const AiBrain = ({ scale = 1, opacity = 1 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    // Configuration
    const particleCount = 250 // Low count for performance
    const connectionDistance = 40
    const globeRadius = 120
    const rotationSpeed = 0.003

    // State
    let angleY = 0
    let angleX = 0
    let particles = []

    const initParticles = () => {
      particles = []
      const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

      for (let i = 0; i < particleCount; i++) {
        const y = 1 - (i / (particleCount - 1)) * 2 // y goes from 1 to -1
        const radius = Math.sqrt(1 - y * y) // Radius at y
        
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

    const draw = () => {
      // Resize logic
      const rect = canvas.parentNode.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Rotate
      angleY += rotationSpeed
      angleX += rotationSpeed * 0.2

      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      // Update positions & Draw Particles
      particles.forEach(p => {
        // Rotation Y
        let x1 = p.baseX * cosY - p.baseZ * sinY
        let z1 = p.baseZ * cosY + p.baseX * sinY
        
        // Rotation X
        let y1 = p.baseY * cosX - z1 * sinX
        let z2 = z1 * cosX + p.baseY * sinX

        // Perspective projection
        const scaleProj = 400 / (400 + z2) // simplistic z-buffer
        const x2d = x1 * scaleProj + centerX
        const y2d = y1 * scaleProj + centerY

        // Store active 2D coords
        p.sx = x2d
        p.sy = y2d
        p.scale = scaleProj

        // Draw Dot
        const alpha = Math.max(0, (z2 + globeRadius) / (2 * globeRadius)) // Fade back particles
        ctx.beginPath()
        ctx.arc(x2d, y2d, 1.5 * scaleProj, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 105, 255, ${alpha})` // Brand Blue
        ctx.fill()
      })

      // Draw Connections (Neural Network effect)
      ctx.strokeStyle = `rgba(147, 51, 234, 0.15)` // Subtle Purple
      ctx.lineWidth = 1
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].sx - particles[j].sx
            const dy = particles[i].sy - particles[j].sy
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
                ctx.beginPath()
                ctx.moveTo(particles[i].sx, particles[i].sy)
                ctx.lineTo(particles[j].sx, particles[j].sy)
                ctx.stroke()
            }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    initParticles()
    draw()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{
        opacity: opacity,
        transform: `scale(${scale})`,
        transition: 'opacity 0.2s, transform 0.2s'
      }}
    />
  )
}

export default AiBrain
