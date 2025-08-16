"use client"

import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { Briefcase, Users, Lock, Globe, ShieldCheck, Zap } from "lucide-react"

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-32 pb-16 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 mb-6">
            About CryptoLance
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CryptoLance is a next-generation freelance marketplace powered by blockchain technology. 
            We connect talented developers with clients worldwide, ensuring secure payments, transparency, 
            and trust through decentralized smart contracts.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          <div className="space-y-4 animate__animated animate__fadeInLeft">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-400">Our Mission</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Our mission is to revolutionize freelancing by eliminating unnecessary middlemen, reducing fees, 
              and providing a truly borderless platform. With blockchain escrow, clients only pay for 
              completed work, and developers are guaranteed timely and fair payments.
            </p>
          </div>
          <div className="space-y-4 animate__animated animate__fadeInRight">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">Why Blockchain?</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Blockchain ensures transparency and trust. Payments are locked in smart contracts and released 
              step by step as projects are completed. This protects both clients and developers from fraud 
              and creates a secure work environment.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            How CryptoLance Works
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gray-800/60 p-6 rounded-xl border border-purple-700 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate__animated animate__zoomIn">
              <div className="flex items-center justify-center mb-4">
                <Briefcase className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-3">1. Clients Post Projects</h3>
              <p className="text-sm sm:text-base text-gray-400 text-center">
                Clients describe their project, budget, and timeline. Developers from around the world can view and bid.
              </p>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-xl border border-purple-700 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate__animated animate__zoomIn animate__delay-1s">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-3">2. Developers Bid & Work</h3>
              <p className="text-sm sm:text-base text-gray-400 text-center">
                Skilled developers submit proposals. The client selects the best match, and the project begins.
              </p>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-xl border border-purple-700 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate__animated animate__zoomIn animate__delay-2s">
              <div className="flex items-center justify-center mb-4">
                <Lock className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-3">3. Secure Payments</h3>
              <p className="text-sm sm:text-base text-gray-400 text-center">
                Payments are released in milestones via smart contracts. Both parties are protected by blockchain escrow.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate__animated animate__fadeInUp">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-400">Our Vision</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            We envision a decentralized future where freelancers and clients collaborate without barriers, 
            supported by transparent blockchain systems. No hidden fees. No delays. Just fair work and fair pay.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-900/40 to-cyan-900/40 p-8 sm:p-10 rounded-xl border border-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 animate__animated animate__pulse">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Join the Future of Freelancing</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Whether you're a client with a project idea or a developer seeking opportunities, CryptoLance is your 
            gateway to secure, borderless collaboration.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About