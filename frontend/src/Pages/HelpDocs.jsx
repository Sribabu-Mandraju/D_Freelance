"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Book,
  MessageCircle,
  Shield,
  DollarSign,
  Users,
  ChevronRight,
  X,
  ChevronLeft,
  Play,
  Pause,
  Sparkles,
  Bitcoin,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Globe,
  Zap,
  TrendingUp,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import wallet from "../assets/wallet.png";
import getStart from "../assets/getStart.png";
import accept from "../assets/accept.png";
import bid from "../assets/bid.png";
import cancel from "../assets/cancel.png";
import complete from "../assets/complete.png";
import createProposal from "../assets/createProposal.png";
import deposit from "../assets/deposit.png";
import firstPay from "../assets/firstPay.png";
import finalPay from "../assets/finalPay.png";
import initialiseProposal from "../assets/initialiseProposal.png";
import openBid from "../assets/openBid.png";
import secondPay from "../assets/secondPay.png";
import start from "../assets/start.png";

const HelpDocs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const touchStartXRef = useRef(null);
  const slideStartRef = useRef(null);
  const rafIdRef = useRef(null);
  const slideDuration = 4000; // 4 seconds per slide

  const slideshowData = [
    {
      id: 1,
      title: "Authentication",
      description:
        "Securely connect your Web3 wallet to log in and verify your identity.",
      image: wallet,
      features: ["Wallet Connection", "Authentication"],
    },
    {
      id: 2,
      title: "Getting Started",
      description:
        "Begin your journey on our secure and decentralized freelancing platform.",
      image: getStart,
      features: ["Dapp", "Get Started"],
    },
    {
      id: 3,
      title: "Create Proposal",
      description:
        "Post a proposal on-chain and set up secure payments for your project.",
      image: createProposal,
      features: ["Freelancing", "Create Work"],
    },
    {
      id: 4,
      title: "Initialize Proposal",
      description:
        "Save your proposal directly on the blockchain through smart contracts.",
      image: initialiseProposal,
      features: ["Blockchain", "Base Network"],
    },
    {
      id: 5,
      title: "Open Proposal for Bids",
      description:
        "Open your proposal for freelancers to bid, ensuring competitive pricing and efficiency.",
      image: openBid,
      features: ["Open Bid", "Base Network"],
    },
    {
      id: 6,
      title: "Bid on Proposal",
      description:
        "Freelancers can bid on proposals by spending 25 HFT tokens.",
      image: bid,
      features: ["Make Bid", "Get Work"],
    },
    {
      id: 7,
      title: "Accept a Bid",
      description:
        "Choose the most suitable freelancer to work on your proposal.",
      image: accept,
      features: ["Select Bidder", "Pay for Work"],
    },
    {
      id: 8,
      title: "Deposit Funds",
      description:
        "Securely lock project funds in the smart contract for safe payments.",
      image: deposit,
      features: ["Lock Funds", "Pay Freelancers"],
    },
    {
      id: 9,
      title: "Start Work",
      description:
        "Freelancers can start working once funds are deposited, ensuring guaranteed payments.",
      image: start,
      features: ["Freelancing", "Start Work"],
    },
    {
      id: 10,
      title: "First Payment",
      description:
        "Release 40% of the payment once the first milestone is completed.",
      image: firstPay,
      features: ["Milestone Payment"],
    },
    {
      id: 11,
      title: "Second Payment",
      description:
        "Release 30% of the payment after the second milestone is achieved.",
      image: secondPay,
      features: ["Milestone Payment"],
    },
    {
      id: 12,
      title: "Final Payment",
      description:
        "Release the remaining 30% once the final milestone is delivered.",
      image: finalPay,
      features: ["Milestone Payment"],
    },
    {
      id: 13,
      title: "Complete Work",
      description:
        "Close the proposal once all work is delivered and payments are made.",
      image: complete,
      features: ["Finish"],
    },
    {
      id: 14,
      title: "Cancel Proposal",
      description:
        "Cancel a proposal anytime. The client receives a refund of unused funds instantly.",
      image: cancel,
      features: ["Cancel"],
    },
  ];

  const categories = [
    { id: "all", name: "All Topics", icon: <Book className="w-5 h-5" /> },
    {
      id: "getting-started",
      name: "Getting Started",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "payments",
      name: "Payments & Escrow",
      icon: <DollarSign className="w-5 h-5" />,
    },
    { id: "security", name: "Security", icon: <Shield className="w-5 h-5" /> },
    {
      id: "disputes",
      name: "Disputes",
      icon: <MessageCircle className="w-5 h-5" />,
    },
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
      description:
        "How our escrow system protects both clients and freelancers",
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
      answer:
        "CryptoLance charges zero platform fees. You only pay blockchain gas fees for transactions.",
    },
  ];

  // Auto-advance slideshow and progress bar
  useEffect(() => {
    if (!showSlideshow || !isPlaying) return;

    const tick = (timestamp) => {
      if (!slideStartRef.current) slideStartRef.current = timestamp;
      const elapsed = timestamp - slideStartRef.current;
      const ratio = Math.min(1, elapsed / slideDuration);
      setProgress(ratio);

      if (ratio >= 1) {
        slideStartRef.current = timestamp;
        setProgress(0);
        setCurrentSlide((prev) => (prev + 1) % slideshowData.length);
      }

      if (isPlaying) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [showSlideshow, isPlaying, slideshowData.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGetStarted = () => {
    setShowSlideshow(true);
    setCurrentSlide(0);
    setIsPlaying(true);
    slideStartRef.current = null;
    setProgress(0);
  };

  const closeSlideshow = () => {
    setShowSlideshow(false);
    setIsPlaying(false);
    slideStartRef.current = null;
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowData.length);
    slideStartRef.current = null;
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slideshowData.length) % slideshowData.length
    );
    slideStartRef.current = null;
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    slideStartRef.current = null;
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      if (!prev) {
        slideStartRef.current = null;
      }
      return !prev;
    });
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current == null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    const threshold = 40;
    if (diff > threshold) prevSlide();
    else if (diff < -threshold) nextSlide();
    touchStartXRef.current = null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white font-sans">
      {/* Subtle Neon Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section with Logo, Time, and Title */}
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Live Status Bar */}
            <div className="bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-md rounded-2xl p-2 sm:p-4 mb-6 sm:mb-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
              <div className="md:hidden -mx-2 px-2">
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  <div className="shrink-0 inline-flex items-center gap-2 rounded-full border border-gray-700/60 bg-gray-800/60 px-3 py-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-gray-400">Live</span>
                    <span className="text-[10px] font-mono text-gray-300">
                      {currentTime.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="shrink-0 inline-flex items-center gap-2 rounded-full border border-gray-700/60 bg-gray-800/60 px-3 py-1.5">
                    <Bitcoin className="w-3.5 h-3.5 text-yellow-500" />
                    <span className="text-[11px] text-gray-300">BTC</span>
                    <span className="text-[11px] font-semibold text-gray-100">
                      $84,571.66
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                      <ArrowUpRight className="w-3 h-3" /> 2.4%
                    </span>
                  </div>
                  <div className="shrink-0 inline-flex items-center gap-2 rounded-full border border-gray-700/60 bg-gray-800/60 px-3 py-1.5">
                    <Coins className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[11px] text-gray-300">ETH</span>
                    <span className="text-[11px] font-semibold text-gray-100">
                      $1,946.28
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                      <ArrowDownRight className="w-3 h-3" /> 0.8%
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-wrap justify-between items-center text-[12px] gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-gray-400">Live</span>
                  <span className="text-gray-300 font-mono">
                    {currentTime.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-400">BTC</span>
                    <span className="text-gray-200 font-semibold">
                      $84,571.66
                    </span>
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">
                      <ArrowUpRight className="w-3.5 h-3.5" /> 2.4%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-400">ETH</span>
                    <span className="text-gray-200 font-semibold">
                      $1,946.28
                    </span>
                    <span className="inline-flex items-center gap-1 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded-full">
                      <ArrowDownRight className="w-3.5 h-3.5" /> 0.8%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Title Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 sm:px-8 sm:py-4 border border-purple-500/40 text-purple-300 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm hover:border-purple-400/60 hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300 shadow-lg shadow-purple-500/20">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                CryptoLance Help Center
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight px-2 sm:px-4 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-600 font-orbitron drop-shadow-2xl">
                  How to Use
                </span>
                <br />
                <span className="text-white font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-2xl">
                  CryptoLance Platform
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto px-2 sm:px-4">
                Learn how to navigate, create proposals, manage bids, and
                complete projects on our decentralized freelancing platform.
              </p>

              <button
                onClick={handleGetStarted}
                className="group flex items-center gap-2 sm:gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-500 hover:via-purple-400 hover:to-blue-500 text-white font-semibold md:font-bold text-base md:text-lg rounded-xl md:rounded-2xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-3xl border border-purple-400/30"
              >
                <Zap className="w-4 h-4 md:w-5 md:h-5" />
                Interactive Tutorial
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            {/* Interactive Tutorial Section */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-cyan-300 mb-8">
                  🚀 Interactive Platform Tutorial
                </h2>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  Master the future of freelancing with our comprehensive
                  step-by-step guide. Discover how blockchain technology
                  revolutionizes the way you work, earn, and collaborate.
                </p>
              </div>

              {/* Platform Description Card */}
              <div className="bg-gradient-to-br from-purple-900/40 via-gray-800/40 to-cyan-900/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl shadow-purple-500/20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/40 rounded-full">
                    <Globe className="w-6 h-6 text-purple-300" />
                    <span className="text-purple-200 font-semibold">
                      Decentralized Freelancing Revolution
                    </span>
                    <Globe className="w-6 h-6 text-cyan-300" />
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Welcome to the Future of Work
                  </h3>

                  <p className="text-lg sm:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
                    CryptoLance isn't just another freelancing platform—it's a
                    complete paradigm shift in how work gets done. Built on the
                    revolutionary Base Network blockchain, we're eliminating
                    intermediaries, reducing fees to zero, and creating a
                    trustless ecosystem where smart contracts ensure fair play
                    for everyone.
                  </p>
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-purple-200 mb-3">
                      🔐 Zero Trust, Maximum Security
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Smart contracts automatically handle payments, eliminating
                      the need to trust strangers. Your funds are locked in
                      blockchain escrow until work is verified and approved.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-cyan-200 mb-3">
                      💰 Zero Platform Fees
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Unlike traditional platforms that take 20-30% of your
                      earnings, CryptoLance charges absolutely nothing. You only
                      pay blockchain gas fees—keeping more money in your pocket.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-green-200 mb-3">
                      ⚡ Instant Global Payments
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Receive payments in cryptocurrency instantly, anywhere in
                      the world. No more waiting for bank transfers or dealing
                      with international payment delays.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-orange-200 mb-3">
                      🌍 Borderless Collaboration
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Work with clients and freelancers from anywhere on Earth.
                      Our platform transcends geographical boundaries and
                      traditional banking limitations.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 border border-pink-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-pink-200 mb-3">
                      ⏰ 24/7 Autonomous Operation
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Smart contracts never sleep. Your projects run on
                      autopilot with automatic milestone tracking, payment
                      releases, and dispute resolution—all without human
                      intervention.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 border border-indigo-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-indigo-200 mb-3">
                      📈 Transparent Reputation
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Build an immutable reputation on the blockchain. Every
                      successful project, payment, and review is permanently
                      recorded and verifiable by anyone.
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <button
                    onClick={handleGetStarted}
                    className="group flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-600 hover:from-purple-500 hover:via-purple-400 hover:to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-3xl border border-purple-400/30"
                  >
                    <Zap className="w-6 h-6 group-hover:animate-pulse" />
                    Start Interactive Tutorial
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                  <p className="text-gray-400 mt-4 text-sm">
                    🎯 Learn all 14 steps to master the platform in just minutes
                  </p>
                </div>
              </div>

              {/* How It Works Section */}
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-700/40 backdrop-blur-lg border border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-xl">
                <div className="text-center mb-12">
                  <h3 className="text-3xl sm:text-4xl font-bold text-cyan-300 mb-6">
                    🔄 How CryptoLance Works
                  </h3>
                  <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                    Our platform operates on a simple yet powerful principle:
                    <span className="text-cyan-300 font-semibold">
                      {" "}
                      Trust the code, not the company.
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">
                          Smart Contract Escrow
                        </h4>
                        <p className="text-gray-300">
                          When a project is accepted, funds are automatically
                          locked in a smart contract. This eliminates the need
                          for third-party escrow services and ensures instant,
                          secure fund management.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">2</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">
                          Milestone-Based Payments
                        </h4>
                        <p className="text-gray-300">
                          Payments are released automatically when milestones
                          are completed and verified. No more chasing payments
                          or waiting for client approval—the blockchain handles
                          everything.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">3</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">
                          Decentralized Dispute Resolution
                        </h4>
                        <p className="text-gray-300">
                          Conflicts are resolved through community-driven
                          arbitration, not corporate decisions. This ensures
                          fair, transparent, and unbiased resolution for all
                          parties involved.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-purple-200 mb-4 text-center">
                      🎯 Why Choose CryptoLance?
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Zero platform fees or hidden charges</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Instant cryptocurrency payments worldwide</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Transparent, immutable project history</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Community-driven governance and support</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Built on proven Base Network blockchain</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Categories Section */}
            
          </div>
        </div>
        <Footer />
      </div>

      {/* Interactive Tutorial Slideshow */}
      {showSlideshow && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-2"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full h-full max-w-6xl max-h-[95vh] bg-black rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800/50 z-20">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-[width] duration-[100ms] ease-linear"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>

            {/* Close Button */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
              <button
                onClick={closeSlideshow}
                className="p-2 sm:p-3 rounded-full w-full text-gray-200 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Close slideshow"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Slideshow Content */}
            <div
              className="relative select-none h-full flex flex-col"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Tap areas for next/prev on mobile */}
              <button
                onClick={prevSlide}
                className="absolute inset-y-0 left-0 w-1/3 z-10 bg-transparent transition-colors duration-200"
                aria-label="Previous slide"
              />
              <button
                onClick={nextSlide}
                className="absolute inset-y-0 right-0 w-1/3 z-10 bg-transparent transition-colors duration-200"
                aria-label="Next slide"
              />

              {/* Main Slide Content */}
              <div className="flex-1 min-h-0 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    key={currentSlide}
                    src={slideshowData[currentSlide].image}
                    alt={slideshowData[currentSlide].title}
                    className="max-h-[75vh] sm:max-h-[80vh] lg:max-h-[90vh] max-w-[90vw] sm:max-w-[85vw] opacity-100 lg:max-w-[80vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 lg:py-16 text-white rounded-b-xl">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                      {slideshowData[currentSlide].title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 leading-relaxed max-w-2xl">
                      {slideshowData[currentSlide].description}
                    </p>
                    <ul className="flex flex-wrap gap-2 sm:gap-3">
                      {slideshowData[currentSlide].features.map(
                        (feature, idx) => (
                          <li
                            key={idx}
                            className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors duration-200"
                          >
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 w-full">
                <div className="flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
                  <button
                    onClick={prevSlide}
                    className="group p-2 sm:p-3 rounded-full bg-gray-800/70 hover:bg-purple-600/70 text-gray-200 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="group p-2 sm:p-3 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:bg-purple-500 text-white transition-all duration-300 hover:scale-110 shadow-lg shadow-purple-500/30"
                    aria-label={
                      isPlaying ? "Pause slideshow" : "Play slideshow"
                    }
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </button>

                  <button
                    onClick={nextSlide}
                    className="group p-2 sm:p-3 rounded-full bg-gray-800/70 hover:bg-purple-600/70 text-gray-200 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 sm:gap-3 pb-2 sm:pb-2 bg-gray-900/90 backdrop-blur-sm">
                {slideshowData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-2 sm:h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentSlide
                        ? "bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 scale-125 shadow-lg shadow-purple-500/40"
                        : "bg-gray-600/70 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind CSS Configuration for Neon Effects */}
      <style jsx>{`
        @keyframes neon-glow {
          0% {
            text-shadow: 0 0 5px rgba(6, 182, 212, 0.5),
              0 0 10px rgba(6, 182, 212, 0.3);
          }
          100% {
            text-shadow: 0 0 10px rgba(6, 182, 212, 0.8),
              0 0 20px rgba(6, 182, 212, 0.5);
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
