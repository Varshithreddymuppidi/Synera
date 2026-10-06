import { 
  User, 
  BusinessProfile, 
  StartupProfile, 
  StartupIdea, 
  BusinessRescue, 
  InvestmentOpportunity, 
  InvestmentDeal, 
  InvestorProfile, 
  CreatorProfile, 
  CreatorCampaign, 
  SocialPost, 
  SuccessStory, 
  Conversation, 
  NotificationItem, 
  AdminQueueItem,
  AIMatchResult
} from '../types';

import {
  INITIAL_USERS,
  INITIAL_BUSINESSES,
  INITIAL_STARTUPS,
  INITIAL_IDEAS,
  INITIAL_RESCUES,
  INITIAL_OPPORTUNITIES,
  INITIAL_DEALS,
  INITIAL_INVESTORS,
  INITIAL_CREATORS,
  INITIAL_CAMPAIGNS,
  INITIAL_POSTS,
  INITIAL_SUCCESS_STORIES,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ADMIN_QUEUE
} from './mockData';

// Helper to get or set localStorage
function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`vp_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading localStorage for vp_${key}`, e);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`vp_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage for vp_${key}`, e);
  }
}

// Generate unique hash
export function generateProofHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const rand = Math.random().toString(16).substring(2, 14);
  return `0x${hex}${rand}7e9a4c`.substring(0, 42);
}

// Generate unique ID code
export function generateCode(prefix: string): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

export class VenturePulseStore {
  private static instance: VenturePulseStore;

  public users: User[];
  public currentUserId: string;
  public businesses: BusinessProfile[];
  public startups: StartupProfile[];
  public ideas: StartupIdea[];
  public rescues: BusinessRescue[];
  public opportunities: InvestmentOpportunity[];
  public deals: InvestmentDeal[];
  public investors: InvestorProfile[];
  public creators: CreatorProfile[];
  public campaigns: CreatorCampaign[];
  public posts: SocialPost[];
  public successStories: SuccessStory[];
  public conversations: Conversation[];
  public notifications: NotificationItem[];
  public adminQueue: AdminQueueItem[];
  public signedNdas: { [ideaOrRescueId: string]: boolean };

  private listeners: (() => void)[] = [];

  private constructor() {
    this.users = getStored('users', INITIAL_USERS);
    this.currentUserId = getStored('currentUserId', 'user-biz-1');
    this.businesses = getStored('businesses', INITIAL_BUSINESSES);
    this.startups = getStored('startups', INITIAL_STARTUPS);
    this.ideas = getStored('ideas', INITIAL_IDEAS);
    this.rescues = getStored('rescues', INITIAL_RESCUES);
    this.opportunities = getStored('opportunities', INITIAL_OPPORTUNITIES);
    this.deals = getStored('deals', INITIAL_DEALS);
    this.investors = getStored('investors', INITIAL_INVESTORS);
    this.creators = getStored('creators', INITIAL_CREATORS);
    this.campaigns = getStored('campaigns', INITIAL_CAMPAIGNS);
    this.posts = getStored('posts', INITIAL_POSTS);
    this.successStories = getStored('successStories', INITIAL_SUCCESS_STORIES);
    this.conversations = getStored('conversations', INITIAL_CONVERSATIONS);
    this.notifications = getStored('notifications', INITIAL_NOTIFICATIONS);
    this.adminQueue = getStored('adminQueue', INITIAL_ADMIN_QUEUE);
    this.signedNdas = getStored('signedNdas', { 'idea-101': true, 'rescue-heritage': true });
  }

  public static getInstance(): VenturePulseStore {
    if (!VenturePulseStore.instance) {
      VenturePulseStore.instance = new VenturePulseStore();
    }
    return VenturePulseStore.instance;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }

  public getCurrentUser(): User {
    const user = this.users.find(u => u.id === this.currentUserId);
    return user || this.users[0];
  }

  public setCurrentUser(userId: string): void {
    this.currentUserId = userId;
    setStored('currentUserId', userId);
    this.notify();
  }

  // --- SOCIAL POSTS ---
  public toggleLikePost(postId: string): void {
    this.posts = this.posts.map(p => {
      if (p.id === postId) {
        const hasLiked = !p.hasLiked;
        return {
          ...p,
          hasLiked,
          likesCount: hasLiked ? p.likesCount + 1 : p.likesCount - 1
        };
      }
      return p;
    });
    setStored('posts', this.posts);
    this.notify();
  }

  public toggleSavePost(postId: string): void {
    this.posts = this.posts.map(p => {
      if (p.id === postId) {
        const hasSaved = !p.hasSaved;
        return {
          ...p,
          hasSaved,
          savesCount: hasSaved ? p.savesCount + 1 : p.savesCount - 1
        };
      }
      return p;
    });
    setStored('posts', this.posts);
    this.notify();
  }

  public addCommentToPost(postId: string, text: string): void {
    const currentUser = this.getCurrentUser();
    this.posts = this.posts.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: `c-${Date.now()}`,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          authorRole: currentUser.role,
          text,
          timestamp: 'Just now'
        };
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    });
    setStored('posts', this.posts);
    this.notify();
  }

  public createPost(data: {
    postType: SocialPost['postType'];
    title?: string;
    content: string;
    tags: string[];
    mediaUrl?: string;
    linkedEntityId?: string;
    linkedEntityType?: SocialPost['linkedEntityType'];
  }): SocialPost {
    const currentUser = this.getCurrentUser();
    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      authorHeadline: currentUser.headline,
      authorVerification: currentUser.verificationTier,
      timestamp: 'Just now',
      postType: data.postType,
      title: data.title,
      content: data.content,
      mediaUrl: data.mediaUrl,
      tags: data.tags,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      savesCount: 0,
      hasLiked: false,
      hasSaved: false,
      linkedEntityId: data.linkedEntityId,
      linkedEntityType: data.linkedEntityType,
      comments: []
    };

    this.posts = [newPost, ...this.posts];
    setStored('posts', this.posts);
    this.notify();
    return newPost;
  }

  // --- STARTUP IDEAS & PROTECTION EVIDENCE ---
  public createIdea(ideaData: {
    title: string;
    summary: string;
    problem: string;
    solution: string;
    targetMarket: string;
    businessModel: string;
    requiredFunding: string;
    estimatedInvestment: string;
    stage: StartupIdea['stage'];
    industry: string;
    location: string;
    tags: string[];
    isConfidential: boolean;
    supportingDocNames: string[];
  }): StartupIdea {
    const currentUser = this.getCurrentUser();
    const ideaCode = generateCode('VP-IDEA');
    const timestamp = new Date().toISOString();
    const proofHash = generateProofHash(`${ideaCode}-${ideaData.title}-${currentUser.id}-${timestamp}`);

    const newIdea: StartupIdea = {
      id: `idea-${Date.now()}`,
      ideaIdCode: ideaCode,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      title: ideaData.title,
      summary: ideaData.summary,
      problem: ideaData.problem,
      solution: ideaData.solution,
      targetMarket: ideaData.targetMarket,
      businessModel: ideaData.businessModel,
      requiredFunding: ideaData.requiredFunding,
      estimatedInvestment: ideaData.estimatedInvestment,
      stage: ideaData.stage,
      tags: ideaData.tags,
      industry: ideaData.industry,
      location: ideaData.location,
      isConfidential: ideaData.isConfidential,
      ndaRequired: ideaData.isConfidential,
      timestamp,
      proofHash,
      versionHistory: [
        {
          version: 1,
          timestamp,
          changeSummary: 'Initial idea registration & cryptographic timestamp proof generation.',
          snapshotHash: proofHash
        }
      ],
      supportingDocuments: ideaData.supportingDocNames.map(name => ({
        name,
        size: '1.5 MB',
        type: 'Supporting Evidence'
      })),
      likesCount: 0,
      commentsCount: 0,
      expressedInterestCount: 0,
      isSaved: false,
      hasLiked: false
    };

    this.ideas = [newIdea, ...this.ideas];
    setStored('ideas', this.ideas);

    // Also publish a feed post
    this.createPost({
      postType: 'startup_idea',
      title: `New Idea Published: ${newIdea.title} (${ideaCode})`,
      content: `${newIdea.summary}\n\nProblem: ${newIdea.problem}\n\nEvidence Hash: ${newIdea.proofHash}\n*Note: VenturePulse timestamp registration provides submission provenance evidence but does not replace statutory patent/trademark filing.*`,
      tags: ['StartupIdea', ...newIdea.tags],
      linkedEntityId: newIdea.id,
      linkedEntityType: 'idea'
    });

    this.notify();
    return newIdea;
  }

  public signNDA(targetId: string): void {
    this.signedNdas[targetId] = true;
    setStored('signedNdas', this.signedNdas);
    this.notify();
  }

  public toggleLikeIdea(ideaId: string): void {
    this.ideas = this.ideas.map((i) => {
      if (i.id === ideaId) {
        const hasLiked = !i.hasLiked;
        return {
          ...i,
          hasLiked,
          likesCount: hasLiked ? i.likesCount + 1 : Math.max(0, i.likesCount - 1),
        };
      }
      return i;
    });
    setStored('ideas', this.ideas);
    this.notify();
  }

  public addNotification(item: Omit<NotificationItem, 'id' | 'timestamp'> & { id?: string; timestamp?: string }): void {
    const notif: NotificationItem = {
      timestamp: 'Just now',
      id: `notif-${Date.now()}`,
      ...item,
    };
    this.notifications.unshift(notif);
    setStored('notifications', this.notifications);
    this.notify();
  }

  public expressInterestInIdea(ideaId: string): void {
    this.ideas = this.ideas.map(i => {
      if (i.id === ideaId) {
        return { ...i, expressedInterestCount: i.expressedInterestCount + 1 };
      }
      return i;
    });
    setStored('ideas', this.ideas);

    const currentUser = this.getCurrentUser();
    this.addNotification({
      type: 'investment_interest',
      title: 'Interest Expressed in Idea',
      message: `${currentUser.name} expressed interest in discussing terms for your idea.`,
      read: false,
      targetView: 'ideas'
    });
  }

  // --- BUSINESS RESCUE ---
  public createRescueRequest(data: {
    businessName: string;
    category: string;
    location: string;
    storySummary: string;
    whatHappened: string;
    currentFinancialSituation: string;
    struggleCauses: string[];
    amountRequired: string;
    useOfFunds: string;
    existingDebt: string;
    revenueHistory: string;
    expensesSummary: string;
    assetsList: string[];
    liabilitiesList: string[];
    recoveryPlan: string;
    expectedFutureRevenue: string;
    expectedProfitability: string;
    proposedInvestorReturn: string;
    riskRating: 'High Risk' | 'Medium Risk' | 'Lower Risk';
    docNames: string[];
  }): BusinessRescue {
    const currentUser = this.getCurrentUser();
    const rescueCode = generateCode('VP-RESCUE');

    const newRescue: BusinessRescue = {
      id: `rescue-${Date.now()}`,
      rescueCode,
      businessName: data.businessName,
      founderName: currentUser.name,
      category: data.category,
      location: data.location,
      logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&auto=format&fit=crop&q=80',
      storySummary: data.storySummary,
      whatHappened: data.whatHappened,
      currentFinancialSituation: data.currentFinancialSituation,
      struggleCauses: data.struggleCauses,
      amountRequired: data.amountRequired,
      useOfFunds: data.useOfFunds,
      existingDebt: data.existingDebt,
      revenueHistory: data.revenueHistory,
      expensesSummary: data.expensesSummary,
      assetsList: data.assetsList,
      liabilitiesList: data.liabilitiesList,
      recoveryPlan: data.recoveryPlan,
      expectedFutureRevenue: data.expectedFutureRevenue,
      expectedProfitability: data.expectedProfitability,
      proposedInvestorReturn: data.proposedInvestorReturn,
      riskRating: data.riskRating,
      claimVerification: 'platform_verified',
      privateDocs: data.docNames.map(name => ({ name, size: '2.5 MB', verified: true })),
      requiresVerificationToViewDocs: true,
      investorOffersCount: 0,
      status: 'active_request'
    };

    this.rescues = [newRescue, ...this.rescues];
    setStored('rescues', this.rescues);

    // Also add to investment opportunities marketplace
    const newOpportunity: InvestmentOpportunity = {
      id: `opp-${Date.now()}`,
      code: `OPP-${rescueCode}`,
      title: `${data.businessName} Turnaround Funding`,
      entityType: 'business_rescue',
      companyName: data.businessName,
      industry: data.category,
      location: data.location,
      investmentRequired: data.amountRequired,
      valuation: 'Asset Backed Turnaround',
      fundingPurpose: data.useOfFunds,
      businessStage: 'Distressed / Restructuring',
      riskLevel: data.riskRating,
      expectedReturn: data.proposedInvestorReturn,
      proposedStructure: 'profit_sharing',
      investmentDurationMonths: 36,
      claimVerification: 'platform_verified',
      documentsAvailable: data.docNames.length,
      investorInterestCount: 1,
      highlightMetric: `Debt: ${data.existingDebt} | Recovery Plan Ready`,
      tags: ['BusinessRescue', 'Turnaround', data.category]
    };
    this.opportunities = [newOpportunity, ...this.opportunities];
    setStored('opportunities', this.opportunities);

    // Add social feed post
    this.createPost({
      postType: 'rescue_call',
      title: `Business Rescue Notice: ${data.businessName} (${rescueCode})`,
      content: `${data.storySummary}\n\nSeeking: ${data.amountRequired}\nProposed Return: ${data.proposedInvestorReturn}\n\nConfidential verified vault documents accessible to verified investors.`,
      tags: ['BusinessRescue', 'Turnaround', 'Opportunity'],
      linkedEntityId: newRescue.id,
      linkedEntityType: 'rescue'
    });

    this.notify();
    return newRescue;
  }

  // --- DEAL NEGOTIATION & TERM SHEET ---
  public submitDealCounterOffer(dealId: string, terms: {
    amount: string;
    equityOrShare: string;
    duration: string;
    milestones: string[];
    repaymentTerms: string;
    note: string;
  }): void {
    const currentUser = this.getCurrentUser();
    this.deals = this.deals.map(d => {
      if (d.id === dealId) {
        const newLog = {
          author: `${currentUser.name} (${currentUser.role})`,
          timestamp: new Date().toISOString(),
          action: 'Submitted counter-proposal terms',
          terms: {
            amount: terms.amount,
            equityOrShare: terms.equityOrShare,
            duration: terms.duration,
            note: terms.note
          }
        };
        return {
          ...d,
          proposedAmount: terms.amount,
          repaymentTerms: terms.repaymentTerms,
          milestones: terms.milestones.length > 0 ? terms.milestones : d.milestones,
          status: 'counter_offered',
          bothPartiesAccepted: false,
          negotiationLogs: [...d.negotiationLogs, newLog]
        };
      }
      return d;
    });
    setStored('deals', this.deals);

    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: 'deal_proposal',
      title: 'Counter-Offer Updated on Term Sheet',
      message: `${currentUser.name} updated the negotiation terms for Deal ${dealId}.`,
      timestamp: 'Just now',
      read: false,
      targetView: 'deals'
    });
    setStored('notifications', this.notifications);
    this.notify();
  }

  public acceptDeal(dealId: string): void {
    const currentUser = this.getCurrentUser();
    this.deals = this.deals.map(d => {
      if (d.id === dealId) {
        const newLog = {
          author: `${currentUser.name} (${currentUser.role})`,
          timestamp: new Date().toISOString(),
          action: 'Accepted finalized deal terms',
          terms: {
            amount: d.proposedAmount,
            equityOrShare: d.profitSharePercent ? `${d.profitSharePercent}% Profit-Share` : `${d.equityPercent}% Equity`,
            duration: `${d.durationMonths} months`,
            note: 'Final agreement locked by mutual consent. Proceeding to regulatory compliance onboarding.'
          }
        };
        return {
          ...d,
          status: 'accepted_by_both',
          bothPartiesAccepted: true,
          negotiationLogs: [...d.negotiationLogs, newLog]
        };
      }
      return d;
    });
    setStored('deals', this.deals);

    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: 'deal_proposal',
      title: 'Deal Mutually Agreed & Locked!',
      message: `Congratulations! Deal ${dealId} has been formally accepted by both parties. Downloadable Term Sheet generated.`,
      timestamp: 'Just now',
      read: false,
      targetView: 'deals'
    });
    setStored('notifications', this.notifications);
    this.notify();
  }

  // --- CREATOR CAMPAIGNS ---
  public createCampaign(campaignData: {
    title: string;
    description: string;
    niche: string;
    budget: string;
    targetPlatforms: string[];
    deliverables: string[];
    deadline: string;
  }): CreatorCampaign {
    const currentUser = this.getCurrentUser();
    const newCamp: CreatorCampaign = {
      id: `camp-${Date.now()}`,
      businessId: currentUser.id,
      businessName: currentUser.companyOrOrg || currentUser.name,
      businessLogo: currentUser.avatar,
      title: campaignData.title,
      description: campaignData.description,
      niche: campaignData.niche,
      budget: campaignData.budget,
      targetPlatforms: campaignData.targetPlatforms,
      deliverables: campaignData.deliverables,
      deadline: campaignData.deadline,
      applicantsCount: 0,
      status: 'accepting_applications'
    };

    this.campaigns = [newCamp, ...this.campaigns];
    setStored('campaigns', this.campaigns);

    this.createPost({
      postType: 'creator_collab',
      title: `Brand Campaign Request: ${campaignData.title}`,
      content: `${campaignData.description}\n\nBudget: ${campaignData.budget}\nTarget Platforms: ${campaignData.targetPlatforms.join(', ')}\nDeliverables: ${campaignData.deliverables.join(' | ')}`,
      tags: ['CreatorCampaign', 'InfluencerCollab', campaignData.niche.replace(/\s+/g, '')],
      linkedEntityId: newCamp.id,
      linkedEntityType: 'campaign'
    });

    this.notify();
    return newCamp;
  }

  public applyToCampaign(campaignId: string, proposalNote: string): void {
    const currentUser = this.getCurrentUser();
    this.campaigns = this.campaigns.map(c => {
      if (c.id === campaignId) {
        return { ...c, applicantsCount: c.applicantsCount + 1 };
      }
      return c;
    });
    setStored('campaigns', this.campaigns);

    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: 'campaign_apply',
      title: 'New Creator Application',
      message: `${currentUser.name} applied for your campaign: "${proposalNote.substring(0, 50)}..."`,
      timestamp: 'Just now',
      read: false,
      targetView: 'creators'
    });
    setStored('notifications', this.notifications);
    this.notify();
  }

  // --- MESSAGING ---
  public sendMessage(conversationId: string, text: string, isDealUpdate = false, dealTermsSnippet?: string): void {
    const currentUser = this.getCurrentUser();
    const newMsg = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: 'Just now',
      isDealUpdate,
      dealTermsSnippet
    };

    this.conversations = this.conversations.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });
    setStored('conversations', this.conversations);
    this.notify();
  }

  // --- ADMIN QUEUE & FRAUD ACTIONS ---
  public reviewAdminQueueItem(itemId: string, status: 'approved' | 'rejected'): void {
    this.adminQueue = this.adminQueue.map(item => {
      if (item.id === itemId) {
        return { ...item, status };
      }
      return item;
    });
    setStored('adminQueue', this.adminQueue);
    this.notify();
  }

  // --- AI MATCH ENGINE ---
  public calculateAIMatches(): AIMatchResult[] {
    const currentUser = this.getCurrentUser();

    if (currentUser.role === 'business_owner' || currentUser.role === 'startup_founder') {
      return [
        {
          targetId: 'investor-vikram',
          targetName: 'Vikram Singhania (Singhania Capital)',
          targetType: 'Investor',
          matchScore: 94,
          rationale: [
            'Target investment ticket (₹15L - ₹1Cr) matches your expansion/rescue requirements.',
            'Specializes in clean supply chain, retail turnarounds, and revenue-sharing instruments.',
            'Track record: 78% verified success rate across 18 completed investments.'
          ],
          keySynergies: ['Turnaround Experience', 'Customer Introductions', 'Non-predatory debt structure']
        },
        {
          targetId: 'creator-sarah',
          targetName: 'Sarah Chen (@TechWithSarah)',
          targetType: 'Influencer',
          matchScore: 89,
          rationale: [
            'Strong demographic alignment (76% B2B professionals and founders in target regions).',
            'High verified engagement rate (5.2%) on product deep-dives.',
            'Previously delivered 3.4x higher conversion for hardware and logistics tech.'
          ],
          keySynergies: ['YouTube In-depth Reviews', 'LinkedIn B2B Authority', 'High Trust Audience']
        }
      ];
    } else if (currentUser.role === 'investor') {
      return [
        {
          targetId: 'opp-1',
          targetName: 'Apex Green Logistics Ltd.',
          targetType: 'Business',
          matchScore: 96,
          rationale: [
            'Matches your preferred ticket size with ₹1.2 Cr expansion capital requirement.',
            'Already EBITDA positive (14.2% margin) with verified zero-spoilage SLA records.',
            'High asset backing with existing EV fleet operations and tier-1 enterprise agreements.'
          ],
          keySynergies: ['Fleet Expansion Capital', 'B2B Enterprise Synergy', 'High Predictable Cash Flow']
        },
        {
          targetId: 'rescue-heritage',
          targetName: 'Heritage Gourmet Supermarket',
          targetType: 'Business',
          matchScore: 91,
          rationale: [
            'Clear turnaround pathway: physical roadworks resolved; unencumbered ₹45L asset base.',
            'Offers 10% annual profit-share for 3 years (targeted 1.6x return cap).',
            'Established brand with 42,000 active loyal customers ready for online delivery.'
          ],
          keySynergies: ['Tranche Escrow Disbursement', 'Supplier Re-negotiation', 'Short Turnaround Time']
        }
      ];
    } else {
      return [
        {
          targetId: 'camp-1',
          targetName: 'Apex Green Logistics Ltd.',
          targetType: 'Business',
          matchScore: 93,
          rationale: [
            'Clean tech / sustainability topic matches your tech & enterprise audience.',
            'Clear deliverables with competitive budget (₹1,20,000).',
            'Platform-verified business with audited track record.'
          ],
          keySynergies: ['Video Integration', 'Executive Interview', 'Long-term Ambassador Potential']
        }
      ];
    }
  }
}
