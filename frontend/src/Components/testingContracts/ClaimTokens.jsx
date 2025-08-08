import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useClaimTokens, useLastClaimTime } from '../../interactions/HFTtoken__interactions';
import { baseSepolia } from 'wagmi/chains';
import toast from 'react-hot-toast';

function ClaimTokens() {
  const { address, isConnected, chain } = useAccount();
  const [errorMessage, setErrorMessage] = useState(null);

  // Use hooks
  const { claimTokens, isPending, isConfirming, isConfirmed, error } = useClaimTokens();
  const { lastClaimTime, isLoading: isLoadingLastClaimTime, error: claimTimeError } = useLastClaimTime(address);

  // Check if user can claim tokens (once every 30 days)
  const canClaim = () => {
    if (!lastClaimTime) return true;
    const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= lastClaimTime + thirtyDaysInSeconds;
  };

  // Check if wallet has enough ETH for gas (0.001 ETH threshold)

  // Check if on correct network
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;

  // Handle claim tokens
  const handleClaimTokens = async () => {
    setErrorMessage(null);
    if (!isCorrectNetwork) {
      setErrorMessage('Please switch to Base Sepolia network.');
      return;
    }
    if (!canClaim()) {
      setErrorMessage('You can only claim tokens once every 30 days.');
      return;
    }
    const toastId = toast.loading('Please sign the transaction in your wallet...');
    try {
      await claimTokens();
      toast.dismiss(toastId);
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(`Failed to claim tokens: ${err.message}`);
    }
  };

  // Update toast notifications based on transaction state
  useEffect(() => {
    let toastId;
    if (isPending) {
      toastId = toast.loading('Transaction is pending...');
    } else if (isConfirming) {
      toastId = toast.loading('Transaction is confirming...');
    } else if (isConfirmed) {
      toast.success('Tokens claimed successfully!');
    } else if (error) {
      toast.error(`Error: ${error}`);
    } else if (claimTimeError) {
      setErrorMessage(`Error fetching claim time: ${claimTimeError}`);
    } 
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isPending, isConfirming, isConfirmed, error, claimTimeError]);

  // Loading state
  const isLoading = isLoadingLastClaimTime ;

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Claim HFT Tokens</h3>
      {!isConnected ? (
        <p className="text-red-500">Please connect your wallet to claim tokens.</p>
      ) : !isCorrectNetwork ? (
        <p className="text-red-500">Please switch to Base Sepolia network.</p>
      ) : isLoading ? (
        <p className="text-gray-400">Checking eligibility...</p>
      ) : (
        <>
          <button
            onClick={handleClaimTokens}
            disabled={isPending || isConfirming || !canClaim() }
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isPending || isConfirming || !canClaim() 
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPending || isConfirming ? 'Processing...' : 'Claim Tokens'}
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {!canClaim() && !errorMessage && (
            <p className="text-red-500 mt-2">
              You can claim again after {new Date((lastClaimTime + 30 * 24 * 60 * 60) * 1000).toLocaleDateString()}.
            </p>
          )}
         
        </>
      )}
    </div>
  );
}

export default ClaimTokens;