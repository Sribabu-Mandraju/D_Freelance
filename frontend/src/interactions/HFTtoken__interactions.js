import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import HFTtokenABI from '../abis/HFTtoken_ABI.json'; // Import the ABI
import { baseSepolia } from 'wagmi/chains';

// Replace with your deployed contract address
const HFT_TOKEN_ADDRESS = '0x9759f0C5dC990cF1aa9f3A6D85d0d34A53659152'; // Update with actual address

// Hook to read lastClaimTime for a given address
export const useLastClaimTime = (userAddress) => {
  const { data, isLoading, error } = useReadContract({
    address: HFT_TOKEN_ADDRESS,
    abi: HFTtokenABI,
    functionName: 'lastClaimTime',
    args: [userAddress],
    chainId: baseSepolia.id, // Adjust to base.id for mainnet
  });

  return {
    lastClaimTime: data ? Number(data) : null,
    isLoading,
    error,
  };
};

// Hook to read CLAIM_AMOUNT
export const useClaimAmount = () => {
  const { data, isLoading, error } = useReadContract({
    address: HFT_TOKEN_ADDRESS,
    abi: HFTtokenABI,
    functionName: 'CLAIM_AMOUNT',
    chainId: baseSepolia.id,
  });

  return {
    claimAmount: data ? Number(data) / 1e18 : null, // Convert from wei to ether
    isLoading,
    error,
  };
};

// Hook to read BID_FEE
export const useBidFee = () => {
  const { data, isLoading, error } = useReadContract({
    address: HFT_TOKEN_ADDRESS,
    abi: HFTtokenABI,
    functionName: 'BID_FEE',
    chainId: baseSepolia.id,
  });

  return {
    bidFee: data ? Number(data) / 1e18 : null, // Convert from wei to ether
    isLoading,
    error,
  };
};

// Hook to read transfersEnabled
export const useTransfersEnabled = () => {
  const { data, isLoading, error } = useReadContract({
    address: HFT_TOKEN_ADDRESS,
    abi: HFTtokenABI,
    functionName: 'transfersEnabled',
    chainId: baseSepolia.id,
  });

  return {
    transfersEnabled: data,
    isLoading,
    error,
  };
};

// Hook to read whitelisted status for an address
export const useWhitelisted = (address) => {
  const { data, isLoading, error } = useReadContract({
    address: HFT_TOKEN_ADDRESS,
    abi: HFTtokenABI,
    functionName: 'whitelisted',
    args: [address],
    chainId: baseSepolia.id,
  });

  return {
    isWhitelisted: data,
    isLoading,
    error,
  };
};

// Hook to read bidsByAddress for an address
export const useBidsByAddress = (userAddress) => {
  const { data, isLoading, error } = useReadContract({
    address: HFT_TOKEN_ADDRESS,
    abi: HFTtokenABI,
    functionName: 'bidsByAddress',
    args: [userAddress],
    chainId: baseSepolia.id,
  });

  return {
    bids: data ? data.map((bid) => Number(bid)) : [],
    isLoading,
    error,
  };
};


// Helper function to parse contract and gas-related errors
const parseError = (err) => {
  if (err?.message?.includes('HFTtoken__canClaimOnlyOnceInAMonth')) {
    return 'You can only claim tokens once every 30 days';
  } else if (err?.message?.includes('HFTtoken__insifficientAMountToBid')) {
    return 'Insufficient HFT balance to place bid';
  } else if (err?.message?.includes('HFTtoken__transferTokensToAnotherAddressIsDisables')) {
    return 'Token transfers are disabled';
  } else if (err?.message?.includes('Ownable: caller is not the owner')) {
    return 'Only the contract owner can perform this action';
  } else if (err?.message?.includes('cannot estimate gas') || err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
    return 'Unable to estimate gas. Please check your wallet balance or contract conditions.';
  } else if (err?.message?.includes('rejected') || err?.code === 'ACTION_REJECTED') {
    return 'Transaction rejected by user.';
  } else {
    return err.message || 'An unknown error occurred';
  }
};

// Hook to call claimTokens
export const useClaimTokens = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const { chain } = useAccount();
  const chainId = chain?.id || baseSepolia.id;

  const claimTokens = async () => {
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: 'claimTokens',
        chainId,
      });
    } catch (err) {
      console.error('Claim tokens error:', err);
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


// Hook to call placeBid
export const usePlaceBid = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const placeBid = async (proposalId) => {
    if (!proposalId || isNaN(proposalId)) {
      throw new Error('Invalid proposal ID');
    }
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: 'placeBid',
        args: [BigInt(proposalId)],
        chainId: baseSepolia.id,
      });
    } catch (err) {
      console.error('Place bid error:', err);
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

// Hook to call enableTransfers (admin only)
export const useEnableTransfers = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const enableTransfers = async (enabled) => {
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: 'enableTransfers',
        args: [enabled],
        chainId: baseSepolia.id,
      });
    } catch (err) {
      console.error('Enable transfers error:', err);
      throw err;
    }
  };

  return {
    enableTransfers,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
};

// Hook to call whitelistAddress (admin only)
export const useWhitelistAddress = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const whitelistAddress = async (addr, whitelisted) => {
    if (!addr) {
      throw new Error('Invalid address');
    }
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: 'whitelistAddress',
        args: [addr, whitelisted],
        chainId: baseSepolia.id,
      });
    } catch (err) {
      console.error('Whitelist address error:', err);
      throw err;
    }
  };

  return {
    whitelistAddress,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
};

// Hook to call updateClaimAmount (admin only)
export const useUpdateClaimAmount = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const updateClaimAmount = async (newAmount) => {
    if (!newAmount || isNaN(newAmount)) {
      throw new Error('Invalid amount');
    }
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: 'updateClaimAmount',
        args: [BigInt(newAmount * 1e18)], // Convert to wei
        chainId: baseSepolia.id,
      });
    } catch (err) {
      console.error('Update claim amount error:', err);
      throw err;
    }
  };

  return {
    updateClaimAmount,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
};

// Hook to call updateBidFee (admin only)
export const useUpdateBidFee = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const updateBidFee = async (newBidFee) => {
    if (!newBidFee || isNaN(newBidFee)) {
      throw new Error('Invalid bid fee');
    }
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: 'updateBidFee',
        args: [BigInt(newBidFee * 1e18)], // Convert to wei
        chainId: baseSepolia.id,
      });
    } catch (err) {
      console.error('Update bid fee error:', err);
      throw err;
    }
  };

  return {
    updateBidFee,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
};

// Hook to call mintHFT (admin only)
export const useMintHFT = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const mintHFT = async (to, amount) => {
    if (!to || !amount || isNaN(amount)) {
      throw new Error('Invalid address or amount');
    }
    try {
      await writeContract({
        address: HFT_TOKEN_ADDRESS,
        abi: HFTtokenABI,
        functionName: 'mintHFT',
        args: [to, BigInt(amount * 1e18)], // Convert to wei
        chainId: baseSepolia.id,
      });
    } catch (err) {
      console.error('Mint HFT error:', err);
      throw err;
    }
  };

  return {
    mintHFT,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
};

// Note: burnHFT is internal and cannot be called directly from the frontend
// If you need to expose burnHFT, modify the contract to make it public/external