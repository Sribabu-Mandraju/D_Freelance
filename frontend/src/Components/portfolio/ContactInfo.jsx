"use client"
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter, MessageCircle } from 'lucide-react'

export default function ContactInfo({ personalInfo }) {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      neonColor: "from-red-400 to-pink-400",
      glowColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      neonColor: "from-green-400 to-emerald-400",
      glowColor: "rgba(34, 197, 94, 0.5)",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: "#",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      neonColor: "from-blue-400 to-cyan-400",
      glowColor: "rgba(59, 130, 246, 0.5)",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: personalInfo.github,
      color: "text-gray-400",
      bgColor: "bg-gray-400/10",
      neonColor: "from-gray-400 to-slate-300",
      glowColor: "rgba(156, 163, 175, 0.5)",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personalInfo.linkedin,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      neonColor: "from-blue-500 to-indigo-400",
      glowColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      icon: Globe,
      label: "Portfolio",
      href: personalInfo.portfolio,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      neonColor: "from-purple-400 to-pink-400",
      glowColor: "rgba(147, 51, 234, 0.5)",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: personalInfo.twitter,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      neonColor: "from-cyan-400 to-blue-400",
      glowColor: "rgba(6, 182, 212, 0.5)",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
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
            <Mail className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
              Get In Touch
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <a
                  key={method.label}
                  href={method.href}
                  className="relative block p-6 bg-gray-900/50 border border-gray-700/50 rounded-lg hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-sm group/card overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.neonColor} opacity-5 rounded-lg group-hover/card:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10 text-center">
                    <div className={`inline-flex p-3 rounded-full bg-gray-800/60 border border-gray-600/50 mb-4 group-hover/card:border-cyan-500/50 transition-all duration-300`}>
                      <IconComponent className={`w-6 h-6 ${method.color} drop-shadow-[0_0_5px_${method.glowColor}] group-hover/card:drop-shadow-[0_0_10px_${method.glowColor}] transition-all duration-300`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover/card:text-cyan-100 transition-colors duration-300">
                      {method.label}
                    </h3>
                    <p className="text-gray-300 text-sm break-all group-hover/card:text-gray-200 transition-colors duration-300">
                      {method.value}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-300 mb-4 leading-relaxed">
              I'm always excited to collaborate on{' '}
              <span className="text-cyan-400 font-semibold drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]">Web3</span>,{' '}
              <span className="text-purple-400 font-semibold drop-shadow-[0_0_3px_rgba(147,51,234,0.5)]">DeFi</span>, or{' '}
              <span className="text-green-400 font-semibold drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]">full-stack</span> projects. 
              Whether it's a groundbreaking dApp or a scalable web application, let's create something extraordinary together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-600/80 border border-cyan-500/50 hover:bg-cyan-500/80 hover:border-cyan-400/70 text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-sm group/btn"
              >
                <MessageCircle className="w-5 h-5 group-hover/btn:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
                Start a Conversation
              </a>
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600/80 border border-purple-500/50 hover:bg-purple-500/80 hover:border-purple-400/70 text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] backdrop-blur-sm group/btn2"
              >
                <Globe className="w-5 h-5 group-hover/btn2:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="relative bg-black border border-purple-500/30 rounded-xl p-6 lg:p-8 overflow-hidden shadow-2xl shadow-purple-500/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>
        
        {/* Neon border glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-sm"></div>
        <div className="absolute inset-[1px] rounded-xl bg-black"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-6 right-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-20 h-20 bg-pink-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-2">🌐</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_5px_rgba(147,51,234,0.5)]">
              Connect with Me
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center gap-3 p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] backdrop-blur-sm group/social overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.neonColor} opacity-5 rounded-lg group-hover/social:opacity-15 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <IconComponent className={`w-6 h-6 ${social.color} drop-shadow-[0_0_5px_${social.glowColor}] group-hover/social:drop-shadow-[0_0_10px_${social.glowColor}] transition-all duration-300`} />
                    <span className="text-sm font-medium text-white group-hover/social:text-purple-200 transition-colors duration-300">
                      {social.label}
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Availability Status */}
      <div className="relative bg-black border border-green-500/30 rounded-xl p-6 overflow-hidden shadow-2xl shadow-green-500/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-emerald-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>
        
        {/* Neon border glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-cyan-500/20 blur-sm"></div>
        <div className="absolute inset-[1px] rounded-xl bg-black"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>

        {/* Floating orb */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            <h3 className="text-lg font-semibold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">
                Currently Available
              </span>
            </h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            I'm actively seeking new opportunities in{' '}
            <span className="text-cyan-400 font-semibold drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]">Web3 development</span>,{' '}
            <span className="text-purple-400 font-semibold drop-shadow-[0_0_3px_rgba(147,51,234,0.5)]">smart contract auditing</span>, and{' '}
            <span className="text-green-400 font-semibold drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]">full-stack projects</span>.
            Open to both freelance work and full-time positions. Let's discuss how we can work together!
          </p>
        </div>
      </div>
    </div>
  )
}
