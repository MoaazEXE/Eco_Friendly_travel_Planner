import { useState, useEffect } from 'react';
import { Heart, Search, Trash2, Filter } from 'lucide-react';

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
    <>
      <style>{`
        /* Page background */
        .eco-options-page {
          background: var(--white);
        }

        /* Header Section */
        .eco-header {
          background: var(--white);
          padding: 3rem 0;
          text-align: center;
          border-bottom: 1px solid var(--gray-200);
        }

        .eco-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 0.75rem;
        }

        .eco-header p {
          font-size: 1rem;
          color: var(--gray-600);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Search & Filter Section */
        .eco-search-section {
          background: var(--white);
          padding: 2rem 0;
        }

        .eco-search-wrapper {
          max-width: 800px;
          margin: 0 auto 2.5rem;
          position: relative;
        }

        .eco-search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .eco-search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 2.75rem;
          border: 1.5px solid var(--gray-300);
          border-radius: 8px;
          font-size: 0.95rem;
          background: var(--white);
          transition: all 0.2s ease;
          color: var(--gray-900);
        }

        .eco-search-input::placeholder {
          color: var(--gray-400);
        }

        .eco-search-input:focus {
          outline: none;
          border-color: var(--green-primary);
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        .eco-search-input-icon {
          position: absolute;
          left: 12px;
          color: var(--gray-400);
          pointer-events: none;
        }

        /* Filter Buttons */
        .eco-filter-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .eco-filter-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .eco-filter-icon {
          color: var(--gray-500);
          flex-shrink: 0;
        }

        .eco-filter-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .eco-filter-btn {
          padding: 0.5rem 1.2rem;
          border: 1.5px solid var(--gray-300);
          background: var(--white);
          color: var(--gray-700);
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .eco-filter-btn:hover {
          border-color: var(--green-primary);
          color: var(--green-primary);
        }

        .eco-filter-btn.active {
          background: var(--gray-900);
          color: var(--white);
          border-color: var(--gray-900);
        }

        .eco-result-count {
          font-size: 0.9rem;
          color: var(--gray-600);
          font-weight: 600;
        }

        /* Results Grid */
        .eco-results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .eco-card {
          background: var(--white);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
        }

        .eco-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }

        .eco-card-image-wrapper {
          position: relative;
          overflow: hidden;
          height: 220px;
        }

        .eco-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .eco-card-favorite-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: var(--white);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .eco-card-favorite-btn:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: scale(1.1);
        }

        .eco-card-favorite-btn.favourited {
          background: rgba(220, 38, 38, 0.1);
        }

        .eco-card-body {
          padding: 1.5rem;
        }

        .eco-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--gray-900);
          margin: 0 0 0.5rem;
        }

        .eco-card-category {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--green-dark);
          margin-bottom: 0.75rem;
          text-transform: capitalize;
        }

        .eco-card-desc {
          font-size: 0.9rem;
          color: var(--gray-600);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .eco-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--green-dark);
          font-weight: 600;
        }

        .eco-card-stars {
          color: var(--green-primary);
          display: inline;
          letter-spacing: 1px;
        }

        /* Empty State */
        .eco-empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          color: var(--gray-600);
        }

        .eco-empty-state p {
          font-size: 1.1rem;
        }

        /* Main Layout with Sidebar */
        .eco-main-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        /* Favourites Sidebar */
        .eco-favourites-sidebar {
          background: var(--white);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 1.5rem;
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .eco-favourites-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.2rem;
          font-weight: 700;
          color: var(--gray-900);
          font-size: 1.05rem;
        }

        .eco-favourites-badge {
          background: var(--green-primary);
          color: var(--white);
          padding: 0.25rem 0.65rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-left: auto;
        }

        .eco-favourites-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .eco-fav-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1rem;
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          background: var(--gray-50);
          gap: 0.75rem;
        }

        .eco-fav-item-info {
          flex: 1;
          min-width: 0;
        }

        .eco-fav-item-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--gray-900);
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }

        .eco-fav-item-category {
          font-size: 0.75rem;
          color: var(--gray-600);
          margin-bottom: 0.25rem;
        }

        .eco-fav-item-city {
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .eco-fav-item-btn {
          background: transparent;
          border: none;
          color: var(--danger);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
          flex-shrink: 0;
        }

        .eco-fav-item-btn:hover {
          color: var(--danger-dark);
        }

        .eco-favourites-empty {
          color: var(--gray-600);
          font-size: 0.85rem;
          text-align: center;
          padding: 2rem 0;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .eco-results-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 992px) {
          .eco-header h1 {
            font-size: 2rem;
          }

          .eco-results-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .eco-main-layout {
            grid-template-columns: 1fr;
          }

          .eco-favourites-sidebar {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .eco-header {
            padding: 2rem 1rem;
          }

          .eco-header h1 {
            font-size: 1.75rem;
          }

          .eco-filter-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .eco-result-count {
            order: -1;
          }

          .eco-results-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .eco-card-image-wrapper {
            height: 180px;
          }
        }
      `}</style>

      <div className="eco-options-page">
        {/* Header Section */}
        <section className="eco-header">
          <h1>Discover Eco Options</h1>
          <p>Search for sustainable accommodations, organic restaurants, low-emission transport, and mindful activities.</p>
        </section>

        {/* Main Container */}
        <main className="container-xl" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
          <div className="eco-search-section">
            {/* Search Box */}
            <div className="eco-search-wrapper">
              <div className="eco-search-input-wrapper">
                <Search size={18} className="eco-search-input-icon" />
                <input
                  type="text"
                  className="eco-search-input"
                  placeholder="Search by city, town, or place name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Section */}
            <div className="eco-filter-section">
              <div className="eco-filter-wrapper">
                <Filter size={20} className="eco-filter-icon" />
                <div className="eco-filter-buttons">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`eco-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="eco-result-count">{filteredResults.length} results found</div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="eco-main-layout">
            {/* Results Grid */}
            <div>
              <div className="eco-results-grid">
                {filteredResults.length === 0 ? (
                  <div className="eco-empty-state">
                    <p>No eco-options found. Try adjusting your search or filters!</p>
                  </div>
                ) : (
                  filteredResults.map((item) => (
                    <div key={item.id} className="eco-card">
                      <div className="eco-card-image-wrapper">
                        <img src={item.image} alt={item.name} />
                        <button
                          className={`eco-card-favorite-btn ${isFavourite(item.id) ? 'favourited' : ''}`}
                          onClick={() => addToFavourites(item)}
                          title={isFavourite(item.id) ? 'Remove from favourites' : 'Add to favourites'}
                        >
                          <Heart
                            size={20}
                            fill={isFavourite(item.id) ? '#dc2626' : 'none'}
                            color={isFavourite(item.id) ? '#dc2626' : '#9ca3af'}
                          />
                        </button>
                      </div>
                      <div className="eco-card-body">
                        <h3 className="eco-card-title">{item.name}</h3>
                        <div className="eco-card-category">{item.category}</div>
                        <p className="eco-card-desc">{item.desc}</p>
                        <div className="eco-card-badge">
                          <span className="eco-card-stars">● ● ● ● ●</span>
                          <span>Eco-Certified</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Favourites Sidebar */}
            <div className="eco-favourites-sidebar">
              <div className="eco-favourites-header">
                <Heart size={20} style={{ color: 'var(--green-primary)', fill: 'var(--green-primary)' }} />
                My Favourites
                <span className="eco-favourites-badge">{favourites.length}</span>
              </div>
              {favourites.length === 0 ? (
                <div className="eco-favourites-empty">No favourites saved yet.</div>
              ) : (
                <div className="eco-favourites-list">
                  {favourites.map((item) => (
                    <div key={item.id} className="eco-fav-item">
                      <div className="eco-fav-item-info">
                        <div className="eco-fav-item-name">{item.name}</div>
                        <div className="eco-fav-item-category">{item.category}</div>
                        <div className="eco-fav-item-city">📍 {item.city}</div>
                      </div>
                      <button
                        className="eco-fav-item-btn"
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
        </main>
      </div>
    </>
  );
}