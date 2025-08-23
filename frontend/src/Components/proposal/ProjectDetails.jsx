"use client";

import { useState } from "react";

export default function ProjectDetails({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  isSubmitting,
}) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateAndNext = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Description should be at least 50 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    nextStep();
  };

  return (
    <div className="md:p-8 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Project Details
        </h2>
        <p className="text-gray-300 font-normal text-sm">
          Describe your Web3 project in detail
        </p>
      </div>

      <div className="md:space-y-6 space-y-4">
        {/* Project Description */}
        <div className="group">
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Project Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your project, requirements, goals, and any specific details..."
            rows={8}
            disabled={isSubmitting}
            className={`w-full md:px-4 md:py-3 px-2 py-2 text-xs md:text-sm bg-slate-700/50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 resize-none text-white placeholder-gray-400 ${
              errors.description
                ? "border-red-400 focus:border-red-400"
                : "border-gray-600 focus:border-cyan-400 group-hover:border-gray-500"
            } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.description ? (
              <p className="text-xs md:text-sm text-red-400 animate-pulse">
                {errors.description}
              </p>
            ) : (
              <p className="text-xs md:text-sm text-gray-400">
                {formData.description.length} characters (minimum 50)
              </p>
            )}
            <div
              className={`text-xs md:text-sm font-medium ${
                formData.description.length >= 50
                  ? "text-cyan-400"
                  : "text-gray-500"
              }`}
            >
              {formData.description.length >= 50 ? "✓" : "○"} Minimum length
            </div>
          </div>
        </div>

        {/* Writing Tips */}
        <div className="bg-slate-700/30 border border-cyan-500/20 rounded-xl md:p-4 p-2">
          <h3 className="font-semibold text-cyan-400 mb-2">💡 Writing Tips</h3>
          <ul className=" text-xs md:text-sm text-gray-300 space-y-1">
            <li>• Be specific about what you want to achieve</li>
            <li>• Mention any technical requirements or preferences</li>
            <li>• Include examples or references if helpful</li>
            <li>• Describe your target audience or use case</li>
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
