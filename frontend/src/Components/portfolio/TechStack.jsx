import { useState } from 'react'
import { Code, Blocks, Globe, Smartphone, Edit, Save, X, Plus, Trash2 } from 'lucide-react'

const categoryIcons = {
  blockchain: Blocks,
  frontend: Globe,
  backend: Code,
  mobile: Smartphone,
}

const categoryTitles = {
  blockchain: "Blockchain & Web3",
  frontend: "Frontend Development",
  backend: "Backend & Database",
  mobile: "Mobile Development",
}

const categoryColors = {
  blockchain: {
    icon: "text-purple-400",
    gradient: "from-purple-500/60 to-pink-500/60",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/20",
    hoverBorder: "hover:border-purple-400/30"
  },
  frontend: {
    icon: "text-cyan-400",     
    gradient: "from-cyan-500/60 to-blue-500/60",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
    hoverBorder: "hover:border-cyan-400/30"
  },
  backend: {
    icon: "text-green-400",
    gradient: "from-green-500/60 to-emerald-500/60",     
    border: "border-green-500/20",
    glow: "shadow-green-500/20",
    hoverBorder: "hover:border-green-400/30"
  },
  mobile: {
    icon: "text-pink-400",
    gradient: "from-pink-500/60 to-rose-500/60",
    border: "border-pink-500/20",     
    glow: "shadow-pink-500/20",
    hoverBorder: "hover:border-pink-400/30"
  }
}

export default function TechStack({ techStack, onSave }) {
  const [editingCategory, setEditingCategory] = useState(null)
  const [editData, setEditData] = useState({})

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setEditData({ ...techStack })
  }

  const handleSaveCategory = (category) => {
    if (onSave) {
      onSave(editData)
    }
    setEditingCategory(null)
  }

  const handleCancelCategory = () => {
    setEditData({ ...techStack })
    setEditingCategory(null)
  }

  const updateSkill = (category, index, field, value) => {
    setEditData(prev => ({
      ...prev,
      [category]: prev[category].map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const addNewSkill = (category) => {
    const newSkill = {
      name: "New Skill",
      level: 50,
      color: "text-gray-400"
    }
    setEditData(prev => ({
      ...prev,
      [category]: [...prev[category], newSkill]
    }))
  }

  const removeSkill = (category, index) => {
    setEditData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }))
  }

  const adjustSkillLevel = (category, index, increment) => {
    setEditData(prev => ({
      ...prev,
      [category]: prev[category].map((skill, i) => 
        i === index ? { 
          ...skill, 
          level: Math.max(0, Math.min(100, skill.level + increment))
        } : skill
      )
    }))
  }

  return (
    <div className="space-y-6">
      {Object.entries(techStack).map(([category, skills]) => {
        const IconComponent = categoryIcons[category]
        const colors = categoryColors[category]
        const isEditing = editingCategory === category
        const currentSkills = isEditing ? editData[category] ?? [] : skills

        return (
          <div 
            key={category}
            className={`relative bg-black border ${colors.border} rounded-xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-2xl ${colors.glow} ${colors.hoverBorder} transition-all duration-300 group`}
          >
           

            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon} drop-shadow-[0_0_5px_rgba(0,255,255,0.25)]`} />
                  <span className="text-sm sm:text-base">{categoryTitles[category]}</span>
                </h2>

                {!isEditing ? (
                  <button
                    onClick={() => handleEditCategory(category)}
                    className={`flex items-center gap-2 px-3 py-2 bg-gray-900/50 border ${colors.border} hover:border-opacity-60 rounded-lg transition-all duration-300 hover:shadow-[0_0_8px_rgba(0,0,0,0.5)] w-full sm:w-auto justify-center`}
                  >
                    <Edit className={`w-4 h-4 ${colors.icon}`} />
                    <span className={`text-sm ${colors.icon}`}>Edit</span>
                  </button>
                ) : (
                  <div className="flex w-full sm:w-auto gap-2">
                    <button
                      onClick={() => addNewSkill(category)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-blue-400">Add</span>
                    </button>
                    <button
                      onClick={() => handleSaveCategory(category)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300"
                    >
                      <Save className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Save</span>
                    </button>
                    <button
                      onClick={handleCancelCategory}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300"
                    >
                      <X className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-400">Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Skills Grid: single column on mobile, two columns on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSkills.map((skill, index) => (
                  <div 
                    key={`${skill.name}-${index}`}
                    className="relative space-y-3 p-3 sm:p-4 bg-gray-900/30 border border-gray-700/50 rounded-lg backdrop-blur-sm hover:border-gray-600/70 transition-all duration-300 group/skill"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    {/* Delete button when editing */}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(category, index)}
                        className="absolute top-2 right-2 p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300 z-10"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(category, index, 'name', e.target.value)}
                            className="w-full text-white font-medium bg-gray-900/50 border border-gray-700 rounded px-2 py-1 focus:border-cyan-400 focus:outline-none"
                          />
                        ) : (
                          <span className="text-white font-medium truncate">{skill.name}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => updateSkill(category, index, 'level', parseInt(e.target.value) || 0)}
                            className={`text-sm font-semibold ${colors.icon} bg-gray-900/50 border w-20 sm:w-24 border-gray-700 rounded px-2 py-1 text-center focus:border-cyan-400 focus:outline-none`}
                          />
                        ) : (
                          <span className={`text-sm font-semibold ${colors.icon}`}>{skill.level}%</span>
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full">
                      <div className="relative w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700/50">
                        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-10 rounded-full`}></div>

                        <div
                          className={`relative h-3 rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-700 ease-out`}
                          style={{
                            width: `${skill.level}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                        </div>

                        <div 
                          className={`absolute top-0 h-3 w-2 bg-gradient-to-r ${colors.gradient} blur-sm opacity-60 rounded-full transition-all duration-700 ease-out`}
                          style={{ left: `${Math.max(0, skill.level - 2)}%` }}
                        />
                      </div>

                      {/* Small dot indicators clickable when editing */}
                      <div className="flex justify-end space-x-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              i < Math.floor(skill.level / 20)
                                ? `bg-gradient-to-r ${colors.gradient} shadow-[0_0_3px_rgba(0,255,255,0.25)]`
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                            onClick={() => isEditing && updateSkill(category, index, 'level', (i + 1) * 20)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* small floating accents (responsive) */}
            {/* <div className={`absolute top-4 right-6 w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full animate-ping opacity-0 pointer-events-none`}></div>
            <div className={`absolute top-8 right-10 w-0.5 h-0.5 bg-gradient-to-r ${colors.gradient} rounded-full animate-pulse opacity-10 delay-300 pointer-events-none`}></div>
            <div className={`absolute bottom-4 left-6 w-1.5 h-1.5 bg-gradient-to-r ${colors.gradient} rounded-full animate-bounce opacity-10 delay-700 pointer-events-none`}></div> */}
          </div>
        )
      })}
    </div>
  )
}
