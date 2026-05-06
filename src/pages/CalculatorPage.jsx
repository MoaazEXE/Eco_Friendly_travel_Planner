import { useState } from "react";
import { Plane, Car, Train, Bus, Hotel, Leaf, Home, Tent } from "lucide-react";
import { TRANSPORT_FACTORS, ACCOMMODATION_FACTORS } from "../constants/calculatorConfig";
import OptionSelector from "../components/calculator/OptionSelector";
import CalculationResults from "../components/calculator/CalculationResults";
import "../styles/calculator.css";

const TRANSPORT_OPTIONS = [
  { key: "flight",  label: "Flight",    icon: Plane },
  { key: "car",     label: "Car",       icon: Car   },
  { key: "train",   label: "Train",     icon: Train },
  { key: "bus",     label: "Bus",       icon: Bus   },
];

const ACCOMMODATION_OPTIONS = [
  { key: "hotel",    label: "Hotel",     icon: Hotel },
  { key: "ecolodge", label: "Eco-Lodge", icon: Leaf  },
  { key: "hostel",   label: "Hostel",    icon: Home  },
  { key: "camping",  label: "Camping",   icon: Tent  },
];

export default function CalculatorPage() {
  const [form, setForm] = useState({
    transport:     "flight",
    distance:      "",
    accommodation: "hotel",
    nights:        "",
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

  return (
    <main className="eco-inner-page">
      <div className="container">
        <div className="mb-4">
          <h1 className="eco-page-title">Carbon Footprint Calculator</h1>
          <p className="eco-lead">Estimate the environmental impact of your travel plans.</p>
        </div>

        <form onSubmit={handleCalculate}>
          <div className="card-eco p-4">
            <h5 className="eco-section-title mb-3">Transportation</h5>
            <OptionSelector
              options={TRANSPORT_OPTIONS}
              selected={form.transport}
              onChange={(key) => setForm((f) => ({ ...f, transport: key }))}
            />
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

            <h5 className="eco-section-title mb-3 mt-4">Accommodation</h5>
            <OptionSelector
              options={ACCOMMODATION_OPTIONS}
              selected={form.accommodation}
              onChange={(key) => setForm((f) => ({ ...f, accommodation: key }))}
            />
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

        <CalculationResults result={result} />
      </div>
    </main>
  );
}
