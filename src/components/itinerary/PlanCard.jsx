import PropTypes from 'prop-types';
import { MapPin, Wallet, Pencil, Trash2, Check, Sprout, Zap, AlertTriangle } from 'lucide-react';
import { CITY_LABELS } from '../../data/ecoOptions';

const IMPACT_CONFIG = {
  Low:    { bg: 'var(--impact-low-bg)',   color: 'var(--impact-low-text)', borderColor: 'var(--impact-low-border)', Icon: Sprout,        label: 'Low Impact' },
  Medium: { bg: 'var(--impact-med-bg)',   color: 'var(--impact-med-text)', borderColor: 'var(--impact-med-border)', Icon: Zap,           label: 'Medium Impact' },
  High:   { bg: 'var(--danger-bg-hover)', color: 'var(--danger-dark)',     borderColor: 'var(--danger-border)',     Icon: AlertTriangle,  label: 'High Impact' },
};

export default function PlanCard({ item, isEditing, editForm, onEdit, onSave, onCancel, onRemove, onEditChange }) {
  const cfg = IMPACT_CONFIG[item.impact];

  if (isEditing) {
    return (
      <div className="itin-plan-card itin-plan-card-edit">
        <div className="itin-plan-edit-body">
          <h6 className="itin-plan-name mb-2">{item.name}</h6>
          <div className="itin-edit-fields">
            <div className="itin-edit-field">
              <label className="itin-edit-label">Date</label>
              <input
                type="date"
                className="itin-edit-input"
                value={editForm.plannedDate}
                onChange={(e) => onEditChange('plannedDate', e.target.value)}
              />
            </div>
            <div className="itin-edit-field">
              <label className="itin-edit-label">Notes</label>
              <textarea
                className="itin-edit-textarea"
                rows={2}
                placeholder="Add notes..."
                value={editForm.notes}
                onChange={(e) => onEditChange('notes', e.target.value)}
              />
            </div>
          </div>
          <div className="itin-edit-actions">
            <button className="itin-edit-save" onClick={() => onSave(item.id, item.plannedDate)}>
              <Check size={13} strokeWidth={2.5} className="me-1" />Save
            </button>
            <button className="itin-edit-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="itin-plan-card">
      <div className="itin-plan-left">
        <h6 className="itin-plan-name">{item.name}</h6>
        <span className="itin-plan-city">
          <MapPin size={11} strokeWidth={2.5} className="me-1" />
          {CITY_LABELS[item.city] || item.city}
        </span>
        <span className="itin-plan-budget">
          <Wallet size={11} strokeWidth={2.5} className="me-1" />
          RM{item.budget}
        </span>
        {item.notes && <p className="itin-tl-notes">{item.notes}</p>}
      </div>
      <div className="itin-plan-right">
        <span
          className="itin-impact-tag sm"
          style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.borderColor }}
        >
          <cfg.Icon size={11} strokeWidth={2.5} />
          {cfg.label}
        </span>
        <button className="itin-edit-btn" onClick={() => onEdit(item)} aria-label="Edit stop">
          <Pencil size={13} strokeWidth={2.5} />
        </button>
        <button className="itin-del-btn" onClick={() => onRemove(item.id, item.plannedDate)} aria-label="Remove stop">
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
