// Chatbot API Configuration
export const CHATBOT_CONFIG = {
  // Development environment
  development: {
    apiUrl: "http://localhost:5000/chat",
    timeout: 10000, // 10 seconds
  },
  // Production environment
  production: {
    apiUrl: "https://your-domain.com/chat", // Update with your actual domain
    timeout: 15000, // 15 seconds
  },
};

// Get current environment configuration
export const getChatbotConfig = () => {
  const env = process.env.NODE_ENV || "development";
  return CHATBOT_CONFIG[env] || CHATBOT_CONFIG.development;
};

// API endpoints
export const CHATBOT_ENDPOINTS = {
  chat: "/chat",
  health: "/health", // Optional: add health check endpoint
};
