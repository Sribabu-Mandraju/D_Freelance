import React from "react";
import StateBadge from "./StateBadge";
import { fromUSDC6 } from "../../utils/units";

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

  const left = [
    {
      label: "Proposal ID",
      value: contractData.contractProposalId || contractData.proposalId,
    },
    { label: "Client", value: contractData.client },
    { label: "Bidder", value: contractData.bidder || "—" },
  ];

  const money = [
    { label: "Budget (USD)", value: formatUsdFrom6(contractData.budget) },
    {
      label: "Bid Amount (USD)",
      value: formatUsdFrom6(contractData.bidAmount),
    },
  ];

  const timing = [
    { label: "Start", value: formatDateFromUnix(contractData.startTime) },
    { label: "Deadline", value: formatDateFromUnix(contractData.endTime) },
  ];

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900/80 to-black/70 border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.12)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
          Contract
        </h3>
        <StateBadge state={Number(contractData.state)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="md:col-span-1 space-y-3">
          {left.map((it) => (
            <div
              key={it.label}
              className="bg-slate-900/60 p-3 rounded-lg border border-slate-700"
            >
              <div className="text-gray-400">{it.label}</div>
              <div className="text-gray-200 font-semibold break-all">
                {String(it.value ?? "")}{" "}
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1 space-y-3">
          {money.map((it) => (
            <div
              key={it.label}
              className="bg-slate-900/60 p-3 rounded-lg border border-slate-700"
            >
              <div className="text-gray-400">{it.label}</div>
              <div className="text-emerald-300 font-semibold">{it.value}</div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1 space-y-3">
          {timing.map((it) => (
            <div
              key={it.label}
              className="bg-slate-900/60 p-3 rounded-lg border border-slate-700"
            >
              <div className="text-gray-400">{it.label}</div>
              <div className="text-cyan-300 font-semibold">{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
