"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const nftImages = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gop_QXmXcAAnGoV-lGQFKWu7bXdvkNE5hvNp2deQ37UUl3.jpeg",
    number: "#042",
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GocXxhUWQAAU7rr-upL6csUAORfDsCK02ZKxUSm1kBcoqY.jpeg",
    number: "#107",
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GouAlKHXwAAKKBE-zMyPTdg4pCrWQkdlkIuXLieBhduvzF.jpeg",
    number: "#256",
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GoXa9jMWEAE2-Lz-2zCQ75oGmfDdY2iqZSzqIefVIllvvh.jpeg",
    number: "#389",
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gozd2GyWQAAl5jv-ekmAUMmMuTcc9TGhIjdJfQNYbGhkbu.jpeg",
    number: "#512",
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Go6MkvsaoAAK8C9-ohFIjEQ1lUw1i3rqCTi8jm5bZEpJzx.jpeg",
    number: "#678",
  },
  {
    id: 7,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GojnYK4XUAA_2lk-GCIokFw2372ZE2o6tzn6NrEglUlLDs.jpeg",
    number: "#723",
  },
  {
    id: 8,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GoSGVrOaEAAXfmN-iQor4LdZKpy6RsbJH7qsQsMPxNRF6I.jpeg",
    number: "#845",
  },
  {
    id: 9,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GoleaU2WcAA_9WN-vbCfB6qRs4PVeva4jayHDAdeT3YuZq.jpeg",
    number: "#901",
  },
]

export default function NftGallery() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(nftImages.length / itemsPerPage)

  const visibleNfts = nftImages.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleNfts.map((nft) => (
          <div key={nft.id} className="group">
            <div className="relative w-full h-64 md:h-72 pixelated border-4 border-white overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={nft.src || "/placeholder.svg"}
                alt={`Big Moto NFT ${nft.number}`}
                fill
                className="object-cover pixelated"
              />
              <div className="absolute -bottom-3 -right-3 bg-black text-[#ff00ff] px-2 py-1 text-sm border border-white">
                {nft.number}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            className="border-white text-white hover:bg-gray-900"
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === currentPage ? "bg-[#ff00ff]" : "bg-gray-600"}`} />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            className="border-white text-white hover:bg-gray-900"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      )}
    </div>
  )
}
