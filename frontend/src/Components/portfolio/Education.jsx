"use client"
import { useState } from 'react'
import { GraduationCap, MapPin, Calendar, BookOpen, Edit, Save, X, Plus, Trash2 } from 'lucide-react'

export default function Education({ education, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(education)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({ ...education, coursework: education.coursework ?? [] })
  }

  const handleSave = () => {
    if (onSave) {
      onSave(editData)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...education, coursework: education.coursework ?? [] })
    setIsEditing(false)
  }

  const updateField = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const updateCoursework = (index, value) => {
    setEditData(prev => ({
      ...prev,
      coursework: (prev.coursework ?? []).map((course, i) => i === index ? value : course)
    }))
  }

  const addCoursework = () => {
    setEditData(prev => ({
      ...prev,
      coursework: [...(prev.coursework ?? []), "New Course"]
    }))
  }

  const removeCoursework = (index) => {
    setEditData(prev => ({
      ...prev,
      coursework: (prev.coursework ?? []).filter((_, i) => i !== index)
    }))
  }

  const currentData = isEditing ? editData : education

  return (
    <div className="relative bg-black border border-cyan-500/30 rounded-xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl shadow-cyan-500/20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>

      {/* Neon border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-sm"></div>
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <GraduationCap className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Education
            </span>
          </h2>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300"
              aria-label="Edit education"
            >
              <Edit className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Edit</span>
            </button>
          ) : (
            <div className="w-auto flex flex-row gap-2">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 w-auto bg-gray-900/50 border border-green-500/50 rounded-lg transition-all duration-300"
                aria-label="Save education"
              >
                <Save className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 w-auto bg-gray-900/50 border border-red-500/50 rounded-lg transition-all duration-300"
                aria-label="Cancel editing"
              >
                <X className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 sm:p-6 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm overflow-hidden">
          {/* Card background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                {/* Degree */}
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData.degree ?? ''}
                    onChange={(e) => updateField('degree', e.target.value)}
                    className="text-lg sm:text-xl font-bold text-white mb-2 bg-gray-900/50 border border-gray-700 rounded px-3 py-2 w-full focus:border-cyan-400 focus:outline-none"
                    placeholder="Degree Title"
                  />
                ) : (
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {currentData.degree}
                  </h3>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 mb-2">
                  {/* Institution */}
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentData.institution ?? ''}
                      onChange={(e) => updateField('institution', e.target.value)}
                      className="font-semibold text-cyan-400 bg-gray-900/50 border border-gray-700 rounded px-2 py-1 w-full sm:w-auto focus:border-cyan-400 focus:outline-none"
                      placeholder="Institution Name"
                    />
                  ) : (
                    <span className="font-semibold text-cyan-400">{currentData.institution}</span>
                  )}

                  {/* Location */}
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentData.location ?? ''}
                        onChange={(e) => updateField('location', e.target.value)}
                        className="bg-gray-900/50 border border-gray-700 rounded px-2 py-1 text-sm w-full sm:w-auto focus:border-cyan-400 focus:outline-none"
                        placeholder="Location"
                      />
                    ) : (
                      <span className="text-gray-400">{currentData.location}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-2">
                {/* Duration */}
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentData.duration ?? ''}
                      onChange={(e) => updateField('duration', e.target.value)}
                      className="bg-gray-900/50 border border-gray-700 rounded px-2 py-1 text-sm focus:border-cyan-400 focus:outline-none"
                      placeholder="Start - End Date"
                    />
                  ) : (
                    <span>{currentData.duration}</span>
                  )}
                </div>

                {/* CGPA */}
                <div className="relative bg-green-400/10 border border-green-400/30 text-green-400 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                  <div className="absolute inset-0 bg-green-400/5 rounded-full blur-sm"></div>
                  {isEditing ? (
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="text-xs">CGPA:</span>
                      <input
                        type="text"
                        value={currentData.cgpa ?? ''}
                        onChange={(e) => updateField('cgpa', e.target.value)}
                        className="bg-transparent border-none text-green-400 focus:outline-none w-16 text-center text-sm"
                        placeholder="0.0/10"
                      />
                    </div>
                  ) : (
                    <span className="relative z-10 text-sm">CGPA: {currentData.cgpa}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Relevant Coursework */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <h4 className="text-lg font-semibold text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                  <span className="text-purple-400">Relevant Coursework</span>
                </h4>

                {isEditing && (
                  <button
                    onClick={addCoursework}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg transition-all duration-300 w-full sm:w-auto justify-center"
                    aria-label="Add course"
                  >
                    <Plus className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-purple-400">Add Course</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {(currentData.coursework ?? []).map((course, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-800/60 border border-gray-600/50 text-gray-300 text-sm px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm flex items-center justify-between gap-2"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    {/* Delete button when editing */}
                    {isEditing && (
                      <button
                        onClick={() => removeCoursework(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-200 z-20"
                        aria-label={`Remove course ${course}`}
                        title="Remove course"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    )}

                    {/* Course content */}
                    {isEditing ? (
                      <input
                        type="text"
                        value={course}
                        onChange={(e) => updateCoursework(index, e.target.value)}
                        className="relative z-10 bg-transparent border-none text-sm text-gray-300 focus:outline-none w-full pr-6"
                        placeholder="Course Name"
                      />
                    ) : (
                      <span className="relative z-10">{course}</span>
                    )}

                    {/* corner particle (decorative) */}
                    <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                  </div>
                ))}

                {/* show placeholder when no courses */}
                {(currentData.coursework ?? []).length === 0 && !isEditing && (
                  <div className="text-gray-500 italic">No relevant coursework listed.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
