import PropTypes from "prop-types";
import { Heart, MapPin } from "lucide-react";
import { CITY_LABELS } from "../../data/ecoOptions";

export default function EcoCard({ item, isFavourite, onToggleFavourite }) {
  return (
    <div className="card eco-card h-100 border-0 shadow-sm overflow-hidden">
      <div className="eco-card-image-wrapper position-relative">
        <img
          src={item.image}
          alt={item.name}
          className="card-img-top w-100 h-100 object-fit-cover"
        />
        <button
          className={`btn eco-card-favorite-btn position-absolute top-2 end-2 rounded-circle${isFavourite ? " favourited" : ""}`}
          onClick={onToggleFavourite}
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart
            size={20}
            fill={isFavourite ? "var(--danger)" : "none"}
            color={isFavourite ? "var(--danger)" : "#9ca3af"}
          />
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold mb-2 text-dark">{item.name}</h5>
        <div className="d-flex align-items-center gap-1 mb-2 text-muted small">
          <MapPin size={16} className="text-success flex-shrink-0" />
          <span className="text-secondary">{CITY_LABELS[item.city]}</span>
        </div>
        <span className="badge bg-light text-success fw-semibold mb-2 w-fit">
          {item.category}
        </span>
        <p className="card-text text-muted flex-grow-1 mb-3">{item.desc}</p>
        <div className="d-flex align-items-center gap-2">
          <span className="text-success fw-semibold">{"● ".repeat(item.eco).trim()}</span>
          <span className="small text-muted">Eco-Certified</span>
        </div>
      </div>
    </div>
  );
}

EcoCard.propTypes = {
  item: PropTypes.shape({
    id:       PropTypes.number.isRequired,
    name:     PropTypes.string.isRequired,
    city:     PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    eco:      PropTypes.number.isRequired,
    desc:     PropTypes.string.isRequired,
    image:    PropTypes.string.isRequired,
  }).isRequired,
  isFavourite:       PropTypes.bool.isRequired,
  onToggleFavourite: PropTypes.func.isRequired,
};
