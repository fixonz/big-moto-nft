"use client"
import React, { type ReactNode, useState, createContext, useContext } from "react";
// @ts-ignore
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// @ts-ignore
import { AbstractWalletProvider } from "@abstract-foundation/agw-react"
import { abstractTestnet } from "viem/chains"

// Create a client
const queryClient = new QueryClient()

// Create a simple wallet context that doesn't rely on React Query hooks
interface WalletContextType {
  isConnected: boolean
  address: string | undefined
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: undefined,
  connect: () => {},
  disconnect: () => {},
})

export const useWallet = () => useContext(WalletContext)

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)

  // Simple connect/disconnect functions that don't rely on React Query hooks
  const connect = async () => {
    try {
      // In a real implementation, this would use the Abstract wallet
      // For now, we'll just set isConnected to true
      setIsConnected(true)
      setAddress("0x1234...5678") // Placeholder address
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const disconnect = async () => {
    try {
      setIsConnected(false)
      setAddress(undefined)
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AbstractWalletProvider chain={abstractTestnet}>
        <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>
          {children}
        </WalletContext.Provider>
      </AbstractWalletProvider>
    </QueryClientProvider>
  )
}
