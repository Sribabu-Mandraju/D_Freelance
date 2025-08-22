import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import MarketCard from "../../Components/main/marketSection/MarketCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../../store/gigSlice/gigSlice";
import Loader from "../../Components/Loader";
import Footer from "../../Components/Footer";
import { Search as SearchIcon, X } from "lucide-react";

const Gigs = () => {
  const dispatch = useDispatch();
  const { gigs, loading, error } = useSelector((state) => state.gig);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxDeliveryTime, setMaxDeliveryTime] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [minSuccessRate, setMinSuccessRate] = useState("");
  const [tags, setTags] = useState("");
  const [skills, setSkills] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    Object.keys(filters).forEach((key) =>
      filters[key] === "" || filters[key] === undefined
        ? delete filters[key]
        : {}
    );
    dispatch(fetchGigs(filters));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setMaxDeliveryTime("");
    setStatus("");
    setLocation("");
    setMinSuccessRate("");
    setTags("");
    setSkills("");
    dispatch(fetchGigs({}));
  };

  const removeChip = (key, value) => {
    if (key === "tags") {
      const list = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .filter((t) => t !== value);
      setTags(list.join(", "));
      return;
    }
    if (key === "skills") {
      const list = skills
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .filter((t) => t !== value);
      setSkills(list.join(", "));
      return;
    }
    switch (key) {
      case "search":
        setSearchTerm("");
        break;
      case "category":
        setCategory("");
        break;
      case "minPrice":
        setMinPrice("");
        break;
      case "maxPrice":
        setMaxPrice("");
        break;
      case "minRating":
        setMinRating("");
        break;
      case "maxDeliveryTime":
        setMaxDeliveryTime("");
        break;
      case "status":
        setStatus("");
        break;
      case "location":
        setLocation("");
        break;
      case "minSuccessRate":
        setMinSuccessRate("");
        break;
      default:
        break;
    }
  };

  const tagList = tags
    ? tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const skillList = skills
    ? skills
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const selectedChips = [
    searchTerm && { key: "search", label: `Search: ${searchTerm}` },
    category && { key: "category", label: category },
    minPrice && { key: "minPrice", label: `Min ₹${minPrice}` },
    maxPrice && { key: "maxPrice", label: `Max ₹${maxPrice}` },
    minRating && { key: "minRating", label: `Rating ≥ ${minRating}` },
    maxDeliveryTime && {
      key: "maxDeliveryTime",
      label: `≤ ${maxDeliveryTime} days`,
    },
    status && { key: "status", label: status },
    location && { key: "location", label: location },
    minSuccessRate && {
      key: "minSuccessRate",
      label: `Success ≥ ${minSuccessRate}%`,
    },
  ].filter(Boolean);

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

      <div className="w-full">
        {/* Top Filters Bar */}
        <div className="sticky top-16 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800">
          <div className="p-4 lg:p-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {/* Search */}
              <div className="col-span-1 lg:col-span-2">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search gigs..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <select
                  className="w-full text-sm p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">
                    Mobile App Development
                  </option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Writing & Translation">
                    Writing & Translation
                  </option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Video & Animation">Video & Animation</option>
                  <option value="Music & Audio">Music & Audio</option>
                  <option value="Programming & Tech">Programming & Tech</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>

              {/* Price Min */}
              <div>
                <input
                  type="number"
                  placeholder="Min ₹"
                  className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              {/* Price Max */}
              <div>
                <input
                  type="number"
                  placeholder="Max ₹"
                  className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              {/* Rating */}
              <div>
                <select
                  className="w-full text-sm p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                >
                  <option value="">Rating</option>
                  <option value="1">1★+</option>
                  <option value="2">2★+</option>
                  <option value="3">3★+</option>
                  <option value="4">4★+</option>
                  <option value="5">5★</option>
                </select>
              </div>

              {/* Delivery */}
              <div>
                <input
                  type="number"
                  placeholder="Max days"
                  className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  value={maxDeliveryTime}
                  onChange={(e) => setMaxDeliveryTime(e.target.value)}
                />
              </div>
            </div>

            {/* Secondary row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-center">
              {/* Location */}
              <div className="col-span-1 lg:col-span-2">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Advanced toggle */}
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors w-full"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? "Hide advanced" : "More filters"}
                </button>
              </div>

              {/* Actions */}
              <div className="lg:col-span-3 flex items-center gap-2 justify-end">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                  onClick={handleClearFilters}
                >
                  Reset
                </button>
                <button
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-2 px-5 rounded-lg shadow-lg transition-colors"
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Advanced content */}
            {showAdvanced && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
                <div>
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Skills (comma separated)"
                    className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Chips */}
            {(selectedChips.length > 0 ||
              tagList.length > 0 ||
              skillList.length > 0) && (
              <div className="pt-1">
                <div className="flex flex-wrap gap-2">
                  {selectedChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-900 border border-gray-700 text-gray-300 text-xs"
                    >
                      {chip.label}
                      <button
                        className="text-gray-500 hover:text-white"
                        onClick={() => removeChip(chip.key)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {tagList.map((t, idx) => (
                    <span
                      key={`tag-${idx}`}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-900 border border-purple-700/40 text-purple-300 text-xs"
                    >
                      {t}
                      <button
                        className="text-purple-400 hover:text-white"
                        onClick={() => removeChip("tags", t)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {skillList.map((t, idx) => (
                    <span
                      key={`skill-${idx}`}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-900 border border-cyan-700/40 text-cyan-300 text-xs"
                    >
                      {t}
                      <button
                        className="text-cyan-400 hover:text-white"
                        onClick={() => removeChip("skills", t)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area (Gigs Display) */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="text-gray-400 text-lg col-span-full text-center">
                No gigs found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gigs;
