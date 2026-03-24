'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { removeToken } from '@/lib/api';

const NAV_ITEMS = [
  { href: '/today', label: 'Today', icon: '⏱' },
  { href: '/curriculum', label: 'Curriculum', icon: '📖' },
  { href: '/library', label: 'Library', icon: '🗂' },
  { href: '/tutor', label: 'Tutor', icon: '💬' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('mba_lite_token');
      if (!token) router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card shrink-0">
        <div className="p-6 border-b border-border">
          <Link href="/today" className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-text-primary text-lg">MBA Lite</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full text-sm text-text-muted hover:text-red transition-colors text-left px-3 py-2"
          >
            ← Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Bottom nav (mobile) */}
        <nav className="md:hidden flex border-t border-border bg-bg">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-text-muted'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
                {isActive && <span className="w-1 h-1 rounded-full bg-accent mt-1" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
