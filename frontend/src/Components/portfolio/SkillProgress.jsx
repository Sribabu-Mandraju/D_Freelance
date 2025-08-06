"use client"
import { useState } from "react"
import {
  TrendingUp,
  Download,
  ExternalLink,
  Edit,
  Save,
  X,
  Plus,
  Trash2
} from "lucide-react"

const initialSkillReports = [
  {
    id: 1,
    name: "Solidity",
    progress: 75,
    color: "from-gray-500 to-gray-400",
    neonColor: "from-gray-400 to-slate-300",
    glowColor: "rgba(156, 163, 175, 0.5)",
    reportUrl: "https://github.com/Sribabu-Mandraju/Solidity_Progress.pdf",
    description: "Smart contract development and security best practices"
  },
  {
    id: 2,
    name: "React",
    progress: 90,
    color: "from-blue-500 to-cyan-400",
    neonColor: "from-cyan-400 to-blue-400",
    glowColor: "rgba(6, 182, 212, 0.5)",
    reportUrl: "https://github.com/Sribabu-Mandraju/React_Progress.pdf",
    description: "Modern React development with hooks and state management"
  },
  {
    id: 3,
    name: "Node.js",
    progress: 85,
    color: "from-green-500 to-emerald-400",
    neonColor: "from-emerald-400 to-green-400",
    glowColor: "rgba(34, 197, 94, 0.5)",
    reportUrl: "https://github.com/Sribabu-Mandraju/Nodejs_Progress.pdf",
    description: "Backend development and API design"
  }
]

export default function SkillProgress({ onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [skillReports, setSkillReports] = useState(initialSkillReports)
  const [editData, setEditData] = useState(initialSkillReports)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(JSON.parse(JSON.stringify(skillReports)))
  }

  const handleSave = () => {
    setSkillReports(editData)
    if (onSave) onSave(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(JSON.parse(JSON.stringify(skillReports)))
    setIsEditing(false)
  }

  const updateSkill = (id, field, value) => {
    setEditData(prev =>
      prev.map(skill => (skill.id === id ? { ...skill, [field]: value } : skill))
    )
  }

  const addNewSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: "New Skill",
      progress: 50,
      color: "from-blue-500 to-cyan-400",
      neonColor: "from-cyan-400 to-blue-400",
      glowColor: "rgba(6, 182, 212, 0.5)",
      reportUrl: "#",
      description: "Skill description here..."
    }
    setEditData(prev => [...prev, newSkill])
  }

  const removeSkill = id => {
    setEditData(prev => prev.filter(s => s.id !== id))
  }

  const adjustProgress = (id, increment) => {
    setEditData(prev =>
      prev.map(skill =>
        skill.id === id
          ? { ...skill, progress: Math.max(0, Math.min(100, skill.progress + increment)) }
          : skill
      )
    )
  }

  const currentData = isEditing ? editData : skillReports

  return (
    <div className="relative bg-black border border-cyan-500/30 rounded-xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl shadow-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
      <div className="absolute inset-[1px] rounded-xl bg-black"></div>

      {/* Floating orbs - toned down on small screens */}
      <div className="hidden md:block absolute top-6 right-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="hidden md:block absolute bottom-6 left-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Skill Progress Reports</span>
          </h2>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300"
              aria-label="Edit skills"
            >
              <Edit className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Edit</span>
            </button>
          ) : (
            <div className="w-auto flex flex-row gap-2">
              <button
                onClick={addNewSkill}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 w-full sm:w-auto bg-gray-900/50 border border-blue-500/50 rounded-lg transition-all duration-300"
                aria-label="Add skill"
              >
                <Plus className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">Add</span>
              </button>

              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 w-full sm:w-auto bg-gray-900/50 border border-green-500/50 rounded-lg transition-all duration-300"
                aria-label="Save skills"
              >
                <Save className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Save</span>
              </button>

              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 w-full sm:w-auto bg-gray-900/50 border border-red-500/50 rounded-lg transition-all duration-300"
                aria-label="Cancel editing"
              >
                <X className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentData.map((skill, index) => (
            <div
              key={skill.id}
              className="relative bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_0_14px_rgba(0,255,255,0.06)] backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {isEditing && (
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="absolute top-3 right-3 p-2 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-200 z-20"
                  aria-label={`Remove ${skill.name}`}
                  title="Remove skill"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              )}

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={skill.name}
                        onChange={e => updateSkill(skill.id, "name", e.target.value)}
                        className="text-lg font-bold text-white mb-2 bg-gray-900/50 border border-gray-700 rounded px-2 py-2 w-full focus:border-cyan-400 focus:outline-none"
                        placeholder="Skill name"
                      />
                    ) : (
                      <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                    )}

                    {isEditing ? (
                      <textarea
                        value={skill.description}
                        onChange={e => updateSkill(skill.id, "description", e.target.value)}
                        className="text-sm text-gray-300 bg-gray-900/50 border border-gray-700 rounded px-2 py-2 w-full focus:border-cyan-400 focus:outline-none resize-none"
                        rows={2}
                        placeholder="Short description"
                      />
                    ) : (
                      <p className="text-sm text-gray-400 mb-2">{skill.description}</p>
                    )}
                  </div>

                  <div className=" flex sm:flex-col flex-row gap-4 text-right  sm:w-28">
                    <div className="text-2xl flex flex-col font-bold text-white mb-1">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                        {skill.progress}%
                      </span>
                      <div className="text-xs text-gray-400">Proficiency</div>
                    </div>
                    

                    {/* Editing progress control */}
                    {isEditing && (
                      <div className="mt-3 flex items-center justify-end gap-2">
                        

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={skill.progress}
                          onChange={e =>
                            updateSkill(skill.id, "progress", Math.max(0, Math.min(100, parseInt(e.target.value || 0))))
                          }
                          className="w-14 h-8 bg-gray-900/50 border border-gray-700/50 rounded px-1 text-center text-sm"
                        />

                        
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 mb-2">
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700/50 relative">
                    <div className="absolute inset-0 opacity-10 rounded-full" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0))" }} />
                    <div
                      className={`relative h-2 rounded-full bg-gradient-to-r ${skill.neonColor} transition-all duration-700 ease-out`}
                      style={{
                        width: `${skill.progress}%`,
                        boxShadow: `0 0 10px ${skill.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`
                      }}
                    />
                    <div
                      className={`absolute top-0 h-2 w-3 bg-gradient-to-r ${skill.neonColor} blur-md opacity-60 rounded-full transition-all duration-700 ease-out`}
                      style={{ left: `${Math.max(0, skill.progress - 3)}%` }}
                    />
                  </div>

                  {/* percentage indicator on small screens */}
                  <div className="mt-2 text-xs text-cyan-400 font-semibold">{skill.progress}%</div>
                </div>

                {/* Action buttons / links */}
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  {isEditing ? (
                    <>
                      <input
                        type="url"
                        value={skill.reportUrl}
                        onChange={e => updateSkill(skill.id, "reportUrl", e.target.value)}
                        placeholder="Report URL"
                        className="flex-1 bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                      />
                      <button
                        onClick={() => updateSkill(skill.id, "reportUrl", "#")}
                        className="px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded text-sm"
                        aria-label="Clear URL"
                      >
                        Clear
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href={skill.reportUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600/80 border border-cyan-500/50 hover:border-cyan-400 text-white text-sm rounded-lg transition-all"
                        title="View progress report"
                      >
                        <Download className="w-4 h-4" />
                        <span>View Progress</span>
                      </a>
                      <a
                        href={skill.reportUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/80 border border-gray-600/50 hover:bg-purple-600/80 text-white text-sm rounded-lg transition-all"
                        title="Open external link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note card */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-lg blur-sm" />
          <div className="relative bg-black/80 border border-cyan-500/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-cyan-300 text-sm leading-relaxed">
              <span className="font-bold text-cyan-400">Note:</span>{" "}
              <span className="text-gray-200">
                These progress reports showcase learning progress — add report links and update progress to reflect your current proficiency.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
