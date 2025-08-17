"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQSection = ({faqs}) => {
  const [expandedFaq, setExpandedFaq] = useState(null)

 

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
