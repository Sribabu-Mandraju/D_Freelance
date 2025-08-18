import { useEffect, useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import { usePayThirdMilestone } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";
import { updateTxToast } from "../../utils/txToast";

function PayThirdMilestoneButton({ proposalId }) {
  const { address, isConnected, chain } = useAccount();
  const {
    payThirdMilestone,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  } = usePayThirdMilestone();

  // Check ETH balance for gas (0.001 ETH threshold)
  const { data: balanceData } = useBalance({ address });
  const hasEnoughGas = balanceData && balanceData.value >= 0.001 * 10 ** 18;

  // Validate proposal ID and network
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;
  const isValidProposalId =
    proposalId !== "" && Number.isInteger(Number(proposalId));

  // Ref to track if toast has been shown
  const hasShownToast = useRef(false);

  // Handle pay third milestone
  const handlePayThirdMilestone = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (!isCorrectNetwork) {
      toast.error("Please switch to Base Sepolia network.");
      return;
    }
    if (!hasEnoughGas) {
      toast.error("Insufficient ETH for gas fees (minimum 0.001 ETH).");
      return;
    }
    if (!isValidProposalId) {
      toast.error("Please enter a valid proposal ID.");
      return;
    }

    try {
      console.log("Calling payThirdMilestone with proposalId:", proposalId);
      hasShownToast.current = false; // Reset toast flag
      await payThirdMilestone(proposalId);
    } catch (err) {
      console.error("Pay third milestone error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states
  useEffect(() => {
    updateTxToast(hasShownToast, {
      isPending,
      isConfirming,
      isConfirmed,
      error,
      hash,
      messages: {
        pending: "Processing third milestone payment...",
        confirming: "Confirming third milestone payment...",
        success: "Third milestone payment successful!",
      },
    });
    return () => {};
  }, [isPending, isConfirming, isConfirmed, error]);

  return (
    <button
      onClick={handlePayThirdMilestone}
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
      {isPending || isConfirming ? "Processing..." : "Pay Third Milestone"}
    </button>
  );
}

export default PayThirdMilestoneButton;
