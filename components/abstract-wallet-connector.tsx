"use client"

import React from "react"
import { useState } from "react"
import { useLoginWithAbstract } from "@abstract-foundation/agw-react"

interface AbstractWalletConnectorProps {
  onConnect?: () => void
}

export default function AbstractWalletConnector({ onConnect }: AbstractWalletConnectorProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const { login, error } = useLoginWithAbstract()

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await login()
      if (onConnect) onConnect()
    } catch (err) {
      console.error("Failed to connect wallet:", err)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`px-5 py-2 bg-[#ff5500] text-white font-heading text-xs tracking-wide transition-all rounded-pixel
        ${
          isConnecting
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-[#ff5500]/80 hover:drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]"
        }`}
    >
      {isConnecting ? "CONNECTING..." : "CONNECT"}
    </button>
  )
}
