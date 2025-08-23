"use client";

import { useState } from "react";
import { Image as ImageIcon, Upload, X, Camera } from "lucide-react";

export default function BasicInfo({
  formData,
  updateFormData,
  nextStep,
  currentStep,
  selectedFile,
  setSelectedFile,
  handleImageUpload,
  isSubmitting,
  dragActive,
  handleDrag,
  handleDrop,
  handleFileSelect,
  removeImage,
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

        {/* Project Image - Enhanced Upload Section */}
        <div className="group">
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Project Image
          </label>
          <div className="space-y-4">
            {/* Drag & Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-cyan-400 bg-cyan-400/10 scale-105"
                  : "border-gray-600 hover:border-gray-500 bg-slate-700/20"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    dragActive
                      ? "bg-cyan-400/20 text-cyan-400 scale-110"
                      : "bg-gray-700/50 text-gray-400"
                  }`}
                >
                  <Camera className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-white">
                    {dragActive
                      ? "Drop your image here"
                      : "Drag & drop your image"}
                  </p>
                  <p className="text-sm text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-slate-800 text-gray-400 font-medium">
                  OR
                </span>
              </div>
            </div>

            {/* File Upload Button */}
            <div className="flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl cursor-pointer hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose Image File
              </label>
            </div>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-slate-800 text-gray-400 font-medium">
                  OR
                </span>
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

            {/* Selected File Display */}
            {selectedFile && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Remove image"
                >
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>
            )}

            {/* Image Preview */}
            {(formData.image || selectedFile) && (
              <div className="mt-4 p-4 bg-slate-700/30 rounded-xl border border-gray-600">
                <p className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Image Preview
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : formData.image
                    }
                    alt="Project preview"
                    className="max-w-full max-h-48 object-cover rounded-lg border-2 border-gray-600 shadow-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-6 md:mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={validateAndNext}
          disabled={isSubmitting}
          className={`md:px-8 md:py-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl transform transition-all duration-200 shadow-lg shadow-cyan-500/25 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-cyan-400 hover:to-blue-400 hover:scale-105 hover:shadow-cyan-500/40"
          }`}
        >
          {isSubmitting ? "Processing..." : "Next Step →"}
        </button>
      </div>
    </div>
  );
}
