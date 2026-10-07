import React from 'react';
import { Sparkles, CheckCircle2, Play, Award, BarChart3, Flame, Printer, Shield, ArrowRight } from 'lucide-react';
import { DomainStats, StudyStreak, Achievement } from '../types';
import { WeakSpotDetector } from './WeakSpotDetector';

interface DashboardTabProps {
  domains: DomainStats[];
  onStartQuiz: (domainFilter?: number) => void;
  onOpenAi: () => void;
  onOpenSummary: (domainNumber: number) => void;
  streak: StudyStreak;
  achievements: Achievement[];
  onOpenAchievements: () => void;
  onOpenReport: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  domains,
  onStartQuiz,
  onOpenAi,
  onOpenSummary,
  streak,
  achievements,
  onOpenAchievements,
  onOpenReport,
}) => {
  const unlockedBadges = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="space-y-6">
      {/* 1. Weak Spot Detector (Proactive Error & Accuracy Analysis) */}
      <WeakSpotDetector
        domains={domains}
        onOpenSummary={onOpenSummary}
        onPracticeDomain={(domId) => onStartQuiz(domId)}
      />

      {/* 2. Gamification & Streak Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
            🔥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                Sequência de Estudos: {streak.currentStreak} {streak.currentStreak === 1 ? 'dia ativo' : 'dias ativos'}
              </span>
              <span className="text-xs bg-amber-950 text-amber-300 border border-amber-600 px-2 py-0.5 rounded-full font-bold">
                {unlockedBadges} / {achievements.length} Medalhas
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Estude diariamente e complete simulados para desbloquear todas as conquistas do AZ-104.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={onOpenAchievements}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer min-h-[36px]"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Ver Conquistas</span>
          </button>
          <button
            onClick={onOpenReport}
            className="text-xs bg-sky-600 hover:bg-sky-500 text-white font-bold px-3.5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer min-h-[36px]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Exportar Relatório PDF</span>
          </button>
        </div>
      </div>

      {/* 3. 5 Domain Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {domains.map((dom, idx) => {
          const percent = dom.totalQuestions > 0 ? Math.round((dom.correctAnswers / dom.totalQuestions) * 100) : 0;
          const isLast = idx === domains.length - 1;
          const isPassing = percent >= 70;
          return (
            <div
              key={dom.id}
              className={`bg-slate-900/80 backdrop-blur border border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition ${
                isLast ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Domínio {dom.id}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${dom.color}`}>
                  {dom.weightRange}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mt-2 line-clamp-2">
                {dom.name}
              </h3>
              <div className="mt-4">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPassing ? 'bg-emerald-500' : 'bg-sky-500'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                  <span>{dom.correctAnswers}/{dom.totalQuestions} acertos</span>
                  <span className={isPassing ? "text-emerald-400 font-bold" : "text-sky-400 font-bold"}>{percent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. AI Tutor Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/60 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-600/30 flex-shrink-0">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Aprenda com o Tutor Gemini AI Multimodal & Flashcards SM-2
            </h2>
            <p className="text-xs text-slate-200 mt-1 max-w-2xl leading-relaxed">
              Consulte dúvidas sobre os tópicos da aula e do notebook oficial, pratique com baralhos inteligentes de repetição espaçada (Anki), gere questões inéditas em JSON estruturado e solucione comandos de Azure CLI/PowerShell.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenAi}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg whitespace-nowrap flex items-center space-x-2 cursor-pointer flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Abrir Centro de IA</span>
        </button>
      </div>

      {/* 5. Domain Weights & Simulator Guide Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain Weights Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-400" />
                Peso dos Domínios no Exame Oficial AZ-104
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Total de 150 Questões únicas e sem repetição distribuídas em 3 simulados oficiais
              </p>
            </div>
            <span className="text-xs font-bold bg-sky-950 text-sky-300 border border-sky-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
              <Award className="w-3.5 h-3.5 text-sky-400" /> Aprovação: 700 / 1000 Pts
            </span>
          </div>

          <div className="space-y-3.5 pt-2">
            {domains.map((dom) => {
              const weightValues = [25, 20, 25, 20, 15];
              const weightVal = weightValues[dom.id - 1] || 20;

              return (
                <div key={dom.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">
                      Domínio {dom.id}: {dom.name}
                    </span>
                    <span className="text-slate-400">{dom.weightRange}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${weightVal * 4}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Simulator CTA Card */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-base font-bold text-white">Simulado Modo Exame Real</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Teste seus conhecimentos sob as mesmas condições da prova da Microsoft: 100 minutos contínuos, sem consulta ao gabarito durante o teste, e nota final na escala 0-1000 com corte de 700.
            </p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => onStartQuiz()}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Iniciar Simulado Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-400 text-center">
              Suas respostas são salvas automaticamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
