import PropTypes from 'prop-types';

export default function PCard({ children, className }) {
  return (
    <div className={['card-eco', className].filter(Boolean).join(' ')}>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

PCard.propTypes = {
  children:  PropTypes.node.isRequired,
  className: PropTypes.string,
};

PCard.defaultProps = {
  className: undefined,
};
