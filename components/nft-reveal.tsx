"use client"
import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function NftReveal() {
  const [revealed, setRevealed] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const [glitchTimeout, setGlitchTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Start reveal animation after a delay
    const timer = setTimeout(() => {
      setRevealed(true)
    }, 1500)

    // Set up random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitching(true)

        const timeout = setTimeout(() => {
          setGlitching(false)
        }, 150)

        setGlitchTimeout(timeout)
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(glitchInterval)
      if (glitchTimeout) clearTimeout(glitchTimeout)
    }
  }, [glitchTimeout])

  return (
    <div className="relative w-full max-w-md aspect-square">
      {/* Border with glow effect */}
      <div
        className={`absolute inset-0 border-2 border-white/30 transition-all duration-1000 rounded-pixel ${
          revealed ? "border-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]" : ""
        }`}
      ></div>

      {/* Main image */}
      <div className="relative w-full h-full overflow-hidden rounded-pixel">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Goe93fQWEAAqTUr-NBdrYBBmsaEMVPR7hopGxlM6s5rjg9.jpeg"
          alt="Featured NFT"
          fill
          className={`object-cover pixelated transition-all duration-1000 ${
            revealed ? "scale-100" : "scale-90 blur-sm"
          } ${glitching ? "translate-x-[1px] translate-y-[-1px]" : ""}`}
        />

        {/* Glitch overlay */}
        {glitching && <div className="absolute inset-0 bg-[#ff00ff]/10 mix-blend-screen"></div>}

        {/* Reveal overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="absolute w-full h-[1px] bg-white/5" style={{ top: `${i * 5}%` }}></div>
            ))}
        </div>
      </div>

      {/* Loading indicator before reveal */}
      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[#00ffff] font-heading text-xs animate-pulse">REVEALING...</div>
        </div>
      )}
    </div>
  )
}
