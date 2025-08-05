"use client"

import { useState } from "react"
import { Plus, X, DollarSign, Clock, Shield } from "lucide-react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    budget: "",
    budgetType: "fixed",
    timeframe: "",
    experienceLevel: "",
    attachments: [],
  })

  const [skillInput, setSkillInput] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  const categories = [
    "Web Development",
    "Smart Contract Development",
    "UI/UX Design",
    "Content Writing",
    "Mobile App Development",
    "AI/ML Projects",
    "SEO & Digital Marketing",
    "Video Editing & Animation",
  ]

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Job posted:", formData)
    // Handle job posting logic here
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
              Post a Job
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find the perfect freelancer for your project on the blockchain
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step
                        ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        currentStep > step ? "bg-gradient-to-r from-purple-600 to-cyan-500" : "bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Build a DeFi Trading Dashboard"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your project in detail..."
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Required Skills</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Add a skill"
                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Budget & Timeline */}
            {currentStep === 2 && (
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Budget & Timeline</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">Budget Type *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.budgetType === "fixed"
                            ? "border-purple-500 bg-purple-900/20"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                        onClick={() => setFormData({ ...formData, budgetType: "fixed" })}
                      >
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-6 h-6 text-purple-400" />
                          <div>
                            <h3 className="text-white font-semibold">Fixed Price</h3>
                            <p className="text-gray-400 text-sm">Pay a set amount for the entire project</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.budgetType === "hourly"
                            ? "border-purple-500 bg-purple-900/20"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                        onClick={() => setFormData({ ...formData, budgetType: "hourly" })}
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="w-6 h-6 text-cyan-400" />
                          <div>
                            <h3 className="text-white font-semibold">Hourly Rate</h3>
                            <p className="text-gray-400 text-sm">Pay based on hours worked</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {formData.budgetType === "fixed" ? "Project Budget" : "Hourly Rate"} *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder={formData.budgetType === "fixed" ? "5,000" : "50"}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Timeline *</label>
                    <select
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="less-than-1-week">Less than 1 week</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="2-4-weeks">2-4 weeks</option>
                      <option value="1-2-months">1-2 months</option>
                      <option value="2-6-months">2-6 months</option>
                      <option value="more-than-6-months">More than 6 months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level Required *</label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="entry">Entry Level</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Post */}
            {currentStep === 3 && (
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Review & Post</h2>

                <div className="space-y-6">
                  {/* Job Preview */}
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">{formData.title}</h3>
                    <p className="text-gray-300 mb-4">{formData.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="text-white font-semibold">{formData.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Budget</p>
                        <p className="text-white font-semibold">${formData.budget}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Timeline</p>
                        <p className="text-white font-semibold">{formData.timeframe}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Experience</p>
                        <p className="text-white font-semibold">{formData.experienceLevel}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Smart Contract Info */}
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">Smart Contract Escrow</h3>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Your funds will be securely held in a smart contract escrow until the work is completed and
                      approved.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Funds are locked in escrow when freelancer is hired</li>
                      <li>• Automatic release upon work approval</li>
                      <li>• Dispute resolution through decentralized arbitration</li>
                      <li>• No platform fees - only blockchain gas costs</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 border-2 border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg font-semibold transition-all"
                >
                  Previous
                </button>
              )}

              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Post Job
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
