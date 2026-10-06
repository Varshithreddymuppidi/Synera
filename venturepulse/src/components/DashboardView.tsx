import React from 'react';
import {
  TrendingUp,
  Users,
  Eye,
  FileText,
  Star,
  Award,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Mic,
  LifeBuoy,
  Target,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';

interface DashboardViewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab }) => {
  const store = VenturePulseStore.getInstance();
  const currentUser = store.getCurrentUser();
  const isInvestor = currentUser.role === 'investor';
  const isCreator = currentUser.role === 'creator';
  const isAdmin = currentUser.role === 'admin';

  const investor = store.investors.find(i => i.userId === currentUser.id);
  const creator = store.creators.find(c => c.userId === currentUser.id);

  // Stat card helper
  const StatCard = ({ label, value, color, icon: Icon, subtext }: { label: string; value: string | number; color: string; icon: React.ComponentType<{ size?: number | string; color?: string }>; subtext?: string }) => (
    <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={24} color={color} />
      </div>
      <div>
        <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{value}</div>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{label}</div>
        {subtext && <div style={{ fontSize: '11px', color, marginTop: '2px' }}>{subtext}</div>}
      </div>
    </div>
  );

  // Investor Dashboard
  if (isInvestor && investor) {
    const getLevelStyle = (level: number) => {
      const colors = ['#64748b', '#06b6d4', '#10b981', '#818cf8', '#f59e0b'];
      return colors[level - 1] || colors[0];
    };

    return (
      <div>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Investor Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Portfolio performance, reputation, and opportunity discovery.</p>
        </div>

        {/* Investor Level & Reputation Card */}
        <div className="glass-card" style={{ padding: '26px', marginBottom: '24px', background: `linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(6,182,212,0.08) 100%)`, borderColor: 'rgba(99,102,241,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <img src={investor.avatar} alt={investor.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${getLevelStyle(investor.investorLevel)}` }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800 }}>{investor.name}</h2>
                  <span className="badge badge-level"><Award size={11} /> Level {investor.investorLevel} — {investor.levelTitle}</span>
                  <span className="badge badge-verified"><CheckCircle2 size={10} /> {investor.claimVerification.replace('_', ' ')}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{investor.organization} • {investor.investmentPhilosophy.substring(0, 80)}...</p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: getLevelStyle(investor.investorLevel) }}>{investor.reputationScore}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reputation Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', justifyContent: 'center' }}>
                <Star size={13} color="#fbbf24" fill="#fbbf24" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fbbf24' }}>{investor.communityRating}/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <StatCard label="Total Investments" value={investor.totalInvestments} color="#818cf8" icon={Briefcase} />
          <StatCard label="Active Deals" value={investor.activeInvestments} color="#06b6d4" icon={TrendingUp} subtext="Currently deployed" />
          <StatCard label="Successful Exits" value={investor.successfulInvestments} color="#10b981" icon={Award} subtext={`${investor.successRatePercent}% success rate`} />
          <StatCard label="Deals Completed" value={investor.dealsCompleted} color="#fbbf24" icon={CheckCircle2} />
        </div>

        {/* Portfolio */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} /> Investment Portfolio
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {investor.portfolio.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{item.companyName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.industry} • Invested: {item.investmentDate}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#34d399' }}>{item.investedAmount}</div>
                  <div style={{ fontSize: '11px', color: item.status.includes('Profitable') || item.status === 'Exited' ? '#34d399' : '#fbbf24' }}>{item.status}</div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1' }}>{item.investorReturn}</div>
                  {item.verifiedOutcome && <span style={{ fontSize: '10px', color: '#10b981' }}>✓ Verified</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid-3" style={{ gap: '14px' }}>
          <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }} onClick={() => onNavigateTab('opportunities')}>
            <Briefcase size={16} /> Browse Opportunities
          </button>
          <button className="btn btn-rescue" style={{ width: '100%', padding: '14px' }} onClick={() => onNavigateTab('rescue')}>
            <LifeBuoy size={16} /> Rescue Cases
          </button>
          <button className="btn btn-secondary" style={{ width: '100%', padding: '14px' }} onClick={() => onNavigateTab('messages')}>
            <FileText size={16} /> Active Deal Negotiations
          </button>
        </div>
      </div>
    );
  }

  // Creator Dashboard
  if (isCreator && creator) {
    return (
      <div>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Creator Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Campaigns, earnings, engagement, and collaboration history.</p>
        </div>

        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <StatCard label="Total Reach" value={creator.totalReach.split('+')[0] + '+'} color="#ec4899" icon={Users} />
          <StatCard label="Campaigns Completed" value={creator.previousCampaigns.length} color="#818cf8" icon={Target} />
          <StatCard label="Creator Rating" value={`${creator.rating}/5`} color="#fbbf24" icon={Star} subtext={`${creator.reviewsCount} reviews`} />
          <StatCard label="Active Platforms" value={creator.platforms.length} color="#06b6d4" icon={Mic} />
        </div>

        {/* Previous Campaigns Performance */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Campaign Performance History</h3>
          {creator.previousCampaigns.map((camp, i) => (
            <div key={i} style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong style={{ fontSize: '14px', color: '#fff' }}>{camp.brand}</strong>
                <span style={{ fontSize: '12px', color: '#34d399' }}>{camp.reachGenerated}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Objective: {camp.objective}</p>
              <p style={{ fontSize: '12px', color: '#818cf8', marginTop: '4px' }}>ROI: {camp.roiVerdict}</p>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ gap: '14px' }}>
          <button className="btn btn-primary" style={{ width: '100%', padding: '14px', background: 'var(--grad-creator)' }} onClick={() => onNavigateTab('creators')}>
            <Sparkles size={16} /> Browse Active Campaigns
          </button>
          <button className="btn btn-secondary" style={{ width: '100%', padding: '14px' }} onClick={() => onNavigateTab('messages')}>
            <FileText size={16} /> Messages & Proposals
          </button>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (isAdmin) {
    return (
      <div>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Admin & Trust Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Platform integrity, verification queue, fraud monitoring, and analytics.</p>
        </div>

        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <StatCard label="Total Users" value={store.users.length} color="#818cf8" icon={Users} />
          <StatCard label="Active Opportunities" value={store.opportunities.length} color="#06b6d4" icon={Briefcase} />
          <StatCard label="Rescue Cases" value={store.rescues.length} color="#fbbf24" icon={LifeBuoy} />
          <StatCard label="Pending Reviews" value={store.adminQueue.filter(q => q.status === 'pending').length} color="#ef4444" icon={ShieldCheck} />
        </div>

        {/* Verification Queue */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} /> Verification & Moderation Queue
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {store.adminQueue.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{item.entityName}</span>
                    <span className={`badge ${item.riskScore === 'High' ? 'badge-risk-high' : item.riskScore === 'Medium' ? 'badge-risk-medium' : 'badge-risk-low'}`}>
                      {item.riskScore} Risk
                    </span>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                      {item.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>By {item.submittedBy} • {item.date}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.notes}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {item.status === 'pending' ? (
                    <>
                      <button className="btn btn-sm" style={{ background: 'var(--grad-verified)', color: '#fff' }} onClick={() => store.reviewAdminQueueItem(item.id, 'approved')}>
                        <CheckCircle2 size={13} /> Approve
                      </button>
                      <button className="btn btn-sm" style={{ background: 'var(--grad-danger)', color: '#fff' }} onClick={() => store.reviewAdminQueueItem(item.id, 'rejected')}>
                        Reject
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: '12px', fontWeight: 600, color: item.status === 'approved' ? '#34d399' : '#f87171' }}>
                      {item.status === 'approved' ? '✓ Approved' : '✕ Rejected'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default Business Owner / Startup Founder Dashboard
  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>Business Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Profile analytics, investor interest, funding progress, and growth metrics.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <StatCard label="Followers" value={currentUser.followersCount.toLocaleString()} color="#818cf8" icon={Users} />
        <StatCard label="Connections" value={currentUser.connectionsCount.toLocaleString()} color="#06b6d4" icon={Users} />
        <StatCard label="Reputation Score" value={currentUser.reputationScore} color="#10b981" icon={Award} subtext={currentUser.verificationTier.replace('_', ' ')} />
        <StatCard label="Investor Views" value={store.opportunities.reduce((acc, o) => acc + o.investorInterestCount, 0)} color="#fbbf24" icon={Eye} />
      </div>

      {/* Active Opportunities Summary */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Your Active Opportunities & Listings</h3>
        {store.opportunities.slice(0, 3).map(opp => (
          <div key={opp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '8px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>{opp.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{opp.companyName} • {opp.investmentRequired}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: '#818cf8', fontWeight: 600 }}>{opp.investorInterestCount} interested</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{opp.documentsAvailable} docs uploaded</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation */}
      <div className="grid-3" style={{ gap: '14px' }}>
        <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }} onClick={() => onNavigateTab('opportunities')}>
          <Briefcase size={16} /> Manage Opportunities
        </button>
        <button className="btn btn-rescue" style={{ width: '100%', padding: '14px' }} onClick={() => onNavigateTab('rescue')}>
          <LifeBuoy size={16} /> Business Rescue Portal
        </button>
        <button className="btn btn-secondary" style={{ width: '100%', padding: '14px' }} onClick={() => onNavigateTab('creators')}>
          <Mic size={16} /> Find Creators
        </button>
      </div>
    </div>
  );
};
