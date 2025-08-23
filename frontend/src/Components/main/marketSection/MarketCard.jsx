// import { useState } from "react";
// import { Heart } from "lucide-react";

// export default function MarketCard({ service }) {
//   const [liked, setLiked] = useState(false);

//   return (
//     <div
//       className="md:w-[350px] cursor-pointer rounded-t-xl overflow-hidden  text-white relative group h-full
//                  hover:border-purple-500 hover:shadow-cyan-500/30
//                  transition-all duration-300 ease-in-out transform hover:scale-[1.02] backdrop-blur-xl"
//     >
//       <div className="relative ">
//         <img
//           src="gig.jpg"
//           alt="Service Banner"
//           className="w-full h-62 object-cover group-hover:brightness-110 transition duration-300 rounded-t-xl"
//         />
//         <button
//           onClick={() => setLiked(!liked)}
//           className="absolute top-2 right-2 bg-gray-900/70 hover:bg-purple-500/80 p-1.5 rounded-full shadow-lg backdrop-blur-sm
//                      transition-all duration-300 border border-purple-500/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.9)]"
//         >
//           <Heart
//             className={`w-5 h-5 transition-all duration-300 ${
//               liked
//                 ? "fill-pink-500 text-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
//                 : "text-gray-300"
//             }`}
//           />
//         </button>
//       </div>

//       {/* Details */}
//       <div className="p-4 backdrop-blur-lg bg-white/5 relative">
//         {/* Profile + Name + Level */}
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <img
//               src={service.profileImage}
//               alt={service.name}
//               className="w-8 h-8 rounded-sm border border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
//             />
//             <p className="text-md font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]">
//               {service.name}
//             </p>
//           </div>
//           <span className="text-xs font-medium text-green-400 bg-gray-800/60 px-2 py-1 rounded-full border border-green-400/50 shadow-[0_0_6px_rgba(34,197,94,0.8)]">
//             {service.level}
//           </span>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-gray-300/90 mb-4 leading-relaxed">
//           {service.description}
//         </p>

//         {/* Rating + Price */}
//         <div className="flex flex-col gap-2">
//           <div className="text-sm text-yellow-400 flex items-center gap-1">
//             <span className="drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]">★</span> {service.rating}
//             <span className="text-gray-400 font-normal">({service.reviews})</span>
//           </div>
//           <p className="font-semibold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
//             From ₹{service.budget}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Clock, Users, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image from "../../../../public/gig.png"; // Placeholder image
export default function MarketCard({
  username,
  gigId,
  price,
  title,
  description,
  gigimage,
  images,
  avatar,
  rating,
  projects,
  badges,
  location,
  tags,
  skills,
  category,
  deliveryTime,
  faqs,
  about,
  createdAt,
  basic,
  standard,
  pro,
}) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate();
  // Generate tech tags based on service type (you can customize this)
  // const techTags = ["React", "JavaScript", "CSS"];

  // // Mock additional data for job listing format
  // const jobData = {
  //   duration: "1 week",
  //   location: "Remote",
  //   proposals: Math.floor(Math.random() * 10),
  //   postedDate: "05/08/2025"
  // };

  return (
    <motion.div
      onClick={() =>
        navigate(`/gig/${gigId}`, {
          state: {
            gigId,
            username,
            title,
            description,
            price,
            gigimage,
            images,
            avatar,
            rating,
            projects,
            badges,
            location,
            tags,
            skills,
            category,
            deliveryTime,
            faqs,
            about,
            createdAt,
            basic,
            standard,
            pro,
          },
        })
      }
      // initial={{ opacity: 0, y: 50 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{
      //   duration: 0.6,
      //   delay: gigId * 0.1,
      //   ease: "easeOut",
      // }}
      // whileHover={{
      //   boxShadow: "0 0 40px rgba(34, 211, 238, 0.1)",
      // }}
      className=" rounded-md px-[74px] py-[64px] 
                 transition-all duration-300 cursor-pointer
                 shadow-lg  relative overflow-hidden group  scale-[0.8] h-[550px]  z-20"
    >
      {/* Neon glow effect */}
      {/* <div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-pink-500/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
      /> */}
      <img
        src={image}
        alt="background"
        className="absolute inset-0  w-full h-full"
      />

      {/* Header with title and bookmark */}
      <button
        onClick={() => setBookmarked(!bookmarked)}
        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300
                     hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] absolute right-4 top-4 z-50"
      >
        <Bookmark
          className={`w-5 h-5 ${
            bookmarked ? "fill-cyan-400 text-cyan-400" : ""
          }`}
        />
      </button>
      <img src={gigimage} alt="" className="mb-3 rounded-lg h-[200px] w-full" />
      <div className="flex items-start justify-between mb-4 relative z-10">
        {/* <h3
          className="text-lg font-semibold text-white group-hover:text-cyan-300 
                       transition-colors duration-300 leading-tight"
        >
          {username}
        </h3> */}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
        {description}
      </p>
      {/* <div className="flex gap-2">
   <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full
                       border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-300
                       hover:shadow-[0_0_8px_rgba(34,211,238,0.6)]"
          >
            {tech}
          </span>
        ))}
         {skills.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full
                       border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-300
                       hover:shadow-[0_0_8px_rgba(34,211,238,0.6)]"
          >
            {tech}
          </span>
        ))}
      </div>
</div> */}
      {/* Tech Tags */}

      {/* Budget */}
      <div className="flex gap-6 items-center">
        <div className="mb-2">
          <span className="text-2xl font-bold text-green-400 drop-shadow-[0_0_2px_rgba(34,197,94,0.4)]">
            ₹ {price}
          </span>
        </div>

        <div className="mb-2">
          <span className="text-sm text-gray-400">
            Created on :{" "}
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex items-center gap-4 mb-2 text-sm text-gray-400">
        <div className="flex flex-col items-center  gap-1">
          <Clock className="w-4 h-4" />
          <span>{deliveryTime} weeks</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex  flex-col items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{projects} Projects</span>
        </div>
      </div>

      {/* Client Info */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <img
            src={avatar || "/placeholder.svg"}
            alt={username}
            className="w-8 h-8 rounded-full border border-purple-500/50 
                       shadow-[0_0_8px_rgba(168,85,247,0.6)]"
          />
          <div>
            <p className="text-sm font-medium text-white">{username}</p>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]">
                ★
              </span>
              <span className="text-sm text-gray-300">{rating}</span>
              {/* <span className="text-xs text-gray-500">• {service.level}</span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with date and button */}
      <div className="flex items-center justify-between">
        {/* <span className="text-xs text-gray-500">{jobData.postedDate}</span> */}
      </div>
    </motion.div>
  );
}
