import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../../utils/MessageTime";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../store/ChatApplicationSlice/ChatAppSlice";

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector(
    (state) => state.chatApp
  );
  const { user: authUser } = useSelector((state) => state.auth);
  console.log("ChatContainer - authUser:", authUser);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/40 backdrop-blur-sm">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-cyan-400/20 scrollbar-track-transparent">
        {authUser &&
          messages.map((message, index) => {
            const isOwnMessage = authUser && message.senderId === authUser._id;
            return (
              <div
                key={message._id}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                } animate-fadeIn`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                <div
                  className={`flex items-end gap-3 max-w-xs lg:max-w-md xl:max-w-lg ${
                    isOwnMessage ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="size-10 rounded-full border-2 border-cyan-400/30 overflow-hidden shadow-lg">
                      <img
                        src={
                          isOwnMessage
                            ? authUser.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="profile pic"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Message content */}
                  <div
                    className={`flex flex-col ${
                      isOwnMessage ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Timestamp */}
                    <div
                      className={`text-xs text-slate-400 mb-1 ${
                        isOwnMessage ? "mr-2" : "ml-2"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </div>

                    {/* Message bubble */}
                    <div
                      className={`relative px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border ${
                        isOwnMessage
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/30 text-white rounded-br-md"
                          : "bg-slate-800/60 border-slate-600/30 text-slate-100 rounded-bl-md"
                      }`}
                    >
                      {/* Neon glow effect for own messages */}
                      {isOwnMessage && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-2xl blur-sm -z-10"></div>
                      )}

                      {message.image && (
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="max-w-[200px] rounded-lg mb-2 border border-slate-600/30"
                        />
                      )}
                      {message.text && (
                        <p className="text-sm leading-relaxed break-words">
                          {message.text}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
