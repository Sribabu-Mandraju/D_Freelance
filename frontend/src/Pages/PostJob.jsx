"use client"
import { useState } from "react"
import { Plus, X, DollarSign, MapPin, Image, CheckCircle } from 'lucide-react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function PostCryptoProject() {
  const [formData, setFormData] = useState({
    projectName: "",
    fundsRequested: "",
    description: "",
    location: "",
    country: "",
    state: "",
    city: "",
    images: [],
  })

  const [currentStep, setCurrentStep] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Crypto project proposal submitted:", formData)
    // Handle form submission logic here
  }

  const stepTitles = ["Basic Info", "Location", "Image", "Review"]
  const stepIcons = [CheckCircle, MapPin, Image, CheckCircle]

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Post Your Crypto Project
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Submit a detailed proposal for your blockchain project. Complete all steps to find the perfect crypto freelancer.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => {
                const Icon = stepIcons[step - 1]
                return (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                          currentStep >= step
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-slate-700 text-gray-400"
                        }`}
                      >
                        {step}
                      </div>
                      <span className={`text-sm mt-2 ${
                        currentStep >= step ? "text-blue-400 font-semibold" : "text-gray-500"
                      }`}>
                        {stepTitles[step - 1]}
                      </span>
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-16 h-1 mx-4 ${
                          currentStep > step ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-slate-700"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      placeholder="e.g., DeFi Trading Dashboard"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Budget (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formData.fundsRequested}
                        onChange={(e) => setFormData({ ...formData, fundsRequested: e.target.value })}
                        placeholder="e.g., 5000"
                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Project Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your blockchain project requirements, features, and technical specifications..."
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Location Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Preferred Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Enter preferred country for freelancers"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Enter state or province (optional)"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Enter city (optional)"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Additional Location Requirements
                    </label>
                    <textarea
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Specify timezone preferences, language requirements, or other location-based needs..."
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Images */}
            {currentStep === 3 && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-2">
                  <Image className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-bold text-white">Project Images</h2>
                </div>
                <p className="text-gray-400 mb-8">Upload compelling images for your crypto project</p>
                
                <div className="space-y-8">
                  {/* Upload Area */}
                  <div 
                    className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-lg text-gray-300 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500 mb-4">PNG, JPG, GIF (max. 5MB)</p>
                      <p className="text-sm text-gray-400 max-w-md">
                        Choose images that showcase your project concept, wireframes, or reference designs
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files)
                        setFormData({ ...formData, images: files })
                      }}
                    />
                  </div>

                  {/* Selected Images Display */}
                  {formData.images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">
                        Selected Images ({formData.images.length})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
                              <img
                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                alt={`Selected project image ${index + 1} - ${file.name}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/placeholder.svg?height=200&width=200&text=Image+Preview";
                                }}
                              />
                            </div>
                            <p className="text-sm text-gray-300 mt-1 truncate">
                              {file.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = formData.images.filter((_, i) => i !== index)
                                setFormData({ ...formData, images: newImages })
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips Section */}
                  <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Tips for effective project images:</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Include wireframes, mockups, or design concepts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Show examples of similar projects or inspiration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Upload technical diagrams or architecture plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>Ensure all images are relevant to your project scope</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Review & Submit</h2>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Ready to submit</span>
                  </div>
                </div>

                {/* Review Card */}
                <div className="bg-green-50/10 border border-green-500/20 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-400">Project Name</span>
                      </div>
                      <p className="text-white font-semibold text-lg">{formData.projectName}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-400">Budget Requested</span>
                      </div>
                      <p className="text-white font-semibold text-lg">${formData.fundsRequested}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-400">Description</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{formData.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-400">Location</span>
                    </div>
                    <div className="text-gray-300">
                      <p>{formData.city && `${formData.city}, `}{formData.state && `${formData.state}, `}{formData.country}</p>
                      {formData.location && (
                        <p className="text-sm text-gray-400 mt-1">{formData.location}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Campaign Images */}
                {formData.images.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Image className="w-5 h-5 text-white" />
                      <h3 className="text-lg font-semibold text-white">Project Images</h3>
                    </div>
                    <div className="space-y-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="w-full">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Project image ${index + 1} - ${file.name}`}
                            className="w-full h-64 object-cover rounded-lg border border-slate-600"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=256&width=400&text=Image+Preview";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning Message */}
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-sm text-yellow-200">
                      Please review all information carefully before submitting. Once submitted, you may need to contact support to make changes.
                    </p>
                  </div>
                </div>

                {/* Blockchain Escrow Info */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Blockchain Escrow Protection</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Your funds are secured in a smart contract escrow system</p>
                    <p>• Payments are released automatically upon milestone completion</p>
                    <p>• Decentralized dispute resolution protects both parties</p>
                    <p>• Zero platform fees - only blockchain gas costs apply</p>
                  </div>
                  <label className="flex items-center mt-4">
                    <input type="checkbox" className="mr-2 accent-blue-500" required />
                    <span className="text-sm text-gray-300">I agree to the terms and conditions</span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
                >
                  Back
                </button>
              )}
              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Submit Proposal
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
