import { Code, Blocks, Globe, Smartphone } from 'lucide-react'

const categoryIcons = {
  blockchain: Blocks,
  frontend: Globe,
  backend: Code,
  mobile: Smartphone,
}

const categoryTitles = {
  blockchain: "Blockchain & Web3",
  frontend: "Frontend Development",
  backend: "Backend & Database",
  mobile: "Mobile Development",
}

const categoryColors = {
  blockchain: {
    icon: "text-purple-400",
    gradient: "from-purple-500/60 to-pink-500/60",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/20",
    hoverBorder: "hover:border-purple-400/30"
  },
  frontend: {
    icon: "text-cyan-400", 
    gradient: "from-cyan-500/60 to-blue-500/60",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
    hoverBorder: "hover:border-cyan-400/30"
  },
  backend: {
    icon: "text-green-400",
    gradient: "from-green-500/60 to-emerald-500/60", 
    border: "border-green-500/20",
    glow: "shadow-green-500/20",
    hoverBorder: "hover:border-green-400/30"
  },
  mobile: {
    icon: "text-pink-400",
    gradient: "from-pink-500/60 to-rose-500/60",
    border: "border-pink-500/20", 
    glow: "shadow-pink-500/20",
    hoverBorder: "hover:border-pink-400/30"
  }
}

export default function TechStack({ techStack }) {
  return (
    <div className="space-y-8">
      {Object.entries(techStack).map(([category, skills]) => {
        const IconComponent = categoryIcons[category]
        const colors = categoryColors[category]
        
        return (
          <div 
            key={category} 
            className={`relative bg-black border ${colors.border} rounded-xl p-6 lg:p-8 overflow-hidden shadow-2xl ${colors.glow} ${colors.hoverBorder} transition-all duration-300 group`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 via-black/40 to-gray-900/20 rounded-xl animate-pulse"></div>
            
            {/* Neon border glow */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.gradient} opacity-10 blur-sm group-hover:opacity-20 transition-opacity duration-300`}></div>
            <div className="absolute inset-[1px] rounded-xl bg-black"></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              ></div>
            </div>

            {/* Floating orbs */}
            <div className={`absolute top-4 right-4 w-24 h-24 bg-gradient-to-r ${colors.gradient} opacity-5 rounded-full blur-2xl animate-pulse`}></div>
            <div className={`absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r ${colors.gradient} opacity-10 rounded-full blur-xl animate-pulse delay-1000`}></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center group">
                <IconComponent className={`w-6 h-6 mr-3 ${colors.icon} drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300`} />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                  {categoryTitles[category]}
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className="space-y-3 p-4 bg-gray-900/30 border border-gray-700/50 rounded-lg backdrop-blur-sm hover:border-gray-600/70 transition-all duration-300 hover:bg-gray-800/40 group/skill"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium group-hover/skill:text-gray-100 transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className={`text-sm font-semibold ${colors.icon} drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress bar container */}
                    <div className="relative w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700/50">
                      {/* Background glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-10 rounded-full`}></div>
                      
                      {/* Progress bar */}
                      <div
                        className={`relative h-3 rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,255,255,0.3)] animate-pulse`}
                        style={{ 
                          width: `${skill.level}%`,
                          boxShadow: `0 0 10px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                        }}
                      >
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                        
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Progress bar end glow */}
                      <div 
                        className={`absolute top-0 h-3 w-2 bg-gradient-to-r ${colors.gradient} blur-sm opacity-60 rounded-full transition-all duration-1000 ease-out`}
                        style={{ left: `${Math.max(0, skill.level - 2)}%` }}
                      ></div>
                    </div>
                    
                    {/* Skill level indicator dots */}
                    <div className="flex justify-end space-x-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i < Math.floor(skill.level / 20) 
                              ? `bg-gradient-to-r ${colors.gradient} shadow-[0_0_3px_rgba(0,255,255,0.5)]` 
                              : 'bg-gray-700'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating particles */}
            <div className={`absolute top-6 right-6 w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full animate-ping opacity-0`}></div>
            <div className={`absolute top-10 right-10 w-0.5 h-0.5 bg-gradient-to-r ${colors.gradient} rounded-full animate-pulse opacity-10 delay-300`}></div>
            <div className={`absolute bottom-6 left-6 w-1.5 h-1.5 bg-gradient-to-r ${colors.gradient} rounded-full animate-bounce opacity-10 delay-700`}></div>
          </div>
        )
      })}
    </div>
  )
}
