import { StudyStreak, Achievement, DomainStats, ExamAttempt } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-question',
    title: 'Primeiro Passo',
    description: 'Responda sua primeira questão de simulado.',
    icon: '🎯',
    category: 'simulados',
    progress: 0,
    isUnlocked: false,
  },
  {
    id: 'exam-pass',
    title: 'Aprovado Oficial',
    description: 'Alcance 700 ou mais pontos em um Simulado no Modo Exame.',
    icon: '🏆',
    category: 'simulados',
    progress: 0,
    isUnlocked: false,
  },
  {
    id: 'streak-3',
    title: 'Hábito de Aço',
    description: 'Mantenha uma sequência de 3 dias consecutivos de estudo.',
    icon: '🔥',
    category: 'streak',
    progress: 0,
    isUnlocked: false,
  },
  {
    id: 'master-storage',
    title: 'Mestre do Storage',
    description: 'Atinja mais de 80% de acertos nas questões de Armazenamento.',
    icon: '📦',
    category: 'dominios',
    progress: 0,
    isUnlocked: false,
  },
  {
    id: 'master-networking',
    title: 'Arquiteto de Redes',
    description: 'Atinja mais de 80% de acertos nas questões de Redes Virtuais (VNets).',
    icon: '🌐',
    category: 'dominios',
    progress: 0,
    isUnlocked: false,
  },
  {
    id: 'master-identity',
    title: 'Guardião de Identidade',
    description: 'Atinja mais de 80% de acertos em Identidade & Governança.',
    icon: '🛡️',
    category: 'dominios',
    progress: 0,
    isUnlocked: false,
  },
  {
    id: 'century-questions',
    title: 'Centurião do Azure',
    description: 'Responda a pelo menos 100 questões no total.',
    icon: '💯',
    category: 'simulados',
    progress: 0,
    isUnlocked: false,
  },
  {
    id: 'spaced-master',
    title: 'Memória Blindada',
    description: 'Revise pelo menos 10 flashcards no sistema de repetição espaçada.',
    icon: '🧠',
    category: 'ia',
    progress: 0,
    isUnlocked: false,
  },
];

export function updateStudyStreak(currentStreakState?: StudyStreak): StudyStreak {
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (!currentStreakState || !currentStreakState.lastActiveDate) {
    return {
      currentStreak: 1,
      bestStreak: 1,
      lastActiveDate: todayStr,
      studyDays: [todayStr],
    };
  }

  const { lastActiveDate, currentStreak, bestStreak, studyDays = [] } = currentStreakState;

  if (lastActiveDate === todayStr) {
    return currentStreakState;
  }

  const newDays = studyDays.includes(todayStr) ? studyDays : [...studyDays, todayStr];

  if (lastActiveDate === yesterdayStr) {
    const nextStreak = currentStreak + 1;
    return {
      currentStreak: nextStreak,
      bestStreak: Math.max(bestStreak, nextStreak),
      lastActiveDate: todayStr,
      studyDays: newDays,
    };
  }

  // Streak broken (more than 1 day missed)
  return {
    currentStreak: 1,
    bestStreak,
    lastActiveDate: todayStr,
    studyDays: newDays,
  };
}

export function computeAchievements(
  userAnswers: Record<number, number>,
  domains: DomainStats[],
  examAttempts: ExamAttempt[],
  streak: StudyStreak,
  flashcardReviewCount: number
): Achievement[] {
  const totalAnswered = Object.keys(userAnswers).length;
  const bestExamScore = examAttempts.reduce((max, a) => Math.max(max, a.score), 0);

  const d1 = domains.find((d) => d.id === 1);
  const d2 = domains.find((d) => d.id === 2);
  const d4 = domains.find((d) => d.id === 4);

  const d1Pct = d1 && d1.totalQuestions > 0 ? (d1.correctAnswers / d1.totalQuestions) * 100 : 0;
  const d2Pct = d2 && d2.totalQuestions > 0 ? (d2.correctAnswers / d2.totalQuestions) * 100 : 0;
  const d4Pct = d4 && d4.totalQuestions > 0 ? (d4.correctAnswers / d4.totalQuestions) * 100 : 0;

  return INITIAL_ACHIEVEMENTS.map((ach) => {
    let progress = 0;
    let isUnlocked = false;

    switch (ach.id) {
      case 'first-question':
        progress = totalAnswered > 0 ? 100 : 0;
        isUnlocked = totalAnswered > 0;
        break;

      case 'exam-pass':
        progress = Math.min(100, Math.round((bestExamScore / 700) * 100));
        isUnlocked = bestExamScore >= 700;
        break;

      case 'streak-3':
        progress = Math.min(100, Math.round(((streak?.currentStreak || 0) / 3) * 100));
        isUnlocked = (streak?.currentStreak || 0) >= 3;
        break;

      case 'master-storage':
        progress = Math.min(100, Math.round(d2Pct));
        isUnlocked = d2Pct >= 80;
        break;

      case 'master-networking':
        progress = Math.min(100, Math.round(d4Pct));
        isUnlocked = d4Pct >= 80;
        break;

      case 'master-identity':
        progress = Math.min(100, Math.round(d1Pct));
        isUnlocked = d1Pct >= 80;
        break;

      case 'century-questions':
        progress = Math.min(100, Math.round((totalAnswered / 100) * 100));
        isUnlocked = totalAnswered >= 100;
        break;

      case 'spaced-master':
        progress = Math.min(100, Math.round((flashcardReviewCount / 10) * 100));
        isUnlocked = flashcardReviewCount >= 10;
        break;

      default:
        break;
    }

    return {
      ...ach,
      progress,
      isUnlocked,
    };
  });
}
