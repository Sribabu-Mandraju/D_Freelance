import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { useEffect } from "react";
import ProposalManager_ABI from "../abis/PropoalManager_ABI.json"

const PROPOSAL_MANAGER_ADDRESS = "0x9e002323F46D6908EC4ef5444f1Bd0F67AF9Cf10"; // ProposalManager contract address
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // USDC contract address
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


export const useCreateProposal = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;  

  const createProposal = async (_deadline, _budget) => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    if (chainId !== baseSepolia.id) {
      throw new Error("Please switch to Base Sepolia network");
    }
    if (_budget <= 0) {
      throw new Error("Budget must be greater than 0");
    }
    if (_deadline <= Math.floor(Date.now() / 1000)) {
      throw new Error("Deadline must be in the future");
    }

    try {
      console.log("Initiating createProposal transaction...", { _deadline, _budget });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "createProposal",
        args: [_deadline, _budget],
        chainId,
      });
    } catch (error) {
      console.error("Failed to create proposal:", error);
      throw error;
    }
  };

  // Log transaction states for debugging
  useEffect(() => {
    console.log("Transaction states:", {
      isPending,
      isConfirming,
      isConfirmed,
      error: error?.message,
      hash,
    });
  }, [isPending, isConfirming, isConfirmed, error, hash]);

  return {
    createProposal,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};



export const useOpenProposalToBid = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const openProposalToBid = async (proposalId) => {
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
      console.log("Initiating openProposalToBid transaction...", { proposalId });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "openProposalToBid",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to open proposal to bid:", error);
      throw error;
    }
  };

  // Log transaction states for debugging
  useEffect(() => {
    console.log("Transaction states:", {
      isPending,
      isConfirming,
      isConfirmed,
      error: error?.message,
      hash,
    });
  }, [isPending, isConfirming, isConfirmed, error, hash]);

  return {
    openProposalToBid,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};




export const useAcceptBid = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const acceptBid = async (proposalId, bidder, bidAmount) => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    if (chainId !== baseSepolia.id) {
      throw new Error("Please switch to Base Sepolia network");
    }
    if (!proposalId && proposalId !== 0) {
      throw new Error("Invalid proposal ID");
    }
    // if (!isAddress(bidder)) {
    //   throw new Error("Invalid bidder address");
    // }
    if (bidAmount <= 0) {
      throw new Error("Bid amount must be greater than 0");
    }

    try {
      console.log("Initiating acceptBid transaction...", { proposalId, bidder, bidAmount });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "acceptBid",
        args: [BigInt(proposalId), bidder, BigInt(bidAmount)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to accept bid:", error);
      throw error;
    }
  };

  // Log transaction states for debugging
  useEffect(() => {
    console.log("Transaction states:", {
      isPending,
      isConfirming,
      isConfirmed,
      error: error?.message,
      hash,
    });
  }, [isPending, isConfirming, isConfirmed, error, hash]);

  return {
    acceptBid,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};




export const useDepositBidAmount = () => {
  const { writeContract: writeApprove, data: approveHash, error: approveError, isPending: isApprovePending } = useWriteContract();
  const { writeContract: writeDeposit, data: depositHash, error: depositError, isPending: isDepositPending } = useWriteContract();
  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isDepositConfirming, isSuccess: isDepositConfirmed } = useWaitForTransactionReceipt({ hash: depositHash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  // Check USDC allowance for ProposalManager
  const { data: allowanceData, error: allowanceError, refetch: refetchAllowance } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "allowance",
    args: [address, PROPOSAL_MANAGER_ADDRESS],
  });

  // Check USDC balance
  const { data: usdcBalanceData, error: usdcBalanceError } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  // Fetch proposal details to get bidAmount
  const { data: proposalData, error: proposalError } = useReadContract({
    address: PROPOSAL_MANAGER_ADDRESS,
    abi: ProposalManager_ABI,
    functionName: "getProposal",
    args: [BigInt(0)], // Placeholder; update dynamically in component
  });

  // console.log(proposalData)

  const approveUSDC = async (bidAmount) => {
    if (!bidAmount || bidAmount <= 0) {
      throw new Error("Invalid bid amount");
    }
    try {
      console.log("Initiating USDC approval for ProposalManager...", { bidAmount });
      await writeApprove({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: "approve",
        args: [PROPOSAL_MANAGER_ADDRESS, BigInt(bidAmount)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to approve USDC:", error);
      throw error;
    }
  };

  const depositBidAmount = async (proposalId) => {
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
      console.log("Initiating depositBidAmount transaction...", { proposalId });
      await writeDeposit({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "depositBidAmount",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to deposit bid amount:", error);
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
      isDepositPending,
      isDepositConfirming,
      isDepositConfirmed,
      depositError: depositError?.message,
      allowance: allowanceData?.toString(),
      usdcBalance: usdcBalanceData?.toString(),
      proposalData,
    });
  }, [
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    isDepositPending,
    isDepositConfirming,
    isDepositConfirmed,
    depositError,
    allowanceData,
    usdcBalanceData,
    proposalData,
  ]);

  return {
    approveUSDC,
    depositBidAmount,
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    approveHash,
    isDepositPending,
    isDepositConfirming,
    isDepositConfirmed,
    depositError,
    depositHash,
    allowance: allowanceData || BigInt(0),
    usdcBalance: usdcBalanceData || BigInt(0),
    allowanceError,
    usdcBalanceError,
    proposalData,
    proposalError,
  };
};
