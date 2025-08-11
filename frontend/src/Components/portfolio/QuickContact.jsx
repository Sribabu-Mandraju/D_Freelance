import { Mail, Phone, Linkedin } from "lucide-react"

function QuickContact({ personalInfo }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
        <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
          <Mail className="w-5 h-5 text-cyan-400" />
        </div>
        Quick Contact
      </h3>
      <div className="space-y-2">
        <a
          href={`mailto:${personalInfo.email}`}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-300 group border border-transparent hover:border-cyan-500/20"
        >
          <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors duration-300">
            <Mail className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              Email
            </span>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
              Send a message
            </p>
          </div>
        </a>
        <a
          href={`tel:${personalInfo.phone}`}
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 transition-all duration-300 group border border-transparent hover:border-green-500/20"
        >
          <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30 group-hover:border-green-500/50 transition-colors duration-300">
            <Phone className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              Call
            </span>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
              Direct contact
            </p>
          </div>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-indigo-500/10 transition-all duration-300 group border border-transparent hover:border-blue-500/20"
        >
          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg border border-blue-500/30 group-hover:border-blue-500/50 transition-colors duration-300">
            <Linkedin className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              LinkedIn
            </span>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
              Professional network
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default QuickContact
