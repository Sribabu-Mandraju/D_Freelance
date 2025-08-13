"use client"

function TabNavigation({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="mb-6">
      <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
        <div className="flex flex-row gap-1 p-2 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 min-w-max">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/25 border border-cyan-500/30"
                    : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20"
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 ${activeTab === tab.id ? "text-cyan-400" : "group-hover:text-cyan-400"}`}
                />
                <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-sm -z-10"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TabNavigation
