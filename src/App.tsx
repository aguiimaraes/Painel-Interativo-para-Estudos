/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ActiveTab, DomainStats, SimuladoId, CustomSimulado,
  ExamAttempt, StudyStreak, SpacedFlashcard, AppDataBackup
} from './types';
import { allSimuladosQuestions, questionsOneNote } from './data/questions';
import { defaultSpacedFlashcards } from './data/flashcards';
import { updateStudyStreak, computeAchievements } from './utils/gamification';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardTab } from './components/DashboardTab';
import { SimuladosTab } from './components/SimuladosTab';
import { AiTutorTab } from './components/AiTutorTab';
import { SummariesTab } from './components/SummariesTab';
import { CliDebuggerTab } from './components/CliDebuggerTab';
import { DecisionMatrixTab } from './components/DecisionMatrixTab';
import { SyllabusTab } from './components/SyllabusTab';
import { ProgressReportModal } from './components/ProgressReportModal';
import { BackupModal } from './components/BackupModal';
import { AchievementsModal } from './components/AchievementsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');
  const [lastServerSync, setLastServerSync] = useState<string | undefined>(undefined);

  // Modals state
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showBackupModal, setShowBackupModal] = useState<boolean>(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState<boolean>(false);

  // 1. User Answers State
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('az104_user_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 2. Custom Generated Simulados State
  const [customSimulados, setCustomSimulados] = useState<CustomSimulado[]>(() => {
    try {
      const saved = localStorage.getItem('az104_custom_simulados');
      const loaded: CustomSimulado[] = saved ? JSON.parse(saved) : [];
      const hasOneNoteSim = loaded.some((s) => s.id === 'simulado-onenote-oficial');
      if (!hasOneNoteSim) {
        return [
          {
            id: 'simulado-onenote-oficial',
            title: 'Simulado Especial: Questões Oficiais das Aulas & Anotações',
            description: '5 questões oficiais detalhadas extraídas diretamente dos cenários reais de exames e cadernos de aula do AZ-104.',
            createdAt: '24/09/2026',
            questions: questionsOneNote,
          },
          ...loaded,
        ];
      }
      return loaded;
    } catch {
      return [
        {
          id: 'simulado-onenote-oficial',
          title: 'Simulado Especial: Questões Oficiais das Aulas & Anotações',
          description: '5 questões oficiais detalhadas extraídas diretamente dos cenários reais de exames e cadernos de aula do AZ-104.',
          createdAt: '24/09/2026',
          questions: questionsOneNote,
        },
      ];
    }
  });

  // 3. Exam History Attempts State
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('az104_exam_attempts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Study Streak State
  const [streak, setStreak] = useState<StudyStreak>(() => {
    try {
      const saved = localStorage.getItem('az104_study_streak');
      if (saved) return JSON.parse(saved);
      return updateStudyStreak();
    } catch {
      return updateStudyStreak();
    }
  });

  // 5. Spaced Flashcards SM-2 State
  const [spacedCards, setSpacedCards] = useState<SpacedFlashcard[]>(() => {
    try {
      const saved = localStorage.getItem('az104_spaced_flashcards');
      return saved ? JSON.parse(saved) : defaultSpacedFlashcards;
    } catch {
      return defaultSpacedFlashcards;
    }
  });

  const [flashcardReviewsCount, setFlashcardReviewsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('az104_flashcard_reviews_count');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Save to LocalStorage effects
  useEffect(() => {
    try {
      localStorage.setItem('az104_user_answers', JSON.stringify(userAnswers));
    } catch (e) {
      console.error('Falha ao salvar respostas no localStorage:', e);
    }
  }, [userAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem('az104_custom_simulados', JSON.stringify(customSimulados));
    } catch (e) {
      console.error('Falha ao salvar simulados customizados no localStorage:', e);
    }
  }, [customSimulados]);

  useEffect(() => {
    try {
      localStorage.setItem('az104_exam_attempts', JSON.stringify(examAttempts));
    } catch (e) {
      console.error('Falha ao salvar histórico no localStorage:', e);
    }
  }, [examAttempts]);

  useEffect(() => {
    try {
      localStorage.setItem('az104_study_streak', JSON.stringify(streak));
    } catch (e) {
      console.error('Falha ao salvar streak no localStorage:', e);
    }
  }, [streak]);

  useEffect(() => {
    try {
      localStorage.setItem('az104_spaced_flashcards', JSON.stringify(spacedCards));
    } catch (e) {
      console.error('Falha ao salvar flashcards no localStorage:', e);
    }
  }, [spacedCards]);

  useEffect(() => {
    try {
      localStorage.setItem('az104_flashcard_reviews_count', String(flashcardReviewsCount));
    } catch (e) {
      console.error('Falha ao salvar contagem de flashcards:', e);
    }
  }, [flashcardReviewsCount]);

  // Load from backend on initial mount if localStorage is empty
  useEffect(() => {
    const hasLocalData = Object.keys(userAnswers).length > 0 || examAttempts.length > 0;
    if (!hasLocalData) {
      fetch('/api/storage/load')
        .then((res) => {
          if (!res.ok) return null;
          const ct = res.headers.get('content-type');
          return ct && ct.includes('application/json') ? res.json() : null;
        })
        .then((data) => {
          if (data && !data.empty && data.data) {
            const serverData = data.data;
            if (serverData.userAnswers) setUserAnswers(serverData.userAnswers);
            if (serverData.customSimulados) setCustomSimulados(serverData.customSimulados);
            if (serverData.examAttempts) setExamAttempts(serverData.examAttempts);
            if (serverData.streak) setStreak(serverData.streak);
            if (serverData.spacedCards) setSpacedCards(serverData.spacedCards);
            if (serverData.lastServerSync) {
              setLastServerSync(new Date(serverData.lastServerSync).toLocaleTimeString('pt-BR'));
            }
          }
        })
        .catch(() => {});
    }
  }, []);

  // Sync to Backend (debounced)
  const syncToBackend = useCallback(async () => {
    try {
      const payload: AppDataBackup = {
        version: 1,
        exportedAt: new Date().toISOString(),
        userAnswers,
        customSimulados,
        examAttempts,
        streak,
      };
      const res = await fetch('/api/storage/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (data && data.savedAt) {
        setLastServerSync(new Date(data.savedAt).toLocaleTimeString('pt-BR'));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [userAnswers, customSimulados, examAttempts, streak]);

  // Referência para evitar sincronização no primeiro carregamento
  const isFirstMountRef = React.useRef(true);

  // Sincronização em background suave e silenciosa apenas após interações reais (evita loop e recarregamentos)
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    // Aguarda 60 segundos de inatividade após mudanças para sincronizar suavemente com o backend
    const timer = setTimeout(() => {
      syncToBackend();
    }, 60000);
    return () => clearTimeout(timer);
  }, [userAnswers, customSimulados, examAttempts, streak, syncToBackend]);

  const handleAnswerQuestion = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
    setStreak((prev) => updateStudyStreak(prev));
  };

  const handleResetSimulado = (simuladoId: SimuladoId) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      if (simuladoId === '1') {
        for (let i = 1; i <= 50; i++) delete next[i];
      } else if (simuladoId === '2') {
        for (let i = 51; i <= 100; i++) delete next[i];
      } else if (simuladoId === '3') {
        for (let i = 101; i <= 150; i++) delete next[i];
      } else {
        const custom = customSimulados.find((s) => s.id === simuladoId);
        if (custom) {
          custom.questions.forEach((q) => delete next[q.id]);
        }
      }
      return next;
    });
  };

  const handleResetQuestions = (questionIds: number[]) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      questionIds.forEach((id) => delete next[id]);
      return next;
    });
  };

  const handleCreateCustomSimulado = (newSim: CustomSimulado) => {
    setCustomSimulados((prev) => [newSim, ...prev]);
  };

  const handleDeleteCustomSimulado = (id: string) => {
    setCustomSimulados((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateCustomSimulado = (updated: CustomSimulado) => {
    setCustomSimulados((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleSaveExamAttempt = (attempt: ExamAttempt) => {
    setExamAttempts((prev) => [attempt, ...prev]);
    setStreak((prev) => updateStudyStreak(prev));
  };

  const handleClearExamHistory = () => {
    if (confirm('Deseja realmente limpar todo o histórico de tentativas?')) {
      setExamAttempts([]);
      try {
        localStorage.removeItem('az104_exam_attempts');
      } catch {}
    }
  };

  const handleCardReviewed = () => {
    setFlashcardReviewsCount((prev) => prev + 1);
    setStreak((prev) => updateStudyStreak(prev));
  };

  // Restore backup
  const handleRestoreBackup = (data: AppDataBackup) => {
    if (data.userAnswers) setUserAnswers(data.userAnswers);
    if (data.customSimulados) setCustomSimulados(data.customSimulados);
    if (data.examAttempts) setExamAttempts(data.examAttempts);
    if (data.streak) setStreak(data.streak);
    syncToBackend();
  };

  // Calculate 5 Domain Stats dynamically from all answers
  const domainStats: DomainStats[] = useMemo(() => {
    const totals: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const corrects: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    allSimuladosQuestions.forEach((q) => {
      totals[q.domain] = (totals[q.domain] || 0) + 1;
      if (userAnswers[q.id] === q.answer) {
        corrects[q.domain] = (corrects[q.domain] || 0) + 1;
      }
    });

    return [
      {
        id: 1,
        name: "Identidade & Governança",
        weightRange: "20-25%",
        color: "bg-sky-500/20 text-sky-300 border border-sky-500/40",
        totalQuestions: totals[1],
        correctAnswers: corrects[1],
      },
      {
        id: 2,
        name: "Armazenamento (Storage)",
        weightRange: "15-20%",
        color: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
        totalQuestions: totals[2],
        correctAnswers: corrects[2],
      },
      {
        id: 3,
        name: "Recursos de Computação",
        weightRange: "20-25%",
        color: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
        totalQuestions: totals[3],
        correctAnswers: corrects[3],
      },
      {
        id: 4,
        name: "Redes Virtuais (VNets)",
        weightRange: "15-20%",
        color: "bg-amber-500/20 text-amber-300 border border-amber-500/40",
        totalQuestions: totals[4],
        correctAnswers: corrects[4],
      },
      {
        id: 5,
        name: "Monitoramento & Backup",
        weightRange: "10-15%",
        color: "bg-rose-500/20 text-rose-300 border border-rose-500/40",
        totalQuestions: totals[5],
        correctAnswers: corrects[5],
      },
    ];
  }, [userAnswers]);

  // Global Readiness percentage based on total correct / total questions
  const globalReadinessPercent = useMemo(() => {
    let totalCorrect = 0;
    allSimuladosQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        totalCorrect++;
      }
    });
    return Math.round((totalCorrect / allSimuladosQuestions.length) * 100);
  }, [userAnswers]);

  // Achievements calculation
  const achievements = useMemo(() => {
    return computeAchievements(userAnswers, domainStats, examAttempts, streak, flashcardReviewsCount);
  }, [userAnswers, domainStats, examAttempts, streak, flashcardReviewsCount]);

  const handleAskAi = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setActiveTab('ai');
  };

  // Esconder Header e Navigation ao descer a barra de rolagem para não atrapalhar a visualização
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

          if (currentScrollY <= 20) {
            setIsHeaderVisible(true);
          } else if (currentScrollY > 20 && currentScrollY < maxScroll) {
            if (currentScrollY > lastScrollY + 5) {
              setIsHeaderVisible(false);
            } else if (currentScrollY < lastScrollY - 5) {
              setIsHeaderVisible(true);
            }
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const currentBackupData: AppDataBackup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    userAnswers,
    customSimulados,
    examAttempts,
    streak,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header + Navigation com ocultamento automático ao descer a barra de rolagem */}
      <div
        className={`sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        }`}
      >
        <Header
          globalReadinessPercent={globalReadinessPercent}
          streak={streak}
          onOpenAchievements={() => setShowAchievementsModal(true)}
          onOpenProgressReport={() => setShowReportModal(true)}
          onOpenBackup={() => setShowBackupModal(true)}
        />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 lg:p-8">
        {activeTab === 'dashboard' && (
          <DashboardTab
            domains={domainStats}
            onStartQuiz={(domId) => {
              setActiveTab('quiz');
            }}
            onOpenAi={() => setActiveTab('ai')}
            onOpenSummary={(domId) => {
              setActiveTab('resumos');
            }}
            streak={streak}
            achievements={achievements}
            onOpenAchievements={() => setShowAchievementsModal(true)}
            onOpenReport={() => setShowReportModal(true)}
          />
        )}

        {activeTab === 'quiz' && (
          <SimuladosTab
            allQuestions={allSimuladosQuestions}
            userAnswers={userAnswers}
            onAnswerQuestion={handleAnswerQuestion}
            onResetSimulado={handleResetSimulado}
            onResetQuestions={handleResetQuestions}
            onAskAi={handleAskAi}
            customSimulados={customSimulados}
            onCreateCustomSimulado={handleCreateCustomSimulado}
            onDeleteCustomSimulado={handleDeleteCustomSimulado}
            onUpdateCustomSimulado={handleUpdateCustomSimulado}
            examAttempts={examAttempts}
            onSaveExamAttempt={handleSaveExamAttempt}
            onClearExamHistory={handleClearExamHistory}
          />
        )}

        {activeTab === 'ai' && (
          <AiTutorTab
            initialPrompt={aiInitialPrompt}
            spacedCards={spacedCards}
            onUpdateSpacedCards={setSpacedCards}
            onCardReviewed={handleCardReviewed}
          />
        )}

        {activeTab === 'resumos' && <SummariesTab onAskAi={handleAskAi} />}

        {activeTab === 'cli' && <CliDebuggerTab />}

        {activeTab === 'cheatsheets' && <DecisionMatrixTab />}

        {activeTab === 'syllabus' && <SyllabusTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500">
        AZ-104 Command Center &bull; Plataforma Completa de Preparação para o Exame Microsoft Azure Administrator Associate
      </footer>

      {/* MODALS */}
      <ProgressReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        domains={domainStats}
        globalReadinessPercent={globalReadinessPercent}
        examAttempts={examAttempts}
        streak={streak}
      />

      <BackupModal
        isOpen={showBackupModal}
        onClose={() => setShowBackupModal(false)}
        currentBackupData={currentBackupData}
        onRestoreBackup={handleRestoreBackup}
        onManualServerSync={syncToBackend}
        lastSyncTime={lastServerSync}
      />

      <AchievementsModal
        isOpen={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
        achievements={achievements}
        streak={streak}
      />
    </div>
  );
}
