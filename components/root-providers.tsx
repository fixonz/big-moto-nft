"use client"

import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRef } from "react"

export default function RootProviders({ children }: { children: ReactNode }) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  if (!queryClientRef.current) return null;
  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
}
