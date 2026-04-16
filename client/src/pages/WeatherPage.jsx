import { useState } from 'react';

const WEATHER_DATA = {
  'kuala lumpur': {
    city: 'Kuala Lumpur',
    condition: 'Partly Cloudy',
    humidity: '72%',
    wind: '12 km/h',
    temp: '31 C',
    advice: 'Bring a reusable water bottle.',
    forecast: [
      { day: 'Mon', icon: 'bi-cloud-sun',           condition: 'Partly Cloudy', high: '32 C', low: '25 C' },
      { day: 'Tue', icon: 'bi-cloud-rain',           condition: 'Light Rain',    high: '30 C', low: '24 C' },
      { day: 'Wed', icon: 'bi-sun',                  condition: 'Sunny',         high: '33 C', low: '25 C' },
      { day: 'Thu', icon: 'bi-cloud-lightning-rain', condition: 'Storm Risk',    high: '29 C', low: '23 C' },
      { day: 'Fri', icon: 'bi-cloud-sun',            condition: 'Partly Cloudy', high: '31 C', low: '24 C' },
    ],
  },
  'george town': {
    city: 'George Town',
    condition: 'Sunny',
    humidity: '68%',
    wind: '10 km/h',
    temp: '30 C',
    advice: 'Best for walking tours and bike sharing.',
    forecast: [
      { day: 'Mon', icon: 'bi-sun',       condition: 'Sunny',         high: '31 C', low: '25 C' },
      { day: 'Tue', icon: 'bi-cloud-sun', condition: 'Warm Clouds',   high: '32 C', low: '26 C' },
      { day: 'Wed', icon: 'bi-cloud-rain',condition: 'Showers',       high: '29 C', low: '24 C' },
      { day: 'Thu', icon: 'bi-sun',       condition: 'Sunny',         high: '33 C', low: '26 C' },
      { day: 'Fri', icon: 'bi-cloud-sun', condition: 'Partly Cloudy', high: '31 C', low: '25 C' },
    ],
  },
  'johor bahru': {
    city: 'Johor Bahru',
    condition: 'Cloudy',
    humidity: '75%',
    wind: '9 km/h',
    temp: '29 C',
    advice: 'Carry a foldable umbrella for short showers.',
    forecast: [
      { day: 'Mon', icon: 'bi-cloud',     condition: 'Cloudy',        high: '30 C', low: '24 C' },
      { day: 'Tue', icon: 'bi-cloud-rain',condition: 'Rain',          high: '28 C', low: '23 C' },
      { day: 'Wed', icon: 'bi-cloud-sun', condition: 'Mixed',         high: '30 C', low: '24 C' },
      { day: 'Thu', icon: 'bi-cloud',     condition: 'Cloudy',        high: '29 C', low: '23 C' },
      { day: 'Fri', icon: 'bi-sun',       condition: 'Sunny',         high: '31 C', low: '24 C' },
    ],
  },
};

const DEFAULT_CITY = 'kuala lumpur';

export default function WeatherPage() {
  const [cityInput, setCityInput] = useState('');
  const [current, setCurrent] = useState(WEATHER_DATA[DEFAULT_CITY]);

  function handleSearch() {
    const key = cityInput.trim().toLowerCase();
    setCurrent(WEATHER_DATA[key] ?? WEATHER_DATA[DEFAULT_CITY]);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <main
      className="py-5"
      style={{ backgroundColor: 'var(--green-bg)', minHeight: '75vh', flex: 1 }}
    >
      <div className="container">
        {/* Search Card */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <h1 className="mb-3">Weather Planner</h1>
            <p className="mb-4" style={{ color: 'var(--green-darker)' }}>
              Search a city to view a mock weather summary and five-day forecast
              for trip planning.
            </p>
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <label
                  htmlFor="cityInput"
                  className="form-label fw-semibold"
                  style={{ color: 'var(--green-darker)' }}
                >
                  City
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-geo-alt" />
                  </span>
                  <input
                    id="cityInput"
                    type="text"
                    className="form-control"
                    placeholder="Enter city name (e.g. Kuala Lumpur)"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className="btn"
                    type="button"
                    onClick={handleSearch}
                    style={{
                      backgroundColor: 'var(--green-primary)',
                      color: 'var(--green-bg)',
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Weather Card */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <h2 className="h3 mb-1">{current.city}</h2>
                    <p className="mb-1" style={{ color: 'var(--green-darker)' }}>
                      {current.condition}
                    </p>
                    <p className="mb-0" style={{ color: 'var(--green-darker)' }}>
                      Humidity {current.humidity} | Wind {current.wind}
                    </p>
                  </div>
                  <div className="text-end">
                    <div
                      className="display-5 fw-semibold"
                      style={{ color: 'var(--green-primary)' }}
                    >
                      {current.temp}
                    </div>
                    <div style={{ color: 'var(--green-secondary)' }}>
                      {current.advice}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <section>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="h4 mb-0">5-Day Forecast (Mock Data)</h2>
            <span
              className="badge"
              style={{ backgroundColor: 'var(--green-secondary)' }}
            >
              Local Demo
            </span>
          </div>
          <div className="row g-3">
            {current.forecast.map((item) => (
              <div className="col-12 col-sm-6 col-lg-2" key={item.day}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h3
                      className="h6 mb-2"
                      style={{ color: 'var(--green-primary)' }}
                    >
                      {item.day}
                    </h3>
                    <i
                      className={`bi ${item.icon} fs-2`}
                      style={{ color: 'var(--green-secondary)' }}
                    />
                    <p
                      className="mb-2 mt-2"
                      style={{ color: 'var(--green-darker)' }}
                    >
                      {item.condition}
                    </p>
                    <p className="mb-0" style={{ color: 'var(--green-darker)' }}>
                      {item.high} / {item.low}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
