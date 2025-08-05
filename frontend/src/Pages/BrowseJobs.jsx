"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Clock, DollarSign, Users, Star, Bookmark } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const jobsData = [
  {
    id: 1,
    title: "Build a DeFi Trading Dashboard",
    description:
      "Looking for an experienced React developer to build a comprehensive DeFi trading dashboard with real-time data integration and Web3 wallet connectivity.",
    budget: "$3,000 - $5,000",
    timeframe: "2-3 weeks",
    skills: ["React", "Web3", "JavaScript", "Smart Contracts"],
    client: {
      name: "CryptoTech Labs",
      rating: 4.9,
      jobsPosted: 12,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    proposals: 8,
    postedTime: "2 hours ago",
    location: "Remote",
    type: "Fixed Price",
    featured: true,
  },
  {
    id: 2,
    title: "NFT Marketplace UI/UX Design",
    description:
      "Need a talented designer to create modern, user-friendly interface for our NFT marketplace. Must have experience with Web3 design patterns.",
    budget: "$1,500 - $2,500",
    timeframe: "1-2 weeks",
    skills: ["UI/UX", "Figma", "Web3 Design", "Prototyping"],
    client: {
      name: "Digital Arts Co",
      rating: 4.7,
      jobsPosted: 8,
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    proposals: 15,
    postedTime: "4 hours ago",
    location: "Remote",
    type: "Fixed Price",
    featured: false,
  },
  {
    id: 3,
    title: "Smart Contract Security Audit",
    description:
      "Seeking experienced Solidity developer to audit our DeFi protocol smart contracts. Must have proven track record in security auditing.",
    budget: "$5,000 - $8,000",
    timeframe: "1 week",
    skills: ["Solidity", "Security", "Smart Contracts", "Testing"],
    client: {
      name: "DeFi Protocol",
      rating: 5.0,
      jobsPosted: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    proposals: 5,
    postedTime: "6 hours ago",
    location: "Remote",
    type: "Fixed Price",
    featured: true,
  },
  {
    id: 4,
    title: "Mobile App Development - Crypto Wallet",
    description:
      "Build a secure mobile crypto wallet app for iOS and Android. Must integrate with multiple blockchain networks.",
    budget: "$8,000 - $12,000",
    timeframe: "4-6 weeks",
    skills: ["React Native", "Blockchain", "Mobile Development", "Security"],
    client: {
      name: "Wallet Solutions",
      rating: 4.8,
      jobsPosted: 15,
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    proposals: 12,
    postedTime: "1 day ago",
    location: "Remote",
    type: "Fixed Price",
    featured: false,
  },
  {
    id: 5,
    title: "Technical Content Writing - Blockchain",
    description:
      "Looking for experienced technical writer to create comprehensive documentation and blog posts about blockchain technology.",
    budget: "$500 - $1,000",
    timeframe: "2 weeks",
    skills: ["Technical Writing", "Blockchain", "Documentation", "SEO"],
    client: {
      name: "Crypto Education",
      rating: 4.6,
      jobsPosted: 25,
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    proposals: 22,
    postedTime: "2 days ago",
    location: "Remote",
    type: "Fixed Price",
    featured: false,
  },
]

const BrowseJobs = () => {
  const [jobs, setJobs] = useState(jobsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [savedJobs, setSavedJobs] = useState(new Set())

  const categories = [
    "All",
    "Web Development",
    "Smart Contracts",
    "UI/UX Design",
    "Mobile Development",
    "Content Writing",
    "AI/ML",
  ]
  const priceRanges = ["All", "$0 - $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000+"]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(selectedCategory.toLowerCase().replace(" development", "").replace(" design", "")),
      )

    return matchesSearch && matchesCategory
  })

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs)
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId)
    } else {
      newSavedJobs.add(jobId)
    }
    setSavedJobs(newSavedJobs)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
              Browse Jobs
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover amazing opportunities from clients around the world
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-600 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>All Types</option>
                    <option>Fixed Price</option>
                    <option>Hourly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>All Levels</option>
                    <option>Entry Level</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Most Recent</option>
              <option>Highest Budget</option>
              <option>Lowest Budget</option>
              <option>Most Proposals</option>
            </select>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.has(job.id)}
                onToggleSave={() => toggleSaveJob(job.id)}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all">
              Load More Jobs
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
export default BrowseJobs;
function JobCard({ job, isSaved, onToggleSave }) {
  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-md border rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 ${job.featured ? "border-purple-500/30 bg-purple-900/10" : "border-gray-700"}`}
    >
      {job.featured && (
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs px-2 py-1 rounded-full mb-4">
          <Star className="w-3 h-3" />
          Featured
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-300 cursor-pointer transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">{job.description}</p>
        </div>
        <button
          onClick={onToggleSave}
          className={`ml-4 p-2 rounded-lg transition-colors ${
            isSaved ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400 hover:bg-gray-600"
          }`}
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <DollarSign className="w-4 h-4" />
          <span>{job.budget}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{job.timeframe}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span>{job.proposals} proposals</span>
        </div>
      </div>

      {/* Client Info and Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={job.client.avatar || "/placeholder.svg"}
            alt={job.client.name}
            className="w-10 h-10 rounded-full border-2 border-gray-600"
          />
          <div>
            <p className="text-white font-medium">{job.client.name}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{job.client.rating}</span>
              <span>•</span>
              <span>{job.client.jobsPosted} jobs posted</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{job.postedTime}</span>
          <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-all">
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  )
}
