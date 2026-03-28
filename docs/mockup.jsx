import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ───────────────────────────────────────────
const T = {
  bg: "#09090B",
  bgSidebar: "#0C0C0F",
  bgCard: "#131316",
  bgCardHover: "#1A1A1F",
  bgSurface: "#18181B",
  bgInput: "#1C1C20",
  accent: "#F59E0B",
  accentGlow: "rgba(245,158,11,0.10)",
  accentBorder: "rgba(245,158,11,0.25)",
  green: "#22C55E",
  greenSoft: "rgba(34,197,94,0.10)",
  red: "#EF4444",
  blue: "#3B82F6",
  blueSoft: "rgba(59,130,246,0.10)",
  purple: "#A78BFA",
  purpleSoft: "rgba(167,139,250,0.10)",
  textPrimary: "#FAFAFA",
  textSecondary: "#A1A1AA",
  textMuted: "#71717A",
  border: "#27272A",
  borderLight: "#3F3F46",
};

const font = `'Instrument Sans', 'DM Sans', -apple-system, sans-serif`;
const fontMono = `'Berkeley Mono', 'JetBrains Mono', monospace`;
const fontSerif = `'Newsreader', 'Playfair Display', Georgia, serif`;

// ─── Icons ───────────────────────────────────────────────────
const I = {
  Home: (p) => <svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Book: (p) => <svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Grid: (p) => <svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Chat: (p) => <svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  User: (p) => <svg width={p?.s||20} height={p?.s||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Fire: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  Check: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Lock: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
  Sparkle: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Trophy: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
};

// ─── Progress Ring ───────────────────────────────────────────
const Ring = ({ pct, size = 44, stroke = 3.5, color = T.accent, label }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      {label && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color, fontFamily: fontMono }}>{label}</div>}
    </div>
  );
};

// ─── Counter ─────────────────────────────────────────────────
const Counter = ({ target, suffix = "" }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let f; const s = performance.now();
    const t = (n) => { const p = Math.min((n - s) / 1200, 1); setVal(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) f = requestAnimationFrame(t); };
    f = requestAnimationFrame(t); return () => cancelAnimationFrame(f);
  }, [target]);
  return <>{val}{suffix}</>;
};

// ─── Data ────────────────────────────────────────────────────
const coreModules = [
  { id: 1, title: "Financial Accounting & Reporting", icon: "📊", lessons: 25, done: 25, status: "complete", school: "HBS FRC" },
  { id: 2, title: "Corporate Finance & Valuation", icon: "💰", lessons: 25, done: 18, status: "active", school: "Wharton FNCE 601" },
  { id: 3, title: "Marketing Strategy", icon: "📣", lessons: 25, done: 0, status: "locked", school: "Kellogg MKTG" },
  { id: 4, title: "Operations Management", icon: "⚙️", lessons: 25, done: 0, status: "locked", school: "HBS TOM" },
  { id: 5, title: "Org Behavior & Leadership", icon: "🧠", lessons: 25, done: 0, status: "locked", school: "Stanford GSB OB" },
  { id: 6, title: "Micro & Macroeconomics", icon: "📈", lessons: 25, done: 0, status: "locked", school: "HBS BGIE" },
  { id: 7, title: "Corporate Strategy", icon: "♟️", lessons: 30, done: 0, status: "locked", school: "HBS Strategy" },
  { id: 8, title: "Entrepreneurship & Innovation", icon: "🚀", lessons: 20, done: 0, status: "locked", school: "Stanford GSB" },
];
const aiModules = [
  { id: 9, title: "AI Strategy & Competitive Dynamics", icon: "🎯", lessons: 20, done: 20, status: "complete", school: "AI Mgmt" },
  { id: 10, title: "AI Product Management", icon: "🤖", lessons: 20, done: 12, status: "active", school: "AI Mgmt" },
  { id: 11, title: "Economics of Foundation Models", icon: "⚡", lessons: 20, done: 0, status: "available", school: "AI Mgmt" },
  { id: 12, title: "Managing AI Teams", icon: "👥", lessons: 20, done: 0, status: "available", school: "AI Mgmt" },
  { id: 13, title: "AI Governance & Responsible AI", icon: "🛡️", lessons: 20, done: 0, status: "locked", school: "AI Mgmt" },
  { id: 14, title: "AI Procurement & Vendor Eval", icon: "🔍", lessons: 15, done: 0, status: "locked", school: "AI Mgmt" },
  { id: 15, title: "AI Org Transformation", icon: "🔄", lessons: 20, done: 0, status: "locked", school: "AI Mgmt" },
  { id: 16, title: "Human-AI Collaboration", icon: "🤝", lessons: 20, done: 0, status: "locked", school: "AI Mgmt" },
  { id: 17, title: "AI Regulation & Policy", icon: "📜", lessons: 25, done: 0, status: "locked", school: "AI Mgmt" },
];
const caseStudies = [
  { title: "Jio's Zero-Price Disruption", company: "Reliance Jio", geo: "India", flag: "🇮🇳", industry: "Telecom", framework: "Disruptive Innovation", difficulty: "Intermediate", desc: "How Mukesh Ambani's $35B bet on free data reshaped an entire nation's digital economy and displaced incumbents in 18 months." },
  { title: "M-Pesa: Mobile Money Revolution", company: "Safaricom", geo: "Kenya", flag: "🇰🇪", industry: "Fintech", framework: "Financial Inclusion", difficulty: "Beginner", desc: "The SMS-based payment system that brought banking to 40M unbanked Kenyans and became a model for emerging markets worldwide." },
  { title: "ByteDance's Recommendation Moat", company: "ByteDance", geo: "China", flag: "🇨🇳", industry: "Tech", framework: "AI Strategy", difficulty: "Advanced", desc: "How TikTok's parent built the world's most powerful recommendation engine and turned it into an unassailable competitive advantage." },
  { title: "Spotify's Squad Model", company: "Spotify", geo: "Sweden", flag: "🇸🇪", industry: "Tech", framework: "Org Design", difficulty: "Intermediate", desc: "The organizational framework that let Spotify scale from 50 to 5,000 engineers while maintaining startup agility." },
  { title: "Nubank's AI Credit Scoring", company: "Nubank", geo: "Brazil", flag: "🇧🇷", industry: "Fintech", framework: "AI Product Mgmt", difficulty: "Advanced", desc: "How Latin America's largest digital bank used ML to extend credit to 80M customers traditional banks rejected." },
  { title: "Grab vs GoTo: Superapp War", company: "Grab / GoTo", geo: "Indonesia", flag: "🇮🇩", industry: "Platform", framework: "Platform Strategy", difficulty: "Intermediate", desc: "Two superapps, one market of 270M people. A case study in platform competition, consolidation, and bundling economics." },
  { title: "Toyota Production System → AI", company: "Toyota", geo: "Japan", flag: "🇯🇵", industry: "Auto", framework: "Operations + AI", difficulty: "Intermediate", desc: "The evolution of lean manufacturing's gold standard from kanban boards to AI-augmented production lines." },
  { title: "UAE National AI Strategy", company: "UAE Government", geo: "UAE", flag: "🇦🇪", industry: "Gov", framework: "AI Policy", difficulty: "Advanced", desc: "How a small Gulf state positioned itself as a global AI hub through strategic investment, regulation, and talent acquisition." },
];
const tutorMessages = [
  { role: "user", text: "Can you explain DCF valuation in simpler terms?" },
  { role: "tutor", text: "Great question! Before I explain, let me ask you this — if I offered to give you $100 today or $100 one year from now, which would you prefer and why?" },
  { role: "user", text: "I'd take the $100 today because I could invest it and have more than $100 in a year." },
  { role: "tutor", text: "Exactly! You've just articulated the core principle behind DCF — the time value of money. A dollar today is worth more than a dollar tomorrow.\n\nDCF works by taking all the future cash flows a company is expected to generate, and \"discounting\" them back to today's value. Think of it as asking: \"What would I pay TODAY for the right to receive all these future payments?\"\n\nNow here's the challenge — what factors do you think would make that discount rate higher or lower for a company like Spotify versus a utility company?" },
];
const reviewCards = [
  { q: "What is the accounting equation?", a: "Assets = Liabilities + Equity", module: "Financial Accounting" },
  { q: "Name Porter's Five Forces", a: "Rivalry, New Entrants, Substitutes, Buyer Power, Supplier Power", module: "AI Strategy" },
  { q: "What is a data network effect?", a: "More users → more data → better product → more users", module: "AI Strategy" },
];

// ─── Shared ──────────────────────────────────────────────────
const Badge = ({ children, color = T.textMuted, bg }) => (
  <span style={{ fontSize: 11, fontWeight: 600, color, background: bg || `${color}12`, padding: "3px 9px", borderRadius: 5, letterSpacing: 0.3, whiteSpace: "nowrap" }}>{children}</span>
);
const StatCard = ({ label, value, color, icon }) => (
  <div style={{ background: T.bgCard, borderRadius: 12, padding: "18px 20px", border: `1px solid ${T.border}`, flex: 1, minWidth: 0 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: T.textMuted }}>{label}</span>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
    </div>
    <div style={{ fontSize: 28, fontWeight: 700, color: color || T.textPrimary, fontFamily: fontMono, lineHeight: 1 }}>{value}</div>
  </div>
);

// ─── PAGE: Dashboard ─────────────────────────────────────────
const DashboardPage = () => {
  const [phase, setPhase] = useState("preview");
  const [answer, setAnswer] = useState(null);
  const [rIdx, setRIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const quiz = { q: "Netflix's shift from DVDs to streaming is best explained by which framework?", opts: ["Blue Ocean Strategy","Disruptive Innovation (Christensen)","First-Mover Advantage","Resource-Based View"], correct: 1 };

  return (
    <div style={{ animation: "fadeIn .35s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 13, color: T.textMuted, fontFamily: fontMono, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>Tuesday, March 24</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: T.textPrimary, margin: 0, fontFamily: font }}>Good evening, Priya</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.accentGlow, padding: "8px 16px", borderRadius: 10, border: `1px solid ${T.accentBorder}` }}>
          <span style={{ color: T.accent }}><I.Fire /></span>
          <span style={{ color: T.accent, fontWeight: 700, fontSize: 18, fontFamily: fontMono }}><Counter target={14} /></span>
          <span style={{ color: T.textMuted, fontSize: 13 }}>day streak</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
        <StatCard label="Lessons Completed" value={<Counter target={75} />} color={T.blue} icon="📚" />
        <StatCard label="Current Module" value="2/8" color={T.accent} icon="💰" />
        <StatCard label="Average Score" value={<><Counter target={82} />%</>} color={T.green} icon="🎯" />
        <StatCard label="Cases Studied" value={<Counter target={48} />} color={T.purple} icon="🌍" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
        <div>
          <div style={{ background: T.bgCard, borderRadius: 12, padding: "14px 20px", border: `1px solid ${T.border}`, marginBottom: 14, display: "flex", alignItems: "center", gap: 16 }}>
            <Ring pct={0.72} size={42} color={T.blue} label="72%" />
            <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: T.blue, fontWeight: 600, textTransform: "uppercase", letterSpacing: .5 }}>Module 2 — Corporate Finance & Valuation</div><div style={{ fontSize: 13, color: T.textMuted, marginTop: 2 }}>Lesson 19 of 25 · Aligned with Wharton FNCE 601</div></div>
            <Badge color={T.accent}>In Progress</Badge>
          </div>
          <div style={{ background: T.bgCard, borderRadius: 14, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ padding: "28px 28px 20px", borderBottom: `1px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${T.accent}08 0%, transparent 70%)` }} />
              <div style={{ fontSize: 11, color: T.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, fontFamily: fontMono }}>Today's Lesson</div>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: T.textPrimary, margin: 0, lineHeight: 1.3, fontFamily: fontSerif }}>Discounted Cash Flow Valuation</h2>
              <p style={{ fontSize: 15, color: T.textSecondary, lineHeight: 1.7, margin: "12px 0 16px" }}>Learn to value companies by projecting future cash flows and discounting them to present value — the most fundamental valuation technique in corporate finance.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><Badge color={T.blue}>10 min read</Badge><Badge color={T.green}>Case: Spotify IPO</Badge><Badge color={T.purple}>5 Questions</Badge></div>
            </div>
            <div style={{ padding: 28 }}>
              {phase === "preview" && <button onClick={() => setPhase("reading")} style={{ width: "100%", padding: "16px 0", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${T.accent}, #D97706)`, color: "#000", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: font, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>Start Today's Lesson <I.Arrow /></button>}
              {phase === "reading" && (
                <div style={{ animation: "fadeIn .4s ease" }}>
                  <div style={{ fontSize: 15, color: T.textSecondary, lineHeight: 1.9, marginBottom: 20 }}><span style={{ color: T.textPrimary, fontWeight: 600 }}>The core idea:</span> A company is worth the sum of all future cash it will generate, adjusted for the fact that money today is worth more than money tomorrow. This is the foundation of how Wall Street, private equity, and venture capital value businesses.</div>
                  <div style={{ margin: "0 0 20px", padding: "18px 22px", background: T.bgSurface, borderRadius: 10, borderLeft: `3px solid ${T.accent}`, fontFamily: fontMono, fontSize: 14, color: T.accent, lineHeight: 1.8 }}>Company Value = CF₁/(1+r)¹ + CF₂/(1+r)² + ... + CFₙ/(1+r)ⁿ + TV/(1+r)ⁿ</div>
                  <div style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>Where <code style={{ color: T.accent, fontFamily: fontMono, background: T.bgSurface, padding: "2px 6px", borderRadius: 4 }}>CF</code> = projected free cash flow, <code style={{ color: T.accent, fontFamily: fontMono, background: T.bgSurface, padding: "2px 6px", borderRadius: 4 }}>r</code> = discount rate (WACC), and <code style={{ color: T.accent, fontFamily: fontMono, background: T.bgSurface, padding: "2px 6px", borderRadius: 4 }}>TV</code> = terminal value.</div>
                  <div style={{ background: T.bg, borderRadius: 12, padding: 22, border: `1px solid ${T.border}`, marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><span style={{ fontSize: 11, color: T.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: fontMono }}>Case Study</span><span>🇸🇪</span></div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: T.textPrimary, fontFamily: fontSerif, marginBottom: 8 }}>Spotify's IPO: What Was It Really Worth?</div>
                    <div style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.8 }}>When Spotify went public via direct listing in April 2018, analysts' DCF models ranged wildly from $15B to $50B. The core disagreement wasn't about the math — it was about assumptions. Bulls used a 9% discount rate and projected 30% revenue growth; bears used 12% and projected 18% growth. Same framework, vastly different conclusions.</div>
                  </div>
                  <button onClick={() => setPhase("quiz")} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: `1px solid ${T.green}44`, background: T.greenSoft, color: T.green, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: font }}>Continue to Knowledge Check →</button>
                </div>
              )}
              {phase === "quiz" && (
                <div style={{ animation: "fadeIn .3s ease" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><span style={{ fontSize: 12, color: T.accent, fontFamily: fontMono, fontWeight: 600 }}>QUESTION 1 OF 5</span><span style={{ fontSize: 12, color: T.textMuted }}>Knowledge Check</span></div>
                  <div style={{ fontSize: 16, color: T.textPrimary, lineHeight: 1.6, marginBottom: 20 }}>{quiz.q}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {quiz.opts.map((o, i) => {
                      const sel = answer === i, cor = i === quiz.correct, show = answer !== null;
                      let bg = T.bgSurface, bd = T.border, cl = T.textSecondary;
                      if (show && cor) { bg = T.greenSoft; bd = T.green; cl = T.green; }
                      else if (show && sel && !cor) { bg = `${T.red}12`; bd = T.red; cl = T.red; }
                      else if (sel) { bg = T.blueSoft; bd = T.blue; cl = T.blue; }
                      return <button key={i} onClick={() => !show && setAnswer(i)} style={{ padding: "14px 18px", borderRadius: 10, border: `1px solid ${bd}`, background: bg, color: cl, fontSize: 14, textAlign: "left", cursor: show ? "default" : "pointer", fontFamily: font, transition: "all .2s", display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 28, height: 28, borderRadius: 7, border: `1.5px solid ${bd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0, background: sel ? `${cl}15` : "transparent" }}>{show && cor ? <I.Check /> : String.fromCharCode(65+i)}</span>{o}</button>;
                    })}
                  </div>
                  {answer !== null && <div style={{ marginTop: 14, padding: 16, borderRadius: 10, background: T.greenSoft, border: `1px solid ${T.green}33`, fontSize: 14, color: T.green, lineHeight: 1.7, animation: "fadeIn .3s ease" }}>✓ Correct! Christensen's Disruptive Innovation explains how Netflix entered at the low end with DVD-by-mail and migrated upmarket as streaming technology matured.</div>}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: T.bgCard, borderRadius: 12, padding: 20, border: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><I.Sparkle /><span style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>Daily Review</span></div><span style={{ fontSize: 12, color: T.textMuted, fontFamily: fontMono }}>{Math.min(rIdx+1, reviewCards.length)}/{reviewCards.length}</span></div>
            {rIdx < reviewCards.length ? (<><div onClick={() => setFlipped(!flipped)} style={{ background: flipped ? T.bgSurface : T.bg, borderRadius: 10, padding: 24, minHeight: 120, border: `1px solid ${flipped ? T.accentBorder : T.border}`, cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", transition: "all .3s" }}><div style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: fontMono }}>{flipped ? "Answer" : "Question"} · {reviewCards[rIdx].module}</div><div style={{ fontSize: 15, color: T.textPrimary, textAlign: "center", lineHeight: 1.6, fontFamily: flipped ? fontMono : font }}>{flipped ? reviewCards[rIdx].a : reviewCards[rIdx].q}</div>{!flipped && <div style={{ fontSize: 11, color: T.textMuted, marginTop: 12 }}>Click to reveal</div>}</div>{flipped && <div style={{ display: "flex", gap: 8, marginTop: 12, animation: "fadeIn .25s" }}>{[{l:"Hard",c:T.red},{l:"Medium",c:T.accent},{l:"Easy",c:T.green}].map(b => <button key={b.l} onClick={() => { setFlipped(false); setRIdx(i => i+1); }} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${b.c}33`, background: `${b.c}10`, color: b.c, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: font }}>{b.l}</button>)}</div>}</>) : (<div style={{ textAlign: "center", padding: "20px 0", color: T.green }}><div style={{ fontSize: 24, marginBottom: 8 }}>✓</div><div style={{ fontSize: 14, fontWeight: 600 }}>Review Complete!</div></div>)}
          </div>
          <div style={{ background: T.bgCard, borderRadius: 12, padding: 20, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary, marginBottom: 16 }}>This Week</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 80, gap: 6 }}>
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => { const h = [65,80,50,70,90,30,0][i]; const today = i === 1; return (<div key={d} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}><div style={{ width: "100%", maxWidth: 32, borderRadius: 5, height: h > 0 ? `${h}%` : 3, background: h > 0 ? today ? T.accent : T.blue : T.border, transition: "height .5s ease", minHeight: 3 }} /><span style={{ fontSize: 10, color: today ? T.accent : T.textMuted, fontWeight: today ? 700 : 400, fontFamily: fontMono }}>{d}</span></div>); })}
            </div>
          </div>
          <div style={{ background: T.bgCard, borderRadius: 12, padding: 20, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary, marginBottom: 14 }}>Up Next</div>
            {[{ t: "Terminal Value & Growth Assumptions", d: "Tomorrow" },{ t: "WACC Calculation Workshop", d: "Thu" },{ t: "Comparable Company Analysis", d: "Fri" }].map((l,i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: T.textMuted, flexShrink: 0 }} /><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, color: T.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.t}</div></div><span style={{ fontSize: 11, color: T.textMuted, fontFamily: fontMono, flexShrink: 0 }}>{l.d}</span></div>))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: Curriculum ────────────────────────────────────────
const CurriculumPage = () => {
  const [track, setTrack] = useState("core");
  const mods = track === "core" ? coreModules : aiModules;
  return (
    <div style={{ animation: "fadeIn .35s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
        <div><h1 style={{ fontSize: 32, fontWeight: 700, color: T.textPrimary, margin: 0, fontFamily: font }}>Curriculum</h1><p style={{ fontSize: 14, color: T.textMuted, margin: "6px 0 0" }}>Mapped to HBS · Wharton · Stanford GSB · INSEAD · LBS</p></div>
        <div style={{ display: "flex", background: T.bgCard, borderRadius: 10, padding: 3, border: `1px solid ${T.border}` }}>
          {[{id:"core",l:"Core MBA"},{id:"ai",l:"AI Management"}].map(t => <button key={t.id} onClick={() => setTrack(t.id)} style={{ padding: "9px 22px", borderRadius: 8, border: "none", fontFamily: font, background: track === t.id ? T.accent : "transparent", color: track === t.id ? "#000" : T.textMuted, fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all .2s" }}>{t.l}</button>)}
        </div>
      </div>
      <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
        <StatCard label="Modules Completed" value={track === "core" ? "1/8" : "1/9"} color={T.green} icon="✅" />
        <StatCard label="Total Lessons Done" value={track === "core" ? "43" : "32"} color={T.blue} icon="📖" />
        <StatCard label="Average Score" value="82%" color={T.accent} icon="📊" />
        <StatCard label="Est. Completion" value={track === "core" ? "16 wks" : "14 wks"} color={T.purple} icon="📅" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {mods.map(m => { const pct = m.lessons > 0 ? m.done / m.lessons : 0; const comp = m.status === "complete", act = m.status === "active", lock = m.status === "locked"; return (
          <div key={m.id} style={{ background: act ? T.bgSurface : T.bgCard, borderRadius: 14, padding: "20px 22px", border: `1px solid ${act ? T.accentBorder : T.border}`, opacity: lock ? .45 : 1, cursor: lock ? "default" : "pointer", transition: "all .2s", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ fontSize: 28, lineHeight: 1 }}>{m.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, lineHeight: 1.3 }}>{m.title}</div>
                {comp && <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", color: T.green, flexShrink: 0, marginLeft: 8 }}><I.Check /></div>}
                {lock && <span style={{ color: T.textMuted, flexShrink: 0, marginLeft: 8 }}><I.Lock /></span>}
                {act && <Ring pct={pct} size={32} stroke={3} />}
              </div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>{m.school}</div>
              <div style={{ height: 4, background: T.border, borderRadius: 2, overflow: "hidden", marginBottom: 6 }}><div style={{ height: "100%", width: `${pct*100}%`, background: comp ? T.green : T.accent, borderRadius: 2, transition: "width .5s ease" }} /></div>
              <div style={{ fontSize: 12, color: T.textMuted }}>{comp ? `${m.lessons} lessons · Completed` : lock ? `${m.lessons} lessons · Locked` : `${m.done}/${m.lessons} lessons`}</div>
            </div>
          </div>
        ); })}
      </div>
    </div>
  );
};

// ─── PAGE: Library ───────────────────────────────────────────
const LibraryPage = () => {
  const [search, setSearch] = useState("");
  const [geo, setGeo] = useState("All");
  const geos = ["All","🇮🇳 India","🇰🇪 Africa","🇨🇳 China","🇸🇪 Europe","🇧🇷 LatAm","🇯🇵 Japan","🇦🇪 MENA"];
  const filtered = caseStudies.filter(c => (geo === "All" || c.flag === geo.split(" ")[0]) && (search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())));
  const dc = { Beginner: T.green, Intermediate: T.accent, Advanced: T.purple };
  return (
    <div style={{ animation: "fadeIn .35s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
        <div><h1 style={{ fontSize: 32, fontWeight: 700, color: T.textPrimary, margin: 0, fontFamily: font }}>Case Study Library</h1><p style={{ fontSize: 14, color: T.textMuted, margin: "6px 0 0" }}>500+ original case studies from 6 continents</p></div>
        <div style={{ position: "relative", width: 320 }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.textMuted }}><I.Search /></span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cases, companies, frameworks..." style={{ width: "100%", padding: "11px 14px 11px 40px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bgCard, color: T.textPrimary, fontSize: 14, fontFamily: font, outline: "none", boxSizing: "border-box" }} /></div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {geos.map(g => <button key={g} onClick={() => setGeo(g)} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${geo === g ? T.accentBorder : T.border}`, background: geo === g ? T.accentGlow : T.bgCard, color: geo === g ? T.accent : T.textMuted, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: font, transition: "all .15s" }}>{g}</button>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {filtered.map((c, i) => (
          <div key={i} style={{ background: T.bgCard, borderRadius: 14, padding: "22px 24px", border: `1px solid ${T.border}`, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}><span style={{ fontSize: 32 }}>{c.flag}</span><Badge color={dc[c.difficulty]}>{c.difficulty}</Badge></div>
            <div style={{ fontSize: 18, fontWeight: 600, color: T.textPrimary, fontFamily: fontSerif, marginBottom: 4, lineHeight: 1.3 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 10 }}>{c.company} · {c.geo}</div>
            <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>{c.desc}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><Badge color={T.blue}>{c.framework}</Badge><Badge color={T.textMuted}>{c.industry}</Badge></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PAGE: AI Tutor ──────────────────────────────────────────
const TutorPage = () => {
  const [msgs, setMsgs] = useState(tutorMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  const send = () => { if (!input.trim()) return; setMsgs(m => [...m, { role: "user", text: input }]); setInput(""); setTyping(true); setTimeout(() => { setTyping(false); setMsgs(m => [...m, { role: "tutor", text: "That's an excellent follow-up. Let's think about this using the WACC framework — the Weighted Average Cost of Capital.\n\nIf a company finances itself with both debt and equity, the discount rate reflects the blended cost of both. Debt is cheaper (interest is tax-deductible), but too much debt increases risk of default.\n\nSo here's my challenge to you: If Spotify had $2B in debt at 5% interest and $20B in equity with a cost of 12%, what would the blended discount rate be? And how would that change the DCF valuation we discussed earlier?" }]); }, 2200); };

  return (
    <div style={{ animation: "fadeIn .35s ease", display: "flex", gap: 0, height: "calc(100vh - 48px)", margin: "-32px -40px -32px 0" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: `1px solid ${T.border}` }}>
        <div style={{ padding: "16px 28px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${T.accent}, #D97706)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#000" }}><I.Sparkle /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 600, color: T.textPrimary }}>MBA Lite Tutor</div><div style={{ fontSize: 12, color: T.green }}>● Active · Socratic Mode · DCF Context</div></div>
          <Badge color={T.blue}>Lesson-Aware</Badge>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "24px 28px" }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 18 }}>
              {m.role === "tutor" && <div style={{ width: 32, height: 32, borderRadius: 8, background: `${T.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginRight: 12, flexShrink: 0, marginTop: 4 }}><I.Sparkle /></div>}
              <div style={{ maxWidth: "70%", padding: "14px 18px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? T.bgSurface : T.bgCard, border: `1px solid ${m.role === "user" ? T.borderLight : T.border}`, fontSize: 14, color: T.textPrimary, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{m.text}</div>
            </div>
          ))}
          {typing && <div style={{ display: "flex", marginBottom: 18 }}><div style={{ width: 32, height: 32, borderRadius: 8, background: `${T.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent, marginRight: 12 }}><I.Sparkle /></div><div style={{ padding: "14px 20px", borderRadius: "14px 14px 14px 4px", background: T.bgCard, border: `1px solid ${T.border}` }}><div style={{ display: "flex", gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: T.textMuted, animation: `bounce 1.2s ease infinite ${i*.15}s` }} />)}</div></div></div>}
          <div ref={ref} />
        </div>
        <div style={{ padding: "16px 28px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask your MBA tutor anything..." style={{ flex: 1, padding: "14px 18px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.bgInput, color: T.textPrimary, fontSize: 14, fontFamily: font, outline: "none" }} />
          <button onClick={send} style={{ width: 48, height: 48, borderRadius: 12, border: "none", background: input.trim() ? T.accent : T.bgCard, color: input.trim() ? "#000" : T.textMuted, cursor: input.trim() ? "pointer" : "default", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center" }}><I.Send /></button>
        </div>
      </div>
      <div style={{ width: 300, padding: "20px 24px", overflow: "auto", flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Lesson Context</div>
        {[{ label: "CURRENT LESSON", title: "DCF Valuation", sub: "Corporate Finance · Lesson 19/25", color: T.accent },{ label: "CASE STUDY", title: "Spotify IPO Valuation", sub: "Direct Listing · April 2018", color: T.green }].map((c,i) => (
          <div key={i} style={{ background: T.bgCard, borderRadius: 10, padding: 16, border: `1px solid ${T.border}`, marginBottom: 14 }}><div style={{ fontSize: 11, color: c.color, fontFamily: fontMono, marginBottom: 6 }}>{c.label}</div><div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary, marginBottom: 4 }}>{c.title}</div><div style={{ fontSize: 12, color: T.textMuted }}>{c.sub}</div></div>
        ))}
        <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, marginTop: 20 }}>Key Frameworks</div>
        {["Time Value of Money","Free Cash Flow","WACC","Terminal Value","Sensitivity Analysis"].map(f => <div key={f} style={{ padding: "8px 12px", background: T.bgCard, borderRadius: 8, border: `1px solid ${T.border}`, marginBottom: 6, fontSize: 13, color: T.textSecondary }}>{f}</div>)}
        <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, marginTop: 20 }}>Performance</div>
        <div style={{ background: T.bgCard, borderRadius: 10, padding: 16, border: `1px solid ${T.border}` }}>
          {[{l:"Module Score",v:"84%",c:T.green},{l:"Difficulty",v:"Adapting",c:T.accent},{l:"Tutor Mode",v:"Socratic",c:T.purple}].map((r,i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 2 ? 8 : 0 }}><span style={{ fontSize: 12, color: T.textMuted }}>{r.l}</span><span style={{ fontSize: 13, color: r.c, fontWeight: 600 }}>{r.v}</span></div>)}
        </div>
      </div>
    </div>
  );
};

// ─── PAGE: Profile ───────────────────────────────────────────
const ProfilePage = () => (
  <div style={{ animation: "fadeIn .35s ease" }}>
    <h1 style={{ fontSize: 32, fontWeight: 700, color: T.textPrimary, margin: "0 0 28px", fontFamily: font }}>Profile & Progress</h1>
    <div style={{ background: T.bgCard, borderRadius: 14, padding: "24px 28px", border: `1px solid ${T.border}`, marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ width: 72, height: 72, borderRadius: 16, background: `linear-gradient(135deg, ${T.accent}, #D97706)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "#000" }}>P</div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 24, fontWeight: 700, color: T.textPrimary }}>Priya Nair</div><div style={{ fontSize: 14, color: T.textMuted, marginTop: 2 }}>Engineering Manager · Bangalore, India</div><div style={{ display: "flex", gap: 10, marginTop: 8 }}><Badge color={T.green} bg={T.greenSoft}>Pro Subscriber</Badge><Badge color={T.accent}>Since Jan 2026</Badge></div></div>
      <button style={{ padding: "10px 20px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.bgSurface, color: T.textSecondary, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: font, display: "flex", alignItems: "center", gap: 6 }}><I.Settings /> Settings</button>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 24 }}>
      {[{l:"Current Streak",v:"14",u:"days",c:T.accent,i:"🔥"},{l:"Longest Streak",v:"21",u:"days",c:T.accent,i:"⭐"},{l:"Lessons Done",v:"75",u:"",c:T.blue,i:"📚"},{l:"Avg Score",v:"82",u:"%",c:T.green,i:"🎯"},{l:"Cases Read",v:"48",u:"",c:T.purple,i:"🌍"},{l:"Tutor Chats",v:"32",u:"",c:T.blue,i:"💬"}].map(s => (
        <div key={s.l} style={{ background: T.bgCard, borderRadius: 12, padding: "16px 18px", border: `1px solid ${T.border}` }}><div style={{ fontSize: 18, marginBottom: 8 }}>{s.i}</div><div style={{ fontSize: 24, fontWeight: 700, color: s.c, fontFamily: fontMono, lineHeight: 1 }}>{s.v}<span style={{ fontSize: 14, fontWeight: 500 }}>{s.u}</span></div><div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>{s.l}</div></div>
      ))}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ background: T.bgCard, borderRadius: 14, padding: 24, border: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}><I.Trophy /><span style={{ fontSize: 16, fontWeight: 600, color: T.textPrimary }}>Certificates Earned</span></div>
        {[{t:"Financial Accounting & Reporting",tr:"Core MBA",d:"Feb 28, 2026"},{t:"AI Strategy & Competitive Dynamics",tr:"AI Management",d:"Mar 15, 2026"}].map((c,i) => (
          <div key={i} style={{ background: T.bgSurface, borderRadius: 10, padding: 16, border: `1px solid ${T.green}22`, marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 44, height: 44, borderRadius: 10, background: T.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🏆</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>{c.t}</div><div style={{ fontSize: 12, color: T.textMuted }}>{c.tr} · {c.d}</div></div><button style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", color: T.textSecondary, fontSize: 12, cursor: "pointer", fontFamily: font, whiteSpace: "nowrap" }}>View PDF</button></div>
        ))}
        <div style={{ background: T.bg, borderRadius: 10, padding: 16, border: `1px dashed ${T.border}`, textAlign: "center" }}><div style={{ fontSize: 13, color: T.textMuted }}>Next: Corporate Finance & Valuation</div><div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>7 lessons remaining</div></div>
      </div>
      <div style={{ background: T.bgCard, borderRadius: 14, padding: 24, border: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: T.textPrimary, marginBottom: 18 }}>Learning Activity (12 Weeks)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {["Mon","","Wed","","Fri","","Sun"].map((day,row) => (
            <div key={row} style={{ display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 28, fontSize: 10, color: T.textMuted, textAlign: "right", fontFamily: fontMono }}>{day}</span>
              {Array.from({length:12},(_,col) => { const v = [0,1,2,3,2,1,0,3,2,1,3,2][(row+col)%12]; const cs = [T.border,`${T.green}40`,`${T.green}70`,T.green]; return <div key={col} style={{ flex: 1, height: 14, borderRadius: 3, background: cs[v] }} />; })}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4, marginTop: 10 }}><span style={{ fontSize: 10, color: T.textMuted }}>Less</span>{[T.border,`${T.green}40`,`${T.green}70`,T.green].map((c,i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c }} />)}<span style={{ fontSize: 10, color: T.textMuted }}>More</span></div>
      </div>
    </div>
  </div>
);

// ─── MAIN ────────────────────────────────────────────────────
export default function MBALiteWeb() {
  const [page, setPage] = useState("dashboard");
  const nav = [{id:"dashboard",l:"Dashboard",Ic:I.Home},{id:"curriculum",l:"Curriculum",Ic:I.Book},{id:"library",l:"Case Library",Ic:I.Grid},{id:"tutor",l:"AI Tutor",Ic:I.Chat},{id:"profile",l:"Profile",Ic:I.User}];
  const pages = { dashboard: DashboardPage, curriculum: CurriculumPage, library: LibraryPage, tutor: TutorPage, profile: ProfilePage };
  const P = pages[page];

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: font, color: T.textPrimary, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.borderLight}; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
        input::placeholder { color: ${T.textMuted}; }
        button:hover { filter: brightness(1.08); }
      `}</style>

      <nav style={{ width: 240, background: T.bgSidebar, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", padding: "20px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 28 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${T.accent}, #B45309)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#000", fontFamily: fontSerif }}>M</div>
          <div><div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary, lineHeight: 1 }}>MBA Lite</div><div style={{ fontSize: 10, color: T.textMuted, fontFamily: fontMono, letterSpacing: .5 }}>Your MBA, 15 min/day</div></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {nav.map(n => { const a = page === n.id; return (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 9, border: "none", background: a ? T.accentGlow : "transparent", color: a ? T.accent : T.textMuted, fontWeight: a ? 600 : 500, fontSize: 14, cursor: "pointer", fontFamily: font, transition: "all .15s", textAlign: "left", borderLeft: a ? `2px solid ${T.accent}` : "2px solid transparent" }}><n.Ic /> {n.l}</button>
          ); })}
        </div>
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${T.accent}, #D97706)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#000" }}>P</div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>Priya Nair</div><div style={{ fontSize: 11, color: T.textMuted }}>Pro Plan</div></div>
          </div>
        </div>
      </nav>

      <main style={{ flex: 1, overflow: "auto", padding: page === "tutor" ? 0 : "32px 40px" }}>
        {page === "tutor" ? <div style={{ height: "100%" }}><P /></div> : <div style={{ maxWidth: 1200 }}><P /></div>}
      </main>
    </div>
  );
}
