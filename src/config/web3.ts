import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

// Contract addresses (update after deployment)
export const CONTRACTS = {
  FACEFIT_CREDITS: import.meta.env.VITE_FACEFIT_CREDITS_CONTRACT || '',
  FACEFIT_NFT: import.meta.env.VITE_FACEFIT_NFT_CONTRACT || '',
  USDC: import.meta.env.VITE_USDC_CONTRACT || '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // Base testnet USDC
};

// Wagmi configuration
export const wagmiConfig = getDefaultConfig({
  appName: 'Face-Fit',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [baseSepolia, base],
  ssr: false,
});

// Contract ABIs
export const FACEFIT_CREDITS_ABI = [
  'function userCredits(address) view returns (uint256)',
  'function hasClaimedFree(address) view returns (bool)',
  'function getTotalCredits(address) view returns (uint256)',
  'function claimFreeCredits() external',
  'function purchaseCredits(uint256) external',
  'function creditPrice() view returns (uint256)',
  'event CreditsPurchased(address indexed user, uint256 amount, uint256 totalCredits)',
  'event FreeCreditsClaimd(address indexed user, uint256 amount)',
];

export const USDC_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address, uint256) returns (bool)',
  'function approve(address, uint256) returns (bool)',
  'function allowance(address, address) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export const FACEFIT_NFT_ABI = [
  'function mintSkincareNFT(address, string, string) external returns (uint256)',
  'function getTokensByOwner(address) view returns (uint256[])',
  'function tokenURI(uint256) view returns (string)',
  'function getPrivateMetadata(uint256) view returns (string)',
  'event SkincareNFTMinted(address indexed to, uint256 tokenId, string metadataHash)',
];