import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getProfile } from '../api/profile';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import PersonalInfoSection from '../components/profile/PersonalInfoSection';
import SecuritySection from '../components/profile/SecuritySection';
import PreferencesSection from '../components/profile/PreferencesSection';
import DeleteAccountSection from '../components/profile/DeleteAccountSection';
import '../styles/profile.css';

const SECTION_META = {
  personal: { title: 'Personal Info',  desc: 'Update your personal details and travel preferences.' },
  security: { title: 'Security',       desc: 'Manage your password and connected sign-in accounts.' },
  prefs:    { title: 'Preferences',    desc: 'Customise notifications, units, and eco travel goals.' },
  delete:   { title: 'Delete Account', desc: 'Permanently remove your account and all associated data.' },
};

export default function ProfilePage() {
  const { setUser } = useAppContext();
  const navigate    = useNavigate();

  const [activeSection, setActiveSection] = useState('personal');
  const [profile,       setProfile]       = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState('');
  const [retryCount,    setRetryCount]    = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    (async () => {
      try {
        const data = await getProfile();
        if (cancelled) return;
        setProfile(data);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        if (err.message === 'Unauthorized') {
          navigate('/login');
        } else {
          setError(err.message || 'Failed to load profile. Please try again.');
          setLoading(false);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [navigate, retryCount]);

  /**
   * Shared save handler — called by both PersonalInfoSection and PreferencesSection
   * after a successful PUT /api/profile. Updates local profile state AND syncs the
   * Navbar greeting via context.
   */
  function handleProfileSave(updatedProfile) {
    setProfile(updatedProfile);
    setUser(prev => ({
      ...prev,
      fullName:  updatedProfile.fullName,
      firstName: updatedProfile.fullName.split(' ')[0],
    }));
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

  if (error) {
    return (
      <div className="profile-page-wrap d-flex align-items-center justify-content-center">
        <div className="text-center">
          <p className="text-danger mb-3">{error}</p>
          <button className="btn-eco-outline" onClick={() => setRetryCount(c => c + 1)}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { title, desc } = SECTION_META[activeSection];

  return (
    <div className="profile-page-wrap">
      <div className="container-xl">
        <div className="d-flex flex-column flex-lg-row gap-4 align-items-lg-start">

          <ProfileSidebar
            profile={profile}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <main className="p-right">
            <div className="mb-4">
              <h1 className="eco-page-title mb-1">{title}</h1>
              <p className="eco-lead mb-0">{desc}</p>
            </div>

            {activeSection === 'personal' && (
              <PersonalInfoSection
                profile={profile}
                onSave={handleProfileSave}
              />
            )}
            {activeSection === 'security' && <SecuritySection email={profile.email} />}
            {activeSection === 'prefs'    && (
              <PreferencesSection
                profile={profile}
                onSave={handleProfileSave}
              />
            )}
            {activeSection === 'delete' && <DeleteAccountSection email={profile.email} />}
          </main>

        </div>
      </div>
    </div>
  );
}
