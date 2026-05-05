import { useState, useEffect } from 'react';
import { Heart, Search, Trash2, Filter, MapPin } from 'lucide-react';
import '../styles/eco-options.css';

// Mock Eco-Options Data
const ECO_OPTIONS = [
  // Kuala Lumpur
  { id: 1, name: "Green Leaf Boutique", city: "Kuala Lumpur", category: "Accommodation", desc: "Solar-powered eco-resort with zero-waste facilities and organic amenities.", image: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=400&h=200&fit=crop" },
  { id: 2, name: "The Organic Kitchen", city: "Kuala Lumpur", category: "Restaurant", desc: "Farm-to-table restaurant serving organic vegan and vegetarian meals.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop" },
  { id: 3, name: "EcoRail Tours", city: "Kuala Lumpur", category: "Transportation", desc: "Low-carbon city tours using electric buses and eco-friendly transit.", image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=400&h=200&fit=crop" },
  { id: 4, name: "Rainforest Trekking", city: "Kuala Lumpur", category: "Activity", desc: "Guided nature hikes through protected forest reserves with conservation focus.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop" },

  // Penang
  { id: 5, name: "Penang Eco Resort", city: "Penang", category: "Accommodation", desc: "Beachfront resort built with sustainable materials and rainwater harvesting systems.", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=200&fit=crop" },
  { id: 6, name: "Heritage Spice Café", city: "Penang", category: "Restaurant", desc: "Local cuisine using organic, locally-sourced ingredients from nearby farms.", image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=200&fit=crop" },
  { id: 7, name: "Green Cycling Tours", city: "Penang", category: "Transportation", desc: "Bicycle tours exploring Georgetown's historic streets with zero emissions.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop" },
  { id: 8, name: "Island Snorkeling", city: "Penang", category: "Activity", desc: "Eco-conscious marine exploration tours with reef protection guidelines.", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop" },

  // Melaka
  { id: 9, name: "River Valley Lodge", city: "Melaka", category: "Accommodation", desc: "Traditional architecture meets sustainability with composting toilets and solar panels.", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop" },
  { id: 10, name: "Spice Route Kitchen", city: "Melaka", category: "Restaurant", desc: "Authentic Melaka cuisine prepared with heritage recipes and organic produce.", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=200&fit=crop" },
  { id: 11, name: "Heritage Walking Tours", city: "Melaka", category: "Transportation", desc: "Explore UNESCO heritage sites on foot with knowledgeable local guides.", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop" },
  { id: 12, name: "Mangrove Kayaking", city: "Melaka", category: "Activity", desc: "Silent kayaking expeditions through mangrove forests observing local wildlife.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop" },

  // Sabah
  { id: 13, name: "Jungle Lodge Sanctuary", city: "Sabah", category: "Accommodation", desc: "Deep jungle lodge promoting biodiversity conservation and community tourism.", image: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?w=400&h=200&fit=crop" },
  { id: 14, name: "Mountain Lodge Café", city: "Sabah", category: "Restaurant", desc: "Mountain retreat serving indigenous cuisine and sustainable locally-grown coffee.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=200&fit=crop" },
  { id: 15, name: "Eco-Adventure Guides", city: "Sabah", category: "Transportation", desc: "Private guides for jungle trekking with minimal environmental impact practices.", image: "https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=400&h=200&fit=crop" }
];

export default function EcoOptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredResults, setFilteredResults] = useState(ECO_OPTIONS);
  const [favourites, setFavourites] = useState([]);

  const CATEGORIES = ['All', 'Accommodation', 'Restaurant', 'Transportation', 'Activity'];

  // Load favourites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ecoFavourites');
    if (saved) {
      setFavourites(JSON.parse(saved));
    }
  }, []);

  // Filter results in real-time based on search and category
  useEffect(() => {
    const query = searchTerm.toLowerCase().trim();
    let filtered = ECO_OPTIONS;

    // Filter by search term
    if (query !== '') {
      filtered = filtered.filter(item =>
        item.city.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredResults(filtered);
  }, [searchTerm, selectedCategory]);

  // Add to favourites
  const addToFavourites = (item) => {
    if (!favourites.some(f => f.id === item.id)) {
      const updated = [...favourites, item];
      setFavourites(updated);
      localStorage.setItem('ecoFavourites', JSON.stringify(updated));
    }
  };

  // Remove from favourites
  const removeFromFavourites = (id) => {
    const updated = favourites.filter(f => f.id !== id);
    setFavourites(updated);
    localStorage.setItem('ecoFavourites', JSON.stringify(updated));
  };

  const isFavourite = (id) => favourites.some(f => f.id === id);

  return (
    <div className="eco-options-page">
      {/* Header Section */}
      <section className="eco-header py-5 text-center bg-white border-bottom">
        <div className="container-lg">
          <h1 className="display-5 fw-bold mb-3 text-dark">Discover Eco Options</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Search for sustainable accommodations, organic restaurants, low-emission transport, and mindful activities.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="container-lg py-5">
        {/* Search Box */}
        <div className="eco-search-section mb-4">
          <div className="eco-search-wrapper mx-auto mb-4" style={{ maxWidth: '800px' }}>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} className="text-secondary" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by city, town, or place name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Section */}
          <div className="eco-filter-section d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 pb-3 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <Filter size={20} className="text-secondary flex-shrink-0" />
              <div className="d-flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm ${
                      selectedCategory === cat
                        ? 'btn-dark'
                        : 'btn-outline-secondary'
                    }`}
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

        {/* Main Layout - Results & Sidebar */}
        <div className="row g-4">
          {/* Results Grid */}
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
                    <div className="card eco-card h-100 border-0 shadow-sm overflow-hidden">
                      {/* Image Container */}
                      <div className="eco-card-image-wrapper position-relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="card-img-top w-100 h-100 object-fit-cover"
                        />
                        <button
                          className={`btn eco-card-favorite-btn position-absolute top-2 end-2 rounded-circle ${
                            isFavourite(item.id) ? 'favourited' : ''
                          }`}
                          onClick={() => 
                            isFavourite(item.id)
                              ? removeFromFavourites(item.id)
                              : addToFavourites(item)
                          }
                          title={
                            isFavourite(item.id)
                              ? 'Remove from favourites'
                              : 'Add to favourites'
                          }
                        >
                          <Heart
                            size={20}
                            fill={isFavourite(item.id) ? '#dc2626' : 'none'}
                            color={isFavourite(item.id) ? '#dc2626' : '#9ca3af'}
                          />
                        </button>
                      </div>

                      {/* Card Body */}
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold mb-2 text-dark">
                          {item.name}
                        </h5>
                        <div className="d-flex align-items-center gap-1 mb-2 text-muted small">
                          <MapPin size={16} className="text-success flex-shrink-0" />
                          <span className="text-secondary">{item.city}</span>
                        </div>
                        <span className="badge bg-light text-success fw-semibold mb-2 w-fit">
                          {item.category}
                        </span>
                        <p className="card-text text-muted flex-grow-1 mb-3">
                          {item.desc}
                        </p>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-success fw-semibold">
                            ● ● ● ● ●
                          </span>
                          <span className="small text-muted">Eco-Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Favourites Sidebar */}
          <div className="col-lg-3">
            <div className="card eco-favourites-sidebar border-0 shadow-sm position-sticky" style={{ top: '100px' }}>
              <div className="card-header bg-white border-bottom-0 pb-0">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Heart
                    size={20}
                    fill="var(--green-primary)"
                    color="var(--green-primary)"
                  />
                  <span className="fw-bold text-dark">My Favourites</span>
                  <span className="badge bg-success ms-auto">
                    {favourites.length}
                  </span>
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
                      <div
                        key={item.id}
                        className="p-3 border rounded-2 bg-light d-flex justify-content-between align-items-start gap-2"
                      >
                        <div className="flex-grow-1 min-width-0">
                          <div className="fw-semibold small text-dark mb-1">
                            {item.name}
                          </div>
                          <div className="text-muted small mb-1">
                            {item.category}
                          </div>
                          <div className="text-muted small">
                            📍 {item.city}
                          </div>
                        </div>
                        <button
                          className="btn btn-sm btn-link p-0 text-danger flex-shrink-0"
                          onClick={() => removeFromFavourites(item.id)}
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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