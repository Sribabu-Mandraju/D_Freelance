import React from "react";
import Navbar from "../../Components/Navbar";
import { useEffect } from "react";
import MarketCard from "../../Components/main/marketSection/MarketCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../../store/gigSlice/gigSlice"; // Adjust path

const Gigs = () => {
  const dispatch = useDispatch();
  const { gigs, loading, error } = useSelector((state) => state.gig);

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl">
        Loading gigs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-xl">
        Error loading gigs: {error || "Unknown error"}
      </div>
    );
  }

  // Ensure gigs is an array before mapping
  if (!Array.isArray(gigs)) {
    console.error("Gigs is not an array:", gigs);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-xl">
        No gigs available
      </div>
    );
  }

  console.log("Gigs fetched successfully:", gigs);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold font-orbitron text-white mb-6">Available Gigs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
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
              rating={gig.rating || 0} // Fallback if rating is undefined
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;