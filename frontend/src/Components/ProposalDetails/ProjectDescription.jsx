import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ProjectDescription({ jobDetails }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
      <h3 className="text-lg sm:text-xl font-bold mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">
          Project Description
        </span>
      </h3>
      <p className="leading-relaxed mb-4 text-sm sm:text-base">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100">
          {jobDetails.fullDescription}
        </span>
      </p>
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 sm:p-4 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mt-0.5 flex-shrink-0 animate-pulse" />
          <div>
            <h4 className="font-medium mb-1 text-sm sm:text-base">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                Important Notice
              </span>
            </h4>
            <p className="text-xs sm:text-sm">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-yellow-200">
                This project requires signing an NDA and all deliverables must be completed within the specified timeframe. Please ensure you have the necessary skills before submitting a proposal.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
