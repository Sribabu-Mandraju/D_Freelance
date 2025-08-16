"use client"
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { User, Code, Briefcase, GraduationCap, TrendingUp, Mail } from "lucide-react"
import { toast } from "react-hot-toast"
import HeroSection from "../../Components/portfolio/HeroSection"
import FeaturedProjects from "../../Components/portfolio/FeaturesProjects"
import TabNavigation from "../../Components/portfolio/TabNavigation"
import QuickContact from "../../Components/portfolio/QuickContact"
import CurrentStatus from "../../Components/portfolio/CurrentStatus"
import TechHighlights from "../../Components/portfolio/TechHighlights"
import TechStack from "../../Components/portfolio/TechStack"
import Experience from "../../Components/portfolio/Experience"
import Education from "../../Components/portfolio/Education"
import SkillProgress from "../../Components/portfolio/SkillProgess"
import ContactInfo from "../../Components/portfolio/ContactInfo"
import Navbar from "../../Components/Navbar"
import styles from "./Portfolio.module.css"

function Portfolio() {
  const [activeTab, setActiveTab] = useState("overview")
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const mainRef = useRef(null)
  const asideRef = useRef(null)

  const { portfolioId } = useParams()

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!portfolioId) {
        setError("Portfolio ID is missing")
        setLoading(false)
        toast.error("Portfolio ID is missing")
        return
      }

      const toastId = toast.loading("Loading portfolio...")
      try {
        const response = await fetch(`http://localhost:3001/api/portfolio/${portfolioId}`)
        const result = await response.json()
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch portfolio")
        }
        setPortfolioData(result.data)
        setLoading(false)
        toast.success("Portfolio loaded successfully!", { id: toastId })
      } catch (err) {
        console.error("Error fetching portfolio:", err)
        setError(err.message)
        toast.error(`Error: ${err.message}`, { id: toastId })
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [portfolioId])

  useEffect(() => {
    const adjustHeights = () => {
      try {
        if (mainRef.current && asideRef.current) {
          const mainHeight = mainRef.current.scrollHeight
          const asideHeight = asideRef.current.scrollHeight
          const maxHeight = Math.max(mainHeight, asideHeight)

          mainRef.current.style.height = `${maxHeight}px`
          asideRef.current.style.height = `${maxHeight}px`
        }
      } catch (err) {
        console.error("Error adjusting heights:", err)
        toast.error("Failed to adjust layout heights")
      }
    }

    adjustHeights()
    window.addEventListener("resize", adjustHeights)
    return () => window.removeEventListener("resize", adjustHeights)
  }, [portfolioData, activeTab])

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "skills", label: "Tech Stack", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "progress", label: "Skill Progress", icon: TrendingUp },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  if (loading) {
    return (
      <div className={`${styles.container} flex items-center justify-center`}>
        <p>Loading portfolio...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${styles.container} flex items-center justify-center`}>
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  const personalInfo = portfolioData?.heroSection || {}
  const featuredProjects = portfolioData?.projects || []
  const currentStatus = portfolioData?.currentStatus || []
  const techHighlights = portfolioData?.techHighlights || []
  const techStack = portfolioData?.techStack || []
  const workExperience = portfolioData?.workExperience || []
  const education = portfolioData?.education || []

  return (
    <>
      <Navbar />
      <div
        className={`${styles.container} bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden`}
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
              setPersonalInfo={setPortfolioData}
              portfolioId={portfolioId}
            />
            <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="space-y-8">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <FeaturedProjects featuredProjects={featuredProjects} setFeaturedProjects={setPortfolioData} />
                </div>
              )}
              {activeTab === "skills" && <TechStack techStack={techStack} />}
              {activeTab === "experience" && <Experience workExperience={workExperience} />}
              {activeTab === "education" && <Education education={education} />}
              {activeTab === "progress" && <SkillProgress />}
              {activeTab === "contact" && <ContactInfo personalInfo={personalInfo} />}
            </div>
          </main>

          <aside
            ref={asideRef}
            className={`${styles.aside} w-full lg:w-80 p-4 lg:p-6 space-y-6`}
            aria-label="About sidebar"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <QuickContact personalInfo={personalInfo} />
            <CurrentStatus currentStatus={currentStatus} setCurrentStatus={setPortfolioData} portfolioId={portfolioId} />
            <TechHighlights techHighlights={techHighlights} setTechHighlights={setPortfolioData} portfolioId={portfolioId}/>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Portfolio