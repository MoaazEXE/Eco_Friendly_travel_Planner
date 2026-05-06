import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import { CITY_LABELS } from "../../data/ecoOptions";

export default function FavouriteItem({ item, onRemove }) {
  return (
    <div className="p-3 border rounded-2 bg-light d-flex justify-content-between align-items-start gap-2">
      <div className="flex-grow-1 min-width-0">
        <div className="fw-semibold small text-dark mb-1">{item.name}</div>
        <div className="text-muted small mb-1">{item.category}</div>
        <div className="text-muted small">📍 {CITY_LABELS[item.city]}</div>
      </div>
      <button
        className="btn btn-sm btn-link p-0 text-danger flex-shrink-0"
        onClick={() => onRemove(item.id)}
        title="Remove"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

FavouriteItem.propTypes = {
  item: PropTypes.shape({
    id:       PropTypes.number.isRequired,
    name:     PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    city:     PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};
