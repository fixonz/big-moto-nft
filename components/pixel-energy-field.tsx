"use client"

import { useEffect, useRef } from "react"

interface PixelEnergyFieldProps {
  color?: string
  density?: number
  speed?: number
}

export default function PixelEnergyField({ color = "#ff00ff", density = 30, speed = 1 }: PixelEnergyFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create energy particles
    const particles: {
      x: number
      y: number
      size: number
      vx: number
      vy: number
      life: number
      maxLife: number
      color: string
    }[] = []

    for (let i = 0; i < density; i++) {
      const size = Math.floor(Math.random() * 2) + 1
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * (canvas.width / 3)

      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        life: 0,
        maxLife: Math.random() * 200 + 100,
        color,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw center glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 3,
      )
      gradient.addColorStop(0, `${color}30`)
      gradient.addColorStop(1, "transparent")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.vx
        p.y += p.vy
        p.life++

        // Calculate distance from center
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const dx = p.x - centerX
        const dy = p.y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Apply gravitational pull toward center
        const pullStrength = 0.01
        p.vx -= (dx / distance) * pullStrength
        p.vy -= (dy / distance) * pullStrength

        // Reset if too far or end of life
        if (distance > canvas.width / 2 || p.life > p.maxLife) {
          const angle = Math.random() * Math.PI * 2
          const newDistance = Math.random() * (canvas.width / 4)

          p.x = centerX + Math.cos(angle) * newDistance
          p.y = centerY + Math.sin(angle) * newDistance
          p.life = 0
          p.maxLife = Math.random() * 200 + 100
        }

        // Calculate opacity based on life and distance
        const lifeOpacity = Math.sin((p.life / p.maxLife) * Math.PI)
        const distanceOpacity = 1 - distance / (canvas.width / 2)
        const opacity = lifeOpacity * distanceOpacity

        // Draw particle
        ctx.fillStyle = `${p.color}${Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [color, density, speed])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}
