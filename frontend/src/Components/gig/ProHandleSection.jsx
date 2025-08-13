import React from 'react';
import { Award, Play } from 'lucide-react';

const ProHandleSection = () => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
          <Award className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">
            Let a pro handle the details
          </h3>
          <p className="text-gray-300 mb-4">
            Buy{' '}
            <a href="#" className="text-cyan-400 underline hover:text-cyan-300 transition-colors">
              Web Application Programming
            </a>{' '}
            services from Sribabu, priced and ready to go.
          </p>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
            <Play className="w-4 h-4" />
            <span>How it works</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProHandleSection;
