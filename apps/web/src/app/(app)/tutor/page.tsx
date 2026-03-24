'use client';

import { useState, useRef, useEffect } from 'react';
import { api } from '@/lib/api';

interface Message {
  role: 'user' | 'tutor';
  content: string;
}

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'tutor',
      content:
        "Welcome! I'm your MBA Lite tutor. I use the Socratic method — I'll ask questions to help you discover the answers yourself.\n\nWhat would you like to explore today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isThinking) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsThinking(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('mba_lite_token') : null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1'}/tutor/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: text, conversationId }),
        }
      );

      if (!response.ok) throw new Error('Request failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      setMessages((prev) => [...prev, { role: 'tutor', content: '' }]);
      setIsThinking(false);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          for (const line of chunk.split('\n')) {
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
              } else if (data.type === 'done' && data.conversationId) {
                setConversationId(data.conversationId);
              }
            } catch { /* skip */ }
          }
        }
      }
    } catch (err: any) {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { role: 'tutor', content: 'I\'m having trouble connecting. Please try again in a moment.' },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-border shrink-0">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-lg">✨</div>
        <div>
          <p className="font-semibold text-text-primary">MBA Lite Tutor</p>
          <p className="text-xs text-green">● Active · Socratic Mode</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-[#1e3a5f] border border-[#2a4a6f] text-text-primary rounded-br-sm'
                  : 'bg-card border border-border text-text-primary rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-text-muted inline-block animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border flex gap-3 items-end shrink-0">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your MBA tutor anything... (Enter to send)"
          rows={1}
          className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted text-sm resize-none focus:outline-none focus:border-accent transition-colors max-h-32"
          style={{ minHeight: 44 }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isThinking}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
            input.trim() && !isThinking ? 'bg-accent text-black hover:bg-amber-400' : 'bg-card border border-border text-text-muted'
          }`}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
