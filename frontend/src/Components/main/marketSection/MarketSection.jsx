import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MarketCard from "../marketSection/MarketCard";
import { useNavigate } from "react-router-dom";
import { fetchGigs } from "../../../store/gigSlice/gigSlice";
import { useSelector, useDispatch } from "react-redux";
// ✅ Static freelance project data
// const projects = [
//   {
//     name: "Anjali Verma",
//     level: "Top Rated Seller ★",
//     description: "I will create responsive WordPress websites with Elementor",
//     rating: 5.0,
//     reviews: 1420,
//     budget: 12500,
//     profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
//     bannerImage:
//       "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
//   },
//   {
//     name: "Daniel Lee",
//     level: "Level 1 ♦",
//     description: "I will create responsive WordPress websites with Elementor",
//     rating: 4.8,
//     reviews: 350,
//     budget: 9200,
//     profileImage: "https://randomuser.me/api/portraits/men/33.jpg",
//     bannerImage:
//       "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
//   },
//   {
//     name: "Fatima Noor",
//     level: "Level 2 ♦♦",
//     description: "I will create responsive WordPress websites with Elementor",
//     rating: 4.9,
//     reviews: 790,
//     budget: 10800,
//     profileImage: "https://randomuser.me/api/portraits/women/52.jpg",
//     bannerImage:
//       "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
//   },
//   {
//     name: "Omar Khaled",
//     level: "Top Rated Seller ★",
//     description: "I will create responsive WordPress websites with Elementor",
//     rating: 5.0,
//     reviews: 1150,
//     budget: 8900,
//     profileImage: "https://randomuser.me/api/portraits/men/78.jpg",
//     bannerImage:
//       "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
//   },
//   {
//     name: "Sakura Tanaka",
//     level: "Level 1 ♦",
//     description: "I will create responsive WordPress websites with Elementor",
//     rating: 4.7,
//     reviews: 410,
//     budget: 13400,
//     profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
//     bannerImage:
//       "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
//   },
//   {
//     name: "Liam Martinez",
//     level: "New Seller",
//     description: "I will create responsive WordPress websites with Elementor",
//     rating: 4.6,
//     reviews: 72,
//     budget: 4800,
//     profileImage: "https://randomuser.me/api/portraits/men/19.jpg",
//     bannerImage:
//       "https://tse2.mm.bing.net/th/id/OIP.ZVD87RQADtYXJekElacXzAHaEK?pid=Api&P=0&h=180",
//   },
// ];

function MarketSection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const { gigs, error, loading } = useSelector((state) => state.gig);

  // Per-card sequential reveal using custom index
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.34,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const firstChunk = gigs ? gigs.slice(0, 3) : [];
  const secondChunk = gigs ? gigs.slice(0, 3) : [];

  return (
    <div className="text-white w-full max-w-7xl   mx-auto" id="trending">
      <div className="mb-8 text-center mt-4">
        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-2xl font-orbitron sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500"
        >
          Kickstart Your Freelance Journey
        </motion.h2>
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-gray-400 mt-2"
        >
          Explore top freelance opportunities and land your next big gig.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1  w-[95%] md:w-full items-center justify-center mx-auto  gap-4">
        {firstChunk.map((gig, index) => (
          <motion.div
            key={gig._id || index}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="transition-transform duration-200 ease-out will-change-transform"
          >
            <MarketCard
              key={gig._id}
              username={gig.username}
              gigId={gig._id}
              title={gig.title}
              description={gig.description}
              price={gig.price}
              gigimage={gig.gigimage}
              images={gig.images}
              avatar={gig.avatar}
              rating={gig.rating || 0}
              projects={gig.projects}
              badges={gig.badges || []}
              location={gig.location}
              tags={gig.tags || []}
              skills={gig.skills || []}
              category={gig.category}
              deliveryTime={gig.deliveryTime}
              faqs={gig.faqs || []}
              about={gig.about}
              createdAt={gig.createdAt}
              basic={gig.basic}
              standard={gig.standard}
              pro={gig.pro}
            />{" "}
          </motion.div>
        ))}
        {secondChunk.map((gig, index) => (
          <motion.div
            key={`second-${gig._id || index}`}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={index + firstChunk.length}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="transition-transform duration-200 ease-out will-change-transform"
          >
            <MarketCard
              key={gig._id}
              username={gig.username}
              gigId={gig._id}
              title={gig.title}
              description={gig.description}
              price={gig.price}
              gigimage={gig.gigimage}
              images={gig.images}
              avatar={gig.avatar}
              rating={gig.rating || 0}
              projects={gig.projects}
              badges={gig.badges || []}
              location={gig.location}
              tags={gig.tags || []}
              skills={gig.skills || []}
              category={gig.category}
              deliveryTime={gig.deliveryTime}
              faqs={gig.faqs || []}
              about={gig.about}
              createdAt={gig.createdAt}
              basic={gig.basic}
              standard={gig.standard}
              pro={gig.pro}
            />{" "}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <motion.h3
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-2xl font-semibold"
        >
          Ready to find your next project?
        </motion.h3>
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-gray-400 mt-2"
        >
          Join thousands of freelancers growing their careers every day.
        </motion.p>
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "tween", duration: 0.2 }}
          className="mt-4 bg-blue-500 px-6 py-2 rounded bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-2xl"
          onClick={() => navigate("/projects")}
        >
          Browse Projects
        </motion.button>
      </div>
    </div>
  );
}

export default MarketSection;
