import { Question } from '../types';

export const questionsSimulado2: Question[] = [
  // =========================================================================
  // DOMÍNIO 1: GERENCIAR IDENTIDADES E GOVERNANÇA DO AZURE (20-25% -> 11 Qs)
  // =========================================================================
  {
    id: 51,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua organização utiliza o Microsoft Entra ID sincronizado com um Active Directory Domain Services (AD DS) local via Microsoft Entra Connect. Você precisa habilitar a Redefinição de Senha por Autoatendimento (SSPR) para que os usuários possam redefinir suas senhas na nuvem e a nova senha seja sincronizada de volta para os controladores de domínio locais em tempo real. Qual recurso você deve habilitar no Microsoft Entra Connect e qual licença mínima é necessária no Entra ID para os usuários?",
    options: [
      "Habilitar o Writeback de Senha (Password Writeback) no Entra Connect com licenças Microsoft Entra ID Premium P1.",
      "Habilitar a Sincronização de Hash de Senha (PHS) com licenças Microsoft Entra ID Free.",
      "Habilitar a Autenticação de Passagem (PTA) com licenças Microsoft 365 Business Basic.",
      "Habilitar o Writeback de Dispositivos com licenças Microsoft Entra ID Governance."
    ],
    answer: 0,
    explanation: "O recurso de Password Writeback (writeback de senha) no Microsoft Entra Connect permite que alterações de senha feitas via SSPR no Microsoft Entra ID sejam gravadas imediatamente no Active Directory local. Esse recurso exige no mínimo licenças Microsoft Entra ID Premium P1 (ou Microsoft 365 E3/Business Premium) atribuídas aos usuários que utilizarão o serviço."
  },
  {
    id: 52,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem um locatário do Microsoft Entra ID chamado contoso.com. Você precisa criar um grupo de segurança que contenha automaticamente todos os colaboradores contratados em período integral do departamento financeiro. Os colaboradores devem ter o atributo 'Department' igual a 'Finance' e o atributo 'UserType' igual a 'Member'. Qual regra de associação dinâmica você deve configurar no Microsoft Entra ID?",
    options: [
      "(user.department -match \"Finance\") -or (user.userType -eq \"Member\")",
      "(user.department -eq \"Finance\") -and (user.userType -eq \"Member\")",
      "(user.department -contains \"Finance\") -and (user.accountEnabled -eq $false)",
      "(user.assignedLicenses -any (license.skuId -eq \"Finance\"))"
    ],
    answer: 1,
    explanation: "Para grupos de associação dinâmica no Microsoft Entra ID, a sintaxe oficial para exigir múltiplos critérios simultâneos utiliza o operador lógico '-and' com o operador de igualdade '-eq'. Portanto, '(user.department -eq \"Finance\") -and (user.userType -eq \"Member\")' garante a inclusão automática apenas de membros efetivos pertencentes ao departamento financeiro, excluindo convidados externos (Guest)."
  },
  {
    id: 53,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa adquiriu 200 novos laptops corporativos com Windows 11 para colaboradores remotos. A empresa não possui controladores de domínio locais e gerencia todos os dispositivos exclusivamente via nuvem com Microsoft Intune e Microsoft Entra ID. Você precisa conectar esses computadores diretamente ao diretório da nuvem durante a configuração inicial do Windows (OOBE). Qual tipo de identidade de dispositivo você deve utilizar?",
    options: [
      "Microsoft Entra Registered (Registrado no Entra ID)",
      "Microsoft Entra Joined (Ingressado no Entra ID)",
      "Microsoft Entra Hybrid Joined (Ingresso Híbrido no Entra ID)",
      "Workplace Join"
    ],
    answer: 1,
    explanation: "Dispositivos 'Microsoft Entra Joined' são computadores corporativos associados exclusivamente ao Microsoft Entra ID (sem Active Directory local), configurados normalmente na tela de inicialização (OOBE) pelo usuário com sua conta corporativa. Eles permitem logon com credenciais do Entra ID, autenticação SSO e gerenciamento completo via MDM (Microsoft Intune)."
  },
  {
    id: 54,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você gerencia políticas de segurança no Microsoft Entra ID. Você precisa criar uma política de Acesso Condicional para proteger o portal do Azure (Microsoft Azure Management). A política deve exigir que os administradores cumpram a autenticação multifator (MFA) E usem um dispositivo marcado como em conformidade (compliant) pelo Microsoft Intune. Na seção Controles de Acesso > Conceder (Grant), como você deve configurar a exigência?",
    options: [
      "Selecionar 'Exigir autenticação multifator' e 'Exigir que o dispositivo seja marcado como em conformidade', marcando 'Exigir um dos controles selecionados'.",
      "Selecionar 'Exigir autenticação multifator' e 'Exigir que o dispositivo seja marcado como em conformidade', marcando 'Exigir todos os controles selecionados'.",
      "Selecionar apenas 'Bloquear acesso' com exceção para endereços IP confiáveis.",
      "Selecionar 'Exigir alteração de senha' e associar a um pacote de acesso."
    ],
    answer: 1,
    explanation: "Quando múltiplos controles de concessão são exigidos simultaneamente (MFA E dispositivo em conformidade), deve-se selecionar ambos os requisitos e assinalar a opção de rádio 'Exigir todos os controles selecionados' (Require all the selected controls). Se a opção 'Exigir um dos controles' fosse marcada, o administrador poderia acessar atendendo apenas ao MFA em um dispositivo não corporativo."
  },
  {
    id: 55,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você é o administrador de governança de uma assinatura do Azure. Você precisa garantir que qualquer máquina virtual Windows recém-criada em um grupo de recursos chamado RG-PROD receba automaticamente a extensão do Agente do Azure Monitor (AMA), sem bloquear a implantação da VM caso o modelo ARM não inclua a extensão. Qual efeito do Azure Policy você deve utilizar na definição da política?",
    options: [
      "Deny",
      "Audit",
      "DeployIfNotExists",
      "Disabled"
    ],
    answer: 2,
    explanation: "O efeito 'DeployIfNotExists' do Azure Policy avalia se um recurso filho ou relacionado (neste caso, a extensão da VM) existe após a criação do recurso pai. Caso a extensão não exista, o Azure Policy dispara automaticamente uma tarefa de correção (Remediation Task) usando uma identidade gerenciada para provisionar o recurso faltante sem impedir a criação da VM."
  },
  {
    id: 56,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua organização possui uma hierarquia de Grupos de Gerenciamento (Management Groups). Você precisa mover uma assinatura existente chamada Sub1 do Grupo de Gerenciamento 'MG-Desenvolvimento' para o Grupo de Gerenciamento 'MG-Producao'. Quais permissões mínimas de RBAC você deve possuir nos Grupos de Gerenciamento envolvidos?",
    options: [
      "Permissão de Leitor em MG-Desenvolvimento e Colaborador em MG-Producao.",
      "Permissão de gravação (Microsoft.Management/managementGroups/subscriptions/write) tanto no Grupo de Gerenciamento de origem quanto no de destino, além de permissão de gravação na assinatura.",
      "Permissão de Administrador de Acesso do Usuário apenas no Root Management Group.",
      "Permissão de Proprietário exclusivamente na assinatura Sub1."
    ],
    answer: 1,
    explanation: "Para mover uma assinatura entre Grupos de Gerenciamento, o administrador precisa de permissões de gravação ('Microsoft.Management/managementGroups/subscriptions/write' ou função de Administrador/Colaborador do Grupo de Gerenciamento) em três locais: no escopo do Grupo de Gerenciamento de origem (para desvincular), no escopo do Grupo de Gerenciamento de destino (para vincular) e no escopo da própria assinatura."
  },
  {
    id: 57,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você precisa criar uma função personalizada do Azure RBAC (Custom Role) via JSON para a equipe de operadores de data center. Os operadores devem ter permissão para reiniciar e desalocar máquinas virtuais existentes, mas NÃO devem ter permissão para criar novas VMs, alterar configurações de tamanho de VM ou excluir VMs. Quais ações mínimas devem ser especificadas na seção 'Actions' da definição da função?",
    options: [
      "[\"Microsoft.Compute/virtualMachines/*\"]",
      "[\"Microsoft.Compute/virtualMachines/read\", \"Microsoft.Compute/virtualMachines/restart/action\", \"Microsoft.Compute/virtualMachines/deallocate/action\"]",
      "[\"Microsoft.Compute/virtualMachines/write\", \"Microsoft.Compute/virtualMachines/delete\"]",
      "[\"Microsoft.Compute/virtualMachines/start/action\", \"Microsoft.Authorization/*/read\"]"
    ],
    answer: 1,
    explanation: "No Azure RBAC, operações de controle de ciclo de vida de VM (como reiniciar e desligar/desalocar) são tratadas como operações de ação ('/action'). Para que o operador visualize o status da VM no portal e execute reinicializações e desalocações sem modificar configurações de hardware nem excluir recursos, concede-se 'Microsoft.Compute/virtualMachines/read', 'Microsoft.Compute/virtualMachines/restart/action' e 'Microsoft.Compute/virtualMachines/deallocate/action'."
  },
  {
    id: 58,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem um grupo de recursos chamado RG-Dados que contém uma conta de armazenamento chamada storageprod1. No nível do grupo de recursos RG-Dados, você aplicou um bloqueio de recursos do tipo 'CanNotDelete' (ReadOnly = false). Quais das seguintes operações um usuário com a função de 'Proprietário' (Owner) poderá executar com sucesso na storageprod1?",
    options: [
      "Excluir o grupo de recursos RG-Dados.",
      "Excluir a conta de armazenamento storageprod1.",
      "Fazer upload de novos arquivos blob e regenerar as chaves de acesso da storageprod1.",
      "Remover o bloqueio de recursos apenas se for Administrador Global do Entra ID."
    ],
    answer: 2,
    explanation: "O bloqueio 'CanNotDelete' impede a exclusão do recurso e de seus recursos filhos, mas NÃO impede a modificação de dados ou operações do plano de controle como leitura, gravação, upload de blobs e rotação de chaves de acesso. Somente o bloqueio 'ReadOnly' impediria a rotação de chaves e a gravação de novos dados."
  },
  {
    id: 59,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você é o responsável pelo controle financeiro de uma assinatura Azure. Você criou um orçamento (Budget) mensal de R$ 10.000 no Azure Cost Management. Você precisa ser alertado quando os gastos reais atingirem 80% do valor orçado e também quando a previsão (forecasted) de gastos até o fim do mês atingir 100% do valor orçado. O que você deve configurar?",
    options: [
      "Duas regras de alertas de custo no Budget: uma baseada em 'Real' (Actual) a 80% e outra baseada em 'Previsto' (Forecasted) a 100%, associadas a um Action Group.",
      "Uma regra do Azure Advisor para redimensionamento de instâncias reservadas.",
      "Uma política do Azure Policy com efeito 'Deny' que desligue automaticamente as VMs.",
      "Um alerta de log KQL no Log Analytics monitorando o consumo de vCPUs."
    ],
    answer: 0,
    explanation: "No Azure Cost Management + Billing, os orçamentos (Budgets) suportam condições de alerta baseadas em gastos reais ('Actual') e gastos previstos por machine learning ('Forecasted'). É possível definir múltiplos limites percentuais com notificações automáticas enviadas para endereços de e-mail ou integradas a Grupos de Ações (Action Groups)."
  },
  {
    id: 60,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua organização colabora com dezenas de parceiros externos no Microsoft Entra ID. Você precisa garantir que o acesso dos usuários convidados (Guest Accounts) seja revisado trimestralmente pelos proprietários dos respectivos grupos. Caso um proprietário não responda à revisão dentro de 14 dias, o sistema deve revogar automaticamente o acesso do convidado. Qual recurso do Microsoft Entra ID Governance você deve implementar?",
    options: [
      "Gerenciamento de Direitos (Entitlement Management)",
      "Revisões de Acesso (Access Reviews)",
      "Privileged Identity Management (PIM)",
      "Políticas de Risco de Entrada do Identity Protection"
    ],
    answer: 1,
    explanation: "As Revisões de Acesso (Access Reviews) do Microsoft Entra ID permitem auditar periodicamente o acesso de usuários membros e convidados a grupos corporativos e aplicativos. É possível configurar recorrência trimestral, definir os proprietários do grupo como revisores e determinar ações automáticas (como remover o acesso) se o revisor não responder dentro do prazo estipulado."
  },
  {
    id: 61,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa precisa impor 15 políticas corporativas de governança em todas as assinaturas de produção (ex: proibir tamanhos de VM caros, exigir tags de centro de custo e bloquear regiões fora do Brasil). Você deseja gerenciar a atribuição e o relatório de conformidade dessas 15 políticas como uma única unidade lógica de governança. O que você deve criar no Azure Policy?",
    options: [
      "Uma Definição de Iniciativa (Initiative Definition ou Policy Set).",
      "Um Blueprint do Azure arquivado no GitHub.",
      "Um Grupo de Ações do Azure Monitor.",
      "Um Grupo de Gerenciamento raiz com bloqueio ReadOnly."
    ],
    answer: 0,
    explanation: "Uma Definição de Iniciativa (também conhecida como Policy Set Definition) agrupa várias definições de políticas do Azure Policy em uma única coleção lógica. Isso simplifica a atribuição, o gerenciamento de parâmetros e a visualização do painel de conformidade geral em escala para atender a metas ou regulamentações específicas."
  },

  // =========================================================================
  // DOMÍNIO 2: IMPLEMENTAR E GERENCIAR ARMAZENAMENTO (15-20% -> 9 Qs)
  // =========================================================================
  {
    id: 62,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem uma conta de armazenamento de uso geral v2 chamada 'storagecorp1' na região Leste dos EUA, atualmente configurada com redundância LRS (Locally-Redundant Storage). A diretoria exige que os dados sejam protegidos contra a falha de um data center inteiro na mesma região, mantendo alta disponibilidade sem necessidade de migrar os dados para uma nova conta. Qual tipo de redundância você deve selecionar e como a conversão pode ser realizada?",
    options: [
      "Alterar a configuração de redundância para ZRS (Zone-Redundant Storage) diretamente no portal ou solicitar uma conversão ao vivo (live migration) sem tempo de inatividade.",
      "A conversão direta não é suportada; você deve excluir os contêineres e recriá-los como GRS.",
      "Alterar para RA-GRS e realizar o failover manual pelo PowerShell imediatamente.",
      "Configurar um Gateway NAT na rede virtual de armazenamento."
    ],
    answer: 0,
    explanation: "O Azure Storage permite converter contas com redundância LRS para ZRS (armazenamento com redundância de zona) na maioria das regiões suportadas. A conversão pode ser iniciada diretamente pelo portal do Azure ou solicitada como uma migração ao vivo (live migration) suportada pela Microsoft, garantindo que os dados sejam replicados entre 3 Zonas de Disponibilidade sem interrupção no acesso da aplicação."
  },
  {
    id: 63,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você gerencia um contêiner de Blob Storage no Azure que armazena relatórios de faturamento. Os relatórios são consultados frequentemente nos primeiros 30 dias. Entre 31 e 90 dias, eles são acessados esporadicamente. Após 90 dias, eles devem ser mantidos por 7 anos para fins fiscais sem necessidade de acesso imediato, priorizando o menor custo de armazenamento. Qual regra de Gerenciamento de Ciclo de Vida (Lifecycle Management) atende a esse requisito?",
    options: [
      "Mover para a camada Cool após 30 dias, mover para a camada Archive após 90 dias e excluir após 2555 dias.",
      "Mover para a camada Archive após 30 dias e reidratar mensalmente.",
      "Mover para a camada Cold no dia 1 e desabilitar o controle de versão.",
      "Criar uma política de replicação de objetos para uma conta Premium Block Blob."
    ],
    answer: 0,
    explanation: "As regras de Gerenciamento de Ciclo de Vida do Blob Storage permitem automatizar a transição de camadas de acesso baseando-se na data de última modificação ou criação: mover para Cool após 30 dias (acesso esporádico com menor custo/GB que Hot), mover para Archive após 90 dias (armazenamento ultra-barato para retenção de longo prazo) e excluir após 2555 dias (7 anos)."
  },
  {
    id: 64,
    domain: 2,
    domainName: "Armazenamento",
    question: "Um desenvolvedor precisa conceder a uma aplicação cliente acesso temporário de 4 horas para leitura de arquivos em um contêiner de blob específico chamado 'contratos'. Por motivos de auditoria e conformidade, a assinatura de acesso compartilhado NÃO pode utilizar as chaves de chave compartilhada da conta (Account Keys) e deve ser autenticada diretamente pela identidade do Microsoft Entra ID do desenvolvedor. Qual tipo de SAS deve ser gerado?",
    options: [
      "SAS de Conta (Account SAS)",
      "SAS de Serviço (Service SAS) assinada com a chave primária",
      "SAS de Delegação de Usuário (User Delegation SAS)",
      "Política de Acesso Armazenada (Stored Access Policy)"
    ],
    answer: 2,
    explanation: "A SAS de Delegação de Usuário (User Delegation SAS) é protegida por credenciais do Microsoft Entra ID em vez das chaves de acesso da conta de armazenamento. Isso garante que a autorização respeite os privilégios RBAC do usuário no Entra ID e elimina o risco associado ao compartilhamento ou vazamento das chaves mestras da conta."
  },
  {
    id: 65,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua empresa utiliza o Azure Files com protocolo SMB para hospedar compartilhamentos de arquivos compartilhados por equipes multidisciplinares. Você precisa configurar o controle de acesso para que permissões detalhadas de arquivos e pastas no nível NTFS (ACLs) sejam respeitadas com base nas contas corporativas de domínio dos usuários. Qual método de autenticação de identidade deve ser habilitado na conta de armazenamento?",
    options: [
      "Autenticação baseada em Chave de Acesso Compartilhada exclusivamente.",
      "Serviços de Domínio do Microsoft Entra (Microsoft Entra Domain Services - Entra DS) ou AD DS local.",
      "Acesso Anônimo Público de Blob.",
      "Autenticação básica via HTTP com cabeçalho Authorization."
    ],
    answer: 1,
    explanation: "O Azure Files dá suporte à autenticação baseada em identidade sobre SMB utilizando serviços de diretório, como o Active Directory Domain Services (AD DS) local, o Microsoft Entra Domain Services (Entra DS) ou o Microsoft Entra Kerberos para identidades híbridas. Isso permite atribuir papéis de RBAC no compartilhamento e preservar ACLs NTFS granulares no nível de arquivos e diretórios."
  },
  {
    id: 66,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você administra o Azure File Sync conectando um servidor de arquivos Windows Server local com 2 TB de armazenamento a um compartilhamento de arquivos do Azure Files. O volume local do servidor tem apenas 500 GB livres. Você precisa garantir que os arquivos acessados com frequência permaneçam no servidor local, enquanto os arquivos antigos ou pouco acessados sejam transferidos para a nuvem mantendo apenas ponteiros (arquivos fantasmas) localmente. Qual recurso e configuração você deve ativar?",
    options: [
      "Habilitar a Camada de Nuvem (Cloud Tiering) e definir uma política de espaço livre no volume.",
      "Configurar o DFS-R (Distributed File System Replication) no modo somente leitura.",
      "Habilitar a Replicação de Objetos do Azure Blob com política de exclusão automática.",
      "Instalar o AzCopy no agendador de tarefas do Windows para apagar arquivos a cada 24 horas."
    ],
    answer: 0,
    explanation: "A 'Camada de Nuvem' (Cloud Tiering) é um recurso opcional do Azure File Sync que arquiva arquivos acessados com pouca frequência na nuvem do Azure Files. Quando ativado, os arquivos locais são substituídos por ponteiros leves no sistema de arquivos NTFS, liberando espaço em disco no servidor local de acordo com a porcentagem de espaço livre configurada na política."
  },
  {
    id: 67,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem uma conta de armazenamento chamada 'storagefin01'. Você precisa restringir o tráfego de rede para que apenas máquinas virtuais localizadas na sub-rede 'Subnet-App' da rede virtual 'VNet1' e computadores da filial de Curitiba com o IP público estático 191.232.45.10 possam acessar os dados. Todo o tráfego da internet pública não autorizada deve ser bloqueado. O que você deve configurar?",
    options: [
      "Configurar o Firewall e Redes Virtuais da conta de armazenamento: selecionar 'Redes selecionadas', adicionar a 'Subnet-App' com Service Endpoint 'Microsoft.Storage' e adicionar o IP 191.232.45.10 nas regras de firewall.",
      "Criar uma regra de NSG na sub-rede Subnet-App bloqueando todo o tráfego de saída.",
      "Alterar a chave de acesso primária da conta de armazenamento diariamente.",
      "Vincular um gateway NAT com IP dinâmico na conta de armazenamento."
    ],
    answer: 0,
    explanation: "O firewall de rede integrado do Azure Storage permite alternar o acesso padrão de 'Todas as redes' para 'Redes selecionadas'. Em seguida, vincula-se a sub-rede virtual desejada (que deve ter o Ponto de Extremidade de Serviço Microsoft.Storage habilitado) e inserem-se os endereços IP públicos ou blocos CIDR autorizados nas regras de firewall de IP."
  },
  {
    id: 68,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua organização exige que todos os dados gravados em contas de armazenamento do Azure sejam criptografados em repouso utilizando chaves gerenciadas pelo cliente (Customer-Managed Keys - CMK) armazenadas no Azure Key Vault. Antes de associar a chave à conta de armazenamento, quais DOIS recursos de segurança do Azure Key Vault devem ser ativados obrigatoriamente para evitar perda permanente de dados?",
    options: [
      "Exclusão Suave (Soft Delete) e Proteção contra Limpeza (Purge Protection).",
      "Firewall de IP e Rotação Automática de Certificados SSL.",
      "Exportação de Chave Privada e Backup em Fita.",
      "Acesso Público Aberto e Autenticação de Dois Fatores por SMS."
    ],
    answer: 0,
    explanation: "O Azure Storage exige que qualquer Azure Key Vault utilizado para chaves gerenciadas pelo cliente (CMK) tenha a 'Exclusão Suave' (Soft Delete) e a 'Proteção contra Limpeza' (Purge Protection) ativadas. Isso impede que a chave de criptografia seja destruída de forma definitiva acidental ou maliciosamente, o que tornaria os dados da conta de armazenamento irrecuperáveis."
  },
  {
    id: 69,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você precisa configurar a Replicação de Objetos (Object Replication) de blobs de blocos entre uma conta de armazenamento de origem na região Sul do Brasil e uma conta de destino na região Leste dos EUA. Quais recursos devem estar obrigatoriamente habilitados nas contas de armazenamento antes de criar a política de replicação?",
    options: [
      "Controle de Versão de Blobs (Blob Versioning) e Feed de Alterações de Blobs (Blob Change Feed) na conta de origem.",
      "Criptografia Dupla de Infraestrutura e Redundância ZRS.",
      "Camada de Arquivamento e Exclusão Imediata.",
      "Autenticação FTP e Ponto de Extremidade Privado."
    ],
    answer: 0,
    explanation: "A Replicação de Objetos assíncrona do Azure Blob Storage exige que o Controle de Versão de Blobs (Blob Versioning) esteja ativado em ambas as contas de armazenamento (origem e destino) e que o Feed de Alterações de Blobs (Blob Change Feed) esteja ativado na conta de armazenamento de origem para rastrear inserções e atualizações."
  },
  {
    id: 70,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você precisa sincronizar diariamente uma pasta local em um servidor Windows com um contêiner de Blob Storage no Azure. A ferramenta deve copiar apenas os arquivos modificados ou novos e deve excluir do contêiner de destino qualquer arquivo que tenha sido removido da pasta local de origem, mantendo um espelho exato. Qual comando do AzCopy você deve executar?",
    options: [
      "azcopy sync \"C:\\Dados\" \"https://storage1.blob.core.windows.net/backup?[SAS]\" --delete-destination=true --recursive=true",
      "azcopy copy \"C:\\Dados\" \"https://storage1.blob.core.windows.net/backup?[SAS]\" --overwrite=ifSourceNewer",
      "azcopy make \"https://storage1.blob.core.windows.net/backup?[SAS]\" --mirror",
      "azcopy remove \"https://storage1.blob.core.windows.net/backup?[SAS]\" --all"
    ],
    answer: 0,
    explanation: "O comando 'azcopy sync' compara o diretório de origem e o de destino com base no carimbo de data/hora e hash de arquivo. Ao utilizar a opção '--delete-destination=true', o AzCopy remove arquivos no destino que não existem mais na origem, garantindo uma sincronização unidirecional idêntica (espelhamento)."
  },

  // =========================================================================
  // DOMÍNIO 3: IMPLANTAR E GERENCIAR RECURSOS DE COMPUTAÇÃO (20-25% -> 11 Qs)
  // =========================================================================
  {
    id: 71,
    domain: 3,
    domainName: "Computação",
    question: "Sua empresa planeja implantar um aplicativo corporativo em três Máquinas Virtuais Azure na região Leste dos EUA. O contrato de nível de serviço (SLA) da aplicação exige uma disponibilidade de 99,99% contra falhas físicas de hardware, rede e fornecimento elétrico de datacenters individuais. Como você deve posicionar as três máquinas virtuais para atingir esse SLA com o menor número de instâncias?",
    options: [
      "Distribuir cada uma das três VMs em uma Zona de Disponibilidade diferente (Zona 1, Zona 2 e Zona 3).",
      "Colocar as três VMs no mesmo Conjunto de Disponibilidade (Availability Set) com 3 domínios de falha.",
      "Implantar as três VMs em uma única sub-rede sem grupo de segurança de rede.",
      "Criar um Grupo de Posicionamento por Proximidade na mesma sala de servidores."
    ],
    answer: 0,
    explanation: "O Azure oferece SLA de 99,99% para máquinas virtuais quando duas ou mais instâncias são implantadas em Zonas de Disponibilidade (Availability Zones) distintas na mesma região. Cada zona é uma localização física isolada com infraestrutura independente de energia, resfriamento e conectividade de rede. Conjuntos de Disponibilidade (Availability Sets) oferecem SLA máximo de 99,95%."
  },
  {
    id: 72,
    domain: 3,
    domainName: "Computação",
    question: "Você gerencia um cluster de banco de dados distribuído de altíssimo desempenho no Azure. As consultas entre os nós do cluster exigem a menor latência de rede possível (inferior a 1 milissegundo). Como você deve configurar o posicionamento físico das máquinas virtuais do cluster?",
    options: [
      "Atribuir as máquinas virtuais a um Grupo de Posicionamento por Proximidade (Proximity Placement Group - PPG).",
      "Distribuir as máquinas virtuais por três regiões geográficas diferentes com ExpressRoute.",
      "Implantar as máquinas virtuais em Zonas de Disponibilidade separadas.",
      "Configurar cada VM em uma assinatura de faturamento distinta."
    ],
    answer: 0,
    explanation: "Um Grupo de Posicionamento por Proximidade (Proximity Placement Group - PPG) é um agrupamento lógico que informa ao Azure Resource Manager para alocar todos os recursos de computação (VMs ou VMSS) o mais próximo fisicamente possível uns dos outros dentro do mesmo data center, minimizando a latência de rede entre nós interconectados."
  },
  {
    id: 73,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa implantar um Conjunto de Dimensionamento de Máquinas Virtuais (VMSS) para executar uma carga de trabalho de processamento intensivo. A solução deve combinar instâncias sob demanda e instâncias Spot para otimizar custos, permitindo misturar diferentes famílias e tamanhos de máquinas virtuais no mesmo conjunto. Qual modo de orquestração do VMSS você deve selecionar?",
    options: [
      "Modo de Orquestração Flexível (Flexible Orchestration Mode).",
      "Modo de Orquestração Uniforme (Uniform Orchestration Mode).",
      "Modo de Replicação Básica (Basic Replication Mode).",
      "Modo Clássico (ASM)."
    ],
    answer: 0,
    explanation: "O modo de Orquestração Flexível do Azure VMSS oferece gerenciamento de máquinas virtuais em escala com suporte para múltiplas famílias e tamanhos de VM, mistura de instâncias sob demanda e instâncias Spot na mesma frota, além de permitir o gerenciamento individual de cada VM como uma máquina virtual independente."
  },
  {
    id: 74,
    domain: 3,
    domainName: "Computação",
    question: "Você gerencia um Conjunto de Dimensionamento de Máquinas Virtuais (VMSS) com dimensionamento automático (Autoscale) baseado em métricas. A regra atual adiciona 2 instâncias quando a CPU média ultrapassa 75%. No entanto, você nota que, durante picos repentinos de tráfego, o sistema aciona consecutivamente novas instâncias antes que as instâncias recém-criadas tenham concluído a inicialização do software, causando superdimensionamento desnecessário. Qual parâmetro da regra de dimensionamento deve ser aumentado?",
    options: [
      "O Período de Recarga (Cooldown / Scale-out cooldown period).",
      "O Limite Máximo de Instâncias.",
      "O Intervalo de Agendamento Semanal.",
      "A Prioridade do Balanceador de Carga."
    ],
    answer: 0,
    explanation: "O período de recarga (Cooldown period) determina a quantidade de tempo que o mecanismo de dimensionamento automático deve aguardar após uma ação de escala (scale-out ou scale-in) antes de avaliar a métrica novamente. Aumentar o tempo de recarga garante que as novas instâncias tenham tempo suficiente para inicializar seus serviços e absorver a carga de CPU antes que outra ação de escala seja disparada."
  },
  {
    id: 75,
    domain: 3,
    domainName: "Computação",
    question: "Você administra um aplicativo no Azure App Service com o Plano de Serviço Standard S1. Você configurou um slot de implantação de preparo chamado 'staging' para testar novas versões antes de promovê-las para o slot de produção 'production'. O aplicativo utiliza uma cadeia de conexão de banco de dados específica para cada ambiente. Você precisa garantir que, ao executar a troca de slots (Swap), a cadeia de conexão de produção permaneça no slot de produção e não seja substituída pelos valores de staging. O que você deve fazer?",
    options: [
      "Marcar a configuração de aplicativo/cadeia de conexão como 'Configuração do Slot de Implantação' (Deployment slot setting / sticky).",
      "Excluir o slot de staging antes de fazer o swap.",
      "Fazer o upgrade do plano para o nível Gratuito (F1).",
      "Vincular o banco de dados via Ponto de Extremidade Privado sem autenticação."
    ],
    answer: 0,
    explanation: "Ao configurar cadeias de conexão ou configurações de aplicativo (App Settings) no Azure App Service, marcar a opção 'Configuração do Slot de Implantação' (Deployment slot setting, também chamada de 'sticky') faz com que essa configuração fique vinculada ao slot específico. Durante a operação de Swap, as configurações marcadas como sticky não são trocadas, mantendo o ambiente de produção apontando para a base de dados de produção."
  },
  {
    id: 76,
    domain: 3,
    domainName: "Computação",
    question: "Você tem um aplicativo web hospedado no Azure App Service (Plano Premium v3) que precisa se conectar com segurança a um banco de dados SQL hospedado em uma máquina virtual privada em uma rede virtual (VNet1). O aplicativo web não deve expor sua comunicação através da internet pública. Qual funcionalidade do App Service você deve configurar?",
    options: [
      "Integração de Rede Virtual Regional (Regional VNet Integration).",
      "Regras de Restrição de IP no arquivo web.config.",
      "Mapeamento de Domínio Personalizado via CNAME.",
      "Ponto de Extremidade de Serviço de Armazenamento."
    ],
    answer: 0,
    explanation: "A Integração de VNet Regional (Regional VNet Integration) permite que o aplicativo do Azure App Service envie todo o seu tráfego de saída (outbound) diretamente para uma sub-rede delegada dentro de uma rede virtual do Azure. Dessa forma, o aplicativo acessa recursos privados da VNet (como VMs de banco de dados) e redes locais conectadas via VPN/ExpressRoute usando seus endereços IP privados internos."
  },
  {
    id: 77,
    domain: 3,
    domainName: "Computação",
    question: "Sua equipe de segurança exige que o acesso de entrada (inbound) a uma API hospedada no Azure App Service seja bloqueado a partir de qualquer endereço IP da internet pública e que a API responda exclusivamente através de um endereço IP privado interno localizado na sub-rede 'Subnet-Backend' da sua rede corporativa. Qual recurso deve ser implementado?",
    options: [
      "Ponto de Extremidade Privado (Private Endpoint / Azure Private Link).",
      "Balanceador de Carga Básico público.",
      "Extensão de Script Personalizado na VM.",
      "Conexões Híbridas baseadas no Azure Relay."
    ],
    answer: 0,
    explanation: "O Ponto de Extremidade Privado (Private Endpoint) do Azure Private Link atribui uma interface de rede (NIC) com um endereço IP privado de uma sub-rede da VNet ao recurso do App Service. Isso desativa efetivamente a exposição pública padrão do serviço e permite que os clientes acessem o aplicativo web de forma segura através do IP privado interno da rede."
  },
  {
    id: 78,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa implantar um aplicativo em contêiner usando as Instâncias de Contêiner do Azure (Azure Container Instances - ACI). O contêiner gera relatórios em formato PDF que precisam persistir após o encerramento do contêiner e ser compartilhados com outros servidores. Qual solução de armazenamento persistente pode ser montada nativamente como um volume no contêiner da ACI?",
    options: [
      "Um compartilhamento de arquivos do Azure Files (SMB).",
      "Um disco gerenciado Premium SSD em modo compartilhado.",
      "Um contêiner de armazenamento de Blobs com camada Archive.",
      "Um volume local temporário emparelhado com NFS v4.1."
    ],
    answer: 0,
    explanation: "As Instâncias de Contêiner do Azure (ACI) oferecem suporte à montagem de compartilhamentos de arquivos do Azure Files (SMB) diretamente como volumes persistentes no contêiner. Os dados gravados no diretório montado são persistidos de forma segura e durável no Azure Storage, sobrevivendo a reinicializações ou encerramentos do contêiner."
  },
  {
    id: 79,
    domain: 3,
    domainName: "Computação",
    question: "Você gerencia um Registro de Contêiner do Azure (Azure Container Registry - ACR) no nível Premium. Sua equipe possui desenvolvedores e pipelines de CI/CD que realizam pushes frequentes de novas imagens de contêiner. Você precisa disparar automaticamente uma notificação webhook para um serviço externo sempre que uma nova tag de imagem contendo o prefixo 'release-' for enviada ao repositório. O que você deve configurar?",
    options: [
      "Um Webhook no ACR com a ação 'push' e escopo filtrado pela tag/repositório desejado.",
      "Uma tarefa do Azure Automation via KQL.",
      "Uma rota de UDR apontando para um gateway NAT.",
      "Um alerta de métrica de conexões no Azure Monitor."
    ],
    answer: 0,
    explanation: "O Azure Container Registry (ACR) permite criar webhooks orientados a eventos para notificações em tempo real. É possível configurar webhooks para responder ao evento de 'push' de imagens, filtrando por repositório e expressões de tags específicas para integrar com pipelines de implantação e ferramentas de orquestração contínua."
  },
  {
    id: 80,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa criptografar o disco do sistema operacional e os discos de dados de 15 máquinas virtuais Windows no Azure utilizando a criptografia no nível do sistema operacional (BitLocker), garantindo que as chaves de criptografia e os segredos sejam protegidos em um Azure Key Vault. Qual tecnologia você deve utilizar?",
    options: [
      "Azure Disk Encryption (ADE).",
      "Criptografia no Lado do Servidor (SSE) com Chaves Gerenciadas pela Plataforma exclusivamente.",
      "BitLocker To Go com pendrive virtual montado por script.",
      "Criptografia Transparente de Dados (TDE)."
    ],
    answer: 0,
    explanation: "O Azure Disk Encryption (ADE) aproveita o recurso BitLocker no Windows (e DM-Crypt no Linux) para fornecer criptografia de volume para o disco do sistema operacional e discos de dados de máquinas virtuais, integrando-se nativamente com o Azure Key Vault para gerenciar com segurança as chaves de criptografia de disco (BEKs/KEKs)."
  },
  {
    id: 81,
    domain: 3,
    domainName: "Computação",
    question: "Uma máquina virtual Windows Server de missão crítica chamada 'VM-App01' tornou-se inacessível via RDP devido a uma falha de configuração de firewall interno do Windows. A VM não possui endereço IP público e o Azure Bastion não consegue estabelecer a sessão. Você precisa executar um comando PowerShell dentro do sistema operacional da VM para redefinir as regras de firewall sem recriar a VM. Qual funcionalidade do portal do Azure você deve usar?",
    options: [
      "Executar Comando (Run Command) no painel de Operações da Máquina Virtual.",
      "Redefinir Senha na aba Suporte + Solução de Problemas.",
      "Exportar o disco VHD para um servidor local.",
      "Conectar-se via console serial usando Telnet."
    ],
    answer: 0,
    explanation: "O recurso 'Executar Comando' (Run Command) da Máquina Virtual do Azure utiliza o Agente de VM para executar scripts PowerShell ou shell dentro do sistema operacional convidado sem exigir conectividade de rede RDP/SSH ou endereço IP público. Ele é a principal ferramenta administrativa para recuperar máquinas virtuais isoladas por erros de firewall ou rede interna."
  },

  // =========================================================================
  // DOMÍNIO 4: CONFIGURAR E GERENCIAR REDE VIRTUAL (15-20% -> 10 Qs)
  // =========================================================================
  {
    id: 82,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua organização tem uma arquitetura de rede com três redes virtuais: VNet1 (10.1.0.0/16), VNet2 (10.2.0.0/16) e VNet3 (10.3.0.0/16). VNet1 está emparelhada com VNet2 através de VNet Peering. VNet2 está emparelhada com VNet3 através de VNet Peering. Não há emparelhamento direto entre VNet1 e VNet3. Por padrão, máquinas virtuais na VNet1 podem se comunicar diretamente com máquinas virtuais na VNet3?",
    options: [
      "Não, porque o emparelhamento de redes virtuais (VNet Peering) não é transitivo.",
      "Sim, porque o VNet Peering é totalmente transitivo por padrão.",
      "Sim, desde que as três redes pertençam à mesma assinatura.",
      "Não, a menos que o protocolo BGP esteja ativado em todas as sub-redes."
    ],
    answer: 0,
    explanation: "O emparelhamento de redes virtuais (VNet Peering) é estritamente não-transitivo. Isso significa que, se VNet1 está conectada à VNet2 e VNet2 está conectada à VNet3, o tráfego da VNet1 NÃO chega à VNet3 através da VNet2, a menos que um roteador virtual (NVA) ou Gateway de VPN seja configurado na rede intermediária com tabelas de rotas definidas pelo usuário (UDR)."
  },
  {
    id: 83,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você gerencia uma topologia de rede Hub-and-Spoke no Azure. A VNet-Hub contém um Gateway de Rede Virtual (VPN Gateway) conectado à sede corporativa. A VNet-Spoke contém servidores de aplicação e está conectada à VNet-Hub via VNet Peering. Você precisa permitir que as VMs da VNet-Spoke utilizem o Gateway de VPN da VNet-Hub para se comunicarem com a sede local. Quais configurações devem ser habilitadas no emparelhamento?",
    options: [
      "Habilitar 'Permitir trânsito de gateway' (Allow gateway transit) no emparelhamento da VNet-Hub e habilitar 'Usar o gateway da rede virtual remota' (Use remote virtual network's gateway) no emparelhamento da VNet-Spoke.",
      "Habilitar 'Permitir tráfego encaminhado' exclusivamente na VNet-Spoke.",
      "Configurar um Gateway NAT na VNet-Spoke com IP estático.",
      "Criar uma zona de DNS pública compartilhada entre as duas VNets."
    ],
    answer: 0,
    explanation: "Para compartilhar um gateway de VPN/ExpressRoute em um modelo hub-and-spoke, deve-se habilitar 'Permitir trânsito de gateway' (AllowGatewayTransit) no lado do emparelhamento da rede hub e habilitar 'Usar gateways remotos' (UseRemoteGateways) no lado do emparelhamento da rede spoke. Isso permite que a rede spoke direcione tráfego através do gateway da rede hub sem custos de gateway adicional."
  },
  {
    id: 84,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem 20 máquinas virtuais em uma sub-rede: 10 executam servidores web e 10 executam servidores de banco de dados SQL. Você precisa criar uma regra de Grupo de Segurança de Rede (NSG) que permita conexões na porta 1433 (SQL) originadas EXCLUSIVAMENTE dos servidores web para os servidores de banco de dados, sem precisar listar manualmente os endereços IP individuais de cada máquina virtual na regra. O que você deve utilizar?",
    options: [
      "Grupos de Segurança de Aplicativo (Application Security Groups - ASGs).",
      "Tags de Serviço padrão (Service Tags) como 'VirtualNetwork'.",
      "Regras de Roteamento Definidas pelo Usuário (UDR).",
      "Balanceador de Carga Básico com portas dinâmicas."
    ],
    answer: 0,
    explanation: "Os Grupos de Segurança de Aplicativo (ASGs) permitem agrupar interfaces de rede de VMs em categorias lógicas de aplicativos (por exemplo, 'ASG-Web' e 'ASG-SQL'). Ao escrever regras de NSG, você pode definir a origem como 'ASG-Web' e o destino como 'ASG-SQL' na porta 1433, eliminando a manutenção manual de endereços IP estáticos conforme máquinas são adicionadas ou removidas."
  },
  {
    id: 85,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você é o arquiteto de redes de uma assinatura Azure. Por exigência de conformidade bancária, todo o tráfego de saída destinado à internet gerado por máquinas virtuais na sub-rede 'Subnet-Core' deve ser inspecionado obrigatoriamente por um firewall virtual (NVA) localizado no endereço IP 10.0.1.10. Qual rota você deve configurar na Tabela de Rotas (Route Table) associada à sub-rede?",
    options: [
      "Prefixo de endereço: 0.0.0.0/0 | Tipo de próximo salto: Dispositivo Virtual (Virtual Appliance) | Endereço do próximo salto: 10.0.1.10",
      "Prefixo de endereço: 10.0.1.10/32 | Tipo de próximo salto: Internet",
      "Prefixo de endereço: 0.0.0.0/0 | Tipo de próximo salto: Gateway de Rede Virtual",
      "Prefixo de endereço: 255.255.255.255/32 | Tipo de próximo salto: Nenhum"
    ],
    answer: 0,
    explanation: "Para implementar tunelamento forçado de tráfego de internet através de um firewall de rede (NVA), cria-se uma rota definida pelo usuário (UDR) para o prefixo '0.0.0.0/0' (rota padrão para a internet) especificando o tipo de próximo salto como 'VirtualAppliance' e informando o IP privado do firewall (10.0.1.10). Isso substitui a rota de internet padrão do Azure."
  },
  {
    id: 86,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você precisa implantar o serviço Azure Bastion em uma rede virtual existente para permitir que os administradores acessem máquinas virtuais Linux e Windows via SSH e RDP diretamente pelo navegador através de TLS (porta 443). Quais são os DOIS requisitos obrigatórios de infraestrutura para provisionar o Azure Bastion na rede virtual?",
    options: [
      "Uma sub-rede dedicada com o nome exato 'AzureBastionSubnet' com prefixo de no mínimo /26 e um Endereço IP Público com SKU Standard.",
      "Uma sub-rede chamada 'GatewaySubnet' com prefixo /24 e um IP Público Básico.",
      "Duas máquinas virtuais executando o serviço de Proxy Reverso NGINX.",
      "Uma rota de UDR apontando para um provedor ExpressRoute."
    ],
    answer: 0,
    explanation: "O Azure Bastion exige uma sub-rede dedicada com o nome exato 'AzureBastionSubnet' com máscara mínima de /26 (ou maior, como /25) para acomodar instâncias de escalabilidade, além de exigir um endereço IP público estático com SKU Standard. A sub-rede não pode ser utilizada para implantar máquinas virtuais comuns."
  },
  {
    id: 87,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem um Balanceador de Carga Standard do Azure (Azure Standard Load Balancer) distribuindo tráfego para um pool de servidores web backend. Os servidores executam aplicações web na porta 80 e 443. Os desenvolvedores relatam que, mesmo com o Balanceador de Carga ativo e a sonda de integridade em estado 'Saudável' (Healthy), os clientes externos não conseguem se conectar. O que deve ser verificado nas interfaces de rede das VMs backend?",
    options: [
      "As regras de entrada do Grupo de Segurança de Rede (NSG), pois o Standard Load Balancer é seguro por padrão e exige regras explícitas de NSG para permitir o tráfego.",
      "A chave de criptografia de disco no Azure Key Vault.",
      "O agente de diagnósticos do Log Analytics.",
      "A assinatura do Microsoft Entra ID."
    ],
    answer: 0,
    explanation: "Diferente do legado Basic Load Balancer, o Azure Standard Load Balancer opera sob o princípio de segurança por padrão (secure-by-default). Todas as regras de tráfego são bloqueadas nas interfaces de rede das VMs backend a menos que um Grupo de Segurança de Rede (NSG) seja configurado explicitamente permitindo o tráfego nas portas da aplicação."
  },
  {
    id: 88,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua empresa hospeda um portal de e-commerce e deseja usar o Gateway de Aplicativo do Azure (Azure Application Gateway v2). O tráfego direcionado para 'https://loja.contoso.com/imagens/*' deve ser enviado para um pool de servidores otimizado para mídia ('Pool-Imagens'), enquanto o tráfego direcionado para 'https://loja.contoso.com/checkout/*' deve ser enviado para um pool de servidores de alta segurança ('Pool-Checkout'). Qual recurso do Application Gateway você deve configurar?",
    options: [
      "Roteamento baseado em caminho de URL (URL Path-based Routing).",
      "Balanceamento de Carga de Camada 4 por Hash de Tupla.",
      "Balanceamento com Porta Flutuante (Floating IP).",
      "Sonda de integridade ICMP Ping."
    ],
    answer: 0,
    explanation: "O Azure Application Gateway é um balanceador de carga de camada 7 (HTTP/HTTPS). Ele suporta 'Roteamento baseado em caminho de URL' (Path-based Routing), permitindo que regras de roteamento examinem a URI da solicitação (ex: /imagens/* vs /checkout/*) e encaminhem o tráfego para pools de back-end diferentes de acordo com a URL solicitada."
  },
  {
    id: 89,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem 100 máquinas virtuais em uma sub-rede privada sem endereços IP públicos no Azure. As máquinas executam microserviços que realizam chamadas constantes a APIs de parceiros na internet pública. Durante horários de pico, as conexões de saída começam a falhar intermitentemente devido ao esgotamento de portas SNAT (SNAT port exhaustion). Qual serviço gerenciado do Azure você deve associar à sub-rede para resolver esse problema?",
    options: [
      "Gateway NAT do Azure (Azure NAT Gateway).",
      "Balanceador de Carga Básico público.",
      "Servidor Proxy Squid em uma única VM.",
      "Tabela de Rotas com próximo salto nulo."
    ],
    answer: 0,
    explanation: "O Azure NAT Gateway é o serviço nativo e altamente escalável para fornecer conectividade de saída (outbound) para a internet em sub-redes privadas. Ele fornece alocação sob demanda de portas SNAT com múltiplos IPs públicos estáticos, eliminando totalmente o esgotamento de portas SNAT sem expor as VMs a tráfego de entrada não solicitado."
  },
  {
    id: 90,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você configurou uma Zona de DNS Privado do Azure chamada 'corp.internal' vinculada à rede virtual 'VNet1'. Você precisa diagnosticar por que uma VM na VNet1 não consegue resolver o nome de outra VM chamada 'vm2.corp.internal'. Qual ferramenta do Observador de Rede (Network Watcher) ajuda a testar a conectividade de rede ponta a ponta e identificar o caminho dos pacotes entre as duas VMs?",
    options: [
      "Solucionador de Problemas de Conexão (Connection Troubleshoot).",
      "Topologia de Rede estática.",
      "Registro de Fluxo de NSG.",
      "Captura de Pacotes local."
    ],
    answer: 0,
    explanation: "O 'Connection Troubleshoot' (Solucionador de Problemas de Conexão) do Azure Network Watcher testa conexões de rede ponta a ponta entre máquinas virtuais, pontos de extremidade de IP ou FQDNs. Ele avalia se a falha é causada por regras de NSG, erros de roteamento, indisponibilidade de porta ou latência excessiva, fornecendo diagnósticos detalhados do salto de rede."
  },
  {
    id: 91,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você precisa configurar a resolução de nomes privada para uma conta de armazenamento do Azure com Ponto de Extremidade Privado (Private Endpoint). Qual é o nome correto da zona DNS privada recomendada pela Microsoft para o serviço de Blob Storage?",
    options: [
      "privatelink.blob.core.windows.net",
      "corp.blob.azure.com",
      "internal.storage.windows.net",
      "blob.core.windows.net.private"
    ],
    answer: 0,
    explanation: "A convenção de nomenclatura oficial da Microsoft para zonas de DNS privado integradas com o Azure Private Link para o serviço Blob Storage é 'privatelink.blob.core.windows.net'. O registro do tipo A com o nome da conta de armazenamento e seu endereço IP privado é criado dentro dessa zona."
  },

  // =========================================================================
  // DOMÍNIO 5: MONITORAR E MANTER RECURSOS DO AZURE (10-15% -> 9 Qs)
  // =========================================================================
  {
    id: 92,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você precisa coletar logs do sistema operacional de 50 máquinas virtuais Windows e Linux em uma assinatura Azure e enviá-los para um espaço de trabalho do Log Analytics. A solução deve utilizar a arquitetura moderna de telemetria do Azure que permite definir regras centralizadas de quais logs de eventos coletar e para onde encaminhá-los. Qual combinação de recursos você deve implantar?",
    options: [
      "Instalar o Agente do Azure Monitor (AMA) nas VMs e configurar Regras de Coleta de Dados (Data Collection Rules - DCR).",
      "Instalar o Agente do Log Analytics legado (MMA/OMS) e configurar scripts em lote locais.",
      "Instalar a extensão de Diagnóstico do Azure Clássico em cada VM.",
      "Habilitar o Assistente do Azure com recomendações de segurança."
    ],
    answer: 0,
    explanation: "O Agente do Azure Monitor (Azure Monitor Agent - AMA) substitui os agentes legados (MMA/OMS e Diagnóstico do Azure). Ele utiliza 'Regras de Coleta de Dados' (Data Collection Rules - DCR), que são configurações centralizadas no ARM que definem exatamente quais dados coletar (eventos de segurança, desempenho, Syslog) e para quais destinos encaminhá-los."
  },
  {
    id: 93,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você gerencia um espaço de trabalho do Log Analytics. Você precisa escrever uma consulta em KQL (Kusto Query Language) que liste todas as operações com falha registradas no Log de Atividades do Azure (tabela AzureActivity) nas últimas 24 horas, ordenadas pelas mais recentes. Qual consulta KQL você deve executar?",
    options: [
      "AzureActivity | where TimeGenerated > ago(24h) | where ActivityStatusValue == \"Failed\" | order by TimeGenerated desc",
      "AzureMetrics | select * where Status == 'Error'",
      "EventLog | filter 24h | search 'Failed'",
      "SecurityAlert | take 100"
    ],
    answer: 0,
    explanation: "Em Kusto Query Language (KQL), a tabela 'AzureActivity' armazena eventos do plano de controle. A cláusula '| where TimeGenerated > ago(24h)' restringe o intervalo de tempo às últimas 24 horas, '| where ActivityStatusValue == \"Failed\"' filtra solicitações que retornaram erro e '| order by TimeGenerated desc' organiza o resultado em ordem cronológica decrescente."
  },
  {
    id: 94,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Sua empresa armazena 500 GB de logs diariamente em um espaço de trabalho do Log Analytics. Os logs devem ficar disponíveis para consultas interativas rápidas por 30 dias. No entanto, exigências de auditoria exigem que os logs sejam preservados por 365 dias adicionais pelo menor custo possível. Como você deve configurar a retenção de dados no Log Analytics para atender ao requisito de custo?",
    options: [
      "Definir a Retenção Interativa (Interactive Retention) para 30 dias e a Retenção de Arquivo (Archive Retention) total para 395 dias.",
      "Aumentar a retenção interativa para 395 dias no nível padrão de cobrança.",
      "Exportar os logs diariamente para fitas magnéticas usando um script em PowerShell.",
      "Criar 12 espaços de trabalho diferentes do Log Analytics e alternar mensalmente."
    ],
    answer: 0,
    explanation: "O Azure Log Analytics oferece duas camadas de retenção: a Retenção Interativa (com custo integral para consultas e análises frequentes) e a Camada de Arquivo (Archive). Ao configurar 30 dias de retenção interativa e o restante em retenção de arquivamento, os dados antigos são preservados com custo significativamente reduzido por GB/mês, podendo ser pesquisados via restore pontual ou search jobs."
  },
  {
    id: 95,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você tem um Cofre dos Serviços de Recuperação (Recovery Services Vault) configurado com armazenamento com redundância geográfica (GRS). A empresa exige que, caso ocorra um desastre grave na região primária do Azure, a equipe de TI consiga restaurar imediatamente as máquinas virtuais na região secundária emparelhada, mesmo antes de a Microsoft declarar oficialmente o failover da região primária. Qual recurso do cofre deve ser ativado?",
    options: [
      "Restauração entre Regiões (Cross-Region Restore - CRR).",
      "Imutabilidade de Blobs com retenção baseada em tempo.",
      "Exclusão Suave com senha de uso único (PIN).",
      "Backup Instantâneo de 5 dias."
    ],
    answer: 0,
    explanation: "O recurso 'Restauração entre Regiões' (Cross-Region Restore - CRR) em cofres GRS do Azure Backup permite que os administradores realizem a restauração de máquinas virtuais, bancos de dados SQL e SAP HANA diretamente na região secundária emparelhada do Azure a qualquer momento, sem depender da declaração de desastre regional pela Microsoft."
  },
  {
    id: 96,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Ao criar uma Política de Backup para Máquinas Virtuais no Azure Backup, o que representa o recurso de 'Instant Restore' (Restauração Instantânea) e qual é a sua principal vantagem operacional?",
    options: [
      "Retém instantâneos (snapshots) locais dos discos gerenciados da VM por 1 a 5 dias, permitindo restaurações ultrarrápidas sem precisar esperar a transferência de dados do cofre.",
      "Gera uma cópia das VMs em servidores locais em tempo real.",
      "Executa um script de recuperação automática caso a CPU ultrapasse 90%.",
      "Converte máquinas virtuais Windows em contêineres Docker automaticamente."
    ],
    answer: 0,
    explanation: "O recurso de Restauração Instantânea (Instant Restore) do Azure Backup mantém snapshots locais criados durante a rotina de backup armazenados junto aos discos da VM por um período configurável de 1 a 5 dias. Isso permite restaurar a VM ou seus discos em questão de minutos, eliminando a latência de transferência de dados do cofre para o armazenamento de computação."
  },
  {
    id: 97,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Um invasor obtém credenciais de administrador da sua assinatura do Azure e tenta excluir todos os backups armazenados no Cofre dos Serviços de Recuperação para exigir resgate. Qual recurso nativo do Azure Backup impede que os dados excluídos sejam eliminados imediatamente, mantendo-os recuperáveis por 14 dias sem custo adicional?",
    options: [
      "Exclusão Suave (Soft Delete).",
      "Bloqueio de Recurso ReadOnly na assinatura.",
      "Criptografia de Disco com BitLocker.",
      "Regra de Coleta de Dados (DCR)."
    ],
    answer: 0,
    explanation: "A 'Exclusão Suave' (Soft Delete) é ativada por padrão em Cofres dos Serviços de Recuperação. Quando um backup de VM é excluído (intencional ou maliciosamente), os dados de backup são colocados em um estado excluído suavemente por 14 dias. Durante esse período, o backup pode ser recuperado ('Desfazer Exclusão') sem nenhuma perda permanente de dados."
  },
  {
    id: 98,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você gerencia a continuidade de negócios de uma aplicação crítica hospedada em máquinas virtuais no Azure na região Leste dos EUA. Você precisa implementar uma solução que replique continuamente os dados dessas VMs para a região Oeste dos EUA e permita executar testes de recuperação de desastres (Test Failover) sem interromper as operações do ambiente de produção. Qual serviço você deve utilizar?",
    options: [
      "Azure Site Recovery (ASR).",
      "Azure Backup com política diária.",
      "Replicação de Objetos do Blob Storage.",
      "Azure Traffic Manager em modo ponderado."
    ],
    answer: 0,
    explanation: "O Azure Site Recovery (ASR) é o serviço de recuperação de desastres como serviço (DRaaS) da Microsoft. Ele fornece replicação assíncrona contínua no nível de bloco entre regiões do Azure (ou de ambientes locais para o Azure) e suporta 'Test Failover' isolado em uma rede virtual de teste sem afetar a replicação ou as máquinas de produção em execução."
  },
  {
    id: 99,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você precisa verificar se uma falha de conexão enfrentada por vários usuários da sua organização foi causada por um incidente generalizado na infraestrutura de datacenters da Microsoft na região Sul do Brasil ou por uma manutenção programada nos serviços da plataforma. Qual painel você deve consultar?",
    options: [
      "Azure Service Health.",
      "Azure Cost Management.",
      "Log Analytics Workspace.",
      "Microsoft Defender for Cloud."
    ],
    answer: 0,
    explanation: "O Azure Service Health fornece uma visão personalizada e abrangente da integridade dos serviços e regiões do Azure que afetam suas assinaturas específicas. Ele comunica incidentes de serviço ativos, manutenções planejadas pela Microsoft e avisos de integridade que possam impactar a disponibilidade dos seus recursos."
  },
  {
    id: 100,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "O Assistente do Azure (Azure Advisor) exibe recomendações para otimizar os custos da sua assinatura corporativa. Qual das seguintes opções é uma recomendação típica da categoria de Custo do Azure Advisor?",
    options: [
      "Redimensionar ou desligar máquinas virtuais subutilizadas e comprar Instâncias Reservadas para cargas de trabalho de longo prazo.",
      "Habilitar autenticação multifator para administradores globais.",
      "Bloquear a porta 3389 em todos os Grupos de Segurança de Rede.",
      "Configurar zonas de DNS privado para todas as sub-redes."
    ],
    answer: 0,
    explanation: "O pilar de Custos do Azure Advisor analisa o histórico de consumo dos seus recursos e recomenda ações práticas para economizar, como o desligamento ou redimensionamento (right-sizing) de máquinas virtuais com baixa utilização de CPU/memória e a aquisição de Reservas do Azure (Reserved Instances) ou Planos de Economia para cargas previsíveis."
  }
];
