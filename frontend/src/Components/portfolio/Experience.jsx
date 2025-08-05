"use client"

import { Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react'

export default function Experience({ workExperience }) {
  return (
    <div className="md:bg-gray-800 ld:border border-gray-700 rounded-xl  lg:p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Briefcase className="w-6 h-6 mr-2 text-blue-400" />
        Work Experience
      </h2>

      <div className="space-y-8">
        {workExperience.map((job, index) => (
          <div key={job.id} className="relative pl-6">
            {/* Timeline vertical line */}
            {index !== workExperience.length - 1 && (
              <div className="absolute left-6 top-4 w-px h-full bg-gray-600"></div>
            )}

            {/* Timeline dot */}
            <div
              className={`absolute left-4 top-4 w-4 h-4 rounded-full border-2 z-10 ${
                job.type === 'current'
                  ? 'bg-green-400 border-green-400'
                  : 'bg-gray-600 border-gray-600'
              }`}
            ></div>

            {/* Job Card */}
            <div className="ml-6 sm:ml-10 pb-8">
              <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 sm:p-6 hover:border-gray-500 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{job.position}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
                      <span className="font-semibold text-blue-400">{job.company}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Duration below on mobile, right side on desktop */}
                  <div className="flex items-center gap-1 text-gray-400 text-sm mt-2 sm:mt-0">
                    <Calendar className="w-4 h-4" />
                    <span>{job.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">{job.description}</p>

                {/* Achievements */}
                {job.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {job.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-300"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}