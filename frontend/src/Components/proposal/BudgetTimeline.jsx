"use client";

import { useState } from "react";

const budgetRanges = [
  { label: "Under $500", value: "500" },
  { label: "$500 - $1,000", value: "1000" },
  { label: "$1,000 - $5,000", value: "5000" },
  { label: "$5,000 - $10,000", value: "10000" },
];

const timelineOptions = [
  { label: "Less than 1 week", value: "less_than_1_week" },
  { label: "1-2 weeks", value: "1_2_weeks" },
  { label: "1 month", value: "1_month" },
  { label: "2-3 months", value: "2_3_months" },
  { label: "3-6 months", value: "3_6_months" },
  { label: "6+ months", value: "6_plus_months" },
];

export default function BudgetTimeline({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  isSubmitting,
}) {
  const [errors, setErrors] = useState({});
  const [budgetType, setBudgetType] = useState(
    formData.budget ? "custom" : "range"
  );

  const handleBudgetChange = (type, value) => {
    setBudgetType(type);
    updateFormData({ budget: value });
    if (errors.budget) {
      setErrors((prev) => ({ ...prev, budget: "" }));
    }
  };

  const handleTimelineChange = (value) => {
    updateFormData({ project_duration: value });
    if (errors.project_duration) {
      setErrors((prev) => ({ ...prev, project_duration: "" }));
    }
  };

  const validateAndNext = () => {
    const newErrors = {};

    if (!formData.budget) {
      newErrors.budget = "Budget is required";
    }

    if (!formData.project_duration) {
      newErrors.project_duration = "Project timeline is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    nextStep();
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Budget & Timeline
        </h2>
        <p className="text-gray-300 font-normal text-sm">
          Set your budget and expected timeline
        </p>
      </div>

      <div className="md:space-y-8 space-y-4">
        {/* Budget Section */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-4">
            Project Budget *
          </label>

          {/* Budget Type Toggle */}
          <div className="flex bg-slate-700 rounded-xl p-1 mb-4 w-fit">
            <button
              type="button"
              onClick={() => setBudgetType("range")}
              disabled={isSubmitting}
              className={`md:px-4 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                budgetType === "range"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Budget Range
            </button>
            <button
              type="button"
              onClick={() => setBudgetType("custom")}
              disabled={isSubmitting}
              className={`md:px-4 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                budgetType === "custom"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200"
              } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Custom Amount
            </button>
          </div>

          {budgetType === "range" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleBudgetChange("range", range.value)}
                  disabled={isSubmitting}
                  className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                    formData.budget === range.value
                      ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                      : "border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="font-medium">{range.label}</div>
                  <div className="text-sm text-gray-400">Budget range</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => handleBudgetChange("custom", e.target.value)}
                placeholder="Enter your budget amount"
                min="1"
                step="0.01"
                disabled={isSubmitting}
                className={`w-full md:px-4 md:py-3 px-2 py-2 text-sm bg-slate-700/50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 text-white placeholder-gray-400 ${
                  errors.budget
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-600 focus:border-cyan-400"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <p className="text-xs text-gray-400">Enter amount in USD</p>
            </div>
          )}
          {errors.budget && (
            <p className="mt-2 text-sm text-red-400 animate-pulse">
              {errors.budget}
            </p>
          )}
        </div>

        {/* Timeline Section */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-4">
            Project Timeline *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timelineOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTimelineChange(option.value)}
                disabled={isSubmitting}
                className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                  formData.project_duration === option.value
                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                    : "border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-400">Timeline</div>
              </button>
            ))}
          </div>
          {errors.project_duration && (
            <p className="mt-2 text-sm text-red-400 animate-pulse">
              {errors.project_duration}
            </p>
          )}
        </div>

        {/* Budget Tips */}
        <div className="bg-slate-700/30 border border-cyan-500/20 rounded-xl md:p-4 p-2">
          <h3 className="font-semibold text-cyan-400 mb-2">💰 Budget Tips</h3>
          <ul className="text-xs md:text-sm text-gray-300 space-y-1">
            <li>• Consider the complexity and scope of your project</li>
            <li>• Research market rates for similar Web3 projects</li>
            <li>• Factor in revisions and ongoing support if needed</li>
            <li>• Be realistic about your budget expectations</li>
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={prevStep}
          disabled={isSubmitting}
          className={`md:px-8 md:py-3 px-4 py-2 bg-slate-700 text-gray-300 rounded-xl transform transition-all duration-200 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-600 hover:scale-105"
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={validateAndNext}
          disabled={isSubmitting}
          className={`md:px-8 md:py-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl transform transition-all duration-200 shadow-lg shadow-cyan-500/25 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-cyan-400 hover:to-blue-400 hover:scale-105 hover:shadow-cyan-500/40"
          }`}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
