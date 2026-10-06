import React from 'react';
import { Achievement, StudyStreak } from '../types';
import { Award, Flame, X, CheckCircle2, Lock } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  streak: StudyStreak;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements,
  streak,
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 max-h-[88vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base">
            <Award className="w-5 h-5" />
            <span>Conquistas & Sequência de Estudos (Gamificação)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Streak Highlight Card */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-950 to-orange-950/40 p-4 rounded-2xl border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/10">
              🔥
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Sequência de Estudos Ativa: {streak.currentStreak} {streak.currentStreak === 1 ? 'Dia' : 'Dias'}
              </h4>
              <p className="text-xs text-slate-400">
                Seu recorde pessoal: {streak.bestStreak} dias &bull; Total de dias ativos: {streak.studyDays?.length || 1}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full">
              {unlockedCount} / {achievements.length} Medalhas
            </span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition flex items-start gap-3.5 ${
                ach.isUnlocked
                  ? 'bg-slate-950/80 border-amber-500/40 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0">
                {ach.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${ach.isUnlocked ? 'text-amber-300' : 'text-slate-300'}`}>
                    {ach.title}
                  </span>
                  {ach.isUnlocked ? (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Conquistada
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Bloqueada
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {ach.description}
                </p>
                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ach.isUnlocked ? 'bg-amber-400' : 'bg-sky-500'
                    }`}
                    style={{ width: `${ach.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
