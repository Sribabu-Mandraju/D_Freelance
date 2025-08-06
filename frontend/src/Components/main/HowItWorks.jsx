// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function HowItWorksSection() {
//   const navigate = useNavigate();
//   const steps = [
//     {
//       number: 1,
//       title: "Connect Wallet",
//       description:
//         "Sign in securely using your crypto wallet to establish a decentralized, password-free identity.",
//       icon: "wallet",
//     },
//     {
//       number: 2,
//       title: "Post or Browse Jobs",
//       description:
//         "Clients can post jobs directly to the blockchain. Freelancers explore and bid on jobs across various categories.",
//       icon: "job",
//     },
//     {
//       number: 3,
//       title: "Smart Contract Agreement",
//       description:
//         "Both parties agree on job terms. A smart contract locks the funds in escrow, ensuring transparency and trust.",
//       icon: "contract",
//     },
//     {
//       number: 4,
//       title: "Deliver Work & Approve",
//       description:
//         "Freelancer completes and submits the work. The client reviews and approves it through the platform.",
//       icon: "delivery",
//     },
//     {
//       number: 5,
//       title: "Instant Crypto Payment",
//       description:
//         "Upon approval, the smart contract releases escrowed funds instantly to the freelancer's wallet.",
//       icon: "payment",
//     },
//     {
//       number: 6,
//       title: "Earn Reputation & Resolve Disputes",
//       description:
//         "Both users gain on-chain reputation. If issues arise, decentralized arbitration ensures fair dispute resolution.",
//       icon: "reputation",
//     },
//   ];

//   return (
//     <section id="how-it-works" className="py-20 px-4 relative overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
//       </div>

//       <div className="container mx-auto relative z-10">
//         <div className="text-center mb-16">
//           <div className="inline-block mb-4 px-4 py-1 border border-cyan-500 text-cyan-400 rounded-full text-sm font-medium">
//             HOW IT WORKS
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Simple Steps to Start Predicting
//           </h2>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             Our platform makes it easy to get started with prediction markets in
//             just a few steps.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
//           {steps.map((step, index) => (
//             <StepCard key={index} step={step} index={index} />
//           ))}
//         </div>

//         <div className="mt-20 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 md:p-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//             <div>
//               <h3 className="text-3xl font-bold mb-4">
//                 Ready to Start Freelancing the Decentralized Way?
//               </h3>
//               <p className="text-gray-400 mb-6">
//                 Join thousands of skilled professionals and clients already
//                 collaborating on the future of work.
//               </p>
//               <button
//                 className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-4 py-2 rounded-md flex items-center"
//                 onClick={() => navigate("/markets")}
//               >
//                 Find Work / Hire Talent{" "}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="ml-2 h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M5 12h14M12 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//             <div className="bg-gray-800 rounded-xl p-6">
//               <FeatureList />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function StepCard({ step, index }) {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, index * 100 + 100);

//     return () => clearTimeout(timer);
//   }, [index]);

//   // Unique icon mapping with updated colors and background
//   const getIcon = () => {
//     switch (step.icon) {
//       case "wallet":
//         return (
//           <div className="bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full p-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-purple-400"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//               <path d="M3 9h18"></path>
//               <path d="M9 9v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9"></path>
//             </svg>
//             {/* <img src="./transparency.svg" alt="" className="h-16 w-16"/> */}
//           </div>
//         );
//       case "job":
//         return (
//           <div className="bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full p-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-cyan-400"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//               <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
//             </svg>
//           </div>
//         );
//       case "contract":
//         return (
//           <div className="bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full p-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-purple-400"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M21 16V8a2 2 0 0 0-2-2h-6l-3-3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"></path>
//               <path d="M16 12h5"></path>
//               <path d="M21 12v6"></path>
//             </svg>
//           </div>
//         );
//       case "delivery":
//         return (
//           <div className="bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full p-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-cyan-400"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="6 17 3 14 6 11"></polyline>
//               <path d="M20 8v6a2 2 0 0 1-2 2H6"></path>
//             </svg>
//           </div>
//         );
//       case "payment":
//         return (
//           <div className="bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full p-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-purple-400"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
//               <line x1="1" y1="10" x2="23" y2="10"></line>
//             </svg>
//           </div>
//         );
//       case "reputation":
//         return (
//           <div className="bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full p-3">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-cyan-400"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//             </svg>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className={`relative transition-all duration-700 ease-out ${
//         isVisible
//           ? "opacity-100 translate-y-0 scale-100"
//           : "opacity-0 translate-y-24 scale-95"
//       } group`}
//     >
//       <div
//         className="relative bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 h-full 
//                      hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/10 
//                      transition-all duration-300 ease-in-out"
//       >
//         {/* Icon */}
//         <div className="flex justify-center mb-4">{getIcon()}</div>

//         {/* Card Content */}
//         <div className="text-center">
//           <h3
//             className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-cyan-300 
//                        bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-cyan-200 
//                        transition-colors duration-300"
//           >
//             {step.title}
//           </h3>
//           <p className="text-gray-300 leading-relaxed text-base tracking-wide">
//             {step.description}
//           </p>
//         </div>

//         {/* Decorative Element */}
//         <div
//           className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-500/20 to-cyan-500/20 
//                        rounded-tl-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"
//         />

//         {/* Subtle Border Accent */}
//         <div
//           className="absolute inset-0 rounded-2xl border border-transparent 
//                        group-hover:border-purple-500/30 transition-all duration-300"
//         />
//       </div>
//     </div>
//   );
// }

// function FeatureList() {
//   const features = [
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-blue-400"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="10" className="stroke-blue-400"></circle>
//           <line
//             x1="2"
//             y1="12"
//             x2="22"
//             y2="12"
//             className="stroke-green-400"
//           ></line>
//           <path
//             d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"
//             className="stroke-yellow-400"
//           ></path>
//         </svg>
//       ),

//       title: "Decentralized",
//       description: "A truly decentralized platform with no central authority.",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-green-400"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="10"></circle>
//           <line x1="12" y1="8" x2="12" y2="12"></line>
//           <line x1="12" y1="16" x2="12.01" y2="16"></line>
//         </svg>
//       ),
//       title: "1% Fee On Profits",
//       description: "Transparent fee structure with no surprises",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-blue-400"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//           <circle cx="9" cy="7" r="4"></circle>
//           <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//           <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//         </svg>
//       ),
//       title: "Active Community",
//       description: "Join thousands of active clients and developers",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-yellow-400"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
//         </svg>
//       ),
//       title: "Instant Settlements",
//       description: "Get paid immediately when you win",
//     },
//   ];

//   return (
//     <div>
//       {features.map((feature, index) => (
//         <div
//           key={index}
//           className={`flex items-center ${
//             index !== features.length - 1 ? "mb-4" : ""
//           }`}
//         >
//           <div className="mr-3">{feature.icon}</div>
//           <div>
//             <h4 className="text-xl font-bold">{feature.title}</h4>
//             <p className="text-gray-400">{feature.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



"use client"

import { useState, useEffect } from "react"
import { Wallet, Search, FileText, Code, DollarSign, Star, Shield, Zap, Globe } from "lucide-react"
import { FaDatabase } from "react-icons/fa";

 const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Connect Your Wallet",
      description:
        "Sign in securely using your crypto wallet to establish a decentralized, password-free identity on the blockchain.",
      icon: <Wallet className="w-8 h-8" />,
      color: "from-purple-500 to-cyan-500",
    },
    {
      number: 2,
      title: "Post or Browse Jobs",
      description:
        "Clients can post jobs directly to the blockchain. Freelancers explore and bid on jobs across various categories.",
      icon: <Search className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      number: 3,
      title: "Smart Contract Agreement",
      description:
        "Both parties agree on job terms. A smart contract locks the funds in escrow, ensuring transparency and trust.",
      icon: <FileText className="w-8 h-8" />,
      color: "from-blue-500 to-purple-500",
    },
    {
      number: 4,
      title: "Deliver Work & Review",
      description:
        "Freelancer completes and submits the work. The client reviews and approves it through the platform.",
      icon: <Code className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: 5,
      title: "Instant Crypto Payment",
      description: "Upon approval, the smart contract releases escrowed funds instantly to the freelancer's wallet.",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-pink-500 to-cyan-500",
    },
    {
      number: 6,
      title: "Build Reputation",
      description: "Both users gain on-chain reputation. Dispute resolution ensures fair outcomes for all parties.",
      icon: <Star className="w-8 h-8" />,
      color: "from-cyan-500 to-purple-500",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="  mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-cyan-500 text-cyan-400 rounded-full text-sm font-medium">
            HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
            Simple Steps to Start Freelancing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our decentralized platform makes it easy to connect, collaborate, and get paid securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>

        <div className="mt-20 bg-gray-900/50 backdrop-blur-sm sm:border sm:border-gray-800 rounded-xl md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Ready to Start Your Decentralized Journey?
              </h3>
              <p className="text-gray-400 mb-6 text-lg">
                Join thousands of skilled professionals and clients already collaborating on the future of work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg flex items-center justify-center font-semibold transition-all">
                  Find Work
                </button>
                <button className="border-2 border-gray-600 hover:border-purple-500 text-gray-200 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  Hire Talent
                </button>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <FeatureList />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default HowItWorksSection;
function StepCard({ step, index }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsVisible(true)
      },
      index * 100 + 100,
    )

    return () => clearTimeout(timer)
  }, [index])

  return (
 <div
  className={`relative transition-all duration-700 ease-out ${
    isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-24 scale-95"
  } group`}
>
  <div className="relative bg-gray-900/70 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/70 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 ease-in-out group">
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
  <div className="inline-flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
    <div className="relative w-12 h-12 rounded-lg">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 z-0" />
      <div className="relative z-10 text-white text-xl flex items-center justify-center h-full w-full">
        {step.icon}
      </div>
    </div>
  </div>
  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{step.title}</h3>
  <p className="text-gray-300 leading-relaxed text-sm">{step.description}</p>
</div>
</div>

  )
}

function FeatureList() {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Decentralized & Secure",
      description: "No central authority, full blockchain security",
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: "Zero Platform Fees",
      description: "Keep 100% of your earnings",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      title: "Global Marketplace",
      description: "Connect with talent worldwide",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      title: "Instant Payments",
      description: "Get paid immediately upon completion",
    },
  ]

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-white mb-4">Why Choose CryptoLance?</h4>
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">{feature.icon}</div>
          <div>
            <h5 className="font-semibold text-white mb-1">{feature.title}</h5>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
