import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../../store/ChatApplicationSlice/ChatAppSlice";

const ChatHeader = () => {
  const { selectedUser } = useSelector((state)=>state.chatApp);
  const { onlineUsers } = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  return (
    <div className="p-4 border-b border-cyan-400/30 bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Enhanced Avatar */}
          <div className="relative">
            <div className="size-12 rounded-full border-2 border-cyan-400/40 overflow-hidden shadow-lg">
              <img 
                src={selectedUser.profile || "/avatar.png"} 
                alt={selectedUser.fullname}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator */}
            {Array.isArray(onlineUsers) && onlineUsers.includes((selectedUser._id || selectedUser.address || "").toLowerCase()) && (
              <div className="absolute -bottom-1 -right-1">
                <div className="size-4 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
                <div className="absolute inset-0 size-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
            )}
          </div>

          {/* Enhanced User info */}
          <div>
            <h3 className="font-semibold text-lg text-white">{selectedUser.fullname}</h3>
            <div className={`text-sm flex items-center gap-2 ${
              Array.isArray(onlineUsers) && onlineUsers.includes((selectedUser._id || selectedUser.address || "").toLowerCase()) 
                ? "text-green-400" 
                : "text-slate-400"
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                Array.isArray(onlineUsers) && onlineUsers.includes((selectedUser._id || selectedUser.address || "").toLowerCase())
                  ? "bg-green-400 animate-pulse"
                  : "bg-slate-500"
              }`}></div>
              {Array.isArray(onlineUsers) && onlineUsers.includes((selectedUser._id || selectedUser.address || "").toLowerCase()) ? "Online" : "Offline"}
            </div>
          </div>
        </div>

        {/* Enhanced Close button */}
        <button 
          onClick={() => dispatch(setSelectedUser(null))} 
          className="p-2 rounded-full bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all duration-300 group"
        >
          <X className="size-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;