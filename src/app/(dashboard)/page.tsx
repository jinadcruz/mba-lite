'use client';

import { useState } from 'react';
import { Badge, StatCard, ProgressRing, Counter } from '@/components/ui';
import { reviewCards, sampleQuiz } from '@/data/curriculum';

export default function DashboardPage() {
  const [phase, setPhase] = useState<'preview' | 'reading' | 'quiz'>('preview');
  const [answer, setAnswer] = useState<number | null>(null);
  const [rIdx, setRIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="p-8 max-w-[1200px] animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[13px] text-zinc-500 font-mono uppercase tracking-[1.5px] mb-1.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="text-[32px] font-bold text-zinc-50">Good evening, Priya</h1>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 px-4 py-2 rounded-[10px] border border-amber-500/25">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
          <span className="text-amber-500 font-bold text-lg font-mono"><Counter target={14} /></span>
          <span className="text-zinc-500 text-[13px]">day streak</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-3.5 mb-7">
        <StatCard label="Lessons Completed" value={<Counter target={75} />} color="text-blue-500" icon="📚" />
        <StatCard label="Current Module" value="2/8" color="text-amber-500" icon="💰" />
        <StatCard label="Average Score" value={<><Counter target={82} />%</>} color="text-emerald-500" icon="🎯" />
        <StatCard label="Cases Studied" value={<Counter target={48} />} color="text-violet-400" icon="🌍" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-[1fr_380px] gap-5">
        {/* Left: Lesson */}
        <div>
          {/* Module Bar */}
          <div className="bg-[#131316] rounded-xl p-3.5 px-5 border border-zinc-800 mb-3.5 flex items-center gap-4">
            <ProgressRing pct={0.72} size={42} color="#3B82F6" label="72%" />
            <div className="flex-1">
              <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Module 2 — Corporate Finance & Valuation</div>
              <div className="text-[13px] text-zinc-500 mt-0.5">Lesson 19 of 25 · Aligned with Wharton FNCE 601</div>
            </div>
            <Badge color="amber">In Progress</Badge>
          </div>

          {/* Lesson Card */}
          <div className="bg-[#131316] rounded-[14px] border border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="p-7 pb-5 border-b border-zinc-800 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-500/5" />
              <div className="text-[11px] text-amber-500 font-bold uppercase tracking-[2px] mb-2.5 font-mono">Today&apos;s Lesson</div>
              <h2 className="text-[26px] font-bold text-zinc-50 leading-tight font-serif">Discounted Cash Flow Valuation</h2>
              <p className="text-[15px] text-zinc-400 leading-relaxed mt-3 mb-4">
                Learn to value companies by projecting future cash flows and discounting them to present value — the most fundamental valuation technique in corporate finance.
              </p>
              <div className="flex gap-2.5 flex-wrap">
                <Badge color="blue">10 min read</Badge>
                <Badge color="green">Case: Spotify IPO</Badge>
                <Badge color="purple">5 Questions</Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-7">
              {phase === 'preview' && (
                <button onClick={() => setPhase('reading')} className="w-full py-4 rounded-[10px] bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-[15px] flex items-center justify-center gap-2 hover:brightness-110 transition">
                  Start Today&apos;s Lesson
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              )}

              {phase === 'reading' && (
                <div className="animate-fade-in">
                  <p className="text-[15px] text-zinc-400 leading-[1.9] mb-5">
                    <span className="text-zinc-50 font-semibold">The core idea:</span> A company is worth the sum of all future cash it will generate, adjusted for the fact that money today is worth more than money tomorrow. This is the foundation of how Wall Street, private equity, and venture capital value businesses.
                  </p>
                  <div className="mb-5 p-5 bg-zinc-900 rounded-[10px] border-l-[3px] border-amber-500 font-mono text-sm text-amber-500 leading-relaxed">
                    Company Value = CF₁/(1+r)¹ + CF₂/(1+r)² + ... + CFₙ/(1+r)ⁿ + TV/(1+r)ⁿ
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                    Where <code className="text-amber-500 font-mono bg-zinc-900 px-1.5 py-0.5 rounded">CF</code> = projected free cash flow,{' '}
                    <code className="text-amber-500 font-mono bg-zinc-900 px-1.5 py-0.5 rounded">r</code> = discount rate (WACC), and{' '}
                    <code className="text-amber-500 font-mono bg-zinc-900 px-1.5 py-0.5 rounded">TV</code> = terminal value.
                  </p>

                  {/* Case Study */}
                  <div className="bg-[#09090B] rounded-xl p-5 border border-zinc-800 mb-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[11px] text-emerald-500 font-bold uppercase tracking-[1.5px] font-mono">Case Study</span>
                      <span>🇸🇪</span>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-50 font-serif mb-2">Spotify&apos;s IPO: What Was It Really Worth?</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      When Spotify went public via direct listing in April 2018, analysts&apos; DCF models ranged wildly from $15B to $50B. The core disagreement wasn&apos;t about the math — it was about assumptions. Bulls used a 9% discount rate and projected 30% revenue growth; bears used 12% and projected 18% growth. Same framework, vastly different conclusions.
                    </p>
                  </div>

                  <button onClick={() => setPhase('quiz')} className="w-full py-3.5 rounded-[10px] border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-semibold text-sm hover:bg-emerald-500/20 transition">
                    Continue to Knowledge Check →
                  </button>
                </div>
              )}

              {phase === 'quiz' && (
                <div className="animate-fade-in">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs text-amber-500 font-mono font-semibold">QUESTION 1 OF 5</span>
                    <span className="text-xs text-zinc-500">Knowledge Check</span>
                  </div>
                  <p className="text-base text-zinc-50 leading-relaxed mb-5">{sampleQuiz.question}</p>
                  <div className="flex flex-col gap-2.5">
                    {sampleQuiz.options.map((opt, i) => {
                      const sel = answer === i;
                      const cor = i === sampleQuiz.correct;
                      const show = answer !== null;
                      let cls = 'bg-zinc-900 border-zinc-800 text-zinc-400';
                      if (show && cor) cls = 'bg-emerald-500/10 border-emerald-500 text-emerald-500';
                      else if (show && sel && !cor) cls = 'bg-red-500/10 border-red-500 text-red-500';
                      else if (sel) cls = 'bg-blue-500/10 border-blue-500 text-blue-500';

                      return (
                        <button key={i} onClick={() => !show && setAnswer(i)} className={`flex items-center gap-3 p-3.5 px-4.5 rounded-[10px] border text-sm text-left transition-all ${cls} ${!show ? 'cursor-pointer hover:brightness-110' : ''}`}>
                          <span className={`w-7 h-7 rounded-[7px] border-[1.5px] flex items-center justify-center text-xs font-semibold shrink-0 ${sel ? 'border-current bg-current/10' : 'border-zinc-700'}`}>
                            {show && cor ? '✓' : String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {answer !== null && (
                    <div className="mt-3.5 p-4 rounded-[10px] bg-emerald-500/10 border border-emerald-500/25 text-sm text-emerald-500 leading-relaxed animate-fade-in">
                      ✓ {sampleQuiz.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-3.5">
          {/* Review Cards */}
          <div className="bg-[#131316] rounded-xl p-5 border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                <span className="text-sm font-semibold text-zinc-50">Daily Review</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">{Math.min(rIdx + 1, reviewCards.length)}/{reviewCards.length}</span>
            </div>

            {rIdx < reviewCards.length ? (
              <>
                <div onClick={() => setFlipped(!flipped)} className={`rounded-[10px] p-6 min-h-[120px] cursor-pointer flex flex-col justify-center items-center transition-all ${flipped ? 'bg-zinc-900 border-amber-500/25' : 'bg-[#09090B] border-zinc-800'} border`}>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-[1px] mb-2.5 font-mono">
                    {flipped ? 'Answer' : 'Question'} · {reviewCards[rIdx].module}
                  </div>
                  <div className={`text-[15px] text-zinc-50 text-center leading-relaxed ${flipped ? 'font-mono' : ''}`}>
                    {flipped ? reviewCards[rIdx].a : reviewCards[rIdx].q}
                  </div>
                  {!flipped && <div className="text-[11px] text-zinc-500 mt-3">Click to reveal</div>}
                </div>
                {flipped && (
                  <div className="flex gap-2 mt-3 animate-fade-in">
                    {[{ l: 'Hard', c: 'border-red-500/30 bg-red-500/10 text-red-500' }, { l: 'Medium', c: 'border-amber-500/30 bg-amber-500/10 text-amber-500' }, { l: 'Easy', c: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500' }].map((b) => (
                      <button key={b.l} onClick={() => { setFlipped(false); setRIdx((i) => i + 1); }} className={`flex-1 py-2.5 rounded-lg border font-semibold text-[13px] transition hover:brightness-110 ${b.c}`}>
                        {b.l}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5 text-emerald-500">
                <div className="text-2xl mb-2">✓</div>
                <div className="text-sm font-semibold">Review Complete!</div>
                <div className="text-xs text-zinc-500 mt-1">3 cards reviewed today</div>
              </div>
            )}
          </div>

          {/* Weekly Activity */}
          <div className="bg-[#131316] rounded-xl p-5 border border-zinc-800">
            <div className="text-sm font-semibold text-zinc-50 mb-4">This Week</div>
            <div className="flex justify-between items-end h-20 gap-1.5">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => {
                const h = [65, 80, 50, 70, 90, 30, 0][i];
                const today = i === new Date().getDay() - 1;
                return (
                  <div key={d} className="flex flex-col items-center gap-1.5 flex-1">
                    <div className="w-full max-w-8 rounded-[5px] transition-all duration-500" style={{ height: h > 0 ? `${h}%` : '3px', background: h > 0 ? (today ? '#F59E0B' : '#3B82F6') : '#27272A', minHeight: 3 }} />
                    <span className={`text-[10px] font-mono ${today ? 'text-amber-500 font-bold' : 'text-zinc-500'}`}>{d}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Up Next */}
          <div className="bg-[#131316] rounded-xl p-5 border border-zinc-800">
            <div className="text-sm font-semibold text-zinc-50 mb-3.5">Up Next</div>
            {[
              { t: 'Terminal Value & Growth Assumptions', d: 'Tomorrow' },
              { t: 'WACC Calculation Workshop', d: 'Thu' },
              { t: 'Comparable Company Analysis', d: 'Fri' },
            ].map((l, i) => (
              <div key={i} className={`flex items-center gap-3 py-2.5 ${i < 2 ? 'border-b border-zinc-800' : ''}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-zinc-50 truncate">{l.t}</div>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono shrink-0">{l.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
