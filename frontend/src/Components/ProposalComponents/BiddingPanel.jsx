import React, { useEffect, useMemo, useState } from "react";
import { toUSDC6 } from "../../utils/units";
import { useBids } from "../../hooks/useBids";
import { useAcceptBid } from "../../interactions/ProposalManager_interactions";
import { usePlaceBid } from "../../interactions/HFTtoken__interactions";
import { toast } from "react-hot-toast";

export default function BiddingPanel({
  proposalDbId,
  currentState,
  contractProposalId,
  clientAddress,
  onChainSuccess,
}) {
  const {
    bids,
    isLoading,
    error,
    fetchBids,
    createBid,
    updateBid,
    deleteBid,
  } = useBids(proposalDbId);
  const {
    acceptBid,
    isPending: isAcceptPending,
    isConfirming: isAcceptConfirming,
    isConfirmed: isAcceptConfirmed,
    error: acceptError,
  } = useAcceptBid();
  const {
    placeBid,
    isBidPending,
    isBidConfirming,
    isBidConfirmed,
    bidError,
  } = usePlaceBid();
  const [pendingDbBid, setPendingDbBid] = useState(null);

  const [coverLetter, setCoverLetter] = useState("");
  const [amountUsd, setAmountUsd] = useState("");
  const letterCount = coverLetter.length;
  const minorUnits = useMemo(() => {
    try {
      return Number(toUSDC6(amountUsd || 0));
    } catch {
      const n = Number(amountUsd || 0);
      if (!isFinite(n)) return 0;
      return Math.max(0, Math.round(n * 1_000_000));
    }
  }, [amountUsd]);

  const ranked = useMemo(() => {
    const list = (bids || []).map((b) => ({
      ...b,
      amount: Number(b.bid_amount || 0),
    }));
    list.sort((a, b) => a.amount - b.amount);
    const idToRank = new Map();
    list.forEach((b, idx) => idToRank.set(b._id, idx + 1));
    return { list, idToRank, lowest: list[0] };
  }, [bids]);

  const [previewBid, setPreviewBid] = useState(null);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cover_letter = coverLetter.trim();
    const bid_amount = String(Number(amountUsd || 0));
    try {
      if (!contractProposalId) {
        toast.error(
          "No on-chain proposal found. Ask client to Create Proposal."
        );
        return;
      }
      await placeBid(contractProposalId);
      // Queue DB save until on-chain tx is confirmed
      setPendingDbBid({ cover_letter, bid_amount });
      toast.success("Bid submitted. Waiting for confirmation to save...");
    } catch (err) {
      // If chain tx fails, do not save to DB
      toast.error(err?.message || "Failed to place bid");
      return;
    }
    // Reset UI only after DB save completes in effect below
  };

  // After on-chain confirmation, persist bid to backend
  useEffect(() => {
    const persist = async () => {
      if (isBidConfirmed && pendingDbBid) {
        try {
          await createBid(pendingDbBid);
          toast.success("Bid confirmed and saved.");
          setCoverLetter("");
          setAmountUsd("");
          setPendingDbBid(null);
          fetchBids();
          // Trigger page refresh to show updated state
          onChainSuccess?.();
        } catch (e) {
          toast.error(e?.message || "Failed to save bid to backend");
        }
      }
    };
    persist();
  }, [isBidConfirmed, pendingDbBid, createBid, fetchBids, onChainSuccess]);

  // Handle tx error: clear queued payload
  useEffect(() => {
    if (bidError && pendingDbBid) {
      setPendingDbBid(null);
    }
  }, [bidError, pendingDbBid]);

  // Watch for successful bid acceptance and trigger refresh
  useEffect(() => {
    if (isAcceptConfirmed) {
      console.log("Bid acceptance confirmed, triggering onChainSuccess");
      onChainSuccess?.();

      // Reset the accept bid state after a delay to ensure it's ready for next use
      setTimeout(() => {
        console.log("Resetting accept bid state");
        // Note: This would require the hook to expose a reset function
        // For now, we'll rely on the hook's internal state management
      }, 1000);
    }
  }, [isAcceptConfirmed, onChainSuccess]);

  // Watch for bid acceptance errors
  useEffect(() => {
    if (acceptError) {
      console.error("Bid acceptance error:", acceptError);
      toast.error(acceptError.message || "Failed to accept bid on-chain");
    }
  }, [acceptError]);

  // Debug: log when currentState changes
  useEffect(() => {
    console.log("BiddingPanel currentState changed:", {
      currentState,
      contractProposalId,
      clientAddress,
      timestamp: new Date().toISOString(),
    });
  }, [currentState, contractProposalId, clientAddress]);

  const isClient = () => {
    const current = (localStorage.getItem("authAddress") || "").toLowerCase();
    const isClientUser =
      clientAddress && current && clientAddress.toLowerCase() === current;
    console.log("Client check:", {
      current,
      clientAddress,
      isClientUser,
      currentState,
    });
    return isClientUser;
  };

  const canAccept = currentState === 1 && isClient();
  console.log("Can accept bid:", {
    canAccept,
    currentState,
    isClient: isClient(),
  });

  const handleAccept = async (bid) => {
    try {
      if (!contractProposalId) return toast.error("No proposalId on-chain");
      console.log("Accepting bid:", {
        bid,
        contractProposalId,
        bidAmount: bid.bid_amount,
        bidAmountType: typeof bid.bid_amount,
        bidAmountNumber: Number(bid.bid_amount || 0),
      });
      await acceptBid(
        contractProposalId,
        bid.wallet_address,
        // Pass USD amount; hook scales to 6-decimal USDC internally
        Number(bid.bid_amount || 0)
      );
      toast.success("Bid accepted on-chain");
      console.log("Bid accepted successfully, transaction submitted");
      // onChainSuccess will be triggered by useEffect when transaction confirms
    } catch (e) {
      console.error("Failed to accept bid:", e);
      toast.error(e?.message || "Failed to accept bid");
    }
  };

  return (
    <div className="rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900/80 to-black/70 border border-fuchsia-500/20 backdrop-blur-xl shadow-[0_0_35px_rgba(217,70,239,0.15)]">
      {currentState === 1 && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-500">
              Place a Bid
            </h3>
            <div className="h-[2px] w-20 sm:w-24 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full opacity-70" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-end"
          >
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-300 mb-2">
                Cover letter
              </label>
              <textarea
                name="cover_letter"
                rows={3}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-3 sm:px-4 py-3 text-gray-200 focus:outline-none focus:border-fuchsia-500/60 shadow-inner shadow-black/40 text-sm sm:text-base"
                placeholder="Explain why you're a great fit..."
              />
              <div className="mt-2 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                <span className="text-gray-400">
                  Tips: highlight relevant work, timeline, and deliverables.
                </span>
                <span
                  className={`font-medium ${
                    letterCount > 800 ? "text-rose-300" : "text-fuchsia-300"
                  }`}
                >
                  {letterCount}/1000
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Bid amount (USD)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  name="bid_amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amountUsd}
                  onChange={(e) => setAmountUsd(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-xl pl-8 pr-3 sm:pr-4 py-3 text-gray-200 focus:outline-none focus:border-cyan-500/60 shadow-inner shadow-black/40 text-sm sm:text-base"
                  placeholder="0.00"
                  inputMode="decimal"
                />
              </div>
              <div className="mt-2 text-xs">
                <span className="text-cyan-300">USDC minor units:</span>{" "}
                <span className="text-gray-300 font-medium">
                  {minorUnits.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <button
                type="submit"
                disabled={isBidPending || isBidConfirming}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-600 text-white font-semibold disabled:opacity-60 text-sm sm:text-base"
              >
                {isBidPending || isBidConfirming ? "Placing..." : "Submit Bid"}
              </button>
            </div>
          </form>
        </>
      )}

      <div className="mt-5 sm:mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
          <h4 className="text-base sm:text-lg font-semibold text-gray-300">
            Bids
          </h4>
          <span className="text-xs sm:text-sm text-gray-400">
            {bids.length} total
          </span>
        </div>
        {isLoading && (
          <div className="text-gray-400 text-sm text-center py-4">
            Loading bids...
          </div>
        )}
        {error && (
          <div className="text-red-400 text-sm text-center py-4">{error}</div>
        )}
        <ul className="space-y-3 sm:space-y-4">
          {bids.map((b) => (
            <li
              key={b._id}
              className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-700 shadow-[0_0_20px_rgba(34,211,238,0.08)] hover:shadow-[0_0_34px_rgba(217,70,239,0.18)] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 opacity-90" />
                    <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-slate-950/90 border border-slate-700 text-[10px] flex items-center justify-center text-cyan-300 font-semibold">
                      {ranked.idToRank.get(b._id) || 0}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <div className="text-gray-200 text-sm font-medium break-all">
                        {b.wallet_address?.slice(0, 6)}...
                        {b.wallet_address?.slice(-4)}
                      </div>
                      {ranked.lowest && ranked.lowest._id === b._id && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-emerald-300 font-semibold w-fit">
                          Lowest Bid
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500 text-[11px] mt-1">
                      Submitted{" "}
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleString()
                        : "—"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => setPreviewBid(b)}
                    className="px-3 py-1.5 rounded-full text-[12px] bg-gradient-to-r from-cyan-600/30 to-fuchsia-600/30 border border-cyan-500/30 text-cyan-200 hover:scale-105 transition-transform"
                  >
                    Preview
                  </button>
                </div>
              </div>

              <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                {String(b.cover_letter || "").length >
                (window.innerWidth < 640 ? 150 : 220)
                  ? `${String(b.cover_letter).slice(
                      0,
                      window.innerWidth < 640 ? 150 : 220
                    )}...`
                  : String(b.cover_letter || "")}
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-0">
                <div className="text-emerald-400 font-extrabold text-lg sm:text-xl">
                  {`$${Number(b.bid_amount || 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </div>
                <div className="text-left sm:text-right text-[11px] text-slate-400">
                  <div>Bid Rank</div>
                  <div className="text-cyan-300 font-semibold">
                    #{ranked.idToRank.get(b._id) || 0}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {canAccept && (
                  <button
                    disabled={isAcceptPending || isAcceptConfirming}
                    onClick={() => handleAccept(b)}
                    className="px-3 py-1.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/20 hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    {isAcceptPending || isAcceptConfirming
                      ? "Accepting..."
                      : "Accept"}
                  </button>
                )}
                <button
                  onClick={() => deleteBid(b._id)}
                  className="px-3 py-1.5 rounded bg-rose-600/20 text-rose-300 border border-rose-500/20 hover:scale-105 transition-transform"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {bids.length === 0 && !isLoading && (
            <li className="text-gray-400 text-sm text-center py-8">
              No bids yet.
            </li>
          )}
        </ul>
        {previewBid && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900 to-black border border-slate-700 shadow-2xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-200 font-semibold text-sm sm:text-base break-all">
                  {previewBid.wallet_address?.slice(0, 6)}...
                  {previewBid.wallet_address?.slice(-4)}
                </div>
                <button
                  onClick={() => setPreviewBid(null)}
                  className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
                >
                  Close
                </button>
              </div>
              <div className="text-sm text-gray-400 mb-4">
                Submitted{" "}
                {previewBid.createdAt
                  ? new Date(previewBid.createdAt).toLocaleString()
                  : "—"}
              </div>
              <div className="text-emerald-400 font-extrabold text-lg sm:text-xl mb-3">
                {`$${Number(previewBid.bid_amount || 0).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`}
              </div>
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed max-h-[40vh] sm:max-h-[50vh] overflow-auto text-sm sm:text-base">
                {previewBid.cover_letter}
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                {canAccept && (
                  <button
                    disabled={isAcceptPending || isAcceptConfirming}
                    onClick={() => handleAccept(previewBid)}
                    className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-600 text-white font-semibold disabled:opacity-60 text-sm sm:text-base hover:scale-105 transition-transform"
                  >
                    {isAcceptPending || isAcceptConfirming
                      ? "Accepting..."
                      : "Accept Bid"}
                  </button>
                )}
                <button
                  onClick={() => setPreviewBid(null)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-gray-300 text-sm sm:text-base hover:scale-105 transition-transform"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
