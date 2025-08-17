import { Zap, Shield } from "lucide-react"

const ProjectDetails = ({ description, skills, tags }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">Project details</h2>
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
        <div className="prose max-w-none text-gray-300">
          <p className="mb-4 text-base leading-relaxed">{description}</p>
          <p className="mb-4 text-base leading-relaxed">
            You'll receive complete source code, ownership transferred to your wallet, and optional verification on
            Etherscan (or BSCScan/Polygonscan).
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <h3 className="font-semibold text-cyan-400 mb-2 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Programming Languages
            </h3>
            <div className="text-gray-300">
              {tags.map((tag, index) => (
                <span key={index} className="text-gray-300">
                  {tag}
                  {index < tags.length - 1 ? " | " : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <h3 className="font-semibold text-cyan-400 mb-2 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Coding Expertise
            </h3>
            <div className="text-gray-300">
              {skills.map((skill, index) => (
                <span key={index} className="text-gray-300">
                  {skill}
                  {index < skills.length - 1 ? " | " : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
