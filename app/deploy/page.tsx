"use client"

import React from "react"
import { useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import Link from "next/link"
import { deployContract } from "./deployContract"

interface DeploymentConfig {
  name: string
  symbol: string
  baseURI: string
  bigTokenAddress: string
  rpcUrl: string
  privateKey: string
}

export default function DeployPage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet")
  const [deployedAddress, setDeployedAddress] = useState("")
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)

  // Form fields
  const [config, setConfig] = useState<DeploymentConfig>({
    name: "Big Moto NFT",
    symbol: "BIGMOTO",
    baseURI: "ipfs://QmNqPcLMoVMhFyoJ9dtddW643obdgEFEnJ7oWRM9Su8pDQ/",
    bigTokenAddress: "0xDf70075737E9F96B078ab4461EeE3e055E061223",
    rpcUrl: "https://testnet.abstract.network/rpc",
    privateKey: ""
  })

  const handleDeploy = async () => {
    if (!isConnected) {
      setErrorMessage("Please connect your wallet first")
      return
    }

    try {
      setErrorMessage("")
      setSuccess(false)
      setIsDeploying(true)

      // Validate inputs
      if (!config.privateKey) {
        setErrorMessage("Private key is required for deployment")
        return
      }

      // Deploy contract
      const result = await deployContract(config)
      
      if (result.success) {
        setDeployedAddress(result.address || "")
        setSuccess(true)
      } else {
        setErrorMessage(result.error || "Deployment failed")
      }
    } catch (err) {
      console.error(err)
      setErrorMessage(err instanceof Error ? err.message : "Failed to deploy contract")
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl mb-8 text-center">
          <span className="text-[#ff5500]">Contract</span> <span className="text-white">Deployment</span>
        </h1>

        <div className="bg-black/50 border border-[#00ffff]/30 p-6 rounded-lg space-y-6">
          <h2 className="text-xl text-[#00ffff] mb-6">Deploy BigMotoNFT Contract</h2>

          {/* Network Selection */}
          <div>
            <label className="block mb-2 text-sm">Network</label>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setNetwork("testnet")
                  setConfig(prev => ({
                    ...prev,
                    rpcUrl: "https://testnet.abstract.network/rpc"
                  }))
                }}
                className={`px-4 py-2 rounded ${
                  network === "testnet"
                    ? "bg-[#00ffff] text-black"
                    : "bg-transparent border border-[#00ffff] text-[#00ffff]"
                }`}
              >
                Abstract Testnet
              </button>
              <button
                onClick={() => {
                  setNetwork("mainnet")
                  setConfig(prev => ({
                    ...prev,
                    rpcUrl: "https://mainnet.abstract.network/rpc"
                  }))
                }}
                className={`px-4 py-2 rounded ${
                  network === "mainnet"
                    ? "bg-[#ff5500] text-white"
                    : "bg-transparent border border-[#ff5500] text-[#ff5500]"
                }`}
              >
                Abstract Mainnet
              </button>
            </div>
          </div>

          {/* Contract Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Token Name</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Token Symbol</label>
              <input
                type="text"
                value={config.symbol}
                onChange={(e) => setConfig({ ...config, symbol: e.target.value })}
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Base URI (IPFS)</label>
              <input
                type="text"
                value={config.baseURI}
                onChange={(e) => setConfig({ ...config, baseURI: e.target.value })}
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">BIG Token Address</label>
              <input
                type="text"
                value={config.bigTokenAddress}
                onChange={(e) => setConfig({ ...config, bigTokenAddress: e.target.value })}
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">RPC URL</label>
              <input
                type="text"
                value={config.rpcUrl}
                onChange={(e) => setConfig({ ...config, rpcUrl: e.target.value })}
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Private Key</label>
              <input
                type="password"
                value={config.privateKey}
                onChange={(e) => setConfig({ ...config, privateKey: e.target.value })}
                placeholder="Enter your private key (never share this!)"
                className="w-full p-2 bg-black/30 border border-gray-700 rounded"
              />
              <p className="mt-1 text-xs text-gray-400">This is only used for deployment and never stored</p>
            </div>
          </div>

          {success && (
            <div className="p-3 bg-green-900/20 border border-green-500 rounded">
              <p>Contract deployed successfully!</p>
              <p className="text-sm text-gray-300 mt-1">
                Address: <span className="font-mono text-xs break-all">{deployedAddress}</span>
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-900/20 border border-red-500 rounded">
              <p className="text-red-400">{errorMessage}</p>
            </div>
          )}

          <button
            onClick={handleDeploy}
            disabled={!isConnected || isDeploying}
            className="w-full p-3 bg-[#ff5500] text-white rounded hover:bg-[#ff5500]/80 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isDeploying ? "Deploying..." : "Deploy Contract"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Make sure you have enough native tokens for deployment gas fees
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[#00ffff] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 