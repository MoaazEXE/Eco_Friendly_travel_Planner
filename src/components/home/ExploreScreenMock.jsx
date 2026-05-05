import { Heart, Star, Search } from 'lucide-react';
import { LeafCompassGuide } from '../LeafCompassGuide';

const DESTINATIONS = [
  { name: 'Kyoto',        country: 'Japan',           tag: 'Low Carbon',     eco: 5, img: 'https://images.unsplash.com/photo-1700474896901-6afb362d2f8c?w=400&q=70' },
  { name: 'Faroe Islands',country: 'Denmark',         tag: 'Zero Waste',     eco: 5, img: 'https://images.unsplash.com/photo-1666102063067-01193953651d?w=400&q=70' },
  { name: 'Costa Rica',   country: 'Central America', tag: 'Eco-Lodge',      eco: 4, img: 'https://images.unsplash.com/photo-1704386596483-ea345dfa9034?w=400&q=70' },
  { name: 'Ljubljana',    country: 'Slovenia',        tag: 'Car-Free City',  eco: 5, img: 'https://images.unsplash.com/photo-1731523003950-171dbdfdf722?w=400&q=70' },
  { name: 'Bhutan',       country: 'Himalayas',       tag: 'Carbon Negative',eco: 5, img: 'https://images.unsplash.com/photo-1761048152551-6cfe09973cbb?w=400&q=70' },
  { name: 'Lofoten',      country: 'Norway',          tag: 'Slow Travel',    eco: 4, img: 'https://images.unsplash.com/photo-1500207132533-4ffb1049612f?w=400&q=70' },
];

export default function ExploreScreenMock() {
  return (
    <div className="mock-screen" style={{ padding: '1rem', height: 440 }}>
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

      <div className="d-flex align-items-center" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', gap: '0.375rem' }}>
        <Search size={12} color="var(--gray-400)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.625rem', color: 'var(--gray-400)' }}>Search eco-friendly destinations…</span>
      </div>

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
