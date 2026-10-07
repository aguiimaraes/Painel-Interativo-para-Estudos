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
      "Habilitar a Sincronização de Hash de Senha (PHS) com provisionamento contínuo em licenças Microsoft Entra ID Free.",
      "Habilitar a Autenticação de Passagem (PTA) com agentes locais dedicados e licenças Microsoft 365 Business Basic.",
      "Habilitar o Writeback de Senha (Password Writeback) no Entra Connect com licenças Microsoft Entra ID Premium P1 atribuídas.",
      "Habilitar o Writeback de Dispositivos e Federação ADFS com licenças Microsoft Entra ID Governance sem add-ons adicionais no locatário corporativo."
    ],
    answer: 2,
    explanation: "O recurso de Password Writeback (writeback de senha) no Microsoft Entra Connect permite que alterações de senha feitas via SSPR no Microsoft Entra ID sejam gravadas imediatamente no Active Directory local. Esse recurso exige no mínimo licenças Microsoft Entra ID Premium P1 (ou Microsoft 365 E3/Business Premium) atribuídas aos usuários que utilizarão o serviço."
  },
  {
    id: 52,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem um locatário do Microsoft Entra ID chamado contoso.com. Você precisa criar um grupo de segurança que contenha automaticamente todos os colaboradores contratados em período integral do departamento financeiro. Os colaboradores devem ter o atributo 'Department' igual a 'Finance' e o atributo 'UserType' igual a 'Member'. Qual regra de associação dinâmica você deve configurar no Microsoft Entra ID?",
    options: [
      "(user.department -eq \"Finance\") -and (user.userType -eq \"Member\")",
      "(user.department -match \"Finance\") -or (user.userType -eq \"Member\")",
      "(user.department -contains \"Finance\") -and (user.accountEnabled -eq $false)",
      "(user.assignedLicenses -any (license.skuId -eq \"Finance\")) -and (user.userType -ne \"Guest\")"
    ],
    answer: 0,
    explanation: "Para grupos de associação dinâmica no Microsoft Entra ID, a sintaxe oficial para exigir múltiplos critérios simultâneos utiliza o operador lógico '-and' com o operador de igualdade '-eq'. Portanto, '(user.department -eq \"Finance\") -and (user.userType -eq \"Member\")' garante a inclusão automática apenas de membros efetivos pertencentes ao departamento financeiro, excluindo convidados externos (Guest)."
  },
  {
    id: 53,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa adquiriu 200 novos laptops corporativos com Windows 11 para colaboradores remotos. A empresa não possui controladores de domínio locais e gerencia todos os dispositivos exclusivamente via nuvem com Microsoft Intune e Microsoft Entra ID. Você precisa conectar esses computadores diretamente ao diretório da nuvem durante a configuração inicial do Windows (OOBE). Qual tipo de identidade de dispositivo você deve utilizar?",
    options: [
      "Microsoft Entra Registered (Registrado no Entra ID voltado para cenários de BYOD e contas pessoais)",
      "Microsoft Entra Hybrid Joined (Ingresso Híbrido no Entra ID dependente de controladores de domínio AD locais)",
      "Workplace Join legado (Ingresso no Local de Trabalho com autenticação via Serviços Federados ADFS)",
      "Microsoft Entra Joined (Ingressado no Entra ID com suporte a logon corporativo e MDM)"
    ],
    answer: 3,
    explanation: "Dispositivos 'Microsoft Entra Joined' são computadores corporativos associados exclusivamente ao Microsoft Entra ID (sem Active Directory local), configurados normalmente na tela de inicialização (OOBE) pelo usuário com sua conta corporativa. Eles permitem logon com credenciais do Entra ID, autenticação SSO e gerenciamento completo via MDM (Microsoft Intune)."
  },
  {
    id: 54,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você gerencia políticas de segurança no Microsoft Entra ID. Você precisa criar uma política de Acesso Condicional para proteger o portal do Azure (Microsoft Azure Management). A política deve exigir que os administradores cumpram a autenticação multifator (MFA) E usem um dispositivo marcado como em conformidade (compliant) pelo Microsoft Intune. Na seção Controles de Acesso > Conceder (Grant), como você deve configurar a exigência?",
    options: [
      "Selecionar 'Exigir autenticação multifator' e 'Exigir que o dispositivo seja marcado como em conformidade', marcando a opção alternativa 'Exigir um dos controles selecionados'.",
      "Selecionar 'Exigir autenticação multifator' e 'Exigir que o dispositivo seja marcado como em conformidade', marcando a opção 'Exigir todos os controles selecionados'.",
      "Selecionar apenas o controle 'Bloquear acesso' e configurar uma exceção explícita de IP confiável para todas as redes corporativas.",
      "Selecionar 'Exigir alteração de senha' e vincular a execução obrigatória de um pacote de acesso no Gerenciamento de Direitos."
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
      "Deny (rejeita imediatamente a solicitação de implantação da máquina virtual caso a extensão esteja ausente no template)",
      "Audit (gera um evento de não conformidade no painel do Azure Policy mantendo o recurso ativo sem nenhuma correção automática)",
      "DeployIfNotExists (dispara automaticamente uma tarefa de correção após a implantação caso a extensão não exista)",
      "Modify (insere dinamicamente tags corporativas adicionais antes que a máquina virtual seja provisionada pelos controladores)"
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
      "Permissão de Leitor em MG-Desenvolvimento e permissão de Colaborador em MG-Producao, sem exigir nenhuma atribuição na assinatura Sub1 no escopo direto.",
      "Permissão de Administrador de Acesso do Usuário exclusivamente no Tenant Root Group, sem permissões delegadas nos grupos filhos.",
      "Permissão de Proprietário exclusivamente na assinatura Sub1, com herança automática nos grupos de gerenciamento superiores.",
      "Permissão de gravação (Microsoft.Management/managementGroups/subscriptions/write) tanto no MG de origem quanto no de destino, além de permissão de gravação na assinatura."
    ],
    answer: 3,
    explanation: "Para mover uma assinatura entre Grupos de Gerenciamento, o administrador precisa de permissões de gravação ('Microsoft.Management/managementGroups/subscriptions/write' ou função de Administrador/Colaborador do Grupo de Gerenciamento) em três locais: no escopo do Grupo de Gerenciamento de origem (para desvincular), no escopo do Grupo de Gerenciamento de destino (para vincular) e no escopo da própria assinatura."
  },
  {
    id: 57,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você precisa criar uma função personalizada do Azure RBAC (Custom Role) via JSON para a equipe de operadores de data center. Os operadores devem ter permissão para reiniciar e desalocar máquinas virtuais existentes, mas NÃO devem ter permissão para criar novas VMs, alterar configurações de tamanho de VM ou excluir VMs. Quais ações mínimas devem ser especificadas na seção 'Actions' da definição da função?",
    options: [
      "[\"Microsoft.Compute/virtualMachines/read\", \"Microsoft.Compute/virtualMachines/restart/action\", \"Microsoft.Compute/virtualMachines/deallocate/action\"]",
      "[\"Microsoft.Compute/virtualMachines/*\", \"Microsoft.Compute/virtualMachines/write\", \"Microsoft.Compute/virtualMachines/delete\", \"Microsoft.Authorization/*/read\"]",
      "[\"Microsoft.Compute/virtualMachines/start/action\", \"Microsoft.Compute/virtualMachines/powerOff/action\", \"Microsoft.Authorization/*/read\"]",
      "[\"Microsoft.Compute/virtualMachines/read\", \"Microsoft.Compute/virtualMachines/extensions/write\", \"Microsoft.Compute/virtualMachines/delete\"]"
    ],
    answer: 0,
    explanation: "No Azure RBAC, operações de controle de ciclo de vida de VM (como reiniciar e desligar/desalocar) são tratadas como operações de ação ('/action'). Para que o operador visualize o status da VM no portal e execute reinicializações e desalocações sem modificar configurações de hardware nem excluir recursos, concede-se 'Microsoft.Compute/virtualMachines/read', 'Microsoft.Compute/virtualMachines/restart/action' e 'Microsoft.Compute/virtualMachines/deallocate/action'."
  },
  {
    id: 58,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem um grupo de recursos chamado RG-Dados que contém uma conta de armazenamento chamada storageprod1. No nível do grupo de recursos RG-Dados, você aplicou um bloqueio de recursos do tipo 'CanNotDelete' (ReadOnly = false). Quais das seguintes operações um usuário com a função de 'Proprietário' (Owner) poderá executar com sucesso na storageprod1?",
    options: [
      "Excluir o grupo de recursos RG-Dados inteiro através do portal do Azure ou via comando no Azure PowerShell.",
      "Fazer upload de novos arquivos blob e regenerar as chaves de acesso da storageprod1 sem restrições de escrita.",
      "Excluir individualmente a conta de armazenamento storageprod1 mantendo os outros recursos do grupo intactos.",
      "Remover o bloqueio de recursos apenas se possuir a função de Administrador Global no locatário do Microsoft Entra ID."
    ],
    answer: 1,
    explanation: "O bloqueio 'CanNotDelete' impede a exclusão do recurso e de seus recursos filhos, mas NÃO impede a modificação de dados ou operações do plano de controle como leitura, gravação, upload de blobs e rotação de chaves de acesso. Somente o bloqueio 'ReadOnly' impediria a rotação de chaves e a gravação de novos dados."
  },
  {
    id: 59,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você é o responsável pelo controle financeiro de uma assinatura Azure. Você criou um orçamento (Budget) mensal de R$ 10.000 no Azure Cost Management. Você precisa ser alertado quando os gastos reais atingirem 80% do valor orçado e também quando a previsão (forecasted) de gastos até o fim do mês atingir 100% do valor orçado. O que você deve configurar?",
    options: [
      "Uma recomendação do Azure Advisor para redimensionamento de instâncias reservadas vinculada a um webhook automático no Azure Logic Apps.",
      "Uma política do Azure Policy com efeito 'Deny' que desligue automaticamente as VMs ao ultrapassar o limite orçado.",
      "Duas regras de alertas de custo no Budget: uma baseada em 'Real' (Actual) a 80% e outra baseada em 'Previsto' (Forecasted) a 100%, associadas a um Action Group.",
      "Um alerta de consulta KQL no Azure Log Analytics monitorando o consumo de vCPUs e cotas de computação da assinatura."
    ],
    answer: 2,
    explanation: "No Azure Cost Management + Billing, os orçamentos (Budgets) suportam condições de alerta baseadas em gastos reais ('Actual') e gastos previstos por machine learning ('Forecasted'). É possível definir múltiplos limites percentuais com notificações automáticas enviadas para endereços de e-mail ou integradas a Grupos de Ações (Action Groups)."
  },
  {
    id: 60,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua organização colabora com dezenas de parceiros externos no Microsoft Entra ID. Você precisa garantir que o acesso dos usuários convidados (Guest Accounts) seja revisado trimestralmente pelos proprietários dos respectivos grupos. Caso um proprietário não responda à revisão dentro de 14 dias, o sistema deve revogar automaticamente o acesso do convidado. Qual recurso do Microsoft Entra ID Governance você deve implementar?",
    options: [
      "Revisões de Acesso (Access Reviews) configuradas com periodicidade trimestral e ação de remoção automática.",
      "Gerenciamento de Direitos (Entitlement Management) baseado em pacotes de acesso com catálogo estático.",
      "Privileged Identity Management (PIM) atribuído exclusivamente a funções administrativas de nível elevado.",
      "Políticas de Proteção de Identidade (Identity Protection) baseadas em detecção contínua de risco de entrada."
    ],
    answer: 0,
    explanation: "As Revisões de Acesso (Access Reviews) do Microsoft Entra ID permitem auditar periodicamente o acesso de usuários membros e convidados a grupos corporativos e aplicativos. É possível configurar recorrência trimestral, definir os proprietários do grupo como revisores e determinar ações automáticas (como remover o acesso) se o revisor não responder dentro do prazo estipulado."
  },
  {
    id: 61,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa precisa impor 15 políticas corporativas de governança em todas as assinaturas de produção (ex: proibir tamanhos de VM caros, exigir tags de centro de custo e bloquear regiões fora do Brasil). Você deseja gerenciar a atribuição e o relatório de conformidade dessas 15 políticas como uma única unidade lógica de governança. O que você deve criar no Azure Policy?",
    options: [
      "Um Blueprint do Azure arquivado e versionado em repositório GitHub com atribuição manual por assinatura e bloqueio de artefatos.",
      "Um Grupo de Ações do Azure Monitor integrando webhooks de notificação e regras de automação por Runbook.",
      "Um Grupo de Gerenciamento raiz com bloqueio do tipo ReadOnly aplicado a todas as assinaturas vinculadas.",
      "Uma Definição de Iniciativa (Initiative Definition ou Policy Set) contendo as 15 definições de política agrupadas."
    ],
    answer: 3,
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
      "A conversão direta não é suportada; você deve excluir os contêineres e recriá-los do zero em uma nova conta GRS secundária com migração manual.",
      "Alterar a configuração de redundância para ZRS (Zone-Redundant Storage) diretamente no portal ou solicitar conversão ao vivo sem downtime.",
      "Alterar a configuração para RA-GRS e realizar o failover manual pelo PowerShell para a região emparelhada imediatamente.",
      "Configurar um Gateway NAT na rede virtual de armazenamento e habilitar pontos de extremidade de serviço redundantes."
    ],
    answer: 1,
    explanation: "O Azure Storage permite converter contas com redundância LRS para ZRS (armazenamento com redundância de zona) na maioria das regiões suportadas. A conversão pode ser iniciada diretamente pelo portal do Azure ou solicitada como uma migração ao vivo (live migration) suportada pela Microsoft, garantindo que os dados sejam replicados entre 3 Zonas de Disponibilidade sem interrupção no acesso da aplicação."
  },
  {
    id: 63,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você gerencia um contêiner de Blob Storage no Azure que armazena relatórios de faturamento. Os relatórios são consultados frequentemente nos primeiros 30 dias. Entre 31 e 90 dias, eles são acessados esporadicamente. Após 90 dias, eles devem ser mantidos por 7 anos para fins fiscais sem necessidade de acesso imediato, priorizando o menor custo de armazenamento. Qual regra de Gerenciamento de Ciclo de Vida (Lifecycle Management) atende a esse requisito?",
    options: [
      "Mover para a camada Cool após 30 dias, mover para a camada Archive após 90 dias e excluir após 2555 dias (7 anos).",
      "Mover para a camada Archive imediatamente após 30 dias e reidratar mensalmente para consultas em lote programadas.",
      "Mover para a camada Cool no dia 1 e desabilitar o controle de versões de blobs da conta sem transição para Archive.",
      "Criar uma política de replicação contínua de objetos direcionada a uma conta Premium Block Blob com tier Ultra."
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
      "SAS de Conta (Account SAS assinada com a chave primária de acesso da conta storage)",
      "SAS de Serviço (Service SAS associada a uma política de acesso armazenada em tabela)",
      "SAS de Delegação de Usuário (User Delegation SAS garantida por credenciais Entra ID)",
      "Token de SAS do Azure AD B2C emitido via protocolo OAuth com escopo público aberto"
    ],
    answer: 2,
    explanation: "A SAS de Delegação de Usuário (User Delegation SAS) é protegida por credenciais do Microsoft Entra ID (Azure AD), em vez das chaves da conta de armazenamento. Isso garante que as permissões concedidas pela SAS sejam limitadas pelas permissões RBAC do próprio usuário gerador, sem expor as chaves mestre da conta."
  },
  {
    id: 65,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua equipe precisa implantar um compartilhamento de arquivos no Azure Files para suportar uma aplicação corporativa herdada (legacy) que utiliza o protocolo SMB e exige autenticação baseada em Kerberos e NTLM. A organização não possui controladores de domínio locais e não deseja gerenciar e aplicar patches em máquinas virtuais Windows Server dedicadas como DCs no Azure. Qual solução de identidade deve ser configurada para autenticar o acesso aos arquivos?",
    options: [
      "Autenticação Kerberos do Microsoft Entra ID pura com identidades híbridas e certificados locais emitidos por autoridade certificadora interna.",
      "Serviços de Domínio do Microsoft Entra (Microsoft Entra Domain Services - Entra DS gerenciado pela nuvem).",
      "Chaves de Acesso Compartilhadas da Conta de Armazenamento montadas diretamente no arquivo fstab do Linux.",
      "Federação de Identidades de Carga de Trabalho usando Provedores OpenID Connect públicos sem domínio."
    ],
    answer: 1,
    explanation: "O Microsoft Entra Domain Services (anteriormente Azure AD DS) fornece serviços de domínio totalmente gerenciados (incluindo ingresso em domínio, políticas de grupo, LDAP e autenticação Kerberos/NTLM) sem que os administradores precisem implantar, gerenciar ou atualizar controladores de domínio em VMs IaaS."
  },
  {
    id: 66,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você está criando uma conta de armazenamento dedicada para hospedar compartilhamentos de arquivos do Azure Files que serão acessados simultaneamente por centenas de desenvolvedores para compilação de código em bancos de dados relacionais. A carga de trabalho é sensível à latência e exige alto throughput com garantia de desempenho consistente em milissegundos de um dígito. Qual tipo de conta e camada de compartilhamento de arquivos você deve provisionar?",
    options: [
      "Conta de uso geral v2 (General Purpose v2) com camada de acesso Transação Otimizada em discos HDD.",
      "Conta de armazenamento BlobStorage com camada de acesso Frequente (Hot) e aceleração por CDN integrada.",
      "Conta General Purpose v1 herdada com compartilhamentos NFS v3.0 em discos magnéticos padrão (Standard).",
      "Conta de armazenamento FileStorage de desempenho Premium com compartilhamentos em discos SSD dedicados."
    ],
    answer: 3,
    explanation: "Compartilhamentos de arquivos Premium (Premium File Shares) são hospedados em contas de armazenamento dedicadas do tipo FileStorage em hardware SSD. Eles oferecem latência consistente de um dígito de milissegundo para E/S aleatórias, alta taxa de transferência (throughput) e escalabilidade de IOPS provisionados, sendo ideais para bancos de dados, compilações e sistemas ERP."
  },
  {
    id: 67,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua organização tem uma conta de armazenamento chamada 'stcorpsecure' contendo dados corporativos confidenciais. Uma nova política de segurança determina que todo o acesso público da Internet deve ser bloqueado, permitindo que apenas máquinas virtuais localizadas na sub-rede 'Subnet-App' de uma rede virtual chamada 'VNet-Core' acessem os blobs. O tráfego não deve transitar pela Internet pública. Qual configuração você deve aplicar na conta de armazenamento?",
    options: [
      "Configurar o Firewall do Storage para 'Redes selecionadas', adicionar a 'Subnet-App' e habilitar o Ponto de Extremidade de Serviço Microsoft.Storage.",
      "Criar uma regra de NSG na Subnet-App bloqueando todo o tráfego de saída direcionado à porta 443 e habilitar IP público estático em cada VM.",
      "Alterar o tipo de conta para BlobStorage Clássico e configurar autenticação de passagem anônima em todos os contêineres.",
      "Configurar um Gateway NAT na VNet-Core e atribuir um endereço IP público dedicado na lista de permissões do Storage."
    ],
    answer: 0,
    explanation: "Para restringir o tráfego de uma conta de armazenamento a uma sub-rede específica via rede privada da Microsoft, habilita-se o Ponto de Extremidade de Serviço (Service Endpoint) para 'Microsoft.Storage' na sub-rede e, no firewall da conta de armazenamento, altera-se para 'Redes selecionadas' (Selected networks) adicionando a sub-rede autorizada."
  },
  {
    id: 68,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você precisa configurar o armazenamento de blobs imutável (Immutable Blob Storage) no Azure para cumprir a regulamentação SEC Rule 17a-4. Uma vez gravados, os documentos fiscais não podem ser excluídos ou modificados por nenhum usuário (incluindo Administradores Globais do locatário e o Suporte da Microsoft) durante o período obrigatório de retenção de 5 anos. Qual política e estado devem ser aplicados no contêiner de blobs?",
    options: [
      "Política de Retenção Baseada em Tempo no estado Desbloqueado (Unlocked State, permitindo ajuste de prazos pelo criador).",
      "Retenção Legal (Legal Hold) associada a uma tag temporária de auditoria interna configurada por PowerShell.",
      "Política de Retenção Baseada em Tempo no estado Bloqueado (Locked State, tornando a política estritamente irreversível).",
      "Bloqueio de Recursos do tipo CanNotDelete aplicado no grupo de recursos onde a conta de armazenamento reside."
    ],
    answer: 2,
    explanation: "Uma política de retenção baseada em tempo (Time-based retention policy) no estado 'Bloqueado' (Locked) atende rigorosamente a exigências regulatórias como WORM (Write Once, Read Many). Uma vez bloqueada a política, ela não pode ser desativada, encurtada ou removida por nenhum usuário, nem mesmo com privilégios de Administrador Global ou Suporte da Microsoft."
  },
  {
    id: 69,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você gerencia um contêiner de blobs onde arquivos são atualizados com frequência por múltiplos colaboradores. Você precisa atender a dois requisitos: 1) Manter automaticamente versões anteriores de cada blob sempre que ele for sobrescrito ou modificado; 2) Fornecer um log ordenado e somente leitura de todas as alterações (criações, modificações e exclusões) que ocorrem nos blobs do contêiner para auditoria. Quais recursos do Azure Blob Storage você deve habilitar?",
    options: [
      "Instantâneos de Blobs (Blob Snapshots) manuais periódicos e Replicação de Objetos contínua entre Contas de Armazenamento em regiões distintas.",
      "Controle de Versão de Blobs (Blob Versioning) e Feed de Alterações (Change Feed do Blob Storage integrados).",
      "Exclusão Suave de Blobs (Soft Delete) com retenção de 7 dias e Gerenciamento de Ciclo de Vida para Archive.",
      "Criptografia no Lado do Cliente com Azure Key Vault e Logs de Diagnóstico clássicos no Storage Analytics."
    ],
    answer: 1,
    explanation: "O 'Controle de Versão de Blobs' (Blob Versioning) cria automaticamente versões anteriores do blob quando ocorrem gravações ou exclusões. O 'Feed de Alterações' (Change Feed) fornece um registro de transações ordenado, garantido e somente leitura de todas as alterações feitas nos blobs, ideal para pipelines de auditoria e conformidade."
  },
  {
    id: 70,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você precisa sincronizar diariamente uma pasta local em um servidor Windows ('C:\\Dados') com um contêiner do Azure Blob Storage ('https://storage1.blob.core.windows.net/backup'). A ferramenta deve copiar apenas arquivos novos ou que tenham sido modificados localmente desde a última execução, e deve excluir no destino os arquivos que foram excluídos da pasta local de origem. Qual comando do AzCopy você deve executar?",
    options: [
      "azcopy copy \"C:\\Dados\" \"https://storage1.blob.core.windows.net/backup?[SAS]\" --overwrite=ifSourceNewer --recursive=true",
      "azcopy make \"https://storage1.blob.core.windows.net/backup?[SAS]\" --from-local=\"C:\\Dados\" --mirror=true",
      "azcopy jobs resume \"C:\\Dados\" --destination=\"https://storage1.blob.core.windows.net/backup?[SAS]\" --force-sync",
      "azcopy sync \"C:\\Dados\" \"https://storage1.blob.core.windows.net/backup?[SAS]\" --delete-destination=true --recursive=true"
    ],
    answer: 3,
    explanation: "O comando 'azcopy sync' compara os arquivos de origem e destino com base na data de última modificação e tamanho, copiando apenas as diferenças. O parâmetro '--delete-destination=true' instrui o AzCopy a remover arquivos no contêiner de destino que não existam mais na pasta de origem local, mantendo o espelhamento exato."
  },
  // =========================================================================
  // DOMÍNIO 3: IMPLANTAR E GERENCIAR RECURSOS DE COMPUTAÇÃO DO AZURE (20-25% -> 11 Qs)
  // =========================================================================
  {
    id: 71,
    domain: 3,
    domainName: "Computação",
    question: "Sua empresa está planejando hospedar uma aplicação de missão crítica em máquinas virtuais do Azure na região Leste dos EUA. O arquiteto de soluções exige que a solução tenha um Acordo de Nível de Serviço (SLA) de disponibilidade de 99,99% para as instâncias de computação, com proteção contra falhas em data centers individuais (incluindo falhas de energia, refrigeração e rede física). Qual estratégia de posicionamento de infraestrutura você deve implementar?",
    options: [
      "Implantar as máquinas virtuais distribuídas entre duas ou mais Zonas de Disponibilidade (Availability Zones) na região.",
      "Implantar as máquinas virtuais em um único Conjunto de Disponibilidade (Availability Set) configurado com 3 domínios de falha e discos gerenciados SSD.",
      "Implantar todas as máquinas virtuais em um Grupo de Posicionamento por Proximidade (Proximity Placement Group).",
      "Configurar um Conjunto de Escala de Máquinas Virtuais (VMSS) com modo de orquestração flexível em uma única zona."
    ],
    answer: 0,
    explanation: "As Zonas de Disponibilidade (Availability Zones) são locais fisicamente separados dentro da mesma região do Azure, cada uma com alimentação, refrigeração e rede independentes. A Microsoft oferece SLA de 99,99% para máquinas virtuais implantadas em duas ou mais Zonas de Disponibilidade na mesma região do Azure."
  },
  {
    id: 72,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa implantar 6 máquinas virtuais de banco de dados em uma região do Azure que NÃO possui suporte a Zonas de Disponibilidade. Para maximizar a disponibilidade e o SLA da aplicação contra manutenções planejadas de hardware e falhas de rack no data center, você opta por criar um Conjunto de Disponibilidade (Availability Set). Qual configuração de domínios de falha (Fault Domains) e domínios de atualização (Update Domains) você deve adotar para obter a máxima proteção física?",
    options: [
      "Atribuir as máquinas virtuais a 1 Domínio de Falha e 1 Domínio de Atualização para evitar fragmentação de memória.",
      "Atribuir as máquinas virtuais a um Grupo de Posicionamento por Proximidade com 3 Domínios de Falha e até 20 Domínios de Atualização.",
      "Criar um Conjunto de Disponibilidade exclusivo para cada máquina virtual com balanceamento de carga Round-Robin distribuído por IP.",
      "Criar um Conjunto de Disponibilidade exclusivo para cada máquina virtual com balanceamento de carga Round-Robin."
    ],
    answer: 1,
    explanation: "Em regiões que utilizam Availability Sets com discos gerenciados, o Azure suporta até 3 Domínios de Falha (Fault Domains - racks com energia e switches separados) e até 20 Domínios de Atualização (Update Domains - grupos de VMs reiniciadas separadamente durante manutenções planejadas da plataforma)."
  },
  {
    id: 73,
    domain: 3,
    domainName: "Computação",
    question: "Você gerencia um Conjunto de Escala de Máquinas Virtuais (VMSS) baseado em Linux que atende a uma aplicação web de comércio eletrônico. Você precisa configurar regras de dimensionamento automático (Autoscale) para atender a picos de tráfego imprevistos: quando o uso médio de CPU de todas as instâncias ultrapassar 75% por 10 minutos, o sistema deve adicionar 2 instâncias adicionais (scale-out). Onde e como essa regra deve ser configurada?",
    options: [
      "No painel 'Rede' do VMSS, configurando uma regra de NAT de entrada para balancear as conexões por IP de origem com balanceador padrão.",
      "Criando uma política do Azure Policy com efeito 'DeployIfNotExists' que monitore os contadores do Azure Advisor.",
      "No painel 'Dimensionamento' (Scaling) do VMSS, configurando uma regra baseada em métrica com métrica 'Percentage CPU' e agregação média.",
      "Configurando um alerta de log no Log Analytics com ação de execução de um webhook do Azure Automation clássico."
    ],
    answer: 2,
    explanation: "As regras de dimensionamento automático do VMSS são configuradas no painel 'Dimensionamento' (Scaling) do recurso no portal ou via Azure Monitor. Define-se a métrica (Percentage CPU), o operador de comparação (> 75%), o intervalo de agregação de tempo (10 minutos) e a ação de escala (aumentar contagem em 2)."
  },
  {
    id: 74,
    domain: 3,
    domainName: "Computação",
    question: "Após configurar o dimensionamento automático em um VMSS com regra de scale-out para CPU acima de 70%, você percebe que o conjunto de escala está sofrendo 'flapping' (instâncias são adicionadas e removidas repetidamente a cada poucos minutos devido a pequenas oscilações de carga). Qual parâmetro da regra de dimensionamento você deve ajustar para garantir que o sistema aguarde a estabilização das novas instâncias antes de disparar novas ações de escala?",
    options: [
      "O Limite de Salto de Cota de vCPUs da assinatura (Subscription vCPU Quota Jump Limit) configurado no portal de suporte do Azure.",
      "O Limite de Tempo Limite de Resposta da Sonda de Integridade do Balanceador de Carga.",
      "O Modo de Orquestração do VMSS, alterando de Flexível para Uniforme sem reinicialização.",
      "O Período de Recarga (Cooldown / Scale-out cooldown period), aumentando o tempo de espera pós-escala."
    ],
    answer: 3,
    explanation: "O 'Período de Recarga' (Cooldown) é o tempo que a regra de dimensionamento aguarda após a execução de uma ação de escala antes de iniciar uma nova ação. Isso dá tempo suficiente para que as novas instâncias inicializem, comecem a receber tráfego e a carga de CPU média seja recalculada de forma estável."
  },
  {
    id: 75,
    domain: 3,
    domainName: "Computação",
    question: "Você mantém um aplicativo web no Serviço de Aplicativo do Azure (Azure App Service) no plano de serviço Standard S1. O aplicativo possui dois slots de implantação: 'production' e 'staging'. Você precisa realizar testes de homologação no slot 'staging' apontando para um banco de dados de homologação, enquanto o slot 'production' aponta para o banco de produção. Ao executar a troca de slots (Swap), a cadeia de conexão de homologação NÃO deve ser movida para a produção. Como você deve configurar essa cadeia de conexão no portal do Azure?",
    options: [
      "Excluir temporariamente o slot de staging antes de realizar a operação de swap no portal do Azure e recriar o slot após o teste.",
      "Marcar a configuração de aplicativo/cadeia de conexão como 'Configuração do Slot de Implantação' (Deployment slot setting / sticky).",
      "Fazer o upgrade do plano de serviço para o nível Gratuito (F1) com isolamento de instâncias dedicado.",
      "Vincular o banco de dados via Ponto de Extremidade Privado sem credenciais de autenticação no App Service."
    ],
    answer: 1,
    explanation: "Ao marcar uma configuração de aplicativo ou cadeia de conexão como 'Configuração do Slot de Implantação' (Deployment slot setting, também conhecido como 'sticky setting'), ela fica fixada permanentemente naquele slot e não é trocada durante a operação de Swap."
  },
  {
    id: 76,
    domain: 3,
    domainName: "Computação",
    question: "Sua empresa possui uma API corporativa hospedada no Azure App Service no plano Premium v3. Essa API precisa consultar um banco de dados SQL Server que é executado em uma máquina virtual privada sem endereço IP público, localizada na sub-rede 'Subnet-DB' de uma rede virtual chamada 'VNet-Interna'. Qual recurso do Azure App Service deve ser configurado para permitir que o App Service envie tráfego de saída diretamente para a VNet-Interna?",
    options: [
      "Integração de Rede Virtual Regional (Regional VNet Integration com uma sub-rede delegada ao App Service).",
      "Mapeamento de Domínio Personalizado via registro CNAME apontando para o endereço de loopback interno com certificado TLS/SSL emitido.",
      "Mapeamento de Domínio Personalizado via registro CNAME apontando para o endereço de loopback interno.",
      "Ponto de Extremidade de Serviço de Armazenamento habilitado na sub-rede de roteamento do SQL Server."
    ],
    answer: 0,
    explanation: "A 'Integração de Rede Virtual' (Regional VNet Integration) permite que o Azure App Service acesse recursos privados em uma rede virtual do Azure (como VMs, bancos de dados ou endpoints privados) roteando o tráfego de saída da aplicação para dentro da VNet através de uma sub-rede delegada."
  },
  {
    id: 77,
    domain: 3,
    domainName: "Computação",
    question: "Você gerencia um aplicativo web no Azure App Service que atende exclusivamente a colaboradores internos da empresa conectados via VPN corporativa ou ExpressRoute. A equipe de segurança exige que o aplicativo NÃO possua nenhum endereço IP público na Internet e que as requisições de entrada (inbound) cheguem exclusivamente por meio de um endereço IP privado interno da rede corporativa 'VNet-Corp'. Qual recurso atende a esse requisito?",
    options: [
      "Balanceador de Carga Básico público com regras de balanceamento na porta TCP 443.",
      "Extensão de Script Personalizado executada periodicamente no pool de instâncias compartilhadas.",
      "Ponto de Extremidade Privado (Private Endpoint / Azure Private Link atribuído ao App Service).",
      "Conexões Híbridas baseadas no Azure Relay conectando a porta local ao listener na nuvem."
    ],
    answer: 2,
    explanation: "O 'Ponto de Extremidade Privado' (Private Endpoint) utiliza um endereço IP privado de uma sub-rede da sua rede virtual para trazer o serviço do Azure App Service para dentro da VNet. Combinado com o bloqueio de acesso público nas configurações de rede do App Service, o aplicativo só pode ser alcançado internamente."
  },
  {
    id: 78,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa implantar um aplicativo em contêiner usando as Instâncias de Contêiner do Azure (Azure Container Instances - ACI). O aplicativo consiste em 3 contêineres que precisam ler e gravar simultaneamente em um sistema de arquivos compartilhado persistente com suporte a montagem direta de volume no Linux. Caso um contêiner reinicie, os dados gravados não devem ser perdidos. Qual tipo de volume de armazenamento você deve montar no grupo de contêineres?",
    options: [
      "Um disco gerenciado Premium SSD anexado em modo multi-writer compartilhado diretamente na controladora SCSI.",
      "Um contêiner de armazenamento de Blobs padrão montado com a camada de acesso Archive permanente.",
      "Um volume de armazenamento local temporário (emptyDir) provisionado na memória do host de execução física.",
      "Um compartilhamento de arquivos do Azure Files montado via protocolo SMB (Azure File Share)."
    ],
    answer: 3,
    explanation: "As Instâncias de Contêiner do Azure (ACI) oferecem suporte à montagem de compartilhamentos de arquivos do Azure Files como volumes persistentes através do protocolo SMB. Isso permite que múltiplos contêineres no mesmo grupo compartilhem dados com persistência total além do ciclo de vida dos contêineres."
  },
  {
    id: 79,
    domain: 3,
    domainName: "Computação",
    question: "Você possui um Registro de Contêiner do Azure (Azure Container Registry - ACR) na camada Standard. Sempre que uma nova imagem de contêiner de produção receber a tag ':release' no repositório 'webapp', um pipeline de implantação externo no Azure Pipelines ou GitHub Actions deve ser acionado automaticamente via HTTP POST para iniciar os testes automatizados. O que você deve configurar no ACR?",
    options: [
      "Uma tarefa do Azure Automation disparada por consulta KQL agendada no Azure Activity Log a cada 5 minutos com webhook ativo.",
      "Uma tarefa do Azure Automation disparada por consulta KQL no Azure Activity Log a cada 5 minutos.",
      "Uma regra de Rota Definida pelo Usuário (UDR) redirecionando as conexões do registro para um gateway NAT.",
      "Um alerta de métrica de contagem de conexões TCP no Azure Monitor associado a um grupo de ações por SMS."
    ],
    answer: 0,
    explanation: "Os Webhooks do Azure Container Registry (ACR) monitoram eventos no registro (como 'push' de novas imagens ou exclusões) e enviam notificações HTTP POST para URIs configuradas. É possível filtrar o webhook por repositório e tag para disparar fluxos de CI/CD específicos."
  },
  {
    id: 80,
    domain: 3,
    domainName: "Computação",
    question: "Você é o engenheiro responsável pela segurança de máquinas virtuais no Azure. Para atender a um mandato regulatório rígido do setor bancário, você deve habilitar a criptografia de disco de ponta a ponta nas máquinas virtuais Windows existentes, criptografando tanto o volume do sistema operacional (C:) quanto todos os discos de dados anexados usando o BitLocker integrado ao sistema operacional da VM, gerenciando as chaves de criptografia (BEK/KEK) em um Azure Key Vault. Qual solução oficial do Azure deve ser adotada?",
    options: [
      "Criptografia no Lado do Servidor (SSE) com Chaves Gerenciadas pela Plataforma operando na camada de armazenamento físico.",
      "BitLocker To Go configurado manualmente com arquivo de senha em pendrive virtual montado por script de login.",
      "Azure Disk Encryption (ADE integrado ao BitLocker no SO e chaves no Azure Key Vault).",
      "Criptografia Transparente de Dados (TDE) ativada diretamente no mecanismo de instâncias do SQL Server."
    ],
    answer: 2,
    explanation: "O Azure Disk Encryption (ADE) aproveita o BitLocker (no Windows) e o DM-Crypt (no Linux) para fornecer criptografia de volume dentro do próprio sistema operacional da máquina virtual. As chaves de criptografia e segredos são armazenados com segurança em um cofre de chaves do Azure (Azure Key Vault)."
  },
  {
    id: 81,
    domain: 3,
    domainName: "Computação",
    question: "Uma máquina virtual Windows que hospeda um serviço crítico de produção parou de responder via RDP na porta 3389. As métricas do Azure Monitor indicam que o sistema operacional ainda está em execução com 99% de CPU travada por um processo mal comportado. Você não tem acesso físico ou de rede à VM, mas precisa executar um script PowerShell de emergência ('Stop-Process -Name BadProcess -Force') para finalizar o processo sem reiniciar a VM. Qual recurso do portal do Azure você deve utilizar?",
    options: [
      "Redefinir Senha e Configurações de Conexão na aba Suporte + Solução de Problemas do portal.",
      "Executar Comando (Run Command) no painel de Operações da Máquina Virtual no portal do Azure.",
      "Desanexar e exportar o disco de SO VHD para um servidor Hyper-V local para edição offline.",
      "Conectar-se via console serial usando o protocolo Telnet desprotegido na porta TCP 23 padrão."
    ],
    answer: 1,
    explanation: "O recurso 'Executar Comando' (Run Command) utiliza o agente de máquina virtual do Azure (Azure VM Agent) para executar scripts do PowerShell (no Windows) ou shell scripts (no Linux) diretamente no sistema operacional guest da VM, sem necessidade de conectividade RDP/SSH ou portas de rede abertas."
  },
  // =========================================================================
  // DOMÍNIO 4: CONFIGURAR E GERENCIAR REDES VIRTUAIS (15-20% -> 10 Qs)
  // =========================================================================
  {
    id: 82,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem três redes virtuais na mesma região do Azure: VNet-Hub, VNet-Spoke1 e VNet-Spoke2. Você configurou o emparelhamento de redes virtuais (VNet Peering) entre VNet-Hub e VNet-Spoke1, e entre VNet-Hub e VNet-Spoke2. Nenhuma rota definida pelo usuário (UDR) ou dispositivo virtual de rede (NVA) foi implantado. Uma máquina virtual na VNet-Spoke1 poderá se comunicar diretamente com uma máquina virtual na VNet-Spoke2 através do emparelhamento existente?",
    options: [
      "Sim, porque o VNet Peering fornece transitividade completa automática entre todas as redes emparelhadas ao Hub.",
      "Sim, desde que as três redes virtuais pertençam rigorosamente à mesma assinatura e ao mesmo grupo de recursos.",
      "Não, a menos que o protocolo BGP com ASNs privados esteja previamente ativado em todas as sub-redes das spokes.",
      "Não, porque o emparelhamento de redes virtuais (VNet Peering) não é transitivo por padrão."
    ],
    answer: 3,
    explanation: "O emparelhamento de redes virtuais (VNet Peering) é uma relação direta e não transitiva. O fato de VNet-Spoke1 estar emparelhada com VNet-Hub, e VNet-Hub estar emparelhada com VNet-Spoke2, NÃO permite comunicação direta entre VNet-Spoke1 e VNet-Spoke2. Para rotear tráfego entre elas, seria necessário um NVA/Firewall no Hub ou emparelhamento direto entre as duas spokes."
  },
  {
    id: 83,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você possui uma topologia de rede hub-and-spoke no Azure. A VNet-Hub possui um Gateway de Rede Virtual (VPN Gateway) que conecta o ambiente em nuvem aos data centers locais da empresa. Você cria uma nova rede spoke chamada VNet-Spoke1 e a emparelha com a VNet-Hub. Você precisa permitir que as VMs na VNet-Spoke1 se comuniquem com os data centers locais utilizando o gateway de VPN existente na VNet-Hub. Quais configurações de emparelhamento devem ser definidas nos dois lados da conexão?",
    options: [
      "Habilitar 'Permitir trânsito de gateway' no Hub e habilitar 'Usar o gateway da rede virtual remota' na Spoke.",
      "Habilitar 'Permitir tráfego encaminhado' na Spoke e habilitar 'Conexão bidirecional de loopback' no emparelhamento da rede VNet-Hub.",
      "Configurar um Gateway NAT na sub-rede da Spoke com endereço IP público estático atribuído à tabela de rotas.",
      "Criar uma zona de DNS pública compartilhada e configurar registros SPF autorizando as sub-redes locais."
    ],
    answer: 0,
    explanation: "Na topologia hub-and-spoke com trânsito de gateway, no emparelhamento da VNet-Hub (onde o gateway reside) deve-se marcar 'Permitir trânsito de gateway' (Allow gateway transit). No emparelhamento da VNet-Spoke, deve-se marcar 'Usar o gateway da rede virtual remota' (Use remote virtual network's gateway)."
  },
  {
    id: 84,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua equipe gerencia 20 máquinas virtuais de backend distribuídas em diferentes sub-redes da mesma VNet. Todas as VMs executam a mesma aplicação corporativa e precisam seguir as mesmas regras de firewall de entrada. Em vez de criar regras de Grupo de Segurança de Rede (NSG) com dezenas de endereços IP individuais ou sub-redes inteiras, você deseja agrupar essas VMs logicamente pelo seu papel de aplicação para simplificar a manutenção das regras de segurança. Qual recurso de rede você deve utilizar?",
    options: [
      "Tags de Serviço padrão (Service Tags) como 'VirtualNetwork' ou 'AzureCloud' atribuídas às sub-redes.",
      "Grupos de Segurança de Aplicativo (Application Security Groups - ASGs atribuídos às NICs das VMs).",
      "Regras de Roteamento Definidas pelo Usuário (UDR) associadas a um gateway de aplicativo de camada 7.",
      "Balanceadores de Carga Básicos com sondas de integridade dinâmicas em portas TCP aleatórias."
    ],
    answer: 1,
    explanation: "Os Grupos de Segurança de Aplicativo (Application Security Groups - ASGs) permitem agrupar interfaces de rede de VMs em uma categoria lógica (ex: 'ASG-Backend'). Em seguida, é possível utilizar esse ASG como origem ou destino nas regras de segurança do NSG, eliminando a necessidade de gerenciar listas de IPs manuais."
  },
  {
    id: 85,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você precisa forçar todo o tráfego de saída da Internet originado pelas VMs na sub-rede 'Subnet-Workload' (10.0.2.0/24) a passar por um Firewall de Próxima Geração (NVA) instalado na 'Subnet-DMZ' com o endereço IP privado 10.0.1.10 para inspeção profunda de pacotes. Qual entrada de rota você deve adicionar na Tabela de Rotas (Route Table) associada à 'Subnet-Workload'?",
    options: [
      "Prefixo de endereço: 10.0.1.10/32 | Tipo de próximo salto: Internet | Endereço do próximo salto: Nenhum",
      "Prefixo de endereço: 0.0.0.0/0 | Tipo de próximo salto: Gateway de Rede Virtual | Endereço do próximo salto: 10.0.2.254 configurado.",
      "Prefixo de endereço: 0.0.0.0/0 | Tipo de próximo salto: Dispositivo Virtual (Virtual Appliance) | Endereço: 10.0.1.10",
      "Prefixo de endereço: 255.255.255.255/32 | Tipo de próximo salto: Nenhum (Bloqueio Total de Tráfego)"
    ],
    answer: 2,
    explanation: "Para substituir a rota padrão do Azure para a Internet e direcionar o tráfego para um firewall ou NVA interno, adiciona-se uma rota com prefixo de destino '0.0.0.0/0' (toda a Internet), selecionando o tipo de próximo salto como 'Dispositivo Virtual' (Virtual Appliance) e especificando o IP privado do firewall (10.0.1.10)."
  },
  {
    id: 86,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você está planejando a implantação do Azure Bastion para permitir acesso seguro via RDP e SSH às suas máquinas virtuais através do portal do Azure via navegador (porta 443), sem que as VMs precisem de IPs públicos. Quais são os dois pré-requisitos essenciais de rede que devem ser configurados na rede virtual antes de provisionar o recurso do Azure Bastion?",
    options: [
      "Uma sub-rede chamada 'GatewaySubnet' com prefixo /24 e um Endereço IP Público alocado com SKU Básico legado sem suporte a zonas.",
      "Duas máquinas virtuais dedicadas executando o serviço de Proxy Reverso NGINX em contêineres Docker.",
      "Uma rota de UDR apontando para um provedor ExpressRoute parceiro com tabelas BGP ativas.",
      "Uma sub-rede dedicada com o nome exato 'AzureBastionSubnet' com prefixo de no mínimo /26 e um Endereço IP Público com SKU Standard."
    ],
    answer: 3,
    explanation: "O Azure Bastion requer uma sub-rede dedicada na rede virtual com o nome exato e obrigatório 'AzureBastionSubnet', com máscara de sub-rede de no mínimo /26 (ou maior, como /25). Além disso, ele exige um endereço IP público estático com SKU Standard."
  },
  {
    id: 87,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você configurou um Azure Standard Load Balancer público para distribuir tráfego HTTP (porta 80) entre 4 máquinas virtuais em uma sub-rede. A sonda de integridade (health probe) está configurada corretamente na porta 80 e as regras de balanceamento de carga estão ativas. No entanto, clientes externos não conseguem se conectar ao serviço e as sondas de integridade marcam as VMs como não íntegras. O que você deve verificar primeiro nas máquinas virtuais do backend?",
    options: [
      "A chave de criptografia de disco no Azure Key Vault utilizada pelo serviço de inicialização das instâncias de computação do backend.",
      "O agente de diagnósticos do Log Analytics e as permissões de gravação de telemetria na conta de armazenamento.",
      "As regras de entrada do Grupo de Segurança de Rede (NSG), pois o Standard Load Balancer é seguro por padrão e exige regras explícitas de NSG para permitir o tráfego.",
      "A assinatura do Microsoft Entra ID e a configuração de autorização de delegação de escopos de API."
    ],
    answer: 2,
    explanation: "Diferente do Basic Load Balancer, o Standard Load Balancer é fechado e seguro por padrão (Zero Trust). Ele exige que um Grupo de Segurança de Rede (NSG) seja associado à sub-rede ou às interfaces de rede das VMs do pool de backend com regras de entrada explícitas permitindo o tráfego do balanceador e da sonda de integridade."
  },
  {
    id: 88,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua organização precisa balancear tráfego HTTP/HTTPS para um aplicativo de e-commerce. As requisições que chegam com o caminho '/imagens/*' devem ser encaminhadas para um pool de servidores dedicados otimizados para mídia ('Pool-Midia'), enquanto as requisições para '/api/*' devem ser encaminhadas para um pool de microsserviços ('Pool-API'). Qual recurso do Azure Application Gateway você deve configurar?",
    options: [
      "Roteamento baseado em caminho de URL (URL Path-based Routing nas regras de roteamento de solicitação).",
      "Balanceamento de Carga de Camada 4 por Hash de 5 Tuplas no Azure Standard Load Balancer público com regras de balanceamento ativas.",
      "Balanceamento com Porta Flutuante (Floating IP) configurado nas regras de balanceamento de backend.",
      "Sonda de integridade ICMP Ping com balanceamento Round-Robin baseado em peso ponderado de DNS."
    ],
    answer: 0,
    explanation: "O Azure Application Gateway é um balanceador de carga de camada 7 (aplicativo). O recurso de Roteamento baseado em caminho de URL (URL Path-based Routing) permite inspecionar a URL da solicitação HTTP e rotear o tráfego para pools de backend diferentes com base no padrão de caminho (/imagens/*, /api/*, etc.)."
  },
  {
    id: 89,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem 50 máquinas virtuais em uma sub-rede privada no Azure que precisam fazer download contínuo de atualizações na Internet. As máquinas virtuais não possuem endereços IP públicos. Você precisa fornecer conectividade de saída (outbound) altamente escalável e segura para a Internet, evitando problemas comuns de esgotamento de portas SNAT (SNAT port exhaustion) e sem permitir conexões de entrada não solicitadas. Qual solução você deve adotar?",
    options: [
      "Atribuir um Balanceador de Carga Básico público sem regras de balanceamento de carga para cada VM da sub-rede privada.",
      "Associar um Gateway NAT do Azure (Azure NAT Gateway) diretamente à sub-rede privada das máquinas virtuais.",
      "Instalar um servidor Proxy Squid em uma única máquina virtual com tamanho Standard_B1s de baixo custo.",
      "Configurar uma Tabela de Rotas Definidas pelo Usuário com próximo salto do tipo 'Nenhum' para 0.0.0.0/0."
    ],
    answer: 1,
    explanation: "O Azure NAT Gateway fornece conectividade de saída para a Internet altamente resiliente e totalmente gerenciada para sub-redes virtuais. Ele aloca portas SNAT sob demanda a partir de um pool de IPs públicos estáticos, eliminando os problemas de esgotamento de portas SNAT comuns em balanceadores de carga."
  },
  {
    id: 90,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você precisa diagnosticar por que uma máquina virtual chamada VM1 (10.0.1.4) não consegue se comunicar com um servidor de banco de dados chamado VM2 (10.0.2.5) na porta TCP 1433. Você deseja verificar se há bloqueio por regras de NSG ou tabelas de rotas e visualizar a latência salto a salto na topologia de rede entre as duas VMs. Qual ferramenta do Azure Network Watcher fornece essa análise completa de ponta a ponta?",
    options: [
      "Topologia de Rede estática com exportação de diagramas vetoriais em formato SVG para documentação de auditoria de conformidade.",
      "Registro de Fluxo de NSG (NSG Flow Logs) configurado em modo somente leitura em uma conta de log fria.",
      "Captura de Pacotes local configurada para salvar arquivos .cap exclusivamente na memória RAM da VM1.",
      "Solucionador de Problemas de Conexão (Connection Troubleshoot / Verificação de Conexão do Network Watcher)."
    ],
    answer: 3,
    explanation: "O 'Solucionador de Problemas de Conexão' (Connection Troubleshoot) do Network Watcher testa a conectividade da origem ao destino para uma porta específica, valida se há bloqueios por regras de NSG ou rotas definidas pelo usuário (UDR) e fornece uma visualização de salto a salto da latência na rede."
  },
  {
    id: 91,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Ao criar um Ponto de Extremidade Privado (Private Endpoint) para uma conta de armazenamento de Blob Storage ('stcorporativo.blob.core.windows.net'), você opta por integrar automaticamente com uma Zona de DNS Privado do Azure. Qual é o nome exato da Zona de DNS Privado exigida pela arquitetura recomendada da Microsoft para a resolução de nomes de Blobs via Private Endpoint?",
    options: [
      "privatelink.blob.core.windows.net",
      "corp.blob.azure.com.privatedns",
      "internal.storage.windows.net.zone",
      "blob.core.windows.net.privatelink"
    ],
    answer: 0,
    explanation: "A zona de DNS privado recomendada pela Microsoft para pontos de extremidade privados do Blob Storage é exatamente 'privatelink.blob.core.windows.net'. O cliente continua consultando 'stcorporativo.blob.core.windows.net', que resolve via CNAME para a zona privatelink com o IP privado da VNet."
  },
  // =========================================================================
  // DOMÍNIO 5: MONITORAR E MANTER RECURSOS DO AZURE (10-15% -> 9 Qs)
  // =========================================================================
  {
    id: 92,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Sua organização está modernizando a infraestrutura de monitoramento no Azure. Você precisa coletar logs de eventos do Windows (System e Application) e contadores de desempenho de 100 máquinas virtuais (Windows e Linux) para um espaço de trabalho do Log Analytics centralizado. A Microsoft recomenda o uso da arquitetura moderna de monitoramento. Quais dois componentes você deve implantar e configurar?",
    options: [
      "Instalar o Agente do Log Analytics legado (MMA/OMS) e configurar scripts em lote locais com tarefas agendadas em cada servidor.",
      "Instalar a extensão clássica de Diagnóstico do Azure (WAD/LAD) gravando em tabelas do Azure Storage v1.",
      "Instalar o Agente do Azure Monitor (AMA) nas VMs e configurar Regras de Coleta de Dados (Data Collection Rules - DCR).",
      "Habilitar recomendações de segurança no Assistente do Azure (Azure Advisor) com sincronização por e-mail."
    ],
    answer: 2,
    explanation: "O Agente do Azure Monitor (Azure Monitor Agent - AMA) substitui os agentes herdados (MMA/OMS e diagnósticos clássicos). Ele utiliza Regras de Coleta de Dados (Data Collection Rules - DCR) para definir centralmente quais dados coletar (eventos, contadores, syslog) e para onde enviá-los."
  },
  {
    id: 93,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você precisa auditar falhas em operações de gerenciamento de recursos na sua assinatura nas últimas 24 horas (como falhas ao criar ou excluir VMs, IPs ou NSGs). Você abre a folha de Logs no Azure Monitor vinculada ao Log Analytics onde o Log de Atividades do Azure (Activity Log) está configurado. Qual consulta Kusto (KQL) retorna corretamente essas operações com falha ordenadas cronologicamente?",
    options: [
      "AzureMetrics | select * where TimeGenerated >= 24h and MetricStatus == 'Critical' | sort by Timestamp desc | take 100",
      "AzureActivity | where TimeGenerated > ago(24h) | where ActivityStatusValue == \"Failed\" | order by TimeGenerated desc",
      "EventLog | filter 24h | search 'Failed' | summarize count() by OperationName | order by count_ desc",
      "SecurityAlert | where TimeGenerated > now() - 1d | take 100 | project ResourceGroup, SeverityLevel"
    ],
    answer: 1,
    explanation: "Na tabela 'AzureActivity' do Log Analytics, os registros de auditoria do plano de controle do Azure são armazenados. A consulta filtra registros das últimas 24 horas com 'where TimeGenerated > ago(24h)', verifica status de falha com 'where ActivityStatusValue == \"Failed\"' e ordena os mais recentes com 'order by TimeGenerated desc'."
  },
  {
    id: 94,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Sua empresa armazena logs de conformidade em um Espaço de Trabalho do Log Analytics. Os analistas de segurança consultam esses logs com frequência durante os primeiros 30 dias. Para atender a normas regulatórias, os logs devem ser retidos por um período total de 395 dias (13 meses), mas consultas após 30 dias são raras. Você deseja otimizar ao máximo os custos de retenção. Como você deve configurar a retenção de dados no Log Analytics?",
    options: [
      "Aumentar a retenção interativa para 395 dias no nível padrão de cobrança com cota diária irrestrita de gigabytes ingeridos por dia.",
      "Exportar os logs diariamente para fitas magnéticas usando um script em PowerShell agendado no Azure Automation.",
      "Criar 13 espaços de trabalho diferentes do Log Analytics e alternar o envio de dados a cada 30 dias manualmente.",
      "Definir a Retenção Interativa (Interactive Retention) para 30 dias e a Retenção de Arquivo (Archive Retention) total para 395 dias."
    ],
    answer: 3,
    explanation: "O Azure Log Analytics oferece duas camadas de retenção: a 'Retenção Interativa' (Interactive Retention, incluída na taxa de ingestão por até 30 ou 90 dias com consultas em tempo real rápidas) e a 'Retenção de Arquivo' (Archive Retention, com custo por GB significativamente menor para retenção de longo prazo até 12 anos)."
  },
  {
    id: 95,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você tem um Cofre dos Serviços de Recuperação (Recovery Services Vault) com redundância geográfica (GRS) em execução na região Leste dos EUA. O cofre protege dezenas de máquinas virtuais. Você precisa garantir que, durante um exercício de continuidade de negócios ou teste de auditoria, os administradores consigam restaurar máquinas virtuais na região secundária emparelhada (Oeste dos EUA) a qualquer momento, mesmo quando a região primária estiver totalmente operacional e saudável. Qual recurso do Azure Backup deve ser habilitado no cofre?",
    options: [
      "Imutabilidade de Blobs com retenção baseada em tempo no nível da conta de armazenamento primária.",
      "Restauração entre Regiões (Cross-Region Restore - CRR habilitada no cofre de backup).",
      "Exclusão Suave com senha de uso único (PIN) gerada por telefone pelo suporte técnico da Microsoft.",
      "Backup Instantâneo de 5 dias provisionado exclusivamente no grupo de recursos das máquinas virtuais."
    ],
    answer: 1,
    explanation: "Por padrão, com armazenamento GRS, a restauração na região secundária só é disponibilizada quando a Microsoft declara um desastre na região primária. Habilitar a 'Restauração entre Regiões' (Cross-Region Restore - CRR) permite que os clientes iniciem restaurações na região secundária a qualquer momento, ideal para testes de DR e auditorias."
  },
  {
    id: 96,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Ao configurar uma política de backup para máquinas virtuais do Azure no Azure Backup, você visualiza a configuração de 'Recuperação Instantânea' (Instant Restore) com retenção configurável de 1 a 5 dias. Qual é o propósito e funcionamento exato da Recuperação Instantânea?",
    options: [
      "Gera uma cópia de espelhamento contínuo das VMs em servidores locais em tempo real com failover de 0 segundos em caso de falha física.",
      "Gera uma cópia de espelhamento contínuo das VMs em servidores locais em tempo real com failover de 0 segundos.",
      "Executa um script de recuperação automática que desliga e religa a VM caso o uso de CPU ultrapasse 90%.",
      "Converte máquinas virtuais Windows em contêineres Docker automaticamente para execução em clusters AKS."
    ],
    answer: 0,
    explanation: "O recurso 'Instant Restore' do Azure Backup tira um snapshot local dos discos da VM e o mantém na mesma assinatura/localização da VM pelo período de retenção configurado (1 a 5 dias). Isso permite que qualquer restauração realizada dentro desse período seja concluída em minutos, diretamente do snapshot local, sem necessidade de aguardar a transferência de dados do cofre."
  },
  {
    id: 97,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Sua empresa deseja evitar que administradores mal-intencionados ou atacantes com acesso comprometido consigam excluir backups de máquinas virtuais e bancos de dados para extorsão de ransomware. Você precisa garantir que, mesmo se uma operação de exclusão de backup for confirmada, os dados de backup sejam mantidos em um estado recuperável por 14 dias adicionais antes de serem destruídos definitivamente. Qual recurso de proteção contra exclusão está habilitado por padrão no Cofre dos Serviços de Recuperação?",
    options: [
      "Bloqueio de Recurso do tipo ReadOnly aplicado no escopo da assinatura do Azure.",
      "Criptografia de Disco com BitLocker gerenciada por chaves KEK no Azure Key Vault.",
      "Exclusão Suave (Soft Delete com retenção de segurança de 14 dias adicionais).",
      "Regra de Coleta de Dados (DCR) configurada para auditoria de eventos no Azure Monitor."
    ],
    answer: 2,
    explanation: "A 'Exclusão Suave' (Soft Delete) para o Azure Backup protege os dados contra exclusões acidentais ou ataques de ransomware. Quando um item de backup é excluído, os dados são retidos no estado de exclusão suave por 14 dias adicionais, permitindo que a exclusão seja revertida e os dados recuperados."
  },
  {
    id: 98,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você precisa implementar uma solução de recuperação de desastres (DR) para um cluster de servidores de aplicação hospedados em máquinas virtuais na região Leste dos EUA. Em caso de falha regional completa, a solução deve permitir o failover orquestrado dessas VMs para a região Oeste dos EUA, garantindo que as VMs sejam instanciadas automaticamente na região secundária mantendo as configurações de rede, IPs e discos replicados continuamente. Qual serviço do Azure deve ser utilizado?",
    options: [
      "Azure Backup configurado com política diária de instantâneos e transferência para cofre local.",
      "Replicação de Objetos assíncrona do Azure Blob Storage entre contas de armazenamento em pares.",
      "Azure Traffic Manager configurado com método de roteamento por peso ponderado de DNS.",
      "Azure Site Recovery (ASR com replicação contínua e orquestração de planos de recuperação)."
    ],
    answer: 3,
    explanation: "O Azure Site Recovery (ASR) é o serviço de recuperação de desastres do Azure. Ele gerencia e orquestra a replicação contínua, failover e failback de máquinas virtuais entre regiões do Azure (Azure-to-Azure disaster recovery) ou de ambientes locais para o Azure."
  },
  {
    id: 99,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Durante a madrugada, várias máquinas virtuais em um grupo de recursos específico foram reiniciadas inesperadamente. Você precisa verificar se houve manutenções planejadas na infraestrutura física do Azure, incidentes de indisponibilidade geral em serviços da plataforma (outages) ou avisos de integridade que impactaram a sua região. Qual painel oficial do Azure fornece a visão personalizada sobre incidentes de serviço e manutenções da plataforma que afetam especificamente os seus recursos?",
    options: [
      "Azure Service Health (com histórico de incidentes de serviço, manutenções planejadas e avisos de integridade).",
      "Log Analytics Workspace (com consultas de telemetria de aplicativos e métricas de desempenho interno agregadas de todas as máquinas).",
      "Log Analytics Workspace (com consultas de telemetria de aplicativos e métricas de desempenho interno).",
      "Microsoft Defender for Cloud (com classificação de postura de segurança e recomendações de vulnerabilidade)."
    ],
    answer: 0,
    explanation: "O Azure Service Health fornece uma visão personalizada e detalhada sobre a integridade dos serviços e regiões do Azure que você utiliza. Ele se divide em: Status do Serviço (problemas globais), Integridade do Serviço (incidentes que afetam suas assinaturas), Manutenções Planejadas e Avisos de Integridade."
  },
  {
    id: 100,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você é o responsável por revisar periodicamente as recomendações de otimização de infraestrutura geradas pelo Azure Advisor para a sua assinatura corporativa. Na categoria de Custo (Cost), quais são duas das principais recomendações automatizadas que o Azure Advisor fornece para reduzir gastos de computação sem comprometer as aplicações?",
    options: [
      "Habilitar autenticação multifator para administradores globais e revisar permissões de contas convidadas.",
      "Bloquear a porta 3389 em todos os Grupos de Segurança de Rede e remover interfaces de rede desconectadas.",
      "Redimensionar ou desligar máquinas virtuais subutilizadas e comprar Instâncias Reservadas para cargas previsíveis.",
      "Configurar zonas de DNS privado para todas as sub-redes e habilitar criptografia dupla de infraestrutura nos discos."
    ],
    answer: 2,
    explanation: "Na categoria de Custo, o Azure Advisor analisa o histórico de uso de CPU, memória e rede para identificar máquinas virtuais ociosas ou subutilizadas, recomendando seu desligamento ou redimensionamento (right-sizing), além de recomendar a compra de Instâncias Reservadas (Reserved Instances) ou Planos de Economia para cargas previsíveis de longo prazo."
  },
];
