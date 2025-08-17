import { Link } from "react-router-dom";
const AboutSection = ({ username, tags, skills, avatar, about, location }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">About {username}</h3>
        <Link
          to={`/profile}`}
          className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 transition-colors"
        >
          <span>View profile</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      </div>
      <div className="flex items-start space-x-6 mb-6">
        <img
          src={avatar}
          alt={username}
          className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/50"
        />
        <div className="flex-1">
          <h3 className="font-bold text-white text-xl mb-3">
            {tags.map((tag, index) => (
              <span key={index}>
                {tag}
                {index !== tags.length - 1 && " | "}
              </span>
            ))}{" "}{" | "}
            {skills.map((skill, index) => (
        <span key={index}>
          {skill}
          {index !== tags.length - 1 && " | "}
        </span>
      ))}
          </h3>
          <div className="flex items-center space-x-3 text-gray-400 mb-4">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{location}</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            {about}...
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
