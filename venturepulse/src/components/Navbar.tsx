import React, { useState } from 'react';
import {
  Activity,
  Rocket,
  Lightbulb,
  LifeBuoy,
  Briefcase,
  Mic,
  Award,
  MessageSquare,
  LayoutDashboard,
  Search,
  Bell,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { VenturePulseStore } from '../services/store';
import { UserRole } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAIMatch: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAIMatch,
  searchQuery,
  onSearchChange
}) => {
  const store = VenturePulseStore.getInstance();
  const currentUser = store.getCurrentUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadNotifs = store.notifications.filter(n => !n.read).length;
  const unreadMessages = store.conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const handleSwitchPersona = (userId: string) => {
    store.setCurrentUser(userId);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'business_owner': return 'Business Owner';
      case 'startup_founder': return 'Startup Founder';
      case 'investor': return 'Investor';
      case 'creator': return 'Creator / Influencer';
      case 'mentor': return 'Mentor';
      case 'admin': return 'Admin & Trust';
    }
  };

  return (
    <>
      {/* Top Demo Persona Switcher Bar */}
      <div className="persona-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>
            Simulate Role:
          </span>
          <div className="persona-selector">
            {store.users.map(u => (
              <button
                key={u.id}
                className={`persona-pill ${currentUser.id === u.id ? 'active' : ''}`}
                onClick={() => handleSwitchPersona(u.id)}
                title={`Switch to ${u.name} (${u.role})`}
              >
                <img 
                  src={u.avatar} 
                  alt={u.name} 
                  style={{ width: '16px', height: '16px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <span>{u.name.split(' ')[0]}</span>
                <span style={{ opacity: 0.75, fontSize: '10px' }}>({getRoleBadge(u.role)})</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '12px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#10b981' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
            VenturePulse Live Network
          </span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#94a3b8' }}>
            Current Reputation: <strong style={{ color: '#fff' }}>{currentUser.reputationScore} pts</strong>
          </span>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="navbar">
        {/* Brand */}
        <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => onSelectTab('feed')}>
          <div className="brand-logo-icon">
            <Activity size={22} />
          </div>
          <div>
            <span className="brand-gradient-text">VenturePulse</span>
            <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 600, marginTop: '-3px' }}>
              Capital & Creator Network
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="nav-links">
          <button 
            className={`nav-item ${currentTab === 'feed' ? 'active' : ''}`}
            onClick={() => onSelectTab('feed')}
          >
            <Activity size={16} />
            <span>Feed</span>
          </button>

          <button 
            className={`nav-item ${currentTab === 'startups' ? 'active' : ''}`}
            onClick={() => onSelectTab('startups')}
          >
            <Rocket size={16} />
            <span>Startups</span>
          </button>

          <button 
            className={`nav-item ${currentTab === 'ideas' ? 'active' : ''}`}
            onClick={() => onSelectTab('ideas')}
          >
            <Lightbulb size={16} />
            <span>Ideas</span>
          </button>

          <button 
            className={`nav-item rescue-highlight ${currentTab === 'rescue' ? 'active' : ''}`}
            onClick={() => onSelectTab('rescue')}
          >
            <LifeBuoy size={16} />
            <span>Business Rescue</span>
          </button>

          <button 
            className={`nav-item ${currentTab === 'opportunities' ? 'active' : ''}`}
            onClick={() => onSelectTab('opportunities')}
          >
            <Briefcase size={16} />
            <span>Opportunities</span>
          </button>

          <button 
            className={`nav-item ${currentTab === 'creators' ? 'active' : ''}`}
            onClick={() => onSelectTab('creators')}
          >
            <Mic size={16} />
            <span>Creator Connect</span>
          </button>

          <button 
            className={`nav-item ${currentTab === 'stories' ? 'active' : ''}`}
            onClick={() => onSelectTab('stories')}
          >
            <Award size={16} />
            <span>Outcomes</span>
          </button>

          <button 
            className={`nav-item ${currentTab === 'messages' ? 'active' : ''}`}
            onClick={() => onSelectTab('messages')}
            style={{ position: 'relative' }}
          >
            <MessageSquare size={16} />
            <span>Deals & Chat</span>
            {unreadMessages > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '4px', 
                right: '4px', 
                background: 'var(--color-primary)', 
                color: '#fff', 
                fontSize: '10px', 
                borderRadius: '50%', 
                width: '15px', 
                height: '15px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 700 
              }}>
                {unreadMessages}
              </span>
            )}
          </button>

          <button 
            className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onSelectTab('dashboard')}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Right Actions: Search, AI Match, Notifications, User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search Box */}
          <div className="search-container">
            <Search size={15} className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search companies, ideas, investors..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* AI Match Trigger */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenAIMatch}
            style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              color: '#a5b4fc',
              fontWeight: 600
            }}
          >
            <Sparkles size={14} color="#06b6d4" />
            <span>AI Matches</span>
          </button>

          {/* Notification Button */}
          <div style={{ position: 'relative' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ padding: '8px', position: 'relative', borderRadius: '50%' }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={18} />
              {unreadNotifs > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '0', 
                  right: '0', 
                  background: '#ef4444', 
                  color: '#fff', 
                  fontSize: '10px', 
                  borderRadius: '50%', 
                  width: '16px', 
                  height: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700 
                }}>
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '360px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '16px',
                zIndex: 200,
                animation: 'scaleUp 0.18s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Activity & Alerts</h4>
                  <span style={{ fontSize: '11px', color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => setShowNotifications(false)}>
                    Close
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '340px', overflowY: 'auto' }}>
                  {store.notifications.map(notif => (
                    <div 
                      key={notif.id}
                      onClick={() => {
                        onSelectTab(notif.targetView);
                        setShowNotifications(false);
                      }}
                      style={{
                        padding: '10px 12px',
                        background: notif.read ? 'transparent' : 'rgba(99, 102, 241, 0.08)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontWeight: 600, fontSize: '13px', color: notif.read ? 'var(--text-secondary)' : '#fff' }}>
                          {notif.title}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{notif.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current User Pill */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '4px 10px 4px 6px', 
                background: 'rgba(255, 255, 255, 0.04)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer' 
              }}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{currentUser.name}</span>
                  {currentUser.verificationTier !== 'unverified' && (
                    <CheckCircle2 size={13} color="#10b981" />
                  )}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {getRoleBadge(currentUser.role)}
                </div>
              </div>
              <ChevronDown size={14} color="var(--text-muted)" />
            </div>

            {/* User Dropdown */}
            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '260px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '14px',
                zIndex: 200
              }}>
                <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '10px' }}>
                  <p style={{ fontWeight: 700, fontSize: '14px' }}>{currentUser.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{currentUser.email}</p>
                  <div style={{ marginTop: '6px' }}>
                    <span className="badge badge-verified">
                      <ShieldCheck size={11} /> {currentUser.verificationTier.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    onClick={() => {
                      onSelectTab('dashboard');
                      setShowUserMenu(false);
                    }}
                  >
                    <LayoutDashboard size={14} /> My Dashboard
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    onClick={() => {
                      onSelectTab('messages');
                      setShowUserMenu(false);
                    }}
                  >
                    <MessageSquare size={14} /> Active Deals & Messages
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
