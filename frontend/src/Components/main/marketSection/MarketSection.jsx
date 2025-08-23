import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MarketCard from "../marketSection/MarketCard";
import { useNavigate } from "react-router-dom";
import { fetchGigs } from "../../../store/gigSlice/gigSlice";
import { useSelector, useDispatch } from "react-redux";

// ✅ Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MarketSection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const { gigs, error, loading } = useSelector((state) => state.gig);

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);


  
  return (
    <div className="text-white w-full max-w-7xl py-12 mx-auto relative" id="trending">
      {/* Heading */}
      <div className="sm:mb-4 mb-4 w-full text-center mt-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-orbitron sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500"
        >
          Kickstart Your Freelance Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-gray-400 mt-2"
        >
          Explore top freelance opportunities and land your next big gig.
        </motion.p>
      </div>
      <div className="text-right px-20 ">
        <motion.button
          className=" bg-blue-500 px-6 py-2 cursor-pointer rounded bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-xl"
          onClick={() => navigate("/gigs")}
          style={{ zIndex: 10, position: "relative" }}
        >
          View all
        </motion.button>
      </div>

      {/* ✅ Swiper Slider instead of Grid */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={60}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          // 1280: { slidesPerView: 4 },
        }}
        autoplay={{
          delay: 2500, // time (ms) between slides
          disableOnInteraction: false, // keep autoplay after user interaction
          pauseOnMouseEnter: true, // optional: pause when hovering
        }}
        loop={true}
        className=" w-full sm:w-[95%] py-16 relative"
      >
        {gigs &&
          gigs.map((gig, index) => (
            <SwiperSlide key={gig._id || index}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="transition-transform  duration-200 ease-out will-change-transform"
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
                />
              </motion.div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Footer CTA */}
      <div className="text-center mt-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-2xl font-semibold"
        >
          Ready to find your next project?
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
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
          style={{ zIndex: 10, position: "relative" }}
          onClick={() => navigate("/browse-jobs")}
        >
          Browse Projects
        </motion.button>
      </div>
    </div>
  );
}

export default MarketSection;
