import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { useDepositBidAmount } from "../../interactions/ProposalManager_interactions";
import { baseSepolia } from "wagmi/chains";
import toast from "react-hot-toast";

function DepositBidAmount() {
  const { address, isConnected, chain } = useAccount();
  const [proposalId, setProposalId] = useState("");
  const {
    approveUSDC,
    depositBidAmount,
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    approveError,
    isDepositPending,
    isDepositConfirming,
    isDepositConfirmed,
    depositError,
    allowance,
    usdcBalance,
    allowanceError,
    usdcBalanceError,
    proposalData,
  } = useDepositBidAmount();

  // Check ETH balance for gas (0.001 ETH threshold)
  const { data: balanceData } = useBalance({ address });
  const hasEnoughGas = balanceData && balanceData.value >= 0.001 * 10 ** 18;

  // Get bidAmount from proposalData (adjust based on ABI structure)
  const bidAmount = proposalData?.bidAmount ? BigInt(proposalData.bidAmount) : BigInt(0);
  const hasEnoughUSDC = usdcBalance >= bidAmount;
  const hasEnoughAllowance = allowance >= bidAmount;
  const isCorrectNetwork = chain && chain.id === baseSepolia.id;

  // Handle USDC approval
  const handleApproveUSDC = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to approve USDC.");
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
    if (!hasEnoughUSDC) {
      toast.error(`Insufficient USDC balance (need ${bidAmount / BigInt(10 ** 6)} USDC).`);
      return;
    }
    if (allowanceError) {
      toast.error("Error checking USDC allowance: " + allowanceError.message);
      return;
    }
    if (usdcBalanceError) {
      toast.error("Error checking USDC balance: " + usdcBalanceError.message);
      return;
    }

    try {
      console.log("Calling approveUSDC with bidAmount:", bidAmount.toString());
      await approveUSDC(bidAmount);
    } catch (err) {
      console.error("Approval error:", err);
      // Toast handled in useEffect
    }
  };

  // Handle deposit bid amount
  const handleDepositBidAmount = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to deposit.");
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
    if (!hasEnoughUSDC) {
      toast.error(`Insufficient USDC balance (need ${bidAmount / BigInt(10 ** 6)} USDC).`);
      return;
    }
    if (!hasEnoughAllowance) {
      toast.error("Please approve USDC first.");
      return;
    }
    if (allowanceError) {
      toast.error("Error checking USDC allowance: " + allowanceError.message);
      return;
    }
    if (usdcBalanceError) {
      toast.error("Error checking USDC balance: " + usdcBalanceError.message);
      return;
    }
    if (!proposalId && proposalId !== "0") {
      toast.error("Please enter a valid proposal ID.");
      return;
    }
    if (proposalData?.state != 2) { // Assuming ProposalState.Awarded = 2
      toast.error("Proposal must be in Awarded state.");
      console.log(proposalData?.state)
      return;
    }

    try {
      console.log("Calling depositBidAmount with proposalId:", proposalId);
      await depositBidAmount(proposalId);
    } catch (err) {
      console.error("Deposit error:", err);
      // Toast handled in useEffect
    }
  };

  // Toast notifications for transaction states
  useEffect(() => {
    let toastId;
    if (isApprovePending) {
      toastId = toast.loading("Approving USDC...");
    } else if (isDepositPending) {
      toastId = toast.loading("Depositing bid amount...");
    } else if (isApproveConfirming) {
      toastId = toast.loading("Confirming USDC approval...");
    } else if (isDepositConfirming) {
      toastId = toast.loading("Confirming deposit...");
    } else if (isApproveConfirmed) {
      toastId = toast.success("USDC approved successfully!");
    } else if (isDepositConfirmed) {
      toastId = toast.success("Bid amount deposited successfully!");
    } else if (approveError) {
      const isCancelled = approveError.code === 4001 || /rejected|denied|cancelled/i.test(approveError.message);
      toastId = toast.error(isCancelled ? "Transaction cancelled" : `Approval error: ${approveError.message}`);
    } else if (depositError) {
      const isCancelled = depositError.code === 4001 || /rejected|denied|cancelled/i.test(depositError.message);
      toastId = toast.error(isCancelled ? "Transaction cancelled" : `Deposit error: ${depositError.message}`);
    }
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [
    isApprovePending,
    isDepositPending,
    isApproveConfirming,
    isDepositConfirming,
    isApproveConfirmed,
    isDepositConfirmed,
    approveError,
    depositError,
  ]);

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">Deposit Bid Amount</h3>
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
      <p className="text-gray-200 mb-2">
        Required USDC: {bidAmount > 0 ? Number(bidAmount) / 10 ** 6 : "N/A"} USDC
      </p>
      {!hasEnoughAllowance ? (
        <button
          onClick={handleApproveUSDC}
          disabled={
            isApprovePending ||
            isApproveConfirming ||
            !hasEnoughUSDC ||
            !hasEnoughGas ||
            !isConnected ||
            !isCorrectNetwork ||
            allowanceError ||
            usdcBalanceError ||
            !proposalId ||
            proposalData?.state != 2
          }
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isApprovePending ||
            isApproveConfirming ||
            !hasEnoughUSDC ||
            !hasEnoughGas ||
            !isConnected ||
            !isCorrectNetwork ||
            allowanceError ||
            usdcBalanceError ||
            !proposalId ||
            proposalData?.state != 2
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isApprovePending || isApproveConfirming ? "Processing Approval..." : "Approve USDC"}
        </button>
      ) : (
        <button
          onClick={handleDepositBidAmount}
          disabled={
            isDepositPending ||
            isDepositConfirming ||
            !hasEnoughUSDC ||
            !hasEnoughGas ||
            !isConnected ||
            !isCorrectNetwork ||
            allowanceError ||
            usdcBalanceError ||
            !proposalId ||
            proposalData?.state != 2
          }
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isDepositPending ||
            isDepositConfirming ||
            !hasEnoughUSDC ||
            !hasEnoughGas ||
            !isConnected ||
            !isCorrectNetwork ||
            allowanceError ||
            usdcBalanceError ||
            !proposalId ||
            proposalData?.state != 2
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isDepositPending || isDepositConfirming ? "Processing Deposit..." : "Deposit Bid Amount"}
        </button>
      )}
    </div>
  );
}

export default DepositBidAmount;