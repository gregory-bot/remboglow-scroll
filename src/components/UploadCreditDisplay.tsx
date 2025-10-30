import React, { useEffect } from 'react';
import { useAccount, useReadContract, useWatchContractEvent } from 'wagmi';
import { Upload, Gift, Coins, Shield } from 'lucide-react';
import { CONTRACTS, FACEFIT_CREDITS_ABI } from '../config/web3';

export const UploadCreditDisplay: React.FC = () => {
  const { address, isConnected } = useAccount();

  // Read user's total credits
  const { data: totalCredits, refetch: refetchCredits } = useReadContract({
    address: CONTRACTS.FACEFIT_CREDITS as `0x${string}`,
    abi: FACEFIT_CREDITS_ABI,
    functionName: 'getTotalCredits',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!CONTRACTS.FACEFIT_CREDITS,
    },
  });

  // Read if user has claimed free credits
  const { data: hasClaimedFree } = useReadContract({
    address: CONTRACTS.FACEFIT_CREDITS as `0x${string}`,
    abi: FACEFIT_CREDITS_ABI,
    functionName: 'hasClaimedFree',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!CONTRACTS.FACEFIT_CREDITS,
    },
  });

  // Watch for credit events to update UI
  useWatchContractEvent({
    address: CONTRACTS.FACEFIT_CREDITS as `0x${string}`,
    abi: FACEFIT_CREDITS_ABI,
    eventName: 'CreditsPurchased',
    args: address ? { user: address } : undefined,
    onLogs: () => {
      refetchCredits();
    },
  });

  useWatchContractEvent({
    address: CONTRACTS.FACEFIT_CREDITS as `0x${string}`,
    abi: FACEFIT_CREDITS_ABI,
    eventName: 'FreeCreditsClaimd',
    args: address ? { user: address } : undefined,
    onLogs: () => {
      refetchCredits();
    },
  });

  if (!isConnected) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30 rounded-2xl p-6 text-center">
        <Upload className="w-12 h-12 text-white/80 mx-auto mb-3" />
        <p className="text-white mb-2 font-medium">Connect your wallet to view upload credits</p>
        <p className="text-sm text-white/80">Get 2 free uploads when you connect!</p>
      </div>
    );
  }

  const credits = Number(totalCredits || 0);
  const canClaimFree = !hasClaimedFree && credits >= 2;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-white" />
          Upload Credits
        </h3>
        {canClaimFree && (
          <div className="flex items-center gap-1 text-green-300 text-sm font-medium">
            <Gift className="w-4 h-4" />
            Free credits available!
          </div>
        )}
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-white mb-2">
          {credits}
        </div>
        <p className="text-white/90 mb-4">
          {credits === 0 ? 'No credits remaining' : 
           credits === 1 ? '1 upload remaining' : 
           `${credits} uploads remaining`}
        </p>

        <div className="bg-white/10 border border-white/20 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-white mb-2">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Credit System</span>
          </div>
          <div className="text-sm text-white/80 space-y-1">
            <p>• 2 free uploads for new users</p>
            <p>• $5 USDC per additional upload</p>
            <p>• Secure Web3 payments on Base</p>
            <p>• Your photos are private & encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};