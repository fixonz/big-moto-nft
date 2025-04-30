"use client"

import React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Twitter, ChevronDown, Sparkles, Zap, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import PixelEnergyField from "../components/pixel-energy-field"
import NftGallery from "../components/nft-gallery"
import WaitlistClosed from "../components/waitlist-closed"
import { useWallet } from "../components/client-providers"
import ClientProviders from "../components/client-providers"

// Stub missing components to resolve errors and accept props
const MysticalCounter = (_props: any) => null;
const PixelFireEffect = (_props: any) => null;
const ShadowPortal = (_props: any) => null;
const ElementalStoryline = (_props: any) => null;

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [showPortal, setShowPortal] = useState(false)
  const [activeTab, setActiveTab] = useState("about")
  const portalRef = useRef<HTMLDivElement>(null)
  const mintRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const roadmapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { isConnected, connect } = useWallet()
  const [mintQuantity, setMintQuantity] = useState(1)
  const [showMintSuccess, setShowMintSuccess] = useState(false)

  useEffect(() => {
    // Mark as loaded after a short delay to allow for animations
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active tab based on scroll position
      const scrollPosition = window.scrollY + 100

      if (aboutRef.current && scrollPosition < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
        setActiveTab("about")
      } else if (
        galleryRef.current &&
        scrollPosition < galleryRef.current.offsetTop + galleryRef.current.offsetHeight
      ) {
        setActiveTab("gallery")
      } else if (
        roadmapRef.current &&
        scrollPosition < roadmapRef.current.offsetTop + roadmapRef.current.offsetHeight
      ) {
        setActiveTab("roadmap")
      } else if (mintRef.current && scrollPosition < mintRef.current.offsetTop + mintRef.current.offsetHeight) {
        setActiveTab("mint")
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Reveal portal after a delay
    const portalTimer = setTimeout(() => {
      setShowPortal(true)
    }, 1000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(portalTimer)
      clearTimeout(loadTimer)
    }
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>, tabName: string) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setActiveTab(tabName)
    }
  }

  const handleWalletConnect = () => {
    connect()
  }

  const handleMint = () => {
    if (!isConnected) return

    // Simulate minting process
    setShowMintSuccess(true)
    setTimeout(() => {
      setShowMintSuccess(false)
    }, 5000)
  }

  return (
    <ClientProviders>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Pixel Particles Background */}
        {/* <PixelParticles /> */}

        {/* Mystical Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[#050510]"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#1a0b2e]/30 to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#ff5500]/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#00ffff]/5 to-transparent"></div>
        </div>

        {/* Header - Fades in when scrolled */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? "bg-black/80 backdrop-blur-sm py-2" : "bg-transparent py-4"
          }`}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-pixel animate-pixel-glow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gozd2GyWQAAl5jv-ekmAUMmMuTcc9TGhIjdJfQNYbGhkbu.jpeg"
                  alt="Big Moto Logo"
                  fill
                  className="object-contain pixelated"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5500]/20 to-[#00ffff]/20 mix-blend-overlay"></div>
              </div>
              <h1 className="text-xl md:text-2xl font-pixel tracking-wider">
                <span className="text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]">BIG</span>{" "}
                <span className="text-[#00ffff] drop-shadow-[0_0_2px_rgba(0,255,255,0.7)]">MOTO</span>
              </h1>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex gap-8 items-center"
            >
              <button
                onClick={() => scrollToSection(aboutRef, "about")}
                className={`text-white hover:text-[#00ffff] transition-colors relative group ${
                  activeTab === "about" ? "text-[#00ffff]" : ""
                }`}
              >
                <span className="font-heading text-xs tracking-wide">ABOUT</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#00ffff] transition-all duration-300 ${
                    activeTab === "about" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
              <button
                onClick={() => scrollToSection(galleryRef, "gallery")}
                className={`text-white hover:text-[#00ffff] transition-colors relative group ${
                  activeTab === "gallery" ? "text-[#00ffff]" : ""
                }`}
              >
                <span className="font-heading text-xs tracking-wide">GALLERY</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#00ffff] transition-all duration-300 ${
                    activeTab === "gallery" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
              <button
                onClick={() => scrollToSection(roadmapRef, "roadmap")}
                className={`text-white hover:text-[#ff5500] transition-colors relative group ${
                  activeTab === "roadmap" ? "text-[#ff5500]" : ""
                }`}
              >
                <span className="font-heading text-xs tracking-wide">ROADMAP</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff5500] transition-all duration-300 ${
                    activeTab === "roadmap" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
              <button
                onClick={() => scrollToSection(mintRef, "mint")}
                className={`text-white hover:text-[#ff5500] transition-colors relative group ${
                  activeTab === "mint" ? "text-[#ff5500]" : ""
                }`}
              >
                <span className="font-heading text-xs tracking-wide">MINT</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff5500] transition-all duration-300 ${
                    activeTab === "mint" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-4 items-center"
            >
              <Link
                href="https://x.com/bigmotonft"
                target="_blank"
                className="text-white hover:text-[#00ffff] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] transition-all" />
              </Link>
              <div className="hidden md:block">
                <button
                  onClick={handleWalletConnect}
                  className="px-5 py-2 bg-[#ff5500] text-white font-heading text-xs tracking-wide transition-all rounded-pixel hover:bg-[#ff5500]/80 hover:drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]"
                >
                  {isConnected ? "CONNECTED" : "CONNECT"}
                </button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Hero Section - Full screen with animated reveal */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4 pt-20 pb-10 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="w-full md:w-1/2 flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 z-0">
                    <PixelEnergyField color="#ff5500" />
                  </div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Goe93fQWEAAqTUr-NBdrYBBmsaEMVPR7hopGxlM6s5rjg9.jpeg"
                    alt="Shadow Trio"
                    width={600}
                    height={600}
                    className="rounded-pixel pixelated animate-pixel-glow relative z-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-full md:w-1/2 text-center md:text-left"
              >
                <h2 className="text-3xl md:text-4xl font-heading mb-6 tracking-wide leading-relaxed">
                  <span className="text-white">Born from the</span>
                  <br />
                  <span className="text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]">shadows</span>{" "}
                  <span className="text-[#ff5500]">☣️</span>
                </h2>

                <p className="text-xl md:text-2xl mb-8 text-gray-300 font-pixel">The shadow awaits you!</p>

                <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start mb-10">
                  <MysticalCounter label="SUPPLY" value="999" color="#00ffff" />
                  <MysticalCounter label="WL" value="50/999" color="#ff5500" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(mintRef, "mint")}
                    className="px-6 py-3 bg-[#ff5500] text-white font-heading text-xs tracking-wide hover:bg-[#ff5500]/80 transition-all hover:drop-shadow-[0_0_8px_rgba(255,85,0,0.7)] relative group overflow-hidden rounded-pixel"
                  >
                    <span className="relative z-10">MINT NOW</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#ff5500] to-[#ff7700] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="https://bigmotonft.xyz/big-moto-whitepaper"
                      target="_blank"
                      className="px-6 py-3 bg-transparent border-2 border-[#00ffff] text-[#00ffff] font-heading text-xs tracking-wide hover:bg-[#00ffff]/10 transition-all hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] flex items-center justify-center gap-2 rounded-pixel"
                    >
                      <span>RUG-PAPER</span>
                      <ExternalLink size={14} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Scroll indicator - optimized for different screen sizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20"
            >
              <span className="text-[#00ffff] font-heading text-xs mb-1 md:mb-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] bg-black/30 px-2 py-1 rounded-pixel">
                SCROLL
              </span>
              <ChevronDown size={20} className="text-[#00ffff] filter drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="relative py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-heading mb-8 text-center tracking-wide"
              >
                <span className="text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">Enter</span>{" "}
                <span className="text-white">the</span>{" "}
                <span className="text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]">Shadows</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              >
                <div className="bg-black/30 p-6 rounded-pixel border-2 border-[#ff5500]/30 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-[#ff5500]/20">
                    <Sparkles size={32} className="text-[#ff5500]" />
                  </div>
                  <h3 className="text-lg font-heading mb-2 text-[#ff5500]">Unique Art</h3>
                  <p className="text-sm font-pixel text-gray-300">
                    Each shadow character is uniquely generated with distinct traits and abilities.
                  </p>
                </div>

                <div className="bg-black/30 p-6 rounded-pixel border-2 border-[#00ffff]/30 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-[#00ffff]/20">
                    <Zap size={32} className="text-[#00ffff]" />
                  </div>
                  <h3 className="text-lg font-heading mb-2 text-[#00ffff]">Shadow Powers</h3>
                  <p className="text-sm font-pixel text-gray-300">
                    Holders gain access to special abilities and exclusive content in the Shadow Realm.
                  </p>
                </div>

                <div className="bg-black/30 p-6 rounded-pixel border-2 border-[#ff5500]/30 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-[#ff5500]/20">
                    <Shield size={32} className="text-[#ff5500]" />
                  </div>
                  <h3 className="text-lg font-heading mb-2 text-[#ff5500]">Community</h3>
                  <p className="text-sm font-pixel text-gray-300">
                    Join a thriving community of shadow dwellers and shape the future of the project.
                  </p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-gray-300 font-pixel leading-relaxed mb-8 text-center"
              >
                Big Moto NFTs are a collection of 999 unique pixelated shadow dwellers born from the darkest corners of
                the blockchain. Each character possesses unique abilities and traits, offering holders exclusive access to
                the Shadow Realm.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-gray-300 font-pixel leading-relaxed text-center"
              >
                With only 50 whitelist spots available, the competition to secure your place in the shadows is fierce.
                Will you be one of the chosen few to wield the power of the shadows?
              </motion.p>
            </div>
          </div>

          {/* Side fire effects */}
          <div className="absolute bottom-0 left-0 w-40 h-40 opacity-70">
            <PixelFireEffect color="#ff5500" />
          </div>
          <div className="absolute bottom-0 right-0 w-40 h-40 opacity-70">
            <PixelFireEffect color="#ff5500" />
          </div>
        </section>

        {/* Portal Section */}
        <section id="portal" ref={portalRef} className="relative min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-4 relative z-10">
            <ShadowPortal isVisible={showPortal} />
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" ref={galleryRef} className="relative py-20">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-heading mb-12 text-center tracking-wide"
            >
              <span className="text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]">Shadow</span>{" "}
              <span className="text-white">Gallery</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NftGallery />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <ElementalStoryline />
            </motion.div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" ref={roadmapRef} className="relative py-20 bg-black/30">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-heading mb-12 text-center tracking-wide"
            >
              <span className="text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">Shadow</span>{" "}
              <span className="text-white">Roadmap</span>
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff5500] via-[#00ffff] to-[#ff5500] transform -translate-x-1/2"></div>

                {/* Phase 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-center mb-24"
                >
                  <div className="w-1/2 pr-12 text-right">
                    <h3 className="text-xl font-heading mb-2 text-[#ff5500]">Phase 1: Genesis</h3>
                    <p className="text-sm font-pixel text-gray-300">
                      Launch of the Big Moto NFT collection with 999 unique shadow characters. Community building and
                      initial Shadow Realm access.
                    </p>
                  </div>
                  <div className="absolute left-1/2 w-12 h-12 bg-[#ff5500] rounded-full transform -translate-x-1/2 flex items-center justify-center border-4 border-black">
                    <span className="font-heading text-black">1</span>
                  </div>
                  <div className="w-1/2 pl-12"></div>
                </motion.div>

                {/* Phase 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative flex items-center mb-24"
                >
                  <div className="w-1/2 pr-12"></div>
                  <div className="absolute left-1/2 w-12 h-12 bg-[#00ffff] rounded-full transform -translate-x-1/2 flex items-center justify-center border-4 border-black">
                    <span className="font-heading text-black">2</span>
                  </div>
                  <div className="w-1/2 pl-12">
                    <h3 className="text-xl font-heading mb-2 text-[#00ffff]">Phase 2: Expansion</h3>
                    <p className="text-sm font-pixel text-gray-300">
                      Introduction of shadow abilities and traits. Launch of the Shadow Realm interactive experience and
                      community events.
                    </p>
                  </div>
                </motion.div>

                {/* Phase 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative flex items-center mb-24"
                >
                  <div className="w-1/2 pr-12 text-right">
                    <h3 className="text-xl font-heading mb-2 text-[#ff5500]">Phase 3: Evolution</h3>
                    <p className="text-sm font-pixel text-gray-300">
                      Character evolution mechanics, shadow merging, and advanced abilities. Expansion of the Shadow Realm
                      with new locations.
                    </p>
                  </div>
                  <div className="absolute left-1/2 w-12 h-12 bg-[#ff5500] rounded-full transform -translate-x-1/2 flex items-center justify-center border-4 border-black">
                    <span className="font-heading text-black">3</span>
                  </div>
                  <div className="w-1/2 pl-12"></div>
                </motion.div>

                {/* Phase 4 */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative flex items-center"
                >
                  <div className="w-1/2 pr-12"></div>
                  <div className="absolute left-1/2 w-12 h-12 bg-[#00ffff] rounded-full transform -translate-x-1/2 flex items-center justify-center border-4 border-black">
                    <span className="font-heading text-black">4</span>
                  </div>
                  <div className="w-1/2 pl-12">
                    <h3 className="text-xl font-heading mb-2 text-[#00ffff]">Phase 4: Ascension</h3>
                    <p className="text-sm font-pixel text-gray-300">
                      Full Shadow Realm metaverse experience. Cross-chain integration and partnerships. Community
                      governance and future development.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Mint Section - With interactive elements */}
        <section id="mint" ref={mintRef} className="relative py-20">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-heading mb-12 text-center tracking-wide"
            >
              <span className="text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">Join</span>{" "}
              <span className="text-white">the</span>{" "}
              <span className="text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]">Shadows</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <WaitlistClosed />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-black/50 backdrop-blur-sm border-2 border-[#00ffff]/50 p-8 rounded-pixel"
              >
                <h2 className="text-2xl md:text-3xl font-heading mb-8 text-center tracking-wide">
                  <span className="text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]">Summon</span>{" "}
                  <span className="text-white">Your Shadow</span>
                </h2>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-pixel">Price:</span>
                  <span className="text-xl text-[#00ffff] font-pixel">0.05 ETH</span>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-pixel">Amount:</span>
                  <div className="flex items-center gap-4">
                    <button
                      className="w-8 h-8 flex items-center justify-center border-2 border-[#00ffff] text-[#00ffff] font-pixel hover:bg-[#00ffff]/10 transition-all rounded-pixel opacity-50 cursor-not-allowed"
                      disabled
                    >
                      -
                    </button>
                    <span className="text-xl font-pixel">1</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center border-2 border-[#00ffff] text-[#00ffff] font-pixel hover:bg-[#00ffff]/10 transition-all rounded-pixel opacity-50 cursor-not-allowed"
                      disabled
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  disabled
                  className="w-full px-6 py-3 bg-[#ff5500]/50 text-white/70 font-heading text-xs tracking-wide rounded-pixel cursor-not-allowed relative overflow-hidden"
                >
                  <span className="relative z-10">MINT NOW</span>
                  <div className="absolute inset-0 bg-black/20"></div>
                </button>

                <p className="text-center mt-4 text-sm text-gray-400 font-pixel">
                  {isConnected ? "Minting coming soon..." : "Connect your wallet to summon your Shadow"}
                </p>

                {/* Mint Success Animation */}
                <AnimatePresence>
                  {showMintSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="fixed inset-0 flex items-center justify-center z-50"
                    >
                      <div className="bg-black/80 backdrop-blur-md p-8 rounded-pixel border-2 border-[#00ffff] max-w-md w-full">
                        <div className="text-center">
                          <Sparkles size={48} className="text-[#00ffff] mx-auto mb-4" />
                          <h3 className="text-xl font-heading text-[#00ffff] mb-2">Mint Successful!</h3>
                          <p className="text-gray-300 font-pixel mb-4">Your Shadow has been summoned to the realm.</p>
                          <button
                            onClick={() => setShowMintSuccess(false)}
                            className="px-4 py-2 bg-[#00ffff] text-black font-heading text-xs rounded-pixel"
                          >
                            CLOSE
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Background effect */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-radial from-[#ff5500]/10 via-transparent to-transparent"></div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 border-t border-[#00ffff]/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative w-24 h-24 mb-4 rounded-pixel overflow-hidden animate-pixel-glow">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-Pux3HQE2v61HziCCwhXDAt7A26ekaF.png"
                  alt="Shadow Realm Guardian"
                  fill
                  className="object-cover pixelated"
                />
                <div className="absolute inset-0 bg-gradient-radial from-[#00ffff]/20 to-transparent"></div>
              </div>
              <h3 className="text-xl font-heading text-[#00ffff] mb-2">SHADOWS REALM</h3>
              <p className="text-sm font-pixel text-gray-400 max-w-md text-center">
                The Shadows Realm awaits those brave enough to enter. Will you answer the call?
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-6 md:mb-0">
                <div className="relative w-8 h-8 overflow-hidden rounded-pixel">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gozd2GyWQAAl5jv-ekmAUMmMuTcc9TGhIjdJfQNYbGhkbu.jpeg"
                    alt="Big Moto Logo"
                    fill
                    className="object-contain pixelated"
                  />
                </div>
                <span className="text-lg font-pixel tracking-wider">
                  <span className="text-[#ff5500]">BIG</span> <span className="text-[#00ffff]">MOTO</span>
                </span>
              </div>

              <div className="flex gap-8 mb-6 md:mb-0">
                <button
                  onClick={() => scrollToSection(aboutRef, "about")}
                  className="text-white hover:text-[#00ffff] transition-colors font-heading text-xs"
                >
                  ABOUT
                </button>
                <button
                  onClick={() => scrollToSection(galleryRef, "gallery")}
                  className="text-white hover:text-[#00ffff] transition-colors font-heading text-xs"
                >
                  GALLERY
                </button>
                <button
                  onClick={() => scrollToSection(roadmapRef, "roadmap")}
                  className="text-white hover:text-[#ff5500] transition-colors font-heading text-xs"
                >
                  ROADMAP
                </button>
                <button
                  onClick={() => scrollToSection(mintRef, "mint")}
                  className="text-white hover:text-[#ff5500] transition-colors font-heading text-xs"
                >
                  MINT
                </button>
              </div>

              <div className="flex gap-4 items-center">
                <Link
                  href="https://x.com/bigmotonft"
                  target="_blank"
                  className="text-white hover:text-[#00ffff] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="https://bigmotonft.xyz/big-moto-whitepaper"
                  target="_blank"
                  className="flex items-center gap-1 text-white hover:text-[#ff5500] transition-colors text-sm font-heading text-xs"
                >
                  RUG-PAPER <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            <div className="text-center mt-8 text-sm text-gray-500 font-pixel">
              &copy; {new Date().getFullYear()} Big Moto NFT. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </ClientProviders>
  )
}
