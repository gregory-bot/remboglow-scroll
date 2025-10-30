const { ethers } = require('hardhat');

async function main() {
  console.log('🚀 Deploying Face-Fit Web3 contracts to Base testnet...\n');

  // Base testnet USDC address
  const USDC_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
  
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with account:', deployer.address);
  console.log('Account balance:', ethers.utils.formatEther(await deployer.getBalance()), 'ETH\n');

  // Deploy FaceFitCredits contract
  console.log('📄 Deploying FaceFitCredits contract...');
  const FaceFitCredits = await ethers.getContractFactory('FaceFitCredits');
  const faceFitCredits = await FaceFitCredits.deploy(USDC_ADDRESS);
  await faceFitCredits.deployed();
  console.log('✅ FaceFitCredits deployed to:', faceFitCredits.address);

  // Deploy FaceFitNFT contract (optional)
  console.log('\n🎨 Deploying FaceFitNFT contract...');
  const FaceFitNFT = await ethers.getContractFactory('FaceFitNFT');
  const faceFitNFT = await FaceFitNFT.deploy();
  await faceFitNFT.deployed();
  console.log('✅ FaceFitNFT deployed to:', faceFitNFT.address);

  // Verify contracts (optional, requires API key)
  console.log('\n📝 Contract deployment summary:');
  console.log('================================');
  console.log('FaceFitCredits:', faceFitCredits.address);
  console.log('FaceFitNFT:', faceFitNFT.address);
  console.log('USDC Token:', USDC_ADDRESS);
  console.log('Network: Base testnet');
  
  // Save deployment info
  const deploymentInfo = {
    network: 'base-testnet',
    faceFitCredits: faceFitCredits.address,
    faceFitNFT: faceFitNFT.address,
    usdcToken: USDC_ADDRESS,
    deployer: deployer.address,
    deployedAt: new Date().toISOString()
  };

  console.log('\n💾 Save this deployment info to your .env file:');
  console.log(`VITE_FACEFIT_CREDITS_CONTRACT=${faceFitCredits.address}`);
  console.log(`VITE_FACEFIT_NFT_CONTRACT=${faceFitNFT.address}`);
  console.log(`VITE_USDC_CONTRACT=${USDC_ADDRESS}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });