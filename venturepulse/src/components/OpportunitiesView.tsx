import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  MapPin,
  Building2,
  Filter
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';

interface OpportunitiesViewProps {
  onNavigateTab: (tab: string, targetId?: string) => void;
  searchQuery: string;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({ onNavigateTab, searchQuery }) => {
  const store = VenturePulseStore.getInstance();

  const [activeFilter, setActiveFilter] = useState<'all' | 'startup' | 'business_rescue' | 'growth_company' | 'small_business'>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | 'High Risk' | 'Medium Risk' | 'Lower Risk'>('all');

  const riskOptions: Array<typeof riskFilter> = ['all', 'Lower Risk', 'Medium Risk', 'High Risk'];

  const filteredOpps = store.opportunities.filter(opp => {
    if (activeFilter !== 'all' && opp.entityType !== activeFilter) return false;
    if (riskFilter !== 'all' && opp.riskLevel !== riskFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.companyName.toLowerCase().includes(q) ||
        opp.industry.toLowerCase().includes(q) ||
        opp.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getRiskBadge = (risk: string) => {
    if (risk === 'High Risk') return <span className="badge badge-risk-high"><AlertTriangle size={10} /> {risk}</span>;
    if (risk === 'Medium Risk') return <span className="badge badge-risk-medium"><AlertTriangle size={10} /> {risk}</span>;
    return <span className="badge badge-risk-low"><CheckCircle2 size={10} /> {risk}</span>;
  };

  const getEntityBadge = (type: string) => {
    const map: Record<string, { bg: string; color: string; label: string }> = {
      'startup': { bg: 'rgba(6,182,212,0.15)', color: '#22d3ee', label: 'Startup' },
      'business_rescue': { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', label: 'Business Rescue' },
      'growth_company': { bg: 'rgba(16,185,129,0.15)', color: '#34d399', label: 'Growth Company' },
      'small_business': { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', label: 'Small Business' },
    };
    const s = map[type] || map['startup'];
    return <span className="badge" style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}33` }}>{s.label}</span>;
  };

  const getStructureLabel = (s: string) => {
    const labels: Record<string, string> = {
      'equity': 'Equity Stake',
      'profit_sharing': 'Profit-Share',
      'convertible_note': 'Convertible Note',
      'debt_milestone': 'Structured Debt + Milestone'
    };
    return labels[s] || s;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
          <Briefcase size={15} /> Investment Opportunity Marketplace
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Investment Opportunities</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', fontSize: '14px', lineHeight: 1.6 }}>
          Discover verified investment opportunities across startups, growth companies, and business rescue cases. Every listing includes audited traction data and verified documents.
        </p>
      </div>

      {/* Risk Disclaimer */}
      <div className="legal-disclaimer-box risk-alert" style={{ marginBottom: '22px' }}>
        <AlertTriangle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>General Investment Risk Disclaimer:</strong> All investments carry risk. Platform risk assessments are editorial guidance based on available data. They do not constitute financial advice or guarantees. No investment return is guaranteed by VenturePulse. Conduct independent due diligence and consult qualified professionals.
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginRight: '6px' }}>
          <Filter size={13} /> Type:
        </span>
        {(
          [
            { id: 'all', label: 'All' },
            { id: 'startup', label: 'Startups' },
            { id: 'business_rescue', label: 'Business Rescue' },
            { id: 'growth_company', label: 'Growth Company' },
            { id: 'small_business', label: 'Small Business' },
          ] as { id: typeof activeFilter; label: string }[]
        ).map(f => (
          <button key={f.id} className={`persona-pill ${activeFilter === f.id ? 'active' : ''}`} onClick={() => setActiveFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginRight: '6px' }}>
          Risk:
        </span>
        {riskOptions.map(f => (
          <button key={f} className={`persona-pill ${riskFilter === f ? 'active' : ''}`} onClick={() => setRiskFilter(f)}>
            {f === 'all' ? 'All Risks' : f}
          </button>
        ))}
      </div>

      {/* Opportunity Cards Grid */}
      <div className="grid-2" style={{ gap: '22px' }}>
        {filteredOpps.map(opp => (
          <div key={opp.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Top */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                {getEntityBadge(opp.entityType)}
                {getRiskBadge(opp.riskLevel)}
                <span className="badge badge-verified"><CheckCircle2 size={10} /> {opp.claimVerification.replace('_', ' ')}</span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>{opp.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Building2 size={13} /> {opp.companyName}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} /> {opp.location}</span>
              </p>

              {/* Financial Metrics */}
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Investment Required</span>
                    <strong style={{ color: '#fbbf24', fontSize: '16px' }}>{opp.investmentRequired}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Expected Return</span>
                    <strong style={{ color: '#34d399' }}>{opp.expectedReturn}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Structure</span>
                    <strong style={{ color: '#818cf8' }}>{getStructureLabel(opp.proposedStructure)}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Duration</span>
                    <strong style={{ color: '#fff' }}>{opp.investmentDurationMonths} Months</strong>
                  </div>
                </div>
              </div>

              {/* Highlight Metric */}
              <div style={{ fontSize: '13px', color: '#22d3ee', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={14} /> {opp.highlightMetric}
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                {opp.fundingPurpose}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {opp.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '10px', color: 'var(--color-primary)', background: 'rgba(99,102,241,0.08)', padding: '2px 7px', borderRadius: 'var(--radius-sm)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={13} /> {opp.investorInterestCount} interested</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FileText size={13} /> {opp.documentsAvailable} docs</span>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  if (opp.entityType === 'business_rescue') onNavigateTab('rescue');
                  else if (opp.entityType === 'startup') onNavigateTab('startups');
                  else onNavigateTab('startups');
                }}
              >
                View Opportunity
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOpps.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Briefcase size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
          <p>No opportunities match your current filters.</p>
        </div>
      )}
    </div>
  );
};
