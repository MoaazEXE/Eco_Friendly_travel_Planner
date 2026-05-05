import PropTypes from 'prop-types';

export default function StatCard({ value, label, sub, icon, accent }) {
  return (
    <div
      className="rounded-3 border p-4 d-flex flex-column gap-3"
      style={{
        background: accent ? 'var(--green-darker)' : 'var(--white)',
        borderColor: accent ? 'var(--green-dark)' : 'var(--gray-200)',
        boxShadow: accent ? 'none' : '0 1px 3px var(--shadow-xs)',
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: '0.5rem',
          background: accent ? 'var(--darkest-a60)' : 'var(--green-subtle)',
          border: `1px solid ${accent ? 'var(--forest-a50)' : 'var(--green-pale)'}`,
          color: accent ? 'var(--emerald-bright)' : 'var(--green-dark)',
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: accent ? 'var(--white)' : 'var(--gray-900)' }}>
          {value}
        </div>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '0.125rem', color: accent ? 'var(--mint-light)' : 'var(--gray-700)' }}>
          {label}
        </div>
        <div style={{ fontSize: '0.75rem', marginTop: '0.125rem', color: accent ? 'var(--emerald-a80)' : 'var(--gray-400)' }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  value:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label:  PropTypes.string.isRequired,
  sub:    PropTypes.string.isRequired,
  icon:   PropTypes.element.isRequired,
  accent: PropTypes.bool,
};

StatCard.defaultProps = {
  accent: false,
};
