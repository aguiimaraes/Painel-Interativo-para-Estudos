import React from 'react';
import { Network, Database, ShieldAlert } from 'lucide-react';

export const DecisionMatrixTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-amber-400" />
            Matriz Comparativa e Guias de Decisão Rápida
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tabelas de referência rápida para gabaritar questões de decisão arquitetural no exame AZ-104
          </p>
        </div>

        {/* 1. Storage Redundancy Matrix */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            1. Redundância de Storage Account (LRS vs ZRS vs GRS vs GZRS)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Cópias</th>
                  <th className="p-3">Zonas / Regiões</th>
                  <th className="p-3">Proteção Contra</th>
                  <th className="p-3">Durabilidade (9's)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-white">LRS (Local)</td>
                  <td className="p-3">3 cópias síncronas</td>
                  <td className="p-3">1 único Data Center</td>
                  <td className="p-3">Falhas de hardware de disco/rack</td>
                  <td className="p-3 font-mono text-emerald-400">99.999999999% (11 noves)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-white">ZRS (Zonal)</td>
                  <td className="p-3">3 cópias síncronas</td>
                  <td className="p-3">3 Zonas de Disponibilidade (1 região)</td>
                  <td className="p-3">Queda completa de um Data Center inteiro</td>
                  <td className="p-3 font-mono text-emerald-400">99.9999999999% (12 noves)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-white">GRS (Geográfico)</td>
                  <td className="p-3">6 cópias (3 LRS primária + 3 LRS secundária)</td>
                  <td className="p-3">2 regiões distintas a centenas de km</td>
                  <td className="p-3">Desastres regionais completos</td>
                  <td className="p-3 font-mono text-emerald-400">99.99999999999999% (16 noves)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-white">GZRS (Geo-Zonal)</td>
                  <td className="p-3">6 cópias (3 ZRS primária + 3 LRS secundária)</td>
                  <td className="p-3">3 Zonas na Primária + 1 na Secundária</td>
                  <td className="p-3">Desastre regional + Queda zonal simultânea</td>
                  <td className="p-3 font-mono text-emerald-400">99.99999999999999% (16 noves)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Recovery Services Vault vs Backup Vault */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            2. Recovery Services Vault vs Backup Vault
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <span className="font-bold text-sky-300 block text-sm">Recovery Services Vault</span>
              <p className="text-slate-300">Cargas de trabalho IaaS/PaaS tradicionais:</p>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                <li><b className="text-white">Azure Virtual Machines (VMs):</b> backup completo consistente.</li>
                <li><b className="text-white">Azure Files (File Shares):</b> compartilhamentos SMB.</li>
                <li><b className="text-white">Bancos em VMs:</b> SQL Server e SAP HANA instalados em VM Azure.</li>
                <li><b className="text-white">On-premises:</b> Servidores com MARS Agent ou MABS.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <span className="font-bold text-amber-300 block text-sm">Backup Vault</span>
              <p className="text-slate-300">Cargas de trabalho modernas nativas de dados:</p>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                <li><b className="text-white">Azure Managed Disks:</b> snapshots granulares de discos.</li>
                <li><b className="text-white">Azure Blob Storage:</b> backup operacional contínuo.</li>
                <li><b className="text-white">Azure Database for PostgreSQL:</b> servidores flexíveis.</li>
                <li><b className="text-white">Azure Kubernetes Service (AKS):</b> backup de clusters e volumes.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Load Balancer L4 vs Application Gateway L7 */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
            <Network className="w-4 h-4 text-sky-400" />
            3. Azure Load Balancer (Camada 4) vs Application Gateway (Camada 7)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                  <th className="p-3">Recurso</th>
                  <th className="p-3">Azure Load Balancer</th>
                  <th className="p-3">Azure Application Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">Camada OSI</td>
                  <td className="p-3">Camada 4 (Transporte - TCP / UDP)</td>
                  <td className="p-3 text-sky-400 font-semibold">Camada 7 (Aplicação - HTTP / HTTPS / HTTP2)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Roteamento Inteligente</td>
                  <td className="p-3">Baseado na 5-tuple (IP origem/dest, porta, protocolo)</td>
                  <td className="p-3 text-sky-400 font-semibold">Por caminho de URL (`/images/*`), headers e cookies de sessão</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Terminação SSL / TLS</td>
                  <td className="p-3">Não (apenas repasse de pacotes)</td>
                  <td className="p-3 text-sky-400 font-semibold">Sim (descarregamento e descriptografia SSL nativa)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Segurança WAF</td>
                  <td className="p-3">Não (usa regras de NSG)</td>
                  <td className="p-3 text-sky-400 font-semibold">Sim (Web Application Firewall integrado - OWASP CRS)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
