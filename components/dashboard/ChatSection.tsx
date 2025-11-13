'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Pencil, Trash2, X, Check } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  user_id: string;
  user_name: string;
  user_email?: string;
  avatar_url?: string;
  content: string;
  created_at: string;
}

const ChatSection = () => {
  const { isSignedIn, user } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial messages and subscribe to real-time updates
  useEffect(() => {
    loadMessages();
    
    // Subscribe to all changes (INSERT, UPDATE, DELETE)
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { 
          event: '*',  // Listen to all events
          schema: 'public', 
          table: 'messages' 
        },
        (payload) => {
          console.log('Realtime event:', payload);
          
          if (payload.eventType === 'INSERT') {
            setMessages((current) => {
              // Avoid duplicates
              if (current.some(msg => msg.id === payload.new.id)) {
                return current;
              }
              return [...current, payload.new as Message];
            });
          } else if (payload.eventType === 'UPDATE') {
            setMessages((current) =>
              current.map((msg) =>
                msg.id === payload.new.id ? (payload.new as Message) : msg
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setMessages((current) =>
              current.filter((msg) => msg.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !isSignedIn || !user) return;

    const name = user?.fullName || user?.firstName || user?.username || 'Anonymous';
    const email = user?.primaryEmailAddress?.emailAddress;
    const avatar = user?.imageUrl;

    const messageContent = message.trim();
    setMessage(''); // Clear input immediately

    try {
      const { data, error } = await supabase.from('messages').insert({
        user_id: user.id,
        user_name: name,
        user_email: email,
        avatar_url: avatar,
        content: messageContent,
      }).select();

      if (error) throw error;
      
      // Optimistically add to local state
      if (data && data[0]) {
        setMessages((current) => {
          // Check if already exists (from real-time subscription)
          if (current.some(msg => msg.id === data[0].id)) {
            return current;
          }
          return [...current, data[0] as Message];
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setMessage(messageContent); // Restore message on error
    }
  };

  const handleEditMessage = async (id: string) => {
    if (!editContent.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .update({ content: editContent.trim() })
        .eq('id', id);

      if (error) throw error;
      setEditingId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error editing message:', error);
      alert('Failed to edit message. Please try again.');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message. Please try again.');
    }
  };

  const startEdit = (msg: Message) => {
    setEditingId(msg.id);
    setEditContent(msg.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-yellow-400">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black text-gray-200 border-l border-yellow-500/10">
      {/* Chat Header */}
      <div className="p-4 border-b border-yellow-500/20 bg-gray-900 flex items-center justify-between">
        <h2 className="text-lg font-bold text-yellow-400 tracking-wide">
          General Chat
        </h2>
        <span className="text-xs text-gray-400 italic">
          {messages.length} messages
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              {/* Avatar */}
              {msg.avatar_url ? (
                <img
                  src={msg.avatar_url}
                  alt={msg.user_name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-black font-semibold shrink-0">
                  {msg.user_name.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Message content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between flex-wrap">
                  <div className="flex items-baseline space-x-3">
                    <span className="font-semibold text-yellow-400">
                      {msg.user_name}
                    </span>
                    {msg.user_email && (
                      <span className="text-xs text-gray-400">{msg.user_email}</span>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(msg.created_at).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </span>
                  </div>
                  
                  {/* Edit/Delete buttons - only show for own messages */}
                  {user?.id === msg.user_id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEdit(msg)}
                        className="text-gray-400 hover:text-yellow-400 transition p-1"
                        title="Edit message"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-gray-400 hover:text-red-400 transition p-1"
                        title="Delete message"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Message content or edit form */}
                {editingId === msg.id ? (
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 rounded-lg border border-yellow-500/30 bg-gray-900 text-gray-200 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditMessage(msg.id)}
                      className="text-green-400 hover:text-green-300 p-1"
                      title="Save"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Cancel"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <p className="mt-1 text-gray-300 bg-gray-800 rounded-lg px-4 py-2 shadow-md border border-yellow-500/10 wrap-break-word">
                    {msg.content}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-yellow-500/20 bg-gray-900"
      >
        <div className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isSignedIn ? 'Type your message...' : 'Sign in to chat...'}
            disabled={!isSignedIn}
            className="flex-1 rounded-lg border border-yellow-500/30 bg-black text-gray-200 px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!isSignedIn || !message.trim()}
            className="bg-yellow-400 text-black rounded-lg px-4 py-2 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSection;
