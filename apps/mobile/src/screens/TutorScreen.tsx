import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, radius, fontSize } from '../styles/tokens';
import { getToken } from '../api/client';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:3001/api/v1';

interface Message {
  role: 'user' | 'tutor';
  content: string;
}

export function TutorScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'tutor',
      content: "Welcome! I'm your MBA Lite tutor. I use the Socratic method — I'll ask questions to help you discover the answers yourself.\n\nWhat would you like to explore today? You can ask me about a specific concept, work through a case study, or apply a framework to your own situation.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isThinking]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isThinking) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsThinking(true);

    try {
      const token = await getToken();
      const response = await fetch(`${BASE_URL}/tutor/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
          conversationId,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message ?? 'Request failed');
      }

      // Read SSE stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      // Add empty tutor message that we'll fill in
      setMessages((prev) => [...prev, { role: 'tutor', content: '' }]);
      setIsThinking(false);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'chunk') {
                accumulated += data.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'tutor', content: accumulated };
                  return updated;
                });
              } else if (data.type === 'done') {
                if (data.conversationId) setConversationId(data.conversationId);
              }
            } catch { /* skip malformed events */ }
          }
        }
      }
    } catch (err: any) {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { role: 'tutor', content: `I'm having trouble connecting right now. Please try again in a moment. (${err.message})` },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.tutorAvatar}>
          <Text style={{ fontSize: 18 }}>✨</Text>
        </View>
        <View>
          <Text style={styles.tutorName}>MBA Lite Tutor</Text>
          <Text style={styles.tutorStatus}>● Active · Socratic Mode</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[styles.messageRow, msg.role === 'user' ? styles.messageRowUser : styles.messageRowTutor]}
          >
            <View style={[
              styles.bubble,
              msg.role === 'user' ? styles.bubbleUser : styles.bubbleTutor,
            ]}>
              <Text style={[styles.bubbleText, msg.role === 'user' && styles.bubbleTextUser]}>
                {msg.content}
              </Text>
            </View>
          </View>
        ))}

        {isThinking && (
          <View style={[styles.messageRow, styles.messageRowTutor]}>
            <View style={[styles.bubble, styles.bubbleTutor]}>
              <View style={styles.thinkingDots}>
                {[0, 1, 2].map((i) => (
                  <View key={i} style={styles.dot} />
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask your MBA tutor anything..."
          placeholderTextColor={colors.textMuted}
          multiline
          maxLength={2000}
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[styles.sendBtn, input.trim() ? styles.sendBtnActive : styles.sendBtnInactive]}
          onPress={sendMessage}
          disabled={!input.trim() || isThinking}
        >
          {isThinking ? (
            <ActivityIndicator size="small" color={colors.textMuted} />
          ) : (
            <Text style={{ fontSize: 18, color: input.trim() ? '#000' : colors.textMuted }}>▶</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  tutorAvatar: { width: 40, height: 40, borderRadius: radius.lg, backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center' },
  tutorName: { fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
  tutorStatus: { fontSize: fontSize.xs, color: colors.green },

  messages: { flex: 1 },
  messagesContent: { padding: spacing.lg, paddingBottom: spacing.sm },

  messageRow: { marginBottom: spacing.md },
  messageRowUser: { alignItems: 'flex-end' },
  messageRowTutor: { alignItems: 'flex-start' },

  bubble: { maxWidth: '85%', padding: spacing.md, borderRadius: 14 },
  bubbleUser: { backgroundColor: '#1e3a5f', borderBottomRightRadius: 4, borderWidth: 1, borderColor: '#2a4a6f' },
  bubbleTutor: { backgroundColor: colors.bgCard, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: colors.border },
  bubbleText: { fontSize: fontSize.base, color: colors.textPrimary, lineHeight: 22 },
  bubbleTextUser: { color: colors.textPrimary },

  thinkingDots: { flexDirection: 'row', gap: 4, padding: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.textMuted },

  inputArea: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.md, padding: spacing.md, paddingBottom: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  input: { flex: 1, backgroundColor: colors.bgCard, borderRadius: radius.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, fontSize: fontSize.base, color: colors.textPrimary, borderWidth: 1, borderColor: colors.border, maxHeight: 120 },
  sendBtn: { width: 44, height: 44, borderRadius: radius.lg, justifyContent: 'center', alignItems: 'center' },
  sendBtnActive: { backgroundColor: colors.accent },
  sendBtnInactive: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border },
});
