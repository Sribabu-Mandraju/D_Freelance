import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Building, Calendar, Code, Globe, FileText } from 'lucide-react';

const FormStep = ({ step, formData, onInputChange }) => {
  const inputClasses = "w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 bg-gray-700/50 hover:bg-gray-700 text-white placeholder-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-200 mb-2";

  const InputField = ({ icon: Icon, label, name, type = "text", placeholder, required = true }) => (
    <div className="space-y-2">
      <label className={labelClasses}>
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-cyan-400" />
          <span>{label}</span>
          {required && <span className="text-pink-400">*</span>}
        </div>
      </label>
      {type === 'textarea' ? (
        <textarea
          value={formData[name]}
          onChange={(e) => onInputChange(name, e.target.value)}
          placeholder={placeholder}
          className={`${inputClasses} resize-none h-32`}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={formData[name]}
          onChange={(e) => onInputChange(name, e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
        />
      )}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
              <p className="text-gray-300">Let's start with the basics about you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={User}
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
              />
              <InputField
                icon={User}
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
              />
              <InputField
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
                placeholder="your.email@example.com"
              />
              <InputField
                icon={Phone}
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="mt-6">
              <InputField
                icon={MapPin}
                label="Location"
                name="location"
                placeholder="City, State/Country"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Professional Details</h2>
              <p className="text-gray-300">Share your professional background and expertise</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={Briefcase}
                label="Job Title"
                name="jobTitle"
                placeholder="e.g., Senior Developer, Designer"
              />
              <InputField
                icon={Building}
                label="Company"
                name="company"
                placeholder="Current or previous company"
              />
              <InputField
                icon={Calendar}
                label="Years of Experience"
                name="experience"
                placeholder="e.g., 3+ years"
              />
              <InputField
                icon={Globe}
                label="Portfolio Website"
                name="portfolio"
                type="url"
                placeholder="https://yourportfolio.com"
                required={false}
              />
            </div>

            <div className="mt-6">
              <InputField
                icon={Code}
                label="Key Skills"
                name="skills"
                placeholder="e.g., React, Node.js, Python, Design, etc."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
                <FileText className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Final Details</h2>
              <p className="text-gray-300">Complete your portfolio with a personal bio</p>
            </div>

            <div>
              <InputField
                icon={FileText}
                label="Professional Bio"
                name="bio"
                type="textarea"
                placeholder="Write a brief description about yourself, your passion, and what makes you unique. This will help others understand who you are and what you bring to the table."
              />
            </div>

            {/* Summary Preview */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-xl border border-cyan-400/20 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Portfolio Preview</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-200">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-200">
                    {formData.jobTitle} {formData.company && `at ${formData.company}`}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-200">{formData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-200">{formData.location}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      {renderStep()}
    </div>
  );
};

export default FormStep;