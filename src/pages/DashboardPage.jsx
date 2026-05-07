import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Heart, Leaf, MapPin,
  BarChart2, ChevronRight, Plus,
} from 'lucide-react';
import StarRating from '../components/ui/StarRating';
import { useAppContext } from '../context/AppContext';
import { ECO_OPTIONS, CITY_LABELS } from '../data/ecoOptions';
import { formatDate } from '../utils/formatDate';
import StatCard from '../components/ui/StatCard';
import '../styles/dashboard.css';

const RECOMMENDATIONS = ECO_OPTIONS.slice(0, 3);
const CITY_IMAGE = {
  kl:     'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&q=75',
  penang: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=75',
  melaka: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=75',
  sabah:  'https://images.unsplash.com/photo-1518136247453-74e7b5265980?w=800&q=75',
};
const IMPACT_ECO = { Low: 5, Medium: 3, High: 1 };

export default function Dashboard() {
  const { user, favourites, savedPlan } = useAppContext();

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextStop = savedPlan
    .filter(s => new Date(s.plannedDate) >= today)
    .sort((a, b) => new Date(a.plannedDate) - new Date(b.plannedDate))[0] ?? null;

  const nextTrip = nextStop
    ? {
        city:     CITY_LABELS[nextStop.city] || nextStop.city,
        stopName: nextStop.name,
        date:     nextStop.plannedDate,
        imageUrl: CITY_IMAGE[nextStop.city] ?? null,
        ecoScore: IMPACT_ECO[nextStop.impact] ?? 4,
      }
    : null;

  const daysUntil = nextTrip
    ? Math.ceil((new Date(nextTrip.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <main className="eco-inner-page">
      <div className="container">

        {/* ── Hero section ───────────────────────────────── */}
        <div className="mb-4">
          <h1 className="eco-page-title">
            <div className="d-flex align-items-center gap-2" style={{ marginBottom: '0.25rem' }}>
              <div
                className="d-flex align-items-center justify-content-center rounded-circle fw-bold flex-shrink-0"
                style={{ width: '2rem', height: '2rem', background: 'var(--green-dark)', color: 'var(--white)', fontSize: '0.75rem' }}
              >
                {user.firstName[0].toUpperCase()}
              </div>
              <span>{greeting}, {user.firstName}</span>
            </div>
          </h1>
          <p className="eco-lead">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* ── Trip badge ─────────────────────────────────── */}
        {daysUntil !== null && daysUntil > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/itinerary" className="d-inline-flex align-items-center gap-2 text-decoration-none db-trip-badge">
              <Calendar size={16} />
              {nextTrip.city} in {daysUntil} days
              <ChevronRight size={14} />
            </Link>
          </div>
        )}

        {/* ── Stats row ───────────────────────────────────── */}
        <div className="row g-3" style={{ marginBottom: '2rem' }}>
          <div className="col-12 col-sm-4">
            <StatCard value={`${user.carbonSaved} kg`} label="CO₂ Saved" sub="vs. avg itinerary" icon={<Leaf size={18} />} accent />
          </div>
          <div className="col-12 col-sm-4">
            <StatCard value={savedPlan.length} label="Stops Planned" sub={`across ${new Set(savedPlan.map(s => s.plannedDate)).size} day(s)`} icon={<MapPin size={18} />} />
          </div>
          <div className="col-12 col-sm-4">
            <StatCard value={favourites.length} label="Places Saved" sub="eco-certified spots" icon={<Heart size={18} />} />
          </div>
        </div>

        {/* ── Main grid ───────────────────────────────────── */}
        <div className="row g-4" style={{ marginBottom: '2rem' }}>

          {/* Next trip card */}
          <div className="col-12 col-lg-8">
            {nextTrip ? (
              <div className="card-eco overflow-hidden">
                <div className="db-trip-banner">
                  {nextTrip.imageUrl && <img src={nextTrip.imageUrl} alt={nextTrip.city} />}
                  <div className="db-trip-gradient" />
                  <div className="db-trip-overlay">
                    <span className="db-trip-label">Next Trip</span>
                    <h2 className="fw-bold text-white fs-5 m-0">{nextTrip.city}</h2>
                    <p className="mb-0 mt-1 small" style={{ color: 'var(--white-a70)' }}>{nextTrip.stopName}</p>
                    <div className="d-flex align-items-center gap-1 mt-1 small" style={{ color: 'var(--white-a70)' }}>
                      <Calendar size={12} />
                      <span>{formatDate(nextTrip.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-1">
                      <Leaf size={14} color="var(--green-dark)" />
                      <span className="text-secondary small">Eco Score</span>
                    </div>
                    <StarRating count={nextTrip.ecoScore ?? 4} size={13} />
                  </div>
                  <Link to="/itinerary" className="d-inline-flex align-items-center gap-1 text-decoration-none text-success fw-semibold small">
                    View itinerary <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card-eco db-empty d-flex flex-column align-items-center justify-content-center text-center p-5">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{ width: '3rem', height: '3rem', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)' }}
                >
                  <MapPin size={20} color="var(--green-dark)" />
                </div>
                <p className="fw-semibold text-secondary mb-2">No trips planned yet</p>
                <p className="text-muted small mb-4">Start by exploring eco-friendly destinations</p>
                <Link to="/eco-options" className="btn-eco-dark d-inline-flex align-items-center gap-2 text-decoration-none">
                  <Plus size={16} /> Explore destinations
                </Link>
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="col-12 col-lg-4">
            <div className="card-eco p-4 h-100">
              <h3 className="fw-bold mb-4" style={{ fontSize: '0.9375rem', color: 'var(--gray-900)' }}>Quick Actions</h3>
              <div className="d-flex flex-column gap-2">
                {[
                  { to: '/eco-options', label: 'Browse eco destinations',  icon: <MapPin    size={16} color="var(--green-dark)" /> },
                  { to: '/itinerary',   label: 'Plan a new itinerary',      icon: <Calendar  size={16} color="var(--green-dark)" /> },
                  { to: '/calculator',  label: 'Calculate trip emissions',  icon: <BarChart2 size={16} color="var(--green-dark)" /> },
                  { to: '/weather',     label: 'Check destination weather', icon: <Leaf      size={16} color="var(--green-dark)" /> },
                ].map(({ to, label, icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="d-flex align-items-center gap-3 text-decoration-none p-3 rounded-3 border text-secondary fw-medium small"
                    style={{ transition: 'background 0.15s', fontSize: '0.875rem' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                      style={{ width: '2rem', height: '2rem', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)' }}
                    >
                      {icon}
                    </div>
                    {label}
                    <ChevronRight size={14} color="var(--gray-400)" style={{ marginLeft: 'auto' }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Eco recommendations ─────────────────────────── */}
        <div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h3 className="eco-section-title">Recommended for You</h3>
            <Link to="/eco-options" className="d-inline-flex align-items-center gap-1 text-decoration-none text-success fw-semibold small">
              See all <ArrowRight size={13} />
            </Link>
          </div>

          <div className="row g-4">
            {RECOMMENDATIONS.map((r) => (
              <div key={r.id} className="col-12 col-md-4">
                <div className="card-eco overflow-hidden">
                  <div className="db-rec-banner">
                    <img src={r.image} alt={r.name} />
                    <span className="db-rec-badge">{r.category}</span>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-start justify-content-between mb-1">
                      <div>
                        <div className="fw-bold mb-0" style={{ fontSize: '0.9375rem', color: 'var(--gray-900)' }}>{r.name}</div>
                        <div className="text-muted small mb-0">{CITY_LABELS[r.city] || r.city}</div>
                      </div>
                      <StarRating count={r.eco} />
                    </div>
                    <p className="text-muted small mb-0" style={{ lineHeight: 1.5 }}>{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
