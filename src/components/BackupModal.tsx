import React, { useRef, useState } from 'react';
import { AppDataBackup } from '../types';
import { Download, Upload, Cloud, CheckCircle2, AlertCircle, X, Shield, RefreshCw } from 'lucide-react';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBackupData: AppDataBackup;
  onRestoreBackup: (data: AppDataBackup) => void;
  onManualServerSync: () => Promise<boolean>;
  lastSyncTime?: string;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  currentBackupData,
  onRestoreBackup,
  onManualServerSync,
  lastSyncTime,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadBackup = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentBackupData, null, 2));
      const downloadAnchor = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `az104_backup_${dateStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e: any) {
      alert(`Falha ao exportar backup: ${e.message}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed: AppDataBackup = JSON.parse(text);

        if (!parsed.userAnswers && !parsed.customSimulados) {
          throw new Error("Arquivo JSON inválido ou incompatível.");
        }

        onRestoreBackup(parsed);
        setImportStatus({
          success: true,
          message: `Backup restaurado com sucesso! (${Object.keys(parsed.userAnswers || {}).length} respostas e ${(parsed.customSimulados || []).length} simulados restaurados).`,
        });
      } catch (err: any) {
        setImportStatus({
          success: false,
          message: `Erro ao importar arquivo: ${err.message}`,
        });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerServerSync = async () => {
    setIsSyncing(true);
    const ok = await onManualServerSync();
    setIsSyncing(false);
    if (ok) {
      setImportStatus({
        success: true,
        message: 'Progresso sincronizado com o backend com sucesso (salvo em disco no servidor).',
      });
    } else {
      setImportStatus({
        success: false,
        message: 'Falha ao sincronizar com o backend. Seus dados continuam salvos no navegador.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl shadow-2xl p-6 sm:p-7 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 text-sky-400 font-bold text-sm">
            <Shield className="w-5 h-5 text-sky-400" />
            <span>Gerenciamento de Dados, Backup & Sincronização</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Garanta que seu progresso nunca seja perdido ao limpar o cache ou trocar de computador. Você pode baixar uma cópia do arquivo JSON ou restaurá-la a qualquer momento.
        </p>

        {importStatus && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
              importStatus.success
                ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                : 'bg-rose-950/70 border-rose-500/60 text-rose-200'
            }`}
          >
            {importStatus.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            <span>{importStatus.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Export Button */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-bold text-white flex items-center gap-1.5">
                <Download className="w-4 h-4 text-sky-400" /> Exportar Backup JSON
              </span>
              <p className="text-[0.6875rem] text-slate-400 mt-1">
                Baixa um arquivo .json completo contendo todas as respostas marcadas, simulados customizados, flashcards e histórico.
              </p>
            </div>
            <button
              onClick={handleDownloadBackup}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-3 rounded-xl transition shadow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar az104_backup.json</span>
            </button>
          </div>

          {/* Import Button */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-bold text-white flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-emerald-400" /> Restaurar Backup JSON
              </span>
              <p className="text-[0.6875rem] text-slate-400 mt-1">
                Carrega um arquivo .json salvo anteriormente e restaura imediatamente todo o seu histórico no navegador.
              </p>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Selecionar Arquivo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Backend Persistence Status Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-600/40 flex items-center justify-center text-purple-400">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200 block">Persistência no Servidor</span>
              <span className="text-[0.6875rem] text-slate-400">
                {lastSyncTime ? `Última sincronização: ${lastSyncTime}` : 'Sincronização automática ativa'}
              </span>
            </div>
          </div>

          <button
            onClick={triggerServerSync}
            disabled={isSyncing}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Agora'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
