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
