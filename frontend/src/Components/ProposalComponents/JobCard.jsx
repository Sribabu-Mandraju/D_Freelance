
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  Bookmark,
} from "lucide-react";
const JobCard = ({ job, isSaved, onToggleSave, onClick }) => {
  return (
    // ${
    //     job.featured ? "bg-cyan-500/5" : "bg-black/40"
    //   }
    <div
      className={`bg-black/40 mt-[] cursor-pointer backdrop-blur-xl rounded-2xl p-4 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-cyan-500/10 relative overflow-hidden `}
      onClick={onClick}
    >
      {job.featured && (
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full mb-3">
          <Star className="w-3 h-3" />
          Featured
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-xl font-bold bg-clip-text text-transparent my-2 bg-gradient-to-r from-purple-500 font-orbitron to-blue-600  hover:bg-gradient-to-r hover:from-purple-300 hover:to-blue-400 cursor-pointer transition-all duration-300">
            {job.title}
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
            {job.description}
          </p>
        </div>
        <button
          onClick={onToggleSave}
          className={`ml-3 p-2 rounded-lg transition-colors ${
            isSaved
              ? "bg-cyan-500 text-white"
              : "bg-gray-900/50 text-gray-400 hover:bg-cyan-500/20"
          }`}
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-900/50 text-cyan-300 px-2 py-0.5 rounded-full text-xs hover:text-cyan-200 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 text-xs">
        <div className="flex items-center gap-1.5 text-gray-400">
          <DollarSign className="w-3 h-3" />
          <span>{job.budget}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{job.timeframe}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <MapPin className="w-3 h-3" />
          <span>{job.location}</span>
        </div>
      
      </div>

      {/* Client Info and Actions */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <img
            src={job.client.avatar || "/placeholder.svg"}
            alt={job.client.name}
            className="w-7 h-7 rounded-full"
          />
          <div>
            <p className="text-purple-400 font-medium text-xs hover:text-purple-300 transition-colors duration-200">
              {job.client.name}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {/* <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> */}
              <span>{job.client.email}</span>
              {/* <span>•</span> */}
              {/* <span>{job.client.jobsPosted} jobs</span> */}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{job.postedTime}</span>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 text-xs shadow-lg">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
export default JobCard