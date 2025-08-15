"use client";
import { useState } from "react";
import {
  Plus,
  X,
  DollarSign,
  Clock,
  Tag,
  BookOpen,
  Info,
  CheckCircle,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [{ url: "" }],
    category: "",
    deliveryTime: "",
    faqs: [],
    about: "",
    tags: [],
    skills: [],
  });

  const [packageData, setPackageData] = useState({
    basic: null,
    standard: null,
    pro: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const navigate = useNavigate();

  const createInitialPackage = () => ({
    hourlyPay: "",
    duration: "",
    custom_ui: "no",
    code_reviews: "",
  });

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: [{ url: e.target.value }],
    }));
  };

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
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
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
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSelectPackage = (pkgName) => {
    setSelectedPackage(pkgName);
    const newPackageState = {
      basic: null,
      standard: null,
      pro: null,
    };
    newPackageState[pkgName] = createInitialPackage();
    setPackageData(newPackageState);
  };

  const handlePackageChange = (pkgName, field, value) => {
    setPackageData((prev) => ({
      ...prev,
      [pkgName]: {
        ...(prev[pkgName] || {}),
        [field]: value,
      },
    }));
  };

  const validateStep1 = () => {
    const { title, category, description, deliveryTime } = formData;
    if (!title || !category || !description || !deliveryTime) {
      alert("Please fill in all top-level required fields.");
      return false;
    }

    if (!selectedPackage) {
      alert("Please select and configure a package (Basic, Standard, or Pro).");
      return false;
    }

    const pkg = packageData[selectedPackage];
    if (
      !pkg ||
      !pkg.hourlyPay ||
      !pkg.duration ||
      !pkg.custom_ui ||
      !pkg.code_reviews
    ) {
      alert(`Please fill in all fields for the ${selectedPackage} package.`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep1()) {
      return;
    }

    const termsCheckbox = e.target.elements["terms-checkbox"];
    if (!termsCheckbox || !termsCheckbox.checked) {
      alert("You must agree to the terms and conditions to submit your gig.");
      return;
    }

    const pkg = packageData[selectedPackage];
    const payload = {
      ...formData,
      deliveryTime: Number(formData.deliveryTime),
      images: formData.images.filter((img) => img.url),
      [selectedPackage]: {
        ...pkg,
        hourlyPay: Number(pkg.hourlyPay),
      },
    };

    try {
      const userToken = localStorage.getItem('authToken'); 
      if (!userToken) {
        alert("You are not logged in. Please log in to create a gig.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      
      const { data } = await axios.post(
        "http://localhost:3001/api/gigs",
        payload,
        config
      );
      console.log("Gig created successfully:", data);
      navigate(`/gig/${data._id}`);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error creating gig:", errorMessage);
      alert(`Error creating gig: ${errorMessage}`);
    }
  };

  const stepTitles = ["Basic Info", "Details & FAQs", "Review"];
  const stepIcons = [Info, BookOpen, CheckCircle];

  const renderPackageFields = (pkgName) => {
    const pkg = packageData[pkgName];
    if (!pkg) return null;

    return (
      <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
        <h4 className="text-white font-semibold mb-2">
          Configure {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)} Package
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Hourly Pay (USD) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                min="0"
                value={pkg.hourlyPay}
                onChange={(e) =>
                  handlePackageChange(pkgName, "hourlyPay", e.target.value)
                }
                className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 text-sm"
                placeholder="e.g., 20"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Duration (days or range) *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={pkg.duration}
                onChange={(e) =>
                  handlePackageChange(pkgName, "duration", e.target.value)
                }
                className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 text-sm"
                placeholder="e.g., 3 or 3-5"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Custom UI *
            </label>
            <select
              value={pkg.custom_ui}
              onChange={(e) =>
                handlePackageChange(pkgName, "custom_ui", e.target.value)
              }
              className="w-full pl-3 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
              required
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="client_choice">Client Choice</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Code Reviews / Revisions *
            </label>
            <input
              type="text"
              value={pkg.code_reviews}
              onChange={(e) =>
                handlePackageChange(pkgName, "code_reviews", e.target.value)
              }
              placeholder="e.g., 2 times, 3-5 times, unlimited"
              className="w-full pl-3 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 text-sm"
              required
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Create Your Gig
            </h1>
            <p className="text-xs text-gray-400">
              Showcase your skills and services to potential clients
            </p>
          </div>

          <div className="flex justify-center mb-3">
            <div className="flex items-center space-x-3">
              {[1, 2, 3].map((step) => {
                const Icon = stepIcons[step - 1];
                return (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${
                          currentStep >= step
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            : "bg-slate-700 text-gray-400"
                        }`}
                      >
                        {step}
                      </div>
                      <span
                        className={`text-xs mt-1 ${
                          currentStep >= step
                            ? "text-blue-400 font-semibold"
                            : "text-gray-500"
                        }`}
                      >
                        {stepTitles[step - 1]}
                      </span>
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-12 h-1 mx-2 ${
                          currentStep > step
                            ? "bg-gradient-to-r from-blue-500 to-purple-600"
                            : "bg-slate-700"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="flex-1 flex justify-center min-h-0">
                <div className="w-full max-w-2xl flex flex-col">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex-1 overflow-y-auto">
                      <h2 className="text-xl font-bold text-white mb-4 text-center">
                        Basic Information
                      </h2>
                      <div className="space-y-4">
                         <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Gig Title *
                          </label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData({ ...formData, title: e.target.value })
                            }
                            placeholder="e.g., I will create a stunning web application"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Category *
                          </label>
                          <div className="relative">
                            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              value={formData.category}
                              onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                              }
                              placeholder="e.g., Web Development, Graphic Design"
                              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-2">
                            Select a Package *
                          </label>
                          <div className="flex gap-3">
                            {["basic", "standard", "pro"].map((pkgName) => (
                              <button
                                key={pkgName}
                                type="button"
                                onClick={() => handleSelectPackage(pkgName)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                                  selectedPackage === pkgName
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent"
                                    : "bg-slate-700 text-gray-200 border-slate-600"
                                }`}
                              >
                                {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {selectedPackage && renderPackageFields(selectedPackage)}

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Delivery Time (Days) *
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="number"
                              value={formData.deliveryTime}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  deliveryTime: e.target.value,
                                })
                              }
                              placeholder="3"
                              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Gig Image URL (Main Image)
                          </label>
                          <input
                            type="url"
                            value={formData.images[0]?.url || ""}
                            onChange={handleImageChange}
                            placeholder="https://example.com/gig_image.jpg"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Gig Description *
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            placeholder="Describe your gig in detail, what will you offer..."
                            rows={6}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Details & FAQs */}
                  {currentStep === 2 && (
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 flex-1 overflow-y-auto">
                      <h2 className="text-xl font-bold text-white mb-5 text-center">
                        Additional Details & FAQs
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-base font-medium text-white mb-2">
                            About Your Gig (Optional)
                          </label>
                          <textarea
                            value={formData.about}
                            onChange={(e) =>
                              setFormData({ ...formData, about: e.target.value })
                            }
                            placeholder="Provide more information about yourself or your service..."
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-base font-medium text-white mb-2">
                            Tags (e.g., react, nodejs)
                          </label>
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="text"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addTag();
                                }
                              }}
                              placeholder="Enter tag and press Enter"
                              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                            />
                            <button
                              type="button"
                              onClick={addTag}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                              <span key={index} className="flex items-center gap-1 px-2 py-1 bg-slate-600 rounded-full text-sm text-gray-200">
                                {tag}
                                <button type="button" onClick={() => removeTag(index)} className="text-gray-400 hover:text-white ml-1">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-base font-medium text-white mb-2">
                            Skills (e.g., JavaScript, CSS)
                          </label>
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="text"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addSkill();
                                }
                              }}
                              placeholder="Enter skill and press Enter"
                              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                            />
                            <button
                              type="button"
                              onClick={addSkill}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, index) => (
                              <span key={index} className="flex items-center gap-1 px-2 py-1 bg-slate-600 rounded-full text-sm text-gray-200">
                                {skill}
                                <button type="button" onClick={() => removeSkill(index)} className="text-gray-400 hover:text-white ml-1">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-base font-medium text-white mb-2">
                            Frequently Asked Questions (FAQs)
                          </label>
                          <div className="space-y-3">
                            {formData.faqs.map((faq, index) => (
                              <div
                                key={index}
                                className="bg-slate-700 border border-slate-600 rounded-lg p-3 flex justify-between items-center"
                              >
                                <p className="text-gray-300 text-sm">
                                  <span className="font-semibold">Q:</span>{" "}
                                  {faq.question}
                                  <br />
                                  <span className="font-semibold">A:</span>{" "}
                                  {faq.answer}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => removeFaq(index)}
                                  className="text-red-400 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 p-4 bg-slate-700 border border-slate-600 rounded-lg">
                            <h4 className="text-white font-semibold mb-2">
                              Add New FAQ
                            </h4>
                            <input
                              type="text"
                              value={newFaqQuestion}
                              onChange={(e) => setNewFaqQuestion(e.target.value)}
                              placeholder="Question"
                              className="w-full px-3 py-2 mb-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                            <textarea
                              value={newFaqAnswer}
                              onChange={(e) => setNewFaqAnswer(e.target.value)}
                              placeholder="Answer"
                              rows={2}
                              className="w-full px-3 py-2 mb-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                            />
                            <button
                              type="button"
                              onClick={addFaq}
                              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add FAQ</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {currentStep === 3 && (
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex-1 overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">
                          Review Your Gig
                        </h2>
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-md font-medium">
                            Ready to submit
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-green-50/10 border border-green-500/20 rounded-lg p-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                             <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Info className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">
                                  Title
                                </span>
                              </div>
                              <p className="text-white font-semibold text-lg">
                                {formData.title}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Tag className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">
                                  Category
                                </span>
                              </div>
                              <p className="text-white font-semibold text-lg">
                                {formData.category}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <DollarSign className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">
                                  Package
                                </span>
                              </div>
                              <p className="text-white font-semibold text-lg">
                                {selectedPackage
                                  ? selectedPackage.toUpperCase()
                                  : "None"}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">
                                  Delivery Time
                                </span>
                              </div>
                              <p className="text-white font-semibold text-lg">
                                {formData.deliveryTime} Days
                              </p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className="text-xs font-medium text-gray-400">
                              Description
                            </span>
                            <p className="text-gray-300 text-xs leading-relaxed mt-1">
                              {formData.description}
                            </p>
                          </div>

                          {formData.about && (
                            <div className="mb-3">
                              <span className="text-xs font-medium text-gray-400">
                                About Gig
                              </span>
                              <p className="text-gray-300 text-xs leading-relaxed mt-1">
                                {formData.about}
                              </p>
                            </div>
                          )}

                          {formData.tags.length > 0 && (
                            <div className="mb-3">
                              <span className="text-xs font-medium text-gray-400">
                                Tags
                              </span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {formData.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-slate-700 rounded-full text-xs text-gray-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {formData.skills.length > 0 && (
                            <div className="mb-3">
                              <span className="text-xs font-medium text-gray-400">
                                Skills
                              </span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {formData.skills.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-slate-700 rounded-full text-xs text-gray-300"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {formData.faqs.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-gray-400">
                                FAQs
                              </span>
                              <div className="space-y-2 mt-1">
                                {formData.faqs.map((faq, index) => (
                                  <div
                                    key={index}
                                    className="bg-slate-700/50 p-2 rounded-md"
                                  >
                                    <p className="text-gray-300 text-xs">
                                      <span className="font-semibold">Q:</span>{" "}
                                      {faq.question}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                      <span className="font-semibold">A:</span>{" "}
                                      {faq.answer}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {formData.images[0]?.url && (
                          <div>
                            <span className="text-xs font-medium text-gray-400">
                              Gig Image
                            </span>
                            <img
                              src={formData.images[0].url}
                              alt="Gig preview"
                              className="w-full h-40 object-cover rounded-lg border border-slate-600 mt-1"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                        )}

                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-3">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Important Note
                          </h3>
                          <p className="text-sm text-gray-300 mb-3">
                            By submitting, you agree that your gig details are
                            accurate and you are authorized to offer these
                            services.
                          </p>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="terms-checkbox"
                              className="mr-2 accent-blue-500"
                              required
                            />
                            <span className="text-md text-gray-300">
                              I agree to the terms and conditions
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center py-3 border-t border-slate-700 mt-3 ">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm font-medium bg-red-600 rounded-lg"
                  >
                    Back
                  </button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (currentStep === 1) {
                          if (!validateStep1()) {
                            return;
                          }
                        }
                        setCurrentStep((s) => s + 1);
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all text-sm"
                    >
                      Create Gig
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}