import { useState, useRef, useEffect } from 'react';
import { getProfile } from '../api/profile';
import '../styles/profile.css';

// ── Constants ──────────────────────────────────────────────────────────────────

const TRAVEL_STYLES = [
  'Slow Travel & Nature',
  'City Explorer',
  'Backpacker',
  'Luxury Eco Travel',
  'Family Travel',
];

const TRANSPORT_MODES = [
  'Train (recommended)',
  'Bus',
  'Car',
  'Flight',
];

const SECTIONS = [
  { id: 'personal', label: 'Personal Info',  icon: 'bi-person',               danger: false },
  { id: 'security', label: 'Security',        icon: 'bi-shield',               danger: false },
  { id: 'prefs',    label: 'Preferences',     icon: 'bi-sliders',              danger: false },
  { id: 'delete',   label: 'Delete Account',  icon: 'bi-exclamation-triangle', danger: true  },
];

const SECTION_META = {
  personal: { title: 'Personal Info',  desc: 'Update your personal details and travel preferences.' },
  security: { title: 'Security',       desc: 'Manage your password and connected sign-in accounts.' },
  prefs:    { title: 'Preferences',    desc: 'Customise notifications, units, and eco travel goals.' },
  delete:   { title: 'Delete Account', desc: 'Permanently remove your account and all associated data.' },
};

const NOTIF_ITEMS = [
  { id: 'emailNotif',    label: 'Email notifications', desc: 'Trip updates, account alerts, and weekly summaries.',     icon: 'bi-envelope', defaultOn: true  },
  { id: 'tripReminders', label: 'Trip reminders',       desc: 'Get notified 7 days before each planned trip.',           icon: 'bi-bell',     defaultOn: true  },
  { id: 'ecoTips',       label: 'Weekly Eco Tips',      desc: 'Actionable sustainability advice for your travel style.', icon: 'bi-tree',     defaultOn: false },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function getInitials(fullName) {
  const parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function splitName(fullName) {
  const parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
  return { firstName: parts[0] || '', lastName: parts.slice(1).join(' ') };
}

// ── Toggle switch ──────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`ps-toggle${checked ? ' ps-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="ps-toggle__knob" />
    </button>
  );
}

// ── Password input with show/hide ──────────────────────────────────────────────

function PasswordInput({ id, name, label, value, onChange, hint, autoComplete = 'off' }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="form-label label-caps" htmlFor={id}>{label}</label>
      <div className="position-relative">
        <input
          type={show ? 'text' : 'password'}
          id={id}
          name={name}
          className="form-control"
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="ps-input__eye"
          onClick={() => setShow(s => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <i className={`bi ${show ? 'bi-eye-slash' : 'bi-eye'}`} />
        </button>
      </div>
      {hint && <div className="form-text">{hint}</div>}
    </div>
  );
}

// ── Card wrapper ───────────────────────────────────────────────────────────────

function PCard({ children, className }) {
  return (
    <div className={['card border', className].filter(Boolean).join(' ')}>
      <div className="card-body p-4">
        {children}
      </div>
    </div>
  );
}

// ── Custom dropdown (profile-only) ─────────────────────────────────────────────

function CustomSelect({ id, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="ps-custom-select" ref={wrapRef}>
      <button
        type="button"
        id={id}
        className={`ps-cs-trigger${open ? ' ps-cs-trigger--open' : ''}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(o => !o)}
      >
        <span className="ps-cs-trigger__text">{value}</span>
        <i className={`bi bi-chevron-down ps-cs-chevron${open ? ' ps-cs-chevron--up' : ''}`} />
      </button>
      {open && (
        <ul className="ps-cs-menu" role="listbox">
          {options.map(opt => {
            const selected = opt === value;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                className={`ps-cs-option${selected ? ' ps-cs-option--selected' : ''}`}
                onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}
              >
                <span>{opt}</span>
                {selected && <i className="bi bi-check ps-cs-check" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Personal Info section ──────────────────────────────────────────────────────

function PersonalInfoSection({ profile, avatarSrc, onAvatarChange, onSave }) {
  const { firstName: initFirst, lastName: initLast } = splitName(profile.fullName);
  const [form, setForm] = useState({
    firstName:   initFirst,
    lastName:    initLast,
    location:    profile.location || '',
    bio:         profile.bio || '',
    travelStyle: TRAVEL_STYLES[0],
  });
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    const { firstName, lastName } = splitName(profile.fullName);
    setForm(prev => ({ ...prev, firstName, lastName, location: profile.location || '', bio: profile.bio || '' }));
  }, [profile]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave(e) {
    e.preventDefault();
    onSave({
      ...profile,
      fullName: [form.firstName.trim(), form.lastName.trim()].filter(Boolean).join(' '),
      location: form.location.trim(),
      bio:      form.bio.trim(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleDiscard() {
    const { firstName, lastName } = splitName(profile.fullName);
    setForm(prev => ({ ...prev, firstName, lastName, location: profile.location || '', bio: profile.bio || '' }));
  }

  const initials = getInitials(profile.fullName);

  return (
    <PCard>
      {/* Photo row */}
      <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
        <div className="ps-photo-thumb">
          {avatarSrc
            ? <img src={avatarSrc} alt="Profile" />
            : <span className="ps-initials-sm">{initials}</span>
          }
        </div>
        <div className="d-flex flex-column align-items-start gap-1">
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => fileRef.current?.click()}>
            Change photo
          </button>
          <p className="mb-0 text-muted" style={{ fontSize: '0.76rem' }}>JPG, PNG or GIF. Max 2 MB.</p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/gif"
          style={{ display: 'none' }}
          onChange={onAvatarChange}
        />
      </div>

      <form onSubmit={handleSave} className="vstack gap-3">
        {/* Name */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label label-caps" htmlFor="firstName">FIRST NAME</label>
            <input type="text" id="firstName" name="firstName" className="form-control" value={form.firstName} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label label-caps" htmlFor="lastName">LAST NAME</label>
            <input type="text" id="lastName" name="lastName" className="form-control" value={form.lastName} onChange={handleChange} />
          </div>
        </div>

        {/* Email — locked */}
        <div>
          <label className="form-label label-caps" htmlFor="profileEmail">EMAIL ADDRESS</label>
          <div className="position-relative">
            <input
              type="email"
              id="profileEmail"
              className="form-control ps-input--disabled"
              style={{ paddingRight: '2.25rem' }}
              value={profile.email}
              disabled
              readOnly
            />
            <span className="ps-input__icon"><i className="bi bi-lock" /></span>
          </div>
          <div className="form-text">Contact support to change your email.</div>
        </div>

        {/* Base Location */}
        <div>
          <label className="form-label label-caps" htmlFor="location">BASE LOCATION</label>
          <div className="position-relative">
            <span className="ps-input__icon ps-input__icon--left"><i className="bi bi-geo-alt" /></span>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control ps-input--padl"
              placeholder="City, Country"
              value={form.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="form-label label-caps" htmlFor="bio">BIO</label>
          <textarea
            id="bio"
            name="bio"
            className="form-control"
            placeholder="Tell us about yourself…"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Travel Style */}
        <div>
          <label className="form-label label-caps" htmlFor="travelStyle">TRAVEL STYLE</label>
          <CustomSelect
            id="travelStyle"
            value={form.travelStyle}
            options={TRAVEL_STYLES}
            onChange={val => setForm(prev => ({ ...prev, travelStyle: val }))}
          />
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap mt-1">
          <button type="submit" className="btn btn-eco">{saved ? 'Saved!' : 'Save Changes'}</button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleDiscard}>Discard</button>
        </div>
      </form>
    </PCard>
  );
}

// ── Security section ───────────────────────────────────────────────────────────

function SecuritySection({ email }) {
  const [fields, setFields] = useState({ current: '', newPass: '', confirm: '' });
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { current, newPass, confirm } = fields;
    if (!current)                          { setError('Please enter your current password.'); return; }
    if (newPass.length < 8)                { setError('New password must be at least 8 characters.'); return; }
    if (!/\d/.test(newPass))               { setError('New password must include a number.'); return; }
    if (!/[^a-zA-Z0-9]/.test(newPass))    { setError('New password must include a symbol.'); return; }
    if (newPass !== confirm)               { setError('Passwords do not match.'); return; }
    setError('');
    setSuccess(true);
    setFields({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className="vstack gap-3">
      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Change Password</h3>
        <p className="text-muted small mb-4">Use a strong, unique password for your account.</p>
        <form onSubmit={handleSubmit} className="vstack gap-3">
          <PasswordInput id="current" name="current" label="CURRENT PASSWORD" value={fields.current} onChange={handleChange} autoComplete="current-password" />
          <PasswordInput id="newPass" name="newPass" label="NEW PASSWORD" value={fields.newPass} onChange={handleChange} hint="Min. 8 characters with a number and symbol." autoComplete="new-password" />
          <PasswordInput id="confirm" name="confirm" label="CONFIRM NEW PASSWORD" value={fields.confirm} onChange={handleChange} autoComplete="new-password" />
          {error   && <p className="text-danger small mb-0">{error}</p>}
          {success && <p className="text-success small mb-0">Password updated successfully.</p>}
          <div className="d-flex gap-2 mt-1">
            <button type="submit" className="btn btn-eco">Update Password</button>
          </div>
        </form>
      </PCard>

      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Connected Accounts</h3>
        <p className="text-muted small mb-4">Manage your sign-in methods.</p>
        <div className="ps-connected-list">
          <div className="ps-connected-row">
            <div className="ps-connected-avatar ps-connected-avatar--email">
              <i className="bi bi-envelope-fill" />
            </div>
            <div className="ps-connected-info">
              <div className="ps-connected-provider">Email &amp; Password</div>
              <div className="ps-connected-detail">{email || 'Connected'}</div>
            </div>
            <span className="ps-connected-badge">Primary</span>
          </div>
          <div className="ps-connected-row">
            <div className="ps-connected-avatar ps-connected-avatar--google">G</div>
            <div className="ps-connected-info">
              <div className="ps-connected-provider">Google</div>
              <div className="ps-connected-detail">{email || 'Connected'}</div>
            </div>
            <button type="button" className="btn btn-outline-secondary btn-sm">Disconnect</button>
          </div>
        </div>
      </PCard>
    </div>
  );
}

// ── Preferences section ────────────────────────────────────────────────────────

function PreferencesSection() {
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
        <p className="text-muted small mb-3">Choose which emails and alerts you'd like to receive.</p>
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
            <div className="form-text">We'll alert you when planned trips approach this limit.</div>
          </div>
          <div>
            <label className="form-label label-caps" htmlFor="transport">DEFAULT TRANSPORT MODE</label>
            <CustomSelect id="transport" value={transport} options={TRANSPORT_MODES} onChange={val => setTransport(val)} />
          </div>
          <div className="d-flex gap-2 mt-1">
            <button type="submit" className="btn btn-eco">{saved ? 'Saved!' : 'Save Preferences'}</button>
          </div>
        </form>
      </PCard>
    </div>
  );
}

// ── Delete Account section ─────────────────────────────────────────────────────

function DeleteAccountSection({ email }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailInput,  setEmailInput]  = useState('');

  const canDelete = Boolean(email) && emailInput.trim() === email.trim();

  function handleDelete(e) {
    e.preventDefault();
    if (!canDelete) return;
    console.info('[ProfilePage] deleteAccount requested (demo — no backend connected)');
    alert('Account deletion requested. No backend is connected — this is a demo-only action.');
    setShowConfirm(false);
    setEmailInput('');
  }

  return (
    <div className="ps-delete-card">
      <div className="ps-delete-header">
        <i className="bi bi-exclamation-triangle ps-delete-icon" />
        <span className="ps-delete-header-title">Delete Account</span>
        <span className="ps-delete-header-note">— permanent, cannot be undone</span>
      </div>
      <p className="text-secondary mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.65' }}>
        Deleting your account will permanently erase all your itineraries, saved places,
        preferences, and profile data.{' '}
        <strong>There is no recovery path after deletion.</strong>
      </p>

      {!showConfirm && (
        <button
          type="button"
          className="btn btn-outline-danger d-inline-flex align-items-center gap-1"
          onClick={() => setShowConfirm(true)}
        >
          <i className="bi bi-trash" />
          Delete my account
        </button>
      )}

      {showConfirm && (
        <form onSubmit={handleDelete} className="vstack gap-3 mt-3 pt-3 border-top">
          <div>
            <label className="form-label label-caps" htmlFor="confirmEmail">TYPE YOUR EMAIL ADDRESS TO CONFIRM</label>
            <input
              type="email"
              id="confirmEmail"
              className="form-control"
              placeholder={email || 'your@email.com'}
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button type="submit" className="btn btn-danger d-inline-flex align-items-center gap-1" disabled={!canDelete}>
              <i className="bi bi-trash" />
              Permanently delete
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => { setShowConfirm(false); setEmailInput(''); }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ── Main ProfilePage ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('personal');
  const [profile,       setProfile]       = useState(null);
  const [avatarSrc,     setAvatarSrc]     = useState(null);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    getProfile().then(data => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  }

  if (loading) {
    return (
      <div className="profile-page-wrap d-flex align-items-center justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
    );
  }

  const { title, desc } = SECTION_META[activeSection];
  const initials    = getInitials(profile.fullName);
  const carbonSaved = profile.stats?.carbonSaved ?? '—';
  const tripsCount  = profile.stats?.tripsTaken  ?? '—';
  const ecoScore    = profile.stats?.ecoScore    ?? '—';

  return (
    <div className="profile-page-wrap">
      <div className="profile-container">
        <div className="d-flex flex-column flex-lg-row gap-4 align-items-lg-start">

          {/* ── Left card ───────────────────────────────────────────── */}
          <aside className="p-left">
            <div className="card border">

              {/* Avatar + identity */}
              <div className="ps-avatar-area">
                <div className="ps-avatar-circle">
                  {avatarSrc
                    ? <img src={avatarSrc} alt={profile.fullName} className="ps-avatar-img" />
                    : <span className="ps-initials">{initials}</span>
                  }
                  <label className="ps-avatar-camera" title="Change photo">
                    <i className="bi bi-camera-fill" />
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      style={{ display: 'none' }}
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                <div className="ps-user-name">{profile.fullName}</div>
                <div className="ps-user-email">{profile.email}</div>
                <div className="ps-eco-badge">
                  <i className="bi bi-leaf" />
                  Eco Traveller
                </div>
              </div>

              {/* Stats */}
              <div className="ps-stats-row">
                <div className="ps-stat">
                  <div className="ps-stat-value">{carbonSaved}</div>
                  <div className="ps-stat-label">CO₂ Saved</div>
                </div>
                <div className="ps-stat-divider" />
                <div className="ps-stat">
                  <div className="ps-stat-value">{tripsCount}</div>
                  <div className="ps-stat-label">Trips</div>
                </div>
                <div className="ps-stat-divider" />
                <div className="ps-stat">
                  <div className="ps-stat-value">{ecoScore}</div>
                  <div className="ps-stat-label">Eco Score</div>
                </div>
              </div>

              {/* Internal nav */}
              <nav className="ps-nav">
                {SECTIONS.map(({ id, label, icon, danger }) => {
                  const isActive = activeSection === id;
                  const cls = [
                    'ps-nav-item',
                    danger   ? 'ps-nav-item--danger' : '',
                    isActive && !danger ? 'ps-nav-item--active' : '',
                    isActive &&  danger ? 'ps-nav-item--active-danger' : '',
                  ].filter(Boolean).join(' ');
                  return (
                    <button key={id} type="button" className={cls} onClick={() => setActiveSection(id)}>
                      <i className={`bi ${icon}`} />
                      {label}
                    </button>
                  );
                })}
              </nav>

            </div>
          </aside>

          {/* ── Right content ────────────────────────────────────────── */}
          <main className="p-right">
            <div className="mb-4">
              <p className="ps-section-tag">ACCOUNT SETTINGS</p>
              <h1 className="fw-bold mb-1" style={{ fontSize: '1.875rem' }}>{title}</h1>
              <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>{desc}</p>
            </div>

            {activeSection === 'personal' && (
              <PersonalInfoSection
                profile={profile}
                avatarSrc={avatarSrc}
                onAvatarChange={handleAvatarChange}
                onSave={setProfile}
              />
            )}
            {activeSection === 'security' && <SecuritySection email={profile.email} />}
            {activeSection === 'prefs'    && <PreferencesSection />}
            {activeSection === 'delete'   && <DeleteAccountSection email={profile.email} />}
          </main>

        </div>
      </div>
    </div>
  );
}
