import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useBids } from "../hooks/useBids";
import BidForm from "./BidForm";
import AcceptBidButton from "./AcceptBidButton";

const BidsTabContent = ({ proposalId, proposalState, proposalData }) => {
  const [showBidForm, setShowBidForm] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [showBidPreview, setShowBidPreview] = useState(false);
  const [currentUserAddress, setCurrentUserAddress] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [proposalOwner, setProposalOwner] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  const bidsHook = useBids(proposalId);

  useEffect(() => {
    const address = localStorage.getItem("authAddress") || "";
    setCurrentUserAddress(address);

    // Check if current user is the proposal owner (client)
    // This would typically come from the proposal data
    const checkUserRole = async () => {
      try {
        // For demo purposes, let's check if the user is the proposal owner
        // In a real app, this would come from the proposal data or user role
        if (
          proposalData &&
          proposalData.client &&
          proposalData.client.wallet_address
        ) {
          const isOwner = address === proposalData.client.wallet_address;
          setIsClient(isOwner);
          setProposalOwner(proposalData.client.wallet_address);
        } else {
          // Fallback: check if user has admin role or is the proposal creator
          const userRole = localStorage.getItem("userRole");
          setIsClient(userRole === "client" || userRole === "admin");
        }

        // Override with demo mode if enabled
        if (demoMode) {
          setIsClient(true);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setIsClient(false);
      }
    };

    checkUserRole();
  }, [proposalData, demoMode]);

  // Check if proposal is open for bidding
  const isOpenForBidding = proposalState === 1;

  const handleBidSubmitted = (newBid) => {
    bidsHook.refreshBids();
    setShowBidForm(false);
    toast.success("Bid submitted successfully!");
  };

  const handleBidUpdated = (updatedBid) => {
    bidsHook.refreshBids();
    toast.success("Bid updated successfully!");
  };

  const handleBidDeleted = (deletedBidId) => {
    bidsHook.refreshBids();
    toast.success("Bid deleted successfully!");
  };

  const handlePreviewBid = (bid) => {
    setSelectedBid(bid);
    setShowBidPreview(true);
  };

  if (!proposalId) {
    return (
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
        <div className="text-center text-gray-400">
          <p>Proposal ID not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
              Bids & Proposals
            </span>
          </h3>

          <div className="flex items-center gap-3">
            {/* Demo Mode Toggle */}
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                demoMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-600 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {demoMode ? "Client Mode" : "Demo Mode"}
            </button>

            {isOpenForBidding && currentUserAddress && (
              <button
                onClick={() => setShowBidForm(!showBidForm)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  showBidForm
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/25"
                }`}
              >
                {showBidForm ? (
                  <span className="flex items-center gap-2">
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancel Bid
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Place Your Bid
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
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
              <div>
                <p className="text-sm text-gray-400">Total Bids</p>
                <p className="text-2xl font-bold text-blue-400">
                  {bidsHook.bids.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Lowest Bid</p>
                <p className="text-2xl font-bold text-green-400">
                  $
                  {bidsHook.bids.length > 0
                    ? Math.min(
                        ...bidsHook.bids.map((b) => b.bid_amount)
                      ).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Highest Bid</p>
                <p className="text-2xl font-bold text-purple-400">
                  $
                  {bidsHook.bids.length > 0
                    ? Math.max(
                        ...bidsHook.bids.map((b) => b.bid_amount)
                      ).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!isOpenForBidding && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-yellow-400 text-sm">
                {proposalState === 0 &&
                  "This proposal is still in draft mode and not open for bidding yet."}
                {proposalState === 2 &&
                  "This proposal has been awarded and is no longer accepting bids."}
                {proposalState === 3 &&
                  "This proposal has been funded and is no longer accepting bids."}
                {proposalState === 4 &&
                  "Work has started on this proposal and it's no longer accepting bids."}
                {proposalState >= 5 &&
                  "This proposal is in progress and no longer accepting bids."}
                {proposalState === 9 &&
                  "This proposal is under dispute and not accepting bids."}
                {proposalState === 10 &&
                  "This proposal has been cancelled and is not accepting bids."}
                {proposalState === 11 &&
                  "This proposal has been refunded and is not accepting bids."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bid Form Section */}
      {showBidForm && isOpenForBidding && (
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
          <BidForm
            proposalId={proposalId}
            onChainProposalId={
              (proposalData &&
                proposalData.contractData &&
                proposalData.contractData.contractProposalId) ||
              (proposalData && proposalData.proposalId) ||
              null
            }
            onBidSubmitted={handleBidSubmitted}
            isOpen={showBidForm}
            onClose={() => setShowBidForm(false)}
            createBid={bidsHook.createBid}
          />
        </div>
      )}

      {/* Bids List Section */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
        <BidsList
          proposalId={proposalId}
          onBidUpdated={handleBidUpdated}
          onBidDeleted={handleBidDeleted}
          useBidsHook={bidsHook}
          onPreviewBid={handlePreviewBid}
          isClient={isClient}
          currentUserAddress={currentUserAddress}
        />
      </div>

      {/* Bid Preview Modal */}
      {showBidPreview && selectedBid && (
        <BidPreviewModal
          bid={selectedBid}
          onClose={() => setShowBidPreview(false)}
          isClient={isClient}
        />
      )}
    </div>
  );
};

// Enhanced BidsList Component
const BidsList = ({
  proposalId,
  onBidUpdated,
  onBidDeleted,
  useBidsHook,
  onPreviewBid,
  isClient,
  currentUserAddress,
}) => {
  const [editingBid, setEditingBid] = useState(null);
  const [editForm, setEditForm] = useState({
    cover_letter: "",
    bid_amount: "",
  });

  const {
    bids,
    isLoading,
    error,
    updateBid,
    deleteBid,
    fetchBids,
  } = useBidsHook;

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  const handleEditBid = (bid) => {
    setEditingBid(bid._id);
    setEditForm({
      cover_letter: bid.cover_letter,
      bid_amount: bid.bid_amount.toString(),
    });
  };

  const handleCancelEdit = () => {
    setEditingBid(null);
    setEditForm({
      cover_letter: "",
      bid_amount: "",
    });
  };

  const handleUpdateBid = async (bidId) => {
    try {
      const updatedBid = await updateBid(bidId, editForm);
      setEditingBid(null);
      setEditForm({
        cover_letter: "",
        bid_amount: "",
      });
      if (onBidUpdated) {
        onBidUpdated(updatedBid);
      }
    } catch (error) {
      console.error("Error updating bid:", error);
    }
  };

  const handleDeleteBid = async (bidId) => {
    if (!window.confirm("Are you sure you want to delete this bid?")) {
      return;
    }

    try {
      await deleteBid(bidId);
      if (onBidDeleted) {
        onBidDeleted(bidId);
      }
    } catch (error) {
      console.error("Error deleting bid:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading bids...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <p className="text-red-400 text-lg mb-4">Error loading bids</p>
        <p className="text-gray-300 mb-6">{error}</p>
        <button
          onClick={fetchBids}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-orange-400"
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
        <h3 className="text-xl font-semibold text-white mb-2">No Bids Yet</h3>
        <p className="text-gray-400 mb-4">
          Be the first to place a bid on this proposal!
        </p>
        <div className="text-sm text-gray-500">
          <p>• Show your expertise with a compelling cover letter</p>
          <p>• Set a competitive bid amount</p>
          <p>• Stand out from the competition</p>
        </div>
      </div>
    );
  }

  // Sort bids by amount (lowest first)
  const sortedBids = [...bids].sort((a, b) => a.bid_amount - b.bid_amount);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
          All Bids ({bids.length})
        </span>
      </h3>

      {sortedBids.map((bid, index) => (
        <div
          key={bid._id}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300"
        >
          {editingBid === bid._id ? (
            // Edit mode
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={editForm.cover_letter}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      cover_letter: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Explain why you're the best fit for this project..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bid Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">$</span>
                  <input
                    type="number"
                    value={editForm.bid_amount}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        bid_amount: e.target.value,
                      }))
                    }
                    step="0.01"
                    min="0.01"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleUpdateBid(bid._id)}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Display mode
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
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
                    </div>
                    <div className="text-xs text-gray-500">
                      Submitted {new Date(bid.createdAt).toLocaleDateString()}{" "}
                      at {new Date(bid.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPreviewBid(bid)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors font-medium"
                  >
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Preview
                    </span>
                  </button>

                  {isClient && (
                    <AcceptBidButton
                      proposalId={proposalId}
                      proposalState={proposalState}
                      bidData={bid}
                      onBidAccepted={(acceptedBid) => {
                        toast.success(
                          `Bid accepted successfully! ${acceptedBid.wallet_address.slice(
                            0,
                            6
                          )}...${acceptedBid.wallet_address.slice(
                            -4
                          )} has been selected.`
                        );
                        // Refresh the bids list
                        bidsHook.refreshBids();
                      }}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors font-medium"
                    >
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
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
                        Accept
                      </span>
                    </AcceptBidButton>
                  )}

                  {currentUserAddress === bid.wallet_address && (
                    <>
                      <button
                        onClick={() => handleEditBid(bid)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors font-medium"
                      >
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteBid(bid._id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors font-medium"
                      >
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-white text-sm leading-relaxed line-clamp-3">
                  {bid.cover_letter}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-green-400">
                    ${bid.bid_amount.toFixed(2)}
                  </span>

                  {bid.updatedAt && bid.updatedAt !== bid.createdAt && (
                    <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
                      Updated {new Date(bid.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-400">Bid Rank</div>
                  <div className="text-lg font-semibold text-orange-400">
                    #{index + 1}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Bid Preview Modal Component
const BidPreviewModal = ({ bid, onClose, isClient }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Bid Details</h2>
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
          {/* Bidder Info */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Bidder Information
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">
                  {bid.wallet_address.slice(0, 6)}...
                  {bid.wallet_address.slice(-4)}
                </p>
                <p className="text-gray-400 text-sm">
                  Submitted {new Date(bid.createdAt).toLocaleDateString()} at{" "}
                  {new Date(bid.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Cover Letter
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {bid.cover_letter}
            </p>
          </div>

          {/* Bid Amount */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Bid Amount
            </h3>
            <div className="text-center">
              <span className="text-4xl font-bold text-green-400">
                ${bid.bid_amount.toFixed(2)}
              </span>
              <p className="text-gray-400 text-sm mt-2">USD</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
            >
              Close
            </button>

            {isClient && (
              <button
                onClick={() => {
                  onAcceptBid(bid);
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-colors font-medium font-semibold"
              >
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
                  Accept This Bid
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsTabContent;
