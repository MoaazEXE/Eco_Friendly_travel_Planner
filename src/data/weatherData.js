import sunnyImg from "../assets/weather/sunny.jpg";
import partlyCloudyImg from "../assets/weather/partly-cloudy.jpg";
import cloudyImg from "../assets/weather/cloudy.jpg";
import rainImg from "../assets/weather/rain.jpg";

export const WEATHER_DATA = {
  "kuala lumpur": {
    city: "Kuala Lumpur, Malaysia",
    date: "Friday, April 10, 2026",
    condition: "Partly Cloudy",
    currentIcon: "bi-cloud-sun",
    temp: "32°C",
    feelsLike: "36°C",
    humidity: "75%",
    wind: "12 km/h",
    visibility: "9 km",
    pressure: "1012 hPa",
    uvIndex: "High (8)",
    airQuality: "Good",
    forecast: [
      { day: "Mon", icon: "bi-cloud-sun",  condition: "Partly Cloudy", high: "33°", low: "24°" },
      { day: "Tue", icon: "bi-cloud",      condition: "Cloudy",        high: "31°", low: "25°" },
      { day: "Wed", icon: "bi-cloud-sun",  condition: "Partly Cloudy", high: "32°", low: "24°" },
      { day: "Thu", icon: "bi-cloud-rain", condition: "Rain",          high: "29°", low: "24°" },
      { day: "Fri", icon: "bi-sun",        condition: "Sunny",         high: "34°", low: "25°" },
    ],
  },
  penang: {
    city: "Penang, Malaysia",
    date: "Friday, April 10, 2026",
    condition: "Rain",
    currentIcon: "bi-cloud-rain",
    temp: "28°C",
    feelsLike: "31°C",
    humidity: "86%",
    wind: "18 km/h",
    visibility: "7 km",
    pressure: "1006 hPa",
    uvIndex: "Moderate (4)",
    airQuality: "Good",
    forecast: [
      { day: "Mon", icon: "bi-cloud-rain", condition: "Rain",          high: "29°", low: "24°" },
      { day: "Tue", icon: "bi-cloud",      condition: "Cloudy",        high: "28°", low: "24°" },
      { day: "Wed", icon: "bi-cloud-rain", condition: "Rain",          high: "27°", low: "23°" },
      { day: "Thu", icon: "bi-cloud",      condition: "Cloudy",        high: "28°", low: "23°" },
      { day: "Fri", icon: "bi-cloud-sun",  condition: "Partly Cloudy", high: "30°", low: "24°" },
    ],
  },
  london: {
    city: "London, United Kingdom",
    date: "Friday, April 10, 2026",
    condition: "Cloudy",
    currentIcon: "bi-cloud",
    temp: "12°C",
    feelsLike: "9°C",
    humidity: "82%",
    wind: "26 km/h",
    visibility: "6 km",
    pressure: "1002 hPa",
    uvIndex: "Low (2)",
    airQuality: "Moderate",
    forecast: [
      { day: "Mon", icon: "bi-cloud",      condition: "Cloudy",        high: "13°", low: "7°" },
      { day: "Tue", icon: "bi-cloud-rain", condition: "Rain",          high: "12°", low: "6°" },
      { day: "Wed", icon: "bi-cloud",      condition: "Cloudy",        high: "11°", low: "6°" },
      { day: "Thu", icon: "bi-cloud-rain", condition: "Rain",          high: "10°", low: "5°" },
      { day: "Fri", icon: "bi-cloud-sun",  condition: "Partly Cloudy", high: "12°", low: "6°" },
    ],
  },
  tokyo: {
    city: "Tokyo, Japan",
    date: "Friday, April 10, 2026",
    condition: "Sunny",
    currentIcon: "bi-sun",
    temp: "26°C",
    feelsLike: "27°C",
    humidity: "58%",
    wind: "9 km/h",
    visibility: "14 km",
    pressure: "1016 hPa",
    uvIndex: "High (6)",
    airQuality: "Excellent",
    forecast: [
      { day: "Mon", icon: "bi-cloud-sun",  condition: "Partly Cloudy", high: "26°", low: "19°" },
      { day: "Tue", icon: "bi-cloud",      condition: "Cloudy",        high: "24°", low: "18°" },
      { day: "Wed", icon: "bi-sun",        condition: "Sunny",         high: "27°", low: "19°" },
      { day: "Thu", icon: "bi-cloud-rain", condition: "Rain",          high: "23°", low: "17°" },
      { day: "Fri", icon: "bi-cloud-sun",  condition: "Partly Cloudy", high: "25°", low: "18°" },
    ],
  },
  paris: {
    city: "Paris, France",
    date: "Friday, April 10, 2026",
    condition: "Partly Cloudy",
    currentIcon: "bi-cloud-sun",
    temp: "18°C",
    feelsLike: "17°C",
    humidity: "63%",
    wind: "14 km/h",
    visibility: "11 km",
    pressure: "1011 hPa",
    uvIndex: "Moderate (3)",
    airQuality: "Good",
    forecast: [
      { day: "Mon", icon: "bi-cloud-sun",  condition: "Partly Cloudy", high: "20°", low: "12°" },
      { day: "Tue", icon: "bi-cloud",      condition: "Cloudy",        high: "18°", low: "11°" },
      { day: "Wed", icon: "bi-sun",        condition: "Sunny",         high: "22°", low: "13°" },
      { day: "Thu", icon: "bi-cloud-rain", condition: "Rain",          high: "17°", low: "10°" },
      { day: "Fri", icon: "bi-cloud-sun",  condition: "Partly Cloudy", high: "19°", low: "12°" },
    ],
  },
};

export const POPULAR_CITIES = ["Kuala Lumpur", "Penang", "London", "Tokyo", "Paris"];

export const DEFAULT_CITY = "penang";

export const BANNER_IMAGES = {
  Sunny: sunnyImg,
  "Partly Cloudy": partlyCloudyImg,
  Cloudy: cloudyImg,
  Rain: rainImg,
};

export function cityToKey(city) {
  return city.trim().toLowerCase();
}
