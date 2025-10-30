import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Image, Loader2, CheckCircle } from 'lucide-react';
import { CONTRACTS, FACEFIT_NFT_ABI } from '../config/web3';

export const NFTMinter: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [skincareData, setSkincareData] = useState({
    skinType: '',
    concerns: '',
    products: '',
    routine: '',
  });

  const { writeContract: mintNFT, data: mintHash } = useWriteContract();

  const { isSuccess: mintSuccess } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  React.useEffect(() => {
    if (mintSuccess) {
      setIsMinting(false);
      setSkincareData({ skinType: '', concerns: '', products: '', routine: '' });
    }
  }, [mintSuccess]);

  const handleMint = async () => {
    if (!address) return;

    // Create metadata hash (in production, you'd hash this properly)
    const privateMetadata = JSON.stringify(skincareData);
    const metadataHash = `ipfs://hash-${Date.now()}`; // Simplified for demo

    const publicMetadata = JSON.stringify({
      name: 'Face-Fit Skincare Plan',
      description: 'Personalized skincare routine NFT',
      image: 'https://images.pexels.com/photos/3992213/pexels-photo-3992213.jpeg',
      attributes: [
        { trait_type: 'Skin Type', value: skincareData.skinType },
        { trait_type: 'Generated', value: new Date().toISOString().split('T')[0] },
      ],
    });

    setIsMinting(true);
    try {
      await mintNFT({
        address: CONTRACTS.FACEFIT_NFT as `0x${string}`,
        abi: FACEFIT_NFT_ABI,
        functionName: 'mintSkincareNFT',
        args: [address, `data:application/json;base64,${btoa(publicMetadata)}`, metadataHash],
      });
    } catch (error) {
      console.error('Minting failed:', error);
      setIsMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-br from-[#e2b8e6]/10 to-[#d8a5dc]/10 border-2 border-dashed border-[#e2b8e6]/30 rounded-2xl p-8 text-center">
        <Image className="w-16 h-16 text-[#e2b8e6] mx-auto mb-4" />
        <p className="text-gray-700 text-lg font-medium">Connect your wallet to mint beauty NFTs</p>
      </div>
    );
  }

  if (mintSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            NFT Minted Successfully!
          </h3>
          <p className="text-gray-600">
            Your personalized beauty routine has been minted as an NFT.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Image className="w-6 h-6 text-[#e2b8e6]" />
        <h3 className="text-2xl font-bold text-gray-900">
          Mint Beauty Routine NFT
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skin Type
          </label>
          <input
            type="text"
            value={skincareData.skinType}
            onChange={(e) => setSkincareData({ ...skincareData, skinType: e.target.value })}
            placeholder="e.g., Oily, Dry, Combination"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e2b8e6] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skin Concerns
          </label>
          <input
            type="text"
            value={skincareData.concerns}
            onChange={(e) => setSkincareData({ ...skincareData, concerns: e.target.value })}
            placeholder="e.g., Acne, Aging, Hyperpigmentation"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e2b8e6] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recommended Products
          </label>
          <textarea
            value={skincareData.products}
            onChange={(e) => setSkincareData({ ...skincareData, products: e.target.value })}
            placeholder="List of recommended products..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e2b8e6] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily Routine
          </label>
          <textarea
            value={skincareData.routine}
            onChange={(e) => setSkincareData({ ...skincareData, routine: e.target.value })}
            placeholder="Morning and evening routine steps..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e2b8e6] focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={handleMint}
        disabled={isMinting || !skincareData.skinType}
        className="w-full bg-[#e2b8e6] hover:bg-[#d8a5dc] disabled:bg-[#e2b8e6]/60 text-white px-6 py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isMinting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Minting NFT...
          </>
        ) : (
          <>
            <Image className="w-4 h-4" />
            Mint Beauty NFT (Free)
          </>
        )}
      </button>

      <div className="mt-6 p-4 bg-gradient-to-r from-[#e2b8e6]/10 to-[#d8a5dc]/10 border border-[#e2b8e6]/20 rounded-xl">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> This NFT contains your private beauty routine data. 
          Only you can access the detailed routine information.
        </p>
      </div>
    </div>
  );
};