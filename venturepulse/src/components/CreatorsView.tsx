import React, { useState } from 'react';
import {
  Mic2,
  Star,
  Users,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Globe,
  Send,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Filter
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';
import { CreatorProfile, CreatorCampaign } from '../types';

interface CreatorsViewProps {
  onNavigateTab: (tab: string, targetId?: string) => void;
  searchQuery: string;
}

export const CreatorsView: React.FC<CreatorsViewProps> = ({ onNavigateTab, searchQuery }) => {
  const store = VenturePulseStore.getInstance();
  const currentUser = store.getCurrentUser();

  const [activeSection, setActiveSection] = useState<'creators' | 'campaigns'>('creators');
  const [expandedCreator, setExpandedCreator] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState<CreatorCampaign | null>(null);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  // Campaign creation
  const [campTitle, setCampTitle] = useState('');
  const [campDesc, setCampDesc] = useState('');
  const [campNiche, setCampNiche] = useState('Tech & AI');
  const [campBudget, setCampBudget] = useState('₹1,00,000');
  const [campPlatforms, setCampPlatforms] = useState('YouTube, LinkedIn');
  const [campDeliverables, setCampDeliverables] = useState('');
  const [campDeadline, setCampDeadline] = useState('2026-11-30');

  const filteredCreators = store.creators.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.niche.toLowerCase().includes(q) || c.bio.toLowerCase().includes(q);
  });

  const filteredCampaigns = store.campaigns.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.niche.toLowerCase().includes(q) || c.businessName.toLowerCase().includes(q);
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube': return <Youtube size={14} color="#ef4444" />;
      case 'LinkedIn': return <Linkedin size={14} color="#0a66c2" />;
      case 'Instagram': return <Instagram size={14} color="#e1306c" />;
      case 'X': return <Twitter size={14} color="#1da1f2" />;
      default: return <Globe size={14} color="var(--text-secondary)" />;
    }
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    store.createCampaign({
      title: campTitle,
      description: campDesc,
      niche: campNiche,
      budget: campBudget,
      targetPlatforms: campPlatforms.split(',').map(s => s.trim()),
      deliverables: campDeliverables.split('\n').filter(Boolean),
      deadline: campDeadline
    });
    setShowCreateCampaign(false);
    setCampTitle('');
    setCampDesc('');
  };

  const handleApply = (campaign: CreatorCampaign) => {
    store.applyToCampaign(campaign.id, `Application from ${currentUser.name}`);
    setShowApplyModal(null);
    alert('Application submitted! The business will review your profile.');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
            <Mic2 size={15} /> Creator Connect Marketplace
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Creator Connect</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', fontSize: '14px', lineHeight: 1.6 }}>
            Connect with verified influencers and content creators to amplify your brand. Or browse active business campaigns seeking authentic collaborations.
          </p>
        </div>
        {(currentUser.role === 'business_owner' || currentUser.role === 'startup_founder') && (
          <button className="btn btn-primary btn-lg" onClick={() => setShowCreateCampaign(true)} style={{ background: 'var(--grad-creator)', boxShadow: '0 4px 14px rgba(236,72,153,0.35)' }}>
            <Mic2 size={18} /> Post Campaign Request
          </button>
        )}
      </div>

      {/* Section Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button className={`persona-pill ${activeSection === 'creators' ? 'active' : ''}`} style={{ padding: '8px 18px', fontSize: '14px' }} onClick={() => setActiveSection('creators')}>
          <Users size={14} /> Verified Creators ({filteredCreators.length})
        </button>
        <button className={`persona-pill ${activeSection === 'campaigns' ? 'active' : ''}`} style={{ padding: '8px 18px', fontSize: '14px' }} onClick={() => setActiveSection('campaigns')}>
          <Sparkles size={14} /> Active Campaigns ({filteredCampaigns.length})
        </button>
      </div>

      {/* Creators List */}
      {activeSection === 'creators' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {filteredCreators.map(creator => {
            const isExpanded = expandedCreator === creator.id;
            return (
              <div key={creator.id} className="glass-card" style={{ padding: '26px', borderColor: 'rgba(236,72,153,0.15)' }}>
                {/* Top Row */}
                <div style={{ display: 'flex', gap: '18px', marginBottom: '18px', flexWrap: 'wrap' }}>
                  <img src={creator.avatar} alt={creator.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(236,72,153,0.4)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{creator.name}</h2>
                      <span style={{ fontSize: '14px', color: '#ec4899', fontWeight: 600 }}>{creator.handle}</span>
                      <span className="badge badge-verified"><CheckCircle2 size={10} /> Verified Creator</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{creator.bio}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '13px' }}>
                      <span style={{ color: '#ec4899', fontWeight: 600 }}>{creator.niche}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}><Users size={13} /> {creator.totalReach}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}><Star size={13} fill="#fbbf24" /> {creator.rating}/5 ({creator.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Platform Stats */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {creator.platforms.map(p => (
                    <div key={p.platform} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '10px 14px', minWidth: '160px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        {getPlatformIcon(p.platform)}
                        <span style={{ fontWeight: 600, fontSize: '13px' }}>{p.platform}</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{p.followers}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Engagement: {p.engagementRate} • Avg: {p.avgViews}</div>
                    </div>
                  ))}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', animation: 'fadeIn 0.2s ease' }}>
                    {/* Audience Demographics */}
                    <div className="grid-2" style={{ marginBottom: '16px' }}>
                      <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: '#ec4899' }}>Audience Demographics</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '3px' }}>Primary Age: <strong style={{ color: '#fff' }}>{creator.audienceDemographics.primaryAge}</strong></p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '3px' }}>Top Regions: <strong style={{ color: '#fff' }}>{creator.audienceDemographics.topLocations.join(', ')}</strong></p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Gender: <strong style={{ color: '#fff' }}>{creator.audienceDemographics.genderSplit}</strong></p>
                      </div>
                      <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: '#818cf8' }}>Pricing & Preferences</h4>
                        <p style={{ fontSize: '12px', color: '#fff', marginBottom: '6px' }}>{creator.pricingModel}</p>
                        <ul style={{ paddingLeft: '16px' }}>
                          {creator.collaborationPreferences.map((p, i) => (
                            <li key={i} style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px' }}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Previous Campaigns */}
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Previous Campaign Results</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {creator.previousCampaigns.map((camp, i) => (
                        <div key={i} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 14px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '13px', color: '#fff' }}>{camp.brand}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{camp.objective}</span>
                          </div>
                          <p style={{ fontSize: '12px', color: '#34d399' }}>{camp.reachGenerated}</p>
                          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>ROI: {camp.roiVerdict}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setExpandedCreator(isExpanded ? null : creator.id)}>
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    {isExpanded ? 'Collapse' : 'Portfolio, Pricing & Demographics'}
                  </button>
                  <button className="btn btn-primary btn-sm" style={{ background: 'var(--grad-creator)', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }} onClick={() => onNavigateTab('messages')}>
                    <Send size={13} /> Contact Creator
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Campaigns List */}
      {activeSection === 'campaigns' && (
        <div className="grid-2" style={{ gap: '22px' }}>
          {filteredCampaigns.map(campaign => (
            <div key={campaign.id} className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                <img src={campaign.businessLogo} alt={campaign.businessName} style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '3px' }}>{campaign.title}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>By {campaign.businessName} • {campaign.niche}</p>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '14px' }}>{campaign.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px', fontSize: '12px' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Budget:</span> <strong style={{ color: '#34d399' }}>{campaign.budget}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Deadline:</span> <strong style={{ color: '#fff' }}>{campaign.deadline}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Platforms:</span> <strong style={{ color: '#fff' }}>{campaign.targetPlatforms.join(', ')}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Applicants:</span> <strong style={{ color: '#818cf8' }}>{campaign.applicantsCount}</strong></div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Deliverables:</span>
                <ul style={{ paddingLeft: '16px' }}>
                  {campaign.deliverables.map((d, i) => (
                    <li key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{d}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                {currentUser.role === 'creator' ? (
                  <button className="btn btn-primary btn-sm" style={{ background: 'var(--grad-creator)' }} onClick={() => setShowApplyModal(campaign)}>
                    <Send size={13} /> Apply to Campaign
                  </button>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Switch to Creator role to apply</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Apply: {showApplyModal.title}</h3>
              <button onClick={() => setShowApplyModal(null)}>✕</button>
            </div>
            <form onSubmit={e => { e.preventDefault(); handleApply(showApplyModal); }}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Your Proposal</label>
                  <textarea rows={4} placeholder="Describe your approach, content ideas, and expected deliverables..." required />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Proposed Rate</label>
                  <input defaultValue={showApplyModal.budget} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowApplyModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ background: 'var(--grad-creator)' }}>Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="modal-overlay" onClick={() => setShowCreateCampaign(false)}>
          <div className="modal-content" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Create Campaign Request</h3>
              <button onClick={() => setShowCreateCampaign(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateCampaign}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Campaign Title *</label>
                  <input value={campTitle} onChange={e => setCampTitle(e.target.value)} placeholder="e.g. Product Launch Content Series" required />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Description *</label>
                  <textarea rows={3} value={campDesc} onChange={e => setCampDesc(e.target.value)} placeholder="What you're looking for..." required />
                </div>
                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Niche</label>
                    <select value={campNiche} onChange={e => setCampNiche(e.target.value)}>
                      <option>Tech & AI</option>
                      <option>Finance & Business</option>
                      <option>Food, Retail & Lifestyle</option>
                      <option>Healthcare & Wellness</option>
                      <option>B2B Growth</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Budget</label>
                    <input value={campBudget} onChange={e => setCampBudget(e.target.value)} />
                  </div>
                </div>
                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Target Platforms (comma separated)</label>
                    <input value={campPlatforms} onChange={e => setCampPlatforms(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Deadline</label>
                    <input type="date" value={campDeadline} onChange={e => setCampDeadline(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Deliverables (one per line)</label>
                  <textarea rows={3} value={campDeliverables} onChange={e => setCampDeliverables(e.target.value)} placeholder="1x YouTube Video&#10;2x Instagram Reels" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateCampaign(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ background: 'var(--grad-creator)' }}>Publish Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
