"use client"
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react'

export default function Education({ education }) {
  return (
    <div className="relative bg-black border border-cyan-500/30 rounded-xl p-6 lg:p-8 overflow-hidden shadow-2xl shadow-cyan-500/20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>
      
      {/* Neon border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-sm"></div>
      <div className="absolute inset-[1px] rounded-xl bg-black"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-6 right-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center group">
          <GraduationCap className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
            Education
          </span>
        </h2>
        
        <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-sm group/card overflow-hidden">
          {/* Card background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover/card:text-cyan-100 transition-colors duration-300">
                  {education.degree}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 mb-2">
                  <span className="font-semibold text-cyan-400 ">
                    {education.institution}
                  </span>
                  <div className="flex items-center gap-1 group-hover/card:text-gray-300 transition-colors duration-300">
                    <MapPin className="w-4 h-4" />
                    {education.location}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start lg:items-end gap-2">
                <div className="flex items-center gap-1 text-gray-400 text-sm group-hover/card:text-blue-300 transition-colors duration-300">
                  <Calendar className="w-4 h-4" />
                  {education.duration}
                </div>
                <div className="relative bg-green-400/10 border border-green-400/30 text-green-400 px-3 py-1 rounded-full text-sm font-semibold hover:bg-green-400/20 hover:border-green-400/50 transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  {/* CGPA glow effect */}
                  <div className="absolute inset-0 bg-green-400/5 rounded-full blur-sm"></div>
                  <span className="relative z-10 ">
                    CGPA: {education.cgpa}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Relevant Coursework */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center group/coursework">
                <BookOpen className="w-5 h-5 mr-2 text-purple-400  group-hover/coursework:drop-shadow-[0_0_8px_rgba(147,51,234,0.8)] transition-all duration-300" />
                <span className="text-purple-400 ">
                  Relevant Coursework
                </span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {education.coursework.map((course, index) => (
                  <div 
                    key={course} 
                    className="relative bg-gray-800/60 border border-gray-600/50 text-gray-300 text-sm px-3 py-2 rounded-lg hover:border-purple-500/50 hover:text-purple-300 hover:bg-gray-700/60 transition-all duration-300 hover:shadow-[0_0_8px_rgba(147,51,234,0.3)] backdrop-blur-sm group/course"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Course glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover/course:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Course content */}
                    <span className="relative z-10">{course}</span>
                    
                    {/* Course corner particle */}
                    <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover/course:opacity-100 animate-pulse transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Card corner particles */}
          <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-80"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-80 delay-300"></div>
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-70 delay-700"></div>
    </div>
  )
}
