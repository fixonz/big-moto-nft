// Script to compile the contract and get bytecode
const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

async function main() {
  await hre.run('compile');
  
  console.log('Contract compiled successfully!');
  
  // Get build information
  const artifactPath = path.join(
    __dirname,
    '../artifacts/contracts/BigMotoNFT.sol/BigMotoNFT.json'
  );
  
  const artifactRaw = fs.readFileSync(artifactPath, 'utf8');
  const artifact = JSON.parse(artifactRaw);
  
  // Extract bytecode and ABI
  const bytecode = artifact.bytecode;
  const abi = artifact.abi;
  
  // Create a deployInfo file with the bytecode and ABI
  const deployInfoPath = path.join(__dirname, '../app/deploy/deployInfo.js');
  
  const deployInfoContent = `// Auto-generated file with contract deployment information
export const BigMotoNFTABI = ${JSON.stringify(abi, null, 2)};
export const BigMotoNFTBytecode = "${bytecode}";
`;
  
  fs.writeFileSync(deployInfoPath, deployInfoContent);
  
  console.log('Deployment info written to:', deployInfoPath);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 