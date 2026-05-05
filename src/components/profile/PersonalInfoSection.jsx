import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import PCard from './PCard';
import CustomSelect from './CustomSelect';
import { splitName, getInitials } from '../../utils/profileHelpers';

const TRAVEL_STYLES = [
  'Slow Travel & Nature',
  'City Explorer',
  'Backpacker',
  'Luxury Eco Travel',
  'Family Travel',
];

export default function PersonalInfoSection({ profile, avatarSrc, onAvatarChange, onSave }) {
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

PersonalInfoSection.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string,
    email:    PropTypes.string,
    location: PropTypes.string,
    bio:      PropTypes.string,
  }).isRequired,
  avatarSrc:      PropTypes.string,
  onAvatarChange: PropTypes.func.isRequired,
  onSave:         PropTypes.func.isRequired,
};

PersonalInfoSection.defaultProps = {
  avatarSrc: null,
};
