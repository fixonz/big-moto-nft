import React from "react";
import ClientProviders from "../../components/client-providers"

export default function DeployLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <section>
        {children}
      </section>
    </ClientProviders>
  )
} 