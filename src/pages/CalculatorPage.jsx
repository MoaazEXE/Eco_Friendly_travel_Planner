import { useState } from "react";
import {
  TRANSPORT_FACTORS,
  ACCOMMODATION_FACTORS,
  CREDIT_PRICE,
} from "../constants/calculatorConfig";
import "../styles/calculator.css";

const TRANSPORT_OPTIONS = [
  { key: "flight", label: "Flight", icon: "✈" },
  { key: "car",    label: "Car",    icon: "🚗" },
  { key: "train",  label: "Train",  icon: "🚆" },
  { key: "bus",    label: "Bus",    icon: "🚌" },
];

const ACCOMMODATION_OPTIONS = [
  { key: "hotel",    label: "Hotel",    icon: "🏨" },
  { key: "ecolodge", label: "Eco-Lodge", icon: "🌿" },
  { key: "hostel",   label: "Hostel",   icon: "🏠" },
  { key: "camping",  label: "Camping",  icon: "⛺" },
];

function impactLevel(total) {
  if (total < 50)  return { label: "Low Impact 🌱",      alertClass: "alert-success" };
  if (total < 150) return { label: "Moderate Impact 🌿", alertClass: "alert-warning" };
  return               { label: "High Impact 🔥",        alertClass: "alert-danger"  };
}

export default function CalculatorPage() {
  const [form, setForm] = useState({
    transport: "flight",
    distance: "",
    accommodation: "hotel",
    nights: "",
  });
  const [result, setResult] = useState(null);

  function handleCalculate(e) {
    e.preventDefault();
    const km  = parseFloat(form.distance) || 0;
    const nts = parseInt(form.nights, 10) || 0;
    const transportEmission     = km  * TRANSPORT_FACTORS[form.transport];
    const accommodationEmission = nts * ACCOMMODATION_FACTORS[form.accommodation];
    setResult({ transportEmission, accommodationEmission, total: transportEmission + accommodationEmission });
  }

  const percent = result ? Math.min((result.total / 200) * 100, 100) : 0;
  const impact  = result ? impactLevel(result.total) : null;
  const isLowImpact      = impact?.label.includes("Low Impact");
  const carbonCredits    = result ? result.total / 1000 : 0;
  const carbonCreditsFixed  = carbonCredits.toFixed(2);
  const estimatedCostFixed  = (carbonCredits * CREDIT_PRICE).toFixed(2);

  return (
    <main className="eco-inner-page">
      <div className="container">

        {/* Title */}
        <div className="mb-4">
          <h1 className="eco-page-title">Carbon Footprint Calculator</h1>
          <p className="eco-lead">Estimate the environmental impact of your travel plans.</p>
        </div>

        {/* Form card */}
        <form onSubmit={handleCalculate}>
          <div className="card-eco p-4">

            {/* Transport */}
            <h5 className="eco-section-title mb-3">Transportation</h5>
            <div className="row g-3 mb-3">
              {TRANSPORT_OPTIONS.map((opt) => (
                <div className="col-6 col-md-3" key={opt.key}>
                  <button
                    type="button"
                    className={`btn-eco-selector${form.transport === opt.key ? " active" : ""}`}
                    onClick={() => setForm((f) => ({ ...f, transport: opt.key }))}
                  >
                    {opt.icon} {opt.label}
                  </button>
                </div>
              ))}
            </div>
            <label className="form-label fw-semibold">Total Distance (km)</label>
            <input
              type="number"
              className="form-control form-control-lg mb-4"
              placeholder="e.g. 1000"
              min="0"
              value={form.distance}
              onChange={(e) => setForm((f) => ({ ...f, distance: e.target.value }))}
            />

            <hr />

            {/* Accommodation */}
            <h5 className="eco-section-title mb-3 mt-4">Accommodation</h5>
            <div className="row g-3 mb-3">
              {ACCOMMODATION_OPTIONS.map((opt) => (
                <div className="col-6 col-md-3" key={opt.key}>
                  <button
                    type="button"
                    className={`btn-eco-selector${form.accommodation === opt.key ? " active" : ""}`}
                    onClick={() => setForm((f) => ({ ...f, accommodation: opt.key }))}
                  >
                    {opt.icon} {opt.label}
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
              value={form.nights}
              onChange={(e) => setForm((f) => ({ ...f, nights: e.target.value }))}
            />

            <div className="d-grid mt-4">
              <button type="submit" className="btn-eco-dark">
                Calculate Emissions
              </button>
            </div>
          </div>
        </form>

        {/* Results */}
        {result && (
          <>
            <div className="card-eco mt-4 p-4">
              <h4 className="eco-page-title mb-3">Results</h4>
              <div className={`alert ${impact.alertClass}`}>
                <strong>{impact.label}</strong>
              </div>
              <p><strong>Transport:</strong> {result.transportEmission.toFixed(2)} kg CO₂</p>
              <p><strong>Accommodation:</strong> {result.accommodationEmission.toFixed(2)} kg CO₂</p>
              <h5 className="fw-bold">Total: {result.total.toFixed(2)} kg CO₂</h5>
              <div className="progress mt-3 calc-progress">
                <div className="progress-bar bg-success" style={{ width: `${percent}%` }}>
                  {Math.round(percent)}%
                </div>
              </div>
            </div>

            <div className="card-eco mt-4 p-4">
              <h4 className="eco-page-title mb-3">
                {isLowImpact ? "Great Job 🌱" : "Offset Suggestions"}
              </h4>
              {isLowImpact ? (
                <p className="eco-lead">Your travel choices have a low environmental impact. Keep it up 🌿</p>
              ) : (
                <>
                  <p className="mb-2">
                    To offset <strong>{result.total.toFixed(2)} kg CO₂</strong>, you need about{" "}
                    <strong>{carbonCreditsFixed}</strong> carbon credits.
                  </p>
                  <p className="eco-lead mb-3">Estimated cost: <strong>${estimatedCostFixed}</strong></p>
                  <ul className="mb-3">
                    <li>Use train or bus instead of flights.</li>
                    <li>Choose eco-friendly accommodation.</li>
                    <li>Offset emissions with certified credits.</li>
                  </ul>
                  <div className="d-flex gap-2 flex-wrap">
                    <a
                      href="https://www.goldstandard.org/take-action/offset-your-emissions"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-eco-dark calc-link-btn"
                    >
                      Offset with Gold Standard
                    </a>
                    <a
                      href="https://unfccc.int/climate-action/climate-neutral-now"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-eco-outline"
                    >
                      Learn more
                    </a>
                  </div>
                  <p className="eco-lead small mt-3 mb-0">*Estimate only. Prices vary by provider.</p>
                </>
              )}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
