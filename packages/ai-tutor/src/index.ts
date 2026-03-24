import Anthropic from '@anthropic-ai/sdk';
import { Lesson, User, TutorMessage } from '@mba-lite/shared';
import {
  buildSystemPrompt,
  buildMessages,
  selectModel,
  MODELS,
} from './prompts.js';

export { buildSystemPrompt, buildMessages, selectModel, MODELS };

// ─── Tutor Service ────────────────────────────────────────────────────────────

export interface TutorContext {
  user: Pick<User, 'id' | 'name' | 'timezone'>;
  lesson: Lesson | null;
  conversationHistory: TutorMessage[];
  avgScore: number;
  modulesCompleted: number;
}

export interface TutorStreamCallbacks {
  onChunk: (text: string) => void;
  onComplete: (fullText: string) => void;
  onError: (error: Error) => void;
}

export class AiTutorService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async streamResponse(
    userMessage: string,
    context: TutorContext,
    callbacks: TutorStreamCallbacks
  ): Promise<void> {
    const { user, lesson, conversationHistory, avgScore, modulesCompleted } = context;

    const systemPrompt = buildSystemPrompt(user, lesson, avgScore, modulesCompleted);
    const messages = buildMessages(conversationHistory, userMessage);
    const modelTier = selectModel(conversationHistory.length, avgScore);
    const model = MODELS[modelTier];

    let fullText = '';

    try {
      const stream = this.client.messages.stream({
        model,
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      });

      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          const text = event.delta.text;
          fullText += text;
          callbacks.onChunk(text);
        }
      }

      callbacks.onComplete(fullText);
    } catch (err) {
      callbacks.onError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  async getResponse(
    userMessage: string,
    context: TutorContext
  ): Promise<string> {
    const { user, lesson, conversationHistory, avgScore, modulesCompleted } = context;

    const systemPrompt = buildSystemPrompt(user, lesson, avgScore, modulesCompleted);
    const messages = buildMessages(conversationHistory, userMessage);
    const modelTier = selectModel(conversationHistory.length, avgScore);
    const model = MODELS[modelTier];

    const response = await this.client.messages.create({
      model,
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected content type from LLM');
    return content.text;
  }
}
