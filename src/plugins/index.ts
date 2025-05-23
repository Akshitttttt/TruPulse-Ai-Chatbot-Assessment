import { Plugin } from '../types';
import WeatherPlugin from './WeatherPlugin';
import CalculatorPlugin from './CalculatorPlugin';
import DictionaryPlugin from './DictionaryPlugin';

// Collection of available plugins
const plugins: Plugin[] = [
  WeatherPlugin,
  CalculatorPlugin,
  DictionaryPlugin
];

export default plugins;