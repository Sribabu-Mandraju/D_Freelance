"use client";

import { useState, useEffect, useRef } from "react";
import { DollarSign, Clock, Tag, Upload, X, RefreshCw } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPackageData } from "../../../store/gigSlice/gigSlice";

const PackageFields = ({ pkgName, pkg, handlePackageChange }) => {
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
              className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
              placeholder="e.g., 20"
              required
            />
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
              className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
              placeholder="e.g., 3 or 3-5"
              required
            />
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
            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
            required
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="client_choice">Client Choice</option>
          </select>
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
            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20"
            required
          />
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
      setFormData(updatedFormData); // Dispatch the updated object

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
        uploadedUrls.push({ url: res.data.secure_url });
      }

      const updatedFormData = {
        ...formData,
        images: [
          ...formData.images.filter(
            (img) => img.url && img.url !== formData.gigimage
          ),
          ...uploadedUrls,
        ],
      };
      setFormData(updatedFormData); // Dispatch the updated object

      setAllImagePreviews((prev) => {
        const newPreviews = prev.filter((p) => p.type !== "gig");
        return [
          ...newPreviews,
          ...uploadedUrls.map((img) => ({
            url: img.url,
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
  // Remove a previewed/showcased image
  const removePreview = (index) => {
    const preview = allImagePreviews[index];
    if (!preview) return;

    // Remove from previews
    const updatedPreviews = allImagePreviews.filter((_, i) => i !== index);
    setAllImagePreviews(updatedPreviews);

    // If the preview corresponds to an uploaded showcase (exists in formData.images), remove it
    if (preview.type === "showcase") {
      setFormData((prev) => ({
        ...prev,
        images: prev.images
          ? prev.images.filter((img) => img.url !== preview.url)
          : [],
      }));
    }

    // If it was a local (not uploaded) file in showcaseImageFiles, remove it from that array
    if (!preview.uploaded && preview.file) {
      setShowcaseImageFiles((prev) =>
        prev.filter(
          (f) => f.name !== preview.file.name || f.size !== preview.file.size
        )
      );
    }
  };

  // Trigger replace flow: set index and open hidden input
  const triggerReplace = (index) => {
    setReplaceIndex(index);
    if (replaceInputRef.current) replaceInputRef.current.value = null;
    replaceInputRef.current?.click();
  };

  // Handle replacement file selection -> upload -> replace URL in previews & formData
  const handleReplaceFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || replaceIndex === null || replaceIndex === undefined) return;

    setIsReplacing(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("upload_preset", "Freelance_Website");
      uploadFormData.append("cloud_name", "dd33ovgv1");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd33ovgv1/image/upload",
        uploadFormData
      );
      const secureUrl = res.data.secure_url;

      // Update previews
      setAllImagePreviews((prev) =>
        prev.map((p, i) =>
          i === replaceIndex
            ? { url: secureUrl, type: p.type, uploaded: true }
            : p
        )
      );

      // If the replaced item is a showcase that exists in formData.images, replace it there too.
      const replacedPreview = allImagePreviews[replaceIndex];
      if (replacedPreview?.type === "showcase") {
        setFormData((prev) => ({
          ...prev,
          images: prev.images.map((img) =>
            img.url === replacedPreview.url ? { url: secureUrl } : img
          ),
        }));
      } else if (replacedPreview?.type === "gig") {
        // If the replaced item is the gig image, update gigimage and images[0]
        setFormData((prev) => ({
          ...prev,
          gigimage: secureUrl,
          images: [
            { url: secureUrl },
            ...prev.images.filter((img) => img.url !== prev.gigimage),
          ],
        }));
      }

      alert("Image replaced successfully!");
    } catch (err) {
      
      alert("Replacing image failed. Please try again.");
    } finally {
      setReplaceIndex(null);
      setIsReplacing(false);
    }
  };

  // Initialize previews from formData on component mount / when formData changes
  useEffect(() => {
    const initialPreviews = [];

    // gigimage first (if present)
    if (formData.gigimage) {
      initialPreviews.push({
        url: formData.gigimage,
        type: "gig",
        uploaded: true,
      });
    }

    // other images (excluding gig image to avoid duplicates)
    if (Array.isArray(formData.images) && formData.images.length > 0) {
      const showcaseImages = formData.images.filter(
        (img) => img.url !== formData.gigimage
      );
      initialPreviews.push(
        ...showcaseImages.map((img) => ({
          url: img.url,
          type: "showcase",
          uploaded: true,
        }))
      );
    }

    // Only update if the previews have actually changed
    setAllImagePreviews((prev) => {
      const currentUploaded = prev.filter((p) => p.uploaded);
      const currentLocal = prev.filter((p) => !p.uploaded);

      // Check if uploaded previews have changed
      const uploadedChanged =
        currentUploaded.length !== initialPreviews.length ||
        !currentUploaded.every(
          (p, i) => initialPreviews[i] && p.url === initialPreviews[i].url
        );

      if (uploadedChanged) {
        return [...initialPreviews, ...currentLocal];
      }

      return prev;
    });
  }, [formData.gigimage, formData.images]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      allImagePreviews.forEach((preview) => {
        if (preview.url && preview.url.startsWith("blob:")) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [allImagePreviews]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text mb-6 text-center drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
        Basic Information
      </h2>

      {/* Hidden single file input used for replace */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        onChange={handleReplaceFile}
        className="hidden"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8">
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-cyan-300 mb-2 tracking-wide">
            Gig Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., I will create a stunning web application"
            className="w-full px-4 py-3 sm:py-4 bg-gray-900/80 border border-gray-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-cyan-300 mb-2 tracking-wide">
            Username *
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="e.g., yourusername"
            className="w-full px-4 py-3 sm:py-4 bg-gray-900/80 border border-gray-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-cyan-300 mb-2 tracking-wide">
            Category *
          </label>
          <div className="relative group">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5 group-focus-within:text-cyan-300 transition-colors duration-300" />
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="e.g., Web Development, Graphic Design"
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-900/80 border border-gray-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-cyan-300 mb-2 tracking-wide">
            Price *
          </label>
          <div className="relative group">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5 group-focus-within:text-cyan-300 transition-colors duration-300" />
            <input
              type="text"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Price"
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-900/80 border border-gray-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base"
              required
            />
          </div>
        </div>
        <div className="space-y-2 lg:col-span-2">
          <label className="block text-sm sm:text-base font-medium text-cyan-300 mb-2 tracking-wide">
            Delivery Time (Days) *
          </label>
          <div className="relative group max-w-md">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5 group-focus-within:text-cyan-300 transition-colors duration-300" />
            <input
              type="number"
              value={formData.deliveryTime}
              onChange={(e) =>
                setFormData({ ...formData, deliveryTime: e.target.value })
              }
              placeholder="e.g., 3"
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-900/80 border border-gray-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Configure All Packages *
        </h3>
        <div className="relative bg-gray-900/50 rounded-xl p-2 border border-gray-700/50 backdrop-blur-sm shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl"></div>
          <div className="flex relative z-10">
            {["basic", "standard", "pro"].map((pkgName) => (
              <button
                key={pkgName}
                type="button"
                onClick={() => setActivePackageTab(pkgName)}
                className={`flex-1 text-center py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 relative overflow-hidden
                  ${
                    activePackageTab === pkgName
                      ? "bg-gradient-to-r from-cyan-600/80 via-blue-600/80 to-purple-600/80 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
              >
                {activePackageTab === pkgName && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-pulse"></div>
                )}
                <span className="relative z-10">
                  {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative p-6 bg-gray-900/50 border border-gray-700/50 rounded-xl backdrop-blur-sm shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-xl"></div>
          <div className="relative z-10">
            {activePackageTab === "basic" && (
              <PackageFields
                pkgName="basic"
                pkg={packageData.basic}
                handlePackageChange={handlePackageChange}
              />
            )}
            {activePackageTab === "standard" && (
              <PackageFields
                pkgName="standard"
                pkg={packageData.standard}
                handlePackageChange={handlePackageChange}
              />
            )}
            {activePackageTab === "pro" && (
              <PackageFields
                pkgName="pro"
                pkg={packageData.pro}
                handlePackageChange={handlePackageChange}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm sm:text-base font-medium text-cyan-300 mb-3 tracking-wide">
          Gig Image
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleGigImageChange}
            className="block w-full sm:flex-1 text-sm text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800   file:text-cyan-400 hover:file:from-cyan-500/20 hover:file:to-blue-500/20 file:transition-all file:duration-300 file:shadow-lg hover:file:shadow-cyan-500/20"
          />
          <button
            type="button"
            onClick={handleGigImageUpload}
            disabled={isUploadingGig || !gigImageFile}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-lg min-w-fit ${
              isUploadingGig || !gigImageFile
                ? "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50"
                : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/30 shadow-cyan-500/25 hover:shadow-cyan-500/40"
            }`}
          >
            <Upload className="w-4 h-4" />
            {isUploadingGig ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm sm:text-base font-medium text-cyan-300 mb-3 tracking-wide">
          Images to Showcase
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleShowcaseImagesChange}
            className="block w-full sm:flex-1 text-sm text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-cyan-400 hover:file:from-cyan-500/20 hover:file:to-blue-500/20 file:transition-all file:duration-300 file:shadow-lg hover:file:shadow-cyan-500/20"
          />
          <button
            type="button"
            onClick={handleShowcaseImagesUpload}
            disabled={isUploadingShowcase || showcaseImageFiles.length === 0}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-lg min-w-fit ${
              isUploadingShowcase || showcaseImageFiles.length === 0
                ? "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50"
                : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/30 shadow-cyan-500/25 hover:shadow-cyan-500/40"
            }`}
          >
            <Upload className="w-4 h-4" />
            {isUploadingShowcase ? "Uploading..." : "Upload"}
          </button>
        </div>

        {allImagePreviews.length > 0 && (
          <div className="space-y-4">
            <span className="block text-sm text-cyan-300 font-medium tracking-wide">
              Showcase Images Preview:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {allImagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="relative overflow-hidden rounded-xl border border-gray-700/50 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                    <img
                      src={preview.url || "/placeholder.svg"}
                      alt={`${
                        preview.type === "gig" ? "Gig" : "Showcase"
                      } image ${index + 1}`}
                      className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                      }}
                    />

                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => triggerReplace(index)}
                        disabled={isReplacing}
                        title="Replace image"
                        className="bg-cyan-600/80 hover:bg-cyan-500 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2 text-xs text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span className="hidden sm:inline">
                          {isReplacing && replaceIndex === index
                            ? "Replacing..."
                            : "Replace"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => removePreview(index)}
                        title="Remove image"
                        className="bg-red-600/80 hover:bg-red-500 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2 text-xs text-white transition-all duration-300 shadow-lg hover:shadow-red-500/30 border border-red-400/30"
                      >
                        <X className="w-3 h-3" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>

                    <span className="absolute top-2 left-2 bg-gray-900/90 backdrop-blur-sm text-cyan-300 text-xs px-2 py-1 rounded-md border border-cyan-500/30">
                      {preview.type === "gig" ? "Gig Image" : "Showcase"}
                    </span>

                    <span className="absolute top-2 right-2 bg-gray-800/90 backdrop-blur-sm text-xs text-gray-200 px-2 py-1 rounded-md border border-gray-600/50">
                      {preview.uploaded ? "Saved" : "Local"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm sm:text-base font-medium text-cyan-300 tracking-wide">
          Gig Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe your gig in detail..."
          rows={6}
          className="w-full px-4 py-4 bg-gray-900/80 border border-gray-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 shadow-lg focus:shadow-cyan-500/20 resize-none text-sm sm:text-base leading-relaxed"
          required
        />
      </div>
    </div>
  );
}
