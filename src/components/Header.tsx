import React, { useState, useEffect } from 'react';
import { Cloud, Sparkles, Play, Pause, RotateCcw, Timer, Award, Flame, Download, Printer } from 'lucide-react';
import { StudyStreak } from '../types';

interface HeaderProps {
  globalReadinessPercent: number;
  streak?: StudyStreak;
  onOpenAchievements?: () => void;
  onOpenProgressReport?: () => void;
  onOpenBackup?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  globalReadinessPercent,
  streak,
  onOpenAchievements,
  onOpenProgressReport,
  onOpenBackup,
}) => {
  // Pomodoro Timer: default 25 minutes = 1500 seconds
  const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(1500);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, pomodoroSeconds]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setPomodoroSeconds(1500);
  };

  const minutes = Math.floor(pomodoroSeconds / 60);
  const seconds = pomodoroSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Circular gauge calculations (radius 18, circumference ~ 113)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * globalReadinessPercent) / 100;

  return (
<<<<<<< HEAD
    <header className="bg-[#0d1117] border-b border-[#21262d] px-4 lg:px-8 py-3">
=======
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and App Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
<<<<<<< HEAD
              <h1 className="text-xl font-bold text-sky-300">
                AZ-104 Command Center
              </h1>
              <span className="text-xs uppercase tracking-wider font-bold bg-purple-700 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
=======
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
                AZ-104 Command Center
              </h1>
              <span className="text-[0.625rem] uppercase tracking-wider font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                <Sparkles className="w-3 h-3 text-amber-300" /> Powered by Gemini AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Microsoft Certified: Azure Administrator Associate &bull; Treinamento Completo
            </p>
          </div>
        </div>

        {/* Right side: Readiness Gauge, Streak, Actions & Pomodoro */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Streak Badge */}
          {streak && (
            <button
              onClick={onOpenAchievements}
<<<<<<< HEAD
              className="flex items-center space-x-1.5 bg-amber-950 hover:bg-amber-900 border border-amber-600/70 px-3 py-2 rounded-xl transition cursor-pointer text-xs min-h-[36px]"
=======
              className="flex items-center space-x-1.5 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/50 px-3 py-1.5 rounded-xl transition cursor-pointer text-xs"
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
              title="Clique para ver Conquistas e Sequência"
            >
              <span className="text-sm">🔥</span>
              <span className="font-black text-amber-300">{streak.currentStreak}d</span>
<<<<<<< HEAD
              <span className="text-xs text-amber-300 hidden sm:inline">Streak</span>
=======
              <span className="text-[0.625rem] text-amber-400/80 hidden sm:inline">Streak</span>
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
            </button>
          )}

          {/* Report Button */}
          {onOpenProgressReport && (
            <button
              onClick={onOpenProgressReport}
              className="flex items-center space-x-1 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 px-2.5 py-1.5 rounded-xl transition cursor-pointer text-xs text-slate-300 hover:text-white"
              title="Exportar Relatório em PDF"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline font-semibold">Relatório</span>
            </button>
          )}

          {/* Backup Button */}
          {onOpenBackup && (
            <button
              onClick={onOpenBackup}
              className="flex items-center space-x-1 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 px-2.5 py-1.5 rounded-xl transition cursor-pointer text-xs text-slate-300 hover:text-white"
              title="Exportar / Restaurar Backup e Sincronização"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline font-semibold">Backup</span>
            </button>
          )}

          {/* Readiness Gauge */}
          <div className="flex items-center space-x-2.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <div className="text-right">
<<<<<<< HEAD
              <span className="text-xs text-slate-300 block font-medium">Prontidão</span>
              <span className="text-base font-black text-sky-400">{globalReadinessPercent}%</span>
            </div>
            <div className="w-9 h-9 relative flex items-center justify-center">
              <svg className="w-9 h-9 transform -rotate-90" role="img" aria-label={`Prontidão: ${globalReadinessPercent}%`}>
                <title>Prontidão: {globalReadinessPercent}%</title>
=======
              <span className="text-[0.625rem] text-slate-400 block font-medium">Prontidão</span>
              <span className="text-base font-black text-sky-400">{globalReadinessPercent}%</span>
            </div>
            <div className="w-9 h-9 relative flex items-center justify-center">
              <svg className="w-9 h-9 transform -rotate-90">
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
                <circle
                  cx="18"
                  cy="18"
                  r={15}
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-slate-700"
                  fill="transparent"
                />
                <circle
                  cx="18"
                  cy="18"
                  r={15}
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-sky-400 transition-all duration-700 ease-out"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 15}
                  strokeDashoffset={2 * Math.PI * 15 - (2 * Math.PI * 15 * globalReadinessPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <Award className="w-3.5 h-3.5 text-sky-400 absolute" />
            </div>
          </div>

          {/* Pomodoro Timer */}
          <div className="hidden sm:flex items-center space-x-2.5 text-xs bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl">
            <Timer className="w-4 h-4 text-amber-400" />
            <div>
<<<<<<< HEAD
              <span className="text-xs text-slate-300 block font-medium">Foco Pomodoro:</span>
              <span className="font-mono text-amber-300 font-bold text-sm" aria-live="polite" aria-label={`Timer: ${formattedTime}`}>{formattedTime}</span>
=======
              <span className="text-slate-400 text-[0.625rem] block font-medium">Foco Pomodoro:</span>
              <span className="font-mono text-amber-300 font-bold text-sm">{formattedTime}</span>
>>>>>>> aa3c4471f1eeb7ced3260df3c4cb483596460500
            </div>
            <div className="flex items-center space-x-1 ml-2">
              <button
                onClick={toggleTimer}
                aria-label={isRunning ? "Pausar cronômetro" : "Iniciar cronômetro"}
                className="bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded-lg text-xs transition"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={resetTimer}
                aria-label="Reiniciar cronômetro"
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white p-1.5 rounded-lg text-xs transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};