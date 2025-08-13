import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import HFTtokenABI from "../abis/HFTtoken_ABI.json"; // Import the ABI
import { baseSepolia } from "wagmi/chains";

// Replace with your deployed contract address
const HFT_TOKEN_ADDRESS = "0xd0D1B6E1dE2F705701FE370e91f8fb4731161d5a"; // Update with actual address

// Helper function to parse contract and gas-related errors
const parseError = (err) => {
  if (err?.message?.includes("HFTtoken__canClaimOnlyOnceInAMonth")) {
    return "You can only claim tokens once every 30 days";
  } else if (err?.message?.includes("HFTtoken__insifficientAMountToBid")) {
    return "Insufficient HFT balance to place bid";
  } else if (
    err?.message?.includes("HFTtoken__transferTokensToAnotherAddressIsDisables")
  ) {
    return "Token transfers are disabled";
  } else if (err?.message?.includes("Ownable: caller is not the owner")) {
    return "Only the contract owner can perform this action";
  } else if (
    err?.message?.includes("cannot estimate gas") ||
    err?.code === "UNPREDICTABLE_GAS_LIMIT"
  ) {
    return "Unable to estimate gas. Please check your wallet balance or contract conditions.";
  } else if (
    err?.message?.includes("rejected") ||
    err?.code === "ACTION_REJECTED"
  ) {
    return "Transaction rejected by user.";
  } else {
    return err.message || "An unknown error occurred";
  }
};

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
      throw new Error(parseError(err));
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

export const purchaseTokens = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });
  const { chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const purchaseToken = async () => {
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: "purchaseTokens",
        chainId,
      });
    } catch (error) {
      console.log("failed to purchase tokens :", error);
    }
    return {
      purchaseToken,
      isPending,
      isConfirming,
      isConfirmed,
      hash,
      error,
    };
  };
};

// Hook to call placeBid
export const usePlaceBid = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });

  const placeBid = async (proposalId) => {
    if (!proposalId || isNaN(proposalId)) {
      throw new Error("Invalid proposal ID");
    }
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: "placeBid",
        args: [BigInt(proposalId)],
        chainId: baseSepolia.id,
      });
    } catch (err) {
      console.error("Place bid error:", err);
      throw err;
    }
  };

  return {
    placeBid,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
};
