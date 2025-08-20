import React from "react";
import StateBadge from "./StateBadge";
import { fromUSDC6 } from "../../utils/units";
import {
  Calendar,
  DollarSign,
  User,
  Hash,
  Clock,
  Target,
  TrendingUp,
  FileText,
} from "lucide-react";

function formatUsdFrom6(value) {
  try {
    const s = fromUSDC6(value ?? 0);
    const n = Number(s || 0);
    if (!isFinite(n)) return `$${s}`;
    return `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  } catch {
    if (value === undefined || value === null || value === "—") return "—";
    const num = typeof value === "string" ? Number(value) : Number(value);
    if (!isFinite(num)) return String(value);
    const usd = num / 1_000_000;
    return `$${usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
}

function formatDateFromUnix(unix) {
  if (!unix) return "—";
  const ms = String(unix).length > 10 ? Number(unix) : Number(unix) * 1000;
  const d = new Date(ms);
  if (isNaN(d.getTime())) return String(unix);
  return d.toLocaleString();
}

export default function ContractSummary({ contractData }) {
  if (!contractData) return null;

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600 shadow-lg">
              <FileText className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1">
                Contract Summary
              </h3>
              <p className="text-slate-400 text-xs">
                Smart contract details & project timeline
              </p>
            </div>
          </div>
          <StateBadge state={Number(contractData.state)} />
        </div>
      </div>

      {/* Main Content - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contract Details Card */}
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center">
              <Hash className="w-3 h-3 text-slate-300" />
            </div>
            <h4 className="text-base font-semibold text-slate-200">
              Contract Details
            </h4>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-xs">Client</span>
              </div>
              <span className="text-slate-200 font-medium text-xs break-all max-w-[150px] text-right">
                {contractData.client || "—"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-xs">Bidder</span>
              </div>
              <span className="text-slate-200 font-medium text-xs break-all max-w-[150px] text-right">
                {contractData.bidder || "—"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-xs">Proposal ID</span>
              </div>
              <span className="text-slate-200 font-medium text-xs">
                {contractData.contractProposalId ||
                  contractData.proposalId ||
                  "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Financial Details Card */}
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-slate-300" />
            </div>
            <h4 className="text-base font-semibold text-slate-200">
              Financial Details
            </h4>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-lg border border-slate-600/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 text-xs">Budget (USD)</span>
                <DollarSign className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-lg font-bold text-slate-100">
                {formatUsdFrom6(contractData.budget)}
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-lg border border-slate-600/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 text-xs">Bid Amount (USD)</span>
                <DollarSign className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-lg font-bold text-slate-100">
                {formatUsdFrom6(contractData.bidAmount)}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Card - Full Width */}
        <div className="md:col-span-2 bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center">
              <Clock className="w-3 h-3 text-slate-300" />
            </div>
            <h4 className="text-base font-semibold text-slate-200">
              Project Timeline
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                <Clock className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-slate-400 text-xs mb-1">Start Date</div>
                <div className="text-slate-200 font-medium text-sm">
                  {formatDateFromUnix(contractData.startTime)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                <Calendar className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-slate-400 text-xs mb-1">Deadline</div>
                <div className="text-slate-200 font-medium text-sm">
                  {formatDateFromUnix(contractData.endTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="flex items-center justify-center pt-2">
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
        <div className="mx-3 text-slate-500 text-xs">
          Smart Contract Powered
        </div>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
      </div>
    </div>
  );
}
