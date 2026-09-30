import React, { useState } from 'react';
import { Question, CustomSimulado } from '../types';
import { Edit3, Trash2, X, Plus, Check, AlertCircle, FileText } from 'lucide-react';

interface ManageQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulado: CustomSimulado;
  onUpdateSimulado: (updated: CustomSimulado) => void;
}

export const ManageQuestionsModal: React.FC<ManageQuestionsModalProps> = ({
  isOpen,
  onClose,
  simulado,
  onUpdateSimulado,
}) => {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  if (!isOpen) return null;

  const handleDeleteQuestion = (questionId: number) => {
    if (simulado.questions.length <= 1) {
      alert("O simulado deve conter pelo menos 1 questão.");
      return;
    }
    if (confirm("Deseja realmente remover esta questão individual do simulado?")) {
      const updatedQuestions = simulado.questions.filter((q) => q.id !== questionId);
      onUpdateSimulado({
        ...simulado,
        questions: updatedQuestions,
      });
    }
  };

  const handleSaveEditedQuestion = (updated: Question) => {
    const updatedQuestions = simulado.questions.map((q) => (q.id === updated.id ? updated : q));
    onUpdateSimulado({
      ...simulado,
      questions: updatedQuestions,
    });
    setEditingQuestion(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl shadow-2xl p-6 space-y-5 max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Gerenciar Questões: {simulado.title}
            </h3>
            <p className="text-xs text-slate-400">
              Edite o texto de qualquer questão gerada por IA ou remova questões individuais ({simulado.questions.length} questões no total)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
          {simulado.questions.map((q, idx) => (
            <div
              key={q.id || idx}
              className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-purple-900/60 text-purple-300 font-bold flex items-center justify-center text-[0.625rem]">
                    {idx + 1}
                  </span>
                  <span className="text-[0.6875rem] font-bold text-slate-400 uppercase tracking-wider">
                    {q.domainName}
                  </span>
                  <span className="text-[0.6875rem] text-emerald-400 font-semibold">
                    (Gabarito: Opção {String.fromCharCode(65 + q.answer)})
                  </span>
                </div>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {q.question}
                </p>
                <div className="text-[0.6875rem] text-slate-400 italic line-clamp-1">
                  Opção correta: {q.options[q.answer]}
                </div>
              </div>

              <div className="flex sm:flex-col justify-end gap-2 flex-shrink-0">
                <button
                  onClick={() => setEditingQuestion({ ...q })}
                  className="bg-purple-950/70 hover:bg-purple-900 text-purple-300 border border-purple-800/80 px-3 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/80 px-3 py-1.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remover</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition cursor-pointer"
          >
            Concluir
          </button>
        </div>
      </div>

      {/* SUB-MODAL: EDIT QUESTION FORM */}
      {editingQuestion && (
        <div className="fixed inset-0 z-60 bg-slate-950/90 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/60 w-full max-w-2xl rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-400" />
                Editar Questão
              </h4>
              <button
                onClick={() => setEditingQuestion(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Enunciado da Questão:</label>
              <textarea
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 text-slate-200 p-3 rounded-xl border border-slate-700 focus:border-purple-400"
              />
            </div>

            {/* 4 Options */}
            <div className="space-y-2">
              <label className="font-bold text-slate-300">Alternativas & Gabarito Oficial:</label>
              {editingQuestion.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingQuestion({ ...editingQuestion, answer: idx })}
                    className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center transition cursor-pointer ${
                      editingQuestion.answer === idx
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="Clique para marcar como resposta correta"
                  >
                    {String.fromCharCode(65 + idx)}
                  </button>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const nextOpts = [...editingQuestion.options];
                      nextOpts[idx] = e.target.value;
                      setEditingQuestion({ ...editingQuestion, options: nextOpts });
                    }}
                    className={`flex-1 bg-slate-950 p-2.5 rounded-xl border text-slate-200 text-xs ${
                      editingQuestion.answer === idx ? 'border-emerald-500' : 'border-slate-800'
                    }`}
                  />
                  {editingQuestion.answer === idx && (
                    <span className="text-[0.625rem] text-emerald-400 font-bold uppercase whitespace-nowrap">
                      Correta ✓
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Explicação Técnica da Prova:</label>
              <textarea
                value={editingQuestion.explanation}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 text-slate-200 p-3 rounded-xl border border-slate-700 focus:border-purple-400"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingQuestion(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleSaveEditedQuestion(editingQuestion)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2 rounded-xl transition shadow cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Salvar Questão</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
