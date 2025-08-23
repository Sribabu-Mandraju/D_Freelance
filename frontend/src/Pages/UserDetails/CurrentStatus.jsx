"use client";
import { Database } from "lucide-react";

function CurrentStatus({ currentStatus }) {
  // Fallback for empty or undefined currentStatus
  if (!currentStatus || currentStatus.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
          <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg mr-3 border border-purple-500/30">
            <Database className="w-5 h-5 text-purple-400" />
          </div>
          Current Status
        </h3>
        <p className="text-gray-400 text-sm">No status available</p>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center">
        <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg mr-3 border border-purple-500/30">
          <Database className="w-5 h-5 text-purple-400" />
        </div>
        Current Status
      </h3>

      <div className="space-y-4 text-sm">
        {currentStatus.map((status) => (
          <div
            key={status._id}
            className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    status.color === "green"
                      ? "bg-green-400"
                      : status.color === "blue"
                      ? "bg-blue-400"
                      : status.color === "red"
                      ? "bg-red-400"
                      : status.color === "yellow"
                      ? "bg-yellow-400"
                      : status.color === "purple"
                      ? "bg-purple-400"
                      : status.color === "orange"
                      ? "bg-orange-400"
                      : "bg-gray-400"
                  } ${status.isActive ? "animate-ping opacity-75" : "animate-pulse"}`}
                ></div>
                {status.isActive && (
                  <div
                    className={`absolute w-3 h-3 rounded-full ${
                      status.color === "green"
                        ? "bg-green-400"
                        : status.color === "blue"
                        ? "bg-blue-400"
                        : status.color === "red"
                        ? "bg-red-400"
                        : status.color === "yellow"
                        ? "bg-yellow-400"
                        : status.color === "purple"
                        ? "bg-purple-400"
                        : status.color === "orange"
                        ? "bg-orange-400"
                        : "bg-gray-400"
                    }`}
                    style={{ left: "2px", top: "2px" }}
                  ></div>
                )}
              </div>
              <span className="text-gray-300 font-medium text-base">
                {status.status || "No status text"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentStatus;