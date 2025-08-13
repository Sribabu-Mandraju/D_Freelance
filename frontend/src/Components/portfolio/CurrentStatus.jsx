import { useState } from 'react';
import { Database, Edit, Save, X, Plus, Trash2 } from 'lucide-react';

function CurrentStatus({ currentStatus, setCurrentStatus }) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(currentStatus);

  const handleEditStatus = () => {
    setIsEditingStatus(true);
    setEditStatus([...currentStatus]);
  };

  const handleSaveStatus = () => {
    setCurrentStatus(editStatus);
    setIsEditingStatus(false);
  };

  const handleCancelStatus = () => {
    setEditStatus([...currentStatus]);
    setIsEditingStatus(false);
  };

  const updateStatus = (id, field, value) => {
    setEditStatus(prev =>
      prev.map(status =>
        status.id === id ? { ...status, [field]: value } : status
      )
    );
  };

  const addNewStatus = () => {
    const newStatus = {
      id: Date.now(),
      text: "New status",
      color: "blue",
      active: false,
    };
    setEditStatus([...editStatus, newStatus]);
  };

  const removeStatus = (id) => {
    setEditStatus(prev => prev.filter(status => status.id !== id));
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

      {/* Section Header with Edit Button */}
      <div className="flex flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center">
          <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg mr-3 border border-purple-500/30">
            <Database className="w-5 h-5 text-purple-400" />
          </div>
          Current Status
        </h3>

        {!isEditingStatus ? (
          <button
            onClick={handleEditStatus}
            className="p-2 bg-gray-900/50 border border-purple-500/50 hover:border-purple-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(147,51,234,0.3)] group w-auto justify-center"
          >
            <Edit className="w-4 h-4 text-purple-400" />
          </button>
        ) : (
          <div className="flex items-end w-auto gap-1">
            <button
              onClick={addNewStatus}
              className="flex sm:flex-none p-2 bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group"
            >
              <Plus className="w-2 h-2 text-blue-400" />
            </button>
            <button
              onClick={handleSaveStatus}
              className="flex sm:flex-none p-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
            >
              <Save className="w-2 h-2 text-green-400" />
            </button>
            <button
              onClick={handleCancelStatus}
              className="flex sm:flex-none p-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
            >
              <X className="w-2 h-2 text-red-400" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3 text-sm">
        {(isEditingStatus ? editStatus : currentStatus).map((status) => (
          <div
            key={status.id}
            className={`flex items-center gap-3 p-3 bg-gradient-to-r from-${
              status.color
            }-500/10 to-${
              status.color === "green"
                ? "emerald"
                : status.color === "blue"
                ? "cyan"
                : "pink"
            }-500/10 rounded-lg border border-${
              status.color
            }-500/20 relative`}
          >
            <div className="relative">
              <div
                className={`w-3 h-3 bg-${status.color}-400 rounded-full ${
                  status.active
                    ? "animate-ping opacity-75"
                    : "animate-pulse"
                }`}
              ></div>
              {status.active && (
                <div
                  className={`absolute inset-0 w-3 h-3 bg-${status.color}-400 rounded-full`}
                ></div>
              )}
            </div>

            {isEditingStatus ? (
              <input
                type="text"
                value={status.text}
                onChange={(e) => updateStatus(status.id, "text", e.target.value)}
                className="text-gray-300 font-medium bg-transparent border-none w-full focus:outline-none flex-1"
              />
            ) : (
              <span className="text-gray-300 font-medium">
                {status.text}
              </span>
            )}
            {isEditingStatus && (
              <button
                onClick={() => removeStatus(status.id)}
                className="p-1 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors duration-300"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentStatus;
