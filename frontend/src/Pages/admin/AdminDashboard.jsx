"use client"

import { useState, useEffect } from "react"
import StatsCard from "../../Components/admin/StatsCard"
import Navbar from "../../Components/Navbar"

const Dashboard = () => {
  const [escrowData, setEscrowData] = useState(null)
  const [hftData, setHftData] = useState(null)
  const [proposalData, setProposalData] = useState(null)
  const [treasuryData, setTreasuryData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [escrowRes, hftRes, proposalRes, treasuryRes] = await Promise.all([
          fetch("http://localhost:3001/api/admin/escrow-data"),
          fetch("http://localhost:3001/api/admin/hft-token-data"),
          fetch("http://localhost:3001/api/admin/proposal-manager-data"),
          fetch("http://localhost:3001/api/admin/treasury-data"),
        ])

        const escrow = await escrowRes.json()
        const hft = await hftRes.json()
        const proposal = await proposalRes.json()
        const treasury = await treasuryRes.json()

        setEscrowData(escrow.data)
        setHftData(hft.data)
        setProposalData(proposal.data)
        setTreasuryData(treasury.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
  }

  const formatCurrency = (rawValue) => {
    const scaledValue = (rawValue || 0) / 1000000 // 1 dollar = 1,000,000 in raw data
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(scaledValue)
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
     <Navbar />

      <div className="p-6 mt-[60px] space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Contract Balance"
            value={formatCurrency(escrowData?.escrow?.totalContractBalance || 0)}
            subtitle="Escrow Contract"
            icon="💰"
            trend="+2.5%"
            trendUp={true}
          />
          <StatsCard
            title="HFT Token Balance"
            value={formatCurrency(hftData?.hftToken?.totalUSDCBalance || 0)}
            subtitle="USDC Balance"
            icon="🪙"
            trend="+5.2%"
            trendUp={true}
          />
          <StatsCard
            title="Treasury Balance"
            value={formatCurrency(treasuryData?.treasury?.totalTreasureBalance || 0)}
            subtitle="Total Treasury"
            icon="🏦"
            trend="-1.2%"
            trendUp={false}
          />
          <StatsCard
            title="Active Proposals"
            value={proposalData?.proposalManager?.proposalCount || 0}
            subtitle="Total Proposals"
            icon="📋"
            trend="+8.1%"
            trendUp={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Escrow Details */}
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Escrow Contract Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                    <span className="text-gray-300">Total Locked Funds</span>
                    <span className="font-semibold text-green-400">
                      {formatCurrency(escrowData?.escrow?.totalLockedFunds || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                    <span className="text-gray-300">Available Balance</span>
                    <span className="font-semibold text-cyan-400">
                      {formatCurrency(escrowData?.escrow?.availableBalance || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                    <span className="text-gray-300">Escrow USDC Balance</span>
                    <span className="font-semibold text-blue-400">
                      {formatCurrency(escrowData?.usdc?.escrowBalance || 0)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                    <span className="text-gray-300 block text-sm">USDC Token</span>
                    <span className="font-mono text-xs text-cyan-400">
                      {formatAddress(escrowData?.escrow?.usdcToken || "")}
                    </span>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                    <span className="text-gray-300 block text-sm">Treasury</span>
                    <span className="font-mono text-xs text-green-400">
                      {formatAddress(escrowData?.escrow?.treasury || "")}
                    </span>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                    <span className="text-gray-300 block text-sm">Governance</span>
                    <span className="font-mono text-xs text-blue-400">
                      {formatAddress(escrowData?.escrow?.governanceContract || "")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HFT Token Info */}
          <div>
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">HFT Token</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(hftData?.hftToken?.totalHFTtokensPurchasedWithUSDC || 0)}
                  </div>
                  <div className="text-sm opacity-90">Tokens Purchased</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 hover:bg-cyan-500/10 rounded transition-colors">
                    <span className="text-gray-400">Claim Interval</span>
                    <span className="text-white">
                      {Math.floor((hftData?.hftToken?.claimInterval || 0) / 86400)} days
                    </span>
                  </div>
                  <div className="flex justify-between p-2 hover:bg-cyan-500/10 rounded transition-colors">
                    <span className="text-gray-400">Bid Fee</span>
                    <span className="text-white">{(hftData?.hftToken?.bidFee / 1e18).toFixed(2)} ETH</span>
                  </div>
                  <div className="flex justify-between p-2 hover:bg-cyan-500/10 rounded transition-colors">
                    <span className="text-gray-400">Transfers</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${hftData?.hftToken?.transfersEnabled ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                    >
                      {hftData?.hftToken?.transfersEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proposal Manager & DAO Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Proposal Manager</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                <div className="text-2xl font-bold text-white">
                  {proposalData?.proposalManager?.firstPaymentPercent}%
                </div>
                <div className="text-xs opacity-90">1st Payment</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <div className="text-2xl font-bold text-white">
                  {proposalData?.proposalManager?.secondPaymentPercent}%
                </div>
                <div className="text-xs opacity-90">2nd Payment</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
                <div className="text-2xl font-bold text-white">
                  {proposalData?.proposalManager?.thirdPaymentPercent}%
                </div>
                <div className="text-xs opacity-90">3rd Payment</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-2 hover:bg-cyan-500/10 rounded transition-colors">
                <span className="text-gray-400">Platform Fee</span>
                <span className="text-white">
                  {(proposalData?.proposalManager?.platformFeeBasisPoints / 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between p-2 hover:bg-cyan-500/10 rounded transition-colors">
                <span className="text-gray-400">Proposal Count</span>
                <span className="text-white">{proposalData?.proposalManager?.proposalCount}</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">DAO Members</h3>
            <div className="space-y-3">
              {proposalData?.proposalManager?.daoMembers?.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${member.role === "1" ? "bg-green-400" : "bg-cyan-400"}`}
                    ></div>
                    <span className="font-mono text-sm text-gray-300">{formatAddress(member.member)}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${member.role === "1" ? "bg-green-500 text-white" : "bg-cyan-500 text-white"}`}
                  >
                    {member.role === "1" ? "Admin" : "Member"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Treasury Overview */}
        <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Treasury Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/30 transition-colors">
              <div className="text-3xl font-bold text-green-400">
                {formatCurrency(treasuryData?.treasury?.totalTreasureBalance || 0)}
              </div>
              <div className="text-gray-400 mt-2">Treasury Balance</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/30 transition-colors">
              <div className="text-3xl font-bold text-cyan-400">
                {formatCurrency(treasuryData?.usdc?.treasuryBalance || 0)}
              </div>
              <div className="text-gray-400 mt-2">USDC Balance</div>
            </div>
            {/* <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/30 transition-colors">
              <div className="text-3xl font-bold text-blue-400">
                {formatNumber(treasuryData?.usdc?.totalSupply || 0)}
              </div>
              <div className="text-gray-400 mt-2">Total Supply</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
