# Face-Fit Web3 Integration

A comprehensive Web3 integration for the Face-Fit fashion recommender app, featuring wallet connection, USDC payments on Base testnet, upload credit management, and NFT minting capabilities.

## 🚀 Features

- **Wallet Connection**: MetaMask, Coinbase Wallet, WalletConnect support
- **Upload Credits**: 2 free uploads, then pay $5 USDC per upload
- **Smart Contract**: Tracks user credits and handles USDC payments
- **Base Testnet**: Built for Base blockchain testnet
- **NFT Minting**: Optional skincare routine NFTs with private metadata
- **Responsive Design**: Mobile-first, production-ready UI

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Web3**: Wagmi + RainbowKit + Viem
- **Blockchain**: Base testnet (EVM compatible)
- **Smart Contracts**: Solidity + Hardhat
- **Payment Token**: USDC (ERC-20)

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **MetaMask** or compatible Web3 wallet
3. **Base testnet ETH** for gas fees
4. **Base testnet USDC** for payments

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Get from https://cloud.walletconnect.com
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# For deployment (keep private!)
PRIVATE_KEY=your_private_key
BASESCAN_API_KEY=your_api_key
```

### 3. Get Base Testnet Assets

**Base Testnet ETH:**
- Visit [Base Sepolia Faucet](https://www.alchemy.com/faucets/base-sepolia)
- Connect your wallet and claim testnet ETH

**Base Testnet USDC:**
- Visit [Circle Testnet Faucet](https://faucet.circle.com/)
- Select Base Sepolia and mint USDC to your wallet

### 4. Deploy Smart Contracts

Compile contracts:
```bash
npm run compile
```

Deploy to Base testnet:
```bash
npm run deploy
```

After deployment, update your `.env` file with the contract addresses shown in the console output.

### 5. Start Development Server

```bash
npm run dev
```

## 📄 Smart Contracts

### FaceFitCredits.sol
Main contract handling upload credits and USDC payments:
- **Free Credits**: 2 per user (claimable once)
- **Credit Price**: $5.00 USDC per upload
- **Payment Method**: USDC (ERC-20) on Base testnet
- **Events**: Credit purchases, usage, and claims

### FaceFitNFT.sol
Optional NFT contract for skincare routine storage:
- **Private Metadata**: Only owner can access detailed routine
- **Public Metadata**: Basic NFT information
- **Free Minting**: Only gas fees required

## 🎯 Usage Guide

### For Users

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Select your preferred wallet (MetaMask, Coinbase, etc.)
   - Switch to Base testnet if prompted

2. **Claim Free Credits**
   - New users get 2 free upload credits
   - Click "Claim 2 Free Upload Credits!" button
   - Confirm transaction in wallet

3. **Upload Photos**
   - Each upload consumes 1 credit
   - Drag & drop or browse for photos
   - Get AI-powered fashion recommendations

4. **Buy Additional Credits**
   - Navigate to "Buy Credits" tab
   - Choose credit package (1, 5, or 10 uploads)
   - Approve USDC spending (if first time)
   - Confirm purchase transaction

5. **Mint NFTs** (Optional)
   - Fill in skincare routine details
   - Click "Mint Skincare NFT"
   - NFT stores your data privately on-chain

### For Developers

**Key Components:**
- `ConnectWalletButton`: RainbowKit wallet connection
- `UploadCreditDisplay`: Shows user's available credits
- `PurchaseCreditsButton`: USDC payment flow
- `ClaimFreeCreditsButton`: Free credit claiming
- `NFTMinter`: Skincare routine NFT creation

**Contract Interaction:**
```typescript
import { useReadContract, useWriteContract } from 'wagmi';
import { CONTRACTS, FACEFIT_CREDITS_ABI } from '../config/web3';

// Read user credits
const { data: credits } = useReadContract({
  address: CONTRACTS.FACEFIT_CREDITS,
  abi: FACEFIT_CREDITS_ABI,
  functionName: 'getTotalCredits',
  args: [userAddress],
});

// Purchase credits
const { writeContract } = useWriteContract();
await writeContract({
  address: CONTRACTS.FACEFIT_CREDITS,
  abi: FACEFIT_CREDITS_ABI,
  functionName: 'purchaseCredits',
  args: [BigInt(creditAmount)],
});
```

## 🔐 Security Features

- **Reentrancy Protection**: OpenZeppelin ReentrancyGuard
- **Access Control**: Ownable pattern for admin functions
- **Private NFT Data**: Only token owner can access metadata
- **USDC Integration**: Battle-tested ERC-20 standard
- **Event Logging**: All transactions emit events for tracking

## 🌐 Network Configuration

**Base Sepolia Testnet:**
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **Block Explorer**: https://sepolia.basescan.org
- **USDC Address**: 0x036CbD53842c5426634e7929541eC2318f3dCF7e

## 🚨 Important Notes

1. **Testnet Only**: This implementation uses Base testnet - NOT mainnet
2. **Private Keys**: Never commit private keys to version control
3. **API Keys**: Keep WalletConnect and API keys secure
4. **Gas Fees**: Users pay gas fees for all transactions
5. **USDC Required**: Users need testnet USDC to purchase credits

## 📚 Additional Resources

- [Base Documentation](https://docs.base.org/)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [Hardhat Documentation](https://hardhat.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

## 🤝 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify wallet is connected to Base testnet
3. Ensure sufficient ETH for gas fees
4. Confirm USDC balance for credit purchases

Built with ❤️ for the Face-Fit Web3 ecosystem.