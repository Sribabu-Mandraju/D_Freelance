"use client"

import { TrendingUp, Download, ExternalLink } from "lucide-react"

const skillReports = [
  {
    name: "Solidity",
    progress: 75,
    color: "from-gray-500 to-gray-400",
    reportUrl: "https://github.com/Sribabu-Mandraju/Solidity_Progress.pdf",
    description: "Smart contract development and security best practices",
  },
  {
    name: "React",
    progress: 90,
    color: "from-blue-500 to-cyan-400",
    reportUrl: "https://github.com/Sribabu-Mandraju/React_Progress.pdf",
    description: "Modern React development with hooks and state management",
  },
  {
    name: "Node.js",
    progress: 85,
    color: "from-green-500 to-emerald-400",
    reportUrl: "https://github.com/Sribabu-Mandraju/Nodejs_Progress.pdf",
    description: "Backend development and API design",
  },
  {
    name: "Web3 Development",
    progress: 80,
    color: "from-purple-500 to-pink-400",
    reportUrl: "#",
    description: "DeFi protocols, NFTs, and blockchain integration",
  },
  {
    name: "Full-Stack Architecture",
    progress: 85,
    color: "from-orange-500 to-red-400",
    reportUrl: "#",
    description: "End-to-end application development and deployment",
  },
  {
    name: "UI/UX Design",
    progress: 70,
    color: "from-indigo-500 to-purple-400",
    reportUrl: "#",
    description: "User interface design and user experience optimization",
  },
]

export default function SkillProgress() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
        Skill Progress Reports
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillReports.map((skill) => (
          <div
            key={skill.name}
            className="bg-gray-700/50 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                <p className="text-sm text-gray-400">{skill.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white mb-1">{skill.progress}%</div>
                <div className="text-xs text-gray-400">Proficiency</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-2">
              <a
                href={skill.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200 flex-1 justify-center"
              >
                <Download className="w-4 h-4" />
                View Progress
              </a>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition-colors duration-200">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
        <p className="text-blue-400 text-sm leading-relaxed">
          <strong>Note:</strong> These progress reports showcase my continuous learning journey and practical
          application of technologies. Each report includes project examples, code samples, and learning milestones
          achieved.
        </p>
      </div>
    </div>
  )
}