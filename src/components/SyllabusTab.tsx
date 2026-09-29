import React, { useState, useEffect } from 'react';
import { ListChecks, CheckSquare, Square, RotateCcw } from 'lucide-react';
import { syllabusData } from '../data/syllabus';

export const SyllabusTab: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('az104_syllabus_checks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('az104_syllabus_checks', JSON.stringify(checkedItems));
    } catch (e) {
      console.error(e);
    }
  }, [checkedItems]);

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReset = () => {
    if (confirm("Deseja desmarcar todos os itens do edital?")) {
      setCheckedItems({});
    }
  };

  const totalItems = syllabusData.reduce((acc, d) => acc + d.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-sky-400" />
              Checklist Oficial de Habilidades Medidas (AZ-104)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Acompanhe seu avanço em cada um dos tópicos cobrados no edital da certificação
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-semibold">Progresso no Edital</span>
              <span className="text-xs font-bold text-sky-400">{completedItems} de {totalItems} tópicos ({progressPercent}%)</span>
            </div>
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 border border-slate-700 transition cursor-pointer"
              title="Reiniciar checklist"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Syllabus Groups */}
        <div className="space-y-4">
          {syllabusData.map((group, gIdx) => {
            return (
              <div key={gIdx} className="bg-slate-950 p-4.5 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-sky-400 border-b border-slate-800/80 pb-2 flex items-center justify-between">
                  <span>{group.domain}</span>
                </h3>

                <div className="space-y-1.5">
                  {group.items.map((item, iIdx) => {
                    const key = `${gIdx}-${iIdx}`;
                    const isChecked = !!checkedItems[key];

                    return (
                      <div
                        key={key}
                        onClick={() => toggleItem(key)}
                        className={`flex items-start space-x-3 text-xs p-2 rounded-lg cursor-pointer transition select-none ${
                          isChecked
                            ? 'bg-sky-950/30 text-slate-300 font-medium'
                            : 'hover:bg-slate-900/60 text-slate-400'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={isChecked ? 'line-through text-slate-500' : 'text-slate-300'}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
