import { ContractFactory, Wallet } from 'ethers';
import { ethers } from 'ethers'; // <-- Add this line
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
    const provider = new ethers.JsonRpcProvider(config.rpcUrl);
    const wallet = new Wallet(config.privateKey, provider);

    // Create contract factory
    const factory = new ContractFactory(
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
    await contract.waitForDeployment();

    return {
      success: true,
      address: contract.target,
      transactionHash: contract.deploymentTransaction().hash
    };
  } catch (error) {
    console.error('Deployment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}