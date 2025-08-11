"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQSection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      question: "Contract Testing",
      answer:
        "I provide comprehensive smart contract testing including unit tests, integration tests, and security audits to ensure your ERC-20 token functions correctly and securely.",
    },
    {
      question: "What blockchain networks do you support?",
      answer:
        "I support deployment on Ethereum mainnet, Binance Smart Chain, Polygon, and other EVM-compatible networks based on your requirements.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes, I provide post-deployment support and can help with any issues or modifications needed after the token is deployed.",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10"
          >
            <button
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-cyan-500/10 transition-all duration-300"
            >
              <span className="font-semibold text-white text-lg">{faq.question}</span>
              {expandedFaq === index ? (
                <ChevronUp className="w-6 h-6 text-cyan-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-cyan-400" />
              )}
            </button>
            {expandedFaq === index && (
              <div className="px-6 pb-5 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQSection
