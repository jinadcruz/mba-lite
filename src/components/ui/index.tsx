'use client';

import { useEffect, useState } from 'react';

// ─── Badge ───────────────────────────────────────────────────

export function Badge({
  children,
  color = 'zinc',
}: {
  children: React.ReactNode;
  color?: 'amber' | 'green' | 'blue' | 'purple' | 'red' | 'zinc';
}) {
  const colorMap = {
    amber: 'text-amber-500 bg-amber-500/10',
    green: 'text-emerald-500 bg-emerald-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
    purple: 'text-violet-400 bg-violet-400/10',
    red: 'text-red-500 bg-red-500/10',
    zinc: 'text-zinc-500 bg-zinc-500/10',
  };

  return (
    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-[5px] tracking-wide whitespace-nowrap ${colorMap[color]}`}>
      {children}
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────────────────

export function StatCard({
  label,
  value,
  icon,
  color = 'text-zinc-50',
}: {
  label: string;
  value: React.ReactNode;
  icon?: string;
  color?: string;
}) {
  return (
    <div className="bg-[#131316] rounded-xl p-5 border border-zinc-800 flex-1 min-w-0">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[13px] text-zinc-500">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className={`text-[28px] font-bold font-mono leading-none ${color}`}>{value}</div>
    </div>
  );
}

// ─── Progress Ring ───────────────────────────────────────────

export function ProgressRing({
  pct,
  size = 44,
  stroke = 3.5,
  color = '#F59E0B',
  label,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#27272A" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {label && (
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-mono" style={{ color }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ─── Animated Counter ────────────────────────────────────────

export function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1200, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <>{val}{suffix}</>;
}
