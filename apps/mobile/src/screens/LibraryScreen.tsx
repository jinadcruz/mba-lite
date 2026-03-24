import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, radius, fontSize } from '../styles/tokens';
import { libraryApi } from '../api/client';

const GEO_FILTERS = ['All', '🇮🇳 India', '🇰🇪 Africa', '🇨🇳 China', '🇸🇪 Europe', '🇧🇷 LatAm', '🇯🇵 Japan', '🇦🇪 MENA'];

const DIFF_COLORS: Record<string, string> = {
  beginner: colors.green,
  intermediate: colors.accent,
  advanced: colors.purple,
};

export function LibraryScreen() {
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGeo, setSelectedGeo] = useState('All');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const loadResults = useCallback(async () => {
    setLoading(true);
    try {
      const geo = selectedGeo === 'All' ? undefined : selectedGeo.split(' ').slice(1).join(' ');
      const res = await libraryApi.search({
        q: debouncedSearch || undefined,
        geography: geo,
      });
      setResults(res.data.results);
      setTotal(res.data.total);
    } catch (e) {
      console.error('Library search failed:', e);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedGeo]);

  useEffect(() => { loadResults(); }, [loadResults]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Case Library</Text>
      <Text style={styles.subtitle}>{total}+ cases from 6 continents</Text>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Search cases, companies, frameworks..."
        placeholderTextColor={colors.textMuted}
      />

      {/* Geo filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {GEO_FILTERS.map((g) => (
          <TouchableOpacity
            key={g}
            onPress={() => setSelectedGeo(g)}
            style={[styles.filterChip, selectedGeo === g && styles.filterChipActive]}
          >
            <Text style={[styles.filterChipText, selectedGeo === g && styles.filterChipTextActive]}>
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : results.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.mutedText}>No cases found. Try a different search.</Text>
        </View>
      ) : (
        results.map((cs) => (
          <View key={cs.id} style={styles.caseCard}>
            <View style={styles.caseCardHeader}>
              <Text style={styles.caseTitle} numberOfLines={2}>{cs.title}</Text>
              <Text style={styles.caseFlag}>{cs.flag}</Text>
            </View>
            <Text style={styles.caseMeta}>{cs.company} · {cs.geography}</Text>
            <View style={styles.tagRow}>
              <View style={[styles.tag, { backgroundColor: colors.blueSoft }]}>
                <Text style={[styles.tagText, { color: colors.blue }]}>{cs.frameworkTags?.[0]}</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: colors.textMuted + '22' }]}>
                <Text style={[styles.tagText, { color: colors.textMuted }]}>{cs.industry}</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: (DIFF_COLORS[cs.difficulty] ?? colors.accent) + '22' }]}>
                <Text style={[styles.tagText, { color: DIFF_COLORS[cs.difficulty] ?? colors.accent }]}>
                  {cs.difficulty?.charAt(0).toUpperCase() + cs.difficulty?.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  center: { paddingVertical: spacing.xxxl, alignItems: 'center' },
  pageTitle: { fontSize: fontSize.h2, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: fontSize.base, color: colors.textMuted, marginBottom: spacing.xl },

  searchInput: { backgroundColor: colors.bgCard, borderRadius: radius.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, fontSize: fontSize.base, color: colors.textPrimary, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },

  filterScroll: { marginBottom: spacing.xl },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgCard, marginRight: spacing.sm },
  filterChipActive: { borderColor: colors.accent, backgroundColor: colors.accentGlow },
  filterChipText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.textMuted },
  filterChipTextActive: { color: colors.accent },

  caseCard: { backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  caseCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  caseTitle: { flex: 1, fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
  caseFlag: { fontSize: 20, marginLeft: spacing.sm },
  caseMeta: { fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.md },
  tagRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.sm },
  tagText: { fontSize: fontSize.xs },

  mutedText: { color: colors.textMuted, fontSize: fontSize.base },
});
