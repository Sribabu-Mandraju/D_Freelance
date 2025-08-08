import { useEffect, useState } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { DollarSign, Gem, Wallet, Zap, Copy } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMarket, setActiveMarket] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const walletAddress = "F9ax9qQrFx.....QrVh2HDedW";
  const targetDate = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ).toISOString();
  const timeLeft = useCountdown(targetDate);
  const [solAmount, setSolAmount] = useState("");
  const [lyraAmount, setLyraAmount] = useState("");

  const exchangeRate = 0.0001; // 1 LYRA = 0.0001 SOL

  const handleSolChange = (e) => {
    const value = e.target.value;
    setSolAmount(value);
    if (value) {
      setLyraAmount((parseFloat(value) / exchangeRate).toFixed(4));
    } else {
      setLyraAmount("");
    }
  };

  const handleLyraChange = (e) => {
    const value = e.target.value;
    setLyraAmount(value);
    if (value) {
      setSolAmount((parseFloat(value) * exchangeRate).toFixed(4));
    } else {
      setSolAmount("");
    }
  };

  const markets = [
    {
      name: "Will Bitcoin's price decline to $73,000 by the end of this month, marking a significant market correction?",
      probability: 68,
      change: 2.4,
      volume: "1.2K ",
    },
    {
      name: "  Will the Royal Challengers Bengaluru, win their opening match on March 22?",
      probability: 42,
      change: -1.8,
      volume: "3.4k",
    },
    {
      name: "Will Trump's call with Putin lead to progress in Ukraine peace talks?",
      probability: 73,
      change: 5.2,
      volume: "1.4K",
    },
    {
      name: "SpaceX Mars Landing",
      probability: 31,
      change: -0.7,
      volume: "2.1k",
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const marketRotation = setInterval(() => {
      setActiveMarket((prev) => (prev + 1) % markets.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(marketRotation);
    };
  }, []);

  return (
    <div className=" border-red-600 sm:pb-20 pb-10 px-4 mt-[80px] relative overflow-hidden bg-gray-900">
      {/* Background gradients */}
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

      {/* Grid overlay */}
      <div className="absolute  inset-0 bg-grid-pattern opacity-10"></div>

      <div className=" relative z-10">
        {/* Top stats bar */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-lg p-2 mb-4 mt-2  sm:mb-4 border border-gray-700/50 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm overflow-x-auto">
            <div className="px-4 py-1 flex items-center mb-2 sm:mb-0">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <span className="text-gray-400">Live</span>
              <span className="ml-2 text-gray-300">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 px-4 sm:px-0">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">BTC</span>
                <span className="text-gray-200">$84,571.66</span>
                <span className="text-green-400 ml-1">+2.4%</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">ETH</span>
                <span className="text-gray-200">$1,946.28</span>
                <span className="text-red-400 ml-1">-0.8%</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Active Traders</span>
                <span className="text-gray-200">12,845</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">24h Volume</span>
                <span className="text-gray-200">$24.3M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="flex w-full mx-auto flex-col lg:flex-row md:mt-[-70px] gap-8 sm:gap-12 items-center">
          {/* Left side - Main content */}
          <div
            className={`w-full lg:w-1/2 md:scale-[0.7]  transition-all duration-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-30"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
              Predict the Future, Trade with Confidence
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
              The next generation prediction market platform where you can trade
              on future events with real-time data, AI-powered insights, and
              unmatched liquidity.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href="#trending"
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white text-base sm:text-lg py-3 px-6 rounded-md flex items-center justify-center shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40"
              >
                Start Trading
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="markets"
                className="border border-gray-700 hover:bg-gray-800 text-gray-200 text-base sm:text-lg py-3 px-6 rounded-md transition-all"
              >
                Explore Markets
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                <p className="text-gray-400 text-xs sm:text-sm">
                  Total Markets
                </p>
                <p className="text-lg sm:text-xl font-bold text-white">
                  1,200+
                </p>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                <p className="text-gray-400 text-xs sm:text-sm">Total Volume</p>
                <p className="text-lg sm:text-xl font-bold text-white">$120M</p>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                <p className="text-gray-400 text-xs sm:text-sm">Avg. Return</p>
                <p className="text-lg sm:text-xl font-bold text-green-400">
                  +18.4%
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm">Secure</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm">Regulated</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right side - Market preview */}
          <div
            className={`w-full lg:w-1/2 md:scale-[0.7] transition-all duration-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative w-full  bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-purple-500/30  shadow-purple-500/20  overflow-hidden">
              <div
                className="absolute inset-0 rounded-xl sm:rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(232, 121, 249, 0.3) 100%)",
                  mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "exclude",
                  padding: "1px",
                }}
              ></div>

              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-purple-400 drop-shadow-lg shadow-purple-500/50">
                Buy <span className="text-cyan-400">$LYRA</span> Presale
              </h2>

              {/* Countdown */}
              <div className="grid grid-cols-4 gap-2 mb-4 sm:mb-8 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <span className="text-gray-400 text-xs sm:text-sm uppercase mb-1">
                      {unit}
                    </span>
                    <span className="text-3xl sm:text-5xl font-extrabold text-purple-300 drop-shadow-lg shadow-purple-500/50">
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 rounded-lg mb-6 font-semibold text-sm shadow-lg shadow-purple-500/30">
                PRESALE ENDS IN
              </div>

              <div className="text-center text-gray-300 mb-6 text-lg">
                1 $LYRA ={" "}
                <span className="font-semibold text-cyan-300">0.0001 SOL</span>
                <div className="w-24 h-0.5 bg-gray-700 mx-auto mt-2 rounded-full"></div>
              </div>

              {/* SOL Selector */}
              <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 sm:py-4 rounded-xl mb-6 text-lg font-semibold border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 shadow-lg shadow-gray-900/50 hover:shadow-cyan-500/20">
                <DollarSign className="w-6 h-6 text-cyan-400" />
                SOL
              </button>

              {/* Input Fields */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label
                    htmlFor="sol-input"
                    className="block text-gray-400 text-xs sm:text-sm mb-2"
                  >
                    SOL you pay (<span className="text-gray-500">$0.00</span>):
                  </label>
                  <div className="relative">
                    <input
                      id="sol-input"
                      type="number"
                      value={solAmount}
                      onChange={handleSolChange}
                      placeholder="0"
                      className="w-full bg-gray-800 text-white py-2 sm:py-3 pl-12 pr-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 shadow-inner shadow-black/30"
                    />
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lyra-input"
                    className="block text-gray-400 text-xs sm:text-sm mb-2"
                  >
                    $LYRA You receive:
                  </label>
                  <div className="relative">
                    <input
                      id="lyra-input"
                      type="number"
                      value={lyraAmount}
                      onChange={handleLyraChange}
                      placeholder="0"
                      className="w-full bg-gray-800 text-white py-2 sm:py-3 pl-4 pr-12 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 shadow-inner shadow-black/30"
                    />
                    <Gem className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Select Wallet Button */}
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 sm:py-4 rounded-xl mb-6 text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70">
                <Wallet className="w-5 h-5" />
                Select Wallet
              </button>

              {/* Wallet Address */}
              <div className="text-center text-gray-400 text-sm sm:mb-6 mb-2">
                Trouble connecting? You can also send SOL to this wallet:
                <div className="flex items-center justify-center mt-2">
                  <a
                    href={`https://solscan.io/address/${walletAddress.replace(
                      ".....",
                      ""
                    )}`} // Example link, replace with actual explorer
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-mono text-sm break-all underline underline-offset-2 decoration-cyan-500/50 hover:decoration-cyan-500 transition-colors duration-300"
                  >
                    {walletAddress}
                  </a>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        walletAddress.replace(".....", "")
                      )
                    }
                    className="ml-2 p-1 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                    aria-label="Copy wallet address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Powered by */}
              <div className="flex items-center justify-center text-gray-500 text-xs">
                Powered by
                <Zap className="w-3 h-3 mx-1 text-purple-400" />
                Web3Payments
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
// Add this to your CSS to support extra small screens
// @media (min-width: 475px) {
//   .xs\:grid-cols-3 {
//     grid-template-columns: repeat(3, minmax(0, 1fr));
//   }
// }
