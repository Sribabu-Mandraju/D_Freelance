import React from "react";
import Navbar from "../../Components/Navbar";
import { useEffect,useState } from "react";
import MarketCard from "../../Components/main/marketSection/MarketCard";
const Gigs = () => {
const [gigs, setGigs] = useState([]);
useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/gigs");
        if (!response.ok) {
          throw new Error("Failed to fetch gigs");
        }
        const data = await response.json();
        setGigs(data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    fetchGigs();
    
  }, []);
console.log("Gigs fetched successfully:", gigs);
  return (
    <div className="min-h-screen bg-gray-900">
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-6">Available Gigs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <MarketCard 
                key={gig._id}
                username={gig.username}
                gigId={gig._id}
                title={gig.title}
                description={gig.description}
                price={gig.price}
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
      
                 />
            ))}
          </div>
          </div>
    </div>
  )
}

export default Gigs;