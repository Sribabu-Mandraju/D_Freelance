"use client"

import { useState } from "react"
import { Clock, Check, Shield } from "lucide-react"

const ServiceSidebar = () => {
  const [selectedTier, setSelectedTier] = useState("starter")

  const serviceTiers = {
    starter: {
      name: "Starter",
      price: 50,
      deliveryTime: "2 days",
      revisions: 1,
      pages: 1,
      features: {
        contentUpload: true,
        responsiveDesign: true,
        sourceCode: true,
        designCustomization: false,
      },
    },
    standard: {
      name: "Standard",
      price: 100,
      deliveryTime: "4 days",
      revisions: 2,
      pages: 2,
      features: {
        contentUpload: true,
        responsiveDesign: true,
        sourceCode: true,
        designCustomization: true,
      },
    },
    advanced: {
      name: "Advanced",
      price: 150,
      deliveryTime: "7 days",
      revisions: 3,
      pages: 3,
      features: {
        contentUpload: true,
        responsiveDesign: true,
        sourceCode: true,
        designCustomization: true,
      },
    },
  }

  return (
    <div className="lg:w-96">
      <div className="sticky top-6 space-y-6">
        {/* Service Tier Selection */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white text-lg">Select service tier</h3>
            <a href="#" className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
              Compare tiers
            </a>
          </div>
          <div className="space-y-4 mb-6">
            {Object.entries(serviceTiers).map(([key, tier]) => (
              <label key={key} className="flex items-center space-x-4 cursor-pointer group">
                <input
                  type="radio"
                  name="serviceTier"
                  value={key}
                  checked={selectedTier === key}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-5 h-5 text-cyan-500 bg-gray-900 border-gray-600 focus:ring-cyan-400 focus:ring-2"
                />
                <div
                  className={`flex-1 flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                    selectedTier === key
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30"
                      : "bg-gray-900/30 border border-gray-700/30 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10"
                  }`}
                >
                  <span className="font-semibold text-white">{tier.name}</span>
                  <span className="font-bold text-xl text-cyan-400">${tier.price}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="border-t border-cyan-500/20 pt-6">
            <h4 className="font-bold text-white mb-3 text-lg">Basic Token Deployment</h4>
            <p className="text-sm text-gray-400 mb-6">Deploy an ERC-20 token contract with basic settings</p>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Delivery Time</span>
                <span className="font-semibold text-cyan-300">{serviceTiers[selectedTier].deliveryTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 underline">Number of Revisions</span>
                <span className="font-semibold text-cyan-300">{serviceTiers[selectedTier].revisions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 underline">Number of Pages</span>
                <span className="font-semibold text-gray-300">{serviceTiers[selectedTier].pages}</span>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300 underline">Content Upload</span>
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300 underline">Responsive Design</span>
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300 underline">Source Code</span>
                <Check className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
              <Clock className="w-4 h-4" />
              <span>2 days delivery — Aug 8, 2025</span>
            </div>
            <p className="text-xs text-gray-400 mb-6">Revisions may occur after this date.</p>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg transform hover:scale-105">
                Continue (${serviceTiers[selectedTier].price})
              </button>
              <button className="w-full border-2 border-cyan-500/50 text-white py-4 px-6 rounded-lg font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
                Message Sribabu
              </button>
            </div>
          </div>
        </div>

        {/* Payment Protection */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-lg">Upwork Payment Protection</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Fund the project upfront. Sribabu gets paid once you are satisfied with the work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceSidebar
