"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WalletConnect from "./walletConnection/WalletConnect";
import {
  Search,
  Briefcase,
  Star,
  Globe,
  Menu,
  ChevronDown,
  ChevronRight,
  PocketIcon as Portfolio,
  TrendingUp,
  BarChart3,
  Users,
  Package,
  Coins,
  ArrowUpDown,
  Building2,
  MessageCircle,
  Zap,
  Shield,
  Smartphone,
  BookOpen,
  Award,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedTheme, setTheme] = useState("Dark");
  const { address, isConnected, chain } = useAccount();

  const navigationItems = [
    {
      name: "Find talent",
      navlink: "/gigs",
      icon: Coins,
    },
    {
      name: "Find work",
      navlink: "/browse-jobs",
      icon: Users,
    },
    {
      name: "Why CryptoLance",
      navlink: "/help",
      icon: Package,
      subItems: [
        { name: "How to Use", link: "/help" },
        { name: "About", link: "/about" },
      ],
    },
  ];
  const navigate = useNavigate();
  const handlePortfolioClick = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please Connect your wallet to view your portfolio");
        return;
      }

      const res = await fetch("http://localhost:3001/api/portfolio/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let result = null;
      try {
        result = await res.json();
      } catch (err) {
        toast.error("Failed to parse response. Please try again.");
      }

      if (res.ok && result?.success && result?.data) {
        navigate("/portfolio/me");
        return;
      }
      navigate("/portfolioForm");
    } catch (err) {
      console.error("Error checking portfolio:", err);
      toast.error("Unable to check portfolio. Please try again.");
      navigate("/portfolioForm");
    }
  };
  const handleMouseEnter = (itemName) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Split items into two columns
  const splitItemsIntoColumns = (items) => {
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-950 text-white z-40">
      {/* Neon glow background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 opacity-50"></div>

      {/* Main Header */}
      <div className="relative flex items-center justify-between w-full px-4 py-3 border-b border-gray-800/50 backdrop-blur-sm">
        {/* Left Side - Logo and Navigation */}
        <div className="flex items-center w-full space-x-8">
          {/* Logo with neon effect */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden rounded-full w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold font-orbitron hidden sm-block text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
                CryptoLance
              </span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-4">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isOpen = activeDropdown === item.name;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to={item.navlink}>
                    <button className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-all duration-300 py-2 rounded-lg group">
                      <IconComponent className="w-4 h-4 group-hover:text-cyan-400 transition-colors duration-300" />
                      <span className="text-[14px]">{item.name}</span>
                      {item.subItems && (
                        <ChevronDown
                          className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-cyan-400" : ""
                          }`}
                        />
                      )}
                    </button>
                  </Link>

                  {item.subItems && isOpen && (
                    <div className="absolute -left-2 top-[35px] w-32 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl shadow-cyan-500/10 z-50">
                      {item.subItems.map((subItem, idx) => (
                        <Link
                          key={idx}
                          to={subItem.link}
                          className={`block px-4 py-2 text-sm text-white hover:bg-gray-800/50 hover:text-cyan-400 transition-all duration-200 ${
                            idx === 0
                              ? "rounded-t-xl"
                              : idx === item.subItems.length - 1
                              ? "rounded-b-xl"
                              : ""
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right Side - Portfolio, Watchlist, Search, Login */}
        <div className="flex items-center md:gap-4">
          {/* Portfolio */}
          {/* <Link
            to="/portfolioform"
            className="md:flex text-sm hidden items-center text-gray-300 hover:text-cyan-400 transition-all duration-300 py-2 rounded-lg group"
          >
            <Portfolio className="w-4 h-4 mr-2 group-hover:text-cyan-400 transition-colors duration-300" />
            Portfolio
          </Link> */}

          <button
            onClick={handlePortfolioClick}
            className="md:flex text-sm hidden items-center text-gray-300 hover:text-cyan-400 transition-all duration-300  py-2 rounded-lg  group"
          >
            <Portfolio className="w-4 h-4 mr-2  group-hover:text-cyan-400 transition-colors duration-300" />
            Portfolio
          </button>

          {/* Watchlist */}
          <button className="md:flex hidden text-sm items-center text-gray-300 hover:text-cyan-400 transition-all duration-300 py-2 rounded-lg group">
            <Star className="w-4 h-4 mr-2 group-hover:text-cyan-400 transition-colors duration-300" />
            Watchlist
          </button>
          <div className="flex flex-row gap-1 items-center">
            {/* Search Bar with neon effect */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-8 py-1 w-56 bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:shadow-lg focus:shadow-cyan-500/20 backdrop-blur-sm transition-all duration-300"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs bg-gray-800 px-1 rounded">
                /
              </span>
            </div>

            

            {/* Log in Button with neon effect */}
            <WalletConnect onAuthSuccess={() => {}} />
            {/* Account / Settings dropdown (desktop only) */}
            <div
              className="relative ml-3 hidden md:block"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <button
                className="flex items-center gap-2 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-300"
                aria-expanded={showProfileMenu ? "true" : "false"}
              >
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                  <img
                    src="https://i.pravatar.cc/150?img=47"
                    alt=""
                    className="rounded-full w-full h-full"
                  />
                </div>
              </button>

              {showProfileMenu && (
                <div
                  className="absolute right-0 top-[40px] w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl shadow-cyan-500/10 z-50"
                  role="menu"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex flex-row gap-4">
                        <button className="w-auto bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                          Log In
                        </button>
                        <button className="w-auto border border-blue-600 text-blue-600 px-3 py-1 rounded-md text-sm">
                          Sign Up
                        </button>
                      </div>
                      <div className="ml-3 flex items-start">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow">
                          <span className="text-white text-xs font-semibold">
                            ♦
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-800/40 my-2" />
                    <button className="w-full text-left text-[13px] text-blue-500 font-semibold px-1 py-2 rounded-md hover:bg-gray-800/50 flex items-center justify-between">
                      <span>💙 Help us improve by taking our survey</span>
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    </button>
                    <hr className="border-gray-800/40 my-2" />

                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex items-center justify-between px-1 py-2 rounded-md hover:bg-gray-800/40">
                        <div className="text-gray-300">Language</div>
                        <div className="text-gray-200">English</div>
                      </div>
                      <div className="flex items-center justify-between px-1 py-2 rounded-md hover:bg-gray-800/40">
                        <div className="text-gray-300">Currency</div>
                        <div className="text-gray-200 flex items-center gap-1">
                          USD <span className="text-green-400">●</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1 py-2 rounded-md">
                        <div className="text-gray-300">Theme</div>
                        <div className="flex items-center bg-gray-800 py-1 px-1 rounded-lg">
                          {["Light", "Dark", "System"].map((theme) => (
                            <button
                              key={theme}
                              onClick={() => setTheme(theme)}
                              className={`px-2 py-1 text-[12px] rounded transition-colors duration-200 ${
                                selectedTheme === theme
                                  ? "bg-gray-900 text-white"
                                  : "bg-gray-800 text-gray-300 hover:bg-gray-700/60 hover:text-white"
                              }`}
                            >
                              {theme}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button className="flex w-1/2 border border-gray-700 px-3 py-2 text-sm rounded-md text-gray-200 hover:bg-gray-800/50">
                        Get listed ▾
                      </button>
                      <button className="px-3 w-1/2 py-2 bg-gray-800 border border-gray-700 text-sm rounded-md">
                        API
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
          {/* Language Selector */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("language")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-300 hover:text-cyan-400 transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/50 hover:shadow-lg hover:shadow-cyan-500/20">
                <Globe className="w-4 h-4" />
              </button>
              {activeDropdown === "language" && (
                <div className="absolute -right-2 top-[35px] w-32 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl shadow-cyan-500/10 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-800/50 hover:text-cyan-400 transition-all duration-200 first:rounded-t-xl"
                  >
                    English
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-800/50 hover:text-cyan-400 transition-all duration-200"
                  >
                    Español
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-800/50 hover:text-cyan-400 transition-all duration-200 last:rounded-b-xl"
                  >
                    Français
                  </a>
                </div>
              )}
            </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden text-gray-300 hover:text-cyan-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-3 py-2 w-full bg-gray-900/80 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:shadow-lg focus:shadow-cyan-500/20"
              />
            </div>

            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isOpen = activeDropdown === item.name;

              return (
                <div key={item.name} className="w-full">
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : item.name)}
                    className="flex justify-between items-center w-full text-left px-2 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.subItems && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-cyan-400" : ""
                        }`}
                      />
                    )}
                  </button>

                  {isOpen && item.subItems && (
                    <div className="pl-8 mt-1 space-y-1">
                      {item.subItems.map((subItem, idx) => (
                        <Link
                          key={idx}
                          to={subItem.link}
                          className="block py-1 text-sm text-gray-400 hover:text-cyan-400"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div>
              <Link
                to="/portfolio/me"
                className="flex text-sm items-center text-gray-300 hover:text-cyan-400 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <Portfolio className="w-4 h-4 mr-2 group-hover:text-cyan-400 transition-colors duration-300" />
                Portfolio
              </Link>

              <button className="flex text-sm items-center text-gray-300 hover:text-cyan-400 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:shadow-lg hover:shadow-cyan-500/20 group">
                <Star className="w-4 h-4 mr-2 group-hover:text-cyan-400 transition-colors duration-300" />
                Watchlist
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Custom CSS for neon glow effects */}
      <style>{`
        .glow-text {
          text-shadow: 0 0 5px currentColor;
        }
        .glow-text-red {
          text-shadow: 0 0 5px #ef4444;
        }
        .glow-text-green {
          text-shadow: 0 0 5px #22c55e;
        }
        .glow-text-orange {
          text-shadow: 0 0 5px #f97316;
        }
        .glow-text-blue {
          text-shadow: 0 0 5px #3b82f6;
        }
        .glow-text-yellow {
          text-shadow: 0 0 5px #eab308;
        }
      `}</style>
    </header>
  );
}
