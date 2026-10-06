import React from 'react';
import { Award, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { VenturePulseStore } from '../services/store';

interface StoriesViewProps {
  searchQuery: string;
}

export const StoriesView: React.FC<StoriesViewProps> = ({ searchQuery }) => {
  const store = VenturePulseStore.getInstance();

  const filtered = store.successStories.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.businessName.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
          <Award size={15} /> Verified Outcomes
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Success Stories</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', fontSize: '14px', lineHeight: 1.6 }}>
          Audited turnarounds and exits. Each outcome is verified by an independent auditor — returns shown are historical, not guarantees.
        </p>
      </div>

      <div className="legal-disclaimer-box">
        <ShieldCheck size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Verification standard:</strong> platform-verified outcomes include auditor name and date.
          Past performance does not predict future results. Always conduct independent due diligence.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {filtered.map((story) => (
          <div key={story.id} className="glass-card" style={{ padding: '26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '19px', fontWeight: 800 }}>{story.title}</h2>
              <span className="badge badge-verified">
                <CheckCircle2 size={10} /> {story.verificationBadge.replace('_', ' ')}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {story.businessName} • Backed by {story.investorName} • {story.category}
            </p>
            <div className="grid-2" style={{ marginBottom: '14px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>Initial situation</div>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>{story.initialSituation}</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#34d399', fontWeight: 700, marginBottom: '6px' }}>Business outcome</div>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>{story.businessOutcome}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '13px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Funding: <strong style={{ color: '#fbbf24' }}>{story.fundingProvided}</strong></span>
              <span style={{ color: 'var(--text-secondary)' }}>Timeline: <strong style={{ color: '#fff' }}>{story.recoveryTimeline}</strong></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 600 }}>
                <TrendingUp size={14} /> {story.investorReturn}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Verified by {story.verifiedByAuditor} • {story.auditDate}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No stories match your search.</p>
        )}
      </div>
    </div>
  );
};
