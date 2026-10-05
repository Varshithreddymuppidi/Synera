import React, { useState } from 'react';
import { 
  Rocket, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  PieChart, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Award,
  Sparkles,
  Send,
  Building2,
  ChevronRight
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';
import { StartupProfile } from '../types';

interface StartupsViewProps {
  onNavigateTab: (tab: string, targetId?: string) => void;
  searchQuery: string;
}

export const StartupsView: React.FC<StartupsViewProps> = ({ onNavigateTab, searchQuery }) => {
  const store = VenturePulseStore.getInstance();
  const currentUser = store.getCurrentUser();

  const [selectedStartup, setSelectedStartup] = useState<StartupProfile | null>(null);
  const [showInterestModal, setShowInterestModal] = useState<StartupProfile | null>(null);
  const [showPitchDeckModal, setShowPitchDeckModal] = useState<StartupProfile | null>(null);

  // Expression Form State
  const [intentAmount, setIntentAmount] = useState('₹15,00,000');
  const [intentStructure, setIntentStructure] = useState<'equity' | 'convertible_note' | 'profit_sharing'>('convertible_note');
  const [intentMessage, setIntentMessage] = useState('We are impressed with your traction metrics and would like to review the due diligence room.');
  const [submittedInterest, setSubmittedInterest] = useState(false);

  const filteredStartups = store.startups.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.startupName.toLowerCase().includes(q) ||
      s.industry.toLowerCase().includes(q) ||
      s.founderName.toLowerCase().includes(q) ||
      s.problem.toLowerCase().includes(q) ||
      s.solution.toLowerCase().includes(q)
    );
  });

  const handleSendInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showInterestModal) return;

    // Send notification to founder
    store.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: 'investment_interest',
      title: `Investment Interest: ${showInterestModal.startupName}`,
      message: `${currentUser.name} (${currentUser.role}) expressed interest to invest ${intentAmount} via ${intentStructure.replace('_', ' ')}.`,
      timestamp: 'Just now',
      read: false,
      targetView: 'messages'
    });

    // Create or append to conversation
    const conv = store.conversations[0];
    if (conv) {
      store.sendMessage(
        conv.id, 
        `[Investment Expression] ${currentUser.name} expressed intent: ${intentAmount} (${intentStructure.replace('_', ' ')})\n"${intentMessage}"`,
        true,
        `Expression: ${intentAmount} | ${intentStructure.replace('_', ' ')}`
      );
    }

    setSubmittedInterest(true);
    setTimeout(() => {
      setSubmittedInterest(false);
      setShowInterestModal(null);
      onNavigateTab('messages');
    }, 1500);
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
          <Rocket size={15} /> Startup Discovery & Syndicate Co-Investing
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          Verified High-Traction Startups
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '780px', fontSize: '14px', lineHeight: 1.6 }}>
          Discover audited early-stage and growth startups with verified revenue traction, defensible intellectual property, and institutional co-investment terms.
        </p>
      </div>

      {/* Disclaimers Bar */}
      <div className="legal-disclaimer-box">
        <ShieldCheck size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>VenturePulse Syndicate Notice:</strong> Startup profiles display platform-audited operational traction (MRR, active paying pilots). Venture investments carry risk of capital loss. Expressing interest connects you directly to founders to begin structured discussions.
        </div>
      </div>

      {/* Startups Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
        {filteredStartups.map(startup => (
          <div key={startup.id} className="glass-card" style={{ padding: '28px' }}>
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)', 
                  border: '1px solid rgba(99, 102, 241, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cyan)'
                }}>
                  <Rocket size={28} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>{startup.startupName}</h2>
                    <span className="badge badge-verified">
                      <CheckCircle2 size={11} /> {startup.claimVerification.replace('_', ' ')}
                    </span>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                      {startup.stage}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    Founded by <strong>{startup.founderName}</strong> • {startup.coFounders.join(', ')} • {startup.industry}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowPitchDeckModal(startup)}
                >
                  <FileText size={14} /> View Pitch Deck
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowInterestModal(startup)}
                  style={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <Sparkles size={16} /> Invest / Express Interest
                </button>
              </div>
            </div>

            {/* Problem & Solution Cards */}
            <div className="grid-2" style={{ marginBottom: '22px' }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#f87171', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '6px' }}>
                  The Problem
                </div>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {startup.problem}
                </p>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#34d399', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '6px' }}>
                  The Solution & Advantage
                </div>
                <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {startup.solution}
                </p>
              </div>
            </div>

            {/* Traction & Financial Metric Highlights */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(18, 24, 39, 0.9) 0%, rgba(26, 36, 61, 0.6) 100%)', 
              border: '1px solid var(--border-medium)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '18px 24px', 
              marginBottom: '20px' 
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-cyan)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                Verified Operating Traction & Deal Terms
              </div>
              <div className="grid-4" style={{ gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Monthly Recurring Revenue</span>
                  <strong style={{ fontSize: '16px', color: '#34d399', fontWeight: 700 }}>{startup.traction.monthlyRecurringRevenue}</strong>
                  <span style={{ fontSize: '11px', color: '#10b981', display: 'block', marginTop: '2px' }}>{startup.traction.momGrowthPercent}</span>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Paying Clinical / Enterprise Clients</span>
                  <strong style={{ fontSize: '16px', color: '#fff', fontWeight: 700 }}>{startup.traction.payingCustomers}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>{startup.mvpStatus}</span>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Capital Raising</span>
                  <strong style={{ fontSize: '16px', color: '#818cf8', fontWeight: 700 }}>{startup.fundingRequired}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>For {startup.equityOfferedPercent}% Equity / Cap</span>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Total Addressable Market</span>
                  <strong style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 600 }}>{startup.marketSizeTam}</strong>
                  <span style={{ fontSize: '11px', color: '#fbbf24', display: 'block', marginTop: '2px' }}>{startup.investorInterestCount} Investors Interested</span>
                </div>
              </div>
            </div>

            {/* IP & Defense Footnote */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={15} color="#c084fc" />
                <span><strong>IP Evidence:</strong> {startup.ipStatus} • {startup.patentTrademarkInfo}</span>
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedStartup(selectedStartup?.id === startup.id ? null : startup)}
              >
                {selectedStartup?.id === startup.id ? 'Hide Full Profile' : 'Inspect Full Breakdown'} <ChevronRight size={13} />
              </button>
            </div>

            {/* Detailed Expanded Drawer */}
            {selectedStartup?.id === startup.id && (
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', animation: 'slideUp 0.2s ease' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>Full Operational & Investment Details</h4>
                <div className="grid-2" style={{ gap: '18px', fontSize: '13px' }}>
                  <div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Business Model & Pricing:</p>
                    <p style={{ color: '#fff', marginBottom: '12px' }}>{startup.businessModel}</p>

                    <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Target Customer Segments:</p>
                    <p style={{ color: '#fff' }}>{startup.targetCustomers}</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Formal Investment Terms:</p>
                    <p style={{ color: '#34d399', fontWeight: 600, marginBottom: '12px' }}>{startup.investmentTerms}</p>

                    <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Prior Capital Raised:</p>
                    <p style={{ color: '#fff' }}>{startup.fundingRaisedSoFar}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal: Pitch Deck Viewer */}
      {showPitchDeckModal && (
        <div className="modal-overlay" onClick={() => setShowPitchDeckModal(null)}>
          <div className="modal-content" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                {showPitchDeckModal.startupName} — Executive Pitch Deck
              </h3>
              <button onClick={() => setShowPitchDeckModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
                border: '1px solid var(--border-medium)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '30px',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <div>
                  <span className="badge badge-verified" style={{ marginBottom: '14px' }}>
                    CONFIDENTIAL INVESTOR MEMORANDUM
                  </span>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                    {showPitchDeckModal.startupName}
                  </h2>
                  <p style={{ fontSize: '16px', color: 'var(--color-cyan)', fontWeight: 600, marginBottom: '16px' }}>
                    {showPitchDeckModal.productDescription}
                  </p>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    {showPitchDeckModal.pitchDeckSummary}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '20px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Class 10 Medical Device PCT Protocol</span>
                  <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>Priced Round: {showPitchDeckModal.fundingRequired}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => alert('Offline deck downloaded.')}>
                  Download Presentation PDF
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    const s = showPitchDeckModal;
                    setShowPitchDeckModal(null);
                    setShowInterestModal(s);
                  }}
                >
                  <Sparkles size={16} /> Proceed to Express Interest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Express Investment Interest */}
      {showInterestModal && (
        <div className="modal-overlay" onClick={() => setShowInterestModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                Invest / Express Interest in {showInterestModal.startupName}
              </h3>
              <button onClick={() => setShowInterestModal(null)}>✕</button>
            </div>

            <form onSubmit={handleSendInterest}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '12px 16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>Founder Seeking:</div>
                  <strong style={{ fontSize: '15px', color: '#fff' }}>{showInterestModal.fundingRequired} for {showInterestModal.equityOfferedPercent}% Equity / Cap</strong>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                    Proposed Investment Check Size
                  </label>
                  <select 
                    value={intentAmount} 
                    onChange={(e) => setIntentAmount(e.target.value)}
                  >
                    <option value="₹10,00,000">₹10,00,000 (Angel Ticket)</option>
                    <option value="₹15,00,000">₹15,00,000 (Syndicate Co-Lead)</option>
                    <option value="₹25,00,000">₹25,00,000 (Major Allocation)</option>
                    <option value="₹50,00,000">₹50,00,000 (Full Round Lead)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                    Preferred Deal Structure
                  </label>
                  <select 
                    value={intentStructure} 
                    onChange={(e) => setIntentStructure(e.target.value as any)}
                  >
                    <option value="convertible_note">Convertible Seed Note (20% discount)</option>
                    <option value="equity">Straight Priced Equity</option>
                    <option value="profit_sharing">Revenue-Sharing Milestone Debt</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                    Message to {showInterestModal.founderName}
                  </label>
                  <textarea 
                    rows={4} 
                    value={intentMessage}
                    onChange={(e) => setIntentMessage(e.target.value)}
                    required
                  />
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Submitting creates a structured discussion thread in your Deals & Chat inbox. No binding commitment is made until legal documents and accredited escrow agreements are executed.
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowInterestModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submittedInterest}>
                  {submittedInterest ? 'Interest Logged! Opening Chat...' : 'Transmit Expression'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
