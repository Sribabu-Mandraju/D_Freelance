"use client"

import { useState } from "react"
import { Code, Edit, Save, X, Plus, Trash2 } from "lucide-react"

function TechHighlights({ techHighlights, setTechHighlights }) {
  const [isEditingTech, setIsEditingTech] = useState(false)
  const [editTech, setEditTech] = useState(techHighlights)

  const handleEditTech = () => {
    setIsEditingTech(true)
    setEditTech([...techHighlights])
  }

  const handleSaveTech = () => {
    setTechHighlights(editTech)
    setIsEditingTech(false)
  }

  const handleCancelTech = () => {
    setEditTech([...techHighlights])
    setIsEditingTech(false)
  }

  const updateTech = (index, field, value) => {
    setEditTech((prev) => prev.map((tech, i) => (i === index ? { ...tech, [field]: value } : tech)))
  }

  const addNewTech = () => {
    const newTech = { name: "New Tech", level: 3 }
    setEditTech([...editTech, newTech])
  }

  const removeTech = (index) => {
    setEditTech((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

      {/* Section Header with Edit Button */}
      <div className="flex flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center">
          <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
            <Code className="w-5 h-5 text-cyan-400" />
          </div>
          Tech Highlights
        </h3>

        {!isEditingTech ? (
          <button
            onClick={handleEditTech}
            className="p-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] group w-auto justify-center"
          >
            <Edit className="w-4 h-4 text-cyan-400" />
          </button>
        ) : (
          <div className="flex w-auto gap-1">
            <button
              onClick={addNewTech}
              className="flex sm:flex-none p-2 bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group"
            >
              <Plus className="w-2 h-2 text-blue-400" />
            </button>
            <button
              onClick={handleSaveTech}
              className="flex sm:flex-none p-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
            >
              <Save className="w-2 h-2 text-green-400" />
            </button>
            <button
              onClick={handleCancelTech}
              className="flex sm:flex-none p-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
            >
              <X className="w-2 h-2 text-red-400" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {(isEditingTech ? editTech : techHighlights).map((tech, index) => (
          <div
            key={index}
            className="flex flex-row w-full items-center justify-between p-2 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-700/30 relative"
          >
            {isEditingTech ? (
              <input
                type="text"
                value={tech.name}
                onChange={(e) => updateTech(index, "name", e.target.value)}
                className="text-sm text-gray-300 bg-transparent border-none w-[60%] focus:outline-none"
              />
            ) : (
              <span className="text-sm text-gray-300">{tech.name}</span>
            )}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full cursor-pointer ${i < tech.level ? "bg-cyan-400" : "bg-gray-600"}`}
                  onClick={() => isEditingTech && updateTech(index, "level", i + 1)}
                />
              ))}
            </div>
            {isEditingTech && (
              <button
                onClick={() => removeTech(index)}
                className="p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechHighlights
