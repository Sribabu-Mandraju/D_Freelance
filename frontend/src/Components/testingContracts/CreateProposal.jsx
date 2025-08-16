import { useState, useEffect, useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import { useCreateProposal } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function CreateProposal() {
  const { address, isConnected, chain } = useAccount();
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [proposalMetaData, setProposalMetaData] = useState({}); // Reserved for future metadata
  const {
    createProposal,
    isPending,
    isConfirming,
    isConfirmed,
    receipt,
    error,
    hash,
    proposalEvent,
  } = useCreateProposal();

  // Check ETH balance for gas (0.001 ETH threshold)
  const { data: balanceData } = useBalance({ address });
  const hasEnoughGas = balanceData && balanceData.value >= 0.001 * 10 ** 18;

  // Convert inputs to numbers for validation
  const deadlineTimestamp = parseInt(deadline) || 0;
  const budgetValue = parseInt(budget) || 0;
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;

  // Ref to track toast IDs for each state
  const toastIdRef = useRef(null);

  // Handle form submission
  const handleCreateProposal = async () => {
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
    if (!deadline || deadlineTimestamp <= Math.floor(Date.now() / 1000)) {
      toast.error("Please enter a valid deadline in the future (Unix timestamp).");
      return;
    }
    if (!budget || budgetValue <= 0) {
      toast.error("Please enter a valid budget greater than 0 (in Wei).");
      return;
    }

    try {
      console.log("Calling createProposal with:", { deadline: deadlineTimestamp, budget: budgetValue });
      await createProposal(BigInt(deadlineTimestamp), BigInt(budgetValue));
    } catch (err) {
      console.error("Create proposal error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states and event
  useEffect(() => {
    // Dismiss previous toast if it exists
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }

    if (isPending) {
      toastIdRef.current = toast.loading("Creating proposal...");
    } else if (isConfirming) {
      toastIdRef.current = toast.loading("Confirming proposal creation...");
    } else if (isConfirmed && proposalEvent) {
      toastIdRef.current = toast.success(
        `Proposal created successfully! Proposal ID: ${Number(proposalEvent.proposalId)}`
      );
    } else if (isConfirmed && !proposalEvent) {
      toastIdRef.current = toast.error(
        `Proposal created, but failed to fetch Proposal ID. Transaction hash: ${hash}. Check Base Sepolia explorer at https://sepolia.basescan.org/tx/${hash}.`
      );
    } else if (error) {
      const isCancelled = error.code === 4001 || /rejected|denied|cancelled/i.test(error.message);
      toastIdRef.current = toast.error(
        isCancelled ? "Transaction cancelled" : `Error: ${error.message}`
      );
    }

    // Cleanup on unmount
    return () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
  }, [isPending, isConfirming, isConfirmed, error, hash, proposalEvent]);

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Create Proposal</h3>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Deadline (Unix Timestamp)</label>
        <input
          type="number"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="Enter deadline (Unix timestamp)"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Budget (in Wei)</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="Enter budget (in Wei)"
        />
      </div>
      <button
        onClick={handleCreateProposal}
        disabled={
          isPending ||
          isConfirming ||
          !hasEnoughGas ||
          !isConnected ||
          !isCorrectNetwork 
          // !deadline ||
          // deadlineTimestamp <= Math.floor(Date.now() / 1000) ||
          // !budget ||
          // budgetValue <= 0
        }
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${
          isPending ||
          isConfirming ||
          !hasEnoughGas ||
          !isConnected ||
          !isCorrectNetwork ||
          !deadline ||
          deadlineTimestamp <= Math.floor(Date.now() / 1000) ||
          !budget ||
          budgetValue <= 0
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-700"
        }`}
      >
        {isPending || isConfirming ? "Processing..." : "Create Proposal"}
      </button>
    </div>
  );
}

export default CreateProposal;