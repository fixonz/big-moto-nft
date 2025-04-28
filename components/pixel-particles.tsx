"use client"

import { useEffect, useRef } from "react"

interface PixelParticlesProps {
  count?: number
  colors?: string[]
  speed?: number
}

export default function PixelParticles({
  count = 50,
  colors = ["#ff00ff", "#00ffff", "#ff5500", "#00ff66"],
  speed = 1,
}: PixelParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      color: string
      vx: number
      vy: number
      life: number
      maxLife: number
    }[] = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.floor(Math.random() * 3) + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.vx
        p.y += p.vy
        p.life++

        // Reset if out of bounds or end of life
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height || p.life > p.maxLife) {
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
          p.life = 0
          p.maxLife = Math.random() * 200 + 100
        }

        // Calculate opacity based on life
        const opacity = Math.sin((p.life / p.maxLife) * Math.PI)

        // Draw particle
        ctx.fillStyle =
          p.color +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [count, colors, speed])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.4 }} />
}
