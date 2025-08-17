import GigHeader from "../../Components/gig/GigHeader";
import ImageShowcase from "../../Components/gig/ImageShowcase";
import ProHandleSection from "../../Components/gig/ProHandleSection";
import ProjectDetails from "../../Components/gig/ProjectDetails";
import ServiceTiersTable from "../../Components/gig/ServiceTiersTable";
import FAQSection from "../../Components/gig/FAQSection";
import ProjectSteps from "../../Components/gig/ProjectSteps";
import AboutSection from "../../Components/gig/AboutSection";
import ServiceSidebar from "../../Components/gig/ServiceSidebar";
import { useLocation, useParams } from "react-router-dom";

import Navbar from "../../Components/Navbar";

const GigPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  if (!state) return <p>No gig data passed</p>
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mt-[100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <GigHeader username={state.username} avatar={state.avatar} rating={state.rating} title={state.title} about={state.gig} badges={state.badges}/>
              <ImageShowcase images={state.images}/>
              <ProHandleSection />
              <ProjectDetails description={state.description} skills={state.skills} tags={state.tags} />
              <ServiceTiersTable basic={state.basic} standard={state.standard} pro={state.pro}/>
              <FAQSection faqs={state.faqs}/>
              <ProjectSteps username={state.username}/>
              <AboutSection avatar={state.avatar} username={state.username} tags={state.tags} skills={state.skills} about={state.about} location={state.location}/>
            </div>

            {/* Right Sidebar */}
            <ServiceSidebar basic={state.basic} standard={state.standard} pro={state.pro} username={state.username}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default GigPage;
