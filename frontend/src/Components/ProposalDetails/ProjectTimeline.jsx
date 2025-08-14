import { CheckCircle, Clock, AlertCircle, XCircle, DollarSign, FileText, Award } from "lucide-react";
import { useState } from "react";

export default function ProjectTimeline({ timeline }) {
  const [isProcessing, setIsProcessing] = useState(null); // Track which action is processing

  const getStatusConfig = (status) => {
    switch (status) {
      case "Draft":
        return {
          bg: "bg-gray-600",
          border: "border-gray-500",
          shadow: "shadow-gray-500/50",
          text: "text-gray-300",
          cardBorder: "border-gray-600/30",
          cardShadow: "shadow-gray-600/20",
          description: "📝 Proposal is in draft mode, ready for review and submission",
          actionText: "Submit Proposal",
          actionIcon: FileText,
          actionColor: "bg-gray-500 hover:bg-gray-400",
        };
      case "Active":
        return {
          bg: "bg-blue-500",
          border: "border-blue-400",
          shadow: "shadow-blue-500/50",
          text: "text-blue-400",
          cardBorder: "border-blue-500/30",
          cardShadow: "shadow-blue-500/20",
          description: "🚀 Proposal is active and open for voting or review",
          actionText: "Vote on Proposal",
          actionIcon: Award,
          actionColor: "bg-blue-500 hover:bg-blue-400",
        };
      case "Awarded":
        return {
          bg: "bg-purple-500",
          border: "border-purple-400",
          shadow: "shadow-purple-500/50",
          text: "text-purple-400",
          cardBorder: "border-purple-500/30",
          cardShadow: "shadow-purple-500/20",
          description: "🏆 Proposal has been awarded, awaiting funding",
          actionText: "Confirm Award",
          actionIcon: Award,
          actionColor: "bg-purple-500 hover:bg-purple-400",
        };
      case "Funded":
        return {
          bg: "bg-teal-500",
          border: "border-teal-400",
          shadow: "shadow-teal-500/50",
          text: "text-teal-400",
          cardBorder: "border-teal-500/30",
          cardShadow: "shadow-teal-500/20",
          description: "💰 Project has been funded and ready to start",
          actionText: "Start Project",
          actionIcon: DollarSign,
          actionColor: "bg-teal-500 hover:bg-teal-400",
        };
      case "InProgress":
        return {
          bg: "bg-cyan-500",
          border: "border-cyan-400",
          shadow: "shadow-cyan-500/50",
          text: "text-cyan-400",
          cardBorder: "border-cyan-500/30",
          cardShadow: "shadow-cyan-500/20",
          description: "🔨 Project is actively in progress",
          actionText: "Update Progress",
          actionIcon: Clock,
          actionColor: "bg-cyan-500 hover:bg-cyan-400",
        };
      case "MilestonePayout_ONE":
      case "MilestonePayout_TWO":
      case "MilestonePayout_THREE":
        return {
          bg: "bg-indigo-500",
          border: "border-indigo-400",
          shadow: "shadow-indigo-500/50",
          text: "text-indigo-400",
          cardBorder: "border-indigo-500/30",
          cardShadow: "shadow-indigo-500/20",
          description: `🎯 Milestone ${status.split('_')[1]} payout completed`,
          actionText: "Request Next Payout",
          actionIcon: DollarSign,
          actionColor: "bg-indigo-500 hover:bg-indigo-400",
        };
      case "Completed":
        return {
          bg: "bg-green-500",
          border: "border-green-400",
          shadow: "shadow-green-500/50",
          text: "text-green-400",
          cardBorder: "border-green-500/30",
          cardShadow: "shadow-green-500/20",
          description: "✅ Project successfully completed",
          actionText: "Review Project",
          actionIcon: CheckCircle,
          actionColor: "bg-green-500 hover:bg-green-400",
        };
      case "Disputed":
        return {
          bg: "bg-red-500",
          border: "border-red-400",
          shadow: "shadow-red-500/50",
          text: "text-red-400",
          cardBorder: "border-red-500/30",
          cardShadow: "shadow-red-500/20",
          description: "⚠️ Project is in dispute, awaiting resolution",
          actionText: "Resolve Dispute",
          actionIcon: AlertCircle,
          actionColor: "bg-red-500 hover:bg-red-400",
        };
      case "Cancelled":
        return {
          bg: "bg-orange-500",
          border: "border-orange-400",
          shadow: "shadow-orange-500/50",
          text: "text-orange-400",
          cardBorder: "border-orange-500/30",
          cardShadow: "shadow-orange-500/20",
          description: "🛑 Project has been cancelled",
          actionText: "View Details",
          actionIcon: XCircle,
          actionColor: "bg-orange-500 hover:bg-orange-400",
        };
      case "Refunded":
        return {
          bg: "bg-yellow-500",
          border: "border-yellow-400",
          shadow: "shadow-yellow-500/50",
          text: "text-yellow-400",
          cardBorder: "border-yellow-500/30",
          cardShadow: "shadow-yellow-500/20",
          description: "💸 Funds have been refunded",
          actionText: "View Refund Details",
          actionIcon: DollarSign,
          actionColor: "bg-yellow-500 hover:bg-yellow-400",
        };
      default:
        return {
          bg: "bg-gray-700",
          border: "border-gray-600",
          shadow: "",
          text: "text-gray-400",
          cardBorder: "border-gray-700/30",
          cardShadow: "",
          description: "⏳ Scheduled to begin after previous phases complete",
          actionText: "View Details",
          actionIcon: FileText,
          actionColor: "bg-gray-600 hover:bg-gray-500",
        };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Draft":
        return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
      case "Active":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse";
      case "Awarded":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30";
      case "Funded":
        return "bg-teal-500/20 text-teal-400 border border-teal-500/30";
      case "InProgress":
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse";
      case "MilestonePayout_ONE":
      case "MilestonePayout_TWO":
      case "MilestonePayout_THREE":
        return "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30";
      case "Completed":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "Disputed":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "Cancelled":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
      case "Refunded":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      default:
        return "bg-gray-700/20 text-gray-400 border border-gray-700/30";
    }
  };

  const handleAction = (status, index) => {
    setIsProcessing(index);
    // Simulate async action (e.g., API call)
    setTimeout(() => {
      console.log(`Action for ${status} triggered`);
      setIsProcessing(null);
    }, 1000);
  };

  // Calculate progress percentage for timeline
  const calculateProgress = () => {
    const totalStates = Object.keys(ProposalState).length;
    const completedIndex = timeline.findIndex(phase => phase.status === "Completed" || phase.status === "Disputed" || phase.status === "Cancelled" || phase.status === "Refunded");
    const currentIndex = completedIndex === -1 ? timeline.findIndex(phase => phase.status === "InProgress") : completedIndex;
    return currentIndex !== -1 ? ((currentIndex + 1) / totalStates) * 100 : 40;
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse">
            Project Timeline
          </span>
        </h3>
        <p className="text-sm sm:text-base">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-300">
            Track the progress of this exciting project
          </span>
        </p>
      </div>

      <div className="relative">
        {/* Main timeline line */}
        <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full"></div>

        {/* Progress line */}
        <div
          className="absolute left-4 sm:left-6 lg:left-8 top-0 w-0.5 sm:w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-lg shadow-cyan-500/50 transition-all duration-1000"
          style={{ height: `${calculateProgress()}%` }}
        ></div>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {timeline?.map((phase, index) => {
            const config = getStatusConfig(phase.status);
            const ActionIcon = config.actionIcon;

            return (
              <div key={index} className="relative flex items-start gap-3 sm:gap-4 lg:gap-6 group">
                {/* Timeline node */}
                <div className="relative z-10">
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 sm:border-3 lg:border-4 flex items-center justify-center transition-all duration-300 ${config.bg} ${config.border} ${config.shadow ? `shadow-lg ${config.shadow}` : ""} ${
                      phase.status === "InProgress" ? "animate-pulse" : ""
                    }`}
                  >
                    {phase.status === "Completed" && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                    {phase.status === "InProgress" && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
                    )}
                    {phase.status === "Disputed" && <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                    {phase.status === "Cancelled" && <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                    {phase.status === "Refunded" && <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                  </div>

                  {/* Glowing ring effect for active phase */}
                  {phase.status === "InProgress" && (
                    <div className="absolute inset-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-cyan-400 animate-ping opacity-75"></div>
                  )}
                </div>

                {/* Timeline content */}
                <div className="flex-1 pb-4 sm:pb-6 lg:pb-8">
                  <div
                    className={`bg-black/60 backdrop-blur-xl rounded-xl p-3 sm:p-4 lg:p-6 border transition-all duration-300 group-hover:scale-[1.02] hover:shadow-2xl ${config.cardBorder} ${config.cardShadow ? `shadow-lg ${config.cardShadow}` : ""}`}
                  >
                    {/* Phase header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3">
                      <h4 className={`text-lg sm:text-xl font-bold ${config.text}`}>
                        <span
                          className={
                            phase.status === "InProgress"
                              ? "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
                              : ""
                          }
                        >
                          {phase.phase}
                        </span>
                      </h4>
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium self-start ${getStatusBadge(phase.status)}`}
                      >
                        {phase.status.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                      </span>
                    </div>

                    {/* Phase description */}
                    <p className="mb-3 text-sm sm:text-base">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                        {config.description}
                      </span>
                    </p>

                    {/* Phase footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-xs sm:text-sm flex items-center gap-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-300">
                          {phase.date}
                        </span>
                      </span>

                      {/* Action button */}
                      <button
                        onClick={() => handleAction(phase.status, index)}
                        disabled={isProcessing === index}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${config.actionColor} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <ActionIcon className="w-4 h-4" />
                        {isProcessing === index ? "Processing..." : config.actionText}
                      </button>
                    </div>

                    {/* Progress bar for InProgress and Milestone phases */}
                    {(phase.status === "InProgress" || phase.status.includes("MilestonePayout")) && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-300">
                            Progress
                          </span>
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
                            {phase.status.includes("MilestonePayout") ? "100%" : "65%"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 sm:h-2 rounded-full shadow-lg shadow-cyan-500/50 transition-all duration-1000 animate-pulse"
                            style={{ width: phase.status.includes("MilestonePayout") ? "100%" : "65%" }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Example usage:
/*
const timeline = [
  { phase: "Proposal Draft", status: "Draft", date: "2025-01-01" },
  { phase: "Proposal Voting", status: "Active", date: "2025-01-10" },
  { phase: "Award Confirmation", status: "Awarded", date: "2025-01-20" },
  { phase: "Funding", status: "Funded", date: "2025-02-01" },
  { phase: "Development", status: "InProgress", date: "2025-02-15" },
  { phase: "Milestone 1", status: "MilestonePayout_ONE", date: "2025-03-01" },
  { phase: "Milestone 2", status: "MilestonePayout_TWO", date: "2025-04-01" },
  { phase: "Milestone 3", status: "MilestonePayout_THREE", date: "2025-05-01" },
  { phase: "Project Completion", status: "Completed", date: "2025-06-01" },
  { phase: "Dispute Resolution", status: "Disputed", date: "2025-06-15" },
  { phase: "Project Cancellation", status: "Cancelled", date: "2025-07-01" },
  { phase: "Refund Processing", status: "Refunded", date: "2025-07-15" },
];

<ProjectTimeline timeline={timeline} />
*/