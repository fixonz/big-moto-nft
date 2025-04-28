"use client"

import { useEffect, useRef } from "react"

interface PixelFireEffectProps {
  color?: string
}

export default function PixelFireEffect({ color = "#ff5500" }: PixelFireEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Fire parameters
    const pixelSize = 4
    const width = Math.floor(canvas.width / pixelSize)
    const height = Math.floor(canvas.height / pixelSize)

    // Create fire array
    let firePixels = new Array(width * height).fill(0)

    // Set bottom row to maximum heat
    for (let x = 0; x < width; x++) {
      firePixels[(height - 1) * width + x] = 36
    }

    // Color palette
    const getFireColor = (intensity: number) => {
      if (intensity === 0) return [0, 0, 0, 0]

      // Base color from prop
      const baseColor =
        color === "#ff5500"
          ? [255, 85, 0] // Orange fire
          : color === "#00ffff"
            ? [0, 255, 255] // Cyan fire
            : [255, 0, 255] // Magenta fire

      const alpha = Math.min(1, intensity / 36)
      const fadeToWhite = intensity / 36

      const r = Math.min(255, baseColor[0] + (255 - baseColor[0]) * fadeToWhite * 0.8)
      const g = Math.min(255, baseColor[1] + (255 - baseColor[1]) * fadeToWhite * 0.5)
      const b = Math.min(255, baseColor[2] + (255 - baseColor[2]) * fadeToWhite * 0.3)

      return [r, g, b, alpha]
    }

    // Animation loop
    const animate = () => {
      // Fire propagation algorithm
      for (let y = 0; y < height - 1; y++) {
        for (let x = 0; x < width; x++) {
          const decay = Math.floor(Math.random() * 3)
          const belowIdx = (y + 1) * width + x
          const currentIdx = y * width + x
          const newIdx = currentIdx - decay + 1

          // Ensure we're not going out of bounds
          const targetIdx = x - decay + 1 < 0 ? currentIdx : newIdx

          // Propagate fire upwards with decay
          firePixels[targetIdx] = Math.max(0, firePixels[belowIdx] - decay)
        }
      }

      // Render fire
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x
          const intensity = firePixels[idx]
          const [r, g, b, a] = getFireColor(intensity)

          if (a > 0) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const newWidth = Math.floor(canvas.width / pixelSize)
      const newHeight = Math.floor(canvas.height / pixelSize)

      // Recreate fire array with new dimensions
      firePixels = new Array(newWidth * newHeight).fill(0)

      // Set bottom row to maximum heat
      for (let x = 0; x < newWidth; x++) {
        firePixels[(newHeight - 1) * newWidth + x] = 36
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [color])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
