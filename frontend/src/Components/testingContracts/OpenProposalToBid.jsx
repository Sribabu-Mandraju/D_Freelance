import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useOpenProposalToBid } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function OpenProposalToBidButton({ proposalId }) {
  const { address, isConnected, chain } = useAccount();
  const {
    openProposalToBid,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  } = useOpenProposalToBid();

  // Handle button click
  const handleOpenProposal = async () => {
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
      const isCancelled =
        error.code === 4001 || /rejected|denied|cancelled/i.test(error.message);
      toastId = toast.error(
        isCancelled ? "Transaction cancelled" : `Error: ${error.message}`
      );
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isPending, isConfirming, isConfirmed, error]);

  return (
    <button
      onClick={handleOpenProposal}
      // disabled={
      //   isPending ||
      //   isConfirming ||
      //   !isConnected ||
      //   chain?.id !== baseSepolia.id ||
      //   proposalId === undefined || proposalId === null || proposalId === ""
      // }
      className={`
        relative w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300
        bg-blue-600 hover:bg-blue-700 text-white
        disabled:bg-gray-600 disabled:cursor-not-allowed
      `}
    >
      {isPending || isConfirming ? "Processing..." : "Open Proposal to Bid"}
    </button>
  );
}

export default OpenProposalToBidButton;
