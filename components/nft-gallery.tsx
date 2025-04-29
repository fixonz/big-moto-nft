"use client"
import React from "react";

import Image from "next/image"

export default function NftGallery() {
  const nfts = [
    {
      id: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gozd2GyWQAAl5jv-ekmAUMmMuTcc9TGhIjdJfQNYbGhkbu.jpeg"
    },
    {
      id: 2,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Goe93fQWEAAqTUr-NBdrYBBmsaEMVPR7hopGxlM6s5rjg9.jpeg"
    },
    {
      id: 3,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-Pux3HQE2v61HziCCwhXDAt7A26ekaF.png"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {nfts.map((nft) => (
        <div key={nft.id} className="relative aspect-square rounded-pixel overflow-hidden border-2 border-[#00ffff]/30">
          <Image
            src={nft.image}
            alt={`NFT #${nft.id}`}
            fill
            className="object-cover pixelated"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      ))}
    </div>
  )
}
