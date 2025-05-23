export type Sender = 'user' | 'assistant';
export type MessageType = 'text' | 'plugin';
export type PluginName = 'weather' | 'calculator' | 'dictionary' | '';

export interface Message {
  id: string;
  sender: Sender;
  content: string;
  type: MessageType;
  pluginName?: PluginName;
  pluginData?: any;
  timestamp: string;
}

export interface Plugin {
  name: PluginName;
  displayName: string;
  description: string;
  triggers: string[];
  execute: (params: string) => Promise<any>;
  renderResponse: (data: any) => JSX.Element;
}