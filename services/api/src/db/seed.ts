#!/usr/bin/env tsx
/**
 * Seed initial content: modules, 3 sample lessons for Module 1, and 8 case studies.
 */
import getDb from './client.js';

async function seed() {
  const sql = getDb();
  console.info('Seeding MBA Lite initial content...');

  try {
    // ── Modules ──────────────────────────────────────────────────────────────
    await sql`
      INSERT INTO modules (id, title, description, icon, order_num, track, lessons_total)
      VALUES
        ('mod_fin_acct',       'Financial Accounting & Reporting',    'Master the language of business — balance sheets, income statements, and cash flow.', '📊', 1,  'core',          25),
        ('mod_corp_fin',       'Corporate Finance & Valuation',       'Learn DCF, WACC, capital structure, and how to value companies like a Wall Street analyst.', '💰', 2,  'core',          25),
        ('mod_marketing',      'Marketing Strategy',                  'From STP to brand equity — build strategies that win markets.', '📣', 3,  'core',          25),
        ('mod_operations',     'Operations Management',               'Supply chains, lean, process optimization, and the science of getting things done.', '⚙️', 4,  'core',          25),
        ('mod_org_behavior',   'Organizational Behavior & Leadership','How individuals, teams, and organizations work — and how great leaders shape them.', '🧠', 5,  'core',          25),
        ('mod_economics',      'Microeconomics & Macroeconomics',     'The economic forces that shape markets, pricing, and business strategy.', '📈', 6,  'core',          25),
        ('mod_strategy',       'Corporate Strategy',                  'Porter''s Five Forces, competitive advantage, M&A, and how to win in your industry.', '♟️', 7,  'core',          30),
        ('mod_entrepreneurship','Entrepreneurship & Innovation',      'From idea to scale — the frameworks and mindset of successful founders.', '🚀', 8,  'core',          20),
        ('mod_ai_strategy',    'AI Strategy & Competitive Dynamics',  'How AI reshapes industry structure and competitive advantage.', '🎯', 1,  'ai_management', 20),
        ('mod_ai_pm',          'AI Product Management',               'Build, launch, and iterate AI-powered products.', '🤖', 2,  'ai_management', 20),
        ('mod_foundation_models','Economics of Foundation Models',    'Build vs. buy, open-source vs. proprietary, token economics.', '⚡', 3,  'ai_management', 20),
        ('mod_ai_teams',       'Managing AI Teams',                   'Recruit, structure, and lead ML/AI engineering teams.', '👥', 4,  'ai_management', 20),
        ('mod_ai_governance',  'AI Governance & Responsible AI',      'Frameworks for bias, fairness, transparency, and accountability.', '🛡️', 5, 'ai_management', 20),
        ('mod_ai_procurement', 'AI Procurement & Vendor Evaluation',  'Evaluate AI vendors, negotiate contracts, assess technical claims.', '🔍', 6, 'ai_management', 15),
        ('mod_ai_transformation','AI Organizational Transformation',  'Change management for AI adoption.', '🔄', 7,  'ai_management', 20),
        ('mod_human_ai',       'Human-AI Collaboration',              'Design workflows where humans and AI work together effectively.', '🤝', 8,  'ai_management', 20),
        ('mod_ai_regulation',  'AI Regulation & Policy',              'Global regulatory landscape — EU AI Act, NIST AI RMF, and beyond.', '📜', 9,  'ai_management', 25)
      ON CONFLICT (id) DO NOTHING
    `;
    console.info('✓ Modules seeded');

    // Update prerequisites
    await sql`UPDATE modules SET prerequisite_module_id = 'mod_fin_acct' WHERE id = 'mod_corp_fin'`;
    await sql`UPDATE modules SET prerequisite_module_id = 'mod_corp_fin' WHERE id = 'mod_strategy'`;

    // ── Lessons (Module 1: Financial Accounting — first 3) ───────────────────
    const lessons = [
      {
        id: 'les_fin_001',
        moduleId: 'mod_fin_acct',
        orderNum: 1,
        title: 'The Language of Business: Introduction to Financial Accounting',
        difficulty: 'beginner',
        readTimeMinutes: 10,
        concept: {
          text: 'Financial accounting is the systematic recording, summarizing, and reporting of a company\'s financial transactions. It produces three key statements: the Income Statement (what you earned), the Balance Sheet (what you own and owe), and the Cash Flow Statement (how cash moved). These three documents tell the complete financial story of any business.',
          keyPoints: [
            'Income Statement: Revenue - Expenses = Net Income (measures profitability over a period)',
            'Balance Sheet: Assets = Liabilities + Equity (snapshot of financial position at a point in time)',
            'Cash Flow Statement: Operating + Investing + Financing cash flows (tracks actual cash movement)',
            'Accrual accounting records transactions when they occur, not when cash changes hands',
            'GAAP (Generally Accepted Accounting Principles) ensures consistency and comparability',
          ],
          formula: 'Assets = Liabilities + Shareholders\' Equity',
        },
        caseStudy: {
          title: 'How WeWork\'s Accounting Revealed a House of Cards',
          company: 'WeWork',
          geography: 'United States',
          flag: '🇺🇸',
          industry: 'Real Estate / Tech',
          content: 'In 2019, WeWork filed for an IPO with a rumored valuation of $47 billion. But when investors actually read the financial statements, the story fell apart. The income statement showed losses of $1.9 billion on revenue of $1.8 billion — losing more money than it made. The balance sheet revealed $47 billion in long-term lease obligations against only $4 billion in assets. WeWork had invented a non-GAAP metric called "Community Adjusted EBITDA" that excluded rent — the company\'s primary cost. The IPO was pulled. Adam Neumann was ousted. The valuation collapsed to under $3 billion.',
          discussionPrompt: 'If you were an investor reviewing WeWork\'s financials in 2019, which specific line items would have alarmed you first?',
        },
        knowledgeCheck: {
          questions: [
            {
              id: 'kc_fin_001_1',
              question: 'The accounting equation states that Assets equal:',
              options: [
                { label: 'A', text: 'Revenue minus Expenses', isCorrect: false, explanation: 'That\'s the formula for Net Income on the Income Statement.' },
                { label: 'B', text: 'Liabilities plus Shareholders\' Equity', isCorrect: true, explanation: 'Correct! Assets = Liabilities + Equity is the fundamental accounting equation. Every transaction must maintain this balance.' },
                { label: 'C', text: 'Cash plus Inventory plus Receivables', isCorrect: false, explanation: 'These are types of assets, not the equation itself.' },
                { label: 'D', text: 'Net Income plus Depreciation', isCorrect: false, explanation: 'That\'s closer to operating cash flow, not the accounting equation.' },
              ],
              correctExplanation: 'The accounting equation (Assets = Liabilities + Equity) is the foundation of double-entry bookkeeping. Every financial transaction affects at least two accounts while keeping this equation in balance.',
            },
          ],
        },
        tutorPrompt: 'The user just learned the three financial statements. Ask them: if they were CEO of a startup and could only look at ONE financial statement for 5 minutes, which would they choose and why?',
      },
      {
        id: 'les_fin_002',
        moduleId: 'mod_fin_acct',
        orderNum: 2,
        title: 'Reading the Income Statement',
        difficulty: 'beginner',
        readTimeMinutes: 12,
        concept: {
          text: 'The Income Statement (also called the P&L — Profit and Loss) shows a company\'s financial performance over a specific time period. It starts with Revenue (total sales), subtracts Cost of Goods Sold (COGS) to get Gross Profit, then deducts Operating Expenses (R&D, Sales, G&A) to reach EBIT (Earnings Before Interest and Taxes), then subtracts interest and taxes to reach Net Income — the "bottom line."',
          keyPoints: [
            'Revenue (top line): Total sales before any deductions',
            'Gross Profit = Revenue - COGS: How much is left after making/delivering the product',
            'Gross Margin % = Gross Profit / Revenue: Higher is better; software companies often exceed 70%',
            'EBITDA: Earnings Before Interest, Taxes, Depreciation, and Amortization — widely used proxy for operating cash flow',
            'Net Income (bottom line): What\'s left for shareholders after all expenses',
          ],
          formula: 'Net Income = Revenue - COGS - OpEx - Interest - Taxes',
        },
        caseStudy: {
          title: 'Spotify\'s Gross Margin Problem: Why Music Streaming is Hard',
          company: 'Spotify',
          geography: 'Sweden',
          flag: '🇸🇪',
          industry: 'Music Streaming / Tech',
          content: 'Spotify has over 600 million users and €13 billion in annual revenue — yet it barely breaks even. The culprit is its income statement. Spotify pays 70% of every dollar in revenue to music labels and publishers as royalties (COGS). That leaves a gross margin of only ~27% — far lower than software companies like Microsoft (67%) or SaaS peers like Salesforce (73%). After operating expenses (product, R&D, marketing), Spotify\'s EBIT margin has historically hovered near zero. Understanding why requires reading not just the revenue line, but the structure of the cost base. Spotify\'s bet: that podcasts, audiobooks, and new content formats will gradually improve its gross margin as non-music revenue grows.',
          discussionPrompt: 'Spotify\'s gross margin is constrained by label royalties. What strategic moves could Spotify make to improve its income statement structure?',
        },
        knowledgeCheck: {
          questions: [
            {
              id: 'kc_fin_002_1',
              question: 'A company has revenue of $10M, COGS of $6M, and operating expenses of $3M. What is its EBIT?',
              options: [
                { label: 'A', text: '$1M', isCorrect: true, explanation: 'Correct! Gross Profit = $10M - $6M = $4M. EBIT = $4M - $3M = $1M.' },
                { label: 'B', text: '$4M', isCorrect: false, explanation: 'That\'s Gross Profit — you still need to subtract operating expenses.' },
                { label: 'C', text: '$7M', isCorrect: false, explanation: 'This subtracts only COGS from revenue but ignores operating expenses.' },
                { label: 'D', text: '$3M', isCorrect: false, explanation: 'Check the math: $10M - $6M - $3M = $1M.' },
              ],
              correctExplanation: 'EBIT = Revenue - COGS - Operating Expenses = $10M - $6M - $3M = $1M. This is a critical calculation every manager should be able to do quickly.',
            },
          ],
        },
        tutorPrompt: 'The user learned about income statement structure and Spotify\'s margin challenge. Ask them: what gross margin % would they expect for a SaaS company vs. a restaurant, and why might they differ so dramatically?',
      },
      {
        id: 'les_fin_003',
        moduleId: 'mod_fin_acct',
        orderNum: 3,
        title: 'Decoding the Balance Sheet',
        difficulty: 'intermediate',
        readTimeMinutes: 12,
        concept: {
          text: 'The Balance Sheet is a snapshot of what a company owns (assets), what it owes (liabilities), and what belongs to shareholders (equity) at a specific moment in time. Assets are split into Current (liquid within 12 months: cash, receivables, inventory) and Non-Current (long-term: PP&E, intangibles). Liabilities are split similarly. Equity is what\'s left for shareholders: paid-in capital plus retained earnings.',
          keyPoints: [
            'Current Assets: Cash, accounts receivable, inventory — convertible within 12 months',
            'Non-Current Assets: Property/Plant/Equipment (PP&E), intangible assets, long-term investments',
            'Current Liabilities: Accounts payable, short-term debt, deferred revenue — due within 12 months',
            'Working Capital = Current Assets - Current Liabilities: Measures short-term liquidity',
            'Retained Earnings: Accumulated net income not paid as dividends — funds future growth',
          ],
          formula: 'Working Capital = Current Assets - Current Liabilities',
        },
        caseStudy: {
          title: 'Reliance Jio\'s Balance Sheet Built for Disruption',
          company: 'Reliance Jio',
          geography: 'India',
          flag: '🇮🇳',
          industry: 'Telecommunications',
          content: 'When Mukesh Ambani launched Jio in 2016, he made a deliberate balance sheet decision that his competitors missed. Reliance Industries invested ₹2.5 lakh crore ($30B+) in building 4G LTE infrastructure — creating a massive non-current asset base. This capital intensity looked alarming on the balance sheet: enormous debt, negative free cash flow, and losses for two years. But the strategy was rational: Jio offered free voice and data for 6 months, acquiring 100 million subscribers in 170 days. With a paid-off network and 400M+ subscribers, the asset base became a moat. Competitors like Aircel and Tata Docomo went bankrupt. Jio\'s balance sheet bet — build now, monetize at scale — transformed India\'s telecom market and Reliance\'s entire valuation.',
          discussionPrompt: 'Jio deliberately accepted a weak balance sheet in the short term to win long-term. When is it rational for a company to stress its balance sheet to gain competitive advantage?',
        },
        knowledgeCheck: {
          questions: [
            {
              id: 'kc_fin_003_1',
              question: 'A company has current assets of $5M and current liabilities of $3M. Its working capital is:',
              options: [
                { label: 'A', text: '$8M', isCorrect: false, explanation: 'That\'s current assets + current liabilities, not the difference.' },
                { label: 'B', text: '$2M', isCorrect: true, explanation: 'Correct! Working Capital = $5M - $3M = $2M. Positive working capital means the company can cover its short-term obligations.' },
                { label: 'C', text: '-$2M', isCorrect: false, explanation: 'Negative working capital would mean liabilities exceed assets. Here assets ($5M) exceed liabilities ($3M).' },
                { label: 'D', text: '$15M', isCorrect: false, explanation: 'This isn\'t working capital — check the formula: Current Assets minus Current Liabilities.' },
              ],
              correctExplanation: 'Working Capital = Current Assets - Current Liabilities = $5M - $3M = $2M. A positive number means the company has enough liquid assets to cover its near-term obligations. Negative working capital can signal liquidity risk.',
            },
          ],
        },
        tutorPrompt: 'The user studied balance sheets and Jio\'s strategic capital deployment. Ask them: if they were the CFO of a startup considering a massive infrastructure investment, what balance sheet ratios would they monitor to ensure the company doesn\'t run out of cash?',
      },
    ];

    for (const lesson of lessons) {
      await sql`
        INSERT INTO lessons (
          id, module_id, order_num, title, concept_content,
          case_study_content, knowledge_check, tutor_prompt,
          difficulty, read_time_minutes
        ) VALUES (
          ${lesson.id},
          ${lesson.moduleId},
          ${lesson.orderNum},
          ${lesson.title},
          ${JSON.stringify(lesson.concept)},
          ${JSON.stringify(lesson.caseStudy)},
          ${JSON.stringify(lesson.knowledgeCheck)},
          ${lesson.tutorPrompt},
          ${lesson.difficulty},
          ${lesson.readTimeMinutes}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }
    console.info('✓ Lessons seeded (3 lessons for Module 1)');

    // ── Case Studies ─────────────────────────────────────────────────────────
    const caseStudies = [
      {
        id: 'cs_jio_disruption',
        title: "Jio's Zero-Price Disruption",
        company: 'Reliance Jio',
        geography: 'India',
        flag: '🇮🇳',
        industry: 'Telecom',
        frameworkTags: ['Disruptive Innovation', 'Platform Strategy', 'Financial Accounting'],
        difficulty: 'intermediate',
        snippet: 'How Mukesh Ambani disrupted India\'s telecom market by spending $30B upfront and offering free services for 6 months.',
        content: 'Reliance Jio\'s 2016 launch is one of the most dramatic market disruptions of the decade. By investing ₹2.5 lakh crore in 4G infrastructure and pricing at zero, Jio acquired 100 million subscribers in 170 days — the fastest in telecom history. Within 3 years, Indian data prices fell 95% and competitors like Aircel and Tata Docomo shut down. The strategy required Reliance to absorb massive losses on the income statement while building the asset base on the balance sheet that would become an insurmountable moat.',
        discussionQuestions: ['What financial metrics would you have used to evaluate Jio\'s investment before launch?', 'How did Jio\'s balance sheet strategy differ from typical startup growth strategies?'],
        sources: ['Reliance Industries Annual Report 2017-2020', 'TRAI subscriber data', 'Financial Times coverage of Indian telecom sector'],
      },
      {
        id: 'cs_mpesa_kenya',
        title: 'M-Pesa: Mobile Money Revolution',
        company: 'Safaricom',
        geography: 'Kenya',
        flag: '🇰🇪',
        industry: 'Fintech',
        frameworkTags: ['Financial Inclusion', 'Platform Strategy', 'Operations'],
        difficulty: 'beginner',
        snippet: 'How a Kenyan telecom built the world\'s most successful mobile money platform by solving a basic infrastructure problem.',
        content: 'Launched in 2007, M-Pesa (M for mobile, pesa is Swahili for money) solved a problem specific to Kenya: most people had no bank accounts but did have mobile phones. Safaricom turned its airtime agent network into a money transfer network. Today M-Pesa processes 61% of Kenya\'s GDP in transactions annually. The operations insight: Safaricom didn\'t need to build banks — it converted existing infrastructure (airtime agents) into financial infrastructure. M-Pesa has since expanded to 7 African countries and handled $314B in transactions in 2023.',
        discussionQuestions: ['What existing infrastructure in your industry could be repurposed to create a new service?', 'Why did M-Pesa succeed in Kenya when similar products failed in other markets?'],
        sources: ['Safaricom Annual Report 2023', 'Gates Foundation financial inclusion research', 'GSMA Mobile Money report'],
      },
      {
        id: 'cs_bytedance_moat',
        title: "ByteDance's Recommendation Moat",
        company: 'ByteDance',
        geography: 'China',
        flag: '🇨🇳',
        industry: 'Tech',
        frameworkTags: ['AI Strategy', 'Competitive Dynamics', 'Data Network Effects'],
        difficulty: 'advanced',
        snippet: "How ByteDance built an AI recommendation engine that creates a self-reinforcing competitive moat no competitor has been able to replicate.",
        content: "ByteDance's core strategic asset is not TikTok's content or creators — it's the recommendation algorithm trained on 1.5 billion users' behavioral data. Unlike traditional social networks where content is distributed by social graph (your friends), TikTok surfaces content based purely on predicted engagement, regardless of follower count. This creates a data flywheel: more users → more behavioral data → better recommendations → more engagement → more users. The moat is not the algorithm code (which could be copied) but the 8+ years of behavioral training data that no competitor can replicate. Meta spent $10B+ trying to clone it with Reels.",
        discussionQuestions: ['What is the difference between an algorithmic moat and a data moat?', 'How would you measure the economic value of ByteDance\'s training data?'],
        sources: ['ByteDance investor documents', 'Meta Q3 2023 earnings call', 'Andreessen Horowitz AI analysis'],
      },
      {
        id: 'cs_spotify_squad',
        title: "Spotify's Squad Model",
        company: 'Spotify',
        geography: 'Sweden',
        flag: '🇸🇪',
        industry: 'Tech',
        frameworkTags: ['Org Design', 'Agile', 'Organizational Behavior'],
        difficulty: 'intermediate',
        snippet: 'How Spotify pioneered an autonomous team structure that influenced how hundreds of tech companies organize their engineering organizations.',
        content: "In 2012, Spotify published its now-famous engineering culture model built around Squads, Tribes, Chapters, and Guilds. Squads (6-12 people) are autonomous, cross-functional teams owning a specific product area. Tribes (up to 100 people) are collections of squads working in related areas. Chapters are skill communities (all iOS engineers across squads). Guilds are interest communities (anyone interested in GraphQL). The model aimed to give teams startup-like autonomy while maintaining coordination at scale. Ironically, Spotify later acknowledged the model never worked exactly as described — but the framework influenced engineering organization design at hundreds of companies from Amazon to ING Bank.",
        discussionQuestions: ['What organizational problems was the Squad model designed to solve?', 'When does organizational autonomy create problems rather than solve them?'],
        sources: ['Spotify Engineering Culture video (2014)', 'Henrik Kniberg blog posts', 'Aaron Dignan "Brave New Work"'],
      },
      {
        id: 'cs_nubank_credit',
        title: "Nubank's AI Credit Scoring",
        company: 'Nubank',
        geography: 'Brazil',
        flag: '🇧🇷',
        industry: 'Fintech',
        frameworkTags: ['AI Product Management', 'Credit Risk', 'Financial Inclusion'],
        difficulty: 'advanced',
        snippet: "How Brazil's largest digital bank built an AI credit model that serves the 'unbanked' by using alternative data where traditional credit bureaus have nothing.",
        content: "Nubank serves 90 million+ customers in Brazil, Mexico, and Colombia — many of whom have thin or no credit files with traditional bureaus like Serasa. Instead of rejecting these customers, Nubank built ML models using alternative data: transaction patterns, app usage behavior, geographic data, and social signals. The AI product challenge: how do you build a credit model with no historical data? Nubank's answer was to start with a tiny credit limit ($50 equivalent), gather behavioral data, and iteratively expand limits as the model gained confidence. Today Nubank has the lowest default rate among Brazilian banks despite serving higher-risk demographics. This is a case study in how AI product management can expand financial access profitably.",
        discussionQuestions: ['What are the ethical risks of using app usage behavior for credit decisions?', 'How would you design an A/B test to validate a new credit scoring feature?'],
        sources: ['Nubank IPO prospectus 2021', 'MIT Sloan fintech research', 'Central Bank of Brazil data'],
      },
      {
        id: 'cs_grab_gojek',
        title: 'Grab vs GoTo: Superapp War',
        company: 'Grab / GoTo',
        geography: 'Indonesia',
        flag: '🇮🇩',
        industry: 'Platform',
        frameworkTags: ['Platform Strategy', 'Corporate Strategy', 'Competitive Dynamics'],
        difficulty: 'intermediate',
        snippet: 'How Southeast Asia became the battleground for the superapp strategy — and what the winner-take-all dynamics of platform markets really look like.',
        content: "Grab (Singapore-founded) and GoTo (Gojek + Tokopedia merger, Indonesia) are both pursuing the superapp strategy: a single app integrating ride-hailing, food delivery, payments, financial services, and commerce. The strategic logic: payments is the hub (high frequency, high data) that enables cross-selling of everything else. The competitive dynamics are classically platform: multi-homing costs are low for individual services (you can use both Grab Food and GoFood) but high for the core payment/financial services layer. The company that wins payments wins the ecosystem. GoTo has the home-court advantage in Indonesia (world's 4th largest population); Grab has broader Southeast Asian reach. Neither is profitable at scale — the war continues.",
        discussionQuestions: ['What determines who wins a superapp platform war?', 'Why is payments the strategic hub of the superapp model?'],
        sources: ['Grab SPAC prospectus 2021', 'GoTo IPO prospectus 2022', 'Sequoia Southeast Asia reports'],
      },
      {
        id: 'cs_toyota_ai',
        title: 'Toyota Production System + AI',
        company: 'Toyota',
        geography: 'Japan',
        flag: '🇯🇵',
        industry: 'Automotive / Manufacturing',
        frameworkTags: ['Operations', 'AI Transformation', 'Lean Manufacturing'],
        difficulty: 'intermediate',
        snippet: 'How the company that invented lean manufacturing is now using AI to augment — not replace — its human-centered production philosophy.',
        content: "The Toyota Production System (TPS) — the foundation of Lean manufacturing — is built on two pillars: Just-in-Time (no inventory waste) and Jidoka (intelligent automation that stops when problems occur). Toyota's approach to AI is consistent with TPS philosophy: augmentation over replacement. Toyota's AI systems flag quality defects that human inspectors might miss, but the inspector makes the final call (Jidoka principle applied to AI). Toyota's Georgetown KY plant uses computer vision to detect 2,000+ weld defects in real-time, reducing defect escape rate by 70%. The lesson: AI is most effective when it amplifies existing systematic excellence rather than replacing it.",
        discussionQuestions: ['How does Toyota\'s approach to AI differ from companies that "automate everything"?', 'What organizational capabilities make Toyota\'s AI integration successful?'],
        sources: ['Toyota Annual Report 2023', 'MIT Technology Review manufacturing AI coverage', 'Toyota Production System: Beyond Large-Scale Production (Ohno)'],
      },
      {
        id: 'cs_uae_ai_strategy',
        title: 'UAE National AI Strategy',
        company: 'UAE Government',
        geography: 'UAE',
        flag: '🇦🇪',
        industry: 'Government / Policy',
        frameworkTags: ['AI Governance', 'AI Policy', 'National Strategy'],
        difficulty: 'advanced',
        snippet: "How the UAE became the first country to appoint a Minister of AI and what a national AI strategy looks like in practice.",
        content: "In 2017, the UAE became the first country to appoint a Minister of Artificial Intelligence (Omar Al Olama) and launched UAE Vision 2031 AI Strategy. The government's thesis: oil revenues fund today, but AI productivity gains must fund tomorrow. The strategy has three pillars: AI talent (MBZUAI — Mohamed bin Zayed University of AI, offering full scholarships), AI infrastructure (G42, an AI national champion built to international scale), and AI adoption in government (AI-first public services, 50% of government work automated by 2031). G42's partnership with OpenAI, Microsoft, and development of Arabic LLMs (Jais) demonstrates how middle-income countries can build AI capability through partnerships rather than pure R&D investment. The UAE offers a governance model distinct from both EU (regulation-first) and US (market-first) approaches.",
        discussionQuestions: ['What are the trade-offs between the EU, US, and UAE approaches to AI governance?', 'How should a company evaluate market entry into a country with a national AI champion?'],
        sources: ['UAE Ministry of AI official strategy documents', 'G42 investor materials', 'MIT Technology Review UAE AI coverage', 'MBZUAI research papers'],
      },
    ];

    for (const cs of caseStudies) {
      await sql`
        INSERT INTO case_studies (
          id, title, company, geography, flag, industry,
          framework_tags, difficulty, snippet, content,
          discussion_questions, sources
        ) VALUES (
          ${cs.id}, ${cs.title}, ${cs.company}, ${cs.geography}, ${cs.flag},
          ${cs.industry}, ${cs.frameworkTags}, ${cs.difficulty}, ${cs.snippet},
          ${cs.content}, ${JSON.stringify(cs.discussionQuestions)}, ${JSON.stringify(cs.sources)}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }
    console.info('✓ Case studies seeded (8 global cases)');

    console.info('\n✅ Seed complete. Run `npm run dev` to start the API server.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();
