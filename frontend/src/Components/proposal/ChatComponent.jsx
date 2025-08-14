import React, { useState, useEffect, useRef } from "react";
import { Send, Image as ImageIcon } from "lucide-react";

const ChatComponent = ({ currentUser, recipient, proposalId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // Mock messages for demonstration
  const mockMessages = [
    { senderId: "0x9c...784bB5", text: "Hello! Thanks for accepting the bid.", timestamp: new Date() },
    { senderId: "0xabc...123def", text: "Hi! I'm excited to get started. Can we discuss the project timeline?", timestamp: new Date() },
    { senderId: "0x9c...784bB5", text: "Sure, let's talk about the key milestones.", timestamp: new Date() },
  ];

  useEffect(() => {
    // In a real application, you would fetch chat messages from the backend here
    // For now, we are just using mock data
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat window on new message
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // In a real application, you would send the new message to the backend
    const messageToSend = {
      senderId: currentUser.userWallet,
      text: newMessage,
      timestamp: new Date(),
    };

    // Add the new message to the local state
    setMessages([...messages, messageToSend]);
    setNewMessage("");
  };

  const getSenderName = (senderId) => {
    // This is a simple helper function for mock data
    // In a real application, you would get the user's name from a state or context
    if (senderId === currentUser.userWallet) {
      return currentUser.username;
    }
    // This is a simplified approach, assuming the recipient is the other person in the chat
    return recipient.username; 
  };
  
  const getAvatar = (senderId) => {
    const name = getSenderName(senderId);
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20 transition-all duration-300 flex flex-col min-h-[100vh]">
      <div className="flex items-center gap-4 border-b border-gray-700/50 pb-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-xl">
            {getAvatar(recipient.userWallet)}
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white">
            Chat with {recipient.username || "Client"}
          </h3>
          <p className="text-gray-400 text-sm">Proposal: {proposalId}</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === currentUser.userWallet ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl text-white ${
                msg.senderId === currentUser.userWallet
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 rounded-br-none"
                  : "bg-gray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className={`text-xs ${msg.senderId === currentUser.userWallet ? "text-white/70" : "text-gray-400"} block mt-1 text-right`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-full bg-gray-900/50 text-white placeholder-gray-400 border border-gray-700/50 focus:outline-none focus:border-cyan-500/50 transition-colors duration-200"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
