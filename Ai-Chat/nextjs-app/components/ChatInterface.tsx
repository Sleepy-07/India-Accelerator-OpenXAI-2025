"use client";

import { useState, useRef, useEffect } from 'react';
import FileUpload from './FileUpload';
import FilePreview from './FilePreview';
import RecentChats from './RecentChats';

// AI responses database
const aiResponses = [
  "I'm an AI assistant designed to help with your questions. How can I assist you today?",
  "That's an interesting question. Based on my knowledge, I'd suggest considering a few different approaches.",
  "I understand what you're asking. Many people have found success with this method.",
  "Thanks for sharing that. I can provide more information about this topic if you'd like.",
  "I'm glad you asked about that. Here's what I know on the subject...",
  "That's a great point. From my perspective, there are several factors to consider.",
  "I'd be happy to help with that. Let me explain how this works.",
  "Based on the latest research, the recommended approach would be to...",
  "I've analyzed your question and here are my thoughts on the matter.",
  "That's a common question. The short answer is yes, but let me elaborate..."
];

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  files?: FileItem[];
}

interface FileItem {
  id: string;
  file: File;
  preview?: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm ChatFlow AI, your personal assistant. How can I help you today?", sender: "ai", timestamp: new Date(Date.now() - 300000) }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<FileItem[]>([]);
  const [isRecentChatsOpen, setIsRecentChatsOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string>('default-chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // File handling functions
  const handleFileSelect = (files: File[]) => {
    const newFiles: FileItem[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    setAttachedFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const saveCurrentChat = () => {
    if (messages.length > 1) { // Only save if there are actual conversations
      const chatTitle = messages.find(m => m.sender === 'user')?.text.substring(0, 50) || 'New Chat';
      const lastMessage = messages[messages.length - 1];
      
      const chatData = {
        id: currentChatId,
        title: chatTitle,
        lastMessage: lastMessage.text,
        timestamp: new Date(),
        messageCount: messages.length,
        messages: messages
      };

      const existingChats = JSON.parse(localStorage.getItem('chatflow-recent-chats') || '[]');
      const updatedChats = existingChats.filter((chat: any) => chat.id !== currentChatId);
      updatedChats.unshift(chatData);
      
      // Keep only the latest 20 chats
      if (updatedChats.length > 20) {
        updatedChats.splice(20);
      }
      
      localStorage.setItem('chatflow-recent-chats', JSON.stringify(updatedChats));
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '' && attachedFiles.length === 0) return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText || (attachedFiles.length > 0 ? `Sent ${attachedFiles.length} file(s)` : ''),
      sender: 'user',
      timestamp: new Date(),
      files: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText("");
    setAttachedFiles([]);
    setIsTyping(true);

    // Save chat after sending message
    setTimeout(() => {
      saveCurrentChat();
    }, 100);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsTyping(false);
      let aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      // Custom responses for file uploads
      if (newUserMessage.files && newUserMessage.files.length > 0) {
        const hasImages = newUserMessage.files.some(f => f.file.type.startsWith('image/'));
        const hasDocuments = newUserMessage.files.some(f => !f.file.type.startsWith('image/'));
        
        if (hasImages && hasDocuments) {
          aiResponse = "I can see you've shared both images and documents. I can help you analyze the content, extract information, or answer questions about these files.";
        } else if (hasImages) {
          aiResponse = "I can see the images you've shared. I can help you analyze them, describe what I see, or answer questions about the visual content.";
        } else {
          aiResponse = "I've received your documents. I can help you analyze the content, summarize information, or answer questions about the files you've shared.";
        }
      }
      
      const newAIMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAIMessage]);
    }, 1500);
  };

  const handleNewChat = () => {
    saveCurrentChat();
    setMessages([
      { id: 1, text: "Hello! I'm ChatFlow AI, your personal assistant. How can I help you today?", sender: "ai", timestamp: new Date() }
    ]);
    setCurrentChatId(`chat-${Date.now()}`);
    setAttachedFiles([]);
    setInputText("");
    setIsRecentChatsOpen(false);
  };

  const handleChatSelect = (chatId: string) => {
    const savedChats = JSON.parse(localStorage.getItem('chatflow-recent-chats') || '[]');
    const selectedChat = savedChats.find((chat: any) => chat.id === chatId);
    
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
      setAttachedFiles([]);
      setInputText("");
    }
    setIsRecentChatsOpen(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-title">
            <button 
              className="menu-button" 
              onClick={() => setIsRecentChatsOpen(true)}
              title="Recent Chats"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="logo">
              <svg width="24" height="24" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#4F46E5"/>
                <path d="M30 40h40v20H50l-10 10V60H30V40z" fill="white"/>
              </svg>
            </div>
            <span>ChatFlow AI</span>
            <div className="status-indicator"></div>
          </div>
          <div className="header-actions">
            <button className="header-button" type="button" title="Settings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            <button className="header-button" type="button" onClick={handleNewChat} title="New chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </button>
          </div>
        </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
              {message.files && message.files.length > 0 && (
                <div className="message-files">
                  {message.files.map((file) => (
                    <div key={file.id} className="message-file">
                      {file.file.type.startsWith('image/') && file.preview ? (
                        <img src={file.preview} alt={file.file.name} className="message-image" />
                      ) : (
                        <div className="message-file-item">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                          </svg>
                          <span>{file.file.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="message-time">
              {formatTime(message.timestamp)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <span>AI is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        {/* File Preview */}
        <FilePreview 
          files={attachedFiles}
          onRemove={handleRemoveFile}
        />
        
        <div className="chat-input-wrapper">
          <FileUpload 
            onFileSelect={handleFileSelect}
            disabled={isTyping}
          />
          <textarea 
            ref={textareaRef}
            className="chat-input"
            placeholder="Message ChatFlow AI..."
            rows={1}
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <div className="input-actions">
            <button className="emoji-button" type="button" title="Add emoji" disabled={isTyping}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
            <button 
              className="send-button" 
              type="button" 
              onClick={handleSendMessage}
              disabled={inputText.trim() === '' && attachedFiles.length === 0}
              title="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
        </div>
        <div className="disclaimer">
          ChatFlow AI can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>

    {/* Recent Chats Sidebar */}
    <RecentChats 
      isOpen={isRecentChatsOpen}
      onClose={() => setIsRecentChatsOpen(false)}
      onChatSelect={handleChatSelect}
      onNewChat={handleNewChat}
      currentChatId={currentChatId}
    />
  </>
  );
}
