import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  Bookmark,
  AlertCircle,
  Star,
  MessageCircle,
  CheckCircle,
  Target,
} from "lucide-react";
import ChatComponent from "./ChatComponent";
import ProjectTimeline from "../ProposalDetails/ProjectTimeline";
export default function ProposalDetails({
  job,
  onBack,
  setJobs,
  setIsLoading,
}) {
  const [activeTab, setActiveTab] = useState("details");
  const [jobDetails, setJobDetails] = useState(job);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const formattedJob = {
        ...job,
        fullDescription:
          job.description + " This is an exciting opportunity...",
        requirements: [
          "3+ years of experience in relevant technologies",
          "Strong portfolio of previous work",
          "Excellent communication skills",
          "Ability to work independently",
          "Experience with agile development",
        ],
        deliverables: [
          "Complete project documentation",
          "Source code with comments",
          "Testing and deployment",
          "Post-launch support for 30 days",
        ],
        timeline: [
          { phase: "Project Kickoff", status: "completed", date: "2024-01-15" },
          {
            phase: "Design & Planning",
            status: "completed",
            date: "2024-01-22",
          },
          {
            phase: "Development Phase",
            status: "in-progress",
            date: "2024-02-01",
          },
          { phase: "Testing & Review", status: "pending", date: "2024-02-15" },
          { phase: "Final Delivery", status: "pending", date: "2024-02-28" },
        ],
      };

      setJobDetails(formattedJob); // Update only local state
      setIsLoading(false);
    }, 500);
  }, []);

  // Static flow to demonstrate on-chain proposal lifecycle (numbered, no dates)
  const flowTimeline = [
    { step: 1, phase: "Launch Proposal", status: "Created" },
    { step: 2, phase: "Open For Bids", status: "OpenForBids" },
    { step: 3, phase: "Accept Bid", status: "SelectingBid" },
    { step: 4, phase: "Deposit Funds", status: "Funded" },
    { step: 5, phase: "Start Work", status: "InProgress" },
    { step: 6, phase: "Pay First Payment", status: "Milestone1Paid" },
    { step: 7, phase: "Pay Second Payment", status: "Milestone2Paid" },
    { step: 8, phase: "Pay Third Payment", status: "Milestone3Paid" },
    { step: 9, phase: "Complete", status: "Completed" },
    { phase: "Cancel", status: "Cancelled" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-20 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <Navbar />
      <div className="pt-8 mt-12 pb-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors duration-200 hover:shadow-lg hover:shadow-cyan-500/20 p-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </button>

          {/* Enhanced Header with more neon effects */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 mb-6 shadow-2xl shadow-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse">
                    {jobDetails.title}
                  </h1>
                  {job.featured && (
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                    <MapPin className="w-4 h-4" />
                    {jobDetails.location}
                  </span>
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                    <Clock className="w-4 h-4" />
                    Posted {jobDetails.postedTime}
                  </span>
                  <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                    <Users className="w-4 h-4" />
                    {jobDetails.proposals} proposals
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {jobDetails?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-900/50 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md shadow-cyan-500/50 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/60">
                  Submit Proposal
                </button>
                <div className="flex gap-2">
                  <button className="bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 p-2 rounded-lg transition-all duration-300 hover:text-pink-400 hover:shadow-lg hover:shadow-pink-500/20 border border-gray-700/50 hover:border-pink-500/30">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 p-2 rounded-lg transition-all duration-300 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20 border border-gray-700/50 hover:border-blue-500/30">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 p-2 rounded-lg transition-all duration-300 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 border border-gray-700/50 hover:border-yellow-500/30">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-6">
            {/* Project Description */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                Project Description
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                {jobDetails.fullDescription}
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 sm:p-4 hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-400 font-medium mb-1 text-sm sm:text-base">
                      Important Notice
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      This project requires signing an NDA and all deliverables
                      must be completed within the specified timeframe. Please
                      ensure you have the necessary skills before submitting a
                      proposal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Requirements */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Requirements
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {jobDetails?.requirements?.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/30 text-sm sm:text-base"
                    >
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Deliverables
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {jobDetails?.deliverables?.map((deliverable, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/30 text-sm sm:text-base"
                    >
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Enhanced Tabs with neon effects */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-1 shadow-lg shadow-cyan-500/20 border border-cyan-500/20">
                <div className="flex gap-1">
                  {["details", "updates", "comments", "chat"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                        activeTab === tab
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/50"
                          : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "details" && (
                <div className="space-y-4 sm:space-y-6">
                  <ProjectTimeline
                    timeline={flowTimeline}
                    proposalId={jobDetails?._id || "34"}
                  />
                </div>
              )}

              {activeTab === "updates" && (
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                    Project Updates
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    No updates available yet.
                  </p>
                </div>
              )}

              {activeTab === "comments" && (
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                    Comments
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    No comments yet. Be the first to ask a question!
                  </p>
                </div>
              )}
              {activeTab === "chat" && (
                <ChatComponent
                  currentUser={
                    jobDetails?.client || { username: "Client", userWallet: "" }
                  }
                  recipient={
                    jobDetails?.freelancer || {
                      username: "Freelancer",
                      userWallet: "",
                    }
                  }
                  proposalId={jobDetails?._id || ""}
                />
              )}
            </div>

            {/* Enhanced Sidebar with more neon effects */}
            <div className="space-y-4 sm:space-y-6">
              {/* Project Stats */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Project Stats
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Budget
                    </span>
                    <span className="text-cyan-400 font-bold text-sm sm:text-base">
                      {jobDetails.budget}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Duration
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      {jobDetails.timeframe}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Proposals
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      {jobDetails.proposals}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Project Type
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      {jobDetails.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  About the Client
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={jobDetails.client?.avatar || "/placeholder.svg"}
                    alt={jobDetails.client?.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-500/30"
                  />
                  <div>
                    <h4 className="text-purple-400 font-medium hover:text-purple-300 transition-colors text-sm sm:text-base">
                      {jobDetails?.client?.name}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                      <span>{jobDetails?.client?.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
                    <span className="text-gray-400 text-sm sm:text-base">
                      jobs Posted
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      {jobDetails?.client?.jobsPosted}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg hover:bg-gray-800/30 transition-colors">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Member Since
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      2023
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 border border-gray-700/50 hover:border-cyan-500/30">
                  <MessageCircle className="w-4 h-4" />
                  Contact Client
                </button>
              </div>

              {/* Location Map Placeholder */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Project Location
                </h3>
                <div className="bg-gray-900/50 rounded-lg h-48 flex items-center justify-center border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                  <div className="text-center">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm sm:text-base">
                      {jobDetails.location}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Interactive map coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
