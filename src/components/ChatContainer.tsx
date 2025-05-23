import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message } from '../types';
import { loadMessages, saveMessages, createUserMessage, createAssistantMessage } from '../utils/messageStorage';
import { processMessage } from '../utils/pluginManager';
import { Loader2, Zap } from 'lucide-react';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = loadMessages();
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage = createUserMessage(content);
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsProcessing(true);
    
    try {
      const pluginResponse = await processMessage(content);
      
      if (pluginResponse) {
        setMessages(prevMessages => [...prevMessages, pluginResponse]);
      } else {
        setTimeout(() => {
          const responseMessage = createAssistantMessage(
            `I received your message: "${content}"\n\nThis is a simulated response. In a real application, this would process your query with an AI model.`
          );
          setMessages(prevMessages => [...prevMessages, responseMessage]);
        }, 1000);
      }
    } catch (error) {
      const errorMessage = createAssistantMessage(
        `Sorry, there was an error processing your request: ${(error as Error).message}`
      );
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm safe-top">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-6">
          <div className="flex items-center space-x-2">
            <Zap className="h-7 w-7 text-yellow-500" />
            <h1 className="font-space-grotesk text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              PlugBot
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">AI Chat Interface</div>
        </div>
      </header>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isProcessing && (
            <div className="flex items-center text-gray-500 dark:text-gray-400 my-4">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Processing...
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 p-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;