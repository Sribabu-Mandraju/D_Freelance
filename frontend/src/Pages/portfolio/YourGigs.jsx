import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MarketCard from "../../Components/main/marketSection/MarketCard";
import { fetchGigs } from "../../store/gigSlice/gigSlice"; // Adjust path
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const YourGigs = ({ yourgigs = [] }) => {
  const dispatch = useDispatch();
  const { gigs, gigsLoading, gigsError } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (Array.isArray(yourgigs) && yourgigs.length > 0) {
      dispatch(fetchGigs(yourgigs));
    }
  }, [yourgigs, dispatch]);

  // UI states
  if (gigsLoading) return <div className="p-4 text-cyan-300">Loading your gigs…</div>;
  if (gigsError) return <div className="p-4 text-red-400">{gigsError}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {/* Render fetched gig cards */}
      {gigs && gigs.length > 0 ? (
        gigs.map((gig) => (
          <MarketCard
            key={gig._id || gig.id}
            username={gig.username}
            gigId={gig._id || gig.id}
            title={gig.title}
            description={gig.description}
            price={gig.price}
            gigimage={gig.gigimage}
            images={gig.images}
            avatar={gig.avatar}
            rating={gig.rating}
            projects={gig.projects}
            badges={gig.badges}
            location={gig.location}
            tags={gig.tags}
            skills={gig.skills}
            category={gig.category}
            deliveryTime={gig.deliveryTime}
            faqs={gig.faqs}
            about={gig.about}
            createdAt={gig.createdAt}
            basic={gig.basic}
            standard={gig.standard}
            pro={gig.pro}
          />
        ))
      ) : (
        (!yourgigs || yourgigs.length === 0) && (
          <div className="p-4 text-gray-400 col-span-full">No gigs to show.</div>
        )
      )}
    </div>
  );
};

export default YourGigs;