import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors duration-200 hover:shadow-lg hover:shadow-cyan-500/20 p-2 rounded-lg group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform duration-200" />
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:from-cyan-300 group-hover:to-blue-300">
        Back to Jobs
      </span>
    </button>
  );
}
