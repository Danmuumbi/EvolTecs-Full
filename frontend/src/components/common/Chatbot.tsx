import { useState, useEffect, useRef } from 'react';
import { 
  FiMessageCircle, 
  FiX, 
  FiSend, 
  FiMinimize2,
  FiMaximize2,
  FiUser,
  FiBox,
  FiLoader,
  FiAlertCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext/useAuth';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  messages: Message[];
  sessionId: string;
  lastUpdated: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(
    () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // System prompt - customize this for your business
  const SYSTEM_PROMPT = `You are EvolTech AI, a helpful support assistant for EvolTech Digital Platform.

About EvolTech:
- EvolTech is a digital solutions platform offering domain registration, web hosting, business email, cloud solutions, and custom software development.
- Services include: Domain Registration (from KSH 800/year), Web Hosting (from KSH 500/month), Business Email (from KSH 300/month), Cloud Solutions, and Software Development.
- Payment is accepted via M-Pesa (Paybill: 174379).
- Support is available 24/7.

Your role:
- Be friendly, professional, and helpful.
- Provide accurate information about EvolTech's services.
- If you don't know something, offer to connect the user with a human support agent.
- Keep responses concise but thorough.
- Use a warm, conversational tone.

Current user: ${user ? `${user.firstName} ${user.lastName}` : 'Guest'} (${user?.email || 'Not logged in'})

Remember: You are an AI assistant, not a human. Be transparent about that.`;

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatbot_history');
    if (savedHistory) {
      try {
        const history: ChatHistory = JSON.parse(savedHistory);
        // Only load if session is still valid (within 24 hours)
        const lastUpdated = new Date(history.lastUpdated);
        const now = new Date();
        const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setMessages(history.messages);
          setSessionId(history.sessionId);
        } else {
          // Clear old session
          localStorage.removeItem('chatbot_history');
        }
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const history: ChatHistory = {
        messages,
        sessionId,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem('chatbot_history', JSON.stringify(history));
    }
  }, [messages, sessionId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Build conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call Groq API directly
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory,
            { role: 'user', content: input.trim() },
          ],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 0.9,
        }),
      });

      const data = await response.json();

      if (response.ok && data.choices && data.choices.length > 0) {
        const assistantMessage: Message = {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: data.choices[0].message.content,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Check if response indicates need for human support
        const needsHuman = data.choices[0].message.content.toLowerCase().includes('human') ||
                          data.choices[0].message.content.toLowerCase().includes('support agent') ||
                          data.choices[0].message.content.toLowerCase().includes('escalate');

        if (needsHuman && user) {
          await notifyAdmin(userMessage.content);
        }
      } else {
        throw new Error(data.error?.message || 'Failed to get response from AI');
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setError('Sorry, I\'m having trouble connecting. Please try again or contact our support team.');
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting to my AI service. Please try again in a moment or contact our support team directly at support@evoltech.com.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const notifyAdmin = async (question: string) => {
    try {
      await fetch('/api/support/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user?.email,
          userName: user ? `${user.firstName} ${user.lastName}` : 'Guest',
          question: question,
          conversationId: sessionId,
        }),
      });
    } catch (error) {
      console.error('Failed to notify admin:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatbot_history');
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    setError(null);
  };

  const quickSuggestions = [
    'How do I register a domain?',
    'What hosting plans do you offer?',
    'How to renew my domain?',
    'How do I pay with M-Pesa?',
    'What is EvolTech?',
  ];

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 group"
      >
        <FiMessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0a] animate-pulse"></span>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={`fixed z-50 ${
            isMinimized 
              ? 'bottom-6 right-6 w-80' 
              : 'bottom-6 right-6 w-[400px] h-[600px]'
          } glass-effect rounded-2xl border border-white/10 shadow-2xl shadow-primary-500/20 flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-gradient-to-r from-primary-900/50 to-accent-900/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center animate-pulse-slow">
                <FiBox className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">EvolTech AI</h3>
                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                  Online • 24/7 Support
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <FiMaximize2 className="w-4 h-4" /> : <FiMinimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                title="Close chat"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-4">
                      <FiBox className="w-8 h-8 text-accent-400" />
                    </div>
                    <h3 className="text-white font-medium text-lg">Hello! 👋</h3>
                    <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
                      I'm EvolTech AI. Ask me anything about our services, domains, hosting, or support.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {quickSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setInput(suggestion)}
                          className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-primary-500 to-accent-500'
                            : 'bg-white/10'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <FiUser className="w-4 h-4 text-white" />
                        ) : (
                          <FiBox className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-xl p-3 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white'
                            : 'bg-white/5 text-gray-300 border border-white/5'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        <span className="text-[10px] opacity-40 mt-1.5 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <FiBox className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center gap-2">
                        <FiLoader className="w-4 h-4 text-accent-400 animate-spin" />
                        <span className="text-sm text-gray-400">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <FiAlertCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/20 max-w-[80%]">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/5 bg-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="p-2.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-white hover:shadow-lg hover:shadow-primary-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  >
                    <FiSend className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={clearChat}
                    className="text-xs text-gray-500 hover:text-gray-400 transition-colors hover:underline"
                  >
                    Clear chat
                  </button>
                  <span className="text-[10px] text-gray-600">
                    {messages.length} messages
                  </span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};