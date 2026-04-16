import { useState } from 'react';
import '../styles/itinerary.css';

const MOCK_DESTINATIONS = [
  { id: 1, city: 'kl',    name: 'KLCC Park & Eco-Walk',              type: 'nature',  budget: 0,  weather: 'Sunny',  impact: 'Low' },
  { id: 2, city: 'kl',    name: 'Pasar Seni Heritage Trail',         type: 'culture', budget: 20, weather: 'Cloudy', impact: 'High' },
  { id: 3, city: 'kl',    name: 'Bangsar Organic Community Garden',  type: 'nature',  budget: 10, weather: 'Sunny',  impact: 'Low' },
  { id: 4, city: 'kl',    name: 'The Hive Bulk Foods (Bangsar)',     type: 'food',    budget: 50, weather: 'Cool',   impact: 'Medium' },
  { id: 5, city: 'penang',name: 'Entopia Butterfly Farm',            type: 'nature',  budget: 60, weather: 'Sunny',  impact: 'Low' },
  { id: 6, city: 'penang',name: 'George Town Cycling Tour',          type: 'cycling', budget: 30, weather: 'Cloudy', impact: 'Low' },
  { id: 7, city: 'penang',name: 'Hin Bus Depot Arts Space',          type: 'culture', budget: 0,  weather: 'Cool',   impact: 'Low' },
];

const INTERESTS = [
  { value: 'nature',  label: '🌿 Nature' },
  { value: 'culture', label: '🎨 Culture' },
  { value: 'food',    label: '🥗 Food' },
  { value: 'cycling', label: '🚲 Cycling' },
];

const WEATHER_OPTIONS = ['Sunny', 'Cloudy', 'Cool'];

function impactVariant(impact) {
  if (impact === 'Medium') return 'warning';
  if (impact === 'High')   return 'danger';
  return 'success';
}

export default function ItineraryPage() {
  const [destination, setDestination]   = useState('');
  const [travelDate, setTravelDate]     = useState('');
  const [interests, setInterests]       = useState(['nature']);
  const [budget, setBudget]             = useState(250);
  const [weather, setWeather]           = useState('Sunny');
  const [recommendations, setRecommendations] = useState(null);
  const [savedPlan, setSavedPlan]       = useState([]);

  function toggleInterest(value) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  }

  function handleBudgetChange(e) {
    const value = Number(e.target.value);
    setBudget(value);
    const min = 0, max = 1000;
    const percent = ((value - min) / (max - min)) * 100;
    e.target.style.background = `linear-gradient(to right, #198754 0%, #198754 ${percent}%, #dee2e6 ${percent}%, #dee2e6 100%)`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cityKey = destination.toLowerCase().trim();
    const filtered = MOCK_DESTINATIONS.filter(
      (item) =>
        item.city    === cityKey &&
        item.budget  <= budget &&
        item.weather === weather &&
        interests.includes(item.type)
    );
    setRecommendations(filtered);
  }

  function addToPlan(id) {
    if (!travelDate) {
      alert('Please select a date in the form first!');
      return;
    }
    const item = MOCK_DESTINATIONS.find((d) => d.id === id);
    const duplicate = savedPlan.some(
      (p) => p.id === id && p.plannedDate === travelDate
    );
    if (duplicate) {
      alert('This activity is already in your plan for this date!');
      return;
    }
    setSavedPlan((prev) =>
      [...prev, { ...item, plannedDate: travelDate }].sort(
        (a, b) => new Date(a.plannedDate) - new Date(b.plannedDate)
      )
    );
  }

  function removeFromPlan(index) {
    setSavedPlan((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <main className="container my-5" style={{ flex: 1 }}>
      {/* Page Header */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold text-success">Plan Your Green Journey</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
          Customize your eco-friendly trip based on your interests, budget, and
          the local weather forecast.
        </p>
      </div>

      <div className="row g-4">
        {/* ── Left: Preferences Form ── */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-success text-white py-3 border-0">
              <h5 className="mb-0 fw-semibold">
                <i className="bi bi-sliders2-vertical me-2" />
                Trip Preferences
              </h5>
            </div>
            <div className="card-body p-4 bg-white">
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                {/* Destination + Date */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-uppercase text-muted">
                      Destination City
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg border-2 shadow-none"
                      placeholder="e.g., Penang"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-uppercase text-muted">
                      Date of Visit
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-lg border-2 shadow-none"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">Please select a travel date.</div>
                  </div>
                </div>

                {/* Primary Interests */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-uppercase text-muted d-block">
                    Primary Interests
                  </label>
                  <div className="row g-2">
                    {INTERESTS.map(({ value, label }) => (
                      <div className="col-6" key={value}>
                        <input
                          type="checkbox"
                          className="btn-check"
                          id={`interest-${value}`}
                          checked={interests.includes(value)}
                          onChange={() => toggleInterest(value)}
                        />
                        <label
                          className="btn btn-outline-success w-100 py-2 border-2"
                          htmlFor={`interest-${value}`}
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-uppercase text-muted d-flex justify-content-between">
                    Budget / Day{' '}
                    <span>
                      <span className="text-success">RM {budget}</span>
                    </span>
                  </label>
                  <input
                    type="range"
                    className="budget-range"
                    min="0"
                    max="1000"
                    step="10"
                    value={budget}
                    onChange={handleBudgetChange}
                  />
                  <div className="d-flex justify-content-between x-small text-muted mt-1">
                    <span>Budget</span>
                    <span>Luxury</span>
                  </div>
                </div>

                {/* Weather */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-uppercase text-muted">
                    Weather Forecast
                  </label>
                  <div className="row g-2">
                    {WEATHER_OPTIONS.map((option) => (
                      <div className="col-4" key={option}>
                        <input
                          type="radio"
                          className="btn-check"
                          name="weather"
                          id={`weather-${option}`}
                          value={option}
                          checked={weather === option}
                          onChange={() => setWeather(option)}
                        />
                        <label
                          className="btn btn-outline-success w-100 py-2 border-2"
                          htmlFor={`weather-${option}`}
                        >
                          {option === 'Sunny' ? '☀️' : option === 'Cloudy' ? '☁️' : '❄️'} {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 fw-bold shadow-sm py-3 mt-2 rounded-3"
                >
                  Find Eco-Spots
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Right: Recommendations + Saved Plan ── */}
        <div className="col-lg-7">
          {/* Green Recommendations */}
          <section className="mb-5">
            <h4 className="fw-bold mb-4 d-flex align-items-center">
              <span
                className="bg-success text-white rounded-circle p-2 me-2 d-flex justify-content-center align-items-center"
                style={{ width: 35, height: 35, fontSize: '1rem' }}
              >
                1
              </span>
              Green Recommendations
            </h4>

            <div id="recommendationContainer" className="row g-3">
              {recommendations === null ? (
                <div className="col-12">
                  <div className="p-5 text-center bg-white rounded-4 border-dashed">
                    <i className="bi bi-search text-muted display-4" />
                    <p className="text-muted mt-3">
                      Select your preferences to see matching eco-options.
                    </p>
                  </div>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="col-12">
                  <div className="alert alert-light border-2 text-center p-4 rounded-4 shadow-sm">
                    <h6 className="fw-bold text-dark">No matching spots found.</h6>
                    <p className="small text-muted mb-0">
                      Try different interests or a higher budget!
                    </p>
                  </div>
                </div>
              ) : (
                recommendations.map((item) => {
                  const variant = impactVariant(item.impact);
                  return (
                    <div className="col-12 mb-3" key={item.id}>
                      <div className="card border-0 shadow-sm rounded-4 border-start border-success border-5">
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                          <div>
                            <span
                              className={`badge bg-${variant}-subtle text-${variant} fw-bold text-uppercase mb-2`}
                              style={{ fontSize: '0.7rem' }}
                            >
                              {item.impact} Impact
                            </span>
                            <h5 className="fw-bold mb-1">{item.name}</h5>
                            <p className="small text-muted mb-0">
                              RM{item.budget} | {item.weather} Weather
                            </p>
                          </div>
                          <button
                            className="btn btn-success rounded-pill px-4 fw-bold"
                            onClick={() => addToPlan(item.id)}
                          >
                            Add <i className="bi bi-plus-lg ms-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Saved Itinerary */}
          <section>
            <h4 className="fw-bold mb-4 d-flex align-items-center">
              <span
                className="bg-success text-white rounded-circle p-2 me-2 d-flex justify-content-center align-items-center"
                style={{ width: 35, height: 35, fontSize: '1rem' }}
              >
                2
              </span>
              Your Saved Itinerary
            </h4>
            <div className="card border-0 shadow-sm rounded-4 bg-white">
              <div className="card-body p-4">
                {savedPlan.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted mb-0">
                      Your plan is empty. Click &quot;Add to Plan&quot; to start
                      building your trip.
                    </p>
                  </div>
                ) : (
                  <div className="saved-plan-list">
                    {savedPlan.map((item, index) => {
                      const variant = impactVariant(item.impact);
                      const formattedDate = new Date(item.plannedDate).toLocaleDateString(
                        'en-GB',
                        { day: 'numeric', month: 'short', year: 'numeric' }
                      );
                      return (
                        <div className="saved-item-card" key={`${item.id}-${item.plannedDate}`}>
                          <div className="date-badge">
                            <i className="bi bi-calendar-check me-1" />
                            {formattedDate}
                          </div>
                          <div className="d-flex justify-content-between align-items-center w-100">
                            <div className="d-flex align-items-center">
                              <div className="icon-box me-3">
                                <i className="bi bi-pin-map-fill" />
                              </div>
                              <div className="item-info">
                                <h6 className="fw-bold mb-0">{item.name}</h6>
                                <div className="item-meta">
                                  <span
                                    className={`badge bg-${variant}-subtle text-${variant} me-2`}
                                  >
                                    {item.impact} Impact
                                  </span>
                                  <span className="small text-muted">
                                    RM{item.budget}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              className="delete-btn"
                              onClick={() => removeFromPlan(index)}
                              aria-label="Remove from plan"
                            >
                              <i className="bi bi-trash3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
