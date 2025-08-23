import React from "react";
import { CheckCircle, Star, Mail, User, Code, Send } from "lucide-react";

const Step3ReviewSubmit = ({ 
  portfolioData, 
  isSubmitting, 
  submitMessage, 
  error, 
  onSubmit 
}) => {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-purple-400 fill-current" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Review Your Portfolio</h2>
        <p className="text-gray-300">Please review all information before submitting</p>
      </div>

      {/* Profile Image & Personal Info */}
      <div className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-6 rounded-xl border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <User className="w-5 h-5 text-purple-400 mr-2" />
          Personal Information
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          {portfolioData.heroSection.profileImage && (
            <div className="flex-shrink-0">
              <img
                src={portfolioData.heroSection.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/50 shadow-lg shadow-purple-500/20"
              />
            </div>
          )}
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-1">Name</label>
                <p className="text-white bg-gray-900/30 px-3 py-2 rounded-lg">
                  {portfolioData.heroSection.name || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-1">Thought Line</label>
                <p className="text-white bg-gray-900/30 px-3 py-2 rounded-lg">
                  {portfolioData.heroSection.thoughtLine || "Not provided"}
                </p>
              </div>
            </div>
            
            {portfolioData.heroSection.aboutMe && (
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-1">About Me</label>
                <p className="text-white bg-gray-900/30 px-3 py-2 rounded-lg">
                  {portfolioData.heroSection.aboutMe}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">Domains</label>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.heroSection.domains.filter(d => d.trim()).map((domain, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300 text-sm">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">Expertise</label>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.heroSection.expertise.filter(e => e.trim()).map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {portfolioData.heroSection.focusAreas.filter(f => f.trim()).length > 0 && (
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">Focus Areas</label>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.heroSection.focusAreas.filter(f => f.trim()).map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-300 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 p-6 rounded-xl border border-indigo-500/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Mail className="w-5 h-5 text-indigo-400 mr-2" />
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-indigo-300 text-sm font-medium mb-1">Email</label>
            <p className="text-white bg-gray-900/30 px-3 py-2 rounded-lg">
              {portfolioData.contactInfo.email || "Not provided"}
            </p>
          </div>
          <div>
            <label className="block text-indigo-300 text-sm font-medium mb-1">Phone</label>
            <p className="text-white bg-gray-900/30 px-3 py-2 rounded-lg">
              {portfolioData.contactInfo.phoneNumber || "Not provided"}
            </p>
          </div>
          <div>
            <label className="block text-indigo-300 text-sm font-medium mb-1">LinkedIn</label>
            <p className="text-white bg-gray-900/30 px-3 py-2 rounded-lg truncate">
              {portfolioData.contactInfo.linkedinProfile || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Current Status */}
      {portfolioData.currentStatus.filter(s => s.status?.trim()).length > 0 && (
        <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-6 rounded-xl border border-blue-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Code className="w-5 h-5 text-blue-400 mr-2" />
            Current Status
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.currentStatus.filter(s => s.status?.trim()).map((status, index) => (
              <div key={index} className="bg-gray-900/30 p-4 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{status.status}</span>
                  {status.isActive && (
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs bg-${status.color}-500/20 border border-${status.color}-500/30 text-${status.color}-300`}>
                  {status.color}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Highlights */}
      {portfolioData.techHighlights.filter(t => t.technology?.trim()).length > 0 && (
        <div className="bg-gradient-to-br from-violet-500/5 to-cyan-500/5 p-6 rounded-xl border border-violet-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Star className="w-5 h-5 text-violet-400 mr-2" />
            Tech Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioData.techHighlights.filter(t => t.technology?.trim()).map((tech, index) => (
              <div key={index} className="bg-gray-900/30 p-4 rounded-lg border border-violet-500/20">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{tech.technology}</h4>
                  {renderStars(tech.rating)}
                </div>
                {tech.description && (
                  <p className="text-gray-300 text-sm">{tech.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Section */}
      <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 p-6 rounded-xl border border-green-500/20">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Ready to Submit?</h3>
          <p className="text-gray-300">
            Once you submit, a verification code will be sent to your email address.
          </p>
          
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Sending Verification..." : "Send Verification Code"}
          </button>

          {submitMessage && (
            <p className={submitMessage.includes("Error") ? "text-red-400" : "text-green-400"}>
              {submitMessage}
            </p>
          )}
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>

      {/* Data Summary */}
      <div className="bg-gradient-to-br from-gray-500/5 to-slate-500/5 p-4 rounded-xl border border-gray-500/20">
        <details className="group">
          <summary className="cursor-pointer text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
            <span className="transform group-open:rotate-90 transition-transform duration-200">▶</span>
            View Raw Data (for debugging)
          </summary>
          <pre className="mt-4 p-4 bg-gray-900/50 rounded-lg text-xs text-gray-400 overflow-auto max-h-60">
            {JSON.stringify(portfolioData, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default Step3ReviewSubmit;
