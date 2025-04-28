// scripts/whitelist.js
const { MerkleTree } = require("merkletreejs")
const keccak256 = require("keccak256")
const { ethers } = require("hardhat")

// This is a helper script to generate a Merkle root from a list of addresses
// and verify that an address is in the whitelist

async function generateMerkleRoot() {
  // Replace with your whitelist addresses
  const whitelistAddresses = [
    "0x1234567890123456789012345678901234567890",
    "0x2345678901234567890123456789012345678901",
    "0x3456789012345678901234567890123456789012",
    // Add more addresses up to 50
  ]

  // Create leaf nodes
  const leafNodes = whitelistAddresses.map((addr) =>
    keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [addr])),
  )

  // Create Merkle Tree
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

  // Get root
  const rootHash = merkleTree.getRoot().toString("hex")
  console.log("Merkle Root:", "0x" + rootHash)

  // Example: Get proof for the first address
  const address = whitelistAddresses[0]
  const proof = merkleTree.getHexProof(keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [address])))
  console.log("Merkle Proof for", address, ":", proof)

  return {
    root: "0x" + rootHash,
    tree: merkleTree,
    addresses: whitelistAddresses,
  }
}

async function main() {
  const { root, tree, addresses } = await generateMerkleRoot()

  // You can now use this root in your contract
  console.log("Use this Merkle root in your contract:", root)

  // Verify an address is in the whitelist
  const addressToVerify = addresses[0]
  const proof = tree.getHexProof(keccak256(ethers.utils.defaultAbiCoder.encode(["address"], [addressToVerify])))

  // This is how you would verify on-chain
  console.log(`To verify ${addressToVerify} on-chain, use this proof:`, proof)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
