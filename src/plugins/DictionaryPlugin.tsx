import React from 'react';
import { BookOpen } from 'lucide-react';
import { Plugin } from '../types';

interface DictionaryData {
  word: string;
  phonetics?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
}

const DictionaryPlugin: Plugin = {
  name: 'dictionary',
  displayName: 'Dictionary',
  description: 'Look up word definitions',
  triggers: ['/define', '/dictionary', 'define', 'what does', 'meaning of', 'definition of'],
  
  async execute(params: string): Promise<DictionaryData> {
    const word = params.trim().toLowerCase();
    
    if (!word) {
      throw new Error('Please specify a word to look up');
    }
    
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
      );
      
      if (!response.ok) {
        throw new Error('Word not found');
      }
      
      const data = await response.json();
      const entry = data[0];
      
      return {
        word: entry.word,
        phonetics: entry.phonetics?.find(p => p.text)?.text,
        meanings: entry.meanings.map(meaning => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map(def => ({
            definition: def.definition,
            example: def.example
          }))
        }))
      };
    } catch (error) {
      throw new Error('Failed to fetch word definition. Please try again.');
    }
  },
  
  renderResponse(data: DictionaryData): JSX.Element {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex items-center mb-3">
          <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {data.word}
            </h3>
            {data.phonetics && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {data.phonetics}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          {data.meanings.map((meaning, index) => (
            <div key={index} className="border-t border-gray-200 dark:border-gray-700 pt-2">
              <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                {meaning.partOfSpeech}
              </div>
              
              {meaning.definitions.map((def, idx) => (
                <div key={idx} className="mb-2">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {idx + 1}. {def.definition}
                  </div>
                  
                  {def.example && (
                    <div className="text-sm italic text-gray-500 dark:text-gray-400 mt-1 pl-4">
                      "{def.example}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default DictionaryPlugin;