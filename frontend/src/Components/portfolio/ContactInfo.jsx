"use client"
import { useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter, MessageCircle, Edit, Save, X, Plus, Trash2 } from 'lucide-react'

const initialContactMethods = [
  {
    id: 1,
    icon: Mail,
    label: "Email",
    value: "",
    href: "",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    neonColor: "from-red-400 to-pink-400",
    glowColor: "rgba(239, 68, 68, 0.5)",
  },
  {
    id: 2,
    icon: Phone,
    label: "Phone",
    value: "",
    href: "",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    neonColor: "from-green-400 to-emerald-400",
    glowColor: "rgba(34, 197, 94, 0.5)",
  },
  {
    id: 3,
    icon: MapPin,
    label: "Location",
    value: "",
    href: "#",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    neonColor: "from-blue-400 to-cyan-400",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
]

const initialSocialLinks = [
  {
    id: 1,
    icon: Github,
    label: "GitHub",
    href: "",
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    neonColor: "from-gray-400 to-slate-300",
    glowColor: "rgba(156, 163, 175, 0.5)",
  },
  {
    id: 2,
    icon: Linkedin,
    label: "LinkedIn",
    href: "",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    neonColor: "from-blue-500 to-indigo-400",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    id: 3,
    icon: Globe,
    label: "Portfolio",
    href: "",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    neonColor: "from-purple-400 to-pink-400",
    glowColor: "rgba(147, 51, 234, 0.5)",
  },
  {
    id: 4,
    icon: Twitter,
    label: "Twitter",
    href: "",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    neonColor: "from-cyan-400 to-blue-400",
    glowColor: "rgba(6, 182, 212, 0.5)",
  },
]

const colorOptions = [
  { name: "Red-Pink", color: "text-red-400", neonColor: "from-red-400 to-pink-400", glowColor: "rgba(239, 68, 68, 0.5)" },
  { name: "Green-Emerald", color: "text-green-400", neonColor: "from-green-400 to-emerald-400", glowColor: "rgba(34, 197, 94, 0.5)" },
  { name: "Blue-Cyan", color: "text-blue-400", neonColor: "from-blue-400 to-cyan-400", glowColor: "rgba(59, 130, 246, 0.5)" },
  { name: "Purple-Pink", color: "text-purple-400", neonColor: "from-purple-400 to-pink-400", glowColor: "rgba(147, 51, 234, 0.5)" },
  { name: "Cyan-Blue", color: "text-cyan-400", neonColor: "from-cyan-400 to-blue-400", glowColor: "rgba(6, 182, 212, 0.5)" },
  { name: "Gray-Slate", color: "text-gray-400", neonColor: "from-gray-400 to-slate-300", glowColor: "rgba(156, 163, 175, 0.5)" },
]

export default function ContactInfo({ personalInfo, onSave }) {
  const [isEditingContact, setIsEditingContact] = useState(false)
  const [isEditingSocial, setIsEditingSocial] = useState(false)
  const [isEditingAvailability, setIsEditingAvailability] = useState(false)
  
  // Initialize contact methods with personal info
  const [contactMethods, setContactMethods] = useState(() => 
    initialContactMethods.map(method => ({
      ...method,
      value: method.label === "Email" ? personalInfo.email : 
             method.label === "Phone" ? personalInfo.phone :
             method.label === "Location" ? personalInfo.location : method.value,
      href: method.label === "Email" ? `mailto:${personalInfo.email}` :
            method.label === "Phone" ? `tel:${personalInfo.phone}` : method.href
    }))
  )
  
  // Initialize social links with personal info
  const [socialLinks, setSocialLinks] = useState(() =>
    initialSocialLinks.map(social => ({
      ...social,
      href: social.label === "GitHub" ? personalInfo.github :
            social.label === "LinkedIn" ? personalInfo.linkedin :
            social.label === "Twitter" ? personalInfo.twitter :
            social.label === "Portfolio" ? personalInfo.portfolio || "#" : social.href
    }))
  )
  
  const [availabilityStatus, setAvailabilityStatus] = useState({
    isAvailable: true,
    title: "Currently Available",
    description: "I'm actively seeking new opportunities in Web3 development, smart contract auditing, and full-stack projects. Open to both freelance work and full-time positions. Let's discuss how we can work together!"
  })
  
  // Edit states
  const [editContactMethods, setEditContactMethods] = useState(contactMethods)
  const [editSocialLinks, setEditSocialLinks] = useState(socialLinks)
  const [editAvailability, setEditAvailability] = useState(availabilityStatus)

  // Contact methods editing functions
  const handleEditContact = () => {
    setIsEditingContact(true)
    setEditContactMethods([...contactMethods])
  }

  const handleSaveContact = () => {
    setContactMethods(editContactMethods)
    setIsEditingContact(false)
    if (onSave) {
      onSave({ contactMethods: editContactMethods })
    }
  }

  const handleCancelContact = () => {
    setEditContactMethods([...contactMethods])
    setIsEditingContact(false)
  }

  const updateContactMethod = (id, field, value) => {
    setEditContactMethods(prev => prev.map(method => 
      method.id === id ? { 
        ...method, 
        [field]: value,
        ...(field === 'value' && method.label === 'Email' ? { href: `mailto:${value}` } : {}),
        ...(field === 'value' && method.label === 'Phone' ? { href: `tel:${value}` } : {})
      } : method
    ))
  }

  const updateContactColor = (id, colorOption) => {
    setEditContactMethods(prev => prev.map(method => 
      method.id === id ? { 
        ...method, 
        color: colorOption.color,
        neonColor: colorOption.neonColor,
        glowColor: colorOption.glowColor
      } : method
    ))
  }

  const addNewContactMethod = () => {
    const newMethod = {
      id: Date.now(),
      icon: Mail,
      label: "New Contact",
      value: "Contact info",
      href: "#",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      neonColor: "from-blue-400 to-cyan-400",
      glowColor: "rgba(59, 130, 246, 0.5)",
    }
    setEditContactMethods([...editContactMethods, newMethod])
  }

  const removeContactMethod = (id) => {
    setEditContactMethods(prev => prev.filter(method => method.id !== id))
  }

  // Social links editing functions
  const handleEditSocial = () => {
    setIsEditingSocial(true)
    setEditSocialLinks([...socialLinks])
  }

  const handleSaveSocial = () => {
    setSocialLinks(editSocialLinks)
    setIsEditingSocial(false)
    if (onSave) {
      onSave({ socialLinks: editSocialLinks })
    }
  }

  const handleCancelSocial = () => {
    setEditSocialLinks([...socialLinks])
    setIsEditingSocial(false)
  }

  const updateSocialLink = (id, field, value) => {
    setEditSocialLinks(prev => prev.map(social => 
      social.id === id ? { ...social, [field]: value } : social
    ))
  }

  const updateSocialColor = (id, colorOption) => {
    setEditSocialLinks(prev => prev.map(social => 
      social.id === id ? { 
        ...social, 
        color: colorOption.color,
        neonColor: colorOption.neonColor,
        glowColor: colorOption.glowColor
      } : social
    ))
  }

  const addNewSocialLink = () => {
    const newSocial = {
      id: Date.now(),
      icon: Globe,
      label: "New Social",
      href: "https://",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      neonColor: "from-purple-400 to-pink-400",
      glowColor: "rgba(147, 51, 234, 0.5)",
    }
    setEditSocialLinks([...editSocialLinks, newSocial])
  }

  const removeSocialLink = (id) => {
    setEditSocialLinks(prev => prev.filter(social => social.id !== id))
  }

  // Availability editing functions
  const handleEditAvailability = () => {
    setIsEditingAvailability(true)
    setEditAvailability({ ...availabilityStatus })
  }

  const handleSaveAvailability = () => {
    setAvailabilityStatus(editAvailability)
    setIsEditingAvailability(false)
    if (onSave) {
      onSave({ availability: editAvailability })
    }
  }

  const handleCancelAvailability = () => {
    setEditAvailability({ ...availabilityStatus })
    setIsEditingAvailability(false)
  }

  const updateAvailability = (field, value) => {
    setEditAvailability(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="relative bg-black border border-cyan-500/30 rounded-xl p-6 lg:p-8 overflow-hidden shadow-2xl shadow-cyan-500/20">
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

        {/* Floating orbs */}
        <div className="absolute top-6 right-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Section Header with Edit Button */}
          <div className="flex sm:flex-row flex-col justify-between gap-2 mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center group">
              <Mail className="w-6 h-6 mr-3 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                Get In Touch
              </span>
            </h2>
            
            {!isEditingContact ? (
              <button
                onClick={handleEditContact}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] group"
              >
                <Edit className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">Edit</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={addNewContactMethod}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group"
                >
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">Add</span>
                </button>
                <button
                  onClick={handleSaveContact}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
                >
                  <Save className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Save</span>
                </button>
                <button
                  onClick={handleCancelContact}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
                >
                  <X className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">Cancel</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {(isEditingContact ? editContactMethods : contactMethods).map((method, index) => {
              const IconComponent = method.icon
              return (
                <div
                  key={method.id}
                  className="relative block p-6 bg-gray-900/50 border border-gray-700/50 rounded-lg hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-sm group/card overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Delete button when editing */}
                  {isEditingContact && (
                    <button
                      onClick={() => removeContactMethod(method.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300 z-20"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  )}

                  {/* Card background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${method.neonColor} opacity-5 rounded-lg group-hover/card:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10 text-center">
                    <div className={`inline-flex p-3 rounded-full bg-gray-800/60 border border-gray-600/50 mb-4 group-hover/card:border-cyan-500/50 transition-all duration-300`}>
                      <IconComponent className={`w-6 h-6 ${method.color} drop-shadow-[0_0_5px_${method.glowColor}] group-hover/card:drop-shadow-[0_0_10px_${method.glowColor}] transition-all duration-300`} />
                    </div>
                    
                    {/* Label */}
                    {isEditingContact ? (
                      <input
                        type="text"
                        value={method.label}
                        onChange={(e) => updateContactMethod(method.id, 'label', e.target.value)}
                        className="text-lg font-semibold text-white mb-2 bg-gray-900/50 border border-gray-700 rounded px-2 py-1 w-full text-center focus:border-cyan-400 focus:outline-none"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover/card:text-cyan-100 transition-colors duration-300">
                        {method.label}
                      </h3>
                    )}
                    
                    {/* Value */}
                    {isEditingContact ? (
                      <input
                        type="text"
                        value={method.value}
                        onChange={(e) => updateContactMethod(method.id, 'value', e.target.value)}
                        className="text-gray-300 text-sm bg-gray-900/50 border border-gray-700 rounded px-2 py-1 w-full text-center focus:border-cyan-400 focus:outline-none"
                      />
                    ) : (
                      <a
                        href={method.href}
                        className="text-gray-300 text-sm break-all group-hover/card:text-gray-200 transition-colors duration-300 hover:text-cyan-400"
                      >
                        {method.value}
                      </a>
                    )}
                    
                    
                    
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-300 mb-4 leading-relaxed">
              I'm always excited to collaborate on{' '}
              <span className="text-cyan-400 font-semibold drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]">Web3</span>,{' '}
              <span className="text-purple-400 font-semibold drop-shadow-[0_0_3px_rgba(147,51,234,0.5)]">DeFi</span>, or{' '}
              <span className="text-green-400 font-semibold drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]">full-stack</span> projects. 
              Whether it's a groundbreaking dApp or a scalable web application, let's create something extraordinary together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-600/80 border border-cyan-500/50 hover:bg-cyan-500/80 hover:border-cyan-400/70 text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-sm group/btn"
              >
                <MessageCircle className="w-5 h-5 group-hover/btn:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
                Start a Conversation
              </a>
              <a
                href={personalInfo.portfolio || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600/80 border border-purple-500/50 hover:bg-purple-500/80 hover:border-purple-400/70 text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] backdrop-blur-sm group/btn2"
              >
                <Globe className="w-5 h-5 group-hover/btn2:drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]" />
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="relative bg-black border border-purple-500/30 rounded-xl p-6 lg:p-8 overflow-hidden shadow-2xl shadow-purple-500/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>
        
        {/* Neon border glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-sm"></div>
        <div className="absolute inset-[1px] rounded-xl bg-black"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-6 right-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-20 h-20 bg-pink-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Section Header with Edit Button */}
          <div className="flex sm:flex-row flex-col justify-between gap-2  mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <span className="text-2xl mr-2">🌐</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_5px_rgba(147,51,234,0.5)]">
                Connect with Me
              </span>
            </h2>
            
            {!isEditingSocial ? (
              <button
                onClick={handleEditSocial}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-purple-500/50 hover:border-purple-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(147,51,234,0.3)] group"
              >
                <Edit className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-400">Edit</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={addNewSocialLink}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group"
                >
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">Add</span>
                </button>
                <button
                  onClick={handleSaveSocial}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
                >
                  <Save className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Save</span>
                </button>
                <button
                  onClick={handleCancelSocial}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
                >
                  <X className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">Cancel</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(isEditingSocial ? editSocialLinks : socialLinks).map((social, index) => {
              const IconComponent = social.icon
              return (
                <div
                  key={social.id}
                  className="relative flex flex-col items-center gap-3 p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] backdrop-blur-sm group/social overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Delete button when editing */}
                  {isEditingSocial && (
                    <button
                      onClick={() => removeSocialLink(social.id)}
                      className="absolute top-1 right-1 p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300 z-20"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  )}

                  {/* Card background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.neonColor} opacity-5 rounded-lg group-hover/social:opacity-15 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <IconComponent className={`w-6 h-6 ${social.color} drop-shadow-[0_0_5px_${social.glowColor}] group-hover/social:drop-shadow-[0_0_10px_${social.glowColor}] transition-all duration-300`} />
                    
                    {/* Label */}
                    {isEditingSocial ? (
                      <input
                        type="text"
                        value={social.label}
                        onChange={(e) => updateSocialLink(social.id, 'label', e.target.value)}
                        className="text-sm font-medium text-white bg-gray-900/50 border border-gray-700 rounded px-2 py-1 w-full text-center focus:border-purple-400 focus:outline-none"
                      />
                    ) : (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-white group-hover/social:text-purple-200 transition-colors duration-300 hover:text-purple-300"
                      >
                        {social.label}
                      </a>
                    )}
                    
                    {/* URL Input */}
                    {isEditingSocial && (
                      <div className="w-full space-y-2">
                        <input
                          type="url"
                          value={social.href}
                          onChange={(e) => updateSocialLink(social.id, 'href', e.target.value)}
                          placeholder="https://"
                          className="w-full text-xs bg-gray-900/50 border border-gray-700 rounded px-2 py-1 text-center text-gray-300 focus:border-purple-400 focus:outline-none"
                        />
                        
                        {/* Color Picker */}
                        
                        
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Availability Status */}
      <div className="relative bg-black border border-green-500/30 rounded-xl p-6 overflow-hidden shadow-2xl shadow-green-500/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-emerald-900/20 to-cyan-900/20 rounded-xl animate-pulse"></div>
        
        {/* Neon border glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-cyan-500/20 blur-sm"></div>
        <div className="absolute inset-[1px] rounded-xl bg-black"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>

        {/* Floating orb */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Section Header with Edit Button */}
          <div className="flex sm:flex-row flex-col gap-2 justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 ${(isEditingAvailability ? editAvailability : availabilityStatus).isAvailable ? 'bg-green-400 animate-pulse' : 'bg-red-400'} rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]`}></div>
              {isEditingAvailability ? (
                <input
                  type="text"
                  value={editAvailability.title}
                  onChange={(e) => updateAvailability('title', e.target.value)}
                  className="text-lg font-semibold bg-gray-900/50 border border-gray-700 rounded px-2 py-1 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 focus:border-green-400 focus:outline-none"
                />
              ) : (
                <h3 className="text-lg font-semibold text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">
                    {availabilityStatus.title}
                  </span>
                </h3>
              )}
            </div>
            
            {!isEditingAvailability ? (
              <button
                onClick={handleEditAvailability}
                className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
              >
                <Edit className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Edit</span>
              </button>
            ) : (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateAvailability('isAvailable', !editAvailability.isAvailable)}
                  className={`flex items-center gap-2 px-3 py-2 bg-gray-900/50 border ${editAvailability.isAvailable ? 'border-red-500/50 hover:border-red-400' : 'border-green-500/50 hover:border-green-400'} rounded-lg transition-all duration-300 group`}
                >
                  <span className={`text-sm ${editAvailability.isAvailable ? 'text-red-400' : 'text-green-400'}`}>
                    {editAvailability.isAvailable ? 'Set Unavailable' : 'Set Available'}
                  </span>
                </button>
                <button
                  onClick={handleSaveAvailability}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
                >
                  <Save className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Save</span>
                </button>
                <button
                  onClick={handleCancelAvailability}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
                >
                  <X className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">Cancel</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Description */}
          {isEditingAvailability ? (
            <textarea
              value={editAvailability.description}
              onChange={(e) => updateAvailability('description', e.target.value)}
              className="w-full text-gray-300 text-sm leading-relaxed bg-gray-900/50 border border-gray-700 rounded px-3 py-2 focus:border-green-400 focus:outline-none resize-none"
              rows="4"
            />
          ) : (
            <p className="text-gray-300 text-sm leading-relaxed">
              {availabilityStatus.description.split(' ').map((word, index) => {
                if (word.includes('Web3')) {
                  return <span key={index} className="text-cyan-400 font-semibold drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]">{word} </span>
                } else if (word.includes('smart') || word.includes('contract') || word.includes('auditing')) {
                  return <span key={index} className="text-purple-400 font-semibold drop-shadow-[0_0_3px_rgba(147,51,234,0.5)]">{word} </span>
                } else if (word.includes('full-stack')) {
                  return <span key={index} className="text-green-400 font-semibold drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]">{word} </span>
                }
                return word + ' '
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}


