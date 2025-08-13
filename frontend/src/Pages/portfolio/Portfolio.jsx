"use client";

import { useState } from "react";
import {
  User,
  Code,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Mail,
} from "lucide-react";
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
import { initialData } from "../../Components/portfolio/portfolioData";
import Navbar from "../../Components/Navbar";

function Portfolio() {
  const [activeTab, setActiveTab] = useState("overview");
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [featuredProjects, setFeaturedProjects] = useState(
    initialData.featuredProjects
  );
  const [currentStatus, setCurrentStatus] = useState(initialData.currentStatus);
  const [techHighlights, setTechHighlights] = useState(
    initialData.techHighlights
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "skills", label: "Tech Stack", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "progress", label: "Skill Progress", icon: TrendingUp },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Layout container */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden pt-20 sm:px-4 lg:px-20 relative z-10">
          {/* Main Content */}
          <main
            className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto"
            aria-label="About content"
          >
            {/* Hero Section */}
            <HeroSection
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
            />

            {/* Navigation Tabs */}
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <FeaturedProjects
                    featuredProjects={featuredProjects}
                    setFeaturedProjects={setFeaturedProjects}
                  />
                </div>
              )}
              {activeTab === "skills" && (
                <TechStack techStack={initialData.techStack} />
              )}
              {activeTab === "experience" && (
                <Experience workExperience={initialData.workExperience} />
              )}
              {activeTab === "education" && (
                <Education education={initialData.education} />
              )}
              {activeTab === "progress" && <SkillProgress />}
              {activeTab === "contact" && (
                <ContactInfo personalInfo={personalInfo} />
              )}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside
            className="w-full lg:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto order-last lg:order-none"
            aria-label="About sidebar"
          >
            <QuickContact personalInfo={personalInfo} />
            <CurrentStatus
              currentStatus={currentStatus}
              setCurrentStatus={setCurrentStatus}
            />
            <TechHighlights
              techHighlights={techHighlights}
              setTechHighlights={setTechHighlights}
            />
          </aside>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
