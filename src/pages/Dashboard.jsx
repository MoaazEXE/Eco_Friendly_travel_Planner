import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Heart, Leaf, MapPin,
  BarChart2, ChevronRight, Star, Plus,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RECOMMENDATIONS = [
  {
    name: 'Faroe Islands',
    country: 'Denmark',
    tag: 'Zero Waste',
    eco: 5,
    img: 'https://images.unsplash.com/photo-1666102063067-01193953651d?w=600&q=75',
    desc: 'Remote islands with no traffic lights, nearly zero emissions.',
  },
  {
    name: 'Costa Rica',
    country: 'Central America',
    tag: 'Eco-Lodge',
    eco: 4,
    img: 'https://images.unsplash.com/photo-1704386596483-ea345dfa9034?w=600&q=75',
    desc: '99% renewable energy grid. Exceptional biodiversity.',
  },
  {
    name: 'Bhutan',
    country: 'Himalayas',
    tag: 'Carbon Negative',
    eco: 5,
    img: 'https://images.unsplash.com/photo-1761048152551-6cfe09973cbb?w=600&q=75',
    desc: "The world's only carbon-negative country. Pristine trails.",
  },
];

function StatCard({ value, label, sub, icon, accent = false }) {
  return (
    <div
      className="rounded-3 border p-4 d-flex flex-column gap-3"
      style={{
        background: accent ? 'var(--green-darker)' : 'var(--white)',
        borderColor: accent ? 'var(--green-dark)' : 'var(--gray-200)',
        boxShadow: accent ? 'none' : '0 1px 3px var(--shadow-xs)',
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: '0.5rem',
          background: accent ? 'rgba(27,67,50,0.6)' : 'var(--green-subtle)',
          border: `1px solid ${accent ? 'rgba(45,106,79,0.5)' : 'var(--green-pale)'}`,
          color: accent ? 'rgba(110,231,183,1)' : 'var(--green-dark)',
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: accent ? 'var(--white)' : 'var(--gray-900)' }}>
          {value}
        </div>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '0.125rem', color: accent ? 'rgba(167,243,208,1)' : 'var(--gray-700)' }}>
          {label}
        </div>
        <div style={{ fontSize: '0.75rem', marginTop: '0.125rem', color: accent ? 'rgba(110,231,183,0.8)' : 'var(--gray-400)' }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, itineraries, favourites } = useAppContext();

  const nextTrip = itineraries[0];
  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const daysUntil = nextTrip
    ? Math.ceil((new Date(nextTrip.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <main style={{ flex: 1, backgroundColor: 'var(--green-surface)' }}>
      <div className="container-xl px-4 px-lg-5" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>

        {/* ── Welcome header ─────────────────────────────── */}
        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between gap-3" style={{ marginBottom: '2rem' }}>
          <div>
            <div className="d-flex align-items-center gap-2" style={{ marginBottom: '0.25rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'var(--green-dark)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                {user.firstName[0].toUpperCase()}
              </div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', margin: 0 }}>
                {greeting}, {user.firstName}
              </h1>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', margin: 0 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {daysUntil !== null && daysUntil > 0 && (
            <Link
              to="/itinerary"
              className="d-inline-flex align-items-center gap-2 text-decoration-none"
              style={{ padding: '0.5rem 1rem', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--green-dark)', flexShrink: 0 }}
            >
              <Calendar size={16} />
              {nextTrip.city} in {daysUntil} days
              <ChevronRight size={14} />
            </Link>
          )}
        </div>

        {/* ── Stats row ───────────────────────────────────── */}
        <div className="row g-3" style={{ marginBottom: '2rem' }}>
          <div className="col-12 col-sm-4">
            <StatCard value={`${user.carbonSaved} kg`} label="CO₂ Saved" sub="vs. avg itinerary" icon={<Leaf size={18} />} accent />
          </div>
          <div className="col-12 col-sm-4">
            <StatCard value={itineraries.length} label="Trips Planned" sub={`${itineraries.length} destinations logged`} icon={<MapPin size={18} />} />
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
              <div className="rounded-3 overflow-hidden border" style={{ background: 'var(--white)', borderColor: 'var(--gray-200)', boxShadow: '0 1px 3px var(--shadow-xs)' }}>
                <div style={{ position: 'relative', height: '11rem', overflow: 'hidden' }}>
                  {nextTrip.imageUrl && (
                    <img src={nextTrip.imageUrl} alt={nextTrip.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--green-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Next Trip</span>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--white)', margin: 0 }}>
                      {nextTrip.city}{nextTrip.country ? `, ${nextTrip.country}` : ''}
                    </h2>
                    <div className="d-flex align-items-center gap-1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      <Calendar size={12} />
                      <span>{formatDate(nextTrip.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-1">
                      <Leaf size={14} color="var(--green-dark)" />
                      <span style={{ fontSize: '0.8125rem', color: 'var(--gray-600)' }}>Eco Score</span>
                    </div>
                    <div className="d-flex gap-1">
                      {Array.from({ length: nextTrip.ecoScore ?? 5 }).map((_, i) => (
                        <Star key={i} size={13} color="var(--green-secondary)" fill="var(--green-secondary)" />
                      ))}
                    </div>
                    {nextTrip.carbonKg && (
                      <span style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>· {nextTrip.carbonKg} kg CO₂</span>
                    )}
                  </div>
                  <Link to="/itinerary" className="d-inline-flex align-items-center gap-1 text-decoration-none" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--green-dark)' }}>
                    View itinerary <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-3 border d-flex flex-column align-items-center justify-content-center text-center p-5" style={{ background: 'var(--white)', borderColor: 'var(--gray-200)', minHeight: '14rem', borderStyle: 'dashed' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <MapPin size={20} color="var(--green-dark)" />
                </div>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>No trips planned yet</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-400)', marginBottom: '1.25rem' }}>Start by exploring eco-friendly destinations</p>
                <Link to="/eco-options" className="d-inline-flex align-items-center gap-2 text-decoration-none" style={{ padding: '0.5rem 1.25rem', background: 'var(--gray-900)', color: 'var(--white)', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                  <Plus size={16} /> Explore destinations
                </Link>
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="col-12 col-lg-4">
            <div className="rounded-3 border p-4 h-100" style={{ background: 'var(--white)', borderColor: 'var(--gray-200)', boxShadow: '0 1px 3px var(--shadow-xs)' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1.25rem' }}>Quick Actions</h3>
              <div className="d-flex flex-column gap-2">
                {[
                  { to: '/eco-options',label: 'Browse eco destinations', icon: <MapPin size={16} color="var(--green-dark)" /> },
                  { to: '/itinerary',  label: 'Plan a new itinerary',    icon: <Calendar size={16} color="var(--green-dark)" /> },
                  { to: '/calculator', label: 'Calculate trip emissions', icon: <BarChart2 size={16} color="var(--green-dark)" /> },
                  { to: '/weather',    label: 'Check destination weather',icon: <Leaf size={16} color="var(--green-dark)" /> },
                ].map(({ to, label, icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="d-flex align-items-center gap-3 text-decoration-none rounded-3"
                    style={{ padding: '0.75rem', border: '1px solid var(--gray-200)', color: 'var(--gray-700)', fontSize: '0.875rem', fontWeight: 500, transition: 'background 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-50)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
          <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gray-900)', margin: 0 }}>Recommended for You</h3>
            <Link to="/eco-options" className="d-inline-flex align-items-center gap-1 text-decoration-none" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--green-dark)' }}>
              See all <ArrowRight size={13} />
            </Link>
          </div>

          <div className="row g-4">
            {RECOMMENDATIONS.map((r) => (
              <div key={r.name} className="col-12 col-md-4">
                <div className="rounded-3 border overflow-hidden" style={{ background: 'var(--white)', borderColor: 'var(--gray-200)', boxShadow: '0 1px 3px var(--shadow-xs)' }}>
                  <div style={{ height: '9rem', position: 'relative', overflow: 'hidden' }}>
                    <img src={r.img} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(27,67,50,0.9)', color: 'var(--white)', fontSize: '0.6875rem', fontWeight: 600, padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
                      {r.tag}
                    </span>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div className="d-flex align-items-start justify-content-between" style={{ marginBottom: '0.375rem' }}>
                      <div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--gray-900)' }}>{r.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{r.country}</div>
                      </div>
                      <div className="d-flex gap-1">
                        {Array.from({ length: r.eco }).map((_, i) => (
                          <Star key={i} size={12} color="var(--green-secondary)" fill="var(--green-secondary)" />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', margin: 0, lineHeight: 1.5 }}>{r.desc}</p>
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
