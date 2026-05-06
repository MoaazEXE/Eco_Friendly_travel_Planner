import PropTypes from 'prop-types';
import { Plus, Leaf, Wallet, Sprout, Zap, AlertTriangle } from 'lucide-react';
import { capitalize } from '../../utils/capitalize';

const IMPACT_CONFIG = {
  Low:    { bg: 'var(--impact-low-bg)',   color: 'var(--impact-low-text)', borderColor: 'var(--impact-low-border)', Icon: Sprout,        label: 'Low Impact' },
  Medium: { bg: 'var(--impact-med-bg)',   color: 'var(--impact-med-text)', borderColor: 'var(--impact-med-border)', Icon: Zap,           label: 'Medium Impact' },
  High:   { bg: 'var(--danger-bg-hover)', color: 'var(--danger-dark)',     borderColor: 'var(--danger-border)',     Icon: AlertTriangle,  label: 'High Impact' },
};

export default function RecommendationCard({ item, onAdd }) {
  const cfg = IMPACT_CONFIG[item.impact];

  return (
    <div className="itin-rec-card" style={{ borderLeftColor: cfg.borderColor }}>
      <div className="itin-rec-top">
        <div>
          <h5 className="itin-rec-name">{item.name}</h5>
          <div className="itin-tags">
            <span className="itin-tag itin-budget-badge">
              <Wallet size={12} strokeWidth={2.5} className="me-1" />
              RM{item.budget}
            </span>
            <span className="itin-tag">{capitalize(item.type)}</span>
            <span
              className="itin-impact-tag sm"
              style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.borderColor }}
            >
              <cfg.Icon size={11} strokeWidth={2.5} />
              {cfg.label}
            </span>
          </div>
        </div>
        <button className="itin-add-btn" onClick={() => onAdd(item.id)}>
          <Plus size={14} strokeWidth={2.5} className="me-1" />
          Add to My Plan
        </button>
      </div>
      <p className="itin-rec-desc">{item.desc}</p>
      <div className="itin-impact-note">
        <Leaf size={13} strokeWidth={2.5} className="me-1" />
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
