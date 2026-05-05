import { Leaf, Train } from 'lucide-react';

const STOPS = [
  { city: 'Tokyo',   date: 'May 15 – 17', activities: 'Shinjuku Gyoen park · Electric bike tour · Zero-waste ramen',   color: 'var(--green-secondary)' },
  { city: 'Hakone',  date: 'May 18 – 19', activities: 'Mt. Fuji eco-hike · Natural onsen stay · Local ryokan',          color: 'var(--green-light)' },
  { city: 'Kyoto',   date: 'May 20 – 23', activities: 'Arashiyama bamboo grove · Vegan kaiseki · Cycle to Fushimi',     color: 'var(--green-dark)' },
];

export default function ItineraryScreenMock() {
  return (
    <div className="mock-screen" style={{ padding: '1.25rem', height: 370 }}>
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
