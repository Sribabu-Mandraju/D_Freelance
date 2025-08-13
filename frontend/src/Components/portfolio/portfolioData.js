// Personal information
const personalInfo = {
  name: "Sribabu Mandraju",
  title: "Full Stack & Web3 Developer | Smart Contract Engineer",
  email: "sribabumandraju@gmail.com",
  phone: "+91 63037 38847",
  location: "Hyderabad, India",
  github: "https://github.com/Sribabu-Mandraju",
  linkedin: "https://www.linkedin.com/in/sribabu-mandraju/",
  twitter: "https://x.com/5R1B4BU",
  bio: "I'm a Full Stack & Web3 Developer and Smart Contract Engineer passionate about crafting decentralized applications (dApps) and scalable web solutions. I merge cutting-edge blockchain technology with modern web development to build secure, transparent, and user-centric applications.",
  mission:
    "Empowering users through decentralized, accessible tech and delivering trustless systems with seamless user experiences.",
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
}

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
    technologies: ["MongoDB", "Express.js", "Angular", "Node.js", "Ionic", "TailwindCSS", "Figma"],
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
    technologies: ["Go", "React.js", "JavaScript", "TailwindCSS", "RESTful APIs"],
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
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "TailwindCSS", "AWS"],
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
    "Compiler Design",
  ],
}

// Featured projects data
const featuredProjects = [
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
    description: "A decentralized NFT staking system on Base Mainnet for secure NFT staking and rewards distribution.",
    technologies: ["Solidity", "Foundry", "React", "Base Network"],
    liveUrl: "https://lock-nft-frontend.vercel.app/",
    githubUrl: "https://github.com/Sribabu-Mandraju/lockNft_frontend",
    icon: "🖼",
    category: "NFT",
  },
]

// Current status data
const currentStatus = [
  { id: 1, text: "Available for projects", color: "green", active: true },
  { id: 2, text: "Learning new Web3 technologies", color: "blue", active: false },
  { id: 3, text: "Building DeFi protocols", color: "purple", active: false },
]

// Tech highlights data
const techHighlights = [
  { name: "Solidity", level: 4 },
  { name: "React", level: 4 },
  { name: "Node.js", level: 4 },
  { name: "Web3.js", level: 4 },
]

export const initialData = {
  personalInfo,
  techStack,
  workExperience,
  education,
  featuredProjects,
  currentStatus,
  techHighlights,
}
