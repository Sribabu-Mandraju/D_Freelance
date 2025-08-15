import React from "react";

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute top-20 right-20 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
    </div>
  );
}
