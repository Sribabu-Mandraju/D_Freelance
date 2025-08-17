import React from "react";
import { Heart, Share2, Star } from "lucide-react";

const GigHeader = ({ title, avatar, username, rating, about, badges }) => {
  return (
   <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

  {/* Top Section: Title */}
  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">{title}</h1>

  {/* Main Content Row */}
  <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
    {/* Left Side: User Info */}
    <div className="flex items-center space-x-4 bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4 flex-1">
      <img
        src={avatar}
        alt={username}
        className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
      />
      <div>
        <span className="font-semibold text-white text-lg">{username}</span>
        <div className="flex items-center space-x-2 mt-1">
          <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-400">({rating}) • 127 reviews</span>
        </div>
        <div className="text-white mt-1">{about}</div>
      </div>
    </div>

    {/* Right Side: Buttons & Badges */}
    <div className="flex flex-col items-end gap-4">
      {/* Buttons */}
      <div className="flex space-x-3">
        <button className="flex items-center space-x-2 bg-gray-900/50 border border-cyan-500/50 text-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
          <Heart className="w-5 h-5" />
          <span>Save</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-900/50 border border-purple-500/50 text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Badges */}
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-end">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-gray-900/50 border border-cyan-500/50 text-cyan-300 px-3 py-2C rounded-lg text-sm hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
            >
              <Star className="w-4 h-4" /> {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default GigHeader;
