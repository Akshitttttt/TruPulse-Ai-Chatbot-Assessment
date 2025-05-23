import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';

const STORAGE_KEY = 'ai-chat-messages';

/**
 * Loads chat messages from localStorage
 */
export function loadMessages(): Message[] {
  try {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      return JSON.parse(storedMessages);
    }
  } catch (error) {
    console.error('Error loading messages from localStorage:', error);
  }
  
  // Return default welcome message if no messages found or error occurs
  return [
    {
      id: uuidv4(),
      sender: 'assistant',
      content: 'Hello! I\'m your AI assistant. You can ask me questions or use plugins like:\n\n- `/weather [city]` - Get weather info\n- `/calc [expression]` - Calculate math expressions\n- `/define [word]` - Look up word definitions\n\nYou can also use natural language like "What\'s the weather in Tokyo?" or "Calculate 25 * 4".',
      type: 'text',
      timestamp: new Date().toISOString()
    }
  ];
}

/**
 * Saves chat messages to localStorage
 */
export function saveMessages(messages: Message[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
}

/**
 * Creates a new user message
 */
export function createUserMessage(content: string): Message {
  return {
    id: uuidv4(),
    sender: 'user',
    content,
    type: 'text',
    timestamp: new Date().toISOString()
  };
}

/**
 * Creates a new assistant message
 */
export function createAssistantMessage(content: string): Message {
  return {
    id: uuidv4(),
    sender: 'assistant',
    content,
    type: 'text',
    timestamp: new Date().toISOString()
  };
}