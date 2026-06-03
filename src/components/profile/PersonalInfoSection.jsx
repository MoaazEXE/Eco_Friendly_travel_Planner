import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PCard from './PCard';
import CustomSelect from './CustomSelect';
import { splitName } from '../../utils/profileHelpers';
import { updateProfile } from '../../api/profile';

const TRAVEL_STYLES = [
  'Slow Travel & Nature',
  'City Explorer',
  'Backpacker',
  'Luxury Eco Travel',
  'Family Travel',
];

export default function PersonalInfoSection({ profile, onSave }) {
  const { firstName: initFirst, lastName: initLast } = splitName(profile.fullName);

  const [form, setForm] = useState({
    firstName:   initFirst,
    lastName:    initLast,
    phone:       profile.phone       || '',
    location:    profile.location    || '',
    bio:         profile.bio         || '',
    travelStyle: profile.travelStyle || TRAVEL_STYLES[0],
  });
  const [saved,     setSaved]     = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState('');

  // Sync form when profile prop changes (e.g. after a successful save returns server data)
  useEffect(() => {
    const { firstName, lastName } = splitName(profile.fullName);
    setForm(prev => ({
      ...prev,
      firstName,
      lastName,
      phone:       profile.phone       || '',
      location:    profile.location    || '',
      bio:         profile.bio         || '',
      travelStyle: profile.travelStyle || TRAVEL_STYLES[0],
    }));
  }, [profile]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (saveError) setSaveError('');
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.firstName.trim()) {
      setSaveError('First name cannot be empty.');
      return;
    }
    setSaving(true);
    setSaveError('');
    try {
      const updated = await updateProfile({
        fullName:    [form.firstName.trim(), form.lastName.trim()].filter(Boolean).join(' '),
        phone:       form.phone.trim(),
        location:    form.location.trim(),
        bio:         form.bio.trim(),
        travelStyle: form.travelStyle,
      });
      // Pass the server-confirmed object up so ProfilePage syncs context too.
      onSave(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError(err.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function handleDiscard() {
    const { firstName, lastName } = splitName(profile.fullName);
    setForm(prev => ({
      ...prev,
      firstName,
      lastName,
      phone:       profile.phone       || '',
      location:    profile.location    || '',
      bio:         profile.bio         || '',
      travelStyle: profile.travelStyle || TRAVEL_STYLES[0],
    }));
    setSaveError('');
  }

  return (
    <PCard>
      <form onSubmit={handleSave} className="vstack gap-3">

        {/* Name */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label label-caps" htmlFor="firstName">FIRST NAME</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label label-caps" htmlFor="lastName">LAST NAME</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email — read-only */}
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

        {/* Phone */}
        <div>
          <label className="form-label label-caps" htmlFor="phone">PHONE NUMBER</label>
          <div className="position-relative">
            <span className="ps-input__icon ps-input__icon--left"><i className="bi bi-telephone" /></span>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control ps-input--padl"
              placeholder="+60 12-345 6789"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
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

        {/* Travel Style — persisted to database */}
        <div>
          <label className="form-label label-caps" htmlFor="travelStyle">TRAVEL STYLE</label>
          <CustomSelect
            id="travelStyle"
            value={form.travelStyle}
            options={TRAVEL_STYLES}
            onChange={val => setForm(prev => ({ ...prev, travelStyle: val }))}
          />
        </div>

        {saveError && (
          <p className="text-danger small mb-0">{saveError}</p>
        )}

        <div className="d-flex align-items-center gap-2 flex-wrap mt-1">
          <button type="submit" className="btn-eco-dark" disabled={saving}>
            {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
          </button>
          <button type="button" className="btn-eco-outline" onClick={handleDiscard} disabled={saving}>
            Discard
          </button>
        </div>

      </form>
    </PCard>
  );
}

PersonalInfoSection.propTypes = {
  profile: PropTypes.shape({
    fullName:    PropTypes.string,
    email:       PropTypes.string,
    phone:       PropTypes.string,
    location:    PropTypes.string,
    bio:         PropTypes.string,
    travelStyle: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};
