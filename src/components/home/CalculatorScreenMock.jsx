export default function CalculatorScreenMock() {
  return (
    <div className="mock-screen d-flex" style={{ padding: '1rem', gap: '0.75rem', height: 380 }}>
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
