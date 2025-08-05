import React from "react";
import { Star, CheckCircle } from "lucide-react";

const freelancerData = [
  {
    name: "Aarav Mehta",
    skills: ["UI/UX", "React", "Tailwind"],
    rating: 4.8,
    projects: 32,
    status: "Available",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Diya Sharma",
    skills: ["Node.js", "MongoDB", "Express"],
    rating: 4.5,
    projects: 28,
    status: "Busy",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Karan Patel",
    skills: ["Flutter", "Firebase", "Dart"],
    rating: 4.9,
    projects: 41,
    status: "Available",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];

export default function ActiveFreelancerCard() {
  return (
    <section className="pt-24 px-4 md:px-8 lg:px-16 text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Meet Our Top Active Freelancers
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Skilled professionals currently working on high-impact projects. Get in touch or explore their portfolios.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancerData.map((freelancer, idx) => (
          <div
            key={idx}
            className=" backdrop-blur-md border border-gray-800 rounded-2xl p-8 h-full 
                     hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/10 
                     transition-all duration-300 ease-in-out bg-gray-900/50   shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-14 h-14 rounded-full object-cover border border-gray-700"
              />
              <div>
                <h3 className="text-lg font-bold">{freelancer.name}</h3>
                <p className="text-sm text-gray-400">{freelancer.skills.join(", ")}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star className="w-4 h-4 fill-yellow-400" />
                {freelancer.rating}
              </div>
              <p className="text-sm text-gray-400">{freelancer.projects} projects</p>
            </div>

            <div className="mt-4">
              <span
                className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
                  freelancer.status === "Available"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {freelancer.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
