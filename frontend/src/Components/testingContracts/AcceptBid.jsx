import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { useAcceptBid } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";
import { isAddress } from "viem";
import { updateTxToast } from "../../utils/txToast";

function AcceptBidButton({ proposalId, bidder, bidAmount }) {
  const { address, isConnected, chain } = useAccount();
  const {
    acceptBid,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  } = useAcceptBid();

  // Handle button click
  const handleAcceptBid = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (chain?.id !== baseSepolia.id) {
      toast.error("Please switch to Base Sepolia network.");
      return;
    }
    if (proposalId === undefined || proposalId === null || proposalId === "") {
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
  const toastIdRef = useRef(null);
  useEffect(() => {
    updateTxToast(toastIdRef, {
      isPending,
      isConfirming,
      isConfirmed,
      error,
      hash,
      messages: {
        pending: "Accepting bid...",
        confirming: "Confirming bid acceptance...",
        success: "Bid accepted successfully!",
      },
    });
    return () => {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
    };
  }, [isPending, isConfirming, isConfirmed, error]);

  return (
    <button
      onClick={handleAcceptBid}
      // disabled={
      //   isPending ||
      //   isConfirming ||
      //   !isConnected ||
      //   chain?.id !== baseSepolia.id ||
      //   proposalId === undefined || proposalId === null || proposalId === "" ||
      //   !isAddress(bidder) ||
      //   !bidAmount ||
      //   parseInt(bidAmount) <= 0
      // }
      className={`
        relative w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300
        bg-blue-600 hover:bg-blue-700 text-white
        disabled:bg-gray-600 disabled:cursor-not-allowed
      `}
    >
      {isPending || isConfirming ? "Processing..." : "Accept Bid"}
    </button>
  );
}

export default AcceptBidButton;
