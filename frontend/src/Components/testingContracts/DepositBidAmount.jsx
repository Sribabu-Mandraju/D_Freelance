"use client";

import { useState, useEffect, useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import { useDepositBidAmount } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function DepositBidAmount({ onSuccess }) {
  const { address, isConnected, chain } = useAccount();
  const [proposalId, setProposalId] = useState("");
  const {
    initiateDeposit,
    isApprovePending,
    isApproveConfirming,
    isDepositPending,
    isDepositConfirming,
    isDepositConfirmed,
    approveError,
    depositError,
    allowance,
    usdcBalance,
    allowanceError,
    usdcBalanceError,
    proposalData,
    proposalError,
  } = useDepositBidAmount(proposalId);

  // Check ETH balance for gas (0.001 ETH threshold)
  const { data: balanceData } = useBalance({ address });
  const hasEnoughGas = balanceData && balanceData.value >= 0.001 * 10 ** 18;

  // Get bidAmount and client from proposalData
  const bidAmount = proposalData?.bidAmount ? BigInt(proposalData.bidAmount) : BigInt(0);
  const isClient = proposalData?.client === address;
  const hasEnoughUSDC = usdcBalance >= bidAmount;
  const hasEnoughAllowance = allowance >= bidAmount;
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;
  const isValidProposalId = proposalId !== "" && Number.isInteger(Number(proposalId));

  // Ref to track toast ID
  const toastIdRef = useRef(null);

  // Handle successful deposit
  useEffect(() => {
    if (isDepositConfirmed) {
      toast.success("Deposit completed!", { id: "deposit-complete" });
      setProposalId("");
      if (onSuccess) onSuccess();
    }
  }, [isDepositConfirmed, onSuccess]);

  // Handle deposit (approval + deposit if needed)
  const handleDeposit = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.", { id: "connect-wallet" });
      return;
    }
    if (!isCorrectNetwork) {
      toast.error("Please switch to Base Sepolia network.", { id: "network-error" });
      return;
    }
    if (!hasEnoughGas) {
      toast.error("Insufficient ETH for gas fees (minimum 0.001 ETH).", { id: "gas-error" });
      return;
    }
    if (!isValidProposalId) {
      toast.error("Please enter a valid proposal ID.", { id: "proposal-id-error" });
      return;
    }
    if (!isClient) {
      toast.error("Only the proposal client can deposit.", { id: "client-error" });
      return;
    }
    if (proposalData?.state != 2) {
      toast.error("Proposal must be in Awarded state.", { id: "state-error" });
      return;
    }
    if (!hasEnoughUSDC) {
      toast.error(`Insufficient USDC balance (need ${Number(bidAmount) / 10 ** 6} USDC).`, { id: "usdc-balance-error" });
      return;
    }
    if (allowanceError) {
      toast.error(`Error checking USDC allowance: ${allowanceError.message.slice(0, 100)}...`, { id: "allowance-error" });
      return;
    }
    if (usdcBalanceError) {
      toast.error(`Error checking USDC balance: ${usdcBalanceError.message.slice(0, 100)}...`, { id: "usdc-balance-error" });
      return;
    }
    if (proposalError) {
      toast.error(`Error fetching proposal data: ${proposalError.message.slice(0, 100)}...`, { id: "proposal-error" });
      return;
    }

    try {
      console.log("Initiating deposit for proposalId:", proposalId, "bidAmount:", bidAmount.toString());
      await initiateDeposit(proposalId, bidAmount);
    } catch (err) {
      console.error("Deposit initiation error:", err);
      // Toast handled in hook
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Deposit Bid Amount</h3>
      <div className="mb-4">
        <label className="block text-gray-200 mb-2">Proposal ID</label>
        <input
          type="number"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="Enter proposal ID"
          disabled={isApprovePending || isApproveConfirming || isDepositPending || isDepositConfirming}
        />
      </div>
      <p className="text-gray-200 mb-2">
        Required USDC: {bidAmount > 0 ? Number(bidAmount) / 10 ** 6 : "N/A"} USDC
      </p>
      <p className="text-gray-200 mb-4">
        Your USDC Balance: {usdcBalance > 0 ? Number(usdcBalance) / 10 ** 6 : "N/A"} USDC
      </p>
      <button
        onClick={handleDeposit}
        disabled={
          isApprovePending ||
          isApproveConfirming ||
          isDepositPending ||
          isDepositConfirming ||
          !hasEnoughUSDC ||
          !hasEnoughGas ||
          !isConnected ||
          !isCorrectNetwork ||
          allowanceError ||
          usdcBalanceError ||
          proposalError ||
          !isValidProposalId ||
          !isClient ||
          proposalData?.state != 2
        }
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${
          isApprovePending ||
          isApproveConfirming ||
          isDepositPending ||
          isDepositConfirming ||
          !hasEnoughUSDC ||
          !hasEnoughGas ||
          !isConnected ||
          !isCorrectNetwork ||
          allowanceError ||
          usdcBalanceError ||
          proposalError ||
          !isValidProposalId ||
          !isClient ||
          proposalData?.state != 2
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-700"
        }`}
      >
        {(isApprovePending || isApproveConfirming) ? (
          "Processing Approval..."
        ) : (isDepositPending || isDepositConfirming) ? (
          "Processing Deposit..."
        ) : hasEnoughAllowance ? (
          "Deposit Bid Amount"
        ) : (
          "Approve and Deposit"
        )}
      </button>
    </div>
  );
}

export default DepositBidAmount;  