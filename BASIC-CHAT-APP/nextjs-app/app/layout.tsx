import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "ChatFlow",
    template: `%s - ChatFlow`,
  },
  description: "A modern, real-time chat application for seamless communication",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%234F46E5'/><path d='M30 40h40v20H50l-10 10V60H30V40z' fill='white'/></svg>",
    shortcut: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%234F46E5'/><path d='M30 40h40v20H50l-10 10V60H30V40z' fill='white'/></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='%234F46E5'/><path d='M30 40h40v20H50l-10 10V60H30V40z' fill='white'/></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// Client Component for interactive chat input
function ChatInput() {
  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <textarea 
          className="chat-input"
          placeholder="Type a message..."
          rows={1}
        />
        <button className="send-button" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              height: 100vh;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              overflow: hidden;
            }
            
            .chat-container {
              height: 100vh;
              display: flex;
              flex-direction: column;
              max-width: 1200px;
              margin: 0 auto;
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 0;
            }
            
            @media (min-width: 768px) {
              .chat-container {
                height: calc(100vh - 40px);
                margin: 20px auto;
                border-radius: 16px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              }
            }
            
            .chat-header {
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              color: white;
              padding: 20px 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-radius: 16px 16px 0 0;
            }
            
            .chat-title {
              font-size: 1.5rem;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            
            .status-indicator {
              width: 8px;
              height: 8px;
              background: #10b981;
              border-radius: 50%;
              animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            
            .chat-messages {
              flex: 1;
              overflow-y: auto;
              padding: 24px;
              background: #f8fafc;
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            
            .message {
              max-width: 70%;
              padding: 12px 16px;
              border-radius: 18px;
              position: relative;
              animation: slideUp 0.3s ease-out;
            }
            
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .message.sent {
              align-self: flex-end;
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              color: white;
              border-bottom-right-radius: 6px;
            }
            
            .message.received {
              align-self: flex-start;
              background: white;
              border: 1px solid #e2e8f0;
              color: #1e293b;
              border-bottom-left-radius: 6px;
            }
            
            .message-time {
              font-size: 0.75rem;
              opacity: 0.7;
              margin-top: 4px;
            }
            
            .chat-input-container {
              padding: 20px 24px;
              background: white;
              border-top: 1px solid #e2e8f0;
              border-radius: 0 0 16px 16px;
            }
            
            .chat-input-wrapper {
              display: flex;
              gap: 12px;
              align-items: flex-end;
            }
            
            .chat-input {
              flex: 1;
              min-height: 44px;
              max-height: 120px;
              padding: 12px 16px;
              border: 2px solid #e2e8f0;
              border-radius: 22px;
              font-size: 16px;
              resize: none;
              outline: none;
              transition: all 0.2s ease;
              font-family: inherit;
            }
            
            .chat-input:focus {
              border-color: #4f46e5;
              box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
            }
            
            .send-button {
              width: 44px;
              height: 44px;
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              border: none;
              border-radius: 50%;
              color: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
              flex-shrink: 0;
            }
            
            .send-button:hover {
              transform: scale(1.05);
              box-shadow: 0 8px 16px rgba(79, 70, 229, 0.3);
            }
            
            .send-button:active {
              transform: scale(0.95);
            }
            
            .empty-state {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              color: #64748b;
              text-align: center;
            }
            
            .empty-state-icon {
              width: 64px;
              height: 64px;
              margin-bottom: 16px;
              opacity: 0.5;
            }
            
            .typing-indicator {
              align-self: flex-start;
              background: white;
              border: 1px solid #e2e8f0;
              border-radius: 18px;
              border-bottom-left-radius: 6px;
              padding: 16px 20px;
              display: flex;
              gap: 4px;
              align-items: center;
            }
            
            .typing-dot {
              width: 8px;
              height: 8px;
              background: #64748b;
              border-radius: 50%;
              animation: typing 1.4s infinite ease-in-out;
            }
            
            .typing-dot:nth-child(1) { animation-delay: -0.32s; }
            .typing-dot:nth-child(2) { animation-delay: -0.16s; }
            
            @keyframes typing {
              0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
              40% { transform: scale(1); opacity: 1; }
            }
            
            @media (max-width: 768px) {
              .chat-messages {
                padding: 16px;
              }
              
              .chat-input-container {
                padding: 16px;
              }
              
              .message {
                max-width: 85%;
              }
              
              .chat-header {
                padding: 16px 20px;
              }
              
              .chat-title {
                font-size: 1.25rem;
              }
            }
          `
        }} />
      </head>
      <body>
        <div className="chat-container">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">
              <span>ChatFlow</span>
              <div className="status-indicator"></div>
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              Online
            </div>
          </div>

          {/* Messages Area */}
          <div className="chat-messages">
            {/* Empty State */}
            <div className="empty-state">
              <svg className="empty-state-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .3 0 .5-.1L14 18h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H13.2l-1.2.8V16H4V4h16v12z"/>
              </svg>
              <h3 style={{ marginBottom: '8px', fontSize: '1.125rem', fontWeight: '600' }}>
                Start a conversation
              </h3>
              <p style={{ opacity: 0.7 }}>
                Send a message to begin chatting
              </p>
            </div>

            {/* Sample Messages (you can remove these) */}
            <div className="message received">
              <div>Welcome to ChatFlow! How can I help you today?</div>
              <div className="message-time">2:30 PM</div>
            </div>

            <div className="message sent">
              <div>Hi! This looks great. Thanks for the welcome!</div>
              <div className="message-time">2:31 PM</div>
            </div>

            {/* Typing Indicator */}
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>

          {/* Input Area - Simple version without event handlers */}
          <ChatInput />
        </div>

        {children}
      </body>
    </html>
  );
}