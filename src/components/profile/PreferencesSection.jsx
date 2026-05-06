import { useState } from 'react';
import PCard from './PCard';
import Toggle from './Toggle';
import CustomSelect from './CustomSelect';

const TRANSPORT_MODES = [
  'Train (recommended)',
  'Bus',
  'Car',
  'Flight',
];

const NOTIF_ITEMS = [
  { id: 'emailNotif',    label: 'Email notifications', desc: 'Trip updates, account alerts, and weekly summaries.',     icon: 'bi-envelope', defaultOn: true  },
  { id: 'tripReminders', label: 'Trip reminders',       desc: 'Get notified 7 days before each planned trip.',           icon: 'bi-bell',     defaultOn: true  },
  { id: 'ecoTips',       label: 'Weekly Eco Tips',      desc: 'Actionable sustainability advice for your travel style.', icon: 'bi-tree',     defaultOn: false },
];

export default function PreferencesSection() {
  const [notifs, setNotifs] = useState(
    Object.fromEntries(NOTIF_ITEMS.map(n => [n.id, n.defaultOn]))
  );
  const [unit,      setUnit]      = useState('km');
  const [budget,    setBudget]    = useState('200');
  const [transport, setTransport] = useState(TRANSPORT_MODES[0]);
  const [saved,     setSaved]     = useState(false);

  function handleSavePrefs(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="vstack gap-3">
      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Notifications</h3>
        <p className="text-muted small mb-3">Choose which emails and alerts you&apos;d like to receive.</p>
        <div className="ps-notif-list">
          {NOTIF_ITEMS.map(({ id, label, desc, icon }) => (
            <div key={id} className="ps-notif-row">
              <div className="ps-notif-icon"><i className={`bi ${icon}`} /></div>
              <div className="ps-notif-text">
                <div className="ps-notif-label">{label}</div>
                <div className="ps-notif-desc">{desc}</div>
              </div>
              <Toggle checked={notifs[id]} onChange={val => setNotifs(prev => ({ ...prev, [id]: val }))} />
            </div>
          ))}
        </div>
      </PCard>

      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Measurement Units</h3>
        <p className="text-muted small mb-3">Choose your preferred units for distance and carbon output.</p>
        <div className="ps-unit-row">
          <button type="button" className={`ps-unit-btn${unit === 'km' ? ' ps-unit-btn--active' : ''}`} onClick={() => setUnit('km')}>Kilometres (km)</button>
          <button type="button" className={`ps-unit-btn${unit === 'mi' ? ' ps-unit-btn--active' : ''}`} onClick={() => setUnit('mi')}>Miles (mi)</button>
        </div>
      </PCard>

      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Eco Goals</h3>
        <p className="text-muted small mb-3">Set personal sustainability targets for your travel.</p>
        <form onSubmit={handleSavePrefs} className="vstack gap-3">
          <div>
            <label className="form-label label-caps" htmlFor="budget">MONTHLY CO₂ BUDGET</label>
            <div className="position-relative">
              <input
                type="number"
                id="budget"
                className="form-control ps-input--with-suffix"
                min="0"
                value={budget}
                onChange={e => setBudget(e.target.value)}
              />
              <span className="ps-input__suffix">kg CO₂</span>
            </div>
            <div className="form-text">We&apos;ll alert you when planned trips approach this limit.</div>
          </div>
          <div>
            <label className="form-label label-caps" htmlFor="transport">DEFAULT TRANSPORT MODE</label>
            <CustomSelect id="transport" value={transport} options={TRANSPORT_MODES} onChange={val => setTransport(val)} />
          </div>
          <div className="d-flex gap-2 mt-1">
            <button type="submit" className="btn-eco-dark">{saved ? 'Saved!' : 'Save Preferences'}</button>
          </div>
        </form>
      </PCard>
    </div>
  );
}
