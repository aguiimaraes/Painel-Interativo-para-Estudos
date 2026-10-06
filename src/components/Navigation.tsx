import React from 'react';
import { ActiveTab } from '../types';
import { PieChart, FileSignature, Brain, BookOpen, Terminal, Network, ListChecks } from 'lucide-react';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: PieChart, highlight: false },
    { id: 'quiz', label: 'Simulados Práticos', icon: FileSignature, highlight: 'amber' },
    { id: 'ai', label: 'Tutor IA & Gemini', icon: Brain, highlight: 'purple' },
    { id: 'resumos', label: 'Guias Teóricos Aprofundados', icon: BookOpen, highlight: false },
    { id: 'cli', label: 'CLI, Bicep & Debugger', icon: Terminal, highlight: false },
    { id: 'cheatsheets', label: 'Matriz & Decisões', icon: Network, highlight: false },
    { id: 'syllabus', label: 'Checklist Edital', icon: ListChecks, highlight: false },
  ];

  return (
<<<<<<< HEAD
    <nav className="bg-[#0d1117] border-b border-[#21262d] px-4 lg:px-8" aria-label="Navegação principal">
      <div className="max-w-7xl mx-auto flex space-x-1.5 overflow-x-auto py-2.5 text-xs font-semibold scrollbar-thin" role="list">
=======
    <nav className="bg-slate-900 border-b border-slate-800 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex space-x-1.5 overflow-x-auto py-2.5 text-xs font-semibold scrollbar-thin">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          let btnClass = "px-3.5 py-2 rounded-xl flex items-center space-x-2 transition whitespace-nowrap cursor-pointer ";
          if (isActive) {
            btnClass += "bg-sky-600 text-white shadow-md shadow-sky-600/30";
          } else if (item.highlight === 'purple') {
            btnClass += "text-purple-300 hover:text-white hover:bg-slate-800 bg-purple-950/30 border border-purple-800/40";
          } else if (item.highlight === 'amber') {
            btnClass += "text-amber-300 hover:text-white hover:bg-slate-800 bg-amber-950/20 border border-amber-800/30";
          } else if (item.highlight === 'sky') {
            btnClass += "text-sky-300 hover:text-white hover:bg-slate-800 bg-sky-950/20 border border-sky-800/30";
          } else {
<<<<<<< HEAD
            btnClass += "text-slate-300 hover:text-white hover:bg-slate-800";
=======
            btnClass += "text-slate-400 hover:text-white hover:bg-slate-800";
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={btnClass}
<<<<<<< HEAD
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight === 'purple' ? 'text-purple-400' : item.highlight === 'amber' ? 'text-amber-400' : item.highlight === 'sky' ? 'text-sky-400' : 'text-slate-300'}`} />
=======
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight === 'purple' ? 'text-purple-400' : item.highlight === 'amber' ? 'text-amber-400' : item.highlight === 'sky' ? 'text-sky-400' : 'text-slate-400'}`} />
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
