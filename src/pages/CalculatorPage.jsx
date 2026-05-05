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

const TRANSPORT_OPTIONS = [
  { key: "flight", label: "Flight", icon: "✈" },
  { key: "car", label: "Car", icon: "🚗" },
  { key: "train", label: "Train", icon: "🚆" },
  { key: "bus", label: "Bus", icon: "🚌" },
];

const ACCOMMODATION_OPTIONS = [
  { key: "hotel", label: "Hotel", icon: "🏨" },
  { key: "ecolodge", label: "Eco-Lodge", icon: "🌿" },
  { key: "hostel", label: "Hostel", icon: "🏠" },
  { key: "camping", label: "Camping", icon: "⛺" },
];

// Impact logic
function impactLevel(total) {
  if (total < 50)
    return { label: "Low Impact 🌱", alertClass: "alert-success" };
  if (total < 150)
    return { label: "Moderate Impact 🌿", alertClass: "alert-warning" };
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
    const accommodationEmission =
      nts * ACCOMMODATION_FACTORS[accommodation];

    const total = transportEmission + accommodationEmission;

    setResult({ transportEmission, accommodationEmission, total });
  }

  // Derived values (SAFE)
  const percent = result
    ? Math.min((result.total / 200) * 100, 100)
    : 0;

  const impact = result ? impactLevel(result.total) : null;

  const isLowImpact = impact?.label.includes("Low Impact");

  const carbonCredits = result ? result.total / 1000 : 0;
  const CREDIT_PRICE = 10;

  const carbonCreditsFixed = carbonCredits.toFixed(2);
  const estimatedCostFixed = (carbonCredits * CREDIT_PRICE).toFixed(2);

  return (
    <main className="container my-5">
      {/* Title */}
      <div className="mb-4">
        <h1 className="fw-bold">Carbon Footprint Calculator</h1>
        <p className="text-muted">
          Estimate the impact of your travel plans.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleCalculate}>
        <div className="card shadow-sm p-4 rounded-4">
          {/* TRANSPORT */}
          <div className="mb-4">
            <h5 className="fw-semibold mb-3">Transportation</h5>

            <div className="row g-3 mb-3">
              {TRANSPORT_OPTIONS.map((option) => (
                <div className="col-md-3" key={option.key}>
                  <button
                    type="button"
                    className={`btn w-100 py-4 border rounded-3 ${
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

            <label className="form-label fw-semibold">
              Total Distance (km)
            </label>
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

          {/* ACCOMMODATION */}
          <div className="mb-4 mt-4">
            <h5 className="fw-semibold mb-3">Accommodation</h5>

            <div className="row g-3 mb-3">
              {ACCOMMODATION_OPTIONS.map((option) => (
                <div className="col-md-3" key={option.key}>
                  <button
                    type="button"
                    className={`btn w-100 py-4 border rounded-3 ${
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

            <label className="form-label fw-semibold">
              Number of Nights
            </label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="e.g. 5"
              min="0"
              value={nights}
              onChange={(e) => setNights(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <div className="d-grid mt-4">
            <button className="btn btn-dark btn-lg rounded-3">
              Calculate Emissions
            </button>
          </div>
        </div>
      </form>

      {/* RESULTS */}
      {result && (
        <>
          {/* RESULTS CARD */}
          <div className="card shadow-sm mt-4 p-4 rounded-4">
            <h4 className="fw-bold mb-3">Results</h4>

            <div className={`alert ${impact.alertClass}`}>
              <strong>{impact.label}</strong>
            </div>

            <p>
              <strong>Transport:</strong>{" "}
              {result.transportEmission.toFixed(2)} kg CO₂
            </p>

            <p>
              <strong>Accommodation:</strong>{" "}
              {result.accommodationEmission.toFixed(2)} kg CO₂
            </p>

            <h5 className="fw-bold">
              Total: {result.total.toFixed(2)} kg CO₂
            </h5>

            <div className="progress mt-3" style={{ height: "18px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${percent}%` }}
              >
                {Math.round(percent)}%
              </div>
            </div>
          </div>

          {/* OFFSET SECTION */}
          <div className="card shadow-sm mt-4 p-4 rounded-4">
            <h4 className="fw-bold mb-3">
              {isLowImpact ? "Great Job 🌱" : "Offset Suggestions"}
            </h4>

            {isLowImpact ? (
              <p className="mb-0">
                Your travel choices have a low environmental impact. Keep it
                up 🌿
              </p>
            ) : (
              <>
                <p className="mb-2">
                  To offset{" "}
                  <strong>{result.total.toFixed(2)} kg CO₂</strong>, you need
                  about <strong>{carbonCreditsFixed}</strong> carbon credits.
                </p>

                <p className="text-muted mb-3">
                  Estimated cost:{" "}
                  <strong>${estimatedCostFixed}</strong>
                </p>

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
                    className="btn btn-success"
                  >
                    Offset with Gold Standard
                  </a>

                  <a
                    href="https://unfccc.int/climate-action/climate-neutral-now"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-dark"
                  >
                    Learn more
                  </a>
                </div>

                <p className="text-muted small mt-3 mb-0">
                  *Estimate only. Prices vary by provider.
                </p>
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}