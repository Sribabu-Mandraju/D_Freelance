
"use client";
import { Code } from "lucide-react";

function TechHighlights({ techHighlights }) {
  // Fallback for empty or undefined techHighlights
  if (!techHighlights || techHighlights.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
        <h1 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
          <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
            <Code className="w-5 h-5 text-cyan-400" />
          </div>
          Tech Highlights
        </h1>
        <p className="text-gray-400 text-sm">No tech highlights available</p>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

      <h1 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
        <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
          <Code className="w-5 h-5 text-cyan-400" />
        </div>
        Tech Highlights
      </h1>

      <div className="space-y-3">
        {techHighlights.map((tech, index) => (
          <div
            key={index}
            className="flex flex-row w-full items-center justify-between p-2 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-700/30 relative"
          >
            <span className="text-sm text-gray-300">
              {tech.technology || "No technology specified"}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < (tech.rating || 0) ? "bg-cyan-400" : "bg-gray-600"
                    }`}
                    title={`${tech.rating || 0} star${(tech.rating || 0) > 1 ? "s" : ""}`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">
                  ({tech.rating || 0}/5)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechHighlights;