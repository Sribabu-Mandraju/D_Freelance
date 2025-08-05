// import { useState, useCallback, useEffect, useRef } from "react";
// import {
//   Menu,
//   X,
//   ChevronDown,
//   BarChart3,
//   Home,
//   PieChart,
//   Shield,
// } from "lucide-react";
// // import ConnectWallet from "./wallet/ConnectWallet";
// // import logo from "../../assets/logo.png";
// // import { getSigner } from "../../config/contract.config";
// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const [userAddress, setUserAddress] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   //   const adminAddress = import.meta.env.VITE_EVENT_FACTORY_OWNER_ADDRESS;
//   const adminAddress = null;
//   const isAdmin = userAddress === adminAddress;
//   const navRef = useRef(null);
//   const location = useLocation();

//   const fetchAddress = useCallback(async () => {
//     try {
//     //   const signer = await getSigner();
//     const signer = null;
//       if (!signer) {
//         console.warn("No signer available");
//         setUserAddress("");
//         return;
//       }

//     //   const address = await signer.getAddress();
//     const address = null;

//       // Only update if address actually changed
//       if (address !== userAddress) {
//         setUserAddress(address);
//       }
//     } catch (error) {
//       console.error("Error fetching user address:", error);
//       setUserAddress("");
//     }
//   }, [userAddress]);

//   useEffect(() => {
//     fetchAddress();
//   }, [fetchAddress]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       if (scrollPosition > 20) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location]);

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <nav
//       ref={navRef}
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-black/80 backdrop-blur-lg py-2 shadow-lg shadow-purple-900/20"
//           : "bg-black/30 backdrop-blur-md py-4"
//       }`}
//     >
//       {/* Animated gradient border effect */}
//       <div
//         className={`absolute inset-x-0 -bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent ${
//           scrolled ? "opacity-100" : "opacity-70"
//         }`}
//       ></div>

//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           {/* Logo with animation */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div
//               className={`relative overflow-hidden  rounded-full ${
//                 scrolled ? "w-9 h-9" : "w-10 h-10"
//               } transition-all duration-300`}
//             >
//               <img
//                 src={ "/placeholder.svg"}
//                 alt="futureX"
//                 className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
//               />
//               <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </div>
//             <div className="hidden sm:flex flex-col">
//               <span
//                 className={`font-bold bg-clip-text text-transparent font bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500   group-hover:from-purple-400 group-hover:to-cyan-300 transition-all duration-300 ${
//                   scrolled ? "text-xl" : "text-2xl"
//                 }`}
//               >
//                 FuturaX
//               </span>
//               <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
//                 Stake • Earn • Grow
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             <NavLink
//               to="/"
//               text="Home"
//               icon={<Home size={16} />}
//               isActive={isActive("/")}
//             />
//             <NavLink
//               to="/markets"
//               text="Post Jobs"
//               icon={<BarChart3 size={16} />}
//               isActive={isActive("/markets")}
//             />
//             <NavLink
//               to="/portfolio"
//               text="Portfolio"
//               icon={<PieChart size={16} />}
//               isActive={isActive("/portfolio")}
//             />

//             {isAdmin && (
//               <div className="relative group">
//                 <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors">
//                   <Shield size={16} className="text-purple-400" />
//                   <span>Admin</span>
//                   <ChevronDown
//                     size={14}
//                     className="group-hover:rotate-180 transition-transform duration-200"
//                   />
//                 </button>
//                 <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-xl rounded-lg shadow-lg shadow-purple-900/20 border border-purple-900/30 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
//                   <Link
//                     to="/admin"
//                     className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
//                   >
//                     <Shield size={16} className="text-purple-400" />
//                     Admin Dashboard
//                   </Link>
//                   <Link
//                     to="/addEvent"
//                     className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
//                   >
//                     <Shield size={16} className="text-purple-400" />
//                     Add Event
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Connect Wallet - Desktop */}
//           <div className="hidden md:block  cursor-pointer font-semibold bg-gray-900 px-3 py-1 rounded-lg">
//             <span className="bg-clip-text text-transparent font bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500   group-hover:from-purple-400 group-hover:to-cyan-300 transition-all duration-300">Sign UP</span>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden p-2 rounded-lg hover:bg-white/10 active:bg-white/5 transition-colors"
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? (
//               <X className="w-6 h-6 text-gray-100" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-100" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <div
//         className={`md:hidden transition-all duration-300 ease-in-out ${
//           mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
//         } overflow-hidden`}
//       >
//         <div className="container mx-auto px-4 py-4 space-y-1 border-t border-white/10 mt-2">
//           <MobileNavLink
//             to="/"
//             text="Home"
//             icon={<Home size={18} />}
//             isActive={isActive("/")}
//           />
//           <MobileNavLink
//             to="/markets"
//             text="Markets"
//             icon={<BarChart3 size={18} />}
//             isActive={isActive("/markets")}
//           />
//           <MobileNavLink
//             to="/portfolio"
//             text="Portfolio"
//             icon={<PieChart size={18} />}
//             isActive={isActive("/portfolio")}
//           />

//           {isAdmin && (
//             <>
//               <div className="h-px bg-gradient-to-r from-transparent via-purple-900/30 to-transparent my-2"></div>
//               <div className="px-3 py-1 text-xs text-purple-400 uppercase tracking-wider">
//                 Admin Area
//               </div>
//               <MobileNavLink
//                 to="/admin"
//                 text="Admin Dashboard"
//                 icon={<Shield size={18} />}
//                 isActive={isActive("/admin")}
//               />
//               <MobileNavLink
//                 to="/addEvent"
//                 text="Add Event"
//                 icon={<Shield size={18} />}
//                 isActive={isActive("/addEvent")}
//               />
//             </>
//           )}

//           {/* Connect Wallet - Mobile */}
//           <div className="pt-3 pb-1 pl-4 cursor-pointer">
//             Sign Up
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // Helper Components
// function NavLink({ to, text, icon, isActive }) {
//   return (
//     <Link
//       to={to}
//       className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 group ${
//         isActive
//           ? "text-white bg-white/5"
//           : "text-gray-300 hover:text-white hover:bg-white/5"
//       }`}
//     >
//       <span
//         className={`${
//           isActive
//             ? "text-purple-400"
//             : "text-gray-400 group-hover:text-purple-400"
//         } transition-colors`}
//       >
//         {icon}
//       </span>
//       <span className="font-semibold">{text}</span>
//       <span
//         className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 ${
//           isActive ? "w-4/5" : "w-0 group-hover:w-1/2"
//         }`}
//       ></span>
//     </Link>
//   );
// }

// function MobileNavLink({ to, text, icon, isActive }) {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-200 ${
//         isActive
//           ? "bg-gradient-to-r from-purple-900/20 to-transparent text-white"
//           : "text-gray-300 hover:text-white hover:bg-white/5"
//       }`}
//     >
//       <span className={`${isActive ? "text-purple-400" : "text-gray-400"}`}>
//         {icon}
//       </span>
//       <span>{text}</span>
//       {isActive && (
//         <span className="ml-auto">
//           <div className="h-full w-1 bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full"></div>
//         </span>
//       )}
//     </Link>
//   );
// }
"use client"

import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  Briefcase,
  Search,
  ChevronDown,
  User,
  Star,
  FileText,
  Users,
  MessageCircle,
  Shield,
  TrendingUp,
  Code,
  Palette,
  PenTool,
  Smartphone,
  Globe,
  HelpCircle,
  BookOpen,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const  Navbar = () => {
  const [userAddress, setUserAddress] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [location])

  const isActive = (path) => {
    return location.pathname === path
  }

  const connectWallet = async () => {
    console.log("Connecting wallet...")
  }

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const freelancersDropdown = [
    { name: "Browse Freelancers", href: "/freelancers", icon: <Users className="w-4 h-4" /> },
    { name: "Top Rated", href: "/freelancers/top-rated", icon: <Star className="w-4 h-4" /> },
    { name: "New Freelancers", href: "/freelancers/new", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "Freelancer Profiles", href: "/freelancer/1", icon: <User className="w-4 h-4" /> },
  ]

  const jobsDropdown = [
    { name: "Browse Jobs", href: "/browse-jobs", icon: <Search className="w-4 h-4" /> },
    { name: "Post a Job", href: "/post-job", icon: <FileText className="w-4 h-4" /> },
    { name: "Featured Jobs", href: "/jobs/featured", icon: <Star className="w-4 h-4" /> },
    { name: "Job Categories", href: "/categories", icon: <Briefcase className="w-4 h-4" /> },
  ]

  const categoriesDropdown = [
    { name: "Web Development", href: "/category/web-dev", icon: <Code className="w-4 h-4" /> },
    { name: "Smart Contracts", href: "/category/smart-contracts", icon: <Shield className="w-4 h-4" /> },
    { name: "UI/UX Design", href: "/category/design", icon: <Palette className="w-4 h-4" /> },
    { name: "Content Writing", href: "/category/writing", icon: <PenTool className="w-4 h-4" /> },
    { name: "Mobile Development", href: "/category/mobile", icon: <Smartphone className="w-4 h-4" /> },
    { name: "All Categories", href: "/categories", icon: <Globe className="w-4 h-4" /> },
  ]

  const communityDropdown = [
    { name: "Discord", href: "https://discord.gg/cryptolance", icon: <MessageCircle className="w-4 h-4" /> },
    { name: "Telegram", href: "https://t.me/cryptolance", icon: <MessageCircle className="w-4 h-4" /> },
    { name: "Forum", href: "/forum", icon: <Users className="w-4 h-4" /> },
    { name: "Blog", href: "/blog", icon: <BookOpen className="w-4 h-4" /> },
  ]

  const resourcesDropdown = [
    { name: "Help Center", href: "/help", icon: <HelpCircle className="w-4 h-4" /> },
    { name: "Documentation", href: "/docs", icon: <BookOpen className="w-4 h-4" /> },
    { name: "API", href: "/api", icon: <Code className="w-4 h-4" /> },
    { name: "Security", href: "/security", icon: <Shield className="w-4 h-4" /> },
    { name: "Terms", href: "/terms", icon: <FileText className="w-4 h-4" /> },
  ]

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#17171A] border-b border-gray-800">
        <div className=" mx-auto px-4">
          <div className="flex items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden rounded-full w-8 h-8 bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
                CryptoLance
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center text-[13px]">
              <DropdownMenu
                title="Freelancers"
                items={freelancersDropdown}
                isActive={activeDropdown === "freelancers"}
                onToggle={() => handleDropdownToggle("freelancers")}
              />
              <DropdownMenu
                title="Jobs"
                items={jobsDropdown}
                isActive={activeDropdown === "jobs"}
                onToggle={() => handleDropdownToggle("jobs")}
              />
              <DropdownMenu
                title="Categories"
                items={categoriesDropdown}
                isActive={activeDropdown === "categories"}
                onToggle={() => handleDropdownToggle("categories")}
              />
              <DropdownMenu
                title="Community"
                items={communityDropdown}
                isActive={activeDropdown === "community"}
                onToggle={() => handleDropdownToggle("community")}
              />
              <DropdownMenu
                title="Resources"
                items={resourcesDropdown}
                isActive={activeDropdown === "resources"}
                onToggle={() => handleDropdownToggle("resources")}
              />
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center space-x-2 text-[13px]">
              {/* Portfolio */}
              <Link
                to="/dashboard"
                className="flex items-center gap-1 xl:gap-2 text-gray-400 hover:text-white transition-colors px-2 xl:px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                <User className="w-4 h-4" />
                <span className="text-sm hidden xl:block">Dashboard</span>
              </Link>

              {/* Watchlist */}
              <Link
                to="/saved-jobs"
                className="flex items-center gap-1 xl:gap-2 text-gray-400 hover:text-white transition-colors px-2 xl:px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                <Star className="w-4 h-4" />
                <span className="text-sm hidden xl:block">Saved</span>
              </Link>

              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 lg:w-48 xl:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Language/Settings */}
              <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800 hidden xl:block">
                <Globe className="w-4 h-4" />
              </button>

              {/* Connect Wallet / User */}
              {userAddress ? (
                <div className="flex items-center gap-2 bg-gray-800 px-2 xl:px-3 py-2 rounded-lg border border-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">
                    {userAddress.slice(0, 4)}...{userAddress.slice(-4)}
                  </span>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-[#3861FB] hover:bg-[#2347E8] text-white px-3 xl:px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
                >
                  Connect
                </button>
              )}

              {/* Menu Button */}
              <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800 hidden xl:block">
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-100" /> : <Menu className="w-6 h-6 text-gray-100" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#17171A] border-t border-gray-800">
            <div className="  mx-auto px-4 py-4 space-y-4">
              <MobileDropdown title="Freelancers" items={freelancersDropdown} />
              <MobileDropdown title="Jobs" items={jobsDropdown} />
              <MobileDropdown title="Categories" items={categoriesDropdown} />
              <MobileDropdown title="Community" items={communityDropdown} />
              <MobileDropdown title="Resources" items={resourcesDropdown} />

              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={connectWallet}
                  className="w-full bg-[#3861FB] hover:bg-[#2347E8] text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Dropdown Backdrop */}
      {activeDropdown && <div className="fixed inset-0 z-30 bg-black/20" onClick={() => setActiveDropdown(null)} />}
    </>
  )
}
export default Navbar;
// Helper Components
function DropdownMenu({ title, items, isActive, onToggle }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
          isActive ? "text-white bg-gray-800" : "text-gray-300 hover:text-white hover:bg-gray-800"
        }`}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </button>

      {isActive && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[#17171A] border border-gray-700 rounded-lg shadow-xl z-40">
          <div className="py-2">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <span className="text-purple-400">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileDropdown({ title, items }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-gray-300 hover:text-white transition-colors"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="ml-4 mt-2 space-y-2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-purple-400">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function StatItem({ label, value, change, positive }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white font-medium">{value}</span>
      <span className={`${positive ? "text-green-400" : "text-red-400"}`}>{change}</span>
    </div>
  )
}
