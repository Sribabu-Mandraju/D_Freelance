"use client";

import { useState, useEffect } from "react";
import BasicInfoStep from "../../Components/proposal/BasicInfo";
import ProjectDetailsStep from "../../Components/proposal/ProjectDetails";
import BudgetTimelineStep from "../../Components/proposal/BudgetTimeline";
import SkillsTagsStep from "../../Components/proposal/SkillTags";
import ReviewSubmitStep from "../../Components/proposal/ReviewSubmit";
import ProgressIndicator from "./ProgressIndicator";

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

      fetchProposals();

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

  const fetchProposals = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/proposals");
      const data = await res.json();
      setProposals(data);
    } catch (err) {
      console.error("Error fetching proposals:", err);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const CurrentStepComponent = steps.find(
    (step) => step.id === currentStep
  )?.component;

  return (
    <div className="container mx-auto px-4 py-8 w-[95%] md:w-[70%] ">
      {!showCreateForm ? (
        <>
          {/* Header with Create Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Proposals</h1>
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:opacity-90 transition"
              onClick={() => setShowCreateForm(true)}
            >
              Create Proposal
            </button>
          </div>

          {/* Proposals List */}
          {proposals.length > 0 ? (
            <div className="grid gap-4">
              {proposals.map((proposal) => (
                <div
                  key={proposal._id}
                  className="bg-slate-800/50 p-4  rounded-xl border border-gray-700"
                >
                  <h2 className="text-xl font-semibold text-white">
                    {proposal.title}
                  </h2>
                  <p className="text-gray-400 text-sm break-all">
                    {proposal.description}
                  </p>
                  <p className="text-cyan-400 mt-2">
                    Budget: ${proposal.budget}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No proposals found.</p>
          )}
        </>
      ) : (
        <>
          <div className="mb-4">
            <button
              className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              onClick={() => setShowCreateForm(false)}
            >
              ← Back to Proposals
            </button>
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
        </>
      )}
    </div>
  );
}
