"use client";

import { useDispatch, useSelector } from "react-redux";
import { Database, Edit, Save, X, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  toggleEditingStatus,
  updateCurrentStatus,
  addNewStatus,
  removeStatus,
  saveCurrentStatus,
  setIsSaving,
  updatePortfolio,
} from "../../store/portfolioSlice/portfolioSlice"; // Adjust path

function CurrentStatus({ portfolioId }) {
  const dispatch = useDispatch();
  const { isEditingStatus, portfolioData, editStatus, isSaving, loading } = useSelector(
    (state) => state.portfolio
  );
  const currentStatus = portfolioData?.currentStatus || [];

  const validateStatus = () => {
    const errors = [];
    if (editStatus.length > 3) {
      errors.push("Maximum 3 status items allowed");
    }
    if (editStatus.some((item) => (item.status || "").length > 50)) {
      errors.push("Each status cannot exceed 50 characters");
    }
    if (editStatus.some((item) => (item.status || "").trim() === "")) {
      errors.push("Status cannot be empty");
    }

    if (errors.length > 0) {
      toast.error(errors.join("; "), { duration: 5000 });
      return false;
    }
    return true;
  };

  const handleSaveStatus = async () => {
    if (!validateStatus()) {
      dispatch(setIsSaving(false));
      return;
    }

    const toastId = toast.loading("Saving current status...");
    dispatch(setIsSaving(true));

    try {
      const statusObjects = editStatus.map((item) => ({
        status: item.status,
        color: item.color,
        isActive: item.isActive,
      }));

      const action = await dispatch(
        updatePortfolio({ portfolioId, data: { currentStatus: statusObjects } })
      );
      if (updatePortfolio.fulfilled.match(action)) {
        dispatch(saveCurrentStatus());
        toast.success("Current status updated successfully!", { id: toastId });
      }
    } catch (error) {
      toast.error(`Failed to save changes: ${error.message}`, { id: toastId });
    } finally {
      dispatch(setIsSaving(false));
    }
  };

  const handleCancelStatus = () => {
    dispatch(toggleEditingStatus());
    toast.dismiss(); // Dismiss all active toasts
  };

  const updateStatus = (index, field, value) => {
    dispatch(updateCurrentStatus({ index, field, value }));
  };

  const handleEditStatus = () => {
    dispatch(toggleEditingStatus());
  };

  // Prevent rendering if loading or data is not ready
  if (loading) return <div className="p-4 text-cyan-300">Loading current status...</div>;
  if (!currentStatus && !isEditingStatus) return <div className="p-4 text-gray-400">No status available.</div>;

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

      <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
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
              onClick={() => dispatch(addNewStatus())}
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

      <div className="space-y-4 text-sm">
        {(isEditingStatus ? editStatus : currentStatus || []).map((status, index) => (
          <div key={status._id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
            <div className="flex items-center justify-between gap-3">
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
                {isEditingStatus ? (
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={status.status || ""}
                      onChange={(e) => updateStatus(index, "status", e.target.value)}
                      disabled={isSaving}
                      className={`text-gray-300 font-medium bg-transparent border-none focus:outline-none text-base w-full ${
                        (status.status || "").length > 50 ? "text-red-400" : ""
                      }`}
                      placeholder="Enter status (max 50 chars)"
                    />
                    <span
                      className={`text-xs mt-1 ${
                        (status.status || "").length > 50 ? "text-red-400" : "text-gray-500"
                      }`}
                    >
                      {(status.status || "").length}/50
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-300 font-medium text-base">
                    {status.status || "No status text"}
                  </span>
                )}
              </div>
              {isEditingStatus && (
                <button
                  onClick={() => dispatch(removeStatus({ id: status._id }))}
                  disabled={isSaving}
                  className="p-2 bg-red-500/20 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              )}
            </div>

            {isEditingStatus && (
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-700/50">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Color:</span>
                  <select
                    value={status.color}
                    onChange={(e) => updateStatus(index, "color", e.target.value)}
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
                    onClick={() => updateStatus(index, "isActive", !status.isActive)}
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
  );
}

export default CurrentStatus;