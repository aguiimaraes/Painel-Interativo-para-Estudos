import { SpacedFlashcard } from '../types';

/**
 * SM-2 Spaced Repetition Algorithm Implementation
 * Grades:
 * 0 - Errei / Again: Failed recall, resets interval to 1 day
 * 1 - Difícil / Hard: Successful but difficult, small interval increment
 * 2 - Bom / Good: Standard successful recall, standard SM-2 multiplier
 * 3 - Fácil / Easy: Effortless recall, bonus multiplier and ease increment
 */
export function calculateSM2(
  card: SpacedFlashcard,
  grade: 0 | 1 | 2 | 3
): SpacedFlashcard {
  let { repetitions, easeFactor, interval } = card;
  const today = new Date();

  if (grade === 0) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = grade === 1 ? 2 : grade === 2 ? 3 : 5;
    } else {
      if (grade === 1) {
        interval = Math.max(2, Math.round(interval * 1.2));
        easeFactor = Math.max(1.3, easeFactor - 0.15);
      } else if (grade === 2) {
        interval = Math.round(interval * easeFactor);
      } else if (grade === 3) {
        interval = Math.round(interval * easeFactor * 1.35);
        easeFactor = Math.min(3.0, easeFactor + 0.15);
      }
    }
    repetitions += 1;
  }

  // Calculate next due date
  const nextDueDate = new Date(today);
  nextDueDate.setDate(today.getDate() + interval);
  const dueDateStr = nextDueDate.toISOString().split('T')[0];

  const history = [
    ...(card.history || []),
    {
      date: new Date().toISOString(),
      grade,
    },
  ];

  return {
    ...card,
    repetitions,
    easeFactor: Number(easeFactor.toFixed(2)),
    interval,
    dueDate: dueDateStr,
    lastReviewed: new Date().toISOString(),
    history,
  };
}

export function isCardDue(card: SpacedFlashcard): boolean {
  const todayStr = new Date().toISOString().split('T')[0];
  return !card.dueDate || card.dueDate <= todayStr;
}

export function getNextIntervalPreview(card: SpacedFlashcard, grade: 0 | 1 | 2 | 3): string {
  const simulated = calculateSM2(card, grade);
  if (simulated.interval === 1) return '1 dia';
  return `${simulated.interval} dias`;
}
