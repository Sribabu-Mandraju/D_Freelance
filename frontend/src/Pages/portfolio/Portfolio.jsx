"use client";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Code,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Mail,
} from "lucide-react";
import { toast } from "react-hot-toast";
import HeroSection from "../../Components/portfolio/HeroSection";
import FeaturedProjects from "../../Components/portfolio/FeaturesProjects";
import TabNavigation from "../../Components/portfolio/TabNavigation";
import QuickContact from "../../Components/portfolio/QuickContact";
import CurrentStatus from "../../Components/portfolio/CurrentStatus";
import TechHighlights from "../../Components/portfolio/TechHighlights";
import TechStack from "../../Components/portfolio/TechStack";
import Experience from "../../Components/portfolio/Experience";
import Education from "../../Components/portfolio/Education";
import SkillProgress from "../../Components/portfolio/SkillProgess";
import ContactInfo from "../../Components/portfolio/ContactInfo";
import Navbar from "../../Components/Navbar";
import styles from "./Portfolio.module.css";
import YourGigs from "./YourGigs";
import AcceptedProposals from "../../Components/portfolio/AcceptedProposals";
import CreatedProposals from "../UserDetails/CreatedProposals";
import {
  fetchPortfolio,
  setActiveTab,
} from "../../store/portfolioSlice/portfolioSlice"; // Adjust path
import BiddedProposals from "../UserDetails/BiddedProposals";

function Portfolio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolioData, loading, error, activeTab } = useSelector(
    (state) => state.portfolio
  );
  const mainRef = useRef(null);
  const asideRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPortfolio()).then((action) => {
      if (
        action.payload &&
        (!portfolioData.heroSection || Object.keys(portfolioData).length === 0)
      ) {
        toast.error("No portfolio found. Redirecting to create one...");
        navigate("/portfolioForm");
      }
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    const adjustHeights = () => {
      try {
        if (mainRef.current && asideRef.current) {
          const mainHeight = mainRef.current.scrollHeight;
          const asideHeight = asideRef.current.scrollHeight;
          const maxHeight = Math.max(mainHeight, asideHeight);

          mainRef.current.style.height = `${maxHeight}px`;
          asideRef.current.style.height = `${maxHeight}px`;
        }
      } catch (err) {
        
        toast.error("Failed to adjust layout heights");
      }
    };

    adjustHeights();
    window.addEventListener("resize", adjustHeights);
    return () => window.removeEventListener("resize", adjustHeights);
  }, [portfolioData, activeTab]);

  const tabs = [
    { id: "Bidded Proposals", label: "Bidded Proposals", icon: User },
    { id: "Gigs", label: "Your Gigs", icon: Code },
    { id: "Accepted Proposals", label: "Accepted Proposals", icon: Briefcase },
        { id: "Created Proposals", label: "Created Proposals", icon: Briefcase },


  ];

  if (loading) {
    return (
      <div className={`${styles.container} flex items-center justify-center`}>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (error) {
    if (error.includes("not found") || error.includes("Portfolio not found")) {
      toast.error("No portfolio found. Redirecting to create one...");
      navigate("/portfolioForm");
      return null;
    }
    return (
      <div className={`${styles.container} flex items-center justify-center`}>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!portfolioData.heroSection || Object.keys(portfolioData).length === 0) {
    toast.error("No portfolio data available. Redirecting to create one...");
    navigate("/portfolioForm");
    return null;
  }

  const personalInfo = portfolioData?.heroSection || {};
  const featuredProjects = portfolioData?.projects || [];
  const currentStatus = portfolioData?.currentStatus || [];
  const techHighlights = portfolioData?.techHighlights || [];
  const techStack = portfolioData?.techStack || [];
  const workExperience = portfolioData?.workExperience || [];
  const education = portfolioData?.education || [];

  return (
    <>
      <Navbar />
      <div
        className={` bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden pt-20 sm:px-4 lg:px-20 relative z-10">
          <main
            ref={mainRef}
            className={`${styles.main} flex-1 p-3 sm:p-4 lg:p-6`}
            aria-label="About content"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <HeroSection
              personalInfo={personalInfo}
              setPersonalInfo={(data) =>
                dispatch(setPortfolioData({ heroSection: data }))
              }
              portfolioId={portfolioData._id}
            />
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={(tab) => dispatch(setActiveTab(tab))}
            />
            <div className="space-y-8">
              
              {activeTab === "Bidded Proposals" && (
                <BiddedProposals/>
              )}
              {activeTab === "Gigs" && (
                <YourGigs yourgigs={portfolioData.userGigs || []} />
              )}
              {activeTab === "Accepted Proposals" && (
                <AcceptedProposals/>
              )}
              {activeTab === "Created Proposals" && (
                <CreatedProposals/>
              )}
            </div>
            {/* <div className="space-y-6 mt-6">
                  <FeaturedProjects
                    featuredProjects={featuredProjects}
                    portfolioId={portfolioData._id}
                  />
                </div> */}
          </main>

          <aside
            ref={asideRef}
            className={`${styles.aside} w-full lg:w-80 p-4 lg:p-6 space-y-6`}
            aria-label="About sidebar"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <QuickContact personalInfo={personalInfo} />
            <CurrentStatus
              portfolioId={portfolioData._id} // Use _id directly from portfolioData
            />
            <TechHighlights
              techHighlights={techHighlights}
              setTechHighlights={(data) =>
                dispatch(setPortfolioData({ techHighlights: data }))
              }
              portfolioId={portfolioData._id} // Use _id directly from portfolioData
            />
          </aside>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
