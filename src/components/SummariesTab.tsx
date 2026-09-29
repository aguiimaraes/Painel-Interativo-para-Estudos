import React, { useState } from 'react';
import {
  Search, BookOpen, ArrowRight, ShieldCheck, Terminal, AlertTriangle,
  ChevronDown, ChevronUp, Sparkles, Filter, Database, Server, Network,
  Layers, Lock, Activity
} from 'lucide-react';
import { theoreticalSummaries } from '../data/summaries';
import { SummaryTopic } from '../types';

interface SummariesTabProps {
  onAskAi: (topic: string) => void;
}

export const SummariesTab: React.FC<SummariesTabProps> = ({ onAskAi }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<number | 'all'>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(theoreticalSummaries[0].id);

  const domainOptions = [
    { id: 'all', label: 'Todos os Tópicos', icon: Layers },
    { id: 1, label: '1. Identidade & Governança', icon: ShieldCheck },
    { id: 2, label: '2. Armazenamento (Storage)', icon: Database },
    { id: 3, label: '3. Computação (VMs/Apps)', icon: Server },
    { id: 4, label: '4. Redes Virtuais (VNets)', icon: Network },
    { id: 5, label: '5. Monitoramento & Backup', icon: Activity },
  ];

  const filteredSummaries = theoreticalSummaries.filter((s) => {
    const matchesDomain = selectedDomain === 'all' || s.domainNumber === selectedDomain;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.title.toLowerCase().includes(term) ||
      s.summary.toLowerCase().includes(term) ||
      s.deepExplanation.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term) ||
      s.examTraps.some((t) => t.toLowerCase().includes(term));
    return matchesDomain && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              Guias Teóricos Aprofundados AZ-104 & Pegadinhas Oficiais
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Material técnico completo, regras arquiteturais, limites oficiais e armadilhas comuns cobradas nas provas da Microsoft
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar conceito, serviço, pegadinha ou SKU..."
              className="bg-slate-800 text-xs text-slate-200 pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-400 w-72 md:w-80 shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </span>
          {domainOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedDomain === opt.id;
            return (
              <button
                key={String(opt.id)}
                onClick={() => setSelectedDomain(opt.id as any)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Guide notice */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-400">
        <span>Exibindo <b>{filteredSummaries.length}</b> tópicos de estudo aprofundados</span>
        <span className="text-slate-500 hidden sm:inline">Clique em cada tópico para expandir a fundamentação completa</span>
      </div>

      {/* Deep Dive Topics List */}
      <div className="space-y-4">
        {filteredSummaries.map((topic: SummaryTopic) => {
          const isExpanded = expandedCardId === topic.id;

          return (
            <div
              key={topic.id}
              className={`bg-slate-900/90 rounded-2xl border transition-all duration-200 overflow-hidden shadow-lg ${
                isExpanded ? 'border-sky-500/50 shadow-sky-950/30' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header (clickable to toggle) */}
              <div
                onClick={() => toggleExpand(topic.id)}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-850 transition"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className={`w-5 h-5 ${topic.color}`} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[0.625rem] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-slate-800 text-sky-400 border border-slate-700">
                        Domínio {topic.domainNumber} &bull; {topic.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {topic.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center self-end sm:self-auto space-x-3 flex-shrink-0">
                  <span className="text-xs text-sky-400 font-semibold flex items-center gap-1">
                    {isExpanded ? 'Recolher' : 'Ver Conteúdo Completo'}
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </div>
              </div>

              {/* Expanded Detailed Content */}
              {isExpanded && (
                <div className="border-t border-slate-800 bg-slate-950/70 p-5 space-y-6">
                  {/* Section 1: Deep Architectural Explanation */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" /> Fundamentação Teórica & Arquitetura Detalhada
                    </h4>
                    <div className="text-xs text-slate-200 leading-relaxed space-y-2 whitespace-pre-wrap bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      {topic.deepExplanation}
                    </div>
                  </div>

                  {/* Section 2: Key Specifications & Rules */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Especificações Críticas & Limites Técnicos
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {topic.keySpecifications.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-slate-900/80 p-3 rounded-xl border border-emerald-500/20 text-xs text-slate-300 flex items-start space-x-2"
                        >
                          <span className="text-emerald-400 font-bold mt-0.5">&bull;</span>
                          <span className="leading-relaxed">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Exam Traps (High Contrast Alert Callout) */}
                  <div className="bg-amber-950/30 border border-amber-500/40 p-4 rounded-xl space-y-2">
                    <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ⚠️ Pegadinhas de Prova & Dicas Oficiais AZ-104
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-200">
                      {topic.examTraps.map((trap, tIdx) => (
                        <li key={tIdx} className="flex items-start space-x-2 leading-relaxed">
                          <span className="text-amber-400 font-bold">⚡</span>
                          <span>{trap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 4: CLI & PowerShell Commands if present */}
                  {topic.commands && topic.commands.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-purple-400" /> Comandos Cobrados no Exame
                      </h4>
                      <div className="space-y-2">
                        {topic.commands.map((cmdItem, cIdx) => (
                          <div key={cIdx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between text-[0.6875rem]">
                              <span className="font-semibold text-purple-300">{cmdItem.description}</span>
                              <span className="text-[0.625rem] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                                {cmdItem.tool}
                              </span>
                            </div>
                            <div className="font-mono text-xs text-sky-300 bg-slate-950 p-2.5 rounded-lg border border-slate-850 overflow-x-auto select-all">
                              <code>{cmdItem.cmd}</code>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer Action: Ask AI Tutor about this topic */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onAskAi(`Explique detalhadamente o tópico oficial de AZ-104: "${topic.title}". Forneça cenários práticos de arquitetura, pegadinhas de múltipla escolha e comandos Azure CLI.`)}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Aprofundar esse tópico com o Tutor Gemini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredSummaries.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center text-slate-400 text-xs space-y-2">
            <p>Nenhum tópico teórico encontrado para o filtro "{searchTerm}".</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDomain('all'); }}
              className="text-sky-400 font-semibold hover:underline cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
