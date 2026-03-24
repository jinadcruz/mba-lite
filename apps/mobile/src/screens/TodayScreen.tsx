import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { colors, spacing, radius, fontSize } from '../styles/tokens';
import { Ring } from '../components/Ring';
import { todayApi, reviewApi, lessonsApi } from '../api/client';

type Screen = 'review' | 'lesson' | 'reading' | 'quiz';
type Confidence = 'easy' | 'medium' | 'hard';

export function TodayScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [screen, setScreen] = useState<Screen>('review');
  const [reviewIdx, setReviewIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizQuestion, setQuizQuestion] = useState(0);

  const loadData = useCallback(async () => {
    try {
      const res = await todayApi.getToday();
      setData(res.data);
      setScreen(res.data.reviewCards.length > 0 ? 'review' : 'lesson');
    } catch (e) {
      console.error('Failed to load today:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = () => { setRefreshing(true); loadData(); };

  const submitReview = async (confidence: Confidence) => {
    const card = data.reviewCards[reviewIdx];
    try { await reviewApi.submit(card.id, confidence); } catch { /* best-effort */ }
    setFlipped(false);
    if (reviewIdx + 1 < data.reviewCards.length) {
      setReviewIdx(reviewIdx + 1);
    } else {
      setScreen('lesson');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text style={styles.mutedText}>Failed to load today's content.</Text>
      </View>
    );
  }

  const { lesson, reviewCards, streak } = data;

  // ── Review Card Screen ──────────────────────────────────────────────────────
  if (screen === 'review' && reviewIdx < reviewCards.length) {
    const card = reviewCards[reviewIdx];
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewBadge}>
            <Text style={styles.reviewBadgeText}>DAILY REVIEW</Text>
          </View>
          <Text style={styles.reviewCount}>{reviewIdx + 1} of {reviewCards.length}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setFlipped(!flipped)}
          style={[styles.flashcard, flipped && styles.flashcardFlipped]}
          activeOpacity={0.9}
        >
          <Text style={styles.flashcardLabel}>
            {flipped ? 'Answer' : 'Question'} · {card.moduleTitle ?? 'MBA Lite'}
          </Text>
          <Text style={[styles.flashcardText, flipped && styles.flashcardAnswerText]}>
            {flipped ? card.answer : card.question}
          </Text>
          <Text style={styles.flashcardHint}>
            {flipped ? 'Rate your recall below' : 'Tap to reveal answer'}
          </Text>
        </TouchableOpacity>

        {flipped && (
          <View style={styles.confidenceRow}>
            {(['hard', 'medium', 'easy'] as Confidence[]).map((c) => {
              const confColors = {
                hard: colors.red, medium: colors.accent, easy: colors.green,
              };
              return (
                <TouchableOpacity
                  key={c}
                  onPress={() => submitReview(c)}
                  style={[styles.confButton, { borderColor: confColors[c] + '55', backgroundColor: confColors[c] + '22' }]}
                >
                  <Text style={[styles.confButtonText, { color: confColors[c] }]}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    );
  }

  // ── Lesson Screen ───────────────────────────────────────────────────────────
  if (screen === 'lesson') {
    const pct = lesson.orderNum / 25; // approximate progress
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateLabel}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
            <Text style={styles.pageTitle}>Today's Lesson</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakCount}>{streak.current}</Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </View>
        </View>

        {/* Module progress */}
        <View style={styles.moduleCard}>
          <Ring pct={pct} color={colors.blue} size={48} stroke={4} />
          <View style={styles.moduleInfo}>
            <Text style={styles.moduleLabel}>{lesson.moduleTitle}</Text>
            <Text style={styles.moduleLessonTitle}>{lesson.title}</Text>
            <Text style={styles.moduleMeta}>Lesson {lesson.orderNum} · {lesson.readTimeMinutes} min read</Text>
          </View>
        </View>

        {/* Lesson card */}
        <View style={styles.lessonCard}>
          <Text style={styles.lessonChip}>TODAY'S CONCEPT</Text>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonDesc} numberOfLines={3}>
            {lesson.concept?.text ?? ''}
          </Text>

          <View style={styles.pillRow}>
            <View style={[styles.pill, { backgroundColor: colors.blue + '22' }]}>
              <Text style={[styles.pillText, { color: colors.blue }]}>{lesson.readTimeMinutes} min read</Text>
            </View>
            <View style={[styles.pill, { backgroundColor: colors.green + '22' }]}>
              <Text style={[styles.pillText, { color: colors.green }]}>Case: {lesson.caseStudy?.company}</Text>
            </View>
            <View style={[styles.pill, { backgroundColor: colors.purple + '22' }]}>
              <Text style={[styles.pillText, { color: colors.purple }]}>5 Questions</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={() => setScreen('reading')}>
            <Text style={styles.startBtnText}>Start Lesson →</Text>
          </TouchableOpacity>
        </View>

        {/* Case study preview */}
        <View style={styles.casePreview}>
          <View style={styles.casePreviewHeader}>
            <Text style={styles.casePreviewLabel}>TODAY'S CASE STUDY</Text>
            <Text style={styles.caseFlag}>{lesson.caseStudy?.flag}</Text>
          </View>
          <Text style={styles.caseTitle}>{lesson.caseStudy?.title}</Text>
          <Text style={styles.caseSnippet} numberOfLines={3}>
            {lesson.caseStudy?.content?.substring(0, 160)}...
          </Text>
        </View>
      </ScrollView>
    );
  }

  // ── Reading Screen ──────────────────────────────────────────────────────────
  if (screen === 'reading') {
    const concept = lesson.concept;
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>{lesson.title}</Text>
        <Text style={styles.conceptBody}>{concept.text}</Text>

        {concept.formula && (
          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>{concept.formula}</Text>
          </View>
        )}

        {concept.keyPoints?.map((pt: string, i: number) => (
          <View key={i} style={styles.keyPoint}>
            <Text style={styles.keyPointBullet}>•</Text>
            <Text style={styles.keyPointText}>{pt}</Text>
          </View>
        ))}

        <Text style={[styles.pageTitle, { marginTop: spacing.xxl, fontSize: fontSize.xl }]}>
          Case Study: {lesson.caseStudy?.company} {lesson.caseStudy?.flag}
        </Text>
        <Text style={styles.caseGeo}>{lesson.caseStudy?.geography} · {lesson.caseStudy?.industry}</Text>
        <Text style={styles.caseStoryTitle}>{lesson.caseStudy?.title}</Text>
        <Text style={styles.conceptBody}>{lesson.caseStudy?.content}</Text>

        <View style={styles.discussionBox}>
          <Text style={styles.discussionLabel}>Discussion Prompt</Text>
          <Text style={styles.discussionText}>{lesson.caseStudy?.discussionPrompt}</Text>
        </View>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => { setSelectedAnswer(null); setQuizQuestion(0); setScreen('quiz'); }}
        >
          <Text style={styles.startBtnText}>Take Knowledge Check →</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ── Quiz Screen ─────────────────────────────────────────────────────────────
  if (screen === 'quiz') {
    const questions = lesson.knowledgeCheck?.questions ?? [];
    if (questions.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.mutedText}>No questions available.</Text>
        </View>
      );
    }
    const q = questions[quizQuestion];
    const isLast = quizQuestion === questions.length - 1;

    const handleAnswer = (idx: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(idx);
    };

    const handleNext = async () => {
      if (isLast) {
        const correctCount = questions.filter((_: any, i: number) => {
          const opts = questions[i].options;
          const correctIdx = opts.findIndex((o: any) => o.isCorrect);
          return selectedAnswer === correctIdx;
        }).length;
        try {
          await lessonsApi.completeLesson(lesson.id, {
            knowledgeCheckScore: correctCount,
            knowledgeCheckTotal: questions.length,
            timeSpentSeconds: 600,
          });
        } catch { /* best-effort */ }
        await loadData();
        setScreen('lesson');
        setQuizQuestion(0);
        setSelectedAnswer(null);
      } else {
        setQuizQuestion(quizQuestion + 1);
        setSelectedAnswer(null);
      }
    };

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.quizProgress}>QUESTION {quizQuestion + 1} OF {questions.length}</Text>
        <Text style={styles.quizQuestion}>{q.question}</Text>

        {q.options.map((opt: any, i: number) => {
          const isSelected = selectedAnswer === i;
          const showResult = selectedAnswer !== null;
          const isCorrect = opt.isCorrect;

          let bg = colors.bgCard;
          let border = colors.border;
          let textColor = colors.textSecondary;

          if (showResult && isCorrect) { bg = colors.greenSoft; border = colors.green; textColor = colors.green; }
          else if (showResult && isSelected && !isCorrect) { bg = colors.red + '22'; border = colors.red; textColor = colors.red; }
          else if (isSelected) { bg = colors.blueSoft; border = colors.blue; textColor = colors.blue; }

          return (
            <TouchableOpacity
              key={opt.label}
              style={[styles.optionBtn, { backgroundColor: bg, borderColor: border }]}
              onPress={() => handleAnswer(i)}
              activeOpacity={showResult ? 1 : 0.8}
            >
              <View style={[styles.optionLabel, { borderColor: border }]}>
                <Text style={{ color: textColor, fontWeight: '700', fontSize: fontSize.sm }}>
                  {opt.label}
                </Text>
              </View>
              <Text style={[styles.optionText, { color: textColor }]}>{opt.text}</Text>
            </TouchableOpacity>
          );
        })}

        {selectedAnswer !== null && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>{q.options[selectedAnswer]?.explanation}</Text>
          </View>
        )}

        {selectedAnswer !== null && (
          <TouchableOpacity style={styles.startBtn} onPress={handleNext}>
            <Text style={styles.startBtnText}>{isLast ? 'Complete Lesson ✓' : 'Next Question →'}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  center: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xxl },
  dateLabel: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '600', letterSpacing: 1.2, marginBottom: 4, textTransform: 'uppercase' },
  pageTitle: { fontSize: fontSize.h2, fontWeight: '700', color: colors.textPrimary },
  streakBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.accentGlow, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.full, borderWidth: 1, borderColor: colors.accent + '55' },
  streakIcon: { fontSize: 16 },
  streakCount: { color: colors.accent, fontWeight: '700', fontSize: fontSize.xl },
  streakLabel: { color: colors.textMuted, fontSize: fontSize.xs },

  // Module card
  moduleCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, backgroundColor: colors.bgCard, borderRadius: radius.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  moduleInfo: { flex: 1 },
  moduleLabel: { fontSize: fontSize.xs, color: colors.blue, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 },
  moduleLessonTitle: { fontSize: fontSize.xl, fontWeight: '600', color: colors.textPrimary },
  moduleMeta: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },

  // Lesson card
  lessonCard: { backgroundColor: colors.bgSurface, borderRadius: radius.xxl, padding: spacing.xxl, borderWidth: 1, borderColor: colors.borderLight, marginBottom: spacing.md },
  lessonChip: { fontSize: fontSize.xs, color: colors.accent, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: spacing.sm },
  lessonTitle: { fontSize: fontSize.xxxl, fontWeight: '700', color: colors.textPrimary, lineHeight: 30, marginBottom: spacing.sm },
  lessonDesc: { fontSize: fontSize.base, color: colors.textSecondary, lineHeight: 22, marginBottom: spacing.lg },
  pillRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap', marginBottom: spacing.xl },
  pill: { paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: radius.sm },
  pillText: { fontSize: fontSize.sm, fontWeight: '500' },
  startBtn: { backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: spacing.md, alignItems: 'center' },
  startBtnText: { color: '#000', fontWeight: '700', fontSize: fontSize.xl },

  // Case preview
  casePreview: { backgroundColor: colors.bgCard, borderRadius: radius.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  casePreviewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  casePreviewLabel: { fontSize: fontSize.xs, color: colors.green, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' },
  caseFlag: { fontSize: 20 },
  caseTitle: { fontSize: fontSize.xl, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
  caseSnippet: { fontSize: fontSize.base, color: colors.textSecondary, lineHeight: 22 },

  // Review card
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  reviewBadge: { backgroundColor: colors.accentGlow, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 6 },
  reviewBadgeText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.accent, letterSpacing: 1 },
  reviewCount: { fontSize: fontSize.sm, color: colors.textMuted },
  flashcard: { backgroundColor: colors.bgCard, borderRadius: radius.xxl, padding: spacing.xxxl, minHeight: 180, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  flashcardFlipped: { borderColor: colors.accent, backgroundColor: colors.bgSurface },
  flashcardLabel: { fontSize: fontSize.xs, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md },
  flashcardText: { fontSize: fontSize.xxl, color: colors.textPrimary, textAlign: 'center', lineHeight: 28 },
  flashcardAnswerText: { fontSize: fontSize.lg },
  flashcardHint: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: spacing.lg },
  confidenceRow: { flexDirection: 'row', gap: spacing.md },
  confButton: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.lg, borderWidth: 1, alignItems: 'center' },
  confButtonText: { fontWeight: '600', fontSize: fontSize.base },

  // Reading
  conceptBody: { fontSize: fontSize.base, color: colors.textSecondary, lineHeight: 26, marginBottom: spacing.lg },
  formulaBox: { backgroundColor: colors.bgSurface, borderRadius: radius.lg, padding: spacing.lg, borderLeftWidth: 3, borderLeftColor: colors.accent, marginBottom: spacing.lg },
  formulaText: { fontSize: fontSize.sm, color: colors.accent, fontFamily: 'monospace' },
  keyPoint: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  keyPointBullet: { color: colors.accent, fontSize: fontSize.base, fontWeight: '700' },
  keyPointText: { flex: 1, fontSize: fontSize.base, color: colors.textSecondary, lineHeight: 22 },
  caseGeo: { fontSize: fontSize.sm, color: colors.textMuted, marginBottom: 4, marginTop: 8 },
  caseStoryTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
  discussionBox: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xxl },
  discussionLabel: { fontSize: fontSize.xs, color: colors.accent, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  discussionText: { fontSize: fontSize.base, color: colors.textSecondary, lineHeight: 22, fontStyle: 'italic' },

  // Quiz
  quizProgress: { fontSize: fontSize.sm, color: colors.accent, fontWeight: '700', letterSpacing: 1, marginBottom: spacing.lg },
  quizQuestion: { fontSize: fontSize.xl, color: colors.textPrimary, lineHeight: 26, marginBottom: spacing.xl },
  optionBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, marginBottom: spacing.sm },
  optionLabel: { width: 28, height: 28, borderRadius: radius.sm, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  optionText: { flex: 1, fontSize: fontSize.base, lineHeight: 22 },
  explanationBox: { backgroundColor: colors.greenSoft, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.green + '55', marginBottom: spacing.lg },
  explanationText: { fontSize: fontSize.sm, color: colors.green, lineHeight: 20 },

  mutedText: { color: colors.textMuted, fontSize: fontSize.base },
});
