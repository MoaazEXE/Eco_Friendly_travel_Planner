/**
 * api/weather.js
 *
 * Weather endpoints — fetch current weather and forecasts.
 *
 * PLACEHOLDER — returns mock data until a real backend or API key exists.
 * When ready, this can call either your own backend (which proxies
 * OpenWeatherMap) or the OpenWeatherMap API directly using VITE_WEATHER_API_KEY.
 */

import { request } from './client';

/**
 * Get weather data for a city.
 * @param {string} city
 * @returns {Promise<{ city, condition, humidity, wind, temp, advice, forecast: object[] }>}
 */
export async function getWeather(city) {
  // ── Option A: call your own backend ───────────────────────────
  // TODO: uncomment when backend is ready
  // return request(`/weather?city=${encodeURIComponent(city)}`);

  // ── Option B: call OpenWeatherMap directly ─────────────────────
  // const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  // const res = await fetch(
  //   `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
  // );
  // if (!res.ok) throw new Error('City not found');
  // return res.json();

  // ── Mock response ──────────────────────────────────────────────
  console.warn('[api/weather] getWeather() is using mock data');
  return Promise.resolve(null); // WeatherPage falls back to its local mock data
}
