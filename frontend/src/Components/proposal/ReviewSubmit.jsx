"use client";

import { useState } from "react";

export default function ReviewSubmit({
  formData,
  updateFormData,
  prevStep,
  handleSubmit,
  success,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //   const handleSubmit = async () => {
  //     setIsSubmitting(true)

  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 2000))

  //     console.log("Proposal Data:", formData)
  //     setIsSubmitting(false)
  //     setIsSubmitted(true)
  //   }

  const handleEditableToggle = () => {
    updateFormData({ isEditable: !formData.isEditable });
  };

  if (success) {
    return (
      <div className="md:p-8 p-4 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto md:mb-4 mb-2 shadow-lg shadow-cyan-500/25">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Proposal Submitted!
          </h2>
          <p className="text-gray-300 text-lg">
            Your Web3 project proposal has been successfully created.
          </p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-cyan-400 mb-2">What's Next?</h3>
          <ul className="text-gray-300 space-y-1">
            <li>• Web3 developers will start bidding on your project</li>
            <li>• You'll receive notifications for new bids</li>
            <li>• Review proposals and select the best candidate</li>
            <li>• Start collaborating with your chosen developer</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
        >
          Create Another Proposal
        </button>
      </div>
    );
  }

  return (
    <div className="md:p-8 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Review & Submit
        </h2>
        <p className="text-gray-300">
          Review your proposal details before submitting
        </p>
      </div>

      <div className="md:space-y-6 space-y-4">
        {/* Basic Info */}
        <div className="bg-slate-700/30 border border-gray-600 rounded-xl md:p-6 p-4">
          <h3 className="font-semibold text-cyan-400 md:mb-4 mb-2 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
              1
            </span>
            Basic Information
          </h3>
          <div className="flex flex-wrap items-center md:gap-4 gap-4  text-sm">
            <div>
              <span className="font-medium text-gray-400">Title:</span>
              <p className="text-gray-200">{formData.title}</p>
            </div>

            {formData.image && (
              <div className="md:w-[40%] w-full">
                <span className="font-medium text-gray-400">
                  Project Image:
                </span>
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Project"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border border-gray-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-slate-700/30 border border-gray-600 rounded-xl md:p-6 p-4">
          <h3 className="font-semibold text-cyan-400 md:mb-4 mb-2 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
              2
            </span>
            Project Details
          </h3>
          <div className="text-sm">
            <span className="font-medium text-gray-400">Description:</span>
            <p className="text-gray-200 mt-1 break-all">
              {formData.description}
            </p>
          </div>
        </div>

        {/* Budget & Timeline */}
        <div className="bg-slate-700/30 border border-gray-600 rounded-xl md:p-6 p-4">
          <h3 className="font-semibold text-cyan-400 md:mb-4 mb-2 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
              3
            </span>
            Budget & Timeline
          </h3>
          <div className="flex flex-wrap  gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-400">Budget:</span>
              <p className="text-gray-200">${formData.budget}</p>
            </div>
            <div>
              <span className="font-medium text-gray-400">Timeline:</span>
              <p className="text-gray-200">
                {formData.project_duration.replace(/_/g, " ")}
              </p>
            </div>
          </div>
        </div>

        {/* Skills & Tags */}
        <div className="bg-slate-700/30 border border-gray-600 rounded-xl md:p-6 p-4">
          <h3 className="font-semibold text-cyan-400 md:mb-4 mb-2 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
              4
            </span>
            Skills & Tags
          </h3>
          <div className="md:space-y-4 space-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-400">
                Required Skills:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills_requirement.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {formData.tags.length > 0 && (
              <div>
                <span className="font-medium text-gray-400">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-slate-700/30 border border-gray-600 rounded-xl md:p-6 p-4">
          <h3 className="font-semibold text-cyan-400 md:mb-4 mb-2">
            Project Settings
          </h3>
          <div className="flex items-start justify-between">
            <div className="md:w-full w-[80%]">
              <span className="font-medium text-gray-200">
                Allow editing after submission
              </span>
              <p className="text-sm text-gray-400">
                You can modify this proposal later if needed
              </p>
            </div>
            <button
              type="button"
              onClick={handleEditableToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                formData.isEditable ? "bg-cyan-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  formData.isEditable ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={prevStep}
          className="md:px-8 px-2 md:py-3 py-2  bg-slate-700 text-gray-300 font-semibold rounded-xl hover:bg-slate-600 transform hover:scale-105 transition-all duration-200"
        >
          ← Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`md:px-8 px-2 py-3 font-semibold rounded-xl transform transition-all duration-200 shadow-lg hover:shadow-xl ${
            isSubmitting
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 hover:scale-105 shadow-green-500/25 hover:shadow-green-500/40"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Proposal 🚀"
          )}
        </button>
      </div>
    </div>
  );
}
