import React from 'react';
import { Star, MessageCircle } from 'lucide-react';

export default function ClientInfo({ client }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl sticky rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
      <h3 className="text-lg sm:text-xl font-bold mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
          About the Client
        </span>
      </h3>
      
      <div className="flex items-center gap-3 mb-4">
        <img
          src={client.avatar || "/placeholder.svg?height=48&width=48"}
          alt={client.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-500/30 hover:border-purple-500/50 transition-all duration-300"
        />
        <div>
          <h4 className="font-medium hover:scale-105 transition-transform duration-200 cursor-pointer text-sm sm:text-base">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300">
              {client.name}
            </span>
          </h4>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-yellow-300">
              {client.rating}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-200 group cursor-pointer hover:scale-[1.02]">
          <span className="text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200 group-hover:from-gray-300 group-hover:to-white">
            Jobs Posted
          </span>
          <span className="text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300 group-hover:scale-105 transition-transform duration-200">
            {client.jobsPosted}
          </span>
        </div>
        <div className="flex justify-between p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-200 group cursor-pointer hover:scale-[1.02]">
          <span className="text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200 group-hover:from-gray-300 group-hover:to-white">
            Member Since
          </span>
          <span className="text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300 group-hover:scale-105 transition-transform duration-200">
            2023
          </span>
        </div>
      </div>
      
      <button className="w-full bg-gray-900/50 hover:bg-gray-800/50 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20 border border-gray-700/50 hover:border-cyan-500/30 group">
        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white group-hover:from-cyan-400 group-hover:to-blue-400">
          Contact Client
        </span>
      </button>
    </div>
  );
}
