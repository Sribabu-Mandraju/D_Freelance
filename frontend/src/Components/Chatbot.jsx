"use client"

import { useState, Component, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { MessageSquare, X, Send, LucideStar, Paperclip, LucideImage, LucideSmile, Bot, Sparkles } from "lucide-react"

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          <p className="font-semibold">Something went wrong</p>
          <p className="text-xs mt-1">Please try refreshing the chat</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentView, setCurrentView] = useState("welcome")
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "👋 **Hello!** I'm your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  const faqItems = [
    { icon: "🌟", text: "What are the premium features?" },
    { icon: "🔐", text: "How secure is my data?" },
    { icon: "⚡", text: "What's new in the latest update?" },
    { icon: "🎮", text: "How do I get started?" },
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.text }),
      })

      if (!response.ok) throw new Error("Failed to fetch bot response")

      const data = await response.json()
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I couldn't process that request.",
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error fetching bot response:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "⚠️ **Connection Error:** Unable to reach the server. Please try again.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFaqClick = (question) => {
    setCurrentView("chat")
    const faqMessage = {
      id: Date.now().toString(),
      text: question,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, faqMessage])
    handleSendMessage()
  }

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", { rating, feedback })
    setCurrentView("welcome")
    setRating(0)
    setFeedback("")
  }

  const MessageIcon = ({ size = 20 }) => <MessageSquare size={size} />
  const XIcon = ({ size = 18 }) => <X size={size} />
  const SendIcon = ({ size = 16 }) => <Send size={size} />
  const StarIcon = ({ filled }) => <LucideStar size={20} fill={filled ? "currentColor" : "none"} />
  const PaperclipIcon = ({ size = 14 }) => <Paperclip size={size} />
  const ImageIcon = ({ size = 14 }) => <LucideImage size={size} />
  const SmileIcon = ({ size = 14 }) => <LucideSmile size={size} />

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
        >
          {isOpen ? <XIcon size={20} /> : <MessageIcon size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-96 md:h-[600px] z-40">
          <div className="w-full h-full bg-gray-900 border border-gray-700 shadow-2xl md:rounded-xl flex flex-col overflow-hidden">
            <div className="bg-gray-800 border-b border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Bot size={16} className="text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 text-sm">
                      {currentView === "welcome" ? "AI Assistant" : "Chat"}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-xs text-gray-400">Online</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-200 hover:bg-gray-700 w-8 h-8 rounded-lg transition-colors flex items-center justify-center"
                >
                  <XIcon size={16} />
                </button>
              </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentView === "welcome" && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-800 rounded-xl mx-auto flex items-center justify-center">
                      <Sparkles size={24} className="text-gray-300" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-100 mb-2">Welcome! How can I help?</h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        I'm here to assist you with any questions or tasks you might have
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm font-medium">Quick questions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {faqItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleFaqClick(item.text)}
                          className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-gray-300 text-sm">{item.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView("chat")}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-between"
                  >
                    <div className="text-left">
                      <p className="font-medium text-sm">Start Conversation</p>
                      <p className="text-xs text-gray-300">Ask me anything</p>
                    </div>
                    <SendIcon size={16} />
                  </button>
                </div>
              )}

              {currentView === "chat" && (
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <ErrorBoundary key={message.id}>
                      <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                        <div
                          className={`max-w-[85%] p-3 rounded-lg ${
                            message.isBot ? "bg-gray-800 text-gray-200" : "bg-gray-700 text-white"
                          }`}
                        >
                          {message.isBot && (
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-5 h-5 bg-gray-700 rounded flex items-center justify-center">
                                <Bot size={10} className="text-gray-300" />
                              </div>
                              <span className="text-xs text-gray-400 font-medium">Assistant</span>
                            </div>
                          )}
                          <div className="text-sm leading-relaxed">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{message.text}</ReactMarkdown>
                          </div>
                          <p className="text-xs opacity-70 mt-2 text-right">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </ErrorBoundary>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-xs p-3 rounded-lg bg-gray-800 text-gray-200">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentView === "feedback" && (
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg mx-auto flex items-center justify-center">
                      <LucideStar size={20} className="text-yellow-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100">Rate Your Experience</h3>
                    <p className="text-gray-400 text-sm">Help us improve our service</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-center space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="transition-all duration-200 hover:scale-110"
                          >
                            <div className={`${star <= rating ? "text-yellow-500" : "text-gray-600"}`}>
                              <StarIcon filled={star <= rating} />
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-center text-sm text-gray-400">{rating}/5 stars</p>
                    </div>

                    <div>
                      <p className="text-gray-300 text-sm mb-3 font-medium">Your Feedback</p>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Tell us about your experience..."
                        className="w-full h-20 p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setCurrentView("chat")}
                        className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        Skip
                      </button>
                      <button
                        onClick={handleFeedbackSubmit}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition-colors text-sm"
                      >
                        Send Feedback
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {currentView === "chat" && (
              <div className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full bg-gray-900 border border-gray-600 text-gray-200 placeholder-gray-500 pr-20 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        disabled={isLoading}
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                        <button className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center rounded">
                          <PaperclipIcon size={12} />
                        </button>
                        <button className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center rounded">
                          <ImageIcon size={12} />
                        </button>
                        <button className="w-6 h-6 text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center rounded">
                          <SmileIcon size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setCurrentView("feedback")}
                      className="text-gray-400 hover:text-gray-200 text-xs transition-colors font-medium"
                    >
                      ⭐ Rate Experience
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm transition-colors flex items-center gap-2 font-medium"
                      disabled={isLoading}
                    >
                      <SendIcon size={14} />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
