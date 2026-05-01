import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, MapPin, Leaf, Train, Heart, Check,
  Star, Search, Calendar, Wind, BarChart2, Globe, Clock,
} from 'lucide-react';
import { LeafCompassGuide } from '../components/LeafCompassGuide';
import '../styles/home.css';

/* ── Animation helpers ──────────────────────────────────────── */
const VP   = { once: true, margin: '-72px' };
const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    VP,
  transition:  { duration: 0.65, ease, delay },
});

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    VP,
  transition:  { duration: 0.55, ease, delay },
});

const slideRight = (delay = 0) => ({
  initial:     { opacity: 0, x: -36 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    VP,
  transition:  { duration: 0.7, ease, delay },
});

const slideLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: 36 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    VP,
  transition:  { duration: 0.7, ease, delay },
});

/* ── Browser chrome frame ───────────────────────────────────── */
function BrowserFrame({ url = '', children }) {
  return (
    <div className="browser-frame">
      <div className="browser-chrome">
        <div className="d-flex gap-1" style={{ flexShrink: 0 }}>
          <div className="browser-dot browser-dot-red" />
          <div className="browser-dot browser-dot-amber" />
          <div className="browser-dot browser-dot-green" />
        </div>
        <div className="browser-url">ecoway.app/{url}</div>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

/* ── Floating annotation card ───────────────────────────────── */
function FloatingCard({ children, style = {}, delay = 0, animate = false }) {
  const motionProps = animate
    ? {
        initial:    { opacity: 0, scale: 0.85, y: 10 },
        animate:    { opacity: 1, scale: 1,    y: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
      }
    : {
        initial:     { opacity: 0, scale: 0.85, y: 10 },
        whileInView: { opacity: 1, scale: 1,    y: 0 },
        viewport:    { once: true },
        transition:  { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
      };

  return (
    <motion.div {...motionProps} className="floating-card" style={{ ...style }}>
      {children}
    </motion.div>
  );
}

/* ── Section label badge ────────────────────────────────────── */
function SectionLabel({ children, dark = false }) {
  return (
    <div className={dark ? 'section-label-dark' : 'section-label'} style={{ marginBottom: '1.25rem' }}>
      <Leaf size={12} />
      {children}
    </div>
  );
}

/* ── Destination data ───────────────────────────────────────── */
const DESTINATIONS = [
  { name: 'Kyoto',        country: 'Japan',           tag: 'Low Carbon',     eco: 5, img: 'https://images.unsplash.com/photo-1700474896901-6afb362d2f8c?w=400&q=70' },
  { name: 'Faroe Islands',country: 'Denmark',         tag: 'Zero Waste',     eco: 5, img: 'https://images.unsplash.com/photo-1666102063067-01193953651d?w=400&q=70' },
  { name: 'Costa Rica',   country: 'Central America', tag: 'Eco-Lodge',      eco: 4, img: 'https://images.unsplash.com/photo-1704386596483-ea345dfa9034?w=400&q=70' },
  { name: 'Ljubljana',    country: 'Slovenia',        tag: 'Car-Free City',  eco: 5, img: 'https://images.unsplash.com/photo-1731523003950-171dbdfdf722?w=400&q=70' },
  { name: 'Bhutan',       country: 'Himalayas',       tag: 'Carbon Negative',eco: 5, img: 'https://images.unsplash.com/photo-1761048152551-6cfe09973cbb?w=400&q=70' },
  { name: 'Lofoten',      country: 'Norway',          tag: 'Slow Travel',    eco: 4, img: 'https://images.unsplash.com/photo-1500207132533-4ffb1049612f?w=400&q=70' },
];

/* ── Explore screen mock ────────────────────────────────────── */
function ExploreScreenMock() {
  return (
    <div className="mock-screen" style={{ padding: '1rem', height: 440 }}>
      {/* Mini top bar */}
      <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: '0.75rem' }}>
        <div className="d-flex align-items-center" style={{ gap: '0.375rem' }}>
          <LeafCompassGuide size="xs" />
          <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--gray-700)' }}>EcoWay</span>
        </div>
        <div className="d-flex align-items-center" style={{ gap: '0.375rem' }}>
          <div style={{ width: '1.25rem', height: '1.25rem', borderRadius: '0.25rem', background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={10} color="var(--gray-400)" />
          </div>
          <div style={{ width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)' }} />
        </div>
      </div>

      {/* Search bar */}
      <div className="d-flex align-items-center" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', gap: '0.375rem' }}>
        <Search size={12} color="var(--gray-400)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.625rem', color: 'var(--gray-400)' }}>Search eco-friendly destinations…</span>
      </div>

      {/* Filter chips */}
      <div className="d-flex" style={{ gap: '0.375rem', marginBottom: '1rem', overflow: 'hidden' }}>
        {['All', 'Asia', 'Europe', 'Americas', 'Islands'].map((f, i) => (
          <span
            key={f}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.5625rem',
              fontWeight: 600,
              flexShrink: 0,
              background: i === 0 ? 'var(--gray-900)' : 'var(--white)',
              color:      i === 0 ? 'var(--white)'    : 'var(--gray-500)',
              border:     i === 0 ? 'none'            : '1px solid var(--gray-200)',
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Destination grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
        {DESTINATIONS.map((d) => (
          <div key={d.name} style={{ background: 'var(--white)', borderRadius: '0.5rem', border: '1px solid var(--gray-200)', overflow: 'hidden' }}>
            <div style={{ height: '4rem', position: 'relative', overflow: 'hidden' }}>
              <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="eager" />
              <span style={{ position: 'absolute', bottom: '0.375rem', left: '0.375rem', background: 'rgba(27,67,50,0.9)', color: 'var(--white)', fontSize: '0.4375rem', fontWeight: 600, padding: '0.125rem 0.375rem', borderRadius: '9999px', lineHeight: 1.4 }}>
                {d.tag}
              </span>
            </div>
            <div style={{ padding: '0.375rem' }}>
              <div style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--gray-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
              <div style={{ fontSize: '0.5rem', color: 'var(--gray-500)' }}>{d.country}</div>
              <div className="d-flex" style={{ marginTop: '0.125rem', gap: '1px' }}>
                {Array.from({ length: d.eco }).map((_, j) => (
                  <Star key={j} size={8} color="var(--green-secondary)" fill="var(--green-secondary)" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Calculator screen mock ─────────────────────────────────── */
function CalculatorScreenMock() {
  return (
    <div className="mock-screen d-flex" style={{ padding: '1rem', gap: '0.75rem', height: 380 }}>
      {/* Form */}
      <div style={{ flex: 1, background: 'var(--white)', borderRadius: '0.75rem', border: '1px solid var(--gray-200)', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Transportation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem' }}>
            {[{ icon: '✈', label: 'Flight', active: false }, { icon: '🚂', label: 'Train', active: true }, { icon: '🚗', label: 'Car', active: false }, { icon: '🚌', label: 'Bus', active: false }].map((t) => (
              <div key={t.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem', borderRadius: '0.5rem', border: `1px solid ${t.active ? 'var(--green-success)' : 'var(--gray-200)'}`, background: t.active ? 'var(--green-subtle)' : 'transparent', color: t.active ? 'var(--green-dark)' : 'var(--gray-500)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.875rem', marginBottom: '0.125rem' }}>{t.icon}</span>
                <span style={{ fontSize: '0.5625rem', fontWeight: 500 }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Accommodation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem' }}>
            {[{ icon: '🏨', label: 'Hotel', active: false }, { icon: '🌿', label: 'Eco-Lodge', active: true }, { icon: '🏠', label: 'Hostel', active: false }, { icon: '⛺', label: 'Camping', active: false }].map((t) => (
              <div key={t.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem', borderRadius: '0.5rem', border: `1px solid ${t.active ? 'var(--green-success)' : 'var(--gray-200)'}`, background: t.active ? 'var(--green-subtle)' : 'transparent', color: t.active ? 'var(--green-dark)' : 'var(--gray-500)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.875rem', marginBottom: '0.125rem' }}>{t.icon}</span>
                <span style={{ fontSize: '0.5625rem', fontWeight: 500 }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'auto', background: 'var(--gray-900)', color: 'var(--white)', fontSize: '0.625rem', fontWeight: 600, textAlign: 'center', padding: '0.5rem', borderRadius: '0.5rem' }}>
          Calculate Emissions
        </div>
      </div>

      {/* Results panel */}
      <div style={{ width: '7.5rem', flexShrink: 0, background: 'var(--green-darker)', borderRadius: '0.75rem', padding: '0.75rem', display: 'flex', flexDirection: 'column', color: 'var(--white)' }}>
        <div style={{ fontSize: '0.5rem', fontWeight: 600, color: 'var(--green-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Total CO₂</div>
        <div className="d-flex align-items-baseline" style={{ gap: '0.25rem', marginBottom: '0.125rem' }}>
          <span style={{ fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.025em' }}>52</span>
          <span style={{ color: 'var(--green-secondary)', fontSize: '0.5625rem' }}>kg</span>
        </div>
        <div style={{ fontSize: '0.5rem', color: 'var(--green-mid)', marginBottom: '1rem' }}>vs 340 kg avg ✈</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1rem' }}>
          {[{ label: 'Transport', value: '27 kg', pct: '50%', col: 'var(--green-secondary)' }, { label: 'Stay', value: '25 kg', pct: '48%', col: 'var(--green-light)' }].map((r) => (
            <div key={r.label}>
              <div className="d-flex justify-content-between" style={{ fontSize: '0.5625rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--green-light)' }}>{r.label}</span>
                <span style={{ fontWeight: 500 }}>{r.value}</span>
              </div>
              <div style={{ height: '0.25rem', background: 'rgba(27,67,50,0.7)', borderRadius: '9999px' }}>
                <div style={{ height: '0.25rem', background: r.col, borderRadius: '9999px', width: r.pct }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', background: 'rgba(27,67,50,0.6)', borderRadius: '0.5rem', padding: '0.5rem', border: '1px solid var(--green-dark)' }}>
          <div style={{ fontSize: '0.5rem', color: 'var(--green-secondary)', textAlign: 'center', marginBottom: '0.375rem' }}>Eco-lodge saves 150 kg vs hotel</div>
          <div style={{ background: 'var(--white)', color: 'var(--green-darker)', fontSize: '0.5rem', fontWeight: 700, textAlign: 'center', padding: '0.25rem', borderRadius: '0.375rem' }}>Offset for $0.78</div>
        </div>
      </div>
    </div>
  );
}

/* ── Itinerary screen mock ───────────────────────────────────── */
const STOPS = [
  { city: 'Tokyo',   date: 'May 15 – 17', activities: 'Shinjuku Gyoen park · Electric bike tour · Zero-waste ramen',   color: 'var(--green-secondary)' },
  { city: 'Hakone',  date: 'May 18 – 19', activities: 'Mt. Fuji eco-hike · Natural onsen stay · Local ryokan',          color: 'var(--green-light)' },
  { city: 'Kyoto',   date: 'May 20 – 23', activities: 'Arashiyama bamboo grove · Vegan kaiseki · Cycle to Fushimi',     color: 'var(--green-dark)' },
];

function ItineraryScreenMock() {
  return (
    <div className="mock-screen" style={{ padding: '1.25rem', height: 370 }}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: '1.25rem' }}>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gray-900)' }}>Japan · 9 Days</div>
          <div style={{ fontSize: '0.625rem', color: 'var(--gray-500)', marginTop: '0.125rem' }}>May 15 – May 23, 2025</div>
        </div>
        <div className="d-flex align-items-center" style={{ gap: '0.25rem', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)', padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
          <Leaf size={12} color="var(--green-dark)" />
          <span style={{ fontSize: '0.5625rem', color: 'var(--green-dark)', fontWeight: 600 }}>Low Carbon Route</span>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '0.6875rem', top: '0.75rem', bottom: 0, width: '1px', background: 'var(--gray-200)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {STOPS.map((s, i) => (
            <div key={i} className="d-flex align-items-start" style={{ gap: '0.75rem' }}>
              <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: s.color, border: '2px solid var(--white)', flexShrink: 0, zIndex: 1, position: 'relative', marginTop: '0.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--white)', fontSize: '0.5rem', fontWeight: 700 }}>{i + 1}</span>
              </div>
              <div style={{ flex: 1, background: 'var(--white)', borderRadius: '0.75rem', border: '1px solid var(--gray-200)', padding: '0.75rem' }}>
                <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--gray-900)' }}>{s.city}</span>
                  <span style={{ fontSize: '0.5625rem', color: 'var(--gray-400)' }}>{s.date}</span>
                </div>
                <p style={{ fontSize: '0.5625rem', color: 'var(--gray-500)', lineHeight: 1.625, margin: 0 }}>{s.activities}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="d-flex align-items-center justify-content-between" style={{ marginTop: '1rem', borderTop: '1px solid var(--gray-200)', paddingTop: '0.75rem' }}>
        <div className="d-flex align-items-center" style={{ gap: '0.25rem' }}>
          <Train size={12} color="var(--green-dark)" />
          <span style={{ fontSize: '0.5625rem', color: 'var(--gray-600)', fontWeight: 500 }}>Shinkansen throughout</span>
        </div>
        <div style={{ background: 'var(--gray-900)', color: 'var(--white)', fontSize: '0.5625rem', fontWeight: 600, padding: '0.25rem 0.625rem', borderRadius: '0.375rem' }}>+ Add Stop</div>
      </div>
    </div>
  );
}

/* ── Main HomePage component ────────────────────────────────── */
export default function HomePage() {
  return (
    <main style={{ flex: 1 }}>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="home-hero">
        <div className="hero-glow" />
        <div className="container-xl px-4 px-lg-5" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="row align-items-center g-5">

            {/* Copy */}
            <div className="col-12 col-lg-5 text-center text-lg-start" style={{ zIndex: 1 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
                <SectionLabel>Eco-Conscious Travel</SectionLabel>
              </motion.div>

              <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.08 }}>
                See the world.{' '}
                <br />
                <span>Keep it worth seeing.</span>
              </motion.h1>

              <motion.p className="hero-lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.18 }}>
                EcoWay is a complete platform for eco-conscious travelers — discover
                green destinations, track your carbon footprint, and build
                low-impact itineraries that match your values.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.26 }}
                className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start align-items-center gap-2" style={{ marginBottom: '2.5rem' }}>
                <Link to="/dashboard" className="btn-dark-cta w-100 w-sm-auto">
                  Start Planning <ArrowRight size={16} />
                </Link>
                <Link to="/calculator" className="btn-outline-cta w-100 w-sm-auto">
                  Calculate My Footprint
                </Link>
              </motion.div>

              <motion.div className="trust-badges justify-content-center justify-content-lg-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
                {['2,400+ eco destinations', 'Free to use', 'No account required'].map((label) => (
                  <div key={label} className="trust-badge">
                    <Check size={14} color="var(--green-success)" />
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Browser mockup */}
            <div className="col-12 col-lg-7" style={{ zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: 44, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
                whileHover={{ y: -5 }}
                style={{ position: 'relative' }}
              >
                <BrowserFrame url="explore"><ExploreScreenMock /></BrowserFrame>

                <FloatingCard animate delay={1.0} style={{ bottom: '-1.25rem', left: '-1rem', padding: '0.625rem 0.875rem' }}>
                  <div className="d-flex align-items-center" style={{ gap: '0.625rem' }}>
                    <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Globe size={14} color="var(--green-dark)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-900)' }}>2,400+ destinations</div>
                      <div style={{ fontSize: '0.625rem', color: 'var(--gray-500)' }}>Eco-verified worldwide</div>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard animate delay={1.15} style={{ top: '-1rem', right: '-0.5rem', padding: '0.625rem 0.875rem' }}>
                  <div className="d-flex align-items-center" style={{ gap: '0.625rem' }}>
                    <div className="d-flex" style={{ gap: '1px' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} color="var(--green-secondary)" fill="var(--green-secondary)" />
                      ))}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-900)' }}>Top Rated</div>
                  </div>
                </FloatingCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ═════════════════════════════════════ */}
      <section className="home-section-white" style={{ borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)', padding: '3rem 0' }}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row g-4">
            {[
              { value: '2,400+',   label: 'Eco destinations',       sub: 'across 50+ countries',        icon: <MapPin   size={16} /> },
              { value: '18,000+',  label: 'kg CO₂ tracked',         sub: 'saved by smarter choices',    icon: <BarChart2 size={16} /> },
              { value: '94%',      label: 'Travelers satisfied',     sub: 'with their eco choices',      icon: <Heart    size={16} /> },
              { value: '4× lower', label: 'Emissions on average',    sub: 'vs typical itineraries',      icon: <Leaf     size={16} /> },
            ].map(({ value, label, sub, icon }, i) => (
              <motion.div key={label} {...fadeUp(i * 0.08)} className="col-6 col-lg-3">
                <div className="stat-icon">{icon}</div>
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
                <div className="stat-sub">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURE 1: EXPLORE ══════════════════════════════ */}
      <section className="home-section-cream" style={{ padding: '5rem 0' }}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row align-items-center g-5">
            {/* Copy */}
            <div className="col-12 col-lg-5 text-center text-lg-start">
              <motion.div {...fadeUp(0)}><SectionLabel>Destination Discovery</SectionLabel></motion.div>
              <motion.h2 {...fadeUp(0.06)} className="feature-h2">Find destinations that match your values.</motion.h2>
              <motion.p {...fadeUp(0.12)} className="feature-lead">
                Browse 2,400+ eco-certified destinations with transparent sustainability
                ratings — filtered by carbon footprint, local conservation status, and
                verified eco-lodge availability.
              </motion.p>
              <motion.div {...fadeUp(0.18)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {['Verified eco-certification on every listing', 'Carbon footprint per destination, up front', 'Filter by transport type, climate, and region'].map((item) => (
                  <div key={item} className="check-item">
                    <div className="check-icon"><Check size={12} color="var(--green-dark)" /></div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>{item}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div {...fadeUp(0.24)}>
                <Link to="/eco-options" className="feature-link">
                  Explore destinations
                  <ArrowRight size={16} className="feature-link-arrow" />
                </Link>
              </motion.div>
            </div>

            {/* Mockup */}
            <div className="col-12 col-lg-7">
              <motion.div {...slideLeft(0.08)} style={{ position: 'relative' }}>
                <motion.div whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }} style={{ position: 'relative' }}>
                  <BrowserFrame url="explore"><ExploreScreenMock /></BrowserFrame>
                  <FloatingCard delay={0.4} style={{ bottom: '-1.25rem', right: '-1rem', padding: '0.75rem' }}>
                    <div className="d-flex align-items-center" style={{ gap: '0.625rem' }}>
                      <img src="https://images.unsplash.com/photo-1700474896901-6afb362d2f8c?w=60&q=70" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--gray-100)' }} alt="Kyoto" />
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-900)' }}>Kyoto, Japan</div>
                        <div className="d-flex align-items-center" style={{ gap: '0.25rem', marginTop: '0.125rem' }}>
                          <span style={{ fontSize: '0.5625rem', background: 'var(--green-subtle)', color: 'var(--green-dark)', padding: '0.125rem 0.375rem', borderRadius: '9999px', fontWeight: 600 }}>Low Carbon</span>
                          <span style={{ fontSize: '0.5625rem', color: 'var(--gray-400)' }}>5.0 ★</span>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURE 2: CALCULATOR ═══════════════════════════ */}
      <section className="home-section-white" style={{ padding: '5rem 0' }}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            {/* Copy */}
            <div className="col-12 col-lg-5 text-center text-lg-start">
              <motion.div {...fadeUp(0)}><SectionLabel>Carbon Footprint</SectionLabel></motion.div>
              <motion.h2 {...fadeUp(0.06)} className="feature-h2">Know the real cost before you go.</motion.h2>
              <motion.p {...fadeUp(0.12)} className="feature-lead">
                Enter your transport and accommodation choices, and get an honest
                CO₂ estimate instantly. Compare options, find the low-carbon
                alternative, and offset what you can't avoid.
              </motion.p>
              <motion.div {...fadeUp(0.18)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {['Side-by-side comparison of flight vs. train vs. bus', 'Accommodation impact: hotel vs. eco-lodge vs. camping', 'One-click carbon offset calculation'].map((item) => (
                  <div key={item} className="check-item">
                    <div className="check-icon"><Check size={12} color="var(--green-dark)" /></div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>{item}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div {...fadeUp(0.24)}>
                <Link to="/calculator" className="feature-link">
                  Calculate my trip
                  <ArrowRight size={16} className="feature-link-arrow" />
                </Link>
              </motion.div>
            </div>

            {/* Mockup */}
            <div className="col-12 col-lg-7">
              <motion.div {...slideRight(0.08)} style={{ position: 'relative' }}>
                <motion.div whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }} style={{ position: 'relative' }}>
                  <BrowserFrame url="calculator"><CalculatorScreenMock /></BrowserFrame>
                  <FloatingCard delay={0.4} style={{ top: '-1.25rem', left: '-1rem', padding: '0.625rem 0.875rem' }}>
                    <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                      <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'var(--green-subtle)', border: '1px solid var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Leaf size={14} color="var(--green-dark)" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-900)' }}>85% lower</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--gray-500)' }}>vs. average flight trip</div>
                      </div>
                    </div>
                  </FloatingCard>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURE 3: ITINERARY ════════════════════════════ */}
      <section className="home-section-cream" style={{ padding: '5rem 0' }}>
        <div className="container-xl px-4 px-lg-5">
          {/* Section header */}
          <div className="text-center" style={{ maxWidth: '42rem', margin: '0 auto 4rem' }}>
            <motion.div {...fadeUp(0)} className="d-flex justify-content-center"><SectionLabel>Smart Itinerary</SectionLabel></motion.div>
            <motion.h2 {...fadeUp(0.06)} className="feature-h2">Plan your whole journey,<br /> not just the flights.</motion.h2>
            <motion.p {...fadeUp(0.12)} className="feature-lead" style={{ marginBottom: 0 }}>
              Build day-by-day itineraries with eco-conscious stops, local
              transport options, and sustainability scores built right in.
            </motion.p>
          </div>

          {/* Centered mockup */}
          <motion.div {...fadeUp(0.1)} style={{ position: 'relative', maxWidth: '48rem', margin: '0 auto' }}>
            <motion.div whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}>
              <BrowserFrame url="itinerary"><ItineraryScreenMock /></BrowserFrame>
            </motion.div>
            <FloatingCard delay={0.35} style={{ left: '-2rem', top: '30%', padding: '0.625rem 0.75rem' }}>
              <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                <Train size={16} color="var(--green-dark)" />
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-900)' }}>Shinkansen route</div>
                  <div style={{ fontSize: '0.625rem', color: 'var(--gray-500)' }}>92% less CO₂ than flying</div>
                </div>
              </div>
            </FloatingCard>
            <FloatingCard delay={0.5} style={{ right: '-2rem', bottom: '20%', padding: '0.625rem 0.75rem' }}>
              <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                <Clock size={16} color="var(--gray-500)" />
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-900)' }}>9 days planned</div>
                  <div style={{ fontSize: '0.625rem', color: 'var(--gray-500)' }}>3 stops · 1 country</div>
                </div>
              </div>
            </FloatingCard>
          </motion.div>

          {/* Sub-features */}
          <div className="row g-4 justify-content-center" style={{ marginTop: '4rem', maxWidth: '48rem', margin: '4rem auto 0' }}>
            {[
              { icon: <Calendar size={16} color="var(--green-dark)" />, title: 'Day-by-day planning', desc: 'Structure your trip with dates, stops, and specific activities or restaurants.' },
              { icon: <Train    size={16} color="var(--green-dark)" />, title: 'Ground-first routing', desc: 'We suggest trains and buses between stops as the default — no pressure, just better options.' },
              { icon: <Wind     size={16} color="var(--green-dark)" />, title: 'Eco score per stop',   desc: 'Every planned stop gets an eco-impact score based on travel method and accommodation type.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.1)} className="col-12 col-sm-4 text-center">
                <div className="feature-icon-box">{icon}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-900)', marginBottom: '0.375rem' }}>{title}</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.625, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ECO VALUES (dark) ════════════════════════════════ */}
      <section className="home-section-dark" style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(167,243,208,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(52,211,153,0.1) 0%, transparent 50%)' }} />
        <div className="container-xl px-4 px-lg-5" style={{ position: 'relative' }}>
          <div style={{ maxWidth: '36rem', marginBottom: '3.5rem' }}>
            <motion.div {...fadeIn(0)}><SectionLabel dark>Our principles</SectionLabel></motion.div>
            <motion.h2 {...fadeUp(0.06)} style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Built for travelers<br /> who give a damn.
            </motion.h2>
          </div>
          <div className="row g-4">
            {[
              { icon: <BarChart2 size={20} />, title: 'Carbon Transparency',    body: 'Real estimates, not vague ratings. Every recommendation includes an honest CO₂ number.' },
              { icon: <Check     size={20} />, title: 'Verified Sustainability', body: 'Every destination is reviewed against independent eco-certification criteria — no greenwashing.' },
              { icon: <Train     size={20} />, title: 'Slow Travel First',       body: 'We surface ground routes and multi-day journeys as defaults. Flights are the last resort.' },
              { icon: <Globe     size={20} />, title: 'Offset & Act',            body: 'Track what you emit, reduce where you can, and offset the rest with vetted project-backed credits.' },
            ].map(({ icon, title, body }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.09)} className="col-12 col-sm-6 col-lg-3">
                <div className="principles-card">
                  <div className="principles-icon">{icon}</div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(167,243,208,0.8)', lineHeight: 1.625, margin: 0 }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════════ */}
      <section className="home-section-cream" style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cta-glow" />
        <div className="container" style={{ maxWidth: '56rem', textAlign: 'center', position: 'relative' }}>
          <motion.div {...fadeUp(0)} className="d-flex justify-content-center" style={{ marginBottom: '2rem' }}>
            <LeafCompassGuide size="lg" />
          </motion.div>
          <motion.h2 {...fadeUp(0.08)} style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 700, color: 'var(--gray-900)', letterSpacing: '-0.025em', lineHeight: 1.06, marginBottom: '1.5rem' }}>
            Your greener journey<br /> starts here.
          </motion.h2>
          <motion.p {...fadeUp(0.14)} style={{ fontSize: '1.125rem', color: 'var(--gray-500)', lineHeight: 1.625, marginBottom: '2.5rem', maxWidth: '36rem', margin: '0 auto 2.5rem' }}>
            Discover places worth protecting, plan trips that tread lightly, and
            travel with a clear conscience — all in one place.
          </motion.p>
          <motion.div {...fadeUp(0.2)} className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
            <Link to="/dashboard" className="btn-dark-cta w-100 w-sm-auto">
              Start Exploring <ArrowRight size={16} />
            </Link>
            <Link to="/register" className="btn-outline-cta w-100 w-sm-auto">
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
