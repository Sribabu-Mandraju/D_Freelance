import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Portfolio from './Pages/Portfolio';
import PostJob from './Pages/PostJob';
import BrowseJobs from './Pages/BrowseJobs';
import FreelancerProfile from "./Pages/FreelancerProfile"
import ClientDashboard from './Pages/ClientDashboard';
import HelpDocs from './Pages/HelpDocs';
const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/portfolio" element={<Portfolio/>}/>
           <Route path="/browse-jobs" element={<BrowseJobs />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/freelancer/:id" element={<FreelancerProfile />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/help" element={<HelpDocs />} />
            {/* Add more routes as needed */}
         
        </Routes>
            
      </Router>
  )
}

export default App



// import React from "react"
// import Cloudinary from "./Components/main/Cloudinary"
// const App=()=>{
//   return(
// <div>
//   <Cloudinary/>
// </div>
//   )
// }
// export default App