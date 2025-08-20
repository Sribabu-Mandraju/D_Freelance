import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const BidList = ({ proposalId, onBidUpdated, onBidDeleted, useBidsHook }) => {
  const [editingBid, setEditingBid] = useState(null);
  const [editForm, setEditForm] = useState({
    cover_letter: "",
    bid_amount: "",
  });
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const {
    bids,
    isLoading,
    error,
    updateBid,
    deleteBid,
    fetchBids,
  } = useBidsHook;

  useEffect(() => {
    setCurrentUserAddress(localStorage.getItem("authAddress") || "");
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
      // Error is already handled by the hook
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
      // Error is already handled by the hook
      console.error("Error deleting bid:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="text-gray-300">Loading bids...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <p className="text-red-400 text-sm">Error loading bids: {error}</p>
        <button
          onClick={fetchBids}
          className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400">No bids yet for this proposal.</p>
        <p className="text-gray-500 text-sm mt-1">
          Be the first to place a bid!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Bids ({bids.length})
      </h3>

      {bids.map((bid) => (
        <div
          key={bid._id}
          className="bg-gray-800 rounded-lg p-4 border border-gray-700"
        >
          {editingBid === bid._id ? (
            // Edit mode
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
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
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bid Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">$</span>
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
                    className="w-full pl-8 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateBid(bid._id)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Display mode
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {bid.wallet_address.slice(0, 6)}...
                    {bid.wallet_address.slice(-4)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(bid.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {currentUserAddress === bid.wallet_address && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBid(bid)}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="text-red-400 hover:text-red-300 text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <p className="text-white text-sm leading-relaxed">
                  {bid.cover_letter}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-green-400">
                  ${bid.bid_amount.toFixed(2)}
                </span>

                {bid.updatedAt && bid.updatedAt !== bid.createdAt && (
                  <span className="text-xs text-gray-500">
                    Updated {new Date(bid.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BidList;
