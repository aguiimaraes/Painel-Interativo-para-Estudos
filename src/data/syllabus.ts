import { SyllabusDomain } from '../types';

export const syllabusData: SyllabusDomain[] = [
  {
    domain: "Domínio 1: Gerenciar Identidades e Governança do Azure (20-25%)",
    items: [
      "Gerenciar objetos do Microsoft Entra ID (usuários, grupos de segurança e M365)",
      "Configurar regras de membros dinâmicos para usuários e dispositivos (Dynamic User/Device)",
      "Gerenciar acesso de convidados B2B e colaboração externa",
      "Configurar a redefinição de senha por autoatendimento (SSPR) com Password Writeback",
      "Gerenciar o controle de acesso baseado em função (Azure RBAC) e Custom Roles",
      "Criar e gerenciar Unidades Administrativas (Administrative Units - AUs)",
      "Configurar assinaturas, Management Groups e controle de orçamentos (Budgets)",
      "Implementar e gerenciar Azure Policy e bloqueios de recursos (Resource Locks)"
    ]
  },
  {
    domain: "Domínio 2: Implementar e Gerenciar Armazenamento (15-20%)",
    items: [
      "Configurar contas de armazenamento (Storage Accounts) e redundâncias (LRS, ZRS, GRS, GZRS)",
      "Configurar regras de gerenciamento do ciclo de vida do armazenamento (Lifecycle Management)",
      "Gerenciar acesso seguro usando Access Keys, SAS Tokens e Stored Access Policies (SAP)",
      "Configurar o Azure Files e o Azure File Sync (com Cloud Tiering)",
      "Implementar o Armazenamento Imutável (WORM) e proteção contra exclusão acidental (Soft Delete)",
      "Configurar o controle de acesso a rede na Storage Account (Firewalls e VNet Service/Private Endpoints)"
    ]
  },
  {
    domain: "Domínio 3: Implantar e Gerenciar Recursos de Computação do Azure (20-25%)",
    items: [
      "Automatizar implantações de recursos usando ARM Templates e linguagem Bicep",
      "Configurar e dimensionar máquinas virtuais (VMs, Availability Sets e Availability Zones)",
      "Configurar o Azure Virtual Machine Scale Sets (VMSS) e regras de Autoscale",
      "Publicar e gerenciar contêineres no Azure Container Registry (ACR) e Azure Container Instances (ACI)",
      "Implantar e gerenciar microsserviços no Azure Container Apps",
      "Configurar Planos de Serviço de Aplicativo (App Service Plans) e slots de implantação (Deployment Slots)"
    ]
  },
  {
    domain: "Domínio 4: Configurar e Gerenciar Redes Virtuais (15-20%)",
    items: [
      "Configurar e gerenciar redes virtuais (VNets), sub-redes e IPs reservados pelo Azure",
      "Configurar emparelhamento de VNet (VNet Peering) e entender a não-transitividade",
      "Implementar tabelas de roteamento (Route Tables) com Rotas Definidas pelo Usuário (UDRs)",
      "Configurar Network Security Groups (NSGs) e Application Security Groups (ASGs)",
      "Configurar o Azure Bastion para acesso seguro RDP/SSH via portal",
      "Implementar balanceamento de carga de Nível 4 (Azure Load Balancer) e Nível 7 (Application Gateway com WAF)",
      "Configurar Zonas de DNS Privado do Azure (Azure Private DNS Zones) e Private Link"
    ]
  },
  {
    domain: "Domínio 5: Monitorar e Manter Recursos do Azure (10-15%)",
    items: [
      "Monitorar recursos do Azure com o Azure Monitor e consultar logs no Log Analytics Workspace usando KQL",
      "Configurar regras de alertas (Alert Rules), diagnósticos e Grupos de Ações (Action Groups)",
      "Configurar o Azure Backup e comparar Recovery Services Vault com Backup Vault",
      "Implementar recuperação de desastres (Disaster Recovery) de VMs com o Azure Site Recovery (ASR)",
      "Diagnosticar problemas de rede usando ferramentas do Network Watcher (IP Flow Verify, Packet Capture)"
    ]
  }
];
