import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useOpenProposalToBid } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function OpenProposalToBid() {
  const { address, isConnected, chain } = useAccount();
  const [proposalId, setProposalId] = useState("");
  const { openProposalToBid, isPending, isConfirming, isConfirmed, error, hash } = useOpenProposalToBid();

  // Handle form submission
  const handleOpenProposal = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (chain?.id !== baseSepolia.id) {
      toast.error("Please switch to Base Sepolia network.");
      return;
    }
    if (!proposalId && proposalId !== "0") {
      toast.error("Please enter a valid proposal ID.");
      return;
    }

    try {
      console.log("Calling openProposalToBid with ID:", proposalId);
      await openProposalToBid(proposalId);
    } catch (err) {
      console.error("Open proposal error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states
  useEffect(() => {
    let toastId;
    if (isPending) {
      toastId = toast.loading("Opening proposal to bid...");
    } else if (isConfirming) {
      toastId = toast.loading("Confirming proposal opening...");
    } else if (isConfirmed) {
      toastId = toast.success("Proposal opened to bid successfully!");
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
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Open Proposal to Bid</h3>
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
        onClick={handleOpenProposal}
        disabled={isPending || isConfirming || !isConnected || chain?.id !== baseSepolia.id || !proposalId}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isPending || isConfirming || !isConnected || chain?.id !== baseSepolia.id || !proposalId
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isPending || isConfirming ? "Processing..." : "Open Proposal to Bid"}
      </button>
    </div>
  );
}

export default OpenProposalToBid;