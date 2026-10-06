import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { FeedView } from './components/FeedView';
import { StartupsView } from './components/StartupsView';
import { IdeasView } from './components/IdeasView';
import { RescueView } from './components/RescueView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { CreatorsView } from './components/CreatorsView';
import { StoriesView } from './components/StoriesView';
import { MessagesView } from './components/MessagesView';
import { DashboardView } from './components/DashboardView';
import { AIMatchModal } from './components/AIMatchModal';
import { VenturePulseStore } from './services/store';

function App() {
  const store = VenturePulseStore.getInstance();
  const [currentTab, setCurrentTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIMatch, setShowAIMatch] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe(() => setTick((t) => t + 1));
    return unsub;
  }, [store]);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenAIMatch={() => setShowAIMatch(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="main-content">
        {currentTab === 'feed' && <FeedView onNavigateTab={handleNavigate} searchQuery={searchQuery} />}
        {currentTab === 'startups' && <StartupsView onNavigateTab={handleNavigate} searchQuery={searchQuery} />}
        {currentTab === 'ideas' && <IdeasView searchQuery={searchQuery} />}
        {currentTab === 'rescue' && <RescueView onNavigateTab={handleNavigate} searchQuery={searchQuery} />}
        {currentTab === 'opportunities' && <OpportunitiesView onNavigateTab={handleNavigate} searchQuery={searchQuery} />}
        {currentTab === 'creators' && <CreatorsView onNavigateTab={handleNavigate} searchQuery={searchQuery} />}
        {currentTab === 'stories' && <StoriesView searchQuery={searchQuery} />}
        {currentTab === 'messages' && <MessagesView />}
        {currentTab === 'dashboard' && <DashboardView onNavigateTab={handleNavigate} />}
      </main>

      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
        <p style={{ marginBottom: '6px' }}>
          <strong style={{ color: 'var(--text-secondary)' }}>VenturePulse</strong> — discovery & negotiation network for startups, rescues, investors and creators.
        </p>
        <p style={{ maxWidth: '900px', margin: '0 auto', lineHeight: 1.5 }}>
          No guaranteed returns. Risk labels are editorial guidance, not financial advice. Timestamped idea hashes are
          evidence of submission, not statutory IP registration. Formal investments require independent diligence and licensed legal counsel.
        </p>
      </footer>

      {showAIMatch && <AIMatchModal onClose={() => setShowAIMatch(false)} />}
    </div>
  );
}

export default App;
