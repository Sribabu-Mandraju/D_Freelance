import { MapPin, Clock, Users, Heart, Share2, Bookmark } from "lucide-react"

export default function ProposalHeader({ jobDetails }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 mb-6 shadow-2xl shadow-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse">
              {jobDetails.title}
            </h1>
            {jobDetails.featured && (
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer">
              <MapPin className="w-4 h-4" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-400 hover:from-cyan-400 hover:to-blue-400">
                {jobDetails.location}
              </span>
            </span>
            <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer">
              <Clock className="w-4 h-4" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-400 hover:from-cyan-400 hover:to-blue-400">
                Posted {jobDetails.postedTime}
              </span>
            </span>
            <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer">
              <Users className="w-4 h-4" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-cyan-400 hover:from-cyan-400 hover:to-blue-400">
                {jobDetails.proposals} proposals
              </span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {jobDetails?.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-900/50 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-cyan-500/10"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">
                  {skill}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md shadow-cyan-500/50 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/60">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-100">
              Submit Proposal
            </span>
          </button>
          <div className="flex gap-2">
            <button className="bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 p-2 rounded-lg transition-all duration-300 hover:text-pink-400 hover:shadow-lg hover:shadow-pink-500/20 border border-gray-700/50 hover:border-pink-500/30 group">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button className="bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 p-2 rounded-lg transition-all duration-300 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20 border border-gray-700/50 hover:border-blue-500/30 group">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button className="bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 p-2 rounded-lg transition-all duration-300 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 border border-gray-700/50 hover:border-yellow-500/30 group">
              <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
