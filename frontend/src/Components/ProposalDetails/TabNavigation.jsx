"use client";

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "details", label: "Details", gradient: "from-cyan-500 to-blue-500" },
    { id: "bids", label: "Bids", gradient: "from-orange-500 to-red-500" },
    {
      id: "updates",
      label: "Updates",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "comments",
      label: "Comments",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-1 shadow-lg shadow-cyan-500/20 border border-cyan-500/20">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md shadow-cyan-500/50`
                : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
            }`}
          >
            {activeTab !== tab.id && (
              <div
                className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
