import React, { useState, useRef, useEffect } from 'react';
import { Plugin } from '../types';
import { getAvailablePlugins } from '../utils/pluginManager';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isProcessing }) => {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Plugin[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Handle plugin suggestions when typing slash
  useEffect(() => {
    if (message.startsWith('/')) {
      const query = message.substring(1).toLowerCase();
      const matchedPlugins = getAvailablePlugins().filter(plugin => 
        plugin.name.toLowerCase().includes(query) || 
        plugin.displayName.toLowerCase().includes(query)
      );
      setSuggestions(matchedPlugins);
      setShowSuggestions(matchedPlugins.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const selectSuggestion = (plugin: Plugin) => {
    const triggerCommand = plugin.triggers.find(t => t.startsWith('/')) || `/${plugin.name}`;
    setMessage(triggerCommand + ' ');
    setShowSuggestions(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  return (
    <div className="relative mt-2">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            ref={inputRef}
            className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white resize-none"
            placeholder="Ask a question or use a plugin command..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!message.trim() || isProcessing}
            className={`absolute right-2 bottom-2.5 p-1.5 rounded-full 
              ${message.trim() && !isProcessing 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              } transition-colors`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Plugin suggestions */}
        {showSuggestions && (
          <div className="absolute bottom-full left-0 right-0 mb-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {suggestions.map((plugin) => (
              <div 
                key={plugin.name}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => selectSuggestion(plugin)}
              >
                <Sparkles className="h-4 w-4 text-indigo-500 mr-2" />
                <div>
                  <div className="font-medium">{plugin.displayName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{plugin.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>

      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
        <div>Type <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd> to complete a suggestion</div>
        <div>Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> to send</div>
      </div>
    </div>
  );
};

export default ChatInput;