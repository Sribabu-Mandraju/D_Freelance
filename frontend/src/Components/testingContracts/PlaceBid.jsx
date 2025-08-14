import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { usePlaceBid } from "../../interactions/HFTtoken__interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function PlaceBid() {
  const { address, isConnected, chain } = useAccount();
  const [proposalId, setProposalId] = useState("");
  const [amount, setAmount] = useState("10"); // Default 10 HFT
  const {
    approveHFT,
    placeBid,
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    isBidPending,
    isBidConfirming,
    isBidConfirmed,
    bidError,
    allowance,
    hftBalance,
    allowanceError,
    hftBalanceError,
  } = usePlaceBid();

  // Check ETH balance for gas (0.001 ETH threshold)
  const { data: balanceData } = useBalance({ address });
  const hasEnoughGas = balanceData && balanceData.value >= 0.001 * 10 ** 18;

  // Convert amount to BigInt (18 decimals for HFT)
  const hftAmount = BigInt(Number(amount) * 10 ** 18); // Assuming 18 decimals
  const hasEnoughHFT = hftBalance >= hftAmount;
  const hasEnoughAllowance = allowance >= hftAmount;
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;

  // Handle HFT approval
  const handleApproveHFT = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to approve HFT.");
      return;
    }
    if (!isCorrectNetwork) {
      toast.error("Please switch to Base Sepolia network.");
      return;
    }
    if (!hasEnoughGas) {
      toast.error("Insufficient ETH for gas fees (minimum 0.001 ETH).");
      return;
    }
    if (!hasEnoughHFT) {
      toast.error(`Insufficient HFT balance (need ${Number(hftAmount) / 10 ** 18} HFT).`);
      return;
    }
    if (allowanceError) {
      toast.error("Error checking HFT allowance: " + allowanceError.message);
      return;
    }
    if (hftBalanceError) {
      toast.error("Error checking HFT balance: " + hftBalanceError.message);
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid HFT amount.");
      return;
    }

    try {
      console.log("Calling approveHFT with amount:", hftAmount.toString());
      await approveHFT(hftAmount);
    } catch (err) {
      console.error("Approval error:", err);
      // Toast handled in useEffect
    }
  };

  // Handle place bid
  const handlePlaceBid = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to place bid.");
      return;
    }
    if (!isCorrectNetwork) {
      toast.error("Please switch to Base Sepolia network.");
      return;
    }
    if (!hasEnoughGas) {
      toast.error("Insufficient ETH for gas fees (minimum 0.001 ETH).");
      return;
    }
    if (!hasEnoughHFT) {
      toast.error(`Insufficient HFT balance (need ${Number(hftAmount) / 10 ** 18} HFT).`);
      return;
    }
    if (!hasEnoughAllowance) {
      toast.error("Please approve HFT first.");
      return;
    }
    if (allowanceError) {
      toast.error("Error checking HFT allowance: " + allowanceError.message);
      return;
    }
    if (hftBalanceError) {
      toast.error("Error checking HFT balance: " + hftBalanceError.message);
      return;
    }
    if (!proposalId && proposalId !== "0") {
      toast.error("Please enter a valid proposal ID.");
      return;
    }

    try {
      console.log("Calling placeBid with proposalId:", proposalId);
      await placeBid(proposalId);
    } catch (err) {
      console.error("Place bid error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states
  useEffect(() => {
    let toastId;
    if (isApprovePending) {
      toastId = toast.loading(`Approving ${Number(hftAmount) / 10 ** 18} HFT...`);
    } else if (isBidPending) {
      toastId = toast.loading("Placing bid...");
    } else if (isApproveConfirming) {
      toastId = toast.loading("Confirming HFT approval...");
    } else if (isBidConfirming) {
      toastId = toast.loading("Confirming bid placement...");
    } else if (isApproveConfirmed) {
      toastId = toast.success(`HFT approval for ${Number(hftAmount) / 10 ** 18} HFT successful!`);
    } else if (isBidConfirmed) {
      toastId = toast.success("Bid placed successfully!");
    } else if (approveError) {
      const isCancelled = approveError.code === 4001 || /rejected|denied|cancelled/i.test(approveError.message);
      toastId = toast.error(isCancelled ? "Transaction cancelled" : `Approval error: ${approveError.message}`);
    } else if (bidError) {
      const isCancelled = bidError.code === 4001 || /rejected|denied|cancelled/i.test(bidError.message);
      toastId = toast.error(isCancelled ? "Transaction cancelled" : `Bid error: ${bidError.message}`);
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [
    isApprovePending,
    isBidPending,
    isApproveConfirming,
    isBidConfirming,
    isApproveConfirmed,
    isBidConfirmed,
    approveError,
    bidError,
    hftAmount,
  ]);

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Place Bid</h3>
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
        <label className="block text-gray-200 mb-2">HFT Amount to Approve</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          placeholder="Enter HFT amount"
        />
      </div>
      <p className="text-gray-200 mb-2">
        Amount to Approve: {hftAmount > 0 ? Number(hftAmount) / 10 ** 18 : "N/A"} HFT
      </p>
      <p className="text-gray-200 mb-2">
        Your HFT Balance: {hftBalance > 0 ? Number(hftBalance) / 10 ** 18 : "N/A"} HFT
      </p>
      {!hasEnoughAllowance ? (
        <button
          onClick={handleApproveHFT}
          disabled={
            isApprovePending ||
            isApproveConfirming ||
            !hasEnoughHFT ||
            !hasEnoughGas ||
            !isConnected ||
            !isCorrectNetwork ||
            allowanceError ||
            hftBalanceError ||
            !amount ||
            Number(amount) <= 0
          }
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isApprovePending ||
            isApproveConfirming ||
            !hasEnoughHFT ||
            !hasEnoughGas ||
            !isConnected ||
            !isCorrectNetwork ||
            allowanceError ||
            hftBalanceError ||
            !amount ||
            Number(amount) <= 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isApprovePending || isApproveConfirming ? "Processing Approval..." : `Approve ${hftAmount > 0 ? Number(hftAmount) / 10 ** 18 : "N/A"} HFT`}
        </button>
      ) : (
        <button
          onClick={handlePlaceBid}
          disabled={
            isBidPending ||
            isBidConfirming ||
            !hasEnoughHFT ||
            !hasEnoughGas ||
            !isConnected ||
            !isCorrectNetwork ||
            allowanceError ||
            hftBalanceError ||
            !proposalId
          }
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isBidPending ||
            isBidConfirming ||
            !hasEnoughHFT ||
            !hasEnoughGas ||
            !isConnected ||
            !isCorrectNetwork ||
            allowanceError ||
            hftBalanceError ||
            !proposalId
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isBidPending || isBidConfirming ? "Processing Bid..." : "Place Bid"}
        </button>
      )}
    </div>
  );
}

export default PlaceBid;