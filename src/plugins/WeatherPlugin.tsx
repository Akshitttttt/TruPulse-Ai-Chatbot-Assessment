import React from 'react';
import { Cloud, Umbrella, Wind, Thermometer, Droplets } from 'lucide-react';
import { Plugin } from '../types';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
}

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Free OpenWeatherMap API key

const WeatherPlugin: Plugin = {
  name: 'weather',
  displayName: 'Weather',
  description: 'Get current weather information for a city',
  triggers: ['/weather', 'weather in', 'what\'s the weather in', 'what is the weather in', 'how\'s the weather in'],
  
  async execute(params: string): Promise<WeatherData> {
    const city = params.trim();
    
    if (!city) {
      throw new Error('Please specify a city name');
    }
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      
      return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon
      };
    } catch (error) {
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  },
  
  renderResponse(data: WeatherData): JSX.Element {
    const getWeatherIcon = (description: string) => {
      if (description.includes('rain')) {
        return <Umbrella className="h-10 w-10 text-blue-500" />;
      } else if (description.includes('cloud')) {
        return <Cloud className="h-10 w-10 text-gray-500" />;
      } else if (description.includes('clear')) {
        return <Cloud className="h-10 w-10 text-yellow-500" />;
      } else if (description.includes('thunder')) {
        return <Cloud className="h-10 w-10 text-purple-500" />;
      } else {
        return <Cloud className="h-10 w-10 text-blue-400" />;
      }
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{data.city}</h3>
          {getWeatherIcon(data.description)}
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{data.temperature}°C</span>
          <span className="text-gray-500 dark:text-gray-300 capitalize">{data.description}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Feels like: {data.feelsLike}°C</span>
          </div>
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Humidity: {data.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-5 w-5 text-blue-300 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Wind: {data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    );
  }
};

export default WeatherPlugin;