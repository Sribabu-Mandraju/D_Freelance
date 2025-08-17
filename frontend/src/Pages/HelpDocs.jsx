"use client";

import { useState } from "react";
import { Search, Book, MessageCircle, Shield, DollarSign, Users, ChevronRight } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const HelpDocs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: <Book className="w-5 h-5" /> },
    { id: "getting-started", name: "Getting Started", icon: <Users className="w-5 h-5" /> },
    { id: "payments", name: "Payments & Escrow", icon: <DollarSign className="w-5 h-5" /> },
    { id: "security", name: "Security", icon: <Shield className="w-5 h-5" /> },
    { id: "disputes", name: "Disputes", icon: <MessageCircle className="w-5 h-5" /> },
  ];

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
  ];

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
  ];

  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white font-sans">
      {/* Subtle Neon Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
           

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3 ">
              <div className="lg:col-span-3">

            {/* Search Bar */}
            <div className="mb-8">
              <div className="max-w-3xl mx-auto">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-300 w-5 h-5 transition-transform group-hover:scale-110" />
                  <input
                    type="text"
                    placeholder="Search help articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-cyan-500/50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 hover:bg-gray-800/70"
                  />
                </div>
              </div>
            </div>
              </div>
              {/* Categories Sidebar */}
              <div className="lg:col-span-3">
                <div className="bg-gray-800/30 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6 sticky top-40 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20">
                  <h3 className="text-xl font-semibold text-cyan-300 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-inner"
                            : "text-gray-300 hover:text-cyan-200 hover:bg-gray-700/30"
                        }`}
                      >
                        {category.icon}
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              </div>


              {/* Main Content */}
              <div className="lg:col-span-9 space-y-12">
                {/* Help Articles */}
                <div>
                  <h2 className="text-2xl font-semibold text-cyan-300 mb-6">Help Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((article) => (
                      <div
                        key={article.id}
                        className="bg-gray-800/30 backdrop-blur-lg border border-cyan-500/30 rounded-lg p-6 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer group"
                      >
                        <h3 className="text-lg font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-2">{article.description}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                <div>
                  <h2 className="text-2xl font-semibold text-cyan-300 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="bg-gray-800/30 backdrop-blur-lg border border-cyan-500/30 rounded-lg p-6 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                      >
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">{faq.question}</h3>
                        <p className="text-gray-300 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-gray-800/30 backdrop-blur-lg border border-cyan-500/30 rounded-lg p-8 text-center shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Still Need Help?</h3>
                  <p className="text-gray-300 mb-6">
                    Can't find what you're looking for? Reach out to our community or support team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                      Contact Support
                    </button>
                    <button className="border border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                      Join Community
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Tailwind CSS Configuration for Neon Effects */}
      <style jsx>{`
        @keyframes neon-glow {
          0% {
            text-shadow: 0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3);
          }
          100% {
            text-shadow: 0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.5);
          }
        }
        .neon-glow {
          animation: neon-glow 1.5s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default HelpDocs;