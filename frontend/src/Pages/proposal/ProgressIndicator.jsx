export default function ProgressIndicator({ steps, currentStep, className = "" }) {
  return (
    <div className={`md:flex hidden items-center justify-center ${className}`}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step.id < currentStep
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : step.id === currentStep
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white ring-4 ring-cyan-400/30 shadow-lg shadow-cyan-500/25"
                    : "bg-slate-700 text-gray-400 border border-gray-600"
              }`}
            >
              {step.id < currentStep ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span className={`mt-2 text-xs font-medium ${step.id <= currentStep ? "text-cyan-400" : "text-gray-500"}`}>
              {step.title}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-1 mx-4 transition-all duration-300 rounded-full ${
                step.id < currentStep ? "bg-gradient-to-r from-cyan-400 to-blue-500" : "bg-slate-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
