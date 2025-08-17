"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = "http://localhost:3001/api/admin/admin-panel-data" // change to your backend URL

const AdminDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sectionsLoaded, setSectionsLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL)
        setData(res.data.data)
        setTimeout(() => setSectionsLoaded(true), 300)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black overflow-hidden">
        <div className="relative">
          {/* Particle effects */}
          <div className="absolute inset-0 -m-20">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Enhanced spinner */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin shadow-2xl shadow-cyan-500/60"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-purple-500/20 border-b-purple-400 rounded-full animate-spin shadow-2xl shadow-purple-500/40"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
            <div
              className="absolute inset-2 w-16 h-16 border-2 border-pink-500/30 border-r-pink-400 rounded-full animate-spin shadow-xl shadow-pink-500/30"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>

          {/* Loading text */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            
            <div className="flex justify-center mt-2 space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-center">
          <div className="text-red-400 text-xl font-mono mb-4">Error loading dashboard</div>
          <div className="text-red-300 text-sm">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="relative z-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 font-mono animate-glow-text">
               ADMIN DASHBOARD
            </h1>
            {/* Animated underline */}
            <div className="relative">
              <div className="w-48 sm:w-64 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50 animate-pulse-glow"></div>
              {/* <div className="absolute inset-0 w-48 sm:w-64 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/50 animate-slide-glow"></div> */}
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
            <StatusIndicator label="SYSTEM" status="ONLINE" color="green" />
            <StatusIndicator label="DATA" status="LIVE" color="cyan" />
            <StatusIndicator label="SECURITY" status="ACTIVE" color="purple" />
          </div>
        </div>

        <div
          className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${sectionsLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Escrow Section */}
          <Section title="🔒 ESCROW PROTOCOL" delay="0ms">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Stat label="Total Balance" value={data.escrow.totalContractBalance} color="cyan" trend="+2.5%" />
              <Stat label="Locked Funds" value={data.escrow.totalLockedFunds} color="purple" trend="+1.2%" />
              <Stat label="Available Balance" value={data.escrow.availableBalance} color="green" trend="+0.8%" />
            </div>
          </Section>

          {/* HFT Token Section */}
          <Section title="🚀 HFT TOKEN METRICS" delay="100ms">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Stat label="Total USDC Balance" value={data.hftToken.totalUSDCBalance} color="cyan" trend="+5.2%" />
              <Stat
                label="Tokens Purchased"
                value={data.hftToken.totalHFTtokensPurchasedWithUSDC}
                color="purple"
                trend="+12.8%"
              />
              <Stat label="Claim Amount" value={data.hftToken.claimAmount} color="green" trend="+3.1%" />
              <Stat label="Bid Fee" value={data.hftToken.bidFee} color="pink" />
              <Stat label="Tokens Cost (150)" value={data.hftToken.tokensCost150} color="yellow" />
              <Stat label="Transfers Enabled" value={String(data.hftToken.transfersEnabled)} color="orange" status />
            </div>
          </Section>

          {/* Proposal Manager Section */}
          <Section title="⚡ PROPOSAL MANAGER" delay="200ms">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <Stat label="Proposal Count" value={data.proposalManager.proposalCount} color="cyan" />
              <Stat label="Platform Fee (bps)" value={data.proposalManager.platformFeeBasisPoints} color="purple" />
              <Stat label="Bid Fee" value={data.proposalManager.bidFee} color="green" />
              <Stat label="1st Payment %" value={data.proposalManager.firstPaymentPercent} color="pink" />
              <Stat label="2nd Payment %" value={data.proposalManager.secondPaymentPercent} color="yellow" />
              <Stat label="3rd Payment %" value={data.proposalManager.thirdPaymentPercent} color="orange" />
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-cyan-500/30 rounded-xl p-4 sm:p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">🏛️</span>
                </div>
                <h3 className="font-bold text-xl text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-mono">
                  DAO MEMBERS
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
              </div>

              <div className="space-y-3">
                {data.proposalManager.daoMembers.map((m, i) => (
                  <div
                    key={i}
                    className="group flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-black/40 border border-purple-500/20 rounded-lg hover:border-purple-500/60 hover:bg-black/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="font-mono text-sm sm:text-base text-gray-300 break-all group-hover:text-white transition-colors">
                        {m.member}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400/70 text-xs uppercase tracking-wider">ROLE:</span>
                      <span className="text-cyan-400 font-semibold text-sm px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full group-hover:border-cyan-500/60 transition-all duration-300">
                        {m.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Treasury Section */}
          <Section title="💎 TREASURY VAULT" delay="300ms">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Stat label="Total Balance" value={data.treasury.totalTreasureBalance} color="cyan" trend="+4.7%" />
              <Stat label="USDC Address" value={data.treasury.usdcTokenAddress} color="purple" />
            </div>
          </Section>

          {/* USDC Balances Section */}
          <Section title="💰 USDC ECOSYSTEM" delay="400ms">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              <Stat label="Escrow USDC" value={data.usdc.escrowBalance} color="cyan" trend="+2.1%" />
              <Stat label="HFT Token USDC" value={data.usdc.hftTokenBalance} color="purple" trend="+6.3%" />
              <Stat
                label="Proposal Manager USDC"
                value={data.usdc.proposalManagerBalance}
                color="green"
                trend="+1.8%"
              />
              <Stat label="Treasury USDC" value={data.usdc.treasuryBalance} color="pink" trend="+3.9%" />
              <Stat label="Total Supply" value={data.usdc.totalSupply} color="yellow" />
            </div>
          </Section>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scaleX(1); }
          50% { opacity: 0.7; transform: scaleX(1.1); }
        }
        
        @keyframes slide-glow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes glow-text {
          0%, 100% { text-shadow: 0 0 20px currentColor; }
          50% { text-shadow: 0 0 30px currentColor, 0 0 40px currentColor; }
        }
        
        .animate-glow-text {
          animation: glow-text 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-slide-glow {
          animation: slide-glow 3s ease-in-out infinite;
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  )
}

const Section = ({ title, children, delay = "0ms" }) => (
  <div
    className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 hover:border-cyan-500/40 hover:shadow-cyan-500/20 transition-all duration-700 hover:scale-[1.01] animate-fade-in-up"
    style={{ animationDelay: delay }}
  >
    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-mono flex items-center gap-3">
      {title}
      <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
    </h2>
    {children}
  </div>
)

const Stat = ({ label, value, color = "cyan", trend, status }) => {
  const colorClasses = {
    cyan: "border-cyan-500/30 shadow-cyan-500/20 hover:border-cyan-500/60 hover:shadow-cyan-500/40",
    purple: "border-purple-500/30 shadow-purple-500/20 hover:border-purple-500/60 hover:shadow-purple-500/40",
    green: "border-green-500/30 shadow-green-500/20 hover:border-green-500/60 hover:shadow-green-500/40",
    pink: "border-pink-500/30 shadow-pink-500/20 hover:border-pink-500/60 hover:shadow-pink-500/40",
    yellow: "border-yellow-500/30 shadow-yellow-500/20 hover:border-yellow-500/60 hover:shadow-yellow-500/40",
    orange: "border-orange-500/30 shadow-orange-500/20 hover:border-orange-500/60 hover:shadow-orange-500/40",
  }

  const textColors = {
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    green: "text-green-400",
    pink: "text-pink-400",
    yellow: "text-yellow-400",
    orange: "text-orange-400",
  }

  const trendColors = {
    cyan: "text-cyan-300 bg-cyan-500/10",
    purple: "text-purple-300 bg-purple-500/10",
    green: "text-green-300 bg-green-500/10",
    pink: "text-pink-300 bg-pink-500/10",
    yellow: "text-yellow-300 bg-yellow-500/10",
    orange: "text-orange-300 bg-orange-500/10",
  }

  return (
    <div
      className={`group relative p-4 sm:p-6 bg-black/40 backdrop-blur-sm border rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer ${colorClasses[color]}`}
    >
      <div
        className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${colorClasses[color].split(" ")[0]} rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${colorClasses[color].split(" ")[0]} rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      <div className="flex items-start justify-between mb-3">
        <p className="text-xs sm:text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider group-hover:text-gray-300 transition-colors">
          {label}
        </p>
        {status && (
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 ${textColors[color].replace("text-", "bg-")} rounded-full animate-pulse`}></div>
            <span className="text-xs text-gray-400">LIVE</span>
          </div>
        )}
      </div>

      <p
        className={`text-xl sm:text-xl lg:text-2xl font-bold break-all font-mono mb-2 ${textColors[color]} group-hover:scale-105 transition-transform duration-300`}
      >
        {value}
      </p>

      {trend && (
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono ${trendColors[color]} border border-current/20`}
        >
          <span className="text-green-400">↗</span>
          {trend}
        </div>
      )}
    </div>
  )
}

const StatusIndicator = ({ label, status, color }) => {
  const colors = {
    green: "text-green-400 border-green-500/30 bg-green-500/10",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${colors[color]} backdrop-blur-sm`}>
      <div
        className={`w-2 h-2 ${colors[color].split(" ")[0].replace("text-", "bg-")} rounded-full animate-pulse`}
      ></div>
      <span className="text-xs font-mono">
        <span className="text-gray-400">{label}:</span>
        <span className={`ml-1 ${colors[color].split(" ")[0]}`}>{status}</span>
      </span>
    </div>
  )
}

export default AdminDashboard
