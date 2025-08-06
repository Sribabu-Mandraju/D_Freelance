"use client";

import { useState } from "react";
import {
  Code,
  Palette,
  Smartphone,
  PenTool,
  Brain,
  Search,
  Video,
  Database,
} from "lucide-react";

const categories = [
  {
    name: "Web Development",
    icon: <Code className="w-8 h-8" />,
    jobs: 1247,
    avgPrice: "$2,500",
    color: "from-purple-500 to-pink-500",
    description: "Full-stack development, React, Node.js, and more",
  },
  {
    name: "Smart Contract Development",
    icon: <Database className="w-8 h-8" />,
    jobs: 892,
    avgPrice: "$5,000",
    color: "from-purple-500 to-pink-500",
    description: "Solidity, Web3, DeFi, and blockchain solutions",
  },
  {
    name: "UI/UX Design",
    icon: <Palette className="w-8 h-8" />,
    jobs: 1156,
    avgPrice: "$1,800",
    color: "from-purple-500 to-pink-500",
    description: "User interface design, prototyping, user research",
  },
  {
    name: "Content Writing",
    icon: <PenTool className="w-8 h-8" />,
    jobs: 2341,
    avgPrice: "$500",
    color: "from-purple-500 to-pink-500",
    description: "Blog posts, technical writing, copywriting",
  },
  {
    name: "Mobile App Development",
    icon: <Smartphone className="w-8 h-8" />,
    jobs: 743,
    avgPrice: "$3,200",
    color: "from-purple-500 to-pink-500",
    description: "iOS, Android, React Native, Flutter",
  },
  {
    name: "AI/ML Projects",
    icon: <Brain className="w-8 h-8" />,
    jobs: 456,
    avgPrice: "$4,500",
    color: "from-purple-500 to-pink-500",
    description: "Machine learning, data science, AI integration",
  },
  {
    name: "SEO & Digital Marketing",
    icon: <Search className="w-8 h-8" />,
    jobs: 1834,
    avgPrice: "$800",
    color: "from-purple-500 to-pink-500",
    description: "Search optimization, social media, marketing",
  },
  {
    name: "Video Editing & Animation",
    icon: <Video className="w-8 h-8" />,
    jobs: 567,
    avgPrice: "$1,200",
    color: "from-purple-500 to-pink-500",
    description: "Video production, motion graphics, animation",
  },
];

const PopularCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className=" mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-purple-500 text-purple-400 rounded-full text-sm font-medium">
            POPULAR CATEGORIES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
            Find Your Perfect Project
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore thousands of opportunities across the most in-demand
            categories in the decentralized economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Icon with gradient background */}
            <div className="group relative bg-gray-900/70 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/70 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer">
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
  <div className="inline-flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
    <div className="relative w-12 h-12 rounded-lg">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 z-0" />
      <div className="relative z-10 text-white text-xl flex items-center justify-center h-full w-full">
        {category.icon}
      </div>
    </div>
  </div>
  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
    {category.name}
  </h3>
  <p className="text-gray-300 text-sm mb-3">{category.description}</p>
</div>

              {/* Hover effect overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 rounded-b-2xl transition-opacity duration-300`}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Don't see your category?
          </h3>
          <p className="text-gray-400 mb-6">
            CryptoLance supports all types of digital work. Post your project
            and find the perfect freelancer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
              Browse All Categories
            </button>
            <button className="border-2 border-gray-600 hover:border-purple-500 text-gray-200 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
              Post Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PopularCategories;
