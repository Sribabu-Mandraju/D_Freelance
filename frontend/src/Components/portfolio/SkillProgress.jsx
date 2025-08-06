"use client"
import { TrendingUp, Download, ExternalLink } from 'lucide-react'

const skillReports = [
  {
    name: "Solidity",
    progress: 75,
    color: "from-gray-500 to-gray-400",
    neonColor: "from-gray-400 to-slate-300",
    glowColor: "rgba(156, 163, 175, 0.5)",
    reportUrl: "https://github.com/Sribabu-Mandraju/Solidity_Progress.pdf",
    description: "Smart contract development and security best practices",
  },
  {
    name: "React",
    progress: 90,
    color: "from-blue-500 to-cyan-400",
    neonColor: "from-cyan-400 to-blue-400",
    glowColor: "rgba(6, 182, 212, 0.5)",
    reportUrl: "https://github.com/Sribabu-Mandraju/React_Progress.pdf",
    description: "Modern React development with hooks and state management",
  },
  {
    name: "Node.js",
    progress: 85,
    color: "from-green-500 to-emerald-400",
    neonColor: "from-emerald-400 to-green-400",
    glowColor: "rgba(34, 197, 94, 0.5)",
    reportUrl: "https://github.com/Sribabu-Mandraju/Nodejs_Progress.pdf",
    description: "Backend development and API design",
  },
  {
    name: "Web3 Development",
    progress: 80,
    color: "from-purple-500 to-pink-400",
    neonColor: "from-purple-400 to-pink-400",
    glowColor: "rgba(147, 51, 234, 0.5)",
    reportUrl: "#",
    description: "DeFi protocols, NFTs, and blockchain integration",
  },
  {
    name: "Full-Stack Architecture",
    progress: 85,
    color: "from-orange-500 to-red-400",
    neonColor: "from-orange-400 to-red-400",
    glowColor: "rgba(249, 115, 22, 0.5)",
    reportUrl: "#",
    description: "End-to-end application development and deployment",
  },
  {
    name: "UI/UX Design",
    progress: 70,
    color: "from-indigo-500 to-purple-400",
    neonColor: "from-indigo-400 to-purple-400",
    glowColor: "rgba(99, 102, 241, 0.5)",
    reportUrl: "#",
    description: "User interface design and user experience optimization",
  },
]

export default function SkillProgress() {
  return (
    <div className="relative bg-black border border-cyan-500/30 rounded-xl p-6 lg:p-8 overflow-hidden shadow-2xl shadow-cyan-500/20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>
      
      {/* Neon border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
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
      <div className="absolute bottom-6 left-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center group">
          <TrendingUp className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
            Skill Progress Reports
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillReports.map((skill, index) => (
            <div
              key={skill.name}
              className="relative bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm group/card overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover/card:text-cyan-100 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover/card:text-gray-300 transition-colors duration-300">
                      {skill.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-white mb-1 group-hover/card:text-cyan-100 transition-colors duration-300">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                        {skill.progress}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 group-hover/card:text-gray-300 transition-colors duration-300">
                      Proficiency
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="mb-4 relative">
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700/50 relative">
                    {/* Background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.neonColor} opacity-10 rounded-full`}></div>
                    
                    {/* Progress bar */}
                    <div
                      className={`relative h-2 rounded-full bg-gradient-to-r ${skill.neonColor} transition-all duration-1000 ease-out `}
                      style={{ 
                        width: `${skill.progress}%`,
                        boxShadow: `0 0 10px ${skill.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                      }}
                    >
                      {/* Inner glow effect */}
                      {/* <div className="absolute  inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div> */}
                      
                      {/* Animated shine effect */}
                      {/* <div className="absolute  inset-0  bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full "></div> */}
                    </div>
                    
                    {/* Progress bar end glow */}
                    <div 
                      className={`absolute top-0 h-2 w-3 bg-gradient-to-r ${skill.neonColor} blur-md opacity-60 rounded-full transition-all duration-1000 ease-out`}
                      style={{ left: `${Math.max(0, skill.progress - 3)}%` }}
                    ></div>
                  </div>
                  
                  {/* Progress percentage indicator */}
                  <div 
                    className="absolute -top-8 text-xs font-semibold text-cyan-400 transition-all duration-1000 ease-out"
                    style={{ left: `${Math.max(0, skill.progress - 5)}%` }}
                  >
                    {skill.progress}%
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={skill.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600/80 border border-cyan-500/50  hover:border-cyan-400/70 text-white text-sm rounded-lg transition-all duration-300 flex-1 justify-center  group/btn"
                  >
                    <Download className="w-4 h-4 " />
                    <span>View Progress</span>
                  </a>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/80 border border-gray-600/50 hover:bg-purple-600/80 hover:border-purple-500/70 text-white text-sm rounded-lg transition-all duration-300 group/btn2">
                    <ExternalLink className="w-4 h-4 group-hover/btn2:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
                  </button>
                </div>
              </div>
              
              {/* Card corner particles */}
              {/* <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
              <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-80"></div> */}
            </div>
          ))}
        </div>
        
        {/* Enhanced Additional Info */}
        <div className="mt-8 relative">
          {/* Info card glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
          <div className="relative bg-black/80 border border-cyan-500/50 rounded-lg p-4 backdrop-blur-sm hover:border-cyan-400/70 transition-all duration-300">
            <p className="text-cyan-300 text-sm leading-relaxed">
              <span className="font-bold text-cyan-400 drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]">
                Note:
              </span>{' '}
              <span className="text-gray-200">
                These progress reports showcase my continuous learning journey and practical
                application of technologies. Each report includes project examples, code samples, and learning milestones
                achieved.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {/* <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-80 delay-300"></div>
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-70 delay-700"></div> */}
    </div>
  )
}
