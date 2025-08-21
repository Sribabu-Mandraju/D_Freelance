"use client";
import { useDispatch, useSelector } from "react-redux";
import { User, Shield, Zap, Edit, Save, X } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  toggleEditingHero,
  updateHeroField,
  saveHeroSection,
  updatePortfolio,
  setPortfolioData
} from "../../store/portfolioSlice/portfolioSlice";

function HeroSection({ personalInfo, setPersonalInfo, portfolioId }) {
  const dispatch = useDispatch();
  const { isEditingHero, editHeroData } = useSelector(
    (state) => state.portfolio
  );

  const handleChange = (field, value) => {
    dispatch(updateHeroField({ field, value }));
  };

  const validateLimits = () => {
    const expertise = editHeroData.expertise || [];
    const focusAreas = editHeroData.focusAreas || [];

    if ((editHeroData.name || "").length > 100) {
      toast.error("Name cannot exceed 100 characters");
      return false;
    }

    if (
      editHeroData.domains &&
      editHeroData.domains.some((domain) => domain.length > 50)
    ) {
      toast.error("Each domain cannot exceed 50 characters");
      return false;
    }

    if ((editHeroData.thoughtLine || "").length > 200) {
      toast.error("Thought line cannot exceed 200 characters");
      return false;
    }

    if ((editHeroData.aboutMe || "").length > 300) {
      toast.error("About me cannot exceed 300 characters");
      return false;
    }

    if ((editHeroData.profile || "").length > 200) {
      toast.error("Profile image URL cannot exceed 200 characters");
      return false;
    }

    if (expertise.length > 4) {
      toast.error("Expertise can have a maximum of 4 items");
      return false;
    }

    if (expertise.some((item) => item.length > 40)) {
      toast.error("Each expertise item cannot exceed 40 characters");
      return false;
    }

    if (focusAreas.length > 4) {
      toast.error("Focus areas can have a maximum of 4 items");
      return false;
    }

    if (focusAreas.some((item) => item.length > 40)) {
      toast.error("Each focus area item cannot exceed 40 characters");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateLimits()) {
      return;
    }

    const toastId = toast.loading("Saving hero section...");
    try {
      dispatch(saveHeroSection());
      const action = await dispatch(
        updatePortfolio({ portfolioId, data: { heroSection: editHeroData } })
      );
      if (updatePortfolio.fulfilled.match(action)) {
        dispatch(
          setPortfolioData({
            heroSection: { ...editHeroData },
          })
        );
        toast.success("Hero section updated successfully!", { id: toastId });
      }
    } catch (err) {
      toast.error(`Failed to save changes: ${err.message}`, { id: toastId });
    }
  };

  const handleEdit = () => {
    dispatch(toggleEditingHero());
  };

  const handleCancel = () => {
    dispatch(toggleEditingHero());
  };

  return (
    <div className="bg-gray-950/40 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden mb-6">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

      <div className="relative flex flex-col lg:flex-row gap-6">
        {/* Profile Image Section */}
        <div className="flex-shrink-0">
          {isEditingHero ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">Profile Image URL:</label>
                <span
                  className={`text-xs ${
                    (editHeroData.profile || "").length > 200
                      ? "text-red-400"
                      : "text-gray-500"
                  }`}
                >
                  {(editHeroData.profile || "").length}/200
                </span>
              </div>
              <input
                type="text"
                value={editHeroData.profile || ""}
                onChange={(e) => handleChange("profile", e.target.value)}
                placeholder="Enter image URL"
                className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-gray-300 text-sm focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] ${
                  (editHeroData.profile || "").length > 200
                    ? "border-red-500/50 focus:border-red-400"
                    : "border-cyan-500/50 focus:border-cyan-400"
                }`}
              />
              {editHeroData.profile && (
                <img
                  src={editHeroData.profile}
                  alt="Profile Preview"
                  className="h-32 w-32 rounded-full object-cover mt-2 border-2 border-cyan-500/30"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/128?text=Invalid+URL")}
                />
              )}
            </div>
          ) : (
            <img
              src={personalInfo.profile || "https://via.placeholder.com/128?text=No+Image"}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-2 border-cyan-500/30"
            />
          )}
        </div>

        {/* Hero Content */}
        <div className="flex-1 space-y-3">
          <div>
            {isEditingHero ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-400">Name:</label>
                  <span
                    className={`text-xs ${
                      (editHeroData.name || "").length > 100
                        ? "text-red-400"
                        : "text-gray-500"
                    }`}
                  >
                    {(editHeroData.name || "").length}/100
                  </span>
                </div>
                <input
                  type="text"
                  value={editHeroData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-3xl sm:text-4xl lg:text-5xl font-bold focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent ${
                    (editHeroData.name || "").length > 100
                      ? "border-red-500/50 focus:border-red-400"
                      : "border-cyan-500/50 focus:border-cyan-400"
                  }`}
                />
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {personalInfo.name || ""}
                </span>
              </h1>
            )}
          </div>

          <div>
            {isEditingHero ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-400">Domains (comma separated):</label>
                  <span
                    className={`text-xs ${
                      editHeroData.domains &&
                      editHeroData.domains.some((d) => d.length > 50)
                        ? "text-red-400"
                        : "text-gray-500"
                    }`}
                  >
                    Max 50 chars each
                  </span>
                </div>
                <input
                  type="text"
                  value={editHeroData.domains?.join(", ") || ""}
                  onChange={(e) =>
                    handleChange(
                      "domains",
                      e.target.value.split(",").map((d) => d.trim())
                    )
                  }
                  className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-gray-300 text-lg focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] ${
                    editHeroData.domains &&
                    editHeroData.domains.some((d) => d.length > 50)
                      ? "border-red-500/50 focus:border-red-400"
                      : "border-cyan-500/50 focus:border-cyan-400"
                  }`}
                />
              </div>
            ) : (
              <p className="text-lg text-gray-300">{personalInfo.domains?.join(" | ") || ""}</p>
            )}
          </div>

          <div>
            {isEditingHero ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-400">Thought Line:</label>
                  <span
                    className={`text-xs ${
                      (editHeroData.thoughtLine || "").length > 200
                        ? "text-red-400"
                        : "text-gray-500"
                    }`}
                  >
                    {(editHeroData.thoughtLine || "").length}/200
                  </span>
                </div>
                <input
                  type="text"
                  value={editHeroData.thoughtLine || ""}
                  onChange={(e) => handleChange("thoughtLine", e.target.value)}
                  className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-cyan-300 text-base font-medium focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] ${
                    (editHeroData.thoughtLine || "").length > 200
                      ? "border-red-500/50 focus:border-red-400"
                      : "border-cyan-500/50 focus:border-cyan-400"
                  }`}
                />
              </div>
            ) : (
              <p className="text-base text-cyan-300 font-medium">
                {personalInfo.thoughtLine || ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
              <User className="w-6 h-6 text-cyan-400" />
            </div>
            About Me
          </h2>

          {!isEditingHero ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] group w-full sm:w-auto justify-center"
            >
              <Edit className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Edit</span>
            </button>
          ) : (
            <div className="flex w-full sm:w-auto gap-2">
              <button
                onClick={handleSave}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
              >
                <Save className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
              >
                <X className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400 font-medium">Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 text-gray-300 leading-relaxed">
          {isEditingHero ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">About Me:</label>
                <span
                  className={`text-xs ${
                    (editHeroData.aboutMe || "").length > 300
                      ? "text-red-400"
                      : "text-gray-500"
                  }`}
                >
                  {(editHeroData.aboutMe || "").length}/300
                </span>
              </div>
              <textarea
                value={editHeroData.aboutMe || ""}
                onChange={(e) => handleChange("aboutMe", e.target.value)}
                className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-gray-300 text-sm focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] resize-none ${
                  (editHeroData.aboutMe || "").length > 300
                    ? "border-red-500/50 focus:border-red-400"
                    : "border-cyan-500/50 focus:border-cyan-400"
                }`}
                rows="4"
              />
            </div>
          ) : (
            <p className="text-sm">{personalInfo.aboutMe || ""}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 sm:p-6 rounded-xl border border-cyan-500/20">
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Expertise
                {isEditingHero && (
                  <span
                    className={`ml-2 text-xs px-2 py-1 rounded ${
                      (editHeroData.expertise?.length || 0) > 4 ||
                      (editHeroData.expertise || []).some(
                        (item) => item.length > 40
                      )
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {editHeroData.expertise?.length || 0}/4
                  </span>
                )}
              </h3>
              {isEditingHero ? (
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Expertise (one per line, max 4 items, 40 chars each):
                  </label>
                  <textarea
                    value={editHeroData.expertise?.join("\n") || ""}
                    onChange={(e) => {
                      const items = e.target.value
                        .split("\n")
                        .filter((item) => item.trim());
                      handleChange("expertise", items);
                    }}
                    className={`w-full bg-gray-900/50 border rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] resize-none ${
                      (editHeroData.expertise?.length || 0) > 4 ||
                      (editHeroData.expertise || []).some(
                        (item) => item.length > 40
                      )
                        ? "border-red-500/50 focus:border-red-400"
                        : "border-cyan-500/50 focus:border-cyan-400"
                    }`}
                    rows="4"
                  />
                </div>
              ) : (
                <ul className="space-y-2 text-sm">
                  {personalInfo.expertise?.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: [
                            "#00FFFF",
                            "#3B82F6",
                            "#8B5CF6",
                            "#22C55E",
                          ][index % 4],
                        }}
                      ></div>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 sm:p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Focus Areas
                {isEditingHero && (
                  <span
                    className={`ml-2 text-xs px-2 py-1 rounded ${
                      (editHeroData.focusAreas?.length || 0) > 4 ||
                      (editHeroData.focusAreas || []).some(
                        (item) => item.length > 40
                      )
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {editHeroData.focusAreas?.length || 0}/4
                  </span>
                )}
              </h3>
              {isEditingHero ? (
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Focus Areas (one per line, max 4 items, 40 chars each):
                  </label>
                  <textarea
                    value={editHeroData.focusAreas?.join("\n") || ""}
                    onChange={(e) => {
                      const items = e.target.value
                        .split("\n")
                        .filter((item) => item.trim());
                      handleChange("focusAreas", items);
                    }}
                    className={`w-full bg-gray-900/50 border rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] resize-none ${
                      (editHeroData.focusAreas?.length || 0) > 4 ||
                      (editHeroData.focusAreas || []).some(
                        (item) => item.length > 40
                      )
                        ? "border-red-500/50 focus:border-red-400"
                        : "border-cyan-500/50 focus:border-cyan-400"
                    }`}
                    rows="4"
                  />
                </div>
              ) : (
                <ul className="space-y-2 text-sm">
                  {personalInfo.focusAreas?.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: [
                            "#8B5CF6",
                            "#F472B6",
                            "#00FFFF",
                            "#3B82F6",
                          ][index % 4],
                        }}
                      ></div>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default HeroSection;