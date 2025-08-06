"use client"
import { useState } from "react"
import { Plus, X, DollarSign, Clock, Wallet, Tag, CheckCircle } from 'lucide-react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function PostCryptoProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    budget: "",
    project_duration: "",
    user_wallet_address: "",
    tags: [],
    skills_requirement: [],
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [newTag, setNewTag] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const submissionData = {
      ...formData,
      budget: Number(formData.budget),
    }
    console.log("Crypto project proposal submitted:", submissionData)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ 
        ...formData, 
        tags: [...formData.tags, newTag.trim()] 
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills_requirement.includes(newSkill.trim())) {
      setFormData({ 
        ...formData, 
        skills_requirement: [...formData.skills_requirement, newSkill.trim()] 
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills_requirement: formData.skills_requirement.filter(skill => skill !== skillToRemove)
    })
  }

  const stepTitles = ["Basic Info", "Requirements", "Review"]
  const stepIcons = [CheckCircle, Tag, CheckCircle]

  return (  
    <div className="min-h-screen bg-slate-900">
      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Post Your Crypto Project
            </h1>
            <p className="text-xs text-gray-400">
              Submit a detailed proposal for your blockchain project
            </p>
          </div>

          {/* Progress Steps - Compact */}
          <div className="flex justify-center mb-3">
            <div className="flex items-center space-x-3">
              {[1, 2, 3].map((step) => {
                const Icon = stepIcons[step - 1]
                return (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${
                          currentStep >= step
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-slate-700 text-gray-400"
                        }`}
                      >
                        {step}
                      </div>
                      <span className={`text-xs mt-1 ${
                        currentStep >= step ? "text-blue-400 font-semibold" : "text-gray-500"
                      }`}>
                        {stepTitles[step - 1]}
                      </span>
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-12 h-1 mx-2 ${
                          currentStep > step ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-slate-700"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form Content - Takes remaining space */}
          <div className="flex-1 flex flex-col min-h-0">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              {/* Form Steps - Scrollable content area */}
              <div className="flex-1 flex justify-center min-h-0">
                <div className="w-full max-w-2xl flex flex-col">
                  
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex-1 overflow-y-auto">
                      <h2 className="text-xl font-bold text-white mb-4 text-center">Basic Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Project Title *
                          </label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., DeFi Trading Dashboard"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Budget (USD) *
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="number"
                              value={formData.budget}
                              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                              placeholder="5000"
                              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Project Duration *
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                              value={formData.project_duration}
                              onChange={(e) => setFormData({ ...formData, project_duration: e.target.value })}
                              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                              required
                            >
                              <option value="">Select duration</option>
                              <option value="1-2 weeks">1-2 weeks</option>
                              <option value="3-4 weeks">3-4 weeks</option>
                              <option value="1-2 months">1-2 months</option>
                              <option value="3-6 months">3-6 months</option>
                              <option value="6+ months">6+ months</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Project Image URL
                          </label>
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Project Description *
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your blockchain project requirements..."
                            rows={3}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Requirements */}
                  {currentStep === 2 && (
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 h-auto">
                      <h2 className="text-xl font-bold text-white mb-5 text-center">Requirements</h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-base font-medium text-white mb-2">
                            Your Wallet Address *
                          </label>
                          <div className="relative">
                            <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              value={formData.user_wallet_address}
                              onChange={(e) => setFormData({ ...formData, user_wallet_address: e.target.value })}
                              placeholder="0x1234567890abcdef..."
                              className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-base font-medium text-white mb-2">
                            Required Skills *
                          </label>
                          <div className="flex gap-2 mb-3">
                            <input
                              type="text"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              placeholder="e.g., Solidity, React"
                              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                            />
                            <button
                              type="button"
                              onClick={addSkill}
                              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          {formData.skills_requirement.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {formData.skills_requirement.map((skill, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                    className="hover:bg-blue-700 rounded-full p-0.5"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                          {formData.skills_requirement.length === 0 && (
                            <p className="text-red-400 text-sm">At least one skill required</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-base font-medium text-white mb-2">
                            Project Tags
                          </label>
                          <div className="flex gap-2 mb-3">
                            <input
                              type="text"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              placeholder="e.g., DeFi, NFT"
                              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            />
                            <button
                              type="button"
                              onClick={addTag}
                              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {formData.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="hover:bg-purple-700 rounded-full p-0.5"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {currentStep === 3 && (
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Review & Submit</h2>
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-md font-medium">Ready to submit</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-green-50/10 border border-green-500/20 rounded-lg p-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <CheckCircle className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Title</span>
                              </div>
                              <p className="text-white font-semibold text-lg">{formData.title}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <DollarSign className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Budget</span>
                              </div>
                              <p className="text-white font-semibold text-lg">${formData.budget}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Duration</span>
                              </div>
                              <p className="text-white font-semibold text-lg">{formData.project_duration}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Wallet className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Wallet</span>
                              </div>
                              <p className="text-white font-semibold text-xs break-all">{formData.user_wallet_address}</p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className="text-xs font-medium text-gray-400">Description</span>
                            <p className="text-gray-300 text-xs leading-relaxed mt-1">{formData.description}</p>
                          </div>

                          {formData.skills_requirement.length > 0 && (
                            <div className="mb-3">
                              <span className="text-xs font-medium text-gray-400">Skills</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {formData.skills_requirement.map((skill, index) => (
                                  <span key={index} className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {formData.tags.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-gray-400">Tags</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {formData.tags.map((tag, index) => (
                                  <span key={index} className="px-2 py-0.5 bg-purple-600 text-white rounded-full text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {formData.image && (
                          <div>
                            <span className="text-xs font-medium text-gray-400">Project Image</span>
                            <img 
                              src={formData.image || "/placeholder.svg"} 
                              alt="Project preview" 
                              className="w-full h-20 object-cover rounded-lg border border-slate-600 mt-1"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=80&width=400&text=Image+Preview";
                              }}
                            />
                          </div>
                        )}

                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-3">
                          <h3 className="text-lg font-semibold text-white mb-2">Blockchain Escrow</h3>
                          <div className="space-y-1 text-md text-gray-300 mb-3">
                            <p>• Smart contract security</p>
                            <p>• Automatic payments</p>
                            <p>• Dispute resolution</p>
                            <p>• Zero platform fees</p>
                          </div>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2 accent-blue-500" required />
                            <span className="text-md text-gray-300">I agree to the terms and conditions</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Buttons - Fixed at bottom */}
              <div className="flex justify-between items-center py-3 border-t border-slate-700 mt-3 ">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm font-medium bg-red-600 rounded-lg"
                  >
                    Back
                  </button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (currentStep === 2 && formData.skills_requirement.length === 0) {
                          alert("Please add at least one required skill")
                          return
                        }
                        setCurrentStep(currentStep + 1)
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      Submit Proposal
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
