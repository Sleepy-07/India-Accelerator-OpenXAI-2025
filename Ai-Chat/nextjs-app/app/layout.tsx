import { Metadata, Viewport } from "next";
import ChatInterface from "../components/ChatInterface";

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
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              height: 100vh;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              overflow: hidden;
              color: #1e293b;
            }
            
            .chat-container {
              height: 100vh;
              display: flex;
              flex-direction: column;
              max-width: 1200px;
              margin: 0 auto;
              background: rgba(255, 255, 255, 0.98);
              backdrop-filter: blur(10px);
              border-radius: 0;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            }
            
            @media (min-width: 768px) {
              .chat-container {
                height: calc(100vh - 40px);
                margin: 20px auto;
                border-radius: 20px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              }
            }
            
            .chat-header {
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              color: white;
              padding: 16px 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-radius: 20px 20px 0 0;
              position: relative;
            }
            
            .chat-title {
              font-size: 1.25rem;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            
            .chat-title .logo {
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 8px;
            }
            
            .header-actions {
              display: flex;
              gap: 8px;
            }
            
            .header-button {
              background: rgba(255, 255, 255, 0.2);
              border: none;
              width: 36px;
              height: 36px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            
            .header-button:hover {
              background: rgba(255, 255, 255, 0.3);
              transform: scale(1.05);
            }
            
            .status-indicator {
              width: 8px;
              height: 8px;
              background: #10b981;
              border-radius: 50%;
              box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
              position: relative;
            }
            
            .status-indicator::after {
              content: '';
              position: absolute;
              top: -3px;
              left: -3px;
              right: -3px;
              bottom: -3px;
              background: rgba(16, 185, 129, 0.3);
              border-radius: 50%;
              animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
              0% { transform: scale(0.8); opacity: 0.7; }
              50% { transform: scale(1.2); opacity: 0.4; }
              100% { transform: scale(0.8); opacity: 0.7; }
            }
            
            .chat-messages {
              flex: 1;
              overflow-y: auto;
              padding: 24px;
              background: #f8fafc;
              display: flex;
              flex-direction: column;
              gap: 16px;
              position: relative;
            }
            
            .message {
              max-width: 80%;
              padding: 16px 20px;
              border-radius: 18px;
              position: relative;
              animation: slideUp 0.3s ease-out;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
            
            .message.user {
              align-self: flex-end;
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              color: white;
              border-bottom-right-radius: 6px;
            }
            
            .message.ai {
              align-self: flex-start;
              background: white;
              border: 1px solid #e2e8f0;
              color: #1e293b;
              border-bottom-left-radius: 6px;
            }
            
            .message-time {
              font-size: 0.7rem;
              opacity: 0.7;
              margin-top: 6px;
              text-align: right;
            }
            
            .message.ai .message-time {
              text-align: left;
            }
            
            .chat-input-container {
              padding: 16px 24px 20px;
              background: white;
              border-top: 1px solid #e2e8f0;
              border-radius: 0 0 20px 20px;
            }
            
            .chat-input-wrapper {
              display: flex;
              gap: 8px;
              align-items: flex-end;
              background: #f1f5f9;
              border-radius: 20px;
              padding: 6px 6px 6px 16px;
              border: 1px solid #e2e8f0;
            }
            
            .chat-input-wrapper:focus-within {
              border-color: #4f46e5;
              box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
            }
            
            .attachment-button, .emoji-button {
              width: 36px;
              height: 36px;
              border: none;
              background: transparent;
              border-radius: 50%;
              color: #64748b;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
              flex-shrink: 0;
            }
            
            .attachment-button:hover, .emoji-button:hover {
              background: rgba(0, 0, 0, 0.05);
              color: #4f46e5;
            }
            
            .chat-input {
              flex: 1;
              min-height: 40px;
              max-height: 120px;
              padding: 10px 0;
              border: none;
              background: transparent;
              border-radius: 20px;
              font-size: 16px;
              resize: none;
              outline: none;
              transition: all 0.2s ease;
              font-family: inherit;
              color: #1e293b;
              line-height: 1.5;
            }
            
            .chat-input:focus {
              box-shadow: none;
            }
            
            .input-actions {
              display: flex;
              align-items: center;
              gap: 4px;
            }
            
            .send-button {
              width: 40px;
              height: 40px;
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
            
            .send-button:hover:not(:disabled) {
              transform: scale(1.05);
              box-shadow: 0 8px 16px rgba(79, 70, 229, 0.3);
            }
            
            .send-button:active {
              transform: scale(0.95);
            }
            
            .send-button:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
            
            .typing-indicator {
              align-self: flex-start;
              background: white;
              border: 1px solid #e2e8f0;
              border-radius: 18px;
              border-bottom-left-radius: 6px;
              padding: 16px 20px;
              display: flex;
              gap: 8px;
              align-items: center;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
              color: #64748b;
              font-size: 0.9rem;
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
            
            .disclaimer {
              text-align: center;
              font-size: 0.75rem;
              color: #64748b;
              margin-top: 12px;
            }

            /* Menu Button */
            .menu-button {
              background: rgba(255, 255, 255, 0.2);
              border: none;
              width: 36px;
              height: 36px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
              color: white;
              margin-right: 12px;
            }

            .menu-button:hover {
              background: rgba(255, 255, 255, 0.3);
              transform: scale(1.05);
            }

            /* File Upload Styles */
            .drag-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(79, 70, 229, 0.9);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              backdrop-filter: blur(8px);
            }

            .drag-content {
              text-align: center;
              color: white;
              padding: 40px;
              border: 2px dashed rgba(255, 255, 255, 0.5);
              border-radius: 20px;
              background: rgba(255, 255, 255, 0.1);
            }

            .drag-content svg {
              margin-bottom: 16px;
              opacity: 0.8;
            }

            .drag-content p {
              font-size: 1.25rem;
              font-weight: 500;
            }

            /* File Preview Styles */
            .file-preview-container {
              display: flex;
              flex-wrap: wrap;
              gap: 12px;
              margin-bottom: 12px;
              padding: 0 4px;
            }

            .file-preview-item {
              position: relative;
            }

            .image-preview {
              position: relative;
              border-radius: 12px;
              overflow: hidden;
              background: #f1f5f9;
              border: 1px solid #e2e8f0;
            }

            .image-preview img {
              width: 80px;
              height: 80px;
              object-fit: cover;
              display: block;
            }

            .file-item {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 8px 12px;
              background: #f1f5f9;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              max-width: 200px;
            }

            .file-icon {
              color: #64748b;
              flex-shrink: 0;
            }

            .file-info {
              flex: 1;
              min-width: 0;
            }

            .file-name {
              font-size: 0.875rem;
              font-weight: 500;
              color: #1e293b;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .file-size {
              font-size: 0.75rem;
              color: #64748b;
            }

            .remove-file-btn {
              position: absolute;
              top: -6px;
              right: -6px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #ef4444;
              border: none;
              color: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .remove-file-btn:hover {
              background: #dc2626;
              transform: scale(1.1);
            }

            /* Message Files Styles */
            .message-files {
              margin-top: 8px;
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }

            .message-file {
              border-radius: 8px;
              overflow: hidden;
            }

            .message-image {
              max-width: 200px;
              max-height: 200px;
              border-radius: 8px;
              cursor: pointer;
              transition: transform 0.2s ease;
            }

            .message-image:hover {
              transform: scale(1.02);
            }

            .message-file-item {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 8px 12px;
              background: rgba(0, 0, 0, 0.05);
              border-radius: 8px;
              font-size: 0.875rem;
            }

            .message.user .message-file-item {
              background: rgba(255, 255, 255, 0.2);
              color: white;
            }

            /* Recent Chats Sidebar */
            .sidebar-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: 999;
              backdrop-filter: blur(4px);
            }

            .recent-chats-sidebar {
              position: fixed;
              top: 0;
              left: 0;
              width: 320px;
              height: 100vh;
              background: white;
              box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
              z-index: 1000;
              display: flex;
              flex-direction: column;
              transform: translateX(0);
              transition: transform 0.3s ease;
            }

            .sidebar-header {
              padding: 20px;
              border-bottom: 1px solid #e2e8f0;
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              color: white;
            }

            .sidebar-header h2 {
              font-size: 1.25rem;
              font-weight: 600;
              margin: 0;
            }

            .header-actions {
              display: flex;
              gap: 8px;
            }

            .new-chat-btn, .close-sidebar-btn {
              width: 32px;
              height: 32px;
              border: none;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 6px;
              color: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
            }

            .new-chat-btn:hover, .close-sidebar-btn:hover {
              background: rgba(255, 255, 255, 0.3);
              transform: scale(1.05);
            }

            .chats-list {
              flex: 1;
              overflow-y: auto;
              padding: 0;
            }

            .empty-state {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              padding: 40px 20px;
              text-align: center;
              color: #64748b;
            }

            .empty-state svg {
              margin-bottom: 16px;
              opacity: 0.5;
            }

            .empty-state p {
              margin: 0 0 20px 0;
              font-size: 1rem;
            }

            .start-chat-btn {
              background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 500;
              transition: all 0.2s ease;
            }

            .start-chat-btn:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
            }

            .chat-item {
              padding: 16px 20px;
              border-bottom: 1px solid #f1f5f9;
              cursor: pointer;
              transition: all 0.2s ease;
              display: flex;
              align-items: center;
              gap: 12px;
              position: relative;
            }

            .chat-item:hover {
              background: #f8fafc;
            }

            .chat-item.active {
              background: #ede9fe;
              border-left: 3px solid #4f46e5;
            }

            .chat-content {
              flex: 1;
              min-width: 0;
            }

            .chat-title {
              font-weight: 600;
              color: #1e293b;
              margin-bottom: 4px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .chat-preview {
              font-size: 0.875rem;
              color: #64748b;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 4px;
            }

            .chat-meta {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 0.75rem;
              color: #94a3b8;
            }

            .delete-chat-btn {
              width: 28px;
              height: 28px;
              border: none;
              background: transparent;
              color: #94a3b8;
              cursor: pointer;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
              opacity: 0;
            }

            .chat-item:hover .delete-chat-btn {
              opacity: 1;
            }

            .delete-chat-btn:hover {
              background: #fef2f2;
              color: #ef4444;
            }
            
            @media (max-width: 768px) {
              .chat-messages {
                padding: 16px;
              }
              
              .chat-input-container {
                padding: 12px 16px 16px;
              }
              
              .message {
                max-width: 90%;
                padding: 14px 16px;
              }
              
              .chat-header {
                padding: 14px 16px;
              }
              
              .chat-title {
                font-size: 1.1rem;
              }
              
              .header-button, .menu-button {
                width: 32px;
                height: 32px;
              }
              
              .disclaimer {
                font-size: 0.7rem;
              }

              .recent-chats-sidebar {
                width: 100%;
                max-width: 320px;
              }

              .file-preview-container {
                gap: 8px;
                margin-bottom: 8px;
              }

              .image-preview img {
                width: 60px;
                height: 60px;
              }

              .file-item {
                max-width: 150px;
                padding: 6px 10px;
              }

              .message-image {
                max-width: 150px;
                max-height: 150px;
              }
            }
          `
        }} />
      </head>
      <body>
        <ChatInterface />
        {children}
      </body>
    </html>
  );
}