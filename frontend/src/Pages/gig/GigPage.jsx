import React, { useState } from 'react';
import { Heart, Share2, Clock, Check, ChevronDown, ChevronUp, Play, DollarSign, ChevronLeft, ChevronRight, Star, Shield, Zap, Award } from 'lucide-react';

const GigPage = () => {
  const [selectedTier, setSelectedTier] = useState('starter');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mainImage, setMainImage] = useState('/erc20-token-showcase.png');
  
  const images = [
    '/erc20-token-showcase.png',
    '/smart-contract-code-editor.png',
    '/blockchain-deployment-interface.png',
    '/token-analytics-dashboard.png'
  ];

  const handlePrevImage = () => {
    setMainImage((prev) => {
      const currentIndex = images.indexOf(prev);
      return images[(currentIndex - 1 + images.length) % images.length];
    });
  };

  const handleNextImage = () => {
    setMainImage((prev) => {
      const currentIndex = images.indexOf(prev);
      return images[(currentIndex + 1) % images.length];
    });
  };

  const serviceTiers = {
    starter: {
      name: 'Starter',
      price: 50,
      deliveryTime: '2 days',
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
      name: 'Standard',
      price: 100,
      deliveryTime: '4 days',
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
      name: 'Advanced',
      price: 150,
      deliveryTime: '7 days',
      revisions: 3,
      pages: 3,
      features: {
        contentUpload: true,
        responsiveDesign: true,
        sourceCode: true,
        designCustomization: true,
      },
    },
  };

  const faqs = [
    {
      question: 'Contract Testing',
      answer:
      'I provide comprehensive smart contract testing including unit tests, integration tests, and security audits to ensure your ERC-20 token functions correctly and securely.',
    },
    {
      question: 'What blockchain networks do you support?',
      answer:
      'I support deployment on Ethereum mainnet, Binance Smart Chain, Polygon, and other EVM-compatible networks based on your requirements.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
      'Yes, I provide post-deployment support and can help with any issues or modifications needed after the token is deployed.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top Navigation */}
      <div className="border-b border-gray-700/30 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>🏠</span>
          <span className="hover:text-cyan-400 transition-colors">Development & IT</span>
          <span>›</span>
          <span className="hover:text-cyan-400 transition-colors">Development</span>
          <span>›</span>
          <span className="hover:text-cyan-400 transition-colors">Web Programming</span>
          <span>›</span>
          <span className="text-purple-400">Web Application Programming</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight">
                  You will get a Custom ERC-20 Token with Full Deployment on Ethereum
                </h1>
                <div className="flex items-center space-x-4 bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30">
                  <img
                    src="/professional-developer-avatar.png"
                    alt="Sribabu M."
                    className="w-12 h-12 rounded-full border-2 border-purple-500/50"
                  />
                  <div>
                    <span className="font-semibold text-gray-100 text-lg">Sribabu M.</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">(4.9) • 127 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-lg hover:from-purple-600/30 hover:to-cyan-600/30 transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  <span>Save</span>
                </button>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-lg hover:from-cyan-600/30 hover:to-purple-600/30 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Service Showcase */}
            <div className="mb-8">
              <div className="relative bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm rounded-xl overflow-hidden mb-6 border border-gray-700/30" style={{ height: '450px' }}>
                <img
                  src={mainImage || "/placeholder.svg"}
                  alt="Service showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 backdrop-blur-sm p-3 rounded-full hover:bg-slate-700/80 transition-all duration-300 border border-gray-600/30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-100" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 backdrop-blur-sm p-3 rounded-full hover:bg-slate-700/80 transition-all duration-300 border border-gray-600/30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-gray-100" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`Portfolio ${index + 1}`}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                      mainImage === img 
                        ? 'border-2 border-purple-500 shadow-lg shadow-purple-500/25' 
                        : 'border border-gray-700/30 hover:border-cyan-500/50'
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Let a pro handle section */}
            <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/20">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    Let a pro handle the details
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Buy{' '}
                    <a href="#" className="text-purple-400 underline hover:text-purple-300 transition-colors">
                      Web Application Programming
                    </a>{' '}
                    services from Sribabu, priced and ready to go.
                  </p>
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg">
                    <Play className="w-4 h-4" />
                    <span>How it works</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">Project details</h2>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <div className="prose max-w-none text-gray-300">
                  <p className="mb-4 text-lg leading-relaxed">
                    I will create and deploy a fully functional, secure, and customized ERC-20 token smart contract on
                    your preferred blockchain network (Ethereum, BSC, or Polygon). Whether you're launching a utility
                    token, governance token, or just exploring blockchain capabilities, I ensure a clean and audit-ready
                    smart contract using Solidity and industry best practices.
                  </p>
                  <p className="mb-4 text-lg leading-relaxed">
                    You'll receive complete source code, ownership transferred to your wallet, and optional verification
                    on Etherscan (or BSCScan/Polygonscan).
                  </p>
                  <p className="mb-4">
                    Per...{' '}
                    <a href="#" className="text-purple-400 underline hover:text-purple-300 transition-colors">
                      more
                    </a>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-gradient-to-br from-purple-900/20 to-transparent p-4 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-300 mb-2 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Programming Languages
                    </h3>
                    <p className="text-gray-300">JavaScript, Python, TypeScript</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-900/20 to-transparent p-4 rounded-lg border border-cyan-500/20">
                    <h3 className="font-semibold text-cyan-300 mb-2 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Coding Expertise
                    </h3>
                    <p className="text-gray-300">Cross Browser & Device Compatibility, Localization, Design</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">What's included</h2>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-b border-gray-700/30">
                        <th className="text-left py-4 px-6 font-semibold text-gray-100">Service Tiers</th>
                        <th className="text-center py-4 px-6 font-semibold text-gray-100">
                          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-3">
                            Starter<br />
                            <span className="text-2xl font-bold">$50</span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-6 font-semibold text-gray-100">
                          <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-lg p-3">
                            Standard<br />
                            <span className="text-2xl font-bold">$100</span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-6 font-semibold text-gray-100">
                          <div className="bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg p-3">
                            Advanced<br />
                            <span className="text-2xl font-bold">$150</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700/30 hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-6 text-gray-300 font-medium">Delivery Time</td>
                        <td className="text-center py-4 px-6 text-gray-300">2 days</td>
                        <td className="text-center py-4 px-6 text-gray-300">4 days</td>
                        <td className="text-center py-4 px-6 text-gray-300">7 days</td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-6 text-gray-300 underline font-medium">Number of Revisions</td>
                        <td className="text-center py-4 px-6 text-gray-300">1</td>
                        <td className="text-center py-4 px-6 text-gray-300">2</td>
                        <td className="text-center py-4 px-6 text-gray-300">3</td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-6 text-gray-300 underline font-medium">Number of Pages</td>
                        <td className="text-center py-4 px-6 text-gray-300">1</td>
                        <td className="text-center py-4 px-6 text-gray-300">2</td>
                        <td className="text-center py-4 px-6 text-gray-300">3</td>
                      </tr>
                      <tr className="border-b border-gray-700/30 bg-gradient-to-r from-purple-900/10 to-cyan-900/10 hover:from-purple-900/20 hover:to-cyan-900/20 transition-colors">
                        <td className="py-4 px-6 text-gray-300 underline font-medium">Design Customization</td>
                        <td className="text-center py-4 px-6 text-gray-300">-</td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700/30 hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-6 text-gray-300 font-medium">Content Upload</td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700/30 bg-gradient-to-r from-purple-900/10 to-cyan-900/10 hover:from-purple-900/20 hover:to-cyan-900/20 transition-colors">
                        <td className="py-4 px-6 text-gray-300 underline font-medium">Responsive Design</td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-6 text-gray-300 underline font-medium">Source Code</td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-gray-300 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-t border-gray-700/30">
                  <h3 className="font-semibold text-gray-100 mb-2">Optional add-ons</h3>
                  <p className="text-sm text-gray-400 mb-3">You can add these on the next page.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Fast Delivery</span>
                    <span className="text-purple-400 font-semibold">+$50 - $100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">Frequently asked questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300"
                    >
                      <span className="font-semibold text-gray-100 text-lg">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-6 h-6 text-purple-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-cyan-400" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-5 bg-gradient-to-r from-purple-900/10 to-cyan-900/10">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps for completing your project */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-6">Steps for completing your project</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-100 mb-3 text-lg">
                      After purchasing the project, send requirements so Sribabu can start the project.
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Delivery time starts when Sribabu receives requirements from you.
                    </p>
                    <button className="text-purple-400 hover:text-purple-300 flex items-center space-x-2 transition-colors">
                      <span>View requirements</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-100 mb-3 text-lg">
                      Sribabu works on your project following the steps below.
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Revisions may occur after the delivery date.
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Check className="w-6 h-6 text-green-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-100 mb-2">Requirement Collection</h4>
                          <p className="text-gray-400">
                            Client submits token name, symbol, total supply, decimals, network preference, and wallet
                            address.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Check className="w-6 h-6 text-green-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-100 mb-2">Smart Contract Development</h4>
                          <p className="text-gray-400">
                            I write a custom ERC-20 token contract in Solidity, following best practices for security
                            and gas optimization.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 mt-6 transition-colors">
                      <span>Show all</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-100 mb-3 text-lg">
                      Review the work, release payment, and leave feedback to Sribabu.
                    </h3>
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                      What if I'm not happy with the work?
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* About Sribabu */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-100">About Sribabu</h3>
                <a href="#" className="text-purple-400 hover:text-purple-300 flex items-center space-x-2 transition-colors">
                  <span>View profile</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
              <div className="flex items-start space-x-6 mb-6">
                <img
                  src="/professional-developer-avatar.png"
                  alt="Sribabu M."
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/50"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-100 text-xl mb-3">
                    MERN full stack | react JS | node | mongoDB | express | FIGMA
                  </h3>
                  <div className="flex items-center space-x-3 text-gray-400 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Eluru, India - 3:23 am local time</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    hi buddies ! i am passionate fullstack MERN developer and I am here to erase the boundary of limits
                    for improving my skills and collaborate with professionals in my interested field and share my
                    knowledge and I am passionate in building in best user friendly designs and responsive designs to...{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                      more
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-96">
            <div className="sticky top-6 space-y-6">
              {/* Service Tier Selection */}
              <div className="bg-slate-800/70 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-100 text-lg">Select service tier</h3>
                  <a href="#" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
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
                        className="w-5 h-5 text-purple-500 bg-slate-900 border-gray-600 focus:ring-purple-400 focus:ring-2"
                      />
                      <div className={`flex-1 flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        selectedTier === key 
                          ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30' 
                          : 'bg-slate-700/30 border border-gray-600/30 group-hover:border-purple-500/30'
                      }`}>
                        <span className="font-semibold text-gray-100">{tier.name}</span>
                        <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          ${tier.price}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="border-t border-gray-700/30 pt-6">
                  <h4 className="font-bold text-gray-100 mb-3 text-lg">Basic Token Deployment</h4>
                  <p className="text-sm text-gray-400 mb-6">Deploy an ERC-20 token contract with basic settings</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Delivery Time</span>
                      <span className="font-semibold text-purple-300">{serviceTiers[selectedTier].deliveryTime}</span>
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
                    <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg transform hover:scale-105">
                      Continue (${serviceTiers[selectedTier].price})
                    </button>
                    <button className="w-full border-2 border-gray-600 text-gray-200 py-4 px-6 rounded-lg font-semibold hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                      Message Sribabu
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Protection */}
              <div className="bg-slate-800/70 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100 mb-3 text-lg">Upwork Payment Protection</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Fund the project upfront. Sribabu gets paid once you are satisfied with the work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigPage;
