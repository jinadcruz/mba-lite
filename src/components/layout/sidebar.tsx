'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
  { href: '/curriculum', label: 'Curriculum', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' },
  { href: '/library', label: 'Case Library', icon: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z' },
  { href: '/tutor', label: 'AI Tutor', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
  { href: '/profile', label: 'Profile', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-[240px] bg-[#0C0C0F] border-r border-zinc-800 flex flex-col p-3 shrink-0 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 py-2 mb-7">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-extrabold text-base text-black font-serif">
          M
        </div>
        <div>
          <div className="text-base font-bold text-zinc-50 leading-none">MBA Lite</div>
          <div className="text-[10px] text-zinc-500 font-mono tracking-wide">Your MBA, 15 min/day</div>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const activeOnDashboard = item.href === '/' && pathname === '/';

          const active = isActive || activeOnDashboard;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[9px] text-sm font-medium transition-all border-l-2 ${
                active
                  ? 'bg-amber-500/10 text-amber-500 font-semibold border-amber-500'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 border-transparent'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="border-t border-zinc-800 pt-4 mt-2">
        <div className="flex items-center gap-2.5 px-3.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-sm font-bold text-black">
            P
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-zinc-50">Priya Nair</div>
            <div className="text-[11px] text-zinc-500">Pro Plan</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
