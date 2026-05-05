import PropTypes from 'prop-types';

export default function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`ps-toggle${checked ? ' ps-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="ps-toggle__knob" />
    </button>
  );
}

Toggle.propTypes = {
  checked:  PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
