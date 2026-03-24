'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Track = 'core' | 'ai';

export default function CurriculumPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState<Track>('core');

  useEffect(() => {
    api.get('/modules').then((res) => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const modules = track === 'core' ? (data?.core ?? []) : (data?.aiManagement ?? []);

  return (
    <div className="max-w-3xl mx-auto p-8 animate-fade-up">
      <h1 className="text-3xl font-bold text-text-primary mb-1">Curriculum</h1>
      <p className="text-text-muted text-sm mb-8">Aligned with HBS · Wharton · Stanford GSB</p>

      {/* Track toggle */}
      <div className="flex bg-card border border-border rounded-xl p-1 mb-8">
        {(['core', 'ai'] as Track[]).map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              track === t ? 'bg-accent text-black' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {t === 'core' ? 'Core MBA (8)' : 'AI Management (9)'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading curriculum...</div>
      ) : (
        <div className="space-y-3">
          {modules.map((m: any) => {
            const pct = m.lessonsTotal > 0 ? (m.lessonsCompleted / m.lessonsTotal) * 100 : 0;
            const isLocked = m.status === 'locked';
            const isComplete = m.status === 'complete';

            return (
              <div
                key={m.id}
                className={`flex items-center gap-4 bg-card border rounded-xl p-4 transition-opacity ${
                  isLocked ? 'opacity-50 border-border' : m.status === 'in_progress' ? 'border-accent/40 bg-surface' : 'border-border'
                }`}
              >
                <span className="text-2xl w-10 text-center">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate">{m.title}</p>
                  <div className="h-1 bg-border rounded-full mt-2 mb-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isComplete ? 'bg-green' : 'bg-accent'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-muted">
                    {isComplete ? 'Completed ✓' : isLocked ? 'Locked' : `${m.lessonsCompleted}/${m.lessonsTotal} lessons`}
                  </p>
                </div>
                <div className="shrink-0">
                  {isComplete && <span className="text-green text-lg">✓</span>}
                  {isLocked && <span className="text-text-muted text-sm">🔒</span>}
                  {m.status === 'available' && <span className="text-blue text-sm">▶</span>}
                  {m.status === 'in_progress' && (
                    <span className="text-xs font-mono text-accent">{Math.round(pct)}%</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
