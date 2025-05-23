import { v4 as uuidv4 } from 'uuid';
import { Message, Plugin, PluginName } from '../types';
import plugins from '../plugins';

/**
 * Checks if a message contains a plugin command and executes the appropriate plugin
 */
export async function processMessage(message: string): Promise<Message | null> {
  // Normalize input
  const normalizedMessage = message.trim();
  
  // Try to find a matching plugin
  const { plugin, params } = findMatchingPlugin(normalizedMessage);
  
  if (!plugin) {
    return null; // No plugin found
  }
  
  try {
    // Execute the plugin with the parameters
    const pluginData = await plugin.execute(params);
    
    // Create a message with plugin results
    return {
      id: uuidv4(),
      sender: 'assistant',
      content: `Results from ${plugin.displayName}:`,
      type: 'plugin',
      pluginName: plugin.name,
      pluginData,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    // Create an error message
    return {
      id: uuidv4(),
      sender: 'assistant',
      content: `Error with ${plugin.displayName}: ${(error as Error).message}`,
      type: 'text',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Finds a plugin that matches the user's message
 */
function findMatchingPlugin(message: string): { plugin: Plugin | null; params: string } {
  // First check for exact command matches (like /weather)
  for (const plugin of plugins) {
    for (const trigger of plugin.triggers) {
      // Check if message starts with an exact trigger (like /weather)
      if (trigger.startsWith('/') && message.startsWith(trigger)) {
        const params = message.substring(trigger.length).trim();
        return { plugin, params };
      }
    }
  }
  
  // Then check for natural language triggers
  for (const plugin of plugins) {
    for (const trigger of plugin.triggers) {
      // Skip slash command triggers for natural language processing
      if (trigger.startsWith('/')) continue;
      
      // Check if message contains the trigger phrase
      if (message.toLowerCase().includes(trigger.toLowerCase())) {
        // Extract parameters based on the trigger's position
        const triggerPos = message.toLowerCase().indexOf(trigger.toLowerCase());
        const params = message.substring(triggerPos + trigger.length).trim();
        return { plugin, params };
      }
    }
  }
  
  return { plugin: null, params: '' };
}

/**
 * Gets a plugin by name
 */
export function getPluginByName(name: PluginName): Plugin | undefined {
  return plugins.find(plugin => plugin.name === name);
}

/**
 * Returns a list of all available plugins
 */
export function getAvailablePlugins(): Plugin[] {
  return plugins;
}