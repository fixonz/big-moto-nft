"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useWallet } from "../context/wallet-context"

const realmLocations = [
  {
    id: "volcano",
    name: "Ember Volcano",
    description: "Home to the fire elementals, this volatile region is filled with molten lava and eternal flames.",
    difficulty: "Medium",
    rewards: ["Fire Essence", "Volcanic Armor", "Flame Rune"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ember-oywOjTPpT9cCZfyvPg0YLlaVFTjFmM.png",
    color: "#ff5500",
    position: { x: 20, y: 30 },
    unlocked: true,
  },
  {
    id: "ocean",
    name: "Ripple Depths",
    description: "The mysterious underwater domain where water elementals harness the power of ancient currents.",
    difficulty: "Hard",
    rewards: ["Water Essence", "Tidal Crown", "Frost Shard"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-Pux3HQE2v61HziCCwhXDAt7A26ekaF.png",
    color: "#00ffff",
    position: { x: 70, y: 60 },
    unlocked: true,
  },
  {
    id: "forest",
    name: "Thorn Grove",
    description: "An ancient forest where earth elementals commune with nature and guard forgotten knowledge.",
    difficulty: "Easy",
    rewards: ["Earth Essence", "Living Armor", "Growth Seed"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-QY4OF59UBesgXA8jJW0VK6u3OXEiYG.png",
    color: "#00ff66",
    position: { x: 40, y: 70 },
    unlocked: true,
  },
  {
    id: "void",
    name: "Arcane Void",
    description: "The mysterious center of the Shadow Realm, where reality bends and ancient powers converge.",
    difficulty: "Extreme",
    rewards: ["Void Essence", "Shadow Crown", "Reality Shard"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/puurpl-IKinJHM8cILAZLOPXDI6xYFTkLa0D8.png",
    color: "#9900ff",
    position: { x: 50, y: 40 },
    unlocked: false,
  },
]

export default function ShadowRealmMap() {
  const [selectedLocation, setSelectedLocation] = useState<null | (typeof realmLocations)[0]>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [mapReveal, setMapReveal] = useState(0)
  const { isConnected } = useWallet()

  useEffect(() => {
    // Gradually reveal the map
    const interval = setInterval(() => {
      setMapReveal((prev) => {
        if (prev < 100) return prev + 1
        clearInterval(interval)
        return 100
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const handleLocationClick = (location: (typeof realmLocations)[0]) => {
    if (!location.unlocked && !isConnected) return

    setSelectedLocation(location)
    setShowDetails(true)
  }

  const handleExplore = () => {
    if (!selectedLocation || !isConnected) return

    // Here you would implement the exploration logic
    console.log(`Exploring ${selectedLocation.name}`)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-heading mb-8 text-center">
        <span className="text-[#00ffff]">Shadow</span> <span className="text-white">Realm</span>{" "}
        <span className="text-[#ff5500]">Map</span>
      </h2>

      <div className="relative w-full aspect-[16/9] bg-black/30 rounded-xl overflow-hidden border-2 border-[#00ffff]/30">
        {/* Map Background */}
        <div
          className="absolute inset-0 bg-[url('/textures/realm-map.png')] bg-cover bg-center"
          style={{ clipPath: `circle(${mapReveal}% at center)` }}
        >
          {/* Map Grid */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
            {Array(100)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border border-white/5"></div>
              ))}
          </div>

          {/* Location Markers */}
          {realmLocations.map((location) => (
            <motion.button
              key={location.id}
              className={`absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${
                location.unlocked || isConnected ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
              style={{
                left: `${location.position.x}%`,
                top: `${location.position.y}%`,
                opacity: mapReveal > 50 ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
              onClick={() => handleLocationClick(location)}
              whileHover={location.unlocked || isConnected ? { scale: 1.1 } : {}}
              whileTap={location.unlocked || isConnected ? { scale: 0.95 } : {}}
            >
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  backgroundColor: `${location.color}40`,
                  boxShadow: `0 0 15px ${location.color}80`,
                }}
              ></div>
              <div
                className="absolute inset-2 rounded-full overflow-hidden border-2"
                style={{ borderColor: location.color }}
              >
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  fill
                  className="object-cover pixelated"
                />
              </div>
              {!location.unlocked && !isConnected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                  <span className="text-white text-xl">🔒</span>
                </div>
              )}
            </motion.button>
          ))}

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: mapReveal > 70 ? 0.5 : 0 }}>
            {realmLocations.map((location, i) =>
              realmLocations
                .slice(i + 1)
                .map((otherLocation, j) => (
                  <line
                    key={`${location.id}-${otherLocation.id}`}
                    x1={`${location.position.x}%`}
                    y1={`${location.position.y}%`}
                    x2={`${otherLocation.position.x}%`}
                    y2={`${otherLocation.position.y}%`}
                    stroke={`${location.color}40`}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                  />
                )),
            )}
          </svg>
        </div>

        {/* Fog of War Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: Math.max(0, 1 - mapReveal / 100),
            transition: "opacity 0.5s ease",
          }}
        ></div>

        {/* Location Details Panel */}
        <AnimatePresence>
          {showDetails && selectedLocation && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 border-t-2"
              style={{ borderColor: selectedLocation.color }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-heading text-lg" style={{ color: selectedLocation.color }}>
                    {selectedLocation.name}
                  </h3>
                  <p className="text-sm text-gray-300 font-pixel mt-1 mb-2">{selectedLocation.description}</p>

                  <div className="flex gap-4 text-xs font-pixel">
                    <div>
                      <span className="text-gray-400">Difficulty: </span>
                      <span
                        style={{
                          color:
                            selectedLocation.difficulty === "Extreme"
                              ? "#ff5500"
                              : selectedLocation.difficulty === "Hard"
                                ? "#ff9900"
                                : selectedLocation.difficulty === "Medium"
                                  ? "#ffff00"
                                  : "#00ff66",
                        }}
                      >
                        {selectedLocation.difficulty}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400">Rewards: </span>
                      <span className="text-white">{selectedLocation.rewards.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-3 py-1 bg-transparent border border-white/50 text-white font-heading text-xs rounded-pixel hover:bg-white/10"
                  >
                    CLOSE
                  </button>

                  <button
                    onClick={handleExplore}
                    disabled={!isConnected}
                    className={`px-3 py-1 font-heading text-xs rounded-pixel ${
                      !isConnected
                        ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                        : "bg-[#ff5500] text-white hover:bg-[#ff5500]/80"
                    }`}
                  >
                    EXPLORE
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center mt-4 text-sm text-gray-400 font-pixel">
        {isConnected
          ? "Click on a location to explore the Shadow Realm"
          : "Connect your wallet to unlock all locations"}
      </p>
    </div>
  )
}
