import React from 'react';
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { DomainStats } from '../types';

interface WeakSpotDetectorProps {
  domains: DomainStats[];
  onOpenSummary: (domainNumber: number) => void;
  onPracticeDomain: (domainNumber: number) => void;
}

export const WeakSpotDetector: React.FC<WeakSpotDetectorProps> = ({
  domains,
  onOpenSummary,
  onPracticeDomain,
}) => {
  // Analyze domains where user has answered at least 1 question
  const analyzedDomains = domains.map((dom) => {
    const accuracy = dom.totalQuestions > 0 ? (dom.correctAnswers / dom.totalQuestions) * 100 : 0;
    return {
      ...dom,
      accuracy: Math.round(accuracy),
      isCritical: dom.totalQuestions > 0 && accuracy < 70,
    };
  });

  // Sort by lowest accuracy first among domains with questions
  const weakDomains = analyzedDomains
    .filter((d) => d.totalQuestions > 0 && d.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy);

  const domainFocusTopics: Record<number, { title: string; topics: string[]; tip: string }> = {
    1: {
      title: 'Identidade & Governança no Microsoft Entra ID',
      topics: ['SSPR com Writeback de Senha', 'Hierarquia Management Groups > Subscriptions > RG', 'Azure Policy vs RBAC', 'Unidades Administrativas (AUs)'],
      tip: 'Pegadinha comum: Contributor NÃO pode criar Role Assignments. Policy controla propriedades do recurso, RBAC controla quem tem acesso.',
    },
    2: {
      title: 'Armazenamento Seguro e Alta Disponibilidade',
      topics: ['LRS vs ZRS vs GRS vs GZRS', 'Archive Tier e Rehydration Time', 'Lifecycle Management Rules', 'Shared Access Signatures (SAS)'],
      tip: 'Lifecycle Management NÃO se aplica a Page Blobs (discos VHD). Arquivos no Archive Tier levam até 15h em Standard ou <1h em High Priority.',
    },
    3: {
      title: 'Recursos de Computação, VMs e Contêineres',
      topics: ['Availability Sets (Fault vs Update Domains)', 'VM Scale Sets (VMSS) e Autoscale', 'App Service Deployment Slots & Swap', 'Azure Container Instances (ACI)'],
      tip: 'Alterar SKU de VM em execução causa restart automático. Swap de Slots do App Service troca tráfego instantaneamente sem downtime.',
    },
    4: {
      title: 'Redes Virtuais (VNets), Roteamento e Segurança',
      topics: ['VNet Peering transitivo (requer NVA/Firewall e UDR)', 'NSG vs ASG (Application Security Groups)', 'Azure Bastion & Private Endpoints', 'VPN Gateway vs ExpressRoute'],
      tip: 'VNet Peering NÃO é transitivo por padrão. Regras de NSG com menor número têm prioridade mais alta (ex: 100 vence 200).',
    },
    5: {
      title: 'Monitoramento, Logs e Proteção de Dados',
      topics: ['Recovery Services Vault vs Backup Vault', 'Azure Monitor Metrics vs Log Analytics (KQL)', 'Alert Rules e Action Groups', 'Network Watcher (IP Flow Verify)'],
      tip: 'Recovery Services Vault atende VMs tradicionais; Backup Vault protege Discos gerenciados, Blobs e AKS. IP Flow Verify testa regras do NSG.',
    },
  };

  if (weakDomains.length === 0) {
    // If no weak domains found (either all >= 70% or not started)
    const hasAnswers = domains.some((d) => d.totalQuestions > 0);
    return (
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Detector de Pontos Fracos &bull; {hasAnswers ? 'Desempenho Estável (>70%)' : 'Aguardando Simulado'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {hasAnswers
                ? 'Excelente! Todos os domínios avaliados estão na faixa de aprovação recomendada pela Microsoft (700+).'
                : 'Responda questões nos simulados para que o detector aponte automaticamente seus temas mais críticos.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => onPracticeDomain(1)}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <span>Ir para Simulados</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  const primaryWeak = weakDomains[0];
  const details = domainFocusTopics[primaryWeak.id] || {
    title: primaryWeak.name,
    topics: ['Tópicos chave do domínio'],
    tip: 'Consulte os resumos teóricos para dominar as especificações de prova.',
  };

  return (
    <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-rose-950/30 border border-amber-500/40 p-5 rounded-2xl space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold bg-amber-950 text-amber-300 border border-amber-600/50 px-2 py-0.5 rounded-full">
                Detector de Pontos Fracos
              </span>
              <span className="text-xs text-rose-400 font-bold">
                Abaixo de 70% de aprovação
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Reforce: Domínio {primaryWeak.id} &bull; {primaryWeak.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-right">
          <div>
            <div className="text-xs text-slate-400 font-medium">Aproveitamento atual</div>
            <div className="text-xl font-black text-rose-400">
              {primaryWeak.accuracy}%
              <span className="text-xs text-slate-400 font-normal ml-1">
                ({primaryWeak.correctAnswers}/{primaryWeak.totalQuestions} acertos)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="md:col-span-2 space-y-2">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Tópicos prioritários para elevar sua nota para 700+:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {details.topics.map((t, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-amber-200 bg-amber-950 border border-amber-800/60 p-2.5 rounded-xl font-mono leading-relaxed">
            <strong>Dica do Instrutor:</strong> {details.tip}
          </p>
        </div>

        <div className="flex flex-col justify-center space-y-2.5 bg-slate-950/50 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
            Ações Rápidas de Correção
          </span>
          <button
            onClick={() => onOpenSummary(primaryWeak.id)}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 px-3 rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer min-h-[40px]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ler Resumo do Domínio {primaryWeak.id}</span>
          </button>
          <button
            onClick={() => onPracticeDomain(primaryWeak.id)}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-3 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer min-h-[40px]"
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Fazer Simulado deste Domínio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
