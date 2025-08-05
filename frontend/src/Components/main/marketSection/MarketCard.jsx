import { useState } from "react";
import { Heart } from "lucide-react";

export default function MarketCard({ service }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-[350px] cursor-pointer rounded-xl overflow-hidden shadow-lg bg-gray-900 text-white relative group border-2 border-gray-800  bg-gray-900/70 backdrop-blur-lg  h-full 
                     hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/10 
                     transition-all duration-300 ease-in-out">
      {/* Banner Image with Wishlist Icon */}
      <div className="relative">
        <img
          src={service.bannerImage}
          alt="Service Banner"
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full shadow-md transition-all"
        >
          <Heart
            className={`w-5 h-5 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-300"
            }`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="p-4">
        {/* Profile + Name + Level */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={service.profileImage}
              alt={service.name}
              className="w-8 h-8 rounded-full"
            />
            <p className="text-md font-semibold  bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">{service.name}</p>
          </div>
          <span className="text-xs font-medium text-green-400 bg-gray-800 px-2 py-1 rounded-full">
            {service.level}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-3">{service.description}</p>

        {/* Rating + Price */}
        <div className="flex items-start flex-col gap-2 justify-between">
          <div className="text-sm text-yellow-400 ">
            ★ {service.rating}{" "}
            <span className="text-gray-400 font-normal">
              ({service.reviews})
            </span>
          </div>
          <p className="font-semibold  text-blue-600">
            From ₹{service.budget}
          </p>
        </div>
      </div>
    </div>
  );
}
