"use client"

import { useState } from "react"

const popularSkills = [
  "Solidity",
  "Web3.js",
  "Smart Contracts",
  "DeFi",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "Vue.js",
  "Angular",
  "Blockchain",
  "MetaMask Integration",
  "Wallet Connect",
  "Web3 Security",
]

const popularTags = [
  "DeFi",
  "NFT Marketplace",
  "GameFi",
  "Metaverse",
  "Smart Contract Audit",
  "Token Creation",
  "Staking Platform",
  "DEX",
  "Yield Farming",

]

export default function SkillsTags({ formData, updateFormData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({})
  const [customSkill, setCustomSkill] = useState("")
  const [customTag, setCustomTag] = useState("")

  const addSkill = (skill) => {
    if (!formData.skills_requirement.includes(skill)) {
      updateFormData({
        skills_requirement: [...formData.skills_requirement, skill],
      })
    }
    if (errors.skills_requirement) {
      setErrors((prev) => ({ ...prev, skills_requirement: "" }))
    }
  }

  const removeSkill = (skill) => {
    updateFormData({
      skills_requirement: formData.skills_requirement.filter((s) => s !== skill),
    })
  }

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      updateFormData({
        tags: [...formData.tags, tag],
      })
    }
  }

  const removeTag = (tag) => {
    updateFormData({
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !formData.skills_requirement.includes(customSkill.trim())) {
      addSkill(customSkill.trim())
      setCustomSkill("")
    }
  }

  const addCustomTag = () => {
    if (customTag.trim() && !formData.tags.includes(customTag.trim())) {
      addTag(customTag.trim())
      setCustomTag("")
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (formData.skills_requirement.length === 0) {
      newErrors.skills_requirement = "At least one skill is required"
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
          Skills & Tags
        </h2>
        <p className="text-gray-300">Select required Web3 skills and add relevant tags</p>
      </div>

      <div className="space-y-8">
        {/* Required Skills */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-4">
            Required Skills * ({formData.skills_requirement.length} selected)
          </label>

          {/* Selected Skills */}
          {formData.skills_requirement.length > 0 && (
            <div className="mb-4 md:p-4 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <h4 className="text-sm font-medium text-cyan-400 mb-2">Selected Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {formData.skills_requirement.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center md:px-3 px-2 md:py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:bg-cyan-600 rounded-full p-1 transition-colors duration-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Popular Skills */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Popular Web3 Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  disabled={formData.skills_requirement.includes(skill)}
                  className={`md:px-3 px-2 py-2 text-sm rounded-lg border transition-all duration-200 ${
                    formData.skills_requirement.includes(skill)
                      ? "bg-slate-700 text-gray-500 border-gray-600 cursor-not-allowed"
                      : "bg-slate-700/50 text-gray-300 border-gray-600 hover:border-cyan-400 hover:text-cyan-400 hover:scale-105"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Skill Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              placeholder="Add custom skill..."
              className="flex-1 px-4 py-2 text-xs bg-slate-700/50 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-cyan-400 transition-colors duration-200 text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
            />
            <button
              type="button"
              onClick={addCustomSkill}
              className="px-4 py-2 text-xs md:text-sm bg-cyan-500 text-white rounded-xl hover:bg-cyan-400 transition-colors duration-200"
            >
              Add
            </button>
          </div>

          {errors.skills_requirement && (
            <p className="mt-2 text-xs md:text-sm text-red-400 animate-pulse">{errors.skills_requirement}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-4">
            Project Tags (Optional) ({formData.tags.length} selected)
          </label>

          {/* Selected Tags */}
          {formData.tags.length > 0 && (
            <div className="mb-4 md:p-4 p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="text-sm font-medium text-purple-400 mb-2">Selected Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center md:px-3 px-2 md:py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:bg-purple-600 rounded-full p-1 transition-colors duration-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Popular Web3 Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  disabled={formData.tags.includes(tag)}
                  className={`md:px-3 px-2 py-2 text-sm rounded-lg border transition-all duration-200 ${
                    formData.tags.includes(tag)
                      ? "bg-slate-700 text-gray-500 border-gray-600 cursor-not-allowed"
                      : "bg-slate-700/50 text-gray-300 border-gray-600 hover:border-purple-400 hover:text-purple-400 hover:scale-105"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Tag Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Add custom tag..."
              className="flex-1 md:px-4 px-2 py-2  text-xs bg-slate-700/50 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-400 transition-colors duration-200 text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === "Enter" && addCustomTag()}
            />
            <button
              type="button"
              onClick={addCustomTag}
              className="px-4 py-2 text-xs md:text-sm bg-purple-500 text-white rounded-xl hover:bg-purple-400 transition-colors duration-200"
            >
              Add
            </button>
          </div>
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
