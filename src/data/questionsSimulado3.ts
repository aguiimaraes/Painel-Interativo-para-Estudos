import { Question } from '../types';

export const questionsSimulado3: Question[] = [
  // =========================================================================
  // DOMÍNIO 1: GERENCIAR IDENTIDADES E GOVERNANÇA DO AZURE (20-25% -> 11 Qs)
  // =========================================================================
  {
    id: 101,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua organização utiliza o Microsoft Entra Connect para sincronizar contas de usuários do Active Directory local com o Microsoft Entra ID. Durante a sincronização diária, um novo colaborador criado localmente não aparece no Microsoft Entra ID. No portal do Microsoft Entra Connect Health, você identifica um erro de 'Atributo Duplicado' (DuplicateAttribute) no atributo UserPrincipalName. O que você deve fazer para resolver o problema de sincronização?",
    options: [
      "Habilitar a regra de junção personalizada no Synchronization Rules Editor para o atributo ObjectGUID e forçar uma sincronização inicial completa com 'Start-ADSyncSyncCycle -PolicyType Initial' no PowerShell.",
      "Alterar o UserPrincipalName ou o ProxyAddresses do usuário local para garantir que seja exclusivo em todo o diretório e forçar uma sincronização delta com 'Start-ADSyncSyncCycle -PolicyType Delta'.",
      "Executar o comando 'Clear-ADSyncSyncCycle' no servidor do Entra Connect e redefinir a senha do usuário local com o cmdlet 'Set-ADUser -Identity User1 -PasswordNeverExpires $true'.",
      "Remover o objeto de usuário do escopo de filtragem de Unidade Organizacional (UO) e executar uma sincronização de esquema completa utilizando o cmdlet 'Import-ADSyncChanges -FullScan'."
    ],
    answer: 1,
    explanation: "Erros de atributo duplicado (como conflito de UserPrincipalName ou ProxyAddresses) ocorrem quando dois objetos no diretório compartilham o mesmo valor em um atributo de identificação exclusiva. Para corrigir a falha, deve-se ajustar o valor conflitante no Active Directory local para que seja exclusivo e, em seguida, disparar um ciclo de sincronização delta com o cmdlet 'Start-ADSyncSyncCycle -PolicyType Delta'."
  },
  {
    id: 102,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você gerencia políticas de Acesso Condicional no Microsoft Entra ID. Você precisa garantir que colaboradores remotos que acessem o Exchange Online e o SharePoint Online a partir de computadores pessoais não corporativos possam visualizar e-mails e arquivos no navegador, mas fiquem estritamente impedidos de baixar (download), imprimir ou sincronizar documentos confidenciais localmente. Qual controle de sessão do Acesso Condicional você deve habilitar?",
    options: [
      "Habilitar o controle de Frequência de Entrada (Sign-in Frequency) configurado para expirar a sessão a cada 1 hora com exigência de reautenticação contínua e confirmação de MFA.",
      "Selecionar a política de Concessão de Acesso exigindo redefinição de senha obrigatória na próxima entrada e bloqueio de protocolo POP3/IMAP4.",
      "Configurar o controle de Resiliência de Avaliação Contínua de Acesso (CAE) com bloqueio irrestrito de qualquer agente de usuário baseado em navegador web.",
      "Usar o Controle de Aplicativos de Acesso Condicional (Conditional Access App Control) integrado com o Microsoft Defender for Cloud Apps para impor inspeção de sessão."
    ],
    answer: 3,
    explanation: "O 'Controle de Aplicativos de Acesso Condicional' (Conditional Access App Control) roteia as sessões dos usuários através do proxy reverso do Microsoft Defender for Cloud Apps. Isso permite aplicar controles de sessão em tempo real, como monitorar a navegação e bloquear downloads, impressões ou cópias de dados confidenciais quando o usuário se conecta a partir de dispositivos não corporativos ou não compatíveis."
  },
  {
    id: 103,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa utiliza o Privileged Identity Management (PIM) no Microsoft Entra ID para proteger funções administrativas de alto privilégio. Você precisa configurar a atribuição da função de 'Administrador Global' para três engenheiros seniores para que eles NÃO tenham permissões ativas permanentes, mas possam solicitar a ativação da função por no máximo 4 horas quando necessário, exigindo aprovação obrigatória do gerente de segurança e justificativa com número de chamado. Como você deve configurar essa função no PIM?",
    options: [
      "Definir a atribuição como 'Elegível' (Eligible) nas atribuições de função e configurar a política da função com duração máxima de 4 horas, exigência de aprovação e justificativa de tíquete.",
      "Definir a atribuição como 'Ativa' (Active) permanente nas atribuições de função e aplicar uma regra de bloqueio de leitura via Acesso Condicional com chave FIDO2 física corporativa.",
      "Atribuir a função de Leitor Global permanente aos três engenheiros e configurar um fluxo do Power Automate para trocar senhas temporárias por e-mail criptografado.",
      "Criar uma Unidade Administrativa restrita contendo os três engenheiros e delegar privilégios de Administrador de Autenticação com renovação semanal manual."
    ],
    answer: 0,
    explanation: "No Microsoft Entra Privileged Identity Management (PIM), a atribuição 'Elegível' (Eligible) concede ao usuário o direito de ativar a função privilegiada sob demanda (just-in-time). Nas configurações de política da função, define-se a duração máxima da sessão (4 horas), a exigência de autenticação multifator (MFA), a necessidade de justificativa com ticket e a aprovação formal de um fluxo de aprovadores antes que os privilégios sejam liberados."
  },
  {
    id: 104,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa (Locatário A) colabora frequentemente com um parceiro estratégico (Locatário B). Os usuários do Locatário B já cumprem requisitos rigorosos de MFA e usam dispositivos compatíveis no locatário de origem. Você precisa configurar o Acesso Condicional no Locatário A para que os usuários convidados do Locatário B não sejam solicitados a registrar um segundo MFA no Locatário A, confiando na autenticação multifator já realizada no locatário do parceiro. O que você deve configurar?",
    options: [
      "Configurar uma Federação Direta baseada em SAML/WS-Fed adicionando os endereços de domínio do parceiro como domínios verificados de primeiro nível no Locatário A corporativo.",
      "Adicionar a conta de serviço do parceiro como Administrador de Segurança no Locatário A e desabilitar os Padrões de Segurança (Security Defaults) na raiz.",
      "Configurações de Acesso Entre Locatários (Cross-Tenant Access Settings) > Configurações de Confiança (Trust Settings), marcando 'Confiar na autenticação multifator de locatários do Microsoft Entra'.",
      "Criar um Grupo de Segurança Dinâmico no Locatário A com regra baseada no atributo issuer e atribuir uma licença Microsoft Entra ID Free para cada convidado."
    ],
    answer: 2,
    explanation: "Nas 'Configurações de Acesso Entre Locatários' (Cross-tenant access settings) do Microsoft Entra ID, a guia 'Configurações de Confiança' (Trust Settings) permite que sua organização confie em declarações de autenticação multifator (MFA), dispositivos em conformidade e dispositivos ingressados no Entra ID emitidos por locatários externos parceiros, eliminando a necessidade de o usuário convidado refazer o registro de MFA no seu diretório."
  },
  {
    id: 105,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você está analisando a seguinte definição JSON de uma função personalizada do Azure RBAC:\n{\n  \"Name\": \"Gerente de VMs\",\n  \"Actions\": [\"Microsoft.Compute/virtualMachines/*\"],\n  \"NotActions\": [\"Microsoft.Compute/virtualMachines/delete\"],\n  \"AssignableScopes\": [\"/subscriptions/sub-1234\"]\n}\nQual é o comportamento exato desta função quando atribuída a um operador?",
    options: [
      "O operador é impedido de realizar qualquer ação em máquinas virtuais se tiver qualquer outra função atribuída à sua conta corporativa.",
      "O operador pode executar todas as operações em máquinas virtuais na assinatura, EXCETO excluir máquinas virtuais.",
      "O operador pode apenas listar e reiniciar máquinas virtuais, sendo bloqueado para qualquer operação de escrita em discos ou redes.",
      "A cláusula NotActions atua como uma negação explícita de negação (Deny Assignment), sobrepondo qualquer outra permissão de Proprietário."
    ],
    answer: 1,
    explanation: "Em funções personalizadas do Azure RBAC, a seção 'NotActions' simplesmente subtrai operações específicas da lista permitida em 'Actions'. Ela NÃO é uma atribuição de negação (Deny Assignment). Se o usuário receber outra função (como Contribuidor) que conceda a permissão de exclusão, ele poderá excluir as VMs normalmente."
  },
  {
    id: 106,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Um desenvolvedor com a função de 'Proprietário' (Owner) em um grupo de recursos tenta excluir uma máquina virtual associada a um Aplicativo Gerenciado do Azure (Azure Managed Application), mas a operação falha com um erro indicando uma 'Atribuição de Negação' (Deny Assignment). O desenvolvedor solicita que você remova essa atribuição de negação. O que você deve fazer?",
    options: [
      "Elevar suas credenciais para Administrador Global no Entra ID e executar o cmdlet 'Remove-AzDenyAssignment' no console do PowerShell com privilégios de locatário.",
      "Elevar suas credenciais para Administrador Global no Entra ID e executar o cmdlet 'Remove-AzDenyAssignment' no console do PowerShell.",
      "Modificar o escopo da atribuição no painel Controle de Acesso (IAM) para 'Herdado apenas' e aplicar um bloqueio de recursos do tipo CanNotDelete.",
      "Adicionar o desenvolvedor à função Administrador de Acesso do Usuário no Tenant Root Group para anular as negações em cascata."
    ],
    answer: 0,
    explanation: "As Atribuições de Negação (Deny Assignments) do Azure RBAC bloqueiam ações mesmo que uma função conceda permissão (deny overrules allow). Elas são criadas exclusivamente pelo Azure para proteger recursos gerenciados (como Blueprints e Managed Applications) e NÃO podem ser editadas ou excluídas diretamente pelos usuários."
  },
  {
    id: 107,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você precisa delegar a um analista de segurança júnior a capacidade de criar definições de políticas no Azure Policy, atribuir iniciativas existentes e gerenciar tarefas de correção (Remediation Tasks) no nível de um Grupo de Gerenciamento, aplicando o princípio do menor privilégio (least privilege). Qual função interna (built-in role) do Azure RBAC deve ser atribuída a ele?",
    options: [
      "Proprietário da Assinatura (Subscription Owner com controle total sobre governança e faturamento).",
      "Administrador de Acesso do Usuário (User Access Administrator com permissões delegadas de atribuição IAM).",
      "Leitor de Segurança (Security Reader integrado exclusivamente aos painéis do Microsoft Defender for Cloud).",
      "Colaborador de Política de Recursos (Resource Policy Contributor no nível do Grupo de Gerenciamento)."
    ],
    answer: 3,
    explanation: "A função interna 'Colaborador de Política de Recursos' (Resource Policy Contributor) concede permissões completas para criar, modificar e atribuir definições de política e iniciativas do Azure Policy, além de disparar tarefas de correção, sem conceder controle total de acesso ou direitos de criação de recursos arbitrários."
  },
  {
    id: 108,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa precisa transferir uma assinatura existente do Azure que contém dezenas de máquinas virtuais, contas de armazenamento e redes virtuais para um novo locatário do Microsoft Entra ID após uma fusão corporativa. Qual é o impacto direto e imediato dessa transferência nas atribuições de função do Azure RBAC existentes na assinatura?",
    options: [
      "As atribuições de função são migradas automaticamente mapeando os usuários homônimos encontrados no locatário de destino através do Object ID correspondente.",
      "Apenas as funções atribuídas a Contas de Serviço (Service Principals) são mantidas, enquanto usuários comuns perdem o acesso.",
      "Todas as atribuições de função do Azure RBAC existentes na assinatura são excluídas permanentemente e devem ser recriadas no novo locatário.",
      "Os bloqueios de recursos são desativados temporariamente por 48 horas enquanto os grupos do Azure AD são sincronizados via Kerberos."
    ],
    answer: 2,
    explanation: "Ao transferir uma assinatura do Azure para outro locatário do Microsoft Entra ID, todas as atribuições de controle de acesso baseado em função (Azure RBAC) são removidas permanentemente. As identidades gerenciadas (Managed Identities) também são desativadas ou invalidadas, exigindo reconfiguração completa das permissões no locatário de destino."
  },
  {
    id: 109,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você está configurando a Redefinição de Senha por Autoatendimento (SSPR) no Microsoft Entra ID. Você precisa definir quais métodos de autenticação os colaboradores poderão utilizar para verificar sua identidade ao redefinir suas senhas. Quais dos seguintes conjuntos de métodos são oficialmente suportados para registro no fluxo de SSPR do Entra ID?",
    options: [
      "Reconhecimento Facial biométrico por webcam, Certificados Digitais em cartão inteligente e Chave Privada PGP enviada por e-mail corporativo criptografado.",
      "Reconhecimento Facial biométrico por webcam, Certificados Digitais em cartão inteligente e Chave Privada PGP por e-mail.",
      "Chamada de Voz automática para ramal PABX interno sem discagem direta e Token de Acesso OAuth 2.0 temporário emitido via API.",
      "Senha de Uso Único (OTP) enviada via aplicativo WhatsApp e Autenticação de Passagem (PTA) com agentes locais dedicados."
    ],
    answer: 0,
    explanation: "O Microsoft Entra SSPR suporta oficialmente: notificação no aplicativo móvel, código no aplicativo móvel (TOTP), SMS (mensagem de texto para celular), chamada telefônica (telefone celular ou comercial) e perguntas de segurança (configuradas pelo usuário)."
  },
  {
    id: 110,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "A equipe jurídica da sua organização exige que todos os colaboradores e parceiros externos visualizem e aceitem formalmente a 'Política de Uso Aceitável de Ativos Corporativos' antes de receberem acesso a qualquer recurso do Azure ou aplicativo do Microsoft 365 no primeiro logon. Caso o usuário recuse os termos, o acesso deve ser bloqueado imediatamente. Qual recurso do Microsoft Entra ID atende diretamente a esse requisito?",
    options: [
      "Gerenciamento de Direitos (Entitlement Management) baseado em aprovação manual por e-mail em pacotes de acesso estáticos.",
      "Termos de Uso (Terms of Use - ToU) configurados como controle de concessão em uma política de Acesso Condicional.",
      "Revisões de Acesso (Access Reviews) disparadas anualmente para contas com atributo employeeType preenchido.",
      "Políticas de Proteção de Identidade (Identity Protection) com alerta de login em navegadores sem certificado confiável."
    ],
    answer: 1,
    explanation: "Os 'Termos de Uso' (Terms of Use - ToU) do Microsoft Entra ID permitem que as organizações apresentem documentos contratuais ou regulatórios (PDF) aos usuários. Integrados a políticas de Acesso Condicional, eles exigem o consentimento formal e auditável antes que o acesso seja concedido."
  },
  {
    id: 111,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Ao desenhar a estrutura de Grupos de Gerenciamento (Management Groups) para uma organização corporativa de grande porte com centenas de assinaturas no Azure, você precisa garantir que a arquitetura respeite os limites técnicos da plataforma da Microsoft. Qual é a profundidade máxima permitida na hierarquia de Grupos de Gerenciamento do Azure (excluindo o Root Management Group)?",
    options: [
      "Até 3 níveis de profundidade na árvore de hierarquia de Grupos de Gerenciamento.",
      "Até 10 níveis de profundidade na árvore de hierarquia de Grupos de Gerenciamento.",
      "Até 6 níveis de profundidade na árvore de hierarquia de Grupos de Gerenciamento.",
      "Profundidade ilimitada, desde que o número total de assinaturas vinculadas não ultrapasse 500."
    ],
    answer: 2,
    explanation: "O Azure impõe um limite máximo de 6 níveis de profundidade na árvore de Grupos de Gerenciamento (Management Groups), sem contar o nível do Root Management Group (Grupo de Gerenciamento Raiz) nem o nível final das assinaturas."
  },
  // =========================================================================
  // DOMÍNIO 2: IMPLEMENTAR E GERENCIAR ARMAZENAMENTO (15-20% -> 9 Qs)
  // =========================================================================
  {
    id: 112,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você gerencia uma conta de armazenamento de missão crítica configurada com armazenamento com redundância geográfica (GRS) entre Leste dos EUA (primária) e Oeste dos EUA (secundária). Ocorre um desastre prolongado na região primária e a Microsoft ainda não declarou failover regional oficial. Você decide executar um Failover Gerenciado pelo Cliente (Customer-Managed Account Failover) via portal do Azure. Quais são as duas consequências imediatas desse failover?",
    options: [
      "A conta de armazenamento mantém a configuração de redundância GRS ativa e replica os dados em sentido inverso instantaneamente para a região de origem.",
      "Todos os contêineres de blobs são convertidos para o nível de acesso Archive e os pontos de extremidade de DNS são excluídos.",
      "O endereço de DNS público da conta é alterado permanentemente com um novo sufixo regional exigindo reconfiguração dos clientes.",
      "A região secundária (Oeste dos EUA) torna-se a nova região primária e o tipo de redundância da conta é automaticamente convertido para LRS."
    ],
    answer: 3,
    explanation: "Ao executar um failover manual iniciado pelo cliente em uma conta GRS/GZRS, a região secundária torna-se a nova região primária e a configuração de redundância da conta é convertida automaticamente para LRS (Locally-Redundant Storage). Para restabelecer a replicação geográfica, o administrador deve reconfigurar a conta para GRS posteriormente."
  },
  {
    id: 113,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua empresa armazena exames médicos em formato DICOM no Azure Blob Storage. De acordo com a legislação do setor de saúde, esses arquivos não podem ser modificados ou excluídos durante 10 anos após a criação, mas podem ser lidos livremente por clínicas autorizadas. Além disso, novos exames precisam ser gravados diariamente no mesmo contêiner. Qual recurso você deve configurar no contêiner de blobs?",
    options: [
      "Aplicar um Bloqueio de Recursos do tipo CanNotDelete no grupo de recursos onde a conta de armazenamento reside.",
      "Habilitar o recurso de Exclusão Suave (Soft Delete) com período de retenção estendido para 3650 dias em discos magnéticos padrão com bloqueio de leitura.",
      "Habilitar o recurso de Exclusão Suave (Soft Delete) com período de retenção estendido para 3650 dias em discos magnéticos.",
      "Configurar uma Retenção Legal (Legal Hold) com uma tag imutável permanente associada a uma política de ciclo de vida para Archive."
    ],
    answer: 1,
    explanation: "Uma 'Política de Retenção Baseada em Tempo' (Time-based retention policy) no armazenamento de blobs imutável permite que blobs existentes sejam preservados em formato WORM (Write Once, Read Many) pelo tempo estipulado (10 anos), impedindo alterações ou exclusões, enquanto novos blobs continuam sendo gravados normalmente no contêiner."
  },
  {
    id: 114,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você precisa permitir que clientes externos enviem arquivos diariamente para um contêiner de armazenamento do Azure Blob Storage utilizando o protocolo SFTP (SSH File Transfer Protocol), autenticando-se por chave pública SSH ou senha local, sem a necessidade de manter máquinas virtuais executando servidores SFTP de terceiros. Qual recurso e pré-requisito da conta de armazenamento você deve habilitar?",
    options: [
      "Habilitar o suporte a SFTP na conta de armazenamento com Namespace Hierárquico (Hierarchical Namespace / Data Lake Storage Gen2) ativado.",
      "Configurar o Azure Bastion com extensão de túnel SSH associada a um Ponto de Extremidade de Serviço do Storage na sub-rede dedicada de gerenciamento.",
      "Configurar o Azure Bastion com extensão de túnel SSH associada a um Ponto de Extremidade de Serviço do Storage.",
      "Habilitar o Proxy de Aplicativo do Microsoft Entra ID com mapeamento de porta TCP 22 pública estática."
    ],
    answer: 0,
    explanation: "O suporte a SFTP totalmente gerenciado no Azure Blob Storage requer que a conta de armazenamento tenha o 'Namespace Hierárquico' (Hierarchical Namespace - HNS, Azure Data Lake Storage Gen2) habilitado. Uma vez ativado, o SFTP pode ser habilitado com gerenciamento de usuários locais, chaves SSH e senhas."
  },
  {
    id: 115,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem uma conta de armazenamento Standard de uso geral v2 chamada 'stfilesprod'. Você precisa criar um compartilhamento de arquivos no Azure Files para hospedar um repositório central de imagens CAD que atualmente possui 45 TiB de dados. Por padrão, os compartilhamentos de arquivos Standard são limitados a 5 TiB. O que você deve configurar na conta de armazenamento para suportar compartilhamentos de até 100 TiB?",
    options: [
      "Alterar a camada de desempenho da conta de armazenamento para Premium FileStorage e configurar discos Ultra SSD com provisionamento de 10.000 IOPS.",
      "Configurar uma Política de Ciclo de Vida que desloque automaticamente os blocos excedentes para a camada Cold.",
      "Habilitar o recurso 'Compartilhamentos de Arquivos Grandes' (Large File Shares) nas configurações da conta de armazenamento.",
      "Criar 9 compartilhamentos de arquivos de 5 TiB e agrupá-los logicamente utilizando o Azure File Sync com DFS-N."
    ],
    answer: 2,
    explanation: "Por padrão histórico, compartilhamentos Standard do Azure Files tinham limite de 5 TiB. Ao habilitar o recurso 'Compartilhamentos de Arquivos Grandes' (Large File Shares - LFS) na conta de armazenamento, a capacidade máxima do compartilhamento é aumentada para 100 TiB e os limites de IOPS e throughput são elevados."
  },
  {
    id: 116,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua organização precisa gerar uma Assinatura de Acesso Compartilhado de Serviço (Service SAS) para fornecer acesso de leitura temporário a um contêiner de blob para parceiros externos. A equipe de segurança exige que, caso ocorra qualquer suspeita de vazamento da URL da SAS, o acesso possa ser revogado imediatamente sem a necessidade de rotacionar as Chaves de Acesso da Conta (Account Keys), o que causaria impacto em outras aplicações. Como a SAS deve ser gerada?",
    options: [
      "Configurada com tempo de expiração inferior a 30 minutos e renovação automática via webhook no Azure Monitor.",
      "Assinada exclusivamente com a chave secundária (Key2) da conta de armazenamento com bloqueio de leitura no IAM.",
      "Gerada utilizando o protocolo Kerberos com autenticação de passagem por meio do Microsoft Entra Domain Services.",
      "Vinculada a uma Política de Acesso Armazenada (Stored Access Policy) criada previamente no contêiner de blobs."
    ],
    answer: 3,
    explanation: "Uma 'Política de Acesso Armazenada' (Stored Access Policy) fornece um nível adicional de controle sobre uma SAS de serviço. Ao associar a SAS a uma política de acesso armazenada no contêiner, você pode revogar a SAS instantaneamente excluindo a política ou alterando sua data de expiração, sem precisar rotacionar as chaves de acesso da conta de armazenamento."
  },
  {
    id: 117,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você configurou um Ponto de Extremidade Privado (Private Endpoint) para a conta de armazenamento 'stgcorporativo' com IP privado 10.1.4.15 em uma VNet do Azure, integrado à zona de DNS privado 'privatelink.blob.core.windows.net'. Como funciona o processo de resolução de DNS quando uma VM na VNet tenta acessar 'stgcorporativo.blob.core.windows.net'?",
    options: [
      "A consulta de DNS bypassa totalmente o DNS público e consulta diretamente o arquivo hosts local da máquina virtual injetado pela extensão do agente de computação.",
      "A consulta de DNS bypassa totalmente o DNS público e consulta diretamente o arquivo hosts local da máquina virtual.",
      "O servidor DNS da VNet intercepta o pacote HTTP na camada 7 e redireciona o tráfego usando regras de NAT estático.",
      "A máquina virtual recebe uma resposta de DNS com o IP público da Microsoft e estabelece um túnel VPN IPsec transparente."
    ],
    answer: 0,
    explanation: "Ao configurar um Private Endpoint, o DNS público do Azure cria um registro CNAME apontando o FQDN padrão ('stgcorporativo.blob.core.windows.net') para o subdomínio privatelink ('stgcorporativo.privatelink.blob.core.windows.net'). A Zona de DNS Privado vinculada à VNet contém o registro A que mapeia esse FQDN privatelink para o IP privado (10.1.4.15)."
  },
  {
    id: 118,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você está planejando a implementação do Azure File Sync para sincronizar servidores de arquivos Windows locais com um compartilhamento do Azure Files. Quais são os três componentes essenciais de topologia que você deve criar no Azure e nos servidores locais para estabelecer a sincronização?",
    options: [
      "Gateway de Rede Virtual, Conexão ExpressRoute com emparelhamento privado e Agente do Log Analytics instalado em cada servidor com regras DCR.",
      "Serviço de Sincronização de Armazenamento, Grupo de Sincronização com Ponto de Extremidade de Nuvem e Servidor Registrado com Ponto de Extremidade de Servidor.",
      "Cofre dos Serviços de Recuperação, Política de Backup com retenção diária e Extensão de Script Personalizado nos controladores.",
      "Conta de Armazenamento Data Lake Gen2, Espaço de Trabalho do Azure Synapse Analytics e Pipeline do Data Factory agendado."
    ],
    answer: 1,
    explanation: "A topologia do Azure File Sync é composta por: 1) Serviço de Sincronização de Armazenamento (Storage Sync Service); 2) Grupo de Sincronização (Sync Group); 3) Ponto de Extremidade de Nuvem (Cloud Endpoint - o compartilhamento do Azure Files); 4) Servidor Registrado (Registered Server - Windows Server com o agente instalado); 5) Ponto de Extremidade de Servidor (Server Endpoint - pasta local sincronizada)."
  },
  {
    id: 120,
    domain: 2,
    domainName: "Armazenamento",
    question: "Um servidor Windows local configurado como Ponto de Extremidade de Servidor (Server Endpoint) no Azure File Sync será descomissionado. Você precisa remover o servidor do Azure File Sync de forma limpa e segura, garantindo que os dados no compartilhamento do Azure Files (Cloud Endpoint) permaneçam intactos. Qual é a sequência correta de passos que deve ser executada?",
    options: [
      "Excluir o Grupo de Sincronização no portal do Azure e formatar os discos do servidor de arquivos local imediatamente após a desconexão do agente.",
      "Cancelar o registro do servidor diretamente no portal antes de remover o Ponto de Extremidade de Servidor associado.",
      "Excluir o compartilhamento de arquivos no Azure Files e aguardar a sincronização reversa no servidor local por 24 horas.",
      "Excluir o Ponto de Extremidade de Servidor no Grupo de Sincronização, cancelar o registro do servidor no Serviço de Sincronização de Armazenamento e desinstalar o agente."
    ],
    answer: 3,
    explanation: "Para descomissionar um servidor no Azure File Sync de forma segura: 1) Exclua primeiro o Ponto de Extremidade de Servidor (Server Endpoint) dentro do Grupo de Sincronização; 2) Cancele o registro do servidor (Unregister server) no Serviço de Sincronização de Armazenamento; 3) Desinstale o agente do Azure File Sync no Windows Server."
  },
  {
    id: 119,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você está criando uma regra de Gerenciamento de Ciclo de Vida (Lifecycle Management) no Azure Blob Storage para mover blobs gerados por dispositivos IoT para a camada Archive após 60 dias. Você precisa garantir que a regra seja aplicada APENAS a blobs armazenados dentro do contêiner 'telemetria' no caminho virtual 'logs/antigos/'. Como você deve configurar o filtro de prefixo (prefixMatch) na regra?",
    options: [
      "Definir o filtro de prefixo como 'https://storageaccount.blob.core.windows.net/telemetria/logs/antigos/*.log'.",
      "Definir o filtro de contêiner como 'telemetria' e usar uma expressão regular '*.log' no campo de metadados da regra.",
      "Definir o filtro de prefixo (prefixMatch) como 'telemetria/logs/antigos/' na seção de filtros da regra de ciclo de vida.",
      "Configurar uma marca de índice de blob (Blob Index Tag) estática com a chave 'folder' e o valor 'telemetria/logs/antigos'."
    ],
    answer: 2,
    explanation: "No Gerenciamento de Ciclo de Vida do Blob Storage, o filtro de prefixo ('prefixMatch') deve iniciar com o nome do contêiner, seguido pelas pastas virtuais correspondentes (ex: 'telemetria/logs/antigos/'). O Azure não utiliza URLs completas nem caracteres curinga (*) no campo prefixMatch."
  },
  // =========================================================================
  // DOMÍNIO 3: IMPLANTAR E GERENCIAR RECURSOS DE COMPUTAÇÃO DO AZURE (20-25% -> 11 Qs)
  // =========================================================================
  {
    id: 121,
    domain: 3,
    domainName: "Computação",
    question: "Você está projetando um cluster de processamento em lote (batch processing) no Azure que utiliza instâncias de máquinas virtuais sem estado (stateless). As VMs são criadas, processam dados temporários por 2 horas e são destruídas. Você deseja reduzir os custos de armazenamento de disco gerenciado para zero e atingir o menor tempo de latência de gravação de sistema operacional possível. Qual tipo de disco de SO você deve selecionar durante a criação das VMs?",
    options: [
      "Discos de Sistema Operacional Efêmeros (Ephemeral OS Disks hospedados no armazenamento em cache local da VM).",
      "Discos Gerenciados Premium SSD v2 com provisionamento estático de 3000 IOPS e 125 MB/s de throughput dedicado por máquina virtual.",
      "Discos Gerenciados Premium SSD v2 com provisionamento estático de 3000 IOPS e 125 MB/s de throughput.",
      "Volumes de Armazenamento de Blobs montados via driver NFS v3 com camada de acesso Frequente (Hot)."
    ],
    answer: 0,
    explanation: "Os Discos de SO Efêmeros (Ephemeral OS Disks) são criados no armazenamento local da máquina virtual (como o cache da VM ou o disco temporário local), em vez de serem provisionados no Azure Storage remoto. Eles oferecem latência ultrabaixa de leitura/gravação, reinicialização rápida e custo zero de armazenamento de disco."
  },
  {
    id: 122,
    domain: 3,
    domainName: "Computação",
    question: "Sua empresa precisa hospedar 10 servidores de desenvolvimento no Azure que ficam ociosos a maior parte do dia (consumo de CPU abaixo de 10%), mas exigem picos de 100% de capacidade de CPU durante alguns minutos quando os desenvolvedores executam rotinas de testes ou compilação de código. Qual série de tamanho de máquina virtual é a mais custo-eficiente para essa carga de trabalho intermitente?",
    options: [
      "Série D com computação de uso geral dedicada e balanceamento simétrico de memória RAM para execução contínua de rotinas pesadas.",
      "Série F otimizada para computação intensiva com alta proporção de clock por vCPU.",
      "Série B com capacidade de intermitência (B-series burstable baseada no acúmulo de créditos de CPU).",
      "Série E otimizada para memória com isolamento de hardware físico exclusivo para o cliente."
    ],
    answer: 2,
    explanation: "A série B (B-series burstable) foi desenvolvida especialmente para cargas de trabalho que não utilizam a performance total da CPU continuamente, acumulando créditos durante períodos ociosos e utilizando esses créditos para dar saltos (burst) de até 100% da CPU quando necessário, com custo muito menor que instâncias regulares."
  },
  {
    id: 123,
    domain: 3,
    domainName: "Computação",
    question: "Você gerencia um Conjunto de Escala de Máquinas Virtuais (VMSS) com 20 instâncias que executam uma imagem de marketplace do Windows Server 2022 Datacenter. Você deseja habilitar atualizações automáticas de imagem do sistema operacional (Automatic OS Image Upgrades) para que a Microsoft aplique os patches mensais da imagem sem tempo de inatividade para a aplicação. Quais são os dois pré-requisitos obrigatórios para habilitar esse recurso no VMSS?",
    options: [
      "O VMSS deve ter no mínimo 50 instâncias ativas e todas as VMs devem possuir endereços IP públicos Standard dedicados com sondas TCP.",
      "O VMSS deve utilizar o modo de orquestração flexível ou uniforme com sondas de integridade (Health Probes) ou extensão Application Health.",
      "O VMSS deve estar configurado em uma única Zona de Disponibilidade com discos do tipo Standard HDD exclusivos.",
      "Todas as instâncias devem ter o serviço de Área de Trabalho Remota (RDP) habilitado com senha administrativa fixa."
    ],
    answer: 1,
    explanation: "Para habilitar 'Automatic OS Image Upgrades' em um VMSS, o conjunto deve ter monitoramento de integridade da aplicação configurado (por meio de uma sonda de integridade do Application Gateway/Load Balancer ou da extensão 'Application Health'), permitindo que o Azure atualize instâncias em lotes (rolling upgrades) verificando se a aplicação permanece saudável."
  },
  {
    id: 124,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa configurar um domínio personalizado chamado 'app.contoso.com' em um aplicativo web hospedado no Azure App Service. Antes de criar o registro CNAME apontando para 'meuapp.azurewebsites.net', você deseja verificar e pré-validar a propriedade do domínio para evitar tempo de inatividade. Qual registro de DNS e valor devem ser criados no provedor de hospedagem de DNS do contoso.com?",
    options: [
      "Um registro CNAME com o nome 'validate.app.contoso.com' apontando para o IP público do portal do Azure com verificação SSL automática.",
      "Um registro MX com prioridade 10 apontando para o servidor de e-mail do Microsoft Entra ID com chave SPF.",
      "Um registro PTR apontando o endereço IP do gateway de aplicativo para o namespace raiz contoso.com.",
      "Um registro TXT com o nome 'asuid.app.contoso.com' contendo o 'ID de Verificação de Domínio Personalizado' fornecido pelo App Service."
    ],
    answer: 3,
    explanation: "Para pré-validar a propriedade de um domínio personalizado no Azure App Service antes de apontar o tráfego de produção, a Microsoft exige a criação de um registro TXT com o prefixo 'asuid.<subdomínio>' contendo a cadeia de caracteres única de verificação (Custom Domain Verification ID) exibida nas configurações do App Service."
  },
  {
    id: 125,
    domain: 3,
    domainName: "Computação",
    question: "Um desenvolvedor está criando um aplicativo web em Node.js no Azure App Service que precisa recuperar certificados e segredos de conexão armazenados em um cofre de chaves (Azure Key Vault). Por motivos de governança e segurança, as credenciais não podem ser codificadas no código-fonte nem armazenadas em variáveis de ambiente em texto não criptografado. Qual é a arquitetura de segurança recomendada pela Microsoft para permitir a comunicação segura entre o App Service e o Key Vault?",
    options: [
      "Criar uma Conta de Serviço local no Microsoft Entra ID e salvar a senha de acesso no arquivo web.config da pasta raiz com chave simétrica.",
      "Configurar um Ponto de Extremidade de Serviço de Armazenamento com autorização anônima compartilhada entre os serviços.",
      "Habilitar uma Identidade Gerenciada Atribuída pelo Sistema (System-assigned Managed Identity) no App Service e conceder a ela uma função RBAC no Key Vault.",
      "Gerar uma chave de API simétrica de 256 bits no Key Vault e salvá-la nos logs de diagnóstico do Azure Monitor."
    ],
    answer: 2,
    explanation: "A melhor prática do Azure para autenticação entre serviços é utilizar 'Identidades Gerenciadas' (Managed Identities). O Azure gerencia automaticamente o ciclo de vida e a rotação de certificados da identidade no Microsoft Entra ID. No Azure Key Vault, atribui-se uma função RBAC (como 'Usuário de Segredos do Key Vault') diretamente a essa identidade."
  },
  {
    id: 126,
    domain: 3,
    domainName: "Computação",
    question: "No contexto de dimensionamento do Plano do Serviço de Aplicativo do Azure (Azure App Service Plan), qual é a diferença fundamental entre as operações de 'Scale Up' (Escalar Verticalmente) e 'Scale Out' (Escalar Horizontalmente)?",
    options: [
      "'Scale Up' adiciona discos de dados gerenciados às VMs; 'Scale Out' move a aplicação para outra região geográfica do Azure com replicação de dados.",
      "'Scale Up' adiciona discos de dados gerenciados às VMs; 'Scale Out' move a aplicação para outra região geográfica do Azure.",
      "'Scale Up' reinicia o aplicativo web em modo de isolamento; 'Scale Out' altera a versão do ambiente de runtime (ex: Node para .NET).",
      "'Scale Up' duplica o custo mensal da assinatura de forma fixa; 'Scale Out' utiliza instâncias spot gratuitas da Microsoft."
    ],
    answer: 0,
    explanation: "'Scale Up' (escalabilidade vertical) significa mudar para uma camada de preço mais alta (ex: de Basic B1 para Premium P2v3), obtendo mais núcleos de CPU, mais RAM e recursos avançados. 'Scale Out' (escalabilidade horizontal) significa aumentar a contagem de instâncias virtuais idênticas que executam a aplicação para distribuir a carga."
  },
  {
    id: 127,
    domain: 3,
    domainName: "Computação",
    question: "Você gerencia um aplicativo em contêiner implantado no Aplicativos de Contêiner do Azure (Azure Container Apps). Você precisa implantar uma nova versão da imagem de contêiner e realizar uma implantação canário (Canary Deployment), direcionando 20% do tráfego de entrada para a nova versão e mantendo 80% do tráfego na versão antiga estável. Como você deve configurar as revisões e o tráfego no Container Apps?",
    options: [
      "Criar dois balanceadores de carga Standard com portas TCP distintas e configurar um script de balanceamento manual no servidor de aplicação.",
      "Configurar o Modo de Múltiplas Revisões (Multiple Revisions Mode) e definir a divisão de tráfego de entrada (Traffic Splitting) como 80% para a versão antiga e 20% para a nova revisão.",
      "Instalar o NGINX em uma máquina virtual separada na VNet para controlar a distribuição de pacotes HTTP.",
      "Configurar uma política de Acesso Condicional com base em porcentagem de endereços IP de usuários externos."
    ],
    answer: 1,
    explanation: "O Azure Container Apps suporta o 'Modo de Múltiplas Revisões' (Multiple Revisions Mode). Esse recurso permite que várias revisões do aplicativo estejam ativas simultaneamente com divisão de tráfego (Traffic Splitting) configurável em porcentagens, ideal para testes A/B, lançamentos canário e migrações suaves."
  },
  {
    id: 128,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa implantar dois contêineres nas Instâncias de Contêiner do Azure (Azure Container Instances - ACI): um contêiner web principal e um contêiner auxiliar do tipo 'sidecar' que coleta logs do contêiner web. Os dois contêineres devem compartilhar o mesmo ciclo de vida, o mesmo endereço IP público e comunicar-se entre si via localhost na porta 8080. Como você deve estruturar a implantação no ACI?",
    options: [
      "Duas instâncias de contêiner em grupos de recursos separados conectadas via emparelhamento de redes virtuais com IP público dedicado.",
      "Um cluster do Serviço de Kubernetes do Azure (AKS) com no mínimo 10 nós físicos em zonas distintas.",
      "Um Conjunto de Disponibilidade com duas máquinas virtuais Linux executando o daemon do Docker local.",
      "Um único Grupo de Contêineres (Container Group) contendo a definição dos dois contêineres compartilhando o mesmo contexto de rede."
    ],
    answer: 3,
    explanation: "No Azure Container Instances (ACI), um 'Grupo de Contêineres' (Container Group) é uma coleção de contêineres agendados no mesmo computador host. Os contêineres em um grupo compartilham o ciclo de vida, recursos de rede (mesmo IP e namespace de portas, comunicando-se via localhost) e volumes de armazenamento montados."
  },
  {
    id: 129,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa garantir que, imediatamente após o provisionamento de uma nova máquina virtual Linux no Azure via modelo ARM, um script shell customizado ('setup.sh') seja baixado de uma conta de armazenamento privada e executado com privilégios de root para instalar pacotes de segurança e configurar o firewall local iptables. Qual extensão de máquina virtual você deve utilizar?",
    options: [
      "Agente de Diagnóstico do Windows (WAD) configurado para execução de tarefas agendadas em lote.",
      "Extensão de Script Personalizado (Custom Script Extension para Linux integrada ao agente da VM).",
      "Extensão de Proteção de Ponto de Extremidade da Microsoft com verificação em tempo real de malware.",
      "Extensão de Backup de Banco de Dados com backup de recuperação instantânea em cofre de chaves."
    ],
    answer: 1,
    explanation: "A 'Extensão de Script Personalizado' (Custom Script Extension) baixa e executa scripts em máquinas virtuais do Azure. Ela é amplamente utilizada para configuração pós-implantação, instalação de software e tarefas de gerenciamento de configuração automática durante o provisionamento da VM."
  },
  {
    id: 130,
    domain: 3,
    domainName: "Computação",
    question: "Ao criar instantâneos (snapshots) de discos gerenciados do Azure para rotinas de backup antes de manutenções críticas de software, qual é a principal vantagem técnica e financeira de utilizar instantâneos incrementais (Incremental Snapshots) em comparação com instantâneos completos (Full Snapshots)?",
    options: [
      "Instantâneos incrementais não exigem que a máquina virtual seja desligada ou sofra qualquer tipo de freeze de gravação no sistema de arquivos.",
      "Instantâneos incrementais são salvos obrigatoriamente em servidores locais com redundância física em fitas magnéticas.",
      "Instantâneos incrementais gravam apenas os blocos que foram alterados desde o último snapshot, consumindo menos espaço em disco e com custo de armazenamento significativamente menor.",
      "Instantâneos incrementais aumentam o limite de IOPS da máquina virtual em 50% durante a execução da cópia."
    ],
    answer: 2,
    explanation: "Instantâneos incrementais (Incremental Snapshots) de discos gerenciados copiam apenas os blocos de dados delta que foram modificados desde o snapshot anterior. Eles são armazenados em armazenamento Standard mais barato, reduzindo drasticamente o consumo de gigabytes e acelerando o tempo de criação."
  },
  {
    id: 131,
    domain: 3,
    domainName: "Computação",
    question: "Você administra um Plano do Serviço de Aplicativo do Azure (Azure App Service Plan) na camada Premium P1v3. A aplicação sofre picos sazonais de acesso todos os dias úteis entre 08:00 e 10:00 da manhã. Você deseja que o número de instâncias aumente automaticamente para 5 instâncias durante essa janela de horário e retorne para 2 instâncias no restante do dia. Onde você deve configurar essa programação no portal do Azure?",
    options: [
      "Slots de Implantação com troca programada automática através de gatilhos do Azure Logic Apps baseados em consumo de memória RAM.",
      "Slots de Implantação com troca programada automática através de gatilhos do Azure Logic Apps.",
      "Redimensionamento Manual no painel Escalar Verticalmente (Scale Up) alterando o tamanho do hardware da instância.",
      "Ponto de Extremidade de Serviço com controle de fluxo configurado no gateway de roteamento de borda."
    ],
    answer: 0,
    explanation: "No painel 'Escalar Horizontalmente' (Scale Out) do App Service Plan, é possível habilitar o Dimensionamento Automático (Autoscale) e configurar condições baseadas em agendamento ('Scale to a specific instance count' repetido em dias específicos da semana e horários determinados)."
  },
  // =========================================================================
  // DOMÍNIO 4: CONFIGURAR E GERENCIAR REDES VIRTUAIS (15-20% -> 10 Qs)
  // =========================================================================
  {
    id: 132,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Ao configurar uma sub-rede em uma Rede Virtual (VNet) do Azure, você encontra a opção 'Delegação de Sub-rede' (Subnet Delegation). Qual é o objetivo técnico e o efeito de delegar uma sub-rede a um serviço gerenciado do Azure (como Microsoft.Web/serverFarms ou Microsoft.ContainerInstance/containerGroups)?",
    options: [
      "Desativa o firewall de rede e permite conexões sem autenticação de qualquer endereço IP externo na Internet através de portas dinâmicas.",
      "Transforma a sub-rede em uma rede pública exposta diretamente à internet com IPs estáticos não roteáveis.",
      "Bloqueia qualquer tipo de tráfego de saída das máquinas virtuais e desabilita o DNS interno da VNet.",
      "Concede ao serviço especificado permissões dedicadas para gerenciar a sub-rede e restringe a sub-rede para que apenas recursos daquele tipo de serviço possam ser implantados nela."
    ],
    answer: 3,
    explanation: "A 'Delegação de Sub-rede' (Subnet Delegation) concede permissões explícitas a um serviço gerenciado do Azure para criar recursos de rede na sub-rede durante a implantação do serviço. Uma vez delegada, nenhum outro tipo de recurso (como VMs comuns) pode ser implantado nessa sub-rede."
  },
  {
    id: 133,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você configurou o emparelhamento de redes virtuais (VNet Peering) entre a VNet1 e a VNet2. Mais tarde, você adiciona um novo espaço de endereço IP (10.2.0.0/16) à VNet2. Os administradores relatam que as máquinas virtuais na VNet1 não conseguem alcançar as novas máquinas virtuais provisionadas no novo espaço de endereço da VNet2, e o status do emparelhamento exibe 'Requer Sincronização' (Requires Sync). Como você deve resolver essa pendência de conectividade?",
    options: [
      "Excluir e recriar as duas redes virtuais do zero reconfigurando os adaptadores de rede de todas as instâncias e rotas estáticas.",
      "Excluir e recriar as duas redes virtuais do zero reconfigurando os adaptadores de rede de todas as instâncias.",
      "Reiniciar todas as máquinas virtuais em ambas as VNets para recarregar as tabelas de roteamento do kernel.",
      "Instalar o protocolo de roteamento RIPv2 nos adaptadores de rede virtuais de cada sistema operacional guest."
    ],
    answer: 0,
    explanation: "Quando o espaço de endereço de uma VNet emparelhada é modificado após a criação do emparelhamento, o status do peering muda para 'Requires Sync'. O administrador deve clicar em 'Sincronizar' (Sync) no emparelhamento para propagar os novos prefixos de endereço sem interrupção de serviço."
  },
  {
    id: 134,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem um Grupo de Segurança de Rede (NSG) com as seguintes regras de entrada (Inbound):\n- Regra 100: Prioridade 100 | Porta 80 | Ação: Deny\n- Regra 200: Prioridade 200 | Porta 80 | Ação: Allow\n- Regra Padrão 65000: Prioridade 65000 | AllowVNetInBound | Ação: Allow\nQuando uma solicitação HTTP na porta 80 chega a uma máquina virtual associada a este NSG, o que acontece?",
    options: [
      "A conexão é permitida (Allow) porque a Regra 200 substitui a Regra 100 por ter uma ação afirmativa de permissão explícita no NSG.",
      "A conexão é bloqueada (Deny) porque a Regra 100 tem prioridade numérica mais baixa e é avaliada primeiro pelo processador de fluxo.",
      "A conexão é permitida pela regra padrão 65000 porque regras padrão têm precedência sobre regras personalizadas.",
      "A solicitação entra em loop de roteamento indefinido porque regras conflitantes anulam o processamento do NSG."
    ],
    answer: 1,
    explanation: "No Azure NSG, as regras são avaliadas em ordem crescente de prioridade numérica (de 100 a 4096). Números mais baixos têm maior prioridade. Assim que um fluxo de rede corresponde aos critérios de uma regra (neste caso, porta 80 na Regra 100), a ação dessa regra (Deny) é aplicada imediatamente e o processamento é interrompido."
  },
  {
    id: 135,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você está implantando um Azure Standard Load Balancer para distribuir conexões entre máquinas virtuais localizadas na VNet local e servidores locais conectados via ExpressRoute. Para conseguir balancear tráfego para servidores locais sem interfaces de rede virtuais provisionadas no Azure, qual tipo de configuração do pool de backend (Backend Pool) deve ser utilizado no balanceador de carga?",
    options: [
      "Configuração de pool de backend baseada em Interface de Rede (NIC-based compatível exclusivamente com VMs locais da mesma VNet).",
      "Balanceador de Carga Básico legado com sondas de integridade em portas UDP de broadcast aberto.",
      "Configuração de pool de backend baseada em Endereço IP (IP-based backend pool suportada no Standard Load Balancer).",
      "Ponto de Extremidade de Serviço com mapeamento de endereços MAC virtuais através de switch local."
    ],
    answer: 2,
    explanation: "O Azure Standard Load Balancer suporta pools de backend baseados em Endereço IP ('IP-based'). Isso permite incluir como alvos de backend endereços IP privados que residem em outras redes virtuais emparelhadas ou em ambientes locais conectados via ExpressRoute ou VPN Gateway."
  },
  {
    id: 136,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você gerencia um Firewall de Aplicativo Web (WAF) no Azure Application Gateway. Antes de bloquear ativamente qualquer tráfego potencialmente malicioso que possa gerar falsos positivos na aplicação de produção, você deseja monitorar o tráfego e registrar os alertas de regras de segurança disparados no Log Analytics sem interromper as solicitações dos clientes. Qual modo de operação do WAF deve ser selecionado?",
    options: [
      "Modo de Prevenção (Prevention Mode, que descarta ativamente pacotes que violem regras de integridade OWASP 3.2 em tempo real).",
      "Modo Desativado (Disabled Mode, que suspende totalmente o motor de inspeção de regras de camada de aplicativo).",
      "Modo Estrito de Quarentena (Strict Quarantine Mode, que isola endereços IP suspeitos em sub-redes temporárias).",
      "Modo de Detecção (Detection Mode, que apenas inspeciona e registra alertas de segurança sem bloquear solicitações)."
    ],
    answer: 3,
    explanation: "O Azure Web Application Firewall (WAF) opera em dois modos: 'Detecção' (Detection) e 'Prevenção' (Prevention). No modo Detecção, o WAF monitora e analisa o tráfego, registrando correspondências de regras nos logs de diagnóstico sem bloquear nenhuma solicitação."
  },
  {
    id: 137,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua empresa desenvolveu um serviço SaaS no Azure hospedado atrás de um Standard Load Balancer em uma rede virtual própria. Vários clientes corporativos desejam consumir essa API de forma privada a partir de suas próprias VNets no Azure, sem que as redes sejam emparelhadas (para evitar sobreposição de endereços IP / overlapping) e sem expor o serviço à Internet pública. Qual tecnologia da Microsoft permite essa exposição de serviço privada entre locatários?",
    options: [
      "Gateway de VPN Site-to-Site com chave IPsec pré-compartilhada aberta configurada em todas as sub-redes corporativas conectadas.",
      "Serviço Azure Private Link (Private Link Service no provedor consumido via Private Endpoint no cliente).",
      "Balanceador de Carga Público com portas flutuantes habilitadas e NAT de entrada dinâmico via DNS.",
      "Servidor de Rota do Azure (Route Server) com sessões de BGP estabelecidas diretamente sobre a Internet."
    ],
    answer: 1,
    explanation: "O 'Azure Private Link Service' é o serviço que você mesmo referencia atrás de um Standard Load Balancer. Ele permite que consumidores em outras VNets (mesmo em assinaturas ou locatários diferentes do Entra ID) criem um 'Private Endpoint' para acessar seu serviço privadamente, sem necessidade de VNet Peering nem riscos de sobreposição de IPs."
  },
  {
    id: 138,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você precisa configurar uma conexão VPN Ponto a Site (Point-to-Site - P2S) em um Gateway de VPN do Azure para permitir que colaboradores remotos se conectem à rede corporativa na nuvem. A política de segurança exige que a autenticação dos usuários seja realizada exclusivamente pelo Microsoft Entra ID com suporte a MFA e Acesso Condicional. Qual tipo de túnel VPN e tipo de autenticação devem ser configurados no Gateway de VPN?",
    options: [
      "Tipo de túnel: OpenVPN | Tipo de autenticação: Autenticação do Microsoft Entra ID (Azure Active Directory).",
      "Tipo de túnel: SSTP | Tipo de autenticação: Autenticação por Certificado Autoassinado emitido localmente.",
      "Tipo de túnel: IKEv2 | Tipo de autenticação: Chave Pré-Compartilhada (PSK) compartilhada por todos os usuários.",
      "Tipo de túnel: PPTP | Tipo de autenticação: Senha de texto sem formatação gerenciada no Active Directory local."
    ],
    answer: 0,
    explanation: "A autenticação pelo Microsoft Entra ID para VPN Ponto a Site (P2S) do Azure exige que o tipo de túnel VPN seja configurado como 'OpenVPN (SSL)'. Isso permite utilizar o cliente Microsoft Azure VPN para autenticação com MFA e políticas de Acesso Condicional."
  },
  {
    id: 139,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você gerencia uma Zona de DNS Público do Azure para o domínio 'contoso.com'. Você precisa criar um registro de DNS para o ápice do domínio (zone apex / raiz '@') que aponte diretamente para o endereço IP público com SKU Standard associado a um Gateway de Aplicativo do Azure. O registro deve atualizar-se automaticamente caso o endereço IP do recurso mude no futuro. Qual tipo de registro você deve criar?",
    options: [
      "Um registro CNAME comum para a raiz do domínio '@' apontando para o FQDN público gerado no portal com resolução direta de nomes.",
      "Um registro TXT com o ID do recurso ARM contendo parâmetros de verificação de cabeçalho HTTP.",
      "Um registro PTR apontando o endereço reverso para a sub-rede do gateway de aplicativo associado.",
      "Um Conjunto de Registros do tipo Alias (Alias Record Set) do tipo A apontando diretamente para o recurso do IP Público."
    ],
    answer: 3,
    explanation: "Os padrões de DNS (RFC) não permitem registros CNAME no ápice de uma zona (raiz / '@'). O Azure DNS resolve isso oferecendo 'Conjuntos de Registros de Alias' (Alias Records). Um registro de alias do tipo A pode apontar diretamente para recursos do Azure (como IPs Públicos ou Traffic Manager), atualizando dinamicamente seu IP se houver alterações."
  },
  {
    id: 140,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você é o engenheiro de segurança de rede e precisa analisar o tráfego de rede que atravessa todos os Grupos de Segurança de Rede (NSGs) das suas sub-redes corporativas. Você precisa visualizar não apenas endereços IP e portas, mas também obter mapas de tráfego interativos, detecção de tráfego malicioso conhecido, portas abertas vulneráveis e países de origem das conexões. Quais dois recursos do Azure Network Watcher você deve habilitar e integrar ao Log Analytics?",
    options: [
      "Captura de Pacotes local contínua e exportação diária de arquivos .pcap para análise detalhada no software Wireshark de terceiros.",
      "Tabelas de Rotas Definidas pelo Usuário com rota padrão 0.0.0.0/0 direcionada a um servidor proxy Linux.",
      "Logs de Fluxo de NSG (NSG Flow Logs) e Análise de Tráfego (Traffic Analytics) com envio para o Log Analytics.",
      "Extensão clássica de Diagnóstico do Azure configurada para registrar contadores de pacotes TCP por segundo."
    ],
    answer: 2,
    explanation: "Os 'Logs de Fluxo de NSG' (NSG Flow Logs) registram informações sobre tráfego IP de entrada e saída nos NSGs. A 'Análise de Tráfego' (Traffic Analytics) processa esses logs brutos no Log Analytics e fornece visualizações avançadas, inteligência de ameaças e mapas de calor de tráfego na rede."
  },
  {
    id: 141,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua empresa implantou dois Dispositivos Virtuais de Rede (NVAs) em modo ativo-ativo em uma VNet do Azure para rotear tráfego corporativo usando o protocolo de roteamento dinâmico BGP. Você precisa permitir que os NVAs troquem rotas de rede dinamicamente diretamente com o controlador de rede definida por software (SDN) da VNet do Azure, sem a necessidade de configurar e atualizar tabelas de rotas definidas pelo usuário (UDRs) manualmente a cada alteração de sub-rede. Qual serviço do Azure atende a esse cenário?",
    options: [
      "Gateway NAT do Azure associado a um pool de endereços IP públicos estáticos dedicados de alta velocidade.",
      "Balanceador de Carga Básico público configurado com portas flutuantes e regras de NAT de entrada bidirecionais.",
      "Servidor de Rota do Azure (Azure Route Server integrado à rede virtual via emparelhamento BGP).",
      "Azure Bastion Standard configurado com recursos de conexão IP e túnel de porta de gerenciamento seguro."
    ],
    answer: 2,
    explanation: "O 'Azure Route Server' permite a troca de rotas dinâmicas entre Dispositivos Virtuais de Rede (NVAs) e a rede virtual do Azure através do protocolo BGP (Border Gateway Protocol). Isso elimina a necessidade de gerenciar rotas estáticas (UDRs) manualmente sempre que novas sub-redes são adicionadas."
  },
  // =========================================================================
  // DOMÍNIO 5: MONITORAR E MANTER RECURSOS DO AZURE (10-15% -> 9 Qs)
  // =========================================================================
  {
    id: 142,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você gerencia alertas de métricas no Azure Monitor para um pool de máquinas virtuais. As aplicações sofrem variações periódicas de tráfego esperadas (alta carga durante o horário comercial e carga mínima durante fins de semana). Você deseja que os alertas de uso de CPU sejam disparados apenas quando o comportamento for anormal em relação ao padrão histórico daquela hora do dia, sem gerar falsos positivos nos horários de pico. Qual tipo de critério de alerta você deve configurar?",
    options: [
      "Limites Estáticos Simples (Static Thresholds) com valor fixo de alerta configurado permanentemente em 80% de CPU.",
      "Limites Dinâmicos (Dynamic Thresholds) baseados em algoritmos avançados de Machine Learning do Azure Monitor.",
      "Filtro de contagem de logs estáticos baseado em consultas periódicas agendadas a cada 60 minutos.",
      "Alerta de auditoria do Service Health configurado para monitorar avisos de descontinuação de hardware físico."
    ],
    answer: 1,
    explanation: "Os 'Limites Dinâmicos' (Dynamic Thresholds) do Azure Monitor utilizam algoritmos de machine learning para aprender o comportamento histórico de uma métrica ao longo do tempo. O sistema identifica padrões sazonais (diários ou semanais) e ajusta automaticamente os limites de desvio aceitável, reduzindo falsos positivos."
  },
  {
    id: 143,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você precisa criar um alerta no Azure Monitor baseado em consulta de log KQL para detectar rapidamente quando qualquer máquina virtual corporativa parar de responder e deixar de enviar sinais de vida para o espaço de trabalho do Log Analytics por mais de 15 minutos. Qual consulta KQL é a mais adequada para identificar os computadores ausentes?",
    options: [
      "Heartbeat | summarize LastCall = max(TimeGenerated) by Computer | where LastCall < ago(15m)",
      "AzureActivity | where OperationName == 'Stop Virtual Machine' and ActivityStatusValue == 'Success'",
      "Perf | where CounterName == '% Processor Time' and TimeGenerated > ago(15m) | take 10",
      "Event | where EventLevelName == 'Error' and TimeGenerated > ago(15m) | summarize count() by Source"
    ],
    answer: 0,
    explanation: "O agente do Azure Monitor envia um registro de sinal de vida para a tabela 'Heartbeat' a cada minuto. A consulta KQL resume a data do último sinal por computador com 'summarize LastCall = max(TimeGenerated) by Computer' e filtra aqueles cujo último sinal foi anterior a 15 minutos atrás ('where LastCall < ago(15m)')."
  },
  {
    id: 144,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Sua organização precisa transmitir em tempo real grandes volumes de logs de segurança e diagnóstico coletados em um Espaço de Trabalho do Log Analytics para uma ferramenta externa de Gerenciamento de Informações e Eventos de Segurança (SIEM de terceiros) hospedada em outro provedor de nuvem. Qual recurso nativo do Log Analytics fornece a exportação contínua de fluxo de dados de tabelas específicas sem a necessidade de criar pipelines manuais no Logic Apps?",
    options: [
      "Executar o comando 'azcopy copy' manualmente a cada 60 minutos através de uma tarefa agendada no Windows para uma conta de armazenamento.",
      "Exportar os relatórios de consulta KQL em formato PDF semanalmente e enviá-los por e-mail para o administrador do SIEM.",
      "Criar uma pasta compartilhada no Azure Files com sincronização DFS entre os provedores de computação em nuvem.",
      "Exportação de Dados do Espaço de Trabalho do Log Analytics (Log Analytics Workspace Data Export) para Hubs de Eventos do Azure (Azure Event Hubs)."
    ],
    answer: 3,
    explanation: "A 'Exportação de Dados do Espaço de Trabalho do Log Analytics' (Log Analytics Workspace Data Export) permite exportar continuamente dados de tabelas selecionadas para uma Conta de Armazenamento do Azure ou para Hubs de Eventos do Azure (Azure Event Hubs). Do Event Hubs, ferramentas SIEM externas podem consumir os dados em tempo real."
  },
  {
    id: 145,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "O Azure Backup disponibiliza dois tipos principais de cofres para gerenciamento de proteção de dados: o Cofre dos Serviços de Recuperação (Recovery Services Vault) e o Cofre de Backup (Backup Vault). Quais das seguintes cargas de trabalho corporativas são protegidas pelo Cofre dos Serviços de Recuperação (Recovery Services Vault)?",
    options: [
      "Máquinas Virtuais do Azure (Azure VMs IaaS), Compartilhamentos do Azure Files e SQL Server em VMs do Azure.",
      "Armazenamento de Blobs do Azure (Blob Operational Backup) e Servidores de Banco de Dados PostgreSQL Flexíveis.",
      "Discos Gerenciados do Azure (Azure Disks Backup) e clusters do Serviço de Kubernetes do Azure (AKS).",
      "Tabelas de Rotas Definidas pelo Usuário, Zonas de DNS Privado e Grupos de Segurança de Aplicativo (ASG)."
    ],
    answer: 0,
    explanation: "O 'Cofre dos Serviços de Recuperação' (Recovery Services Vault - RSV) é a solução tradicional e robusta para: Máquinas Virtuais do Azure (Windows/Linux), Azure Files, SQL Server em VMs do Azure, SAP HANA em VMs do Azure e servidores locais (System Center DPM/MABS). Por outro lado, cargas como Blobs operacionais, Discos Gerenciados isolados e Servidores Flexíveis de PostgreSQL utilizam o 'Backup Vault'."
  },
  {
    id: 146,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Para se proteger contra ameaças internas e ransomware, a diretoria exige que nenhuma operação crítica destrutiva no Azure Backup (como desabilitar a exclusão suave, excluir um item de backup protegido ou desativar a política de segurança) possa ser executada por um único administrador sem a aprovação explícita e independente de um segundo administrador de segurança autorizado. Qual recurso do Azure Backup deve ser implementado?",
    options: [
      "Bloqueio de Recursos do tipo CanNotDelete aplicado no grupo de recursos do Cofre dos Serviços de Recuperação.",
      "Autenticação de passagem via protocolo Kerberos integrada ao Microsoft Entra Domain Services local.",
      "Autorização de Vários Usuários (Multi-User Authorization - MUA) protegida pelo Azure Resource Guard.",
      "PIN gerado exclusivamente pelo suporte técnico da Microsoft após abertura de chamado de severidade A."
    ],
    answer: 2,
    explanation: "A 'Autorização de Vários Usuários' (Multi-User Authorization - MUA) para o Azure Backup utiliza o 'Azure Resource Guard' para impor autorização dupla em operações críticas. O administrador do cofre não consegue executar ações destrutivas a menos que tenha permissões aprovadas no cofre do Resource Guard (gerenciado por um administrador de segurança distinto)."
  },
  {
    id: 147,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Sua equipe de engenharia de software desenvolve uma aplicação web ASP.NET Core hospedada no Azure App Service. Os desenvolvedores precisam rastrear exceções em tempo real no código, identificar gargalos de lentidão em chamadas de banco de dados SQL e serviços externos, além de visualizar o mapa de dependências de ponta a ponta (Application Map) da aplicação. Qual ferramenta de Gerenciamento de Desempenho de Aplicativos (APM) do Azure deve ser integrada?",
    options: [
      "Observador de Rede (Network Watcher com diagnóstico de regras de segurança e roteamento salto a salto em todas as interfaces de rede).",
      "Application Insights (recurso do Azure Monitor voltado para telemetria de aplicações e diagnóstico de código).",
      "Azure Cost Management (com histórico detalhado de orçamentos e custos departamentais de computação).",
      "Cofre dos Serviços de Recuperação (com políticas de retenção diária e recuperação instantânea de dados)."
    ],
    answer: 1,
    explanation: "O 'Application Insights' é um recurso do Azure Monitor voltado para desenvolvedores e equipes de DevOps. Ele atua como uma solução completa de APM (Application Performance Management), rastreando requisições, taxas de falha, tempos de resposta, exceções no código e dependências externas."
  },
  {
    id: 148,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você é o arquiteto de operações e precisa garantir que a equipe de suporte seja notificada imediatamente por e-mail e SMS sempre que um incidente de indisponibilidade oficial na plataforma Azure (Service Incident) afetar os serviços de Máquinas Virtuais ou Rede Virtual na região Sul do Brasil, onde suas cargas de trabalho críticas residem. O que você deve configurar?",
    options: [
      "Regra de alerta de métrica de uso de CPU no Azure Monitor disparada quando a média exceder 80% continuamente durante 15 minutos.",
      "Relatório de Conformidade do Azure Policy gerado semanalmente pelo painel de governança corporativa.",
      "Aviso de segurança e recomendação de postura de segurança no Microsoft Defender for Cloud.",
      "Alertas do Azure Service Health vinculados a um Grupo de Ações (Action Group) filtrados pela região e serviços utilizados."
    ],
    answer: 3,
    explanation: "No painel do 'Azure Service Health', é possível criar alertas de integridade de serviço ('Service Health Alerts'). Esses alertas notificam os administradores por meio de Grupos de Ações (Action Groups) quando incidentes de serviço, manutenções planejadas ou avisos de integridade emitidos pela Microsoft impactam recursos específicos nas regiões utilizadas."
  },
  {
    id: 149,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Ao analisar a folha de Excelência Operacional (Operational Excellence) do Assistente do Azure (Azure Advisor) para sua infraestrutura em nuvem, quais são duas das principais recomendações voltadas para resiliência e integridade operacional que o Azure Advisor normalmente destaca?",
    options: [
      "Excluir interfaces de rede não conectadas para economizar dinheiro e cancelar assinaturas de desenvolvimento inativas no painel.",
      "Bloquear a porta 22 em todos os grupos de segurança e remover chaves SSH públicas antigas dos desenvolvedores.",
      "Habilitar a proteção de exclusão suave (Soft Delete) em contas de armazenamento e reparar agentes do Azure Monitor com falha de comunicação.",
      "Comprar instâncias reservadas de 3 anos para servidores temporários de homologação com desconto de volume."
    ],
    answer: 2,
    explanation: "Na categoria de Excelência Operacional (Operational Excellence), o Azure Advisor foca em integridade, facilidade de manutenção e resiliência: habilitar exclusão suave para evitar perda acidental de dados, criar políticas de backup, reparar agentes de monitoramento com falha e seguir práticas recomendadas de implantação."
  },
  // =========================================================================
  // DOMÍNIO 4: CONFIGURAR E GERENCIAR REDES VIRTUAIS (15-20% -> 10 Qs)
  // =========================================================================
  {
    id: 150,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você suspeita que uma máquina virtual Linux chamada 'vm-proxy' está enviando tráfego malicioso para a Internet. Para investigar a suspeita, você precisa capturar o tráfego de rede bruto que entra e sai da interface de rede da VM durante 15 minutos e salvar o arquivo em formato '.cap' em uma conta de armazenamento para análise posterior detalhada no software Wireshark. Qual ferramenta do Azure Network Watcher atende diretamente a essa necessidade?",
    options: [
      "Captura de Pacotes (Packet Capture do Azure Network Watcher direcionada à interface de rede da VM).",
      "Próximo Salto (Next Hop com diagnóstico de roteamento estático da tabela de rotas do Azure).",
      "Verificação de Fluxo de IP (IP Flow Verify com validação rápida de regras de NSG permitidas ou negadas).",
      "Diagnóstico de Segurança de NSG (com análise de regras de segurança efetivas herdadas por sub-rede)."
    ],
    answer: 0,
    explanation: "A 'Captura de Pacotes' (Packet Capture) do Network Watcher permite gravar o tráfego de rede de e para uma máquina virtual sem precisar instalar softwares de captura locais manualmente. O arquivo de captura (.cap/.pcap) pode ser salvo diretamente no Azure Blob Storage ou no disco local da VM."
  },
];
