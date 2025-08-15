import React from "react";
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
import CreateGig from "./Pages/CreateGig";
import EditGig from "./Pages/EditGig";
import Portfolio from "./Pages/portfolio/Portfolio";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ClaimTokens from "./Components/testingContracts/ClaimTokens";
import PurchaseTokens from "./Components/testingContracts/PurchaseTokens";
import CreateProposal from "./Components/testingContracts/CreateProposal";
import OpenProposalToBid from "./Components/testingContracts/OpenProposalToBid";
import AcceptBid from "./Components/testingContracts/AcceptBid";
import DepositBidAmount from "./Components/testingContracts/DepositBidAmount";
import PlaceBid from "./Components/testingContracts/PlaceBid";
import Proposal from "./Pages/proposal/Proposal";
import StartWork from "./Components/testingContracts/StartWork";
import PortfolioForm from "./Components/portfolio/portfolioForm";
import PayFirstMilestone from "./Components/testingContracts/PayFirstMileStone";
import OtpVerification from "./Components/portfolio/OtpVerification";
import ProposalDetails from "./Pages/proposalDetails/ProposalDetails";

const App = () => {
  const handleAuthSuccess = () => {
    return;
  };

  return (
    <>
      <div className="">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/browse-jobs" element={<BrowseJobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/proposal" element={<Proposal />} />
            <Route path="/freelancer/:id" element={<FreelancerProfile />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/help" element={<HelpDocs />} />
            <Route path="/jobDetails/:id" element={<ProposalDetails />} />
            <Route
              path="/connect"
              element={<WalletConnect onAuthSuccess={handleAuthSuccess} />}
            />
            <Route path="/gigpage" element={<GigPage />} />
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/edit-gig/:id" element={<EditGig />} />
            <Route path="/gig/:id" element={<GigPage />} />

            <Route path="/claimTokens" element={<ClaimTokens />} />
            <Route path="/purchaseTokens" element={<PurchaseTokens />} />
            <Route path="/createProposal" element={<CreateProposal />} />
            <Route path="/openProposalToBid" element={<OpenProposalToBid />} />
            <Route path="/acceptBid" element={<AcceptBid />} />
            <Route path="/depositBidAmount" element={<DepositBidAmount />} />
            <Route path="/placeBid" element={<PlaceBid />} />
            <Route path="/startWork" element={<StartWork />} />
            <Route path="/portfolioForm" element={<PortfolioForm/>}/>
            <Route path="otpverification" element={<OtpVerification/>}/>

            
            <Route path="/payFirstMileStone" element={<PayFirstMilestone />} />
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
      <Footer />
    </>
  );
};

export default App;
