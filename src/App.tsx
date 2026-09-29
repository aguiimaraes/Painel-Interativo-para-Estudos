/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ActiveTab, DomainStats, SimuladoId, CustomSimulado } from './types';
import { allSimuladosQuestions, questionsOneNote } from './data/questions';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardTab } from './components/DashboardTab';
import { SimuladosTab } from './components/SimuladosTab';
import { AiTutorTab } from './components/AiTutorTab';
import { SummariesTab } from './components/SummariesTab';
import { CliDebuggerTab } from './components/CliDebuggerTab';
import { DecisionMatrixTab } from './components/DecisionMatrixTab';
import { SyllabusTab } from './components/SyllabusTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  // Persist user answers in localStorage
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('az104_user_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist custom generated simulados in localStorage
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

  const handleAnswerQuestion = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
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
    // Clean up answers for that custom simulado
    const custom = customSimulados.find((s) => s.id === id);
    if (custom) {
      setUserAnswers((prev) => {
        const next = { ...prev };
        custom.questions.forEach((q) => delete next[q.id]);
        return next;
      });
    }
  };

  // Calculate 5 domains stats dynamically based on the 150 standard official questions
  const domainStats: DomainStats[] = useMemo(() => {
    const totals: Record<number, number> = { 1: 35, 2: 30, 3: 30, 4: 30, 5: 25 };
    const corrects: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    allSimuladosQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        corrects[q.domain] = (corrects[q.domain] || 0) + 1;
      }
    });

    return [
      {
        id: 1,
        name: "Identidade & Governança",
        weightRange: "20-25%",
        color: "bg-blue-500/20 text-blue-300 border border-blue-500/40",
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

  const handleAskAi = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setActiveTab('ai');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header with Readiness & Study Timer */}
      <Header globalReadinessPercent={globalReadinessPercent} />

      {/* Navigation Tabs */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 lg:p-8">
        {activeTab === 'dashboard' && (
          <DashboardTab
            domains={domainStats}
            onStartQuiz={() => setActiveTab('quiz')}
            onOpenAi={() => setActiveTab('ai')}
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
          />
        )}

        {activeTab === 'ai' && <AiTutorTab initialPrompt={aiInitialPrompt} />}

        {activeTab === 'resumos' && <SummariesTab onAskAi={handleAskAi} />}

        {activeTab === 'cli' && <CliDebuggerTab />}

        {activeTab === 'cheatsheets' && <DecisionMatrixTab />}

        {activeTab === 'syllabus' && <SyllabusTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500">
        AZ-104 Command Center &bull; Plataforma Completa de Preparação para o Exame Microsoft Azure Administrator Associate
      </footer>
    </div>
  );
}
