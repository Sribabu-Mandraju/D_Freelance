import { Check, ChevronDown } from "lucide-react"

const ProjectSteps = ({ username }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      <h3 className="text-2xl font-bold text-white mb-6">Steps for completing your project</h3>
      <div className="space-y-8">
        <div className="flex items-start space-x-6">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            1
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-3 text-lg">
              After purchasing the project, send requirements so {username} can start the project.
            </h3>
            <p className="text-gray-400 mb-4">Delivery time starts when {username} receives requirements from you.</p>
            {/* <button className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 transition-colors">
              <span>View requirements</span>
              <ChevronDown className="w-4 h-4" />
            </button> */}
          </div>
        </div>
        <div className="flex items-start space-x-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            2
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-3 text-lg">
              {username} works on your project following the steps below.
            </h3>
            <p className="text-gray-400 mb-6">Revisions may occur after the delivery date.</p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Check className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Requirement Collection</h4>
                  <p className="text-gray-400">
                    Client submits token name, symbol, total supply, decimals, network preference, and wallet address.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Check className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Smart Contract Development</h4>
                  <p className="text-gray-400">
                    I write a custom ERC-20 token contract in Solidity, following best practices for security and gas
                    optimization.
                  </p>
                </div>
              </div>
            </div>
            {/* <button className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-2 mt-6 transition-colors">
              <span>Show all</span>
              <ChevronDown className="w-4 h-4" />
            </button> */}
          </div>
        </div>
        <div className="flex items-start space-x-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
            3
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-3 text-lg">
              Review the work, release payment, and leave feedback to {username}.
            </h3>
            {/* <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              What if I'm not happy with the work?
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSteps
