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
  const { isLoading: isConfirming, isSuccess: isConfirmed, receipt } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  // State to store the emitted ProposalCreated event data
  const [proposalEvent, setProposalEvent] = useState(null);

  // Ref to prevent infinite logging
  const hasLogged = useRef(false);

  // Create a public client for fetching logs and receipts
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http("https://base-sepolia.g.alchemy.com/v2/lzIxPpJ8bHtK938K6Bnet"), // Replace with your Alchemy/Infura key
  });

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
        args: [BigInt(_deadline), BigInt(_budget)],
        chainId,
      });
    } catch (error) {
      console.error("Failed to create proposal:", error);
      throw error;
    }
  };

  // Fetch ProposalCreated event after transaction confirmation
  useEffect(() => {
    const fetchProposalCreatedEvent = async () => {
      if (isConfirmed && hash && !proposalEvent) {
        let attempts = 0;
        const maxAttempts = 5;
        let logs = [];
        let transactionReceipt = receipt;

        // Fallback to fetch receipt manually if receipt is undefined or lacks blockNumber
        if (!transactionReceipt || !transactionReceipt.blockNumber) {
          try {
            console.log("Fetching transaction receipt manually for tx:", hash);
            transactionReceipt = await publicClient.getTransactionReceipt({ hash });
            console.log("Manual receipt:", {
              blockNumber: transactionReceipt?.blockNumber?.toString(),
              transactionHash: transactionReceipt?.transactionHash,
            });
          } catch (error) {
            console.error("Failed to fetch transaction receipt:", error);
            return;
          }
        }

        // Fallback to current block number if receipt.blockNumber is still undefined
        let blockNumber = transactionReceipt?.blockNumber;
        if (!blockNumber) {
          try {
            blockNumber = await publicClient.getBlockNumber();
            console.log("Using current block number as fallback:", blockNumber.toString());
          } catch (error) {
            console.error("Failed to fetch current block number:", error);
            return;
          }
        }

        while (attempts < maxAttempts && !logs.length) {
          attempts++;
          try {
            console.log(`Fetching ProposalCreated event for tx: ${hash} (attempt ${attempts}/${maxAttempts})`);
            logs = await publicClient.getLogs({
              address: PROPOSAL_MANAGER_ADDRESS,
              event: parseAbiItem("event ProposalCreated(uint256 indexed proposalId, address indexed client)"),
              fromBlock: BigInt(Math.max(Number(blockNumber) - 5, 0)),
              toBlock: blockNumber + BigInt(5),
              transactionHash: hash,
            });

            if (logs.length > 0) {
              const event = logs[0];
              const proposalId = event.args.proposalId;
              const client = event.args.client;
              console.log("ProposalCreated event:", { proposalId: proposalId.toString(), client });
              setProposalEvent({ proposalId, client });
            } else {
              console.warn(
                "No ProposalCreated event found for tx:",
                hash,
                "in block range:",
                (BigInt(Math.max(Number(blockNumber) - 5, 0))).toString(),
                "to",
                (blockNumber + BigInt(5)).toString()
              );
              if (attempts < maxAttempts) {
                console.log(`Retrying after 3s... (attempt ${attempts}/${maxAttempts})`);
                await new Promise(resolve => setTimeout(resolve, 3000));
              }
            }
          } catch (error) {
            console.error(`Failed to fetch ProposalCreated event (attempt ${attempts}):`, error);
            if (attempts < maxAttempts) {
              console.log(`Retrying after 3s... (attempt ${attempts}/${maxAttempts})`);
              await new Promise(resolve => setTimeout(resolve, 3000));
            }
          }
        }

        if (!logs.length) {
          console.error("Failed to fetch ProposalCreated event after all attempts for tx:", hash);
        }
      }
    };

    fetchProposalCreatedEvent();
    console.log("receipt ")
    // console.log(receipt)
  }, [isConfirmed, hash, receipt, publicClient]);

  // Log transaction states only once per transaction
  useEffect(() => {
    if (!hasLogged.current && (isPending || isConfirming || isConfirmed || error || hash || proposalEvent)) {
      console.log("Transaction states:", {
        isPending,
        isConfirming,
        isConfirmed,
        error: error?.message,
        hash,
        receiptBlock: receipt?.blockNumber?.toString(),
        proposalEvent,
      });
      hasLogged.current = true;
    }
    // Reset hasLogged when a new transaction starts
    if (isPending) {
      hasLogged.current = false;
    }
  }, [isPending, isConfirming, isConfirmed, error, hash, receipt, proposalEvent]);

  return {
    createProposal,
    isPending,
    isConfirming,
    isConfirmed,
    receipt,
    error,
    hash,
    proposalEvent,
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

export const useDepositBidAmount = () => {
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

export const useStartWork = (proposalId) => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
  const { address, chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  // Fetch proposal details to validate bidder and state
  const { data: proposalData, error: proposalError } = useReadContract({
    address: PROPOSAL_MANAGER_ADDRESS,
    abi: ProposalManager_ABI,
    functionName: "proposals",
    args: [BigInt(proposalId || 0)],
    query: { enabled: !!proposalId || proposalId === "0" },
  });

  const startWork = async (proposalId) => {
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

  // Log transaction states for debugging
  useEffect(() => {
    console.log("Transaction states:", {
      isPending,
      isConfirming,
      isConfirmed,
      error: error?.message,
      hash,
      proposalData,
      proposalError: proposalError?.message,
    });
  }, [
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    proposalData,
    proposalError,
  ]);

  return {
    startWork,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    proposalData,
    proposalError,
  };
};
