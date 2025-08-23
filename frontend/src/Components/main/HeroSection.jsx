import { useEffect, useRef, useState } from "react";
import {
  DollarSign,
  Gem,
  TrendingUp,
  Users,
  Star,
  Shield,
  Globe,
  Zap,
  ArrowRight,
  Sparkles,
  Bitcoin,
  Coins,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./star.css";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const touchStartXRef = useRef(null);
  const slideStartRef = useRef(null);
  const rafIdRef = useRef(null);
  const slideDuration = 4000; // 4 seconds per slide

  const typewriterWords = [
    "Decentralized",
    "Innovative",
    "Secure",
    "Transparent",
  ];

  const slideshowData = [
    {
      id: 1,
      title: "Welcome to the Future",
      description: "Blockchain-powered freelancing platform with instant payments.",
      image: "/src/assets/image1.jpg",
      features: ["Instant Payments", "Smart Contracts", "Global Access"],
      color: "from-purple-500 to-blue-600",
    },
    {
      id: 2,
      title: "Create Your Profile",
      description: "Set up skills, portfolio, and blockchain wallet.",
      image: "/src/assets/image2.jpg",
      features: ["Skill Verification", "Portfolio Showcase", "Blockchain Identity"],
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      title: "Browse & Apply",
      description: "Find projects that match your expertise.",
      image: "/src/assets/image3.jpg",
      features: ["Smart Matching", "Budget Filters", "Project Categories"],
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 4,
      title: "Secure Smart Contracts",
      description: "Automated milestone payments and dispute resolution.",
      image: "/src/assets/image4.jpg",
      features: ["Auto Payments", "Milestone Tracking", "Dispute Resolution"],
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      title: "Get Paid Instantly",
      description: "Direct crypto payments with zero fees.",
      image: "/src/assets/image5.jpg",
      features: ["Crypto Payments", "Zero Fees", "Global Access"],
      color: "from-purple-500 to-pink-600",
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

  // Typewriter effect
  useEffect(() => {
    const typewriterInterval = setInterval(() => {
      setTypewriterIndex((prev) => (prev + 1) % typewriterWords.length);
    }, 2000);

    return () => clearInterval(typewriterInterval);
  }, []);

  useEffect(() => {
    const currentWord = typewriterWords[typewriterIndex];
    let charIndex = 0;

    const charInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypewriterText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(charInterval);
      }
    }, 100);

    return () => clearInterval(charInterval);
  }, [typewriterIndex]);

  useEffect(() => {
    setIsVisible(true);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    setCurrentSlide((prev) => (prev - 1 + slideshowData.length) % slideshowData.length);
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
        slideStartRef.current = null; // Reset timestamp for smooth resume
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
    <>
      <div className="min-h-[100svh] flex items-center justify-center px-3 sm:px-4 pt-16 sm:pt-20 relative overflow-hidden">
        <div className="bg-animation">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
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
                  <span className="text-[11px] font-semibold text-gray-100">$84,571.66</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3" /> 2.4%
                  </span>
                </div>
                <div className="shrink-0 inline-flex items-center gap-2 rounded-full border border-gray-700/60 bg-gray-800/60 px-3 py-1.5">
                  <Coins className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[11px] text-gray-300">ETH</span>
                  <span className="text-[11px] font-semibold text-gray-100">$1,946.28</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                    <ArrowDownRight className="w-3 h-3" /> 0.8%
                  </span>
                </div>
                <div className="shrink-0 inline-flex items-center gap-2 rounded-full border border-gray-700/60 bg-gray-800/60 px-3 py-1.5">
                  <span className="text-[11px] text-gray-400">24h Vol</span>
                  <span className="text-[11px] font-semibold text-gray-100">$24.3M</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-wrap justify-between items-center text-[12px] gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-gray-400">Live</span>
                <span className="text-gray-300 font-mono">{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Bitcoin className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-400">BTC</span>
                  <span className="text-gray-200 font-semibold">$84,571.66</span>
                  <span className="inline-flex items-center gap-1 text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3.5 h-3.5" /> 2.4%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-400">ETH</span>
                  <span className="text-gray-200 font-semibold">$1,946.28</span>
                  <span className="inline-flex items-center gap-1 text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded-full">
                    <ArrowDownRight className="w-3.5 h-3.5" /> 0.8%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">24h Vol</span>
                  <span className="text-gray-200 font-semibold">$24.3M</span>
                </div>
              </div>
            </div>
          </div>  */}

          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 sm:px-8 sm:py-4 border border-purple-500/40 text-purple-300 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm hover:border-purple-400/60 hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300 shadow-lg shadow-purple-500/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
              The Future of Freelancing
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight px-2 sm:px-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-600 font-orbitron drop-shadow-2xl">
                {typewriterText}
                <span className="animate-pulse text-purple-300">|</span>
              </span>
              <br />
              <span className="text-white font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl drop-shadow-2xl">
                Freelance Platform
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl sm:max-w-4xl mx-auto px-2 sm:px-4">
              Connect, collaborate, and get paid instantly with cryptocurrency.
              No intermediaries, no delays, just pure blockchain-powered freelancing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 sm:mb-10 justify-center">
              <button
                onClick={handleGetStarted}
                className="group flex items-center gap-2 sm:gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-500 hover:via-purple-400 hover:to-blue-500 text-white font-semibold md:font-bold text-base md:text-lg rounded-xl md:rounded-2xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:shadow-3xl border border-purple-400/30"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              <Link
                to="/browse-jobs"
                className="group flex items-center gap-2 sm:gap-3 px-6 py-3 md:px-8 md:py-4 border-2 border-purple-400/40 text-purple-300 hover:border-purple-300/60 hover:text-purple-200 font-semibold md:font-bold text-base md:text-lg rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 md:hover:scale-110 hover:bg-purple-500/20 shadow-lg shadow-purple-500/20"
              >
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showSlideshow && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-2"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full h-full max-w-6xl max-h-[95vh] bg-gradient-to-br from-gray-900 to-black rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
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
                className="p-2 sm:p-3 rounded-full bg-gray-800/70 hover:bg-gray-700/70 text-gray-200 hover:text-white transition-all duration-300 hover:scale-110"
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
                className="absolute inset-y-0 left-0 w-1/3 z-10 bg-transparent  transition-colors duration-200"
                aria-label="Previous slide"
              />
              <button
                onClick={nextSlide}
                className="absolute inset-y-0 right-0 w-1/3 z-10 bg-transparent  transition-colors duration-200"
                aria-label="Next slide"
              />

              {/* Main Slide Content */}
              <div className="flex-1 min-h-0 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    key={currentSlide}
                    src={slideshowData[currentSlide].image}
                    alt={slideshowData[currentSlide].title}
                    className="max-h-[75vh] sm:max-h-[80vh] lg:max-h-[90vh]  max-w-[90vw] sm:max-w-[85vw] lg:max-w-[80vw] w-auto h-auto object-contain rounded-xl shadow-2xl border border-gray-700/30 bg-gray-800/20 opacity-0 animate-fadeIn"
                  />
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${slideshowData[currentSlide].color}/15 pointer-events-none`}></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6 lg:p-8 lg:py-16 text-white rounded-b-xl">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                      {slideshowData[currentSlide].title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 leading-relaxed max-w-2xl">
                      {slideshowData[currentSlide].description}
                    </p>
                    <ul className="flex flex-wrap gap-2 sm:gap-3">
                      {slideshowData[currentSlide].features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors duration-200"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 w-full">
              <div className="flex  items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 ">
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
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
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
    </>
  );
};

export default HeroSection;