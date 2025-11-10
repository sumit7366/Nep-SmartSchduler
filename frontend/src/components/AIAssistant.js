import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your NEP SmartScheduler AI assistant. I can help you generate timetables, manage resources, and ensure NEP 2020 compliance. How can I assist you today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/api/ai/assistant', {
        message: inputMessage,
        context: { role: 'administrator' }
      });

      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.data.message,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error('Failed to send message');
      console.error('AI Assistant error:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      label: "Generate Timetable",
      prompt: "How do I generate a new timetable with NEP compliance?"
    },
    {
      label: "Teacher Allocation",
      prompt: "How does teacher allocation work in the system?"
    },
    {
      label: "NEP Guidelines",
      prompt: "What are the key NEP 2020 guidelines for timetable planning?"
    },
    {
      label: "Conflict Resolution",
      prompt: "How does the system handle scheduling conflicts?"
    }
  ];

  const handleQuickAction = (prompt) => {
    setInputMessage(prompt);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
        <div className="flex items-center space-x-2 bg-primary-50 text-primary-700 px-3 py-2 rounded-lg">
          <i className="fas fa-robot"></i>
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-white"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    NEP Scheduling Assistant
                  </h3>
                  <p className="text-sm text-gray-600">
                    Powered by AI • Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.text}</div>
                    <div
                      className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-primary-200' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={sendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about timetables, NEP guidelines, or scheduling..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                >
                  <i className="fas fa-paper-plane"></i>
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {action.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Click to ask about {action.label.toLowerCase()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">
              NEP 2020 Features
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <i className="fas fa-check-circle"></i>
                <span>Skill-based learning</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-check-circle"></i>
                <span>Multidisciplinary approach</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-check-circle"></i>
                <span>Flexible curriculum</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-check-circle"></i>
                <span>Digital integration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;