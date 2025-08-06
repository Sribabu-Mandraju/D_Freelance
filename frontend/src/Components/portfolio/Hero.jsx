import { useState } from 'react'
import { MapPin, Mail, Phone, Github, Linkedin, Globe, Twitter, Edit, Save, X } from 'lucide-react'
import { FaXTwitter } from "react-icons/fa6"

export default function Hero({ personalInfo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentData, setCurrentData] = useState(personalInfo)
  const [editData, setEditData] = useState(personalInfo)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(currentData)
  }

  const handleSave = () => {
    // Update the displayed data with edited data
    setCurrentData(editData)
    // You can add your save logic here (API call, localStorage, etc.)
    console.log('Saving data:', editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(currentData)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="mb-8">
      <div className="relative bg-black border border-cyan-500/30 rounded-xl p-6 lg:p-8 text-white overflow-hidden shadow-2xl shadow-cyan-500/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-cyan-900/20 to-blue-900/20 rounded-xl animate-pulse"></div>
                
        {/* Neon border glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
        <div className="absolute inset-[1px] rounded-xl bg-black"></div>
                
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
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

        {/* Edit/Save Controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:bg-cyan-900/20 group"
            >
              <Edit className="w-4 h-4 text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
              <span className="text-sm text-cyan-400">Edit</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:bg-green-900/20 group"
              >
                <Save className="w-4 h-4 text-green-400 group-hover:drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                <span className="text-sm text-green-400">Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:bg-red-900/20 group"
              >
                <X className="w-4 h-4 text-red-400 group-hover:drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                <span className="text-sm text-red-400">Cancel</span>
              </button>
            </>
          )}
        </div>
                
        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Info */}
            <div className="flex flex-col">
              {/* Name with neon glow */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 relative">
                {!isEditing ? (
                  <>
                    <span className="bg-clip-text w-auto text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 ">
                      {currentData.name}
                    </span>
                    <div className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-sm opacity-20">
                      {currentData.name}
                    </div>
                  </>
                ) : (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-gray-900/50 border border-cyan-500/50 rounded-lg px-3 py-2 text-cyan-400 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] w-full"
                  />
                )}
              </h1>
                            
              {/* Title with glow */}
              <div className="text-md lg:text-xl text-cyan-300 mb-4 drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
                {!isEditing ? (
                  <p>{currentData.title}</p>
                ) : (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-gray-900/50 border  border-cyan-500/50 rounded-lg px-3 py-2 text-cyan-300 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] w-full"
                  />
                )}
              </div>
                            
              {/* Contact Info with neon accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group">
                  <Mail className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                  {!isEditing ? (
                    <span className="text-sm">{currentData.email}</span>
                  ) : (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-900/50 border border-gray-700 rounded px-2 py-1 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none flex-1"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group">
                  <Phone className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                  {!isEditing ? (
                    <span className="text-sm">{currentData.phone}</span>
                  ) : (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-gray-900/50 border border-gray-700 rounded px-2 py-1 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none flex-1"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group">
                  <MapPin className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                  {!isEditing ? (
                    <span className="text-sm">{currentData.location}</span>
                  ) : (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-gray-900/50 border border-gray-700 rounded px-2 py-1 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none flex-1"
                    />
                  )}
                </div>
              </div>
                            
              {/* Social Links with neon hover effects */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-700 hover:border-purple-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:bg-purple-900/20 group">
                  <Github className="w-4 h-4 text-white group-hover:text-purple-400 group-hover:drop-shadow-[0_0_5px_rgba(147,51,234,0.5)]" />
                  {!isEditing ? (
                    <a
                      href={currentData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm group-hover:text-purple-400"
                    >
                      GitHub
                    </a>
                  ) : (
                    <input
                      type="url"
                      value={editData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      placeholder="GitHub URL"
                      className="bg-transparent border-none text-sm text-white placeholder-gray-500 focus:outline-none w-24"
                    />
                  )}
                </div>
                                
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-700 hover:border-blue-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-900/20 group">
                  <Linkedin className="w-4 h-4 text-white group-hover:text-blue-400 group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                  {!isEditing ? (
                    <a
                      href={currentData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm group-hover:text-blue-400"
                    >
                      LinkedIn
                    </a>
                  ) : (
                    <input
                      type="url"
                      value={editData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      placeholder="LinkedIn URL"
                      className="bg-transparent border-none text-sm text-white placeholder-gray-500 focus:outline-none w-24"
                    />
                  )}
                </div>
                                
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-700 hover:border-cyan-500 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:bg-cyan-900/20 group">
                  <FaXTwitter className="w-4 h-4 text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                  {!isEditing ? (
                    <a
                      href={currentData.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm group-hover:text-cyan-400"
                    >
                      Twitter
                    </a>
                  ) : (
                    <input
                      type="url"
                      value={editData.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      placeholder="Twitter URL"
                      className="bg-transparent border-none text-sm text-white placeholder-gray-500 focus:outline-none w-24"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
                    
          {/* Mission Statement with neon border */}
          <div className="mt-6 relative">
            {/* Neon border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-lg blur-sm"></div>
            <div className="relative bg-black/80 border border-cyan-500/50 rounded-lg p-4 backdrop-blur-sm hover:border-cyan-400/70 transition-all duration-300">
              <div className="text-gray-300 leading-relaxed">
                <span className="text-cyan-400 font-semibold drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                  Mission:
                </span>{' '}
                {!isEditing ? (
                  <span className="text-gray-200">
                    {currentData.mission}
                  </span>
                ) : (
                  <textarea
                    value={editData.mission}
                    onChange={(e) => handleInputChange('mission', e.target.value)}
                    className="bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-gray-200 focus:border-cyan-400 focus:outline-none w-full mt-2 resize-none"
                    rows="3"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
