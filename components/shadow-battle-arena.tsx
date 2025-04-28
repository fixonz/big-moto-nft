"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useWallet } from "@/context/wallet-context"

const battleEffects = [
  { id: "fire", name: "Fire Blast", damage: 25, color: "#ff5500", cooldown: 2 },
  { id: "water", name: "Tidal Wave", damage: 20, color: "#00ffff", cooldown: 1 },
  { id: "earth", name: "Stone Spikes", damage: 30, color: "#00ff66", cooldown: 3 },
  { id: "arcane", name: "Void Rift", damage: 40, color: "#9900ff", cooldown: 4 },
]

const enemies = [
  {
    id: "shadow1",
    name: "Shadow Lurker",
    health: 100,
    attack: 10,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GocXxhUWQAAU7rr-upL6csUAORfDsCK02ZKxUSm1kBcoqY.jpeg",
  },
  {
    id: "shadow2",
    name: "Void Walker",
    health: 150,
    attack: 15,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GoXa9jMWEAE2-Lz-2zCQ75oGmfDdY2iqZSzqIefVIllvvh.jpeg",
  },
  {
    id: "shadow3",
    name: "Realm Guardian",
    health: 200,
    attack: 20,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gozd2GyWQAAl5jv-ekmAUMmMuTcc9TGhIjdJfQNYbGhkbu.jpeg",
  },
]

export default function ShadowBattleArena() {
  const [battleActive, setBattleActive] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(0)
  const [currentEnemy, setCurrentEnemy] = useState<(typeof enemies)[0] | null>(null)
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({})
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [battleResult, setBattleResult] = useState<"victory" | "defeat" | null>(null)
  const [rewards, setRewards] = useState<string[]>([])
  const { isConnected } = useWallet()

  const startBattle = () => {
    if (!isConnected) return

    const enemy = enemies[Math.floor(Math.random() * enemies.length)]
    setCurrentEnemy(enemy)
    setEnemyHealth(enemy.health)
    setPlayerHealth(100)
    setCooldowns({})
    setBattleLog([`Battle with ${enemy.name} has begun!`])
    setBattleActive(true)
    setBattleResult(null)
  }

  const useAbility = useCallback(
    (effect: (typeof battleEffects)[0]) => {
      if (!battleActive || !currentEnemy || cooldowns[effect.id] > 0) return

      // Apply damage to enemy
      const newEnemyHealth = Math.max(0, enemyHealth - effect.damage)
      setEnemyHealth(newEnemyHealth)

      // Add to battle log
      setBattleLog((prev) => [...prev, `You used ${effect.name} for ${effect.damage} damage!`])

      // Set cooldown
      setCooldowns((prev) => ({ ...prev, [effect.id]: effect.cooldown }))

      // Enemy turn
      if (newEnemyHealth > 0) {
        setTimeout(() => {
          if (!currentEnemy) return // Add check to ensure currentEnemy is not null
          const enemyDamage = currentEnemy.attack
          const newPlayerHealth = Math.max(0, playerHealth - enemyDamage)
          setPlayerHealth(newPlayerHealth)
          setBattleLog((prev) => [...prev, `${currentEnemy.name} attacks for ${enemyDamage} damage!`])

          // Check for defeat
          if (newPlayerHealth <= 0) {
            setBattleResult("defeat")
            setBattleLog((prev) => [...prev, `You have been defeated by ${currentEnemy.name}!`])
            setTimeout(() => setBattleActive(false), 3000)
          }
        }, 1000)
      } else {
        // Victory
        setBattleResult("victory")
        setBattleLog((prev) => [...prev, `You defeated ${currentEnemy.name}!`])

        // Generate rewards
        const battleRewards = [
          `${Math.floor(Math.random() * 50) + 10} Shadow Tokens`,
          `${currentEnemy.name} Essence`,
          Math.random() > 0.7 ? "Rare Equipment Blueprint" : "Common Equipment Part",
        ]
        setRewards(battleRewards)

        setTimeout(() => setBattleActive(false), 3000)
      }
    },
    [
      battleActive,
      currentEnemy,
      cooldowns,
      enemyHealth,
      playerHealth,
      setBattleLog,
      setBattleResult,
      setCooldowns,
      setEnemyHealth,
      setPlayerHealth,
      setRewards,
    ],
  )

  // Handle cooldowns
  useEffect(() => {
    if (!battleActive) return

    const interval = setInterval(() => {
      setCooldowns((prev) => {
        const newCooldowns: Record<string, number> = {}
        let changed = false

        Object.entries(prev).forEach(([key, value]) => {
          if (value > 0) {
            newCooldowns[key] = value - 1
            changed = true
          }
        })

        return changed ? newCooldowns : prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [battleActive])

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-heading mb-8 text-center">
        <span className="text-[#ff5500]">Shadow</span> <span className="text-white">Battle</span>{" "}
        <span className="text-[#00ffff]">Arena</span>
      </h2>

      {!battleActive ? (
        <div className="bg-black/30 rounded-xl p-6 border-2 border-[#ff5500]/30 text-center">
          <h3 className="text-xl font-heading mb-4">Test Your Strength in the Arena</h3>
          <p className="text-gray-300 font-pixel mb-6">
            Challenge the shadow creatures in battle to earn rewards and prove your worth.
          </p>

          {battleResult && (
            <div className="mb-6">
              <h4
                className="text-lg font-heading mb-2"
                style={{ color: battleResult === "victory" ? "#00ff66" : "#ff5500" }}
              >
                {battleResult === "victory" ? "VICTORY!" : "DEFEAT!"}
              </h4>

              {battleResult === "victory" && rewards.length > 0 && (
                <div className="bg-black/50 p-4 rounded-pixel mb-4">
                  <p className="text-[#00ffff] font-heading text-sm mb-2">REWARDS:</p>
                  <ul className="text-gray-300 font-pixel text-sm">
                    {rewards.map((reward, index) => (
                      <li key={index} className="mb-1">
                        • {reward}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <button
            onClick={startBattle}
            disabled={!isConnected}
            className={`px-6 py-3 font-heading text-xs rounded-pixel ${
              !isConnected
                ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                : "bg-[#ff5500] text-white hover:bg-[#ff5500]/80 hover:drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]"
            }`}
          >
            {isConnected ? "ENTER BATTLE" : "CONNECT WALLET TO BATTLE"}
          </button>
        </div>
      ) : (
        <div className="bg-black/30 rounded-xl p-6 border-2 border-[#ff5500]/30">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Battle Arena */}
            <div className="w-full md:w-2/3">
              <div className="relative w-full aspect-video bg-black/50 rounded-pixel overflow-hidden mb-4">
                {/* Battle Background */}
                <div className="absolute inset-0 bg-[url('/textures/battle-arena.png')] bg-cover bg-center opacity-30"></div>

                {/* Player */}
                <motion.div
                  className="absolute bottom-4 left-4 w-32 h-32"
                  animate={{ x: [0, 5, -5, 0], y: [0, -5, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ember-oywOjTPpT9cCZfyvPg0YLlaVFTjFmM.png"
                      alt="Player Character"
                      fill
                      className="object-contain pixelated"
                    />
                  </div>

                  {/* Health Bar */}
                  <div className="absolute -top-6 left-0 right-0">
                    <div className="h-2 bg-black/70 rounded-pixel overflow-hidden">
                      <motion.div
                        className="h-full bg-[#00ff66]"
                        initial={{ width: "100%" }}
                        animate={{ width: `${playerHealth}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                      />
                    </div>
                    <div className="text-center text-xs font-pixel text-white mt-1">{playerHealth}/100</div>
                  </div>
                </motion.div>

                {/* Enemy */}
                {currentEnemy && (
                  <motion.div
                    className="absolute bottom-4 right-4 w-32 h-32"
                    animate={{ x: [0, -5, 5, 0], y: [0, 5, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={currentEnemy.image || "/placeholder.svg"}
                        alt={currentEnemy.name}
                        fill
                        className="object-contain pixelated"
                      />
                    </div>

                    {/* Health Bar */}
                    <div className="absolute -top-6 left-0 right-0">
                      <div className="h-2 bg-black/70 rounded-pixel overflow-hidden">
                        <motion.div
                          className="h-full bg-[#ff5500]"
                          initial={{ width: "100%" }}
                          animate={{ width: `${(enemyHealth / currentEnemy.health) * 100}%` }}
                          transition={{ type: "spring", stiffness: 100 }}
                        />
                      </div>
                      <div className="text-center text-xs font-pixel text-white mt-1">
                        {enemyHealth}/{currentEnemy.health}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Battle Effects */}
                <AnimatePresence>
                  {battleResult && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div
                        className="text-4xl font-heading px-8 py-4 rounded-pixel"
                        style={{
                          color: battleResult === "victory" ? "#00ff66" : "#ff5500",
                          backgroundColor: "rgba(0,0,0,0.7)",
                          border: `2px solid ${battleResult === "victory" ? "#00ff66" : "#ff5500"}`,
                        }}
                      >
                        {battleResult === "victory" ? "VICTORY!" : "DEFEAT!"}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Battle Controls */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {battleEffects.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => useAbility(effect)}
                    disabled={cooldowns[effect.id] > 0 || !battleActive || battleResult !== null}
                    className={`p-2 rounded-pixel relative overflow-hidden ${
                      cooldowns[effect.id] > 0 || !battleActive || battleResult !== null
                        ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                        : "bg-black/50 hover:bg-black/70 border-2"
                    }`}
                    style={{
                      borderColor: cooldowns[effect.id] > 0 ? "transparent" : effect.color,
                    }}
                  >
                    <div className="text-center">
                      <div className="font-heading text-xs" style={{ color: effect.color }}>
                        {effect.name}
                      </div>
                      <div className="text-xs font-pixel text-white">DMG: {effect.damage}</div>
                    </div>

                    {cooldowns[effect.id] > 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white font-heading text-lg">{cooldowns[effect.id]}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Battle Log */}
            <div className="w-full md:w-1/3 bg-black/50 rounded-pixel p-3 border border-white/20 h-64 overflow-y-auto">
              <h4 className="text-[#00ffff] font-heading text-xs mb-2 sticky top-0 bg-black/70 p-1">BATTLE LOG</h4>
              <div className="space-y-2">
                {battleLog.map((log, index) => (
                  <div key={index} className="text-xs font-pixel text-gray-300 border-b border-white/10 pb-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
