import { useState } from "react";
import { toast } from "react-hot-toast";
import AcceptBidModal from "./AcceptBidModal";
import AcceptBidButtonContract from "./testingContracts/AcceptBid";
import { toUSDC6 } from "../utils/units";

const AcceptBidButton = ({
  proposalId,
  proposalState,
  onBidAccepted,
  bidData = null, // New prop for direct bid acceptance
  className = "",
  children = "Accept Bid",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(bidData);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBid(null);
  };

  const handleBidAccepted = (acceptedBid) => {
    setSelectedBid(acceptedBid);
    // Close the bid selection modal and show smart contract integration
    setIsModalOpen(false);
  };

  // If bidData is provided, this is a direct bid acceptance (no modal needed)
  const handleDirectAccept = () => {
    if (bidData) {
      setSelectedBid(bidData);
    }
  };

  const handleSmartContractSuccess = () => {
    if (onBidAccepted) {
      onBidAccepted(selectedBid);
    }
    setSelectedBid(null);
  };

  return (
    <>
      <button
        onClick={bidData ? handleDirectAccept : handleOpenModal}
        className={`relative transition-all duration-300 ${
          bidData
            ? "bg-green-600 hover:bg-green-700"
            : "w-full py-3 px-6 rounded-lg font-semibold text-lg bg-blue-600 hover:bg-blue-700"
        } text-white ${className}`}
      >
        {children}
      </button>

      <AcceptBidModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        proposalId={proposalId}
        proposalState={proposalState}
        onBidAccepted={handleBidAccepted}
      />

      {/* Smart Contract Integration Modal */}
      {selectedBid && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Smart Contract Integration
                </span>
              </h2>
              <button
                onClick={() => setSelectedBid(null)}
                className="text-gray-400 hover:text-white transition-colors"
                title="Back to bid selection"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Selected Bid Summary */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Selected Bid Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Bidder Address</p>
                    <p className="text-white font-mono text-sm">
                      {selectedBid.wallet_address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Bid Amount</p>
                    <p className="text-2xl font-bold text-green-400">
                      ${selectedBid.bid_amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Smart Contract Button */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  Execute on Blockchain
                </h3>
                <p className="text-gray-300 mb-4">
                  This will execute the bid acceptance on the blockchain using
                  your smart contract.
                </p>
                <AcceptBidButtonContract
                  proposalId={proposalId}
                  bidder={selectedBid.wallet_address}
                  bidAmount={toUSDC6(selectedBid.bid_amount).toString()}
                  onSuccess={handleSmartContractSuccess}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setSelectedBid(null)}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                >
                  Back to Bids
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AcceptBidButton;
