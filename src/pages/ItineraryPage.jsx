import { useState } from 'react';
import '../styles/itinerary.css';
import heroBg from '../assets/images/itenary-background.png';

const MOCK_DESTINATIONS = [
  {
    id: 1, city: 'kl', name: 'KLCC Park & Eco-Walk', type: 'nature',
    budget: 0, weather: 'Sunny', impact: 'Low',
    description: 'A serene green oasis in the heart of KL with zero-emission walking trails.',
    impactNote: 'Walking only — virtually zero carbon footprint. Actively supports urban biodiversity.',
  },
  {
    id: 2, city: 'kl', name: 'Pasar Seni Heritage Trail', type: 'culture',
    budget: 20, weather: 'Cloudy', impact: 'High',
    description: 'Explore KL colonial history while supporting local artisans and crafts.',
    impactNote: 'High foot traffic can generate waste. Bring reusables and avoid single-use items.',
  },
  {
    id: 3, city: 'kl', name: 'Bangsar Organic Community Garden', type: 'nature',
    budget: 10, weather: 'Sunny', impact: 'Low',
    description: 'Community-run garden producing zero-pesticide vegetables year-round.',
    impactNote: 'Supports regenerative farming and local food systems. Minimal waste produced.',
  },
  {
    id: 4, city: 'kl', name: 'The Hive Bulk Foods (Bangsar)', type: 'food',
    budget: 50, weather: 'Cool', impact: 'Medium',
    description: 'Plastic-free grocery & café championing sustainable local farming.',
    impactNote: 'Bulk buying reduces packaging waste, though some imports carry supply chain emissions.',
  },
  {
    id: 5, city: 'penang', name: 'Entopia Butterfly Farm', type: 'nature',
    budget: 60, weather: 'Sunny', impact: 'Low',
    description: "Asia's most immersive butterfly sanctuary dedicated to biodiversity conservation.",
    impactNote: 'Conservation-focused — entry fees directly fund habitat protection programs.',
  },
  {
    id: 6, city: 'penang', name: 'George Town Cycling Tour', type: 'cycling',
    budget: 30, weather: 'Cloudy', impact: 'Low',
    description: 'Explore UNESCO heritage streets by bike — zero carbon, all charm.',
    impactNote: 'Zero emissions. Cycling is the most sustainable way to experience urban heritage.',
  },
  {
    id: 7, city: 'penang', name: 'Hin Bus Depot Arts Space', type: 'culture',
    budget: 0, weather: 'Cool', impact: 'Low',
    description: 'A repurposed bus depot showcasing sustainable local art and community projects.',
    impactNote: 'Adaptive reuse reduces embodied carbon significantly vs. new construction.',
  },
];

const INTERESTS = [
  { value: 'nature',  label: '🌿 Nature' },
  { value: 'culture', label: '🎨 Culture' },
  { value: 'food',    label: '🥗 Food' },
  { value: 'cycling', label: '🚲 Cycling' },
];

const IMPACT_CONFIG = {
  Low:    { bg: '#dcfce7', color: '#15803d', borderColor: '#86efac', icon: '🌱', label: 'Low Impact' },
  Medium: { bg: '#fef9c3', color: '#854d0e', borderColor: '#fde047', icon: '⚡', label: 'Medium Impact' },
  High:   { bg: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5', icon: '⚠️', label: 'High Impact' },
};

export default function ItineraryPage() {
  const [destination, setDestination]         = useState('');
  const [travelDate, setTravelDate]           = useState('');
  const [notes, setNotes]                     = useState('');
  const [interests, setInterests]             = useState(['nature']);
  const [budget, setBudget]                   = useState(250);
  const [recommendations, setRecommendations] = useState(null);
  const [savedPlan, setSavedPlan]             = useState([]);

  function toggleInterest(value) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  }

  function handleBudgetChange(e) {
    const value = Number(e.target.value);
    setBudget(value);
    e.target.style.setProperty('--slider-fill', `${(value / 1000) * 100}%`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cityKey = destination.toLowerCase().trim();
    const filtered = MOCK_DESTINATIONS.filter(
      (item) =>
        item.city   === cityKey &&
        item.budget <= budget &&
        interests.includes(item.type)
    );
    setRecommendations(filtered);
  }

  function addToPlan(id) {
    if (!travelDate) {
      alert('Please select a Date of Visit first!');
      return;
    }
    const item = MOCK_DESTINATIONS.find((d) => d.id === id);
    const duplicate = savedPlan.some((p) => p.id === id && p.plannedDate === travelDate);
    if (duplicate) {
      alert('This activity is already in your plan for this date!');
      return;
    }
    setSavedPlan((prev) =>
      [...prev, { ...item, plannedDate: travelDate, notes }].sort(
        (a, b) => new Date(a.plannedDate) - new Date(b.plannedDate)
      )
    );
  }

  function removeFromPlan(index) {
    setSavedPlan((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <main className="itin-page" style={{ flex: 1 }}>

      {/* ── Hero ── */}
      <div className="itin-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="itin-hero-overlay">
          <div className="container">
            <span className="itin-eyebrow">Eco Travel Planner</span>
            <h1 className="itin-hero-title">
              Plan Your <span className="itin-hero-accent">Green</span> Journey
            </h1>
            <p className="itin-hero-sub">
              Discover sustainable destinations, compare eco-impact, and build an
              itinerary that&apos;s good for you — and the planet.
            </p>
          </div>
        </div>
      </div>

      <div className="container itin-body">

        {/* ── TOP: Horizontal Form ── */}
        <div className="itin-form-card mb-5">
          <div className="itin-form-head">
            <span className="itin-step-pill">STEP 1</span>
            <h4 className="itin-form-heading">
              <i className="bi bi-list-check me-2" />
              Plan a New Stop
            </h4>
          </div>

          <form onSubmit={handleSubmit} noValidate className="itin-form-body">

            {/* Row 1: Primary fields */}
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="itin-label">Destination City</label>
                <div className="itin-input-wrap">
                  <i className="bi bi-geo-alt itin-icon" />
                  <input
                    type="text"
                    className="itin-input"
                    placeholder="e.g. Kyoto, Japan"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label className="itin-label">Date of Visit</label>
                <div className="itin-input-wrap">
                  <i className="bi bi-calendar3 itin-icon" />
                  <input
                    type="date"
                    className="itin-input"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label className="itin-label">Notes for your itinerary</label>
                <textarea
                  className="itin-textarea"
                  placeholder="e.g. bring reusables, check opening hours, book in advance..."
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Filters + Submit */}
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="itin-label">Interests</label>
                <div className="itin-pills">
                  {INTERESTS.map(({ value, label }) => (
                    <button
                      type="button"
                      key={value}
                      className={`itin-pill${interests.includes(value) ? ' active' : ''}`}
                      onClick={() => toggleInterest(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-md-4">
                <label className="itin-label">
                  Budget / Day
                  <span className="itin-budget-display">RM {budget}</span>
                </label>
                <input
                  type="range"
                  className="itin-range"
                  min="0"
                  max="1000"
                  step="10"
                  value={budget}
                  onChange={handleBudgetChange}
                  style={{ '--slider-fill': `${(budget / 1000) * 100}%` }}
                />
                <div className="itin-range-ends">
                  <span>Budget</span>
                  <span>Luxury</span>
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-end align-items-end">
                <button type="submit" className="itin-find-btn">
                  <i className="bi bi-search me-2" />
                  Find Spots
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* ── BELOW: Recommendations + Saved Plan side by side ── */}
        <div className="row g-4 align-items-start">

          {/* Green Recommendations */}
          <div className="col-lg-7">
            <section>
              <div className="itin-section-head">
                <span className="itin-step-pill">STEP 2</span>
                <h4 className="itin-section-title">Green Recommendations</h4>
                {recommendations?.length > 0 && (
                  <span className="itin-count">{recommendations.length} spots found</span>
                )}
              </div>

              {recommendations === null ? (
                <div className="itin-empty">
                  <div className="itin-empty-icon">🗺️</div>
                  <p className="itin-empty-title">Ready to explore?</p>
                  <p className="itin-empty-sub">
                    Fill in your preferences and click <strong>Find Spots</strong> to
                    discover sustainable activities near your destination.
                  </p>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="itin-empty itin-empty-warn">
                  <div className="itin-empty-icon">🔍</div>
                  <p className="itin-empty-title">No matching spots found</p>
                  <p className="itin-empty-sub">
                    Try different interests, a higher budget, or another weather option.
                  </p>
                </div>
              ) : (
                <div className="itin-rec-grid">
                  {recommendations.map((item) => {
                    const cfg = IMPACT_CONFIG[item.impact];
                    return (
                      <div className="itin-rec-card" key={item.id}>
                        <div className="itin-rec-top">
                          <span
                            className="itin-impact-tag"
                            style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.borderColor }}
                          >
                            {cfg.icon} {cfg.label}
                          </span>
                          <div className="itin-tags">
                            <span className="itin-tag">💰 RM{item.budget}</span>
                            <span className="itin-tag">
                              {item.weather === 'Sunny' ? '☀️' : item.weather === 'Cloudy' ? '☁️' : '🌬️'}{' '}
                              {item.weather}
                            </span>
                          </div>
                        </div>
                        <h5 className="itin-rec-name">{item.name}</h5>
                        <p className="itin-rec-desc">{item.description}</p>
                        <div className="itin-impact-note">
                          <i className="bi bi-leaf-fill me-1" />
                          {item.impactNote}
                        </div>
                        <button className="itin-add-btn" onClick={() => addToPlan(item.id)}>
                          <i className="bi bi-plus-lg me-1" />
                          Add to My Plan
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Saved Itinerary */}
          <div className="col-lg-5">
            <section>
              <div className="itin-section-head">
                <span className="itin-step-pill">STEP 3</span>
                <h4 className="itin-section-title">Your Saved Itinerary</h4>
                {savedPlan.length > 0 && (
                  <span className="itin-count">
                    {savedPlan.length} stop{savedPlan.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {savedPlan.length === 0 ? (
                <div className="itin-empty">
                  <div className="itin-empty-icon">📋</div>
                  <p className="itin-empty-title">Your plan is empty</p>
                  <p className="itin-empty-sub">
                    Add eco-spots from the recommendations to start building your green trip.
                  </p>
                </div>
              ) : (
                <div className="itin-timeline">
                  {savedPlan.map((item, index) => {
                    const cfg = IMPACT_CONFIG[item.impact];
                    const formattedDate = new Date(item.plannedDate).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    });
                    return (
                      <div className="itin-tl-item" key={`${item.id}-${item.plannedDate}`}>
                        <div className="itin-tl-dot" />
                        <div className="itin-tl-card">
                          <div className="itin-tl-top">
                            <span className="itin-tl-date">
                              <i className="bi bi-calendar-check me-1" />{formattedDate}
                            </span>
                            <button
                              className="itin-del-btn"
                              onClick={() => removeFromPlan(index)}
                              aria-label="Remove stop"
                            >
                              <i className="bi bi-trash3" />
                            </button>
                          </div>
                          <h6 className="itin-tl-name">{item.name}</h6>
                          {item.notes && (
                            <p className="itin-tl-notes">{item.notes}</p>
                          )}
                          <div className="itin-tl-meta">
                            <span
                              className="itin-impact-tag sm"
                              style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.borderColor }}
                            >
                              {cfg.icon} {cfg.label}
                            </span>
                            <span className="itin-tag">💰 RM{item.budget}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
