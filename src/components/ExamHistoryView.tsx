import React from 'react';
import { ExamAttempt } from '../types';
import { Award, Calendar, CheckCircle2, Clock, RotateCcw, TrendingUp, XCircle, Trash2 } from 'lucide-react';

interface ExamHistoryViewProps {
  attempts: ExamAttempt[];
  onClearHistory?: () => void;
  onSelectAttempt?: (attempt: ExamAttempt) => void;
}

export const ExamHistoryView: React.FC<ExamHistoryViewProps> = ({
  attempts,
  onClearHistory,
}) => {
  if (attempts.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-sky-950/60 border border-sky-600/40 flex items-center justify-center text-sky-400 mx-auto">
          <TrendingUp className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-white">Nenhuma tentativa de exame registrada ainda</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Complete um simulado no Modo Prova Oficial para registrar sua primeira pontuação na escala Microsoft (0-1000) e acompanhar seu gráfico de evolução rumo aos 700+ pontos.
        </p>
      </div>
    );
  }

  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter((a) => a.passed).length;
  const passRate = Math.round((passedAttempts / totalAttempts) * 100);
  const highestScore = attempts.reduce((max, a) => Math.max(max, a.score), 0);
  const averageScore = Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
<<<<<<< HEAD
          <span className="text-xs text-slate-300 uppercase font-bold">Tentativas</span>
          <div className="text-2xl font-black text-white mt-1">{totalAttempts}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <span className="text-xs text-slate-300 uppercase font-bold">Taxa de Aprovação</span>
=======
          <span className="text-[0.6875rem] text-slate-400 uppercase font-bold">Tentativas</span>
          <div className="text-2xl font-black text-white mt-1">{totalAttempts}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <span className="text-[0.6875rem] text-slate-400 uppercase font-bold">Taxa de Aprovação</span>
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
          <div className={`text-2xl font-black mt-1 ${passRate >= 60 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {passRate}%
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
<<<<<<< HEAD
          <span className="text-xs text-slate-300 uppercase font-bold">Maior Nota</span>
          <div className="text-2xl font-black text-sky-400 mt-1">{highestScore} <span className="text-xs font-normal text-slate-400">/ 1000</span></div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <span className="text-xs text-slate-300 uppercase font-bold">Média Geral</span>
          <div className="text-2xl font-black text-purple-400 mt-1">{averageScore} <span className="text-xs font-normal text-slate-400">/ 1000</span></div>
=======
          <span className="text-[0.6875rem] text-slate-400 uppercase font-bold">Maior Nota</span>
          <div className="text-2xl font-black text-sky-400 mt-1">{highestScore} <span className="text-xs font-normal text-slate-500">/ 1000</span></div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center">
          <span className="text-[0.6875rem] text-slate-400 uppercase font-bold">Média Geral</span>
          <div className="text-2xl font-black text-purple-400 mt-1">{averageScore} <span className="text-xs font-normal text-slate-500">/ 1000</span></div>
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
        </div>
      </div>

      {/* Evolution Chart (Bars representing each attempt) */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              Evolução da Pontuação ao Longo do Tempo
            </h4>
<<<<<<< HEAD
            <p className="text-xs text-slate-300">
=======
            <p className="text-xs text-slate-400">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
              Linha pontilhada verde indica a nota de corte para aprovação no AZ-104 (700 pontos)
            </p>
          </div>
          {onClearHistory && (
            <button
              onClick={onClearHistory}
<<<<<<< HEAD
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition min-h-[32px] px-2 py-1 rounded-lg"
=======
              className="text-[0.6875rem] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition"
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Histórico</span>
            </button>
          )}
        </div>

        {/* Chart Visualization */}
        <div className="relative pt-6 pb-2">
          {/* 700 Passing Threshold Line */}
          <div
            className="absolute left-0 right-0 border-b-2 border-dashed border-emerald-500/70 z-10 flex justify-end pr-2 pointer-events-none"
            style={{ bottom: '70%' }}
          >
<<<<<<< HEAD
            <span className="text-xs font-bold bg-slate-900 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/50 shadow -translate-y-3">
=======
            <span className="text-[0.625rem] font-bold bg-slate-900 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/50 shadow -translate-y-3">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
              Corte Microsoft: 700 pts
            </span>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-3 h-44 px-2 overflow-x-auto pb-4">
            {attempts.map((att, idx) => {
              const heightPercent = Math.min(100, Math.max(10, Math.round((att.score / 1000) * 100)));
              const isPassing = att.passed;
              const dateLabel = new Date(att.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

              return (
                <div key={att.id || idx} className="flex-1 min-w-[48px] max-w-[80px] flex flex-col items-center gap-1.5 group">
<<<<<<< HEAD
                  <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-white">
=======
                  <span className="text-[0.6875rem] font-mono font-bold text-slate-300 group-hover:text-white">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                    {att.score}
                  </span>
                  <div className="w-full bg-slate-800 rounded-t-lg h-36 flex items-end overflow-hidden p-1">
                    <div
                      className={`w-full rounded-md transition-all duration-500 ${
                        isPassing
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-md shadow-emerald-500/20'
                          : 'bg-gradient-to-t from-rose-600 to-amber-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
<<<<<<< HEAD
                  <span className="text-xs text-slate-400 font-mono">
=======
                  <span className="text-[0.625rem] text-slate-400 font-mono">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                    #{idx + 1} ({dateLabel})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Attempts List */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-200">Registro Completo de Tentativas</h4>
        <div className="space-y-2.5">
          {[...attempts].reverse().map((att, idx) => (
            <div
              key={att.id || idx}
              className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{att.simuladoTitle}</span>
                  <span
<<<<<<< HEAD
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
=======
                    className={`text-[0.625rem] font-bold px-2 py-0.5 rounded-full ${
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                      att.passed
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {att.passed ? 'APROVADO' : 'NÃO APROVADO'}
                  </span>
                </div>
<<<<<<< HEAD
                <div className="flex items-center gap-3 text-xs text-slate-300">
=======
                <div className="flex items-center gap-3 text-xs text-slate-400">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(att.timestamp).toLocaleString('pt-BR')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {Math.round(att.timeSpentSeconds / 60)} min gastos
                  </span>
                  <span>
                    {att.correctCount}/{att.totalQuestions} acertos ({att.percentage}%)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-2xl font-black ${att.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {att.score}
<<<<<<< HEAD
                  <span className="text-xs text-slate-400 font-normal ml-1">/ 1000</span>
                </div>
                <span className="text-xs text-slate-400">
=======
                  <span className="text-xs text-slate-500 font-normal ml-1">/ 1000</span>
                </div>
                <span className="text-[0.6875rem] text-slate-500">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                  {att.passed ? 'Parabéns!' : 'Refaça os pontos fracos'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
