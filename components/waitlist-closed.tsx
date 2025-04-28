"use client"

import { motion } from "framer-motion"
import { CheckCircle, Twitter, ExternalLink } from "lucide-react"
import Link from "next/link"
import PixelFireEffect from "./pixel-fire-effect"

export default function WaitlistClosed() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background effects */}
      <div className="absolute -top-10 -left-10 w-20 h-20 opacity-50 pointer-events-none">
        <PixelFireEffect color="#00ffff" />
      </div>
      <div className="absolute -bottom-10 -right-10 w-20 h-20 opacity-50 pointer-events-none">
        <PixelFireEffect color="#ff5500" />
      </div>

      <div className="bg-black/50 backdrop-blur-sm border-2 border-[#ff5500]/50 p-6 rounded-pixel relative z-10">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-heading mb-2">
            <span className="text-[#00ffff]">WAITLIST</span> <span className="text-[#ff5500]">FILLED</span>
          </h3>
          <div className="flex justify-center mb-4">
            <CheckCircle size={48} className="text-[#00ff66]" />
          </div>
          <p className="text-sm font-pixel text-gray-300 mb-2">All 50 whitelist spots have been claimed!</p>
          <p className="text-sm font-pixel text-gray-300">The Shadow Realm is preparing for the chosen ones.</p>
        </div>

        <div className="bg-black/30 p-4 rounded-pixel mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-heading text-[#00ffff]">SPOTS CLAIMED</span>
            <span className="text-xs font-pixel text-white">50/50</span>
          </div>
          <div className="w-full h-2 bg-black/50 rounded-pixel overflow-hidden">
            <div className="h-full bg-[#00ff66] w-full"></div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-pixel text-gray-300 text-center">
            Follow us for announcements about the public mint and future opportunities:
          </p>

          <div className="flex gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://x.com/bigmotonft"
                target="_blank"
                className="px-6 py-3 bg-[#ff5500] text-white font-heading text-xs tracking-wide hover:bg-[#ff5500]/80 transition-all hover:drop-shadow-[0_0_8px_rgba(255,85,0,0.7)] flex items-center justify-center gap-2 rounded-pixel"
              >
                <Twitter size={14} />
                <span>FOLLOW US</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://bigmotonft.xyz/discord"
                target="_blank"
                className="px-6 py-3 bg-transparent border-2 border-[#00ffff] text-[#00ffff] font-heading text-xs tracking-wide hover:bg-[#00ffff]/10 transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] flex items-center justify-center gap-2 rounded-pixel"
              >
                <span>DISCORD</span>
                <ExternalLink size={14} />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-pixel text-[#ff5500] animate-pulse">Public mint coming soon!</p>
        </div>
      </div>
    </div>
  )
}
