import PropTypes from 'prop-types';
import { Map, Search } from 'lucide-react';
import RecommendationCard from './RecommendationCard';

export default function RecommendationsList({ recommendations, planError, onAdd }) {
  return (
    <section>
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="itin-step-pill">STEP 2</span>
        <h4 className="eco-section-title">Green Recommendations</h4>
        {recommendations?.length > 0 && (
          <span className="itin-count">{recommendations.length} spots found</span>
        )}
      </div>

      {planError && <p className="text-danger small mb-3">{planError}</p>}

      {recommendations === null ? (
        <div className="itin-empty">
          <div className="mb-3 text-secondary"><Map size={40} strokeWidth={1.5} /></div>
          <p className="fw-bold mb-1 text-secondary">Ready to explore?</p>
          <p className="small text-muted mb-0">
            Fill in your preferences and click <strong>Find Spots</strong> to
            discover sustainable activities near your destination.
          </p>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="itin-empty itin-empty-warn">
          <div className="mb-3 text-warning"><Search size={40} strokeWidth={1.5} /></div>
          <p className="fw-bold mb-1 text-secondary">No matching spots found</p>
          <p className="small text-muted mb-0">
            Try different interests, a higher budget, or a different city.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {recommendations.map((item) => (
            <RecommendationCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}

RecommendationsList.propTypes = {
  recommendations: PropTypes.array,
  planError: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
