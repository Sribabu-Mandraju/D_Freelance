import React, { useEffect, useRef } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  useOpenProposalToBid,
  useAcceptBid,
  useStartWork,
  usePayFirstMilestone,
  usePaySecondMilestone,
  usePayThirdMilestone,
  useCompleteProposal,
  useCancelProposal,
} from "../../interactions/ProposalManager_interactions";

const NeonButton = ({ onClick, disabled, children, gradient }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg bg-gradient-to-r ${gradient} text-white font-semibold disabled:opacity-60 shadow-[0_0_25px_rgba(34,211,238,0.25)] border border-white/10`}
  >
    {children}
  </button>
);

export default function ActionBar({ dbId, proposalId, state, onChainSuccess }) {
  const {
    openProposalToBid,
    isPending: isOpenPending,
    isConfirming: isOpenConfirming,
    isConfirmed: isOpenConfirmed,
  } = useOpenProposalToBid();
  const {
    acceptBid,
    isPending: isAcceptPending,
    isConfirming: isAcceptConfirming,
    isConfirmed: isAcceptConfirmed,
  } = useAcceptBid();
  const {
    startWork,
    isPending: isStartPending,
    isConfirming: isStartConfirming,
    isConfirmed: isStartConfirmed,
  } = useStartWork();
  const {
    payFirstMilestone,
    isPending: isM1P,
    isConfirming: isM1C,
    isConfirmed: isM1Confirmed,
  } = usePayFirstMilestone();
  const {
    paySecondMilestone,
    isPending: isM2P,
    isConfirming: isM2C,
    isConfirmed: isM2Confirmed,
  } = usePaySecondMilestone();
  const {
    payThirdMilestone,
    isPending: isM3P,
    isConfirming: isM3C,
    isConfirmed: isM3Confirmed,
  } = usePayThirdMilestone();
  const {
    completeProposal,
    isPending: isCP,
    isConfirming: isCC,
    isConfirmed: isCPConfirmed,
  } = useCompleteProposal();
  const {
    cancelProposal,
    isPending: isCanP,
    isConfirming: isCanC,
    isConfirmed: isCanConfirmed,
  } = useCancelProposal();

  const disabled =
    isOpenPending ||
    isOpenConfirming ||
    isAcceptPending ||
    isAcceptConfirming ||
    isStartPending ||
    isStartConfirming ||
    isM1P ||
    isM1C ||
    isM2P ||
    isM2C ||
    isM3P ||
    isM3C ||
    isCP ||
    isCC ||
    isCanP ||
    isCanC;

  // Fire once per successful on-chain action to allow caller to refetch backend
  const hasEmittedSuccessRef = useRef(false);
  useEffect(() => {
    const confirmed =
      isOpenConfirmed ||
      isAcceptConfirmed ||
      isStartConfirmed ||
      isM1Confirmed ||
      isM2Confirmed ||
      isM3Confirmed ||
      isCPConfirmed ||
      isCanConfirmed;
    if (confirmed && !hasEmittedSuccessRef.current) {
      hasEmittedSuccessRef.current = true;
      onChainSuccess?.();
    }
  }, [
    isOpenConfirmed,
    isAcceptConfirmed,
    isStartConfirmed,
    isM1Confirmed,
    isM2Confirmed,
    isM3Confirmed,
    isCPConfirmed,
    isCanConfirmed,
    onChainSuccess,
  ]);
  // Reset the latch when a new tx starts
  useEffect(() => {
    if (
      isOpenPending ||
      isAcceptPending ||
      isStartPending ||
      isM1P ||
      isM2P ||
      isM3P ||
      isCP ||
      isCanP
    ) {
      hasEmittedSuccessRef.current = false;
    }
  }, [
    isOpenPending,
    isAcceptPending,
    isStartPending,
    isM1P,
    isM2P,
    isM3P,
    isCP,
    isCanP,
  ]);

  const handleOpen = async () => {
    try {
      await openProposalToBid(proposalId);
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };

  const handleAccept = async () => {
    try {
      // For now, we'll show a message directing users to the BiddingPanel
      // where they can see individual bids and accept specific ones
      toast.info(
        "Please go to the Bids section below to view and accept specific bids"
      );
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };

  const handleStart = async () => {
    try {
      await startWork(proposalId);
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };
  const handleM1 = async () => {
    try {
      await payFirstMilestone(proposalId);
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };
  const handleM2 = async () => {
    try {
      await paySecondMilestone(proposalId);
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };
  const handleM3 = async () => {
    try {
      await payThirdMilestone(proposalId);
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };
  const handleComplete = async () => {
    try {
      await completeProposal(proposalId);
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };
  const handleCancel = async () => {
    try {
      await cancelProposal(proposalId);
    } catch (e) {
      toast.error(e?.message || "Failed");
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="rounded-2xl p-5 bg-black/50 border border-cyan-500/20 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Actions
        </h3>
        <button
          onClick={handleReload}
          className="p-2 rounded-lg bg-gray-800/70 hover:bg-gray-700 text-gray-200 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.25)]"
          title="Reload"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {state === 0 && (
          <NeonButton
            onClick={handleOpen}
            disabled={disabled}
            gradient="from-cyan-500 to-blue-600"
          >
            Open to Bids
          </NeonButton>
        )}
        {state === 1 && (
          <NeonButton
            onClick={handleAccept}
            disabled={disabled}
            gradient="from-fuchsia-500 to-cyan-600"
          >
            View Bids
          </NeonButton>
        )}
        {state === 3 && (
          <NeonButton
            onClick={handleStart}
            disabled={disabled}
            gradient="from-indigo-500 to-purple-600"
          >
            Start Work
          </NeonButton>
        )}
        {state === 4 && (
          <>
            <NeonButton
              onClick={handleM1}
              disabled={disabled}
              gradient="from-cyan-500 to-blue-600"
            >
              Pay 1st Installment
            </NeonButton>
          </>
        )}
        {state === 5 && (
          <NeonButton
            onClick={handleM2}
            disabled={disabled}
            gradient="from-fuchsia-500 to-purple-600"
          >
            Pay 2nd Installment
          </NeonButton>
        )}
        {state === 6 && (
          <NeonButton
            onClick={handleM3}
            disabled={disabled}
            gradient="from-cyan-500 to-fuchsia-600"
          >
            Pay 3rd Installment
          </NeonButton>
        )}
        {state === 7 && (
          <NeonButton
            onClick={handleComplete}
            disabled={disabled}
            gradient="from-emerald-500 to-teal-600"
          >
            Complete
          </NeonButton>
        )}
        {[0, 1, 2, 3, 4, 5, 6, 7].includes(state) && (
          <NeonButton
            onClick={handleCancel}
            disabled={disabled}
            gradient="from-cyan-500 to-blue-600"
          >
            Cancel Proposal
          </NeonButton>
        )}
      </div>
    </div>
  );
}
