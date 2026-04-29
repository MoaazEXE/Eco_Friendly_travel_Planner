import { useState } from 'react';
import {
  Globe, Leaf, Palette, UtensilsCrossed, Bike,
  Sprout, Zap, AlertTriangle,
  MapPin, Calendar, Search, Plus, Trash2, Pencil, Check,
  CalendarCheck, ListChecks, Map, ClipboardList, Wallet,
} from 'lucide-react';
import '../styles/itinerary.css';
import heroBg from '../assets/images/itenary-background.png';

const MOCK_DESTINATIONS = [
  {
    id: 1, city: 'kl', name: 'KLCC Park & Eco-Walk', type: 'nature',
    budget: 0, impact: 'Low',
    description: 'A serene green oasis in the heart of KL with zero-emission walking trails.',
    impactNote: 'Walking only — virtually zero carbon footprint. Actively supports urban biodiversity.',
  },
  {
    id: 2, city: 'kl', name: 'Pasar Seni Heritage Trail', type: 'culture',
    budget: 20, impact: 'High',
    description: 'Explore KL colonial history while supporting local artisans and crafts.',
    impactNote: 'High foot traffic can generate waste. Bring reusables and avoid single-use items.',
  },
  {
    id: 3, city: 'kl', name: 'Bangsar Organic Community Garden', type: 'nature',
    budget: 10, impact: 'Low',
    description: 'Community-run garden producing zero-pesticide vegetables year-round.',
    impactNote: 'Supports regenerative farming and local food systems. Minimal waste produced.',
  },
  {
    id: 4, city: 'kl', name: 'The Hive Bulk Foods (Bangsar)', type: 'food',
    budget: 50, impact: 'Medium',
    description: 'Plastic-free grocery & café championing sustainable local farming.',
    impactNote: 'Bulk buying reduces packaging waste, though some imports carry supply chain emissions.',
  },
  {
    id: 5, city: 'penang', name: 'Entopia Butterfly Farm', type: 'nature',
    budget: 60, impact: 'Low',
    description: "Asia's most immersive butterfly sanctuary dedicated to biodiversity conservation.",
    impactNote: 'Conservation-focused — entry fees directly fund habitat protection programs.',
  },
  {
    id: 6, city: 'penang', name: 'George Town Cycling Tour', type: 'cycling',
    budget: 30, impact: 'Low',
    description: 'Explore UNESCO heritage streets by bike — zero carbon, all charm.',
    impactNote: 'Zero emissions. Cycling is the most sustainable way to experience urban heritage.',
  },
  {
    id: 7, city: 'penang', name: 'Hin Bus Depot Arts Space', type: 'culture',
    budget: 0, impact: 'Low',
    description: 'A repurposed bus depot showcasing sustainable local art and community projects.',
    impactNote: 'Adaptive reuse reduces embodied carbon significantly vs. new construction.',
  },
];

const INTERESTS = [
  { value: 'nature',  label: 'Nature',  Icon: Leaf },
  { value: 'culture', label: 'Culture', Icon: Palette },
  { value: 'food',    label: 'Food',    Icon: UtensilsCrossed },
  { value: 'cycling', label: 'Cycling', Icon: Bike },
];

const IMPACT_CONFIG = {
  Low:    { bg: '#dcfce7', color: '#15803d', borderColor: '#86efac', Icon: Sprout,        label: 'Low Impact' },
  Medium: { bg: '#fef9c3', color: '#854d0e', borderColor: '#fde047', Icon: Zap,           label: 'Medium Impact' },
  High:   { bg: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5', Icon: AlertTriangle, label: 'High Impact' },
};

const CITY_LABELS = { kl: 'Kuala Lumpur', penang: 'Penang' };

export default function ItineraryPage() {
  const [destination, setDestination]         = useState('');
  const [travelDate, setTravelDate]           = useState('');
  const [notes, setNotes]                     = useState('');
  const [interests, setInterests]             = useState(['nature']);
  const [budget, setBudget]                   = useState(250);
  const [recommendations, setRecommendations] = useState(null);
  const [savedPlan, setSavedPlan]             = useState([]);
  const [editingKey, setEditingKey]           = useState(null);
  const [editForm, setEditForm]               = useState({ notes: '', plannedDate: '' });

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

  function removeFromPlan(id, plannedDate) {
    setSavedPlan((prev) => prev.filter((p) => !(p.id === id && p.plannedDate === plannedDate)));
  }

  function startEdit(item) {
    setEditingKey(`${item.id}-${item.plannedDate}`);
    setEditForm({ notes: item.notes || '', plannedDate: item.plannedDate });
  }

  function saveEdit(id, oldPlannedDate) {
    setSavedPlan((prev) =>
      prev.map((p) =>
        p.id === id && p.plannedDate === oldPlannedDate
          ? { ...p, notes: editForm.notes, plannedDate: editForm.plannedDate }
          : p
      ).sort((a, b) => new Date(a.plannedDate) - new Date(b.plannedDate))
    );
    setEditingKey(null);
  }

  function groupByDate(plan) {
    return plan.reduce((groups, item) => {
      if (!groups[item.plannedDate]) groups[item.plannedDate] = [];
      groups[item.plannedDate].push(item);
      return groups;
    }, {});
  }

  return (
    <main className="itin-page" style={{ flex: 1 }}>

      {/* ── Hero ── */}
      <div className="itin-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="itin-hero-overlay">
          <div className="container">
            <span className="itin-eyebrow">
              <Globe size={13} strokeWidth={2.5} />
              Eco Travel Planner
            </span>
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
              <ListChecks size={17} strokeWidth={2.5} className="me-2" />
              Plan a New Stop
            </h4>
          </div>

          <form onSubmit={handleSubmit} noValidate className="itin-form-body">

            {/* Row 1: Primary fields */}
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="itin-label">Destination City</label>
                <div className="itin-input-wrap">
                  <MapPin size={14} className="itin-icon" strokeWidth={2.5} />
                  <input
                    type="text"
                    className="itin-input"
                    placeholder="e.g. KL, Penang"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label className="itin-label">Date of Visit</label>
                <div className="itin-input-wrap">
                  <Calendar size={14} className="itin-icon" strokeWidth={2.5} />
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
                  {INTERESTS.map(({ value, label, Icon }) => (
                    <button
                      type="button"
                      key={value}
                      className={`itin-pill${interests.includes(value) ? ' active' : ''}`}
                      onClick={() => toggleInterest(value)}
                    >
                      <Icon size={13} strokeWidth={2.5} className="me-1" />
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
                  <Search size={14} strokeWidth={2.5} className="me-2" />
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
                  <div className="itin-empty-icon"><Map size={40} strokeWidth={1.5} /></div>
                  <p className="itin-empty-title">Ready to explore?</p>
                  <p className="itin-empty-sub">
                    Fill in your preferences and click <strong>Find Spots</strong> to
                    discover sustainable activities near your destination.
                  </p>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="itin-empty itin-empty-warn">
                  <div className="itin-empty-icon"><Search size={40} strokeWidth={1.5} /></div>
                  <p className="itin-empty-title">No matching spots found</p>
                  <p className="itin-empty-sub">
                    Try different interests, a higher budget, or a different city.
                  </p>
                </div>
              ) : (
                <div className="itin-rec-grid">
                  {recommendations.map((item) => {
                    const cfg = IMPACT_CONFIG[item.impact];
                    return (
                      <div className="itin-rec-card" key={item.id} style={{ borderLeftColor: cfg.borderColor }}>
                        <div className="itin-rec-top">
                          <div>
                            <h5 className="itin-rec-name">{item.name}</h5>
                            <div className="itin-tags">
                              <span className="itin-tag itin-budget-badge">
                                <Wallet size={12} strokeWidth={2.5} className="me-1" />
                                RM{item.budget}
                              </span>
                              <span className="itin-tag">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                              <span
                                className="itin-impact-tag sm"
                                style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.borderColor }}
                              >
                                <cfg.Icon size={11} strokeWidth={2.5} />
                                {cfg.label}
                              </span>
                            </div>
                          </div>
                          <button className="itin-add-btn" onClick={() => addToPlan(item.id)}>
                            <Plus size={14} strokeWidth={2.5} className="me-1" />
                            Add to My Plan
                          </button>
                        </div>
                        <p className="itin-rec-desc">{item.description}</p>
                        <div className="itin-impact-note">
                          <Leaf size={13} strokeWidth={2.5} className="me-1" />
                          {item.impactNote}
                        </div>
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
                  <div className="itin-empty-icon"><ClipboardList size={40} strokeWidth={1.5} /></div>
                  <p className="itin-empty-title">Your plan is empty</p>
                  <p className="itin-empty-sub">
                    Add eco-spots from the recommendations to start building your green trip.
                  </p>
                </div>
              ) : (
                <div className="itin-date-groups">
                  {Object.entries(groupByDate(savedPlan)).map(([date, stops]) => {
                    const totalBudget = stops.reduce((sum, s) => sum + s.budget, 0);
                    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
                      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
                    });
                    return (
                      <div className="itin-date-group" key={date}>
                        <div className="itin-date-header">
                          <span className="itin-date-label">
                            <CalendarCheck size={13} strokeWidth={2.5} className="me-1" />
                            {formattedDate}
                          </span>
                          <span className="itin-date-total">
                            <Wallet size={12} strokeWidth={2.5} className="me-1" />
                            RM{totalBudget} total
                          </span>
                        </div>
                        {stops.map((item) => {
                          const cfg = IMPACT_CONFIG[item.impact];
                          const key = `${item.id}-${item.plannedDate}`;
                          const isEditing = editingKey === key;
                          return isEditing ? (
                            <div className="itin-plan-card itin-plan-card-edit" key={key}>
                              <div className="itin-plan-edit-body">
                                <h6 className="itin-plan-name mb-2">{item.name}</h6>
                                <div className="itin-edit-fields">
                                  <div className="itin-edit-field">
                                    <label className="itin-edit-label">Date</label>
                                    <input
                                      type="date"
                                      className="itin-edit-input"
                                      value={editForm.plannedDate}
                                      onChange={(e) => setEditForm((f) => ({ ...f, plannedDate: e.target.value }))}
                                    />
                                  </div>
                                  <div className="itin-edit-field">
                                    <label className="itin-edit-label">Notes</label>
                                    <textarea
                                      className="itin-edit-textarea"
                                      rows={2}
                                      placeholder="Add notes..."
                                      value={editForm.notes}
                                      onChange={(e) => setEditForm((f) => ({ ...f, notes: e.target.value }))}
                                    />
                                  </div>
                                </div>
                                <div className="itin-edit-actions">
                                  <button className="itin-edit-save" onClick={() => saveEdit(item.id, item.plannedDate)}>
                                    <Check size={13} strokeWidth={2.5} className="me-1" />Save
                                  </button>
                                  <button className="itin-edit-cancel" onClick={() => setEditingKey(null)}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="itin-plan-card" key={key}>
                              <div className="itin-plan-left">
                                <h6 className="itin-plan-name">{item.name}</h6>
                                <span className="itin-plan-city">
                                  <MapPin size={11} strokeWidth={2.5} className="me-1" />
                                  {CITY_LABELS[item.city] || item.city}
                                </span>
                                <span className="itin-plan-budget">
                                  <Wallet size={11} strokeWidth={2.5} className="me-1" />
                                  RM{item.budget}
                                </span>
                                {item.notes && <p className="itin-tl-notes">{item.notes}</p>}
                              </div>
                              <div className="itin-plan-right">
                                <span
                                  className="itin-impact-tag sm"
                                  style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.borderColor }}
                                >
                                  <cfg.Icon size={11} strokeWidth={2.5} />
                                  {cfg.label}
                                </span>
                                <button
                                  className="itin-edit-btn"
                                  onClick={() => startEdit(item)}
                                  aria-label="Edit stop"
                                >
                                  <Pencil size={13} strokeWidth={2.5} />
                                </button>
                                <button
                                  className="itin-del-btn"
                                  onClick={() => removeFromPlan(item.id, item.plannedDate)}
                                  aria-label="Remove stop"
                                >
                                  <Trash2 size={13} strokeWidth={2.5} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
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
