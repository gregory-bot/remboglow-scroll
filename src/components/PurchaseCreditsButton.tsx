import React, { useState } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { CONTRACTS, FACEFIT_CREDITS_ABI, USDC_ABI } from '../config/web3';

interface PurchaseCreditsButtonProps {
  creditsAmount: number;
}

export const PurchaseCreditsButton: React.FC<PurchaseCreditsButtonProps> = ({
  creditsAmount,
}) => {
  const { address, isConnected } = useAccount();
  const [isApproving, setIsApproving] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Read credit price from contract
  const { data: creditPrice } = useReadContract({
    address: CONTRACTS.FACEFIT_CREDITS as `0x${string}`,
    abi: FACEFIT_CREDITS_ABI,
    functionName: 'creditPrice',
    query: {
      enabled: !!CONTRACTS.FACEFIT_CREDITS,
    },
  });

  // Read user's USDC allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACTS.USDC as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'allowance',
    args: address && CONTRACTS.FACEFIT_CREDITS ? [address, CONTRACTS.FACEFIT_CREDITS] : undefined,
    query: {
      enabled: !!address && !!CONTRACTS.USDC && !!CONTRACTS.FACEFIT_CREDITS,
    },
  });

  // Read user's USDC balance
  const { data: usdcBalance } = useReadContract({
    address: CONTRACTS.USDC as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!CONTRACTS.USDC,
    },
  });

  const { writeContract: approveUSDC, data: approveHash } = useWriteContract();
  const { writeContract: purchaseCredits, data: purchaseHash } = useWriteContract();

  const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { isSuccess: purchaseSuccess, error: purchaseError } = useWaitForTransactionReceipt({
    hash: purchaseHash,
  });

  React.useEffect(() => {
    if (approveSuccess) {
      setIsApproving(false);
      refetchAllowance();
    }
  }, [approveSuccess, refetchAllowance]);

  React.useEffect(() => {
    if (purchaseSuccess) {
      setIsPurchasing(false);
    }
  }, [purchaseSuccess]);

  if (!isConnected) {
    return (
      <button
        disabled
        className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
      >
        Connect wallet to purchase credits
      </button>
    );
  }

  const totalCost = creditPrice ? (BigInt(creditPrice) * BigInt(creditsAmount)) : 0n;
  const hasInsufficientBalance = usdcBalance ? BigInt(usdcBalance) < totalCost : true;
  const needsApproval = allowance ? BigInt(allowance) < totalCost : true;

  const handleApprove = async () => {
    if (!totalCost) return;
    
    setIsApproving(true);
    try {
      await approveUSDC({
        address: CONTRACTS.USDC as `0x${string}`,
        abi: USDC_ABI,
        functionName: 'approve',
        args: [CONTRACTS.FACEFIT_CREDITS, totalCost],
      });
    } catch (error) {
      console.error('Approval failed:', error);
      setIsApproving(false);
    }
  };

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      await purchaseCredits({
        address: CONTRACTS.FACEFIT_CREDITS as `0x${string}`,
        abi: FACEFIT_CREDITS_ABI,
        functionName: 'purchaseCredits',
        args: [BigInt(creditsAmount)],
      });
    } catch (error) {
      console.error('Purchase failed:', error);
      setIsPurchasing(false);
    }
  };

  if (hasInsufficientBalance) {
    return (
      <div className="w-full">
        <button
          disabled
          className="w-full bg-red-100 border border-red-300 text-red-700 px-6 py-3 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          Insufficient USDC Balance
        </button>
        <p className="text-sm text-red-600 mt-2 text-center">
          You need ${(Number(totalCost) / 1e6).toFixed(2)} USDC to purchase {creditsAmount} credits
        </p>
      </div>
    );
  }

  if (purchaseSuccess) {
    return (
      <button
        disabled
        className="w-full bg-green-100 border border-green-300 text-green-700 px-6 py-3 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-4 h-4" />
        Purchase Successful!
      </button>
    );
  }

  if (needsApproval) {
    return (
      <button
        onClick={handleApprove}
        disabled={isApproving}
        className="w-full bg-[#e2b8e6] hover:bg-[#d8a5dc] disabled:bg-[#e2b8e6]/60 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isApproving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Approving USDC...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Approve ${(Number(totalCost) / 1e6).toFixed(2)} USDC
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={isPurchasing}
      className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2"
    >
      {isPurchasing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Purchasing Credits...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4" />
          Buy {creditsAmount} Credits (${(Number(totalCost) / 1e6).toFixed(2)})
        </>
      )}
    </button>
  );
};