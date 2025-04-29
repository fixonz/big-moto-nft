"use client"

import React from "react"
import { useState } from "react"
import { deployContract } from "../app/adminmandeploy/actions"

export default function AdminPanel() {
  const [status, setStatus] = useState<"idle" | "deploying" | "success" | "error">("idle")
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet")
  const [deployedAddress, setDeployedAddress] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Form fields
  const [tokenName, setTokenName] = useState("Big Moto NFT")
  const [tokenSymbol, setTokenSymbol] = useState("BIGMOTO")
  const [baseURI, setBaseURI] = useState("https://api.bigmotonft.xyz/metadata/")
  const [bigTokenAddress, setBigTokenAddress] = useState("")

  const handleDeploy = async () => {
    if (!bigTokenAddress || !baseURI) {
      setStatus("error")
      setErrorMessage("Please fill in all required fields")
      return
    }

    setStatus("deploying")
    setIsLoading(true)
    setErrorMessage("")

    try {
      const result = await deployContract(network, tokenName, tokenSymbol, baseURI, bigTokenAddress)

      if (result.success) {
        setDeployedAddress(result.contractAddress)
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMessage(result.error || "Deployment failed")
      }
    } catch (error) {
      console.error("Deployment error:", error)
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-black/50 border border-[#00ffff]/30 rounded-lg">
      <h2 className="text-xl text-[#00ffff] mb-6 font-bold">Admin Deployment Panel</h2>

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
          <label className="block mb-2 text-sm">Token Name</label>
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="w-full p-2 bg-black/30 border border-gray-700 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Token Symbol</label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="w-full p-2 bg-black/30 border border-gray-700 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Base URI</label>
          <input
            type="text"
            value={baseURI}
            onChange={(e) => setBaseURI(e.target.value)}
            className="w-full p-2 bg-black/30 border border-gray-700 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">BIG Token Address</label>
          <input
            type="text"
            value={bigTokenAddress}
            onChange={(e) => setBigTokenAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 bg-black/30 border border-gray-700 rounded"
          />
        </div>

        {status === "error" && (
          <div className="p-3 bg-red-900/20 border border-red-500 rounded">
            <p className="text-red-500 font-bold">Error</p>
            <p className="text-sm text-gray-300">{errorMessage}</p>
          </div>
        )}

        {status === "success" && (
          <div className="p-3 bg-green-900/20 border border-green-500 rounded">
            <p className="text-green-500 font-bold">Success!</p>
            <p className="text-sm text-gray-300">
              Contract deployed at: <span className="font-mono text-xs break-all">{deployedAddress}</span>
            </p>
          </div>
        )}

        <button
          onClick={handleDeploy}
          disabled={isLoading}
          className={`w-full p-3 rounded text-white ${
            isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-[#ff5500] hover:bg-[#ff5500]/80"
          }`}
        >
          {isLoading ? "Deploying..." : "Deploy Contract"}
        </button>
      </div>
    </div>
  )
}
