import { useState, useRef } from 'react';
import '../styles/profile.css';

const INITIAL_PROFILE = {
  fullName: 'Eleanor Vance',
  email:    'eleanor.vance@example.com',
  phone:    '+1 (555) 123-4567',
  location: 'Portland, USA',
  bio:      'Passionate about sustainable travel and discovering eco-friendly experiences around the world. Always looking for the next green adventure.',
};

const PREFERENCES = [
  {
    id:    'pref-tips',
    label: 'Eco-Travel Tips',
    desc:  'Weekly eco-travel inspiration and guides',
    defaultChecked: true,
  },
  {
    id:    'pref-weather',
    label: 'Weather Alerts',
    desc:  'Notifications about your saved destinations',
    defaultChecked: true,
  },
  {
    id:    'pref-marketing',
    label: 'Marketing Updates',
    desc:  'Promotions, offers, and partner content',
    defaultChecked: false,
  },
];

// ── Sub-components ──────────────────────────────────────────────────────────

function ProfileTab({ profile, avatarSrc, onAvatarChange, onSave }) {
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(profile);

  function startEdit() {
    setDraft(profile);
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
  }

  function handleChange(e) {
    setDraft((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...draft,
      phone:    draft.phone.trim()    || 'Not provided',
      location: draft.location.trim() || 'Not provided',
      bio:      draft.bio.trim()      || 'No bio provided yet.',
    });
    setEditing(false);
  }

  return (
    <div className="tab-panel">
      <div className="d-flex align-items-start justify-content-between mb-4 gap-3 flex-wrap">
        <div>
          <h2 className="fs-4 fw-bold mb-1" style={{ color: '#111827' }}>
            Profile Details
          </h2>
          <p className="mb-0" style={{ color: '#6b7280', fontSize: '.9rem' }}>
            Manage your public information and contact details.
          </p>
        </div>
        {!editing && (
          <button className="btn-edit" onClick={startEdit}>
            <i className="bi bi-pencil-fill" /> Edit Profile
          </button>
        )}
      </div>

      {/* View Mode */}
      {!editing && (
        <div>
          <div className="row g-4">
            <ViewField icon="bi-person"    label="Full Name"     value={profile.fullName} />
            <ViewField icon="bi-envelope"  label="Email Address" value={profile.email} />
            <ViewField icon="bi-telephone" label="Phone Number"  value={profile.phone} />
            <ViewField icon="bi-geo-alt"   label="Location"      value={profile.location} />
          </div>
          <hr className="section-divider" />
          <p className="view-label">
            <i className="bi bi-chat-text me-1" /> Bio
          </p>
          <p style={{ color: '#374151', lineHeight: 1.7 }}>{profile.bio}</p>
        </div>
      )}

      {/* Edit Mode */}
      {editing && (
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <EditField
              col="col-sm-6" icon="bi-person"    id="fullName"
              label="Full Name *" type="text"
              placeholder="Your full name" value={draft.fullName}
              onChange={handleChange} required
            />
            <EditField
              col="col-sm-6" icon="bi-envelope"  id="email"
              label="Email Address *" type="email"
              placeholder="your@email.com" value={draft.email}
              onChange={handleChange} required
            />
            <EditField
              col="col-sm-6" icon="bi-telephone" id="phone"
              label="Phone Number" type="tel"
              placeholder="+1 (555) 000-0000" value={draft.phone}
              onChange={handleChange}
            />
            <EditField
              col="col-sm-6" icon="bi-geo-alt"   id="location"
              label="Location" type="text"
              placeholder="City, Country" value={draft.location}
              onChange={handleChange}
            />
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <div className="input-icon-wrap">
                  <i className="bi bi-chat-text input-icon" style={{ top: '.9rem', transform: 'none' }} />
                  <textarea
                    id="bio"
                    name="bio"
                    className="form-control-profile"
                    placeholder="Tell us about yourself..."
                    value={draft.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 flex-wrap">
            <button type="submit" className="btn-save">
              <i className="bi bi-check-lg" /> Save Changes
            </button>
            <button type="button" className="btn-cancel" onClick={cancelEdit}>
              <i className="bi bi-x-lg" /> Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ViewField({ icon, label, value }) {
  return (
    <div className="col-sm-6">
      <p className="view-label">
        <i className={`bi ${icon} me-1`} /> {label}
      </p>
      <p className="view-value">{value}</p>
    </div>
  );
}

function EditField({ col, icon, id, label, type, placeholder, value, onChange, required }) {
  return (
    <div className={col}>
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <div className="input-icon-wrap">
          <i className={`bi ${icon} input-icon`} />
          <input
            type={type}
            id={id}
            name={id}
            className="form-control-profile"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
          />
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [fields, setFields] = useState({
    current: '', newPass: '', confirm: '',
  });

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!fields.current || !fields.newPass || !fields.confirm) {
      alert('Please fill out all password fields.');
      return;
    }
    if (fields.newPass.length < 8) {
      alert('New password must be at least 8 characters long.');
      return;
    }
    if (fields.newPass !== fields.confirm) {
      alert('New passwords do not match.');
      return;
    }
    alert('Password successfully updated!');
    setFields({ current: '', newPass: '', confirm: '' });
  }

  return (
    <div className="tab-panel">
      <div className="mb-4">
        <h2 className="fs-4 fw-bold mb-1" style={{ color: '#111827' }}>Security</h2>
        <p className="mb-0" style={{ color: '#6b7280', fontSize: '.9rem' }}>
          Update your password to keep your account secure.
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
        <div className="d-flex flex-column gap-3">
          <PasswordField id="current" name="current" label="Current Password"    icon="bi-lock"       value={fields.current} onChange={handleChange} />
          <PasswordField id="newPass" name="newPass" label="New Password"        icon="bi-shield-lock" value={fields.newPass} onChange={handleChange} hint="Must be at least 8 characters long." />
          <PasswordField id="confirm" name="confirm" label="Confirm New Password" icon="bi-lock-fill"  value={fields.confirm} onChange={handleChange} />
        </div>
        <div className="mt-4">
          <button type="submit" className="btn-update-password">
            <i className="bi bi-shield-check" /> Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

function PasswordField({ id, name, label, icon, value, onChange, hint }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-icon-wrap">
        <i className={`bi ${icon} input-icon`} />
        <input
          type="password"
          id={id}
          name={name}
          className="form-control-profile"
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          required
        />
      </div>
      {hint && <p className="password-hint">{hint}</p>}
    </div>
  );
}

function SettingsTab({ onDeleteRequest }) {
  const [prefs, setPrefs] = useState(
    Object.fromEntries(PREFERENCES.map((p) => [p.id, p.defaultChecked]))
  );

  function togglePref(id) {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="tab-panel">
      <div className="mb-4">
        <h2 className="fs-4 fw-bold mb-1" style={{ color: '#111827' }}>Account Settings</h2>
        <p className="mb-0" style={{ color: '#6b7280', fontSize: '.9rem' }}>
          Manage your notification preferences and account.
        </p>
      </div>

      <h3 className="fw-semibold mb-3" style={{ color: '#111827', fontSize: '1rem' }}>
        Email Preferences
      </h3>
      <div className="d-flex flex-column gap-2 mb-4">
        {PREFERENCES.map(({ id, label, desc }) => (
          <label className="pref-card" key={id} onClick={() => togglePref(id)}>
            <div>
              <div className="fw-semibold" style={{ color: '#111827', fontSize: '.9rem' }}>{label}</div>
              <div style={{ fontSize: '.8rem', color: '#6b7280' }}>{desc}</div>
            </div>
            <div className="toggle-wrap">
              <input
                type="checkbox"
                className="toggle-input"
                checked={prefs[id]}
                onChange={() => togglePref(id)}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="toggle-track">
                <div className="toggle-knob" />
              </div>
            </div>
          </label>
        ))}
      </div>

      <hr className="section-divider" />

      <h3 className="fw-semibold mb-3" style={{ color: '#b91c1c', fontSize: '1rem' }}>
        <i className="bi bi-exclamation-triangle me-1" /> Danger Zone
      </h3>
      <div className="delete-warning mb-3">
        <p className="fw-semibold mb-1" style={{ color: '#374151', fontSize: '.9rem' }}>
          Delete My Account
        </p>
        <p className="mb-0" style={{ fontSize: '.85rem', color: '#6b7280' }}>
          This will permanently remove all your data, itineraries, and preferences.
          This action cannot be undone.
        </p>
      </div>
      <button className="btn-delete" onClick={onDeleteRequest}>
        <i className="bi bi-trash3-fill" /> Delete My Account
      </button>
    </div>
  );
}

// ── Main ProfilePage component ───────────────────────────────────────────────

const TABS = [
  { id: 'profile',  icon: 'bi-person-fill',      label: 'Profile Details', desc: 'Manage your public information' },
  { id: 'security', icon: 'bi-shield-lock-fill',  label: 'Security',        desc: 'Update your password' },
  { id: 'settings', icon: 'bi-gear-fill',         label: 'Account Settings',desc: 'Preferences & account removal' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab]   = useState('profile');
  const [profile, setProfile]       = useState(INITIAL_PROFILE);
  const [avatarSrc, setAvatarSrc]   = useState(
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop'
  );
  const [showModal, setShowModal]   = useState(false);
  const fileInputRef                = useRef(null);

  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleDeleteAccount() {
    setShowModal(false);
    alert('Account deleted. We will miss you!');
  }

  return (
    <div className="profile-page-bg">
      {/* Cover Banner */}
      <div className="profile-cover">
        <img
          src="https://images.unsplash.com/photo-1632037667990-227e49f350c6?w=1080&auto=format&fit=crop"
          alt="Lush green forest cover"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="cover-overlay" />
        <div className="cover-gradient" />
      </div>

      {/* Profile Content */}
      <div className="profile-content-wrap">
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>

          {/* Profile Card */}
          <div className="profile-card mb-0">
            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">

              {/* Avatar */}
              <div className="avatar-wrap">
                <img src={avatarSrc} alt="User avatar" />
                <button
                  className="camera-btn"
                  title="Change photo"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="bi bi-camera-fill" style={{ fontSize: '.85rem' }} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarUpload}
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center text-md-start" style={{ flex: 1 }}>
                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-md-between gap-3">
                  <div>
                    <h1 className="fs-3 fw-bold mb-1" style={{ color: '#111827', letterSpacing: '-.02em' }}>
                      {profile.fullName}
                    </h1>
                    <div className="eco-badge mb-2">
                      <i className="bi bi-leaf" />
                      <span>Eco Explorer</span>
                    </div>
                  </div>
                  <div className="stats-badge d-none d-md-inline-flex">
                    <div className="stat-item">
                      <div className="stat-label">Carbon Saved</div>
                      <div className="stat-value">120 kg CO<sub>2</sub></div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label">Trips Taken</div>
                      <div className="stat-value">14</div>
                    </div>
                  </div>
                </div>
                <p className="mb-0 mt-1" style={{ color: '#4b5563', fontSize: '.95rem', lineHeight: 1.6, maxWidth: 560 }}>
                  {profile.bio}
                </p>
              </div>

            </div>
          </div>

          {/* Two-column layout */}
          <div className="profile-layout">

            {/* Sidebar */}
            <div className="profile-sidebar">
              <p className="sidebar-section-label">Account Options</p>
              {TABS.map(({ id, icon, label, desc }) => (
                <button
                  key={id}
                  className={`tab-btn${activeTab === id ? ' active' : ''}`}
                  onClick={() => setActiveTab(id)}
                >
                  <div className="tab-icon-wrap">
                    <i className={`bi ${icon}`} />
                  </div>
                  <div className="tab-info">
                    <span className="tab-label">{label}</span>
                    <span className="tab-desc">{desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Main Panel */}
            <div className="profile-main">
              {activeTab === 'profile' && (
                <ProfileTab
                  profile={profile}
                  avatarSrc={avatarSrc}
                  onAvatarChange={handleAvatarUpload}
                  onSave={setProfile}
                />
              )}
              {activeTab === 'security' && <SecurityTab />}
              {activeTab === 'settings' && (
                <SettingsTab onDeleteRequest={() => setShowModal(true)} />
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className={`modal-overlay${showModal ? ' show' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
      >
        <div className="modal-card text-center">
          <div className="modal-icon-wrap">
            <i className="bi bi-trash3-fill" />
          </div>
          <h3 className="fw-bold mb-2" style={{ color: '#111827' }}>Delete Account?</h3>
          <p className="mb-4" style={{ color: '#6b7280', fontSize: '.9rem' }}>
            Are you sure you want to permanently delete your account? All your trips,
            preferences, and data will be lost. This action{' '}
            <strong>cannot</strong> be undone.
          </p>
          <div className="d-flex gap-3">
            <button className="btn-cancel flex-fill" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="btn-confirm-delete" onClick={handleDeleteAccount}>
              <i className="bi bi-trash3-fill me-1" /> Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
