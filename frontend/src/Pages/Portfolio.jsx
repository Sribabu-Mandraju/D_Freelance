import { useState } from "react"
import AboutHero from "../Components/portfolio/Hero"
import TechStack from "../Components/portfolio/TechStack"
import Experience from "../Components/portfolio/Experience"
import Education from "../Components/portfolio/Education"
import SkillProgress from "../Components/portfolio/SkillProgress"
import ContactInfo from "../Components/portfolio/ContactInfo"
import Navbar from "../Components/main/Navbar"
import { User, Code, Briefcase, GraduationCap, TrendingUp, Mail, Github, Linkedin, Globe, Phone, MapPin } from 'lucide-react'

// Personal information
const personalInfo = {
  name: "Sribabu Mandraju",
  title: "Full Stack & Web3 Developer | Smart Contract Engineer",
  email: "sribabumandraju@gmail.com",
  phone: "+91 63037 38847",
  location: "Hyderabad, India",
  // portfolio: "https://portfolio-35c3.vercel.app/",
  github: "https://github.com/Sribabu-Mandraju",
  linkedin: "https://www.linkedin.com/in/sribabu-mandraju/",
  twitter: "https://x.com/5R1B4BU",
  bio: "I'm a Full Stack & Web3 Developer and Smart Contract Engineer passionate about crafting decentralized applications (dApps) and scalable web solutions. I merge cutting-edge blockchain technology with modern web development to build secure, transparent, and user-centric applications.",
  mission: "Empowering users through decentralized, accessible tech and delivering trustless systems with seamless user experiences."
}

// Tech stack data
const techStack = {
  blockchain: [
    { name: "Solidity", level: 75, color: "text-gray-400" },
    { name: "Ethereum", level: 80, color: "text-blue-400" },
    { name: "Hardhat", level: 85, color: "text-yellow-400" },
    { name: "Foundry", level: 70, color: "text-orange-400" },
    { name: "Ethers.js", level: 80, color: "text-purple-400" },
    { name: "Web3.js", level: 75, color: "text-green-400" },
    { name: "IPFS", level: 65, color: "text-cyan-400" },
    { name: "DeFi", level: 70, color: "text-pink-400" }
  ],
  frontend: [
    { name: "React", level: 90, color: "text-blue-400" },
    { name: "Next.js", level: 85, color: "text-gray-400" },
    { name: "TypeScript", level: 80, color: "text-blue-500" },
    { name: "JavaScript", level: 90, color: "text-yellow-400" },
    { name: "TailwindCSS", level: 85, color: "text-cyan-400" },
    { name: "Angular", level: 75, color: "text-red-400" },
    { name: "Material-UI", level: 70, color: "text-blue-600" },
    { name: "Figma", level: 80, color: "text-purple-400" }
  ],
  backend: [
    { name: "Node.js", level: 85, color: "text-green-400" },
    { name: "Express.js", level: 80, color: "text-gray-400" },
    { name: "Go (Golang)", level: 75, color: "text-blue-400" },
    { name: "Python", level: 70, color: "text-yellow-400" },
    { name: "MongoDB", level: 85, color: "text-green-500" },
    { name: "PostgreSQL", level: 75, color: "text-blue-500" },
    { name: "MySQL", level: 80, color: "text-orange-400" },
    { name: "GraphQL", level: 65, color: "text-pink-400" }
  ],
  mobile: [
    { name: "React Native", level: 75, color: "text-blue-400" },
    { name: "Ionic", level: 70, color: "text-blue-500" },
    { name: "Flutter", level: 65, color: "text-cyan-400" }
  ]
}

// Work experience data
const workExperience = [
  {
    id: 1,
    company: "Mee Buddy",
    location: "Mangalagiri",
    position: "Full Stack Developer and UI/UX Designer",
    duration: "Dec 2024 – Present",
    description: "Part of the team that designed and developed the MeeBuddy platform using the MEAN stack, built and maintained cross-platform mobile applications with Ionic, and collaborated with team members to troubleshoot and optimize applications.",
    achievements: [
      "Designed intuitive interfaces using Figma, enhancing user engagement",
      "Built cross-platform mobile applications with Ionic framework",
      "Optimized application performance and user satisfaction"
    ],
    technologies: ["MongoDB", "Express.js", "Angular", "Node.js", "Ionic", "TailwindCSS", "Figma"],
    type: "current"
  },
  {
    id: 2,
    company: "Techbuggy",
    location: "Hyderabad",
    position: "Full Stack Developer (Go Backend & React Frontend)",
    duration: "Dec 2023 – Nov 2024",
    description: "Developed full-stack web applications using React for frontend and Golang for backend, designed scalable RESTful APIs, and implemented responsive UI components.",
    achievements: [
      "Built scalable RESTful APIs supporting core functionalities",
      "Developed responsive UI components using modern JavaScript",
      "Implemented authentication and database interactions",
      "Followed best practices in code quality and deployment"
    ],
    technologies: ["Go", "React.js", "JavaScript", "TailwindCSS", "RESTful APIs"],
    type: "previous"
  },
  {
    id: 3,
    company: "Teckzite",
    location: "Nuzvid",
    position: "Web Manager and Team Lead",
    duration: "Mar 2021 - Present",
    description: "Managed official websites for Teckzite events using MERN stack, directed development teams, and developed admin panels for event management.",
    achievements: [
      "Managed Teckzite25, Teckzite24, and Teckzite23 official websites",
      "Led development team in implementing web and mobile features",
      "Developed intuitive admin panel for event management",
      "Prioritized performance optimization and security enhancements"
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "TailwindCSS", "AWS"],
    type: "current"
  },
  {
    id: 4,
    company: "Ecrush",
    location: "Nuzvid",
    position: "Web Team Coordinator",
    duration: "Jun 2021 - Sep 2023",
    description: "Led web development team in designing and implementing projects, developed multiple websites for English skill enhancement and tourism promotion.",
    achievements: [
      "Developed Ecrush Official Website for English skills enhancement",
      "Created Explore 2k23 and 2k22 for World Tourism Day",
      "Built E-Jubilant 2k22 and 2k23 for English Day celebrations",
      "Provided mentorship to team members for professional growth"
    ],
    technologies: ["MERN Stack", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    type: "previous"
  }
]

// Education data
const education = {
  institution: "Rajiv Gandhi University of Knowledge and Technologies",
  location: "Nuzvid",
  degree: "B.Tech. in Computer Science and Engineering",
  duration: "Sep 2023 - Present",
  cgpa: "8.4/10",
  coursework: [
    "Problem Solving Through C",
    "Object Oriented Programming",
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Data Science & Mining",
    "Computer Architecture",
    "Compiler Design"
  ]
}

// Featured projects data
const featuredProjects = [
  {
    id: 1,
    name: "KarunyaSetu",
    description: "A decentralized disaster relief platform ensuring instant aid, privacy-preserving verification, and transparent fund management with multilingual AI chatbots.",
    technologies: ["Solidity", "Hardhat", "React", "Ethers.js", "AI"],
    liveUrl: "https://karunyasethu.vercel.app/",
    githubUrl: "https://github.com/Sribabu-Mandraju/KarunyaSetu",
    icon: "🌍"
  },
  {
    id: 2,
    name: "FuturaX",
    description: "A blockchain-powered prediction market for staking on real-world events with secure smart contracts for transparency and payouts.",
    technologies: ["Solidity", "IPFS", "Next.js", "Moralis", "Web3"],
    liveUrl: "https://future-x-ulpg.vercel.app/",
    githubUrl: "https://github.com/Sribabu-Mandraju/futurax_defi",
    icon: "🎯"
  },
  {
    id: 3,
    name: "NFT Staking",
    description: "A decentralized NFT staking system on Base Mainnet for secure NFT staking and rewards distribution.",
    technologies: ["Solidity", "Foundry", "React", "Base Network"],
    liveUrl: "https://lock-nft-frontend.vercel.app/",
    githubUrl: "https://github.com/Sribabu-Mandraju/lockNft_frontend",
    icon: "🖼"
  }
]

function Portfolio() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "skills", label: "Tech Stack", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "progress", label: "Skill Progress", icon: TrendingUp },
    { id: "contact", label: "Contact", icon: Mail }
  ]

  return (
    <div className="flex flex-1 overflow-hidden pt-24 px-20 flex-col lg:flex-row">
      <Navbar/>
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto" aria-label="About content">
        {/* Hero Section */}
        <AboutHero personalInfo={personalInfo} />

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-gray-900 border border-gray-800 rounded-xl">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* About Me Section */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-400" />
                  About Me
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>{personalInfo.bio}</p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">🔗 Expertise</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Building DeFi platforms, NFTs, DAOs</li>
                        <li>• Smart contract auditing and security</li>
                        <li>• Full-stack development with modern frameworks</li>
                        <li>• Decentralized application architecture</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">💡 Focus Areas</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Trustless system development</li>
                        <li>• Seamless user experiences</li>
                        <li>• Blockchain security best practices</li>
                        <li>• Scalable web solutions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Projects */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">🚀 Featured Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProjects.map((project) => (
                    <div key={project.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors duration-200">
                      <div className="flex items-start flex-col gap-3 mb-3">
                        
                        <div className="flex flex-row items-center gap-2">
                          <span className="text-2xl">{project.icon}</span>
                          <h3 className="font-semibold text-white ">{project.name}</h3>
                          
                          
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="bg-gray-900 text-gray-300 text-xs px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="bg-gray-900 text-gray-400 text-xs px-2 py-1 rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-900 hover:bg-gray-500 text-white text-xs rounded transition-colors duration-200"
                        >
                          <Github className="w-3 h-3" />
                          Code
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors duration-200"
                          >
                            <Globe className="w-3 h-3" />
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && <TechStack techStack={techStack} />}
          {activeTab === "experience" && <Experience workExperience={workExperience} />}
          {activeTab === "education" && <Education education={education} />}
          {activeTab === "progress" && <SkillProgress />}
          {activeTab === "contact" && <ContactInfo personalInfo={personalInfo} />}
        </div>
      </main>

      {/* Right Sidebar (hidden on mobile) */}
      <aside className="hidden lg:block lg:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto" aria-label="About sidebar">
        {/* Quick Contact */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-blue-400" />
            Quick Contact
          </h3>
          <div className="space-y-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 group"
            >
              <Mail className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
              <span className="text-sm text-gray-300 group-hover:text-white">Email</span>
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 group"
            >
              <Phone className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
              <span className="text-sm text-gray-300 group-hover:text-white">Call</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 group"
            >
              <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
              <span className="text-sm text-gray-300 group-hover:text-white">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🚀 Current Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Available for projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Learning new Web3 technologies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-300">Building DeFi protocols</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}


export default Portfolio