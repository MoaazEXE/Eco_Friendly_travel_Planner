import { useState, useEffect } from 'react';
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

  return (
    <div className="profile-page-wrap">
      <div className="profile-container">
        <div className="d-flex flex-column flex-lg-row gap-4 align-items-lg-start">

          <ProfileSidebar
            profile={profile}
            avatarSrc={avatarSrc}
            onAvatarChange={handleAvatarChange}
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
