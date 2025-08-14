"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../components/ProposalDetails/Navbar";
import BackgroundEffects from "../../components/ProposalDetails/BackgroundEffects";
import BackButton from "../../components/ProposalDetails/BackButton";
import ProposalHeader from "../../components/ProposalDetails/ProposalHeader";
import ProjectDescription from "../../components/ProposalDetails/ProjectDescription";
import RequirementsDeliverables from "../../components/ProposalDetails/RequirementsDeliverables";
import TabNavigation from "../../components/ProposalDetails/TabNavigation";
import ProjectTimeline from "../../components/ProposalDetails/ProjectTimeline";
import TabContent from "../../components/ProposalDetails/TabContent";
import ProjectStats from "../../components/ProposalDetails/ProjectStats";
import ClientInfo from "../../components/ProposalDetails/ClientInfo";
import LocationMap from "../../components/ProposalDetails/LocationMap";

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

export default function ProposalDetails({ onBack }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposalState, setProposalState] = useState(0);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const timeline = [
    { phase: "Proposal Draft", status: "Draft", date: "2025-01-01" },
    { phase: "Proposal Voting", status: "Active", date: "2025-01-10" },
    { phase: "Award Confirmation", status: "Awarded", date: "2025-01-20" },
    { phase: "Funding", status: "Funded", date: "2025-02-01" },
    { phase: "Development", status: "InProgress", date: "2025-02-15" },
    { phase: "Milestone 1", status: "MilestonePayout_ONE", date: "2025-03-01" },
    { phase: "Milestone 2", status: "MilestonePayout_TWO", date: "2025-04-01" },
    {
      phase: "Milestone 3",
      status: "MilestonePayout_THREE",
      date: "2025-05-01",
    },
    { phase: "Project Completion", status: "Completed", date: "2025-06-01" },
    { phase: "Dispute Resolution", status: "Disputed", date: "2025-06-15" },
    { phase: "Project Cancellation", status: "Cancelled", date: "2025-07-01" },
    { phase: "Refund Processing", status: "Refunded", date: "2025-07-15" },
  ];

  const fetchProposal = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3001/api/proposals/${id}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch proposal: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      setProposalState(data.state || 0);

      // Format the data to ensure compatibility with existing components
      const formattedJob = {
        ...data,
        fullDescription:
          data.description +
          " This is an exciting opportunity to work with cutting-edge technologies and create something truly remarkable. The project involves innovative solutions and requires creative problem-solving skills.",
        requirements: data.requirements || [
          "3+ years of experience in relevant technologies",
          "Strong portfolio of previous work",
          "Excellent communication skills",
          "Ability to work independently",
          "Experience with agile development",
        ],
        deliverables: data.deliverables || [
          "Complete project documentation",
          "Source code with comments",
          "Testing and deployment",
          "Post-launch support for 30 days",
        ],
        client: data.client || {
          name: "Client Name",
          avatar: "/placeholder.svg?height=48&width=48",
          rating: 4.8,
          jobsPosted: 23,
        },
        skills: data.skills || [],
        location: data.location || "Remote",
        budget: data.budget || "Contact for pricing",
        timeframe: data.timeframe || "To be discussed",
        type: data.type || "Fixed Price",
        proposals: data.proposals || 0,
        postedTime: data.postedTime || "Recently posted",
      };

      setJobDetails(formattedJob);
      toast.success("Proposal loaded successfully!");
    } catch (err) {
      console.error("Error fetching proposal:", err);
      setError(err.message);
      toast.error("Failed to load proposal details");
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    if (id) {
      fetchProposal();
    } else {
      setError("No proposal ID provided");
      setIsLoading(false);
    }
  }, [id]);

  const handleRetry = () => {
    fetchProposal();
  };

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
                  <ProjectTimeline timeline={timeline} />

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
