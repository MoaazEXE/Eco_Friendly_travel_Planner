import PropTypes from "prop-types";

const METRIC_CONFIG = [
  { icon: "bi-moisture",    label: "Humidity",   key: "humidity"   },
  { icon: "bi-wind",        label: "Wind Speed", key: "wind"       },
  { icon: "bi-eye",         label: "Visibility", key: "visibility" },
  { icon: "bi-speedometer2",label: "Pressure",   key: "pressure"   },
];

export default function WeatherDisplay({ current, bannerImage }) {
  return (
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

      <div className="bg-light border-top p-4">
        <div className="row g-3">
          {METRIC_CONFIG.map((item) => (
            <div className="col-12 col-sm-6 col-lg-3" key={item.label}>
              <div className="d-flex align-items-center gap-3">
                <i className={`bi ${item.icon} text-success fs-5`} />
                <div>
                  <p className="text-muted small mb-0">{item.label}</p>
                  <p className="weather-metric-value">{current[item.key]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="fw-semibold mb-3" style={{ fontSize: '1.85rem' }}>5-Day Forecast</h3>
        <div className="row g-3">
          {current.forecast.slice(0, 5).map((item) => (
            <div className="col-12 col-sm-6 col-lg" key={item.day}>
              <div className="bg-light border rounded p-3 text-center h-100">
                <p className="text-muted mb-1" style={{ fontSize: '1.1rem' }}>{item.day}</p>
                <i className={`bi ${item.icon} weather-forecast-icon`} />
                <p className="text-secondary my-2">{item.condition}</p>
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
  );
}

WeatherDisplay.propTypes = {
  current: PropTypes.shape({
    city:        PropTypes.string.isRequired,
    date:        PropTypes.string.isRequired,
    condition:   PropTypes.string.isRequired,
    currentIcon: PropTypes.string.isRequired,
    temp:        PropTypes.string.isRequired,
    feelsLike:   PropTypes.string.isRequired,
    humidity:    PropTypes.string.isRequired,
    wind:        PropTypes.string.isRequired,
    visibility:  PropTypes.string.isRequired,
    pressure:    PropTypes.string.isRequired,
    forecast: PropTypes.arrayOf(
      PropTypes.shape({
        day:       PropTypes.string.isRequired,
        icon:      PropTypes.string.isRequired,
        condition: PropTypes.string.isRequired,
        high:      PropTypes.string.isRequired,
        low:       PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  bannerImage: PropTypes.string.isRequired,
};
