"use client"

import { useState } from "react"

export default function BasicInfo({ formData, updateFormData, nextStep, currentStep }) {
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required"
    }

    if (!formData.user_wallet_address.trim()) {
      newErrors.user_wallet_address = "Wallet address is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  return (
    <div className="md:p-8 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Basic Information
        </h2>
        <p className="text-gray-300 font-normal text-sm">Let's start with the basics of your Web3 project</p>
      </div>

      <div className="md:space-y-6 space-y-4">
        {/* Project Title */}
        <div className="group">
          <label className="block text-sm font-semibold text-cyan-400 mb-2">Project Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter your project title..."
            className={`w-full md:px-4 md:py-3 px-2 py-2 text-xs md:text-sm bg-slate-700/50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 text-white placeholder-gray-400 ${
              errors.title
                ? "border-red-400 focus:border-red-400"
                : "border-gray-600 focus:border-cyan-400 group-hover:border-gray-500"
            }`}
          />
          {errors.title && <p className="mt-1 text-xs md:text-sm text-red-400 animate-pulse">{errors.title}</p>}
        </div>

        {/* Wallet Address */}
        <div className="group">
          <label className="block text-sm font-semibold text-cyan-400 mb-2">Wallet Address *</label>
          <input
            type="text"
            value={formData.user_wallet_address}
            onChange={(e) => handleInputChange("user_wallet_address", e.target.value)}
            placeholder="0x..."
            className={`w-full md:px-4 md:py-3 px-2 py-2 text-xs md:text-sm bg-slate-700/50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 font-mono text-sm text-white placeholder-gray-400 ${
              errors.user_wallet_address
                ? "border-red-400 focus:border-red-400"
                : "border-gray-600 focus:border-cyan-400 group-hover:border-gray-500"
            }`}
          />
          {errors.user_wallet_address && (
            <p className="mt-1 text-xs md:text-sm text-red-400 animate-pulse">{errors.user_wallet_address}</p>
          )}
        </div>

        {/* Project Image URL */}
        <div className="group">
          <label className="block text-sm font-semibold text-cyan-400 mb-2">Project Image URL (Optional)</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full md:px-4 md:py-3 px-2 py-2 text-xs md:text-sm bg-slate-700/50 border-2 border-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 focus:border-cyan-400 group-hover:border-gray-500 text-white placeholder-gray-400"
          />
          {formData.image && (
            <div className="mt-3 p-3 bg-slate-700/30 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-300 mb-2">Preview:</p>
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Project preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-600"
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-4 md:mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={validateAndNext}
          className="md:px-8 md:py-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white  rounded-xl hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
        >
          Next Step →
        </button>
      </div>
    </div>
  )
}
