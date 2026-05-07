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
        <div className="d-flex flex-column align-items-center text-center py-4 px-3">
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
          <div className="fw-bold mb-1" style={{ fontSize: '1rem', color: 'var(--gray-900)' }}>{profile.fullName}</div>
          <div className="text-muted small mb-2">{profile.email}</div>
          <div className="ps-eco-badge">
            <i className="bi bi-leaf" />
            Eco Traveller
          </div>
        </div>

        {/* Stats */}
        <div className="d-flex justify-content-around py-3 border-top border-bottom">
          <div className="text-center">
            <div className="fw-bold mb-0" style={{ fontSize: '0.875rem', color: 'var(--gray-900)' }}>{carbonSaved}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--gray-500)', marginTop: '0.1rem', whiteSpace: 'nowrap' }}>CO₂ Saved</div>
          </div>
          <div className="ps-stat-divider" />
          <div className="text-center">
            <div className="fw-bold mb-0" style={{ fontSize: '0.875rem', color: 'var(--gray-900)' }}>{tripsCount}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--gray-500)', marginTop: '0.1rem', whiteSpace: 'nowrap' }}>Trips</div>
          </div>
          <div className="ps-stat-divider" />
          <div className="text-center">
            <div className="fw-bold mb-0" style={{ fontSize: '0.875rem', color: 'var(--gray-900)' }}>{ecoScore}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--gray-500)', marginTop: '0.1rem', whiteSpace: 'nowrap' }}>Eco Score</div>
          </div>
        </div>

        {/* Internal nav */}
        <nav className="d-flex flex-column gap-1 p-2">
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
