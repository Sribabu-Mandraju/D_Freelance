import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2TechDetails from "./Step2TechDetails";
import Step3ReviewSubmit from "./Step3ReviewSubmit";

const PortfolioWizard = ({ 
  portfolioData, 
  isSubmitting, 
  submitMessage, 
  error,
  onUpdateNestedField,
  onUpdateArrayItem,
  onAddArrayItem,
  onRemoveArrayItem,
  onUpdateCurrentStatus,
  onUpdateTechHighlight,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    { id: 1, title: "Personal Info", description: "Basic information and profile" },
    { id: 2, title: "Tech Details", description: "Skills and current status" },
    { id: 3, title: "Review & Submit", description: "Final review and submission" }
  ];

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!portfolioData.heroSection.name?.trim()) {
          alert("Name is required to proceed");
          return false;
        }
        if (!portfolioData.contactInfo.email?.trim()) {
          alert("Email is required to proceed");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(portfolioData.contactInfo.email)) {
          alert("Please enter a valid email address");
          return false;
        }
        return true;
      case 2:
        return true; // Tech details are optional
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepId) => {
    if (stepId < currentStep || (stepId === currentStep + 1 && validateStep(currentStep))) {
      setCurrentStep(stepId);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalInfo
            portfolioData={portfolioData}
            onUpdateNestedField={onUpdateNestedField}
            onUpdateArrayItem={onUpdateArrayItem}
            onAddArrayItem={onAddArrayItem}
            onRemoveArrayItem={onRemoveArrayItem}
          />
        );
      case 2:
        return (
          <Step2TechDetails
            portfolioData={portfolioData}
            onUpdateArrayItem={onUpdateArrayItem}
            onAddArrayItem={onAddArrayItem}
            onRemoveArrayItem={onRemoveArrayItem}
            onUpdateCurrentStatus={onUpdateCurrentStatus}
            onUpdateTechHighlight={onUpdateTechHighlight}
          />
        );
      case 3:
        return (
          <Step3ReviewSubmit
            portfolioData={portfolioData}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            error={error}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>

          {/* Header */}
          <div className="text-center p-6 sm:p-8 border-b border-gray-700/50">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Create Your Portfolio
              </span>
            </h1>
            <p className="text-gray-300 text-lg">
              Build your professional presence with our interactive portfolio builder
            </p>
          </div>

          {/* Step Indicator */}
          <div className="px-6 sm:px-8 py-6 ">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        currentStep === step.id
                          ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                          : currentStep > step.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </button>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? "text-white" : "text-gray-400"
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id
                        ? "bg-gradient-to-r from-green-500 to-green-400"
                        : "bg-gray-700"
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="px-6 sm:px-8 pb-8">
            <div className="min-h-[600px]">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700/50">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Step {currentStep} of {totalSteps}</span>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-24"></div> // Spacer for alignment
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioWizard;
