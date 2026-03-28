'use client';

import { useState } from 'react';
import { Badge, StatCard, ProgressRing } from '@/components/ui';
import { coreModules, aiModules } from '@/data/curriculum';

export default function CurriculumPage() {
  const [track, setTrack] = useState<'core' | 'ai'>('core');
  const modules = track === 'core' ? coreModules : aiModules;

  return (
    <div className="p-8 max-w-[1200px] animate-fade-in">
      <div className="flex justify-between items-end mb-7">
        <div>
          <h1 className="text-[32px] font-bold text-zinc-50">Curriculum</h1>
          <p className="text-sm text-zinc-500 mt-1.5">Mapped to HBS · Wharton · Stanford GSB · INSEAD · LBS</p>
        </div>
        <div className="flex bg-[#131316] rounded-[10px] p-0.5 border border-zinc-800">
          {[{ id: 'core' as const, l: 'Core MBA' }, { id: 'ai' as const, l: 'AI Management' }].map((t) => (
            <button key={t.id} onClick={() => setTrack(t.id)} className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${track === t.id ? 'bg-amber-500 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {t.l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3.5 mb-7">
        <StatCard label="Modules Completed" value={track === 'core' ? '1/8' : '1/9'} color="text-emerald-500" icon="✅" />
        <StatCard label="Total Lessons Done" value={track === 'core' ? '43' : '32'} color="text-blue-500" icon="📖" />
        <StatCard label="Average Score" value="82%" color="text-amber-500" icon="📊" />
        <StatCard label="Est. Completion" value={track === 'core' ? '16 wks' : '14 wks'} color="text-violet-400" icon="📅" />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {modules.map((m) => {
          const pct = m.lessons > 0 ? m.done / m.lessons : 0;
          const comp = m.status === 'complete';
          const act = m.status === 'active';
          const lock = m.status === 'locked';

          return (
            <div key={m.id} className={`rounded-[14px] p-5 px-5.5 border flex gap-4 items-start transition-all ${act ? 'bg-zinc-900 border-amber-500/25' : 'bg-[#131316] border-zinc-800'} ${lock ? 'opacity-45' : 'cursor-pointer hover:border-zinc-700'}`}>
              <div className="text-[28px] leading-none">{m.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1.5">
                  <div className="text-[15px] font-semibold text-zinc-50 leading-tight">{m.title}</div>
                  {comp && <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 ml-2"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>}
                  {lock && <span className="text-zinc-500 shrink-0 ml-2"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></span>}
                  {act && <ProgressRing pct={pct} size={32} stroke={3} />}
                </div>
                <div className="text-xs text-zinc-500 mb-2">{m.school}</div>
                <div className="h-1 bg-zinc-800 rounded-sm overflow-hidden mb-1.5">
                  <div className="h-full rounded-sm transition-all duration-500" style={{ width: `${pct * 100}%`, background: comp ? '#22C55E' : '#F59E0B' }} />
                </div>
                <div className="text-xs text-zinc-500">
                  {comp ? `${m.lessons} lessons · Completed` : lock ? `${m.lessons} lessons · Locked` : `${m.done}/${m.lessons} lessons`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
