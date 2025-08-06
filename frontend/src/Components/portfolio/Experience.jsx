"use client"
import { useState } from 'react'
import { Briefcase, MapPin, Calendar, CheckCircle, Edit, Save, X, Plus, Trash2 } from 'lucide-react'

export default function Experience({ workExperience, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(workExperience)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData([...workExperience])
  }

  const handleSave = () => {
    if (onSave) onSave(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData([...workExperience])
    setIsEditing(false)
  }

  const updateJob = (id, field, value) => {
    setEditData(prev => prev.map(job =>
      job.id === id ? { ...job, [field]: value } : job
    ))
  }

  const updateJobArray = (id, field, index, value) => {
    setEditData(prev => prev.map(job =>
      job.id === id ? {
        ...job,
        [field]: job[field].map((item, i) => i === index ? value : item)
      } : job
    ))
  }

  const addToJobArray = (id, field, value) => {
    setEditData(prev => prev.map(job =>
      job.id === id ? { ...job, [field]: [...job[field], value] } : job
    ))
  }

  const removeFromJobArray = (id, field, index) => {
    setEditData(prev => prev.map(job =>
      job.id === id ? { ...job, [field]: job[field].filter((_, i) => i !== index) } : job
    ))
  }

  const addNewJob = () => {
    const newJob = {
      id: Date.now(),
      company: "New Company",
      location: "Location",
      position: "Position Title",
      duration: "Start Date - End Date",
      description: "Job description here...",
      achievements: ["New achievement"],
      technologies: ["Technology"],
      type: "previous"
    }
    setEditData([newJob, ...editData])
  }

  const removeJob = (id) => {
    setEditData(prev => prev.filter(job => job.id !== id))
  }

  const toggleJobType = (id) => {
    setEditData(prev => prev.map(job =>
      job.id === id ? { ...job, type: job.type === 'current' ? 'previous' : 'current' } : job
    ))
  }

  const currentData = isEditing ? editData : workExperience

  return (
    <div className="relative bg-black border border-cyan-500/30 rounded-xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl shadow-cyan-500/20">
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

      {/* Content */}
      <div className="relative z-10">
        {/* Section Header with Edit Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Briefcase className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Work Experience
            </span>
          </h2>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              aria-label="Edit work experience"
            >
              <Edit className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Edit</span>
            </button>
          ) : (
            <div className="w-auto flex flex-row gap-2">
              <button
                onClick={addNewJob}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 w-full sm:w-auto bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300"
                aria-label="Add new job"
              >
                <Plus className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">Add</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 w-full sm:w-auto bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300"
                aria-label="Save work experience"
              >
                <Save className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 w-full sm:w-auto bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300"
                aria-label="Cancel editing"
              >
                <X className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {currentData.map((job, index) => (
            <div key={job.id} className="relative pl-6">
              {/* Timeline vertical line with neon glow - hidden on small screens */}
              {index !== currentData.length - 1 && (
                <div className="hidden sm:block absolute left-6 top-4 w-px h-full bg-gradient-to-b from-cyan-500/60 via-blue-500/40 to-purple-500/60 shadow-[0_0_3px_rgba(0,255,255,0.5)]"></div>
              )}

              {/* Timeline dot with neon effect */}
              <div
                className={`absolute left-4 top-4 w-4 h-4 rounded-full border-2 z-10 transition-all duration-300 cursor-pointer ${
                  job.type === 'current'
                    ? 'bg-green-400 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse'
                    : 'bg-cyan-400 border-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.6)]'
                }`}
                onClick={() => isEditing && toggleJobType(job.id)}
                title={isEditing ? "Click to toggle current/previous" : ""}
              >
                <div className={`absolute inset-0 rounded-full ${job.type === 'current' ? 'bg-green-400/30' : 'bg-cyan-400/30'} blur-sm`}></div>
              </div>

              {/* Job Card with neon styling */}
              <div className="ml-6 sm:ml-10 pb-8">
                <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 sm:p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-sm group/card overflow-hidden">
                  {/* Delete button when editing - larger tap target on mobile */}
                  {isEditing && (
                    <button
                      onClick={() => removeJob(job.id)}
                      className="absolute top-3 right-3 p-2 sm:p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300 z-20"
                      aria-label={`Remove job ${job.position}`}
                      title="Remove job"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex-1">
                        {/* Position */}
                        {isEditing ? (
                          <input
                            type="text"
                            value={job.position}
                            onChange={(e) => updateJob(job.id, 'position', e.target.value)}
                            className="text-lg sm:text-xl font-bold text-white mb-1 bg-gray-900/50 border border-gray-700 rounded px-3 py-2 w-full focus:border-cyan-400 focus:outline-none"
                          />
                        ) : (
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover/card:text-cyan-100 transition-colors duration-300">
                            {job.position}
                          </h3>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
                          {/* Company */}
                          {isEditing ? (
                            <input
                              type="text"
                              value={job.company}
                              onChange={(e) => updateJob(job.id, 'company', e.target.value)}
                              className="font-semibold text-cyan-400 bg-gray-900/50 border border-gray-700 rounded px-2 py-1 w-full sm:w-auto focus:border-cyan-400 focus:outline-none"
                            />
                          ) : (
                            <span className="font-semibold text-cyan-400">{job.company}</span>
                          )}

                          {/* Location */}
                          <div className="flex items-center gap-1 group-hover/card:text-gray-300 transition-colors duration-300">
                            <MapPin className="w-4 h-4" />
                            {isEditing ? (
                              <input
                                type="text"
                                value={job.location}
                                onChange={(e) => updateJob(job.id, 'location', e.target.value)}
                                className="bg-gray-900/50 border border-gray-700 rounded px-2 py-1 text-sm w-full sm:w-auto focus:border-cyan-400 focus:outline-none"
                              />
                            ) : (
                              <span>{job.location}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-1 text-gray-400 text-sm mt-2 sm:mt-0 group-hover/card:text-blue-300 transition-colors duration-300">
                        <Calendar className="w-4 h-4" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={job.duration}
                            onChange={(e) => updateJob(job.id, 'duration', e.target.value)}
                            className="bg-gray-900/50 border border-gray-700 rounded px-2 py-1 text-sm focus:border-cyan-400 focus:outline-none"
                            placeholder="Start - End Date"
                          />
                        ) : (
                          <span>{job.duration}</span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {isEditing ? (
                      <textarea
                        value={job.description}
                        onChange={(e) => updateJob(job.id, 'description', e.target.value)}
                        className="w-full text-gray-300 text-sm mb-4 leading-relaxed bg-gray-900/50 border border-gray-700 rounded px-3 py-3 focus:border-cyan-400 focus:outline-none resize-none"
                        rows="3"
                        placeholder="Describe your role and responsibilities"
                      />
                    ) : (
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover/card:text-gray-200 transition-colors duration-300">
                        {job.description}
                      </p>
                    )}

                    {/* Achievements */}
                    {(job.achievements.length > 0 || isEditing) && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-white flex items-center">
                            <span className="text-green-400">Key Achievements:</span>
                          </h4>
                          {isEditing && (
                            <button
                              onClick={() => addToJobArray(job.id, 'achievements', 'New achievement')}
                              className="p-1 bg-green-500/20 border border-green-500/50 rounded hover:bg-green-500/30 transition-colors duration-300"
                              aria-label="Add achievement"
                            >
                              <Plus className="w-3 h-3 text-green-400" />
                            </button>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 relative">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              {isEditing ? (
                                <div className="flex flex-row items-stretch gap-2">
                                  <input
                                    type="text"
                                    value={achievement}
                                    onChange={(e) => updateJobArray(job.id, 'achievements', idx, e.target.value)}
                                    className="flex  bg-gray-900/50 border border-gray-700 rounded px-2 py-2 text-sm focus:border-cyan-400 focus:outline-none w-full"
                                  />
                                  <button
                                    onClick={() => removeFromJobArray(job.id, 'achievements', idx)}
                                    className="p-2 sm:p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300"
                                    aria-label="Remove achievement"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                  </button>
                                </div>
                              ) : (
                                <span>{achievement}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-white flex items-center">
                          <span className="text-purple-400">Technologies:</span>
                        </h4>
                        {isEditing && (
                          <button
                            onClick={() => addToJobArray(job.id, 'technologies', 'New Tech')}
                            className="p-1 bg-purple-500/20 border border-purple-500/50 rounded hover:bg-purple-500/30 transition-colors duration-300"
                            aria-label="Add technology"
                          >
                            <Plus className="w-3 h-3 text-purple-400" />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="relative bg-gray-800/60 border border-gray-600/50 text-gray-300 text-xs px-3 py-1.5 rounded-full hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-gray-700/60 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
                            style={{ animationDelay: `${techIndex * 50}ms` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            {isEditing ? (
                              <>
                                <input
                                  type="text"
                                  value={tech}
                                  onChange={(e) => updateJobArray(job.id, 'technologies', techIndex, e.target.value)}
                                  className="bg-transparent border-none text-xs focus:outline-none min-w-0 relative z-10"
                                />
                                <button
                                  onClick={() => removeFromJobArray(job.id, 'technologies', techIndex)}
                                  className="p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300 relative z-10"
                                  aria-label="Remove technology"
                                >
                                  <X className="w-3 h-3 text-red-400" />
                                </button>
                              </>
                            ) : (
                              <span className="relative z-10">{tech}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
