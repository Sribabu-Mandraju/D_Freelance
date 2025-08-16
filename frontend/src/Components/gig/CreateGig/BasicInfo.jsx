import { useState } from "react";
import { DollarSign, Clock, Tag } from "lucide-react";

// PackageFields component remains largely the same, but is now conditionally rendered
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

  const handlePackageChange = (pkgName, field, value) => {
    setPackageData((prev) => ({
      ...prev,
      [pkgName]: {
        ...prev[pkgName],
        [field]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: [{ url: e.target.value }],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <header className="bg-gradient-to-r from-blue-900 to-gray-900 p-4 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-center">Basic Information</h1>
      </header>
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
        <label className="block text-md md:text-lg font-medium mb-1">Gig Image URL (Main Image)</label>
        <input
          type="url"
          value={formData.images[0]?.url || ""}
          onChange={handleImageChange}
          placeholder="https://example.com/gig_image.jpg"
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/70 text-sm"
        />
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
      <button
        type="button"
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200"
      >
        Next Step
      </button>
    </div>
  );
}