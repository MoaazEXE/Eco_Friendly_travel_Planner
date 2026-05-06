import { useState } from "react";
import sunnyImg from "../assets/weather/sunny.jpg";
import partlyCloudyImg from "../assets/weather/partly-cloudy.jpg";
import cloudyImg from "../assets/weather/cloudy.jpg";
import rainImg from "../assets/weather/rain.jpg";
import "../styles/weather.css";

const WEATHER_DATA = {
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
      {
        day: "Mon",
        icon: "bi-cloud-sun",
        condition: "Partly Cloudy",
        high: "33°",
        low: "24°",
      },
      {
        day: "Tue",
        icon: "bi-cloud",
        condition: "Cloudy",
        high: "31°",
        low: "25°",
      },
      {
        day: "Wed",
        icon: "bi-cloud-sun",
        condition: "Partly Cloudy",
        high: "32°",
        low: "24°",
      },
      {
        day: "Thu",
        icon: "bi-cloud-rain",
        condition: "Rain",
        high: "29°",
        low: "24°",
      },
      {
        day: "Fri",
        icon: "bi-sun",
        condition: "Sunny",
        high: "34°",
        low: "25°",
      },
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
      {
        day: "Mon",
        icon: "bi-cloud-rain",
        condition: "Rain",
        high: "29°",
        low: "24°",
      },
      {
        day: "Tue",
        icon: "bi-cloud",
        condition: "Cloudy",
        high: "28°",
        low: "24°",
      },
      {
        day: "Wed",
        icon: "bi-cloud-rain",
        condition: "Rain",
        high: "27°",
        low: "23°",
      },
      {
        day: "Thu",
        icon: "bi-cloud",
        condition: "Cloudy",
        high: "28°",
        low: "23°",
      },
      {
        day: "Fri",
        icon: "bi-cloud-sun",
        condition: "Partly Cloudy",
        high: "30°",
        low: "24°",
      },
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
      {
        day: "Mon",
        icon: "bi-cloud",
        condition: "Cloudy",
        high: "13°",
        low: "7°",
      },
      {
        day: "Tue",
        icon: "bi-cloud-rain",
        condition: "Rain",
        high: "12°",
        low: "6°",
      },
      {
        day: "Wed",
        icon: "bi-cloud",
        condition: "Cloudy",
        high: "11°",
        low: "6°",
      },
      {
        day: "Thu",
        icon: "bi-cloud-rain",
        condition: "Rain",
        high: "10°",
        low: "5°",
      },
      {
        day: "Fri",
        icon: "bi-cloud-sun",
        condition: "Partly Cloudy",
        high: "12°",
        low: "6°",
      },
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
      {
        day: "Mon",
        icon: "bi-cloud-sun",
        condition: "Partly Cloudy",
        high: "26°",
        low: "19°",
      },
      {
        day: "Tue",
        icon: "bi-cloud",
        condition: "Cloudy",
        high: "24°",
        low: "18°",
      },
      {
        day: "Wed",
        icon: "bi-sun",
        condition: "Sunny",
        high: "27°",
        low: "19°",
      },
      {
        day: "Thu",
        icon: "bi-cloud-rain",
        condition: "Rain",
        high: "23°",
        low: "17°",
      },
      {
        day: "Fri",
        icon: "bi-cloud-sun",
        condition: "Partly Cloudy",
        high: "25°",
        low: "18°",
      },
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
      {
        day: "Mon",
        icon: "bi-cloud-sun",
        condition: "Partly Cloudy",
        high: "20°",
        low: "12°",
      },
      {
        day: "Tue",
        icon: "bi-cloud",
        condition: "Cloudy",
        high: "18°",
        low: "11°",
      },
      {
        day: "Wed",
        icon: "bi-sun",
        condition: "Sunny",
        high: "22°",
        low: "13°",
      },
      {
        day: "Thu",
        icon: "bi-cloud-rain",
        condition: "Rain",
        high: "17°",
        low: "10°",
      },
      {
        day: "Fri",
        icon: "bi-cloud-sun",
        condition: "Partly Cloudy",
        high: "19°",
        low: "12°",
      },
    ],
  },
};

const POPULAR_CITIES = ["Kuala Lumpur", "Penang", "London", "Tokyo", "Paris"];
const DEFAULT_CITY = "penang";

const BANNER_IMAGES = {
  Sunny: sunnyImg,
  "Partly Cloudy": partlyCloudyImg,
  Cloudy: cloudyImg,
  Rain: rainImg,
};

function cityToKey(city) {
  return city.trim().toLowerCase();
}

export default function WeatherPage() {
  const [cityInput, setCityInput] = useState("Penang");
  const [current, setCurrent] = useState(WEATHER_DATA[DEFAULT_CITY]);

  function handleSearch() {
    const key = cityToKey(cityInput);
    if (!key) return;
    setCurrent(WEATHER_DATA[key] ?? WEATHER_DATA[DEFAULT_CITY]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function handleQuickCity(city) {
    setCityInput(city);
    setCurrent(WEATHER_DATA[cityToKey(city)] ?? WEATHER_DATA[DEFAULT_CITY]);
  }

  const metricCards = [
    { icon: "bi-moisture", label: "Humidity", value: current.humidity },
    { icon: "bi-wind", label: "Wind Speed", value: current.wind },
    { icon: "bi-eye", label: "Visibility", value: current.visibility },
    { icon: "bi-speedometer2", label: "Pressure", value: current.pressure },
  ];

  const bannerImage = BANNER_IMAGES[current.condition] ?? sunnyImg;

  return (
    <main className="eco-inner-page">
      <div className="container weather-container">
        <div className="mb-4">
          <h1 className="eco-page-title">Weather Forecast</h1>
          <p className="eco-lead">Check local conditions to pack efficiently and plan your sustainable outdoor activities.</p>
        </div>

        {/* Search card */}
        <section className="card-eco mb-4 p-4">
          <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3">
            <div className="input-group weather-search-input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-geo-alt text-success" />
              </span>
              <input
                id="cityInput"
                type="text"
                className="form-control border-start-0"
                placeholder="Search city"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              className="btn-eco-dark weather-search-btn"
              type="button"
              onClick={handleSearch}
            >
              <i className="bi bi-search me-2" />
              Search
            </button>
          </div>
          <div className="mt-3 d-flex align-items-center gap-2 flex-wrap">
            <span className="weather-popular-label">Popular:</span>
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleQuickCity(city)}
                className="btn btn-sm weather-city-pill"
              >
                {city}
              </button>
            ))}
          </div>
        </section>

        {/* Weather display card */}
        <section className="card-eco overflow-hidden mb-4">
          <div
            className="weather-banner"
            style={{ backgroundImage: `linear-gradient(var(--weather-overlay), var(--weather-overlay)), url(${bannerImage})` }}
          >
            <h2 className="fw-bold text-white mb-1 weather-city-name">{current.city}</h2>
            <p className="text-white mb-3 weather-date">{current.date}</p>
            <div className="d-flex align-items-center gap-4">
              <i className={`bi ${current.currentIcon} weather-icon`} />
              <div>
                <div className="text-white weather-temp">{current.temp}</div>
                <p className="text-white mb-0 weather-condition">{current.condition}</p>
                <p className="text-white mb-0 weather-feels-like">Feels like {current.feelsLike}</p>
              </div>
            </div>
          </div>

          <div className="weather-metrics">
            <div className="row g-3">
              {metricCards.map((item) => (
                <div className="col-12 col-sm-6 col-lg-3" key={item.label}>
                  <div className="d-flex align-items-center gap-3">
                    <i className={`bi ${item.icon} weather-metric-icon`} />
                    <div>
                      <p className="weather-metric-label">{item.label}</p>
                      <p className="weather-metric-value">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h3 className="fw-semibold mb-3 weather-forecast-heading">5-Day Forecast</h3>
            <div className="row g-3">
              {current.forecast.slice(0, 5).map((item) => (
                <div className="col-12 col-sm-6 col-lg" key={item.day}>
                  <div className="text-center h-100 weather-forecast-card">
                    <p className="weather-forecast-day">{item.day}</p>
                    <i className={`bi ${item.icon} weather-forecast-icon`} />
                    <p className="my-2 weather-forecast-condition">{item.condition}</p>
                    <p className="weather-forecast-high">
                      {item.high}{" "}
                      <span className="weather-forecast-low">{item.low}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Note card */}
        <section className="card-eco p-4 text-center">
          <span className="weather-note-label">Note:</span>{" "}
          <span className="weather-note-text">
            This is a demo using mock data. In production, this would integrate
            with a real weather API like OpenWeatherMap or WeatherAPI.
          </span>
        </section>
      </div>
    </main>
  );
}
