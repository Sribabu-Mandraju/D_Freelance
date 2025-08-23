"use client";

import { useState } from "react";
import { Image as ImageIcon, Upload, X } from "lucide-react";

export default function BasicInfo({
  formData,
  updateFormData,
  nextStep,
  currentStep,
  selectedFile,
  setSelectedFile,
  handleImageUpload,
}) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Clear the URL input when a file is selected
      updateFormData({ image: "" });
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  const validateAndNext = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    nextStep();
  };

  return (
    <div className="md:p-8 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Basic Information
        </h2>
        <p className="text-gray-300 font-normal text-sm">
          Let's start with the basics of your Web3 project
        </p>
      </div>

      <div className="md:space-y-6 space-y-4">
        {/* Project Title */}
        <div className="group">
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter your project title..."
            className={`w-full md:px-4 md:py-3 px-2 py-2 text-xs md:text-sm bg-slate-700/50 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 text-white placeholder-gray-400 ${
              errors.title
                ? "border-red-400 focus:border-red-400"
                : "border-gray-600 focus:border-cyan-400 group-hover:border-gray-500"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-xs md:text-sm text-red-400 animate-pulse">
              {errors.title}
            </p>
          )}
        </div>

        {/* Project Image - File Upload */}
        <div className="group">
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Project Image
          </label>
          <div className="space-y-3">
            {/* File Upload */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full md:px-4 md:py-3 px-2 py-2 text-xs md:text-sm bg-slate-700/50 border-2 border-gray-600 rounded-xl transition-all duration-200 cursor-pointer hover:border-cyan-400 group-hover:border-gray-500 text-white"
              >
                <Upload className="w-4 h-4 mr-2 text-cyan-400" />
                {selectedFile ? selectedFile.name : "Choose an image file"}
              </label>
            </div>

            {/* Selected File Display */}
            {selectedFile && (
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg border border-gray-600">
                <ImageIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-300 flex-1 truncate">
                  {selectedFile.name}
                </span>
                <button
                  type="button"
                  onClick={removeSelectedFile}
                  className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            )}

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-slate-800 text-gray-400">OR</span>
              </div>
            </div>

            {/* URL Input */}
            <div className="relative">
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full md:px-4 md:py-3 px-2 py-2 text-xs md:text-sm bg-slate-700/50 border-2 border-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 focus:border-cyan-400 group-hover:border-gray-500 text-white placeholder-gray-400"
                disabled={selectedFile !== null}
              />
              {selectedFile && (
                <div className="absolute inset-0 bg-slate-700/70 rounded-xl flex items-center justify-center">
                  <span className="text-sm text-gray-400">
                    Disabled when file is selected
                  </span>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {(formData.image || selectedFile) && (
              <div className="mt-3 p-3 bg-slate-700/30 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-300 mb-2">Preview:</p>
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : formData.image
                  }
                  alt="Project preview"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-600"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-4 md:mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={validateAndNext}
          className="md:px-8 md:py-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white  rounded-xl hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
