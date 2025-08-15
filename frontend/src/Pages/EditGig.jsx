
"use client"
import { useState, useEffect } from "react"
import { Plus, X, DollarSign, Clock, Tag, BookOpen, Repeat, Info, CheckCircle } from 'lucide-react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function EditGig() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [{ url: "", public_id: "" }],
    category: "",
    price: "",
    deliveryTime: "",
    revisions: "",
    faqs: [],
    about: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data } = await axios.get(`/api/gigs/${id}`);
        setFormData({ 
          ...data, 
          images: data.images.length > 0 ? data.images : [{ url: "", public_id: "" }], // Ensure images array always has at least one element
          price: data.price.toString(),
          deliveryTime: data.deliveryTime.toString(),
          revisions: data.revisions.toString(),
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gig for editing:", err.response ? err.response.data : err.message);
        setError(err);
        setLoading(false);
      }
    };
    fetchGig();
  }, [id]);

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [{ url: e.target.value, public_id: "dummy_id" }] });
  };

  const addFaq = () => {
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      setFormData({
        ...formData,
        faqs: [...formData.faqs, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }],
      });
      setNewFaqQuestion("");
      setNewFaqAnswer("");
    }
  };

  const removeFaq = (indexToRemove) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.put(`/api/gigs/${id}`, formData, config);
      console.log("Gig updated successfully:", data);
      navigate(`/gig/${data._id}`);
    } catch (error) {
      console.error("Error updating gig:", error.response ? error.response.data : error.message);
      alert("Error updating gig. Please check console for details.");
    }
  };

  const stepTitles = ["Basic Info", "Details & FAQs", "Review"]
  const stepIcons = [Info, BookOpen, CheckCircle]

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xl">Loading gig data...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-500 text-xl">Error loading gig: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Edit Your Gig
            </h1>
            <p className="text-xs text-gray-400">
              Update details for your existing gig
            </p>
          </div>

          {/* Progress Steps - Compact */}
          <div className="flex justify-center mb-3">
            <div className="flex items-center space-x-3">
              {[1, 2, 3].map((step) => {
                const Icon = stepIcons[step - 1]
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
                      <span className={`text-xs mt-1 ${
                        currentStep >= step ? "text-blue-400 font-semibold" : "text-gray-500"
                      }`}>
                        {stepTitles[step - 1]}
                      </span>
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-12 h-1 mx-2 ${
                          currentStep > step ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-slate-700"
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form Content - Takes remaining space */}
          <div className="flex-1 flex flex-col min-h-0">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              {/* Form Steps - Scrollable content area */}
              <div className="flex-1 flex justify-center min-h-0">
                <div className="w-full max-w-2xl flex flex-col">
                  
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex-1 overflow-y-auto">
                      <h2 className="text-xl font-bold text-white mb-4 text-center">Basic Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Gig Title *
                          </label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              placeholder="e.g., Web Development, Graphic Design"
                              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Price (USD) *
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="number"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              placeholder="50"
                              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Delivery Time (Days) *
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="number"
                              value={formData.deliveryTime}
                              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                              placeholder="3"
                              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-white mb-1">
                            Number of Revisions *
                          </label>
                          <div className="relative">
                            <Repeat className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="number"
                              value={formData.revisions}
                              onChange={(e) => setFormData({ ...formData, revisions: e.target.value })}
                              placeholder="2"
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
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                      <h2 className="text-xl font-bold text-white mb-5 text-center">Additional Details & FAQs</h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-base font-medium text-white mb-2">
                            About Your Gig (Optional)
                          </label>
                          <textarea
                            value={formData.about}
                            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                            placeholder="Provide more information about yourself or your service..."
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base resize-none"
                          />
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
                                  <span className="font-semibold">Q:</span> {faq.question}<br/>
                                  <span className="font-semibold">A:</span> {faq.answer}
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
                            <h4 className="text-white font-semibold mb-2">Add New FAQ</h4>
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
                        <h2 className="text-2xl font-bold text-white">Review Your Gig</h2>
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-md font-medium">Ready to submit</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-green-50/10 border border-green-500/20 rounded-lg p-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Info className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Title</span>
                              </div>
                              <p className="text-white font-semibold text-lg">{formData.title}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Tag className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Category</span>
                              </div>
                              <p className="text-white font-semibold text-lg">{formData.category}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <DollarSign className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Price</span>
                              </div>
                              <p className="text-white font-semibold text-lg">${formData.price}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Delivery Time</span>
                              </div>
                              <p className="text-white font-semibold text-lg">{formData.deliveryTime} Days</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                <Repeat className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-medium text-gray-400">Revisions</span>
                              </div>
                              <p className="text-white font-semibold text-lg">{formData.revisions}</p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className="text-xs font-medium text-gray-400">Description</span>
                            <p className="text-gray-300 text-xs leading-relaxed mt-1">{formData.description}</p>
                          </div>

                          {formData.about && (
                            <div className="mb-3">
                              <span className="text-xs font-medium text-gray-400">About Gig</span>
                              <p className="text-gray-300 text-xs leading-relaxed mt-1">{formData.about}</p>
                            </div>
                          )}

                          {formData.faqs.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-gray-400">FAQs</span>
                              <div className="space-y-2 mt-1">
                                {formData.faqs.map((faq, index) => (
                                  <div key={index} className="bg-slate-700/50 p-2 rounded-md">
                                    <p className="text-gray-300 text-xs">
                                      <span className="font-semibold">Q:</span> {faq.question}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                      <span className="font-semibold">A:</span> {faq.answer}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {formData.images[0]?.url && (
                          <div>
                            <span className="text-xs font-medium text-gray-400">Gig Image</span>
                            <img 
                              src={formData.images[0].url || "/placeholder.svg"} 
                              alt="Gig preview" 
                              className="w-full h-40 object-cover rounded-lg border border-slate-600 mt-1"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=160&width=400&text=Image+Preview";
                              }}
                            />
                          </div>
                        )}

                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-3">
                          <h3 className="text-lg font-semibold text-white mb-2">Important Note</h3>
                          <p className="text-sm text-gray-300 mb-3">
                            By submitting, you agree that your gig details are accurate and you are authorized to offer these services.
                          </p>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2 accent-blue-500" required />
                            <span className="text-md text-gray-300">I agree to the terms and conditions</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Buttons - Fixed at bottom */}
              <div className="flex justify-between items-center py-3 border-t border-slate-700 mt-3 ">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
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
                        // Basic validation for current step
                        if (currentStep === 1) {
                            if (!formData.title || !formData.category || !formData.price || !formData.deliveryTime || !formData.revisions || !formData.description) {
                                alert("Please fill in all required fields for Basic Information.");
                                return;
                            }
                        }
                        setCurrentStep(currentStep + 1)
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
                      Update Gig
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
  )
}
