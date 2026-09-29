import { Flashcard } from '../types';

export const defaultFlashcards: Flashcard[] = [
  {
    tag: "Identidade & Governança",
    front: "Qual a diferença entre um bloqueio do tipo ReadOnly e CanNotDelete no Azure?",
    back: "O bloqueio 'ReadOnly' impede qualquer alteração de estado ou gravação no recurso (ex: impede até ligar/desligar uma VM). O 'CanNotDelete' permite modificar as configurações do recurso, mas impede estritamente sua exclusão."
  },
  {
    tag: "Armazenamento (Storage)",
    front: "O que é o tempo de reidratação de blobs no Archive Tier e quais são as prioridades?",
    back: "É o tempo necessário para restaurar dados da camada offline (Archive) para Hot/Cool antes de poder lê-los. Na prioridade 'Standard' pode levar até 15 horas; na prioridade 'High' é concluído em menos de 1 hora para arquivos pequenos."
  },
  {
    tag: "Redes Virtuais (VNets)",
    front: "Por que o emparelhamento VNet Peering NÃO é transitivo por padrão?",
    back: "Porque se a VNet A está emparelhada com B, e B com C, o tráfego da VNet A NÃO passa automaticamente para C. Para viabilizar a comunicação transitiva, é necessário um roteador NVA com UDR (User Defined Route) na VNet B."
  },
  {
    tag: "Computação & IaC",
    front: "O que ocorre ao alterar o tamanho (SKU) de uma Máquina Virtual em execução no Azure?",
    back: "A VM é automaticamente desativada e reiniciada para ser alocada em um host físico compatível com a nova SKU. O procedimento causa uma reinicialização temporária da máquina."
  },
  {
    tag: "Monitoramento & Backup",
    front: "Qual a diferença essencial entre Recovery Services Vault e Backup Vault?",
    back: "Recovery Services Vault é utilizado para cargas tradicionais de IaaS/PaaS (VMs, Azure Files, SQL Server em VM). Backup Vault é voltado para cargas nativas de dados (Discos gerenciados, Blobs operacionais, PostgreSQL, AKS)."
  },
  {
    tag: "Identidade & RBAC",
    front: "O que a função do RBAC 'Contributor' NÃO pode fazer em comparação com a função 'Owner'?",
    back: "A função 'Contributor' pode criar, alterar e excluir todos os recursos no escopo, mas NÃO possui permissão para gerenciar atribuições de acesso (Role Assignments) nem conceder privilégios a outros usuários."
  }
];
