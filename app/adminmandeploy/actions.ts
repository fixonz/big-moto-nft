"use server"

import { ethers } from "ethers"

// Simplified ABI with just the functions we need
const BigMotoNFTABI = [
  "constructor(string memory _name, string memory _symbol, string memory _initBaseURI, address _bigTokenAddress)",
  "function mintWithETH(uint256 _mintAmount) public payable",
  "function setSaleState(uint8 _state) public",
  "function addToWhitelist(address[] calldata _users) public",
  "function setBaseURI(string memory _newBaseURI) public",
  "function withdrawETH() public",
]

// Simplified bytecode (this would be the actual compiled bytecode in production)
const bytecode =
  "0x608060405234801561001057600080fd5b50610b0a806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063..."

export async function deployContract(
  network: string,
  tokenName: string,
  tokenSymbol: string,
  baseURI: string,
  bigTokenAddress: string,
) {
  try {
    // Get the appropriate RPC URL based on selected network
    const rpcUrl = network === "mainnet" ? process.env.ABSTRACT_RPC_URL : process.env.ABSTRACT_TESTNET_RPC_URL

    if (!rpcUrl) {
      return { success: false, error: "RPC URL not configured" }
    }

    if (!process.env.PRIVATE_KEY) {
      return { success: false, error: "Private key not configured" }
    }

    // Create a provider and wallet
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    // Create contract factory
    const factory = new ethers.ContractFactory(BigMotoNFTABI, bytecode, wallet)

    // Deploy the contract
    console.log("Deploying contract...")
    const contract = await factory.deploy(tokenName, tokenSymbol, baseURI, bigTokenAddress)

    // Wait for deployment to complete
    await contract.waitForDeployment()
    const contractAddress = await contract.getAddress()
    console.log("Contract deployed to:", contractAddress)

    return {
      success: true,
      contractAddress,
      network,
    }
  } catch (error) {
    console.error("Deployment error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
