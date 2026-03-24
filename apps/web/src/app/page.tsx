import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold text-text-primary">MBA Lite</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors">
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-accent text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
          >
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-2 text-accent text-sm font-semibold mb-8">
          🚀 Now in MVP Beta — Module 1 is completely free
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-tight mb-6 max-w-4xl">
          Your MBA,{' '}
          <span className="text-accent">15 Minutes</span>
          {' '}a Day.
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
          AI-powered micro-learning that distills Harvard, Wharton, and Stanford's MBA curriculum into
          daily bite-sized lessons — with a specialized track in AI management.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/register"
            className="bg-accent text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-400 transition-all hover:scale-105"
          >
            Start for Free →
          </Link>
          <Link
            href="/login"
            className="border border-border text-text-primary font-semibold text-lg px-8 py-4 rounded-xl hover:bg-card transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl w-full">
          {[
            { val: '500+', label: 'Global Case Studies' },
            { val: '17', label: 'Modules' },
            { val: '380+', label: 'Lessons' },
            { val: '$19.99/mo', label: 'vs. $150K MBA' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-accent font-mono">{s.val}</div>
              <div className="text-sm text-text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Features */}
      <section className="border-t border-border px-6 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '📚',
              title: 'Core MBA Curriculum',
              desc: '8 modules covering finance, strategy, marketing, operations, and more — aligned with HBS, Wharton, and Stanford GSB.',
            },
            {
              icon: '🤖',
              title: 'AI Management Track',
              desc: '9 modules on AI strategy, product management, governance, and organizational transformation — the skills top programs haven\'t caught up to.',
            },
            {
              icon: '✨',
              title: 'Adaptive AI Tutor',
              desc: 'A Socratic AI professor powered by Claude that adapts to your level and challenges your thinking — available 24/7.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-2xl p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{f.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-text-muted text-sm">
        © 2026 MBA Lite · MIT License ·{' '}
        <Link href="/login" className="hover:text-text-secondary transition-colors">Sign In</Link>
      </footer>
    </div>
  );
}
