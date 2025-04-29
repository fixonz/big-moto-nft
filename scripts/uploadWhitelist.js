const fs = require('fs');
const path = require('path');
const { ethers } = require("hardhat");

async function main() {
  try {
    // Read whitelist addresses from file
    const whitelistPath = path.join(__dirname, 'C:/Users/fixxZ/Downloads/BigMotoNFT/big/metadata/whitelist.txt');
    const addresses = fs.readFileSync(whitelistPath, 'utf8')
      .split('\n')
      .map(addr => addr.trim())
      .filter(addr => addr.length > 0 && ethers.utils.isAddress(addr));

    console.log(`Found ${addresses.length} valid addresses in whitelist.txt`);

    // Get contract instance
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace after deployment
    const BigMotoNFT = await ethers.getContractFactory("BigMotoNFT");
    const contract = await BigMotoNFT.attach(contractAddress);

    // Split addresses into batches of 50 to avoid gas limits
    const batchSize = 50;
    for (let i = 0; i < addresses.length; i += batchSize) {
      const batch = addresses.slice(i, i + batchSize);
      console.log(`Adding batch ${Math.floor(i/batchSize) + 1} (${batch.length} addresses)`);
      
      // Add batch to whitelist
      const tx = await contract.addToWhitelist(batch);
      await tx.wait();
      console.log(`Batch ${Math.floor(i/batchSize) + 1} added successfully`);
    }

    console.log("All addresses added to whitelist successfully!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 