import React, {   useState } from 'react';
import { Heart, Share2, Clock, Check, ChevronDown, ChevronUp, Play, DollarSign, ChevronLeft, ChevronRight, Star, Shield, Zap, Award } from 'lucide-react';
import Navbar from '../../Components/Navbar';


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
    <div className="min-h-screen bg-gradient-to-br  relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <Navbar />

      {/* Top Navigation */}
      {/* <div className="border-b border-cyan-500/20 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
      </div> */}

      {/* Breadcrumb */}
     

      <div className="max-w-7xl mt-[70px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                    You will get a Custom ERC-20 Token with Full Deployment on Ethereum
                  </h1>
                  <div className="flex items-center space-x-4 bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4">
                    <img
                      src="/professional-developer-avatar.png"
                      alt="Sribabu M."
                      className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
                    />
                    <div>
                      <span className="font-semibold text-white text-lg">Sribabu M.</span>
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
                  <button className="flex items-center space-x-2 bg-gray-900/50 border border-cyan-500/50 text-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
                    <Heart className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-gray-900/50 border border-purple-500/50 text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Service Showcase */}
            <div className="mb-8">
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden mb-6 shadow-2xl shadow-cyan-500/10" style={{ height: '450px' }}>
                <img
                  src={mainImage || "/placeholder.svg"}
                  alt="Service showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-3 rounded-full hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/30"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-cyan-400" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-3 rounded-full hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/30"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-cyan-400" />
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
                        ? 'border-2 border-cyan-500 shadow-lg shadow-cyan-500/25' 
                        : 'border border-gray-700/30 hover:border-cyan-500/50 hover:-translate-y-1'
                    }`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Let a pro handle section */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Let a pro handle the details
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Buy{' '}
                    <a href="#" className="text-cyan-400 underline hover:text-cyan-300 transition-colors">
                      Web Application Programming
                    </a>{' '}
                    services from Sribabu, priced and ready to go.
                  </p>
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
                    <Play className="w-4 h-4" />
                    <span>How it works</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Project details</h2>
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                <div className="prose max-w-none text-gray-300">
                  <p className="mb-4 text-base leading-relaxed">
                    I will create and deploy a fully functional, secure, and customized ERC-20 token smart contract on
                    your preferred blockchain network (Ethereum, BSC, or Polygon). Whether you're launching a utility
                    token, governance token, or just exploring blockchain capabilities, I ensure a clean and audit-ready
                    smart contract using Solidity and industry best practices.
                  </p>
                  <p className="mb-4 text-base leading-relaxed">
                    You'll receive complete source code, ownership transferred to your wallet, and optional verification
                    on Etherscan (or BSCScan/Polygonscan).
                  </p>
                  <p className="mb-4">
                    Per...{' '}
                    <a href="#" className="text-cyan-400 underline hover:text-cyan-300 transition-colors">
                      more
                    </a>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-4 rounded-lg border border-cyan-500/20">
                    <h3 className="font-semibold text-cyan-300 mb-2 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Programming Languages
                    </h3>
                    <p className="text-gray-300">JavaScript, Python, TypeScript</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-4 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-300 mb-2 flex items-center">
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
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What's included</h2>
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20">
                        <th className="text-left py-4 px-6 font-semibold text-white">Service Tiers</th>
                        <th className="text-center py-4 px-6 font-semibold text-white">
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg p-3">
                            Starter<br />
                            <span className="text-2xl font-bold">$50</span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-6 font-semibold text-white">
                          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-3">
                            Standard<br />
                            <span className="text-2xl font-bold">$100</span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-6 font-semibold text-white">
                          <div className="bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg p-3">
                            Advanced<br />
                            <span className="text-2xl font-bold">$150</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
                        <td className="py-4 px-6 text-gray-300 font-medium">Delivery Time</td>
                        <td className="text-center py-4 px-6 text-gray-300">2 days</td>
                        <td className="text-center py-4 px-6 text-gray-300">4 days</td>
                        <td className="text-center py-4 px-6 text-gray-300">7 days</td>
                      </tr>
                      <tr className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
                        <td className="py-4 px-6 text-gray-300 underline font-medium">Number of Revisions</td>
                        <td className="text-center py-4 px-6 text-gray-300">1</td>
                        <td className="text-center py-4 px-6 text-gray-300">2</td>
                        <td className="text-center py-4 px-6 text-gray-300">3</td>
                      </tr>
                      <tr className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
                        <td className="py-4 px-6 text-gray-300 underline font-medium">Number of Pages</td>
                        <td className="text-center py-4 px-6 text-gray-300">1</td>
                        <td className="text-center py-4 px-6 text-gray-300">2</td>
                        <td className="text-center py-4 px-6 text-gray-300">3</td>
                      </tr>
                      <tr className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 hover:bg-cyan-500/10 transition-colors">
                        <td className="py-4 px-6 text-gray-300 underline font-medium">Design Customization</td>
                        <td className="text-center py-4 px-6 text-gray-300">-</td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                        <td className="text-center py-4 px-6">
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
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
                      <tr className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 hover:bg-cyan-500/10 transition-colors">
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
                      <tr className="hover:bg-cyan-500/10 transition-colors">
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
                <div className="p-6 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-t border-cyan-500/20">
                  <h3 className="font-semibold text-white mb-2">Optional add-ons</h3>
                  <p className="text-sm text-gray-400 mb-3">You can add these on the next page.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Fast Delivery</span>
                    <span className="text-cyan-400 font-semibold">+$50 - $100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently asked questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
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

            {/* Steps for completing your project */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
              <h3 className="text-2xl font-bold text-white mb-6">Steps for completing your project</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-3 text-lg">
                      After purchasing the project, send requirements so Sribabu can start the project.
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Delivery time starts when Sribabu receives requirements from you.
                    </p>
                    <button className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 transition-colors">
                      <span>View requirements</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-3 text-lg">
                      Sribabu works on your project following the steps below.
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Revisions may occur after the delivery date.
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Check className="w-6 h-6 text-green-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white mb-2">Requirement Collection</h4>
                          <p className="text-gray-400">
                            Client submits token name, symbol, total supply, decimals, network preference, and wallet
                            address.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Check className="w-6 h-6 text-green-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white mb-2">Smart Contract Development</h4>
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
                    <h3 className="font-semibold text-white mb-3 text-lg">
                      Review the work, release payment, and leave feedback to Sribabu.
                    </h3>
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      What if I'm not happy with the work?
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* About Sribabu */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">About Sribabu</h3>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 transition-colors">
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
                  className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/50"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-white text-xl mb-3">
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
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
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
                      <div className={`flex-1 flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        selectedTier === key 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                          : 'bg-gray-900/30 border border-gray-700/30 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10'
                      }`}>
                        <span className="font-semibold text-white">{tier.name}</span>
                        <span className="font-bold text-xl text-cyan-400">
                          ${tier.price}
                        </span>
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
        </div>
      </div>
    </div>
  );
};

export default GigPage;