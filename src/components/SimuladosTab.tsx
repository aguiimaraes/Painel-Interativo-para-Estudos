import React, { useState, useEffect, useMemo } from 'react';
import { Question, SimuladoId, QuizMode, CustomSimulado, ExamAttempt } from '../types';
import {
  FileSignature, BookOpen, Clock, Lightbulb,
  ArrowLeft, ArrowRight, Check, Trophy, RotateCcw, Sparkles,
  PlusCircle, AlertCircle, CheckCircle2, XCircle, Trash2, Filter,
  TrendingUp, Edit3
} from 'lucide-react';
import { ManageQuestionsModal } from './ManageQuestionsModal';
import { ExamHistoryView } from './ExamHistoryView';

interface SimuladosTabProps {
  allQuestions: Question[];
  userAnswers: Record<number, number>;
  onAnswerQuestion: (questionId: number, optionIndex: number) => void;
  onResetSimulado: (simuladoId: SimuladoId) => void;
  onResetQuestions: (questionIds: number[]) => void;
  onAskAi: (prompt: string) => void;
  customSimulados: CustomSimulado[];
  onCreateCustomSimulado: (simulado: CustomSimulado) => void;
  onDeleteCustomSimulado: (id: string) => void;
  onUpdateCustomSimulado?: (simulado: CustomSimulado) => void;
  examAttempts?: ExamAttempt[];
  onSaveExamAttempt?: (attempt: ExamAttempt) => void;
  onClearExamHistory?: () => void;
}

export const SimuladosTab: React.FC<SimuladosTabProps> = ({
  allQuestions,
  userAnswers,
  onAnswerQuestion,
  onResetSimulado,
  onResetQuestions,
  onAskAi,
  customSimulados,
  onCreateCustomSimulado,
  onDeleteCustomSimulado,
  onUpdateCustomSimulado,
  examAttempts = [],
  onSaveExamAttempt,
  onClearExamHistory,
}) => {
  const [selectedSimulado, setSelectedSimulado] = useState<SimuladoId>('1');
  const [quizMode, setQuizMode] = useState<QuizMode>('study');
  const [activeView, setActiveView] = useState<'simulado' | 'history'>('simulado');
  const [showManageModal, setShowManageModal] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(6000); // 100 min
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  const [showExamScoreModal, setShowExamScoreModal] = useState<boolean>(false);

  // Filter in Results modal: 'wrong' | 'all' | 'unanswered' | 'correct'
  const [reviewFilter, setReviewFilter] = useState<'wrong' | 'all' | 'unanswered' | 'correct'>('wrong');

  // Modal for creating new custom/AI simulado
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);
  const [generateTitle, setGenerateTitle] = useState<string>('');
  const [generateType, setGenerateType] = useState<'balanced' | 'domain' | 'ai'>('balanced');
  const [generateDomain, setGenerateDomain] = useState<number>(4);
  const [generateCount, setGenerateCount] = useState<number>(20);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);

  // Get active questions for the current simulado
  const simuladoQuestions: Question[] = useMemo(() => {
    if (selectedSimulado === '1') return allQuestions.slice(0, 50);
    if (selectedSimulado === '2') return allQuestions.slice(50, 100);
    if (selectedSimulado === '3') return allQuestions.slice(100, 150);

    const custom = customSimulados.find((s) => s.id === selectedSimulado);
    if (custom) return custom.questions;

    return allQuestions.slice(0, 50);
  }, [allQuestions, selectedSimulado, customSimulados]);

  const currentQ = simuladoQuestions[currentQIndex] || simuladoQuestions[0];
  const selectedOption = currentQ ? userAnswers[currentQ.id] : undefined;

  // Timer logic for exam mode
  useEffect(() => {
    let interval: any = null;
    if (quizMode === 'exam' && isExamRunning && examTimeRemaining > 0) {
      interval = setInterval(() => {
        setExamTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (examTimeRemaining <= 0 && quizMode === 'exam') {
      setIsExamRunning(false);
      setShowExamScoreModal(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizMode, isExamRunning, examTimeRemaining]);

  const handleSimuladoChange = (simId: SimuladoId) => {
    setSelectedSimulado(simId);
    setCurrentQIndex(0);
    setShowExamScoreModal(false);
    if (quizMode === 'exam') {
      let qCount = 50;
      if (simId === '1' || simId === '2' || simId === '3') {
        qCount = 50;
      } else {
        const found = customSimulados.find((s) => s.id === simId);
        if (found) qCount = found.questions.length;
      }
      setExamTimeRemaining(Math.max(600, qCount * 120));
      setIsExamRunning(true);
    }
  };

  const handleModeChange = (mode: QuizMode) => {
    setQuizMode(mode);
    setShowExamScoreModal(false);
    if (mode === 'exam') {
      setExamTimeRemaining(Math.max(600, simuladoQuestions.length * 120));
      setIsExamRunning(true);
    } else {
      setIsExamRunning(false);
    }
  };

  const finishExam = () => {
    setIsExamRunning(false);
    setShowExamScoreModal(true);

    if (onSaveExamAttempt && simuladoQuestions.length > 0) {
      let correct = 0;
      simuladoQuestions.forEach((q) => {
        if (userAnswers[q.id] === q.answer) correct++;
      });
      const score = Math.round((correct / simuladoQuestions.length) * 1000);
      const passed = score >= 700;

      const domainNames: Record<number, string> = {
        1: 'Identidade & Governança',
        2: 'Armazenamento (Storage)',
        3: 'Recursos de Computação',
        4: 'Redes Virtuais (VNets)',
        5: 'Monitoramento & Backup',
      };

      const domainBreakdown = [1, 2, 3, 4, 5].map((domId) => {
        const domQs = simuladoQuestions.filter((q) => q.domain === domId);
        const domCorrect = domQs.filter((q) => userAnswers[q.id] === q.answer).length;
        return {
          domainId: domId,
          domainName: domainNames[domId],
          total: domQs.length,
          correct: domCorrect,
          percentage: domQs.length > 0 ? Math.round((domCorrect / domQs.length) * 100) : 0,
        };
      });

      const totalAllowedSecs = Math.max(600, simuladoQuestions.length * 120);
      const timeSpent = Math.max(10, totalAllowedSecs - examTimeRemaining);

      onSaveExamAttempt({
        id: `attempt-${Date.now()}`,
        simuladoId: selectedSimulado,
        simuladoTitle: currentSimuladoTitle,
        timestamp: new Date().toISOString(),
        score,
        passed,
        percentage: Math.round((correct / simuladoQuestions.length) * 100),
        totalQuestions: simuladoQuestions.length,
        correctCount: correct,
        timeSpentSeconds: timeSpent,
        domainBreakdown,
      });
    }
  };

  // Score and error calculations
  const examStats = useMemo(() => {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    const wrongQuestions: Question[] = [];
    const correctQuestions: Question[] = [];
    const unansweredQuestions: Question[] = [];

    simuladoQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === undefined) {
        unansweredCount++;
        unansweredQuestions.push(q);
      } else if (ans === q.answer) {
        correctCount++;
        correctQuestions.push(q);
      } else {
        wrongCount++;
        wrongQuestions.push(q);
      }
    });

    const percent = Math.round((correctCount / simuladoQuestions.length) * 100);
    const scorePoints = Math.round((correctCount / simuladoQuestions.length) * 1000);
    const isApproved = scorePoints >= 700;

    return {
      correctCount,
      wrongCount,
      unansweredCount,
      percent,
      scorePoints,
      isApproved,
      wrongQuestions,
      correctQuestions,
      unansweredQuestions,
    };
  }, [simuladoQuestions, userAnswers]);

  // Handler to create new custom or AI simulado
  const handleCreateNewSimulado = async () => {
    const nextNumber = 4 + customSimulados.length;
    const defaultTitle =
      generateType === 'ai'
        ? `Simulado ${nextNumber} (IA Gemini - ${generateCount} Qs)`
        : generateType === 'domain'
        ? `Simulado ${nextNumber} (Domínio ${generateDomain} - ${generateCount} Qs)`
        : `Simulado ${nextNumber} (Equilibrado - ${generateCount} Qs)`;

    const finalTitle = generateTitle.trim() || defaultTitle;
    const newId = `custom-${Date.now()}`;

    if (generateType === 'ai') {
      setIsAiGenerating(true);
      try {
        const aiRequestCount = Math.min(generateCount, 15);
        const res = await fetch('/api/ai/generate-simulado-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            count: aiRequestCount,
            domainNumber: generateDomain,
            theme: finalTitle,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao gerar');

        const baseSeed = 1000 + customSimulados.length * 100;
        const aiQuestions: Question[] = (data.questions || []).map((q: any, idx: number) => ({
          id: baseSeed + idx,
          domain: q.domain || generateDomain || 1,
          domainName: q.domainName || `Domínio ${generateDomain}`,
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
        }));

        // Fill remaining questions from pool to reach chosen generateCount
        const remainingNeeded = Math.max(0, generateCount - aiQuestions.length);
        const domainFilteredPool = allQuestions
          .filter((q) => q.domain === generateDomain)
          .sort(() => 0.5 - Math.random());
        const pool = domainFilteredPool.length >= remainingNeeded
          ? domainFilteredPool
          : [...allQuestions].sort(() => 0.5 - Math.random());

        const fillerQuestions: Question[] = pool.slice(0, remainingNeeded).map((q, idx) => ({
          ...q,
          id: baseSeed + aiQuestions.length + idx,
        }));

        const completeSimuladoQuestions = [...aiQuestions, ...fillerQuestions].slice(0, generateCount);

        const newSim: CustomSimulado = {
          id: newId,
          title: finalTitle,
          description: `Simulado com ${completeSimuladoQuestions.length} questões, incluindo questões inéditas geradas por IA Gemini e cenários da prova AZ-104.`,
          createdAt: new Date().toLocaleDateString('pt-BR'),
          isAiGenerated: true,
          questions: completeSimuladoQuestions,
        };

        onCreateCustomSimulado(newSim);
        setSelectedSimulado(newId);
        setCurrentQIndex(0);
        setShowGenerateModal(false);
        setGenerateTitle('');
      } catch (err: any) {
        alert(`Erro ao gerar simulado com IA: ${err.message}. Verifique sua chave GEMINI_API_KEY.`);
      } finally {
        setIsAiGenerating(false);
      }
    } else if (generateType === 'domain') {
      // Specialized domain focus with chosen generateCount
      const domainQuestions = allQuestions.filter((q) => q.domain === generateDomain);
      const baseSeed = 2000 + customSimulados.length * 100;
      const selectedPool = [...domainQuestions].sort(() => 0.5 - Math.random());

      const questionsList: Question[] = [];
      let i = 0;
      while (questionsList.length < generateCount && selectedPool.length > 0) {
        const source = selectedPool[i % selectedPool.length];
        questionsList.push({
          ...source,
          id: baseSeed + questionsList.length,
        });
        i++;
      }

      const domainNames: Record<number, string> = {
        1: 'Identidade & Governança',
        2: 'Armazenamento (Storage)',
        3: 'Recursos de Computação',
        4: 'Redes Virtuais (VNets)',
        5: 'Monitoramento & Backup',
      };

      const newSim: CustomSimulado = {
        id: newId,
        title: finalTitle,
        description: `Simulado de ${questionsList.length} questões focado exclusivamente no Domínio ${generateDomain}: ${domainNames[generateDomain]}.`,
        createdAt: new Date().toLocaleDateString('pt-BR'),
        questions: questionsList,
      };

      onCreateCustomSimulado(newSim);
      setSelectedSimulado(newId);
      setCurrentQIndex(0);
      setShowGenerateModal(false);
      setGenerateTitle('');
    } else {
      // Balanced with chosen generateCount across the 5 domains
      const baseSeed = 3000 + customSimulados.length * 100;
      const balancedQuestions: Question[] = [];
      const basePerDom = Math.floor(generateCount / 5);
      const remainder = generateCount % 5;

      for (let dom = 1; dom <= 5; dom++) {
        const countForDom = basePerDom + (dom <= remainder ? 1 : 0);
        const domQs = allQuestions.filter((q) => q.domain === dom).sort(() => 0.5 - Math.random());
        domQs.slice(0, countForDom).forEach((q) => {
          balancedQuestions.push({
            ...q,
            id: baseSeed + balancedQuestions.length,
          });
        });
      }

      const newSim: CustomSimulado = {
        id: newId,
        title: finalTitle,
        description: `Simulado de ${balancedQuestions.length} questões distribuídas equilibradamente entre os 5 domínios oficiais do exame.`,
        createdAt: new Date().toLocaleDateString('pt-BR'),
        questions: balancedQuestions.sort(() => 0.5 - Math.random()),
      };

      onCreateCustomSimulado(newSim);
      setSelectedSimulado(newId);
      setCurrentQIndex(0);
      setShowGenerateModal(false);
      setGenerateTitle('');
    }
  };

  const answeredCount = simuladoQuestions.filter((q) => userAnswers[q.id] !== undefined).length;
  const examMinutes = Math.floor(examTimeRemaining / 60);
  const examSecs = examTimeRemaining % 60;
  const formattedExamTime = `${String(examMinutes).padStart(2, '0')}:${String(examSecs).padStart(2, '0')}`;

  // Current active simulado label
  const currentSimuladoTitle = useMemo(() => {
    if (selectedSimulado === '1') return 'Simulado 1: Exame Oficial (50 Questões • 5 Domínios)';
    if (selectedSimulado === '2') return 'Simulado 2: Exame Oficial (50 Questões • 5 Domínios)';
    if (selectedSimulado === '3') return 'Simulado 3: Exame Oficial (50 Questões • 5 Domínios)';
    const custom = customSimulados.find((s) => s.id === selectedSimulado);
    return custom ? custom.title : `Simulado ${selectedSimulado}`;
  }, [selectedSimulado, customSimulados]);

  // Filtered list of questions to review in score modal
  const reviewQuestionsList = useMemo(() => {
    if (reviewFilter === 'wrong') return examStats.wrongQuestions;
    if (reviewFilter === 'correct') return examStats.correctQuestions;
    if (reviewFilter === 'unanswered') return examStats.unansweredQuestions;
    return simuladoQuestions;
  }, [reviewFilter, examStats, simuladoQuestions]);

  const selectedCustomSimulado = customSimulados.find((s) => s.id === selectedSimulado);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 border border-amber-500/30 p-5 rounded-2xl space-y-4">
        {/* Navigation Switch between Simulado and Exam History */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('simulado')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                activeView === 'simulado'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileSignature className="w-3.5 h-3.5" />
              <span>Simulado Atual</span>
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                activeView === 'history'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Histórico de Tentativas ({examAttempts.length})</span>
            </button>
          </div>

          {selectedCustomSimulado && onUpdateCustomSimulado && (
            <button
              onClick={() => setShowManageModal(true)}
              className="text-xs bg-purple-950/80 hover:bg-purple-900 border border-purple-700/80 text-purple-300 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Gerenciar / Editar Questões ({selectedCustomSimulado.questions.length})</span>
            </button>
          )}
        </div>

        {activeView === 'simulado' && (
          <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-amber-400" />
                  Simulados Práticos AZ-104
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Escolha entre o Modo Estudo (gabarito imediato) ou Modo Prova Oficial (100 min)
                </p>
              </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Button to Generate New Simulado */}
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Gerar Novo Simulado</span>
            </button>

            {/* Simulado Selector */}
            <div>
              <select
                value={selectedSimulado}
                onChange={(e) => handleSimuladoChange(e.target.value as SimuladoId)}
                aria-label="Selecionar Simulado"
                className="bg-slate-800 text-xs font-bold text-amber-300 px-3 py-2 rounded-xl border border-amber-500/40 focus:outline-none cursor-pointer max-w-xs truncate"
              >
                <option value="1">Simulado 1 (50 Qs • 5 Domínios Oficiais)</option>
                <option value="2">Simulado 2 (50 Qs • 5 Domínios Oficiais)</option>
                <option value="3">Simulado 3 (50 Qs • 5 Domínios Oficiais)</option>
                {customSimulados.map((cs) => (
                  <option key={cs.id} value={cs.id}>
                    {cs.title} ({cs.questions.length} Qs)
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Switch */}
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => handleModeChange('study')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  quizMode === 'study' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Estudo</span>
              </button>
              <button
                onClick={() => handleModeChange('exam')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  quizMode === 'exam' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Prova (100 min)</span>
              </button>
            </div>

            {/* View Result / Wrong Questions Button */}
            <button
              onClick={() => setShowExamScoreModal(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Resultado & Erros</span>
            </button>
          </div>
        </div>

        {/* Exam Timer Bar (if Exam Mode) */}
        {quizMode === 'exam' && (
          <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs">
            <span className="text-amber-300 font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 animate-pulse text-amber-400" />
              Tempo Restante da Prova:
            </span>
            <span className="font-mono text-base font-black text-amber-400">{formattedExamTime}</span>
            <button
              onClick={finishExam}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer"
            >
              Finalizar Prova e Ver Questões Erradas
            </button>
          </div>
        )}

        {/* Question Navigator Grid */}
        <div>
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="text-slate-400 font-semibold">
              Navegador &bull; {currentSimuladoTitle}
            </span>
            <div className="flex items-center gap-2">
              {selectedSimulado.startsWith('custom-') && (
                <button
                  onClick={() => {
                    if (confirm('Deseja realmente excluir este simulado gerado?')) {
                      onDeleteCustomSimulado(selectedSimulado);
                      setSelectedSimulado('1');
                      setCurrentQIndex(0);
                    }
                  }}
                  className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 cursor-pointer mr-2 py-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Excluir Simulado
                </button>
              )}
              <span className="text-sky-400 font-bold bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full text-xs">
                {answeredCount} / {simuladoQuestions.length} respondidas
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 scrollbar-thin">
            {simuladoQuestions.map((q, idx) => {
              const answered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQIndex;

              let btnStyle = "bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700";
              if (answered) {
                if (quizMode === 'study') {
                  const isCorrect = userAnswers[q.id] === q.answer;
                  btnStyle = isCorrect ? "bg-emerald-600 text-white border-emerald-500" : "bg-rose-600 text-white border-rose-500";
                } else {
                  btnStyle = "bg-sky-600 text-white border-sky-500";
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQIndex(idx);
                    setShowExamScoreModal(false);
                  }}
                  className={`w-7.5 h-7.5 text-xs font-bold rounded-lg flex items-center justify-center transition border cursor-pointer ${btnStyle} ${
                    isCurrent ? 'ring-2 ring-amber-400 scale-105' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
        </>
        )}
      </div>

      {activeView === 'history' ? (
        <ExamHistoryView
          attempts={examAttempts}
          onClearHistory={onClearExamHistory}
        />
      ) : (
        <>
          {/* Main Question Card or Score & Errors View */}
      {!showExamScoreModal ? (
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
          {/* Question Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-extrabold text-amber-400">
                Questão {currentQIndex + 1} de {simuladoQuestions.length}
              </span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-xl border border-slate-700 font-medium">
                {currentQ.domainName}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {currentSimuladoTitle}
            </span>
          </div>

          {/* Question Text */}
          <div className="text-slate-100 text-sm leading-relaxed font-medium bg-slate-950 p-4.5 rounded-xl border border-slate-800">
            {currentQ.question}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((optText, optIdx) => {
              const isSelected = selectedOption === optIdx;

              let cardStyle = "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-600";
              if (isSelected) {
                cardStyle = "bg-sky-950/70 border-sky-400 text-white font-semibold";
              }

              // In Study mode, show immediate color highlights if answered
              if (quizMode === 'study' && selectedOption !== undefined) {
                if (optIdx === currentQ.answer) {
                  cardStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-semibold";
                } else if (isSelected && selectedOption !== currentQ.answer) {
                  cardStyle = "bg-rose-950/80 border-rose-500 text-rose-100 font-semibold";
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => onAnswerQuestion(currentQ.id, optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-center justify-between cursor-pointer ${cardStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{optText}</span>
                  </div>
                  {quizMode === 'study' && selectedOption !== undefined && optIdx === currentQ.answer && (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible in Study Mode once answered) */}
          {quizMode === 'study' && selectedOption !== undefined && (
            <div className="bg-slate-950/90 border border-slate-800 p-4.5 rounded-xl space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>Gabarito e Justificativa Oficial:</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{currentQ.explanation}</p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs">
                <span className="text-slate-300">
                  Resposta Correta: <b className="text-emerald-400 font-bold">Opção {String.fromCharCode(65 + currentQ.answer)}</b>
                </span>
                <button
                  onClick={() =>
                    onAskAi(
                      `Aprofunde a questão do exame AZ-104: "${currentQ.question}". A resposta correta é "${currentQ.options[currentQ.answer]}". Explicação: ${currentQ.explanation}. Por que as outras opções estão erradas?`
                    )
                  }
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Aprofundar conceito com o Tutor Gemini &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center space-x-2 border border-slate-700 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentQIndex((prev) => Math.min(simuladoQuestions.length - 1, prev + 1))}
                disabled={currentQIndex === simuladoQuestions.length - 1}
                className="bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Próxima</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* EXAM SCORE & COMPLETE WRONG QUESTIONS REVIEW SECTION                      */
        /* ========================================================================= */
        <div className="bg-slate-900 border border-amber-500/40 p-6 md:p-8 rounded-2xl space-y-8 shadow-2xl">
          {/* Top Score Banner */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto text-slate-950 shadow-lg">
              <Trophy className="w-8 h-8 text-slate-950" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">Resultado do {currentSimuladoTitle}</h3>
              <p className="text-xs text-slate-400 font-semibold">
                Total de {simuladoQuestions.length} Questões Avaliadas
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300 block font-medium">Pontuação Oficial</span>
                <span className="text-xl font-black text-amber-400">{examStats.scorePoints} / 1000</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300 block font-medium">Aproveitamento</span>
                <span className="text-xl font-black text-emerald-400">{examStats.percent}%</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300 block font-medium">Questões Erradas</span>
                <span className="text-xl font-black text-rose-400">{examStats.wrongCount}</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300 block font-medium">Status</span>
                <span
                  className={`text-sm font-black mt-1 block ${
                    examStats.isApproved ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {examStats.isApproved ? 'APROVADO 🎉' : 'REPROVADO ⚠️'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {examStats.isApproved
                ? "Parabéns! Sua nota superou o corte de 700 pontos da Microsoft. Revise os eventuais pontos de atenção abaixo para consolidar 100% de domínio!"
                : "Sua pontuação ficou abaixo do corte de 700 pontos da Microsoft. Analise as questões erradas abaixo com calma e revise as justificativas técnicas antes de refazer o simulado."}
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 pt-2">
              {examStats.wrongCount > 0 && (
                <button
                  onClick={() => {
                    const wrongIds = examStats.wrongQuestions.map((q) => q.id);
                    onResetQuestions(wrongIds);
                    setShowExamScoreModal(false);
                    setCurrentQIndex(0);
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refazer Apenas as {examStats.wrongCount} Erradas</span>
                </button>
              )}

              <button
                onClick={() => {
                  onResetSimulado(selectedSimulado);
                  setCurrentQIndex(0);
                  setShowExamScoreModal(false);
                  if (quizMode === 'exam') {
                    setExamTimeRemaining(6000);
                    setIsExamRunning(true);
                  }
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refazer Simulado Inteiro</span>
              </button>

              <button
                onClick={() => setShowExamScoreModal(false)}
                className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Continuar Navegando nas Questões
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DETAILED WRONG QUESTIONS REVIEW SECTION                                  */}
          {/* ========================================================================= */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  Revisão de Questões Incorretas & Gabarito Técnico
                </h4>
                <p className="text-xs text-slate-400">
                  Veja exatamente o que você marcou, qual é a resposta oficial correta e a explicação técnica detalhada
                </p>
              </div>

              {/* Review Filters */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    reviewFilter === 'wrong' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Erradas ({examStats.wrongCount})
                </button>
                <button
                  onClick={() => setReviewFilter('unanswered')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    reviewFilter === 'unanswered' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Não Respondidas ({examStats.unansweredCount})
                </button>
                <button
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    reviewFilter === 'correct' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Acertos ({examStats.correctCount})
                </button>
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    reviewFilter === 'all' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todas ({simuladoQuestions.length})
                </button>
              </div>
            </div>

            {/* List of Questions */}
            {reviewQuestionsList.length === 0 ? (
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-2">
                {reviewFilter === 'wrong' ? (
                  <>
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h5 className="font-bold text-white text-sm">Nenhuma questão errada!</h5>
                    <p className="text-xs text-slate-400">
                      Você acertou todas as questões que foram respondidas neste simulado. Excelente trabalho!
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-400">Nenhuma questão encontrada para este filtro.</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {reviewQuestionsList.map((q) => {
                  const userAnswerIdx = userAnswers[q.id];
                  const isCorrect = userAnswerIdx === q.answer;
                  const isUnanswered = userAnswerIdx === undefined;
                  const originalIndex = simuladoQuestions.findIndex((item) => item.id === q.id);

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border bg-slate-950 space-y-3.5 transition ${
                        isCorrect
                          ? 'border-emerald-500/30'
                          : isUnanswered
                          ? 'border-amber-500/30'
                          : 'border-rose-500/40'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
                        <div className="flex items-center space-x-2.5">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : isUnanswered
                                ? 'bg-amber-600 text-white'
                                : 'bg-rose-600 text-white'
                            }`}
                          >
                            {originalIndex >= 0 ? originalIndex + 1 : q.id}
                          </span>
                          <span className="text-xs font-bold text-white">
                            Questão #{originalIndex >= 0 ? originalIndex + 1 : q.id}
                          </span>
                          <span className="text-xs font-semibold bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                            {q.domainName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              isCorrect
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : isUnanswered
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}
                          >
                            {isCorrect ? 'ACERTOU' : isUnanswered ? 'NÃO RESPONDIDA' : 'ERROU'}
                          </span>
                          <button
                            onClick={() => {
                              setCurrentQIndex(originalIndex >= 0 ? originalIndex : 0);
                              setShowExamScoreModal(false);
                            }}
                            className="text-sky-400 hover:text-white text-xs font-semibold cursor-pointer py-1"
                          >
                            Ir para questão &rarr;
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {q.question}
                      </p>

                      {/* Answers Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {/* User Answer */}
                        <div
                          className={`p-3 rounded-xl border ${
                            isCorrect
                              ? 'bg-emerald-950 border-emerald-600/50 text-emerald-200'
                              : isUnanswered
                              ? 'bg-amber-950 border-amber-600/50 text-amber-200'
                              : 'bg-rose-950 border-rose-600/50 text-rose-200'
                          }`}
                        >
                          <span className="block font-bold text-xs uppercase tracking-wider mb-1">
                            {isCorrect ? '✅ Sua Resposta (Correta):' : isUnanswered ? '⚠️ Você Não Respondeu:' : '❌ Sua Resposta (Incorreta):'}
                          </span>
                          <span className="font-semibold">
                            {userAnswerIdx !== undefined ? (
                              <>
                                <b>Opção {String.fromCharCode(65 + userAnswerIdx)}:</b> {q.options[userAnswerIdx]}
                              </>
                            ) : (
                              'Nenhuma opção foi selecionada'
                            )}
                          </span>
                        </div>

                        {/* Official Correct Answer */}
                        <div className="p-3 rounded-xl border bg-emerald-950 border-emerald-600/50 text-emerald-200">
                          <span className="block font-bold text-xs uppercase tracking-wider mb-1 text-emerald-400">
                            ⭐ Resposta Oficial Correta da Microsoft:
                          </span>
                          <span className="font-semibold">
                            <b>Opção {String.fromCharCode(65 + q.answer)}:</b> {q.options[q.answer]}
                          </span>
                        </div>
                      </div>

                      {/* Explanation Box */}
                      <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
                        <span className="font-bold text-amber-400 block text-xs">
                          Explicação Técnica da Prova:
                        </span>
                        <p className="text-slate-200 leading-relaxed">{q.explanation}</p>
                      </div>

                      {/* Action: Ask Gemini AI */}
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() =>
                            onAskAi(
                              `Errei a seguinte questão do simulado AZ-104: "${q.question}". Minha resposta foi "${
                                userAnswerIdx !== undefined ? q.options[userAnswerIdx] : 'Não respondida'
                              }", mas a resposta oficial correta é "${q.options[q.answer]}". Explicação oficial: ${
                                q.explanation
                              }. Pode me explicar passo a passo por que a opção correta é a melhor e como não cair mais nessa pegadinha?`
                            )
                          }
                          className="bg-purple-950/70 hover:bg-purple-900 text-purple-300 border border-purple-800/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Tirar Dúvida com Tutor Gemini</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      </>
      )}

      {/* ========================================================================= */}
      {/* MODAL: GERENCIAR E EDITAR QUESTÕES DE SIMULADO CUSTOMIZADO/IA             */}
      {/* ========================================================================= */}
      {showManageModal && selectedCustomSimulado && onUpdateCustomSimulado && (
        <ManageQuestionsModal
          isOpen={showManageModal}
          onClose={() => setShowManageModal(false)}
          simulado={selectedCustomSimulado}
          onUpdateSimulado={(updated) => {
            onUpdateCustomSimulado(updated);
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL: GERAR NOVO SIMULADO (EQUILIBRADO, DOMÍNIO OU IA GEMINI)            */}
      {/* ========================================================================= */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Gerar Novo Simulado AZ-104</h3>
                  <p className="text-xs text-slate-300">
                    Crie novos testes práticos com questões inéditas para testar seu conhecimento
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer p-1"
                aria-label="Fechar modal"
              >
                &times;
              </button>
            </div>

            {/* Simulado Title */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-300 font-semibold block">
                Nome do Simulado (Opcional):
              </label>
              <input
                type="text"
                value={generateTitle}
                onChange={(e) => setGenerateTitle(e.target.value)}
                placeholder="Ex: Simulado Personalizado - Redes & Storage"
                className="w-full bg-slate-950 text-slate-200 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-400 text-xs"
              />
            </div>

            {/* Quantity of Questions Selector */}
            <div className="space-y-2 text-xs bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between">
                <label className="text-slate-200 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  Quantidade de Questões:
                </label>
                <span className="text-xs font-bold text-purple-200 bg-purple-950 border border-purple-700 px-2.5 py-0.5 rounded-full shadow-sm">
                  {generateCount} questões (~{Math.round(generateCount * 2)} min)
                </span>
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[5, 10, 20, 30, 50].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setGenerateCount(preset)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition cursor-pointer border text-center ${
                      generateCount === preset
                        ? 'bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span>{preset} Qs</span>
                    <span className="block text-xs font-normal opacity-90">
                      {preset === 5 ? 'Express' : preset === 10 ? 'Revisão' : preset === 20 ? 'Médio' : preset === 30 ? 'Padrão' : 'Oficial'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Range Slider for fine tuning */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={generateCount}
                  onChange={(e) => setGenerateCount(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                />
                <span className="text-xs text-purple-200 font-mono font-bold w-14 text-right">
                  {generateCount} Qs
                </span>
              </div>
            </div>

            {/* Generation Strategy Selector */}
            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-semibold block">
                Tipo de Simulado Desejado:
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setGenerateType('balanced')}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start space-x-3 ${
                    generateType === 'balanced'
                      ? 'bg-purple-950 border-purple-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-200">
                      Simulado Equilibrado ({generateCount} Questões)
                    </span>
                    <span className="text-xs text-slate-300">
                      Distribuição balanceada entre os 5 domínios da prova oficial em ordem aleatória.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGenerateType('domain')}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start space-x-3 ${
                    generateType === 'domain'
                      ? 'bg-purple-950 border-purple-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Filter className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-200">
                      Foco em Domínio Específico ({generateCount} Questões)
                    </span>
                    <span className="text-xs text-slate-300">
                      Treino direcionado de {generateCount} questões focadas no domínio de sua preferência.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGenerateType('ai')}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-start space-x-3 ${
                    generateType === 'ai'
                      ? 'bg-purple-950 border-purple-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-200">
                      Gerar Inédito com IA Gemini ({generateCount} Questões)
                    </span>
                    <span className="text-xs text-slate-300">
                      Gera cenários novos com IA baseados nos Guias Teóricos Aprofundados e preenche com o banco oficial.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Domain Selector if 'domain' or 'ai' */}
            {(generateType === 'domain' || generateType === 'ai') && (
              <div className="space-y-1.5 text-xs">
                <label className="text-slate-300 font-semibold block">
                  Escolha o Domínio Principal:
                </label>
                <select
                  value={generateDomain}
                  onChange={(e) => setGenerateDomain(Number(e.target.value))}
                  className="w-full bg-slate-950 text-slate-200 px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-purple-400 cursor-pointer"
                >
                  <option value={1}>Domínio 1: Identidade & Governança (Entra ID, RBAC, Policies)</option>
                  <option value={2}>Domínio 2: Armazenamento (Storage Accounts, Lifecycle, SAS)</option>
                  <option value={3}>Domínio 3: Computação (VMs, Availability Sets, Scale Sets)</option>
                  <option value={4}>Domínio 4: Redes Virtuais (VNets, Peering, NSGs, Bastion, LB)</option>
                  <option value={5}>Domínio 5: Monitoramento & Backup (Monitor, KQL, Vaults)</option>
                </select>
              </div>
            )}

            {/* Modal Buttons */}
            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                disabled={isAiGenerating}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl font-semibold transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateNewSimulado}
                disabled={isAiGenerating}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow cursor-pointer disabled:opacity-50"
              >
                {isAiGenerating ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Gemini Criando Questões...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Criar Simulado</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
