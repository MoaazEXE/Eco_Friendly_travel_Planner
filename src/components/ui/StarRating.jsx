import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

export default function StarRating({ count, size }) {
  return (
    <div className="d-flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} color="var(--green-secondary)" fill="var(--green-secondary)" />
      ))}
    </div>
  );
}

StarRating.propTypes = {
  count: PropTypes.number.isRequired,
  size:  PropTypes.number,
};

StarRating.defaultProps = {
  size: 12,
};
