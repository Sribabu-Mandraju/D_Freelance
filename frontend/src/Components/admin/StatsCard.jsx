const StatsCard = ({ title, value, subtitle, icon, trend, trendUp }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>

      <div className="relative bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400/60 hover:bg-black/70 transition-all duration-300 shadow-2xl shadow-cyan-500/20 group-hover:shadow-cyan-500/30">
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
            {icon}
          </div>
          {/* {trend && (
            <div
              className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                trendUp
                  ? "text-green-400 bg-green-400/10 border border-green-400/20"
                  : "text-red-400 bg-red-400/10 border border-red-400/20"
              }`}
            >
              <span className="mr-1 text-base">{trendUp ? "↗" : "↘"}</span>
              {trend}
            </div>
          )} */}
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
            {value}
          </h3>
          <p className="text-gray-200 text-base font-medium">{title}</p>
          {subtitle && (
            <p className="text-cyan-400 text-sm font-medium px-3 py-1 bg-cyan-500/10 rounded-lg border border-cyan-500/20 inline-block">
              {subtitle}
            </p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-b-2xl"></div>
      </div>
    </div>
  )
}

export default StatsCard
