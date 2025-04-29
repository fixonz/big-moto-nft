"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sparkles, MeshTransmissionMaterial } from "@react-three/drei"
import { Suspense } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { useWallet } from "../context/wallet-context"

// Create a simple portal geometry instead of loading a GLB file
function Portal(props: any) {
  const portalRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const { clock } = useThree()

  useFrame(() => {
    if (portalRef.current) {
      portalRef.current.rotation.z = clock.getElapsedTime() * 0.05
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = -clock.getElapsedTime() * 0.1
      innerRef.current.scale.set(
        1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05,
        1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05,
        1,
      )
    }
  })

  return (
    <group {...props} dispose={null}>
      {/* Outer ring */}
      <mesh ref={portalRef}>
        <torusGeometry args={[2, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#ff5500"
          emissive="#ff5500"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner portal */}
      <mesh ref={innerRef}>
        <circleGeometry args={[1.7, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={10}
          thickness={0.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
    </group>
  )
}

function FloatingCharacter({ position, rotation, scale, url, delay = 0 }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const { clock } = useThree()

  useEffect(() => {
    // Load texture with error handling
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = "anonymous"
    textureLoader.load(
      url,
      (loadedTexture) => {
        setTexture(loadedTexture)
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error)
      },
    )
  }, [url])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() * 0.5 + delay) * 0.001
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1 + delay
    }
  })

  if (!texture) return null

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.5} />
    </mesh>
  )
}

function ShadowRealm() {
  const { isConnected } = useWallet()
  const particlesRef = useRef<THREE.Points>(null)
  const { clock } = useThree()

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff5500" />

      <Sparkles count={200} scale={10} size={2} speed={0.5} color="#00ffff" />
      <Sparkles count={200} scale={10} size={2} speed={0.3} color="#ff5500" />

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 10)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#ffffff" sizeAttenuation transparent opacity={0.5} />
      </points>

      <Portal position={[0, 0, 0]} scale={[2, 2, 2]} />

      <FloatingCharacter
        position={[-2, 0, -1]}
        rotation={[0, 0.5, 0]}
        scale={[1.5, 1.5, 1.5]}
        url="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ember-oywOjTPpT9cCZfyvPg0YLlaVFTjFmM.png"
        delay={0}
      />
      <FloatingCharacter
        position={[2, 0.5, -1]}
        rotation={[0, -0.5, 0]}
        scale={[1.5, 1.5, 1.5]}
        url="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-Pux3HQE2v61HziCCwhXDAt7A26ekaF.png"
        delay={1}
      />
      <FloatingCharacter
        position={[0, -1, -2]}
        rotation={[0, 0, 0]}
        scale={[1.5, 1.5, 1.5]}
        url="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-QY4OF59UBesgXA8jJW0VK6u3OXEiYG.png"
        delay={2}
      />

      {isConnected && (
        <FloatingCharacter
          position={[0, 0, 1]}
          rotation={[0, Math.PI, 0]}
          scale={[2, 2, 2]}
          url="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/puurpl-IKinJHM8cILAZLOPXDI6xYFTkLa0D8.png"
          delay={3}
        />
      )}
    </>
  )
}

export default function ShadowNexus() {
  const [interacting, setInteracting] = useState(false)
  const [energy, setEnergy] = useState(0)
  const [portalStability, setPortalStability] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { isConnected } = useWallet()

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setEnergy((prev) => Math.min(prev + 1, 100))
        setPortalStability((prev) => Math.min(prev + 0.5, 100))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isConnected])

  const handleInteract = () => {
    if (!interacting && energy > 20) {
      setInteracting(true)
      setEnergy((prev) => prev - 20)

      // Simulate portal interaction
      setTimeout(() => {
        setInteracting(false)
        // Trigger special effect or reward here
      }, 3000)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] rounded-xl overflow-hidden">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ShadowRealm />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-center">
          <div className="w-1/3">
            <p className="text-[#00ffff] font-heading text-xs mb-1">SHADOW ENERGY</p>
            <div className="h-2 bg-black/50 rounded-pixel overflow-hidden">
              <motion.div
                className="h-full bg-[#00ffff]"
                initial={{ width: "0%" }}
                animate={{ width: `${energy}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
          </div>

          <button
            onClick={handleInteract}
            disabled={!isConnected || energy < 20 || interacting}
            className={`px-6 py-3 font-heading text-xs rounded-pixel transition-all ${
              !isConnected || energy < 20 || interacting
                ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                : "bg-[#ff5500] text-white hover:bg-[#ff5500]/80 hover:drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]"
            }`}
          >
            {interacting ? "STABILIZING..." : isConnected ? "INTERACT WITH PORTAL" : "CONNECT WALLET TO INTERACT"}
          </button>

          <div className="w-1/3 text-right">
            <p className="text-[#ff5500] font-heading text-xs mb-1">PORTAL STABILITY</p>
            <div className="h-2 bg-black/50 rounded-pixel overflow-hidden">
              <motion.div
                className="h-full bg-[#ff5500]"
                initial={{ width: "0%" }}
                animate={{ width: `${portalStability}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pixel Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5 mix-blend-overlay"></div>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="absolute w-full h-[1px] bg-black/5" style={{ top: `${i * 5}%` }}></div>
          ))}
      </div>
    </div>
  )
}
