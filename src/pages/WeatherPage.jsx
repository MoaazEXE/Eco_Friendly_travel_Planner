import { useState, useRef, useEffect } from "react";
import { POPULAR_CITIES, BANNER_IMAGES } from "../data/weatherData";
import WeatherSearchBar from "../components/weather/WeatherSearchBar";
import WeatherDisplay from "../components/weather/WeatherDisplay";
import "../styles/weather.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

// ── Condition → Bootstrap icon ────────────────────────────────────
function conditionToIcon(condition) {
  const c = condition.toLowerCase();
  if (c.includes("sunny") || c.includes("clear"))  return "bi-sun";
  if (c.includes("partly cloudy"))                 return "bi-cloud-sun";
  if (c.includes("cloud"))                         return "bi-cloud";
  if (c.includes("rain") || c.includes("drizzle")) return "bi-cloud-rain";
  if (c.includes("thunder") || c.includes("storm"))return "bi-cloud-lightning";
  if (c.includes("snow"))                          return "bi-cloud-snow";
  if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return "bi-cloud-fog2";
  return "bi-cloud-sun";
}

/**
 * Transforms the raw API response (numbers) into the shape
 * WeatherDisplay already expects (formatted strings + icon class).
 */
function transformResponse(data) {
  return {
    city:        data.city,
    date:        data.date,
    condition:   data.condition,
    currentIcon: conditionToIcon(data.condition),
    temp:        `${data.temp}°C`,
    feelsLike:   `${data.feelsLike}°C`,
    humidity:    `${data.humidity}%`,
    wind:        `${data.wind} km/h`,
    visibility:  `${data.visibility} km`,
    pressure:    `${data.pressure} hPa`,
    uvIndex:     String(data.uvIndex),
    airQuality:  data.airQuality,
    forecast: data.forecast.map((f) => ({
      day:       f.day,
      condition: f.condition,
      icon:      conditionToIcon(f.condition),
      high:      `${f.high}°`,
      low:       `${f.low}°`,
    })),
  };
}

// ── Component ─────────────────────────────────────────────────────
export default function WeatherPage() {
  const [cityInput,    setCityInput]    = useState("");
  const [current,      setCurrent]      = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);
  const [suggestions,  setSuggestions]  = useState([]);
  const debounceRef = useRef(null);

  async function fetchWeather(city, lat, lon) {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);

    const coords = lat && lon ? `?lat=${lat}&lon=${lon}` : '';
    try {
      const res = await fetch(
        `${API_BASE}/weather/${encodeURIComponent(city.trim())}${coords}`,
        { credentials: "include" }
      );

      if (res.status === 404) {
        setError(`City "${city}" not found. Try a different name.`);
        setCurrent(null);
        return;
      }
      if (!res.ok) {
        setError("Failed to fetch weather data. Please try again.");
        return;
      }

      const data = await res.json();
      setCurrent(transformResponse(data));
      localStorage.setItem("lastWeatherCity", JSON.stringify({ city, lat, lon }));
    } catch {
      setError("Could not reach the weather service. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  function handleCityChange(e) {
    const val = e.target.value;
    setCityInput(val);
    clearTimeout(debounceRef.current);
    if (val.trim().length < 2) { setSuggestions([]); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${GEOCODING_URL}?name=${encodeURIComponent(val.trim())}&count=5&language=en&format=json`
        );
        const json = await res.json();
        setSuggestions(
          (json.results || []).map((item) => ({
            display: [item.name, item.admin1, item.country_code].filter(Boolean).join(', '),
            city:    item.name,
            lat:     item.latitude,
            lon:     item.longitude,
          }))
        );
      } catch { /* ignore suggestion errors */ }
    }, 150);
  }

  function handleSelectSuggestion(suggestion) {
    setCityInput(suggestion.display);
    setSuggestions([]);
    fetchWeather(suggestion.city, suggestion.lat, suggestion.lon);
  }

  function handleSearch() {
    clearTimeout(debounceRef.current);
    setSuggestions([]);
    fetchWeather(cityInput);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function handleQuickCity(city) {
    setCityInput(city);
    setSuggestions([]);
    fetchWeather(city);
  }

  useEffect(() => {
    const saved = localStorage.getItem("lastWeatherCity");
    if (saved) {
      const { city, lat, lon } = JSON.parse(saved);
      setCityInput(city);
      fetchWeather(city, lat, lon);
    }
  }, []);

  const bannerImage = current
    ? (BANNER_IMAGES[current.condition] ?? BANNER_IMAGES["Partly Cloudy"])
    : BANNER_IMAGES["Partly Cloudy"];

  return (
    <main className="eco-inner-page">
      <div className="container weather-container">
        <div className="mb-4">
          <h1 className="eco-page-title">Weather Forecast</h1>
          <p className="eco-lead">
            Check local conditions to pack efficiently and plan your sustainable outdoor activities.
          </p>
        </div>

        <WeatherSearchBar
          cityInput={cityInput}
          onChange={handleCityChange}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
          popularCities={POPULAR_CITIES}
          onQuickCity={handleQuickCity}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />

        {/* Loading state */}
        {loading && (
          <div className="card-eco p-5 text-center mb-4">
            <div className="spinner-border text-success" role="status" />
            <p className="mt-3 text-muted">Fetching weather for {cityInput}…</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="card-eco p-4 mb-4 text-center">
            <i className="bi bi-exclamation-circle text-warning fs-3 mb-2 d-block" />
            <p className="text-secondary mb-0">{error}</p>
          </div>
        )}

        {/* Weather data */}
        {!loading && !error && current && (
          <WeatherDisplay current={current} bannerImage={bannerImage} />
        )}

        {/* Empty state — shown before the first search */}
        {!loading && !error && !current && (
          <div className="card-eco p-5 text-center mb-4">
            <i className="bi bi-cloud-sun text-success fs-1 mb-3 d-block" />
            <p className="text-muted">
              Search for a city above to see live weather conditions.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
