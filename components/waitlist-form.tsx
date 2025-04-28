"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, CheckCircle, XCircle } from "lucide-react"
import PixelFireEffect from "./pixel-fire-effect"

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address")
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Simulate API call
    try {
      // In a real implementation, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus("success")
      setEmail("")
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <span className="text-[#00ffff]">JOIN THE</span> <span className="text-[#ff5500]">WAITLIST</span>
          </h3>
          <p className="text-sm font-pixel text-gray-300">Enter your email for a chance to be whitelisted</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-black/70 border-2 border-[#00ffff]/50 text-white font-pixel rounded-pixel focus:outline-none focus:border-[#00ffff] placeholder-gray-500"
              disabled={isSubmitting}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00ffff]"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00ffff]"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00ffff]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00ffff]"></div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 font-heading text-xs tracking-wide rounded-pixel relative overflow-hidden ${
              isSubmitting
                ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                : "bg-[#ff5500] text-white hover:bg-[#ff5500]/80 hover:drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]"
            }`}
            whileHover={isSubmitting ? {} : { scale: 1.02 }}
            whileTap={isSubmitting ? {} : { scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">SUBMITTING</span>
                  <span className="animate-ping">...</span>
                </>
              ) : (
                <>
                  JOIN WAITLIST
                  <Sparkles size={14} className="animate-pulse" />
                </>
              )}
            </span>
          </motion.button>
        </form>

        {/* Status messages */}
        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-black/50 border border-[#00ff66] rounded-pixel flex items-center gap-2"
            >
              <CheckCircle size={18} className="text-[#00ff66]" />
              <span className="text-sm font-pixel text-[#00ff66]">You've been added to the waitlist!</span>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-black/50 border border-[#ff5500] rounded-pixel flex items-center gap-2"
            >
              <XCircle size={18} className="text-[#ff5500]" />
              <span className="text-sm font-pixel text-[#ff5500]">{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 text-center">
          <p className="text-xs font-pixel text-gray-400">Only 50 whitelist spots available!</p>
        </div>
      </div>
    </div>
  )
}
