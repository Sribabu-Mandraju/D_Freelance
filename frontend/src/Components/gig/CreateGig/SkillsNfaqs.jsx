"use client";

import { X, Plus, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function SkillsNfaqs({
  formData,
  setFormData,
  validationErrors,
}) {
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newBadge, setNewBadge] = useState("");

  const getFieldError = (field) => {
    return validationErrors[field];
  };

  const addFaq = () => {
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      const currentFaqs = formData.faqs || [];
      const updatedFormData = {
        ...formData,
        faqs: [
          ...currentFaqs,
          { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() },
        ],
      };

      setFormData(updatedFormData);

      setNewFaqQuestion("");
      setNewFaqAnswer("");
    }
  };

  const removeFaq = (indexToRemove) => {
    const currentFaqs = formData.faqs || [];
    const updatedFormData = {
      ...formData,
      faqs: currentFaqs.filter((_, index) => index !== indexToRemove),
    };

    setFormData(updatedFormData);
  };

  const addTag = () => {
    if (newTag.trim()) {
      const updatedFormData = {
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()],
      };
      setFormData(updatedFormData);
      setNewTag("");
    }
  };

  const removeTag = (indexToRemove) => {
    const updatedFormData = {
      ...formData,
      tags: (formData.tags || []).filter((_, index) => index !== indexToRemove),
    };
    setFormData(updatedFormData);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedFormData = {
        ...formData,
        skills: [...(formData.skills || []), newSkill.trim()],
      };
      setFormData(updatedFormData);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    const updatedFormData = {
      ...formData,
      skills: (formData.skills || []).filter(
        (_, index) => index !== indexToRemove
      ),
    };
    setFormData(updatedFormData);
  };

  const addBadge = () => {
    if (newBadge.trim()) {
      const updatedFormData = {
        ...formData,
        badges: [...(formData.badges || []), newBadge.trim()],
      };
      setFormData(updatedFormData);
      setNewBadge("");
    }
  };

  const removeBadge = (indexToRemove) => {
    const updatedFormData = {
      ...formData,
      badges: (formData.badges || []).filter(
        (_, index) => index !== indexToRemove
      ),
    };
    setFormData(updatedFormData);
  };

  const renderField = (
    label,
    field,
    type = "text",
    placeholder = "",
    required = false
  ) => {
    const error = getFieldError(field);

    return (
      <div>
        <label className="block text-sm font-medium text-cyan-300 mb-2 tracking-wide">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            value={formData[field] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            placeholder={placeholder}
            rows={4}
            className={`w-full px-4 py-3 bg-gray-900/80 border rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 shadow-lg resize-none ${
              error
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-400/50"
                : "border-gray-700/50 focus:ring-cyan-500/50 focus:border-cyan-400/50 hover:border-cyan-500/30 focus:shadow-cyan-500/20"
            }`}
            required={required}
          />
        ) : (
          <input
            type={type}
            value={formData[field] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            placeholder={placeholder}
            className={`w-full px-4 py-3 bg-gray-900/80 border rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 shadow-lg ${
              error
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-400/50"
                : "border-gray-700/50 focus:ring-cyan-500/50 focus:border-cyan-400/50 hover:border-cyan-500/30 focus:shadow-cyan-500/20"
            }`}
            required={required}
          />
        )}
        {error && (
          <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* About Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            About Your Service
          </h2>
          <p className="text-gray-400">
            Tell clients more about what you offer
          </p>
        </div>

        <div className="col-span-full">
          {renderField(
            "About",
            "about",
            "textarea",
            "Describe your service, experience, and what makes you unique..."
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Skills & Expertise
          </h2>
          <p className="text-gray-400">
            List your technical skills and competencies
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g., React, Node.js, Photoshop)"
              className="flex-1 px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
            />
            <button
              onClick={addSkill}
              disabled={!newSkill.trim()}
              className="px-4 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {formData.skills && formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 px-3 py-2 rounded-lg"
                >
                  <span className="text-sm">{skill}</span>
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-cyan-400 hover:text-red-400 transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Tags</h2>
          <p className="text-gray-400">
            Add relevant tags to help clients find your gig
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag (e.g., web design, logo, branding)"
              className="flex-1 px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
            />
            <button
              onClick={addTag}
              disabled={!newTag.trim()}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 px-3 py-2 rounded-lg"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    onClick={() => removeTag(index)}
                    className="text-purple-400 hover:text-red-400 transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Badges & Certifications
          </h2>
          <p className="text-gray-400">
            Add any professional certifications or achievements
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={newBadge}
              onChange={(e) => setNewBadge(e.target.value)}
              placeholder="Add a badge (e.g., AWS Certified, Google Developer)"
              className="flex-1 px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
            />
            <button
              onClick={addBadge}
              disabled={!newBadge.trim()}
              className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {formData.badges && formData.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 px-3 py-2 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{badge}</span>
                  <button
                    onClick={() => removeBadge(index)}
                    className="text-emerald-400 hover:text-red-400 transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Help clients by answering common questions
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              type="text"
              value={newFaqQuestion}
              onChange={(e) => setNewFaqQuestion(e.target.value)}
              placeholder="Question (e.g., What's included in the basic package?)"
              className="px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
            />
            <input
              type="text"
              value={newFaqAnswer}
              onChange={(e) => setNewFaqAnswer(e.target.value)}
              placeholder="Answer (e.g., Basic package includes...)"
              className="px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
            />
          </div>

          <button
            onClick={addFaq}
            disabled={!newFaqQuestion.trim() || !newFaqAnswer.trim()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>

          {formData.faqs && formData.faqs.length > 0 && (
            <div className="space-y-4">
              {formData.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-cyan-300 text-sm">
                      Q: {faq.question}
                    </h4>
                    <button
                      onClick={() => removeFaq(index)}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Additional Fields Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Additional Information
          </h2>
          <p className="text-gray-400">Optional details to enhance your gig</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderField(
            "Location",
            "location",
            "text",
            "e.g., New York, Remote, Worldwide"
          )}
          {renderField(
            "Response Time",
            "responseTime",
            "text",
            "e.g., Within 2 hours, Same day"
          )}
          {renderField("Success Rate (%)", "successRate", "number", "e.g., 95")}
          {renderField("Projects Completed", "projects", "number", "e.g., 50")}
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-cyan-300 mb-2 tracking-wide">
            Status
          </label>
          <select
            value={formData.status || "Available"}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>
    </div>
  );
}
