import { useState } from "react";
import sunnyImg from "../assets/weather/sunny.jpg";
import partlyCloudyImg from "../assets/weather/partly-cloudy.jpg";
import cloudyImg from "../assets/weather/cloudy.jpg";
import rainImg from "../assets/weather/rain.jpg";

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
    <main
      className="py-4"
      style={{ backgroundColor: "var(--green-bg)", flex: 1 }}
    >
      <div className="container" style={{ maxWidth: "1120px" }}>
        <header className="text-center mb-4">
          <h1 className="fw-bold mb-2" style={{ color: "var(--green-darker)" }}>
            Weather Forecast
          </h1>
          <p className="mb-0" style={{ color: "var(--weather-subtitle)", fontSize: "1.2rem" }}>
            Check local conditions to pack efficiently and plan your sustainable
            outdoor activities.
          </p>
        </header>

        <section
          className="rounded-4 shadow-sm mb-4"
          style={{ backgroundColor: "var(--weather-search-bg)", padding: "18px 20px 16px" }}
        >
          <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3">
            <div className="input-group" style={{ flex: 1 }}>
              <span
                className="input-group-text border-end-0"
                style={{ backgroundColor: "var(--weather-input-bg)", borderColor: "var(--weather-input-border)" }}
              >
                <i className="bi bi-geo-alt" style={{ color: "var(--green-primary)" }} />
              </span>
              <input
                id="cityInput"
                type="text"
                className="form-control border-start-0"
                style={{ backgroundColor: "var(--weather-input-bg)", borderColor: "var(--weather-input-border)" }}
                placeholder="Search city"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              className="btn fw-semibold px-4"
              type="button"
              onClick={handleSearch}
              style={{
                backgroundColor: "var(--green-primary)",
                color: "var(--white)",
                minWidth: "124px",
              }}
            >
              <i className="bi bi-search me-2" />
              Search
            </button>
          </div>
          <div className="mt-3 d-flex align-items-center gap-2 flex-wrap">
            <span style={{ color: "var(--weather-dim)" }}>Popular:</span>
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleQuickCity(city)}
                className="btn btn-sm rounded-pill fw-semibold"
                style={{
                  backgroundColor: "var(--weather-pill-bg)",
                  color: "var(--green-primary)",
                  border: "none",
                  padding: "4px 14px",
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </section>

        <section
          className="rounded-4 shadow-sm overflow-hidden mb-4"
          style={{ backgroundColor: "var(--weather-search-bg)" }}
        >
          <div
            className="p-4"
            style={{
              backgroundImage: `linear-gradient(var(--weather-overlay), var(--weather-overlay)), url(${bannerImage})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h2
              className="fw-bold text-white mb-1"
              style={{ fontSize: "2.65rem" }}
            >
              {current.city}
            </h2>
            <p
              className="text-white mb-3"
              style={{ opacity: 0.92, fontSize: "0.95rem" }}
            >
              {current.date}
            </p>
            <div className="d-flex align-items-center gap-4">
              <i
                className={`bi ${current.currentIcon}`}
                style={{ color: "var(--weather-icon-tint)", fontSize: "3.7rem" }}
              />
              <div>
                <div
                  className="text-white"
                  style={{ fontSize: "4.3rem", lineHeight: 1 }}
                >
                  {current.temp}
                </div>
                <p className="text-white mb-0" style={{ fontSize: "1.8rem" }}>
                  {current.condition}
                </p>
                <p
                  className="text-white mb-0"
                  style={{ opacity: 0.88, fontSize: "1.42rem" }}
                >
                  Feels like {current.feelsLike}
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3" style={{ backgroundColor: "var(--weather-metric-bg)" }}>
            <div className="row g-3">
              {metricCards.map((item) => (
                <div className="col-12 col-sm-6 col-lg-3" key={item.label}>
                  <div className="d-flex align-items-center gap-3">
                    <i
                      className={`bi ${item.icon}`}
                      style={{ color: "var(--green-primary)", fontSize: "1.25rem" }}
                    />
                    <div>
                      <p
                        className="mb-0"
                        style={{ color: "var(--weather-label)", fontSize: "0.85rem" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="mb-0 fw-medium"
                        style={{ color: "var(--weather-value)", fontSize: "1.45rem" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h3
              className="fw-semibold mb-3"
              style={{ color: "var(--weather-value)", fontSize: "1.85rem" }}
            >
              5-Day Forecast
            </h3>
            <div className="row g-3">
              {current.forecast.slice(0, 5).map((item) => (
                <div className="col-12 col-sm-6 col-lg" key={item.day}>
                  <div
                    className="text-center h-100 rounded-4"
                    style={{ backgroundColor: "var(--weather-metric-bg)", padding: "16px 10px" }}
                  >
                    <p
                      className="mb-1"
                      style={{ color: "var(--weather-label)", fontSize: "1.1rem" }}
                    >
                      {item.day}
                    </p>
                    <i
                      className={`bi ${item.icon}`}
                      style={{ color: "var(--green-primary)", fontSize: "3rem" }}
                    />
                    <p
                      className="my-2"
                      style={{ color: "var(--weather-condition)", fontSize: "1rem" }}
                    >
                      {item.condition}
                    </p>
                    <p
                      className="mb-0"
                      style={{ color: "var(--green-primary)", fontSize: "1.65rem" }}
                    >
                      {item.high}{" "}
                      <span style={{ color: "var(--weather-label)" }}>{item.low}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="rounded-4 p-4 text-center"
          style={{ backgroundColor: "var(--weather-metric-bg)" }}
        >
          <span style={{ color: "var(--weather-value)", fontWeight: 700 }}>Note:</span>{" "}
          <span style={{ color: "var(--weather-note)" }}>
            This is a demo using mock data. In production, this would integrate
            with a real weather API like OpenWeatherMap or WeatherAPI.
          </span>
        </section>
      </div>
    </main>
  );
}
