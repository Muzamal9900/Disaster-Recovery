import { ShieldCheck, Check, XCircle, X } from 'lucide-react';

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
            <ShieldCheck size={24} strokeWidth={2.5} />
            NRPG-Vetted Contractor
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {vetted.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0, marginTop: '2px', color: '#16a34a' }}>
                  <Check size={18} strokeWidth={2.5} />
                </span>
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
            <XCircle size={24} strokeWidth={2.5} />
            Unvetted Contractor
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {unvetted.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9375rem', lineHeight: 1.5, color: '#991b1b' }}>
                <span style={{ flexShrink: 0, marginTop: '2px', color: '#dc2626' }}>
                  <X size={18} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
