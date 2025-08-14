"use client"

import { useState } from "react"
import { User, Shield, Zap, Edit, Save, X } from "lucide-react"
import { toast } from "react-hot-toast"

function HeroSection({ personalInfo, setPersonalInfo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ ...personalInfo })
  const portfolioId = "689d21754780b3f30cf4130b" // Ensure backend knows which portfolio to update

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({ ...personalInfo })
  }

  const validateLimits = () => {
    const expertise = editData.expertise || []
    const focusAreas = editData.focusAreas || []

    if ((editData.name || "").length > 100) {
      toast.error("Name cannot exceed 100 characters")
      return false
    }

    if (editData.domains && editData.domains.some((domain) => domain.length > 50)) {
      toast.error("Each domain cannot exceed 50 characters")
      return false
    }

    if ((editData.thoughtLine || "").length > 200) {
      toast.error("Thought line cannot exceed 200 characters")
      return false
    }

    if ((editData.aboutMe || "").length > 300) {
      toast.error("About me cannot exceed 300 characters")
      return false
    }

    if (expertise.length > 4) {
      toast.error("Expertise can have maximum 4 items")
      return false
    }

    if (expertise.some((item) => item.length > 40)) {
      toast.error("Each expertise item cannot exceed 40 characters")
      return false
    }

    if (focusAreas.length > 4) {
      toast.error("Focus areas can have maximum 4 items")
      return false
    }

    if (focusAreas.some((item) => item.length > 40)) {
      toast.error("Each focus area item cannot exceed 40 characters")
      return false
    }

    return true
  }

  const handleSave = async () => {
    if (!validateLimits()) {
      return
    }

    try {
      // Update frontend state
      setPersonalInfo((prev) => ({
        ...prev,
        heroSection: { ...prev.heroSection, ...editData },
      }))

      // Update backend
      const response = await fetch(`http://localhost:3001/api/portfolio/${portfolioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroSection: editData }),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update")
      }

      setIsEditing(false)
      toast.success("Hero section updated successfully!")
      console.log("Updated hero section:", result.data.heroSection)
    } catch (err) {
      console.error("Error updating hero section:", err.message)
      toast.error("Failed to save changes: " + err.message)
    }
  }

  const handleCancel = () => {
    setEditData({ ...personalInfo })
    setIsEditing(false)
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden mb-6">
      {/* Hero Content */}
      <div className="mb-8">
        <div className="mb-4">
          {isEditing ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">Name:</label>
                <span className={`text-xs ${(editData.name || "").length > 100 ? "text-red-400" : "text-gray-500"}`}>
                  {(editData.name || "").length}/100
                </span>
              </div>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-white text-4xl sm:text-5xl lg:text-6xl font-bold focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent ${
                  (editData.name || "").length > 100
                    ? "border-red-500/50 focus:border-red-400"
                    : "border-cyan-500/50 focus:border-cyan-400"
                }`}
              />
            </div>
          ) : (
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
          )}
        </div>

        <div className="mb-6">
          {isEditing ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">Domains (comma separated):</label>
                <span
                  className={`text-xs ${
                    editData.domains && editData.domains.some((d) => d.length > 50) ? "text-red-400" : "text-gray-500"
                  }`}
                >
                  Max 50 chars each
                </span>
              </div>
              <input
                type="text"
                value={editData.domains?.join(", ") || ""}
                onChange={(e) =>
                  handleChange(
                    "domains",
                    e.target.value.split(",").map((d) => d.trim()),
                  )
                }
                className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-gray-300 text-xl sm:text-1xl focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] ${
                  editData.domains && editData.domains.some((d) => d.length > 50)
                    ? "border-red-500/50 focus:border-red-400"
                    : "border-cyan-500/50 focus:border-cyan-400"
                }`}
              />
            </div>
          ) : (
            <p className="text-xl sm:text-1xl text-gray-300">{personalInfo.domains?.join(" | ")}</p>
          )}
        </div>

        <div>
          {isEditing ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">Thought Line:</label>
                <span
                  className={`text-xs ${(editData.thoughtLine || "").length > 200 ? "text-red-400" : "text-gray-500"}`}
                >
                  {(editData.thoughtLine || "").length}/200
                </span>
              </div>
              <input
                type="text"
                value={editData.thoughtLine || ""}
                onChange={(e) => handleChange("thoughtLine", e.target.value)}
                className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-cyan-300 text-lg font-medium focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] ${
                  (editData.thoughtLine || "").length > 200
                    ? "border-red-500/50 focus:border-red-400"
                    : "border-cyan-500/50 focus:border-cyan-400"
                }`}
              />
            </div>
          ) : (
            <p className="text-lg text-cyan-300 font-medium">{personalInfo.thoughtLine}</p>
          )}
        </div>
      </div>

      {/* About Me Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
          <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
            <User className="w-6 h-6 text-cyan-400" />
          </div>
          About Me
        </h2>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] group w-full sm:w-auto justify-center"
          >
            <Edit className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">Edit</span>
          </button>
        ) : (
          <div className="flex w-full sm:w-auto gap-2">
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
            >
              <Save className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
            >
              <X className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        {isEditing ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-400">About Me:</label>
              <span className={`text-xs ${(editData.aboutMe || "").length > 300 ? "text-red-400" : "text-gray-500"}`}>
                {(editData.aboutMe || "").length}/300
              </span>
            </div>
            <textarea
              value={editData.aboutMe || ""}
              onChange={(e) => handleChange("aboutMe", e.target.value)}
              className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] resize-none ${
                (editData.aboutMe || "").length > 300
                  ? "border-red-500/50 focus:border-red-400"
                  : "border-cyan-500/50 focus:border-cyan-400"
              }`}
              rows="4"
            />
          </div>
        ) : (
          <p className="text-[14px]">{personalInfo.aboutMe}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-4 sm:p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Expertise
              {isEditing && (
                <span
                  className={`ml-2 text-xs px-2 py-1 rounded ${
                    (editData.expertise?.length || 0) > 4 || (editData.expertise || []).some((item) => item.length > 40)
                      ? "bg-red-500/20 text-red-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {editData.expertise?.length || 0}/4
                </span>
              )}
            </h3>
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Expertise (one per line, max 4 items, 40 chars each):</label>
                <textarea
                  value={editData.expertise?.join("\n") || ""}
                  onChange={(e) => {
                    const items = e.target.value.split("\n").filter((item) => item.trim())
                    handleChange("expertise", items)
                  }}
                  className={`w-full bg-gray-900/50 border rounded-lg px-3 py-2 text-gray-300 text-[13px] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] resize-none ${
                    (editData.expertise?.length || 0) > 4 || (editData.expertise || []).some((item) => item.length > 40)
                      ? "border-red-500/50 focus:border-red-400"
                      : "border-cyan-500/50 focus:border-cyan-400"
                  }`}
                  rows="4"
                />
              </div>
            ) : (
              <ul className="space-y-2 text-[13px]">
                {personalInfo.expertise?.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full`}
                      style={{ backgroundColor: ["#00FFFF", "#3B82F6", "#8B5CF6", "#22C55E"][index % 4] }}
                    ></div>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-4 sm:p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Focus Areas
              {isEditing && (
                <span
                  className={`ml-2 text-xs px-2 py-1 rounded ${
                    (editData.focusAreas?.length || 0) > 4 ||
                    (editData.focusAreas || []).some((item) => item.length > 40)
                      ? "bg-red-500/20 text-red-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {editData.focusAreas?.length || 0}/4
                </span>
              )}
            </h3>
            {isEditing ? (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Focus Areas (one per line, max 4 items, 40 chars each):</label>
                <textarea
                  value={editData.focusAreas?.join("\n") || ""}
                  onChange={(e) => {
                    const items = e.target.value.split("\n").filter((item) => item.trim())
                    handleChange("focusAreas", items)
                  }}
                  className={`w-full bg-gray-900/50 border rounded-lg px-3 py-2 text-gray-300 text-[13px] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] resize-none ${
                    (editData.focusAreas?.length || 0) > 4 ||
                    (editData.focusAreas || []).some((item) => item.length > 40)
                      ? "border-red-500/50 focus:border-red-400"
                      : "border-cyan-500/50 focus:border-cyan-400"
                  }`}
                  rows="4"
                />
              </div>
            ) : (
              <ul className="space-y-2 text-[13px]">
                {personalInfo.focusAreas?.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full`}
                      style={{ backgroundColor: ["#8B5CF6", "#F472B6", "#00FFFF", "#3B82F6"][index % 4] }}
                    ></div>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
