'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui';
import { initialTutorMessages, type TutorMessage } from '@/data/curriculum';

export default function TutorPage() {
  const [msgs, setMsgs] = useState<TutorMessage[]>(initialTutorMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { role: 'user', text: input }]);
    setInput('');
    setTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        {
          role: 'tutor',
          text: "That's an excellent follow-up. Let's think about this using the WACC framework — the Weighted Average Cost of Capital.\n\nIf a company finances itself with both debt and equity, the discount rate reflects the blended cost of both. Debt is cheaper (interest is tax-deductible), but too much debt increases risk of default.\n\nSo here's my challenge to you: If Spotify had $2B in debt at 5% interest and $20B in equity with a cost of 12%, what would the blended discount rate be? And how would that change the DCF valuation we discussed earlier?",
        },
      ]);
    }, 2200);
  };

  return (
    <div className="flex h-full animate-fade-in">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col border-r border-zinc-800">
        {/* Header */}
        <div className="px-7 py-4 border-b border-zinc-800 flex items-center gap-3.5 shrink-0">
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-zinc-50">MBA Lite Tutor</div>
            <div className="text-xs text-emerald-500">● Active · Socratic Mode · DCF Context</div>
          </div>
          <Badge color="blue">Lesson-Aware</Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-7 py-6">
          {msgs.map((m, i) => (
            <div key={i} className={`flex mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'tutor' && (
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-500 mr-3 shrink-0 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
              )}
              <div className={`max-w-[70%] px-4 py-3.5 text-sm text-zinc-50 leading-relaxed whitespace-pre-wrap border ${
                m.role === 'user'
                  ? 'bg-zinc-900 border-zinc-700 rounded-[14px] rounded-br-[4px]'
                  : 'bg-[#131316] border-zinc-800 rounded-[14px] rounded-bl-[4px]'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-500 mr-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <div className="px-5 py-3.5 bg-[#131316] border border-zinc-800 rounded-[14px] rounded-bl-[4px]">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-[7px] h-[7px] rounded-full bg-zinc-500" style={{ animation: `bounce-dot 1.2s ease infinite ${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-7 py-4 border-t border-zinc-800 flex gap-3 items-center shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask your MBA tutor anything..."
            className="flex-1 px-4 py-3.5 rounded-xl border border-zinc-800 bg-[#1C1C20] text-zinc-50 text-sm outline-none focus:border-zinc-600 transition"
          />
          <button onClick={send} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${input.trim() ? 'bg-amber-500 text-black cursor-pointer' : 'bg-[#131316] text-zinc-500'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </button>
        </div>
      </div>

      {/* Context Panel */}
      <div className="w-[300px] p-5 overflow-auto shrink-0">
        <div className="text-[13px] font-semibold text-zinc-500 uppercase tracking-[1px] mb-4">Lesson Context</div>

        <div className="bg-[#131316] rounded-[10px] p-4 border border-zinc-800 mb-3.5">
          <div className="text-[11px] text-amber-500 font-mono mb-1.5">CURRENT LESSON</div>
          <div className="text-sm font-semibold text-zinc-50 mb-1">DCF Valuation</div>
          <div className="text-xs text-zinc-500">Corporate Finance · Lesson 19/25</div>
        </div>

        <div className="bg-[#131316] rounded-[10px] p-4 border border-zinc-800 mb-3.5">
          <div className="text-[11px] text-emerald-500 font-mono mb-1.5">CASE STUDY</div>
          <div className="text-sm font-semibold text-zinc-50 mb-1">Spotify IPO Valuation</div>
          <div className="text-xs text-zinc-500">Direct Listing · April 2018</div>
        </div>

        <div className="text-[13px] font-semibold text-zinc-500 uppercase tracking-[1px] mb-3 mt-5">Key Frameworks</div>
        {['Time Value of Money', 'Free Cash Flow', 'WACC', 'Terminal Value', 'Sensitivity Analysis'].map((f) => (
          <div key={f} className="px-3 py-2 bg-[#131316] rounded-lg border border-zinc-800 mb-1.5 text-[13px] text-zinc-400">
            {f}
          </div>
        ))}

        <div className="text-[13px] font-semibold text-zinc-500 uppercase tracking-[1px] mb-3 mt-5">Performance</div>
        <div className="bg-[#131316] rounded-[10px] p-4 border border-zinc-800">
          {[
            { l: 'Module Score', v: '84%', c: 'text-emerald-500' },
            { l: 'Difficulty', v: 'Adapting', c: 'text-amber-500' },
            { l: 'Tutor Mode', v: 'Socratic', c: 'text-violet-400' },
          ].map((r, i) => (
            <div key={i} className={`flex justify-between ${i < 2 ? 'mb-2' : ''}`}>
              <span className="text-xs text-zinc-500">{r.l}</span>
              <span className={`text-[13px] font-semibold ${r.c}`}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
