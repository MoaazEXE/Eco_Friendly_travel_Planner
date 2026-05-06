import PropTypes from 'prop-types';
import { getInitials } from '../../utils/profileHelpers';

const SECTIONS = [
  { id: 'personal', label: 'Personal Info',  icon: 'bi-person',               danger: false },
  { id: 'security', label: 'Security',        icon: 'bi-shield',               danger: false },
  { id: 'prefs',    label: 'Preferences',     icon: 'bi-sliders',              danger: false },
  { id: 'delete',   label: 'Delete Account',  icon: 'bi-exclamation-triangle', danger: true  },
];

export default function ProfileSidebar({
  profile,
  avatarSrc,
  onAvatarChange,
  activeSection,
  onSectionChange,
}) {
  const initials    = getInitials(profile.fullName);
  const carbonSaved = profile.stats?.carbonSaved ?? '—';
  const tripsCount  = profile.stats?.tripsTaken  ?? '—';
  const ecoScore    = profile.ecoScore ?? profile.stats?.ecoScore ?? '—';

  return (
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
                onChange={onAvatarChange}
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
              <button key={id} type="button" className={cls} onClick={() => onSectionChange(id)}>
                <i className={`bi ${icon}`} />
                {label}
              </button>
            );
          })}
        </nav>

      </div>
    </aside>
  );
}

ProfileSidebar.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ecoScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stats: PropTypes.shape({
      carbonSaved: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      tripsTaken: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ecoScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  avatarSrc: PropTypes.string,
  onAvatarChange: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired,
};

ProfileSidebar.defaultProps = {
  avatarSrc: null,
};
