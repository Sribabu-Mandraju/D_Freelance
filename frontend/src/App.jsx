import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Portfolio from './Pages/Portfolio';
import PostJob from './Pages/PostJob';
import BrowseJobs from './Pages/BrowseJobs';
import FreelancerProfile from "./Pages/FreelancerProfile";
import ClientDashboard from './Pages/ClientDashboard';
import HelpDocs from './Pages/HelpDocs';
import WalletConnect from './Components/walletConnection/WalletConnect';
import Authenticate from './Components/walletConnection/Authenticate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/help-docs" element={<HelpDocs />} />
        <Route path="/connect" element={<WalletConnect />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </Router>
  );
};

export default App;
