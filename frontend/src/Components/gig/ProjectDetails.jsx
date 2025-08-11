import React from 'react';
import { Zap, Shield } from 'lucide-react';

const ProjectDetails = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Project details</h2>
      <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
        <div className="prose max-w-none text-gray-300">
          <p className="mb-4 text-base leading-relaxed">
            I will create and deploy a fully functional, secure, and customized ERC-20 token smart contract on
            your preferred blockchain network (Ethereum, BSC, or Polygon). Whether you're launching a utility
            token, governance token, or just exploring blockchain capabilities, I ensure a clean and audit-ready
            smart contract using Solidity and industry best practices.
          </p>
          <p className="mb-4 text-base leading-relaxed">
            You'll receive complete source code, ownership transferred to your wallet, and optional verification
            on Etherscan (or BSCScan/Polygonscan).
          </p>
          <p className="mb-4">
            Per...{' '}
            <a href="#" className="text-cyan-400 underline hover:text-cyan-300 transition-colors">
              more
            </a>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-4 rounded-lg border border-cyan-500/20">
            <h3 className="font-semibold text-cyan-300 mb-2 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Programming Languages
            </h3>
            <p className="text-gray-300">JavaScript, Python, TypeScript</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-4 rounded-lg border border-purple-500/20">
            <h3 className="font-semibold text-purple-300 mb-2 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Coding Expertise
            </h3>
            <p className="text-gray-300">Cross Browser & Device Compatibility, Localization, Design</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
