import React, { useState } from 'react';
import { SpacedFlashcard } from '../types';
import { calculateSM2, isCardDue, getNextIntervalPreview } from '../utils/spacedRepetition';
import {
  RotateCw, Sparkles, Brain, CheckCircle, AlertTriangle,
  Flame, Award, Layers, Calendar, ArrowRight, RotateCcw
} from 'lucide-react';

interface SpacedFlashcardsProps {
  cards: SpacedFlashcard[];
  onUpdateCards: (newCards: SpacedFlashcard[]) => void;
  onCardReviewed: () => void;
}

export const SpacedFlashcardsTab: React.FC<SpacedFlashcardsProps> = ({
  cards,
  onUpdateCards,
  onCardReviewed,
}) => {
  const [filterMode, setFilterMode] = useState<'due' | 'all' | 'hard'>('due');
  const [selectedDomain, setSelectedDomain] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Filter cards based on user selection
  const filteredCards = cards.filter((card) => {
    if (selectedDomain !== 'all' && card.domainNumber !== selectedDomain) return false;
    if (filterMode === 'due') return isCardDue(card);
    if (filterMode === 'hard') return (card.easeFactor || 2.5) < 2.2 || card.repetitions === 0;
    return true;
  });

  const currentCard: SpacedFlashcard | undefined = filteredCards[currentIndex];

  const dueCount = cards.filter(isCardDue).length;
  const masteredCount = cards.filter((c) => c.repetitions >= 3 && (c.easeFactor || 2.5) >= 2.4).length;

  const handleRate = (grade: 0 | 1 | 2 | 3) => {
    if (!currentCard) return;

    const updated = calculateSM2(currentCard, grade);
    const newCards = cards.map((c) => (c.id === updated.id ? updated : c));
    onUpdateCards(newCards);
    onCardReviewed();

    // Advance to next card or stay if finished
    setIsFlipped(false);
    if (currentIndex >= filteredCards.length - 1) {
      setCurrentIndex(0);
    }
  };

  const handleGenerateAiFlashcards = async () => {
    setIsGenerating(true);
    try {
      const dom = selectedDomain === 'all' ? 1 : selectedDomain;
      const res = await fetch('/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainNumber: dom }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar');

      if (Array.isArray(data) && data.length > 0) {
        const todayStr = new Date().toISOString().split('T')[0];
        const newSpacedCards: SpacedFlashcard[] = data.map((fc: any, i: number) => ({
          id: `ai-fc-${Date.now()}-${i}`,
          domainNumber: Number(dom),
          tag: fc.tag || `Domínio ${dom}`,
          front: fc.front,
          back: fc.back,
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          dueDate: todayStr,
        }));

        onUpdateCards([...cards, ...newSpacedCards]);
        setFilterMode('due');
        setCurrentIndex(0);
        setIsFlipped(false);
      }
    } catch (e: any) {
      alert(`Falha ao gerar flashcards: ${e.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with SM-2 Metrics */}
      <div className="bg-slate-900/90 border border-purple-500/40 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 flex-shrink-0">
            <Brain className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Repetição Espaçada Inteligente (Algoritmo SM-2 / Anki)
            </h2>
            <p className="text-xs text-slate-400">
              O algoritmo prioriza automaticamente os conceitos em que você tem mais dificuldade e agenda revisões no momento ideal de retenção.
            </p>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-950 border border-amber-600/50 px-3.5 py-2 rounded-xl text-center">
            <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Para Hoje</div>
            <div className="text-lg font-black text-amber-400">{dueCount}</div>
          </div>
          <div className="bg-emerald-950 border border-emerald-600/50 px-3.5 py-2 rounded-xl text-center">
            <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Dominados</div>
            <div className="text-lg font-black text-emerald-400">{masteredCount}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl text-center">
            <div className="text-xs text-slate-300 font-bold uppercase tracking-wider">Total</div>
            <div className="text-lg font-black text-slate-200">{cards.length}</div>
          </div>
        </div>
      </div>

      {/* Filter and Generator Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => { setFilterMode('due'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filterMode === 'due' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Devidos Hoje ({dueCount})</span>
          </button>
          <button
            onClick={() => { setFilterMode('hard'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filterMode === 'hard' ? 'bg-rose-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Mais Difíceis</span>
          </button>
          <button
            onClick={() => { setFilterMode('all'); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filterMode === 'all' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Todos ({cards.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDomain}
            onChange={(e) => {
              setSelectedDomain(e.target.value === 'all' ? 'all' : Number(e.target.value));
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-slate-950 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            <option value="all">Todos os Domínios</option>
            <option value="1">Domínio 1: Identidade</option>
            <option value="2">Domínio 2: Storage</option>
            <option value="3">Domínio 3: Computação</option>
            <option value="4">Domínio 4: Redes (VNets)</option>
            <option value="5">Domínio 5: Monitoramento</option>
          </select>

          <button
            onClick={handleGenerateAiFlashcards}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold px-3.5 py-1.5 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isGenerating ? 'Gerando...' : 'Gerar com IA'}</span>
          </button>
        </div>
      </div>

      {/* Main Flashcard Review Area */}
      {filteredCards.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 mx-auto flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Parabéns! Nenhuma revisão pendente aqui! 🎉</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Você concluiu todos os cartões programados para este filtro hoje. O algoritmo reagendará novas repetições conforme o intervalo ideal.
            </p>
          </div>
          <button
            onClick={() => { setFilterMode('all'); setCurrentIndex(0); }}
            className="bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
          >
            Revisar Todos os Cards Livres
          </button>
        </div>
      ) : currentCard ? (
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Card Counter & Domain tag */}
          <div className="flex justify-between items-center text-xs text-slate-400 px-1">
            <span className="font-bold text-purple-400 bg-purple-950/60 border border-purple-800/60 px-3 py-1 rounded-lg">
              {currentCard.tag}
            </span>
            <div className="flex items-center gap-2">
              <span>Card {currentIndex + 1} de {filteredCards.length}</span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                Repetições: {currentCard.repetitions}
              </span>
            </div>
          </div>

          {/* Interactive Card with 3D Flip */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="perspective-1000 min-h-[260px] cursor-pointer select-none"
          >
            <div
              className={`transform-style-3d relative w-full min-h-[260px] transition-transform duration-500 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF CARD */}
              <div className="backface-hidden absolute inset-0 p-8 bg-slate-900 border border-slate-700 hover:border-purple-500/60 transition rounded-2xl flex flex-col justify-between shadow-2xl">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-purple-400">
                    <Brain className="w-3.5 h-3.5" /> Frente &bull; Pergunta / Cenário
                  </span>
                  <span className="text-xs text-slate-300 italic">Clique para ver o gabarito</span>
                </div>
                <div className="my-auto py-4">
                  <h3 className="text-base font-bold text-slate-100 leading-relaxed text-center">
                    {currentCard.front}
                  </h3>
                </div>
                <div className="text-center text-xs text-slate-300 font-mono">
                  Toque para revelar a explicação técnica
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="rotate-y-180 backface-hidden absolute inset-0 p-8 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/50 rounded-2xl flex flex-col justify-between shadow-2xl">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" /> Verso &bull; Fundamento Técnico
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    Facilidade: {currentCard.easeFactor}x
                  </span>
                </div>
                <div className="my-auto py-3">
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                    {currentCard.back}
                  </p>
                </div>
                <div className="text-xs text-amber-300 text-center italic">
                  Avalie como foi sua lembrança abaixo para agendar a próxima repetição
                </div>
              </div>
            </div>
          </div>

          {/* SM-2 Recall Feedback Buttons (Visible when flipped or ready) */}
          {isFlipped ? (
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2.5 animate-fadeIn">
              <div className="text-center text-xs text-slate-400 font-semibold">
                Como foi sua lembrança deste conceito?
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <button
                  onClick={() => handleRate(0)}
                  className="bg-rose-950/80 hover:bg-rose-900 border border-rose-700/80 text-rose-200 p-2.5 rounded-xl flex flex-col items-center gap-1 transition cursor-pointer"
                >
                  <span className="font-black text-sm">Errei</span>
                  <span className="text-xs text-rose-300 font-mono">
                    {getNextIntervalPreview(currentCard, 0)}
                  </span>
                </button>
                <button
                  onClick={() => handleRate(1)}
                  className="bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 text-amber-200 p-2.5 rounded-xl flex flex-col items-center gap-1 transition cursor-pointer"
                >
                  <span className="font-black text-sm">Difícil</span>
                  <span className="text-xs text-amber-300 font-mono">
                    {getNextIntervalPreview(currentCard, 1)}
                  </span>
                </button>
                <button
                  onClick={() => handleRate(2)}
                  className="bg-sky-950/80 hover:bg-sky-900 border border-sky-700/80 text-sky-200 p-2.5 rounded-xl flex flex-col items-center gap-1 transition cursor-pointer"
                >
                  <span className="font-black text-sm">Bom</span>
                  <span className="text-xs text-sky-300 font-mono">
                    {getNextIntervalPreview(currentCard, 2)}
                  </span>
                </button>
                <button
                  onClick={() => handleRate(3)}
                  className="bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-200 p-2.5 rounded-xl flex flex-col items-center gap-1 transition cursor-pointer"
                >
                  <span className="font-black text-sm">Fácil</span>
                  <span className="text-xs text-emerald-300 font-mono">
                    {getNextIntervalPreview(currentCard, 3)}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center text-xs">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
                  setIsFlipped(false);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Anterior
              </button>
              <button
                onClick={() => setIsFlipped(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2 rounded-xl transition shadow cursor-pointer"
              >
                Mostrar Resposta
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
                  setIsFlipped(false);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Próximo
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
