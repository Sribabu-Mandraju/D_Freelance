'use client'

import { useState } from 'react'
import {
  MessageSquare,
  X,
  Send,
  Star as LucideStar,
  Paperclip,
  Image as LucideImage,
  Smile as LucideSmile
} from 'lucide-react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentView, setCurrentView] = useState('welcome') // 'welcome' | 'chat' | 'feedback'
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello AI, How can I help you?',
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const faqItems = [
    { icon: '🆓', text: 'Is there a free trial available?', color: 'text-blue-400' },
    { icon: '🔒', text: 'How is my data protected?', color: 'text-green-400' },
    { icon: '✨', text: "What's New?", color: 'text-yellow-400' }
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: 'QuizMaster is an innovative platform that helps teachers create, assign, and track quizzes for their students effortlessly. 🚀',
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleFaqClick = (question) => {
    setCurrentView('chat')
    const faqMessage = {
      id: Date.now().toString(),
      text: question,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, faqMessage])
  }

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', { rating, feedback })
    setCurrentView('welcome')
    setRating(0)
    setFeedback('')
  }

  const MessageIcon = ({ size = 20 }) => (
    <MessageSquare size={size} />
  )

  const XIcon = ({ size = 18 }) => (
    <X size={size} />
  )

  const SendIcon = ({ size = 16 }) => (
    <Send size={size} />
  )

  const StarIcon = ({ filled }) => (
    <LucideStar size={20} fill={filled ? 'currentColor' : 'none'} />
  )

  const PaperclipIcon = ({ size = 14 }) => (
    <Paperclip size={size} />
  )

  const ImageIcon = ({ size = 14 }) => (
    <LucideImage size={size} />
  )

  const SmileIcon = ({ size = 14 }) => (
    <LucideSmile size={size} />
  )

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 md:right-6 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 border-2 border-purple-400/30 flex items-center justify-center"
          style={{
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.4), 0 0 40px rgba(147, 51, 234, 0.2)'
          }}
        >
          {isOpen ? (
            <XIcon />
          ) : (
            <MessageIcon />
          )}
        </button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 md:right-6 right-2 w-[300px] md:w-[380px] h-[430px] z-40">
          {/* outer: column layout, hidden overflow so only content area scrolls */}
          <div
            className="w-full h-full bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 shadow-2xl rounded-lg flex flex-col overflow-hidden"
            style={{
              boxShadow: '0 0 30px rgba(147, 51, 234, 0.3), 0 0 60px rgba(147, 51, 234, 0.1)'
            }}
          >
            {/* Header (fixed) */}
            <div className="sticky top-0 z-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <MessageIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">
                      {currentView === 'welcome' ? 'AI Chatbot' : 'AiFin'}
                    </h3>
                    <p className="text-xs text-purple-200">24*7 Support Bot</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 w-6 h-6 p-0 rounded transition-colors flex items-center justify-center"
                >
                  <XIcon />
                </button>
              </div>
            </div>

            {/* Main scrollable content — single scrollbar here */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
              {/* Welcome */}
              {currentView === 'welcome' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center"
                      style={{ boxShadow: '0 0 15px rgba(147, 51, 234, 0.5)' }}
                    >
                      <MessageIcon size={28} />
                    </div>
                    <p className="text-white text-sm mb-2">Our chatbot is here to assist you instantly</p>
                    <p className="text-gray-400 text-xs">Ask questions and get immediate responses</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-white text-sm font-medium">What do you want to know?</p>
                    <div className="space-y-2">
                      {faqItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleFaqClick(item.text)}
                          className="w-full text-left p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-700/50 hover:border-purple-500/30"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{item.icon}</span>
                            <span className={`text-sm ${item.color}`}>{item.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('chat')}
                    className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-between"
                    style={{ boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                  >
                    <div className="text-left">
                      <p className="text-sm font-medium">Talk with chatbot</p>
                      <p className="text-xs text-purple-200">The chatbot will respond immediately.</p>
                    </div>
                    <SendIcon />
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-500">Powered by <span className="text-purple-400 font-semibold">RASA</span></p>
                  </div>
                </div>
              )}

              {/* Chat */}
              {currentView === 'chat' && (
                <div className="space-y-3 pb-8">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.isBot 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      }`}>
                        {message.isBot && (
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-5 h-5 bg-gray-700 rounded flex items-center justify-center">
                              <MessageIcon size={14} />
                            </div>
                            <span className="text-xs text-gray-400">AI</span>
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Feedback */}
              {currentView === 'feedback' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-white text-sm font-semibold mb-2">Thanks for the feedback</h3>
                    <p className="text-gray-400 text-xs mb-4">Please share your feedback to help us improve our service.</p>
                    <p className="text-gray-400 text-xs mb-4">Please rate your experience below</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-center space-x-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="transition-colors"
                          >
                            <div className={`${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                              <StarIcon filled={star <= rating} />
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-center text-xs text-gray-400">4/5 stars</p>
                    </div>

                    <div>
                      <p className="text-white text-sm mb-2">Your feedback</p>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Add note ....."
                        className="w-full h-20 p-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentView('chat')}
                        className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded transition-colors"
                      >
                        Skip
                      </button>
                      <button
                        onClick={handleFeedbackSubmit}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded text-white transition-all duration-300"
                      >
                        Send Feedback
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer (always outside scroll area so it's visible) */}
            <div className="p-4 border-t border-gray-700 bg-gray-900">
              {currentView === 'chat' ? (
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask anything..."
                        className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 pr-20 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                        <button className="w-6 h-6 p-0 text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                          <PaperclipIcon />
                        </button>
                        <button className="w-6 h-6 p-0 text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                          <ImageIcon />
                        </button>
                        <button className="w-6 h-6 p-0 text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                          <SmileIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => setCurrentView('feedback')}
                      className="text-gray-400 hover:text-white text-xs transition-colors"
                    >
                      Give Feedback
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-3 py-1 rounded text-white text-sm transition-all duration-300 flex items-center gap-1"
                    >
                      <SendIcon />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
