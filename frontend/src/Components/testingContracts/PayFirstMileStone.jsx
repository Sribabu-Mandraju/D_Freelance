import { useState, useEffect, useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import { usePayFirstMilestone } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function PayFirstMilestone() {
  const { address, isConnected, chain } = useAccount();
  const [proposalMetaData, setProposalMetaData] = useState({}); // Reserved for future metadata
  const [proposalId, setProposalId] = useState("");
  const {
    payFirstMilestone,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  } = usePayFirstMilestone();

  // Check ETH balance for gas (0.001 ETH threshold)
  const { data: balanceData } = useBalance({ address });
  const hasEnoughGas = balanceData && balanceData.value >= 0.001 * 10 ** 18;

  // Validate proposal ID and network
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;
  const isValidProposalId = proposalId !== "" && Number.isInteger(Number(proposalId));

  // Ref to track if toast has been shown
  const hasShownToast = useRef(false);

  // Handle pay first milestone
  const handlePayFirstMilestone = async () => {
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
      console.log("Calling payFirstMilestone with proposalId:", proposalId);
      hasShownToast.current = false; // Reset toast flag
      await payFirstMilestone(proposalId);
    } catch (err) {
      console.error("Pay first milestone error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states
  useEffect(() => {
    let toastId;
    if (isPending && !hasShownToast.current) {
      toastId = toast.loading("Processing first milestone payment...");
      hasShownToast.current = true;
    } else if (isConfirming && !hasShownToast.current) {
      toastId = toast.loading("Confirming first milestone payment...");
      hasShownToast.current = true;
    } else if (isConfirmed && !hasShownToast.current) {
      toastId = toast.success("First milestone payment successful!");
      hasShownToast.current = true;
    } else if (error && !hasShownToast.current) {
      const isCancelled = error.code === 4001 || /rejected|denied|cancelled/i.test(error.message);
      toastId = toast.error(
        isCancelled ? "Transaction cancelled" : `Error: ${error.message}`
      );
      hasShownToast.current = true;
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isPending, isConfirming, isConfirmed, error]);

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Pay First Milestone</h3>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Proposal ID</label>
        <input
          type="number"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="Enter proposal ID"
        />
      </div>
      <button
        onClick={handlePayFirstMilestone}
        disabled={
          isPending ||
          isConfirming ||
          !hasEnoughGas ||
          !isConnected ||
          !isCorrectNetwork ||
          !isValidProposalId
        }
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${
          isPending ||
          isConfirming ||
          !hasEnoughGas ||
          !isConnected ||
          !isCorrectNetwork ||
          !isValidProposalId
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-700"
        }`}
      >
        {isPending || isConfirming ? "Processing..." : "Pay First Milestone"}
      </button>
    </div>
  );
}

export default PayFirstMilestone;