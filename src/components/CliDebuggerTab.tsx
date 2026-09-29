import React, { useState } from 'react';
import { Terminal, Bug, Sparkles, Copy, Check } from 'lucide-react';

export const CliDebuggerTab: React.FC = () => {
  const [codeSnippet, setCodeSnippet] = useState<string>(
    `az storage account create --name staz104prod --resource-group rg-az104 --location eastus --sku Standard_LRS --encryption-services blob`
  );
  const [errorInput, setErrorInput] = useState<string>('');
  const [debugResult, setDebugResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const sampleSnippets = [
    {
      title: "Provisionar Storage Account via Azure CLI",
      lang: "Azure CLI",
      code: `az group create --name rg-az104 --location eastus\naz storage account create --name staz104prod --resource-group rg-az104 --location eastus --sku Standard_LRS`
    },
    {
      title: "Configurar VNet Peering Bidirecional",
      lang: "Azure CLI",
      code: `az network vnet peering create --name Link-VNet1-to-VNet2 --resource-group rg-net --vnet-name VNet1 --remote-vnet VNet2 --allow-vnet-access\naz network vnet peering create --name Link-VNet2-to-VNet1 --resource-group rg-net --vnet-name VNet2 --remote-vnet VNet1 --allow-vnet-access`
    },
    {
      title: "Template Declarativo Bicep (Storage Account)",
      lang: "Bicep",
      code: `param location string = resourceGroup().location\nresource stg 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: 'staz104bicep'\n  location: location\n  sku: { name: 'Standard_LRS' }\n  kind: 'StorageV2'\n}`
    },
    {
      title: "Reiniciar Máquinas Virtuais em Lote via PowerShell",
      lang: "Azure PowerShell",
      code: `Get-AzVM -ResourceGroupName "rg-prod" | Restart-AzVM`
    }
  ];

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDebugCode = async () => {
    if (!codeSnippet.trim() || isLoading) return;
    setIsLoading(true);
    setDebugResult('');

    try {
      const res = await fetch('/api/ai/debug-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeSnippet,
          errorOutput: errorInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro na depuração');
      setDebugResult(data.reply);
    } catch (err: any) {
      setDebugResult(`Erro ao executar diagnóstico: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            Sintaxe Azure CLI, PowerShell, Bicep & Debugger AI
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Exemplos práticos de comandos e assistente com Gemini 3 para diagnosticar e resolver erros de script
          </p>
        </div>

        {/* Cheat-sheet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {sampleSnippets.map((s, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                <span className="font-bold text-sky-400">{s.title}</span>
                <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800 font-mono">
                  {s.lang}
                </span>
              </div>
              <pre className="text-slate-300 font-mono text-[11px] bg-slate-900/80 p-3 rounded-lg overflow-x-auto my-1">
                {s.code}
              </pre>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleCopy(s.code, idx)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === idx ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Debugger Box */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <Bug className="w-4 h-4 text-purple-400" />
              Debugger de Scripts & Diagnóstico de Erros com Gemini 3
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 block font-semibold">
                Comando ou Código (CLI / Bicep / PowerShell / ARM):
              </label>
              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                rows={5}
                placeholder="Insira o comando ou script que deseja analisar..."
                className="w-full bg-slate-900 text-xs text-slate-200 font-mono p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-400 block font-semibold">
                Mensagem de Erro do Azure (Opcional):
              </label>
              <textarea
                value={errorInput}
                onChange={(e) => setErrorInput(e.target.value)}
                rows={5}
                placeholder="Cole aqui a mensagem de erro (ex: ResourceNotFound, AccountNameInvalid, AuthorizationFailed)..."
                className="w-full bg-slate-900 text-xs text-slate-200 font-mono p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleDebugCode}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Analisando Causa Raiz...' : 'Analisar com IA'}</span>
            </button>
          </div>

          {debugResult && (
            <div className="bg-slate-900 p-5 rounded-xl border border-purple-500/40 text-xs space-y-2 leading-relaxed whitespace-pre-wrap text-slate-200">
              <b className="text-purple-400 block font-bold border-b border-slate-800 pb-2">
                Diagnóstico Oficial do Instrutor Gemini:
              </b>
              <div>{debugResult}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
