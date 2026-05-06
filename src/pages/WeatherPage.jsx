import { useState } from "react";
import { WEATHER_DATA, POPULAR_CITIES, DEFAULT_CITY, BANNER_IMAGES, cityToKey } from "../data/weatherData";
import WeatherSearchBar from "../components/weather/WeatherSearchBar";
import WeatherDisplay from "../components/weather/WeatherDisplay";
import "../styles/weather.css";

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

  const bannerImage = BANNER_IMAGES[current.condition] ?? BANNER_IMAGES["Sunny"];

  return (
    <main className="eco-inner-page">
      <div className="container weather-container">
        <div className="mb-4">
          <h1 className="eco-page-title">Weather Forecast</h1>
          <p className="eco-lead">Check local conditions to pack efficiently and plan your sustainable outdoor activities.</p>
        </div>

        <WeatherSearchBar
          cityInput={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
          popularCities={POPULAR_CITIES}
          onQuickCity={handleQuickCity}
        />

        <WeatherDisplay current={current} bannerImage={bannerImage} />

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
