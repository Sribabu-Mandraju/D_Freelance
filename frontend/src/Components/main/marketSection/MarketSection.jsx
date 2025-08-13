import { useState } from "react";
import { motion } from "framer-motion";
import MarketCard from "../marketSection/MarketCard";
import { useNavigate } from "react-router-dom";

// ✅ Static freelance project data
const projects = [
  {
    name: "Anjali Verma",
    level: "Top Rated Seller ★",
    description: "I will create responsive WordPress websites with Elementor",
    rating: 5.0,
    reviews: 1420,
    budget: 12500,
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    bannerImage:
      "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
  },
  {
    name: "Daniel Lee",
    level: "Level 1 ♦",
    description: "I will create responsive WordPress websites with Elementor",
    rating: 4.8,
    reviews: 350,
    budget: 9200,
    profileImage: "https://randomuser.me/api/portraits/men/33.jpg",
    bannerImage:
      "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
  },
  {
    name: "Fatima Noor",
    level: "Level 2 ♦♦",
    description: "I will create responsive WordPress websites with Elementor",
    rating: 4.9,
    reviews: 790,
    budget: 10800,
    profileImage: "https://randomuser.me/api/portraits/women/52.jpg",
    bannerImage:
      "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
  },
  {
    name: "Omar Khaled",
    level: "Top Rated Seller ★",
    description: "I will create responsive WordPress websites with Elementor",
    rating: 5.0,
    reviews: 1150,
    budget: 8900,
    profileImage: "https://randomuser.me/api/portraits/men/78.jpg",
    bannerImage:
      "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
  },
  {
    name: "Sakura Tanaka",
    level: "Level 1 ♦",
    description: "I will create responsive WordPress websites with Elementor",
    rating: 4.7,
    reviews: 410,
    budget: 13400,
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    bannerImage:
      "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
  },
  {
    name: "Liam Martinez",
    level: "New Seller",
    description: "I will create responsive WordPress websites with Elementor",
    rating: 4.6,
    reviews: 72,
    budget: 4800,
    profileImage: "https://randomuser.me/api/portraits/men/19.jpg",
    bannerImage:
      "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
  },
];

function MarketSection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="text-white w-full max-w-7xl   mx-auto" id="trending">
      <div className="mb-8 text-center mt-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
          Kickstart Your Freelance Journey
        </h2>
        <p className="text-gray-400 mt-2">
          Explore top freelance opportunities and land your next big gig.
        </p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1  w-[95%] md:w-full items-center justify-center mx-auto  gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
            }}
            initial={{
              opacity: 0,
              y: index * 40, // small offset for slide
              scale: 0.95, // slight zoom in
              rotate: index % 2 === 0 ? 2 : -2, // subtle rotation
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: index * 0.08,
            }}
            whileHover={{
              
              rotate: 0,
             
            }}
            className="transition-transform duration-200 ease-out"
          >
            <MarketCard service={project} index={index} />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold">
          Ready to find your next project?
        </h3>
        <p className="text-gray-400 mt-2">
          Join thousands of freelancers growing their careers every day.
        </p>
        <button
          className="mt-4 bg-blue-500 px-6 py-2 rounded bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-2xl"
          onClick={() => navigate("/projects")}
        >
          Browse Projects
        </button>
      </div>
    </div>
  );
}

export default MarketSection;
