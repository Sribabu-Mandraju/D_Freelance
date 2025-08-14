export default function TabContent({ activeTab }) {
  const getTabContent = () => {
    switch (activeTab) {
      case "updates":
        return (
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                Project Updates
              </span>
            </h3>
            <p className="text-sm sm:text-base">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200">
                No updates available yet.
              </span>
            </p>
          </div>
        )
      case "comments":
        return (
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-green-300">Comments</span>
            </h3>
            <p className="text-sm sm:text-base">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200">
                No comments yet. Be the first to ask a question!
              </span>
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return getTabContent()
}
