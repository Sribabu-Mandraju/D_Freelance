"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../Components/Navbar";
import BackgroundEffects from "../../Components/ProposalDetails/BackgroundEffects";
import BackButton from "../../Components/ProposalDetails/BackButton";
import ProposalHeader from "../../Components/ProposalDetails/ProposalHeader";
import ProjectDescription from "../../Components/ProposalDetails/ProjectDescription";
import RequirementsDeliverables from "../../Components/ProposalDetails/RequirementsDeliverables";
import TabNavigation from "../../Components/ProposalDetails/TabNavigation";
import ProjectTimeline from "../../Components/ProposalDetails/ProjectTimeline";
import TabContent from "../../Components/ProposalDetails/TabContent";
import ProjectStats from "../../Components/ProposalDetails/ProjectStats";
import ClientInfo from "../../Components/ProposalDetails/ClientInfo";
import LocationMap from "../../Components/ProposalDetails/LocationMap";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center justify-center">
    <BackgroundEffects />
    <div className="relative z-10 text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-cyan-400 border-r-purple-500 mb-4"></div>
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-xl font-semibold">
        Loading proposal details...
      </div>
    </div>
  </div>
);

// Error Component
const ErrorDisplay = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center justify-center">
    <BackgroundEffects />
    <div className="relative z-10 text-center max-w-md mx-auto px-4">
      <div className="text-red-400 text-6xl mb-4">⚠️</div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 text-2xl font-bold mb-4">
        Failed to Load Proposal
      </h2>
      <p className="text-gray-300 mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default function ProposalDetails({ job, onBack }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposalState, setProposalState] = useState(0);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Handle retry for error cases
  const handleRetry = useCallback(() => {
    setError(null);
    if (job) {
      processJobData(job);
    } else if (id) {
      fetchProposal();
    }
  }, [job, id]);

  // Contract state mapping
  const contractStates = {
    0: "Draft",
    1: "Open",
    2: "Awarded",
    3: "Funded",
    4: "InProgress",
    5: "MilestonePayout_ONE",
    6: "MilestonePayout_TWO",
    7: "MilestonePayout_THREE",
    8: "Completed",
    9: "Disputed",
    10: "Cancelled",
    11: "Refunded",
  };

  const timeline = [
    { phase: "Proposal Draft", status: "Draft", date: "2025-01-01", state: 0 },
    { phase: "Proposal Open", status: "Open", date: "2025-01-10", state: 1 },
    {
      phase: "Award Confirmation",
      status: "Awarded",
      date: "2025-01-20",
      state: 2,
    },
    { phase: "Funding", status: "Funded", date: "2025-02-01", state: 3 },
    {
      phase: "Development",
      status: "InProgress",
      date: "2025-02-15",
      state: 4,
    },
    {
      phase: "Milestone 1",
      status: "MilestonePayout_ONE",
      date: "2025-03-01",
      state: 5,
    },
    {
      phase: "Milestone 2",
      status: "MilestonePayout_TWO",
      date: "2025-04-01",
      state: 6,
    },
    {
      phase: "Milestone 3",
      status: "MilestonePayout_THREE",
      date: "2025-05-01",
      state: 7,
    },
    {
      phase: "Project Completion",
      status: "Completed",
      date: "2025-06-01",
      state: 8,
    },
    {
      phase: "Dispute Resolution",
      status: "Disputed",
      date: "2025-06-15",
      state: 9,
    },
    {
      phase: "Project Cancellation",
      status: "Cancelled",
      date: "2025-07-01",
      state: 10,
    },
    {
      phase: "Refund Processing",
      status: "Refunded",
      date: "2025-07-15",
      state: 11,
    },
  ];

  const fetchProposal = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // If we have job data passed as prop, use it directly
      if (job) {
        console.log("Using job data from props:", job);
        processJobData(job);
        setIsLoading(false);
        return;
      }

      // Otherwise fetch from API
      const response = await fetch(`http://localhost:3001/api/proposals/${id}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch proposal: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Fetched proposal data from API:", data);
      processJobData(data);
      toast.success("Proposal loaded successfully!");
    } catch (err) {
      console.error("Error fetching proposal:", err);
      setError(err.message);
      toast.error("Failed to load proposal details");
    } finally {
      setIsLoading(false);
    }
  }, [id, job]);

  const processJobData = useCallback((data) => {
    console.log("Processing job data:", data);
    console.log("Skills requirement:", data.skills_requirement);
    console.log("Skills:", data.skills);
    console.log("Tags:", data.tags);
    console.log("Contract data:", data.contractData);

    // Extract contract state from contractData if available
    let currentState = 0;
    if (data.contractData && data.contractData.state !== undefined) {
      currentState = parseInt(data.contractData.state);
    }

    console.log(
      "Contract state:",
      currentState,
      "State name:",
      contractStates[currentState]
    );
    setProposalState(currentState);

    // Get current user's wallet address from localStorage or context
    const currentUserAddress =
      localStorage.getItem("authAddress") ||
      "0x0000000000000000000000000000000000000000";

    // Format the data to ensure compatibility with existing components
    const formattedJob = {
      ...data,
      // Use the actual description from API
      fullDescription: data.description || "No description provided",

      // Map requirements based on API data structure
      requirements: Array.isArray(data.requirements)
        ? data.requirements
        : [
            "3+ years of experience in relevant technologies",
            "Strong portfolio of previous work",
            "Excellent communication skills",
            "Ability to work independently",
            "Experience with agile development",
          ],

      // Map deliverables based on API data structure
      deliverables: Array.isArray(data.deliverables)
        ? data.deliverables
        : [
            "Complete project documentation",
            "Source code with comments",
            "Testing and deployment",
            "Post-launch support for 30 days",
          ],

      // Map client information
      client: data.client || {
        name: "Client Name",
        avatar: "/placeholder.svg?height=48&width=48",
        rating: 4.8,
        jobsPosted: 23,
      },

      // Map skills from API data
      skills: Array.isArray(data.skills_requirement)
        ? data.skills_requirement
        : Array.isArray(data.skills)
        ? data.skills
        : [],

      // Map location and other fields
      location: data.location || "Remote",
      budget: data.budget || "Contact for pricing",
      timeframe: data.project_duration || data.timeframe || "To be discussed",
      type: data.type || "Fixed Price",
      proposals: data.bids?.length || data.proposals || 0,
      postedTime:
        data.postedTime || new Date(data.createdAt).toLocaleDateString(),

      // Contract data from API with current user info
      contractData: data.contractData
        ? {
            ...data.contractData,
            currentUser: currentUserAddress,
          }
        : null,
      proposalId: data.proposalId || data.id,
      userWalletAddress: data.userWalletAddress,

      // Tags from API data
      tags: Array.isArray(data.tags) ? data.tags : [],
      isEditable: data.isEditable || false,

      // Additional fields that might be needed
      image: data.image || null,
      accepted_bidder: data.accepted_bidder || null,
      bids: Array.isArray(data.bids) ? data.bids : [],
    };

    console.log("Formatted job data:", formattedJob);
    setJobDetails(formattedJob);
  }, []);

  const handleStateAction = async (action) => {
    try {
      setIsActionLoading(true);

      const response = await fetch(
        `http://localhost:3001/api/proposals/${id}/actions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to execute action: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();

      // Update the proposal state if returned from API
      if (result.newState !== undefined) {
        setProposalState(result.newState);
      }

      // Refresh proposal data to get latest information
      await fetchProposal();

      return result;
    } catch (err) {
      console.error("Error executing action:", err);
      throw err;
    } finally {
      setIsActionLoading(false);
    }
  };

  const fetchAndProcessJob = useCallback(async () => {
    if (job) {
      console.log("Job data provided via props, processing...");
      setIsLoading(true);
      // Small delay to ensure smooth loading experience
      setTimeout(() => {
        processJobData(job);
        setIsLoading(false);
      }, 100);
    } else if (id) {
      fetchProposal();
    } else {
      setError("No proposal ID or job data provided");
      setIsLoading(false);
    }
  }, [id, job, fetchProposal, processJobData]);

  useEffect(() => {
    fetchAndProcessJob();
  }, [fetchAndProcessJob]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleRetry} />;
  }

  if (!jobDetails) {
    return (
      <ErrorDisplay error="No proposal data found" onRetry={handleRetry} />
    );
  }

  // Safety check: ensure required arrays exist and component is ready to render
  if (!jobDetails.skills || !Array.isArray(jobDetails.skills)) {
    console.log("Skills not ready, showing loading...");
    return <LoadingSpinner />;
  }

  // Additional safety check for other required arrays
  if (
    !Array.isArray(jobDetails.requirements) ||
    !Array.isArray(jobDetails.deliverables)
  ) {
    console.log("Requirements or deliverables not ready, showing loading...");
    return <LoadingSpinner />;
  }

  // Safety check: ensure required arrays exist
  if (!Array.isArray(jobDetails.tags)) {
    jobDetails.tags = [];
  }
  if (!Array.isArray(jobDetails.requirements)) {
    jobDetails.requirements = [];
  }
  if (!Array.isArray(jobDetails.deliverables)) {
    jobDetails.deliverables = [];
  }
  if (!Array.isArray(jobDetails.bids)) {
    jobDetails.bids = [];
  }

  // Final validation: ensure all required fields are present
  if (!jobDetails.title || !jobDetails.description) {
    console.error("Missing required job details:", jobDetails);
    return (
      <ErrorDisplay
        error="Job data is incomplete. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  console.log("Rendering ProposalDetails with:", {
    jobDetails,
    proposalState,
    activeTab,
    hasContractData: !!jobDetails.contractData,
    contractState: jobDetails.contractData?.state,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <BackgroundEffects />

      <Navbar />

      <div className="pt-8 mt-12 pb-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <BackButton onBack={onBack} />

          <ProposalHeader jobDetails={jobDetails} />

          <div className="space-y-6 mb-6">
            <ProjectDescription jobDetails={jobDetails} />
            <RequirementsDeliverables jobDetails={jobDetails} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {activeTab === "details" && (
                <div className="space-y-4 sm:space-y-6">
                  <ProjectTimeline
                    timeline={timeline}
                    proposalId={id || jobDetails?.proposalId}
                    currentState={proposalState}
                    contractData={jobDetails?.contractData}
                    onStateChange={setProposalState}
                  />

                  {isActionLoading && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
                        <div className="flex items-center gap-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-2 border-transparent border-t-cyan-400"></div>
                          <span className="text-cyan-400 font-medium">
                            Processing action...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <TabContent activeTab={activeTab} />
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              <ProjectStats jobDetails={jobDetails} />
              <ClientInfo client={jobDetails.client} />
              <LocationMap location={jobDetails.location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
