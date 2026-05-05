import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function CustomSelect({ id, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="ps-custom-select" ref={wrapRef}>
      <button
        type="button"
        id={id}
        className={`ps-cs-trigger${open ? ' ps-cs-trigger--open' : ''}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(o => !o)}
      >
        <span className="ps-cs-trigger__text">{value}</span>
        <i className={`bi bi-chevron-down ps-cs-chevron${open ? ' ps-cs-chevron--up' : ''}`} />
      </button>
      {open && (
        <ul className="ps-cs-menu" role="listbox">
          {options.map(opt => {
            const selected = opt === value;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                className={`ps-cs-option${selected ? ' ps-cs-option--selected' : ''}`}
                onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}
              >
                <span>{opt}</span>
                {selected && <i className="bi bi-check ps-cs-check" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

CustomSelect.propTypes = {
  id:       PropTypes.string.isRequired,
  value:    PropTypes.string.isRequired,
  options:  PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
