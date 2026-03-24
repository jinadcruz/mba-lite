'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function TodayPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState<'lesson' | 'reading' | 'quiz'>('lesson');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizQuestion, setQuizQuestion] = useState(0);

  useEffect(() => {
    api.get('/today')
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-text-muted">Failed to load today's content.</div>
    );
  }

  const { lesson, reviewCards, streak } = data;

  if (screen === 'reading') {
    const concept = lesson.concept;
    return (
      <div className="max-w-3xl mx-auto p-8 animate-fade-up">
        <button onClick={() => setScreen('lesson')} className="text-text-muted text-sm mb-6 hover:text-text-secondary">
          ← Back to lesson
        </button>
        <h1 className="text-3xl font-bold text-text-primary mb-6">{lesson.title}</h1>
        <p className="text-text-secondary leading-relaxed mb-6">{concept.text}</p>

        {concept.formula && (
          <div className="bg-surface border-l-4 border-accent rounded-xl p-5 mb-6 font-mono text-accent text-sm">
            {concept.formula}
          </div>
        )}

        <ul className="space-y-3 mb-8">
          {concept.keyPoints?.map((pt: string, i: number) => (
            <li key={i} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
              <span className="text-accent font-bold shrink-0">•</span>
              {pt}
            </li>
          ))}
        </ul>

        <div className="border-t border-border pt-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-text-primary">Case Study: {lesson.caseStudy?.company}</h2>
            <span className="text-2xl">{lesson.caseStudy?.flag}</span>
          </div>
          <p className="text-text-muted text-sm mb-3">{lesson.caseStudy?.geography} · {lesson.caseStudy?.industry}</p>
          <h3 className="text-lg font-semibold text-text-primary mb-4">{lesson.caseStudy?.title}</h3>
          <p className="text-text-secondary leading-relaxed mb-6">{lesson.caseStudy?.content}</p>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-accent font-bold uppercase tracking-wider mb-2">Discussion Prompt</p>
            <p className="text-text-secondary italic text-sm leading-relaxed">{lesson.caseStudy?.discussionPrompt}</p>
          </div>
        </div>

        <button
          onClick={() => { setQuizQuestion(0); setSelectedAnswer(null); setScreen('quiz'); }}
          className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-amber-400 transition-colors"
        >
          Take Knowledge Check →
        </button>
      </div>
    );
  }

  if (screen === 'quiz') {
    const questions = lesson.knowledgeCheck?.questions ?? [];
    const q = questions[quizQuestion];
    if (!q) return null;

    const handleAnswer = async (idx: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(idx);
    };

    const handleNext = async () => {
      const isLast = quizQuestion === questions.length - 1;
      if (isLast) {
        try {
          await api.post(`/lessons/${lesson.id}/complete`, {
            knowledgeCheckScore: 4,
            knowledgeCheckTotal: questions.length,
            timeSpentSeconds: 600,
          });
        } catch { /* best-effort */ }
        setScreen('lesson');
        setQuizQuestion(0);
        setSelectedAnswer(null);
      } else {
        setQuizQuestion(quizQuestion + 1);
        setSelectedAnswer(null);
      }
    };

    return (
      <div className="max-w-2xl mx-auto p-8 animate-fade-up">
        <p className="text-accent text-xs font-bold tracking-wider uppercase mb-6">
          Question {quizQuestion + 1} of {questions.length}
        </p>
        <h2 className="text-xl text-text-primary leading-relaxed mb-6">{q.question}</h2>

        <div className="space-y-3 mb-6">
          {q.options.map((opt: any, i: number) => {
            const isSelected = selectedAnswer === i;
            const showResult = selectedAnswer !== null;
            const isCorrect = opt.isCorrect;

            let className = 'flex items-center gap-3 p-4 rounded-xl border text-sm cursor-pointer transition-all ';
            if (showResult && isCorrect) className += 'bg-green/10 border-green text-green';
            else if (showResult && isSelected) className += 'bg-red/10 border-red text-red';
            else if (isSelected) className += 'bg-blue/10 border-blue text-blue';
            else className += 'bg-card border-border text-text-secondary hover:border-border-light';

            return (
              <button key={opt.label} onClick={() => handleAnswer(i)} className={className}>
                <span className="w-7 h-7 rounded-md border border-current flex items-center justify-center font-bold text-xs shrink-0">
                  {showResult && isCorrect ? '✓' : opt.label}
                </span>
                {opt.text}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <>
            <div className="bg-green/10 border border-green/30 rounded-xl p-4 mb-4 text-green text-sm leading-relaxed">
              {q.options[selectedAnswer]?.explanation}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-amber-400 transition-colors"
            >
              {quizQuestion === questions.length - 1 ? 'Complete Lesson ✓' : 'Next Question →'}
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-3xl font-bold text-text-primary">Today's Lesson</h1>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-2">
          <span>🔥</span>
          <span className="font-bold font-mono text-accent">{streak?.current ?? 0}</span>
          <span className="text-text-muted text-xs">day streak</span>
        </div>
      </div>

      {/* Review cards notice */}
      {reviewCards?.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-lg">🃏</span>
          <div>
            <p className="text-sm font-semibold text-text-primary">{reviewCards.length} review cards due</p>
            <p className="text-xs text-text-muted">Complete your lesson first, then review</p>
          </div>
        </div>
      )}

      {/* Lesson card */}
      <div className="bg-surface border border-border-light rounded-2xl p-8 mb-6">
        <p className="text-accent text-xs font-bold uppercase tracking-wider mb-3">
          {lesson.moduleTitle}
        </p>
        <h2 className="text-2xl font-bold text-text-primary mb-3 leading-tight">{lesson.title}</h2>
        <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3">{lesson.concept?.text}</p>

        <div className="flex gap-2 flex-wrap mb-6">
          <span className="text-blue bg-blue/10 text-xs px-3 py-1 rounded-md font-medium">{lesson.readTimeMinutes} min read</span>
          <span className="text-green bg-green/10 text-xs px-3 py-1 rounded-md font-medium">Case: {lesson.caseStudy?.company}</span>
          <span className="text-purple bg-purple/10 text-xs px-3 py-1 rounded-md font-medium">5 Questions</span>
        </div>

        <button
          onClick={() => setScreen('reading')}
          className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-amber-400 transition-colors"
        >
          Start Lesson →
        </button>
      </div>

      {/* Case study preview */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-green text-xs font-bold uppercase tracking-wider">Today's Case Study</span>
          <span className="text-xl">{lesson.caseStudy?.flag}</span>
        </div>
        <h3 className="text-base font-bold text-text-primary mb-2">{lesson.caseStudy?.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
          {lesson.caseStudy?.content?.substring(0, 180)}...
        </p>
      </div>
    </div>
  );
}
