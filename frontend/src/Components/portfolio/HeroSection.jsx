import { useState } from 'react';
import { User, Shield, Zap, Edit, Save, X } from 'lucide-react';

function HeroSection({ personalInfo, setPersonalInfo }) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editBio, setEditBio] = useState(personalInfo.bio);

  const handleEditBio = () => {
    setIsEditingBio(true);
    setEditBio(personalInfo.bio);
  };

  const handleSaveBio = () => {
    setPersonalInfo(prev => ({ ...prev, bio: editBio }));
    setIsEditingBio(false);
  };

  const handleCancelBio = () => {
    setEditBio(personalInfo.bio);
    setIsEditingBio(false);
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden mb-6">
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div> */}

      {/* Hero Content */}
      <div className=" mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </h1>
        <p className="text-xl sm:text-1xl text-gray-300 mb-6">{personalInfo.title}</p>
        <p className="text-lg text-cyan-300 font-medium">{personalInfo.mission}</p>
      </div>

      {/* About Me Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
          <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mr-3 border border-cyan-500/30">
            <User className="w-6 h-6 text-cyan-400" />
          </div>
          About Me
        </h2>

        {!isEditingBio ? (
          <button
            onClick={handleEditBio}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-cyan-500/50 hover:border-cyan-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] group w-full sm:w-auto justify-center"
          >
            <Edit className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">Edit</span>
          </button>
        ) : (
          <div className="flex w-full sm:w-auto gap-2">
            <button
              onClick={handleSaveBio}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
            >
              <Save className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Save</span>
            </button>
            <button
              onClick={handleCancelBio}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
            >
              <X className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        {!isEditingBio ? (
          <p className="text-[14px]">{personalInfo.bio}</p>
        ) : (
          <textarea
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            className="w-full bg-gray-900/50 border border-cyan-500/50 rounded-lg px-4 py-3 text-gray-300 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] resize-none"
            rows="4"
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-4 sm:p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Expertise
            </h3>
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                Building DeFi platforms, NFTs, DAOs
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Smart contract auditing and security
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Full-stack development with modern frameworks
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Decentralized application architecture
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-4 sm:p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Focus Areas
            </h3>
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Trustless system development
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                Seamless user experiences
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                Blockchain security best practices
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Scalable web solutions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
