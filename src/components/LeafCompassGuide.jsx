// Placeholder — swap src with the real image when provided
export function LeafCompassGuide({ size = 'md' }) {
  const px = { xs: 20, sm: 28, md: 40, lg: 56 }[size] ?? 40;

  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        background: 'var(--green-pale)',
        border: '1px solid var(--green-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <i
        className="bi bi-compass-fill"
        style={{ fontSize: px * 0.5, color: 'var(--green-dark)' }}
      />
    </div>
  );
}
