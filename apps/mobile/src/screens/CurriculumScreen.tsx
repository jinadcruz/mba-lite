import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, radius, fontSize } from '../styles/tokens';
import { Ring } from '../components/Ring';
import { modulesApi } from '../api/client';

type Track = 'core' | 'ai';

export function CurriculumScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTrack, setActiveTrack] = useState<Track>('core');

  useEffect(() => {
    modulesApi.getModules()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  const modules = activeTrack === 'core' ? (data?.core ?? []) : (data?.aiManagement ?? []);

  const totalCompleted = modules.filter((m: any) => m.status === 'complete').length;
  const totalLessons = modules.reduce((s: number, m: any) => s + (m.lessonsCompleted ?? 0), 0);
  const avgScore = 82; // TODO: from progress stats

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Curriculum</Text>
      <Text style={styles.subtitle}>Aligned with HBS · Wharton · Stanford GSB</Text>

      {/* Track toggle */}
      <View style={styles.trackToggle}>
        {(['core', 'ai'] as Track[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.trackBtn, activeTrack === t && styles.trackBtnActive]}
            onPress={() => setActiveTrack(t)}
          >
            <Text style={[styles.trackBtnText, activeTrack === t && styles.trackBtnTextActive]}>
              {t === 'core' ? 'Core MBA (8)' : 'AI Management (9)'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {[
          { label: 'Completed', val: `${totalCompleted}/${modules.length}`, color: colors.green },
          { label: 'Lessons Done', val: `${totalLessons}`, color: colors.blue },
          { label: 'Avg Score', val: `${avgScore}%`, color: colors.accent },
        ].map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Module list */}
      {modules.map((m: any) => {
        const pct = m.lessonsTotal > 0 ? m.lessonsCompleted / m.lessonsTotal : 0;
        const isComplete = m.status === 'complete';
        const isActive = m.status === 'in_progress';
        const isLocked = m.status === 'locked';
        const isAvailable = m.status === 'available';

        return (
          <View
            key={m.id}
            style={[
              styles.moduleRow,
              isActive && styles.moduleRowActive,
              isLocked && styles.moduleRowLocked,
            ]}
          >
            <Text style={styles.moduleIcon}>{m.icon}</Text>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleTitle}>{m.title}</Text>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill,
                  { width: `${pct * 100}%` as any, backgroundColor: isComplete ? colors.green : colors.accent },
                ]} />
              </View>
              <Text style={styles.moduleMeta}>
                {isComplete ? 'Completed ✓' : isLocked ? 'Locked' : `${m.lessonsCompleted}/${m.lessonsTotal} lessons`}
              </Text>
            </View>
            <View style={styles.moduleStatus}>
              {isComplete && (
                <View style={styles.completeBadge}>
                  <Text style={{ color: colors.green, fontSize: 14 }}>✓</Text>
                </View>
              )}
              {(isActive) && <Ring pct={pct} size={36} stroke={3} />}
              {isLocked && <Text style={{ color: colors.textMuted, fontSize: 16 }}>🔒</Text>}
              {isAvailable && (
                <View style={styles.availableBadge}>
                  <Text style={{ color: colors.blue, fontSize: 12 }}>▶</Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  center: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },

  pageTitle: { fontSize: fontSize.h2, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: fontSize.base, color: colors.textMuted, marginBottom: spacing.xl },

  trackToggle: { flexDirection: 'row', backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: 4, marginBottom: spacing.xxl, borderWidth: 1, borderColor: colors.border },
  trackBtn: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center' },
  trackBtnActive: { backgroundColor: colors.accent },
  trackBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textMuted },
  trackBtnTextActive: { color: '#000' },

  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xxl },
  statCard: { flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  statVal: { fontSize: fontSize.xxl, fontWeight: '700' },
  statLabel: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },

  moduleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: 14, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  moduleRowActive: { backgroundColor: colors.bgSurface, borderColor: colors.accent + '66' },
  moduleRowLocked: { opacity: 0.5 },
  moduleIcon: { fontSize: 24, width: 36, textAlign: 'center' },
  moduleInfo: { flex: 1 },
  moduleTitle: { fontSize: fontSize.base, fontWeight: '600', color: colors.textPrimary, marginBottom: 6 },
  progressBar: { height: 4, backgroundColor: colors.border, borderRadius: 2, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: '100%', borderRadius: 2 },
  moduleMeta: { fontSize: fontSize.xs, color: colors.textMuted },
  moduleStatus: { width: 36, alignItems: 'center', justifyContent: 'center' },
  completeBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.greenSoft, justifyContent: 'center', alignItems: 'center' },
  availableBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.blueSoft, justifyContent: 'center', alignItems: 'center' },
});
