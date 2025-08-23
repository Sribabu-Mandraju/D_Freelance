
"use client";
import { User, Shield, Zap } from "lucide-react";

function HeroSection({ personalInfo }) {
  return (
    <div className="relative bg-gray-950/40 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 mb-6">
      {/* Gradient overlay with pointer-events-none to avoid blocking clicks */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-50 transition-opacity duration-500 pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row gap-6">
        {/* Profile Image Section */}
        <div className="flex-shrink-0">
  <div className="relative">
    <div className="absolute -inset-2 rounded-full bg-cyan-500/15 blur-xl pointer-events-none" />

    {personalInfo.profile ? (
      <img
        src={personalInfo.profile}
        alt="Profile"
        className="relative h-32 w-32 rounded-full object-cover border-2 border-cyan-500/30"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = "none"; // hide broken image
          // optional: you could trigger a fallback state here
        }}
      />
    ) : (
      <div className="relative h-32 w-32 flex items-center justify-center rounded-full bg-cyan-500/20 border-2 border-cyan-500/30">
        <span className="text-4xl font-bold text-cyan-400">
          {personalInfo.name ? personalInfo.name.charAt(0).toUpperCase() : "?"}
        </span>
      </div>
    )}
  </div>
</div>


        {/* Hero Content */}
        <div className="flex-1 space-y-3">
          {/* Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(34,211,238,.25)]">
              {personalInfo.name || "Unnamed Freelancer"}
            </span>
          </h1>

          {/* Domains */}
          <p className="text-lg text-gray-300">
            {personalInfo.domains?.join(" | ") || "No domains specified"}
          </p>

          {/* Thought Line */}
          <p className="text-base text-cyan-300 font-medium">
            {personalInfo.thoughtLine || "No thought line provided"}
          </p>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
              <User className="w-6 h-6 text-cyan-400" />
            </div>
            About Me
          </h2>
        </div>

        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p className="text-sm">{personalInfo.aboutMe || "No about me information provided"}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {/* Expertise */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 sm:p-6 rounded-xl border border-cyan-500/20">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Expertise
              </h3>
              <ul className="space-y-2 text-sm">
                {personalInfo.expertise?.length > 0 ? (
                  personalInfo.expertise.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: ["#00FFFF", "#3B82F6", "#8B5CF6", "#22C55E"][index % 4],
                        }}
                      />
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No expertise listed</li>
                )}
              </ul>
            </div>

            {/* Focus Areas */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 sm:p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Focus Areas
              </h3>
              <ul className="space-y-2 text-sm">
                {personalInfo.focusAreas?.length > 0 ? (
                  personalInfo.focusAreas.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: ["#8B5CF6", "#F472B6", "#00FFFF", "#3B82F6"][index % 4],
                        }}
                      />
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No focus areas listed</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
