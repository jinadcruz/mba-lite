import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing, radius, fontSize } from '../styles/tokens';
import { useAuth } from '../context/AuthContext';

type Mode = 'login' | 'register';

export function LoginScreen() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || (mode === 'register' && !name)) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (err: any) {
      const msg = err.response?.data?.error?.message ?? err.message ?? 'Something went wrong.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoArea}>
          <Text style={styles.logo}>🎓</Text>
          <Text style={styles.appName}>MBA Lite</Text>
          <Text style={styles.tagline}>Your MBA, 15 Minutes a Day.</Text>
        </View>

        {/* Tab */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, mode === 'login' && styles.tabActive]}
            onPress={() => setMode('login')}
          >
            <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, mode === 'register' && styles.tabActive]}
            onPress={() => setMode('register')}
          >
            <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {mode === 'register' && (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Full name"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="words"
            />
          )}
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder={mode === 'register' ? 'Password (min. 8 chars)' : 'Password'}
            placeholderTextColor={colors.textMuted}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.submitBtnText}>
                {mode === 'login' ? 'Sign In →' : 'Start Learning →'}
              </Text>
            )}
          </TouchableOpacity>

          {mode === 'login' && (
            <Text style={styles.forgotText}>Forgot password?</Text>
          )}
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          {mode === 'register'
            ? 'By creating an account you agree to our Terms of Service and Privacy Policy.'
            : 'New to MBA Lite? Tap "Create Account" above — Module 1 is free.'}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingTop: 80, paddingBottom: 48 },

  logoArea: { alignItems: 'center', marginBottom: spacing.xxxl },
  logo: { fontSize: 56, marginBottom: spacing.md },
  appName: { fontSize: 32, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.5 },
  tagline: { fontSize: fontSize.base, color: colors.textMuted, marginTop: 4 },

  tabRow: { flexDirection: 'row', backgroundColor: colors.bgCard, borderRadius: radius.lg, padding: 4, marginBottom: spacing.xxl, borderWidth: 1, borderColor: colors.border },
  tab: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center' },
  tabActive: { backgroundColor: colors.accent },
  tabText: { fontSize: fontSize.base, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: '#000' },

  form: { gap: spacing.md, marginBottom: spacing.xxl },
  input: { backgroundColor: colors.bgCard, borderRadius: radius.lg, paddingHorizontal: spacing.lg, paddingVertical: 14, fontSize: fontSize.base, color: colors.textPrimary, borderWidth: 1, borderColor: colors.border },
  submitBtn: { backgroundColor: colors.accent, borderRadius: radius.lg, paddingVertical: 14, alignItems: 'center', marginTop: spacing.sm },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: '#000', fontWeight: '700', fontSize: fontSize.xl },
  forgotText: { textAlign: 'center', color: colors.textMuted, fontSize: fontSize.sm, marginTop: spacing.sm },

  footerText: { textAlign: 'center', color: colors.textMuted, fontSize: fontSize.sm, lineHeight: 20 },
});
