import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { usePlaceBid } from "../interactions/HFTtoken__interactions";
import { toUSDC6 } from "../utils/units";

const BidForm = ({
  proposalId,
  onChainProposalId, // numeric on-chain proposal id
  onBidSubmitted,
  isOpen,
  onClose,
  createBid,
}) => {
  const [formData, setFormData] = useState({
    cover_letter: "",
    bid_amount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isOnChainProcessing, setIsOnChainProcessing] = useState(false);

  // On-chain interactions (25 HFT stake to place bid)
  const {
    approveHFT,
    placeBid,
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    isBidPending,
    isBidConfirming,
    isBidConfirmed,
    allowance,
    hftBalance,
    allowanceError,
    hftBalanceError,
  } = usePlaceBid();

  useEffect(() => {
    // Get wallet address from localStorage
    const address = localStorage.getItem("authAddress");
    setWalletAddress(address);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!formData.cover_letter.trim()) {
      toast.error("Cover letter is required");
      return;
    }

    if (!formData.bid_amount || parseFloat(formData.bid_amount) <= 0) {
      toast.error("Please enter a valid bid amount");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1) Require on-chain step: approve 25 HFT (if needed) and placeBid
      if (!onChainProposalId && onChainProposalId !== 0) {
        toast.error("On-chain proposal ID is missing. Try again later.");
        setIsSubmitting(false);
        return;
      }

      setIsOnChainProcessing(true);
      const requiredHft = BigInt(25n * 10n ** 18n);
      if (allowanceError) throw new Error(allowanceError.message);
      if (hftBalanceError) throw new Error(hftBalanceError.message);
      if (hftBalance < requiredHft) {
        throw new Error(
          "Insufficient HFT balance. You need 25 HFT to place a bid."
        );
      }
      if (allowance < requiredHft) {
        await approveHFT(requiredHft);
      }
      await placeBid(onChainProposalId);
      setIsOnChainProcessing(false);

      // 2) After on-chain success, create bid in backend (store USD as number)
      let safeUsd = Number(formData.bid_amount);
      if (!isFinite(safeUsd) || safeUsd <= 0) {
        throw new Error("Invalid bid amount");
      }
      const bidData = await createBid({
        ...formData,
        bid_amount: safeUsd,
      });

      // Reset form
      setFormData({
        cover_letter: "",
        bid_amount: "",
      });

      // Close modal and notify parent
      onClose();
      if (onBidSubmitted) {
        onBidSubmitted(bidData);
      }
    } catch (error) {
      // Error is already handled by the hook
      console.error("Error submitting bid:", error);
    } finally {
      setIsSubmitting(false);
      setIsOnChainProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Place Your Bid</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="cover_letter"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Cover Letter *
            </label>
            <textarea
              id="cover_letter"
              name="cover_letter"
              value={formData.cover_letter}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Explain why you're the best fit for this project..."
              required
            />
          </div>

          <div>
            <label
              htmlFor="bid_amount"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Bid Amount (USD) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">$</span>
              <input
                type="number"
                id="bid_amount"
                name="bid_amount"
                value={formData.bid_amount}
                onChange={handleInputChange}
                step="0.01"
                min="0.01"
                className="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isSubmitting ||
                isOnChainProcessing ||
                isApprovePending ||
                isBidPending ||
                isApproveConfirming ||
                isBidConfirming
              }
            >
              {isSubmitting ||
              isOnChainProcessing ||
              isApprovePending ||
              isBidPending ||
              isApproveConfirming ||
              isBidConfirming ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Submit Bid"
              )}
            </button>
          </div>
        </form>

        {walletAddress && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidForm;
