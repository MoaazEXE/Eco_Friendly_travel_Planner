import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PCard from './PCard';
import Toggle from './Toggle';
import CustomSelect from './CustomSelect';
import { updateProfile } from '../../api/profile';

const TRANSPORT_MODES = [
  'Train (recommended)',
  'Bus',
  'Car',
  'Flight',
];

const NOTIF_ITEMS = [
  { id: 'emailNotif',    label: 'Email notifications', desc: 'Trip updates, account alerts, and weekly summaries.',     icon: 'bi-envelope' },
  { id: 'tripReminders', label: 'Trip reminders',       desc: 'Get notified 7 days before each planned trip.',           icon: 'bi-bell'     },
  { id: 'ecoTips',       label: 'Weekly Eco Tips',      desc: 'Actionable sustainability advice for your travel style.', icon: 'bi-tree'     },
];

export default function PreferencesSection({ profile, onSave }) {
  const prefs = profile.preferences;

  const [notifs, setNotifs] = useState({
    emailNotif:    prefs?.notifications?.emailNotif    ?? true,
    tripReminders: prefs?.notifications?.tripReminders ?? true,
    ecoTips:       prefs?.notifications?.ecoTips       ?? false,
  });
  const [unit,      setUnit]      = useState(prefs?.units     || 'km');
  const [budget,    setBudget]    = useState(String(prefs?.co2Budget ?? 200));
  const [transport, setTransport] = useState(prefs?.transport || TRANSPORT_MODES[0]);

  const [saved,     setSaved]     = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState('');

  // Re-sync if profile prop is refreshed from above
  useEffect(() => {
    const p = profile.preferences;
    setNotifs({
      emailNotif:    p?.notifications?.emailNotif    ?? true,
      tripReminders: p?.notifications?.tripReminders ?? true,
      ecoTips:       p?.notifications?.ecoTips       ?? false,
    });
    setUnit(p?.units || 'km');
    setBudget(String(p?.co2Budget ?? 200));
    setTransport(p?.transport || TRANSPORT_MODES[0]);
  }, [profile]);

  async function handleSave(e) {
    e.preventDefault();

    const budgetNum = Number(budget);
    if (isNaN(budgetNum) || budgetNum < 0) {
      setSaveError('CO₂ budget must be a non-negative number.');
      return;
    }

    setSaving(true);
    setSaveError('');
    try {
      const updated = await updateProfile({
        preferences: {
          units:     unit,
          co2Budget: budgetNum,
          transport,
          notifications: {
            emailNotif:    notifs.emailNotif,
            tripReminders: notifs.tripReminders,
            ecoTips:       notifs.ecoTips,
          },
        },
      });
      onSave(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError(err.message || 'Failed to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="vstack gap-3">

      {/* Notifications */}
      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Notifications</h3>
        <p className="text-muted small mb-3">Choose which emails and alerts you&apos;d like to receive.</p>
        <div className="d-flex flex-column">
          {NOTIF_ITEMS.map(({ id, label, desc, icon }) => (
            <div key={id} className="d-flex align-items-center gap-3 py-3 border-bottom">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{ width: '36px', height: '36px', background: 'var(--gray-100)', color: 'var(--gray-500)' }}
              >
                <i className={`bi ${icon}`} />
              </div>
              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <div className="fw-semibold small text-dark">{label}</div>
                <div className="text-muted small">{desc}</div>
              </div>
              <Toggle
                checked={notifs[id]}
                onChange={val => setNotifs(prev => ({ ...prev, [id]: val }))}
              />
            </div>
          ))}
        </div>
      </PCard>

      {/* Measurement Units */}
      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Measurement Units</h3>
        <p className="text-muted small mb-3">Choose your preferred units for distance and carbon output.</p>
        <div className="row g-3">
          <div className="col-6">
            <button
              type="button"
              className={`btn w-100 ${unit === 'km' ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => setUnit('km')}
            >
              Kilometres (km)
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className={`btn w-100 ${unit === 'mi' ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => setUnit('mi')}
            >
              Miles (mi)
            </button>
          </div>
        </div>
      </PCard>

      {/* Eco Goals */}
      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Eco Goals</h3>
        <p className="text-muted small mb-3">Set personal sustainability targets for your travel.</p>
        <div className="vstack gap-3">
          <div>
            <label className="form-label label-caps" htmlFor="budget">MONTHLY CO₂ BUDGET</label>
            <div className="position-relative">
              <input
                type="number"
                id="budget"
                className="form-control ps-input--with-suffix"
                min="0"
                value={budget}
                onChange={e => { setBudget(e.target.value); if (saveError) setSaveError(''); }}
              />
              <span className="ps-input__suffix">kg CO₂</span>
            </div>
            <div className="form-text">We&apos;ll alert you when planned trips approach this limit.</div>
          </div>
          <div>
            <label className="form-label label-caps" htmlFor="transport">DEFAULT TRANSPORT MODE</label>
            <CustomSelect
              id="transport"
              value={transport}
              options={TRANSPORT_MODES}
              onChange={val => setTransport(val)}
            />
          </div>
        </div>
      </PCard>

      {saveError && <p className="text-danger small mb-0">{saveError}</p>}

      <div className="d-flex gap-2">
        <button type="submit" className="btn-eco-dark" disabled={saving}>
          {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Preferences'}
        </button>
      </div>

    </form>
  );
}

PreferencesSection.propTypes = {
  profile: PropTypes.shape({
    preferences: PropTypes.shape({
      units:     PropTypes.string,
      co2Budget: PropTypes.number,
      transport: PropTypes.string,
      notifications: PropTypes.shape({
        emailNotif:    PropTypes.bool,
        tripReminders: PropTypes.bool,
        ecoTips:       PropTypes.bool,
      }),
    }),
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};
