import React, { useEffect, useRef } from "react";
import {
  RefreshCcw,
  Check,
  Clock,
  Play,
  DollarSign,
  Flag,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  useOpenProposalToBid,
  useStartWork,
  usePayFirstMilestone,
  usePaySecondMilestone,
  usePayThirdMilestone,
  useCompleteProposal,
  useCancelProposal,
} from "../../interactions/ProposalManager_interactions";

const StageButton = ({
  onClick,
  disabled,
  isActive,
  isCompleted,
  stage,
  icon: Icon,
  size = "default",
}) => {
  const buttonSize = size === "large" ? "w-16 h-16" : "w-12 h-12";
  const iconSize = size === "large" ? "w-7 h-7" : "w-5 h-5";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative ${buttonSize} rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${
        isCompleted
          ? "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          : isActive
          ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_30px_rgba(34,211,238,0.6)] animate-pulse"
          : disabled
          ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-slate-600 to-slate-700 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
      } border-2 border-white/20`}
    >
      {isCompleted ? (
        <Check className={`${iconSize} text-white`} />
      ) : (
        <Icon className={`${iconSize}`} />
      )}

      {/* Stage number badge */}
      <div
        className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
          isCompleted
            ? "bg-emerald-500 text-white"
            : isActive
            ? "bg-cyan-500 text-white animate-ping"
            : "bg-gray-600 text-gray-300"
        }`}
      >
        {stage}
      </div>
    </button>
  );
};

const VerticalConnector = ({ isCompleted, isActive, height = "h-8" }) => (
  <div
    className={`w-0.5 ${height} transition-all duration-300 mx-auto ${
      isCompleted
        ? "bg-gradient-to-b from-emerald-500 to-emerald-400"
        : isActive
        ? "bg-gradient-to-b from-cyan-500 to-cyan-400 animate-pulse"
        : "bg-gray-600"
    }`}
  />
);

export default function ActionBar({ dbId, proposalId, state, onChainSuccess }) {
  const {
    openProposalToBid,
    isPending: isOpenPending,
    isConfirming: isOpenConfirming,
    isConfirmed: isOpenConfirmed,
  } = useOpenProposalToBid();
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
      isStartPending ||
      isM1P ||
      isM2P ||
      isM3P ||
      isCP ||
      isCanP
    ) {
      hasEmittedSuccessRef.current = false;
    }
  }, [isOpenPending, isStartPending, isM1P, isM2P, isM3P, isCP, isCanP]);

  const handleOpen = async () => {
    try {
      await openProposalToBid(proposalId);
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

  // Define proposal stages with their properties
  const stages = [
    {
      id: 0,
      name: "Draft",
      title: "Proposal Draft",
      description:
        "Your proposal has been created and is ready to be opened for bidding. This is the initial stage where you can review and make any final adjustments before making it public.",
      icon: Clock,
      isCompleted: state > 0,
      isActive: state === 0,
      isDisabled: state > 0,
      handler: handleOpen,
      isPending: isOpenPending || isOpenConfirming,
      actionText: "Open for Bids",
    },
    {
      id: 1,
      name: "Open for Bids",
      title: "Accepting Bids",
      description:
        "Your proposal is now live and freelancers can submit their bids. They'll stake 25 HFT tokens and provide cover letters with their proposed budgets. Monitor incoming bids and choose the best fit for your project.",
      icon: Play,
      isCompleted: state > 1,
      isActive: state === 1,
      isDisabled: state !== 1,
      handler: null,
      isPending: false,
      actionText: "View Bids",
    },
    {
      id: 2,
      name: "Awarded",
      title: "Bid Awarded",
      description:
        "You've selected a freelancer and their bid has been accepted. The project is now assigned and ready to begin. The freelancer will start working on your project according to the agreed terms.",
      icon: Flag,
      isCompleted: state > 2,
      isActive: state === 2,
      isDisabled: state !== 2,
      handler: null,
      isPending: false,
      actionText: "Ready to Start",
    },
    {
      id: 3,
      name: "Start Work",
      title: "Project Started",
      description:
        "The freelancer has officially begun working on your project. This marks the start of the development phase. You can now track progress and prepare for the first milestone payment.",
      icon: Play,
      isCompleted: state > 3,
      isActive: state === 3,
      isDisabled: state < 3,
      handler: handleStart,
      isPending: isStartPending || isStartConfirming,
      actionText: "Start Work",
    },
    {
      id: 4,
      name: "1st Payment",
      title: "First Milestone",
      description:
        "The first phase of work has been completed. Review the deliverables and release the first payment to the freelancer. This typically covers 30-40% of the total project cost.",
      icon: DollarSign,
      isCompleted: state > 4,
      isActive: state === 4,
      isDisabled: state < 4,
      handler: handleM1,
      isPending: isM1P || isM1C,
      actionText: "Pay 1st Milestone",
    },
    {
      id: 5,
      name: "2nd Payment",
      title: "Second Milestone",
      description:
        "The second phase is complete with significant progress made. Review the latest deliverables and release the second payment. This usually covers another 30-40% of the project cost.",
      icon: DollarSign,
      isCompleted: state > 5,
      isActive: state === 5,
      isDisabled: state < 5,
      handler: handleM2,
      isPending: isM2P || isM2C,
      actionText: "Pay 2nd Milestone",
    },
    {
      id: 6,
      name: "3rd Payment",
      title: "Final Milestone",
      description:
        "The project is nearly complete with the final phase finished. Review the final deliverables and release the remaining payment. This covers the final 20-40% of the project cost.",
      icon: DollarSign,
      isCompleted: state > 6,
      isActive: state === 6,
      isDisabled: state < 6,
      handler: handleM3,
      isPending: isM3P || isM3C,
      actionText: "Pay Final Milestone",
    },
    {
      id: 7,
      name: "Complete",
      title: "Project Complete",
      description:
        "Congratulations! Your project has been successfully completed. All milestones have been delivered and payments have been processed. The freelancer has fulfilled all requirements and the project is now finished.",
      icon: Flag,
      isCompleted: state > 7,
      isActive: state === 7,
      isDisabled: state < 7,
      handler: handleComplete,
      isPending: isCP || isCC,
      actionText: "Mark Complete",
    },
  ];

  const currentStage = stages.find((s) => s.id === state);
  const completedStages = stages.filter((s) => s.isCompleted);
  const progressPercentage =
    ((completedStages.length + (currentStage?.isActive ? 0.5 : 0)) /
      stages.length) *
    100;

  return (
    <div className="rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-black/60 via-slate-900/40 to-black/60 border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.1)]">
      {/* Header with Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
            🚀 Proposal Progress
          </h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm text-cyan-300 font-bold min-w-[3rem]">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <p className="text-sm text-gray-300">
            <span className="text-cyan-400 font-semibold">
              Stage {state + 1} of {stages.length}
            </span>
            : {currentStage?.description?.split(".")[0] || "Unknown stage"}
          </p>
        </div>
        <button
          onClick={handleReload}
          className="p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-200 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.25)] transition-all hover:scale-105 active:scale-95"
          title="Reload"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Vertical Timeline */}
      <div className="space-y-6">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-start gap-4">
            {/* Left: Stage Button */}
            <div className="flex flex-col  mt-[-25px] items-center flex-shrink-0">
              <StageButton
                onClick={stage.handler}
                disabled={stage.isDisabled || stage.isPending || disabled}
                isActive={stage.isActive}
                isCompleted={stage.isCompleted}
                stage={stage.id + 1}
                icon={stage.icon}
                size={stage.isActive ? "large" : "default"}
              />

              {/* Connector to next stage */}
              {index < stages.length - 1 && (
                <VerticalConnector
                  isCompleted={stage.isCompleted}
                  isActive={stage.isActive}
                  height="h-[120px]"
                />
              )}
            </div>

            {/* Right: Stage Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <h4
                  className={`text-lg font-bold mb-1 ${
                    stage.isCompleted
                      ? "text-emerald-400"
                      : stage.isActive
                      ? "text-cyan-400"
                      : "text-gray-400"
                  }`}
                >
                  {stage.title}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Action Button */}
              {stage.handler && (
                <button
                  onClick={stage.handler}
                  disabled={stage.isDisabled || stage.isPending || disabled}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    stage.isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                      : stage.isCompleted
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {stage.isPending || stage.isConfirming
                    ? "Processing..."
                    : stage.actionText}
                </button>
              )}

              {/* Status Indicator */}
              {stage.isActive && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-cyan-300 font-medium">
                    Current Stage
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Button */}
      <div className="mt-8 pt-6 border-t border-gray-700/50">
        <button
          onClick={handleCancel}
          disabled={disabled || isCanP || isCanC}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold disabled:opacity-50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-2">
            <X className="w-5 h-5" />
            Cancel Proposal
          </div>
        </button>
      </div>
    </div>
  );
}
