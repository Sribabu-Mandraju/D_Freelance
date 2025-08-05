// import React from "react";
// import { Star, CheckCircle } from "lucide-react";

// const freelancerData = [
//   {
//     name: "Aarav Mehta",
//     skills: ["UI/UX", "React", "Tailwind"],
//     rating: 4.8,
//     projects: 32,
//     status: "Available",
//     avatar: "https://i.pravatar.cc/150?img=32",
//   },
//   {
//     name: "Diya Sharma",
//     skills: ["Node.js", "MongoDB", "Express"],
//     rating: 4.5,
//     projects: 28,
//     status: "Busy",
//     avatar: "https://i.pravatar.cc/150?img=47",
//   },
//   {
//     name: "Karan Patel",
//     skills: ["Flutter", "Firebase", "Dart"],
//     rating: 4.9,
//     projects: 41,
//     status: "Available",
//     avatar: "https://i.pravatar.cc/150?img=12",
//   },
// ];

// export default function ActiveFreelancers() {
//   return (
//     <section className="pt-24 px-4 md:px-8 lg:px-16 text-white">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold mb-2">
//           Meet Our Top Active Freelancers
//         </h2>
//         <p className="text-gray-400 max-w-2xl mx-auto">
//           Skilled professionals currently working on high-impact projects. Get in touch or explore their portfolios.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {freelancerData.map((freelancer, idx) => (
//           <div
//             key={idx}
//             className="relative backdrop-blur-md bg-gray-900 border-2 px-6 py-4 border-gray-800 rounded-2xl  h-full
//                        hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
//           >
//             {/* Avatar + Name */}
//             <div className="flex items-center gap-4 mb-4">
//               <div className="relative">
//                 <img
//                   src={freelancer.avatar}
//                   alt={freelancer.name}
//                   className="w-14 h-14 rounded-full border border-gray-700 object-cover"
//                 />
//                 {/* Status Dot */}
//                 <span
//                   className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
//                     freelancer.status === "Available" ? "bg-green-400 animate-pulse" : "bg-red-400"
//                   }`}
//                 />
//               </div>

//               <div>
//                 <h3 className="text-lg font-bold">{freelancer.name}</h3>
//                 <div className="flex flex-wrap gap-1 mt-1">
//                   {freelancer.skills.map((skill, i) => (
//                     <span
//                       key={i}
//                       className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Rating & Projects */}
//             <div className="flex justify-between items-center mt-4">
//               <div className="flex items-center gap-1 text-yellow-400 font-semibold">
//                 <Star className="w-4 h-4 fill-yellow-400" />
//                 {freelancer.rating}
//               </div>
//               <p className="text-sm text-gray-400">{freelancer.projects} projects</p>
//             </div>

//             {/* Availability Status */}
//             <div className="mt-4">
//               <span
//                 className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
//                   freelancer.status === "Available"
//                     ? "bg-green-500/10 text-green-400"
//                     : "bg-red-500/10 text-red-400"
//                 }`}
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 {freelancer.status}
//               </span>
//             </div>

//             {/* Optional CTA */}
//             <div className="mt-6">
//               <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg transition">
//                 View Portfolio
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




"use client"

import { useState } from "react"
import { Star, CheckCircle, MapPin, Clock, Award } from "lucide-react"

const freelancerData = [
  {
    name: "Aarav Mehta",
    title: "Full-Stack Web3 Developer",
    skills: ["React", "Solidity", "Node.js", "Web3"],
    rating: 4.9,
    projects: 47,
    hourlyRate: 65,
    status: "Available",
    avatar: "https://i.pravatar.cc/150?img=32",
    location: "Mumbai, India",
    responseTime: "< 1 hour",
    successRate: 98,
    totalEarned: "$45,200",
    badges: ["Top Rated", "Rising Talent"],
  },
  {
    name: "Elena Rodriguez",
    title: "Smart Contract Auditor",
    skills: ["Solidity", "Security", "DeFi", "Testing"],
    rating: 5.0,
    projects: 23,
    hourlyRate: 85,
    status: "Available",
    avatar: "https://i.pravatar.cc/150?img=47",
    location: "Barcelona, Spain",
    responseTime: "< 30 min",
    successRate: 100,
    totalEarned: "$67,800",
    badges: ["Expert Verified", "Top Rated"],
  },
  {
    name: "Karan Patel",
    title: "Mobile App Developer",
    skills: ["Flutter", "React Native", "Firebase", "UI/UX"],
    rating: 4.8,
    projects: 62,
    hourlyRate: 45,
    status: "Busy",
    avatar: "https://i.pravatar.cc/150?img=12",
    location: "Toronto, Canada",
    responseTime: "< 2 hours",
    successRate: 96,
    totalEarned: "$38,900",
    badges: ["Rising Talent"],
  },
  {
    name: "Yuki Tanaka",
    title: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "Prototyping", "Web3 UX"],
    rating: 4.9,
    projects: 89,
    hourlyRate: 55,
    status: "Available",
    avatar: "https://i.pravatar.cc/150?img=44",
    location: "Tokyo, Japan",
    responseTime: "< 1 hour",
    successRate: 97,
    totalEarned: "$52,300",
    badges: ["Top Rated", "Design Expert"],
  },
  {
    name: "Marcus Johnson",
    title: "AI/ML Engineer",
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
    rating: 4.7,
    projects: 34,
    hourlyRate: 70,
    status: "Available",
    avatar: "https://i.pravatar.cc/150?img=19",
    location: "San Francisco, USA",
    responseTime: "< 3 hours",
    successRate: 94,
    totalEarned: "$41,600",
    badges: ["AI Specialist"],
  },
  {
    name: "Sofia Andersson",
    title: "Content Strategist",
    skills: ["Technical Writing", "SEO", "Blockchain", "Marketing"],
    rating: 4.8,
    projects: 156,
    hourlyRate: 35,
    status: "Available",
    avatar: "https://i.pravatar.cc/150?img=68",
    location: "Stockholm, Sweden",
    responseTime: "< 1 hour",
    successRate: 99,
    totalEarned: "$29,800",
    badges: ["Content Expert", "Top Rated"],
  },
]

const ActiveFreelancers = () => {
  const [selectedFreelancer, setSelectedFreelancer] = useState(null)

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-green-500 text-green-400 rounded-full text-sm font-medium">
            TOP FREELANCERS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
            Meet Our Elite Talent
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with verified professionals who are ready to bring your projects to life. All freelancers are vetted
            and have proven track records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {freelancerData.map((freelancer, idx) => (
            <FreelancerCard key={idx} freelancer={freelancer} onClick={() => setSelectedFreelancer(freelancer)} />
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to hire top talent?</h3>
          <p className="text-gray-400 mb-6">
            Join thousands of clients who have found their perfect freelancer match on CryptoLance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all">
              Browse All Freelancers
            </button>
            <button className="border border-gray-600 hover:border-purple-500 text-gray-200 hover:text-white px-8 py-3 rounded-lg transition-all">
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ActiveFreelancers;
function FreelancerCard({ freelancer, onClick }) {
  return (
    <div
      className="relative backdrop-blur-md bg-gray-900/70 border border-gray-800 rounded-2xl p-6 h-full hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 ease-in-out cursor-pointer group"
      onClick={onClick}
    >
      <div className="absolute top-4 right-4">
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            freelancer.status === "Available"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              freelancer.status === "Available" ? "bg-green-400 animate-pulse" : "bg-red-400"
            }`}
          />
          {freelancer.status}
        </span>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={freelancer.avatar || "/placeholder.svg"}
            alt={freelancer.name}
            className="w-16 h-16 rounded-full border-2 border-gray-700 object-cover group-hover:border-purple-500/50 transition-colors"
          />
          {freelancer.badges.includes("Expert Verified") && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
            {freelancer.name}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{freelancer.title}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            {freelancer.location}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {freelancer.badges.map((badge, i) => (
          <span
            key={i}
            className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full border border-purple-500/20"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {freelancer.skills.slice(0, 4).map((skill, i) => (
          <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
            {skill}
          </span>
        ))}
        {freelancer.skills.length > 4 && (
          <span className="text-xs text-gray-500">+{freelancer.skills.length - 4} more</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
            <Star className="w-4 h-4 fill-yellow-400" />
            {freelancer.rating}
          </div>
          <p className="text-xs text-gray-500">{freelancer.projects} projects</p>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold">${freelancer.hourlyRate}/hr</p>
          <p className="text-xs text-gray-500">Hourly rate</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {freelancer.responseTime}
        </div>
        <div className="flex items-center gap-1">
          <Award className="w-3 h-3" />
          {freelancer.successRate}% success
        </div>
      </div>

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg transition-colors group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-500">
        View Profile
      </button>
    </div>
  )
}
