"use client"

import { Mail, Phone, MapPin, Github, Linkedin, Globe, Twitter, MessageCircle } from "lucide-react"

export default function ContactInfo({ personalInfo }) {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: "#",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: personalInfo.github,
      color: "text-gray-400",
      bgColor: "bg-gray-400/10",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personalInfo.linkedin,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Globe,
      label: "Portfolio",
      href: personalInfo.portfolio,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: personalInfo.twitter,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Mail className="w-6 h-6 mr-2 text-blue-400" />
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactMethods.map((method) => {
            const IconComponent = method.icon
            return (
              <a
                key={method.label}
                href={method.href}
                className={`block p-6 ${method.bgColor} border border-gray-600 rounded-lg hover:border-gray-500 transition-all duration-200 hover:scale-105`}
              >
                <div className="text-center">
                  <div className={`inline-flex p-3 rounded-full ${method.bgColor} mb-4`}>
                    <IconComponent className={`w-6 h-6 ${method.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{method.label}</h3>
                  <p className="text-gray-300 text-sm break-all">{method.value}</p>
                </div>
              </a>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            I'm always excited to collaborate on Web3, DeFi, or full-stack projects. Whether it's a groundbreaking dApp
            or a scalable web application, let's create something extraordinary together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              Start a Conversation
            </a>
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              <Globe className="w-5 h-5" />
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8">
        <h2 className="text-xl font-bold text-white mb-6">🌐 Connect with Me</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((social) => {
            const IconComponent = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-3 p-4 ${social.bgColor} border border-gray-600 rounded-lg hover:border-gray-500 transition-all duration-200 hover:scale-105`}
              >
                <IconComponent className={`w-6 h-6 ${social.color}`} />
                <span className="text-sm font-medium text-white">{social.label}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Availability Status */}
      <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-600/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-white">Currently Available</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          I'm actively seeking new opportunities in Web3 development, smart contract auditing, and full-stack projects.
          Open to both freelance work and full-time positions. Let's discuss how we can work together!
        </p>
      </div>
    </div>
  )
}