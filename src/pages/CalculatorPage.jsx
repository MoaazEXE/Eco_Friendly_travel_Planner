import { useState } from "react";

// Emission factors
const TRANSPORT_FACTORS = {
  flight: 0.255,
  car: 0.192,
  train: 0.041,
  bus: 0.105,
};

const ACCOMMODATION_FACTORS = {
  hotel: 30,
  ecolodge: 20,
  hostel: 15,
  camping: 5,
};

function impactLevel(total) {
  if (total < 50) return { label: "Low Impact 🌱", alertClass: "alert-success" };
  if (total < 150) return { label: "Moderate Impact 🌿", alertClass: "alert-warning" };
  return { label: "High Impact 🔥", alertClass: "alert-danger" };
}

export default function CalculatorPage() {
  const [transport, setTransport] = useState("flight");
  const [distance, setDistance] = useState("");
  const [accommodation, setAccommodation] = useState("hotel");
  const [nights, setNights] = useState("");
  const [result, setResult] = useState(null);

  function handleCalculate(e) {
    e.preventDefault();

    const km = parseFloat(distance) || 0;
    const nts = parseInt(nights, 10) || 0;

    const transportEmission = km * TRANSPORT_FACTORS[transport];
    const accommodationEmission = nts * ACCOMMODATION_FACTORS[accommodation];
    const total = transportEmission + accommodationEmission;

    setResult({ transportEmission, accommodationEmission, total });
  }

  const percent = result ? Math.min((result.total / 200) * 100, 100) : 0;
  const impact = result ? impactLevel(result.total) : null;

  return (
    <main className="container my-5">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="fw-bold">Carbon Footprint Calculator</h1>
        <p className="text-muted">
          Estimate the impact of your travel plans. Select transportation and accommodation options below.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="card shadow-sm p-4 rounded-4">
        <form onSubmit={handleCalculate}></form>
        {/*Transport Section*/}
        <div className="mb-4">
          <h5 className="fw-semibold mb-3">
            <i className="bi bi-arrow-repeat me-2"></i>
            Transportation
          </h5>

          <div className="row g-3 mb-3">
              {/* FIX #5: Use map instead of repeated button code */}
              {TRANSPORT_OPTIONS.map((option) => (
                <div className="col-md-3" key={option.key}>
                  <button
                    type="button"
                    className={`btn w-100 py-3 border rounded-3 ${
                      transport === option.key
                        ? "btn-success"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setTransport(option.key)}
                  >
                    {option.icon} {option.label}
                  </button>
                </div>
              ))}
            </div>

          <label className="form-label fw-semibold">Total Distance (km)</label>
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="e.g. 1000"
            min="0"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <hr />

        {/*Accommodation Section*/}
        <div className="mb-4 mt-4">
          <h5 className="fw-semibold mb-3">
            <i className="bi bi-house-door me-2"></i>
            Accommodation
          </h5>

          <div className="row g-3 mb-3">
              {/* FIX #6: Use map instead of repeated button code */}
              {ACCOMMODATION_OPTIONS.map((option) => (
                <div className="col-md-3" key={option.key}>
                  <button
                    type="button"
                    className={`btn w-100 py-3 border rounded-3 ${
                      accommodation === option.key
                        ? "btn-success"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setAccommodation(option.key)}
                  >
                    {option.icon} {option.label}
                  </button>
                </div>
              ))}
            </div>

          <label className="form-label fw-semibold">Number of Nights</label>
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="e.g. 5"
            min="0"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
          />
        </div>

        {/* Calculate Button */}
        <form onSubmit={handleCalculate}>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-dark btn-lg rounded-3">
              Calculate Emissions
            </button>
          </div>
        </form>
      </div>

      {/*Result Section*/}
      {result && (
        <div className="card shadow-sm mt-4 p-4 rounded-4">
          <h4 className="fw-bold mb-3">Results</h4>

          <div className={`alert ${impact.alertClass}`}>
            <strong>{impact.label}</strong>
          </div>

          <p className="mb-1">
            <span className="fw-semibold">Transport:</span>{" "}
            {result.transportEmission.toFixed(2)} kg CO₂
          </p>

          <p className="mb-3">
            <span className="fw-semibold">Accommodation:</span>{" "}
            {result.accommodationEmission.toFixed(2)} kg CO₂
          </p>

          <h5 className="fw-bold">
            Total: {result.total.toFixed(2)} kg CO₂
          </h5>

          <div className="progress mt-3" style={{ height: "18px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Math.round(percent)}%
            </div>
          </div>
        </div>
      )}
    </main>
  );
}