const StatsCard = ({ title, value, subtitle, icon}) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

      <div className="relative bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4 hover:border-cyan-400/60 hover:bg-black/70 transition-all duration-300 shadow-xl shadow-cyan-500/20 group-hover:shadow-cyan-500/30">
        {/* Horizontal layout */}
        <div className="flex items-center justify-between">
          {/* Left side - Icon and main content */}
          <div className="flex space-x-4">
            <div className="relative">
              <div className="text-3xl p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                {icon}
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent leading-tight">
                {value}
              </h3>
              <p className="text-gray-200 text-sm font-medium">{title}</p>
              {subtitle && (
                <span className="text-cyan-400 text-xs font-medium px-2 py-1 bg-cyan-500/10 rounded-lg border border-cyan-500/20 inline-block">
                  {subtitle}
                </span>
              )}
            </div>
          </div>

         
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-b-xl"></div>
      </div>
    </div>
  )
}

export default StatsCard
