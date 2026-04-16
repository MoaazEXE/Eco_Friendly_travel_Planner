import { useState } from 'react';

const TRANSPORT_FACTORS = {
  car:    0.192,
  flight: 0.255,
  train:  0.041,
};

const ACCOMMODATION_FACTORS = {
  hotel:   30,
  hostel:  15,
  camping: 5,
};

function impactLevel(total) {
  if (total < 50)  return { label: 'Low Impact 🌱',      alertClass: 'alert-success' };
  if (total < 150) return { label: 'Moderate Impact 🌿', alertClass: 'alert-warning' };
  return             { label: 'High Impact 🔥',           alertClass: 'alert-danger'  };
}

export default function CalculatorPage() {
  const [transport,     setTransport]     = useState('car');
  const [distance,      setDistance]      = useState('');
  const [accommodation, setAccommodation] = useState('hotel');
  const [nights,        setNights]        = useState('');
  const [result,        setResult]        = useState(null);

  function handleCalculate(e) {
    e.preventDefault();

    const km  = parseFloat(distance) || 0;
    const nts = parseInt(nights, 10) || 0;

    const transportEmission     = km  * TRANSPORT_FACTORS[transport];
    const accommodationEmission = nts * ACCOMMODATION_FACTORS[accommodation];
    const total = transportEmission + accommodationEmission;

    setResult({ transportEmission, accommodationEmission, total });
  }

  const percent = result ? Math.min((result.total / 200) * 100, 100) : 0;
  const impact  = result ? impactLevel(result.total) : null;

  return (
    <main className="container my-5" style={{ flex: 1 }}>
      <h1 className="text-center mb-4">Carbon Footprint Calculator</h1>

      {/* ── Input Card ── */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-success text-white">
          Travel Input Form
        </div>
        <div className="card-body">
          <form onSubmit={handleCalculate}>
            <div className="row g-3">

              {/* Transport */}
              <div className="col-md-6">
                <label htmlFor="transport" className="form-label">
                  Transportation Type
                </label>
                <select
                  id="transport"
                  className="form-select"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                >
                  <option value="car">Car</option>
                  <option value="flight">Flight</option>
                  <option value="train">Train</option>
                </select>
              </div>

              {/* Distance */}
              <div className="col-md-6">
                <label htmlFor="distance" className="form-label">
                  Distance (km)
                </label>
                <div className="input-group">
                  <span className="input-group-text">KM</span>
                  <input
                    type="number"
                    id="distance"
                    className="form-control"
                    placeholder="e.g. 200"
                    min="0"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
              </div>

              {/* Accommodation */}
              <div className="col-md-6">
                <label htmlFor="accommodation" className="form-label">
                  Accommodation Type
                </label>
                <select
                  id="accommodation"
                  className="form-select"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                >
                  <option value="hotel">Hotel</option>
                  <option value="hostel">Hostel</option>
                  <option value="camping">Camping</option>
                </select>
              </div>

              {/* Nights */}
              <div className="col-md-6">
                <label htmlFor="nights" className="form-label">
                  Number of Nights
                </label>
                <div className="input-group">
                  <span className="input-group-text">Nights</span>
                  <input
                    type="number"
                    id="nights"
                    className="form-control"
                    placeholder="e.g. 3"
                    min="0"
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="col-12 text-center mt-3">
                <button type="submit" className="btn btn-success btn-lg">
                  Calculate Footprint
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* ── Results Card ── */}
      {result && (
        <div className="card shadow-sm mt-4">
          <div className="card-header bg-dark text-white">
            Results Summary
          </div>
          <div className="card-body">

            <div className={`alert ${impact.alertClass}`}>
              <strong>{impact.label}</strong>
            </div>

            <p>
              <span className="badge bg-primary">Transport:</span>{' '}
              {result.transportEmission.toFixed(2)} kg CO₂
            </p>

            <p>
              <span className="badge bg-secondary">Accommodation:</span>{' '}
              {result.accommodationEmission.toFixed(2)} kg CO₂
            </p>

            <hr />

            <h4>Total: {result.total.toFixed(2)} kg CO₂</h4>

            <div className="progress mt-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={percent}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
