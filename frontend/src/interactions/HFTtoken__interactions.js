import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import HFTtokenABI from "../abis/HFTtoken_ABI.json"; // Import the ABI
import { baseSepolia } from "wagmi/chains";
import { useEffect } from "react";

// Replace with your deployed contract address
const HFT_TOKEN_ADDRESS = "0xd0D1B6E1dE2F705701FE370e91f8fb4731161d5a"; // Update with actual address


const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const USDC_ABI = [
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
];


const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
];




// Hook to call claimTokens
export const useClaimTokens = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
  const { chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const claimTokens = async () => {
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: "claimTokens",
        chainId,
      });
    } catch (err) {
      console.error("Claim tokens error:", err);
      // throw new Error(parseError(err));
    }
  };

  return {
    claimTokens,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error: error ? parseError(error) : null,
  };
};



export const usePurchaseTokens = () => {
  const { writeContract: writeApprove, data: approveHash, error: approveError, isPending: isApprovePending } = useWriteContract();
  const { writeContract: writePurchase, data: purchaseHash, error: purchaseError, isPending: isPurchasePending } = useWriteContract();
  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isPurchaseConfirming, isSuccess: isPurchaseConfirmed } = useWaitForTransactionReceipt({ hash: purchaseHash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  // Check USDC allowance
  const { data: allowanceData, error: allowanceError, refetch: refetchAllowance } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "allowance",
    args: [address, HFT_TOKEN_ADDRESS],
  });

  // Check USDC balance
  const { data: usdcBalanceData, error: usdcBalanceError } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  const approveUSDC = async () => {
    const USDC_AMOUNT = BigInt(10 * 10 ** 6); // 10 USDC (6 decimals)
    try {
      console.log("Initiating USDC approval...");
      await writeApprove({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: "approve",
        args: [HFT_TOKEN_ADDRESS, USDC_AMOUNT],
        chainId,
      });
    } catch (error) {
      console.error("Failed to approve USDC:", error);
      throw error;
    }
  };

  const purchaseToken = async () => {
    try {
      console.log("Initiating token purchase...");
      await writePurchase({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: "purchaseTokens",
        chainId,
        // args: [USDC_AMOUNT], // Uncomment if purchaseTokens requires amount
      });
    } catch (error) {
      console.error("Failed to purchase tokens:", error);
      throw error;
    }
  };

  // Refetch allowance after approval confirmation
  useEffect(() => {
    if (isApproveConfirmed) {
      console.log("Approval confirmed, refetching allowance...");
      refetchAllowance();
    }
  }, [isApproveConfirmed, refetchAllowance]);

  // Log transaction states for debugging
  useEffect(() => {
    console.log("Transaction states:", {
      isApprovePending,
      isApproveConfirming,
      isApproveConfirmed,
      approveError: approveError?.message,
      isPurchasePending,
      isPurchaseConfirming,
      isPurchaseConfirmed,
      purchaseError: purchaseError?.message,
      allowance: allowanceData?.toString(),
      usdcBalance: usdcBalanceData?.toString(),
    });
  }, [
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    isPurchasePending,
    isPurchaseConfirming,
    isPurchaseConfirmed,
    purchaseError,
    allowanceData,
    usdcBalanceData,
  ]);

  return {
    approveUSDC,
    purchaseToken,
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    approveHash,
    isPurchasePending,
    isPurchaseConfirming,
    isPurchaseConfirmed,
    purchaseError,
    purchaseHash,
    allowance: allowanceData || BigInt(0),
    usdcBalance: usdcBalanceData || BigInt(0),
    allowanceError,
    usdcBalanceError,
  };
};
// Hook to call placeBid

export const usePlaceBid = () => {
  const { writeContract: writeApprove, data: approveHash, error: approveError, isPending: isApprovePending } = useWriteContract();
  const { writeContract: writePlaceBid, data: bidHash, error: bidError, isPending: isBidPending } = useWriteContract();
  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isBidConfirming, isSuccess: isBidConfirmed } = useWaitForTransactionReceipt({ hash: bidHash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  // Check HFT allowance for HFT_TOKEN_ADDRESS
  const { data: allowanceData, error: allowanceError, refetch: refetchAllowance } = useReadContract({
    address: HFT_TOKEN_ADDRESS,
    abi: HFTtokenABI,
    functionName: "allowance",
    args: [address, HFT_TOKEN_ADDRESS],
    query: { enabled: !!address },
  });

  // Check HFT balance
  const { data: hftBalanceData, error: hftBalanceError } = useReadContract({
    address: HFT_TOKEN_ADDRESS,
    abi: HFTtokenABI,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: !!address },
  });

  const approveHFT = async (amount) => {
    if (!amount || amount <= 0) {
      throw new Error("Invalid HFT amount");
    }
    try {
      console.log("Initiating HFT approval...", { amount });
      await writeApprove({
        address: HFT_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [HFT_TOKEN_ADDRESS, BigInt(amount)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to approve HFT:", error);
      throw error;
    }
  };

  const placeBid = async (proposalId) => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    if (chainId !== baseSepolia.id) {
      throw new Error("Please switch to Base Sepolia network");
    }
    if (!proposalId && proposalId !== 0) {
      throw new Error("Invalid proposal ID");
    }

    try {
      console.log("Initiating placeBid transaction...", { proposalId });
      await writePlaceBid({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: "placeBid",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to place bid:", error);
      throw error;
    }
  };

  // Refetch allowance after approval confirmation
  useEffect(() => {
    if (isApproveConfirmed) {
      console.log("Approval confirmed, refetching allowance...");
      refetchAllowance();
    }
  }, [isApproveConfirmed, refetchAllowance]);

  // Log transaction states for debugging
  useEffect(() => {
    console.log("Transaction states:", {
      isApprovePending,
      isApproveConfirming,
      isApproveConfirmed,
      approveError: approveError?.message,
      isBidPending,
      isBidConfirming,
      isBidConfirmed,
      bidError: bidError?.message,
      allowance: allowanceData?.toString(),
      hftBalance: hftBalanceData?.toString(),
    });
  }, [
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    isBidPending,
    isBidConfirming,
    isBidConfirmed,
    bidError,
    allowanceData,
    hftBalanceData,
  ]);

  return {
    approveHFT,
    placeBid,
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    approveHash,
    isBidPending,
    isBidConfirming,
    isBidConfirmed,
    bidError,
    bidHash,
    allowance: allowanceData || BigInt(0),
    hftBalance: hftBalanceData || BigInt(0),
    allowanceError,
    hftBalanceError,
  };
};