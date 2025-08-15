import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationMap({ location }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
      <h3 className="text-lg sm:text-xl font-bold mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">
          Project Location
        </span>
      </h3>
      <div className="bg-gray-900/50 rounded-lg h-48 flex items-center justify-center border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300 group cursor-pointer">
        <div className="text-center">
          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200 text-cyan-400" />
          <p className="text-sm sm:text-base">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-300 group-hover:from-cyan-400 group-hover:to-blue-400">
              {location}
            </span>
          </p>
          <p className="text-xs mt-1">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-400">
              Interactive map coming soon
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
