"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const elements = [
  {
    id: "fire",
    name: "Ember",
    color: "#ff5500",
    description:
      "Born from the volcanic depths of the Shadow Realm, Ember wields the destructive power of fire. Their flames can both destroy and create, turning obstacles to ash and lighting the way through the darkest corners of existence.",
    abilities: ["Flame Manipulation", "Heat Resistance", "Ash Teleportation"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ember-oywOjTPpT9cCZfyvPg0YLlaVFTjFmM.png",
    variants: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ember-oywOjTPpT9cCZfyvPg0YLlaVFTjFmM.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oranj-AB1PFWdkZgAwUWwu0gn7NqtlCqZizx.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ase-61BDXjDDfETbGZppL3V0MBpqApKW85.png",
    ],
  },
  {
    id: "water",
    name: "Ripple",
    color: "#00ffff",
    description:
      "Flowing from the ancient shadow seas, Ripple harnesses the adaptable power of water. They can heal allies, shape liquid into weapons, and move through the realm with the fluidity of a rushing stream.",
    abilities: ["Water Shaping", "Healing Currents", "Mist Form"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-Pux3HQE2v61HziCCwhXDAt7A26ekaF.png",
    variants: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-Pux3HQE2v61HziCCwhXDAt7A26ekaF.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ok-KXuwu5v1jTx0hkW0Ie6WVdLiShJrrQ.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eas-cWYqBtufQjEbzTdzw3lTRil4oS0x6z.png",
    ],
  },
  {
    id: "earth",
    name: "Thorn",
    color: "#00ff66",
    description:
      "Emerging from the forgotten groves of the Shadow Realm, Thorn commands the resilient power of earth and plant life. They can summon barriers of stone, control vines, and commune with the ancient spirits of the land.",
    abilities: ["Earth Manipulation", "Plant Control", "Stone Skin"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-QY4OF59UBesgXA8jJW0VK6u3OXEiYG.png",
    variants: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-QY4OF59UBesgXA8jJW0VK6u3OXEiYG.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/puurpl-IKinJHM8cILAZLOPXDI6xYFTkLa0D8.png",
    ],
  },
]

export default function ElementalStoryline() {
  const [activeElement, setActiveElement] = useState(elements[0])
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)

  const cycleVariant = () => {
    setActiveVariantIndex((prev) => (prev + 1) % activeElement.variants.length)
  }

  return (
    <div className="w-full py-12">
      <h2 className="text-2xl md:text-3xl font-heading text-center mb-12">
        <span className="text-[#ff5500] animate-text-flicker">The</span> <span className="text-white">Elemental</span>{" "}
        <span className="text-[#00ffff] animate-text-flicker">Shadows</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Element selector */}
        <div className="w-full md:w-1/3 flex md:flex-col gap-4 justify-center">
          {elements.map((element) => (
            <button
              key={element.id}
              onClick={() => {
                setActiveElement(element)
                setActiveVariantIndex(0)
              }}
              className={`relative px-6 py-3 font-heading text-xs rounded-pixel animate-shadow-breathe ${
                activeElement.id === element.id
                  ? "bg-black border-2 pixel-glow"
                  : "bg-black/50 border border-white/20 hover:border-white/50"
              }`}
              style={{
                borderColor: activeElement.id === element.id ? element.color : undefined,
                boxShadow: activeElement.id === element.id ? `0 0 10px ${element.color}80` : undefined,
              }}
            >
              {element.name}

              {/* Pixel corners */}
              {activeElement.id === element.id && (
                <>
                  <div
                    className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2"
                    style={{ borderColor: element.color }}
                  ></div>
                  <div
                    className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2"
                    style={{ borderColor: element.color }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2"
                    style={{ borderColor: element.color }}
                  ></div>
                  <div
                    className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2"
                    style={{ borderColor: element.color }}
                  ></div>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Element details */}
        <motion.div
          key={`${activeElement.id}-${activeVariantIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-2/3 bg-black/30 p-6 rounded-pixel border-2 pixel-glow"
          style={{ borderColor: activeElement.color }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <button
                onClick={cycleVariant}
                className="relative aspect-square rounded-pixel overflow-hidden border-2 animate-pixel-glow w-full"
                style={{ borderColor: activeElement.color }}
              >
                <Image
                  src={activeElement.variants[activeVariantIndex] || "/placeholder.svg"}
                  alt={activeElement.name}
                  fill
                  className="object-cover pixelated"
                />

                {activeElement.variants.length > 1 && (
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {activeElement.variants.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-none ${index === activeVariantIndex ? "bg-white" : "bg-white/30"}`}
                      ></div>
                    ))}
                  </div>
                )}
              </button>

              {activeElement.variants.length > 1 && (
                <div className="text-center mt-2 text-xs font-pixel text-gray-400">Click to view variants</div>
              )}
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-heading mb-3" style={{ color: activeElement.color }}>
                {activeElement.name}
              </h3>

              <p className="text-gray-300 font-pixel mb-4 text-sm leading-relaxed">{activeElement.description}</p>

              <div className="mt-4">
                <h4 className="text-white font-heading text-xs mb-2">ABILITIES</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {activeElement.abilities.map((ability, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: activeElement.color }}>
                        ◆
                      </span>
                      <span className="font-pixel text-sm text-gray-200">{ability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
