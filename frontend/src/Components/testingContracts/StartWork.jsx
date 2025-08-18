import { useEffect, useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import { useStartWork } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";
import { updateTxToast } from "../../utils/txToast";

function StartWorkButton({ proposalId }) {
  const { address, isConnected, chain } = useAccount();
  const {
    startWork,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    receipt,
  } = useStartWork();

  // Check ETH balance for gas (0.001 ETH threshold)
  const { data: balanceData } = useBalance({ address });
  const hasEnoughGas = balanceData && balanceData.value >= 0.001 * 10 ** 18;

  // Validate proposal ID
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;
  const isValidProposalId =
    proposalId !== "" && Number.isInteger(Number(proposalId));

  // Ref to track toast ID
  const toastIdRef = useRef(null);

  // Handle start work
  const handleStartWork = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.", { id: "connect-wallet" });
      return;
    }
    if (!isCorrectNetwork) {
      toast.error("Please switch to Base Sepolia network.", {
        id: "network-error",
      });
      return;
    }
    if (!hasEnoughGas) {
      toast.error("Insufficient ETH for gas fees (minimum 0.001 ETH).", {
        id: "gas-error",
      });
      return;
    }
    if (!isValidProposalId) {
      toast.error("Please enter a valid proposal ID.", {
        id: "proposal-id-error",
      });
      return;
    }

    try {
      console.log("Calling startWork with proposalId:", proposalId);
      await startWork(proposalId);
    } catch (err) {
      console.error("Start work error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states
  useEffect(() => {
    updateTxToast(toastIdRef, {
      isPending,
      isConfirming,
      isConfirmed,
      error,
      hash,
      messages: {
        pending: "Starting work...",
        confirming: "Confirming work start...",
        success: "Work started successfully!",
      },
    });

    return () => {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
    };
  }, [isPending, isConfirming, isConfirmed, error]);

  return (
    <button
      onClick={handleStartWork}
      // disabled={
      //   isPending ||
      //   isConfirming ||
      //   !hasEnoughGas ||
      //   !isConnected ||
      //   !isCorrectNetwork ||
      //   !isValidProposalId
      // }
      className={`
        relative w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300
        bg-blue-600 hover:bg-blue-700 text-white
        disabled:bg-gray-600 disabled:cursor-not-allowed
      `}
    >
      {isPending || isConfirming ? "Processing..." : "Start Work"}
    </button>
  );
}

export default StartWorkButton;
