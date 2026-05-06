import { useState, useEffect } from 'react';
import { getProfile } from '../api/profile';
import { getInitials } from '../utils/profileHelpers';
import PersonalInfoSection from '../components/profile/PersonalInfoSection';
import SecuritySection from '../components/profile/SecuritySection';
import PreferencesSection from '../components/profile/PreferencesSection';
import DeleteAccountSection from '../components/profile/DeleteAccountSection';
import '../styles/profile.css';

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
  const ecoScore    = profile.ecoScore ?? profile.stats?.ecoScore ?? '—';

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
              <h1 className="eco-page-title mb-1">{title}</h1>
              <p className="eco-lead mb-0">{desc}</p>
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
