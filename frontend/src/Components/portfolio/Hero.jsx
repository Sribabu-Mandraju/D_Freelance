import { MapPin, Mail, Phone, Github, Linkedin, Globe, Twitter } from 'lucide-react'
import { FaXTwitter } from "react-icons/fa6"

export default function Hero({ personalInfo }) {
  return (
    <div className="mb-8">
      <div className="relative bg-black border border-cyan-500/30 rounded-xl p-6 lg:p-8 text-white overflow-hidden shadow-2xl shadow-cyan-500/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-cyan-900/20 to-blue-900/20 rounded-xl animate-pulse"></div>
        
        {/* Neon border glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
        <div className="absolute inset-[1px] rounded-xl bg-black"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
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
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Info */}
            <div className="flex-1">
              {/* Name with neon glow */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 ">
                  {personalInfo.name}
                </span>
                <div className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-sm opacity-20">
                  {personalInfo.name}
                </div>
              </h1>
              
              {/* Title with glow */}
              <p className="text-md lg:text-xl text-cyan-300 mb-4 drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
                {personalInfo.title}
              </p>
              
              {/* Contact Info with neon accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group">
                  <Mail className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group">
                  <Phone className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group">
                  <MapPin className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                  <span className="text-sm">{personalInfo.location}</span>
                </div>
              </div>
              
              {/* Social Links with neon hover effects */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-700 hover:border-purple-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:bg-purple-900/20 group"
                >
                  <Github className="w-4 h-4 text-white group-hover:text-purple-400 group-hover:drop-shadow-[0_0_5px_rgba(147,51,234,0.5)]" />
                  <span className="text-sm group-hover:text-purple-400">GitHub</span>
                </a>
                
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-700 hover:border-blue-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-900/20 group"
                >
                  <Linkedin className="w-4 h-4 text-white group-hover:text-blue-400 group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                  <span className="text-sm group-hover:text-blue-400">LinkedIn</span>
                </a>
                
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:bg-cyan-900/20 group"
                >
                  <FaXTwitter className="w-4 h-4 text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                  <span className="text-sm group-hover:text-cyan-400">Twitter</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Mission Statement with neon border */}
          <div className="mt-6 relative">
            {/* Neon border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-lg blur-sm"></div>
            <div className="relative bg-black/80 border border-cyan-500/50 rounded-lg p-4 backdrop-blur-sm hover:border-cyan-400/70 transition-all duration-300">
              <p className="text-gray-300 leading-relaxed">
                <span className="text-cyan-400 font-semibold drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                  Mission:
                </span>{' '}
                <span className="text-gray-200">
                  {personalInfo.mission}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-12 left-12 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-500 opacity-60"></div>
      </div>
    </div>
  )
}
