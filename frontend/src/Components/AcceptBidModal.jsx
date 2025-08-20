import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useBids } from "../hooks/useBids";

const AcceptBidModal = ({
  isOpen,
  onClose,
  proposalId,
  proposalState,
  onBidAccepted,
}) => {
  const [selectedBid, setSelectedBid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserAddress, setCurrentUserAddress] = useState("");
  const [isClient, setIsClient] = useState(false);

  const bidsHook = useBids(proposalId);

  useEffect(() => {
    const address = localStorage.getItem("authAddress") || "";
    setCurrentUserAddress(address);

    // Check if current user is the client
    // This would typically come from the proposal data
    try {
      // For demo purposes, let's check if user has client role
      const userRole = localStorage.getItem("userRole");
      setIsClient(userRole === "client" || userRole === "admin");
    } catch (error) {
      console.error("Error checking user role:", error);
      setIsClient(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && proposalId) {
      bidsHook.fetchBids();
    }

    // Cleanup function to prevent memory leaks
    return () => {
      // Reset any loading states if component unmounts
      if (bidsHook.isLoading) {
        // This will be handled by the hook itself
      }
    };
  }, [isOpen, proposalId]);

  const handleAcceptBid = useCallback(
    async (bid) => {
      if (
        !window.confirm(
          `Are you sure you want to accept this bid for $${
            bid.bid_amount
          } from ${bid.wallet_address.slice(0, 6)}...${bid.wallet_address.slice(
            -4
          )}?`
        )
      ) {
        return;
      }

      try {
        setIsLoading(true);

        // Here you would typically call an API to accept the bid
        // For now, we'll show a success message
        toast.success(
          `Bid accepted! ${bid.wallet_address.slice(
            0,
            6
          )}...${bid.wallet_address.slice(-4)} has been selected.`
        );

        // You could also update the proposal state here
        // await updateProposalState(proposalId, 2); // Awarded state

        if (onBidAccepted) {
          onBidAccepted(bid);
        }

        onClose();
      } catch (error) {
        console.error("Error accepting bid:", error);
        toast.error("Failed to accept bid");
      } finally {
        setIsLoading(false);
      }
    },
    [onBidAccepted, onClose]
  );

  const handleBidSelection = useCallback((bid) => {
    setSelectedBid(bid);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
              Accept Bid
            </span>
          </h2>
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

        <div className="space-y-6">
          {/* Header Info */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Proposal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Proposal ID</p>
                <p className="text-white font-mono">{proposalId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Current State</p>
                <p className="text-blue-400 font-medium">
                  {proposalState === 1
                    ? "Open for Bidding"
                    : `State ${proposalState}`}
                </p>
              </div>
            </div>
          </div>

          {/* Bids Overview */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                Available Bids
              </h3>
              <div className="text-sm text-gray-400">
                {bidsHook.bids.length} bid
                {bidsHook.bids.length !== 1 ? "s" : ""} received
              </div>
            </div>

            {bidsHook.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-300 text-lg">Loading bids...</p>
                </div>
              </div>
            ) : bidsHook.error ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <div className="text-red-400 text-4xl mb-4">⚠️</div>
                <p className="text-red-400 text-lg mb-4">Error loading bids</p>
                <p className="text-gray-300 mb-6">{bidsHook.error}</p>
                <button
                  onClick={bidsHook.fetchBids}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : bidsHook.bids.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Bids Yet
                </h3>
                <p className="text-gray-400">
                  This proposal hasn't received any bids yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Sort and filter options */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>
                    Sorted by:{" "}
                    <span className="text-white font-medium">
                      Lowest Bid First
                    </span>
                  </span>
                  <span>•</span>
                  <span>
                    Total:{" "}
                    <span className="text-white font-medium">
                      {bidsHook.bids.length}
                    </span>
                  </span>
                </div>

                {/* Bids List */}
                {bidsHook.bids
                  .sort((a, b) => a.bid_amount - b.bid_amount)
                  .map((bid, index) => (
                    <div
                      key={bid._id}
                      className={`bg-gray-700/50 rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer hover:border-green-500/50 ${
                        selectedBid?._id === bid._id
                          ? "border-green-500 bg-green-500/10"
                          : "border-gray-600 hover:bg-gray-700/70"
                      }`}
                      onClick={() => handleBidSelection(bid)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                              selectedBid?._id === bid._id
                                ? "bg-green-500"
                                : "bg-gradient-to-br from-blue-500 to-purple-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm text-gray-400">
                                {bid.wallet_address.slice(0, 6)}...
                                {bid.wallet_address.slice(-4)}
                              </span>
                              {index === 0 && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                                  Lowest Bid
                                </span>
                              )}
                              {selectedBid?._id === bid._id && (
                                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                                  Selected
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              Submitted{" "}
                              {new Date(bid.createdAt).toLocaleDateString()} at{" "}
                              {new Date(bid.createdAt).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            ${bid.bid_amount.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-400">USD</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-white text-sm leading-relaxed line-clamp-2">
                          {bid.cover_letter}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Selected Bid Details */}
          {selectedBid && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-400 mb-4">
                Selected Bid Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">
                    Bidder Information
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-400">Wallet Address</p>
                      <p className="text-white font-mono">
                        {selectedBid.wallet_address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Bid Amount</p>
                      <p className="text-2xl font-bold text-green-400">
                        ${selectedBid.bid_amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Submitted</p>
                      <p className="text-white">
                        {new Date(selectedBid.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-white mb-3">
                    Cover Letter
                  </h4>
                  <div className="bg-gray-800 rounded-lg p-4 max-h-32 overflow-y-auto">
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedBid.cover_letter}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>

            {selectedBid && (
              <button
                onClick={() => handleAcceptBid(selectedBid)}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-colors font-medium font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Accept Selected Bid
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptBidModal;
