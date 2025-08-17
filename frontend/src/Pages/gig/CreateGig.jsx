"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import BasicInfo from "../../Components/gig/CreateGig/BasicInfo";
import SkillsNfaqs from "../../Components/gig/CreateGig/SkillsNfaqs";
import ReviewSubmit from "../../Components/gig/CreateGig/ReviewSubmit";
import { Info, BookOpen, CheckCircle } from "lucide-react";

export default function CreateGig() {
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
  const navigate = useNavigate();

  function createInitialPackage() {
    return {
      hourlyPay: "",
      duration: "",
      custom_ui: "no",
      code_reviews: "",
    };
  }

  const validateStep1 = () => {
    const { username, title, category, description, deliveryTime, gigimage,price } = formData;
    if (!username || !title || !category || !description || !deliveryTime || !gigimage || !price) {
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
    if (!validateStep1()) {
      return;
    }
    const termsCheckbox = e.target.elements["terms-checkbox"];
    if (!termsCheckbox || !termsCheckbox.checked) {
      alert("You must agree to the terms and conditions to submit your gig.");
      return;
    }
    const payload = {
      ...formData,
      deliveryTime: Number(formData.deliveryTime),
      images: formData.images.filter((img) => img.url),
      basic: { ...packageData.basic, hourlyPay: Number(packageData.basic.hourlyPay) },
      standard: { ...packageData.standard, hourlyPay: Number(packageData.standard.hourlyPay) },
      pro: { ...packageData.pro, hourlyPay: Number(packageData.pro.hourlyPay) },
    };
    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
    try {
      const userToken = localStorage.getItem("authToken");
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
      const { data } = await axios.post("http://localhost:3001/api/gigs", payload, config);
      console.log("Gig created successfully:", data);
      navigate(`/gig/${data._id}`);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.error("Error creating gig:", errorMessage);
      alert(`Error creating gig: ${errorMessage}`);
    }
  };

  const stepTitles = ["Basic Info", "Details & FAQs", "Review & Submit"];
  const stepIcons = [Info, BookOpen, CheckCircle];

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
        return (
          <SkillsNfaqs
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <ReviewSubmit
            formData={formData}
            packageData={packageData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Navbar />
      <div className="pt-24 md:pt-32 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-white">Create Your Gig</h1>
            <p className="text-sm md:text-base text-gray-400">Showcase your skills and services to potential clients</p>
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
                      <Icon size={24} />
                    </div>
                    <span
                      className={`hidden sm:block text-xs md:text-sm mt-2 ml-2 ${
                        currentStep >= step
                          ? "text-blue-400 font-semibold"
                          : "text-gray-500"
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

            <div className="flex  justify-between items-center py-4 border-t border-slate-700 mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="w-auto px-6 py-3 text-gray-300 hover:text-white transition-colors text-sm font-medium bg-red-600 rounded-lg mb-2 sm:mb-0"
                >
                  Back
                </button>
              )}
              <div className="w-auto ml-auto">
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
                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500   rounded-lg font-semibold transition-all text-sm"
                  >
                    Create Gig
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}