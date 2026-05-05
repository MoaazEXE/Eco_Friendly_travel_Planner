import { useState } from 'react';
import PropTypes from 'prop-types';

export default function PasswordInput({ id, name, label, value, onChange, hint, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="form-label label-caps" htmlFor={id}>{label}</label>
      <div className="position-relative">
        <input
          type={show ? 'text' : 'password'}
          id={id}
          name={name}
          className="form-control"
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="ps-input__eye"
          onClick={() => setShow(s => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <i className={`bi ${show ? 'bi-eye-slash' : 'bi-eye'}`} />
        </button>
      </div>
      {hint && <div className="form-text">{hint}</div>}
    </div>
  );
}

PasswordInput.propTypes = {
  id:           PropTypes.string.isRequired,
  name:         PropTypes.string.isRequired,
  label:        PropTypes.string.isRequired,
  value:        PropTypes.string.isRequired,
  onChange:     PropTypes.func.isRequired,
  hint:         PropTypes.string,
  autoComplete: PropTypes.string,
};

PasswordInput.defaultProps = {
  hint:         undefined,
  autoComplete: 'off',
};
