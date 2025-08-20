import React, { useMemo } from "react";
import { fromUSDC6, toUSDC6 } from "../../utils/units";
import { toast } from "react-hot-toast";
import { useDepositBidAmount } from "../../interactions/ProposalManager_interactions";

function formatUsdFrom6(value) {
  try {
    const s = fromUSDC6(value ?? 0);
    const n = Number(s || 0);
    if (!isFinite(n)) return `$${s}`;
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  } catch {
    if (value === undefined || value === null) return "—";
    const num = typeof value === "string" ? Number(value) : Number(value);
    if (!isFinite(num)) return String(value);
    const usd = num / 1_000_000;
    return `$${usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
}

export default function FundingCard({ proposalId, bidAmount, onChainSuccess }) {
  const {
    initiateDeposit,
    isApprovePending,
    isApproveConfirming,
    isDepositPending,
    isDepositConfirming,
    allowance,
    usdcBalance,
  } = useDepositBidAmount(proposalId);

  const needsApproval = useMemo(() => {
    // bidAmount is expected in USDC minor units (6 decimals)
    const usdcAmountMinor =
      typeof bidAmount === "bigint" ? bidAmount : BigInt(bidAmount || 0);
    return allowance < usdcAmountMinor;
  }, [allowance, bidAmount]);

  const onDeposit = async () => {
    try {
      // Use minor units directly
      const usdcAmountMinor =
        typeof bidAmount === "bigint" ? bidAmount : BigInt(bidAmount || 0);
      await initiateDeposit(proposalId, usdcAmountMinor);
      onChainSuccess?.();
    } catch (e) {
      toast.error(e?.message || "Failed to deposit");
    }
  };

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-900/80 to-black/70 border border-emerald-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.12)]">
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-2">
        Fund Escrow
      </h3>
      <p className="text-gray-300 text-sm mb-4">
        Deposit the accepted bid amount into escrow.
      </p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
          <div className="text-gray-400">Bid amount</div>
          <div className="text-emerald-300 font-semibold break-all">
            {formatUsdFrom6(bidAmount)}
          </div>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
          <div className="text-gray-400">USDC allowance</div>
          <div className="text-cyan-300 font-semibold break-all">
            {formatUsdFrom6(allowance?.toString?.() || allowance)}
          </div>
        </div>
      </div>
      <button
        onClick={onDeposit}
        disabled={
          isApprovePending ||
          isApproveConfirming ||
          isDepositPending ||
          isDepositConfirming
        }
        className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold disabled:opacity-60"
      >
        {isApprovePending || isApproveConfirming
          ? "Approving USDC..."
          : isDepositPending || isDepositConfirming
          ? "Depositing..."
          : needsApproval
          ? "Approve and Deposit"
          : "Deposit"}
      </button>
    </div>
  );
}
