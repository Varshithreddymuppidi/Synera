import React, { useState } from 'react';
import {
  LifeBuoy,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileText,
  TrendingDown,
  TrendingUp,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Eye,
  Building2,
  MapPin,
  Send
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';
import { BusinessRescue } from '../types';

interface RescueViewProps {
  onNavigateTab: (tab: string, targetId?: string) => void;
  searchQuery: string;
}

export const RescueView: React.FC<RescueViewProps> = ({ onNavigateTab, searchQuery }) => {
  const store = VenturePulseStore.getInstance();
  const currentUser = store.getCurrentUser();

  const [expandedRescue, setExpandedRescue] = useState<string | null>(null);
  const [showOfferModal, setShowOfferModal] = useState<BusinessRescue | null>(null);
  const [showDocsModal, setShowDocsModal] = useState<BusinessRescue | null>(null);

  const filteredRescues = store.rescues.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.businessName.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.storySummary.toLowerCase().includes(q)
    );
  });

  const getRiskBadge = (risk: string) => {
    if (risk === 'High Risk') return <span className="badge badge-risk-high"><AlertTriangle size={10} /> {risk}</span>;
    if (risk === 'Medium Risk') return <span className="badge badge-risk-medium"><AlertTriangle size={10} /> {risk}</span>;
    return <span className="badge badge-risk-low"><CheckCircle2 size={10} /> {risk}</span>;
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { bg: string; color: string; label: string }> = {
      'active_request': { bg: 'rgba(6,182,212,0.15)', color: '#22d3ee', label: 'Active Rescue Request' },
      'under_due_diligence': { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', label: 'Under Due Diligence' },
      'deal_negotiation': { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', label: 'In Deal Negotiation' },
      'rescued_stabilized': { bg: 'rgba(16,185,129,0.15)', color: '#34d399', label: 'Rescued & Stabilized' },
    };
    const s = map[status] || map['active_request'];
    return <span className="badge" style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}33` }}>{s.label}</span>;
  };

  const canViewDocs = (rescue: BusinessRescue) => {
    if (!rescue.requiresVerificationToViewDocs) return true;
    if (currentUser.role === 'investor' && (currentUser.verificationTier === 'investor_verified' || currentUser.verificationTier === 'trusted_elite')) return true;
    if (currentUser.role === 'admin') return true;
    if (rescue.founderName === currentUser.name) return true;
    return !!store.signedNdas[rescue.id];
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
          <LifeBuoy size={15} /> Business Rescue Sanctuary
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Business Rescue</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', fontSize: '14px', lineHeight: 1.6 }}>
          Viable businesses facing temporary financial distress can connect with patient turnaround capital. Every case includes verified assets, audited financials, and structured recovery plans.
        </p>
      </div>

      {/* Risk & Legal Disclaimers */}
      <div className="legal-disclaimer-box risk-alert" style={{ marginBottom: '14px' }}>
        <AlertTriangle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Investment Risk Warning:</strong> Business rescue investments carry significant risk including potential total loss of capital. Platform risk labels ("High / Medium / Lower Risk") are editorial assessments based on available data — they are <strong>not guaranteed outcomes</strong>. Always perform independent due diligence and seek professional financial and legal advice before committing capital.
        </div>
      </div>

      <div className="legal-disclaimer-box rescue-warning" style={{ marginBottom: '24px' }}>
        <Lock size={20} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Document Security:</strong> Sensitive financial documents (bank statements, tax records, supplier ledgers) are stored in encrypted vaults and are accessible only to verified investors or parties authorized by the business owner. The platform never publicly exposes confidential financial records.
        </div>
      </div>

      {/* Rescue Cases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filteredRescues.map(rescue => {
          const isExpanded = expandedRescue === rescue.id;

          return (
            <div key={rescue.id} className="glass-card" style={{ padding: '28px', borderColor: 'rgba(245,158,11,0.2)' }}>
              {/* Top Banner */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <img src={rescue.logo} alt={rescue.businessName} style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '2px solid rgba(245,158,11,0.3)' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{rescue.businessName}</h2>
                      {getRiskBadge(rescue.riskRating)}
                      {getStatusBadge(rescue.status)}
                      <span className="badge badge-verified"><CheckCircle2 size={10} /> {rescue.claimVerification.replace('_', ' ')}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Building2 size={13} /> {rescue.category}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} /> {rescue.location}</span>
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                      Case Reference: {rescue.rescueCode}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Rescue Capital Required</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#fbbf24' }}>{rescue.amountRequired}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{rescue.investorOffersCount} investor offer(s) submitted</div>
                </div>
              </div>

              {/* Story Summary */}
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                {rescue.storySummary}
              </p>

              {/* Key Financial Metrics Row */}
              <div style={{ background: 'linear-gradient(135deg, rgba(18,24,39,0.9) 0%, rgba(30,20,10,0.4) 100%)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-lg)', padding: '18px 22px', marginBottom: '20px' }}>
                <div className="grid-4" style={{ gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Revenue History</span>
                    <strong style={{ fontSize: '13px', color: '#fff' }}>{rescue.revenueHistory}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Existing Debt</span>
                    <strong style={{ fontSize: '13px', color: '#f87171' }}>{rescue.existingDebt}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Expected Recovery Revenue</span>
                    <strong style={{ fontSize: '13px', color: '#34d399' }}>{rescue.expectedFutureRevenue}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Proposed Investor Return</span>
                    <strong style={{ fontSize: '13px', color: '#818cf8' }}>{rescue.proposedInvestorReturn.substring(0, 60)}...</strong>
                  </div>
                </div>
              </div>

              {/* Expand Section */}
              {isExpanded && (
                <div style={{ marginBottom: '20px', animation: 'fadeIn 0.2s ease' }}>
                  {/* What Happened */}
                  <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fbbf24', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <TrendingDown size={15} /> What Happened
                    </h4>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>{rescue.whatHappened}</p>
                  </div>

                  {/* Current Situation */}
                  <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Current Financial Situation</h4>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '10px' }}>{rescue.currentFinancialSituation}</p>
                    <div style={{ marginBottom: '10px' }}>
                      <strong style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Causes of Distress:</strong>
                      <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                        {rescue.struggleCauses.map((c, i) => <li key={i} style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '3px' }}>{c}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Assets & Liabilities */}
                  <div className="grid-2" style={{ marginBottom: '14px' }}>
                    <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#34d399', marginBottom: '8px' }}>Assets</h4>
                      <ul style={{ paddingLeft: '16px' }}>
                        {rescue.assetsList.map((a, i) => <li key={i} style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' }}>{a}</li>)}
                      </ul>
                    </div>
                    <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', marginBottom: '8px' }}>Liabilities</h4>
                      <ul style={{ paddingLeft: '16px' }}>
                        {rescue.liabilitiesList.map((l, i) => <li key={i} style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' }}>{l}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Recovery Plan */}
                  <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <TrendingUp size={15} /> Recovery Plan
                    </h4>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>{rescue.recoveryPlan}</p>
                  </div>

                  {/* Use of Funds */}
                  <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Use of Funds & Expenses</h4>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}><strong>Allocation:</strong> {rescue.useOfFunds}</p>
                    <p style={{ fontSize: '13px', color: '#cbd5e1' }}><strong>Operating Expenses:</strong> {rescue.expensesSummary}</p>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setExpandedRescue(isExpanded ? null : rescue.id)}>
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    {isExpanded ? 'Collapse' : 'Full Financial Breakdown'}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      if (canViewDocs(rescue)) {
                        setShowDocsModal(rescue);
                      } else {
                        store.signNDA(rescue.id);
                        alert('Access granted. Your access has been logged for the founder\'s evidence trail.');
                        setShowDocsModal(rescue);
                      }
                    }}
                  >
                    <Lock size={13} /> {canViewDocs(rescue) ? 'View Vault Documents' : 'Request Document Access'}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-rescue" onClick={() => setShowOfferModal(rescue)}>
                    <DollarSign size={16} /> Submit Rescue Offer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vault Docs Modal */}
      {showDocsModal && (
        <div className="modal-overlay" onClick={() => setShowDocsModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                <Lock size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                Secure Document Vault — {showDocsModal.businessName}
              </h3>
              <button onClick={() => setShowDocsModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="legal-disclaimer-box" style={{ marginBottom: '18px' }}>
                <ShieldCheck size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '12px' }}>
                  Documents below are platform-verified originals. Downloading creates an audit log entry. Distribution without authorization is a violation of platform terms.
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {showDocsModal.privateDocs.map(doc => (
                  <div key={doc.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={20} color="var(--color-primary)" />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{doc.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.size} • {doc.verified ? '✓ Verified Original' : '⚠ Pending Verification'}</div>
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => alert(`Downloading ${doc.name}...`)}>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Offer Modal */}
      {showOfferModal && (
        <div className="modal-overlay" onClick={() => setShowOfferModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Submit Rescue Investment Offer</h3>
              <button onClick={() => setShowOfferModal(null)}>✕</button>
            </div>
            <form onSubmit={e => {
              e.preventDefault();
              alert(`Rescue offer for ${showOfferModal.businessName} submitted! A structured deal thread has been opened in Deals & Chat.`);
              setShowOfferModal(null);
              onNavigateTab('messages');
            }}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                  <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 600 }}>Business Seeking:</div>
                  <strong style={{ fontSize: '16px', color: '#fff' }}>{showOfferModal.amountRequired}</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Proposed: {showOfferModal.proposedInvestorReturn}</div>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Your Proposed Investment Amount</label>
                  <input defaultValue={showOfferModal.amountRequired} required />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Proposed Structure</label>
                  <select defaultValue="profit_sharing">
                    <option value="profit_sharing">Annual Profit-Share with Cap</option>
                    <option value="equity">Direct Equity Stake</option>
                    <option value="debt_milestone">Structured Debt with Milestone Tranche</option>
                    <option value="convertible_note">Convertible Note</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Key Terms & Conditions</label>
                  <textarea rows={4} placeholder="Specify profit-share percentage, duration, milestones, investor rights, reporting requirements..." required />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Message to Founder</label>
                  <textarea rows={2} placeholder="Optional personal note..." />
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  This creates a structured deal negotiation thread. No funds are transferred until both parties formally agree and complete applicable legal/compliance review.
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowOfferModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-rescue">
                  <Send size={16} /> Submit Rescue Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
