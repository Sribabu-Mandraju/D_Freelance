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
      setFormData((prev) => ({
        ...prev,
        faqs: [
          ...prev.faqs,
          { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() },
        ],
      }));
      setNewFaqQuestion("");
      setNewFaqAnswer("");
    }
  };
  const removeFaq = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, index) => index !== indexToRemove),
    }));
  };
  const addTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag("");
    }
  };
  const removeTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };
  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };
  const removeSkill = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove),
    }));
  };
  const addBadge = () => {
    if (newBadge.trim()) {
      setFormData((prev) => ({ ...prev, badges: [...prev.badges, newBadge.trim()] }));
      setNewBadge("");
    }
  };
  const removeBadge = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      badges: prev.badges.filter((_, index) => index !== indexToRemove),
    }));
  };
  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-3xl font-bold text-white mb-6 text-center">Additional Details & FAQs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">About Your Gig (Optional)</label>
          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            placeholder="Provide more information about yourself or your service..."
            rows={4}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
          />
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Tags (e.g., react, nodejs)</label>
          <div className="flex items-center gap-2 mb-2">
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
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button type="button" onClick={addTag} className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-colors text-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="flex items-center gap-1 px-3 py-1 bg-slate-600 rounded-full text-xs text-gray-200">
                {tag}
                <button type="button" onClick={() => removeTag(index)} className="text-gray-400 hover:text-white ml-1"><X className="w-4 h-4" /></button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Skills (e.g., JavaScript, CSS)</label>
          <div className="flex items-center gap-2 mb-2">
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
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button type="button" onClick={addSkill} className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-colors text-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span key={index} className="flex items-center gap-1 px-3 py-1 bg-slate-600 rounded-full text-xs text-gray-200">
                {skill}
                <button type="button" onClick={() => removeSkill(index)} className="text-gray-400 hover:text-white ml-1"><X className="w-4 h-4" /></button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Badges (e.g., Expert Verified)</label>
          <div className="flex items-center gap-2 mb-2">
            <input type="text" value={newBadge} onChange={(e) => setNewBadge(e.target.value)} placeholder="Enter badge and press Enter" className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            <button type="button" onClick={addBadge} className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-colors text-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.badges.map((badge, index) => (
              <span key={index} className="flex items-center gap-1 px-3 py-1 bg-slate-600 rounded-full text-xs text-gray-200">
                {badge}
                <button type="button" onClick={() => removeBadge(index)} className="text-gray-400 hover:text-white ml-1"><X className="w-4 h-4" /></button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Avatar URL</label>
          <input type="url" value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} placeholder="https://..." className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Location</label>
          <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g., Mumbai, India" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Projects Completed</label>
          <input type="number" min="0" value={formData.projects || ""} onChange={(e) => setFormData({...formData, projects: e.target.value ? parseInt(e.target.value,10) : undefined})} placeholder="e.g., 32" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Response Time (e.g., 1h, 24h)</label>
          <input type="text" value={formData.responseTime} onChange={(e) => setFormData({...formData, responseTime: e.target.value})} placeholder="e.g., 1h" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Success Rate (%)</label>
          <input type="number" min="0" max="100" value={formData.successRate || ""} onChange={(e) => setFormData({...formData, successRate: e.target.value ? Number(e.target.value) : undefined})} placeholder="e.g., 95" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium text-white mb-2">Status</label>
          <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>
      <div className="p-4 sm:p-6 bg-slate-700 border border-slate-600 rounded-xl space-y-4">
        <h4 className="text-xl font-bold text-white">Frequently Asked Questions (FAQs)</h4>
        <div className="space-y-4">
          {formData.faqs.map((faq, index) => (
            <div key={index} className="bg-slate-600 rounded-lg p-3 flex justify-between items-start transition-transform hover:scale-[1.01] duration-200 ease-in-out">
              <div>
                <p className="text-gray-300 text-sm font-semibold">Q: {faq.question}</p>
                <p className="text-gray-400 text-xs mt-1">A: {faq.answer}</p>
              </div>
              <button type="button" onClick={() => removeFaq(index)} className="text-red-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"><X className="w-5 h-5" /></button>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-slate-800 border border-slate-700 rounded-lg space-y-3">
          <h5 className="text-white font-semibold">Add New FAQ</h5>
          <input type="text" value={newFaqQuestion} onChange={(e) => setNewFaqQuestion(e.target.value)} placeholder="Question" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
          <textarea value={newFaqAnswer} onChange={(e) => setNewFaqAnswer(e.target.value)} placeholder="Answer" rows={2} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm" />
          <button type="button" onClick={addFaq} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-colors text-sm">
            <Plus className="w-4 h-4" /><span>Add FAQ</span>
          </button>
        </div>
      </div>
    </div>
  );
}