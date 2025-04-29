const { ethers } = require("hardhat");

async function main() {
  try {
    // Get contract instance
    const contractAddress = "0xBd024Fd1644a729A3030D57404BdA499Cbcff376"; // Replace with your contract address
    const BigMotoNFT = await ethers.getContractFactory("BigMotoNFT");
    const contract = await BigMotoNFT.attach(contractAddress);

    console.log("\nCurrent sale state:", await getSaleState(contract));

    // Set to whitelist sale
    console.log("\nSetting sale state to Whitelist...");
    const tx = await contract.setSaleState(1); // 0 = Paused, 1 = Whitelist, 2 = Public
    await tx.wait();
    
    console.log("✅ Sale state updated!");
    console.log("New sale state:", await getSaleState(contract));
    
    // Print prices
    const whitelistPriceETH = await contract.whitelistPriceETH();
    const whitelistPriceBIG = await contract.whitelistPriceBIG();
    console.log("\nCurrent prices:");
    console.log(`Whitelist ETH price: ${ethers.utils.formatEther(whitelistPriceETH)} ETH`);
    console.log(`Whitelist BIG price: ${ethers.utils.formatEther(whitelistPriceBIG)} BIG`);

  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  }
}

async function getSaleState(contract) {
  const state = await contract.saleState();
  switch (state) {
    case 0:
      return "PAUSED";
    case 1:
      return "WHITELIST";
    case 2:
      return "PUBLIC";
    default:
      return "UNKNOWN";
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 