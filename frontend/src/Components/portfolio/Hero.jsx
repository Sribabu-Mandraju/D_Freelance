import { MapPin, Mail, Phone, Github, Linkedin, Globe, Twitter } from 'lucide-react'
import { FaXTwitter } from "react-icons/fa6";


export default function Hero({ personalInfo }) {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 lg:p-8 text-white relative overflow-hidden shadow-xl shadow-black/20">
        {/* Darker accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 via-purple-800/10 to-cyan-800/10 rounded-xl pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
                {personalInfo.name}
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-4">
                {personalInfo.title}
              </p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{personalInfo.location}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                {/* <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-purple-800 hover:bg-purple-700 rounded-lg transition-colors duration-200"
                >
                  <Globe className="w-4 h-4 text-white" />
                  <span className="text-sm">Portfolio</span>
                </a> */}  
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-cyan-800 hover:bg-cyan-700 rounded-lg transition-colors duration-200"
                >
                  <FaXTwitter className="w-4 h-4 text-white" />
                  <span className="text-sm">Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-6 p-4 bg-gray-900 border border-gray-800 rounded-lg">
            <p className="text-gray-300 leading-relaxed">
              <span className="text-blue-400 font-semibold">Mission:</span> {personalInfo.mission}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}