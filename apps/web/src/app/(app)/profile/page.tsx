'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, removeToken } from '@/lib/api';

export default function ProfilePage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.get('/progress/stats').then((res) => setStats(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleLogout = () => { removeToken(); router.push('/login'); };

  return (
    <div className="max-w-3xl mx-auto p-8 animate-fade-up">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Profile</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {loading ? (
          <div className="col-span-3 text-text-muted py-8 text-center">Loading stats...</div>
        ) : (
          [
            { label: 'Current Streak', val: `${stats?.currentStreak ?? 0} days`, icon: '🔥', color: 'text-accent' },
            { label: 'Longest Streak', val: `${stats?.longestStreak ?? 0} days`, icon: '⭐', color: 'text-accent' },
            { label: 'Lessons Done', val: `${stats?.lessonsCompleted ?? 0}`, icon: '📚', color: 'text-blue' },
            { label: 'Average Score', val: `${stats?.averageScore ?? 0}%`, icon: '🎯', color: 'text-green' },
            { label: 'Modules Done', val: `${stats?.modulesCompleted ?? 0}/${stats?.modulesTotal ?? 17}`, icon: '🏆', color: 'text-blue' },
            { label: 'Cards Due', val: `${stats?.reviewCardsDue ?? 0}`, icon: '🃏', color: 'text-purple' },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-2xl font-bold font-mono ${s.color}`}>{s.val.split(' ')[0]}</span>
              </div>
              <p className="text-text-muted text-xs">{s.label}</p>
            </div>
          ))
        )}
      </div>

      {/* Certificates */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-text-primary mb-4">Certificates</h2>
        {stats?.certificates?.length > 0 ? (
          <div className="space-y-3">
            {stats.certificates.map((cert: any) => (
              <div key={cert.id} className="flex items-center gap-4 bg-surface border border-green/30 rounded-xl p-4">
                <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center text-xl">🎓</div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">{cert.title}</p>
                  <p className="text-green text-xs">
                    Completed · {new Date(cert.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">Complete a full module to earn your first certificate.</p>
        )}
      </div>

      {/* Settings */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
        {['Notification Preferences', 'Subscription & Billing', 'Privacy & Data', 'Help & Feedback'].map((item, i, arr) => (
          <button
            key={item}
            className={`w-full flex justify-between items-center px-5 py-4 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors ${
              i < arr.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            {item}
            <span className="text-text-muted">›</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="w-full border border-red/40 bg-red/10 text-red font-semibold py-3 rounded-xl hover:bg-red/20 transition-colors text-sm"
      >
        Log Out
      </button>
    </div>
  );
}
