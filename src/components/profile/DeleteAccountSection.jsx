import { useState } from 'react';
import PropTypes from 'prop-types';

export default function DeleteAccountSection({ email }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailInput,  setEmailInput]  = useState('');
  const [deleteMsg,   setDeleteMsg]   = useState('');

  const canDelete = Boolean(email) && emailInput.trim() === email.trim();

  function handleDelete(e) {
    e.preventDefault();
    if (!canDelete) return;
    setDeleteMsg('Account deletion requested. No backend is connected — this is a demo-only action.');
    setShowConfirm(false);
    setEmailInput('');
  }

  return (
    <div className="ps-delete-card">
      <div className="d-flex align-items-center gap-2 pb-3 mb-3" style={{ borderBottom: '1px solid var(--danger-border)' }}>
        <i className="bi bi-exclamation-triangle text-danger flex-shrink-0" />
        <span className="fw-bold" style={{ fontSize: '0.95rem', color: 'var(--danger-dark)' }}>Delete Account</span>
        <span className="small" style={{ color: 'var(--danger)' }}>— permanent, cannot be undone</span>
      </div>
      <p className="text-secondary mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.65' }}>
        Deleting your account will permanently erase all your itineraries, saved places,
        preferences, and profile data.{' '}
        <strong>There is no recovery path after deletion.</strong>
      </p>

      {deleteMsg && (
        <p className="text-success small mb-3">{deleteMsg}</p>
      )}

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
              className="btn-eco-outline"
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

DeleteAccountSection.propTypes = {
  email: PropTypes.string.isRequired,
};
