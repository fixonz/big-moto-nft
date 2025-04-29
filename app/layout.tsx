import React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientProviders from '../components/client-providers'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shadows Realm is Awaiting | Big Moto NFT",
  description:
    "Big Moto NFTs are a collection of 999 unique pixelated characters born from the shadows of the blockchain.",
}

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts with higher priority */}
        <link rel="preload" href="/fonts/OldGameFatty.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PrStart.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

        {/* Force font loading with a style tag */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: "OldGameFatty";
            src: url("/fonts/OldGameFatty.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          
          @font-face {
            font-family: "PrStart";
            src: url("/fonts/PrStart.ttf") format("truetype");
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="mysterious-bg"></div>
        <WagmiProvider config={wagmiConfig}>
          <ClientProviders>{children}</ClientProviders>
        </WagmiProvider>
      </body>
    </html>
  )
}
