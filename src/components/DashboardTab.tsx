import React from 'react';
import { Sparkles, CheckCircle2, Play, Award, BarChart3 } from 'lucide-react';
import { DomainStats } from '../types';

interface DashboardTabProps {
  domains: DomainStats[];
  onStartQuiz: () => void;
  onOpenAi: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ domains, onStartQuiz, onOpenAi }) => {
  return (
    <div className="space-y-6">
      {/* 5 Domain Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {domains.map((dom) => {
          const percent = dom.totalQuestions > 0 ? Math.round((dom.correctAnswers / dom.totalQuestions) * 100) : 0;
          return (
            <div
              key={dom.id}
              className="bg-slate-900/80 backdrop-blur border border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Domínio {dom.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dom.color}`}>
                  {dom.weightRange}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mt-2 line-clamp-2">
                {dom.name}
              </h3>
              <div className="mt-4">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                  <span>{dom.correctAnswers}/{dom.totalQuestions} acertos</span>
                  <span className="text-sky-400 font-bold">{percent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Tutor Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950/50 via-slate-900 to-indigo-950/50 border border-purple-800/40 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-600/30 flex-shrink-0">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Aprenda com o Tutor Gemini AI Multimodal
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Consulte dúvidas sobre os tópicos da aula e do notebook oficial, gere questões inéditas em JSON estruturado, crie flashcards com visualização 3D, solucione erros de Azure CLI/PowerShell e consulte cenários de arquitetura.
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

      {/* Domain Weights & Simulator Guide Grid */}
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
                Total de 150 Questões únicas e sem repetição distribuídas em 3 simulados
              </p>
            </div>
            <span className="text-xs font-bold bg-sky-950 text-sky-300 border border-sky-800 px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
              <Award className="w-3.5 h-3.5 text-sky-400" /> Aprovação: 700 / 1000 Pts
            </span>
          </div>

          <div className="space-y-3.5 pt-2">
            {domains.map((dom) => {
              // Extract numeric weight percentage for visual representation
              const weightValues = [25, 20, 25, 20, 15];
              const val = weightValues[dom.id - 1] || 20;

              return (
                <div key={dom.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">
                      {dom.id}. {dom.name}
                    </span>
                    <span className="text-slate-400 font-mono">{dom.weightRange}</span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full ${
                        dom.id === 1 ? 'bg-blue-500' :
                        dom.id === 2 ? 'bg-emerald-500' :
                        dom.id === 3 ? 'bg-purple-500' :
                        dom.id === 4 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${(val / 30) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulados Summary Guide */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 mb-3">
              <h3 className="font-bold text-slate-100 text-sm">Guia dos 3 Simulados AZ-104</h3>
            </div>
            <ul className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  <b className="text-white">Simulado 1 (Q1 a 50):</b> Identidade, Governança, RBAC, Licenças P1/P2, Storage Tiers & Access Keys.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  <b className="text-white">Simulado 2 (Q51 a 100):</b> VMs, Scale Sets (VMSS), ARM/Bicep, Containers (ACR/ACI/Apps), Subnets, NSGs & Bastion.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  <b className="text-white">Simulado 3 (Q101 a 150):</b> VNet Peering, Load Balancers, App Gateway, KQL Log Analytics, Backup & Disaster Recovery.
                </span>
              </li>
            </ul>
          </div>

          <button
            onClick={onStartQuiz}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition shadow flex items-center justify-center space-x-2 text-xs uppercase tracking-wider cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Iniciar Simulados Práticos</span>
          </button>
        </div>
      </div>
    </div>
  );
};
