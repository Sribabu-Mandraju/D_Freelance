"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  Bookmark,
} from "lucide-react";

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
];

const BrowseJobs = () => {
  const [jobs, setJobs] = useState(jobsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());

  const categories = [
    "All",
    "Web Development",
    "Smart Contracts",
    "UI/UX Design",
    "Mobile Development",
    "Content Writing",
    "AI/ML",
  ];
  const priceRanges = [
    "All",
    "$0 - $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" ||
      job.skills.some((skill) =>
        skill
          .toLowerCase()
          .includes(
            selectedCategory
              .toLowerCase()
              .replace(" development", "")
              .replace(" design", "")
          )
      );

    return matchesSearch && matchesCategory;
  });

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-h-[90vh] overflow-y-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Browse Jobs
            </h1>
            <p className="text-base text-gray-300 max-w-2xl mx-auto">
              Discover amazing opportunities from clients around the world
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 mb-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-cyan-500/50 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-900/50 border border-cyan-500/50 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
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
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-cyan-500/20 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-cyan-500/50 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Job Type
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-900/50 border border-cyan-500/50 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm">
                    <option>All Types</option>
                    <option>Fixed Price</option>
                    <option>Hourly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Experience Level
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-900/50 border border-cyan-500/50 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm">
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
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-400 text-sm">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <select className="px-3 py-2 bg-gray-900/50 border border-cyan-500/50 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400">
              <option>Most Recent</option>
              <option>Highest Budget</option>
              <option>Lowest Budget</option>
              <option>Most Proposals</option>
            </select>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
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
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 text-sm">
              Load More Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function JobCard({ job, isSaved, onToggleSave }) {
  return (
    <div
      className={`bg-black/40 backdrop-blur-xl border rounded-2xl p-4 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl shadow-cyan-500/10 relative overflow-hidden ${
        job.featured
          ? "border-cyan-500/30 bg-cyan-500/5"
          : "border-gray-700/30"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      {job.featured && (
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full mb-3">
          <Star className="w-3 h-3" />
          Featured
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2 hover:text-cyan-300 cursor-pointer transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
            {job.description}
          </p>
        </div>
        <button
          onClick={onToggleSave}
          className={`ml-4 p-2 rounded-lg transition-colors ${
            isSaved
              ? "bg-cyan-500 text-white"
              : "bg-gray-900/50 text-gray-400 hover:bg-cyan-500/20"
          }`}
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-900/50 text-gray-300 px-2 py-1 rounded-full text-xs border border-gray-700/50 hover:border-cyan-500/50 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
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
      <div className="flex justify-between items-center pt-3 border-t border-cyan-500/20">
        <div className="flex items-center gap-3">
          <img
            src={job.client.avatar || "/placeholder.svg"}
            alt={job.client.name}
            className="w-8 h-8 rounded-full border-2 border-cyan-500/50"
          />
          <div>
            <p className="text-white font-medium text-sm">{job.client.name}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span>{job.client.rating}</span>
              <span>•</span>
              <span>{job.client.jobsPosted} jobs posted</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{job.postedTime}</span>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm shadow-lg">
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrowseJobs;