
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Heart, MapPin, Clock, Users, Bookmark } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// export default function MarketCard({
//   username,
//   gigId,
//   price,
//   title,
//   description,
//   gigimage,
//   images,
//   avatar,
//   rating,
//   projects,
//   badges,
//   location,
//   tags,
//   skills,
//   category,
//   deliveryTime,
//   faqs,
//   about,
//   createdAt,
//   basic,
//   standard,
//   pro,
// }) {
//   const [liked, setLiked] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);
//   const navigate = useNavigate();
//   // Generate tech tags based on service type (you can customize this)
//   // const techTags = ["React", "JavaScript", "CSS"];

//   // // Mock additional data for job listing format
//   // const jobData = {
//   //   duration: "1 week",
//   //   location: "Remote",
//   //   proposals: Math.floor(Math.random() * 10),
//   //   postedDate: "05/08/2025"
//   // };

//   return (
//     <motion.div
//       onClick={() =>
//         navigate(`/gig/${gigId}`, {
//           state: {
//             gigId,
//             username,
//             title,
//             description,
//             price,
//             gigimage,
//             images,
//             avatar,
//             rating,
//             projects,
//             badges,
//             location,
//             tags,
//             skills,
//             category,
//             deliveryTime,
//             faqs,
//             about,
//             createdAt,
//             basic,
//             standard,
//             pro,
//           },
//         })
//       }
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{
//         duration: 0.6,
//         delay: gigId * 0.1,
//         ease: "easeOut",
//       }}
//       whileHover={{
//         scale: 1,
//         boxShadow: "0 0 40px rgba(34, 211, 238, 0.1)",
//       }}
//       className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-md p-3 
//                  hover:border-cyan-400/50 transition-all duration-300 cursor-pointer
//                  shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden group scale-[0.8] h-[400px] z-20"
//     >
//       {/* Neon glow effect */}
//       <div
//         className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-pink-500/5 
//                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
//       />

//       {/* Header with title and bookmark */}
//       <button
//         onClick={() => setBookmarked(!bookmarked)}
//         className="text-gray-400 hover:text-cyan-400 transition-colors duration-300
//                      hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] absolute right-4 top-4 z-50"
//       >
//         <Bookmark
//           className={`w-5 h-5 ${
//             bookmarked ? "fill-cyan-400 text-cyan-400" : ""
//           }`}
//         />
//       </button>
//       <img src={gigimage} alt="" className="mb-3 h-[150px] w-full" />
//       <div className="flex items-start justify-between mb-4 relative z-10">
//         {/* <h3
//           className="text-lg font-semibold text-white group-hover:text-cyan-300 
//                        transition-colors duration-300 leading-tight"
//         >
//           {username}
//         </h3> */}
//       </div>

//       {/* Description */}
//       <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
//         {description}
//       </p>
//       {/* <div className="flex gap-2">
//    <div className="flex flex-wrap gap-2 mb-4">
//         {tags.map((tech, idx) => (
//           <span
//             key={idx}
//             className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full
//                        border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-300
//                        hover:shadow-[0_0_8px_rgba(34,211,238,0.6)]"
//           >
//             {tech}
//           </span>
//         ))}
//          {skills.map((tech, idx) => (
//           <span
//             key={idx}
//             className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full
//                        border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-300
//                        hover:shadow-[0_0_8px_rgba(34,211,238,0.6)]"
//           >
//             {tech}
//           </span>
//         ))}
//       </div>
// </div> */}
//       {/* Tech Tags */}

//       {/* Budget */}
//       <div className="flex gap-6 items-center">
//         <div className="mb-2">
//           <span className="text-2xl font-bold text-green-400 drop-shadow-[0_0_2px_rgba(34,197,94,0.4)]">
//             ₹ {price}
//           </span>
//         </div>

//         <div className="mb-2">
//           <span className="text-sm text-gray-400">
//             Created on :{" "}
//             {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
//           </span>
//         </div>
//       </div>

//       {/* Job Details */}
//       <div className="flex items-center gap-4 mb-2 text-sm text-gray-400">
//         <div className="flex flex-col items-center  gap-1">
//           <Clock className="w-4 h-4" />
//           <span>{deliveryTime} weeks</span>
//         </div>
//         <div className="flex flex-col items-center gap-1">
//           <MapPin className="w-4 h-4" />
//           <span>{location}</span>
//         </div>
//         <div className="flex  flex-col items-center gap-1">
//           <Users className="w-4 h-4" />
//           <span>{projects} Projects</span>
//         </div>
//       </div>

//       {/* Client Info */}
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-3">
//           <img
//             src={avatar || "/placeholder.svg"}
//             alt={username}
//             className="w-8 h-8 rounded-full border border-purple-500/50 
//                        shadow-[0_0_8px_rgba(168,85,247,0.6)]"
//           />
//           <div>
//             <p className="text-sm font-medium text-white">{username}</p>
//             <div className="flex items-center gap-1">
//               <span className="text-yellow-400 text-sm drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]">
//                 ★
//               </span>
//               <span className="text-sm text-gray-300">{rating}</span>
//               {/* <span className="text-xs text-gray-500">• {service.level}</span> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer with date and button */}
//       <div className="flex items-center justify-between">
//         {/* <span className="text-xs text-gray-500">{jobData.postedDate}</span> */}
//       </div>
//     </motion.div>
//   );
// }



"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Users, Bookmark, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

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
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const navigate = useNavigate()

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: gigId * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative bg-black border border-gray-800/60 rounded-2xl overflow-hidden 
                 cursor-pointer group h-[420px] backdrop-blur-sm
                 hover:border-cyan-400/60 transition-all duration-500 ease-out
                 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(6,182,212,0.15)]"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-purple-500/[0.02] 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-sm -z-10"
      />

      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          setBookmarked(!bookmarked)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-4 top-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm
                   border border-gray-700/50 hover:border-cyan-400/60 transition-all duration-300
                   hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
      >
        <Bookmark
          className={`w-4 h-4 transition-all duration-300 ${
            bookmarked
              ? "fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
              : "text-gray-400 hover:text-cyan-400"
          }`}
        />
      </motion.button>

      <div className="relative h-[180px] overflow-hidden">
        <img
          src={gigimage || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-4 space-y-3">
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 font-light">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 
                           bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
            >
              ₹{price}
            </span>
          </div>

          <div className="text-xs text-gray-500 font-light">
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors duration-300">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">{deliveryTime}w</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors duration-300">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-medium">{location}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 hover:text-pink-400 transition-colors duration-300">
            <Users className="w-3.5 h-3.5" />
            <span className="font-medium">{projects}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-gray-800/50">
          <div className="relative">
            <img
              src={avatar || "/placeholder.svg"}
              alt={username}
              className="w-10 h-10 rounded-full border-2 border-gray-700/50 
                         group-hover:border-cyan-400/60 transition-all duration-300
                         shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            />
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
            />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold text-white truncate group-hover:text-cyan-100 
                         transition-colors duration-300"
            >
              {username}
            </p>
            <div className="flex items-center gap-1.5">
              <Star
                className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 
                              drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
              />
              <span className="text-xs text-gray-300 font-medium">{rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent 
                      via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500"
      />
    </motion.div>
  )
}
