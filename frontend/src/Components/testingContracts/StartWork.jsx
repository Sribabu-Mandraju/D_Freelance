import { useState, useEffect, useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import { useStartWork } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function StartWork() {
  const { address, isConnected, chain } = useAccount();
  const [proposalMetaData, setProposalMetaData] = useState({}); // Reserved for future metadata
  const [proposalId, setProposalId] = useState("");
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
    // Dismiss previous toast if it exists
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }

    if (isPending) {
      toastIdRef.current = toast.loading("Starting work...");
    } else if (isConfirming) {
      toastIdRef.current = toast.loading("Confirming work start...");
    } else if (isConfirmed) {
      toastIdRef.current = toast.success("Work started successfully!");
    } else if (error) {
      const isCancelled =
        error.code === 4001 || /rejected|denied|cancelled/i.test(error.message);
      toastIdRef.current = toast.error(
        isCancelled
          ? "Transaction cancelled"
          : `Error: ${error.message.slice(0, 100)}...`
      );
    }

    // Cleanup on unmount
    return () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
  }, [isPending, isConfirming, isConfirmed, error]);

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Start Work</h3>
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
        onClick={handleStartWork}
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
        {isPending || isConfirming ? "Processing..." : "Start Work"}
      </button>
    </div>
  );
}

export default StartWork;
