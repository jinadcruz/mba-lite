# Product Requirements Document (PRD)

## MBA Lite — AI-Powered Micro-Learning MBA Tutor

| Field | Detail |
|---|---|
| **Document Version** | 2.0 |
| **Status** | Draft — Pending Eng & Design Review |
| **Author** | Senior Product Manager, AI Learning Products |
| **Last Updated** | March 24, 2026 |
| **Target Release** | Q3 2026 (MVP) |
| **Stakeholders** | Engineering, Design, Data Science, Content, Legal, Leadership |

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Problem Statement](#2-problem-statement)
3. [Target Users and Personas](#3-target-users-and-personas)
4. [Product Goals and Success Metrics](#4-product-goals-and-success-metrics)
5. [Key Features](#5-key-features)
6. [User Stories](#6-user-stories)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [User Experience and Design Principles](#9-user-experience-and-design-principles)
10. [Technical Architecture Considerations](#10-technical-architecture-considerations)
11. [Milestones and Product Roadmap](#11-milestones-and-product-roadmap)
12. [Risks and Mitigation Strategies](#12-risks-and-mitigation-strategies)
13. [Open Questions](#13-open-questions)
14. [Appendix A — Curriculum Map](#appendix-a--curriculum-map)
15. [Appendix B — Case Study Sources](#appendix-b--case-study-sources)
16. [Appendix C — AI Management Specialization Track](#appendix-c--ai-management-specialization-track)

---

## 1. Product Overview

### 1.1 Product Name

**MBA Lite** — "Your MBA, 15 Minutes a Day"

### 1.2 Product Description

MBA Lite is a lightweight, AI-powered micro-learning web application that delivers the core MBA curriculum through daily bite-sized lessons, real-world case studies, and adaptive AI tutoring — with a specialized focus on AI management, strategy, and governance. The application distills frameworks and concepts taught at Harvard Business School (HBS), Wharton, Stanford GSB, INSEAD, London Business School (LBS), and other top-tier global programs into an accessible, self-paced, browser-based experience designed for desktop and tablet use.

### 1.3 Core Concept

The product operates on three pillars:

**Structured Curriculum** — An eight-module core MBA curriculum covering finance, strategy, marketing, operations, organizational behavior, economics, entrepreneurship, and leadership — mapped directly to syllabi published by HBS, Wharton, Stanford GSB, INSEAD, LBS, Kellogg, and Booth.

**AI Management Specialization** — A deep-dive track focused exclusively on managing AI teams, AI product strategy, responsible AI governance, the economics of foundation models, human-AI collaboration, and AI-era competitive strategy.

**Daily Adaptive Lessons** — Every day the user receives a 10–15 minute lesson consisting of a concept explainer, a real-world case study drawn from companies and situations across six continents, an interactive knowledge check, and an AI tutor dialogue.

### 1.4 Problem It Solves

A traditional MBA costs $150K–$230K in tuition alone and requires 18–24 months of full-time commitment. Online MBA programs (e.g., Coursera MBAs, edX MicroMasters) reduce cost but still demand 20–30 hours per week and 12–36 months of enrollment. No existing product offers a compressed, AI-native, mobile-first distillation of the MBA curriculum with a specialization in AI management — the single most in-demand competency in modern business leadership.

---

## 2. Problem Statement

### 2.1 The User Problem

Working professionals, founders, and aspiring leaders want the strategic thinking, analytical frameworks, and leadership vocabulary of a top MBA — but they face three barriers:

- **Cost** — Full-time MBA programs at top 20 schools range from $150K to $230K. Online alternatives are cheaper but still run $20K–$75K.
- **Time** — Even part-time and online MBAs demand 15–30 hours per week for 18–36 months. Busy professionals cannot commit to this.
- **Relevance Gap** — Most MBA curricula have not been updated to reflect the AI transformation of business. Professionals need to understand AI strategy, AI product management, AI governance, and AI workforce transformation — and no MBA program provides this as an integrated core competency alongside traditional MBA disciplines.

### 2.2 Current Alternatives and Their Shortcomings

| Alternative | Cost | Time/Week | AI Focus | Adaptive AI Tutoring | Bite-Sized Lessons |
|---|---|---|---|---|---|
| Full-time MBA (HBS, Wharton) | $150K–$230K | 50+ hrs | Minimal | No | No |
| Online MBA (Coursera, edX) | $20K–$75K | 15–30 hrs | Limited electives | No | No |
| Executive Education (HBS Online, Wharton Exec) | $2K–$15K/course | 5–10 hrs | Some | No | Partial |
| YouTube / Free Content | Free | Variable | Scattered | No | Variable |
| Duolingo-style Learning Apps | $0–$15/mo | 10–20 min | None | No | Yes (but not MBA) |
| ChatGPT / AI Assistants | $0–$20/mo | Variable | General | Partial (no curriculum) | No |
| **MBA Lite (This Product)** | **$19.99/mo** | **10–15 min/day** | **Dedicated AI Mgmt Track** | **Yes — Adaptive AI Tutor** | **Yes** |

### 2.3 Why Existing Solutions Are Insufficient

**Online MBA platforms** (Coursera, edX, 2U) replicate the classroom lecture format digitally. They do not leverage AI for personalization, they lack bite-sized daily cadence, and they have minimal or outdated coverage of AI management.

**Executive education portals** (HBS Online, Emeritus, GetSmarter) offer high-quality individual courses but no integrated curriculum, no AI tutoring, and no daily learning habit.

**AI chatbots** (ChatGPT, Gemini, Copilot) can answer MBA questions on demand but lack structured curriculum, spaced repetition, case study pedagogy, and progress tracking. They are tools, not tutors.

**MBA Lite fills the gap** by combining structured curriculum + AI-native tutoring + daily micro-learning + dedicated AI management specialization in a single affordable product.

---

## 3. Target Users and Personas

### 3.1 Primary Users

- Working professionals (3–10 years experience) who want MBA-level business acumen without the cost or time commitment of a traditional MBA
- Tech professionals (engineers, PMs, data scientists) moving into management who need business and AI leadership skills
- Founders and early-stage entrepreneurs building AI-native companies

### 3.2 Secondary Users

- MBA students and recent graduates seeking supplementary learning and AI management depth
- Career changers transitioning from non-business backgrounds into business leadership
- Senior executives who want a condensed refresh on modern business strategy with AI integration

### 3.3 User Persona — "Priya Nair"

| Attribute | Detail |
|---|---|
| **Name** | Priya Nair |
| **Age** | 31 |
| **Location** | Bangalore, India |
| **Role** | Senior Software Engineer → transitioning to Engineering Manager |
| **Company** | Mid-stage fintech startup (Series B, 200 employees) |
| **Education** | B.Tech in Computer Science, IIT Bombay |
| **Income** | ₹38L/year (~$45K USD) |
| **MBA Status** | Considered ISB and IIM-A but cannot take 1–2 years off work |

**Motivations:**
Priya was recently promoted to lead a team of 12 engineers. She realizes she lacks frameworks for strategic thinking, financial modeling, and organizational leadership. Her CEO frequently references HBS case studies and expects managers to "think like business leaders, not just coders." She also needs to understand AI product strategy because her company is integrating LLMs into its lending platform.

**Behaviors:**
She learns on her commute (45 min each way on Bangalore metro). She uses Duolingo daily for French and loves the streak/gamification model. She listens to podcasts (a]16z, HBR IdeaCast, Lex Fridman). She tried an HBS Online course but dropped off after week 3 due to time demands.

**Pain Points:**
- Cannot commit 10+ hrs/week to an MBA program
- Feels intimidated by finance and accounting concepts
- Wants case studies from Indian and Asian markets, not just US-centric examples
- Needs AI management knowledge specific to her product role

### 3.4 User Persona — "Marcus Thompson"

| Attribute | Detail |
|---|---|
| **Name** | Marcus Thompson |
| **Age** | 42 |
| **Location** | Atlanta, Georgia, USA |
| **Role** | VP of Operations at a regional healthcare system |
| **Company** | Multi-hospital health system, 5,000 employees |
| **Education** | MPH from Emory; no business degree |
| **Income** | $165K/year |
| **MBA Status** | Employer will not sponsor; too expensive out of pocket |

**Motivations:**
Marcus has risen through healthcare administration ranks on operational excellence, but his CEO and board increasingly expect him to lead AI-enabled operational transformation. He needs to understand AI strategy, vendor evaluation, ROI modeling for AI investments, and change management for AI adoption — alongside core MBA fundamentals like corporate finance and competitive strategy.

**Behaviors:**
He learns in 15-minute blocks during lunch and before bed. He prefers structured programs over open-ended content. He values certificates and proof of completion. He is not technical but is analytically sharp.

**Pain Points:**
- Feels "behind" peers who have MBAs from Emory Goizueta or Georgia Tech Scheller
- Needs healthcare-specific case studies alongside general business frameworks
- Wants to understand AI deeply enough to evaluate vendor claims and lead AI procurement
- Needs a clear learning path, not a buffet of unconnected courses

---

## 4. Product Goals and Success Metrics

### 4.1 Product Goals

| # | Goal | Description |
|---|---|---|
| G1 | **Democratize MBA Knowledge** | Make top-tier MBA education accessible to anyone for under $20/month |
| G2 | **Build the Daily Learning Habit** | Achieve Duolingo-like daily engagement (DAU/MAU > 0.40) |
| G3 | **Deliver AI Management Mastery** | Become the #1 resource for AI management education outside formal degree programs |
| G4 | **Prove Learning Outcomes** | Demonstrate measurable knowledge gains validated through pre/post assessments |
| G5 | **Achieve Product-Market Fit** | Reach 100K paying subscribers within 18 months of launch |

### 4.2 Success Metrics (KPIs)

#### Adoption Metrics

| Metric | MVP Target (Month 3) | Beta Target (Month 6) | Launch Target (Month 12) | Scale Target (Month 18) |
|---|---|---|---|---|
| Total Registered Users | 10,000 | 50,000 | 250,000 | 750,000 |
| Paying Subscribers | 1,000 | 8,000 | 50,000 | 100,000 |
| Free-to-Paid Conversion | 10% | 14% | 18% | 15%+ |
| App Store Rating | 4.2+ | 4.4+ | 4.6+ | 4.6+ |

#### Engagement Metrics

| Metric | Target |
|---|---|
| Daily Active Users / Monthly Active Users (DAU/MAU) | > 0.40 |
| Average Daily Session Length | 12–18 minutes |
| 7-Day Retention (D7) | > 55% |
| 30-Day Retention (D30) | > 35% |
| Lesson Completion Rate | > 80% |
| Streak Length (Median) | > 14 days |
| AI Tutor Conversations per User per Week | > 3 |

#### Learning Outcome Metrics

| Metric | Target |
|---|---|
| Pre/Post Module Knowledge Score Improvement | > 40% avg |
| Case Study Comprehension Score | > 75% avg |
| User Self-Reported Confidence Gain (NPS-style) | > 60 NPS |
| Certificate Completion Rate (Full Curriculum) | > 15% of subscribers |

#### Business Impact Metrics

| Metric | Target (Month 18) |
|---|---|
| Monthly Recurring Revenue (MRR) | $2M |
| Customer Acquisition Cost (CAC) | < $25 |
| Lifetime Value (LTV) | > $180 |
| LTV:CAC Ratio | > 7:1 |
| Churn Rate (Monthly) | < 5% |
| Net Revenue Retention | > 105% |

---

## 5. Key Features

### Feature 1: Structured Core MBA Curriculum

**Description:**
Eight comprehensive modules covering the core MBA body of knowledge, organized into a sequential learning path with clear prerequisites and progression. Content is sourced from and aligned with published syllabi, reading lists, and pedagogical approaches from HBS, Wharton, Stanford GSB, INSEAD, LBS, and other top programs.

**Modules:**
1. Financial Accounting & Reporting
2. Corporate Finance & Valuation
3. Marketing Strategy & Consumer Behavior
4. Operations Management & Supply Chain
5. Organizational Behavior & Leadership
6. Microeconomics & Macroeconomics for Managers
7. Corporate Strategy & Competitive Advantage
8. Entrepreneurship & Innovation

**User Value:**
Users gain the foundational business knowledge equivalent to the first year of a top MBA program, structured in a coherent learning path rather than disconnected courses.

**Acceptance Criteria:**
- Each module contains 20–30 daily lessons (10–15 minutes each)
- Each lesson includes a concept explainer (text + diagrams), a case study reference, a 5-question knowledge check, and an AI tutor prompt
- Module prerequisites are enforced (e.g., Financial Accounting before Corporate Finance)
- Content is reviewed and validated by at least two subject matter experts with MBA teaching or industry experience
- Users can view a syllabus map showing alignment with HBS, Wharton, and Stanford GSB course equivalents

---

### Feature 2: AI Management Specialization Track

**Description:**
A dedicated nine-module deep-dive track covering the business, strategic, operational, and ethical dimensions of managing AI in organizations. This is not a technical AI/ML course — it is a management course for leaders who must make decisions about AI strategy, investment, talent, governance, and organizational change.

**Modules:**
1. AI Strategy & Competitive Dynamics — How AI reshapes industry structure (Porter's Five Forces in an AI world)
2. AI Product Management — Building, launching, and iterating AI-powered products
3. Economics of Foundation Models — Cost structures, build-vs-buy, open-source vs proprietary
4. Managing AI Teams — Recruiting, structuring, and leading ML/AI engineering teams
5. AI Governance & Responsible AI — Frameworks for bias, fairness, transparency, and accountability
6. AI Procurement & Vendor Evaluation — Evaluating AI vendors, negotiating contracts, assessing technical claims
7. AI-Driven Organizational Transformation — Change management for AI adoption
8. Human-AI Collaboration — Designing workflows where humans and AI work together
9. AI Regulation & Policy — Global regulatory landscape (EU AI Act, NIST AI RMF, etc.)

**User Value:**
Users build a comprehensive understanding of AI management that no other MBA program provides as an integrated specialization. They leave able to lead AI initiatives, evaluate AI investments, and govern AI systems responsibly.

**Acceptance Criteria:**
- Each module contains 15–25 daily lessons
- Every lesson includes at least one real-world case study from a global company
- Case studies span geographies: US, EU, India, China, Southeast Asia, Africa, Latin America, Middle East
- AI Management track can be taken standalone or alongside the core curriculum
- Content is updated quarterly to reflect the rapidly evolving AI landscape
- Each module ends with a capstone scenario simulation

---

### Feature 3: Daily Bite-Sized Lessons with Case Studies

**Description:**
Each day, the app delivers a structured lesson consisting of four components:

1. **Concept Explainer (4–5 min)** — Clear, jargon-free explanation of one business concept with diagrams, formulas (where relevant), and analogies
2. **Real-World Case Study (4–5 min)** — A condensed 500–800 word case study based on real companies and real decisions, drawn from sources including HBS cases, publicly available business reporting, and original research. Cases are drawn from all six inhabited continents.
3. **Knowledge Check (2–3 min)** — Five multiple-choice or scenario-based questions that test comprehension and application
4. **AI Tutor Dialogue (2–3 min)** — A conversational AI session where the user can ask questions, request deeper explanations, or explore "what-if" scenarios related to the day's lesson

**Example Case Studies (Globally Diverse):**
- **HBS Classic** — How Netflix pivoted from DVDs to streaming (Disruption Theory)
- **India** — Jio's zero-price entry strategy and the economics of platform markets
- **Africa** — M-Pesa's mobile money revolution in Kenya (Financial Inclusion & Operations)
- **China** — ByteDance's recommendation algorithm as competitive moat (AI Strategy)
- **Europe** — Spotify's squad model for agile organizational design (Org Behavior)
- **Latin America** — Nubank's AI-powered credit scoring in Brazil (AI Product Management)
- **Southeast Asia** — Grab vs. GoTo — superapp strategy in Indonesia (Corporate Strategy)
- **Middle East** — UAE's national AI strategy and NEOM (AI Governance & Policy)
- **Japan** — Toyota Production System and its modern AI-augmented evolution (Operations)
- **Australia** — Atlassian's remote-first transformation (Leadership & Culture)

**User Value:**
Users build a daily learning habit while gaining exposure to diverse, global business cases — not just Silicon Valley examples. This mirrors the case method pedagogy pioneered by HBS but compressed into a micro-learning format.

**Acceptance Criteria:**
- Daily lesson is delivered at the user's preferred time via push notification
- Lesson total time is 10–15 minutes
- Case studies cite real companies, real data, and real decisions
- At least 40% of case studies feature non-US companies
- Knowledge check provides immediate feedback with explanations
- Lessons adapt to user's pace: if a user is struggling, the AI tutor provides additional scaffolding

---

### Feature 4: Adaptive AI Tutor

**Description:**
A conversational AI tutor powered by a large language model (LLM), fine-tuned on MBA pedagogy, case study methodology, and Socratic questioning. The tutor serves three roles:

1. **Lesson Companion** — Answers questions about the current lesson's concept and case study
2. **Socratic Challenger** — Asks probing questions to deepen understanding ("What would you do differently if you were the CEO?", "How does this framework apply to your own company?")
3. **On-Demand MBA Advisor** — Available anytime for freeform MBA-related questions (e.g., "Explain the Modigliani-Miller theorem in simple terms", "How should I think about customer acquisition cost for a B2B SaaS startup?")

**User Value:**
Users get a private, judgment-free, always-available MBA professor who adapts to their level, remembers their progress, and provides personalized guidance — something even $200K MBA programs cannot offer at scale.

**Acceptance Criteria:**
- AI tutor responds within 2 seconds for 95% of queries
- Tutor has full context of the user's current lesson, module, and progress history
- Tutor uses Socratic method by default: asks questions before giving answers
- Tutor can reference and explain any HBS, Wharton, or Stanford GSB framework in the curriculum
- Tutor flags when a question is outside its domain and suggests resources
- Conversation history is persisted and searchable
- Tutor adapts difficulty based on user's knowledge check scores

---

### Feature 5: Spaced Repetition & Knowledge Retention System

**Description:**
A spaced repetition system (SRS) modeled on evidence-based learning science (Ebbinghaus forgetting curve, Leitner system) that resurfaces previously learned concepts at optimal intervals to maximize long-term retention.

**User Value:**
Users retain what they learn rather than forgetting it within weeks. This is the single biggest failure mode of online learning — MBA Lite solves it with proven cognitive science.

**Acceptance Criteria:**
- System generates review cards automatically from completed lessons
- Review intervals follow a modified SM-2 algorithm
- Users receive 3–5 review questions per day (in addition to new lesson content)
- Users can rate their recall confidence (Easy / Medium / Hard) to adjust intervals
- Dashboard shows retention score per module

---

### Feature 6: Progress Tracking, Streaks, & Certificates

**Description:**
A comprehensive progress system including visual curriculum progress, daily streaks, module completion badges, and a verifiable certificate upon completing the full curriculum or the AI Management specialization.

**User Value:**
Users see tangible proof of their progress, stay motivated through gamification, and earn a credential they can share on LinkedIn and with employers.

**Acceptance Criteria:**
- Visual progress bar per module and overall curriculum
- Daily streak counter with streak freeze option (1 per week)
- Badge earned upon completing each module
- Certificate of completion (PDF + shareable LinkedIn credential) upon completing core curriculum or AI Management specialization
- Leaderboard (opt-in) for community motivation

---

### Feature 7: Global Case Study Library

**Description:**
A searchable, tagged library of 500+ condensed case studies organized by topic, geography, industry, company, and MBA framework. Users can browse beyond their daily lesson to explore cases relevant to their industry or interests.

**User Value:**
Users gain access to a curated, globally diverse case study library that mirrors and extends the HBS case method — without paying $10–$15 per case through HBS Publishing.

**Acceptance Criteria:**
- Library contains 500+ cases at launch, growing by 20+ per month
- Each case is tagged with: topic, framework, geography, industry, company, difficulty level
- Full-text search across all cases
- Users can bookmark and annotate cases
- Cases are original condensed analyses (not reproductions of HBS cases — see Legal section)
- Each case includes discussion questions and a "What actually happened" epilogue

---

## 6. User Stories

### Core Curriculum

- As a **working professional**, I want to follow a structured MBA curriculum so that I gain the same foundational knowledge as top MBA graduates.
- As a **non-finance professional**, I want financial concepts explained in plain language with worked examples so that I can understand P&L statements, DCF models, and valuation fundamentals.
- As a **user completing a module**, I want to earn a badge and see my overall progress so that I feel motivated to continue.

### AI Management Specialization

- As a **tech manager**, I want to learn how to evaluate AI vendor claims so that I can make informed procurement decisions for my organization.
- As a **product leader**, I want to understand the economics of foundation models (build vs. buy, open-source vs. proprietary) so that I can make strategic product decisions.
- As a **senior leader**, I want to learn AI governance frameworks so that I can implement responsible AI practices in my company.
- As an **aspiring AI PM**, I want to study how companies like ByteDance, Nubank, and Spotify use AI as a competitive moat so that I can apply these strategies in my own work.

### Daily Lessons & Case Studies

- As a **daily learner**, I want to receive a push notification at my preferred time with today's lesson so that I can build a consistent learning habit.
- As a **user in India**, I want case studies about Indian companies (Jio, Tata, Infosys, Zerodha) so that I can relate concepts to my own market context.
- As a **user in Africa**, I want case studies about African companies (M-Pesa, Flutterwave, Jumia) so that I see frameworks applied to emerging markets.
- As a **busy professional**, I want each lesson to take no more than 15 minutes so that I can learn during my commute or lunch break.

### AI Tutor

- As a **learner struggling with a concept**, I want to ask the AI tutor follow-up questions so that I can get a personalized explanation at my level.
- As a **user studying a case study**, I want the AI tutor to challenge me with "what would you do?" questions so that I develop strategic thinking skills, not just memorize facts.
- As a **user with a real-world question**, I want to ask the AI tutor how an MBA framework applies to my current work situation so that I can immediately apply what I learn.

### Retention & Progress

- As a **returning user**, I want the app to resurface concepts I learned last week with spaced repetition flashcards so that I retain knowledge long-term.
- As a **user who completed the full curriculum**, I want to download a verifiable certificate so that I can share it on LinkedIn and with my employer.
- As a **competitive learner**, I want to see my streak count and compare my progress with a community leaderboard so that I stay accountable.

---

## 7. Functional Requirements

### 7.1 Content Management System

| ID | Requirement |
|---|---|
| FR-01 | System shall support creation, editing, versioning, and scheduling of lesson content (concept explainers, case studies, knowledge checks) via an internal CMS |
| FR-02 | System shall support rich content: formatted text, LaTeX formulas, diagrams (SVG/PNG), embedded charts, and code snippets |
| FR-03 | System shall support tagging content with metadata: module, topic, geography, industry, company, MBA framework, difficulty |
| FR-04 | System shall support quarterly content refresh cycles for the AI Management specialization |

### 7.2 Learning Engine

| ID | Requirement |
|---|---|
| FR-05 | System shall deliver one new lesson per day per user, sequenced according to their curriculum path and prerequisites |
| FR-06 | System shall enforce module prerequisites (e.g., user must complete Financial Accounting before starting Corporate Finance) |
| FR-07 | System shall implement spaced repetition (modified SM-2) for previously completed content |
| FR-08 | System shall generate 5-question knowledge checks per lesson with immediate scoring and explanations |
| FR-09 | System shall adjust lesson difficulty based on rolling 10-lesson performance |

### 7.3 AI Tutor

| ID | Requirement |
|---|---|
| FR-10 | System shall provide a conversational AI tutor accessible from any lesson or as a standalone feature |
| FR-11 | AI tutor shall have full context of the user's current lesson, module progress, and historical performance |
| FR-12 | AI tutor shall default to Socratic questioning: ask the user a probing question before providing a direct answer |
| FR-13 | AI tutor shall support text input; voice input is a P1 stretch goal |
| FR-14 | AI tutor shall cite specific frameworks, case studies, and concepts from the curriculum when responding |
| FR-15 | AI tutor conversations shall be persisted and searchable by the user |

### 7.4 User Management & Progress

| ID | Requirement |
|---|---|
| FR-16 | System shall support user registration via email, Google, and Apple sign-in |
| FR-17 | System shall track per-user progress: lessons completed, modules completed, knowledge check scores, streak count, review card performance |
| FR-18 | System shall display a visual curriculum map showing progress across all modules |
| FR-19 | System shall support daily streak tracking with one free streak freeze per week |
| FR-20 | System shall generate and deliver PDF certificates upon curriculum completion |

### 7.5 Case Study Library

| ID | Requirement |
|---|---|
| FR-21 | System shall maintain a searchable library of 500+ condensed case studies |
| FR-22 | System shall support full-text search, tag-based filtering, and bookmark/annotation |
| FR-23 | System shall surface recommended cases based on user's current module and interests |

### 7.6 Notifications & Engagement

| ID | Requirement |
|---|---|
| FR-24 | System shall send daily email reminders at user-configured time; optional browser push notifications for users who opt in |
| FR-25 | System shall send streak-at-risk email notifications (12 hours before streak break) |
| FR-26 | System shall send weekly progress summary emails |

### 7.7 Subscription & Payments

| ID | Requirement |
|---|---|
| FR-27 | System shall support a freemium model: 1 free module (Module 1: Financial Accounting) + 3 AI tutor conversations per day on free tier |
| FR-28 | System shall support monthly ($19.99/mo) and annual ($149.99/yr) subscription tiers via Stripe Checkout and Stripe Customer Portal |
| FR-29 | System shall support 7-day free trial for new subscribers |
| FR-30 | System shall support team/enterprise licensing (10+ seats) with admin dashboard |

---

## 8. Non-Functional Requirements

### 8.1 Performance

| ID | Requirement |
|---|---|
| NFR-01 | Page load time < 2 seconds on broadband (LCP) |
| NFR-02 | Lesson content renders in < 1 second (client-side transition) |
| NFR-03 | AI tutor response latency < 2 seconds (p95), streamed to client |
| NFR-04 | Knowledge check scoring is instantaneous (client-side) |
| NFR-05 | Web app shall support offline lesson reading via service worker (cache next 3 lessons) |

### 8.2 Scalability

| ID | Requirement |
|---|---|
| NFR-06 | System shall support 1M+ registered users and 100K+ concurrent users |
| NFR-07 | AI tutor infrastructure shall auto-scale to handle peak load (3x average) |
| NFR-08 | Content CDN shall serve lesson assets globally with < 200ms latency |

### 8.3 Security

| ID | Requirement |
|---|---|
| NFR-09 | All data in transit encrypted via TLS 1.3 |
| NFR-10 | All data at rest encrypted via AES-256 |
| NFR-11 | User authentication via OAuth 2.0 / OpenID Connect |
| NFR-12 | AI tutor conversations stored encrypted; user can delete at any time |
| NFR-13 | SOC 2 Type II compliance within 12 months of launch |
| NFR-14 | Annual penetration testing by third-party security firm |

### 8.4 Reliability

| ID | Requirement |
|---|---|
| NFR-15 | 99.9% uptime SLA (excludes planned maintenance) |
| NFR-16 | Automated failover for all critical services |
| NFR-17 | AI tutor fallback to cached responses if LLM provider is unavailable |
| NFR-18 | Daily automated backups with 30-day retention |

### 8.5 Compliance

| ID | Requirement |
|---|---|
| NFR-19 | GDPR compliance for EU users (data portability, right to deletion, consent management) |
| NFR-20 | CCPA compliance for California users |
| NFR-21 | COPPA: Minimum user age 16; no data collection from minors |
| NFR-22 | Accessibility: WCAG 2.1 AA compliance |

### 8.6 Accessibility

| ID | Requirement |
|---|---|
| NFR-23 | Full screen reader support (NVDA, JAWS, VoiceOver) |
| NFR-24 | Minimum contrast ratio 4.5:1 for text |
| NFR-25 | Full keyboard navigation support with visible focus indicators |
| NFR-26 | Responsive layout: desktop (1200px+), tablet (768px–1199px), with mobile-responsive fallback |
| NFR-27 | Closed captions for any future video content |

---

## 9. User Experience and Design Principles

### 9.1 Core UX Principles

**Clarity Over Cleverness** — Every screen should be immediately understandable. MBA concepts are complex enough; the UI must not add cognitive load.

**Progressive Disclosure** — Show the user what they need now; hide advanced options and settings behind deliberate navigation. Lesson screen shows the lesson. Settings are elsewhere.

**Respect the User's Time** — Every interaction should feel intentional and efficient. No unnecessary taps, no bloated onboarding, no surprise paywalls. The user committed 15 minutes; honor that commitment.

**Global By Default** — Design, content, and imagery should reflect the global user base. No US-centric assumptions in examples, currency, date formats, or cultural references.

**Celebration, Not Shame** — Progress is celebrated (streaks, badges, completions). Missed days are handled with grace ("Welcome back — let's pick up where you left off"), never guilt.

### 9.2 Navigation Architecture

The web app uses a persistent left sidebar navigation pattern with five primary sections:

1. **Dashboard** — Today's daily lesson, review cards, weekly activity, and upcoming lessons (default landing page)
2. **Curriculum** — Full curriculum map with module grid, progress indicators, and toggle between Core MBA and AI Management tracks
3. **Case Library** — Searchable case study library with geographic filters and framework tags
4. **AI Tutor** — Full-width AI tutor chat with a right-side context panel showing current lesson, key frameworks, and user performance
5. **Profile** — Progress stats, certificates, learning activity heatmap, and settings

The sidebar is always visible on desktop (240px width), providing persistent access to all sections. The main content area uses a max-width of 1200px with generous padding for readability.

### 9.3 Key User Workflows

**Workflow 1: Daily Lesson**
User opens the web app → lands on Dashboard → sees today's lesson card with module context bar → clicks "Start Lesson" → reads Concept Explainer in the main content area → reads inline Case Study → completes Knowledge Check (5 questions with immediate feedback) → enters AI Tutor dialogue → lesson marked complete → streak updated → Dashboard refreshes with completion celebration.

**Workflow 2: AI Tutor Session**
User clicks "AI Tutor" in sidebar → full-width chat interface loads with context panel on right → context panel shows current lesson, key frameworks, and user performance → user types question → receives Socratic response with streamed text → continues dialogue → can reference any framework listed in context panel.

**Workflow 3: Case Study Exploration**
User clicks "Case Library" in sidebar → browses a two-column grid of case study cards → filters by geography (India, Africa, China, etc.) or searches by company/framework → selects a case → reads the full condensed case in an expanded view → answers discussion questions → clicks "Discuss with Tutor" to enter AI Tutor with case context.

**Workflow 4: Spaced Repetition Review**
User opens the web app → Dashboard right sidebar shows "Daily Review" widget with pending review cards → user clicks card to flip and reveal answer → rates confidence (Hard / Medium / Hard) → SRS adjusts future intervals → review widget shows completion state.

### 9.4 Design Language

- **Typography:** Clean, high-readability sans-serif (Inter or equivalent) with generous line spacing
- **Color Palette:** Professional dark navy primary, warm accents for progress/celebration, high contrast for text
- **Illustrations:** Flat, modern illustrations for concept explainers; real photography for case studies (licensed stock or CC)
- **Data Visualization:** Clean charts and diagrams for financial/quantitative concepts using a consistent chart library

---

## 10. Technical Architecture Considerations

### 10.1 System Architecture

MBA Lite is designed as a modular, event-driven web architecture optimized for content delivery, AI inference, and desktop-first performance.

```
┌──────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                              │
│  ┌─────────────┐  ┌─────────────┐                            │
│  │   Next.js    │  │   Admin      │                           │
│  │   Web App    │  │   CMS (Web)  │                           │
│  └──────┬──────┘  └──────┬──────┘                            │
└─────────┼────────────────┼───────────────────────────────────┘
          │                │
          ▼                ▼
┌──────────────────────────────────────────────────────────────┐
│                     API GATEWAY (Kong / AWS API GW)           │
│  Rate Limiting │ Auth │ Routing │ Analytics │ Caching         │
└──────────────────────────┬───────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  User Service │  │ Content Svc  │  │  AI Tutor    │
│  (Auth, Prog  │  │ (Lessons,    │  │  Service     │
│   ress, Subs) │  │  Cases, SRS) │  │  (LLM Orch)  │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL   │  │  PostgreSQL  │  │  LLM API     │
│  (Users,Auth) │  │  + S3 (CDN)  │  │  (Claude /   │
│               │  │              │  │   GPT-4)     │
└──────────────┘  └──────────────┘  └──────────────┘
```

### 10.2 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Web App** | Next.js 14+ (React, App Router) | SSR for SEO, React Server Components for performance, built-in API routes, Vercel deployment |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS for rapid iteration; shadcn for accessible component primitives |
| **Admin CMS** | Next.js + TailwindCSS | Internal content management; reuses web app stack |
| **API Layer** | Next.js API Routes (simple) or Fastify (at scale) | Start with Next.js API routes for MVP; extract to Fastify if needed for performance |
| **Database** | PostgreSQL (via Supabase or AWS RDS) | Relational data (users, progress, subscriptions); JSONB for flexible content schemas |
| **ORM** | Prisma | Type-safe database access; auto-generated types; migration management |
| **Content Storage** | AWS S3 + CloudFront CDN | Global content delivery; versioned content assets |
| **AI Tutor** | Anthropic Claude API (primary) | Best reasoning quality for educational Socratic dialogue; function calling for curriculum context injection |
| **AI Tutor Fallback** | OpenAI GPT-4o | Redundancy; multi-provider strategy to avoid vendor lock-in |
| **Search** | Typesense or Meilisearch | Fast, typo-tolerant full-text search for case study library |
| **Spaced Repetition** | Custom engine (PostgreSQL + cron) | SM-2 variant; runs as background service |
| **Authentication** | NextAuth.js (Auth.js) | OAuth 2.0 (Google, Apple); email/password; built-in session management for Next.js |
| **Payments** | Stripe | Subscription management, checkout sessions, customer portal |
| **Email Notifications** | Resend + React Email | Transactional emails (streak reminders, weekly summaries, certificates) |
| **Analytics** | PostHog (self-hosted or cloud) | Product analytics; privacy-respecting; funnel + retention analysis |
| **Monitoring** | Sentry (errors) + Vercel Analytics (performance) | Full observability stack |
| **CI/CD** | GitHub Actions + Vercel | Automated testing, linting, preview deployments, production deployment |

### 10.3 AI Tutor Architecture (Detail)

The AI Tutor is the product's core differentiator. Its architecture requires careful design:

**Context Injection Pipeline:**
1. User sends message to AI Tutor
2. Backend retrieves user context: current lesson, module progress, last 10 knowledge check scores, conversation history (last 20 messages)
3. Backend retrieves lesson context: today's concept explainer (full text), today's case study (full text), relevant MBA frameworks
4. System prompt is constructed with: pedagogical instructions (Socratic method, difficulty adaptation), user context, lesson context, and guardrails (stay on-topic, no hallucinated frameworks, cite curriculum)
5. Full prompt sent to LLM API (Anthropic Claude, primary)
6. Response streamed back to client

**Prompt Engineering Priorities:**
- Tutor persona: Warm, intellectually rigorous, encouraging — modeled on the best HBS professors
- Socratic by default: Always ask a probing question before giving a direct answer
- Difficulty adaptation: If user's recent scores are below 60%, simplify language and provide more scaffolding
- Framework grounding: Always connect answers to specific named frameworks (Porter's Five Forces, SWOT, BCG Matrix, etc.)
- Hallucination prevention: Tutor must not invent case study facts; if unsure, say so

**Cost Management:**
- Claude Haiku for simple Q&A and review card generation (low-cost, high-volume)
- Claude Sonnet for standard tutoring conversations
- Claude Opus for complex scenario simulations and capstone exercises
- Prompt caching for repeated context (lesson content changes once per day per user)
- Token budget per user per day: ~15K input tokens, ~5K output tokens (average)

### 10.4 Data Models (Simplified)

**Core Entities:**
- `User` — id, email, name, timezone, subscription_tier, created_at
- `UserProgress` — user_id, module_id, lesson_id, status, score, completed_at
- `Module` — id, title, description, order, prerequisite_module_id, track (core | ai_mgmt)
- `Lesson` — id, module_id, order, title, concept_content, case_study_content, difficulty
- `KnowledgeCheck` — id, lesson_id, questions (JSONB), correct_answers
- `ReviewCard` — id, user_id, lesson_id, question, answer, next_review_at, interval, ease_factor
- `TutorConversation` — id, user_id, lesson_id (nullable), messages (JSONB), created_at
- `CaseStudy` — id, title, company, geography, industry, framework_tags, content, discussion_questions
- `Subscription` — id, user_id, stripe_id, plan, status, current_period_end
- `Certificate` — id, user_id, track, completed_at, verification_code, pdf_url

### 10.5 API Design (Key Endpoints)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/today` | Returns today's lesson + review cards for the authenticated user |
| GET | `/api/v1/modules` | Returns full curriculum map with user progress |
| GET | `/api/v1/modules/:id/lessons` | Returns lessons for a module |
| POST | `/api/v1/lessons/:id/complete` | Marks lesson complete, records score |
| POST | `/api/v1/tutor/message` | Sends a message to the AI tutor; returns streamed response |
| GET | `/api/v1/tutor/history` | Returns paginated tutor conversation history |
| GET | `/api/v1/library/search` | Full-text search over case study library |
| POST | `/api/v1/review/submit` | Submits review card response; updates SRS schedule |
| GET | `/api/v1/progress/stats` | Returns user's progress statistics |
| POST | `/api/v1/subscription/create` | Creates a new subscription (Stripe checkout) |

---

## 11. Milestones and Product Roadmap

### Phase 1: MVP (Months 1–3)

**Goal:** Validate core learning loop with real users.

| Milestone | Deliverable | Timeline |
|---|---|---|
| M1.1 | Content: Module 1 (Financial Accounting) — 25 lessons, 25 case studies, knowledge checks | Week 1–6 |
| M1.2 | Content: AI Management Module 1 (AI Strategy) — 20 lessons, 20 case studies | Week 1–6 |
| M1.3 | Engineering: Next.js web app with sidebar navigation, daily lesson flow, knowledge checks, progress tracking | Week 1–8 |
| M1.4 | Engineering: AI Tutor v1 — Claude API integration, basic context injection, lesson-scoped conversations with context panel | Week 4–10 |
| M1.5 | Engineering: User auth (NextAuth.js — email + Google), basic profile, streak tracking | Week 1–6 |
| M1.6 | Engineering: Dashboard with spaced repetition review widget, weekly activity chart, upcoming lessons | Week 6–10 |
| M1.7 | QA & Testing: Internal dogfooding, content review, AI tutor evaluation, cross-browser testing (Chrome, Safari, Firefox, Edge) | Week 10–12 |
| M1.8 | **MVP Launch** — Closed beta, 500 users (waitlist), free access | **Month 3** |

### Phase 2: Beta (Months 4–6)

**Goal:** Expand content, add monetization, validate retention.

| Milestone | Deliverable | Timeline |
|---|---|---|
| M2.1 | Content: Modules 2–4 (Corporate Finance, Marketing, Operations) — 75 lessons | Month 4–5 |
| M2.2 | Content: AI Management Modules 2–4 (AI PM, Foundation Models, Managing AI Teams) — 60 lessons | Month 4–5 |
| M2.3 | Engineering: Spaced repetition system (SRS) | Month 4 |
| M2.4 | Engineering: Subscription & payments (Stripe + Apple IAP + Google Play) | Month 4–5 |
| M2.5 | Engineering: Case study library (searchable, filterable) | Month 5 |
| M2.6 | Engineering: Email notifications (daily lesson reminder + streak alerts via Resend) | Month 4 |
| M2.7 | Engineering: AI Tutor v2 — full user context injection, difficulty adaptation, Socratic mode, context panel | Month 5–6 |
| M2.8 | **Public Beta** — Open access, freemium model live, public URL | **Month 6** |

### Phase 3: Full Launch (Months 7–12)

**Goal:** Complete curriculum, scale to 50K+ paying users.

| Milestone | Deliverable | Timeline |
|---|---|---|
| M3.1 | Content: Modules 5–8 (Org Behavior, Economics, Strategy, Entrepreneurship) — 100 lessons | Month 7–9 |
| M3.2 | Content: AI Management Modules 5–9 (Governance, Procurement, Transformation, Human-AI, Regulation) — 100 lessons | Month 7–10 |
| M3.3 | Content: Case study library reaches 500+ cases | Month 7–12 |
| M3.4 | Engineering: Certificates & LinkedIn integration | Month 8 |
| M3.5 | Engineering: Leaderboard (opt-in) | Month 9 |
| M3.6 | Engineering: Team/Enterprise licensing + admin dashboard | Month 10–12 |
| M3.7 | Engineering: Service worker for offline lesson caching | Month 9 |
| M3.8 | **Full Launch** — Press, marketing campaign, all content live | **Month 12** |

### Phase 4: Scale (Months 13–18)

**Goal:** 100K paying subscribers, international expansion, B2B.

| Milestone | Deliverable | Timeline |
|---|---|---|
| M4.1 | Localization: Hindi, Spanish, Portuguese, Mandarin, French | Month 13–15 |
| M4.2 | B2B partnerships: Corporate training / L&D integrations | Month 13–18 |
| M4.3 | Content: Industry specialization tracks (Healthcare, Fintech, E-commerce) | Month 14–18 |
| M4.4 | Engineering: Progressive Web App (PWA) for mobile install experience | Month 15–16 |
| M4.5 | Engineering: Voice-mode AI tutor (Web Speech API + streaming) | Month 15–17 |
| M4.6 | Engineering: Peer discussion forums per lesson | Month 16–18 |
| M4.7 | **Scale Target** — 100K paying subscribers, $2M MRR | **Month 18** |

---

## 12. Risks and Mitigation Strategies

### 12.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **LLM API outage or degradation** | Medium | High | Multi-provider strategy (Claude primary, GPT-4o fallback); cached responses for common queries; graceful degradation UI |
| **LLM hallucination in tutor** | High | Medium | Grounding prompts in curriculum content; retrieval-augmented generation (RAG) with case study database; human review of flagged conversations |
| **AI tutor cost overruns** | Medium | Medium | Tiered model routing (Haiku/Sonnet/Opus); token budgets per user; prompt caching; usage monitoring alerts |
| **Web performance on slow connections** | Low | Medium | Performance budget enforced in CI (Lighthouse score > 90); progressive loading; CDN for static assets; service worker caching |

### 12.2 Content Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **HBS/Wharton IP claims** | Medium | High | All case studies are original analyses based on publicly available information; no reproduction of copyrighted HBS cases; legal review of all content; clear disclaimers |
| **Content quality inconsistency** | Medium | Medium | Style guide + editorial review process; SME review for accuracy; user feedback loop per lesson |
| **Content staleness (AI Management track)** | High | Medium | Quarterly content refresh cycle; dedicated AI content editor; automated news monitoring for case study updates |

### 12.3 Market Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Established players enter micro-MBA space** | Medium | High | Move fast; build brand and community; network effects from AI tutor personalization (hard to replicate); focus on AI Management niche |
| **User willingness to pay for education apps** | Medium | High | Generous free tier to demonstrate value; 7-day trial; employer reimbursement program; ROI calculator for users |
| **Low awareness of AI management as a skill gap** | Low | Medium | Content marketing (LinkedIn, podcasts, blog); partnerships with tech companies' L&D teams |

### 12.4 Regulatory Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **GDPR/CCPA compliance gaps** | Low | High | Privacy-by-design architecture; DPO appointment; automated data deletion pipelines |
| **AI regulation affecting tutor feature** | Low | Medium | Monitor EU AI Act and US AI executive orders; AI tutor classified as limited risk (educational); maintain transparency about AI use |
| **Accreditation claims challenges** | Medium | Medium | Never claim MBA equivalence or accreditation; clear marketing language ("MBA-level knowledge", not "MBA degree"); legal review of all marketing |

### 12.5 Adoption Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **High churn after trial** | High | High | Optimize onboarding (personalization quiz, goal setting); daily engagement hooks (streaks, notifications); in-app surveys to understand drop-off |
| **Users perceive content as "too basic"** | Medium | Medium | Difficulty adaptation in AI tutor; advanced-mode toggle for experienced users; skip-ahead testing |
| **Low completion rate for full curriculum** | High | Medium | Celebrate micro-wins (per-lesson, per-module); modular certificates; social proof from completers |

---

## 13. Open Questions

| # | Question | Owner | Status | Target Date |
|---|---|---|---|---|
| OQ-1 | Should we partner with a specific business school for content validation and co-branding (e.g., HBS Online, Wharton Online)? What are the economics and IP implications? | Product + BD | Open | Month 1 |
| OQ-2 | What is the right AI tutor model tier strategy? Should all users get the same quality, or should premium users get more capable models? | Product + Eng | Open | Month 2 |
| OQ-3 | Should we offer a B2B / team plan from launch, or focus purely on B2C initially? | Product + GTM | Open | Month 3 |
| OQ-4 | What is the competitive response if Duolingo, Coursera, or LinkedIn Learning launches a similar micro-MBA product? | Product + Strategy | Open | Ongoing |
| OQ-5 | Should the AI Management track require core MBA modules as prerequisites, or be standalone? | Product + Content | Open | Month 1 |
| OQ-6 | How do we handle case studies about companies that fail or face PR crises after publication? (e.g., a featured company has a major scandal) | Content + Legal | Open | Month 2 |
| OQ-7 | Should we build voice mode for the AI tutor in MVP, or defer to Phase 4? | Product + Eng | Leaning Defer | Month 2 |
| OQ-8 | What is the right pricing for emerging markets (India, Southeast Asia, Africa) where $19.99/mo may be too high? | Product + GTM | Open | Month 4 |
| OQ-9 | Should certificates be blockchain-verifiable, or is a simple PDF + verification URL sufficient? | Eng + Product | Leaning Simple | Month 6 |
| OQ-10 | How do we measure and communicate learning outcomes credibly to employers and users? | Product + Data Science | Open | Month 6 |

---

## Appendix A — Curriculum Map

### Core MBA Curriculum (8 Modules, ~200 Lessons)

| Module | Lessons | HBS Equivalent | Wharton Equivalent | Stanford GSB Equivalent |
|---|---|---|---|---|
| 1. Financial Accounting & Reporting | 25 | FRC (Financial Reporting & Control) | ACCT 611 | ACCT 210 |
| 2. Corporate Finance & Valuation | 25 | Finance I & II | FNCE 601/602 | FINANCE 229 |
| 3. Marketing Strategy & Consumer Behavior | 25 | Marketing | MKTG 611 | MKTG 249 |
| 4. Operations Management & Supply Chain | 25 | TOM (Technology & Operations Mgmt) | OIDD 611 | OIT 262 |
| 5. Organizational Behavior & Leadership | 25 | LEAD (Leadership & Organizational Behavior) | MGMT 610 | OB 210 |
| 6. Microeconomics & Macroeconomics for Managers | 25 | Business, Government & Intl Economy | BEPP 611 | MGTECON 203 |
| 7. Corporate Strategy & Competitive Advantage | 30 | Strategy | MGMT 611 | STRAMGT 259 |
| 8. Entrepreneurship & Innovation | 20 | TEM (The Entrepreneurial Manager) | MGMT 801 | STRAMGT 354 |

### AI Management Specialization (9 Modules, ~180 Lessons)

| Module | Lessons | Key Frameworks |
|---|---|---|
| 1. AI Strategy & Competitive Dynamics | 20 | Porter's Five Forces (AI remix), AI Flywheel, Data Network Effects |
| 2. AI Product Management | 20 | AI Product Lifecycle, ML Pipeline Management, Experiment-Driven Development |
| 3. Economics of Foundation Models | 20 | Build vs Buy, Scaling Laws, Token Economics, Open Source vs Proprietary |
| 4. Managing AI Teams | 20 | ML Team Structures, Hiring Frameworks, Research vs Production Balance |
| 5. AI Governance & Responsible AI | 20 | NIST AI RMF, Model Cards, Fairness Metrics, Audit Frameworks |
| 6. AI Procurement & Vendor Evaluation | 15 | Vendor Scorecard, Technical Due Diligence, Contract Structures |
| 7. AI-Driven Organizational Transformation | 20 | Kotter's 8-Step (AI Edition), Change Readiness Assessment, AI Maturity Model |
| 8. Human-AI Collaboration | 20 | Centaur Model, Augmentation vs Automation, Workflow Redesign |
| 9. AI Regulation & Policy | 25 | EU AI Act, NIST AI RMF, China AI Regs, Sector-Specific (Healthcare, Finance) |

---

## Appendix B — Case Study Sources

MBA Lite case studies are **original condensed analyses** based on publicly available information. They are NOT reproductions of HBS Publishing cases or any other copyrighted case studies. Sources include:

- Company SEC filings, annual reports, and investor presentations
- Published interviews with executives (media, podcasts, conferences)
- Peer-reviewed academic research
- Reputable business journalism (Financial Times, The Economist, Bloomberg, Reuters, Wall Street Journal, Nikkei Asia, Economic Times, TechCrunch, The Information)
- Government and regulatory publications
- Industry reports from McKinsey, BCG, Bain, Deloitte, Gartner, and IDC
- Open-access academic case studies (MIT Sloan Management Review, IESE, IMD, Ivey)

**Geographical Distribution Target:**
| Region | Target % of Cases |
|---|---|
| North America | 30% |
| Europe | 20% |
| Asia-Pacific (India, China, SE Asia, Japan, Australia) | 25% |
| Africa | 10% |
| Latin America | 10% |
| Middle East | 5% |

---

## Appendix C — AI Management Specialization Track

### Detailed Topic Breakdown

**Module 1: AI Strategy & Competitive Dynamics**
Topics include: AI as a general-purpose technology, how AI reshapes Porter's Five Forces, data moats and network effects, AI-first vs. AI-augmented business models, platform dynamics in the AI era, case studies from Google, OpenAI/Anthropic, ByteDance, Baidu, and emerging AI-native startups.

**Module 2: AI Product Management**
Topics include: the AI product lifecycle (problem framing → data → model → deployment → monitoring → iteration), managing ML pipelines, A/B testing for AI features, user research for AI products, managing AI product teams, the role of the AI PM vs. traditional PM, case studies from Spotify recommendations, Netflix personalization, Uber pricing, and Canva Magic tools.

**Module 3: Economics of Foundation Models**
Topics include: training cost curves and scaling laws, inference cost optimization, build vs. fine-tune vs. prompt, open-source model economics (Llama, Mistral) vs. proprietary (Claude, GPT), GPU supply dynamics, the economics of model-as-a-service, case studies from Anthropic, OpenAI, Meta AI, Mistral, Cohere, and enterprise adopters.

**Module 4: Managing AI Teams**
Topics include: organizational structures for ML teams (centralized, embedded, hub-and-spoke), hiring ML engineers vs. researchers, managing the research-production gap, tooling and infrastructure decisions, career ladders for AI roles, diversity in AI teams, case studies from Google DeepMind, Spotify ML, LinkedIn AI, and Grab's data team.

**Module 5: AI Governance & Responsible AI**
Topics include: bias detection and mitigation, fairness metrics and tradeoffs, model interpretability and explainability, AI audit frameworks, responsible AI organizational structures (ethics boards, AI review committees), NIST AI RMF implementation, case studies from Microsoft, IBM, Hugging Face, and regulatory enforcement actions.

**Module 6: AI Procurement & Vendor Evaluation**
Topics include: evaluating AI vendor technical claims, benchmarking and red-teaming, total cost of ownership modeling, contract structures (per-token, per-seat, enterprise), data security and privacy evaluation, vendor lock-in risks, case studies from enterprise AI procurement (healthcare, financial services, government).

**Module 7: AI-Driven Organizational Transformation**
Topics include: AI maturity models, change management for AI adoption (Kotter's 8-Step adapted for AI), workforce reskilling strategies, overcoming organizational resistance, AI centers of excellence, measuring AI transformation ROI, case studies from JPMorgan, Siemens, Unilever, and the Government of Singapore.

**Module 8: Human-AI Collaboration**
Topics include: the centaur model (human + AI), augmentation vs. automation frameworks, workflow redesign for AI integration, trust calibration, human oversight design, collaborative intelligence, case studies from medicine (AI-assisted diagnosis), law (AI contract review), journalism (AI-assisted reporting), and creative industries (AI-augmented design).

**Module 9: AI Regulation & Policy**
Topics include: EU AI Act (risk classification, compliance requirements), NIST AI RMF, China's AI regulatory framework, sector-specific AI regulation (healthcare, autonomous vehicles, financial services), AI liability and intellectual property, global AI governance coordination, case studies from regulatory enforcement, compliance programs, and the politics of AI policy.

---

*End of PRD — MBA Lite v2.0*
