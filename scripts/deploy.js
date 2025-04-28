// scripts/deploy.js
const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)

  // For testing, we'll deploy a mock BIG token first
  const MockBIG = await ethers.getContractFactory("MockBIG")
  const mockBIG = await MockBIG.deploy()
  await mockBIG.deployed()
  console.log("MockBIG deployed to:", mockBIG.address)

  // Deploy the NFT contract
  const BigMotoNFT = await ethers.getContractFactory("BigMotoNFT")
  const nft = await BigMotoNFT.deploy(
    "Big Moto NFT",
    "BIGMOTO",
    "https://api.bigmotonft.xyz/metadata/",
    mockBIG.address,
  )
  await nft.deployed()
  console.log("BigMotoNFT deployed to:", nft.address)

  // Add some addresses to whitelist for testing
  const testAddresses = [
    "0x1234567890123456789012345678901234567890",
    "0x2345678901234567890123456789012345678901",
    "0x3456789012345678901234567890123456789012",
  ]
  await nft.addToWhitelist(testAddresses)
  console.log("Added test addresses to whitelist")

  // Set sale state to whitelist
  await nft.setSaleState(1) // 1 = Whitelist
  console.log("Set sale state to Whitelist")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
