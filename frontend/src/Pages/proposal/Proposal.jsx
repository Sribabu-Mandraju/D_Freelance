

import { useState, useEffect } from "react";
import BasicInfoStep from "../../Components/proposal/BasicInfo";
import ProjectDetailsStep from "../../Components/proposal/ProjectDetails";
import BudgetTimelineStep from "../../Components/proposal/BudgetTimeline";
import SkillsTagsStep from "../../Components/proposal/SkillTags";
import ReviewSubmitStep from "../../Components/proposal/ReviewSubmit";
import ProgressIndicator from "./ProgressIndicator";
import Navbar from "../../Components/Navbar";
const steps = [
  { id: 1, title: "Basic Info", component: BasicInfoStep },
  { id: 2, title: "Project Details", component: ProjectDetailsStep },
  { id: 3, title: "Budget & Timeline", component: BudgetTimelineStep },
  { id: 4, title: "Skills & Tags", component: SkillsTagsStep },
  { id: 5, title: "Review & Submit", component: ReviewSubmitStep },
];

export default function Proposal() {
  const [proposals, setProposals] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    budget: "",
    project_duration: "",
    user_wallet_address: "",
    tags: [],
    skills_requirement: [],
    isEditable: true,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    console.log("hi submit");

    try {
      const res = await fetch("http://localhost:3001/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.errors?.[0]?.msg || data.error || "Failed to create proposal"
        );
      }

      setSuccess(true);
      console.log("Proposal created:", data);

      // fetchProposals();

      // Optionally reset form after success
      setFormData({
        title: "",
        description: "",
        image: "",
        budget: "",
        project_duration: "",
        user_wallet_address: "",
        tags: [],
        skills_requirement: [],
        isEditable: true,
      });
      setCurrentStep(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const fetchProposals = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3001/api/proposals");
  //     const data = await res.json();
  //     setProposals(data);
  //   } catch (err) {
  //     console.error("Error fetching proposals:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchProposals();
  // }, []);

  const CurrentStepComponent = steps.find(
    (step) => step.id === currentStep
  )?.component;

  return (
    <div className=" mx-auto px-4 py-8 w-[95%] md:w-[70%] mt-[70px] md:mt-[50px] ">
    <Navbar/>
          <div className="mb-4">
            
          </div>
          {/* Header */}
          <div className="text-center md:mb-8 mb-4">
            <h1 className="md:text-5xl text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Create Your Proposal
            </h1>
            <p className="text-gray-300 md:text-lg text-sm">
              Tell us about your project and find the perfect Web3 developer
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            steps={steps}
            currentStep={currentStep}
            className="mb-8"
          />

          {/* Main Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <div
              className={`transition-all duration-300 ${
                isAnimating
                  ? "opacity-0 transform translate-x-4"
                  : "opacity-100 transform translate-x-0"
              }`}
            >
              {CurrentStepComponent && (
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={updateFormData}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  success={success}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-400">
            <p>
              Step {currentStep} of {steps.length}
            </p>
            {error && <p className="text-red-400 mt-2">{error}</p>}
            {/* {success && <p className="text-green-400 mt-2">✅ Proposal created successfully!</p>} */}
          </div>
       
     
    </div>
  );
}
