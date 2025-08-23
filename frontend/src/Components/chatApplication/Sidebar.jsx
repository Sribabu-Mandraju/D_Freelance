import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import SidebarSkeleton from "./skeletons/MessageSkeleton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getUsers,
  setSelectedUser,
} from "../../store/ChatApplicationSlice/ChatAppSlice";

const Sidebar = () => {
  const { users, selectedUser, isUsersLoading } = useSelector(
    (state) => state.chatApp
  );
  const { onlineUsers } = useSelector((state) => state.auth);
  console.log("Sidebar - onlineUsers from Redux:", onlineUsers);
  console.log("Sidebar - users from chatAppSlice:", users);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Filter users based on online status
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => {
        const userId = String(user._id || "").toLowerCase();
        return (
          Array.isArray(onlineUsers) &&
          onlineUsers.some(
            (onlineId) => String(onlineId).toLowerCase() === userId
          )
        );
      })
    : users;

  // Check if a user is online
  const isUserOnline = (user) => {
    const userId = String(user._id || "").toLowerCase();
    return (
      Array.isArray(onlineUsers) &&
      onlineUsers.some((onlineId) => String(onlineId).toLowerCase() === userId)
    );
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full lg:w-80 bg-slate-900/60 backdrop-blur-sm border-r border-cyan-400/30 flex flex-col transition-all duration-300 shadow-lg">
      {/* Header with neon glow */}
      <div className="border-b border-cyan-400/30 w-full p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-400/20 rounded-lg">
            <Users className="size-6 text-cyan-400" />
          </div>
          <span className="font-semibold text-xl hidden lg:block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Contacts
          </span>
        </div>

        {/* Enhanced online filter toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-3 group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  showOnlineOnly
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                    : "bg-slate-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 mt-0.5 ${
                    showOnlineOnly ? "translate-x-6" : "translate-x-0.5"
                  }`}
                ></div>
              </div>
            </div>
            <span className="text-sm text-slate-300 group-hover:text-cyan-400 transition-colors">
              Online only
            </span>
          </label>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400">
              {onlineUsers?.length || 0} online
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2 px-4 scrollbar-thin scrollbar-thumb-cyan-400/20 scrollbar-track-transparent">
        {filteredUsers.map((user) => {
          const isOnline = isUserOnline(user);
          return (
            <button
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={`
                w-full p-4 mb-2 flex items-center gap-4 rounded-xl transition-all duration-300 group
                hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-purple-400/10 hover:shadow-lg hover:shadow-cyan-400/20
                ${
                  selectedUser?._id === user._id
                    ? "bg-gradient-to-r from-cyan-400/20 to-purple-400/20 shadow-lg shadow-cyan-400/30 border border-cyan-400/40"
                    : "hover:border hover:border-cyan-400/20"
                }
              `}
            >
              <div className="relative flex-shrink-0">
                <div className="relative">
                  <img
                    src={user.profile || "/avatar.png"}
                    alt={user.fullname}
                    className="size-12 object-cover rounded-full border-2 border-slate-600 group-hover:border-cyan-400/50 transition-all duration-300"
                  />
                  {/* Enhanced online indicator */}
                  {isOnline && (
                    <div className="absolute -bottom-1 -right-1">
                      <div className="size-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                      <div className="absolute inset-0 size-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced user info */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-semibold truncate text-white group-hover:text-cyan-300 transition-colors">
                  {user.fullname}
                </div>
                <div
                  className={`text-sm flex items-center gap-2 ${
                    isOnline ? "text-green-400" : "text-slate-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isOnline ? "bg-green-400" : "bg-slate-500"
                    }`}
                  ></div>
                  <span>{isOnline ? "Online" : "Offline"}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
