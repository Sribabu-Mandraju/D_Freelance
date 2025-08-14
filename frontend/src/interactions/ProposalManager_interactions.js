import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { useEffect, useState } from "react";
import ProposalManager_ABI from "../abis/PropoalManager_ABI.json";
import { parseAbiItem } from "viem";
import { createPublicClient, http } from "viem";
import { useRef } from "react";
import { parseEventLogs } from "viem"; // Add this import

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
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  // Parse ProposalCreated event from receipt
  const proposalEvent = receipt
    ? parseEventLogs({
        abi: ProposalManager_ABI,
        logs: receipt.logs,
        eventName: "ProposalCreated",
      })[0]?.args || null
    : null;

  const createProposal = async (deadline, budget) => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    if (chainId !== baseSepolia.id) {
      throw new Error("Please switch to Base Sepolia network");
    }
    if (!deadline || deadline <= BigInt(Math.floor(Date.now() / 1000))) {
      throw new Error("Invalid deadline: Must be in the future");
    }
    if (!budget || budget <= 0) {
      throw new Error("Invalid budget: Must be greater than 0");
    }

    try {
      console.log("Initiating createProposal transaction...", {
        deadline,
        budget,
      });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "createProposal",
        args: [deadline, budget],
        chainId,
      });
    } catch (error) {
      console.error("Failed to create proposal:", error);
      throw error;
    }
  };

  // Ref to prevent infinite logging
  const hasLogged = useRef(false);

  // Log transaction states only once per transaction
  useEffect(() => {
    if (
      !hasLogged.current &&
      (isPending ||
        isConfirming ||
        isConfirmed ||
        error ||
        hash ||
        proposalEvent)
    ) {
      console.log("Transaction states:", {
        isPending,
        isConfirming,
        isConfirmed,
        error: error?.message,
        hash,
        proposalEvent,
        receipt,
      });
      hasLogged.current = true;
    }
    // Reset hasLogged when a new transaction starts
    if (isPending) {
      hasLogged.current = false;
    }
  }, [
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    proposalEvent,
    receipt,
  ]);

  return {
    createProposal,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    proposalEvent,
    receipt,
  };
};

export const useOpenProposalToBid = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
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
      console.log("Initiating openProposalToBid transaction...", {
        proposalId,
      });
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
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
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
      console.log("Initiating acceptBid transaction...", {
        proposalId,
        bidder,
        bidAmount,
      });
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

export const useDepositBidAmount = (proposalId) => {
  const {
    writeContract: writeApprove,
    data: approveHash,
    error: approveError,
    isPending: isApprovePending,
  } = useWriteContract();
  const {
    writeContract: writeDeposit,
    data: depositHash,
    error: depositError,
    isPending: isDepositPending,
  } = useWriteContract();
  const {
    isLoading: isApproveConfirming,
    isSuccess: isApproveConfirmed,
  } = useWaitForTransactionReceipt({ hash: approveHash });
  const {
    isLoading: isDepositConfirming,
    isSuccess: isDepositConfirmed,
  } = useWaitForTransactionReceipt({ hash: depositHash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  // Check USDC allowance for ProposalManager
  const {
    data: allowanceData,
    error: allowanceError,
    refetch: refetchAllowance,
  } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "allowance",
    args: [address, PROPOSAL_MANAGER_ADDRESS],
    query: { enabled: !!address },
  });

  // Check USDC balance
  const { data: usdcBalanceData, error: usdcBalanceError } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: !!address },
  });

  // Fetch proposal details to get bidAmount and state
  const { data: rawProposalData, error: proposalError } = useReadContract({
    address: PROPOSAL_MANAGER_ADDRESS,
    abi: ProposalManager_ABI,
    functionName: "proposals", // Use "proposals" instead of "getProposal"
    args: [BigInt(proposalId || 0)],
    query: {
      enabled:
        !!proposalId &&
        proposalId !== "" &&
        Number.isInteger(Number(proposalId)),
    },
  });

  // Transform proposal data
  const proposalData = rawProposalData
    ? {
        id: Number(rawProposalData[0]),
        client: rawProposalData[1],
        bidder: rawProposalData[2],
        startTime: Number(rawProposalData[3]),
        endTime: Number(rawProposalData[4]),
        budget: Number(rawProposalData[5]),
        bidAmount: Number(rawProposalData[6]),
        state: Number(rawProposalData[7]),
      }
    : null;

  const approveUSDC = async (bidAmount) => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    if (chainId !== baseSepolia.id) {
      throw new Error("Please switch to Base Sepolia network");
    }
    if (!bidAmount || bidAmount <= 0) {
      throw new Error("Invalid bid amount");
    }
    try {
      console.log("Initiating USDC approval for ProposalManager...", {
        bidAmount,
      });
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
    if (!proposalId && proposalId !== "0") {
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

  // Ref to prevent infinite logging
  const hasLogged = useRef(false);

  // Log transaction states for debugging
  useEffect(() => {
    if (
      !hasLogged.current &&
      (isApprovePending ||
        isApproveConfirming ||
        isApproveConfirmed ||
        approveError ||
        isDepositPending ||
        isDepositConfirming ||
        isDepositConfirmed ||
        depositError ||
        allowanceData ||
        usdcBalanceData ||
        proposalData ||
        proposalError)
    ) {
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
        proposalError: proposalError?.message,
      });
      hasLogged.current = true;
    }
    // Reset hasLogged when a new transaction starts
    if (isApprovePending || isDepositPending) {
      hasLogged.current = false;
    }
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
    proposalError,
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

export const useStartWork = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const startWork = async (proposalId) => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    if (chainId !== baseSepolia.id) {
      throw new Error("Please switch to Base Sepolia network");
    }
    if (!proposalId && proposalId !== "0") {
      throw new Error("Invalid proposal ID");
    }

    try {
      console.log("Initiating startWork transaction...", { proposalId });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "startWork",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to start work:", error);
      throw error;
    }
  };

  // Ref to prevent infinite logging
  const hasLogged = useRef(false);

  // Log transaction states for debugging
  useEffect(() => {
    if (
      !hasLogged.current &&
      (isPending || isConfirming || isConfirmed || error || hash || receipt)
    ) {
      console.log("Transaction states:", {
        isPending,
        isConfirming,
        isConfirmed,
        error: error?.message,
        hash,
        receipt,
      });
      hasLogged.current = true;
    }
    // Reset hasLogged when a new transaction starts
    if (isPending) {
      hasLogged.current = false;
    }
  }, [isPending, isConfirming, isConfirmed, error, hash, receipt]);

  return {
    startWork,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    receipt,
  };
};

export const usePayFirstMilestone = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const payFirstMilestone = async (proposalId) => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    if (chainId !== baseSepolia.id) {
      throw new Error("Please switch to Base Sepolia network");
    }
    if (!proposalId && proposalId !== "0") {
      throw new Error("Invalid proposal ID");
    }

    try {
      console.log("Initiating payFirstMilestone transaction...", {
        proposalId,
      });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "payFirstMilestone",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to pay first milestone:", error);
      throw error;
    }
  };

  // Ref to prevent infinite logging
  const hasLogged = useRef(false);

  // Log transaction states only once per transaction
  useEffect(() => {
    if (
      !hasLogged.current &&
      (isPending || isConfirming || isConfirmed || error || hash)
    ) {
      console.log("Transaction states:", {
        isPending,
        isConfirming,
        isConfirmed,
        error: error?.message,
        hash,
      });
      hasLogged.current = true;
    }
    // Reset hasLogged when a new transaction starts
    if (isPending) {
      hasLogged.current = false;
    }
  }, [isPending, isConfirming, isConfirmed, error, hash]);

  return {
    payFirstMilestone,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};
