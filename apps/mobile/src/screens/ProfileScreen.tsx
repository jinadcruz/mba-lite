import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { colors, spacing, radius, fontSize } from '../styles/tokens';
import { progressApi } from '../api/client';
import { useAuth } from '../context/AuthContext';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MOCK_HEIGHTS = [65, 80, 50, 70, 90, 30, 0]; // replace with real data in future

export function ProfileScreen() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressApi.getStats()
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: logout },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  const initial = (user?.name ?? 'U').charAt(0).toUpperCase();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{user?.name ?? 'Student'}</Text>
          <Text style={styles.userMeta}>{user?.email}</Text>
          <Text style={styles.userTier}>
            {user?.subscriptionTier === 'free' ? 'Free Tier' : '⭐ Pro Subscriber'}
          </Text>
        </View>
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        {[
          { label: 'Current Streak', val: `${stats?.currentStreak ?? 0}`, icon: '🔥', color: colors.accent },
          { label: 'Longest Streak', val: `${stats?.longestStreak ?? 0}`, icon: '⭐', color: colors.accent },
          { label: 'Lessons Done', val: `${stats?.lessonsCompleted ?? 0}`, icon: '📚', color: colors.blue },
          { label: 'Avg Score', val: `${stats?.averageScore ?? 0}%`, icon: '🎯', color: colors.green },
          { label: 'Cards Due', val: `${stats?.reviewCardsDue ?? 0}`, icon: '🃏', color: colors.purple },
          { label: 'Modules Done', val: `${stats?.modulesCompleted ?? 0}/${stats?.modulesTotal ?? 17}`, icon: '🏆', color: colors.blue },
        ].map((s) => (
          <View key={s.label} style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Text style={{ fontSize: 22 }}>{s.icon}</Text>
              <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
            </View>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Weekly activity */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Activity</Text>
        <View style={styles.activityChart}>
          {DAYS.map((day, i) => {
            const isToday = i === new Date().getDay() - 1;
            const h = MOCK_HEIGHTS[i];
            return (
              <View key={day} style={styles.activityBar}>
                <View style={styles.barBg}>
                  <View style={[
                    styles.barFill,
                    {
                      height: `${h}%` as any,
                      backgroundColor: h > 0 ? (isToday ? colors.accent : colors.blue) : colors.border,
                    },
                  ]} />
                </View>
                <Text style={[styles.barLabel, isToday && { color: colors.accent }]}>{day}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Certificates */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Certificates</Text>
        {stats?.certificates?.length > 0 ? (
          stats.certificates.map((cert: any) => (
            <View key={cert.id} style={styles.certRow}>
              <View style={styles.certIcon}>
                <Text style={{ fontSize: 22 }}>🎓</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.certTitle}>{cert.title}</Text>
                <Text style={styles.certDate}>
                  Completed · {new Date(cert.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.mutedText}>Complete a full module to earn your first certificate.</Text>
        )}
      </View>

      {/* Settings */}
      <View style={[styles.card, { padding: 0, overflow: 'hidden' }]}>
        {[
          'Notification Preferences',
          'Subscription & Billing',
          'Download Offline Lessons',
          'Privacy & Data',
          'Help & Feedback',
        ].map((item, i, arr) => (
          <TouchableOpacity
            key={item}
            style={[styles.settingsRow, i < arr.length - 1 && styles.settingsRowBorder]}
          >
            <Text style={styles.settingsText}>{item}</Text>
            <Text style={{ color: colors.textMuted }}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: 48 },
  center: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },

  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.xxl },
  avatar: { width: 64, height: 64, borderRadius: 16, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28, fontWeight: '700', color: '#000' },
  userName: { fontSize: fontSize.xxxl, fontWeight: '700', color: colors.textPrimary },
  userMeta: { fontSize: fontSize.sm, color: colors.textMuted },
  userTier: { fontSize: fontSize.sm, color: colors.green, marginTop: 2 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.xxl },
  statCard: { width: '47%', backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  statCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  statVal: { fontSize: fontSize.xxl, fontWeight: '700' },
  statLabel: { fontSize: fontSize.xs, color: colors.textMuted },

  card: { backgroundColor: colors.bgCard, borderRadius: radius.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  cardTitle: { fontSize: fontSize.base, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.lg },

  activityChart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 80 },
  activityBar: { flex: 1, alignItems: 'center', gap: 6 },
  barBg: { flex: 1, width: 28, borderRadius: 6, overflow: 'hidden', justifyContent: 'flex-end' },
  barFill: { width: '100%', borderRadius: 6, minHeight: 4 },
  barLabel: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '400' },

  certRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.sm, backgroundColor: colors.bgSurface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.green + '33', marginBottom: spacing.sm },
  certIcon: { width: 44, height: 44, borderRadius: radius.lg, backgroundColor: colors.greenSoft, justifyContent: 'center', alignItems: 'center' },
  certTitle: { fontSize: fontSize.base, fontWeight: '600', color: colors.textPrimary },
  certDate: { fontSize: fontSize.sm, color: colors.green },

  settingsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  settingsRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  settingsText: { fontSize: fontSize.base, color: colors.textSecondary },

  logoutBtn: { backgroundColor: colors.red + '22', borderRadius: radius.lg, paddingVertical: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.red + '55', marginTop: spacing.sm },
  logoutText: { color: colors.red, fontWeight: '600', fontSize: fontSize.base },

  mutedText: { color: colors.textMuted, fontSize: fontSize.base },
});
