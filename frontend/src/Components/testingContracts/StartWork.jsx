import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useStartWork } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function StartWork() {
  const { address, isConnected, chain } = useAccount();
  const [proposalId, setProposalId] = useState("");
  const {
    startWork,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    proposalData,
    proposalError,
  } = useStartWork(proposalId);

  // Check ETH balance for gas (0.001 ETH threshold)
  const { data: balanceData } = useBalance({ address });
  const hasEnoughGas = balanceData && balanceData.value >= 0.001 * 10 ** 18;

  // Validate bidder and proposal state
  const isBidder = proposalData?.bidder === address;
  const isFunded = proposalData?.state == 3; // Assuming ProposalState.Funded = 3
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;

  // Handle start work
  const handleStartWork = async () => {
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
    if (!proposalId && proposalId !== "0") {
      toast.error("Please enter a valid proposal ID.");
      return;
    }
    if (!isBidder) {
      toast.error("Only the proposal bidder can start work.");
      return;
    }
    if (!isFunded) {
      toast.error("Proposal must be in Funded state.");
      return;
    }
    if (proposalError) {
      toast.error("Error fetching proposal data: " + proposalError.message);
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
    let toastId;
    if (isPending) {
      toastId = toast.loading("Starting work...");
    } else if (isConfirming) {
      toastId = toast.loading("Confirming work start...");
    } else if (isConfirmed) {
      toastId = toast.success("Work started successfully!");
    } else if (error) {
      const isCancelled = error.code === 4001 || /rejected|denied|cancelled/i.test(error.message);
      toastId = toast.error(isCancelled ? "Transaction cancelled" : `Error: ${error.message}`);
    } else if (proposalError && (proposalId || proposalId === "0")) {
      toastId = toast.error("Error fetching proposal data: " + proposalError.message);
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isPending, isConfirming, isConfirmed, error, proposalError, proposalId]);

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Start Work</h3>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Proposal ID</label>
        <input
          type="number"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          placeholder="Enter proposal ID"
        />
      </div>
      <button
        onClick={handleStartWork}
        disabled={
          isPending ||
          isConfirming ||
          !hasEnoughGas ||
          !isConnected ||
          !isCorrectNetwork ||
          !proposalId ||
          !isBidder ||
          !isFunded ||
          proposalError
        }
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isPending ||
          isConfirming ||
          !hasEnoughGas ||
          !isConnected ||
          !isCorrectNetwork ||
          !proposalId ||
          !isBidder ||
          !isFunded ||
          proposalError
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isPending || isConfirming ? "Processing..." : "Start Work"}
      </button>
    </div>
  );
}

export default StartWork;