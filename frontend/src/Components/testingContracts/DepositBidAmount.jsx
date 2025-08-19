"use client";

import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useDepositBidAmount } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function DepositBidAmountButton({ proposalId, onSuccess }) {
  const { address, isConnected, chain } = useAccount();
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
const bidAmount = proposalData?.bidAmount
    ? BigInt(proposalData.bidAmount)
    : BigInt(0);
  const isClient = proposalData?.client === address;
  const hasEnoughUSDC = usdcBalance >= bidAmount;
  const hasEnoughAllowance = allowance >= bidAmount;
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;
  const isValidProposalId =
    proposalId !== "" && Number.isInteger(Number(proposalId));

  // Handle successful deposit
  useEffect(() => {
    if (isDepositConfirmed) {
      toast.success("Deposit completed!", { id: "deposit-complete" });
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
      toast.error("Please switch to Base Sepolia network.", {
        id: "network-error",
      });
      return;
    }
    if (!hasEnoughGas) {
      toast.error("Insufficient ETH for gas fees (minimum 0.001 ETH).", {
        id: "gas-error",
      });
      return;
    }
    if (!isValidProposalId) {
      toast.error("Please enter a valid proposal ID.", {
        id: "proposal-id-error",
      });
      return;
    }
    if (!isClient) {
      toast.error("Only the proposal client can deposit.", {
        id: "client-error",
      });
      return;
    }
    if (proposalData?.state != 2) {
      toast.error("Proposal must be in Awarded state.", { id: "state-error" });
      return;
    }
    if (!hasEnoughUSDC) {
      toast.error(
        `Insufficient USDC balance (need ${Number(bidAmount) / 10 ** 6} USDC).`,
        { id: "usdc-balance-error" }
      );
      return;
    }
    if (allowanceError) {
      toast.error(
        `Error checking USDC allowance: ${allowanceError.message.slice(
          0,
          100
        )}...`,
        { id: "allowance-error" }
      );
      return;
    }
    if (usdcBalanceError) {
      toast.error(
        `Error checking USDC balance: ${usdcBalanceError.message.slice(
          0,
          100
        )}...`,
        { id: "usdc-balance-error" }
      );
      return;
    }
    if (proposalError) {
      toast.error(
        `Error fetching proposal data: ${proposalError.message.slice(
          0,
          100
        )}...`,
        { id: "proposal-error" }
      );
      return;
    }

    try {
      console.log(
        "Initiating deposit for proposalId:",
        proposalId,
        "bidAmount:",
        bidAmount.toString()
      );
      await initiateDeposit(proposalId, bidAmount);
    } catch (err) {
      console.error("Deposit initiation error:", err);
      // Toast handled in hook
    }
  };

  return (
    <button
      onClick={handleDeposit}
      // disabled={
      //   isApprovePending ||
      //   isApproveConfirming ||
      //   isDepositPending ||
      //   isDepositConfirming ||
      //   !hasEnoughUSDC ||
      //   !hasEnoughGas ||
      //   !isConnected ||
      //   !isCorrectNetwork ||
      //   allowanceError ||
      //   usdcBalanceError ||
      //   proposalError ||
      //   !isValidProposalId ||
      //   !isClient ||
      //   proposalData?.state != 2
      // }
      className={`
        relative w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300
        bg-blue-600 hover:bg-blue-700 text-white
        disabled:bg-gray-600 disabled:cursor-not-allowed
      `}
    >
      {isApprovePending || isApproveConfirming
        ? "Processing Approval..."
        : isDepositPending || isDepositConfirming
        ? "Processing Deposit..."
        : hasEnoughAllowance
        ? "Deposit Bid Amount"
        : "Approve and Deposit"}
    </button>
  );
}

export default DepositBidAmountButton;
