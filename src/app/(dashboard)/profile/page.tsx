'use client';

export default function ProfilePage() {
  const stats = [
    { l: 'Current Streak', v: '14', u: 'days', c: 'text-amber-500', i: '🔥' },
    { l: 'Longest Streak', v: '21', u: 'days', c: 'text-amber-500', i: '⭐' },
    { l: 'Lessons Done', v: '75', u: '', c: 'text-blue-500', i: '📚' },
    { l: 'Avg Score', v: '82', u: '%', c: 'text-emerald-500', i: '🎯' },
    { l: 'Cases Read', v: '48', u: '', c: 'text-violet-400', i: '🌍' },
    { l: 'Tutor Chats', v: '32', u: '', c: 'text-blue-500', i: '💬' },
  ];

  const certs = [
    { t: 'Financial Accounting & Reporting', tr: 'Core MBA', d: 'Feb 28, 2026' },
    { t: 'AI Strategy & Competitive Dynamics', tr: 'AI Management', d: 'Mar 15, 2026' },
  ];

  const heatmapColors = ['#27272A', 'rgba(34,197,94,0.25)', 'rgba(34,197,94,0.5)', '#22C55E'];
  const days = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

  return (
    <div className="p-8 max-w-[1200px] animate-fade-in">
      <h1 className="text-[32px] font-bold text-zinc-50 mb-7">Profile & Progress</h1>

      {/* Profile Header */}
      <div className="bg-[#131316] rounded-[14px] p-6 px-7 border border-zinc-800 mb-5 flex items-center gap-5">
        <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-[32px] font-bold text-black">
          P
        </div>
        <div className="flex-1">
          <div className="text-2xl font-bold text-zinc-50">Priya Nair</div>
          <div className="text-sm text-zinc-500 mt-0.5">Engineering Manager · Bangalore, India</div>
          <div className="flex gap-2.5 mt-2">
            <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-[5px]">Pro Subscriber</span>
            <span className="text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-[5px]">Since Jan 2026</span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 text-[13px] font-medium hover:bg-zinc-800 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
          Settings
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.l} className="bg-[#131316] rounded-xl p-4 border border-zinc-800">
            <div className="text-lg mb-2">{s.i}</div>
            <div className={`text-2xl font-bold font-mono leading-none ${s.c}`}>
              {s.v}<span className="text-sm font-medium">{s.u}</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Two-Column */}
      <div className="grid grid-cols-2 gap-4">
        {/* Certificates */}
        <div className="bg-[#131316] rounded-[14px] p-6 border border-zinc-800">
          <div className="flex items-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-50">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
            <span className="text-base font-semibold text-zinc-50">Certificates Earned</span>
          </div>

          {certs.map((c, i) => (
            <div key={i} className="bg-zinc-900 rounded-[10px] p-4 border border-emerald-500/15 mb-2.5 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-[10px] bg-emerald-500/10 flex items-center justify-center text-[22px] shrink-0">🏆</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-zinc-50">{c.t}</div>
                <div className="text-xs text-zinc-500">{c.tr} · {c.d}</div>
              </div>
              <button className="px-3.5 py-1.5 rounded-md border border-zinc-800 text-zinc-400 text-xs hover:bg-zinc-800 transition whitespace-nowrap">
                View PDF
              </button>
            </div>
          ))}

          <div className="bg-[#09090B] rounded-[10px] p-4 border border-dashed border-zinc-800 text-center">
            <div className="text-[13px] text-zinc-500">Next: Corporate Finance & Valuation</div>
            <div className="text-xs text-zinc-500 mt-1">7 lessons remaining</div>
          </div>
        </div>

        {/* Learning Heatmap */}
        <div className="bg-[#131316] rounded-[14px] p-6 border border-zinc-800">
          <div className="text-base font-semibold text-zinc-50 mb-4">Learning Activity (12 Weeks)</div>
          <div className="flex flex-col gap-[3px]">
            {days.map((day, row) => (
              <div key={row} className="flex items-center gap-[3px]">
                <span className="w-7 text-[10px] text-zinc-500 text-right font-mono">{day}</span>
                {Array.from({ length: 12 }, (_, col) => {
                  const vals = [0, 1, 2, 3, 2, 1, 0, 3, 2, 1, 3, 2];
                  const v = vals[(row + col) % vals.length];
                  return (
                    <div
                      key={col}
                      className="flex-1 h-3.5 rounded-[3px]"
                      style={{ background: heatmapColors[v] }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center gap-1 mt-2.5">
            <span className="text-[10px] text-zinc-500">Less</span>
            {heatmapColors.map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
            ))}
            <span className="text-[10px] text-zinc-500">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
