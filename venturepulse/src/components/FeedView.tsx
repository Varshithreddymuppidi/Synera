import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  LifeBuoy, 
  Sparkles, 
  Rocket, 
  Mic2, 
  Plus, 
  ExternalLink,
  Tag,
  AlertCircle
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';
import { SocialPost } from '../types';

interface FeedViewProps {
  onNavigateTab: (tab: string, targetId?: string) => void;
  searchQuery: string;
}

export const FeedView: React.FC<FeedViewProps> = ({ onNavigateTab, searchQuery }) => {
  const store = VenturePulseStore.getInstance();
  const currentUser = store.getCurrentUser();

  const [activeFilter, setActiveFilter] = useState<'all' | 'updates' | 'funding' | 'rescue' | 'ideas' | 'collabs' | 'stories'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});

  // New Post Form State
  const [newPostType, setNewPostType] = useState<SocialPost['postType']>('business_update');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('Growth, Business');
  const [newPostMedia, setNewPostMedia] = useState('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop&q=80');

  // Filter posts
  const filteredPosts = store.posts.filter(post => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        post.content.toLowerCase().includes(q) ||
        (post.title && post.title.toLowerCase().includes(q)) ||
        post.authorName.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (activeFilter === 'all') return true;
    if (activeFilter === 'updates') return post.postType === 'business_update';
    if (activeFilter === 'funding') return post.postType === 'funding_request';
    if (activeFilter === 'rescue') return post.postType === 'rescue_call';
    if (activeFilter === 'ideas') return post.postType === 'startup_idea';
    if (activeFilter === 'collabs') return post.postType === 'creator_collab';
    if (activeFilter === 'stories') return post.postType === 'success_story';
    return true;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    store.createPost({
      postType: newPostType,
      title: newPostTitle.trim() || undefined,
      content: newPostContent.trim(),
      tags: newPostTags.split(',').map(t => t.trim()).filter(Boolean),
      mediaUrl: newPostMedia.trim() || undefined
    });

    setNewPostTitle('');
    setNewPostContent('');
    setShowCreateModal(false);
  };

  const handleSendComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text || !text.trim()) return;
    store.addCommentToPost(postId, text.trim());
    setCommentInput({ ...commentInput, [postId]: '' });
  };

  const getPostTypeBadge = (type: SocialPost['postType']) => {
    switch (type) {
      case 'business_update':
        return <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}><TrendingUp size={11} /> Business Update</span>;
      case 'funding_request':
        return <span className="badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6,182,212,0.3)' }}><Rocket size={11} /> Funding Opportunity</span>;
      case 'rescue_call':
        return <span className="badge badge-risk-medium"><LifeBuoy size={11} /> Business Rescue Notice</span>;
      case 'startup_idea':
        return <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}><Sparkles size={11} /> Startup Idea Pitch</span>;
      case 'creator_collab':
        return <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: '1px solid rgba(236,72,153,0.3)' }}><Mic2 size={11} /> Creator Campaign</span>;
      case 'success_story':
        return <span className="badge badge-verified"><ShieldCheck size={11} /> Verified Outcome</span>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '28px' }}>
      {/* Left Main Stream */}
      <div>
        {/* Create Post Prompt Card */}
        <div className="glass-card" style={{ padding: '18px 20px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div 
              style={{ 
                flex: 1, 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: 'var(--radius-full)', 
                padding: '12px 18px', 
                color: 'var(--text-muted)', 
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onClick={() => setShowCreateModal(true)}
            >
              Share a business update, funding opportunity, or idea...
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
              style={{ whiteSpace: 'nowrap' }}
            >
              <Plus size={16} /> Create
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setNewPostType('business_update'); setShowCreateModal(true); }}
            >
              <TrendingUp size={13} color="#818cf8" /> Company Update
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setNewPostType('funding_request'); setShowCreateModal(true); }}
            >
              <Rocket size={13} color="#06b6d4" /> Raise Capital
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setNewPostType('rescue_call'); setShowCreateModal(true); }}
              style={{ borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}
            >
              <LifeBuoy size={13} color="#f59e0b" /> Business Rescue
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setNewPostType('creator_collab'); setShowCreateModal(true); }}
            >
              <Mic2 size={13} color="#ec4899" /> Creator Collab
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '16px' }}>
          {[
            { id: 'all', label: 'All Updates' },
            { id: 'updates', label: 'Company News' },
            { id: 'funding', label: 'Funding Requests' },
            { id: 'rescue', label: 'Business Rescue' },
            { id: 'ideas', label: 'Startup Ideas' },
            { id: 'collabs', label: 'Creator Campaigns' },
            { id: 'stories', label: 'Verified Outcomes' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`persona-pill ${activeFilter === f.id ? 'active' : ''}`}
              style={{ padding: '6px 14px', fontSize: '13px' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Posts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredPosts.map(post => (
            <article key={post.id} className="glass-card" style={{ padding: '24px' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <img 
                    src={post.authorAvatar} 
                    alt={post.authorName} 
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>{post.authorName}</span>
                      {post.authorVerification !== 'unverified' && (
                        <CheckCircle2 size={14} color="#10b981" />
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                      {post.authorHeadline}
                    </p>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.timestamp}</span>
                  </div>
                </div>

                <div>
                  {getPostTypeBadge(post.postType)}
                </div>
              </div>

              {/* Title if present */}
              {post.title && (
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>
                  {post.title}
                </h3>
              )}

              {/* Content */}
              <p style={{ 
                fontSize: '14px', 
                color: '#cbd5e1', 
                lineHeight: 1.6, 
                whiteSpace: 'pre-line',
                marginBottom: '16px' 
              }}>
                {post.content}
              </p>

              {/* Optional Media */}
              {post.mediaUrl && (
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '16px', maxHeight: '420px' }}>
                  <img 
                    src={post.mediaUrl} 
                    alt="Post Media" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      style={{ 
                        fontSize: '12px', 
                        color: 'var(--color-primary)', 
                        background: 'rgba(99, 102, 241, 0.08)', 
                        padding: '3px 8px', 
                        borderRadius: 'var(--radius-sm)' 
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Banner for Linked Opportunity / Rescue */}
              {post.linkedEntityId && (
                <div style={{ 
                  background: 'rgba(15, 23, 42, 0.7)', 
                  border: '1px solid var(--border-medium)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '12px 16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} color="var(--color-cyan)" />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      Associated with active {post.linkedEntityType} file
                    </span>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      if (post.linkedEntityType === 'rescue') onNavigateTab('rescue', post.linkedEntityId);
                      else if (post.linkedEntityType === 'startup') onNavigateTab('startups', post.linkedEntityId);
                      else if (post.linkedEntityType === 'idea') onNavigateTab('ideas', post.linkedEntityId);
                      else if (post.linkedEntityType === 'campaign') onNavigateTab('creators', post.linkedEntityId);
                    }}
                  >
                    <span>View Official Record</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              )}

              {/* Social Interactions Bar */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingTop: '12px', 
                borderTop: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontSize: '13px'
              }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <button 
                    onClick={() => store.toggleLikePost(post.id)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      color: post.hasLiked ? '#ef4444' : 'inherit' 
                    }}
                  >
                    <Heart size={16} fill={post.hasLiked ? '#ef4444' : 'none'} />
                    <span>{post.likesCount}</span>
                  </button>

                  <button 
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <MessageCircle size={16} />
                    <span>{post.commentsCount}</span>
                  </button>

                  <button 
                    onClick={() => alert('Post link copied to clipboard!')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Share2 size={16} />
                    <span>{post.sharesCount}</span>
                  </button>
                </div>

                <button 
                  onClick={() => store.toggleSavePost(post.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    color: post.hasSaved ? 'var(--color-primary)' : 'inherit' 
                  }}
                >
                  <Bookmark size={16} fill={post.hasSaved ? 'var(--color-primary)' : 'none'} />
                  <span>{post.savesCount}</span>
                </button>
              </div>

              {/* Expanded Comment Section */}
              {activeCommentPostId === post.id && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  {/* Existing Comments */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map(c => (
                        <div key={c.id} style={{ display: 'flex', gap: '10px', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                          <img src={c.authorAvatar} alt={c.authorName} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{c.authorName}</span>
                              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{c.timestamp}</span>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        No comments yet. Be the first to share professional feedback.
                      </p>
                    )}
                  </div>

                  {/* Add Comment Input */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Write a professional comment or inquiry..."
                      value={commentInput[post.id] || ''}
                      onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendComment(post.id); }}
                      style={{ flex: 1 }}
                    />
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSendComment(post.id)}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Right Sidebar: Platform Integrity & Quick Stats */}
      <div>
        {/* Core Principles Card */}
        <div className="glass-card" style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#10b981" />
            Integrity First Platform
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
            VenturePulse is designed specifically for authentic capital and enterprise discovery:
          </p>
          <ul style={{ fontSize: '12px', color: 'var(--text-secondary)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>No Unregulated Offerings:</strong> Discovery and negotiation only; formal capital operations occur with regulated escrows.</li>
            <li><strong>Audit Distinction:</strong> Clear distinction between platform-verified filings and self-reported metrics.</li>
            <li><strong>Proof of Idea:</strong> Timestamped hashes provide evidence of submission without false copyright claims.</li>
          </ul>
        </div>

        {/* Live Ecosystem Metrics */}
        <div className="glass-card" style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Ecosystem Live Pulse</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Active Opportunities</span>
              <strong style={{ fontSize: '13px', color: '#fff' }}>{store.opportunities.length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Rescues in Negotiation</span>
              <strong style={{ fontSize: '13px', color: '#fbbf24' }}>{store.rescues.length} Cases</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Idea Protections Registered</span>
              <strong style={{ fontSize: '13px', color: '#818cf8' }}>{store.ideas.length} Timestamps</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Verified Influencers</span>
              <strong style={{ fontSize: '13px', color: '#ec4899' }}>{store.creators.length} Creators</strong>
            </div>
          </div>
        </div>

        {/* Fast Action Card */}
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#fbbf24' }}>
            Experiencing Cashflow Distress?
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
            List your business privately or publicly in our Business Rescue sanctuary to connect with patient turnaround investors.
          </p>
          <button 
            className="btn btn-rescue btn-sm"
            onClick={() => onNavigateTab('rescue')}
            style={{ width: '100%' }}
          >
            <LifeBuoy size={14} /> Open Rescue Portal
          </button>
        </div>
      </div>

      {/* Modal: Create Post */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Publish Network Update</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ color: 'var(--text-muted)' }}>✕</button>
            </div>

            <form onSubmit={handleCreatePost}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>Category</label>
                  <select 
                    value={newPostType} 
                    onChange={(e) => setNewPostType(e.target.value as any)}
                  >
                    <option value="business_update">Company / Operating Update</option>
                    <option value="funding_request">Funding Request / Pitch</option>
                    <option value="rescue_call">Business Rescue Notice</option>
                    <option value="startup_idea">Startup Idea</option>
                    <option value="creator_collab">Creator / Influencer Campaign</option>
                    <option value="success_story">Verified Outcome Story</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>Headline / Title (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Q3 Growth Metrics & Fleet Milestone" 
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>Content</label>
                  <textarea 
                    rows={5} 
                    placeholder="Share the details, metrics, problem solved, or capital requirements..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>Media Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..." 
                    value={newPostMedia}
                    onChange={(e) => setNewPostMedia(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>Tags (comma-separated)</label>
                  <input 
                    type="text" 
                    placeholder="CleanTech, Funding, Turnaround" 
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish to Network</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
