import PropTypes from 'prop-types';

export default function EmptyState({ icon, title, sub, className, children }) {
  return (
    <div className={['eco-empty-state', className].filter(Boolean).join(' ')}>
      <div className="eco-empty-icon">{icon}</div>
      <p className="eco-empty-title">{title}</p>
      {sub && <p className="eco-empty-sub">{sub}</p>}
      {children}
    </div>
  );
}

EmptyState.propTypes = {
  icon:      PropTypes.element.isRequired,
  title:     PropTypes.string.isRequired,
  sub:       PropTypes.string,
  className: PropTypes.string,
  children:  PropTypes.node,
};

EmptyState.defaultProps = {
  sub:       undefined,
  className: undefined,
  children:  null,
};
