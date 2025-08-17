"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Code, Star, Plus, Trash2, Send } from "lucide-react";
import {
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
  updateNestedField,
  updateCurrentStatus,
  updateTechHighlight,
  createPortfolio,
} from "../../store/portfolioSlice/portfolioSlice"; // Adjust path

function PortfolioForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolioData, isSubmitting, submitMessage, error } = useSelector(
    (state) => state.portfolio
  );

  useEffect(() => {
    // No token loading needed; handled by thunk
  }, []);

  const handleAddArrayItem = (section, field, defaultValue) => {
    dispatch(addArrayItem({ section, field, defaultValue }));
  };

  const handleRemoveArrayItem = (section, field, index) => {
    dispatch(removeArrayItem({ section, field, index }));
  };

  const handleUpdateArrayItem = (section, field, index, value) => {
    dispatch(updateArrayItem({ section, field, index, value }));
  };

  const handleUpdateNestedField = (section, field, value) => {
    dispatch(updateNestedField({ section, field, value }));
  };

  const handleUpdateCurrentStatus = (index, field, value) => {
    dispatch(updateCurrentStatus({ index, field, value }));
  };

  const handleUpdateTechHighlight = (index, field, value) => {
    dispatch(updateTechHighlight({ index, field, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!portfolioData.heroSection.name.trim()) {
      dispatch({ type: "portfolio/setSubmitMessage", payload: "Error: Name is required" });
      return;
    }

    if (!portfolioData.contactInfo.email.trim()) {
      dispatch({ type: "portfolio/setSubmitMessage", payload: "Error: Email is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(portfolioData.contactInfo.email)) {
      dispatch({ type: "portfolio/setSubmitMessage", payload: "Error: Please enter a valid email address" });
      return;
    }

    console.log("[Client] Submitting form data:", JSON.stringify(portfolioData, null, 2));

    try {
      const action = await dispatch(createPortfolio(portfolioData));
      if (createPortfolio.fulfilled.match(action)) {
        const { payload } = action;
        sessionStorage.setItem("portfolioId", payload.portfolioId);
        navigate(`/otpverification?email=${encodeURIComponent(portfolioData.contactInfo.email)}`);
      }
    } catch (err) {
      console.error("[Client] Submit error details:", err);
    }
  };

  const renderStars = (rating, onChange) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`transition-colors duration-200 ${star <= rating ? "text-purple-400" : "text-gray-600"}`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  const colorOptions = ["purple", "blue", "cyan", "indigo", "violet", "pink"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Create Your Portfolio
              </span>
            </h1>
            <p className="text-gray-300 text-lg">
              Build your professional presence with our interactive portfolio builder
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-4 sm:p-6 rounded-xl border border-purple-500/20">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg mr-3 border border-purple-500/30">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                Hero Section
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={portfolioData.heroSection.name}
                    onChange={(e) =>
                      handleUpdateNestedField("heroSection", "name", e.target.value)
                    }
                    className="w-full bg-gray-900/50 border border-purple-500/50 rounded-lg px-4 py-3 text-gray-300 focus:border-purple-400 focus:outline-none focus:shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">
                    Thought Line
                  </label>
                  <input
                    type="text"
                    value={portfolioData.heroSection.thoughtLine}
                    onChange={(e) =>
                      handleUpdateNestedField("heroSection", "thoughtLine", e.target.value)
                    }
                    className="w-full bg-gray-900/50 border border-purple-500/50 rounded-lg px-4 py-3 text-gray-300 focus:border-purple-400 focus:outline-none focus:shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  About Me
                </label>
                <textarea
                  value={portfolioData.heroSection.aboutMe}
                  onChange={(e) =>
                    handleUpdateNestedField("heroSection", "aboutMe", e.target.value)
                  }
                  rows="4"
                  className="w-full bg-gray-900/50 border border-purple-500/50 rounded-lg px-4 py-3 text-gray-300 focus:border-purple-400 focus:outline-none focus:shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all duration-300 resize-none"
                />
              </div>

              <div className="mt-6">
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Domains
                </label>
                {portfolioData.heroSection.domains.map((domain, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) =>
                        handleUpdateArrayItem("heroSection", "domains", index, e.target.value)
                      }
                      className="flex-1 bg-gray-900/50 border border-purple-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-purple-400 focus:outline-none focus:shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all duration-300"
                    />
                    {portfolioData.heroSection.domains.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("heroSection", "domains", index)}
                        className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:border-red-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("heroSection", "domains", "")}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(147,51,234,0.3)] mt-2"
                >
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-400">Add Domain</span>
                </button>
              </div>

              <div className="mt-6">
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Expertise (Max 4, 40 chars each)
                </label>
                {portfolioData.heroSection.expertise.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleUpdateArrayItem("heroSection", "expertise", index, e.target.value)
                      }
                      maxLength="40"
                      className="flex-1 bg-gray-900/50 border border-purple-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-purple-400 focus:outline-none focus:shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all duration-300"
                    />
                    <span className="text-xs text-gray-500 self-center min-w-[3rem]">
                      {item.length}/40
                    </span>
                    {portfolioData.heroSection.expertise.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("heroSection", "expertise", index)}
                        className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:border-red-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
                {portfolioData.heroSection.expertise.length < 4 && (
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("heroSection", "expertise", "")}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(147,51,234,0.3)] mt-2"
                  >
                    <Plus className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-400">Add Expertise</span>
                  </button>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Focus Areas (Max 4, 40 chars each)
                </label>
                {portfolioData.heroSection.focusAreas.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleUpdateArrayItem("heroSection", "focusAreas", index, e.target.value)
                      }
                      maxLength="40"
                      className="flex-1 bg-gray-900/50 border border-purple-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-purple-400 focus:outline-none focus:shadow-[0_0_10px_rgba(147,51,234,0.3)] transition-all duration-300"
                    />
                    <span className="text-xs text-gray-500 self-center min-w-[3rem]">
                      {item.length}/40
                    </span>
                    {portfolioData.heroSection.focusAreas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("heroSection", "focusAreas", index)}
                        className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:border-red-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
                {portfolioData.heroSection.focusAreas.length < 4 && (
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("heroSection", "focusAreas", "")}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(147,51,234,0.3)] mt-2"
                  >
                    <Plus className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-400">Add Focus Area</span>
                  </button>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 p-4 sm:p-6 rounded-xl border border-indigo-500/20">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-lg mr-3 border border-indigo-500/30">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={portfolioData.contactInfo.email}
                    onChange={(e) =>
                      handleUpdateNestedField("contactInfo", "email", e.target.value)
                    }
                    className="w-full bg-gray-900/50 border border-indigo-500/50 rounded-lg px-4 py-3 text-gray-300 focus:border-indigo-400 focus:outline-none focus:shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={portfolioData.contactInfo.phoneNumber}
                    onChange={(e) =>
                      handleUpdateNestedField("contactInfo", "phoneNumber", e.target.value)
                    }
                    className="w-full bg-gray-900/50 border border-indigo-500/50 rounded-lg px-4 py-3 text-gray-300 focus:border-indigo-400 focus:outline-none focus:shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={portfolioData.contactInfo.linkedinProfile}
                    onChange={(e) =>
                      handleUpdateNestedField("contactInfo", "linkedinProfile", e.target.value)
                    }
                    className="w-full bg-gray-900/50 border border-indigo-500/50 rounded-lg px-4 py-3 text-gray-300 focus:border-indigo-400 focus:outline-none focus:shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-4 sm:p-6 rounded-xl border border-blue-500/20">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg mr-3 border border-blue-500/30">
                  <Code className="w-5 h-5 text-blue-400" />
                </div>
                Current Status (Max 3)
              </h2>

              {portfolioData.currentStatus.map((status, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4 p-4 bg-gray-900/30 rounded-lg border border-blue-500/20"
                >
                  <div>
                    <label className="block text-blue-300 text-sm font-medium mb-2">
                      Status
                    </label>
                    <input
                      type="text"
                      value={status.status}
                      onChange={(e) =>
                        handleUpdateCurrentStatus(index, "status", e.target.value)
                      }
                      className="w-full bg-gray-900/50 border border-blue-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-blue-400 focus:outline-none focus:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-300 text-sm font-medium mb-2">
                      Color
                    </label>
                    <select
                      value={status.color}
                      onChange={(e) =>
                        handleUpdateCurrentStatus(index, "color", e.target.value)
                      }
                      className="w-full bg-gray-900/50 border border-blue-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-blue-400 focus:outline-none focus:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300"
                    >
                      {colorOptions.map((color) => (
                        <option key={color} value={color} className="bg-gray-900">
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 text-blue-300 text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={status.isActive}
                        onChange={(e) =>
                          handleUpdateCurrentStatus(index, "isActive", e.target.checked)
                        }
                        className="w-4 h-4 text-blue-400 bg-gray-900 border-blue-500 rounded focus:ring-blue-400 focus:ring-2"
                      />
                      Active
                    </label>
                  </div>

                  <div className="flex items-end">
                    {portfolioData.currentStatus.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("currentStatus", "currentStatus", index)}
                        className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:border-red-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {portfolioData.currentStatus.length < 3 && (
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("currentStatus", "currentStatus", { status: "", color: "purple", isActive: true })}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg hover:border-blue-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] mt-2"
                >
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">Add Status</span>
                </button>
              )}
            </div>

            <div className="bg-gradient-to-br from-violet-500/5 to-cyan-500/5 p-4 sm:p-6 rounded-xl border border-violet-500/20">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <div className="p-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-lg mr-3 border border-violet-500/30">
                  <Star className="w-5 h-5 text-violet-400" />
                </div>
                Tech Highlights (Max 4)
              </h2>

              {portfolioData.techHighlights.map((tech, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4 p-4 bg-gray-900/30 rounded-lg border border-violet-500/20"
                >
                  <div>
                    <label className="block text-violet-300 text-sm font-medium mb-2">
                      Technology
                    </label>
                    <input
                      type="text"
                      value={tech.technology}
                      onChange={(e) =>
                        handleUpdateTechHighlight(index, "technology", e.target.value)
                      }
                      className="w-full bg-gray-900/50 border border-violet-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-violet-400 focus:outline-none focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-violet-300 text-sm font-medium mb-2">
                      Rating
                    </label>
                    {renderStars(tech.rating, (rating) =>
                      handleUpdateTechHighlight(index, "rating", rating)
                    )}
                  </div>

                  <div>
                    <label className="block text-violet-300 text-sm font-medium mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={tech.description}
                      onChange={(e) =>
                        handleUpdateTechHighlight(index, "description", e.target.value)
                      }
                      className="w-full bg-gray-900/50 border border-violet-500/50 rounded-lg px-4 py-2 text-gray-300 focus:border-violet-400 focus:outline-none focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-300"
                    />
                  </div>

                  <div className="flex items-end">
                    {portfolioData.techHighlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("techHighlights", "techHighlights", index)}
                        className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:border-red-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {portfolioData.techHighlights.length < 4 && (
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("techHighlights", "techHighlights", { technology: "", rating: 1, description: "" })}
                  className="flex items-center gap-2 px-3 py-2 bg-violet-500/20 border border-violet-500/50 rounded-lg hover:border-violet-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] mt-2"
                >
                  <Plus className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-violet-400">Add Tech Highlight</span>
                </button>
              )}
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 rounded-xl text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending Verification..." : "Send Verification Code"}
              </button>

              {submitMessage && <p className={submitMessage.includes("Error") ? "text-red-400" : "text-green-400"}>{submitMessage}</p>}
              {error && <p className="text-red-400">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PortfolioForm;