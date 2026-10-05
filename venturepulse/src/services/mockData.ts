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
  AdminQueueItem 
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-biz-1',
    name: 'Rajesh Sharma',
    email: 'rajesh@apexgreen.io',
    role: 'business_owner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    headline: 'Founder & CEO @ Apex Green Logistics | EV Fleet Expansion',
    bio: 'Pioneering clean-energy cold supply chain logistics across South Asia. Scaling from 120 to 500 electric refrigerated vehicles.',
    location: 'Bengaluru, India',
    verificationTier: 'business_verified',
    reputationScore: 785,
    followersCount: 3420,
    connectionsCount: 890,
    companyOrOrg: 'Apex Green Logistics',
    isCurrentUser: true
  },
  {
    id: 'user-startup-1',
    name: 'Dr. Ananya Verma',
    email: 'ananya@neuropulse.health',
    role: 'startup_founder',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    headline: 'Co-founder & Chief AI Scientist @ NeuroPulse Diagnostics',
    bio: 'Ex-AI Lead at Stanford Med. Developing non-invasive real-time EEG neural biomarker detection for early-stage neurodegenerative disorders.',
    location: 'Hyderabad / Silicon Valley',
    verificationTier: 'business_verified',
    reputationScore: 812,
    followersCount: 5120,
    connectionsCount: 1240,
    companyOrOrg: 'NeuroPulse Diagnostics'
  },
  {
    id: 'user-investor-1',
    name: 'Vikram Singhania',
    email: 'vikram@singhaniacapital.com',
    role: 'investor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    headline: 'Managing Partner @ Singhania Capital | Turnaround & Growth Angel',
    bio: '30+ deals led across D2C, retail turnaround, and healthtech. Focus on sustainable profitability and revenue-share debt structures.',
    location: 'Mumbai, India',
    verificationTier: 'trusted_elite',
    reputationScore: 842,
    followersCount: 14200,
    connectionsCount: 2840,
    companyOrOrg: 'Singhania Capital'
  },
  {
    id: 'user-creator-1',
    name: 'Sarah Chen',
    email: 'sarah@growthcreators.media',
    role: 'creator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    headline: 'Tech & B2B Creator | 340k+ Reach on YouTube & LinkedIn',
    bio: 'Deep-dive product breakdowns, SaaS teardowns, and growth marketing. Helped 40+ brands achieve 3.4x higher conversion through authentic narrative.',
    location: 'Singapore & Remote',
    verificationTier: 'creator_verified',
    reputationScore: 790,
    followersCount: 19800,
    connectionsCount: 3100,
    companyOrOrg: 'TechPulse Media'
  },
  {
    id: 'user-rescue-1',
    name: 'Marcus Sterling',
    email: 'marcus@heritagegourmet.store',
    role: 'business_owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    headline: 'Managing Director @ Heritage Gourmet Stores | Seeking Rescue Capital',
    bio: '3-location specialty grocery chain impacted by post-pandemic expansion debt. Turnaround plan ready with verified assets and loyal 42,000 member base.',
    location: 'Pune / Hyderabad, India',
    verificationTier: 'business_verified',
    reputationScore: 640,
    followersCount: 1200,
    connectionsCount: 430,
    companyOrOrg: 'Heritage Gourmet Supermarket'
  },
  {
    id: 'user-admin-1',
    name: 'VenturePulse Compliance',
    email: 'trust@venturepulse.io',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    headline: 'Platform Integrity, Audit & Fraud Prevention Officer',
    bio: 'Monitoring business legitimacy, document provenance, risk classifications, and legal compliance.',
    location: 'Global Desk',
    verificationTier: 'trusted_elite',
    reputationScore: 990,
    followersCount: 120,
    connectionsCount: 400,
    companyOrOrg: 'VenturePulse Platform Authority'
  }
];

export const INITIAL_BUSINESSES: BusinessProfile[] = [
  {
    id: 'biz-apex',
    ownerId: 'user-biz-1',
    companyName: 'Apex Green Logistics Ltd.',
    founderName: 'Rajesh Sharma',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&auto=format&fit=crop&q=80',
    industry: 'Logistics & Supply Chain',
    category: 'CleanTech Fleet & Cold Chain',
    location: 'Bengaluru, India',
    website: 'https://apexgreenlogistics.demo',
    foundedYear: 2021,
    employeesCount: '65 full-time',
    revenueRange: '₹4.2 Cr - ₹5.8 Cr',
    businessStage: 'Expansion',
    description: 'Apex Green Logistics operates zero-emission temperature-controlled intra-city freight for hyper-local grocery, pharmaceuticals, and fresh produce. Utilizing proprietary IoT battery swapping nodes to cut delivery cost by 31%.',
    productsServices: [
      'EV Reefer Van Intra-city Haulage',
      'Pharma Cold-Chain Monitoring APIs',
      'Automated Multi-drop Route Optimization'
    ],
    achievements: [
      'Zero spoilage SLA maintained over 1.4 million delivered parcels',
      'Greentech Logistics Startup of the Year (2024)',
      'Certified ISO 9001:2015 and ISO 14001 Compliant'
    ],
    financials: {
      annualRevenue: '₹4,85,00,000',
      profitMargin: '14.2% Net EBITDA',
      existingDebt: '₹62,00,000 (Fleet leasing bank debt)',
      valuationEstimate: '₹22,00,0000'
    },
    fundingStatus: 'actively_raising',
    fundingRequired: '₹1,20,00,000 for 12% Equity or 3-Year Profit Bond',
    currentChallenges: 'Capital required to pre-order 40 high-capacity electric vans to fulfill 3 enterprise tier-1 agreements.',
    socialLinks: { linkedin: 'https://linkedin.com', twitter: 'https://x.com' },
    claimVerification: 'platform_verified',
    businessRating: 4.8,
    reviewsCount: 38,
    followersCount: 3420
  },
  {
    id: 'biz-heritage',
    ownerId: 'user-rescue-1',
    companyName: 'Heritage Gourmet Supermarket',
    founderName: 'Marcus Sterling',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900&auto=format&fit=crop&q=80',
    industry: 'Retail & Consumer Goods',
    category: 'Specialty Grocery & Supermarket',
    location: 'Pune / Hyderabad, India',
    website: 'https://heritagegourmet.demo',
    foundedYear: 2017,
    employeesCount: '34 staff',
    revenueRange: '₹3.1 Cr - ₹3.8 Cr (Pre-crisis)',
    businessStage: 'Distressed / Restructuring',
    description: 'Premier neighborhood grocery chain specializing in organic produce, imported delicacies, and artisanal bakery. Hit by untimely expansion debts during high interest rate spikes.',
    productsServices: ['Organic Farm Produce', 'In-house Sourdough Bakery', 'Gourmet Cheese & Delicatessen'],
    achievements: ['42,000+ active loyalty club members', 'Rated 4.7/5 on Google Reviews across 1,800+ reviews'],
    financials: {
      annualRevenue: '₹2,60,00,000',
      profitMargin: '-3.8% (Operating cash flow strained by supplier credit)',
      existingDebt: '₹38,00,000 (Short term vendor payable & credit line)',
      valuationEstimate: '₹8,50,00,000 (Asset backed)'
    },
    fundingStatus: 'seeking_rescue',
    fundingRequired: '₹28,00,000 Rescue Infusion (10% Annual Profit Share for 3 Years)',
    currentChallenges: 'Vendor supply halt on 2 stores due to delayed payables; prime physical assets unencumbered worth ₹45 Lakh.',
    socialLinks: { instagram: 'https://instagram.com' },
    claimVerification: 'platform_verified',
    businessRating: 4.6,
    reviewsCount: 94,
    followersCount: 1200
  }
];

export const INITIAL_STARTUPS: StartupProfile[] = [
  {
    id: 'startup-neuropulse',
    founderId: 'user-startup-1',
    startupName: 'NeuroPulse Diagnostics',
    founderName: 'Dr. Ananya Verma',
    coFounders: ['Dr. Vikram Rao (MD, Neurologist)', 'Sanjay K. (Hardware Lead)'],
    industry: 'Healthcare & DeepTech AI',
    problem: 'Neurodegenerative conditions like Alzheimer and Parkinson are diagnosed 8 to 10 years too late when brain atrophy has already occurred.',
    solution: 'Proprietary ultra-compact 8-channel neural headset paired with edge diffusion AI that identifies micro-spikes in visual evoked potentials with 94.6% sensitivity in under 4 minutes.',
    productDescription: 'Point-of-care clinical neural scanner with cloud-based diagnostic report synthesis approved under research classification.',
    targetCustomers: 'Neurology specialty clinics, memory care centers, and clinical trial pharmacology sponsors.',
    marketSizeTam: '$18.4 Billion Global Cognitive Diagnostics Market',
    businessModel: 'B2B Medical SaaS + Device Lease ($450/month per clinic + $45 per automated test diagnostic report).',
    competitiveAdvantage: '3 provisional patents filed on sensory spike detection; validated on 820 clinical cohort patients.',
    stage: 'Early Traction',
    mvpStatus: 'Live in Production',
    traction: {
      activeUsers: '14 Active Medical Centers',
      monthlyRecurringRevenue: '₹14,50,000 MRR',
      momGrowthPercent: '28% MoM',
      payingCustomers: '14 Enterprise Clinics'
    },
    fundingRequired: '₹50,00,000',
    fundingRaisedSoFar: '₹25,00,000 (Pre-seed grants)',
    equityOfferedPercent: 8.5,
    investmentTerms: 'Convertible Seed Note with 20% discount or Straight Equity at ₹5.88 Cr Pre-money cap.',
    pitchDeckSummary: '16-slide comprehensive deck detailing clinical trial results, FDA 510(k) pathway, unit economics, and 5-year pipeline.',
    pitchDeckUrl: '#pitch-deck-neuropulse',
    ipStatus: '3 Patents Pending (PCT International Filing)',
    patentTrademarkInfo: 'Registered Trademark "NeuroPulse VEP" under Nice Class 10 (Medical Instruments)',
    claimVerification: 'platform_verified',
    investorInterestCount: 22
  },
  {
    id: 'startup-agribot',
    founderId: 'user-biz-1',
    startupName: 'TerraBotics Precision Agriculture',
    founderName: 'Karthik Raman',
    coFounders: ['Dr. Sunita Patel (Agronomist)'],
    industry: 'AgriTech & Robotics',
    problem: 'Pesticide overuse and weed resistance cost farmers 35% of their net margins while degrading soil microbiota.',
    solution: 'Autonomous solar-powered micro-rover that uses sub-millimeter computer vision to inject micro-droplets of biological herbicides directly on weeds.',
    productDescription: 'Field-ready rover that operates 14 hours per day autonomously covering 25 acres per charge cycle.',
    targetCustomers: 'Cotton, soybean, and vineyard commercial growers.',
    marketSizeTam: '$12.2 Billion Precision Farming Market',
    businessModel: 'Robotics-as-a-Service (RaaS) charging ₹800 per acre per season.',
    competitiveAdvantage: 'Reduces chemical chemical expenditure by 88% with verifiable GPS-tagged treatment logs.',
    stage: 'Prototype / MVP',
    mvpStatus: 'Private Beta',
    traction: {
      activeUsers: '6 Commercial Pilot Farms',
      monthlyRecurringRevenue: '₹4,20,000 MRR (Pilot phase)',
      momGrowthPercent: '35% MoM',
      payingCustomers: '6 Contracted Farms'
    },
    fundingRequired: '₹35,00,000',
    fundingRaisedSoFar: '₹12,00,000 (Angel round)',
    equityOfferedPercent: 7.0,
    investmentTerms: 'Priced Equity Round at ₹5.0 Cr Valuation Cap.',
    pitchDeckSummary: 'Technical validation results across 400 acres in Maharashtra and Punjab.',
    pitchDeckUrl: '#pitch-deck-terrabotics',
    ipStatus: 'Proprietary vision-guided micro-nozzle mechanism',
    patentTrademarkInfo: 'IP assignment completed with IIT Bombay Incubator',
    claimVerification: 'platform_verified',
    investorInterestCount: 16
  }
];

export const INITIAL_IDEAS: StartupIdea[] = [
  {
    id: 'idea-101',
    ideaIdCode: 'VP-IDEA-8821',
    authorId: 'user-biz-1',
    authorName: 'Rajesh Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Solar Cold-Node Grid for Perishable Farmer Gate Pickups',
    summary: 'Decentralized modular solar-powered micro-chillers placed directly at village cluster aggregation centers to cut post-harvest spoilage from 40% to under 4%.',
    problem: 'Smallholder farmers lose over ₹92,000 Crore annually due to lack of cold storage within 5km of harvesting grounds.',
    solution: 'Modular shipping container chillers powered by bifacial solar canopies with pay-per-crate mobile QR payments.',
    targetMarket: 'Tomato, banana, and horticulture farming belts across Deccan plateau.',
    businessModel: '₹15 per crate per day cold rental + aggregated logistics booking fee.',
    requiredFunding: '₹40,00,000 for 4 pilot nodes',
    estimatedInvestment: '₹40L - ₹60L',
    stage: 'Validation Stage',
    tags: ['AgriTech', 'CleanEnergy', 'RuralEconomy', 'IoT'],
    industry: 'Agriculture & CleanTech',
    location: 'Karnataka & Andhra Pradesh',
    isConfidential: true,
    ndaRequired: true,
    timestamp: '2026-09-18T10:30:00Z',
    proofHash: '0x8fbc923a10e74b59c40219db8e821104e76d338a0c4921f009e',
    versionHistory: [
      {
        version: 1,
        timestamp: '2026-09-18T10:30:00Z',
        changeSummary: 'Initial idea timestamped registration and evidence hash generation.',
        snapshotHash: '0x8fbc923a10e74b59c40219db8e821104e76d338a0c4921f009e'
      },
      {
        version: 2,
        timestamp: '2026-09-24T14:15:00Z',
        changeSummary: 'Added thermal battery phase change material (PCM) engineering specifications.',
        snapshotHash: '0x33e8b092a1147cc98104e287a91bb49f8216503c801eef2340b'
      }
    ],
    supportingDocuments: [
      { name: 'Thermal_PCM_Efficiency_Study.pdf', size: '2.4 MB', type: 'Technical Whitepaper' },
      { name: 'Village_Cluster_Feasibility_Survey.pdf', size: '1.8 MB', type: 'Market Survey' }
    ],
    likesCount: 142,
    commentsCount: 29,
    expressedInterestCount: 18,
    isSaved: false,
    hasLiked: false
  },
  {
    id: 'idea-102',
    ideaIdCode: 'VP-IDEA-9143',
    authorId: 'user-startup-1',
    authorName: 'Dr. Ananya Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'AI Multi-Agent Invoice Reconciliation & Instant Micro-Factoring',
    summary: 'Autonomous AI accountants that ingest WhatsApp and paper invoices, match with GST portal records, and unlock instantaneous micro-factoring within 90 seconds.',
    problem: 'MSMEs face 90-120 day payment delays from corporate buyers, leading to severe working capital strangulation.',
    solution: 'Edge OCR + zero-knowledge proof verification connecting verified suppliers directly to NBFCs and private liquidity pools.',
    targetMarket: 'Tier 2/3 manufacturing suppliers and auto-component fabricators.',
    businessModel: '0.4% processing commission on cleared invoices + monthly SaaS for enterprise reconciliation.',
    requiredFunding: '₹60,00,000 for NBFC integration & API core',
    estimatedInvestment: '₹50L - ₹80L',
    stage: 'Concept Stage',
    tags: ['FinTech', 'AI', 'MSME', 'CashFlow'],
    industry: 'Financial Technology',
    location: 'Bengaluru / Mumbai',
    isConfidential: false,
    ndaRequired: false,
    timestamp: '2026-09-29T16:00:00Z',
    proofHash: '0x22c409fa410972b901ee73809afc43109d736a5438810291ba',
    versionHistory: [
      {
        version: 1,
        timestamp: '2026-09-29T16:00:00Z',
        changeSummary: 'Initial idea registration & verifiable timestamp.',
        snapshotHash: '0x22c409fa410972b901ee73809afc43109d736a5438810291ba'
      }
    ],
    supportingDocuments: [
      { name: 'Regulatory_Factoring_Overview.pdf', size: '1.2 MB', type: 'Regulatory Map' }
    ],
    likesCount: 215,
    commentsCount: 44,
    expressedInterestCount: 31,
    isSaved: true,
    hasLiked: true
  }
];

export const INITIAL_RESCUES: BusinessRescue[] = [
  {
    id: 'rescue-heritage',
    rescueCode: 'VP-RESCUE-042',
    businessName: 'Heritage Gourmet Supermarket',
    founderName: 'Marcus Sterling',
    category: 'Retail & Specialty Supermarket',
    location: 'Pune / Hyderabad, India',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&auto=format&fit=crop&q=80',
    storySummary: 'Established high-end specialty grocery business with 3 prime storefronts hit by aggressive debt service from a 2023 expansion right before local road widening delayed foot traffic.',
    whatHappened: 'In mid-2023, we secured a ₹40 Lakh high-interest short-term credit line to furnish our 3rd flagship store. Municipal infrastructure works simultaneously blocked our main parking entrance for 7 months, causing a temporary 42% revenue dip. While footfall has now returned to 90% normal, accumulated vendor arrears are choking fresh stock deliveries.',
    currentFinancialSituation: 'Operations are viable and store #1 and #2 generate positive operational cashflow. Store #3 has broke even. However, distributor suppliers require ₹28 Lakh immediate settlement to resume 30-day revolving credit terms.',
    struggleCauses: [
      'Municipal road works causing temporary 7-month access restriction',
      'Short-term high interest borrowing with weekly amortization burden',
      'Vendor credit freeze halting high-margin imported gourmet stock'
    ],
    amountRequired: '₹28,00,000 Rescue Infusion',
    useOfFunds: '₹22,00,000 for complete settlement of frozen vendor lines; ₹6,00,000 for critical fast-moving fresh inventory buffer.',
    existingDebt: '₹38,00,000 total (₹16L bank equipment loan + ₹22L supplier trade payables)',
    revenueHistory: 'FY23: ₹3.6 Cr | FY24: ₹3.1 Cr | FY25 (Current Run-Rate): ₹2.8 Cr',
    expensesSummary: 'Fixed Rent: ₹3.8L/mo, Staff Payroll: ₹4.2L/mo, Utilities: ₹0.9L/mo. Gross Margin: 26.5%.',
    assetsList: [
      'Commercial cold-rooms & display chillers (Depreciated value: ₹22,00,000)',
      'Unencumbered store fitments & fixtures (Value: ₹15,00,000)',
      'Current salable dry inventory on shelf (Value: ₹8,50,000)'
    ],
    liabilitiesList: [
      'Trade Supplier Payables: ₹22,00,000',
      'Remaining Bank Equipment Line: ₹16,00,000'
    ],
    recoveryPlan: '1. Clear frozen vendor lines to regain 30-day terms and 5% bulk cash discounts. 2. Sub-lease 25% of Store #3 floor space to an artisanal coffee franchise (already in MOU, generating ₹65,000/mo guaranteed rent). 3. Launch online express delivery to existing 42,000 loyalty members.',
    expectedFutureRevenue: '₹3.8 Cr in Year 1 post-rescue | ₹4.5 Cr in Year 2',
    expectedProfitability: 'Net EBITDA of 9.5% (approx ₹36 Lakh to ₹42 Lakh annual net profit)',
    proposedInvestorReturn: '10% of gross store profits paid quarterly for 3 years until 1.6x return achieved, OR 14% straight equity with board advisory seat.',
    riskRating: 'Medium Risk',
    claimVerification: 'platform_verified',
    privateDocs: [
      { name: 'Audited_P&L_FY23_FY24.pdf', size: '3.8 MB', verified: true },
      { name: 'Bank_Statements_Last_12_Months.pdf', size: '5.1 MB', verified: true },
      { name: 'Supplier_Outstanding_Debt_Ledger.pdf', size: '1.4 MB', verified: true },
      { name: 'Store_Lease_Agreements_x3.pdf', size: '4.2 MB', verified: true }
    ],
    requiresVerificationToViewDocs: true,
    investorOffersCount: 3,
    status: 'deal_negotiation'
  },
  {
    id: 'rescue-forge',
    rescueCode: 'VP-RESCUE-078',
    businessName: 'Kaveri Precision Forging & Tools',
    founderName: 'Suresh Patil',
    category: 'Manufacturing & Engineering',
    location: 'Coimbatore, India',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&auto=format&fit=crop&q=80',
    storySummary: 'Established 14-year-old auto component fabrication unit impacted by sudden surge in raw alloy steel prices coupled with delayed client receivables from an EV tier-1 OEM.',
    whatHappened: 'A prime customer delayed payment of ₹55 Lakh by 180 days due to restructuring. Kaveri had to service fixed power costs and skilled metallurgical staff without liquidity.',
    currentFinancialSituation: 'Firm order book of ₹1.8 Cr waiting to be executed, but working capital is depleted to procure raw alloy billeting.',
    struggleCauses: [
      'Client payment default from restructuring OEM',
      '30% raw material price spike in alloy billets',
      'Working capital liquidity crunch'
    ],
    amountRequired: '₹45,00,000',
    useOfFunds: 'Raw steel billet procurement and worker retention bonus to clear pending purchase orders.',
    existingDebt: '₹50,00,000 (Machinery hypothecation)',
    revenueHistory: 'FY23: ₹4.8 Cr | FY24: ₹4.2 Cr | FY25 Projected: ₹5.5 Cr',
    expensesSummary: 'Power & Fuel: ₹4.5L/mo, Skilled Labor: ₹5.2L/mo, Factory Rent: Owned Land.',
    assetsList: [
      '500-ton hydraulic forging presses x 2 (Market value: ₹1.4 Cr)',
      'CNC Machining Center & EDM tools (Value: ₹65 Lakh)',
      'Owned industrial plot 12,000 sq ft (Value: ₹2.2 Cr)'
    ],
    liabilitiesList: [
      'Bank working capital overdraft: ₹50,00,000',
      'Raw material suppliers: ₹18,00,000'
    ],
    recoveryPlan: 'Enforce legal recovery of ₹55 Lakh pending receivable while using rescue funds to fulfill high-margin export orders for agricultural pump components.',
    expectedFutureRevenue: '₹5.5 Cr in 12 months with 18% gross margin',
    expectedProfitability: '₹48 Lakh annual operating profit',
    proposedInvestorReturn: '12% Annual Interest + 4% Equity warrant, or 15% net profit share until 1.5x principal returned.',
    riskRating: 'Lower Risk',
    claimVerification: 'platform_verified',
    privateDocs: [
      { name: 'Factory_Asset_Valuation_Report.pdf', size: '6.2 MB', verified: true },
      { name: 'Confirmed_Export_PO_Contracts.pdf', size: '2.9 MB', verified: true }
    ],
    requiresVerificationToViewDocs: true,
    investorOffersCount: 5,
    status: 'under_due_diligence'
  }
];

export const INITIAL_OPPORTUNITIES: InvestmentOpportunity[] = [
  {
    id: 'opp-1',
    code: 'OPP-APEX-01',
    title: 'Clean-Energy Cold Chain Logistics Expansion',
    entityType: 'growth_company',
    companyName: 'Apex Green Logistics Ltd.',
    industry: 'Logistics & CleanTech',
    location: 'Bengaluru, India',
    investmentRequired: '₹1,20,00,000',
    valuation: '₹22,00,0000 Pre-money',
    fundingPurpose: 'Fleet procurement of 40 EV refrigerated delivery vans to fulfill contracted enterprise pipelines.',
    businessStage: 'Expansion (EBITDA Positive)',
    riskLevel: 'Lower Risk',
    expectedReturn: '18% - 24% IRR Target',
    proposedStructure: 'equity',
    investmentDurationMonths: 36,
    claimVerification: 'platform_verified',
    documentsAvailable: 6,
    investorInterestCount: 28,
    highlightMetric: '₹4.85 Cr Rev | 14.2% Net EBITDA',
    tags: ['EV Fleet', 'ColdChain', 'Profitable', 'AssetBacked']
  },
  {
    id: 'opp-2',
    code: 'OPP-NEURO-02',
    title: 'AI Point-of-Care Neural Biomarker Scanner',
    entityType: 'startup',
    companyName: 'NeuroPulse Diagnostics',
    industry: 'Healthcare AI & DeepTech',
    location: 'Hyderabad, India',
    investmentRequired: '₹50,00,000',
    valuation: '₹5,88,00,000 Cap',
    fundingPurpose: 'Clinical validation trial at 4 apex institutes and FDA 510(k) preparation.',
    businessStage: 'Early Traction (₹14.5L MRR)',
    riskLevel: 'Medium Risk',
    expectedReturn: '3.5x - 7.0x Target Exit Multiple',
    proposedStructure: 'convertible_note',
    investmentDurationMonths: 48,
    claimVerification: 'platform_verified',
    documentsAvailable: 8,
    investorInterestCount: 22,
    highlightMetric: '94.6% Diagnostic Sensitivity | 14 Clinics Live',
    tags: ['MedTech', 'AI', 'PatentsPending', 'HighGrowth']
  },
  {
    id: 'opp-3',
    code: 'OPP-RESCUE-03',
    title: 'Heritage Gourmet Supermarket Turnaround',
    entityType: 'business_rescue',
    companyName: 'Heritage Gourmet Supermarket',
    industry: 'Retail & Supermarket',
    location: 'Pune / Hyderabad, India',
    investmentRequired: '₹28,00,000',
    valuation: 'Asset Backed (₹45L Equipment)',
    fundingPurpose: 'Vendor debt settlement to unlock frozen high-margin stock lines & express delivery app rollout.',
    businessStage: 'Distressed / Restructuring',
    riskLevel: 'Medium Risk',
    expectedReturn: '10% Annual Profit Share for 3 Years (1.6x Cap)',
    proposedStructure: 'profit_sharing',
    investmentDurationMonths: 36,
    claimVerification: 'platform_verified',
    documentsAvailable: 4,
    investorInterestCount: 14,
    highlightMetric: '42k Loyalty Customers | ₹45L Tangible Assets',
    tags: ['BusinessRescue', 'ProfitSharing', 'Retail', 'Turnaround']
  },
  {
    id: 'opp-4',
    code: 'OPP-FORGE-04',
    title: 'Precision Alloy Forging & Tooling Working Capital',
    entityType: 'business_rescue',
    companyName: 'Kaveri Precision Forging & Tools',
    industry: 'Manufacturing',
    location: 'Coimbatore, India',
    investmentRequired: '₹45,00,000',
    valuation: '₹4.2 Cr Tangible Net Worth',
    fundingPurpose: 'Procure raw alloy steel to fulfill ₹1.8 Cr confirmed pending purchase orders.',
    businessStage: 'Distressed / Liquidity Crunch',
    riskLevel: 'Lower Risk',
    expectedReturn: '12% Annual Interest + 4% Equity Warrant',
    proposedStructure: 'debt_milestone',
    investmentDurationMonths: 24,
    claimVerification: 'platform_verified',
    documentsAvailable: 5,
    investorInterestCount: 19,
    highlightMetric: '₹1.8 Cr Backlog Orders | ₹2.2 Cr Land Value',
    tags: ['Industrial', 'SecuredDebt', 'ExportOrders']
  }
];

export const INITIAL_DEALS: InvestmentDeal[] = [
  {
    id: 'deal-904',
    dealCode: 'DEAL-2026-904',
    opportunityId: 'opp-3',
    businessName: 'Heritage Gourmet Supermarket',
    investorName: 'Vikram Singhania',
    businessId: 'biz-heritage',
    investorId: 'user-investor-1',
    requestedAmount: '₹28,00,000',
    proposedAmount: '₹28,00,000',
    structure: 'profit_sharing',
    profitSharePercent: 10,
    durationMonths: 36,
    repaymentTerms: 'Quarterly audit-backed distribution of 10% gross store profits until total payout reaches ₹44,80,000 (1.6x multiple). If target is reached earlier, contract terminates gracefully.',
    milestones: [
      'Tranche 1 (₹18L): Direct escrow disbursement to 6 major frozen distributors against signed receipt waivers.',
      'Tranche 2 (₹6L): Disbursed upon proof of restocking fast-moving fresh produce categories.',
      'Tranche 3 (₹4L): Allocated towards the express delivery fulfillment integration.'
    ],
    investorRights: [
      'Monthly access to bank transaction feed & digital POS reports',
      'Approval right over any new third-party borrowing exceeding ₹5,00,000',
      'Board observer seat with monthly review meetings'
    ],
    reportingRequirements: 'Monthly P&L statement delivered within 7 business days of month-end; certified by practicing CA quarterly.',
    status: 'counter_offered',
    bothPartiesAccepted: false,
    createdAt: '2026-09-28T12:00:00Z',
    negotiationLogs: [
      {
        author: 'Heritage Gourmet (Marcus Sterling)',
        timestamp: '2026-09-28T12:00:00Z',
        action: 'Proposed initial rescue terms',
        terms: {
          amount: '₹28,00,000',
          equityOrShare: '8% profit share for 3 years',
          duration: '36 months',
          note: 'Seeking single tranche funding to clear accounts payable immediately.'
        }
      },
      {
        author: 'Vikram Singhania (Investor)',
        timestamp: '2026-09-30T15:30:00Z',
        action: 'Counter-offered structured 3-tranche plan',
        terms: {
          amount: '₹28,00,000',
          equityOrShare: '10% profit share with 1.6x cap',
          duration: '36 months',
          note: 'Tranche release contingent on direct vendor settlement to safeguard capital.'
        }
      }
    ]
  }
];

export const INITIAL_INVESTORS: InvestorProfile[] = [
  {
    id: 'investor-vikram',
    userId: 'user-investor-1',
    name: 'Vikram Singhania',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    organization: 'Singhania Capital Partners',
    experienceYears: 16,
    industriesInterested: ['Retail & D2C', 'Clean Logistics', 'Healthcare Diagnostics', 'B2B Manufacturing'],
    geographicPreferences: ['India', 'Southeast Asia', 'Middle East'],
    typicalTicketSize: '₹15,00,000 - ₹1,00,00,000 ($20k - $120k)',
    investmentPhilosophy: 'We believe real returns come from fundamental business unit economics rather than endless speculative rounds. We specialize in structuring patient capital, rescue turnarounds, and revenue-sharing partnerships that align incentives without predatory dilution.',
    riskPreference: 'Balanced Growth & Profit-Share',
    totalInvestments: 24,
    activeInvestments: 16,
    successfulInvestments: 18,
    successRatePercent: 78,
    investorLevel: 4,
    levelTitle: 'Trusted Investor',
    reputationScore: 842,
    claimVerification: 'platform_verified',
    communityRating: 4.85,
    dealsCompleted: 15,
    portfolio: [
      {
        id: 'port-1',
        companyName: 'Nava Foods & Beverages',
        industry: 'FMCG Retail',
        investedAmount: '₹30,00,000',
        investmentDate: '2022-03-15',
        status: 'Completed - Profitable',
        investorReturn: '₹54,00,000 (1.8x return via 3-yr profit-share)',
        verifiedOutcome: true,
        publicDisclosureAuthorized: true
      },
      {
        id: 'port-2',
        companyName: 'Zenith Cold Storage Hubs',
        industry: 'Supply Chain',
        investedAmount: '₹45,00,000',
        investmentDate: '2023-08-10',
        status: 'Active',
        investorReturn: 'On track: 18% annual yield delivered',
        verifiedOutcome: true,
        publicDisclosureAuthorized: true
      },
      {
        id: 'port-3',
        companyName: 'Apex Green Logistics',
        industry: 'CleanTech Fleet',
        investedAmount: '₹20,00,000',
        investmentDate: '2024-01-20',
        status: 'Active',
        investorReturn: 'Holding 4.5% equity stake',
        verifiedOutcome: true,
        publicDisclosureAuthorized: true
      }
    ]
  },
  {
    id: 'investor-meera',
    userId: 'user-investor-2',
    name: 'Meera Krishnan',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    organization: 'Artha Catalyst Syndicate',
    experienceYears: 12,
    industriesInterested: ['DeepTech AI', 'Biotech', 'AgriTech', 'SaaS'],
    geographicPreferences: ['India', 'Singapore', 'US'],
    typicalTicketSize: '₹25,00,000 - ₹2,50,00,000',
    investmentPhilosophy: 'Backing defensible intellectual property and clinical breakthroughs with high scientific moats.',
    riskPreference: 'High-Growth Venture Equity',
    totalInvestments: 31,
    activeInvestments: 22,
    successfulInvestments: 25,
    successRatePercent: 82,
    investorLevel: 5,
    levelTitle: 'Elite Investor',
    reputationScore: 920,
    claimVerification: 'platform_verified',
    communityRating: 4.95,
    dealsCompleted: 21,
    portfolio: [
      {
        id: 'port-4',
        companyName: 'PulseWave Biosensors',
        industry: 'HealthTech',
        investedAmount: '₹60,00,000',
        investmentDate: '2021-06-12',
        status: 'Exited',
        investorReturn: '4.2x exit via Series B acquisition',
        verifiedOutcome: true,
        publicDisclosureAuthorized: true
      }
    ]
  }
];

export const INITIAL_CREATORS: CreatorProfile[] = [
  {
    id: 'creator-sarah',
    userId: 'user-creator-1',
    name: 'Sarah Chen',
    handle: '@TechWithSarah',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Deep-dive technology analyst & enterprise software reviewer. Demystifying B2B AI, supply chain tech, and modern startup infrastructure.',
    niche: 'Tech & AI',
    platforms: [
      {
        platform: 'YouTube',
        handle: 'youtube.com/@techwithsarah',
        followers: '210k subscribers',
        followersCountNum: 210000,
        engagementRate: '5.2%',
        avgViews: '42,000 views/video'
      },
      {
        platform: 'LinkedIn',
        handle: 'linkedin.com/in/sarahchentech',
        followers: '85k followers',
        followersCountNum: 85000,
        engagementRate: '4.6%',
        avgViews: '28,000 impressions/post'
      },
      {
        platform: 'X',
        handle: 'x.com/tech_sarah',
        followers: '45k followers',
        followersCountNum: 45000,
        engagementRate: '3.8%',
        avgViews: '18,000 impressions'
      }
    ],
    totalReach: '340,000+ Cross-Platform',
    audienceDemographics: {
      primaryAge: '25 - 44 (76% working professionals & founders)',
      topLocations: ['India (42%)', 'United States (28%)', 'Singapore / UK (18%)'],
      genderSplit: '62% Male / 38% Female'
    },
    previousCampaigns: [
      {
        brand: 'CloudScale DB',
        objective: 'Enterprise developer trial signups',
        reachGenerated: '112,000 views across 2 videos',
        roiVerdict: 'Delivered 840 qualified enterprise signups at $14 CAC (Industry benchmark $45)'
      },
      {
        brand: 'LogiTrack IoT',
        objective: 'Cold-chain logistics founder awareness',
        reachGenerated: '64,000 impressions on LinkedIn case study',
        roiVerdict: 'Generated 22 inbound enterprise pilot inquiries'
      }
    ],
    pricingModel: '₹60,000 / Dedicated Video | ₹25,000 / LinkedIn Thought-Leadership Post | Performance Equity Hybrid',
    collaborationPreferences: [
      'Authentic product testing required before campaign agreement',
      'No unregulated crypto or unverified financial schemes',
      'Open to revenue-share or performance-bonus arrangements'
    ],
    rating: 4.9,
    reviewsCount: 26,
    claimVerification: 'platform_verified'
  },
  {
    id: 'creator-arjun',
    userId: 'user-creator-2',
    name: 'Arjun Mehta',
    handle: '@FinPulseIndia',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: 'Business breakdown journalist & D2C consumer behavior analyst. Host of The Capital Story podcast.',
    niche: 'Finance & Business',
    platforms: [
      {
        platform: 'Instagram',
        handle: 'instagram.com/finpulseindia',
        followers: '380k followers',
        followersCountNum: 380000,
        engagementRate: '5.8%',
        avgViews: '120,000 views/reel'
      },
      {
        platform: 'YouTube',
        handle: 'youtube.com/@finpulseindia',
        followers: '140k subscribers',
        followersCountNum: 140000,
        engagementRate: '6.4%',
        avgViews: '65,000 views'
      }
    ],
    totalReach: '520,000+ Followers',
    audienceDemographics: {
      primaryAge: '22 - 35 (84% urban consumers & aspiring entrepreneurs)',
      topLocations: ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Pune'],
      genderSplit: '58% Male / 42% Female'
    },
    previousCampaigns: [
      {
        brand: 'PureOrigins Organic Milk',
        objective: 'Brand trust & subscriber acquisition',
        reachGenerated: '480,000 video impressions',
        roiVerdict: '3,200 direct monthly recurring app subscriptions generated'
      }
    ],
    pricingModel: '₹45,000 per Instagram Reel | ₹80,000 Video Sponsor',
    collaborationPreferences: ['Clean consumer brands', 'Ethical food & retail', 'SME success stories'],
    rating: 4.8,
    reviewsCount: 34,
    claimVerification: 'platform_verified'
  }
];

export const INITIAL_CAMPAIGNS: CreatorCampaign[] = [
  {
    id: 'camp-1',
    businessId: 'biz-apex',
    businessName: 'Apex Green Logistics Ltd.',
    businessLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=80',
    title: 'Clean Fleets for Modern Cities: B2B Thought Leadership Campaign',
    description: 'Seeking 2 B2B tech/sustainability creators to produce an authentic case study breaking down how transitioning to EV cold chain logistics saves 31% operating costs and cuts 42 metric tons of carbon monthly.',
    niche: 'Tech & B2B Sustainability',
    budget: '₹1,20,000 total (₹60k per creator)',
    targetPlatforms: ['LinkedIn', 'YouTube'],
    deliverables: ['1x Detailed LinkedIn Analysis Post', '1x 3-minute mini-documentary integration or video segment'],
    deadline: '2026-10-30',
    applicantsCount: 7,
    status: 'accepting_applications'
  },
  {
    id: 'camp-2',
    businessId: 'biz-heritage',
    businessName: 'Heritage Gourmet Supermarket',
    businessLogo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&auto=format&fit=crop&q=80',
    title: 'Support Local Artisans: Heritage Bakery & Cheese Relaunch',
    description: 'Looking for 3 regional food & lifestyle influencers to visit our flagship stores, highlight our generational artisan sourdough bakers, and drive foot traffic for our weekend farmer tasting market.',
    niche: 'Food, Retail & Lifestyle',
    budget: '₹90,000 + ₹15,000 Gourmet Gift Hampers',
    targetPlatforms: ['Instagram', 'YouTube Shorts'],
    deliverables: ['2x Instagram Reels showcasing bakery craft', 'Store location tagged story carousel with exclusive customer coupon code'],
    deadline: '2026-10-20',
    applicantsCount: 14,
    status: 'accepting_applications'
  }
];

export const INITIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    authorId: 'user-biz-1',
    authorName: 'Rajesh Sharma',
    authorRole: 'business_owner',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorHeadline: 'Founder & CEO @ Apex Green Logistics | EV Fleet Expansion',
    authorVerification: 'business_verified',
    timestamp: '2 hours ago',
    postType: 'business_update',
    title: 'Milestone: 1,400,000 Zero-Emission Cold Deliveries Completed!',
    content: 'Proud to announce that Apex Green Logistics has officially crossed 1.4M completed temperature-controlled deliveries across Bengaluru and Hyderabad without a single cold-chain temperature compromise. Our custom IoT thermal telemetry ensured an average transit variance of under 0.4°C. We are now preparing to induct 40 next-gen EV delivery vans to support our new enterprise contracts.',
    mediaUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&auto=format&fit=crop&q=80',
    tags: ['CleanLogistics', 'FleetExpansion', 'IoT', 'Sustainability'],
    likesCount: 238,
    commentsCount: 34,
    sharesCount: 18,
    savesCount: 42,
    hasLiked: false,
    hasSaved: false,
    linkedEntityId: 'opp-1',
    linkedEntityType: 'startup',
    comments: [
      {
        id: 'c-1',
        authorName: 'Vikram Singhania',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        authorRole: 'investor',
        text: 'Tremendous milestone Rajesh. Maintaining sub-0.5°C variance in our summer weather is difficult. The telemetry data makes a real difference in enterprise contract renewals.',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'post-2',
    authorId: 'user-rescue-1',
    authorName: 'Marcus Sterling',
    authorRole: 'business_owner',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    authorHeadline: 'Managing Director @ Heritage Gourmet Stores | Seeking Rescue Capital',
    authorVerification: 'business_verified',
    timestamp: '5 hours ago',
    postType: 'rescue_call',
    title: 'Business Rescue Request: Heritage Gourmet Supermarket Restructuring & Recovery Plan',
    content: 'Running a transparent business means being honest about setbacks. After 7 years of serving 42,000 loyal families across Pune & Hyderabad, prolonged municipal road works outside our flagship store choked parking access for 7 months, triggering vendor credit freezes.\n\nOur underlying stores are fundamentally profitable, and parking is now fully restored. We have listed a verified Business Rescue opportunity on VenturePulse for ₹28,00,000 structured as a 10% annual profit-share for 3 years (with an agreed 1.6x cap), backed by ₹45 Lakh of tangible refrigeration and store assets. We invite verified turnaround investors to inspect our audited financials in the secure vault.',
    mediaUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900&auto=format&fit=crop&q=80',
    tags: ['BusinessRescue', 'Turnaround', 'TransparentCapital', 'RetailSupermarket'],
    likesCount: 312,
    commentsCount: 58,
    sharesCount: 46,
    savesCount: 65,
    hasLiked: true,
    hasSaved: true,
    linkedEntityId: 'rescue-heritage',
    linkedEntityType: 'rescue',
    comments: [
      {
        id: 'c-2',
        authorName: 'Vikram Singhania',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        authorRole: 'investor',
        text: 'Respect your transparency Marcus. I have reviewed the vault documents and submitted a counter-structured tranche proposal to ensure direct distributor vendor settlement.',
        timestamp: '3 hours ago'
      },
      {
        id: 'c-3',
        authorName: 'Sarah Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        authorRole: 'creator',
        text: 'Heritage Bakery is legendary in Pune. Happy to feature the turnaround story on my platform once supply lines are refreshed!',
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    authorId: 'user-startup-1',
    authorName: 'Dr. Ananya Verma',
    authorRole: 'startup_founder',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    authorHeadline: 'Co-founder & Chief AI Scientist @ NeuroPulse Diagnostics',
    authorVerification: 'business_verified',
    timestamp: '1 day ago',
    postType: 'funding_request',
    title: 'NeuroPulse Raising ₹50 Lakh Seed Round: Transforming Neurodegenerative Early Detection',
    content: 'We are thrilled to share that NeuroPulse Diagnostics has now onboarded 14 specialty neurology clinics across South India, generating ₹14.5 Lakh MRR at 28% MoM growth. Our non-invasive neural sensor detects early Parkinson biomarkers in under 4 minutes with 94.6% sensitivity.\n\nWe are opening a ₹50,000,000 seed round on VenturePulse to fund our 4-center multicentric clinical trial and accelerate regulatory clearances. Check out our verified traction metrics and deck below.',
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80',
    tags: ['MedTech', 'ArtificialIntelligence', 'SeedRound', 'DeepTech'],
    likesCount: 489,
    commentsCount: 62,
    sharesCount: 39,
    savesCount: 94,
    hasLiked: false,
    hasSaved: true,
    linkedEntityId: 'startup-neuropulse',
    linkedEntityType: 'startup'
  },
  {
    id: 'post-4',
    authorId: 'user-investor-1',
    authorName: 'Vikram Singhania',
    authorRole: 'investor',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorHeadline: 'Managing Partner @ Singhania Capital | Turnaround & Growth Angel',
    authorVerification: 'trusted_elite',
    timestamp: '2 days ago',
    postType: 'success_story',
    title: 'Verified Outcome: How Nava Foods Turned a ₹30L Rescue into a 1.8x Payout in 28 Months',
    content: 'Too often, people assume a struggling business is a dead business. In March 2022, Nava Foods was facing severe cash starvation due to an abrupt retail partner bankruptcy. Instead of liquidating, we designed a ₹30 Lakh structured profit-sharing arrangement with zero punitive dilution for the founders.\n\nBy refocusing on high-margin corporate catering and renegotiating supplier schedules, Nava returned to operational profitability in 6 months. Last month, they completed their final quarterly distribution, delivering a clean 1.8x return (18% annualized IRR) to our syndicate while retaining 100% of their equity ownership. Real partnership builds enduring enterprises.',
    mediaUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=900&auto=format&fit=crop&q=80',
    tags: ['VerifiedSuccess', 'BusinessRescue', 'ProfitSharing', 'CapitalWithIntegrity'],
    likesCount: 684,
    commentsCount: 88,
    sharesCount: 71,
    savesCount: 142,
    hasLiked: true,
    hasSaved: true
  }
];

export const INITIAL_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    title: 'Supermarket Chain Turnaround: From Near Insolvency to ₹4.2 Cr Revenue',
    businessName: 'Nava Foods & Regional Retail',
    investorName: 'Vikram Singhania (Singhania Capital)',
    category: 'Retail & Supermarket Turnaround',
    initialSituation: 'A 2-store specialty grocery faced sudden default when a major institutional distributor collapsed holding ₹22 Lakh in deposits. Suppliers froze deliveries and shelves were 45% empty.',
    fundingProvided: '₹30,00,000 structured as a 12% quarterly profit-share with direct vendor escrow release.',
    recoveryTimeline: '14 Months to sustainable positive cashflow; 28 months to complete 1.8x payout ($54L).',
    businessOutcome: 'The business returned to 94% on-shelf availability, opened a 3rd express outlet, and founders retained 100% of their equity cap table.',
    investorReturn: '₹54,00,000 returned (1.8x multiple, 19.4% annualized return).',
    verificationBadge: 'platform_verified',
    verifiedByAuditor: 'Kreston SG & Associates LLP (Practicing Chartered Accountants)',
    auditDate: 'Verified on August 14, 2025'
  },
  {
    id: 'story-2',
    title: 'DeepTech Sensor Spin-out: Early Proof-of-Concept to Series B Acquisition',
    businessName: 'PulseWave Biosensors',
    investorName: 'Meera Krishnan (Artha Catalyst)',
    category: 'Healthcare & DeepTech Exit',
    initialSituation: 'Academic spinout from Indian Institute of Science with working laboratory prototype but unable to finance ISO 13485 cleanroom validation.',
    fundingProvided: '₹60,00,000 Seed Equity Round at ₹4.2 Cr Cap.',
    recoveryTimeline: '36 months from seed to clinical trial completion.',
    businessOutcome: 'Secured CE Mark and 510(k) pathway; acquired by international diagnostics leader.',
    investorReturn: '4.2x cash return on Series B acquisition.',
    verificationBadge: 'platform_verified',
    verifiedByAuditor: 'Platform Regulatory Audit Committee',
    auditDate: 'Verified on January 10, 2026'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'user-investor-1',
    participantName: 'Vikram Singhania',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    participantRole: 'investor',
    participantHeadline: 'Managing Partner @ Singhania Capital',
    lastMessage: 'I have reviewed your updated cashflow projections. The tranche structure in Deal #904 protects both parties.',
    lastMessageTime: '10 mins ago',
    unreadCount: 1,
    isDealDiscussion: true,
    associatedDealId: 'deal-904',
    messages: [
      {
        id: 'm-1',
        senderId: 'user-investor-1',
        senderName: 'Vikram Singhania',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        text: 'Hello Rajesh and Marcus! I reviewed the Business Rescue request and the telemetry updates on Apex. Looking forward to discussing the term sheet.',
        timestamp: 'Yesterday, 4:15 PM'
      },
      {
        id: 'm-2',
        senderId: 'user-biz-1',
        senderName: 'Rajesh Sharma',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Thank you Vikram! We have uploaded the audited telemetry variance logs for Q2. All 120 vehicles performed with 99.8% uptime.',
        timestamp: 'Yesterday, 5:30 PM'
      },
      {
        id: 'm-3',
        senderId: 'user-investor-1',
        senderName: 'Vikram Singhania',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        text: 'I have submitted the updated tranche proposal under DEAL-2026-904 for ₹28,00,000. Let me know when you review the term sheet summary.',
        timestamp: 'Today, 2:20 PM',
        isDealUpdate: true,
        dealTermsSnippet: 'Term Sheet: ₹28,00,000 | 10% Profit-Share | 3 Tranches | 1.6x Multiple'
      }
    ]
  },
  {
    id: 'conv-2',
    participantId: 'user-creator-1',
    participantName: 'Sarah Chen',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    participantRole: 'creator',
    participantHeadline: 'Tech & B2B Creator | 340k+ Reach',
    lastMessage: 'I submitted my proposal for the Clean Fleets thought leadership campaign. Excited to collaborate!',
    lastMessageTime: '1 hour ago',
    unreadCount: 0,
    isDealDiscussion: false,
    messages: [
      {
        id: 'm-4',
        senderId: 'user-creator-1',
        senderName: 'Sarah Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Hi Rajesh! I saw your campaign for the EV cold-chain fleet. We can do an impactful video on YouTube showing the onboard IoT telematics plus an analytical post on LinkedIn.',
        timestamp: '1 hour ago'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'deal_proposal',
    title: 'New Counter-Offer on Deal #904',
    message: 'Vikram Singhania submitted a 3-tranche counter-offer for ₹28,00,000 funding with a 10% profit-share.',
    timestamp: '15 mins ago',
    read: false,
    targetView: 'deals'
  },
  {
    id: 'notif-2',
    type: 'investment_interest',
    title: 'New Investor Expressed Interest',
    message: 'Meera Krishnan (Artha Catalyst) expressed interest in NeuroPulse Diagnostics (₹50L Seed Round).',
    timestamp: '2 hours ago',
    read: false,
    targetView: 'startups'
  },
  {
    id: 'notif-3',
    type: 'campaign_apply',
    title: 'Creator Application Received',
    message: 'Sarah Chen applied for the "Clean Fleets for Modern Cities" campaign.',
    timestamp: '4 hours ago',
    read: true,
    targetView: 'creators'
  },
  {
    id: 'notif-4',
    type: 'verification_update',
    title: 'Business Verification Confirmed',
    message: 'Your registration documents for Apex Green Logistics have been audited and verified by platform compliance.',
    timestamp: '1 day ago',
    read: true,
    targetView: 'profile'
  }
];

export const INITIAL_ADMIN_QUEUE: AdminQueueItem[] = [
  {
    id: 'queue-1',
    type: 'business_verification',
    entityName: 'Apex Green Logistics Ltd.',
    submittedBy: 'Rajesh Sharma',
    date: '2026-10-02',
    status: 'approved',
    riskScore: 'Low',
    documents: ['Incorporation_Certificate_MCA.pdf', 'GSTIN_Registration_Active.pdf', 'ISO_14001_Audit.pdf'],
    notes: 'MCA record cross-verified. Director DIN status active with clean compliance history.'
  },
  {
    id: 'queue-2',
    type: 'investor_verification',
    entityName: 'Vikram Singhania (Singhania Capital)',
    submittedBy: 'Vikram Singhania',
    date: '2026-10-01',
    status: 'approved',
    riskScore: 'Low',
    documents: ['Accredited_Angel_Status.pdf', 'Audited_Deal_Exits_Nava_Foods.pdf', 'SEBI_Registration_Declaration.pdf'],
    notes: 'Exits verified with independent statutory auditors. Reputation score upgraded to 842 (Level 4 Trusted).'
  },
  {
    id: 'queue-3',
    type: 'business_verification',
    entityName: 'Heritage Gourmet Supermarket',
    submittedBy: 'Marcus Sterling',
    date: '2026-10-03',
    status: 'approved',
    riskScore: 'Medium',
    documents: ['FSSAI_Central_License.pdf', 'Trade_License_PMC.pdf', 'Bank_Overdraft_Statement.pdf'],
    notes: 'Physical stores inspected. Verified unencumbered assets of ₹45L in refrigeration infrastructure.'
  },
  {
    id: 'queue-4',
    type: 'flagged_content',
    entityName: 'Suspicious Guaranteed 40% Return Post',
    submittedBy: 'System AI Fraud Filter',
    date: '2026-10-04',
    status: 'pending',
    riskScore: 'High',
    documents: ['User_Post_Content_Dump.json'],
    notes: 'Automated filter flagged claim promising "Guaranteed 40% monthly returns on crypto mining farm". Action required: Auto-quarantined.'
  }
];
