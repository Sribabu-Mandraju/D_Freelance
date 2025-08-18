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
import { useState, useRef, useEffect } from "react";
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
  currentState = 0,
  contractData = null,
  onStateChange = null,
}) {
  const [isProcessing, setIsProcessing] = useState(null);
  const scrollContainerRef = useRef(null);

  // Smart contract enum values matching the contract
  const ProposalState = {
    Draft: 0,
    Open: 1,
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

  // Extract proposal ID from contract data if available
  const effectiveProposalId = contractData?.contractProposalId || proposalId;

  // Get current user's wallet address (you'll need to pass this as a prop or get from context)
  const currentUserAddress =
    contractData?.currentUser || "0x0000000000000000000000000000000000000000";

  console.log("ProjectTimeline props:", {
    proposalId,
    effectiveProposalId,
    currentState,
    contractData,
    hasBidder: !!contractData?.bidder,
    hasClient: !!contractData?.client,
    currentUserAddress,
  });

  // Check if current user is the client
  const isClient =
    currentUserAddress.toLowerCase() === contractData?.client?.toLowerCase();

  // Check if current user is the bidder
  const isBidder =
    currentUserAddress.toLowerCase() === contractData?.bidder?.toLowerCase();

  // Handle state changes
  const handleStateChange = (newState) => {
    console.log("State change requested:", newState);
    if (onStateChange) {
      onStateChange(newState);
    }
  };

  // Update local state when prop changes
  useEffect(() => {
    if (currentState !== undefined) {
      console.log("ProjectTimeline: Current state updated to:", currentState);
    }
  }, [currentState]);

  // Check if a state transition is valid based on contract logic
  const isStateTransitionValid = (targetState) => {
    // Can't modify final states
    if (
      currentState === ProposalState.Completed ||
      currentState === ProposalState.Cancelled ||
      currentState === ProposalState.Refunded
    ) {
      return false;
    }

    // Client-only actions
    if (
      [
        ProposalState.Awarded,
        ProposalState.Funded,
        ProposalState.Cancelled,
        ProposalState.MilestonePayout_ONE,
        ProposalState.MilestonePayout_TWO,
        ProposalState.MilestonePayout_THREE,
        ProposalState.Completed,
      ].includes(targetState)
    ) {
      return isClient;
    }

    // Bidder-only actions
    if (targetState === ProposalState.InProgress) {
      return isBidder && currentState === ProposalState.Funded;
    }

    // Dispute can be raised by either client or bidder
    if (targetState === ProposalState.Disputed) {
      return isClient || isBidder;
    }

    // Sequential milestone validation
    if (
      targetState === ProposalState.MilestonePayout_TWO &&
      currentState !== ProposalState.MilestonePayout_ONE
    ) {
      return false;
    }
    if (
      targetState === ProposalState.MilestonePayout_THREE &&
      currentState !== ProposalState.MilestonePayout_TWO
    ) {
      return false;
    }

    return false; // Default to false for safety
  };

  // Get the next valid state based on current state
  const getNextValidState = () => {
    const validTransitions = [];

    // Add valid transitions based on current state and user role
    if (isClient) {
      switch (currentState) {
        case ProposalState.Draft:
          validTransitions.push(ProposalState.Open);
          break;
        case ProposalState.Open:
          validTransitions.push(ProposalState.Awarded);
          break;
        case ProposalState.Awarded:
          validTransitions.push(ProposalState.Funded);
          break;
        case ProposalState.Funded:
          // Client can cancel or wait for bidder to start work
          validTransitions.push(ProposalState.Cancelled);
          break;
        case ProposalState.InProgress:
          validTransitions.push(ProposalState.MilestonePayout_ONE);
          break;
        case ProposalState.MilestonePayout_ONE:
          validTransitions.push(ProposalState.MilestonePayout_TWO);
          break;
        case ProposalState.MilestonePayout_TWO:
          validTransitions.push(ProposalState.MilestonePayout_THREE);
          break;
        case ProposalState.MilestonePayout_THREE:
          validTransitions.push(ProposalState.Completed);
          break;
      }
    }

    if (isBidder && currentState === ProposalState.Funded) {
      validTransitions.push(ProposalState.InProgress);
    }

    // Dispute can be raised by either party
    if (
      (isClient || isBidder) &&
      ![
        ProposalState.Completed,
        ProposalState.Cancelled,
        ProposalState.Refunded,
      ].includes(currentState)
    ) {
      validTransitions.push(ProposalState.Disputed);
    }

    return validTransitions;
  };

  const getStateConfig = (state) => {
    const isValidTransition = isStateTransitionValid(state);
    const isCurrent = state === currentState;
    const isCompleted = state < currentState;
    const isPending = state > currentState;

    switch (state) {
      case ProposalState.Draft:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-gray-500 to-gray-600"
            : "bg-gray-700",
          border: isCurrent ? "border-gray-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-gray-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-gray-50" : "text-gray-400",
          icon: FileText,
          description: "Proposal draft created",
          actionText: "Create Proposal",
          isEnabled: isValidTransition && isCurrent,
          actionComponent:
            isValidTransition && isCurrent ? (
              <CreateProposalButton
                deadline={contractData?.endTime || "1758015222"}
                budget={contractData?.budget || 1000000}
              />
            ) : null,
        };
      case ProposalState.Open:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-blue-500 to-blue-600"
            : "bg-gray-700",
          border: isCurrent ? "border-blue-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-blue-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-blue-50" : "text-gray-400",
          icon: Award,
          description: "Proposal active and open for bids",
          actionText: "Open For Bids",
          isEnabled: isValidTransition && isCurrent,
          actionComponent:
            isValidTransition && isCurrent ? (
              <OpenProposalToBidButton proposalId={effectiveProposalId} />
            ) : null,
        };
      case ProposalState.Awarded:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-purple-500 to-purple-600"
            : "bg-gray-700",
          border: isCurrent ? "border-purple-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-purple-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-purple-50" : "text-gray-400",
          icon: Award,
          description: "Bid accepted, ready for funding",
          actionText: "Accept Bid",
          isEnabled: isValidTransition && isCurrent,
          actionComponent:
            isValidTransition && isCurrent ? (
              <AcceptBidButton
                proposalId={effectiveProposalId}
                bidder={
                  contractData?.bidder ||
                  "0xc90cA2179a4b52C8Dd556C9287340fc2A7784BB5"
                }
                bidAmount={contractData?.bidAmount || 100000}
              />
            ) : null,
        };
      case ProposalState.Funded:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-teal-500 to-teal-600"
            : "bg-gray-700",
          border: isCurrent ? "border-teal-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-teal-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-teal-50" : "text-gray-400",
          icon: DollarSign,
          description: "Funds deposited to escrow",
          actionText: "Deposit Funds",
          isEnabled: isValidTransition && isCurrent,
          actionComponent:
            isValidTransition && isCurrent ? (
              <DepositBidAmountButton proposalId={effectiveProposalId} />
            ) : null,
        };
      case ProposalState.InProgress:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-cyan-500 to-cyan-600"
            : "bg-gray-700",
          border: isCurrent ? "border-cyan-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-cyan-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-cyan-50" : "text-gray-400",
          icon: Clock,
          description: "Work in progress",
          actionText: "Start Work",
          isEnabled: isValidTransition && isCurrent,
          actionComponent:
            isValidTransition && isCurrent ? (
              <StartWorkButton proposalId={effectiveProposalId} />
            ) : null,
        };
      case ProposalState.MilestonePayout_ONE:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
            : "bg-gray-700",
          border: isCurrent ? "border-emerald-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-emerald-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-emerald-50" : "text-gray-400",
          icon: CheckCircle,
          description: "First milestone completed",
          actionText: "Pay First Milestone",
          isEnabled: isValidTransition && isCurrent,
          actionComponent:
            isValidTransition && isCurrent ? (
              <PayFirstMilestoneButton proposalId={effectiveProposalId} />
            ) : null,
        };
      case ProposalState.MilestonePayout_TWO:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-green-500 to-green-600"
            : "bg-gray-700",
          border: isCurrent ? "border-green-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-green-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-green-50" : "text-gray-400",
          icon: CheckCircle,
          description: "Second milestone completed",
          actionText: "Pay Second Milestone",
          isEnabled: isValidTransition && isCurrent,
          actionComponent:
            isValidTransition && isCurrent ? (
              <PaySecondMilestoneButton proposalId={effectiveProposalId} />
            ) : null,
        };
      case ProposalState.MilestonePayout_THREE:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-lime-500 to-lime-600"
            : "bg-gray-700",
          border: isCurrent ? "border-lime-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-lime-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-lime-50" : "text-gray-400",
          icon: CheckCircle,
          description: "Third milestone completed",
          actionText: "Pay Third Milestone",
          isEnabled: isValidTransition && isCurrent,
          actionComponent:
            isValidTransition && isCurrent ? (
              <PayThirdMilestoneButton proposalId={effectiveProposalId} />
            ) : null,
        };
      case ProposalState.Completed:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-green-600 to-green-700"
            : "bg-gray-700",
          border: isCurrent ? "border-green-500" : "border-gray-600",
          shadow: isCurrent ? "shadow-green-600/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-green-50" : "text-gray-400",
          icon: CheckCircle,
          description: "Project successfully completed",
          actionText: "Complete Proposal",
          isEnabled: false, // Completed state has no actions
          actionComponent: null,
        };
      case ProposalState.Disputed:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-orange-500 to-orange-600"
            : "bg-gray-700",
          border: isCurrent ? "border-orange-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-orange-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-orange-50" : "text-gray-400",
          icon: AlertCircle,
          description: "Dispute raised - requires resolution",
          actionText: "Resolve Dispute",
          isEnabled: false, // Dispute resolution handled separately
          actionComponent: null,
        };
      case ProposalState.Cancelled:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-red-500 to-red-600"
            : "bg-gray-700",
          border: isCurrent ? "border-red-400" : "border-gray-600",
          shadow: isCurrent ? "shadow-red-500/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-red-50" : "text-gray-400",
          icon: XCircle,
          description: "Proposal cancelled",
          actionText: "Proposal Cancelled",
          isEnabled: false, // Cancelled state has no actions
          actionComponent: null,
        };
      case ProposalState.Refunded:
        return {
          bg: isCurrent
            ? "bg-gradient-to-br from-red-600 to-red-700"
            : "bg-gray-700",
          border: isCurrent ? "border-red-500" : "border-gray-600",
          shadow: isCurrent ? "shadow-red-600/30" : "shadow-gray-700/30",
          text: isCurrent ? "text-red-50" : "text-gray-400",
          icon: XCircle,
          description: "Funds refunded",
          actionText: "Funds Refunded",
          isEnabled: false, // Refunded state has no actions
          actionComponent: null,
        };
      default:
        return {
          bg: "bg-gray-700",
          border: "border-gray-600",
          shadow: "shadow-gray-700/30",
          text: "text-gray-400",
          icon: FileText,
          description: "Status pending",
          actionText: "View Details",
          isEnabled: false,
          actionComponent: null,
        };
    }
  };

  const getStateName = (state) => {
    switch (state) {
      case ProposalState.Draft:
        return "Draft";
      case ProposalState.Open:
        return "Open";
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
      case ProposalState.Open:
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
        return ProposalState.Open;
      case ProposalState.Open:
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
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        isClient
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {isClient ? "Client" : "Not Client"}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        isBidder
                          ? "bg-green-500/20 text-green-300"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {isBidder ? "Bidder" : "Not Bidder"}
                    </span>
                  </div>
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
                {currentConfig.isEnabled ? "Available Action:" : "Status:"}
              </h5>
              <div className="inline-block">
                {currentConfig.actionComponent || (
                  <div className="text-center">
                    {currentConfig.isEnabled ? (
                      <button
                        disabled
                        className="bg-gray-600 text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                      >
                        No Action Available
                      </button>
                    ) : (
                      <div className="text-gray-400">
                        {currentConfig.actionText}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Show valid next states */}
              {currentConfig.isEnabled && (
                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-2">
                    Valid next states:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {getNextValidState().map((nextState) => (
                      <span
                        key={nextState}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                      >
                        {getStateName(nextState)} ({nextState})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flow Line Visualization */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-white">State Flow</h4>
            {getNextValidState().length > 0 ? (
              <button
                onClick={handleStateTransition}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <Zap className="w-4 h-4 inline mr-2" />
                Next State ({getNextValidState()[0]})
              </button>
            ) : (
              <div className="text-gray-400 text-sm px-4 py-2">
                No valid transitions available
              </div>
            )}
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
                ProposalState.Open,
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
                const isValidTransition = isStateTransitionValid(state);
                const canInteract = stateConfig.isEnabled;

                return (
                  <div key={state} className="flex flex-col items-center">
                    {/* State Node */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        isCurrent
                          ? canInteract
                            ? "border-cyan-400 bg-cyan-500 shadow-2xl shadow-cyan-500/50 scale-110"
                            : "border-orange-400 bg-orange-500 shadow-2xl shadow-orange-500/50 scale-110"
                          : isCompleted
                          ? "border-green-400 bg-green-500 shadow-lg shadow-green-500/30"
                          : isValidTransition
                          ? "border-blue-400 bg-blue-500 shadow-lg shadow-blue-500/30"
                          : "border-gray-600 bg-gray-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : isCurrent ? (
                        <StateIcon className="w-8 h-8 text-white" />
                      ) : isValidTransition ? (
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
                            ? canInteract
                              ? "text-cyan-400"
                              : "text-orange-400"
                            : isCompleted
                            ? "text-green-400"
                            : isValidTransition
                            ? "text-blue-400"
                            : "text-gray-400"
                        }`}
                      >
                        {getStateName(state)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{state}</div>
                      {isCurrent && !canInteract && (
                        <div className="text-xs text-orange-400 mt-1">
                          Waiting
                        </div>
                      )}
                      {isCurrent && canInteract && (
                        <div className="text-xs text-cyan-400 mt-1">Active</div>
                      )}
                    </div>

                    {/* Active Indicator */}
                    {isCurrent && (
                      <div className="mt-2">
                        <div
                          className={`w-3 h-3 rounded-full animate-ping ${
                            canInteract ? "bg-cyan-400" : "bg-orange-400"
                          }`}
                        ></div>
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
          Test the complete project flow with these interactive buttons (only
          valid actions shown)
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Only show buttons that are valid for current state */}
          {isStateTransitionValid(ProposalState.Draft) && (
            <CreateProposalButton deadline={"1758015222"} budget={1000000} />
          )}
          {isStateTransitionValid(ProposalState.Open) && (
            <OpenProposalToBidButton proposalId={effectiveProposalId} />
          )}
          {isStateTransitionValid(ProposalState.Awarded) && (
            <AcceptBidButton
              proposalId={effectiveProposalId}
              bidder={
                contractData?.bidder ||
                "0xc90cA2179a4b52C8Dd556C9287340fc2A7784BB5"
              }
              bidAmount={contractData?.bidAmount || 100000}
            />
          )}
          {isStateTransitionValid(ProposalState.Funded) && (
            <DepositBidAmountButton proposalId={effectiveProposalId} />
          )}
          {isStateTransitionValid(ProposalState.InProgress) && (
            <StartWorkButton proposalId={effectiveProposalId} />
          )}
          {isStateTransitionValid(ProposalState.MilestonePayout_ONE) && (
            <PayFirstMilestoneButton proposalId={effectiveProposalId} />
          )}
          {isStateTransitionValid(ProposalState.MilestonePayout_TWO) && (
            <PaySecondMilestoneButton proposalId={effectiveProposalId} />
          )}
          {isStateTransitionValid(ProposalState.MilestonePayout_THREE) && (
            <PayThirdMilestoneButton proposalId={effectiveProposalId} />
          )}
          {isStateTransitionValid(ProposalState.Completed) && (
            <CompleteProposalButton proposalId={effectiveProposalId} />
          )}
          {isStateTransitionValid(ProposalState.Cancelled) && (
            <CancelProposalButton proposalId={effectiveProposalId} />
          )}
        </div>

        {/* Show message if no valid actions */}
        {getNextValidState().length === 0 && (
          <div className="text-center mt-4 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400 text-sm">
              No actions available in current state. This could be because:
            </p>
            <ul className="text-gray-500 text-xs mt-2 space-y-1">
              <li>• You don't have permission for this action</li>
              <li>• The proposal is in a final state</li>
              <li>• Waiting for another party's action</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
