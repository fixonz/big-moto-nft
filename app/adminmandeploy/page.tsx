"use client"

import { useState } from "react"

export default function AdminDeployPage() {
  const [status, setStatus] = useState<"idle" | "deploying" | "success" | "error">("idle")
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet")
  const [deployedAddress, setDeployedAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Form fields
  const [tokenName, setTokenName] = useState("Big Moto NFT")
  const [tokenSymbol, setTokenSymbol] = useState("BIGMOTO")
  const [baseURI, setBaseURI] = useState("https://api.bigmotonft.xyz/metadata/")
  const [bigTokenAddress, setBigTokenAddress] = useState("")

  const handleDeploy = async () => {
    if (!bigTokenAddress) {
      alert("Please enter a BIG token address")
      return
    }

    setStatus("deploying")
    setIsLoading(true)

    // Simulate deployment process
    setTimeout(() => {
      setDeployedAddress(`0x${Math.random().toString(16).slice(2, 42)}`)
      setStatus("success")
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl mb-8 text-center">
          <span className="text-[#ff5500]">Admin</span> <span className="text-white">Panel</span>
        </h1>

        <div className="bg-black/50 border border-[#00ffff]/30 p-6 rounded-lg">
          <h2 className="text-xl text-[#00ffff] mb-6">Deploy NFT Contract</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Network</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setNetwork("testnet")}
                  className={`px-4 py-2 rounded ${
                    network === "testnet"
                      ? "bg-[#00ffff] text-black"
                      : "bg-transparent border border-[#00ffff] text-[#00ffff]"
                  }`}
                >
                  Testnet
                </button>
                <button
                  onClick={() => setNetwork("mainnet")}
                  className={`px-4 py-2 rounded ${
                    network === "mainnet"
                      ? "bg-[#ff5500] text-white"
                      : "bg-transparent border border-[#ff5500] text-[#ff5500]"
                  }`}
                >
                  Mainnet
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Token Symbol</label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Base URI</label>
              <input
                type="text"
                value={baseURI}
                onChange={(e) => setBaseURI(e.target.value)}
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">BIG Token Address</label>
              <input
                type="text"
                value={bigTokenAddress}
                onChange={(e) => setBigTokenAddress(e.target.value)}
                placeholder="0x..."
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            {status === "success" && (
              <div className="p-3 bg-green-900/20 border border-green-500 rounded">
                <p>Contract deployed successfully!</p>
                <p className="text-sm text-gray-300 mt-1">
                  Address: <span className="font-mono text-xs">{deployedAddress}</span>
                </p>
              </div>
            )}

            <button
              onClick={handleDeploy}
              disabled={isLoading}
              className="w-full p-3 bg-[#ff5500] text-white rounded hover:bg-[#ff5500]/80 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? "Deploying..." : "Deploy Contract"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
