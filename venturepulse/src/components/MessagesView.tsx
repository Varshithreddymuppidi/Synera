import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  FileText,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Download,
  AlertTriangle
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';
import { Conversation, InvestmentDeal } from '../types';

interface MessagesViewProps {
  onNavigateTab: (tab: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ onNavigateTab }) => {
  const store = VenturePulseStore.getInstance();
  const currentUser = store.getCurrentUser();

  const [selectedConv, setSelectedConv] = useState<Conversation | null>(store.conversations[0] || null);
  const [msgInput, setMsgInput] = useState('');
  const [showDealPanel, setShowDealPanel] = useState(false);
  const [showTermSheet, setShowTermSheet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeDeal = selectedConv?.isDealDiscussion && selectedConv.associatedDealId
    ? store.deals.find(d => d.id === selectedConv.associatedDealId) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConv?.messages.length]);

  const handleSend = () => {
    if (!msgInput.trim() || !selectedConv) return;
    store.sendMessage(selectedConv.id, msgInput.trim());
    setMsgInput('');
    // Re-select to refresh messages
    setSelectedConv(store.conversations.find(c => c.id === selectedConv.id) || null);
  };

  const handleAcceptDeal = () => {
    if (!activeDeal) return;
    store.acceptDeal(activeDeal.id);
    setShowTermSheet(true);
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      'draft': '#64748b',
      'offered': '#06b6d4',
      'counter_offered': '#fbbf24',
      'accepted_by_both': '#10b981',
      'legal_compliance_review': '#818cf8',
      'closed': '#34d399'
    };
    return map[status] || '#64748b';
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '0', height: 'calc(100vh - 180px)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      {/* Left: Conversation List */}
      <div style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', overflowY: 'auto' }}>
        <div style={{ padding: '18px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={18} /> Deals & Messages
          </h3>
        </div>

        {store.conversations.map(conv => (
          <div
            key={conv.id}
            onClick={() => { setSelectedConv(conv); setShowDealPanel(false); }}
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              background: selectedConv?.id === conv.id ? 'rgba(99,102,241,0.1)' : 'transparent',
              transition: 'background 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
              <img src={conv.participantAvatar} alt={conv.participantName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>{conv.participantName}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{conv.lastMessageTime}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {conv.lastMessage}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  {conv.isDealDiscussion && (
                    <span style={{ fontSize: '10px', background: 'rgba(99,102,241,0.15)', color: '#818cf8', padding: '1px 6px', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
                      Deal Discussion
                    </span>
                  )}
                  {conv.unreadCount > 0 && (
                    <span style={{ fontSize: '10px', background: 'var(--color-primary)', color: '#fff', padding: '1px 6px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Chat & Deal Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={selectedConv.participantAvatar} alt={selectedConv.participantName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {selectedConv.participantName}
                    <CheckCircle2 size={14} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{selectedConv.participantHeadline}</div>
                </div>
              </div>

              {activeDeal && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowDealPanel(!showDealPanel)}
                >
                  <DollarSign size={14} />
                  {showDealPanel ? 'Hide Term Sheet' : `Deal ${activeDeal.dealCode}`}
                  {showDealPanel ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              )}
            </div>

            {/* Deal Panel (Collapsible) */}
            {showDealPanel && activeDeal && (
              <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(15,23,42,0.9)', maxHeight: '400px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} /> Deal Negotiation: {activeDeal.dealCode}
                  </h4>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)', background: `${getStatusColor(activeDeal.status)}22`, color: getStatusColor(activeDeal.status), border: `1px solid ${getStatusColor(activeDeal.status)}55` }}>
                    {activeDeal.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>

                {/* Key Terms */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '13px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Requested</span>
                    <strong style={{ color: '#fbbf24' }}>{activeDeal.requestedAmount}</strong>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Proposed</span>
                    <strong style={{ color: '#34d399' }}>{activeDeal.proposedAmount}</strong>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Structure</span>
                    <strong style={{ color: '#818cf8' }}>{activeDeal.profitSharePercent}% Profit-Share</strong>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px', display: 'block' }}>Duration</span>
                    <strong style={{ color: '#fff' }}>{activeDeal.durationMonths} Months</strong>
                  </div>
                </div>

                {/* Milestones */}
                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Tranche Milestones</h5>
                  {activeDeal.milestones.map((m, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#cbd5e1', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#818cf8', fontWeight: 700 }}>T{i + 1}</span> {m}
                    </div>
                  ))}
                </div>

                {/* Negotiation Log */}
                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Negotiation History</h5>
                  {activeDeal.negotiationLogs.map((log, i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{log.author}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{new Date(log.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600, marginBottom: '4px' }}>{log.action}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{log.terms.note}</p>
                    </div>
                  ))}
                </div>

                {/* Accept / Counter Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {!activeDeal.bothPartiesAccepted ? (
                    <>
                      <button className="btn btn-primary btn-sm" onClick={handleAcceptDeal}>
                        <CheckCircle2 size={14} /> Accept Terms & Lock Agreement
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => {
                        store.submitDealCounterOffer(activeDeal.id, {
                          amount: activeDeal.proposedAmount,
                          equityOrShare: `${activeDeal.profitSharePercent}% Profit-Share`,
                          duration: `${activeDeal.durationMonths} months`,
                          milestones: [],
                          repaymentTerms: activeDeal.repaymentTerms,
                          note: 'Counter-proposal submitted with adjusted terms.'
                        });
                        alert('Counter-offer submitted!');
                      }}>
                        Submit Counter-Offer
                      </button>
                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="badge badge-verified" style={{ fontSize: '12px', padding: '6px 12px' }}>
                        <CheckCircle2 size={12} /> DEAL MUTUALLY ACCEPTED
                      </span>
                      <button className="btn btn-secondary btn-sm" onClick={() => setShowTermSheet(true)}>
                        <Download size={13} /> View Term Sheet
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: 1.5 }}>
                  <AlertTriangle size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> Mutual acceptance generates a downloadable agreement summary. Formal legal binding requires execution through licensed legal counsel and applicable regulatory compliance.
                </div>
              </div>
            )}

            {/* Messages Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedConv.messages.map(msg => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '70%', display: 'flex', gap: '10px', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                        <img src={msg.senderAvatar} alt={msg.senderName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{msg.senderName}</span>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{msg.timestamp}</span>
                          </div>
                          <div style={{
                            background: isMe ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${isMe ? 'rgba(99,102,241,0.3)' : 'var(--border-subtle)'}`,
                            borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                            padding: '10px 14px',
                            fontSize: '13px',
                            color: '#e2e8f0',
                            lineHeight: 1.5
                          }}>
                            {msg.text}

                            {msg.isDealUpdate && msg.dealTermsSnippet && (
                              <div style={{ marginTop: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                                <div style={{ fontSize: '10px', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>Deal Terms Update</div>
                                <div style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600 }}>{msg.dealTermsSnippet}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary" onClick={handleSend}>
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center' }}>
              <MessageSquare size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
              <p>Select a conversation to begin messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Term Sheet Modal */}
      {showTermSheet && activeDeal && (
        <div className="modal-overlay" onClick={() => setShowTermSheet(false)}>
          <div className="modal-content" style={{ maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Agreement Summary — {activeDeal.dealCode}</h3>
              <button onClick={() => setShowTermSheet(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="term-sheet-paper">
                <div className="watermark">VENTUREPULSE TERM SHEET</div>

                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>INVESTMENT AGREEMENT SUMMARY</h2>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Generated by VenturePulse Platform — {new Date().toLocaleDateString()}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>Business (Investee)</h4>
                    <p style={{ fontSize: '16px', fontWeight: 700 }}>{activeDeal.businessName}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>Investor</h4>
                    <p style={{ fontSize: '16px', fontWeight: 700 }}>{activeDeal.investorName}</p>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '14px' }}>
                  <tbody>
                    {[
                      ['Investment Amount', activeDeal.proposedAmount],
                      ['Structure', activeDeal.profitSharePercent ? `${activeDeal.profitSharePercent}% Annual Gross Profit-Share` : `${activeDeal.equityPercent}% Equity`],
                      ['Duration', `${activeDeal.durationMonths} Months`],
                      ['Repayment Terms', activeDeal.repaymentTerms.substring(0, 120)],
                      ['Status', activeDeal.bothPartiesAccepted ? 'MUTUALLY ACCEPTED' : activeDeal.status.replace(/_/g, ' ').toUpperCase()],
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: '#475569', width: '40%' }}>{label}</td>
                        <td style={{ padding: '10px 12px', color: '#0f172a' }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6, borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <strong>IMPORTANT LEGAL NOTICE:</strong> This document is an informational summary generated by VenturePulse for record-keeping and evidence purposes. It does NOT constitute a legally binding contract. Formal investment agreements must be executed through qualified legal counsel with applicable regulatory compliance review in the relevant jurisdiction. VenturePulse does not guarantee any investment outcome.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button className="btn btn-secondary" onClick={() => alert('Term sheet PDF downloaded.')}>
                  <Download size={14} /> Download PDF
                </button>
                <button className="btn btn-primary" onClick={() => setShowTermSheet(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
