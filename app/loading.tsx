export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--ag-background-light, #f8fafc)' }}>
      <div className="text-center">
        {/* Branded pulsing logo container */}
        <div
          style={{
            width: 80,
            height: 80,
            margin: '0 auto 1.5rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0052CC 0%, #0747A6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'dr-pulse 2s ease-in-out infinite',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <p style={{
          color: 'var(--ag-primary-blue, #0052CC)',
          fontWeight: 600,
          fontSize: '1rem',
          letterSpacing: '-0.01em',
        }}>
          Loading...
        </p>
        <style>{`
          @keyframes dr-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.08); opacity: 0.85; }
          }
        `}</style>
      </div>
    </div>
  );
}
