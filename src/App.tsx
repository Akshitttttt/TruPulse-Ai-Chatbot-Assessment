import React from 'react';
import ChatContainer from './components/ChatContainer';
import { Cog, Zap } from 'lucide-react';

function App() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
      
      {/* Footer */}
      <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-center py-3 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-center space-x-2">
          <Cog className="h-3 w-3" />
          <span>Powered by</span>
          <span className="font-space-grotesk font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            PlugBot
          </span>
          <Zap className="h-3 w-3 text-yellow-500" />
        </div>
      </footer>
    </div>
  );
}

export default App;