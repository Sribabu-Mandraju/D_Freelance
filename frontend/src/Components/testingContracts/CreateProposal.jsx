import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useCreateProposal } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function CreateProposal() {
  const { address, isConnected, chain } = useAccount();
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const { createProposal, isPending, isConfirming, isConfirmed, error, hash } = useCreateProposal();

  // Handle form submission
  const handleCreateProposal = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (chain?.id !== baseSepolia.id) {
      toast.error("Please switch to Base Sepolia network.");
      return;
    }

    const deadlineUnix = Math.floor(new Date(deadline).getTime() / 1000); // Convert to Unix timestamp
    const budgetValue = parseInt(budget);

    try {
      await createProposal(BigInt(deadlineUnix), BigInt(budgetValue));
    } catch (err) {
      console.error("Create proposal error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states
  useEffect(() => {
    let toastId;
    if (isPending) {
      toastId = toast.loading("Creating proposal...");
    } else if (isConfirming) {
      toastId = toast.loading("Confirming proposal creation...");
    } else if (isConfirmed) {
      toastId = toast.success("Proposal created successfully!");
    } else if (error) {
      const isCancelled = error.code === 4001 || /rejected|denied|cancelled/i.test(error.message);
      toastId = toast.error(isCancelled ? "Transaction cancelled" : `Error: ${error.message}`);
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isPending, isConfirming, isConfirmed, error]);

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Create Proposal</h3>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Deadline (YYYY-MM-DD HH:MM)</label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Budget (in Wei)</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          placeholder="Enter budget"
        />
      </div>
      <button
        onClick={handleCreateProposal}
        disabled={isPending || isConfirming || !isConnected || chain?.id !== baseSepolia.id || !deadline || !budget}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isPending || isConfirming || !isConnected || chain?.id !== baseSepolia.id || !deadline || !budget
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isPending || isConfirming ? "Processing..." : "Create Proposal"}
      </button>
    </div>
  );
}

export default CreateProposal;