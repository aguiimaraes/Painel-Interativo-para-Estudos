import React, { useState, useEffect } from 'react';
import { Cloud, Sparkles, Play, Pause, RotateCcw, Timer, Award, Type } from 'lucide-react';

interface HeaderProps {
  globalReadinessPercent: number;
}

export const Header: React.FC<HeaderProps> = ({ globalReadinessPercent }) => {
  // Font Size Control: 'small' (12px, default reduzido), 'normal' (13.5px), 'large' (15px)
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>(() => {
    return (localStorage.getItem('az104_font_size') as any) || 'small';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    try {
      localStorage.setItem('az104_font_size', fontSize);
    } catch (e) {
      // ignore
    }
  }, [fontSize]);

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
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and App Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
                AZ-104 Command Center
              </h1>
              <span className="text-[0.625rem] uppercase tracking-wider font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3 text-amber-300" /> Powered by Gemini AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Microsoft Certified: Azure Administrator Associate &bull; Treinamento Completo
            </p>
          </div>
        </div>

        {/* Right side: Readiness Gauge & Pomodoro */}
        <div className="flex items-center space-x-4">
          {/* Readiness Gauge */}
          <div className="flex items-center space-x-3 bg-slate-800/80 px-4 py-1.5 rounded-xl border border-slate-700/80">
            <div className="text-right">
              <span className="text-[0.6875rem] text-slate-400 block font-medium">Prontidão Geral</span>
              <span className="text-lg font-black text-sky-400">{globalReadinessPercent}%</span>
            </div>
            <div className="w-11 h-11 relative flex items-center justify-center">
              <svg className="w-11 h-11 transform -rotate-90">
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-slate-700"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-sky-400 transition-all duration-700 ease-out"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <Award className="w-4 h-4 text-sky-400 absolute" />
            </div>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center space-x-1 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-xs">
            <Type className="w-3.5 h-3.5 text-slate-400 mr-1" />
            <span className="text-[0.625rem] text-slate-400 mr-1 hidden lg:inline font-medium">Fonte:</span>
            <button
              onClick={() => setFontSize('small')}
              title="Fonte Pequena (Compacta)"
              className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                fontSize === 'small' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('normal')}
              title="Fonte Média (Padrão)"
              className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                fontSize === 'normal' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              title="Fonte Grande"
              className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                fontSize === 'large' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              A+
            </button>
          </div>

          {/* Pomodoro Timer */}
          <div className="hidden sm:flex items-center space-x-2.5 text-xs bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl">
            <Timer className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-slate-400 text-[0.625rem] block font-medium">Foco Pomodoro:</span>
              <span className="font-mono text-amber-300 font-bold text-sm">{formattedTime}</span>
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
