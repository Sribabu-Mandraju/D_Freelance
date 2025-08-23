"use client"

import { useState, useEffect } from "react"
import MarketCard from "../../Components/main/marketSection/MarketCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchGigs } from "../../store/gigSlice/gigSlice"
import Loader from "../../Components/Loader"
import Footer from "../../Components/Footer"
import { SearchIcon } from "lucide-react"
import Navbar from "../../Components/Navbar"
import { motion } from "framer-motion"

const Gigs = () => {
  const dispatch = useDispatch()
  const { gigs, loading, error } = useSelector((state) => state.gig)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = () => {
    const filters = { search: searchTerm }
    if (!searchTerm) delete filters.search
    dispatch(fetchGigs(filters))
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    dispatch(fetchGigs({}))
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <Loader caption="Loading Gigs..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-400 text-lg font-medium">Error loading gigs: {error || "Something went wrong"}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400
                       hover:bg-red-500/30 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!Array.isArray(gigs)) {
    console.error("Gigs is not an array:", gigs)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400 text-lg font-light">No gigs available at the moment.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      <Navbar />

      <div className="relative mt-[40px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-purple-500/[0.03]" />

        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                           bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              Discover Amazing Gigs
            </h1>
            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
              Find the perfect freelance services for your next project
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 
                             rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div
                className="relative flex items-center bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 
                             rounded-2xl p-4 hover:border-cyan-400/50 transition-all duration-300
                             shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search for gigs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none font-light"
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="ml-3 text-gray-400 hover:text-red-400 transition-colors duration-300"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  className="ml-3 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 
                           text-white rounded-xl font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                           transition-all duration-300 hover:scale-105"
                >
                  Search
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-400 font-light">
                {gigs.length > 0 ? (
                  <span>
                    Showing <span className="text-cyan-400 font-medium">{gigs.length}</span> results
                  </span>
                ) : (
                  <span>No results found</span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {gigs.length > 0 ? (
              gigs.map((gig, index) => (
                <motion.div
                  key={gig._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <MarketCard
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
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-full text-center py-20"
              >
                <div className="space-y-4">
                  <div className="text-6xl">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-300">No gigs found</h3>
                  <p className="text-gray-500 font-light">Try adjusting your search terms</p>
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="mt-4 px-6 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg 
                               text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Gigs
