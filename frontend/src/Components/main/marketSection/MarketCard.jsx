import { useState } from "react";
import { Heart } from "lucide-react";

export default function MarketCard({ service }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="md:w-[350px] cursor-pointer rounded-t-xl overflow-hidden  text-white relative group h-full 
                 hover:border-purple-500 hover:shadow-cyan-500/30 
                 transition-all duration-300 ease-in-out transform hover:scale-[1.02] backdrop-blur-xl"
    >           
      <div className="relative ">
        <img
          src="gig.jpg"
          alt="Service Banner"
          className="w-full h-62 object-cover group-hover:brightness-110 transition duration-300 rounded-t-xl"
        />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 bg-gray-900/70 hover:bg-purple-500/80 p-1.5 rounded-full shadow-lg backdrop-blur-sm 
                     transition-all duration-300 border border-purple-500/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.9)]"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              liked
                ? "fill-pink-500 text-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
                : "text-gray-300"
            }`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="p-4 backdrop-blur-lg bg-white/5 relative">
        {/* Profile + Name + Level */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img
              src={service.profileImage}
              alt={service.name}
              className="w-8 h-8 rounded-sm border border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
            />
            <p className="text-md font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]">
              {service.name}
            </p>
          </div>
          <span className="text-xs font-medium text-green-400 bg-gray-800/60 px-2 py-1 rounded-full border border-green-400/50 shadow-[0_0_6px_rgba(34,197,94,0.8)]">
            {service.level}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300/90 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Rating + Price */}
        <div className="flex flex-col gap-2">
          <div className="text-sm text-yellow-400 flex items-center gap-1">
            <span className="drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]">★</span> {service.rating}
            <span className="text-gray-400 font-normal">({service.reviews})</span>
          </div>
          <p className="font-semibold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
            From ₹{service.budget}
          </p>
        </div>
      </div>
    </div>
  );
}
