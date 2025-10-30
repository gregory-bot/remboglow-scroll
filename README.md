Face-Fit Web3 Integration — Scroll Edition 🌀

A comprehensive Web3 integration for the Face-Fit fashion recommender app, featuring Scroll wallet connection, on-chain payments, upload credit management, and NFT minting on the Scroll network.

🚀 Features

Wallet Connection: Scroll Wallet, MetaMask, Coinbase Wallet, WalletConnect

Upload Credits: 2 free uploads, then pay on Scroll for more credits

Smart Contract: Tracks user credits and handles on-chain payments

Scroll Network: Fully integrated with Scroll (EVM-compatible)

NFT Minting: Optional skincare routine NFTs with private metadata

Responsive Design: Mobile-first, production-ready UI

🛠 Tech Stack

Frontend: React + TypeScript + Tailwind CSS

Web3: Wagmi + RainbowKit + Viem

Blockchain: Scroll testnet (EVM compatible)

Smart Contracts: Solidity + Hardhat

Payment Gateway: Scroll native payments

📋 Prerequisites

Node.js (v18 or higher)

Scroll Wallet or any EVM-compatible wallet (MetaMask, Coinbase, etc.)

Scroll Sepolia ETH for gas fees and payments

🔧 Installation & Setup
1. Install Dependencies
npm install

2. Environment Configuration

Copy the example environment file:

cp .env.example .env


Fill in your environment variables:

# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# For deployment (keep private!)
PRIVATE_KEY=your_private_key
SCROLLSCAN_API_KEY=your_api_key

3. Get Scroll Testnet Assets

Scroll Sepolia ETH (for gas & payments):

Visit Scroll Faucet

Connect your wallet and claim testnet ETH

4. Deploy Smart Contracts

Compile contracts:

npm run compile


Deploy to Scroll testnet:

npm run deploy


After deployment, update your .env file with the contract addresses from the console output.

5. Start Development Server
npm run dev

📄 Smart Contracts
FaceFitCredits.sol

Handles upload credits and payments:

Free Credits: 2 per user (claimable once)

Credit Price: 0.002 Scroll ETH per upload

Payment Method: Native Scroll payment

Events: Credit purchases, usage, and claims

FaceFitNFT.sol

Optional NFT contract for skincare routines:

Private Metadata for owner-only access

Public Metadata for general display

Free Minting (gas-only)

🎯 Usage Guide
For Users

Connect Wallet

Click “Connect Wallet”

Choose Scroll Wallet / MetaMask / Coinbase Wallet

Switch to Scroll testnet when prompted

Claim Free Credits

New users get 2 free credits

Click “Claim 2 Free Upload Credits”

Confirm the on-chain transaction

Upload Photos

Each upload consumes 1 credit

Get AI-powered style or skincare recommendations

Buy More Credits

Go to “Buy Credits”

Choose package (1, 5, or 10 uploads)

Confirm payment in your wallet (Scroll ETH)

Mint NFTs (Optional)

Enter skincare routine details

Click “Mint NFT”

Data stored securely on-chain

🧠 Developer Notes

Key React Components:

ConnectWalletButton: Wallet connection via RainbowKit

UploadCreditDisplay: Shows user’s available credits

PurchaseCreditsButton: Scroll payment flow

ClaimFreeCreditsButton: Free credit claim

NFTMinter: Skincare routine NFT creation

Contract Interaction Example:

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

🔐 Security

Reentrancy Protection via OpenZeppelin

Ownable Admin Control

Private NFT Data for privacy

Native Scroll ETH Payments

Event Logging for all transactions

🌐 Network Configuration

Scroll Sepolia Testnet:

Chain ID: 534351

RPC URL: https://sepolia-rpc.scroll.io

Block Explorer: https://sepolia.scrollscan.dev

🚨 Important Notes

Scroll Testnet Only — not mainnet

Private Keys must never be committed

WalletConnect & API keys stay private

Users pay Scroll ETH gas fees

Ensure wallet is on Scroll network

📚 Resources

Scroll Docs

Wagmi Docs

RainbowKit Docs

Hardhat Docs

OpenZeppelin Docs

🤝 Support

For help:

Check the console for errors

Ensure wallet is connected to Scroll testnet

Verify sufficient Scroll ETH balance

Confirm smart contract addresses

Built with ❤️ on Scroll for the next generation of AI + Web3 fashion.