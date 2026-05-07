import PropTypes from 'prop-types';
import {
  Leaf, Palette, UtensilsCrossed, Bike,
  MapPin, Calendar, Search, ListChecks,
} from 'lucide-react';

const INTERESTS = [
  { value: 'nature',  label: 'Nature',  Icon: Leaf },
  { value: 'culture', label: 'Culture', Icon: Palette },
  { value: 'food',    label: 'Food',    Icon: UtensilsCrossed },
  { value: 'cycling', label: 'Cycling', Icon: Bike },
];

export default function ItineraryForm({ form, onFormChange, onToggleInterest, onBudgetChange, onSubmit }) {
  return (
    <div className="card-eco mb-5">
      <div className="px-4 pt-4 pb-3 border-bottom">
        <span className="itin-step-pill">STEP 1</span>
        <h4 className="eco-section-title d-flex align-items-center mt-1">
          <ListChecks size={17} strokeWidth={2.5} className="me-2" />
          Plan a New Stop
        </h4>
      </div>

      <form onSubmit={onSubmit} noValidate className="p-4">

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="itin-label">Destination City</label>
            <div className="itin-input-wrap">
              <MapPin size={14} className="itin-icon" strokeWidth={2.5} />
              <input
                type="text"
                className="form-control itin-input-icon"
                placeholder="e.g. KL, Penang, Melaka, Sabah"
                value={form.destination}
                onChange={(e) => onFormChange('destination', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="itin-label">Date of Visit</label>
            <div className="itin-input-wrap">
              <Calendar size={14} className="itin-icon" strokeWidth={2.5} />
              <input
                type="date"
                className="form-control itin-input-icon"
                value={form.travelDate}
                onChange={(e) => onFormChange('travelDate', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="itin-label">Notes for your itinerary</label>
            <textarea
              className="form-control"
              placeholder="e.g. bring reusables, check opening hours, book in advance..."
              rows={2}
              value={form.notes}
              onChange={(e) => onFormChange('notes', e.target.value)}
            />
          </div>
        </div>

        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="itin-label">Interests</label>
            <div className="d-flex flex-wrap gap-2">
              {INTERESTS.map(({ value, label, Icon }) => (
                <button
                  type="button"
                  key={value}
                  className={`btn btn-sm ${form.interests.includes(value) ? 'btn-success' : 'btn-outline-secondary'}`}
                  onClick={() => onToggleInterest(value)}
                >
                  <Icon size={13} strokeWidth={2.5} className="me-1" />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <label className="itin-label">
              Budget / Day
              <span className="text-success fw-bold" style={{ textTransform: 'none', letterSpacing: 0, fontSize: '0.85rem' }}>
                RM {form.budget}
              </span>
            </label>
            <input
              type="range"
              className="itin-range"
              min="0"
              max="1000"
              step="10"
              value={form.budget}
              onChange={onBudgetChange}
              style={{ '--slider-fill': `${(form.budget / 1000) * 100}%` }}
            />
            <div className="d-flex justify-content-between small text-muted mt-1">
              <span>Budget</span>
              <span>Luxury</span>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-end">
            <button type="submit" className="btn btn-dark fw-bold d-flex align-items-center">
              <Search size={14} strokeWidth={2.5} className="me-2" />
              Find Spots
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}

ItineraryForm.propTypes = {
  form: PropTypes.shape({
    destination: PropTypes.string.isRequired,
    travelDate: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    budget: PropTypes.number.isRequired,
  }).isRequired,
  onFormChange: PropTypes.func.isRequired,
  onToggleInterest: PropTypes.func.isRequired,
  onBudgetChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
