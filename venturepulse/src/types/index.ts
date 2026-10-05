export type UserRole = 
  | 'business_owner' 
  | 'startup_founder' 
  | 'investor' 
  | 'creator' 
  | 'mentor' 
  | 'admin';

export type VerificationTier = 
  | 'unverified' 
  | 'basic' 
  | 'business_verified' 
  | 'investor_verified' 
  | 'creator_verified' 
  | 'trusted_elite';

export type ClaimVerification = 'platform_verified' | 'self_reported' | 'pending_audit';

export type RiskLevel = 'High Risk' | 'Medium Risk' | 'Lower Risk';

export type DealStructure = 'equity' | 'profit_sharing' | 'convertible_note' | 'debt_milestone';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  headline: string;
  bio: string;
  location: string;
  verificationTier: VerificationTier;
  reputationScore: number;
  followersCount: number;
  connectionsCount: number;
  companyOrOrg?: string;
  isCurrentUser?: boolean;
}

export interface BusinessProfile {
  id: string;
  ownerId: string;
  companyName: string;
  founderName: string;
  logo: string;
  coverImage: string;
  industry: string;
  category: string;
  location: string;
  website: string;
  foundedYear: number;
  employeesCount: string;
  revenueRange: string;
  businessStage: 'Early Operating' | 'Established' | 'Expansion' | 'Distressed / Restructuring';
  description: string;
  productsServices: string[];
  achievements: string[];
  financials: {
    annualRevenue: string;
    profitMargin: string;
    existingDebt: string;
    valuationEstimate?: string;
  };
  fundingStatus: 'actively_raising' | 'seeking_rescue' | 'bootstrapped_profitable' | 'funded';
  fundingRequired?: string;
  currentChallenges: string;
  socialLinks: { [key: string]: string };
  claimVerification: ClaimVerification;
  businessRating: number;
  reviewsCount: number;
  followersCount: number;
}

export interface StartupProfile {
  id: string;
  founderId: string;
  startupName: string;
  founderName: string;
  coFounders: string[];
  industry: string;
  problem: string;
  solution: string;
  productDescription: string;
  targetCustomers: string;
  marketSizeTam: string;
  businessModel: string;
  competitiveAdvantage: string;
  stage: 'Idea' | 'Prototype / MVP' | 'Early Traction' | 'Scaling';
  mvpStatus: 'Live in Production' | 'Private Beta' | 'In Development' | 'Architecture Done';
  traction: {
    activeUsers: string;
    monthlyRecurringRevenue: string;
    momGrowthPercent: string;
    payingCustomers: string;
  };
  fundingRequired: string;
  fundingRaisedSoFar: string;
  equityOfferedPercent: number;
  investmentTerms: string;
  pitchDeckSummary: string;
  pitchDeckUrl?: string;
  ipStatus: string;
  patentTrademarkInfo: string;
  claimVerification: ClaimVerification;
  investorInterestCount: number;
}

export interface IdeaVersion {
  version: number;
  timestamp: string;
  changeSummary: string;
  snapshotHash: string;
}

export interface StartupIdea {
  id: string;
  ideaIdCode: string; // e.g. "VP-IDEA-8821"
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  requiredFunding: string;
  estimatedInvestment: string;
  stage: 'Concept Stage' | 'Validation Stage' | 'Prototype Design';
  tags: string[];
  industry: string;
  location: string;
  isConfidential: boolean;
  ndaRequired: boolean;
  timestamp: string;
  proofHash: string;
  versionHistory: IdeaVersion[];
  supportingDocuments: { name: string; size: string; type: string }[];
  likesCount: number;
  commentsCount: number;
  expressedInterestCount: number;
  isSaved?: boolean;
  hasLiked?: boolean;
}

export interface BusinessRescue {
  id: string;
  rescueCode: string; // e.g. "VP-RESCUE-042"
  businessName: string;
  founderName: string;
  category: string;
  location: string;
  logo: string;
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
  riskRating: RiskLevel;
  claimVerification: ClaimVerification;
  privateDocs: { name: string; size: string; verified: boolean }[];
  requiresVerificationToViewDocs: boolean;
  investorOffersCount: number;
  status: 'active_request' | 'under_due_diligence' | 'deal_negotiation' | 'rescued_stabilized';
}

export interface InvestmentOpportunity {
  id: string;
  code: string;
  title: string;
  entityType: 'startup' | 'business_rescue' | 'growth_company' | 'small_business';
  companyName: string;
  industry: string;
  location: string;
  investmentRequired: string;
  valuation?: string;
  fundingPurpose: string;
  businessStage: string;
  riskLevel: RiskLevel;
  expectedReturn: string;
  proposedStructure: DealStructure;
  investmentDurationMonths: number;
  claimVerification: ClaimVerification;
  documentsAvailable: number;
  investorInterestCount: number;
  highlightMetric: string;
  tags: string[];
}

export interface DealNegotiationLog {
  author: string;
  timestamp: string;
  action: string;
  terms: {
    amount: string;
    equityOrShare: string;
    duration: string;
    note: string;
  };
}

export interface InvestmentDeal {
  id: string;
  dealCode: string; // e.g. "DEAL-2026-904"
  opportunityId: string;
  businessName: string;
  investorName: string;
  businessId: string;
  investorId: string;
  requestedAmount: string;
  proposedAmount: string;
  structure: DealStructure;
  equityPercent?: number;
  profitSharePercent?: number;
  durationMonths: number;
  repaymentTerms: string;
  milestones: string[];
  investorRights: string[];
  reportingRequirements: string;
  status: 'draft' | 'offered' | 'counter_offered' | 'accepted_by_both' | 'legal_compliance_review' | 'closed';
  bothPartiesAccepted: boolean;
  createdAt: string;
  negotiationLogs: DealNegotiationLog[];
}

export interface InvestorPortfolioItem {
  id: string;
  companyName: string;
  industry: string;
  investedAmount: string;
  investmentDate: string;
  status: 'Active' | 'Completed - Profitable' | 'Exited' | 'Under Restructuring';
  investorReturn: string;
  verifiedOutcome: boolean;
  publicDisclosureAuthorized: boolean;
}

export interface InvestorProfile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  organization: string;
  experienceYears: number;
  industriesInterested: string[];
  geographicPreferences: string[];
  typicalTicketSize: string;
  investmentPhilosophy: string;
  riskPreference: 'Conservative & Debt' | 'Balanced Growth & Profit-Share' | 'High-Growth Venture Equity';
  totalInvestments: number;
  activeInvestments: number;
  successfulInvestments: number;
  successRatePercent: number; // e.g. 78% (Defined as: profitable exits + sustained profit-sharing milestones met)
  investorLevel: 1 | 2 | 3 | 4 | 5; // 1 Member, 2 Active, 3 Verified, 4 Trusted, 5 Elite
  levelTitle: 'Member' | 'Active Investor' | 'Verified Investor' | 'Trusted Investor' | 'Elite Investor';
  reputationScore: number;
  claimVerification: ClaimVerification;
  portfolio: InvestorPortfolioItem[];
  communityRating: number;
  dealsCompleted: number;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  niche: 'Tech & AI' | 'Finance & Business' | 'D2C & Retail' | 'Healthcare & Wellness' | 'B2B Growth';
  platforms: {
    platform: 'YouTube' | 'LinkedIn' | 'Instagram' | 'X' | 'Podcast' | 'TikTok';
    handle: string;
    followers: string;
    followersCountNum: number;
    engagementRate: string;
    avgViews: string;
  }[];
  totalReach: string;
  audienceDemographics: {
    primaryAge: string;
    topLocations: string[];
    genderSplit: string;
  };
  previousCampaigns: {
    brand: string;
    objective: string;
    reachGenerated: string;
    roiVerdict: string;
  }[];
  pricingModel: string;
  collaborationPreferences: string[];
  rating: number;
  reviewsCount: number;
  claimVerification: ClaimVerification;
}

export interface CreatorCampaign {
  id: string;
  businessId: string;
  businessName: string;
  businessLogo: string;
  title: string;
  description: string;
  niche: string;
  budget: string;
  targetPlatforms: string[];
  deliverables: string[];
  deadline: string;
  applicantsCount: number;
  status: 'accepting_applications' | 'evaluating' | 'active_campaign' | 'completed';
}

export interface SocialPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  authorHeadline: string;
  authorVerification: VerificationTier;
  timestamp: string;
  postType: 'business_update' | 'funding_request' | 'rescue_call' | 'startup_idea' | 'creator_collab' | 'success_story' | 'general';
  title?: string;
  content: string;
  mediaUrl?: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  hasLiked?: boolean;
  hasSaved?: boolean;
  linkedEntityId?: string;
  linkedEntityType?: 'startup' | 'rescue' | 'idea' | 'campaign';
  comments?: {
    id: string;
    authorName: string;
    authorAvatar: string;
    authorRole: UserRole;
    text: string;
    timestamp: string;
  }[];
}

export interface SuccessStory {
  id: string;
  title: string;
  businessName: string;
  investorName: string;
  category: string;
  initialSituation: string;
  fundingProvided: string;
  recoveryTimeline: string;
  businessOutcome: string;
  investorReturn: string;
  verificationBadge: ClaimVerification;
  verifiedByAuditor: string;
  auditDate: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isDealUpdate?: boolean;
  dealTermsSnippet?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: UserRole;
  participantHeadline: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isDealDiscussion: boolean;
  associatedDealId?: string;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  type: 'investment_interest' | 'deal_proposal' | 'verification_update' | 'campaign_apply' | 'social_engagement' | 'rescue_alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetView: string;
}

export interface AIMatchResult {
  targetId: string;
  targetName: string;
  targetType: 'Investor' | 'Influencer' | 'Startup' | 'Business';
  matchScore: number;
  rationale: string[];
  keySynergies: string[];
}

export interface AdminQueueItem {
  id: string;
  type: 'business_verification' | 'investor_verification' | 'creator_verification' | 'flagged_content' | 'dispute';
  entityName: string;
  submittedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  riskScore: 'Low' | 'Medium' | 'High';
  documents: string[];
  notes: string;
}
