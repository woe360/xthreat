'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, Send, Pin, X, PanelRight } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'system';
  timestamp: Date;
  file?: {
    name: string;
    size: number;
    type: string;
  };
}

interface SavedChat {
  id: string;
  name: string;
  messages: Message[];
  isPinned: boolean;
  lastMessage: string;
  timestamp: Date;
}

const MessageBubble = ({ message }: { message: Message }) => (
  <div className={`flex w-full mb-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`p-2 rounded-lg max-w-[70%] ${
        message.type === 'user'
          ? 'bg-gray-100 text-gray-800'
          : 'bg-[#181b24] text-gray-200'
      }`}
    >
      <div className="mb-1 break-words">
        {message.file ? (
          <div className="flex items-center gap-2">
            <Paperclip size={16} />
            <span>{message.file.name}</span>
            <span className="text-xs text-gray-500">
              ({(message.file.size / 1024).toFixed(1)} KB)
            </span>
          </div>
        ) : (
          message.content
        )}
      </div>
      <div className={`text-xs ${message.type === 'user' ? 'text-gray-500' : 'text-gray-400'}`}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
      </div>
    </div>
  </div>
);

const ChatUI = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth - e.clientX < 40) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: 'File uploaded',
        type: 'user',
        timestamp: new Date(),
        file: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      };
      setMessages(prev => [...prev, fileMessage]);
      setIsInitialState(false);
    }
    e.target.value = '';
  };

  const saveCurrentChat = () => {
    if (messages.length === 0) return;
    const newChat: SavedChat = {
      id: Date.now().toString(),
      name: `Chat ${savedChats.length + 1}`,
      messages: [...messages],
      isPinned: false,
      lastMessage: messages[messages.length - 1]?.content || 'No messages',
      timestamp: new Date()
    };
    setSavedChats(prev => [...prev, newChat]);
    setActiveChatId(newChat.id);
  };

  const togglePin = (chatId: string) => {
    setSavedChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
    ));
  };

  const deleteChat = (chatId: string) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChatId === chatId) {
      setActiveChatId(null);
      setMessages([]);
      setIsInitialState(true);
    }
  };

  const loadChat = (chatId: string) => {
    const chat = savedChats.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setActiveChatId(chatId);
      setIsSidebarOpen(false);
      setIsInitialState(false);
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: inputValue.trim(),
        type: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsInitialState(false);

      setTimeout(() => {
        const systemMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Thank you for your message. This is a sample response.',
          type: 'system',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, systemMessage]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      <div className="h-full w-full flex flex-col items-center">
        {/* Messages Container */}
        <div 
          ref={chatContainerRef}
          className="w-full max-w-2xl flex-1 overflow-y-auto px-4"
          style={{ paddingBottom: isInitialState ? 0 : "calc(2rem + var(--input-height, 48px))" }}
        >
          <div className="py-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Container */}
        <div className={`w-full max-w-2xl px-4 pb-4 ${isInitialState ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'absolute bottom-0'}`}>
          {isInitialState && (
            <h2 className="text-gray-200 text-center mb-4 text-3xl">How can I help you today?</h2>
          )}
          <div className="relative bg-black">
            <textarea
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                e.target.style.height = '48px';
                const newHeight = Math.min(e.target.scrollHeight, 200);
                e.target.style.height = `${newHeight}px`;
                document.documentElement.style.setProperty('--input-height', `${newHeight}px`);
              }}
              onKeyDown={handleKeyDown}
              placeholder="I can help you with depicting what's real and what's not"
              className="w-full bg-[#181b24] rounded-lg px-12 py-3
                text-gray-200 placeholder-gray-400
                focus:outline-none resize-none
                block min-h-[48px] max-h-[200px] overflow-y-auto
                leading-relaxed"
              style={{ lineHeight: '1.5' }}
              rows={1}
            />
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleFileSelect}
            />
            <button 
              className="absolute left-3 top-3 text-gray-400"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <Paperclip size={20} />
            </button>
            <button
              onClick={handleSend}
              className="absolute right-3 top-3 text-gray-400"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-64 bg-[#181b24] 
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 text-left hover:text-gray-200"
          >
            <PanelRight size={20} />
          </button>
          <h2 className="text-gray-200 text-right font-semibold">Saved Chats</h2>
        </div>

        {/* Chats List */}
        <div className="h-[calc(100%-8rem)] overflow-y-auto">
          {/* Pinned Chats */}
          {savedChats.filter(chat => chat.isPinned).map(chat => (
            <div 
              key={chat.id}
              onClick={() => loadChat(chat.id)}
              className={`p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer
                         ${activeChatId === chat.id ? 'bg-gray-800' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-200">{chat.name}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(chat.id);
                    }}
                    className="text-yellow-500"
                  >
                    <Pin size={16} fill="currentColor" />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
            </div>
          ))}

          {/* Unpinned Chats */}
          {savedChats.filter(chat => !chat.isPinned).map(chat => (
            <div 
              key={chat.id}
              onClick={() => loadChat(chat.id)}
              className={`p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer
                         ${activeChatId === chat.id ? 'bg-gray-800' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-200">{chat.name}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(chat.id);
                    }}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    <Pin size={16} />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-[#181b24]">
          <button
            onClick={saveCurrentChat}
            className="w-full bg-gray-800 text-gray-200 py-2 rounded-lg 
                     hover:bg-gray-700 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
            disabled={messages.length === 0}
          >
            Save Current Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;