import React, { useState } from 'react';
import {
  Brain, Globe, Send, Sparkles, BookOpen, Microchip,
  RotateCw, CheckCircle2, MessageSquare, HelpCircle
} from 'lucide-react';
import { ChatMessage, GeneratedQuestion, Flashcard } from '../types';
import { defaultFlashcards } from '../data/flashcards';
import { notebookTranscript } from '../data/transcript';

// Markdown formatter for bold (**text** or __text__), bold-italic (***text***), italics (*text* or _text_), inline code (`code`), lists and headers
function parseInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  // Regex to split ***bold-italic***, **bold**, __bold__, `code`, *italic*, _italic_
  const regex = /(\*\*\*[\s\S]+?\*\*\*|\*\*[\s\S]+?\*\*|__[\s\S]+?__|`[^`]+`|\*[^*\n]+?\*|_[^_\n]+?_)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Bold + Italic: ***text***
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      return (
        <strong key={i} className="font-extrabold italic text-white tracking-wide" style={{ fontWeight: 800, color: '#ffffff' }}>
          {part.slice(3, -3)}
        </strong>
      );
    }

    // Bold: **text** or __text__
    if (
      (part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
      (part.startsWith('__') && part.endsWith('__') && part.length >= 4)
    ) {
      return (
        <strong key={i} className="font-extrabold text-white tracking-wide" style={{ fontWeight: 800, color: '#ffffff' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Inline Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={i} className="bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded font-mono text-[0.6875rem] border border-slate-700/50">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Italic: *text* or _text_
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) ||
      (part.startsWith('_') && part.endsWith('_') && part.length >= 2 && !part.startsWith('__'))
    ) {
      return (
        <em key={i} className="italic text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  }).filter(Boolean) as React.ReactNode[];
}

function FormattedMessage({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeBlockKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${codeBlockKey++}`}
            className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[0.6875rem] text-sky-300 overflow-x-auto my-2 select-all"
          >
            <code>{codeBlockLines.join('\n')}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    const trimmed = line.trim();

    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h5 key={i} className="font-bold text-sky-300 text-xs mt-2.5 mb-1">
          {parseInlineMarkdown(trimmed.slice(5))}
        </h5>
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h4 key={i} className="font-bold text-purple-300 text-sm mt-3 mb-1">
          {parseInlineMarkdown(trimmed.slice(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h3 key={i} className="font-bold text-white text-base mt-3 mb-1 border-b border-slate-800 pb-1">
          {parseInlineMarkdown(trimmed.slice(3))}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      elements.push(
        <h2 key={i} className="font-bold text-white text-base mt-3 mb-1">
          {parseInlineMarkdown(trimmed.slice(2))}
        </h2>
      );
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-purple-500 pl-3 my-1 text-slate-300 italic text-xs">
          {parseInlineMarkdown(trimmed.slice(2))}
        </blockquote>
      );
    } else if (/^\d+\.\s+/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (match) {
        elements.push(
          <div key={i} className="flex items-start space-x-2 my-1 pl-1">
            <span className="text-sky-400 font-bold font-mono text-xs mt-0.5 select-none">{match[1]}.</span>
            <span className="flex-1 text-slate-200">{parseInlineMarkdown(match[2])}</span>
          </div>
        );
      } else {
        elements.push(
          <p key={i} className="my-0.5 leading-relaxed text-slate-200">
            {parseInlineMarkdown(line)}
          </p>
        );
      }
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      elements.push(
        <div key={i} className="flex items-start space-x-2 my-1 pl-2">
          <span className="text-purple-400 font-bold mt-0.5 select-none">•</span>
          <span className="flex-1 text-slate-200">{parseInlineMarkdown(trimmed.slice(2))}</span>
        </div>
      );
    } else if (trimmed.length === 0) {
      elements.push(<div key={i} className="h-1.5" />);
    } else {
      elements.push(
        <p key={i} className="my-0.5 leading-relaxed text-slate-200">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  }

  if (inCodeBlock && codeBlockLines.length > 0) {
    elements.push(
      <pre
        key={`code-${codeBlockKey++}`}
        className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[0.6875rem] text-sky-300 overflow-x-auto my-2 select-all"
      >
        <code>{codeBlockLines.join('\n')}</code>
      </pre>
    );
  }

  return <div className="space-y-0.5 leading-relaxed">{elements}</div>;
}

interface AiTutorTabProps {
  initialPrompt?: string;
}

export const AiTutorTab: React.FC<AiTutorTabProps> = ({ initialPrompt = '' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'notebook' | 'generator' | 'diagram'>('chat');

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou seu instrutor especialista em Microsoft Azure e no exame AZ-104. Posso esclarecer conceitos complexos, analisar comandos CLI/PowerShell, tirar dúvidas sobre o edital ou resolver cenários de arquitetura. Como posso te ajudar hoje?',
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState<string>(initialPrompt);
  const [useSearch, setUseSearch] = useState<boolean>(false);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Notebook Analyzer State
  const [notebookQuery, setNotebookQuery] = useState<string>('');
  const [notebookReply, setNotebookReply] = useState<string>('');
  const [isNotebookLoading, setIsNotebookLoading] = useState<boolean>(false);

  // Structured JSON Question Generator State
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [generatedQuestion, setGeneratedQuestion] = useState<GeneratedQuestion | null>(null);
  const [generatedSelectedAnswer, setGeneratedSelectedAnswer] = useState<number | null>(null);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState<boolean>(false);

  // Flashcards State
  const [flashcards, setFlashcards] = useState<Flashcard[]>(defaultFlashcards);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState<boolean>(false);

  // Diagram Generator State
  const [diagramPrompt, setDiagramPrompt] = useState<string>('Topologia Hub-and-Spoke com Azure Firewall, Bastion, Gateway Transit e subnets');
  const [diagramReply, setDiagramReply] = useState<string>('');
  const [isDiagramLoading, setIsDiagramLoading] = useState<boolean>(false);

  // Send Chat Message
  const handleSendMessage = async (msgText?: string) => {
    const textToSend = msgText || chatInput;
    if (!textToSend.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: chatMessages.slice(-6),
          useSearch,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro na resposta');

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: new Date(),
        isGrounded: useSearch,
      };

      setChatMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      const isKeyError = err.message?.includes('GEMINI_API_KEY') || err.message?.includes('Chave');
      const text = isKeyError
        ? `Erro de configuração: ${err.message}. Verifique se a variável GEMINI_API_KEY está configurada.`
        : `${err.message || 'Erro ao conectar com a IA.'} Por favor, tente enviar sua pergunta novamente.`;
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Notebook Query
  const handleNotebookQuery = async (queryText?: string) => {
    const q = queryText || notebookQuery;
    if (!q.trim() || isNotebookLoading) return;

    setIsNotebookLoading(true);
    setNotebookReply('');

    try {
      const res = await fetch('/api/ai/query-notebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          transcript: notebookTranscript,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro');
      setNotebookReply(data.reply);
    } catch (err: any) {
      setNotebookReply(`Erro: ${err.message}`);
    } finally {
      setIsNotebookLoading(false);
    }
  };

  // Generate Question
  const handleGenerateQuestion = async () => {
    setIsGeneratingQuestion(true);
    setGeneratedQuestion(null);
    setGeneratedSelectedAnswer(null);

    try {
      const res = await fetch('/api/ai/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainNumber: selectedDomain }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro');
      setGeneratedQuestion(data);
    } catch (err: any) {
      alert(`Erro ao gerar questão: ${err.message}`);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  // Generate Flashcards
  const handleGenerateFlashcards = async () => {
    setIsGeneratingFlashcards(true);
    try {
      const res = await fetch('/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainNumber: selectedDomain }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro');
      if (Array.isArray(data) && data.length > 0) {
        setFlashcards(data);
        setFlippedCards({});
      }
    } catch (err: any) {
      alert(`Erro ao gerar flashcards: ${err.message}`);
    } finally {
      setIsGeneratingFlashcards(false);
    }
  };

  // Generate Diagram
  const handleGenerateDiagram = async () => {
    if (!diagramPrompt.trim() || isDiagramLoading) return;
    setIsDiagramLoading(true);
    setDiagramReply('');

    try {
      const res = await fetch('/api/ai/generate-diagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: diagramPrompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro');
      setDiagramReply(data.reply);
    } catch (err: any) {
      setDiagramReply(`Erro: ${err.message}`);
    } finally {
      setIsDiagramLoading(false);
    }
  };

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-purple-500/40 p-6 rounded-2xl space-y-5 shadow-2xl">
        {/* Header with Title and Search Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Gemini 3 AI Tutor & Azure Scenario Architect
              </h2>
              <p className="text-xs text-slate-400">
                Mentor inteligente treinado nos exames Microsoft Azure, geração JSON estruturada e análise de notebook
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center space-x-2 text-xs text-purple-300 bg-purple-950/60 border border-purple-800/80 px-3 py-1.5 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={useSearch}
                onChange={(e) => setUseSearch(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <span className="flex items-center gap-1 font-semibold">
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                Google Search Grounding
              </span>
            </label>
            <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Gemini 3 Flash Online
            </span>
          </div>
        </div>

        {/* Sub-tabs Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs">
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'chat' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Tutor com IA</span>
          </button>
          <button
            onClick={() => setActiveSubTab('notebook')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'notebook' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Analisador do Notebook</span>
          </button>
          <button
            onClick={() => setActiveSubTab('generator')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'generator' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Microchip className="w-3.5 h-3.5" />
            <span>Gerador JSON & Flashcards 3D</span>
          </button>
          <button
            onClick={() => setActiveSubTab('diagram')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'diagram' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Especificador de Diagramas</span>
          </button>
        </div>

        {/* SUBTAB 1: CHAT TUTOR */}
        {activeSubTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-950 p-4.5 rounded-2xl border border-slate-800 flex flex-col justify-between h-[520px]">
              <div className="flex-grow overflow-y-auto space-y-4 pr-1 text-xs scrollbar-thin">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl border leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-slate-900 border-slate-800 text-slate-200 ml-6'
                        : 'bg-slate-900/90 border-purple-500/30 text-slate-200 mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 font-bold">
                      <span className={msg.role === 'user' ? 'text-sky-400' : 'text-purple-400 flex items-center gap-1.5'}>
                        {msg.role === 'user' ? 'Você' : <><Brain className="w-3.5 h-3.5" /> Tutor Gemini AZ-104</>}
                      </span>
                    </div>
                    <FormattedMessage content={msg.text} />
                  </div>
                ))}
                {isChatLoading && (
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-purple-500/30 text-purple-300 mr-6 flex items-center space-x-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span>Gemini 3 Flash analisando cenário Azure...</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="pt-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Ex: Explique o funcionamento do VNet Peering transitivo e como resolver com NVA..."
                  className="flex-grow bg-slate-900 text-xs text-slate-200 px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-400"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isChatLoading}
                  className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white px-5 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Enviar</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Prompts Panel */}
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Prompts Rápidos do Exame
                </h3>
                <div className="space-y-2 text-xs">
                  {[
                    'Explique o funcionamento do VNet Peering transitivo e como resolver com Hub-and-Spoke e NVA.',
                    'Qual a diferença prática no AZ-104 entre Recovery Services Vault e Backup Vault?',
                    'Como funciona a avaliação de prioridade de regras no Network Security Group (NSG)?',
                    'Qual a diferença entre Azure Load Balancer Standard e Application Gateway?',
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p)}
                      className="w-full text-left bg-slate-900 hover:bg-slate-800 p-2.5 rounded-xl border border-slate-800 text-slate-300 transition text-xs cursor-pointer"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: NOTEBOOK ANALYZER */}
        {activeSubTab === 'notebook' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  Analisador do Notebook & Transcrição da Aula
                </h3>
                <p className="text-xs text-slate-400">
                  Consulte diretamente o conteúdo ministrado na aula sobre Tenants, Subscriptions, Entra ID e Unidades Administrativas.
                </p>
              </div>
              <span className="text-xs bg-sky-950 text-sky-300 border border-sky-800 px-3 py-1 rounded-xl font-semibold">
                Fonte: Transcrição Oficial do Notebook
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Pergunte à IA sobre o conteúdo citado na aula:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={notebookQuery}
                    onChange={(e) => setNotebookQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleNotebookQuery();
                    }}
                    placeholder="Ex: Como o professor explicou a relação de 1 Tenant para N Subscriptions?"
                    className="flex-grow bg-slate-900 text-xs text-slate-200 px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-sky-400"
                  />
                  <button
                    onClick={() => handleNotebookQuery()}
                    disabled={isNotebookLoading}
                    className="bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold px-5 py-3 rounded-xl text-xs transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>{isNotebookLoading ? 'Analisando...' : 'Consultar'}</span>
                  </button>
                </div>

                {notebookReply && (
                  <div className="bg-slate-900 p-4.5 rounded-xl border border-sky-500/30 text-xs text-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <b className="text-sky-400 font-bold">Resposta Baseada no Notebook:</b>
                    </div>
                    <div className="text-xs text-slate-200">
                      <FormattedMessage content={notebookReply} />
                    </div>
                  </div>
                )}
              </div>

              {/* Notebook Highlight Topics */}
              <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                <b className="text-amber-400 block font-bold">Tópicos Destaque do Notebook:</b>
                <ul className="space-y-2 text-slate-300">
                  <li
                    className="cursor-pointer hover:text-white transition p-1.5 rounded-lg bg-slate-950/60"
                    onClick={() => handleNotebookQuery('Como funciona a relação entre Tenant do Entra ID e as Subscriptions do Azure?')}
                  >
                    &bull; Relação Tenant vs Subscriptions (1 Tenant N Subs)
                  </li>
                  <li
                    className="cursor-pointer hover:text-white transition p-1.5 rounded-lg bg-slate-950/60"
                    onClick={() => handleNotebookQuery('Qual a função e benefício das Unidades Administrativas (AUs)?')}
                  >
                    &bull; Unidades Administrativas (AUs) e Delegação Regional
                  </li>
                  <li
                    className="cursor-pointer hover:text-white transition p-1.5 rounded-lg bg-slate-950/60"
                    onClick={() => handleNotebookQuery('Quais são as diferenças de recursos entre as licenças Microsoft Entra ID Free, P1 e P2?')}
                  >
                    &bull; Licenciamento Entra ID (Free, P1 e P2) & SSPR
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: STRUCTURED JSON GENERATOR & FLASHCARDS */}
        {activeSubTab === 'generator' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Microchip className="w-4 h-4 text-purple-400" />
                  Gerador Estruturado JSON (Questões & Flashcards 3D)
                </h3>
                <p className="text-xs text-slate-400">
                  Gere novas questões e baralhos interativos no formato estruturado oficial com resposta técnica e justificativa.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-slate-900 text-xs text-slate-200 px-3 py-2 rounded-xl border border-slate-700 cursor-pointer"
                >
                  <option value="">Qualquer Domínio do AZ-104</option>
                  <option value="1">Domínio 1: Identidade & Governança</option>
                  <option value="2">Domínio 2: Armazenamento (Storage)</option>
                  <option value="3">Domínio 3: Recursos de Computação</option>
                  <option value="4">Domínio 4: Redes Virtuais (VNets)</option>
                  <option value="5">Domínio 5: Monitoramento & Backup</option>
                </select>

                <button
                  onClick={handleGenerateQuestion}
                  disabled={isGeneratingQuestion}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGeneratingQuestion ? 'Gerando...' : 'Gerar Nova Questão'}</span>
                </button>

                <button
                  onClick={handleGenerateFlashcards}
                  disabled={isGeneratingFlashcards}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isGeneratingFlashcards ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingFlashcards ? 'Gerando...' : 'Gerar Flashcards'}</span>
                </button>
              </div>
            </div>

            {/* Generated Question Display */}
            {generatedQuestion && (
              <div className="bg-slate-900 p-5 rounded-2xl border border-purple-500/40 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                  <span className="bg-purple-950 text-purple-300 border border-purple-800 text-xs font-bold px-3 py-1 rounded-lg">
                    {generatedQuestion.domainName}
                  </span>
                  <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Resposta Estruturada JSON por Gemini 3 Flash
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                  {generatedQuestion.question}
                </p>

                <div className="space-y-2.5">
                  {generatedQuestion.options.map((opt, idx) => {
                    const isSelected = generatedSelectedAnswer === idx;
                    let style = "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700";
                    if (generatedSelectedAnswer !== null) {
                      if (idx === generatedQuestion.correctAnswerIndex) {
                        style = "bg-emerald-950 border-emerald-500 text-emerald-100 font-bold";
                      } else if (isSelected) {
                        style = "bg-rose-950 border-rose-500 text-rose-100 font-bold";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setGeneratedSelectedAnswer(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between cursor-pointer ${style}`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-[0.625rem] text-slate-300">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {generatedSelectedAnswer !== null && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <b className={generatedSelectedAnswer === generatedQuestion.correctAnswerIndex ? "text-emerald-400 block font-bold text-sm" : "text-rose-400 block font-bold text-sm"}>
                      {generatedSelectedAnswer === generatedQuestion.correctAnswerIndex ? "Resposta Correta! 🎉" : `Incorreto. A opção correta é ${String.fromCharCode(65 + generatedQuestion.correctAnswerIndex)}.`}
                    </b>
                    <p className="text-slate-300 leading-relaxed">{generatedQuestion.explanation}</p>
                    <p className="text-amber-300 italic font-mono pt-1">Dica de Prova: {generatedQuestion.technicalTip}</p>
                  </div>
                )}
              </div>
            )}

            {/* Flashcards Deck (3D Flip Effect) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <RotateCw className="w-4 h-4" /> Baralho de Flashcards Interativos (Clique no cartão para virar 3D)
                </h4>
                <span className="text-[0.6875rem] text-slate-400">
                  Frente: Pergunta &bull; Verso: Gabarito e Conceito
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {flashcards.map((card, idx) => {
                  const isFlipped = !!flippedCards[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleFlip(idx)}
                      className="perspective-1000 h-56 cursor-pointer select-none"
                    >
                      <div
                        className={`transform-style-3d relative w-full h-full transition-transform duration-500 ${
                          isFlipped ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* FRONT */}
                        <div className="backface-hidden absolute inset-0 p-5 bg-slate-900 border border-amber-500/40 rounded-2xl flex flex-col justify-between shadow-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-[0.625rem] font-bold text-amber-400 uppercase tracking-wider bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                              {card.tag}
                            </span>
                            <span className="text-[0.625rem] text-slate-400 font-mono">Card #{idx + 1}</span>
                          </div>
                          <div className="my-auto py-2">
                            <span className="text-[0.625rem] text-amber-300 font-bold uppercase block mb-1">
                              Pergunta / Conceito:
                            </span>
                            <p className="text-xs font-semibold text-slate-100 leading-relaxed">
                              {card.front}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[0.625rem] text-slate-400">
                            <span>Clique para virar o card</span>
                            <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                        </div>

                        {/* BACK */}
                        <div className="rotate-y-180 backface-hidden absolute inset-0 p-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/50 rounded-2xl flex flex-col justify-between shadow-2xl text-emerald-100">
                          <div className="flex justify-between items-center border-b border-emerald-800/60 pb-1.5">
                            <span className="text-[0.625rem] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Resposta & Gabarito Técnico
                            </span>
                            <span className="text-[0.625rem] bg-emerald-900/80 text-emerald-200 font-mono px-2 py-0.5 rounded">
                              AZ-104
                            </span>
                          </div>
                          <div className="my-auto py-2 overflow-y-auto max-h-32 scrollbar-thin">
                            <p className="text-xs font-medium text-slate-100 leading-relaxed">
                              {card.back}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[0.625rem] text-emerald-400">
                            <span>Clique para desvirar</span>
                            <RotateCw className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: DIAGRAM SPECIFICATION */}
        {activeSubTab === 'diagram' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Especificador de Diagramas & Arquitetura Azure com Gemini
              </h3>
              <p className="text-xs text-slate-400">
                Gere especificações arquiteturais completas e diagramas em Mermaid.js de topologias de rede, roteamento e alta disponibilidade.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={diagramPrompt}
                onChange={(e) => setDiagramPrompt(e.target.value)}
                placeholder="Ex: Hub-and-Spoke com Azure Firewall, Bastion e Peering"
                className="flex-grow bg-slate-900 text-xs text-slate-200 px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-400"
              />
              <button
                onClick={handleGenerateDiagram}
                disabled={isDiagramLoading}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isDiagramLoading ? 'Especificando...' : 'Gerar Especificação'}</span>
              </button>
            </div>

            {diagramReply && (
              <div className="bg-slate-900 p-5 rounded-xl border border-purple-500/30 text-xs text-slate-200 space-y-3 font-mono leading-relaxed whitespace-pre-wrap">
                {diagramReply}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
