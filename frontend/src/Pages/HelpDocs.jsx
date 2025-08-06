"use client"

import { useState } from "react"
import { Search, Book, MessageCircle, Shield, DollarSign, Users, ChevronRight } from "lucide-react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const HelpDocs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Topics", icon: <Book className="w-5 h-5" /> },
    { id: "getting-started", name: "Getting Started", icon: <Users className="w-5 h-5" /> },
    { id: "payments", name: "Payments & Escrow", icon: <DollarSign className="w-5 h-5" /> },
    { id: "security", name: "Security", icon: <Shield className="w-5 h-5" /> },
    { id: "disputes", name: "Disputes", icon: <MessageCircle className="w-5 h-5" /> },
  ]

  const helpArticles = [
    {
      id: 1,
      title: "How to Connect Your Wallet",
      category: "getting-started",
      description: "Learn how to connect your crypto wallet to CryptoLance",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: "How to Post Your First Job",
      category: "getting-started",
      description: "Step-by-step guide to posting a job on the platform",
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "Understanding Smart Contract Escrow",
      category: "payments",
      description: "How our escrow system protects both clients and freelancers",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "How to Submit a Winning Proposal",
      category: "getting-started",
      description: "Tips for freelancers to write compelling proposals",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Payment Methods and Cryptocurrencies",
      category: "payments",
      description: "Supported cryptocurrencies and payment processes",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "Dispute Resolution Process",
      category: "disputes",
      description: "How disputes are handled through decentralized arbitration",
      readTime: "7 min read",
    },
    {
      id: 7,
      title: "Account Security Best Practices",
      category: "security",
      description: "Keep your account and funds secure",
      readTime: "5 min read",
    },
    {
      id: 8,
      title: "Smart Contract Auditing Guidelines",
      category: "security",
      description: "What to look for when auditing smart contracts",
      readTime: "8 min read",
    },
  ]

  const faqs = [
    {
      question: "What cryptocurrencies does CryptoLance support?",
      answer:
        "We support major cryptocurrencies including ETH, USDC, USDT, and DAI. More currencies are being added regularly.",
    },
    {
      question: "How does the escrow system work?",
      answer:
        "When a job is accepted, funds are locked in a smart contract escrow. They're automatically released when the client approves the work, ensuring security for both parties.",
    },
    {
      question: "What happens if there's a dispute?",
      answer:
        "Disputes are resolved through our decentralized arbitration system, where neutral arbitrators review the case and make binding decisions.",
    },
    {
      question: "Are there any platform fees?",
      answer: "CryptoLance charges zero platform fees. You only pay blockchain gas fees for transactions.",
    },
  ]

  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-900">

      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
              Help Center
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find answers to your questions and learn how to use CryptoLance
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                          : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Help Articles */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Help Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all cursor-pointer group"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{article.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Still Need Help?</h3>
                <p className="text-gray-400 mb-6">
                  Can't find what you're looking for? Our community and support team are here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                    Contact Support
                  </button>
                  <button className="border border-gray-600 hover:border-purple-500 text-gray-200 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
                    Join Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default HelpDocs;
