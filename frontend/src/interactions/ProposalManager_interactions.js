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
import toast from "react-hot-toast";

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
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  // Separate writeContract instances for approve and deposit
  const {
    writeContract: writeApprove,
    data: approveHash,
    error: approveError,
    isPending: isApprovePending,
    reset: resetApprove,
  } = useWriteContract();
  const {
    writeContract: writeDeposit,
    data: depositHash,
    error: depositError,
    isPending: isDepositPending,
    reset: resetDeposit,
  } = useWriteContract();

  // Track approval and deposit confirmations
  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({
    hash: approveHash,
  });
  const { isLoading: isDepositConfirming, isSuccess: isDepositConfirmed } = useWaitForTransactionReceipt({
    hash: depositHash,
  });

  // Check USDC allowance
  const { data: allowance, error: allowanceError } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "allowance",
    args: [address, PROPOSAL_MANAGER_ADDRESS],
    chainId,
    query: { enabled: !!address && !!proposalId },
  });

  // Check USDC balance
  const { data: usdcBalanceData, error: usdcBalanceError } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [address],
    chainId,
    query: { enabled: !!address && !!proposalId },
  });
  const usdcBalance = usdcBalanceData ? BigInt(usdcBalanceData) : BigInt(0);

  // Fetch proposal data
  const { data: proposalData, error: proposalError } = useReadContract({
    address: PROPOSAL_MANAGER_ADDRESS,
    abi: ProposalManager_ABI,
    functionName: "getProposal",
    args: [BigInt(proposalId || 0)],
    chainId,
    query: { enabled: !!proposalId && Number.isInteger(Number(proposalId)) && Number(proposalId) >= 0 },
  });

  // Ref to store deposit parameters and toast ID
  const depositParamsRef = useRef(null);
  const toastIdRef = useRef(null);

  const approveUSDC = async (amount) => {
    try {
      toastIdRef.current = toast.loading("Approving USDC...", { id: "approve-pending" });
      await writeApprove({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: "approve",
        args: [PROPOSAL_MANAGER_ADDRESS, amount],
        chainId,
      });
    } catch (err) {
      console.error("Approval error:", err);
      const errorMessage = err.code === 4001 || err.message.includes("User rejected")
        ? "Approval transaction cancelled"
        : "Failed to approve USDC";
      toast.error(errorMessage, { id: "approve-error" });
      throw new Error(errorMessage);
    }
  };

  const depositBidAmount = async (proposalId) => {
    try {
      toastIdRef.current = toast.loading("Depositing bid amount...", { id: "deposit-pending" });
      await writeDeposit({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "depositBidAmount",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (err) {
      console.error("Deposit error:", err);
      let errorMessage;
      if (err.code === 4001 || err.message.includes("User rejected")) {
        errorMessage = "Deposit transaction cancelled";
      } else if (err.message.includes("OnlyClientCanCall")) {
        errorMessage = "Only the proposal client can deposit";
      } else if (err.message.includes("Invalid state")) {
        errorMessage = "Proposal must be in Awarded state";
      } else if (err.message.includes("InvalidProposalId")) {
        errorMessage = "Invalid proposal ID";
      } else if (err.message.includes("insufficient allowance")) {
        errorMessage = "Insufficient USDC allowance";
      } else if (err.message.includes("transfer amount exceeds balance")) {
        errorMessage = "Insufficient USDC balance";
      } else {
        errorMessage = "Failed to deposit bid amount";
      }
      toast.error(errorMessage, { id: "deposit-error" });
      throw new Error(errorMessage);
    }
  };

  // Auto-trigger deposit after approval
  useEffect(() => {
    if (isApproveConfirmed && depositParamsRef.current) {
      console.log("Approval confirmed, auto-triggering deposit...");
      const { proposalId } = depositParamsRef.current;
      depositBidAmount(proposalId).catch((err) => {
        console.error("Auto-deposit error:", err);
      });
      depositParamsRef.current = null;
    }
  }, [isApproveConfirmed]);

  // Handle transaction states and toasts
  useEffect(() => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }

    if (isApprovePending) {
      toastIdRef.current = toast.loading("Approving USDC...", { id: "approve-pending" });
    } else if (isApproveConfirming) {
      toastIdRef.current = toast.loading("Confirming USDC approval...", { id: "approve-confirming" });
    } else if (isApproveConfirmed && !depositParamsRef.current) {
      toastIdRef.current = toast.success("USDC approved successfully!", { id: "approve-success" });
      resetApprove();
    } else if (isDepositPending) {
      toastIdRef.current = toast.loading("Depositing bid amount...", { id: "deposit-pending" });
    } else if (isDepositConfirming) {
      toastIdRef.current = toast.loading("Confirming deposit...", { id: "deposit-confirming" });
    } else if (isDepositConfirmed) {
      toastIdRef.current = toast.success("Bid amount deposited successfully!", { id: "deposit-success" });
      resetApprove();
      resetDeposit();
    } else if (approveError) {
      const errorMessage = approveError.code === 4001 || approveError.message.includes("User rejected")
        ? "Approval transaction cancelled"
        : "Failed to approve USDC";
      toastIdRef.current = toast.error(errorMessage, { id: "approve-error" });
      resetApprove();
      depositParamsRef.current = null;
    } else if (depositError) {
      let errorMessage;
      if (depositError.code === 4001 || depositError.message.includes("User rejected")) {
        errorMessage = "Deposit transaction cancelled";
      } else if (depositError.message.includes("OnlyClientCanCall")) {
        errorMessage = "Only the proposal client can deposit";
      } else if (depositError.message.includes("Invalid state")) {
        errorMessage = "Proposal must be in Awarded state";
      } else if (depositError.message.includes("InvalidProposalId")) {
        errorMessage = "Invalid proposal ID";
      } else if (depositError.message.includes("insufficient allowance")) {
        errorMessage = "Insufficient USDC allowance";
      } else if (depositError.message.includes("transfer amount exceeds balance")) {
        errorMessage = "Insufficient USDC balance";
      } else {
        errorMessage = "Failed to deposit bid amount";
      }
      toastIdRef.current = toast.error(errorMessage, { id: "deposit-error" });
      resetDeposit();
    }

    return () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
  }, [
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    isDepositPending,
    isDepositConfirming,
    isDepositConfirmed,
    approveError,
    depositError,
  ]);

  // Initiate deposit with approval if needed
  const initiateDeposit = async (proposalId, bidAmount) => {
    const hasEnoughAllowance = allowance >= bidAmount;
    if (!hasEnoughAllowance) {
      depositParamsRef.current = { proposalId };
      await approveUSDC(bidAmount);
    } else {
      await depositBidAmount(proposalId);
    }
  };

  return {
    initiateDeposit,
    approveUSDC,
    depositBidAmount,
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    isDepositPending,
    isDepositConfirming,
    isDepositConfirmed,
    depositError,
    allowance: allowance ? BigInt(allowance) : BigInt(0),
    usdcBalance,
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


export const usePaySecondMilestone = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const paySecondMilestone = async (proposalId) => {
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
      console.log("Initiating paySecondMilestone transaction...", {
        proposalId,
      });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "paySecondMilestone",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to pay second milestone:", error);
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

  // Handle toast notifications
  useEffect(() => {
    if (isPending) {
      // toast.loading("Transaction pending...");
    } else if (isConfirming) {
      toast.loading("Confirming transaction...");
    } else if (isConfirmed) {
      toast.success("Second milestone paid successfully!");
    } else if (error) {
      toast.error(`Error: ${error.message}`);
    }
    return () => toast.dismiss();
  }, [isPending, isConfirming, isConfirmed, error]);

  return {
    paySecondMilestone,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};


export const usePayThirdMilestone = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const payThirdMilestone = async (proposalId) => {
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
      console.log("Initiating payThirdMilestone transaction...", {
        proposalId,
      });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "payThirdMilestone",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to pay third milestone:", error);
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

  // Handle toast notifications
  useEffect(() => {
    if (isPending) {
      toast.loading("Transaction pending...");
    } else if (isConfirming) {
      toast.loading("Confirming transaction...");
    } else if (isConfirmed) {
      toast.success("Third milestone paid successfully!");
    } else if (error) {
      toast.error(`Error: ${error.message}`);
    }
    return () => toast.dismiss();
  }, [isPending, isConfirming, isConfirmed, error]);

  return {
    payThirdMilestone,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};




export const useCompleteProposal = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const completeProposal = async (proposalId) => {
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
      console.log("Initiating completeProposal transaction...", {
        proposalId,
      });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "completeProposal",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to complete proposal:", error);
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

  // Handle toast notifications
  useEffect(() => {
    if (isPending) {
      toast.loading("Transaction pending...");
    } else if (isConfirming) {
      toast.loading("Confirming transaction...");
    } else if (isConfirmed) {
      toast.success("Proposal completed successfully!");
    } else if (error) {
      toast.error(`Error: ${error.message}`);
    }
    return () => toast.dismiss();
  }, [isPending, isConfirming, isConfirmed, error]);

  return {
    completeProposal,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};



export const useCancelProposal = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const cancelProposal = async (proposalId) => {
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
      console.log("Initiating cancelProposal transaction...", {
        proposalId,
      });
      await writeContract({
        address: PROPOSAL_MANAGER_ADDRESS,
        abi: ProposalManager_ABI,
        functionName: "cancelProposal",
        args: [BigInt(proposalId)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to cancel proposal:", error);
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

  // Handle toast notifications
  useEffect(() => {
    if (isPending) {
      toast.loading("Transaction pending...");
    } else if (isConfirming) {
      toast.loading("Confirming transaction...");
    } else if (isConfirmed) {
      toast.success("Proposal cancelled successfully!");
    } else if (error) {
      toast.error(`Error: ${error.message}`);
    }
    return () => toast.dismiss();
  }, [isPending, isConfirming, isConfirmed, error]);

  return {
    cancelProposal,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};