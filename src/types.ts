export interface Question {
  id: number;
  domain: number; // 1 to 5
  domainName: string;
  question: string;
  options: string[];
  answer: number; // 0-indexed (0 to 3)
  explanation: string;
}

export interface DomainStats {
  id: number;
  name: string;
  weightRange: string;
  color: string;
  totalQuestions: number;
  correctAnswers: number;
}

export interface Flashcard {
  tag: string;
  front: string;
  back: string;
}

export interface SpacedFlashcard extends Flashcard {
  id: string;
  domainNumber: number;
  interval: number; // Interval in days
  repetitions: number; // Successful recall repetitions
  easeFactor: number; // SM-2 ease factor, default 2.5
  dueDate: string; // ISO date string YYYY-MM-DD
  lastReviewed?: string;
  history?: {
    date: string;
    grade: number; // 0: Errei, 1: Difícil, 2: Bom, 3: Fácil
  }[];
}

export interface ExamAttempt {
  id: string;
  simuladoId: string;
  simuladoTitle: string;
  timestamp: string; // ISO string
  score: number; // 0 to 1000 Microsoft scale
  passed: boolean; // score >= 700
  percentage: number;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  domainBreakdown: {
    domainId: number;
    domainName: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
}

export interface StudyStreak {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  studyDays: string[]; // List of YYYY-MM-DD dates
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'simulados' | 'dominios' | 'streak' | 'ia';
  unlockedAt?: string;
  progress: number; // 0 to 100
  isUnlocked: boolean;
}

export interface AppDataBackup {
  version: number;
  exportedAt: string;
  userAnswers: Record<number, number>;
  customSimulados: CustomSimulado[];
  examAttempts: ExamAttempt[];
  streak: StudyStreak;
  flashcardProgress?: Record<string, SpacedFlashcard>;
}

export interface SummaryTopic {
  id: string;
  title: string;
  category: string;
  domainNumber: number;
  icon: string;
  color: string;
  summary: string;
  deepExplanation: string;
  keySpecifications: string[];
  examTraps: string[];
  commands?: {
    tool: 'Azure CLI' | 'PowerShell' | 'Bicep / ARM';
    cmd: string;
    description: string;
  }[];
}

export interface SyllabusDomain {
  domain: string;
  items: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isGrounded?: boolean;
}

export interface GeneratedQuestion {
  question: string;
  domainName: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  technicalTip: string;
}

export interface CustomSimulado {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  isAiGenerated?: boolean;
  questions: Question[];
}

export type QuizMode = 'study' | 'exam';
export type SimuladoId = string;
export type ActiveTab = 'dashboard' | 'quiz' | 'ai' | 'resumos' | 'cli' | 'cheatsheets' | 'syllabus';
