import { ReviewConfidence, SRS } from '@mba-lite/shared';

// ─── SM-2 Algorithm ──────────────────────────────────────────────────────────
// Based on SuperMemo SM-2: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2

export interface SRSResult {
  intervalDays: number;
  easeFactor: number;
  nextReviewAt: Date;
}

/**
 * Calculate the next review schedule using a modified SM-2 algorithm.
 *
 * @param confidence - User's self-reported recall confidence
 * @param currentInterval - Current interval in days
 * @param currentEaseFactor - Current ease factor (default 2.5)
 * @param reviewCount - Number of times this card has been reviewed
 */
export function calculateNextReview(
  confidence: ReviewConfidence,
  currentInterval: number,
  currentEaseFactor: number,
  reviewCount: number
): SRSResult {
  // Map confidence to SM-2 quality score (0-5)
  const qualityMap: Record<ReviewConfidence, number> = {
    hard: 1,
    medium: 3,
    easy: 5,
  };
  const quality = qualityMap[confidence];

  let newInterval: number;
  let newEaseFactor = currentEaseFactor;

  if (quality < 3) {
    // Failed recall: reset to beginning
    newInterval = 1;
    newEaseFactor = Math.max(SRS.MIN_EASE_FACTOR, currentEaseFactor + 0.1 * (quality - 5));
  } else {
    // Successful recall: increase interval
    if (reviewCount === 0) {
      newInterval = 1;
    } else if (reviewCount === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(currentInterval * currentEaseFactor);
    }

    // Apply easy bonus
    if (quality === 5) {
      newInterval = Math.round(newInterval * SRS.EASY_BONUS);
    }

    // Update ease factor based on performance
    newEaseFactor = Math.max(
      SRS.MIN_EASE_FACTOR,
      currentEaseFactor + 0.1 * (quality - 5) * (quality - 4)
    );
  }

  // Cap at maximum interval
  newInterval = Math.min(newInterval, SRS.MAX_INTERVAL);

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + newInterval);

  return {
    intervalDays: newInterval,
    easeFactor: parseFloat(newEaseFactor.toFixed(2)),
    nextReviewAt,
  };
}

/**
 * Generate review cards from a completed lesson.
 * Extracts key concept questions.
 */
export function generateReviewCards(lessonId: string, keyPoints: string[]): ReviewCardSeed[] {
  return keyPoints.map((point, i) => ({
    lessonId,
    question: extractQuestion(point),
    answer: extractAnswer(point),
    sortOrder: i,
  }));
}

export interface ReviewCardSeed {
  lessonId: string;
  question: string;
  answer: string;
  sortOrder: number;
}

function extractQuestion(keyPoint: string): string {
  // Simple heuristic: if the key point contains ":", split on it
  const colonIdx = keyPoint.indexOf(':');
  if (colonIdx > 0) {
    return `What is ${keyPoint.substring(0, colonIdx).trim()}?`;
  }
  return `What do you know about: ${keyPoint.trim()}?`;
}

function extractAnswer(keyPoint: string): string {
  const colonIdx = keyPoint.indexOf(':');
  if (colonIdx > 0) {
    return keyPoint.substring(colonIdx + 1).trim();
  }
  return keyPoint.trim();
}

/**
 * Get cards due for review by a specific date.
 */
export function isDueForReview(nextReviewAt: Date, asOf: Date = new Date()): boolean {
  return nextReviewAt <= asOf;
}
