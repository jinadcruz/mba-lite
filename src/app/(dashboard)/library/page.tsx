'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui';
import { caseStudies } from '@/data/curriculum';

const geos = ['All', '🇮🇳 India', '🇰🇪 Africa', '🇨🇳 China', '🇸🇪 Europe', '🇧🇷 LatAm', '🇯🇵 Japan', '🇦🇪 MENA'];
const diffColor = { Beginner: 'green' as const, Intermediate: 'amber' as const, Advanced: 'purple' as const };

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [geo, setGeo] = useState('All');

  const filtered = caseStudies.filter(
    (c) =>
      (geo === 'All' || c.flag === geo.split(' ')[0]) &&
      (search === '' || c.title.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-[1200px] animate-fade-in">
      <div className="flex justify-between items-end mb-7">
        <div>
          <h1 className="text-[32px] font-bold text-zinc-50">Case Study Library</h1>
          <p className="text-sm text-zinc-500 mt-1.5">500+ original case studies from 6 continents</p>
        </div>
        <div className="relative w-80">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cases, companies, frameworks..."
            className="w-full pl-10 pr-3.5 py-2.5 rounded-[10px] border border-zinc-800 bg-[#131316] text-zinc-50 text-sm outline-none focus:border-zinc-600 transition"
          />
        </div>
      </div>

      {/* Geo Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {geos.map((g) => (
          <button
            key={g}
            onClick={() => setGeo(g)}
            className={`px-4 py-1.5 rounded-lg text-[13px] font-medium border transition ${
              geo === g ? 'border-amber-500/25 bg-amber-500/10 text-amber-500' : 'border-zinc-800 bg-[#131316] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {filtered.map((c, i) => (
          <div key={i} className="bg-[#131316] rounded-[14px] p-5 px-6 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[32px]">{c.flag}</span>
              <Badge color={diffColor[c.difficulty]}>{c.difficulty}</Badge>
            </div>
            <h3 className="text-lg font-semibold text-zinc-50 font-serif leading-tight mb-1">{c.title}</h3>
            <div className="text-[13px] text-zinc-500 mb-2.5">{c.company} · {c.geo}</div>
            <p className="text-[13px] text-zinc-400 leading-relaxed mb-3.5">{c.desc}</p>
            <div className="flex gap-1.5 flex-wrap">
              <Badge color="blue">{c.framework}</Badge>
              <Badge color="zinc">{c.industry}</Badge>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          <div className="text-4xl mb-4">🔍</div>
          <div className="text-lg font-semibold">No cases found</div>
          <div className="text-sm mt-1">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
}
