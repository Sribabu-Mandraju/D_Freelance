import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign,
  FileText,
  Award,
  Play,
  Pause,
  Zap,
} from "lucide-react";
import { useState, useRef } from "react";
import CreateProposalButton from "../testingContracts/CreateProposal";
import OpenProposalToBidButton from "../testingContracts/OpenProposalToBid";
import StartWorkButton from "../testingContracts/StartWork";
import PayFirstMilestoneButton from "../testingContracts/PayFirstMileStone";
import PaySecondMilestoneButton from "../testingContracts/PaySecondMileStone";
import PayThirdMilestoneButton from "../testingContracts/PayThirdMileStone";
import CompleteProposalButton from "../testingContracts/CompleteProposal";
import CancelProposalButton from "../testingContracts/CancelProposal";
import AcceptBidButton from "../testingContracts/AcceptBid";
import DepositBidAmountButton from "../testingContracts/DepositBidAmount";

export default function ProjectTimeline({
  timeline,
  proposalId,
  selectedBidder,
  selectedBidAmount,
}) {
  const [isProcessing, setIsProcessing] = useState(null);
  const scrollContainerRef = useRef(null);

  // Smart contract enum values
  const ProposalState = {
    Draft: 0,
    Active: 1,
    Awarded: 2,
    Funded: 3,
    InProgress: 4,
    MilestonePayout_ONE: 5,
    MilestonePayout_TWO: 6,
    MilestonePayout_THREE: 7,
    Completed: 8,
    Disputed: 9,
    Cancelled: 10,
    Refunded: 11,
  };

  // For demo purposes, start with Draft state
  const [currentState, setCurrentState] = useState(ProposalState.Draft);

  const getStateConfig = (state) => {
    switch (state) {
      case ProposalState.Draft:
        return {
          bg: "bg-gradient-to-br from-gray-500 to-gray-600",
          border: "border-gray-400",
          shadow: "shadow-gray-500/30",
          text: "text-gray-50",
          icon: FileText,
          description: "Proposal draft created",
          actionText: "Create Proposal",
          actionComponent: (
            <CreateProposalButton deadline={"1758015222"} budget={1000000} />
          ),
        };
      case ProposalState.Active:
        return {
          bg: "bg-gradient-to-br from-blue-500 to-blue-600",
          border: "border-blue-400",
          shadow: "shadow-blue-500/30",
          text: "text-blue-50",
          icon: Award,
          description: "Proposal active and open for bids",
          actionText: "Open For Bids",
          actionComponent: <OpenProposalToBidButton proposalId={34} />,
        };
      case ProposalState.Awarded:
        return {
          bg: "bg-gradient-to-br from-purple-500 to-purple-600",
          border: "border-purple-400",
          shadow: "shadow-purple-500/30",
          text: "text-purple-50",
          icon: Award,
          description: "Bid accepted, ready for funding",
          actionText: "Accept Bid",
          actionComponent: (
            <AcceptBidButton
              proposalId={34}
              bidder={"0xc90cA2179a4b52C8Dd556C9287340fc2A7784BB5"}
              bidAmount={100000}
            />
          ),
        };
      case ProposalState.Funded:
        return {
          bg: "bg-gradient-to-br from-teal-500 to-teal-600",
          border: "border-teal-400",
          shadow: "shadow-teal-500/30",
          text: "text-teal-50",
          icon: DollarSign,
          description: "Funds deposited to escrow",
          actionText: "Deposit Funds",
          actionComponent: <DepositBidAmountButton proposalId={proposalId} />,
        };
      case ProposalState.InProgress:
        return {
          bg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
          border: "border-cyan-400",
          shadow: "shadow-cyan-500/30",
          text: "text-cyan-50",
          icon: Clock,
          description: "Work in progress",
          actionText: "Start Work",
          actionComponent: <StartWorkButton proposalId={proposalId} />,
        };
      case ProposalState.MilestonePayout_ONE:
        return {
          bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
          border: "border-emerald-400",
          shadow: "shadow-emerald-500/30",
          text: "text-emerald-50",
          icon: CheckCircle,
          description: "First milestone completed",
          actionText: "Pay First Milestone",
          actionComponent: <PayFirstMilestoneButton proposalId={proposalId} />,
        };
      case ProposalState.MilestonePayout_TWO:
        return {
          bg: "bg-gradient-to-br from-green-500 to-green-600",
          border: "border-green-400",
          shadow: "shadow-green-500/30",
          text: "text-green-50",
          icon: CheckCircle,
          description: "Second milestone completed",
          actionText: "Pay Second Milestone",
          actionComponent: <PaySecondMilestoneButton proposalId={proposalId} />,
        };
      case ProposalState.MilestonePayout_THREE:
        return {
          bg: "bg-gradient-to-br from-lime-500 to-lime-600",
          border: "border-lime-400",
          shadow: "shadow-lime-500/30",
          text: "text-lime-50",
          icon: CheckCircle,
          description: "Third milestone completed",
          actionText: "Pay Third Milestone",
          actionComponent: <PayThirdMilestoneButton proposalId={proposalId} />,
        };
      case ProposalState.Completed:
        return {
          bg: "bg-gradient-to-br from-green-600 to-green-700",
          border: "border-green-500",
          shadow: "shadow-green-600/30",
          text: "text-green-50",
          icon: CheckCircle,
          description: "Project successfully completed",
          actionText: "Complete Proposal",
          actionComponent: <CompleteProposalButton proposalId={proposalId} />,
        };
      default:
        return {
          bg: "bg-gradient-to-br from-gray-500 to-gray-600",
          border: "border-gray-400",
          shadow: "shadow-gray-500/30",
          text: "text-gray-50",
          icon: FileText,
          description: "Status pending",
          actionText: "View Details",
          actionComponent: null,
        };
    }
  };

  const getStateName = (state) => {
    switch (state) {
      case ProposalState.Draft:
        return "Draft";
      case ProposalState.Active:
        return "Active";
      case ProposalState.Awarded:
        return "Awarded";
      case ProposalState.Funded:
        return "Funded";
      case ProposalState.InProgress:
        return "In Progress";
      case ProposalState.MilestonePayout_ONE:
        return "Milestone 1";
      case ProposalState.MilestonePayout_TWO:
        return "Milestone 2";
      case ProposalState.MilestonePayout_THREE:
        return "Milestone 3";
      case ProposalState.Completed:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getStateDescription = (state) => {
    switch (state) {
      case ProposalState.Draft:
        return "Create your proposal";
      case ProposalState.Active:
        return "Open for freelancer bids";
      case ProposalState.Awarded:
        return "Select winning bid";
      case ProposalState.Funded:
        return "Deposit funds to escrow";
      case ProposalState.InProgress:
        return "Freelancer starts work";
      case ProposalState.MilestonePayout_ONE:
        return "First milestone payment";
      case ProposalState.MilestonePayout_TWO:
        return "Second milestone payment";
      case ProposalState.MilestonePayout_THREE:
        return "Third milestone payment";
      case ProposalState.Completed:
        return "Project completed";
      default:
        return "Status pending";
    }
  };

  const isStateEnabled = (state) => {
    return state === currentState;
  };

  const getProgressPercentage = () => {
    const totalStates = 9; // Draft to Completed
    const currentIndex = currentState;
    return ((currentIndex + 1) / totalStates) * 100;
  };

  const getNextState = () => {
    switch (currentState) {
      case ProposalState.Draft:
        return ProposalState.Active;
      case ProposalState.Active:
        return ProposalState.Awarded;
      case ProposalState.Awarded:
        return ProposalState.Funded;
      case ProposalState.Funded:
        return ProposalState.InProgress;
      case ProposalState.InProgress:
        return ProposalState.MilestonePayout_ONE;
      case ProposalState.MilestonePayout_ONE:
        return ProposalState.MilestonePayout_TWO;
      case ProposalState.MilestonePayout_TWO:
        return ProposalState.MilestonePayout_THREE;
      case ProposalState.MilestonePayout_THREE:
        return ProposalState.Completed;
      default:
        return currentState;
    }
  };

  const handleStateTransition = () => {
    const nextState = getNextState();
    if (nextState !== currentState) {
      setCurrentState(nextState);
    }
  };

  const currentConfig = getStateConfig(currentState);

  return (
    <>
      {/* Professional Flow Line Header */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-cyan-500/20 border border-cyan-500/20">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Smart Contract Flow Tracker
            </span>
          </h3>
          <p className="text-gray-400 text-sm">
            Follow the on-chain proposal lifecycle with state-based actions
          </p>
        </div>

        {/* Current State Display */}
        <div className="mb-8">
          <div className="bg-black/60 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${currentConfig.bg} border-2 border-white/20 shadow-lg`}
                >
                  <currentConfig.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">
                    Current State: {getStateName(currentState)}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    State ID: {currentState} • {currentConfig.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-cyan-400 font-bold text-2xl">
                  {Math.round(getProgressPercentage())}%
                </div>
                <div className="text-gray-400 text-sm">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>

            {/* Current Action */}
            <div className="text-center">
              <h5 className="text-white font-semibold mb-3">
                Available Action:
              </h5>
              <div className="inline-block">
                {currentConfig.actionComponent || (
                  <button
                    disabled
                    className="bg-gray-600 text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                  >
                    No Action Available
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Flow Line Visualization */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-white">State Flow</h4>
            <button
              onClick={handleStateTransition}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Next State
            </button>
          </div>

          {/* Flow Line */}
          <div className="relative">
            {/* Main Flow Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full"></div>

            {/* Progress Flow Line */}
            <div
              className="absolute top-8 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>

            {/* State Nodes */}
            <div className="flex justify-between relative z-10">
              {[
                ProposalState.Draft,
                ProposalState.Active,
                ProposalState.Awarded,
                ProposalState.Funded,
                ProposalState.InProgress,
                ProposalState.MilestonePayout_ONE,
                ProposalState.MilestonePayout_TWO,
                ProposalState.MilestonePayout_THREE,
                ProposalState.Completed,
              ].map((state, index) => {
                const isCurrent = state === currentState;
                const isCompleted = state < currentState;
                const isPending = state > currentState;
                const stateConfig = getStateConfig(state);
                const StateIcon = stateConfig.icon;

                return (
                  <div key={state} className="flex flex-col items-center">
                    {/* State Node */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        isCurrent
                          ? "border-cyan-400 bg-cyan-500 shadow-2xl shadow-cyan-500/50 scale-110"
                          : isCompleted
                          ? "border-green-400 bg-green-500 shadow-lg shadow-green-500/30"
                          : "border-gray-600 bg-gray-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : isCurrent ? (
                        <StateIcon className="w-8 h-8 text-white" />
                      ) : (
                        <StateIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>

                    {/* State Label */}
                    <div className="mt-2 text-center">
                      <div
                        className={`text-xs font-medium ${
                          isCurrent
                            ? "text-cyan-400"
                            : isCompleted
                            ? "text-green-400"
                            : "text-gray-400"
                        }`}
                      >
                        {getStateName(state)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{state}</div>
                    </div>

                    {/* Active Indicator */}
                    {isCurrent && (
                      <div className="mt-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Controls Section */}
      <div className="mt-6 bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
        <h4 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Interactive Demo Controls
        </h4>
        <p className="text-sm text-gray-300 mb-4">
          Test the complete project flow with these interactive buttons
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <CreateProposalButton deadline={"1758015222"} budget={1000000} />
          <OpenProposalToBidButton proposalId={34} />
          <AcceptBidButton
            proposalId={34}
            bidder={"0xc90cA2179a4b52C8Dd556C9287340fc2A7784BB5"}
            bidAmount={100000}
          />
          <DepositBidAmountButton proposalId={34} />
          <StartWorkButton proposalId={34} />
          <PayFirstMilestoneButton proposalId={34} />
          <PaySecondMilestoneButton proposalId={34} />
          <PayThirdMilestoneButton proposalId={34} />
          <CompleteProposalButton proposalId={34} />
          <CancelProposalButton proposalId={34} />
        </div>
      </div>
    </>
  );
}
