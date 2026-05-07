import PropTypes from 'prop-types';
import { MapPin, Wallet, Pencil, Trash2, Check, Sprout, Zap, AlertTriangle } from 'lucide-react';
import { CITY_LABELS } from '../../data/ecoOptions';

const IMPACT_CONFIG = {
  Low:    { bg: 'var(--impact-low-bg)',   color: 'var(--impact-low-text)', borderColor: 'var(--impact-low-border)', Icon: Sprout,       label: 'Low Impact' },
  Medium: { bg: 'var(--impact-med-bg)',   color: 'var(--impact-med-text)', borderColor: 'var(--impact-med-border)', Icon: Zap,          label: 'Medium Impact' },
  High:   { bg: 'var(--danger-bg-hover)', color: 'var(--danger-dark)',     borderColor: 'var(--danger-border)',     Icon: AlertTriangle, label: 'High Impact' },
};

export default function PlanCard({ item, isEditing, editForm, onEdit, onSave, onCancel, onRemove, onEditChange }) {
  const cfg = IMPACT_CONFIG[item.impact];

  if (isEditing) {
    return (
      <div className="p-3 bg-light">
        <h6 className="fw-bold mb-3" style={{ fontSize: '0.88rem', color: 'var(--gray-900)' }}>{item.name}</h6>
        <div className="d-flex flex-column gap-2 mb-3">
          <div>
            <label className="itin-label">Date</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={editForm.plannedDate}
              onChange={(e) => onEditChange('plannedDate', e.target.value)}
            />
          </div>
          <div>
            <label className="itin-label">Notes</label>
            <textarea
              className="form-control form-control-sm"
              rows={2}
              placeholder="Add notes..."
              value={editForm.notes}
              onChange={(e) => onEditChange('notes', e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success btn-sm fw-bold d-flex align-items-center" onClick={() => onSave(item.id, item.plannedDate)}>
            <Check size={13} strokeWidth={2.5} className="me-1" />Save
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-start justify-content-between gap-3 p-3 border-bottom">
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <h6 className="fw-bold mb-1" style={{ fontSize: '0.88rem', color: 'var(--gray-900)' }}>{item.name}</h6>
        <div className="small text-muted d-flex align-items-center mb-1">
          <MapPin size={11} strokeWidth={2.5} className="me-1" />
          {CITY_LABELS[item.city] || item.city}
        </div>
        <div className="small fw-bold text-success d-flex align-items-center mb-1">
          <Wallet size={11} strokeWidth={2.5} className="me-1" />
          RM{item.budget}
        </div>
        {item.notes && <p className="small fst-italic text-muted mb-0">{item.notes}</p>}
      </div>
      <div className="d-flex align-items-center gap-2 flex-shrink-0">
        <span
          className="itin-impact-tag sm"
          style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.borderColor }}
        >
          <cfg.Icon size={11} strokeWidth={2.5} />
          {cfg.label}
        </span>
        <button
          className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
          style={{ width: 30, height: 30 }}
          onClick={() => onEdit(item)}
          aria-label="Edit stop"
        >
          <Pencil size={13} strokeWidth={2.5} />
        </button>
        <button
          className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center p-0"
          style={{ width: 30, height: 30 }}
          onClick={() => onRemove(item.id, item.plannedDate)}
          aria-label="Remove stop"
        >
          <Trash2 size={13} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

PlanCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    impact: PropTypes.string.isRequired,
    plannedDate: PropTypes.string.isRequired,
    notes: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  editForm: PropTypes.shape({
    notes: PropTypes.string.isRequired,
    plannedDate: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEditChange: PropTypes.func.isRequired,
};
