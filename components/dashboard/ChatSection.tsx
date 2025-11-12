'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
}

const ChatSection = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load initial messages on the client side only
    setMessages([
      {
        id: '1',
        user: 'John Doe',
        content: 'Hello everyone! Anyone up for study group?',
        timestamp: new Date(),
      },
      {
        id: '2',
        user: 'Jane Smith',
        content: "I'm interested! What subject are you studying?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        user: 'You', // Will be replaced with actual Clerk user later
        content: message,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-gray-200 border-l border-yellow-500/10">
      {/* Chat Header */}
      <div className="p-3 md:p-4 border-b border-yellow-500/20 bg-gray-900 flex items-center justify-between">
        <h2 className="text-base md:text-lg font-bold text-yellow-400 tracking-wide">
          General Chat
        </h2>
        <span className="text-xs text-gray-400 italic">Active now</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-5 scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            <div className="flex items-baseline space-x-2">
              <span className="font-semibold text-yellow-400">{msg.user}</span>
              <span className="text-xs text-gray-500">
                {msg.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </span>
            </div>
            <p className="mt-1 text-gray-300 bg-gray-800 rounded-lg px-4 py-2 w-fit max-w-[80%] shadow-md border border-yellow-500/10">
              {msg.content}
            </p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 md:p-4 border-t border-yellow-500/20 bg-gray-900"
      >
        <div className="flex space-x-2 md:space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-yellow-500/30 bg-black text-gray-200 px-3 md:px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black rounded-lg px-3 md:px-4 py-2 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition shadow-md"
          >
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSection;
