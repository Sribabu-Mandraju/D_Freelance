import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useAcceptBid } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";
import { isAddress } from "viem";

function AcceptBid() {
  const { address, isConnected, chain } = useAccount();
  const [proposalId, setProposalId] = useState("");
  const [bidder, setBidder] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const { acceptBid, isPending, isConfirming, isConfirmed, error, hash } = useAcceptBid();

  // Handle form submission
  const handleAcceptBid = async () => {
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
    if (!isAddress(bidder)) {
      toast.error("Please enter a valid bidder address.");
      return;
    }
    if (!bidAmount || parseInt(bidAmount) <= 0) {
      toast.error("Please enter a valid bid amount greater than 0.");
      return;
    }

    try {
      console.log("Calling acceptBid with:", { proposalId, bidder, bidAmount });
      await acceptBid(proposalId, bidder, bidAmount);
    } catch (err) {
      console.error("Accept bid error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states
  useEffect(() => {
    let toastId;
    if (isPending) {
      toastId = toast.loading("Accepting bid...");
    } else if (isConfirming) {
      toastId = toast.loading("Confirming bid acceptance...");
    } else if (isConfirmed) {
      toastId = toast.success("Bid accepted successfully!");
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
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Accept Bid</h3>
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
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Bidder Address</label>
        <input
          type="text"
          value={bidder}
          onChange={(e) => setBidder(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          placeholder="Enter bidder address"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Bid Amount (in Wei)</label>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          placeholder="Enter bid amount"
        />
      </div>
      <button
        onClick={handleAcceptBid}
        disabled={
          isPending ||
          isConfirming ||
          !isConnected ||
          chain?.id !== baseSepolia.id ||
          !proposalId ||
          !isAddress(bidder) ||
          !bidAmount ||
          parseInt(bidAmount) <= 0
        }
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isPending ||
          isConfirming ||
          !isConnected ||
          chain?.id !== baseSepolia.id ||
          !proposalId ||
          !isAddress(bidder) ||
          !bidAmount ||
          parseInt(bidAmount) <= 0
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isPending || isConfirming ? "Processing..." : "Accept Bid"}
      </button>
    </div>
  );
}

export default AcceptBid;