"use client"

import { useState } from "react"
import { Database, Edit, Save, X, Plus, Trash2, Loader2 } from "lucide-react"

function CurrentStatus({ currentStatus = [], setCurrentStatus }) {
  const [isEditingStatus, setIsEditingStatus] = useState(false)
  const [editStatus, setEditStatus] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

  // Static portfolio ID
  const portfolioId = "689d21754780b3f30cf4130b"

  const handleEditStatus = () => {
    setIsEditingStatus(true)
    setEditStatus(currentStatus.map((s) => ({ ...s })))
    setSaveError(null)
  }

  const handleSaveStatus = async () => {
    setIsSaving(true)
    setSaveError(null)

    try {
      const statusObjects = editStatus.map((item) => ({
        status: item.status,
        color: item.color,
        isActive: item.isActive,
      }))

      const response = await fetch(`http://localhost:3001/api/portfolio/${portfolioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentStatus: statusObjects }),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update current status")
      }

      setCurrentStatus(
        result.data.currentStatus.map((item, index) => ({
          ...item,
          _id: editStatus[index]._id || Date.now().toString() + index,
        })),
      )
      setIsEditingStatus(false)
      console.log("Updated current status:", result.data.currentStatus)
    } catch (error) {
      console.error("Error updating current status:", error.message)
      setSaveError("Failed to save changes: " + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelStatus = () => {
    setEditStatus(currentStatus.map((s) => ({ ...s })))
    setIsEditingStatus(false)
    setSaveError(null)
  }

  const updateStatus = (id, field, value) => {
    setEditStatus((prev) => prev.map((status) => (status._id === id ? { ...status, [field]: value } : status)))
  }

  const addNewStatus = () => {
    if (editStatus.length >= 3) {
      setSaveError("Maximum 3 status items allowed")
      return
    }

    const newStatus = {
      _id: Date.now().toString(),
      status: "",
      color: "blue",
      isActive: true,
    }
    setEditStatus([...editStatus, newStatus])
  }

  const removeStatus = (id) => {
    setEditStatus((prev) => prev.filter((status) => status._id !== id))
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

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
            className="p-2 bg-gray-900/50 border border-purple-500/50 hover:border-purple-400 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4 text-purple-400" />
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={addNewStatus}
              disabled={isSaving || editStatus.length >= 3}
              className={`p-2 bg-gray-900/50 border rounded-lg transition-all disabled:opacity-50 ${
                editStatus.length >= 3
                  ? "border-gray-500/50 cursor-not-allowed"
                  : "border-blue-500/50 hover:border-blue-400"
              }`}
              title={editStatus.length >= 3 ? "Maximum 3 status items allowed" : "Add new status"}
            >
              <Plus className={`w-3 h-3 sm:w-2.5 sm:h-2.5 ${editStatus.length >= 3 ? "text-gray-500" : "text-blue-400"}`} />
            </button>
            <button
              onClick={handleSaveStatus}
              disabled={isSaving}
              className="p-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-green-400 animate-spin" />
              ) : (
                <Save className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-green-400" />
              )}
            </button>
            <button
              onClick={handleCancelStatus}
              disabled={isSaving}
              className="p-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all disabled:opacity-50"
            >
              <X className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-red-400" />
            </button>
          </div>
        )}
      </div>

      {saveError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{saveError}</p>
        </div>
      )}

      <div className="space-y-4 text-sm">
        {(isEditingStatus ? editStatus : currentStatus).map((status) => (
          <div key={status._id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 relative">
            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-col items-start gap-3">
                {/* Color indicator at the top */}
                <div className="relative flex justify-start">
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
                      className={`absolute inset-0 w-4 h-4 rounded-full ${
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
                    ></div>
                  )}
                </div>

                {/* Status text positioned directly below the color dot */}
                <div className="w-full">
                  {isEditingStatus ? (
                    <input
                      type="text"
                      value={status.status}
                      onChange={(e) => updateStatus(status._id, "status", e.target.value)}
                      disabled={isSaving}
                      className="text-gray-300 font-medium bg-transparent border-none focus:outline-none text-base w-full"
                    />
                  ) : (
                    <span className="text-gray-300 font-medium text-base block">{status.status}</span>
                  )}
                </div>
              </div>

              {/* Delete button on the right side */}
              {isEditingStatus && (
                <button
                  onClick={() => removeStatus(status._id)}
                  disabled={isSaving}
                  className="p-2 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              )}
            </div>

            {isEditingStatus && (
              <div className="flex flex-col items-start gap-4 mt-4 pt-3 border-t border-gray-700/50">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Color:</span>
                  <select
                    value={status.color}
                    onChange={(e) => updateStatus(status._id, "color", e.target.value)}
                    disabled={isSaving}
                    className="bg-gray-800 text-gray-300 border border-gray-600 rounded px-3 py-1 text-sm min-w-[100px] capitalize"
                  >
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Status:</span>
                  <button
                    onClick={() => updateStatus(status._id, "isActive", !status.isActive)}
                    disabled={isSaving}
                    className={`px-3 py-1 text-sm rounded border transition-colors ${
                      status.isActive
                        ? "bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
                        : "bg-gray-500/20 border-gray-500/50 text-gray-400 hover:bg-gray-500/30"
                    }`}
                  >
                    {status.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CurrentStatus