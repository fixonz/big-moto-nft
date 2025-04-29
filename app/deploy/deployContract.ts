import { ethers } from 'ethers';
import { BigMotoNFTArtifact } from './contractArtifact';

interface DeploymentConfig {
  name: string;
  symbol: string;
  baseURI: string;
  bigTokenAddress: string;
  rpcUrl: string;
  privateKey: string;
}

export async function deployContract(config: DeploymentConfig) {
  try {
    // Create provider and wallet
    const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
    const wallet = new ethers.Wallet(config.privateKey, provider);

    // Create contract factory
    const factory = new ethers.ContractFactory(
      BigMotoNFTArtifact.abi,
      BigMotoNFTArtifact.bytecode,
      wallet
    );

    // Deploy contract
    const contract = await factory.deploy(
      config.name,
      config.symbol,
      config.baseURI,
      config.bigTokenAddress
    );

    // Wait for deployment to complete
    await contract.deployed();

    return {
      success: true,
      address: contract.address,
      transactionHash: contract.deployTransaction.hash
    };
  } catch (error) {
    console.error('Deployment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 