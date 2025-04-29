const { ethers } = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    console.log("Starting whitelist setup with Merkle Tree...\n");

    // Get contract instance
    const contractAddress = "0xBd024Fd1644a729A3030D57404BdA499Cbcff376"; // Replace after deployment
    const BigMotoNFT = await ethers.getContractFactory("BigMotoNFT");
    const contract = await BigMotoNFT.attach(contractAddress);

    // Read whitelist addresses from file
    const whitelistPath = path.join(__dirname, '../metadata/whitelist.txt');
    const addresses = fs.readFileSync(whitelistPath, 'utf8')
      .split('\n')
      .map(addr => addr.trim())
      .filter(addr => addr.length > 0 && ethers.utils.isAddress(addr));

    console.log(`Found ${addresses.length} valid addresses in whitelist.txt`);
    
    if (addresses.length === 0) {
      console.error("No valid addresses found in whitelist.txt");
      process.exit(1);
    }

    if (addresses.length > 50) {
      console.log("\nWarning: You have more than 50 addresses. Make sure this matches your WHITELIST_SUPPLY in the contract.");
    }

    // Generate Merkle Tree
    console.log("\nGenerating Merkle Tree...");
    const leafNodes = addresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = merkleTree.getRoot().toString('hex');

    console.log(`\nMerkle Root: 0x${rootHash}`);

    // Save Merkle tree data and proofs for each address
    const addressProofs = {};
    addresses.forEach(addr => {
      const proof = merkleTree.getHexProof(keccak256(addr));
      addressProofs[addr] = proof;
    });

    const treeData = {
      root: `0x${rootHash}`,
      addresses: addresses,
      proofs: addressProofs
    };

    // Save to file
    const merkleDataPath = path.join(__dirname, '../metadata/merkleTree.json');
    fs.writeFileSync(merkleDataPath, JSON.stringify(treeData, null, 2));
    console.log(`\nMerkle tree data saved to: ${merkleDataPath}`);

    // Set Merkle root in contract
    console.log("\nSetting Merkle root in contract...");
    const setRootTx = await contract.setMerkleRoot(`0x${rootHash}`);
    await setRootTx.wait();
    console.log("✅ Merkle root set successfully in contract!");

    // Verify first address as example
    const firstAddr = addresses[0];
    const firstProof = addressProofs[firstAddr];
    console.log("\nVerifying first address as example:");
    console.log(`Address: ${firstAddr}`);
    console.log(`Proof: ${JSON.stringify(firstProof)}`);

    const isWhitelisted = await contract.isWhitelisted(firstAddr, firstProof);
    console.log(`Verification result: ${isWhitelisted ? "✅ Success" : "❌ Failed"}`);

    console.log("\n📝 Instructions for whitelisted users:");
    console.log("1. Each user will need their specific proof to mint");
    console.log("2. The proofs are saved in merkleTree.json");
    console.log("3. When user wants to mint, they'll need to provide:");
    console.log(`   - Their address: 0x...`);
    console.log(`   - Their proof: [0x..., 0x..., ...]`);

  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 