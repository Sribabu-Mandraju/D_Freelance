import { useState } from "react";
import { motion } from "framer-motion";
import MarketCard from "../marketSection/MarketCard";
import { useNavigate } from "react-router-dom";

// ✅ Static freelance project data
const projects = [
  {
    title: "Build a React Portfolio Website",
    budget: 5000,
    proposals: 12,
    trend: "up",
    data: [
      { value: 100 }, { value: 200 }, { value: 300 },
      { value: 250 }, { value: 400 }, { value: 450 },
    ],
  },
  {
    title: "Write SEO Blog Articles",
    budget: 1500,
    proposals: 30,
    trend: "down",
    data: [
      { value: 300 }, { value: 250 }, { value: 200 },
      { value: 180 }, { value: 220 }, { value: 210 },
    ],
  },
  {
    title: "Develop a Mobile App UI (Figma)",
    budget: 8000,
    proposals: 8,
    trend: "up",
    data: [
      { value: 150 }, { value: 300 }, { value: 320 },
      { value: 340 }, { value: 380 }, { value: 420 },
    ],
  },
  {
    title: "Set up WordPress Website",
    budget: 4000,
    proposals: 18,
    trend: "down",
    data: [
      { value: 200 }, { value: 190 }, { value: 180 },
      { value: 185 }, { value: 170 }, { value: 160 },
    ],
  },
  {
    title: "Design a Company Logo",
    budget: 2000,
    proposals: 25,
    trend: "up",
    data: [
      { value: 100 }, { value: 150 }, { value: 180 },
      { value: 160 }, { value: 200 }, { value: 230 },
    ],
  },
  {
    title: "Create Social Media Ad Banners",
    budget: 2500,
    proposals: 20,
    trend: "down",
    data: [
      { value: 180 }, { value: 160 }, { value: 170 },
      { value: 150 }, { value: 140 }, { value: 130 },
    ],
  },
];

function MarketSection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="text-white w-full max-w-7xl pt-12 mx-auto" id="trending">
      <div className="mb-8 text-center mt-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
          Kickstart Your Freelance Journey
        </h2>
        <p className="text-gray-400 mt-2">
          Explore top freelance opportunities and land your next big gig.
        </p>
      </div>

      <div className="grid grid-cols-1 w-[95%] md:w-[92%] mx-auto sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <MarketCard market={project} index={index} />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold">Ready to find your next project?</h3>
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
