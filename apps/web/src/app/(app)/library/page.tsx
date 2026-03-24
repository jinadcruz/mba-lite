'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';

const GEO_FILTERS = ['All', 'India', 'Kenya', 'China', 'Sweden', 'Brazil', 'Indonesia', 'Japan', 'UAE'];

const DIFF_COLORS: Record<string, string> = {
  beginner: 'text-green bg-green/10',
  intermediate: 'text-accent bg-accent/10',
  advanced: 'text-purple bg-purple/10',
};

export default function LibraryPage() {
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGeo, setSelectedGeo] = useState('All');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const loadResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/library/search', {
        params: {
          q: debouncedSearch || undefined,
          geography: selectedGeo !== 'All' ? selectedGeo : undefined,
        },
      });
      setResults(res.data.results);
      setTotal(res.data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedGeo]);

  useEffect(() => { loadResults(); }, [loadResults]);

  return (
    <div className="max-w-3xl mx-auto p-8 animate-fade-up">
      <h1 className="text-3xl font-bold text-text-primary mb-1">Case Library</h1>
      <p className="text-text-muted text-sm mb-6">{total} cases from 6 continents</p>

      <input
        type="text"
        placeholder="Search cases, companies, frameworks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent mb-4 transition-colors"
      />

      <div className="flex gap-2 flex-wrap mb-6">
        {GEO_FILTERS.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGeo(g)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              selectedGeo === g
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-border bg-card text-text-muted hover:text-text-secondary'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading cases...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No cases found for your search.</div>
      ) : (
        <div className="space-y-3">
          {results.map((cs) => (
            <div key={cs.id} className="bg-card border border-border rounded-xl p-5 hover:border-border-light transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-text-primary text-sm flex-1 pr-3 leading-snug">{cs.title}</h3>
                <span className="text-xl shrink-0">{cs.flag}</span>
              </div>
              <p className="text-text-muted text-xs mb-3">{cs.company} · {cs.geography}</p>
              <div className="flex gap-2 flex-wrap">
                {cs.frameworkTags?.slice(0, 2).map((tag: string) => (
                  <span key={tag} className="text-blue bg-blue/10 text-xs px-2 py-1 rounded">{tag}</span>
                ))}
                <span className="text-text-muted bg-card border border-border text-xs px-2 py-1 rounded">{cs.industry}</span>
                <span className={`text-xs px-2 py-1 rounded ${DIFF_COLORS[cs.difficulty] ?? 'text-text-muted'}`}>
                  {cs.difficulty?.charAt(0).toUpperCase() + cs.difficulty?.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
