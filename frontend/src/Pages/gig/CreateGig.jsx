"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
  BookOpen,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import BasicInfo from "../../Components/gig/CreateGig/BasicInfo";
import SkillsNfaqs from "../../Components/gig/CreateGig/SkillsNfaqs";
import ReviewSubmit from "../../Components/gig/CreateGig/ReviewSubmit";
import {
  setFormData,
  setPackageData,
  nextStep,
  prevStep,
  submitGig,
  resetGig,
} from "../../store/gigSlice/gigSlice";

export default function CreateGig() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    formData,
    packageData,
    currentStep,
    loading,
    error,
    submissionStatus,
  } = useSelector((state) => state.gig);

  const [validationErrors, setValidationErrors] = useState({});
  const [showTermsError, setShowTermsError] = useState(false);

  useEffect(() => {
    // Reset gig state when component mounts
    dispatch(resetGig());
  }, [dispatch]);

  const steps = [
    {
      id: 1,
      title: "Basic Info",
      description: "Gig details and package information",
      icon: Info,
    },
    {
      id: 2,
      title: "Skills & FAQs",
      description: "Skills, tags, and frequently asked questions",
      icon: BookOpen,
    },
    {
      id: 3,
      title: "Review & Submit",
      description: "Final review and submission",
      icon: CheckCircle,
    },
  ];

  const validateStep = (step) => {
    const errors = {};

    switch (step) {
      case 1:
        // Required top-level fields
        if (!formData.username?.trim())
          errors.username = "Username is required";
        if (!formData.title?.trim()) errors.title = "Title is required";
        if (!formData.category?.trim())
          errors.category = "Category is required";
        if (!formData.description?.trim())
          errors.description = "Description is required";
        if (!formData.deliveryTime?.trim())
          errors.deliveryTime = "Delivery time is required";
        if (!formData.gigimage?.trim())
          errors.gigimage = "Gig image is required";
        if (!formData.price?.trim()) errors.price = "Price is required";

        // Package validation
        const packages = ["basic", "standard", "pro"];
        packages.forEach((pkgName) => {
          const pkg = packageData[pkgName];
          if (!pkg.hourlyPay?.trim()) {
            errors[`${pkgName}_hourlyPay`] = `${
              pkgName.charAt(0).toUpperCase() + pkgName.slice(1)
            } package hourly pay is required`;
          }
          if (!pkg.duration?.trim()) {
            errors[`${pkgName}_duration`] = `${
              pkgName.charAt(0).toUpperCase() + pkgName.slice(1)
            } package duration is required`;
          }
          if (!pkg.custom_ui?.trim()) {
            errors[`${pkgName}_custom_ui`] = `${
              pkgName.charAt(0).toUpperCase() + pkgName.slice(1)
            } package custom UI option is required`;
          }
          if (!pkg.code_reviews?.trim()) {
            errors[`${pkgName}_code_reviews`] = `${
              pkgName.charAt(0).toUpperCase() + pkgName.slice(1)
            } package code reviews is required`;
          }
        });
        break;

      case 2:
        // Skills and tags are optional but validate if provided
        if (formData.skills && formData.skills.length > 0) {
          formData.skills.forEach((skill, index) => {
            if (!skill.trim()) {
              errors[`skill_${index}`] = "Skill cannot be empty";
            }
          });
        }
        break;

      case 3:
        // Final validation before submission
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      dispatch(nextStep());
    }
  };

  const handlePrevious = () => {
    dispatch(prevStep());
  };

  const handleStepClick = (stepId) => {
    if (
      stepId < currentStep ||
      (stepId === currentStep + 1 && validateStep(currentStep))
    ) {
      dispatch({ type: "gig/setCurrentStep", payload: stepId });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    const termsCheckbox = e.target.elements["terms-checkbox"];
    if (!termsCheckbox || !termsCheckbox.checked) {
      setShowTermsError(true);
      return;
    }

    setShowTermsError(false);

    try {
      const result = await dispatch(submitGig({ formData, packageData }));
      if (result.meta.requestStatus === "fulfilled") {
        navigate(`/gig/${result.payload._id}`);
      } else {
        console.error("Submission failed:", result.payload);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            formData={formData}
            setFormData={(data) => dispatch(setFormData(data))}
            packageData={packageData}
            setPackageData={(data) => dispatch(setPackageData(data))}
            validationErrors={validationErrors}
          />
        );
      case 2:
        return (
          <SkillsNfaqs
            formData={formData}
            setFormData={(data) => dispatch(setFormData(data))}
            validationErrors={validationErrors}
          />
        );
      case 3:
        return (
          <ReviewSubmit
            formData={formData}
            packageData={packageData}
            validationErrors={validationErrors}
          />
        );
      default:
        return null;
    }
  };

  const getStepStatus = (stepId) => {
    if (currentStep === stepId) return "current";
    if (currentStep > stepId) return "completed";
    return "pending";
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>

            {/* Header */}
            <div className="text-center p-6 sm:p-8 border-b border-gray-700/50">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Create Your Gig
                </span>
              </h1>
              <p className="text-gray-300 text-lg">
                Showcase your skills and services to potential clients with our
                interactive gig builder
              </p>
            </div>

            {/* Step Indicator */}
            <div className="px-6 sm:px-8 py-6 w-full ">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => {
                  const status = getStepStatus(step.id);
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => handleStepClick(step.id)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                            status === "current"
                              ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] scale-110"
                              : status === "completed"
                              ? "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                              : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:scale-105"
                          }`}
                        >
                          {status === "completed" ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}
                        </button>
                        <div className="mt-3 text-center">
                          <p
                            className={`text-sm font-medium ${
                              status === "pending"
                                ? "text-gray-400"
                                : "text-white"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-xs text-gray-500 hidden sm:block max-w-24">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-4 ${
                            status === "completed"
                              ? "bg-gradient-to-r from-green-500 to-green-400"
                              : "bg-gray-700"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mx-6 sm:mx-8 mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error: {error}</span>
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className="px-6 sm:px-8 pb-8">
              <form onSubmit={handleSubmit}>
                <div className="min-h-[600px] bg-gray-900/20 rounded-xl p-6 border border-gray-700/30">
                  {renderStepContent()}
                </div>

                {/* Terms and Conditions */}
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms-checkbox"
                      className="mt-1 w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                      required
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="terms-checkbox"
                        className="text-sm text-gray-300"
                      >
                        I agree to the{" "}
                        <a
                          href="/terms"
                          className="text-cyan-400 hover:text-cyan-300 underline"
                        >
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy"
                          className="text-cyan-400 hover:text-cyan-300 underline"
                        >
                          Privacy Policy
                        </a>
                      </label>
                      {showTermsError && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          You must agree to the terms and conditions to submit
                          your gig.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col md:flex-row gap-2   justify-between items-center mt-8 pt-6 border-t border-gray-700/50">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>
                      Step {currentStep} of {steps.length}
                    </span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(currentStep / steps.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {currentStep < steps.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:scale-105"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Create Gig
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
