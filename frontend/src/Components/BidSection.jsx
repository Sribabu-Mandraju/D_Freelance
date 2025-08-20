import { useState, useEffect } from "react";
import BidForm from "./BidForm";
import BidList from "./BidList";
import { useBids } from "../hooks/useBids";

const BidSection = ({ proposalId, proposalState }) => {
  const [showBidForm, setShowBidForm] = useState(false);
  const bidsHook = useBids(proposalId);

  // Check if proposal is open for bidding
  const isOpenForBidding = proposalState === 1; // State 1 = Open

  // Don't render if no proposal ID
  if (!proposalId) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-center text-gray-400">
          <p>Proposal ID not available</p>
        </div>
      </div>
    );
  }

  const handleBidSubmitted = (newBid) => {
    // Refresh the bid list
    bidsHook.refreshBids();
    setShowBidForm(false);
  };

  const handleBidUpdated = (updatedBid) => {
    // Refresh the bid list
    bidsHook.refreshBids();
  };

  const handleBidDeleted = (deletedBidId) => {
    // Refresh the bid list
    bidsHook.refreshBids();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Bidding</h2>

        {isOpenForBidding && (
          <button
            onClick={() => setShowBidForm(!showBidForm)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showBidForm
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {showBidForm ? "Cancel Bid" : "Place Bid"}
          </button>
        )}
      </div>

      {!isOpenForBidding && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
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
      )}

      {showBidForm && isOpenForBidding && (
        <div className="mb-6">
          <BidForm
            proposalId={proposalId}
            onBidSubmitted={handleBidSubmitted}
            isOpen={showBidForm}
            onClose={() => setShowBidForm(false)}
            createBid={bidsHook.createBid}
          />
        </div>
      )}

      <BidList
        proposalId={proposalId}
        onBidUpdated={handleBidUpdated}
        onBidDeleted={handleBidDeleted}
        useBidsHook={bidsHook}
      />
    </div>
  );
};

export default BidSection;
