"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
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
  ShieldCheck,
  X,
  Home,
  Settings,
  HelpCircle,
  ExternalLink,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchPortfolio } from "../store/portfolioSlice/portfolioSlice";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedTheme, setTheme] = useState("Dark");
  const { address, isConnected, chain } = useAccount();
  const { portfolioData } = useSelector((state) => state.portfolio);
  const location = useLocation();

  const navigationItems = [
    {
      name: "Find talent",
      navlink: "/gigs",
      icon: Coins,
      description: "Discover skilled freelancers",
      gradient: "from-yellow-400 to-orange-500",
      badge: "Hot",
    },
    {
      name: "Find work",
      navlink: "/browse-jobs",
      icon: Users,
      description: "Browse available projects",
      gradient: "from-blue-400 to-cyan-500",
      badge: "New",
    },
    {
      name: "Why CryptoLance",
      navlink: "/help",
      icon: Package,
      description: "Learn about our platform",
      gradient: "from-purple-400 to-pink-500",
      subItems: [
        { name: "How to Use", link: "/help", icon: BookOpen },
        { name: "About", link: "/about", icon: Award },
      ],
    },
    {
      name: "Admin Dashboard",
      navlink: "/adminDashboard",
      icon: ShieldCheck,
      description: "Manage your platform",
      gradient: "from-green-400 to-emerald-500",
      badge: "Pro",
    },
  ];

  const quickActions = [
    {
      name: "Create Gig",
      icon: Zap,
      link: "/create-gig",
      gradient: "from-violet-500 to-purple-600",
      description: "Start earning today",
    },
    {
      name: "Post Job",
      icon: Briefcase,
      link: "/post-job",
      gradient: "from-indigo-500 to-blue-600",
      description: "Find the perfect freelancer",
    },
    {
      name: "Portfolio",
      icon: Portfolio,
      link: "/portfolio/me",
      gradient: "from-emerald-500 to-teal-600",
      description: "Showcase your work",
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

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
    setActiveDropdown(null);
  };

  // Split items into two columns
  const splitItemsIntoColumns = (items) => {
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black/5 text-white z-50">
      {/* Neon glow background effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 opacity-50"></div> */}

      {/* Main Header */}
      <div className="relative flex items-center justify-between w-full px-4 py-3  backdrop-blur-lg">
        {/* Left Side - Logo and Navigation */}
        <div className="flex items-center w-full space-x-8">
          {/* Logo with neon effect */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden rounded-full w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold font-orbitron hidden sm:block text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
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
                    <button
                      className={`flex items-center space-x-1 transition-all duration-300 py-2 rounded-lg group
                        ${
                          location.pathname === item.navlink
                            ? "text-cyan-400 bg-cyan-500/10 font-semibold px-2"
                            : "text-gray-300 hover:text-cyan-400"
                        }
                      `}
                    >
                      <IconComponent
                        className={`w-4 h-4 group-hover:text-cyan-400 transition-colors duration-300 ${
                          location.pathname === item.navlink
                            ? "text-cyan-400"
                            : ""
                        }`}
                      />
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
                    src={
                      portfolioData?.heroSection?.profile ||
                      "https://via.placeholder.com/36"
                    }
                    alt=""
                    className="rounded-full w-full h-full object-cover"
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
          {/* <div
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
          </div> */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden text-gray-300 hover:text-cyan-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Side Menu - OpenSea Style */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-in-out ${
          showMobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-500 ${
            showMobileMenu ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Side Menu */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-black transform transition-transform duration-500 ease-in-out ${
            showMobileMenu ? "translate-x-0" : "translate-x-full"
          } flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">CryptoLance</h2>
                <p className="text-xs text-gray-400">Web3 Freelancing</p>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, idx) => (
                  <Link
                    key={idx}
                    to={action.link}
                    onClick={closeMobileMenu}
                    className="group block"
                  >
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-900 transition-all duration-300 border border-transparent hover:border-gray-700">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {action.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {action.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Navigation */}
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Navigation
              </h3>
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const isOpen = activeDropdown === item.name;

                  return (
                    <div key={item.name} className="w-full">
                      <button
                        onClick={() =>
                          setActiveDropdown(isOpen ? null : item.name)
                        }
                        className="flex justify-between items-center w-full text-left p-3 rounded-xl hover:bg-gray-900 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {item.subItems && (
                          <ChevronDown
                            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-cyan-400" : ""
                            }`}
                          />
                        )}
                      </button>

                      {isOpen && item.subItems && (
                        <div className="ml-16 mt-2 space-y-1 bg-gray-900 rounded-lg p-3">
                          {item.subItems.map((subItem, idx) => (
                            <Link
                              key={idx}
                              to={subItem.link}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                            >
                              <subItem.icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
                              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* User Actions */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-cyan-400" />
                Account
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handlePortfolioClick}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-900 transition-all duration-300 group border border-gray-800 hover:border-gray-700"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Portfolio className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">
                      Portfolio
                    </h4>
                    <p className="text-sm text-gray-400">Manage your work</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-900 transition-all duration-300 group border border-gray-800 hover:border-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">
                      Watchlist
                    </h4>
                    <p className="text-sm text-gray-400">Saved items</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-900 transition-all duration-300 group border border-gray-800 hover:border-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">
                      Settings
                    </h4>
                    <p className="text-sm text-gray-400">
                      Preferences & account
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800 bg-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">♦</span>
                </div>
                <span className="text-sm text-gray-400">v2.0.0</span>
              </div>
              <Link
                to="/help"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <HelpCircle className="w-4 h-4" />
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

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
