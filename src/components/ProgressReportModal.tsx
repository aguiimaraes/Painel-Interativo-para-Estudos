import React from 'react';
import { DomainStats, ExamAttempt, StudyStreak } from '../types';
import { Award, CheckCircle2, Download, Printer, TrendingUp, X } from 'lucide-react';

interface ProgressReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  domains: DomainStats[];
  globalReadinessPercent: number;
  examAttempts: ExamAttempt[];
  streak: StudyStreak;
}

export const ProgressReportModal: React.FC<ProgressReportModalProps> = ({
  isOpen,
  onClose,
  domains,
  globalReadinessPercent,
  examAttempts,
  streak,
}) => {
  if (!isOpen) return null;

  const estimatedScore = Math.round((globalReadinessPercent / 100) * 1000);
  const isPassing = estimatedScore >= 700;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto print:border-none print:shadow-none print:max-h-none print:p-0 print:bg-white print:text-black">
        {/* Modal Actions Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Award className="w-5 h-5" />
            <span>Relatório Oficial de Desempenho &bull; AZ-104</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE REPORT CONTENT */}
        <div id="progress-report-printable" className="space-y-6 print:space-y-4">
          {/* Header Banner */}
          <div className="border-b-2 border-sky-600 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-black text-white print:text-slate-900 tracking-tight">
                RELATÓRIO DE PRONTIDÃO PARA O EXAME AZ-104
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Microsoft Certified: Azure Administrator Associate &bull; Diagnóstico Geral
              </p>
            </div>
            <div className="text-right text-xs text-slate-400 print:text-slate-600">
              <div>Data de Emissão: <span className="font-semibold text-slate-200 print:text-black">{todayStr}</span></div>
              <div>Sequência de Estudos: <span className="font-semibold text-amber-400 print:text-black">{streak.currentStreak} dias ativos</span></div>
            </div>
          </div>

          {/* Score Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center print:border-slate-300 print:bg-slate-50">
<<<<<<< HEAD
              <span className="text-xs font-bold text-slate-300 print:text-slate-600 uppercase">Nota Estimada Microsoft</span>
              <div className={`text-3xl font-black mt-1 ${isPassing ? 'text-emerald-400 print:text-emerald-700' : 'text-amber-400 print:text-amber-700'}`}>
                {estimatedScore} <span className="text-sm font-normal text-slate-400">/ 1000</span>
              </div>
              <span className="text-xs text-slate-400">Nota de corte: 700 pts</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center print:border-slate-300 print:bg-slate-50">
              <span className="text-xs font-bold text-slate-300 print:text-slate-600 uppercase">Prontidão Geral</span>
              <div className="text-3xl font-black text-sky-400 print:text-sky-700 mt-1">
                {globalReadinessPercent}%
              </div>
              <span className="text-xs text-slate-400">Aproveitamento médio</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center print:border-slate-300 print:bg-slate-50">
              <span className="text-xs font-bold text-slate-300 print:text-slate-600 uppercase">Parecer do Instrutor</span>
              <div className={`text-base font-black mt-2 uppercase ${isPassing ? 'text-emerald-400 print:text-emerald-700' : 'text-amber-400 print:text-amber-700'}`}>
                {isPassing ? 'Pronto para o Exame ✅' : 'Reforçar Pontos Fracos ⚠️'}
              </div>
              <span className="text-xs text-slate-400">
=======
              <span className="text-[0.6875rem] font-bold text-slate-400 print:text-slate-600 uppercase">Nota Estimada Microsoft</span>
              <div className={`text-3xl font-black mt-1 ${isPassing ? 'text-emerald-400 print:text-emerald-700' : 'text-amber-400 print:text-amber-700'}`}>
                {estimatedScore} <span className="text-sm font-normal text-slate-500">/ 1000</span>
              </div>
              <span className="text-[0.625rem] text-slate-500">Nota de corte: 700 pts</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center print:border-slate-300 print:bg-slate-50">
              <span className="text-[0.6875rem] font-bold text-slate-400 print:text-slate-600 uppercase">Prontidão Geral</span>
              <div className="text-3xl font-black text-sky-400 print:text-sky-700 mt-1">
                {globalReadinessPercent}%
              </div>
              <span className="text-[0.625rem] text-slate-500">Aproveitamento médio</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center print:border-slate-300 print:bg-slate-50">
              <span className="text-[0.6875rem] font-bold text-slate-400 print:text-slate-600 uppercase">Parecer do Instrutor</span>
              <div className={`text-base font-black mt-2 uppercase ${isPassing ? 'text-emerald-400 print:text-emerald-700' : 'text-amber-400 print:text-amber-700'}`}>
                {isPassing ? 'Pronto para o Exame ✅' : 'Reforçar Pontos Fracos ⚠️'}
              </div>
              <span className="text-[0.625rem] text-slate-500">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                {isPassing ? 'Desempenho compatível com aprovação' : 'Abaixo da margem de segurança de 70%'}
              </span>
            </div>
          </div>

          {/* Breakdown by Domain */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-slate-800 border-b border-slate-800 print:border-slate-300 pb-1">
              Desempenho por Domínio da Matriz Microsoft
            </h3>
            <div className="space-y-2.5">
              {domains.map((dom) => {
                const percent = dom.totalQuestions > 0 ? Math.round((dom.correctAnswers / dom.totalQuestions) * 100) : 0;
                const ok = percent >= 70;
                return (
                  <div key={dom.id} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 print:border-slate-300 print:bg-slate-50 flex items-center justify-between gap-4 text-xs">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-200 print:text-slate-900">
                          Domínio {dom.id}: {dom.name}
                        </span>
<<<<<<< HEAD
                        <span className="text-xs text-slate-300 print:text-slate-600 font-mono">
=======
                        <span className="text-[0.6875rem] text-slate-400 print:text-slate-600 font-mono">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                          {dom.correctAnswers}/{dom.totalQuestions} acertos &bull; Peso: {dom.weightRange}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 print:bg-slate-300 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right min-w-[70px]">
                      <span className={`font-bold ${ok ? 'text-emerald-400 print:text-emerald-700' : 'text-amber-400 print:text-amber-700'}`}>
                        {percent}%
                      </span>
<<<<<<< HEAD
                      <span className="text-xs block text-slate-400">
=======
                      <span className="text-[0.625rem] block text-slate-500">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                        {ok ? 'Aprovado' : 'Atenção'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam History Section */}
          {examAttempts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-slate-800 border-b border-slate-800 print:border-slate-300 pb-1">
                Histórico de Tentativas no Modo Exame
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {examAttempts.slice(-4).map((att) => (
                  <div key={att.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 print:border-slate-300 print:bg-slate-50 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-200 print:text-slate-900">{att.simuladoTitle}</span>
<<<<<<< HEAD
                      <span className="text-xs text-slate-400 block">
=======
                      <span className="text-[0.625rem] text-slate-500 block">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                        {new Date(att.timestamp).toLocaleDateString('pt-BR')} &bull; {Math.round(att.timeSpentSeconds / 60)} min
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`font-black text-sm ${att.passed ? 'text-emerald-400 print:text-emerald-700' : 'text-rose-400 print:text-rose-700'}`}>
                        {att.score} pts
                      </span>
<<<<<<< HEAD
                      <span className="text-xs block uppercase font-bold text-slate-300">
=======
                      <span className="text-[0.625rem] block uppercase font-bold text-slate-400">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                        {att.passed ? 'Aprovado' : 'Reprovado'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps Recommendations */}
          <div className="bg-sky-950/30 border border-sky-800/40 p-4 rounded-2xl text-xs space-y-2 print:border-slate-300 print:bg-slate-50">
            <span className="font-bold text-sky-300 print:text-sky-900 block">
              Orientações Estratégicas para o Dia do Exame:
            </span>
<<<<<<< HEAD
            <ul className="list-disc list-inside space-y-1 text-slate-200 print:text-slate-700 text-xs leading-relaxed">
=======
            <ul className="list-disc list-inside space-y-1 text-slate-300 print:text-slate-700 text-[0.6875rem]">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
              <li>Mantenha o foco em dominar os domínios de maior peso (Computação 20-25% e Redes 15-20%).</li>
              <li>Revise as pegadinhas teóricas no guia de resumos (VNet Peering transitivo, limites de NSG e Lifecycle Management).</li>
              <li>Simule condições reais de prova usando o Modo Exame com cronômetro sem pausas.</li>
            </ul>
          </div>

<<<<<<< HEAD
          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800 print:border-slate-300">
=======
          <div className="text-center text-[0.625rem] text-slate-500 pt-2 border-t border-slate-800 print:border-slate-300">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
            Documento gerado automaticamente pelo AZ-104 Command Center &bull; Plataforma Especialista em Certificações Azure
          </div>
        </div>
      </div>
    </div>
  );
};
