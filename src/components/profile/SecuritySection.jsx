import { useState } from 'react';
import PropTypes from 'prop-types';
import PCard from './PCard';
import PasswordInput from './PasswordInput';

export default function SecuritySection({ email }) {
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
            <button type="submit" className="btn-eco-dark">Update Password</button>
          </div>
        </form>
      </PCard>

      <PCard>
        <h3 className="fw-semibold mb-1" style={{ fontSize: '1.05rem' }}>Connected Accounts</h3>
        <p className="text-muted small mb-4">Manage your sign-in methods.</p>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center gap-3 py-3 border-bottom">
            <div className="ps-connected-avatar ps-connected-avatar--email">
              <i className="bi bi-envelope-fill" />
            </div>
            <div className="flex-grow-1" style={{ minWidth: 0 }}>
              <div className="fw-semibold small text-dark">Email &amp; Password</div>
              <div className="text-muted small">{email || 'Connected'}</div>
            </div>
            <span
              className="badge rounded-pill fw-semibold flex-shrink-0"
              style={{ background: 'var(--green-subtle)', color: 'var(--green-dark)', fontSize: '0.72rem' }}
            >
              Primary
            </span>
          </div>
          <div className="d-flex align-items-center gap-3 py-3">
            <div className="ps-connected-avatar ps-connected-avatar--google">G</div>
            <div className="flex-grow-1" style={{ minWidth: 0 }}>
              <div className="fw-semibold small text-dark">Google</div>
              <div className="text-muted small">{email || 'Connected'}</div>
            </div>
            <button type="button" className="btn-eco-outline flex-shrink-0" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>Disconnect</button>
          </div>
        </div>
      </PCard>
    </div>
  );
}

SecuritySection.propTypes = {
  email: PropTypes.string.isRequired,
};
