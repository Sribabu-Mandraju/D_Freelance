"use client";

import { useState, useEffect, useRef } from "react";
import {
  DollarSign,
  Clock,
  Tag,
  Upload,
  X,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPackageData } from "../../../store/gigSlice/gigSlice";

const PackageFields = ({
  pkgName,
  pkg,
  handlePackageChange,
  validationErrors,
}) => {
  const getFieldError = (field) => {
    return validationErrors[`${pkgName}_${field}`];
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2 tracking-wide">
            Hourly Pay (USD) *
          </label>
          <div className="relative group">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-4 h-4 group-focus-within:text-cyan-300 transition-colors duration-300" />
            <input
              type="number"
              min="0"
              value={pkg.hourlyPay}
              onChange={(e) =>
                handlePackageChange(pkgName, "hourlyPay", e.target.value)
              }
              className={`w-full pl-10 pr-4 py-3 bg-gray-900/80 border rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 shadow-lg ${
                getFieldError("hourlyPay")
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-400/50"
                  : "border-gray-700/50 focus:ring-cyan-500/50 focus:border-cyan-400/50 hover:border-cyan-500/30 focus:shadow-cyan-500/20"
              }`}
              placeholder="e.g., 20"
              required
            />
            {getFieldError("hourlyPay") && (
              <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                <AlertCircle className="w-3 h-3" />
                {getFieldError("hourlyPay")}
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2 tracking-wide">
            Duration (days or range) *
          </label>
          <div className="relative group">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-4 h-4 group-focus-within:text-cyan-300 transition-colors duration-300" />
            <input
              type="text"
              value={pkg.duration}
              onChange={(e) =>
                handlePackageChange(pkgName, "duration", e.target.value)
              }
              className={`w-full pl-10 pr-4 py-3 bg-gray-900/80 border rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 shadow-lg ${
                getFieldError("duration")
                  ? "border-red-500 focus:ring-red-500/50 focus:border-red-400/50"
                  : "border-gray-700/50 focus:ring-cyan-500/50 focus:border-cyan-400/50 hover:border-cyan-500/30 focus:shadow-cyan-500/20"
              }`}
              placeholder="e.g., 3 or 3-5"
              required
            />
            {getFieldError("duration") && (
              <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                <AlertCircle className="w-3 h-3" />
                {getFieldError("duration")}
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2 tracking-wide">
            Custom UI *
          </label>
          <select
            value={pkg.custom_ui}
            onChange={(e) =>
              handlePackageChange(pkgName, "custom_ui", e.target.value)
            }
            className={`w-full px-4 py-3 bg-gray-900/80 border rounded-lg text-white text-sm focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 shadow-lg ${
              getFieldError("custom_ui")
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-400/50"
                : "border-gray-700/50 focus:ring-cyan-500/50 focus:border-cyan-400/50 hover:border-cyan-500/30 focus:shadow-cyan-500/20"
            }`}
            required
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="client_choice">Client Choice</option>
          </select>
          {getFieldError("custom_ui") && (
            <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
              <AlertCircle className="w-3 h-3" />
              {getFieldError("custom_ui")}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2 tracking-wide">
            Code Reviews / Revisions *
          </label>
          <input
            type="text"
            value={pkg.code_reviews}
            onChange={(e) =>
              handlePackageChange(pkgName, "code_reviews", e.target.value)
            }
            placeholder="e.g., 2 times, 3-5 times, unlimited"
            className={`w-full px-4 py-3 bg-gray-900/80 border rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 shadow-lg ${
              getFieldError("code_reviews")
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-400/50"
                : "border-gray-700/50 focus:ring-cyan-500/50 focus:border-cyan-400/50 hover:border-cyan-500/30 focus:shadow-cyan-500/20"
            }`}
            required
          />
          {getFieldError("code_reviews") && (
            <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
              <AlertCircle className="w-3 h-3" />
              {getFieldError("code_reviews")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function BasicInfo({
  formData,
  setFormData,
  packageData,
  setPackageData,
  validationErrors,
}) {
  const [activePackageTab, setActivePackageTab] = useState("basic");
  const [gigImageFile, setGigImageFile] = useState(null);
  const [showcaseImageFiles, setShowcaseImageFiles] = useState([]);
  const [isUploadingGig, setIsUploadingGig] = useState(false);
  const [isUploadingShowcase, setIsUploadingShowcase] = useState(false);
  const [allImagePreviews, setAllImagePreviews] = useState([]);

  // Replace flow state
  const replaceInputRef = useRef(null);
  const [replaceIndex, setReplaceIndex] = useState(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const dispatch = useDispatch();

  const handlePackageChange = (pkgName, field, value) => {
    dispatch(setPackageData({ pkgName, field, value }));
  };

  const getFieldError = (field) => {
    return validationErrors[field];
  };

  const renderField = (
    label,
    field,
    type = "text",
    placeholder = "",
    required = false,
    options = null
  ) => {
    const error = getFieldError(field);

    return (
      <div>
        <label className="block text-sm font-medium text-cyan-300 mb-2 tracking-wide">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {type === "select" ? (
          <select
            value={formData[field] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field]: e.target.value })
            }
            className={`w-full px-4 py-3 bg-gray-900/80 border rounded-lg text-white text-sm focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 shadow-lg ${
              error
                ? "border-red-500 focus:ring-red-500/50 focus:border-red-400/50"
                : "border-gray-700/50 focus:ring-cyan-500/50 focus:border-cyan-400/50 hover:border-cyan-500/30 focus:shadow-cyan-500/20"
            }`}
            required={required}
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
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

  const handleGigImageChange = (e) => {
    const file = e.target.files[0];
    setGigImageFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAllImagePreviews((prev) => {
        const newPreviews = prev.filter((p) => p.type !== "gig");
        return [
          { url: previewUrl, type: "gig", uploaded: false },
          ...newPreviews,
        ];
      });
    } else {
      setAllImagePreviews((prev) => prev.filter((p) => p.type !== "gig"));
    }
  };

  const handleShowcaseImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setShowcaseImageFiles(files);
    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: "showcase",
      uploaded: false,
      file,
    }));
    setAllImagePreviews((prev) => {
      const newPreviews = prev.filter((p) => p.type !== "gig");
      return [...newPreviews, ...previews];
    });
  };

  const handleGigImageUpload = async () => {
    if (!gigImageFile) {
      alert("Please select a gig image first.");
      return;
    }

    setIsUploadingGig(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", gigImageFile);
    uploadFormData.append("upload_preset", "Freelance_Website");
    uploadFormData.append("cloud_name", "dd33ovgv1");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd33ovgv1/image/upload",
        uploadFormData
      );
      const secureUrl = res.data.secure_url;

      const updatedFormData = {
        ...formData,
        gigimage: secureUrl,
        images: [
          { url: secureUrl },
          ...formData.images.filter(
            (img) => img.url && img.url !== formData.gigimage
          ),
        ],
      };
      setFormData(updatedFormData);

      setAllImagePreviews((prev) => {
        const newPreviews = prev.filter((p) => p.type !== "gig");
        return [
          { url: secureUrl, type: "gig", uploaded: true },
          ...newPreviews,
        ];
      });

      alert("Gig image uploaded successfully!");
      setGigImageFile(null);
    } catch (err) {
      console.error("Gig image upload failed:", err);
      alert("Gig image upload failed. Please try again.");
    } finally {
      setIsUploadingGig(false);
    }
  };

  const handleShowcaseImagesUpload = async () => {
    if (showcaseImageFiles.length === 0) {
      alert("Please select showcase images first.");
      return;
    }

    setIsUploadingShowcase(true);
    const uploadedUrls = [];

    try {
      for (const file of showcaseImageFiles) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("upload_preset", "Freelance_Website");
        uploadFormData.append("cloud_name", "dd33ovgv1");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dd33ovgv1/image/upload",
          uploadFormData
        );
        uploadedUrls.push(res.data.secure_url);
      }

      const updatedFormData = {
        ...formData,
        images: [
          ...formData.images.filter(
            (img) => img.url && img.url !== formData.gigimage
          ),
          ...uploadedUrls.map((url) => ({ url })),
        ],
      };
      setFormData(updatedFormData);

      setAllImagePreviews((prev) => {
        const newPreviews = prev.filter((p) => p.type !== "showcase");
        return [
          ...newPreviews,
          ...uploadedUrls.map((url) => ({
            url,
            type: "showcase",
            uploaded: true,
          })),
        ];
      });

      alert("Showcase images uploaded successfully!");
      setShowcaseImageFiles([]);
    } catch (err) {
      console.error("Showcase images upload failed:", err);
      alert("Showcase images upload failed. Please try again.");
    } finally {
      setIsUploadingShowcase(false);
    }
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
    setAllImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const replaceImage = (index) => {
    setReplaceIndex(index);
    setIsReplacing(true);
    if (replaceInputRef.current) {
      replaceInputRef.current.click();
    }
  };

  const handleReplaceImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsReplacing(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "Freelance_Website");
    uploadFormData.append("cloud_name", "dd33ovgv1");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd33ovgv1/image/upload",
        uploadFormData
      );
      const secureUrl = res.data.secure_url;

      const updatedImages = [...formData.images];
      updatedImages[replaceIndex] = { url: secureUrl };
      setFormData({ ...formData, images: updatedImages });

      setAllImagePreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[replaceIndex] = {
          url: secureUrl,
          type: "showcase",
          uploaded: true,
        };
        return newPreviews;
      });

      alert("Image replaced successfully!");
    } catch (err) {
      console.error("Image replacement failed:", err);
      alert("Image replacement failed. Please try again.");
    } finally {
      setIsReplacing(false);
      setReplaceIndex(null);
    }
  };

  const categoryOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Content Writing", label: "Content Writing" },
    { value: "Video Editing", label: "Video Editing" },
    { value: "Data Analysis", label: "Data Analysis" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="space-y-8">
      {/* Basic Information Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Basic Information
          </h2>
          <p className="text-gray-400">
            Provide the essential details about your gig
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderField(
            "Username",
            "username",
            "text",
            "Enter your username",
            true
          )}
          {renderField("Title", "title", "text", "Enter your gig title", true)}
          {renderField(
            "Category",
            "category",
            "select",
            "",
            true,
            categoryOptions
          )}
          {renderField(
            "Price",
            "price",
            "number",
            "Enter your base price",
            true
          )}
          {renderField(
            "Delivery Time",
            "deliveryTime",
            "text",
            "e.g., 3-5 days",
            true
          )}
        </div>

        <div className="col-span-full">
          {renderField(
            "Description",
            "description",
            "textarea",
            "Describe your gig in detail...",
            true
          )}
        </div>
      </div>

      {/* Gig Image Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">Gig Image</h2>
          <p className="text-gray-400">Upload a main image for your gig</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleGigImageChange}
              className="hidden"
              id="gig-image-input"
            />
            <label
              htmlFor="gig-image-input"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg cursor-pointer transition-colors duration-300"
            >
              <Upload className="w-4 h-4" />
              Choose Image
            </label>
            {gigImageFile && (
              <button
                onClick={handleGigImageUpload}
                disabled={isUploadingGig}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50"
              >
                {isUploadingGig ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isUploadingGig ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>

          {formData.gigimage && (
            <div className="relative inline-block">
              <img
                src={formData.gigimage}
                alt="Gig"
                className="w-32 h-32 object-cover rounded-lg border-2 border-cyan-500/30"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Package Information Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Package Information
          </h2>
          <p className="text-gray-400">Configure your three service packages</p>
        </div>

        <div className="space-y-6">
          {/* Package Tabs */}
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg">
            {["basic", "standard", "pro"].map((pkgName) => (
              <button
                key={pkgName}
                onClick={() => setActivePackageTab(pkgName)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  activePackageTab === pkgName
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)} Package
              </button>
            ))}
          </div>

          {/* Package Fields */}
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
            <PackageFields
              pkgName={activePackageTab}
              pkg={packageData[activePackageTab]}
              handlePackageChange={handlePackageChange}
              validationErrors={validationErrors}
            />
          </div>
        </div>
      </div>

      {/* Showcase Images Section */}
      <div className="space-y-6">
        <div className="border-b border-gray-700/50 pb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Showcase Images
          </h2>
          <p className="text-gray-400">
            Add additional images to showcase your work
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleShowcaseImagesChange}
              className="hidden"
              id="showcase-images-input"
            />
            <label
              htmlFor="showcase-images-input"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg cursor-pointer transition-colors duration-300"
            >
              <Upload className="w-4 h-4" />
              Choose Images
            </label>
            {showcaseImageFiles.length > 0 && (
              <button
                onClick={handleShowcaseImagesUpload}
                disabled={isUploadingShowcase}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50"
              >
                {isUploadingShowcase ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isUploadingShowcase ? "Uploading..." : "Upload All"}
              </button>
            )}
          </div>

          {/* Image Grid */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.url}
                    alt={`Showcase ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border-2 border-gray-600/30 group-hover:border-cyan-500/50 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center gap-2">
                    <button
                      onClick={() => removeImage(index)}
                      className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => replaceImage(index)}
                      className="p-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full transition-colors duration-300"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hidden input for image replacement */}
          <input
            ref={replaceInputRef}
            type="file"
            accept="image/*"
            onChange={handleReplaceImage}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
