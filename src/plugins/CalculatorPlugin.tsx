import React from 'react';
import { Calculator } from 'lucide-react';
import { Plugin } from '../types';

interface CalculatorResult {
  expression: string;
  result: number;
}

const CalculatorPlugin: Plugin = {
  name: 'calculator',
  displayName: 'Calculator',
  description: 'Calculate mathematical expressions',
  triggers: ['/calc', '/calculator', 'calculate', 'what is', 'what\'s', 'solve'],
  
  async execute(params: string): Promise<CalculatorResult> {
    const expression = params.trim();
    
    if (!expression) {
      throw new Error('Please provide a mathematical expression');
    }
    
    try {
      // Safely evaluate the expression
      // This implementation uses Function instead of eval for slightly better safety
      // In a production app, you might want an even safer approach or a dedicated math library
      const sanitizedExpression = sanitizeExpression(expression);
      const result = new Function(`return ${sanitizedExpression}`)();
      
      if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid mathematical expression');
      }
      
      return {
        expression: sanitizedExpression,
        result: result
      };
    } catch (error) {
      throw new Error('Invalid mathematical expression');
    }
  },
  
  renderResponse(data: CalculatorResult): JSX.Element {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
        <Calculator className="h-8 w-8 text-indigo-500 mr-3" />
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Expression</div>
          <div className="text-md font-medium text-gray-700 dark:text-gray-300">
            {data.expression}
          </div>
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            = {typeof data.result === 'number' ? data.result.toLocaleString() : data.result}
          </div>
        </div>
      </div>
    );
  }
};

// Helper function to sanitize the expression
function sanitizeExpression(expression: string): string {
  // Replace math operator words with symbols
  const normalized = expression
    .replace(/plus/gi, '+')
    .replace(/minus/gi, '-')
    .replace(/times/gi, '*')
    .replace(/multiplied by/gi, '*')
    .replace(/divided by/gi, '/')
    .replace(/modulo/gi, '%')
    .replace(/mod/gi, '%');
  
  // Remove any characters that aren't numbers, operators, or parentheses
  return normalized.replace(/[^0-9+\-*/%().]/g, '');
}

export default CalculatorPlugin;