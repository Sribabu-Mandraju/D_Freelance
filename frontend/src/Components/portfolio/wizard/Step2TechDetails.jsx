import React from "react";
import { Code, Star, Plus, X } from "lucide-react";

const Step2TechDetails = ({ 
  portfolioData, 
  onUpdateArrayItem, 
  onAddArrayItem, 
  onRemoveArrayItem,
  onUpdateCurrentStatus,
  onUpdateTechHighlight
}) => {
  const colorOptions = ["purple", "blue", "cyan", "green","red","violet", "pink"];

  const renderStars = (rating, onChange) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`transition-colors duration-200 ${
              star <= rating ? "text-purple-400" : "text-gray-600"
            }`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Current Status Section */}
      <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-6 rounded-xl border border-blue-500/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg mr-3 border border-blue-500/30">
            <Code className="w-5 h-5 text-blue-400" />
          </div>
          Current Status (Max 3)
        </h3>

        <div className="space-y-4">
          {portfolioData.currentStatus.map((status, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-900/30 rounded-lg border border-blue-500/20"
            >
              <div>
                <label className="block text-blue-300 text-sm font-medium mb-2">
                  Status
                </label>
                <input
                  type="text"
                  value={status.status || ""}
                  onChange={(e) =>
                    onUpdateCurrentStatus(index, "status", e.target.value)
                  }
                  className="w-full bg-gray-900/50 border border-blue-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-blue-400 focus:outline-none focus:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-blue-300 text-sm font-medium mb-2">
                  Color
                </label>
                <select
                  value={status.color || "purple"}
                  onChange={(e) =>
                    onUpdateCurrentStatus(index, "color", e.target.value)
                  }
                  className="w-full bg-gray-900/50 border border-blue-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-blue-400 focus:outline-none focus:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300"
                >
                  {colorOptions.map((color) => (
                    <option
                      key={color}
                      value={color}
                      className="bg-gray-900"
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-blue-300 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={status.isActive || false}
                    onChange={(e) =>
                      onUpdateCurrentStatus(index, "isActive", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-400 bg-gray-900 border-blue-500 rounded focus:ring-blue-400 focus:ring-2"
                  />
                  Active
                </label>
              </div>

              <div className="flex items-end">
                {portfolioData.currentStatus.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      onRemoveArrayItem("portfolioData", "currentStatus", index)
                    }
                    className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:border-red-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {portfolioData.currentStatus.length < 3 && (
            <button
              type="button"
              onClick={() =>
                onAddArrayItem("portfolioData", "currentStatus", {
                  status: "",
                  color: "purple",
                  isActive: true,
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg hover:border-blue-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Add Status</span>
            </button>
          )}
        </div>
      </div>

      {/* Tech Highlights Section */}
      <div className="bg-gradient-to-br from-violet-500/5 to-cyan-500/5 p-6 rounded-xl border border-violet-500/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className="p-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-lg mr-3 border border-violet-500/30">
            <Star className="w-5 h-5 text-violet-400" />
          </div>
          Tech Highlights (Max 4)
        </h3>

        <div className="space-y-4">
          {portfolioData.techHighlights.map((tech, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-900/30 rounded-lg border border-violet-500/20"
            >
              <div>
                <label className="block text-violet-300 text-sm font-medium mb-2">
                  Technology
                </label>
                <input
                  type="text"
                  value={tech.technology || ""}
                  onChange={(e) =>
                    onUpdateTechHighlight(index, "technology", e.target.value)
                  }
                  className="w-full bg-gray-900/50 border border-violet-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-violet-400 focus:outline-none focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-violet-300 text-sm font-medium mb-2">
                  Rating
                </label>
                <div className="pt-1">
                  {renderStars(tech.rating, (rating) =>
                    onUpdateTechHighlight(index, "rating", rating)
                  )}
                </div>
              </div>

              <div>
                <label className="block text-violet-300 text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={tech.description || ""}
                  onChange={(e) =>
                    onUpdateTechHighlight(index, "description", e.target.value)
                  }
                  className="w-full bg-gray-900/50 border border-violet-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-violet-400 focus:outline-none focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-300"
                />
              </div>

              <div className="flex items-end">
                {portfolioData.techHighlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      onRemoveArrayItem("portfolioData", "techHighlights", index)
                    }
                    className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:border-red-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {portfolioData.techHighlights.length < 4 && (
            <button
              type="button"
              onClick={() =>
                onAddArrayItem("portfolioData", "techHighlights", {
                  technology: "",
                  rating: 1,
                  description: "",
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 border border-violet-500/50 rounded-lg hover:border-violet-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]"
            >
              <Plus className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-400">Add Tech Highlight</span>
            </button>
          )}
        </div>
      </div>

      {/* Skills & Expertise Summary */}
      <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-6 rounded-xl border border-emerald-500/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg mr-3 border border-emerald-500/30">
            <Code className="w-5 h-5 text-emerald-400" />
          </div>
          Skills Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-emerald-300 font-medium mb-3">Expertise Areas</h4>
            <div className="flex flex-wrap gap-2">
              {portfolioData.heroSection.expertise.filter(item => item.trim()).map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-emerald-300 font-medium mb-3">Focus Areas</h4>
            <div className="flex flex-wrap gap-2">
              {portfolioData.heroSection.focusAreas.filter(item => item.trim()).map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2TechDetails;
