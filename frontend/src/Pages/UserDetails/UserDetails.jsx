"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, Code, Briefcase } from "lucide-react";
import { toast } from "react-hot-toast";
import HeroSection from "./HeroSection";
import FeaturedProjects from "./FeaturesProjects"; // Fixed import
import TabNavigation from "./TabNavigation";
import QuickContact from "./QuickContact";
import CurrentStatus from "./CurrentStatus";
import TechHighlights from "./TechHighlights";
import TechStack from "../../Components/portfolio/TechStack";
import YourGigs from "./YourGigs";
import Navbar from "../../Components/Navbar";
import styles from "./Portfolio.module.css";

function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);
  const asideRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Bidded Proposals");

  // Fetch portfolio data by ID
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `
https://cryptolance-server.onrender.com/api/portfolio/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio");
        }

        const data = await response.json();
        if (data.success) {
          setFreelancer(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch portfolio");
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        toast.error(
          error.message || "Failed to fetch user data. Redirecting..."
        );
        navigate("/freelancers");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolio();
    }
  }, [id, navigate]);

  // Redirect if no freelancer data
  useEffect(() => {
    if (!loading && (!freelancer || !freelancer.heroSection)) {
      toast.error("No user data available. Redirecting...");
      navigate("/freelancers");
    }
  }, [freelancer, loading, navigate]);

  // Adjust main and aside heights for responsive layout
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
  }, [freelancer, activeTab]);

  const tabs = [{ id: "Gigs", label: "Gigs", icon: Code }];

  // Show loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-cyan-400 text-lg">Loading portfolio...</p>
          </div>
        </div>
      </>
    );
  }

  if (!freelancer || !freelancer.heroSection) {
    return null; // Will redirect via useEffect
  }

  // Map freelancer data to component props
  const personalInfo = freelancer.heroSection || {};
  const contactInfo = freelancer.contactInfo || {};
  const featuredProjects = freelancer.projects || [];
  const currentStatus = freelancer.currentStatus || [];
  const techHighlights = freelancer.techHighlights || [];
  const techStack = freelancer.techStack || [];
  const userGigs = freelancer.userGigs || [];
  const biddedProposals = freelancer.biddedProposals || [];
  const acceptedProposals = freelancer.acceptedProposals || [];

  return (
    <>
      <Navbar />
      <div
        className={`bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden`}
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
            aria-label="User details content"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <HeroSection personalInfo={personalInfo} />
            <div className="text-center my-4">
              <span
                className="text-3xl relative
  before:absolute before:left-[-150px] before:w-32 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-cyan-400 before:mx-auto before:mt-4 before:rounded-full 
  after:absolute after:right-[-150px] after:w-32 after:h-1 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 after:mx-auto after:mt-4 after:rounded-full
  text-center font-bold font-orbitron 
  bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
              >
                Gigs
              </span>
            </div>

            <YourGigs yourgigs={userGigs} />
            <div className="space-y-6 mt-6">
              <FeaturedProjects featuredProjects={featuredProjects} />
            </div>
          </main>

          <aside
            ref={asideRef}
            className={`${styles.aside} w-full lg:w-80 p-4 lg:p-6 space-y-6`}
            aria-label="User details sidebar"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <QuickContact contactInfo={contactInfo} />
            <CurrentStatus currentStatus={currentStatus} />
            <TechHighlights techHighlights={techHighlights} />
          </aside>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
