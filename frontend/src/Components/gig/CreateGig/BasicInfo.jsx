import { useState, useEffect, useRef } from "react";
import { DollarSign, Clock, Tag, Upload, X, RefreshCw } from "lucide-react";
import axios from "axios";

const PackageFields = ({ pkgName, pkg, handlePackageChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Hourly Pay (USD) *</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <input
              type="number"
              min="0"
              value={pkg.hourlyPay}
              onChange={(e) => handlePackageChange(pkgName, "hourlyPay", e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/70"
              placeholder="e.g., 20"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Duration (days or range) *</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <input
              type="text"
              value={pkg.duration}
              onChange={(e) => handlePackageChange(pkgName, "duration", e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/70"
              placeholder="e.g., 3 or 3-5"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Custom UI *</label>
          <select
            value={pkg.custom_ui}
            onChange={(e) => handlePackageChange(pkgName, "custom_ui", e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/70"
            required
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="client_choice">Client Choice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Code Reviews / Revisions *</label>
          <input
            type="text"
            value={pkg.code_reviews}
            onChange={(e) => handlePackageChange(pkgName, "code_reviews", e.target.value)}
            placeholder="e.g., 2 times, 3-5 times, unlimited"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/70"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default function BasicInfo({ formData, setFormData, packageData, setPackageData }) {
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

  const handlePackageChange = (pkgName, field, value) => {
    setPackageData((prev) => ({
      ...prev,
      [pkgName]: {
        ...prev[pkgName],
        [field]: value,
      },
    }));
  };

  const handleGigImageChange = (e) => {
    const file = e.target.files[0];
    setGigImageFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAllImagePreviews((prev) => {
        const newPreviews = prev.filter((p) => p.type !== "gig");
        return [{ url: previewUrl, type: "gig", uploaded: false }, ...newPreviews];
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
      uploaded: false, // mark as local until uploaded
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

      setFormData((prev) => ({
        ...prev,
        gigimage: secureUrl,
        images: [{ url: secureUrl }, ...prev.images.filter((img) => img.url !== prev.gigimage)],
      }));

      setAllImagePreviews((prev) => {
        const newPreviews = prev.filter((p) => p.type !== "gig");
        return [{ url: secureUrl, type: "gig", uploaded: true }, ...newPreviews];
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

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      setAllImagePreviews((prev) => {
        const newPreviews = prev.filter((p) => p.type !== "gig");
        return [...newPreviews, ...uploadedUrls.map((img) => ({ url: img.url, type: "showcase", uploaded: true }))];
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
        images: prev.images ? prev.images.filter((img) => img.url !== preview.url) : [],
      }));
    }

    // If it was a local (not uploaded) file in showcaseImageFiles, remove it from that array
    if (!preview.uploaded && preview.file) {
      setShowcaseImageFiles((prev) => prev.filter((f) => f.name !== preview.file.name || f.size !== preview.file.size));
    }
  };

  // Trigger replace flow: set index and open hidden input
  const triggerReplace = (index) => {
    setReplaceIndex(index);
    if (replaceInputRef.current) replaceInputRef.current.value = null; // reset
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
        prev.map((p, i) => (i === replaceIndex ? { url: secureUrl, type: p.type, uploaded: true } : p))
      );

      // If the replaced item is a showcase that exists in formData.images, replace it there too.
      const replacedPreview = allImagePreviews[replaceIndex];
      if (replacedPreview?.type === "showcase") {
        setFormData((prev) => ({
          ...prev,
          images: prev.images.map((img) => (img.url === replacedPreview.url ? { url: secureUrl } : img)),
        }));
      } else if (replacedPreview?.type === "gig") {
        // If the replaced item is the gig image, update gigimage and images[0]
        setFormData((prev) => ({
          ...prev,
          gigimage: secureUrl,
          images: [{ url: secureUrl }, ...prev.images.filter((img) => img.url !== prev.gigimage)],
        }));
      }

      alert("Image replaced successfully!");
    } catch (err) {
      console.error("Replace upload failed:", err);
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
      initialPreviews.push({ url: formData.gigimage, type: "gig", uploaded: true });
    }
    // other images
    if (Array.isArray(formData.images) && formData.images.length > 0) {
      initialPreviews.push(
        ...formData.images.map((img) => ({ url: img.url, type: "showcase", uploaded: true }))
      );
    }
    // preserve local previews (unuploaded) already tracked in allImagePreviews
    // but don't duplicate - merge existing local previews after uploaded ones
    const localUnuploaded = allImagePreviews.filter((p) => !p.uploaded);
    const merged = [...initialPreviews, ...localUnuploaded];
    setAllImagePreviews(merged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <header className="bg-gradient-to-r from-blue-900 to-gray-900 p-4 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-center">Basic Information</h1>
      </header>

      {/* Hidden single file input used for replace */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        onChange={handleReplaceFile}
        className="hidden"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-md md:text-lg font-medium mb-1">Gig Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., I will create a stunning web application"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/70 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium mb-1">Username *</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="e.g., yourusername"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/70 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium mb-1">Category *</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., Web Development, Graphic Design"
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/70 text-sm"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium mb-1">Price *</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Price"
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/70 text-sm"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-md md:text-lg font-medium mb-1">Delivery Time (Days) *</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="number"
              value={formData.deliveryTime}
              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
              placeholder="e.g., 3"
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/70 text-sm"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <h3 className="text-xl font-bold">Configure All Packages *</h3>
        <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
          {["basic", "standard", "pro"].map((pkgName) => (
            <button
              key={pkgName}
              type="button"
              onClick={() => setActivePackageTab(pkgName)}
              className={`flex-1 text-center py-2 px-4 rounded-md font-semibold text-sm transition-all duration-200
                ${activePackageTab === pkgName
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
          {activePackageTab === "basic" && (
            <PackageFields pkgName="basic" pkg={packageData.basic} handlePackageChange={handlePackageChange} />
          )}
          {activePackageTab === "standard" && (
            <PackageFields pkgName="standard" pkg={packageData.standard} handlePackageChange={handlePackageChange} />
          )}
          {activePackageTab === "pro" && (
            <PackageFields pkgName="pro" pkg={packageData.pro} handlePackageChange={handlePackageChange} />
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-md md:text-lg font-medium mb-1">Gig Image</label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleGigImageChange}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20"
          />
          <button
            type="button"
            onClick={handleGigImageUpload}
            disabled={isUploadingGig || !gigImageFile}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              isUploadingGig || !gigImageFile ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Upload className="w-4 h-4" />
            {isUploadingGig ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-md md:text-lg font-medium mb-1">Images to Showcase</label>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleShowcaseImagesChange}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20"
          />
          <button
            type="button"
            onClick={handleShowcaseImagesUpload}
            disabled={isUploadingShowcase || showcaseImageFiles.length === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              isUploadingShowcase || showcaseImageFiles.length === 0 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Upload className="w-4 h-4" />
            {isUploadingShowcase ? "Uploading..." : "Upload"}
          </button>
        </div>

        {allImagePreviews.length > 0 && (
          <div className="mt-3">
            <span className="block text-sm text-gray-400 mb-1">Showcase Images Preview:</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allImagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview.url}
                    alt={`${preview.type === "gig" ? "Gig" : "Showcase"} image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-slate-600"
                    onError={(e) => { e.target.src = "/placeholder.svg"; }}
                  />

                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => triggerReplace(index)}
                      disabled={isReplacing}
                      title="Replace image"
                      className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded flex items-center gap-2 text-sm text-white"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{isReplacing && replaceIndex === index ? "Replacing..." : "Replace"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => removePreview(index)}
                      title="Remove image"
                      className="bg-red-600/80 hover:bg-red-600 px-3 py-2 rounded flex items-center gap-2 text-sm text-white"
                    >
                      <X className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <span className="absolute top-2 left-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                    {preview.type === "gig" ? "Gig Image" : "Showcase Image"}
                  </span>

                  {/* small badge for uploaded/local */}
                  <span className="absolute top-2 right-2 bg-gray-800/70 text-xs text-gray-200 px-2 py-0.5 rounded">
                    {preview.uploaded ? "Saved" : "Local"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <label className="block text-md md:text-lg font-medium mb-1">Gig Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your gig in detail..."
          rows={6}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/70 resize-none text-sm"
          required
        />
      </div>
    </div>
  );
}
