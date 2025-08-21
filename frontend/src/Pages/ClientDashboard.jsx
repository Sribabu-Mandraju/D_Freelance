"use client"

import { useState } from "react"
import { Briefcase, Users, DollarSign, Plus, Eye, MessageCircle, Star } from "lucide-react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { label: "Active Jobs", value: "5", icon: <Briefcase className="w-6 h-6" />, color: "text-blue-400" },
    { label: "Total Spent", value: "$12,450", icon: <DollarSign className="w-6 h-6" />, color: "text-green-400" },
    { label: "Freelancers Hired", value: "23", icon: <Users className="w-6 h-6" />, color: "text-purple-400" },
    { label: "Avg. Rating Given", value: "4.8", icon: <Star className="w-6 h-6" />, color: "text-yellow-400" },
  ]

  const activeJobs = [
    {
      id: 1,
      title: "DeFi Dashboard Development",
      freelancer: "Sarah Chen",
      budget: "$3,500",
      progress: 75,
      deadline: "Dec 15, 2024",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Smart Contract Audit",
      freelancer: "Alex Rodriguez",
      budget: "$2,000",
      progress: 30,
      deadline: "Dec 20, 2024",
      status: "In Progress",
    },
  ]

  const recentActivity = [
    { type: "proposal", message: "New proposal received for 'NFT Marketplace Design'", time: "2 hours ago" },
    { type: "milestone", message: "Milestone completed for 'DeFi Dashboard Development'", time: "1 day ago" },
    { type: "message", message: "New message from Sarah Chen", time: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-900">

      <div className="pt-20 sm:pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <Navbar/>
          <div className="flex sm:flex-row flex-col-reverse items-end justify-between gap-4 sm:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
                Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Manage your projects and freelancers</p>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Post New Job
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl mb-8">
            <div className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "active-jobs", label: "Active Jobs" },
                { id: "proposals", label: "Proposals" },
                { id: "completed", label: "Completed" },
                { id: "payments", label: "Payments" },
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
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Active Jobs */}
              <div className="lg:col-span-2">
                <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Active Jobs</h3>
                  <div className="space-y-4">
                    {activeJobs.map((job) => (
                      <div key={job.id} className="bg-gray-700/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="sm:w-auto w-[60%] ">
                            <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                            <p className="text-gray-400">with {job.freelancer}</p>
                          </div>
                          <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[10px] sm:text-sm">
                            {job.status}
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{job.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-cyan-500 h-2 rounded-full"
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-4 text-sm text-gray-400">
                            <span>Budget: {job.budget}</span>
                            <span>Due: {job.deadline}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-300" />
                            </button>
                            <button className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                              <MessageCircle className="w-4 h-4 text-gray-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-gray-300 text-sm">{activity.message}</p>
                          <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
export default ClientDashboard;
