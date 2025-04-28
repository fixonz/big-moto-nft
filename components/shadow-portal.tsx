"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ShadowPortalProps {
  isVisible: boolean
}

export default function ShadowPortal({ isVisible }: ShadowPortalProps) {
  const [portalActive, setPortalActive] = useState(false)
  const [portalPulsing, setPortalPulsing] = useState(false)

  useEffect(() => {
    if (isVisible) {
      // Start portal animation sequence
      const activateTimer = setTimeout(() => {
        setPortalActive(true)

        // Start pulsing effect after portal is active
        const pulseTimer = setTimeout(() => {
          setPortalPulsing(true)
        }, 1000)

        return () => clearTimeout(pulseTimer)
      }, 500)

      return () => clearTimeout(activateTimer)
    }
  }, [isVisible])

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Portal circle */}
      <div
        className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden transition-all duration-1000 ${
          portalActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } ${portalPulsing ? "animate-portal-pulse" : ""}`}
      >
        {/* Portal background */}
        <div className="absolute inset-0 bg-black"></div>

        {/* Portal energy */}
        <div className="absolute inset-0 bg-gradient-radial from-[#00ffff] via-[#00ffff]/20 to-transparent opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#ff5500]/50 via-transparent to-transparent mix-blend-overlay"></div>

        {/* Portal runes */}
        <div className="absolute inset-0">
          {Array(8)
            .fill(0)
            .map((_, i) => {
              const angle = (i / 8) * 2 * Math.PI
              const x = 50 + 40 * Math.cos(angle)
              const y = 50 + 40 * Math.sin(angle)

              return (
                <div
                  key={i}
                  className="absolute w-4 h-4 font-pixel text-[#00ffff] flex items-center justify-center"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    opacity: portalActive ? 1 : 0,
                    transition: `opacity 1s ease ${0.1 * i}s`,
                  }}
                >
                  {["☣", "⚠", "⚡", "✧", "⚔", "⚒", "⚓", "⚚"][i]}
                </div>
              )
            })}
        </div>

        {/* Portal center */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
            portalActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GocXxhUWQAAU7rr-upL6csUAORfDsCK02ZKxUSm1kBcoqY.jpeg"
              alt="Shadow Figure"
              fill
              className="object-contain pixelated"
            />
          </div>
        </div>

        {/* Portal energy rays */}
        <div className="absolute inset-0 pointer-events-none">
          {Array(12)
            .fill(0)
            .map((_, i) => {
              const angle = (i / 12) * 2 * Math.PI
              const length = 200

              return (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-t from-[#00ffff] to-transparent transition-all duration-1000 ${
                    portalActive ? "opacity-30" : "opacity-0"
                  }`}
                  style={{
                    height: `${length}px`,
                    transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                    transformOrigin: "top",
                  }}
                ></div>
              )
            })}
        </div>
      </div>

      {/* Portal text */}
      <h3
        className={`mt-8 text-xl md:text-2xl font-heading text-center transition-all duration-1000 ${
          portalActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <span className="text-[#00ffff]">The Portal</span> <span className="text-white">to the</span>{" "}
        <span className="text-[#ff5500]">Shadow Realm</span>
      </h3>
    </div>
  )
}
