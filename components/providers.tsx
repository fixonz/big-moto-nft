"use client"

import type { ReactNode } from "react"
import { AbstractWalletProvider } from "@abstract-foundation/agw-react"
import { abstractTestnet } from "viem/chains"
import { WalletProvider } from "../context/wallet-context"

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AbstractWalletProvider config={abstractTestnet}>
      <WalletProvider>{children}</WalletProvider>
    </AbstractWalletProvider>
  )
}
