"use client";

import { X, Plus } from "lucide-react";
import { useState } from "react";

export default function SkillsNfaqs({ formData, setFormData }) {
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newBadge, setNewBadge] = useState("");

  const addFaq = () => {
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      const currentFaqs = formData.faqs || []; // Default to empty array if undefined
      const updatedFormData = {
        ...formData,
        faqs: [...currentFaqs, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }],
      };
      console.log("Before addFaq, formData.faqs:", formData.faqs);
      console.log("Adding FAQ, updatedFormData:", updatedFormData);
      setFormData(updatedFormData);
      console.log("After addFaq, expected formData.faqs:", updatedFormData.faqs);
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
    console.log("Before removeFaq, formData.faqs:", formData.faqs);
    console.log("Removing FAQ at index", indexToRemove, "updatedFormData:", updatedFormData);
    setFormData(updatedFormData);
    console.log("After removeFaq, expected formData.faqs:", updatedFormData.faqs);
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
      skills: (formData.skills || []).filter((_, index) => index !== indexToRemove),
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
      badges: (formData.badges || []).filter((_, index) => index !== indexToRemove),
    };
    setFormData(updatedFormData);
  };

  return (
    <div className="space-y-8 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text mb-6 text-center drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
        Additional Details & FAQs
      </h2>

      <div className="space-y-4">
        <label className="block text-cyan-400 font-medium">About Your Gig (Optional)</label>
        <textarea
          value={formData.about || ""}
          onChange={(e) => {
            const updatedFormData = { ...formData, about: e.target.value };
            setFormData(updatedFormData);
          }}
          placeholder="Provide more information about yourself or your service..."
          rows={4}
          className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-cyan-400 font-medium">Tags (e.g., react, nodejs)</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Enter tag and press Enter"
              className="flex-1 px-4 py-3 sm:w-auto w-[80%] bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-slate-700 border border-slate-600 rounded-full text-sm text-white"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-cyan-400 font-medium">Skills (e.g., JavaScript, CSS)</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Enter skill and press Enter"
              className="flex-1 px-4 py-3 sm:w-auto w-[80%] bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-slate-700 border border-slate-600 rounded-full text-sm text-white"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-cyan-400 font-medium">Badges (e.g., Expert Verified)</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newBadge}
              onChange={(e) => setNewBadge(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addBadge();
                }
              }}
              placeholder="Enter badge and press Enter"
              className="flex-1 px-4 py-3 sm:w-auto w-[80%] bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="button"
              onClick={addBadge}
              className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.badges.map((badge, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-slate-700 border border-slate-600 rounded-full text-sm text-white"
              >
                {badge}
                <button
                  type="button"
                  onClick={() => removeBadge(index)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-cyan-400 font-medium">Avatar URL</label>
          <input
            type="url"
            value={formData.avatar || ""}
            onChange={(e) => {
              const updatedFormData = { ...formData, avatar: e.target.value };
              setFormData(updatedFormData);
            }}
            placeholder="https://..."
            className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-400 font-medium">Location</label>
          <input
            type="text"
            value={formData.location || ""}
            onChange={(e) => {
              const updatedFormData = { ...formData, location: e.target.value };
              setFormData(updatedFormData);
            }}
            placeholder="e.g., Mumbai, India"
            className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-400 font-medium">Projects Completed</label>
          <input
            type="number"
            min="0"
            value={formData.projects || ""}
            onChange={(e) => {
              const updatedFormData = {
                ...formData,
                projects: e.target.value ? Number.parseInt(e.target.value, 10) : undefined,
              };
              setFormData(updatedFormData);
            }}
            placeholder="e.g., 32"
            className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-400 font-medium">Response Time (e.g., 1h, 24h)</label>
          <input
            type="text"
            value={formData.responseTime || ""}
            onChange={(e) => {
              const updatedFormData = { ...formData, responseTime: e.target.value };
              setFormData(updatedFormData);
            }}
            placeholder="e.g., 1h"
            className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-400 font-medium">Success Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.successRate || ""}
            onChange={(e) => {
              const updatedFormData = {
                ...formData,
                successRate: e.target.value ? Number(e.target.value) : undefined,
              };
              setFormData(updatedFormData);
            }}
            placeholder="e.g., 95"
            className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-cyan-400 font-medium">Status</label>
          <select
            value={formData.status || "Available"}
            onChange={(e) => {
              const updatedFormData = { ...formData, status: e.target.value };
              setFormData(updatedFormData);
            }}
            className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
          >
            <option value="Available" className="bg-slate-800">
              Available
            </option>
            <option value="Unavailable" className="bg-slate-800">
              Unavailable
            </option>
          </select>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 space-y-4">
        <h4 className="text-xl font-bold text-cyan-400">Frequently Asked Questions (FAQs)</h4>

        <div className="space-y-4">
          {formData.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex justify-between items-start"
            >
              <div className="flex-1 pr-4">
                <p className="text-white font-medium mb-2">Q: {faq.question}</p>
                <p className="text-slate-300 text-sm">A: {faq.answer}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="text-white font-medium">Add New FAQ</h5>
          <input
            type="text"
            value={newFaqQuestion}
            onChange={(e) => setNewFaqQuestion(e.target.value)}
            placeholder="Question"
            className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <textarea
            value={newFaqAnswer}
            onChange={(e) => setNewFaqAnswer(e.target.value)}
            placeholder="Answer"
            rows={3}
            className="w-full px-4 py-3 bg-slate-800/90 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none transition-colors"
          />
          <button
            type="button"
            onClick={addFaq}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </button>
        </div>
      </div>
    </div>
  );
}