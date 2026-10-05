import React, { useState } from 'react';
import {
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Hash,
  Clock,
  FileText,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Eye,
  AlertTriangle,
  Download,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';
import { StartupIdea } from '../types';

interface IdeasViewProps {
  onNavigateTab: (tab: string, targetId?: string) => void;
  searchQuery: string;
}

export const IdeasView: React.FC<IdeasViewProps> = ({ onNavigateTab, searchQuery }) => {
  const store = VenturePulseStore.getInstance();
  const currentUser = store.getCurrentUser();

  const [showCreateIdea, setShowCreateIdea] = useState(false);
  const [expandedIdea, setExpandedIdea] = useState<string | null>(null);
  const [showNdaModal, setShowNdaModal] = useState<StartupIdea | null>(null);

  // Create idea form
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaSummary, setIdeaSummary] = useState('');
  const [ideaProblem, setIdeaProblem] = useState('');
  const [ideaSolution, setIdeaSolution] = useState('');
  const [ideaMarket, setIdeaMarket] = useState('');
  const [ideaModel, setIdeaModel] = useState('');
  const [ideaFunding, setIdeaFunding] = useState('₹20,00,000');
  const [ideaIndustry, setIdeaIndustry] = useState('Technology');
  const [ideaLocation, setIdeaLocation] = useState('India');
  const [ideaTags, setIdeaTags] = useState('');
  const [ideaConfidential, setIdeaConfidential] = useState(false);
  const [ideaStage, setIdeaStage] = useState<StartupIdea['stage']>('Concept Stage');

  const filteredIdeas = store.ideas.filter(idea => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      idea.title.toLowerCase().includes(q) ||
      idea.summary.toLowerCase().includes(q) ||
      idea.industry.toLowerCase().includes(q) ||
      idea.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim() || !ideaSummary.trim()) return;

    store.createIdea({
      title: ideaTitle,
      summary: ideaSummary,
      problem: ideaProblem,
      solution: ideaSolution,
      targetMarket: ideaMarket,
      businessModel: ideaModel,
      requiredFunding: ideaFunding,
      estimatedInvestment: ideaFunding,
      stage: ideaStage,
      industry: ideaIndustry,
      location: ideaLocation,
      tags: ideaTags.split(',').map(t => t.trim()).filter(Boolean),
      isConfidential: ideaConfidential,
      supportingDocNames: []
    });

    setShowCreateIdea(false);
    setIdeaTitle('');
    setIdeaSummary('');
    setIdeaProblem('');
    setIdeaSolution('');
  };

  const canViewConfidential = (idea: StartupIdea) => {
    if (!idea.isConfidential) return true;
    if (idea.authorId === currentUser.id) return true;
    return !!store.signedNdas[idea.id];
  };

  const handleSignNda = (idea: StartupIdea) => {
    store.signNDA(idea.id);
    setShowNdaModal(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
            <Lightbulb size={15} /> Startup Idea Marketplace
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Ideas</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', fontSize: '14px', lineHeight: 1.6 }}>
            Publish your startup ideas with timestamped proof-of-submission. Connect with investors and co-founders. Protect your intellectual property with evidence trails.
          </p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => setShowCreateIdea(true)}>
          <Lightbulb size={18} /> Publish New Idea
        </button>
      </div>

      {/* Idea Protection Notice */}
      <div className="legal-disclaimer-box" style={{ marginBottom: '24px' }}>
        <AlertTriangle size={20} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Idea Protection & Evidence System:</strong> When you publish an idea on VenturePulse, we create a timestamped cryptographic record with version history. This provides <em>evidence of prior submission</em> — it does <strong>not</strong> replace formal patent, trademark, or copyright filing with your national intellectual property office. We strongly recommend consulting a qualified IP attorney for statutory protection.
        </div>
      </div>

      {/* Ideas List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {filteredIdeas.map(idea => {
          const isVisible = canViewConfidential(idea);
          const isExpanded = expandedIdea === idea.id;

          return (
            <div key={idea.id} className="glass-card" style={{ padding: '26px' }}>
              {/* Header Row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <img src={idea.authorAvatar} alt={idea.authorName} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{idea.title}</h3>
                      {idea.isConfidential && (
                        <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
                          <Lock size={10} /> Confidential
                        </span>
                      )}
                      <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}>
                        {idea.stage}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                      By <strong>{idea.authorName}</strong> • {idea.industry} • {idea.location}
                    </p>
                  </div>
                </div>

                {/* Proof Badge */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <Hash size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {idea.ideaIdCode}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-primary)' }}>
                    Evidence Hash: {idea.proofHash.substring(0, 18)}...
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <Clock size={10} /> {new Date(idea.timestamp).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Confidential Gate */}
              {!isVisible ? (
                <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px dashed rgba(245,158,11,0.35)', borderRadius: 'var(--radius-md)', padding: '28px', textAlign: 'center' }}>
                  <Lock size={32} color="#fbbf24" style={{ marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Confidential Idea — NDA Required</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', maxWidth: '480px', margin: '0 auto 16px' }}>
                    The founder has designated this idea as confidential. To view the full details, you must accept the platform's confidentiality terms.
                  </p>
                  <button className="btn btn-rescue" onClick={() => setShowNdaModal(idea)}>
                    <ShieldCheck size={16} /> Review & Accept Confidentiality Terms
                  </button>
                </div>
              ) : (
                <>
                  {/* Summary */}
                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '18px' }}>
                    {idea.summary}
                  </p>

                  {/* Problem / Solution Grid */}
                  <div className="grid-2" style={{ marginBottom: '18px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#f87171', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '6px' }}>Problem</div>
                      <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>{idea.problem}</p>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#34d399', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '6px' }}>Proposed Solution</div>
                      <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>{idea.solution}</p>
                    </div>
                  </div>

                  {/* Funding & Tags Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Estimated Funding: <strong style={{ color: '#818cf8' }}>{idea.requiredFunding}</strong></span>
                      <span style={{ color: 'var(--text-muted)' }}>Market: <strong style={{ color: '#fff' }}>{idea.targetMarket.substring(0, 50)}...</strong></span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {idea.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '11px', color: '#c084fc', background: 'rgba(168,85,247,0.1)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div style={{ marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', animation: 'fadeIn 0.2s ease' }}>
                      <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Business Model</p>
                          <p style={{ fontSize: '13px', color: '#fff' }}>{idea.businessModel}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Target Market</p>
                          <p style={{ fontSize: '13px', color: '#fff' }}>{idea.targetMarket}</p>
                        </div>
                      </div>

                      {/* Version History */}
                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} /> Timestamped Version History (Evidence Trail)
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {idea.versionHistory.map(v => (
                            <div key={v.version} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>Version {v.version}</span>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '10px' }}>{new Date(v.timestamp).toLocaleString()}</span>
                                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{v.changeSummary}</p>
                              </div>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-primary)' }}>
                                {v.snapshotHash.substring(0, 16)}...
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Supporting Documents */}
                      {idea.supportingDocuments.length > 0 && (
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FileText size={14} /> Supporting Documents
                          </h4>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {idea.supportingDocuments.map(doc => (
                              <div key={doc.name} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                                <FileText size={14} color="var(--color-primary)" />
                                <div>
                                  <div style={{ fontWeight: 600 }}>{doc.name}</div>
                                  <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{doc.size} • {doc.type}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Download Proof */}
                      <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => alert(`Proof of Submission certificate for ${idea.ideaIdCode} downloaded.`)}>
                          <Download size={13} /> Download Proof-of-Submission Certificate
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', gap: '18px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <button onClick={() => { store.ideas = store.ideas.map(i => i.id === idea.id ? { ...i, hasLiked: !i.hasLiked, likesCount: i.hasLiked ? i.likesCount - 1 : i.likesCount + 1 } : i); }} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: idea.hasLiked ? '#ef4444' : 'inherit' }}>
                        <Heart size={15} fill={idea.hasLiked ? '#ef4444' : 'none'} /> {idea.likesCount}
                      </button>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MessageCircle size={15} /> {idea.commentsCount}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Eye size={15} /> {idea.expressedInterestCount} Interested
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setExpandedIdea(isExpanded ? null : idea.id)}>
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        {isExpanded ? 'Collapse' : 'View Evidence & Details'}
                      </button>
                      <button className="btn btn-primary btn-sm" onClick={() => { store.expressInterestInIdea(idea.id); alert('Interest expressed! The founder will receive a notification.'); }}>
                        <Sparkles size={13} /> Express Interest
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* NDA Modal */}
      {showNdaModal && (
        <div className="modal-overlay" onClick={() => setShowNdaModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                <Lock size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                Confidentiality Agreement
              </h3>
              <button onClick={() => setShowNdaModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '18px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>
                  VenturePulse Confidential Idea Viewing Terms
                </h4>
                <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '18px' }}>
                  <li>You agree <strong>not to reproduce, distribute, or commercially exploit</strong> the disclosed idea without the founder's written authorization.</li>
                  <li>Viewing this idea creates a timestamped access log for the founder's evidence records.</li>
                  <li>You acknowledge that this platform agreement supplements but does not replace a formal NDA executed between parties.</li>
                  <li>Violation of these terms may result in platform account restriction and disclosure to affected parties.</li>
                </ul>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Your identity (<strong>{currentUser.name}</strong>) and access timestamp will be recorded in the founder's evidence log.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowNdaModal(null)}>Decline</button>
              <button className="btn btn-rescue" onClick={() => handleSignNda(showNdaModal)}>
                <ShieldCheck size={16} /> I Agree — View Confidential Idea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Idea Modal */}
      {showCreateIdea && (
        <div className="modal-overlay" onClick={() => setShowCreateIdea(false)}>
          <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>
                <Lightbulb size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px', color: '#c084fc' }} />
                Register & Publish a Startup Idea
              </h3>
              <button onClick={() => setShowCreateIdea(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateIdea}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="legal-disclaimer-box" style={{ marginBottom: '4px' }}>
                  <AlertTriangle size={18} color="#fbbf24" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '12px' }}>
                    A cryptographic hash and timestamp will be generated upon submission. This serves as evidence of prior art — <strong>not</strong> formal IP registration.
                  </span>
                </div>

                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Idea Title *</label>
                    <input value={ideaTitle} onChange={e => setIdeaTitle(e.target.value)} placeholder="AI-Powered Agricultural Monitoring..." required />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Industry</label>
                    <select value={ideaIndustry} onChange={e => setIdeaIndustry(e.target.value)}>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>FinTech</option>
                      <option>AgriTech</option>
                      <option>CleanTech</option>
                      <option>Retail & D2C</option>
                      <option>Manufacturing</option>
                      <option>Education</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Summary *</label>
                  <textarea rows={3} value={ideaSummary} onChange={e => setIdeaSummary(e.target.value)} placeholder="Brief one-paragraph pitch..." required />
                </div>

                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Problem Being Solved</label>
                    <textarea rows={2} value={ideaProblem} onChange={e => setIdeaProblem(e.target.value)} placeholder="What's broken today?" />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Proposed Solution</label>
                    <textarea rows={2} value={ideaSolution} onChange={e => setIdeaSolution(e.target.value)} placeholder="How will you solve it?" />
                  </div>
                </div>

                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Target Market</label>
                    <input value={ideaMarket} onChange={e => setIdeaMarket(e.target.value)} placeholder="Who benefits?" />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Business Model</label>
                    <input value={ideaModel} onChange={e => setIdeaModel(e.target.value)} placeholder="SaaS / Marketplace / Commission..." />
                  </div>
                </div>

                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Required Funding</label>
                    <input value={ideaFunding} onChange={e => setIdeaFunding(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Development Stage</label>
                    <select value={ideaStage} onChange={e => setIdeaStage(e.target.value as any)}>
                      <option value="Concept Stage">Concept Stage</option>
                      <option value="Validation Stage">Validation Stage</option>
                      <option value="Prototype Design">Prototype Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Tags (comma separated)</label>
                  <input value={ideaTags} onChange={e => setIdeaTags(e.target.value)} placeholder="AI, SaaS, B2B, Rural" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="confidential-check" checked={ideaConfidential} onChange={e => setIdeaConfidential(e.target.checked)} style={{ width: 'auto' }} />
                  <label htmlFor="confidential-check" style={{ fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    <Lock size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    Mark as Confidential (NDA required for viewers)
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateIdea(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <ShieldCheck size={16} /> Register & Publish Idea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
