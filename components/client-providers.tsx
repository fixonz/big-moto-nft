"use client"
import React, { type ReactNode, useState, createContext, useContext, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AbstractWalletProvider, useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { abstractTestnet } from "viem/chains";
import { useAccount } from "wagmi";

// See: https://docs.abs.xyz/abstract-global-wallet/agw-react/AbstractWalletProvider
// AbstractWalletProvider expects a 'chain' prop, not 'config'.

// Create a simple wallet context that doesn't rely on React Query hooks
interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: undefined,
  connect: async () => {},
  disconnect: async () => {},
});

export const useWallet = () => useContext(WalletContext);

export default function ClientProviders({ children }: { children: ReactNode }) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  if (!queryClientRef.current) return null; // TypeScript guard
  const { address, isConnected } = useAccount();
  const { login, logout } = useLoginWithAbstract();

  const connect = async () => {
    try {
      await login();
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  const disconnect = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
    }
  };

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AbstractWalletProvider config={abstractTestnet}>
        <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>
          {children}
        </WalletContext.Provider>
      </AbstractWalletProvider>
    </QueryClientProvider>
  );
}
