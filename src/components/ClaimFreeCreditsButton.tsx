import React, { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Gift, Loader2, CheckCircle } from 'lucide-react';
import { CONTRACTS, FACEFIT_CREDITS_ABI } from '../config/web3';

export const ClaimFreeCreditsButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [isClaiming, setIsClaiming] = useState(false);

  // Check if user has already claimed free credits
  const { data: hasClaimedFree, refetch } = useReadContract({
    address: CONTRACTS.FACEFIT_CREDITS as `0x${string}`,
    abi: FACEFIT_CREDITS_ABI,
    functionName: 'hasClaimedFree',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!CONTRACTS.FACEFIT_CREDITS,
    },
  });

  const { writeContract: claimFreeCredits, data: claimHash } = useWriteContract();

  const { isSuccess: claimSuccess } = useWaitForTransactionReceipt({
    hash: claimHash,
  });

  React.useEffect(() => {
    if (claimSuccess) {
      setIsClaiming(false);
      refetch();
    }
  }, [claimSuccess, refetch]);

  const handleClaimFree = async () => {
    setIsClaiming(true);
    try {
      await claimFreeCredits({
        address: CONTRACTS.FACEFIT_CREDITS as `0x${string}`,
        abi: FACEFIT_CREDITS_ABI,
        functionName: 'claimFreeCredits',
      });
    } catch (error) {
      console.error('Claim failed:', error);
      setIsClaiming(false);
    }
  };

  if (!isConnected || hasClaimedFree) {
    return null;
  }

  if (claimSuccess) {
    return (
      <button
        disabled
        className="w-full bg-green-100 border border-green-300 text-green-700 px-6 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-4 h-4" />
        Free Credits Claimed!
      </button>
    );
  }

  return (
    <button
      onClick={handleClaimFree}
      disabled={isClaiming}
      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-400 disabled:to-green-400 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      {isClaiming ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Claiming Free Credits...
        </>
      ) : (
        <>
          <Gift className="w-4 h-4" />
          Claim 2 Free Upload Credits!
        </>
      )}
    </button>
  );
};