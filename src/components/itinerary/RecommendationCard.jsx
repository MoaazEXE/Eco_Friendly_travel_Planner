import PropTypes from 'prop-types';
import { Plus, Leaf, Wallet, Sprout, Zap, AlertTriangle } from 'lucide-react';
import { capitalize } from '../../utils/capitalize';

const IMPACT_CONFIG = {
  Low:    { bg: 'var(--impact-low-bg)',   color: 'var(--impact-low-text)', borderColor: 'var(--impact-low-border)', Icon: Sprout,       label: 'Low Impact' },
  Medium: { bg: 'var(--impact-med-bg)',   color: 'var(--impact-med-text)', borderColor: 'var(--impact-med-border)', Icon: Zap,          label: 'Medium Impact' },
  High:   { bg: 'var(--danger-bg-hover)', color: 'var(--danger-dark)',     borderColor: 'var(--danger-border)',     Icon: AlertTriangle, label: 'High Impact' },
};

export default function RecommendationCard({ item, onAdd }) {
  const cfg = IMPACT_CONFIG[item.impact];

  return (
    <div className="card-eco itin-rec-card p-3" style={{ borderLeft: `5px solid ${cfg.borderColor}` }}>
      <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
        <div>
          <h5 className="fw-bold mb-1" style={{ fontSize: '1rem', color: 'var(--gray-900)' }}>{item.name}</h5>
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <span className="badge bg-light text-secondary fw-bold">
              <Wallet size={12} strokeWidth={2.5} className="me-1" />
              RM{item.budget}
            </span>
            <span className="badge bg-light text-secondary">{capitalize(item.type)}</span>
            <span
              className="itin-impact-tag sm"
              style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.borderColor }}
            >
              <cfg.Icon size={11} strokeWidth={2.5} />
              {cfg.label}
            </span>
          </div>
        </div>
        <button
          className="btn btn-success btn-sm fw-bold d-flex align-items-center flex-shrink-0"
          onClick={() => onAdd(item.id)}
        >
          <Plus size={14} strokeWidth={2.5} className="me-1" />
          Add to My Plan
        </button>
      </div>
      <p className="text-muted small mb-2" style={{ lineHeight: 1.55 }}>{item.desc}</p>
      <div className="itin-impact-note d-flex align-items-start gap-1">
        <Leaf size={13} strokeWidth={2.5} className="flex-shrink-0 mt-1" />
        {item.impactNote}
      </div>
    </div>
  );
}

RecommendationCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    impact: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    impactNote: PropTypes.string.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};
