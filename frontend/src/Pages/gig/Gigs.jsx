import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import MarketCard from "../../Components/main/marketSection/MarketCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../../store/gigSlice/gigSlice";
import Loader from "../../Components/Loader";
import Footer from "../../Components/Footer";

const Gigs = () => {
  const dispatch = useDispatch();
  const { gigs, loading, error } = useSelector((state) => state.gig);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxDeliveryTime, setMaxDeliveryTime] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [minSuccessRate, setMinSuccessRate] = useState('');
  const [tags, setTags] = useState('');
  const [skills, setSkills] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  useEffect(() => {
    handleApplyFilters();
  }, []);

  const handleApplyFilters = () => {
    const filters = {
      search: searchTerm,
      category,
      minPrice,
      maxPrice,
      minRating,
      maxDeliveryTime,
      status,
      location,
      minSuccessRate,
      tags,
      skills,
    };
    Object.keys(filters).forEach(key => filters[key] === '' || filters[key] === undefined ? delete filters[key] : {});
    dispatch(fetchGigs(filters));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setMaxDeliveryTime('');
    setStatus('');
    setLocation('');
    setMinSuccessRate('');
    setTags('');
    setSkills('');
    dispatch(fetchGigs({}));
  };

  if (loading) {
    return <Loader caption="Gigs" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-xl">
        Error loading gigs: {error || "Unknown error"}
      </div>
    );
  }

  if (!Array.isArray(gigs)) {
    console.error("Gigs is not an array:", gigs);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-xl">
        No gigs available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Navbar />

      <div className="flex flex-col lg:flex-row ">
        {/* Sidebar Toggle Button for mobile */}
        <button
          className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-cyan-600 rounded-full shadow-lg text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar (Filters) */}
        <div
          className={`fixed lg:static inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64 lg:w-80 bg-gray-900/90 backdrop-blur-xl border-r border-cyan-700/30 p-6 lg:p-5 space-y-2 z-40 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none mt-16 overflow-y-auto`}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">Filters</h2>

          {/* Search Bar */}
          <div className="mb-2">
            <label htmlFor="search" className="block text-gray-300 text-sm font-medium mb-2">Search Gigs</label>
            <input
              type="text"
              id="search"
              placeholder="Search by title or description..."
              className="w-full p-2 rounded-lg bg-gray-800/70 border border-cyan-600/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="mb-2">
            <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-2">Category</label>
            <select
              id="category"
              className="w-full text-sm p-2 rounded-lg bg-gray-800/70 border border-cyan-600/40 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Writing & Translation">Writing & Translation</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Video & Animation">Video & Animation</option>
              <option value="Music & Audio">Music & Audio</option>
              <option value="Programming & Tech">Programming & Tech</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-2">
            <label className="block text-gray-300 text-sm font-medium mb-2">Price Range</label>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 p-2 rounded-lg bg-gray-800/70 border border-cyan-600/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 p-2 rounded-lg bg-gray-800/70 border border-cyan-600/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Min Rating Filter */}
          <div className="mb-2">
            <label htmlFor="minRating" className="block text-gray-300 text-sm font-medium mb-2">Min Rating</label>
            <input
              type="number"
              id="minRating"
              placeholder="Min Rating (0-5)"
              min="0" max="5" step="0.1"
              className="w-full p-2 rounded-lg bg-gray-800/70 border border-cyan-600/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
          </div>

          {/* Max Delivery Time Filter */}
          <div className="mb-2">
            <label htmlFor="maxDeliveryTime" className="block text-gray-300 text-sm font-medium mb-2">Max Delivery (Days)</label>
            <input
              type="number"
              id="maxDeliveryTime"
              placeholder="Max Delivery Time"
              className="w-full p-2 rounded-lg bg-gray-800/70 border border-cyan-600/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              value={maxDeliveryTime}
              onChange={(e) => setMaxDeliveryTime(e.target.value)}
            />
          </div>

          {/* Location Filter */}
          <div className="mb-2">
            <label htmlFor="location" className="block text-gray-300 text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              id="location"
              placeholder="e.g., New York"
              className="w-full p-2 rounded-lg bg-gray-800/70 border border-cyan-600/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Skills Filter */}
          <div className="mb-2">
            <label htmlFor="skills" className="block text-gray-300 text-sm font-medium mb-2">Skills (comma-separated)</label>
            <input
              type="text"
              id="skills"
              placeholder="e.g., React, Node.js"
              className="w-full p-2 rounded-lg bg-gray-800/70 border border-cyan-600/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="mt-6 flex flex-col space-y-4">
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
            <button
              className="bg-gray-700 border border-gray-600 text-gray-300 font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Main Content Area (Gigs Display) */}
        <div className="flex-1 p-6 lg:p-8 mt-[50px] ">
      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {gigs.length > 0 ? (
              gigs.map((gig) => (
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
              ))
            ) : (
              <p className="text-gray-400 text-lg col-span-full text-center">No gigs found matching your criteria.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gigs;