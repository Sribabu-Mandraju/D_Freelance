import { CheckCircle, Target } from "lucide-react"

export default function RequirementsDeliverables({ jobDetails }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* Requirements */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
        <h3 className="text-lg sm:text-xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-green-300">Requirements</span>
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          {jobDetails?.requirements?.map((req, index) => (
            <li
              key={index}
              className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-200 group cursor-pointer hover:scale-[1.02]"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white group-hover:from-white group-hover:to-green-200">
                {req}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Deliverables */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
        <h3 className="text-lg sm:text-xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">Deliverables</span>
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          {jobDetails?.deliverables?.map((deliverable, index) => (
            <li
              key={index}
              className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-200 group cursor-pointer hover:scale-[1.02]"
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white group-hover:from-white group-hover:to-cyan-200">
                {deliverable}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
