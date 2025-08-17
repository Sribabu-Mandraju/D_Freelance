import { useState } from "react";
import AboutHero from "../Components/portfolio/Hero";
import TechStack from "../Components/portfolio/TechStack";
import Experience from "../Components/portfolio/Experience";
import Education from "../Components/portfolio/Education";
import SkillProgress from "../Components/portfolio/SkillProgress";
import ContactInfo from "../Components/portfolio/ContactInfo";
import Navbar from "../Components/Navbar";
import {
  User,
  Code,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Mail,
  Github,
  Linkedin,
  Globe,
  Phone,
  MapPin,
  ExternalLink,
  Zap,
  Shield,
  Cpu,
  Database,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";

// Personal information
const initialPersonalInfo = {
  name: "Sribabu Mandraju",
  title: "Full Stack & Web3 Developer | Smart Contract Engineer",
  email: "sribabumandraju@gmail.com",
  phone: "+91 63037 38847",
  location: "Hyderabad, India",
  github: "https://github.com/Sribabu-Mandraju",
  linkedin: "https://www.linkedin.com/in/sribabu-mandraju/",
  twitter: "https://x.com/5R1B4BU",
  bio:
    "I'm a Full Stack & Web3 Developer and Smart Contract Engineer passionate about crafting decentralized applications (dApps) and scalable web solutions. I merge cutting-edge blockchain technology with modern web development to build secure, transparent, and user-centric applications.",
  mission:
    "Empowering users through decentralized, accessible tech and delivering trustless systems with seamless user experiences.",
};

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
    { name: "DeFi", level: 70, color: "text-pink-400" },
  ],
  frontend: [
    { name: "React", level: 90, color: "text-blue-400" },
    { name: "Next.js", level: 85, color: "text-gray-400" },
    { name: "TypeScript", level: 80, color: "text-blue-500" },
    { name: "JavaScript", level: 90, color: "text-yellow-400" },
    { name: "TailwindCSS", level: 85, color: "text-cyan-400" },
    { name: "Angular", level: 75, color: "text-red-400" },
    { name: "Material-UI", level: 70, color: "text-blue-600" },
    { name: "Figma", level: 80, color: "text-purple-400" },
  ],
  backend: [
    { name: "Node.js", level: 85, color: "text-green-400" },
    { name: "Express.js", level: 80, color: "text-gray-400" },
    { name: "Go (Golang)", level: 75, color: "text-blue-400" },
    { name: "Python", level: 70, color: "text-yellow-400" },
    { name: "MongoDB", level: 85, color: "text-green-500" },
    { name: "PostgreSQL", level: 75, color: "text-blue-500" },
    { name: "MySQL", level: 80, color: "text-orange-400" },
    { name: "GraphQL", level: 65, color: "text-pink-400" },
  ],
  mobile: [
    { name: "React Native", level: 75, color: "text-blue-400" },
    { name: "Ionic", level: 70, color: "text-blue-500" },
    { name: "Flutter", level: 65, color: "text-cyan-400" },
  ],
};

// Work experience data
const workExperience = [
  {
    id: 1,
    company: "Mee Buddy",
    location: "Mangalagiri",
    position: "Full Stack Developer and UI/UX Designer",
    duration: "Dec 2024 – Present",
    description:
      "Part of the team that designed and developed the MeeBuddy platform using the MEAN stack, built and maintained cross-platform mobile applications with Ionic, and collaborated with team members to troubleshoot and optimize applications.",
    achievements: [
      "Designed intuitive interfaces using Figma, enhancing user engagement",
      "Built cross-platform mobile applications with Ionic framework",
      "Optimized application performance and user satisfaction",
    ],
    technologies: [
      "MongoDB",
      "Express.js",
      "Angular",
      "Node.js",
      "Ionic",
      "TailwindCSS",
      "Figma",
    ],
    type: "current",
  },
  {
    id: 2,
    company: "Techbuggy",
    location: "Hyderabad",
    position: "Full Stack Developer (Go Backend & React Frontend)",
    duration: "Dec 2023 – Nov 2024",
    description:
      "Developed full-stack web applications using React for frontend and Golang for backend, designed scalable RESTful APIs, and implemented responsive UI components.",
    achievements: [
      "Built scalable RESTful APIs supporting core functionalities",
      "Developed responsive UI components using modern JavaScript",
      "Implemented authentication and database interactions",
      "Followed best practices in code quality and deployment",
    ],
    technologies: [
      "Go",
      "React.js",
      "JavaScript",
      "TailwindCSS",
      "RESTful APIs",
    ],
    type: "previous",
  },
  {
    id: 3,
    company: "Teckzite",
    location: "Nuzvid",
    position: "Web Manager and Team Lead",
    duration: "Mar 2021 - Present",
    description:
      "Managed official websites for Teckzite events using MERN stack, directed development teams, and developed admin panels for event management.",
    achievements: [
      "Managed Teckzite25, Teckzite24, and Teckzite23 official websites",
      "Led development team in implementing web and mobile features",
      "Developed intuitive admin panel for event management",
      "Prioritized performance optimization and security enhancements",
    ],
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "TailwindCSS",
      "AWS",
    ],
    type: "current",
  },
  {
    id: 4,
    company: "Ecrush",
    location: "Nuzvid",
    position: "Web Team Coordinator",
    duration: "Jun 2021 - Sep 2023",
    description:
      "Led web development team in designing and implementing projects, developed multiple websites for English skill enhancement and tourism promotion.",
    achievements: [
      "Developed Ecrush Official Website for English skills enhancement",
      "Created Explore 2k23 and 2k22 for World Tourism Day",
      "Built E-Jubilant 2k22 and 2k23 for English Day celebrations",
      "Provided mentorship to team members for professional growth",
    ],
    technologies: ["MERN Stack", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    type: "previous",
  },
];

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
    "Compiler Design",
  ],
};

// Initial data
const initialFeaturedProjects = [
  {
    id: 1,
    name: "KarunyaSetu",
    description:
      "A decentralized disaster relief platform ensuring instant aid, privacy-preserving verification, and transparent fund management with multilingual AI chatbots.",
    technologies: ["Solidity", "Hardhat", "React", "Ethers.js", "AI"],
    liveUrl: "https://karunyasethu.vercel.app/",
    githubUrl: "https://github.com/Sribabu-Mandraju/KarunyaSetu",
    icon: "🌍",
    category: "DeFi",
  },
  {
    id: 2,
    name: "FuturaX",
    description:
      "A blockchain-powered prediction market for staking on real-world events with secure smart contracts for transparency and payouts.",
    technologies: ["Solidity", "IPFS", "Next.js", "Moralis", "Web3"],
    liveUrl: "https://future-x-ulpg.vercel.app/",
    githubUrl: "https://github.com/Sribabu-Mandraju/futurax_defi",
    icon: "🎯",
    category: "Prediction Market",
  },
  {
    id: 3,
    name: "NFT Staking",
    description:
      "A decentralized NFT staking system on Base Mainnet for secure NFT staking and rewards distribution.",
    technologies: ["Solidity", "Foundry", "React", "Base Network"],
    liveUrl: "https://lock-nft-frontend.vercel.app/",
    githubUrl: "https://github.com/Sribabu-Mandraju/lockNft_frontend",
    icon: "🖼",
    category: "NFT",
  },
];

const initialCurrentStatus = [
  { id: 1, text: "Available for projects", color: "green", active: true },
  {
    id: 2,
    text: "Learning new Web3 technologies",
    color: "blue",
    active: false,
  },
  { id: 3, text: "Building DeFi protocols", color: "purple", active: false },
];

const initialTechHighlights = [
  { name: "Solidity", level: 4 },
  { name: "React", level: 4 },
  { name: "Node.js", level: 4 },
  { name: "Web3.js", level: 4 },
];

function Portfolio() {
  const [activeTab, setActiveTab] = useState("overview");
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [featuredProjects, setFeaturedProjects] = useState(
    initialFeaturedProjects
  );
  const [currentStatus, setCurrentStatus] = useState(initialCurrentStatus);
  const [techHighlights, setTechHighlights] = useState(initialTechHighlights);

  // Edit states
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProjects, setIsEditingProjects] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingTech, setIsEditingTech] = useState(false);

  // Edit data states
  const [editBio, setEditBio] = useState(personalInfo.bio);
  const [editProjects, setEditProjects] = useState(featuredProjects);
  const [editStatus, setEditStatus] = useState(currentStatus);
  const [editTech, setEditTech] = useState(techHighlights);

  // Bio editing functions
  const handleEditBio = () => {
    setIsEditingBio(true);
    setEditBio(personalInfo.bio);
  };

  const handleSaveBio = () => {
    setPersonalInfo((prev) => ({ ...prev, bio: editBio }));
    setIsEditingBio(false);
  };

  const handleCancelBio = () => {
    setEditBio(personalInfo.bio);
    setIsEditingBio(false);
  };

  // Projects editing functions
  const handleEditProjects = () => {
    setIsEditingProjects(true);
    setEditProjects([...featuredProjects]);
  };

  const handleSaveProjects = () => {
    setFeaturedProjects(editProjects);
    setIsEditingProjects(false);
  };

  const handleCancelProjects = () => {
    setEditProjects([...featuredProjects]);
    setIsEditingProjects(false);
  };

  const addNewProject = () => {
    const newProject = {
      id: Date.now(),
      name: "New Project",
      description: "Project description here...",
      technologies: ["React"],
      liveUrl: "",
      githubUrl: "",
      icon: "🚀",
      category: "Web App",
    };
    setEditProjects([...editProjects, newProject]);
  };

  const updateProject = (id, field, value) => {
    setEditProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const removeProject = (id) => {
    setEditProjects((prev) => prev.filter((project) => project.id !== id));
  };

  // Status editing functions
  const handleEditStatus = () => {
    setIsEditingStatus(true);
    setEditStatus([...currentStatus]);
  };

  const handleSaveStatus = () => {
    setCurrentStatus(editStatus);
    setIsEditingStatus(false);
  };

  const handleCancelStatus = () => {
    setEditStatus([...currentStatus]);
    setIsEditingStatus(false);
  };

  const updateStatus = (id, field, value) => {
    setEditStatus((prev) =>
      prev.map((status) =>
        status.id === id ? { ...status, [field]: value } : status
      )
    );
  };

  const addNewStatus = () => {
    const newStatus = {
      id: Date.now(),
      text: "New status",
      color: "blue",
      active: false,
    };
    setEditStatus([...editStatus, newStatus]);
  };

  const removeStatus = (id) => {
    setEditStatus((prev) => prev.filter((status) => status.id !== id));
  };

  // Tech editing functions
  const handleEditTech = () => {
    setIsEditingTech(true);
    setEditTech([...techHighlights]);
  };

  const handleSaveTech = () => {
    setTechHighlights(editTech);
    setIsEditingTech(false);
  };

  const handleCancelTech = () => {
    setEditTech([...techHighlights]);
    setIsEditingTech(false);
  };

  const updateTech = (index, field, value) => {
    setEditTech((prev) =>
      prev.map((tech, i) => (i === index ? { ...tech, [field]: value } : tech))
    );
  };

  const addNewTech = () => {
    const newTech = { name: "New Tech", level: 3 };
    setEditTech([...editTech, newTech]);
  };

  const removeTech = (index) => {
    setEditTech((prev) => prev.filter((_, i) => i !== index));
  };

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
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Layout container: stacked on mobile, side-by-side on lg */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden pt-20 sm:px-4 lg:px-20 relative z-10">
        {/* Main Content */}
        <main
          className="flex-1 p-3 sm:p-4   lg:p-6 overflow-y-auto"
          aria-label="About content"
        >
          {/* Hero Section */}
          <AboutHero personalInfo={personalInfo} />

          {/* Navigation Tabs - horizontally scrollable on small screens */}
          <div className="mb-6">
            <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
              <div className="flex flex-row gap-1 p-2 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 min-w-max">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/25 border border-cyan-500/30"
                          : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20"
                      }`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${
                          activeTab === tab.id
                            ? "text-cyan-400"
                            : "group-hover:text-cyan-400"
                        }`}
                      />
                      <span className="hidden sm:inline">{tab.label}</span>
                      {activeTab === tab.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-sm -z-10"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* About Me Section */}
                <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

                  {/* Section Header with Edit Button */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
                        <User className="w-6 h-6 text-cyan-400" />
                      </div>
                      About Me
                    </h2>

                    {!isEditingBio ? (
                      <button
                        onClick={handleEditBio}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] group w-full sm:w-auto justify-center"
                      >
                        <Edit className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400">Edit</span>
                      </button>
                    ) : (
                      <div className="flex w-full sm:w-auto gap-2">
                        <button
                          onClick={handleSaveBio}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
                        >
                          <Save className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">Save</span>
                        </button>
                        <button
                          onClick={handleCancelBio}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
                        >
                          <X className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-red-400">Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    {!isEditingBio ? (
                      <p className="text-[14px]">{personalInfo.bio}</p>
                    ) : (
                      <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full bg-gray-900/50 border border-cyan-500/50 rounded-lg px-4 py-3 text-gray-300 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] resize-none"
                        rows="4"
                      />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                      <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-4 sm:p-6 rounded-xl border border-cyan-500/20">
                        <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Expertise
                        </h3>
                        <ul className="space-y-2 text-[13px]">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            Building DeFi platforms, NFTs, DAOs
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            Smart contract auditing and security
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            Full-stack development with modern frameworks
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Decentralized application architecture
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-4 sm:p-6 rounded-xl border border-purple-500/20">
                        <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 flex items-center">
                          <Zap className="w-5 h-5 mr-2" />
                          Focus Areas
                        </h3>
                        <ul className="space-y-2 text-[13px]">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            Trustless system development
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                            Seamless user experiences
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            Blockchain security best practices
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            Scalable web solutions
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Projects */}
                <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500"></div>

                  {/* Section Header with Edit Button */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                      <div className="p-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg mr-3 border border-purple-500/30">
                        <Cpu className="w-6 h-6 text-purple-400" />
                      </div>
                      Featured Projects
                    </h2>

                    {!isEditingProjects ? (
                      <button
                        onClick={handleEditProjects}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-purple-500/50 hover:border-purple-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(147,51,234,0.3)] group w-full sm:w-auto justify-center"
                      >
                        <Edit className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-400">Edit</span>
                      </button>
                    ) : (
                      <div className="flex w-full sm:w-auto gap-2">
                        <button
                          onClick={addNewProject}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group"
                        >
                          <Plus className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-blue-400">Add</span>
                        </button>
                        <button
                          onClick={handleSaveProjects}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
                        >
                          <Save className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">Save</span>
                        </button>
                        <button
                          onClick={handleCancelProjects}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
                        >
                          <X className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-red-400">Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(isEditingProjects ? editProjects : featuredProjects).map(
                      (project) => (
                        <div
                          key={project.id}
                          className="group bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
                        >
                          {/* Animated border */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm"></div>

                          {/* Delete button when editing */}
                          {isEditingProjects && (
                            <button
                              onClick={() => removeProject(project.id)}
                              className="absolute top-2 right-2 p-1 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors duration-300 z-20"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          )}

                          <div className="relative z-10">
                            <div className="flex items-start flex-col gap-4 mb-4">
                              <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                  <div className="text-3xl p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                                    {isEditingProjects ? (
                                      <input
                                        type="text"
                                        value={project.icon}
                                        onChange={(e) =>
                                          updateProject(
                                            project.id,
                                            "icon",
                                            e.target.value
                                          )
                                        }
                                        className="bg-transparent text-3xl w-8 text-center focus:outline-none"
                                      />
                                    ) : (
                                      project.icon
                                    )}
                                  </div>
                                  <div className="w-full">
                                    {isEditingProjects ? (
                                      <input
                                        type="text"
                                        value={project.name}
                                        onChange={(e) =>
                                          updateProject(
                                            project.id,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                        className="font-bold text-white text-lg bg-gray-900/50 border border-gray-700 rounded px-2 py-1 w-full focus:border-cyan-400 focus:outline-none"
                                      />
                                    ) : (
                                      <h3 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300">
                                        {project.name}
                                      </h3>
                                    )}
                                    {isEditingProjects ? (
                                      <input
                                        type="text"
                                        value={project.category}
                                        onChange={(e) =>
                                          updateProject(
                                            project.id,
                                            "category",
                                            e.target.value
                                          )
                                        }
                                        className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20 mt-1 focus:outline-none"
                                      />
                                    ) : (
                                      <span className="text-[10px] w-auto text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                                        {project.category}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {isEditingProjects ? (
                                <textarea
                                  value={project.description}
                                  onChange={(e) =>
                                    updateProject(
                                      project.id,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  className="text-[13px] text-gray-300 bg-gray-900/50 border border-gray-700 rounded px-3 py-2 w-full focus:border-cyan-400 focus:outline-none resize-none"
                                  rows="3"
                                />
                              ) : (
                                <p className="text-[13px] text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                  {project.description}
                                </p>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600/50 hover:border-cyan-500/50 transition-colors duration-300"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/30">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>

                            {isEditingProjects ? (
                              <div className="space-y-2">
                                <input
                                  type="url"
                                  value={project.githubUrl}
                                  onChange={(e) =>
                                    updateProject(
                                      project.id,
                                      "githubUrl",
                                      e.target.value
                                    )
                                  }
                                  placeholder="GitHub URL"
                                  className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none"
                                />
                                <input
                                  type="url"
                                  value={project.liveUrl}
                                  onChange={(e) =>
                                    updateProject(
                                      project.id,
                                      "liveUrl",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Live Demo URL"
                                  className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-2 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 text-white text-sm rounded-lg transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50 group/btn justify-center"
                                >
                                  <Github className="w-4 h-4 group-hover/btn:text-cyan-400 transition-colors duration-300" />
                                  Code
                                </a>
                                {project.liveUrl && (
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center w-full sm:w-auto gap-2 px-2 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 text-xs rounded-lg transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500/50 shadow-lg shadow-cyan-500/20 group/btn justify-center"
                                  >
                                    <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                                    LiveDemo
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "skills" && <TechStack techStack={techStack} />}
            {activeTab === "experience" && (
              <Experience workExperience={workExperience} />
            )}
            {activeTab === "education" && <Education education={education} />}
            {activeTab === "progress" && <SkillProgress />}
            {activeTab === "contact" && (
              <ContactInfo personalInfo={personalInfo} />
            )}
          </div>
        </main>

        {/* Right Sidebar: stacks under main on mobile, side column on lg */}
        <aside
          className="w-full lg:w-80 p-4 lg:p-6 space-y-6 overflow-y-auto order-last lg:order-none"
          aria-label="About sidebar"
        >
          {/* Quick Contact */}
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              Quick Contact
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 group border border-transparent hover:border-cyan-500/20"
              >
                <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    Email
                  </span>
                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    Send a message
                  </p>
                </div>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 transition-all duration-300 group border border-transparent hover:border-green-500/20"
              >
                <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30 group-hover:border-green-500/50 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    Call
                  </span>
                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    Direct contact
                  </p>
                </div>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-indigo-500/10 transition-all duration-300 group border border-transparent hover:border-blue-500/20"
              >
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg border border-blue-500/30 group-hover:border-blue-500/50 transition-colors duration-300">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    LinkedIn
                  </span>
                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    Professional network
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

            {/* Section Header with Edit Button */}
            <div className="flex flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg mr-3 border border-purple-500/30">
                  <Database className="w-5 h-5 text-purple-400" />
                </div>
                Current Status
              </h3>

              {!isEditingStatus ? (
                <button
                  onClick={handleEditStatus}
                  className="p-2 bg-gray-900/50 border  border-purple-500/50 hover:border-purple-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(147,51,234,0.3)] group w-auto justify-center"
                >
                  <Edit className="w-4 h-4 text-purple-400" />
                </button>
              ) : (
                <div className="flex items-end w-auto gap-1">
                  <button
                    onClick={addNewStatus}
                    className="flex sm:flex-none p-2  bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group"
                  >
                    <Plus className="w-2 h-2 text-blue-400" />
                  </button>
                  <button
                    onClick={handleSaveStatus}
                    className="flex sm:flex-none p-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
                  >
                    <Save className="w-2 h-2 text-green-400" />
                  </button>
                  <button
                    onClick={handleCancelStatus}
                    className="flex sm:flex-none p-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
                  >
                    <X className="w-2 h-2 text-red-400" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm">
              {(isEditingStatus ? editStatus : currentStatus).map((status) => (
                <div
                  key={status.id}
                  className={`flex items-center  gap-3 p-3 bg-gradient-to-r from-${
                    status.color
                  }-500/10 to-${
                    status.color === "green"
                      ? "emerald"
                      : status.color === "blue"
                      ? "cyan"
                      : "pink"
                  }-500/10 rounded-lg border border-${
                    status.color
                  }-500/20 relative`}
                >
                  <div className="relative">
                    <div
                      className={`w-3 h-3 bg-${status.color}-400 rounded-full ${
                        status.active
                          ? "animate-ping opacity-75"
                          : "animate-pulse"
                      }`}
                    ></div>
                    {status.active && (
                      <div
                        className={`absolute inset-0 w-3 h-3 bg-${status.color}-400 rounded-full`}
                      ></div>
                    )}
                  </div>

                  {isEditingStatus ? (
                    <input
                      type="text"
                      value={status.text}
                      onChange={(e) =>
                        updateStatus(status.id, "text", e.target.value)
                      }
                      className="text-gray-300 font-medium bg-transparent border-none w-full  focus:outline-none flex-1"
                    />
                  ) : (
                    <span className="text-gray-300 font-medium">
                      {status.text}
                    </span>
                  )}
                  {isEditingStatus && (
                    <button
                      onClick={() => removeStatus(status.id)}
                      className="p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Highlights */}
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

            {/* Section Header with Edit Button */}
            <div className="flex flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
                  <Code className="w-5 h-5 text-cyan-400" />
                </div>
                Tech Highlights
              </h3>

              {!isEditingTech ? (
                <button
                  onClick={handleEditTech}
                  className="p-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] group w-auto justify-center"
                >
                  <Edit className="w-4 h-4 text-cyan-400" />
                </button>
              ) : (
                <div className="flex w-auto gap-1">
                  <button
                    onClick={addNewTech}
                    className="flex sm:flex-none p-2 bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group"
                  >
                    <Plus className="w-2 h-2 text-blue-400" />
                  </button>
                  <button
                    onClick={handleSaveTech}
                    className="flex sm:flex-none p-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
                  >
                    <Save className="w-2 h-2 text-green-400" />
                  </button>
                  <button
                    onClick={handleCancelTech}
                    className="flex sm:flex-none p-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
                  >
                    <X className="w-2 h-2 text-red-400" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {(isEditingTech ? editTech : techHighlights).map(
                (tech, index) => (
                  <div
                    key={index}
                    className="flex flex-row w-full items-center justify-between p-2 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-700/30 relative"
                  >
                    {isEditingTech ? (
                      <input
                        type="text"
                        value={tech.name}
                        onChange={(e) =>
                          updateTech(index, "name", e.target.value)
                        }
                        className="text-sm text-gray-300 bg-transparent border-none w-[60%] focus:outline-none"
                      />
                    ) : (
                      <span className="text-sm text-gray-300 ">
                        {tech.name}
                      </span>
                    )}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full cursor-pointer ${
                            i < tech.level ? "bg-cyan-400" : "bg-gray-600"
                          }`}
                          onClick={() =>
                            isEditingTech && updateTech(index, "level", i + 1)
                          }
                        />
                      ))}
                    </div>
                    {isEditingTech && (
                      <button
                        onClick={() => removeTech(index)}
                        className=" p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}

export default Portfolio;
