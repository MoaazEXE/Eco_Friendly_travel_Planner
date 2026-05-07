import PropTypes from "prop-types";
import { Leaf, Flame, Sprout } from "lucide-react";
import { CREDIT_PRICE } from "../../constants/calculatorConfig";

function impactLevel(total) {
  if (total < 50)  return { level: "Low Impact",      icon: Sprout, alertClass: "alert-success" };
  if (total < 150) return { level: "Moderate Impact", icon: Leaf,   alertClass: "alert-warning" };
  return               { level: "High Impact",      icon: Flame,  alertClass: "alert-danger"  };
}

export default function CalculationResults({ result }) {
  if (!result) return null;

  const { transportEmission, accommodationEmission, total } = result;
  const percent          = Math.min((total / 200) * 100, 100);
  const impact           = impactLevel(total);
  const isLowImpact      = impact.level.includes("Low Impact");
  const carbonCredits    = total / 1000;
  const carbonCreditsFixed  = carbonCredits.toFixed(2);
  const estimatedCostFixed  = (carbonCredits * CREDIT_PRICE).toFixed(2);

  return (
    <>
      <div className="card-eco mt-4 p-4">
        <h4 className="eco-page-title mb-3">Results</h4>
        <div className={`alert ${impact.alertClass}`}>
          <impact.icon size={20} className="me-2" style={{ display: "inline-block", verticalAlign: "middle" }} />
          <strong style={{ display: "inline-block", verticalAlign: "middle" }}>{impact.level}</strong>
        </div>
        <p><strong>Transport:</strong> {transportEmission.toFixed(2)} kg CO₂</p>
        <p><strong>Accommodation:</strong> {accommodationEmission.toFixed(2)} kg CO₂</p>
        <h5 className="fw-bold">Total: {total.toFixed(2)} kg CO₂</h5>
        <div className="progress mt-3 calc-progress">
          <div className="progress-bar bg-success" style={{ width: `${percent}%` }}>
            {Math.round(percent)}%
          </div>
        </div>
      </div>

      <div className="card-eco mt-4 p-4">
        {isLowImpact ? (
          <>
            <h4 className="eco-page-title mb-3">
              <Sprout size={24} className="me-2" style={{ display: "inline", verticalAlign: "middle" }} />
              Great Job
            </h4>
            <p className="eco-lead">
              <Leaf size={20} className="me-2" style={{ display: "inline", verticalAlign: "middle" }} />
              Your travel choices have a low environmental impact. Keep it up
            </p>
          </>
        ) : (
          <>
            <h4 className="eco-page-title mb-3">Offset Suggestions</h4>
            <p className="mb-2">
              To offset <strong>{total.toFixed(2)} kg CO₂</strong>, you need about{" "}
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
                className="btn-eco-dark"
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
  );
}

CalculationResults.propTypes = {
  result: PropTypes.shape({
    transportEmission:     PropTypes.number.isRequired,
    accommodationEmission: PropTypes.number.isRequired,
    total:                 PropTypes.number.isRequired,
  }),
};
