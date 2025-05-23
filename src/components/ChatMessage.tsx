import React from 'react';
import { Message } from '../types';
import { getPluginByName } from '../utils/pluginManager';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { sender, content, type, pluginName, pluginData } = message;
  
  // Determine message style based on sender
  const isUser = sender === 'user';
  const messageContainerClass = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`;
  const messageClass = `max-w-[85%] rounded-lg p-3 ${
    isUser 
      ? 'bg-indigo-600 text-white rounded-tr-none' 
      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none'
  }`;
  
  const renderAvatar = () => {
    return (
      <div className={`flex-shrink-0 ${isUser ? 'order-2 ml-2' : 'mr-2'}`}>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-indigo-700' : 'bg-gray-600'
        }`}>
          {isUser 
            ? <User className="h-5 w-5 text-white" /> 
            : <Bot className="h-5 w-5 text-white" />
          }
        </div>
      </div>
    );
  };

  // Render plugin response if applicable
  const renderPluginResponse = () => {
    if (type === 'plugin' && pluginName && pluginData) {
      const plugin = getPluginByName(pluginName);
      if (plugin) {
        return plugin.renderResponse(pluginData);
      }
    }
    return null;
  };

  const pluginResponse = renderPluginResponse();

  return (
    <div className={messageContainerClass}>
      {renderAvatar()}
      <div className={`${isUser ? 'order-1' : ''}`}>
        <div className={messageClass}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        
        {pluginResponse && (
          <div className="mt-2">
            {pluginResponse}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;