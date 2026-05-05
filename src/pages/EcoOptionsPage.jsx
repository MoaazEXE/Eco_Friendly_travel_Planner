import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Heart, Search, Trash2, Filter, MapPin } from 'lucide-react';
import { ECO_OPTIONS, CITY_LABELS } from '../data/ecoOptions';
import '../styles/eco-options.css';

const CATEGORIES = ['All', 'Accommodation', 'Restaurant', 'Transportation', 'Activity'];

// ── Favourites sidebar item ───────────────────────────────────────────────────

function FavouriteItem({ item, onRemove }) {
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
  item:     PropTypes.shape({
    id:       PropTypes.number.isRequired,
    name:     PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    city:     PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

// ── Eco destination card ──────────────────────────────────────────────────────

function EcoCard({ item, isFavourite, onToggleFavourite }) {
  return (
    <div className="card eco-card h-100 border-0 shadow-sm overflow-hidden">
      <div className="eco-card-image-wrapper position-relative">
        <img
          src={item.image}
          alt={item.name}
          className="card-img-top w-100 h-100 object-fit-cover"
        />
        <button
          className={`btn eco-card-favorite-btn position-absolute top-2 end-2 rounded-circle${isFavourite ? ' favourited' : ''}`}
          onClick={onToggleFavourite}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart
            size={20}
            fill={isFavourite ? 'var(--danger)' : 'none'}
            color={isFavourite ? 'var(--danger)' : '#9ca3af'}
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
          <span className="text-success fw-semibold">{'● '.repeat(item.eco).trim()}</span>
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

// ── Main page ─────────────────────────────────────────────────────────────────

export default function EcoOptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Lazy initialiser — reads localStorage once on mount, no useEffect needed
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem('ecoFavourites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Derived value — computed from state, NOT stored in state (avoids useEffect anti-pattern)
  const filteredResults = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return ECO_OPTIONS.filter((item) => {
      const cityLabel = (CITY_LABELS[item.city] || '').toLowerCase();
      const matchesSearch =
        !query ||
        cityLabel.includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  function addToFavourites(item) {
    if (favourites.some((f) => f.id === item.id)) return;
    const updated = [...favourites, item];
    setFavourites(updated);
    localStorage.setItem('ecoFavourites', JSON.stringify(updated));
  }

  function removeFromFavourites(id) {
    const updated = favourites.filter((f) => f.id !== id);
    setFavourites(updated);
    localStorage.setItem('ecoFavourites', JSON.stringify(updated));
  }

  function toggleFavourite(item) {
    favourites.some((f) => f.id === item.id)
      ? removeFromFavourites(item.id)
      : addToFavourites(item);
  }

  return (
    <div className="eco-options-page">
      {/* Header */}
      <section className="eco-header py-5 text-center bg-white border-bottom">
        <div className="container-lg">
          <h1 className="display-5 fw-bold mb-3 text-dark">Discover Eco Options</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Search for sustainable accommodations, organic restaurants, low-emission
            transport, and mindful activities.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="container-lg py-5">
        {/* Search */}
        <div className="eco-search-section mb-4">
          <div className="eco-search-wrapper mx-auto mb-4" style={{ maxWidth: '800px' }}>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} className="text-secondary" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by city or place name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="eco-filter-section d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 pb-3 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <Filter size={20} className="text-secondary flex-shrink-0" />
              <div className="d-flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm ${selectedCategory === cat ? 'btn-dark' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-secondary fw-semibold small">
              {filteredResults.length} results found
            </div>
          </div>
        </div>

        {/* Results + Sidebar */}
        <div className="row g-4">
          {/* Results grid */}
          <div className="col-lg-9">
            <div className="row g-4">
              {filteredResults.length === 0 ? (
                <div className="col-12">
                  <div className="text-center py-5">
                    <p className="text-muted fs-5">
                      No eco-options found. Try adjusting your search or filters!
                    </p>
                  </div>
                </div>
              ) : (
                filteredResults.map((item) => (
                  <div key={item.id} className="col-lg-6 col-xl-4">
                    <EcoCard
                      item={item}
                      isFavourite={favourites.some((f) => f.id === item.id)}
                      onToggleFavourite={() => toggleFavourite(item)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Favourites sidebar */}
          <div className="col-lg-3">
            <div
              className="card eco-favourites-sidebar border-0 shadow-sm position-sticky"
              style={{ top: '100px' }}
            >
              <div className="card-header bg-white border-bottom-0 pb-0">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Heart size={20} fill="var(--green-primary)" color="var(--green-primary)" />
                  <span className="fw-bold text-dark">My Favourites</span>
                  <span className="badge bg-success ms-auto">{favourites.length}</span>
                </div>
              </div>
              <div className="card-body">
                {favourites.length === 0 ? (
                  <div className="text-center text-muted small py-5">
                    No favourites saved yet.
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {favourites.map((item) => (
                      <FavouriteItem
                        key={item.id}
                        item={item}
                        onRemove={removeFromFavourites}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
