"use client"

import { useState } from "react"

const budgetRanges = [
  { label: "Under $500", value: "500" },
  { label: "$500 - $1,000", value: "1000" },
  { label: "$1,000 - $5,000", value: "5000" },
  { label: "$5,000 - $10,000", value: "10000" },
  
]

const timelineOptions = [
  { label: "Less than 1 week", value: "less_than_1_week" },
  { label: "1-2 weeks", value: "1_2_weeks" },
  { label: "1 month", value: "1_month" },
  { label: "2-3 months", value: "2_3_months" },
  { label: "3-6 months", value: "3_6_months" },
  { label: "6+ months", value: "6_plus_months" },
]

export default function BudgetTimeline({ formData, updateFormData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({})
  const [budgetType, setBudgetType] = useState(formData.budget ? "custom" : "range")

  const handleBudgetChange = (type, value) => {
    setBudgetType(type)
    updateFormData({ budget: value })
    if (errors.budget) {
      setErrors((prev) => ({ ...prev, budget: "" }))
    }
  }

  const handleTimelineChange = (value) => {
    updateFormData({ project_duration: value })
    if (errors.project_duration) {
      setErrors((prev) => ({ ...prev, project_duration: "" }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!formData.budget) {
      newErrors.budget = "Budget is required"
    }

    if (!formData.project_duration) {
      newErrors.project_duration = "Project timeline is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Budget & Timeline
        </h2>
        <p className="text-gray-300 font-normal text-sm">Set your budget and expected timeline</p>
      </div>

      <div className="md:space-y-8 space-y-4">
        {/* Budget Section */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-4">Project Budget *</label>

          {/* Budget Type Toggle */}
          <div className="flex bg-slate-700 rounded-xl p-1 mb-4 w-fit">
            <button
              type="button"
              onClick={() => setBudgetType("range")}
              className={`md:px-4 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                budgetType === "range" ? "bg-cyan-500 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Budget Range
            </button>
            <button
              type="button"
              onClick={() => setBudgetType("custom")}
              className={`md:px-4 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                budgetType === "custom" ? "bg-cyan-500 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Custom Amount
            </button>
          </div>

          {budgetType === "range" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range.value}
                  type="button"
                  onClick={() => handleBudgetChange("range", range.value)}
                  className={`md:p-4 p-2 border-2 rounded-xl text-left transition-all duration-200 hover:scale-105 ${
                    formData.budget === range.value
                      ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                      : "border-gray-600 bg-slate-700/30 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  <div className="font-semibold">{range.label}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">$</span>
              <input
                type="number"
                value={budgetType === "custom" ? formData.budget : ""}
                onChange={(e) => handleBudgetChange("custom", e.target.value)}
                placeholder="Enter custom amount"
                className="w-full pl-8 pr-4 py-3 text-sm bg-slate-700/50 border-2 border-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 focus:border-cyan-400 text-white placeholder-gray-400"
              />
            </div>
          )}

          {errors.budget && <p className="mt-2 text-xs md:text-sm text-red-400 animate-pulse">{errors.budget}</p>}
        </div>

        {/* Timeline Section */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-4">Expected Timeline *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timelineOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleTimelineChange(option.value)}
                className={`md:p-4 p-2 border-2 rounded-xl text-left transition-all duration-200 hover:scale-105 ${
                  formData.project_duration === option.value
                    ? "border-purple-400 bg-purple-500/10 text-purple-400"
                    : "border-gray-600 bg-slate-700/30 text-gray-300 hover:border-gray-500"
                }`}
              >
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>
          {errors.project_duration && (
            <p className="mt-2 text-sm text-red-400 animate-pulse">{errors.project_duration}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={prevStep}
          className="md:px-8 px-4 md:py-3 py-2 bg-slate-700 text-gray-300 font-semibold rounded-xl hover:bg-slate-600 transform hover:scale-105 transition-all duration-200"
        >
          ← Previous
        </button>
        <button
          onClick={validateAndNext}
          className="md:px-8 px-4 md:py-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
        >
          Next Step →
        </button>
      </div>
    </div>
  )
}
