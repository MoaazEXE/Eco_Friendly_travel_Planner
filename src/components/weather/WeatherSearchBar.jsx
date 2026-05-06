import PropTypes from "prop-types";

export default function WeatherSearchBar({ cityInput, onChange, onSearch, onKeyDown, popularCities, onQuickCity }) {
  return (
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
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
        <button
          className="btn-eco-dark weather-search-btn"
          type="button"
          onClick={onSearch}
        >
          <i className="bi bi-search me-2" />
          Search
        </button>
      </div>
      <div className="mt-3 d-flex align-items-center gap-2 flex-wrap">
        <span className="weather-popular-label">Popular:</span>
        {popularCities.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onQuickCity(city)}
            className="btn btn-sm weather-city-pill"
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}

WeatherSearchBar.propTypes = {
  cityInput:     PropTypes.string.isRequired,
  onChange:      PropTypes.func.isRequired,
  onSearch:      PropTypes.func.isRequired,
  onKeyDown:     PropTypes.func.isRequired,
  popularCities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onQuickCity:   PropTypes.func.isRequired,
};
