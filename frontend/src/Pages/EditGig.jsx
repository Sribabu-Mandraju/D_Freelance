"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BasicInfo from "../Components/gig/CreateGig/BasicInfo";
import SkillsNfaqs from "../Components/gig/CreateGig/SkillsNfaqs";
import ReviewSubmit from "../Components/gig/CreateGig/ReviewSubmit";
import { Info, BookOpen, CheckCircle } from "lucide-react";

function createInitialPackage() {
  return {
    hourlyPay: "",
    duration: "",
    custom_ui: "no",
    code_reviews: "",
  };
}

export default function EditGig() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    title: "",
    description: "",
    gigimage: "",
    images: [{ url: "" }],
    category: "",
    price: "",
    deliveryTime: "",
    faqs: [],
    about: "",
    tags: [],
    skills: [],
    badges: [],
    projects: undefined,
    status: "Available",
    location: "",
    responseTime: "",
    successRate: undefined,
    avatar: "",
  });

  const [packageData, setPackageData] = useState({
    basic: createInitialPackage(),
    standard: createInitialPackage(),
    pro: createInitialPackage(),
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gig and prefill form + packages
  useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:3001/api/gigs/${id}`);

        // Populate top-level fields safely
        setFormData((prev) => ({
          ...prev,
          username: data.username ?? prev.username,
          title: data.title ?? prev.title,
          description: data.description ?? prev.description,
          gigimage:
            data.gigimage ??
            (Array.isArray(data.images) && data.images[0]?.url) ??
            prev.gigimage,
          images:
            Array.isArray(data.images) && data.images.length > 0
              ? data.images
              : prev.images,
          category: data.category ?? prev.category,
          price: data.price ?? prev.price,
          deliveryTime: data.deliveryTime ?? prev.deliveryTime,
          faqs: Array.isArray(data.faqs) ? data.faqs : prev.faqs,
          about: data.about ?? prev.about,
          tags: Array.isArray(data.tags) ? data.tags : prev.tags,
          skills: Array.isArray(data.skills) ? data.skills : prev.skills,
          badges: Array.isArray(data.badges) ? data.badges : prev.badges,
          projects: data.projects ?? prev.projects,
          status: data.status ?? prev.status,
          location: data.location ?? prev.location,
          responseTime: data.responseTime ?? prev.responseTime,
          successRate: data.successRate ?? prev.successRate,
          avatar: data.avatar ?? prev.avatar,
        }));

        // Populate packages (basic/standard/pro) with safe defaults
        setPackageData({
          basic: {
            hourlyPay:
              data.basic?.hourlyPay !== undefined
                ? String(data.basic.hourlyPay)
                : "",
            duration: data.basic?.duration ?? "",
            custom_ui: data.basic?.custom_ui ?? "no",
            code_reviews: data.basic?.code_reviews ?? "",
          },
          standard: {
            hourlyPay:
              data.standard?.hourlyPay !== undefined
                ? String(data.standard.hourlyPay)
                : "",
            duration: data.standard?.duration ?? "",
            custom_ui: data.standard?.custom_ui ?? "no",
            code_reviews: data.standard?.code_reviews ?? "",
          },
          pro: {
            hourlyPay:
              data.pro?.hourlyPay !== undefined ? String(data.pro.hourlyPay) : "",
            duration: data.pro?.duration ?? "",
            custom_ui: data.pro?.custom_ui ?? "no",
            code_reviews: data.pro?.code_reviews ?? "",
          },
        });

        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching gig for edit:",
          err.response ? err.response.data : err.message
        );
        setError(err);
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  // validation same as CreateGig
  const validateStep1 = () => {
    const {
      username,
      title,
      category,
      description,
      deliveryTime,
      gigimage,
      price,
    } = formData;
    if (
      !username ||
      !title ||
      !category ||
      !description ||
      !deliveryTime ||
      !gigimage ||
      !price
    ) {
      alert("Please fill in all top-level required fields.");
      return false;
    }
    const packages = ["basic", "standard", "pro"];
    for (const pkgName of packages) {
      const pkg = packageData[pkgName];
      if (!pkg.hourlyPay || !pkg.duration || !pkg.custom_ui || !pkg.code_reviews) {
        alert(`Please fill in all fields for the ${pkgName} package.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    const termsCheckbox = e.target.elements["terms-checkbox"];
    if (!termsCheckbox || !termsCheckbox.checked) {
      alert("You must agree to the terms and conditions to submit your gig.");
      return;
    }

    const payload = {
      ...formData,
      deliveryTime: Number(formData.deliveryTime),
      images: Array.isArray(formData.images)
        ? formData.images.filter((img) => img?.url)
        : [],
      basic: { ...packageData.basic, hourlyPay: Number(packageData.basic.hourlyPay) },
      standard: {
        ...packageData.standard,
        hourlyPay: Number(packageData.standard.hourlyPay),
      },
      pro: { ...packageData.pro, hourlyPay: Number(packageData.pro.hourlyPay) },
    };

    // remove undefined fields
    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    try {
      const userToken = localStorage.getItem("authToken");
      if (!userToken) {
        alert("You are not logged in. Please log in to update the gig.");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:3001/api/gigs/${id}`,
        payload,
        config
      );
      console.log("Gig updated successfully:", data);
      navigate(`/gig/${data._id}`);
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : err.message;
      console.error("Error updating gig:", errorMessage);
      alert(`Error updating gig: ${errorMessage}`);
    }
  };

  const stepTitles = ["Basic Info", "Details & FAQs", "Review & Submit"];
  const stepIcons = [Info, BookOpen, CheckCircle];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xl">
        Loading gig data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-500 text-xl">
        Error loading gig: {error.message || "Unknown error"}
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            formData={formData}
            setFormData={setFormData}
            packageData={packageData}
            setPackageData={setPackageData}
          />
        );
      case 2:
        return <SkillsNfaqs formData={formData} setFormData={setFormData} />;
      case 3:
        return <ReviewSubmit formData={formData} packageData={packageData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Navbar />
      <div className="pt-24 md:pt-32 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-white">
              Edit Your Gig
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Update details for your existing gig
            </p>
          </div>

          <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex items-center space-x-3 sm:space-x-6">
              {[1, 2, 3].map((step) => {
                const Icon = stepIcons[step - 1];
                return (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-lg border-2 transition-all duration-300 ${
                        currentStep >= step
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500"
                          : "bg-transparent text-gray-400 border-slate-700"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`hidden sm:block text-xs md:text-sm mt-2 ml-2 ${
                        currentStep >= step ? "text-blue-400 font-semibold" : "text-gray-500"
                      }`}
                    >
                      {stepTitles[step - 1]}
                    </span>
                    {step < 3 && (
                      <div
                        className={`w-12 sm:w-24 h-1 mx-2 ${
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

          <form onSubmit={handleSubmit}>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 sm:p-6 min-h-[500px]">
              {renderStep()}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-t border-slate-700 mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="w-full sm:w-auto px-6 py-3 text-gray-300 hover:text-white transition-colors text-sm font-medium bg-red-600 rounded-lg mb-2 sm:mb-0"
                >
                  Back
                </button>
              )}
              <div className="w-full sm:w-auto ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 1 && !validateStep1()) return;
                      setCurrentStep((s) => s + 1);
                    }}
                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all text-sm"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-lg font-semibold transition-all text-sm"
                  >
                    Update Gig
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
