"use client"
import React from "react";

export default function WaitlistClosed() {
  return (
    <div className="bg-black/50 backdrop-blur-sm border-2 border-[#ff5500]/50 p-8 rounded-pixel">
      <h2 className="text-2xl md:text-3xl font-heading mb-8 text-center tracking-wide">
        <span className="text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]">Whitelist</span>{" "}
        <span className="text-white">Status</span>
      </h2>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-pixel">Total Supply:</span>
          <span className="text-xl text-[#00ffff] font-pixel">999</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-pixel">Whitelist Spots:</span>
          <span className="text-xl text-[#ff5500] font-pixel">50</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-pixel">Status:</span>
          <span className="text-xl text-[#ff5500] font-pixel">CLOSED</span>
        </div>

        <p className="text-center text-sm text-gray-400 font-pixel mt-6">
          Whitelist registration is currently closed. Follow us on Twitter for updates.
        </p>
      </div>
    </div>
  )
}
