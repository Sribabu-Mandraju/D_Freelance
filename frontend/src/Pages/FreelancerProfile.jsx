"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { Star, MapPin, Clock, Shield, MessageCircle, Heart, Share2 } from "lucide-react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
const FreelancerProfile = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("overview")
//atatu
  // Mock freelancer data
const freelancer = {
  id: 1,
  name: "Sarah Chen",
  title: "Full-Stack Web3 Developer",
  avatar: "https://i.pravatar.cc/150?img=47",
  location: "San Francisco, CA",
  hourlyRate: 75,
  totalEarned: "$127,500",
  jobsCompleted: 89,
  rating: 4.9,
  totalReviews: 67,
  responseTime: "< 1 hour",
  languages: ["English (Native)", "Mandarin (Fluent)"],
  memberSince: "2022",
  lastActive: "2 hours ago",
  badges: ["Top Rated", "Expert Verified", "Rising Talent"],
  skills: [
    "React",
    "Node.js",
    "Solidity",
    "Web3",
    "JavaScript",
    "TypeScript",
    "Smart Contracts",
    "DeFi",
    "NFTs",
    "Blockchain",
    "MongoDB",
    "PostgreSQL",
  ],
  bio: "Passionate full-stack developer with 5+ years of experience...",
  portfolio: [
    {
      id: 1,
      title: "DeFi Trading Platform",
      image: "https://via.placeholder.com/400x300",
      description: "Built a comprehensive DeFi trading platform...",
      technologies: ["React", "Solidity", "Web3"],
    },
    {
      id: 2,
      title: "NFT Marketplace",
      image: "https://via.placeholder.com/400x300",
      description: "Created a full-featured NFT marketplace...",
      technologies: ["Next.js", "Smart Contracts", "IPFS"],
    },
  ],
  clientReviews: [
    {
      id: 1,
      client: "TechCorp Inc",
      rating: 5,
      comment:
        "Sarah delivered exceptional work...",
      project: "DeFi Dashboard Development",
      date: "2 weeks ago",
    },
    {
      id: 2,
      client: "Crypto Startup",
      rating: 5,
      comment: "Amazing developer...",
      project: "Smart Contract Audit",
      date: "1 month ago",
    },
  ],
};


  return (
    <div className="min-h-screen bg-gray-900">

      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Avatar and Basic Info */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative mb-4">
                  <img
                    src={freelancer.avatar || "/placeholder.svg"}
                    alt={freelancer.name}
                    className="w-32 h-32 rounded-full border-4 border-purple-500/50"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-gray-800 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-white mb-2">{freelancer.name}</h1>
                  <p className="text-xl text-gray-300 mb-4">{freelancer.title}</p>

                  <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{freelancer.location}</span>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Last active {freelancer.lastActive}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {freelancer.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Stats and Actions */}
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400" />
                      <span className="text-2xl font-bold">{freelancer.rating}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{freelancer.reviews} reviews</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{freelancer.jobsCompleted}</p>
                    <p className="text-gray-400 text-sm">Jobs completed</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">${freelancer.hourlyRate}/hr</p>
                    <p className="text-gray-400 text-sm">Hourly rate</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">{freelancer.totalEarned}</p>
                    <p className="text-gray-400 text-sm">Total earned</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Contact Sarah
                  </button>
                  <button className="border-2 border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Save
                  </button>
                  <button className="border-2 border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white py-3 px-4 rounded-lg font-semibold transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl mb-8">
            <div className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "portfolio", label: "Portfolio" },
                { id: "reviews", label: "Reviews" },
                { id: "experience", label: "Experience" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Bio */}
                  <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">About Sarah</h3>
                    <p className="text-gray-300 leading-relaxed">{freelancer.bio}</p>
                  </div>

                  {/* Skills */}
                  <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-purple-600/20 text-purple-300 px-3 py-2 rounded-lg text-sm border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "portfolio" && (
                <div className="space-y-6">
                  {freelancer.portfolio.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                          <p className="text-gray-300 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {freelancer.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{review.client}</h4>
                          <p className="text-gray-400 text-sm">{review.project}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 mb-2">"{review.comment}"</p>
                      <p className="text-gray-500 text-sm">{review.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response time</span>
                    <span className="text-white font-semibold">{freelancer.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Member since</span>
                    <span className="text-white font-semibold">{freelancer.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success rate</span>
                    <span className="text-green-400 font-semibold">98%</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Languages</h3>
                <div className="space-y-2">
                  {freelancer.languages.map((language, index) => (
                    <p key={index} className="text-gray-300">
                      {language}
                    </p>
                  ))}
                </div>
              </div>

              {/* Verification */}
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Verification</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Identity Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Payment Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Email Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default FreelancerProfile;