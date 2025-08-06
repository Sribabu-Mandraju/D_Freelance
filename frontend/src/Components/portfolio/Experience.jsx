"use client"
import { Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react'

export default function Experience({ workExperience }) {
  return (
    <div className="relative bg-black border border-cyan-500/30 rounded-xl p-6 lg:p-8 overflow-hidden shadow-2xl shadow-cyan-500/20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>
      
      {/* Neon border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-sm"></div>
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
      <div className="absolute top-6 right-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center group">
          <Briefcase className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
            Work Experience
          </span>
        </h2>
        
        <div className="space-y-8">
          {workExperience.map((job, index) => (
            <div key={job.id} className="relative pl-6">
              {/* Timeline vertical line with neon glow */}
              {index !== workExperience.length - 1 && (
                <div className="absolute left-6 top-4 w-px h-full bg-gradient-to-b from-cyan-500/60 via-blue-500/40 to-purple-500/60 shadow-[0_0_3px_rgba(0,255,255,0.5)]"></div>
              )}
              
              {/* Timeline dot with neon effect */}
              <div
                className={`absolute left-4 top-4 w-4 h-4 rounded-full border-2 z-10 transition-all duration-300 ${
                  job.type === 'current'
                    ? 'bg-green-400 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse'
                    : 'bg-cyan-400 border-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.6)]'
                }`}
              >
                {/* Inner glow */}
                <div className={`absolute inset-0 rounded-full ${
                  job.type === 'current' ? 'bg-green-400/30' : 'bg-cyan-400/30'
                } blur-sm`}></div>
              </div>
              
              {/* Job Card with neon styling */}
              <div className="ml-6 sm:ml-10 pb-8">
                <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 sm:p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-sm group/card overflow-hidden">
                  {/* Card background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover/card:text-cyan-100 transition-colors duration-300">
                          {job.position}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
                          <span className="font-semibold text-cyan-400 ">
                            {job.company}
                          </span>
                          <div className="flex items-center gap-1 group-hover/card:text-gray-300 transition-colors duration-300">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Duration with neon accent */}
                      <div className="flex items-center gap-1 text-gray-400 text-sm mt-2 sm:mt-0 group-hover/card:text-blue-300 transition-colors duration-300">
                        <Calendar className="w-4 h-4" />
                        <span>{job.duration}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover/card:text-gray-200 transition-colors duration-300">
                      {job.description}
                    </p>
                    
                    {/* Achievements with neon styling */}
                    {job.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                          <span className="text-green-400 ">
                            Key Achievements:
                          </span>
                        </h4>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-300 group-hover/card:text-gray-200 transition-colors duration-300"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0 " />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Technologies with neon tags */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <span className="text-purple-400 ">
                          Technologies:
                        </span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <span
                            key={tech}
                            className="relative bg-gray-800/60 border border-gray-600/50 text-gray-300 text-xs px-3 py-1.5 rounded-full hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-gray-700/60 transition-all duration-300 hover:shadow-[0_0_8px_rgba(0,255,255,0.3)] backdrop-blur-sm"
                            style={{ animationDelay: `${techIndex * 50}ms` }}
                          >
                            {/* Tag glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10">{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Card corner particles */}
                  <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-80"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-80 delay-300"></div>
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-70 delay-700"></div>
    </div>
  )
}
