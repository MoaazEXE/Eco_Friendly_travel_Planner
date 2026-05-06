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
    <div className="itin-form-card mb-5">
      <div className="itin-form-head">
        <span className="itin-step-pill">STEP 1</span>
        <h4 className="itin-form-heading">
          <ListChecks size={17} strokeWidth={2.5} className="me-2" />
          Plan a New Stop
        </h4>
      </div>

      <form onSubmit={onSubmit} noValidate className="itin-form-body">

        {/* Row 1: Primary fields */}
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="itin-label">Destination City</label>
            <div className="itin-input-wrap">
              <MapPin size={14} className="itin-icon" strokeWidth={2.5} />
              <input
                type="text"
                className="itin-input"
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
                className="itin-input"
                value={form.travelDate}
                onChange={(e) => onFormChange('travelDate', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="itin-label">Notes for your itinerary</label>
            <textarea
              className="itin-textarea"
              placeholder="e.g. bring reusables, check opening hours, book in advance..."
              rows={2}
              value={form.notes}
              onChange={(e) => onFormChange('notes', e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Filters + Submit */}
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="itin-label">Interests</label>
            <div className="itin-pills">
              {INTERESTS.map(({ value, label, Icon }) => (
                <button
                  type="button"
                  key={value}
                  className={`itin-pill${form.interests.includes(value) ? ' active' : ''}`}
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
              <span className="itin-budget-display">RM {form.budget}</span>
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
            <div className="itin-range-ends">
              <span>Budget</span>
              <span>Luxury</span>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-end">
            <button type="submit" className="itin-find-btn">
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
