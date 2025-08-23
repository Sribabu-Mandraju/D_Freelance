"use client"

import { useState, useEffect, useRef } from "react"
import {
  Wallet,
  Search,
  FileText,
  Code,
  DollarSign,
  Star,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const navigate = useNavigate()

  const steps = [
    {
      number: 1,
      title: "Connect Your Wallet",
      description:
        "",
      icon: <Wallet className="w-6 h-6" />,
      color: "from-purple-500 to-cyan-500",
      position: { desktop: "top-0 left-1/2 -translate-x-1/2", mobile: "top-4" },
    },
    {
      number: 2,
      title: "Post or Browse Jobs",
      description:
        "",
      icon: <Search className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-500",
      position: { desktop: "top-1/4 right-0", mobile: "top-20" },
    },
    {
      number: 3,
      title: "Smart Contract Agreement",
      description:
        "",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500",
      position: { desktop: "bottom-1/4 right-0", mobile: "top-36" },
    },
    {
      number: 4,
      title: "Deliver Work & Review",
      description:
        "",
      icon: <Code className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      position: { desktop: "bottom-0 left-1/2 -translate-x-1/2", mobile: "top-52" },
    },
    {
      number: 5,
      title: "Instant Crypto Payment",
      description: "U",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-pink-500 to-cyan-500",
      position: { desktop: "bottom-1/4 left-0", mobile: "top-68" },
    },
    {
      number: 6,
      title: "Build Reputation",
      description: "",
      icon: <Star className="w-6 h-6" />,
      color: "from-cyan-500 to-purple-500",
      position: { desktop: "top-1/4 left-0", mobile: "top-84" },
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isVisible, steps.length])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 px-4 relative hidden sm:block overflow-hidden min-h-screen">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-0">
          <div className="inline-block mb-4 px-6 py-2 border border-cyan-500 text-cyan-400 rounded-full text-sm font-medium backdrop-blur-sm bg-gray-900/30">
            <Sparkles className="w-4 h-4 inline mr-2" />
            HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
            Simple Steps to Start
            <br />
            <span className="text-3xl md:text-5xl">Freelancing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our decentralized platform makes it easy to connect, collaborate, and get paid securely through blockchain
            technology.
          </p>
        </div>

        {/* Mind Map Layout */}
        <div className="relative">
          {/* Desktop Mind Map */}
          <div className="hidden lg:block">
            <MindMapDesktop steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>

          {/* Mobile/Tablet Vertical Layout */}
          <div className="lg:hidden">
            <MindMapMobile steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-32">
          <CTASection />
        </div>
      </div>
    </section>
  )
}

// Desktop Mind Map Component
const MindMapDesktop = ({ steps, activeStep, setActiveStep }) => {
  return (
    <div className="relative w-full h-[800px]  scale-[0.7]  mx-auto">
      {/* Central Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <CentralHub activeStep={activeStep} />
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 800 800">
        {steps.map((_, index) => {
          const angle = index * 60 - 90 // 60 degrees apart, starting from top
          const radian = (angle * Math.PI) / 180
          const radius = 280
          const x1 = 400
          const y1 = 400
          const x2 = 400 + Math.cos(radian) * radius
          const y2 = 400 + Math.sin(radian) * radius

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={activeStep === index ? "url(#activeGradient)" : "rgba(99, 102, 241, 0.3)"}
              strokeWidth={activeStep === index ? "3" : "2"}
              strokeDasharray={activeStep === index ? "0" : "5,5"}
              className="transition-all duration-500"
            />
          )
        })}
        <defs>
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Step Cards */}
      {steps.map((step, index) => {
        const angle = index * 60 - 90
        const radian = (angle * Math.PI) / 180
        const radius = 280
        const x = 50 + (Math.cos(radian) * radius) / 8
        const y = 50 + (Math.sin(radian) * radius) / 8

        return (
          <div
            key={index}
            className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            <StepCard step={step} index={index} isActive={activeStep === index} onClick={() => setActiveStep(index)} />
          </div>
        )
      })}
    </div>
  )
}

// Mobile Mind Map Component
const MindMapMobile = ({ steps, activeStep, setActiveStep }) => {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          {index > 0 && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
          )}
          <StepCard
            step={step}
            index={index}
            isActive={activeStep === index}
            onClick={() => setActiveStep(index)}
            isMobile={true}
          />
        </div>
      ))}
    </div>
  )
}

// Central Hub Component
const CentralHub = ({ activeStep }) => {
  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 p-1 animate-spin-slow">
        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{activeStep + 1}</div>
            <div className="text-xs text-gray-300">STEP</div>
          </div>
        </div>
      </div>

      {/* Pulsing rings */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping"></div>
      <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping delay-1000"></div>
    </div>
  )
}

// Enhanced Step Card Component
const StepCard = ({ step, index, isActive, onClick, isMobile = false }) => {
  return (
    <div
      className={`relative cursor-pointer transition-all duration-500 transform ${
        isActive ? "scale-110" : "scale-100 hover:scale-105"
      } ${isMobile ? "w-full max-w-md mx-auto" : "w-64"}`}
      onClick={onClick}
    >
      <div
        className={`relative bg-gray-900/80 backdrop-blur-md border rounded-2xl p-6 transition-all duration-500 ${
          isActive ? "border-cyan-400 shadow-2xl shadow-cyan-500/25" : "border-gray-700 hover:border-cyan-500/50"
        }`}
      >
        {/* Glowing top border */}
        <div
          className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${step.color} transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-50"
          }`}
        />

        {/* Step number badge */}
        <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
          {step.number}
        </div>

        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center mb-4 w-14 h-14 rounded-xl bg-gradient-to-r ${step.color} p-3 transition-all duration-300 ${
            isActive ? "animate-pulse" : ""
          }`}
        >
          <div className="text-white">{step.icon}</div>
        </div>

        {/* Content */}
        <h3
          className={`text-lg font-bold mb-3 transition-colors duration-300 ${
            isActive ? "text-cyan-300" : "text-white"
          }`}
        >
          {step.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed mb-4">{step.description}</p>

        {/* Active indicator */}
        {isActive && (
          <div className="flex items-center text-cyan-400 text-sm font-medium">
            <span>Active Step</span>
            <ArrowRight className="w-4 h-4 ml-2 animate-bounce-x" />
          </div>
        )}
      </div>
    </div>
  )
}

// Enhanced CTA Section
const CTASection = () => {
  const navigate = useNavigate()
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Decentralized & Secure",
      description: "No central authority, full blockchain security",
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: "1% Platform Fees",
      description: "Keep 100% of your earnings",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      title: "Global Marketplace",
      description: "Connect with talent worldwide",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      title: "Instant Payments",
      description: "Get paid immediately upon completion",
    },
  ]

  return (
    <div className="bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Ready to Start Your
            <br />
            Decentralized Journey?
          </h3>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            Join thousands of skilled professionals and clients already collaborating on the future of work through
            blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={()=>navigate("/browse-jobs")} className="group bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105">
              <span>Find Work</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group flex flex-row-reverse gap-2 border-2 border-gray-600 hover:border-purple-500 text-gray-200 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              <span>Hire Talent</span>
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-3 text-cyan-400" />
            Why Choose CryptoLance?
          </h4>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 group hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <div>
                  <h5 className="font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h5>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorksSection
