"use client"

import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useWallet } from "@/context/wallet-context"

const elementTypes = [
  {
    id: "fire",
    name: "Fire",
    color: "#ff5500",
    traits: ["Destruction", "Passion", "Transformation"],
    abilities: ["Flame Manipulation", "Heat Resistance", "Ash Teleportation"],
    baseImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ember-oywOjTPpT9cCZfyvPg0YLlaVFTjFmM.png",
  },
  {
    id: "water",
    name: "Water",
    color: "#00ffff",
    traits: ["Adaptability", "Healing", "Wisdom"],
    abilities: ["Water Shaping", "Healing Currents", "Mist Form"],
    baseImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-Pux3HQE2v61HziCCwhXDAt7A26ekaF.png",
  },
  {
    id: "earth",
    name: "Earth",
    color: "#00ff66",
    traits: ["Strength", "Resilience", "Growth"],
    abilities: ["Earth Manipulation", "Plant Control", "Stone Skin"],
    baseImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-QY4OF59UBesgXA8jJW0VK6u3OXEiYG.png",
  },
  {
    id: "arcane",
    name: "Arcane",
    color: "#9900ff",
    traits: ["Mystery", "Knowledge", "Power"],
    abilities: ["Reality Bending", "Mind Reading", "Energy Projection"],
    baseImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/puurpl-IKinJHM8cILAZLOPXDI6xYFTkLa0D8.png",
  },
]

const accessories = [
  { id: "none", name: "None", rarity: "Common", boost: "No boost" },
  { id: "amulet", name: "Shadow Amulet", rarity: "Rare", boost: "+10% Element Power" },
  { id: "crown", name: "Void Crown", rarity: "Epic", boost: "+25% Shadow Resistance" },
  { id: "weapon", name: "Ethereal Blade", rarity: "Legendary", boost: "+40% Attack Power" },
]

export default function ShadowCharacterCreator() {
  const [selectedElement, setSelectedElement] = useState(elementTypes[0])
  const [selectedAccessory, setSelectedAccessory] = useState(accessories[0])
  const [characterName, setCharacterName] = useState("")
  const [powerLevel, setPowerLevel] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const { isConnected } = useWallet()

  useEffect(() => {
    // Calculate power level based on selections
    const elementBase = Math.floor(Math.random() * 50) + 50
    const accessoryBoost = accessories.findIndex((a) => a.id === selectedAccessory.id) * 10
    setPowerLevel(elementBase + accessoryBoost)
  }, [selectedElement, selectedAccessory])

  const handleGenerate = () => {
    if (!isConnected || !characterName) return

    setIsGenerating(true)
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      // Here you would typically mint the NFT or save the character
    }, 3000)
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-black/30 rounded-xl p-6 border-2 border-[#00ffff]/30">
      <h2 className="text-2xl md:text-3xl font-heading mb-8 text-center">
        <span className="text-[#ff5500]">Shadow</span> <span className="text-white">Character</span>{" "}
        <span className="text-[#00ffff]">Creator</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Character Preview */}
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 mb-6">
            <div
              className="absolute inset-0 rounded-pixel overflow-hidden border-2 animate-shadow-breathe"
              style={{ borderColor: selectedElement.color }}
            >
              <Image
                src={selectedElement.baseImage || "/placeholder.svg"}
                alt={selectedElement.name}
                fill
                className="object-cover pixelated"
              />

              {/* Accessory overlay would go here */}
              {selectedAccessory.id !== "none" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1/3 h-1/3 bg-[#9900ff]/20 rounded-full animate-pulse"></div>
                </div>
              )}

              {/* Element effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1/4 opacity-30"
                style={{ background: `linear-gradient(to top, ${selectedElement.color}, transparent)` }}
              ></div>
            </div>
          </div>

          <div className="w-full max-w-xs">
            <div className="mb-4">
              <label className="block text-[#00ffff] font-heading text-xs mb-2">CHARACTER NAME</label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border-2 border-[#00ffff]/50 text-white font-pixel rounded-pixel focus:outline-none focus:border-[#00ffff]"
                placeholder="Enter name..."
                maxLength={20}
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#ff5500] font-heading text-xs mb-2">POWER LEVEL</label>
              <div className="relative h-4 bg-black/50 rounded-pixel overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: `linear-gradient(to right, ${selectedElement.color}, #ff5500)` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${powerLevel}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
                <div className="absolute top-0 right-2 text-xs text-white font-pixel">{powerLevel}</div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!isConnected || !characterName || isGenerating}
              className={`w-full px-6 py-3 font-heading text-xs rounded-pixel transition-all ${
                !isConnected || !characterName || isGenerating
                  ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                  : "bg-[#ff5500] text-white hover:bg-[#ff5500]/80 hover:drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]"
              }`}
            >
              {isGenerating ? "GENERATING..." : isConnected ? "GENERATE CHARACTER" : "CONNECT WALLET TO CREATE"}
            </button>
          </div>
        </div>

        {/* Character Options */}
        <div>
          <div className="mb-6">
            <h3 className="text-white font-heading text-sm mb-3">SELECT ELEMENT</h3>
            <div className="grid grid-cols-2 gap-3">
              {elementTypes.map((element) => (
                <button
                  key={element.id}
                  onClick={() => setSelectedElement(element)}
                  className={`p-3 rounded-pixel transition-all ${
                    selectedElement.id === element.id
                      ? "bg-black/70 border-2 animate-shadow-breathe"
                      : "bg-black/30 border border-white/20 hover:border-white/50"
                  }`}
                  style={{
                    borderColor: selectedElement.id === element.id ? element.color : undefined,
                    boxShadow: selectedElement.id === element.id ? `0 0 10px ${element.color}80` : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-pixel overflow-hidden">
                      <Image
                        src={element.baseImage || "/placeholder.svg"}
                        alt={element.name}
                        fill
                        className="object-cover pixelated"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-heading text-xs" style={{ color: element.color }}>
                        {element.name}
                      </div>
                      <div className="text-xs text-gray-400 font-pixel">{element.traits[0]}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-heading text-sm mb-3">SELECT ACCESSORY</h3>
            <div className="grid grid-cols-1 gap-3">
              {accessories.map((accessory) => (
                <button
                  key={accessory.id}
                  onClick={() => setSelectedAccessory(accessory)}
                  className={`p-3 rounded-pixel transition-all ${
                    selectedAccessory.id === accessory.id
                      ? "bg-black/70 border-2 border-[#9900ff] animate-shadow-breathe"
                      : "bg-black/30 border border-white/20 hover:border-white/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <div className="font-heading text-xs text-white">{accessory.name}</div>
                      <div className="text-xs text-gray-400 font-pixel">{accessory.boost}</div>
                    </div>
                    <div
                      className="text-xs font-pixel"
                      style={{
                        color:
                          accessory.rarity === "Legendary"
                            ? "#ff5500"
                            : accessory.rarity === "Epic"
                              ? "#9900ff"
                              : accessory.rarity === "Rare"
                                ? "#00ffff"
                                : "#aaaaaa",
                      }}
                    >
                      {accessory.rarity}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-heading text-sm mb-3">ABILITIES</h3>
            <div className="bg-black/30 p-4 rounded-pixel border border-white/20">
              <ul className="space-y-2">
                {selectedElement.abilities.map((ability, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: selectedElement.color }}>
                      ◆
                    </span>
                    <span className="font-pixel text-sm text-gray-200">{ability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
