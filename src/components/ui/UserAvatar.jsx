import PropTypes from 'prop-types';

const SIZE_MAP = {
  sm: { box: '2rem',   font: '0.75rem' },
  md: { box: '2.5rem', font: '0.875rem' },
  lg: { box: '3.5rem', font: '1rem' },
};

export default function UserAvatar({ initials, src, alt, size, className }) {
  const { box, font } = SIZE_MAP[size] || SIZE_MAP.sm;
  return (
    <div
      className={className}
      style={{
        width: box,
        height: box,
        borderRadius: '50%',
        background: src ? 'transparent' : 'var(--green-dark)',
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: font,
        fontWeight: 700,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {src ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </div>
  );
}

UserAvatar.propTypes = {
  initials:  PropTypes.string,
  src:       PropTypes.string,
  alt:       PropTypes.string,
  size:      PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

UserAvatar.defaultProps = {
  initials:  '?',
  src:       null,
  alt:       'avatar',
  size:      'sm',
  className: undefined,
};
