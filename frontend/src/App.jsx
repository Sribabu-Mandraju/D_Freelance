import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import PostJob from "./Pages/PostJob";
import BrowseJobs from "./Pages/BrowseJobs";
import FreelancerProfile from "./Pages/FreelancerProfile";
import ClientDashboard from "./Pages/ClientDashboard";
import HelpDocs from "./Pages/HelpDocs";
import WalletConnect from "./Components/walletConnection/WalletConnect";
import Authenticate from "./Components/walletConnection/Authenticate";
import GigPage from "./Pages/gig/GigPage";
import CreateGig from "./Pages/gig/CreateGig";
import EditGig from "./Pages/EditGig";
import Portfolio from "./Pages/portfolio/Portfolio";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ClaimTokens from "./Components/testingContracts/ClaimTokens";
import PurchaseTokens from "./Components/testingContracts/PurchaseTokens";
import CreateProposalButton from "./Components/testingContracts/CreateProposal";
import OpenProposalToBidButton from "./Components/testingContracts/OpenProposalToBid";
import AcceptBidButton from "./Components/testingContracts/AcceptBid";
import DepositBidAmountButton from "./Components/testingContracts/DepositBidAmount";
import PlaceBid from "./Components/testingContracts/PlaceBid";
import Proposal from "./Pages/proposal/Proposal";
import StartWorkButton from "./Components/testingContracts/StartWork";
import PortfolioForm from "./Components/portfolio/portfolioForm";
import Gigs from "./Pages/gig/Gigs";
import OtpVerification from "./Components/portfolio/OtpVerification";
import ProposalDetails from "./Pages/proposalDetails/ProposalDetails";
import JobDetails from "./Pages/JobDetails";
import PayFirstMilestoneButton from "./Components/testingContracts/PayFirstMileStone";
import PaySecondMilestoneButton from "./Components/testingContracts/PaySecondMileStone";
import PayThirdMilestoneButton from "./Components/testingContracts/PayThirdMileStone";
import CancelProposalButton from "./Components/testingContracts/CancelProposal";
import CompleteProposalButton from "./Components/testingContracts/CompleteProposal";

import AdminDashboard from "./Pages/admin/AdminDashboard";
import About from "./Pages/About";

import toast from "react-hot-toast";

// import ActiveFreelancers from "./Components/main/ActigitveFreelancers";

const App = () => {
  const [authToken, setAuthToken] = useState("");
  const handleAuthSuccess = () => {
    return;
  };

  const handleSuccess = () => {
    toast.success("Deposit completed!");
    // Reset any local state/UI
    // setProposalId("");
    // Optionally refetch data here
    // refetchBalance?.(); refetchProposal?.();
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
    console.log(token);
  }, []);

  return (
    <>
      <div className="">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio/me" element={<Portfolio />} />
            <Route path="/browse-jobs" element={<BrowseJobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/proposal" element={<Proposal />} />
            <Route path="/freelancer/:id" element={<FreelancerProfile />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/help" element={<HelpDocs />} />
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />

            <Route path="/jobDetails/:id" element={<JobDetails />} />
            <Route
              path="/connect"
              element={<WalletConnect onAuthSuccess={handleAuthSuccess} />}
            />
            {/* <Route path="/gigpage" element={<GigPage />} /> */}
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/edit-gig/:id" element={<EditGig />} />
            <Route path="/gig/:id" element={<GigPage />} />

            <Route path="/adminDashboard" element={<AdminDashboard />} />

            <Route path="/claimTokens" element={<ClaimTokens />} />
            <Route path="/purchaseTokens" element={<PurchaseTokens />} />
            <Route
              path="/createProposal"
              element={
                <CreateProposalButton
                  deadline={"1758015222"}
                  budget={1000000}
                />
              }
            />
            <Route
              path="/openProposalToBid"
              element={<OpenProposalToBidButton proposalId={25} />}
            />
            <Route
              path="/acceptBid" 
              element={
                <AcceptBidButton
                  proposalId={25}
                  bidder={"0xc90cA2179a4b52C8Dd556C9287340fc2A7784BB5"}
                  bidAmount={100000}
                />
              }
            />
            {/* <Route path="/acceptBid" element={<AcceptBid />} /> */}
            <Route
              path="/depositBidAmount"
              element={
                <DepositBidAmountButton
                  proposalId={25}
                  onSuccess={handleSuccess}
                />
              }
            />
            <Route path="/placeBid" element={<PlaceBid />} />
            <Route
              path="/startWork"
              element={<StartWorkButton proposalId={25} />}
            />
            <Route
              path="/payFirstMilestone"
              element={<PayFirstMilestoneButton proposalId={25} />}
            />
            <Route
              path="/paySecondMilestone"
              element={<PaySecondMilestoneButton proposalId={25} />}
            />
            <Route
              path="/payThirdMilestone"
              element={<PayThirdMilestoneButton proposalId={25} />}
            />
            <Route
              path="/completeProposal"
              element={<CompleteProposalButton proposalId={25} />}
            />
            <Route
              path="/cancelProposal"
              element={<CancelProposalButton proposalId={25} />}
            />

            <Route path="/portfolioForm" element={<PortfolioForm />} />
            <Route path="/otpverification" element={<OtpVerification />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
        {/* Add Toaster for toast notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000, // Auto-close after 3 seconds
            style: {
              background: "#1a202c", // Dark theme background
              color: "#f7fafc", // Light text
              border: "1px solid #4a5568",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            },
            success: {
              duration: 3000,
              iconTheme: { primary: "#48bb78", secondary: "#f7fafc" }, // Green icon
            },
            error: {
              duration: 3000,
              iconTheme: { primary: "#f56565", secondary: "#f7fafc" }, // Red icon
            },
            loading: {
              duration: Infinity, // Persist for pending/confirming
              iconTheme: { primary: "#63b3ed", secondary: "#f7fafc" }, // Blue spinner
            },
          }}
        />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
