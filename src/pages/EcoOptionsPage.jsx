import { useState, useMemo } from "react";
import { Heart, Search, Filter } from "lucide-react";
import { ECO_OPTIONS, CITY_LABELS } from "../data/ecoOptions";
import EcoCard from "../components/eco/EcoCard";
import FavouriteItem from "../components/eco/FavouriteItem";
import "../styles/eco-options.css";

const CATEGORIES = ["All", "Accommodation", "Restaurant", "Transportation", "Activity"];

export default function EcoOptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem("ecoFavourites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const filteredResults = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return ECO_OPTIONS.filter((item) => {
      const cityLabel = (CITY_LABELS[item.city] || "").toLowerCase();
      const matchesSearch =
        !query ||
        cityLabel.includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  function addToFavourites(item) {
    if (favourites.some((f) => f.id === item.id)) return;
    const updated = [...favourites, item];
    setFavourites(updated);
    localStorage.setItem("ecoFavourites", JSON.stringify(updated));
  }

  function removeFromFavourites(id) {
    const updated = favourites.filter((f) => f.id !== id);
    setFavourites(updated);
    localStorage.setItem("ecoFavourites", JSON.stringify(updated));
  }

  function toggleFavourite(item) {
    favourites.some((f) => f.id === item.id)
      ? removeFromFavourites(item.id)
      : addToFavourites(item);
  }

  return (
    <main className="eco-options-page eco-inner-page">
      <div className="container-lg">
        <div className="mb-4">
          <h1 className="eco-page-title">Discover Eco Options</h1>
          <p className="eco-lead">
            Search for sustainable accommodations, organic restaurants, low-emission
            transport, and mindful activities.
          </p>
        </div>

        <div className="card-eco eco-search-section mb-4 p-4">
          <div className="eco-search-wrapper mx-auto mb-4" style={{ maxWidth: "800px" }}>
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

          <div className="eco-filter-section d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <Filter size={20} className="text-secondary flex-shrink-0" />
              <div className="d-flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm ${selectedCategory === cat ? "btn-dark" : "btn-outline-secondary"}`}
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

        <div className="row g-4">
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

          <div className="col-lg-3">
            <div
              className="card eco-favourites-sidebar border-0 shadow-sm position-sticky"
              style={{ top: "100px" }}
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
      </div>
    </main>
  );
}
