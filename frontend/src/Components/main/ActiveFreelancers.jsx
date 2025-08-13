
import { useState } from "react"
import { Star, CheckCircle, MapPin, Clock, Award } from "lucide-react"



const freelancerData = [
  {
    name: "Aarav Mehta",
    title: "UI/UX Designer",
    skills: ["UI/UX", "React", "Tailwind"],
    badges: ["Expert Verified"],
    rating: 4.8,
    projects: 32,
    status: "Available",
    location: "Mumbai, India",
    hourlyRate: 50,
    responseTime: "1h",
    successRate: 95,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Diya Sharma",
    title: "Backend Developer",
    skills: ["Node.js", "MongoDB", "Express"],
    badges: ["Top Rated"],
    rating: 4.5,
    projects: 28,
    status: "Busy",
    location: "Bangalore, India",
    hourlyRate: 45,
    responseTime: "2h",
    successRate: 90,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Karan Patel",
    title: "Mobile Developer",
    skills: ["Flutter", "Firebase", "Dart"],
    badges: ["Expert Verified"],
    rating: 4.9,
    projects: 41,
    status: "Available",
    location: "Ahmedabad, India",
    hourlyRate: 60,
    responseTime: "1h",
    successRate: 98,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];

export default function ActiveFreelancers() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background gradients and grid overlay */}
      <div className="absolute inset-[1px] rounded-xl " />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
            <Star className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Meet Our Top Active Freelancers
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-2">
            Skilled professionals currently working on high-impact Web3 projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancerData.map((freelancer, idx) => (
            <div
              key={idx}
              className="relative bg-gray-900/70 border border-cyan-500/30 rounded-xl p-6 shadow-2xl shadow-cyan-500/20 hover:border-cyan-400/70 hover:shadow-cyan-500/30 transition-all duration-300 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
              <div className="absolute top-2 right-4">
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

              <div className="flex items-start gap-4 mb-4 mt-3">
                <div className="relative">
                  <img
                    src={freelancer.avatar || "/placeholder.svg"}
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full border-2 border-gray-700 object-cover group-hover:border-cyan-500/50 transition-colors"
                  />
                  {freelancer.badges.includes("Expert Verified") && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {freelancer.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">{freelancer.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
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
                  <span key={i} className="text-xs bg-gray-800/60 text-gray-300 px-2 py-1 rounded-full border border-gray-600/50 group-hover:border-cyan-500/50">
                    {skill}
                  </span>
                ))}
                {freelancer.skills.length > 4 && (
                  <span className="text-xs text-gray-300">+{freelancer.skills.length - 4} more</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    {freelancer.rating}
                  </div>
                  <p className="text-xs text-gray-300">{freelancer.projects} projects</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">${freelancer.hourlyRate}/hr</p>
                  <p className="text-xs text-gray-300">Hourly rate</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-300 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {freelancer.responseTime}
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {freelancer.successRate}% success
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-sm py-2 rounded-lg transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
