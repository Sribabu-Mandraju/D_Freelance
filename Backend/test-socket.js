import { io } from "socket.io-client";

// Test socket connection
const socket = io("http://localhost:3001", {
  query: { userId: "test-user-123" },
});

socket.on("connect", () => {
  console.log("✅ Socket connected successfully!");
  console.log("Socket ID:", socket.id);
});

socket.on("getOnlineUsers", (users) => {
  console.log("📱 Online users received:", users);
});

socket.on("disconnect", () => {
  console.log("❌ Socket disconnected");
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error.message);
});

// Test sending a message
setTimeout(() => {
  if (socket.connected) {
    console.log("🧪 Testing message emission...");
    socket.emit("typing", {
      userId: "test-user-123",
      receiverId: "other-user-456",
      isTyping: true,
    });
  }
}, 2000);

// Cleanup after 10 seconds
setTimeout(() => {
  console.log("🧹 Cleaning up test...");
  socket.disconnect();
  process.exit(0);
}, 10000);
