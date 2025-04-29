"use client"
import React, { type ReactNode, useState, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AbstractWalletProvider, useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { abstractTestnet } from "viem/chains";

// See: https://docs.abs.xyz/abstract-global-wallet/agw-react/AbstractWalletProvider
// AbstractWalletProvider expects a 'chain' prop, not 'config'.

// Create a client
const queryClient = new QueryClient();

// Create a simple wallet context that doesn't rely on React Query hooks
interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: undefined,
  connect: async () => {},
  disconnect: async () => {},
  isLoading: false,
  error: null,
});

export const useWallet = () => useContext(WalletContext);

export default function ClientProviders({ children }: { children: ReactNode }) {
  const { login, logout, address, isLoading, error } = useLoginWithAbstract();
  const isConnected = !!address;

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
    <QueryClientProvider client={queryClient}>
      <AbstractWalletProvider chain={abstractTestnet}>
        <WalletContext.Provider value={{ isConnected, address, connect, disconnect, isLoading, error: error ? String(error) : null }}>
          {children}
        </WalletContext.Provider>
      </AbstractWalletProvider>
    </QueryClientProvider>
  );
}
