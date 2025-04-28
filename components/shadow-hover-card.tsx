"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ShadowHoverCardProps {
  src: string
  element: string
  color: string
}

export default function ShadowHoverCard({ src, element, color }: ShadowHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative aspect-square rounded-pixel overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: color,
        boxShadow: isHovered ? `0 0 15px ${color}80` : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          opacity: isHovered ? 0.6 : 0,
        }}
      />

      {/* Main image */}
      <div className="relative w-full h-full">
        <Image
          src={src || "/placeholder.svg"}
          alt={`${element} Shadow`}
          fill
          className="object-cover pixelated transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      {/* Element indicator */}
      <div className="absolute top-3 right-3 px-2 py-1 font-pixel text-xs" style={{ color }}>
        {element}
      </div>

      {/* Hover content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <button
            className="px-4 py-2 text-white font-heading text-xs tracking-wide transition-all rounded-pixel"
            style={{ backgroundColor: color }}
          >
            VIEW DETAILS
          </button>
        </motion.div>
      </motion.div>

      {/* Pixel corner effects */}
      <div
        className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-opacity duration-300"
        style={{ borderColor: color, opacity: isHovered ? 1 : 0.3 }}
      ></div>
      <div
        className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-opacity duration-300"
        style={{ borderColor: color, opacity: isHovered ? 1 : 0.3 }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-opacity duration-300"
        style={{ borderColor: color, opacity: isHovered ? 1 : 0.3 }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-opacity duration-300"
        style={{ borderColor: color, opacity: isHovered ? 1 : 0.3 }}
      ></div>
    </div>
  )
}
