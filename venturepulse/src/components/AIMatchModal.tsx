import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { VenturePulseStore } from '../services/store';

interface AIMatchModalProps {
  onClose: () => void;
}

export const AIMatchModal: React.FC<AIMatchModalProps> = ({ onClose }) => {
  const store = VenturePulseStore.getInstance();
  const matches = store.calculateAIMatches();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#06b6d4" /> AI Matches for {store.getCurrentUser().name}
          </h3>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Rule-based compatibility ranking from verified profiles, ticket sizes and sector fit.
            This is discovery assistance only — not financial advice.
          </p>
          {matches.map((m) => (
            <div key={m.targetId} style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ fontSize: '15px', color: '#fff' }}>{m.targetName}</strong>
                <span className="badge badge-level">{m.matchScore}% match • {m.targetType}</span>
              </div>
              <ul style={{ paddingLeft: '18px', marginBottom: '8px' }}>
                {m.rationale.map((r, i) => (
                  <li key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '3px' }}>{r}</li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {m.keySynergies.map((s) => (
                  <span key={s} style={{ fontSize: '11px', color: '#818cf8', background: 'rgba(99,102,241,0.1)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            <X size={14} /> Close
          </button>
        </div>
      </div>
    </div>
  );
};
