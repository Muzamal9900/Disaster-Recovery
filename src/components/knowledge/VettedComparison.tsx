interface VettedComparisonProps {
  topic: string;
  vetted: string[];
  unvetted: string[];
}

export function VettedComparison({ topic, vetted, unvetted }: VettedComparisonProps) {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--ag-primary-blue, #0F2942)',
        marginBottom: '1rem',
        textAlign: 'center',
      }}>
        {topic}: Vetted vs Unvetted Contractors
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        {/* Vetted column */}
        <div
          className="ag-card-feature"
          style={{
            border: '2px solid #16a34a',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            background: '#f0fdf4',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: '#16a34a',
            fontWeight: 700,
            fontSize: '1.1rem',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
            NRPG-Vetted Contractor
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {vetted.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.5 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Unvetted column */}
        <div
          className="ag-card-feature"
          style={{
            border: '2px solid #dc2626',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            background: '#fef2f2',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: '#dc2626',
            fontWeight: 700,
            fontSize: '1.1rem',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            Unvetted Contractor
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {unvetted.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.5, color: '#991b1b' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
