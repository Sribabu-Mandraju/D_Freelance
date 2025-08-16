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
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background gradients from HeroSection */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-cyan-600/20 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-2/3 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid overlay from HeroSection */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10">
        <Navbar />
        <div className="pt-32 pb-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12 animate__animated animate__fadeIn animate__delay-1s">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 animate__animated animate__pulse">
                Help Center
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-lg animate__animated animate__fadeInUp">
                Find answers to your questions and learn how to use CryptoLance
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-6 h-6 animate__animated animate__bounceIn" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 bg-gray-800/70 border border-purple-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-lg transition-all duration-300 hover:shadow-2xl animate__animated animate__zoomIn"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800/60 backdrop-blur-md border border-purple-700 rounded-xl p-6 sticky top-24 shadow-2xl animate__animated animate__slideInLeft">
                  <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-purple-600/30 text-purple-300 border border-purple-500 shadow-inner animate__animated animate__pulse"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/50 hover:shadow-md"
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
                  <h2 className="text-3xl font-bold text-white mb-6 glow animate__animated animate__fadeInDown">Help Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((article) => (
                      <div
                        key={article.id}
                        className="relative w-full bg-blue-600/30 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden hover:bg-purple-600/30 transition-all duration-300 cursor-pointer group animate__animated animate__zoomIn animate__delay-0.5s"
                      >
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors relative z-10">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 mb-4 relative z-10">{article.description}</p>
                        <div className="flex justify-between items-center relative z-10">
                          <span className="text-sm text-gray-500">{article.readTime}</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors animate__animated animate__bounce" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 glow animate__animated animate__fadeInDown">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="relative w-full bg-blue-600/30 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden hover:bg-purple-600/30 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-0.5s"
                      >
                        <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{faq.question}</h3>
                        <p className="text-gray-300 leading-relaxed relative z-10">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Support */}
                <div
                  className="relative w-full bg-blue-600/30 backdrop-blur-xl rounded-xl p-8 text-center border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden hover:bg-purple-600/30 transition-all duration-300 animate__animated animate__zoomIn"
                >
                  <h3 className="text-3xl font-bold text-white mb-4 glow relative z-10">Still Need Help?</h3>
                  <p className="text-gray-400 mb-6 relative z-10">
                    Can't find what you're looking for? Our community and support team are here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 animate__animated animate__pulse">
                      Contact Support
                    </button>
                    <button className="border border-purple-700 hover:border-cyan-500 text-gray-200 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 animate__animated animate__pulse">
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
    </div>
  );
};

export default HelpDocs;