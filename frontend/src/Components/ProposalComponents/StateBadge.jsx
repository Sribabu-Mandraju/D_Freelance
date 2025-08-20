import React from "react";

const STATE_LABELS = {
  0: "Draft",
  1: "Open",
  2: "Awarded",
  3: "Funded",
  4: "In Progress",
  5: "Milestone 1",
  6: "Milestone 2",
  7: "Milestone 3",
  8: "Completed",
  9: "Disputed",
  10: "Cancelled",
  11: "Refunded",
};

const STATE_COLORS = {
  0: "from-gray-600 to-slate-700",
  1: "from-cyan-500 to-blue-600",
  2: "from-fuchsia-500 to-cyan-600",
  3: "from-emerald-500 to-teal-600",
  4: "from-indigo-500 to-purple-600",
  5: "from-fuchsia-500 to-pink-600",
  6: "from-violet-500 to-purple-600",
  7: "from-rose-500 to-red-600",
  8: "from-green-500 to-emerald-600",
  9: "from-cyan-500 to-blue-600",
  10: "from-red-500 to-rose-600",
  11: "from-slate-500 to-gray-600",
};

export default function StateBadge({ state }) {
  if (state === null || state === undefined) return null;
  const label = STATE_LABELS[state] || `State ${state}`;
  const gradient = STATE_COLORS[state] || STATE_COLORS[0];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10`}
      title={`Contract state: ${label}`}
    >
      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
      <span className="text-xs font-semibold tracking-wide">{label}</span>
    </div>
  );
}
