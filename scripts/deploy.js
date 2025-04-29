// scripts/deploy.js
const { ethers } = require("hardhat")

async function main() {
  try {
    console.log("Starting deployment...")

    const BigMotoNFT = await ethers.getContractFactory("BigMotoNFT")
    
    // Constructor arguments
    const name = "Big Moto NFT"
    const symbol = "BIGMOTO"
    const baseURI = "ipfs://QmNqPcLMoVMhFyoJ9dtddW643obdgEFEnJ7oWRM9Su8pDQ/"
    const bigTokenAddress = "0xDf70075737E9F96B078ab4461EeE3e055E061223"

    console.log("Deploying contract with parameters:")
    console.log("Name:", name)
    console.log("Symbol:", symbol)
    console.log("Base URI:", baseURI)
    console.log("BIG Token Address:", bigTokenAddress)

    const contract = await BigMotoNFT.deploy(
      name,
      symbol,
      baseURI,
      bigTokenAddress
    )

    await contract.deployed()

    console.log("Contract deployed successfully!")
    console.log("Contract address:", contract.address)

    // Set initial state
    console.log("Setting initial contract state...")
    
    // Keep sale paused initially
    console.log("Sale state is initially paused")

    // Save deployment info
    const fs = require('fs')
    const deployInfo = {
      network: network.name,
      contractAddress: contract.address,
      name,
      symbol,
      baseURI,
      bigTokenAddress,
      deploymentTime: new Date().toISOString()
    }

    // Write deployment info to file
    fs.writeFileSync(
      'deployment-info.json',
      JSON.stringify(deployInfo, null, 2)
    )

    console.log("Deployment info saved to deployment-info.json")
    console.log("Deployment completed successfully!")

  } catch (error) {
    console.error("Error during deployment:", error)
    process.exit(1)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
