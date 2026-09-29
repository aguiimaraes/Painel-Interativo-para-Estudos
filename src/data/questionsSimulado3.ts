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
      "Alterar o UserPrincipalName ou o ProxyAddresses do usuário local para garantir que seja exclusivo em todo o diretório e forçar uma sincronização delta com 'Start-ADSyncSyncCycle -PolicyType Delta'.",
      "Excluir o locatário do Microsoft Entra ID e recriá-lo do zero.",
      "Desinstalar o agente do Microsoft Entra Connect no servidor local.",
      "Criar uma política de Acesso Condicional bloqueando o usuário duplicado."
    ],
    answer: 0,
    explanation: "Erros de atributo duplicado (como conflito de UserPrincipalName ou ProxyAddresses) ocorrem quando dois objetos no diretório compartilham o mesmo valor em um atributo de identificação exclusiva. Para corrigir a falha, deve-se ajustar o valor conflitante no Active Directory local para que seja exclusivo e, em seguida, disparar um ciclo de sincronização delta com o cmdlet 'Start-ADSyncSyncCycle -PolicyType Delta'."
  },
  {
    id: 102,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você gerencia políticas de Acesso Condicional no Microsoft Entra ID. Você precisa garantir que colaboradores remotos que acessem o Exchange Online e o SharePoint Online a partir de computadores pessoais não corporativos possam visualizar e-mails e arquivos no navegador, mas fiquem estritamente impedidos de baixar (download), imprimir ou sincronizar documentos confidenciais localmente. Qual controle de sessão do Acesso Condicional você deve habilitar?",
    options: [
      "Usar o Controle de Aplicativos de Acesso Condicional (Conditional Access App Control) integrado com o Microsoft Defender for Cloud Apps.",
      "Habilitar a frequência de entrada para 1 hora.",
      "Exigir redefinição de senha na próxima entrada.",
      "Bloquear totalmente o acesso a partir de navegadores web."
    ],
    answer: 0,
    explanation: "O 'Controle de Aplicativos de Acesso Condicional' (Conditional Access App Control) roteia as sessões dos usuários através do proxy reverso do Microsoft Defender for Cloud Apps. Isso permite aplicar controles de sessão em tempo real, como monitorar a navegação e bloquear downloads, impressões ou cópias de dados confidenciais quando o usuário se conecta a partir de dispositivos não corporativos ou não compatíveis."
  },
  {
    id: 103,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa utiliza o Privileged Identity Management (PIM) no Microsoft Entra ID para proteger funções administrativas de alto privilégio. Você precisa configurar a atribuição da função de 'Administrador Global' para três engenheiros seniores para que eles NÃO tenham permissões ativas permanentes, mas possam solicitar a ativação da função por no máximo 4 horas quando necessário, exigindo aprovação obrigatória do gerente de segurança e justificativa com número de chamado. Como você deve configurar essa função no PIM?",
    options: [
      "Definir a atribuição como 'Elegível' (Eligible) nas atribuições de função e configurar a política da função com duração máxima de 4 horas, exigência de aprovação e justificativa de tíquete.",
      "Definir a atribuição como 'Ativa' (Active) permanente com bloqueio de leitura.",
      "Atribuir a função de Leitor Global permanente e delegar senhas por e-mail.",
      "Criar uma Unidade Administrativa contendo apenas os três engenheiros."
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
      "Configurações de Acesso Entre Locatários (Cross-Tenant Access Settings) > Configurações de Confiança (Trust Settings), marcando 'Confiar na autenticação multifator de locatários do Microsoft Entra'.",
      "Uma federação direta baseada em Google ID.",
      "Adicionar o parceiro como Administrador de Segurança no Locatário A.",
      "Um grupo de segurança dinâmico atribuído a uma licença Free."
    ],
    answer: 0,
    explanation: "Nas 'Configurações de Acesso Entre Locatários' (Cross-tenant access settings) do Microsoft Entra ID, a guia 'Configurações de Confiança' (Trust Settings) permite que sua organização confie em declarações de autenticação multifator (MFA), dispositivos em conformidade e dispositivos ingressados no Entra ID emitidos por locatários externos parceiros, eliminando a necessidade de o usuário convidado refazer o registro de MFA no seu diretório."
  },
  {
    id: 105,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você está analisando a seguinte definição JSON de uma função personalizada do Azure RBAC:\n{\n  \"Name\": \"Gerente de VMs\",\n  \"Actions\": [\"Microsoft.Compute/virtualMachines/*\"],\n  \"NotActions\": [\"Microsoft.Compute/virtualMachines/delete\"],\n  \"AssignableScopes\": [\"/subscriptions/sub-1234\"]\n}\nQual é o comportamento exato desta função quando atribuída a um operador?",
    options: [
      "O operador pode executar todas as operações em máquinas virtuais na assinatura, EXCETO excluir máquinas virtuais.",
      "O operador é impedido de realizar qualquer ação em máquinas virtuais se tiver qualquer outra função atribuída.",
      "O operador só pode excluir máquinas virtuais.",
      "O operador ganha acesso de leitura a todas as contas de armazenamento."
    ],
    answer: 0,
    explanation: "No Azure RBAC, 'NotActions' funciona como uma regra de subtração das permissões listadas em 'Actions'. Neste caso, 'Microsoft.Compute/virtualMachines/*' concede todas as operações em VMs, mas 'NotActions' subtrai a permissão 'Microsoft.Compute/virtualMachines/delete'. Logo, o operador pode ler, criar, reiniciar e redimensionar VMs, mas não pode excluí-las. (Observação: NotActions não é um Deny explícito; se outra função conceder a exclusão, ela será permitida)."
  },
  {
    id: 106,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você precisa garantir que todos os novos grupos de recursos criados em uma assinatura corporativa recebam automaticamente uma marcação (tag) chamada 'Ambiente' com o valor padrão 'Producao', caso a solicitação de implantação do grupo de recursos não inclua a referida tag. Qual efeito do Azure Policy você deve utilizar?",
    options: [
      "Modify",
      "Deny",
      "AuditIfNotExists",
      "Disabled"
    ],
    answer: 0,
    explanation: "O efeito 'Modify' do Azure Policy é utilizado para adicionar, atualizar ou remover marcas e propriedades em recursos ou grupos de recursos durante o processo de criação ou atualização gerenciado pelo ARM. Ele permite injetar automaticamente a marcação 'Ambiente: Producao' no grupo de recursos sem rejeitar a solicitação de implantação."
  },
  {
    id: 107,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Em uma estrutura corporativa complexa do Azure, qual é a profundidade máxima permitida para a hierarquia de Grupos de Gerenciamento (Management Groups), excluindo o Grupo de Gerenciamento Raiz (Root Management Group) e as assinaturas?",
    options: [
      "6 níveis de profundidade.",
      "2 níveis de profundidade.",
      "10 níveis de profundidade.",
      "Ilimitada."
    ],
    answer: 0,
    explanation: "A hierarquia de Grupos de Gerenciamento do Azure suporta uma profundidade máxima de até 6 níveis de árvore, sem contar o nível Raiz (Root Management Group) no topo e as assinaturas vinculadas na base. Essa restrição de arquitetura garante a eficiência na avaliação e herança de políticas e permissões RBAC."
  },
  {
    id: 108,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa decide transferir a propriedade de cobrança de uma assinatura Azure existente para um locatário diferente do Microsoft Entra ID. O que acontece com as atribuições de funções existentes do Azure RBAC (como Proprietário, Colaborador e Leitor) configuradas na assinatura após a conclusão da transferência de diretório?",
    options: [
      "Todas as atribuições de função do Azure RBAC existentes na assinatura são excluídas permanentemente e precisam ser recriadas no novo diretório.",
      "As atribuições de função são migradas e associadas automaticamente às contas do novo diretório.",
      "Todos os recursos da assinatura são excluídos imediatamente.",
      "As máquinas virtuais perdem suas configurações de rede privada."
    ],
    answer: 0,
    explanation: "Ao transferir uma assinatura do Azure para um locatário diferente do Microsoft Entra ID, a relação de confiança de identidade é desfeita. Como as atribuições de função do Azure RBAC apontam para identificadores de segurança (ObjectIDs) do diretório de origem, todas as atribuições de função são excluídas permanentemente da assinatura e devem ser reatribuídas aos usuários do novo diretório."
  },
  {
    id: 109,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você gerencia um locatário do Microsoft Entra ID com 10.000 usuários em vários países. Você precisa delegar a administração de contas de usuários aos administradores de suporte local da filial do Brasil. Você cria uma Unidade Administrativa (AU) chamada 'AU-Brasil'. Você precisa que todos os usuários cujo atributo de país (UsageLocation ou Country) seja 'Brasil' entrem automaticamente nessa Unidade Administrativa. Qual tipo de associação deve ser configurado na AU?",
    options: [
      "Associação de usuário dinâmica (Dynamic User).",
      "Associação atribuída manualmente (Assigned).",
      "Sincronização de hash de senha.",
      "Grupo de segurança estático."
    ],
    answer: 0,
    explanation: "O Microsoft Entra ID dá suporte a Unidades Administrativas com associação dinâmica (Dynamic Membership). Assim como nos grupos de segurança dinâmicos, você pode definir regras de consulta baseadas em atributos (ex: user.country -eq \"Brasil\") para que os usuários que atendem aos critérios sejam adicionados ou removidos da Unidade Administrativa automaticamente sem intervenção manual."
  },
  {
    id: 110,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você precisa exigir que todos os consultores terceirizados visualizem e aceitem eletronicamente um Termo de Confidencialidade e Uso Aceitável (NDA) antes de obterem acesso aos aplicativos e recursos corporativos do Microsoft Entra ID. Se o termo for atualizado, eles devem ser solicitados a aceitar novamente a nova versão. Qual funcionalidade você deve utilizar?",
    options: [
      "Termos de Uso (Terms of Use - ToU) no Acesso Condicional.",
      "Política de Bloqueio Inteligente do Entra ID.",
      "Controle de versão de modelos ARM.",
      "Monitor de Rede do Azure."
    ],
    answer: 0,
    explanation: "Os 'Termos de Uso' (Terms of Use - ToU) do Microsoft Entra ID permitem publicar documentos PDF de políticas legais ou termos de consentimento. Integrados a uma política de Acesso Condicional, eles garantem que os usuários (ou convidados externos) devam ler e consentir explicitamente com os termos antes de acessar aplicativos protegidos, permitindo ainda exigir novo consentimento em caso de atualizações no documento."
  },
  {
    id: 111,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você precisa automatizar a implantação de um bloqueio de recursos do tipo 'ReadOnly' em um grupo de recursos crítico usando código de Infraestrutura como Código (Bicep/ARM Template). Qual tipo de provedor de recursos deve ser declarado no modelo para criar o bloqueio?",
    options: [
      "Microsoft.Authorization/locks",
      "Microsoft.Resources/resourceLocks",
      "Microsoft.Security/complianceLocks",
      "Microsoft.Compute/locks"
    ],
    answer: 0,
    explanation: "No Azure Resource Manager (ARM e Bicep), os bloqueios de recursos são gerenciados pelo provedor de autorização oficial 'Microsoft.Authorization/locks'. Ao declarar esse recurso no modelo, especifica-se o 'level' como 'ReadOnly' (ou 'CanNotDelete') e o escopo do recurso ou grupo de recursos a ser protegido."
  },

  // =========================================================================
  // DOMÍNIO 2: IMPLEMENTAR E GERENCIAR ARMAZENAMENTO (15-20% -> 9 Qs)
  // =========================================================================
  {
    id: 112,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem uma conta de armazenamento de uso geral v2 chamada 'stgprodbackup' configurada com redundância geográfica GRS na região Leste dos EUA (região primária) e Oeste dos EUA (região secundária). Ocorreu um incidente grave na região Leste dos EUA e a diretoria decide executar um failover manual da conta gerenciado pelo cliente (Customer-Managed Account Failover). O que acontece com a conta de armazenamento após o failover?",
    options: [
      "A região secundária (Oeste dos EUA) torna-se a nova região primária e o tipo de redundância da conta é convertido automaticamente para LRS (Locally-Redundant Storage).",
      "A conta de armazenamento é excluída e recriada com novas chaves de acesso.",
      "A redundância permanece GRS automaticamente sem necessidade de nenhuma ação futura.",
      "Todos os dados da conta são arquivados na camada de arquivos frios."
    ],
    answer: 0,
    explanation: "Ao executar um failover de conta de armazenamento iniciado pelo cliente, os registros DNS são atualizados para que a região secundária passe a responder como a nova região primária. Como a região primária original está inacessível, a conta perde a capacidade de replicação geográfica e seu tipo de redundância é convertido automaticamente para LRS. Para restaurar a proteção geográfica, o administrador deve reconfigurar a conta para GRS/RA-GRS manualmente mais tarde."
  },
  {
    id: 113,
    domain: 2,
    domainName: "Armazenamento",
    question: "Uma instituição bancária precisa armazenar relatórios de transações financeiras em contêineres de Blob Storage no Azure para atender à norma regulatória SEC Rule 17a-4 (armazenamento WORM - Write Once, Read Many). Os arquivos gravados não podem ser alterados, substituídos ou excluídos por ninguém (nem mesmo pelo Administrador Global ou suporte da Microsoft) durante o período legal de retenção de 5 anos. Qual configuração atende a esse requisito?",
    options: [
      "Configurar uma Política de Retenção Baseada em Tempo (Time-based retention policy) no contêiner de Blob e Bloquear a Política (Policy Lock / Legal Immutability).",
      "Configurar um bloqueio de recursos CanNotDelete no grupo de recursos.",
      "Definir a camada de acesso para Archive com criptografia SSE.",
      "Atribuir permissão de Leitor nos contêineres para todos os usuários."
    ],
    answer: 0,
    explanation: "O Armazenamento Imutável para Blobs do Azure suporta 'Políticas de Retenção Baseadas em Tempo'. Ao definir o tempo de retenção (ex: 5 anos) e bloquear formalmente a política ('Lock Policy'), o estado de conformidade regulatória rigorosa (WORM) é ativado. Uma vez bloqueada, a política é irreversível: nenhum usuário ou processo pode excluir ou substituir os blobs até que o período de retenção expire."
  },
  {
    id: 114,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua empresa precisa permitir que parceiros externos transfiram arquivos volumosos para uma conta de armazenamento do Azure utilizando o protocolo SFTP (SSH File Transfer Protocol) de forma nativa, autenticando-se por meio de pares de chaves públicas SSH, sem necessidade de gerenciar máquinas virtuais de servidores SFTP de terceiros. Qual recurso nativo do Azure Storage deve ser habilitado na conta?",
    options: [
      "Habilitar o suporte a SFTP na conta de armazenamento com Namespace Hierárquico (Azure Data Lake Storage Gen2).",
      "Configurar o Azure Bastion com túnel de SSH.",
      "Criar uma máquina virtual Linux com serviço OpenSSH conectado via NFS.",
      "Ativar o protocolo WebDAV na sub-rede de armazenamento."
    ],
    answer: 0,
    explanation: "O Azure Blob Storage oferece suporte nativo ao protocolo SFTP (SSH File Transfer Protocol). Para ativá-lo, a conta de armazenamento deve possuir o Namespace Hierárquico (ADLS Gen2) habilitado. Uma vez ativado o SFTP, é possível criar usuários locais na própria conta de armazenamento associando chaves públicas SSH para autenticação segura e sem servidor (serverless)."
  },
  {
    id: 115,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você gerencia um compartilhamento de arquivos do Azure Files em uma conta de armazenamento Standard General Purpose v2. O compartilhamento está próximo de atingir a cota máxima padrão de 5 TiB. Você precisa expandir a capacidade do compartilhamento de arquivos para até 100 TiB. Qual configuração você deve ativar na conta de armazenamento?",
    options: [
      "Habilitar o recurso 'Compartilhamentos de Arquivos Grandes' (Large File Shares) na conta de armazenamento.",
      "Converter a conta de armazenamento para Premium Page Blobs.",
      "Criar 20 compartilhamentos de arquivos menores e agrupá-los via DFS-N.",
      "Habilitar a replicação RA-GZRS."
    ],
    answer: 0,
    explanation: "O recurso 'Compartilhamentos de Arquivos Grandes' (Large File Shares) permite que compartilhamentos padrão do Azure Files cresçam de 5 TiB até 100 TiB, aumentando também os limites de IOPS e taxa de transferência. Essa configuração está disponível para contas com redundância LRS e ZRS."
  },
  {
    id: 116,
    domain: 2,
    domainName: "Armazenamento",
    question: "Uma aplicação parceira utiliza uma Assinatura de Acesso Compartilhado de Serviço (Service SAS) para enviar dados a um contêiner de Blob Storage. Você precisa garantir que, caso as credenciais da aplicação sejam comprometidas, o acesso fornecido pelo token SAS possa ser revogado IMEDIATAMENTE sem alterar a chave primária ou secundária da conta de armazenamento (o que interromperia outras aplicações). Como a SAS deveria ter sido gerada?",
    options: [
      "Vinculada a uma Política de Acesso Armazenada (Stored Access Policy) criada no contêiner de blob.",
      "Com a flag de leitura anônima habilitada.",
      "Assinada com um certificado X.509 autoassinado.",
      "Gerada como uma SAS de Conta com permissões totais."
    ],
    answer: 0,
    explanation: "Uma Política de Acesso Armazenada (Stored Access Policy) definida em um contêiner de blob, fila ou tabela permite gerenciar os parâmetros de controle de assinaturas de acesso compartilhado (SAS) associadas. Caso seja necessário revogar o acesso fornecido por uma SAS vinculada a uma política armazenada, basta modificar a data de expiração da política para o passado ou simplesmente excluí-la, revogando o acesso imediatamente sem tocar nas chaves mestras da conta."
  },
  {
    id: 117,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você configurou um Ponto de Extremidade Privado (Private Endpoint) para uma conta de armazenamento chamada 'stgcorporativo' com IP privado 10.1.2.5. Clientes na rede virtual interna tentam acessar o endpoint através do FQDN público 'stgcorporativo.blob.core.windows.net'. Como o Azure resolve esse nome para o endereço IP privado do Private Endpoint de forma transparente?",
    options: [
      "O DNS público do Azure resolve 'stgcorporativo.blob.core.windows.net' como um CNAME apontando para 'stgcorporativo.privatelink.blob.core.windows.net', que é resolvido para 10.1.2.5 pela Zona de DNS Privado vinculada à VNet.",
      "O arquivo hosts de todas as máquinas virtuais é atualizado automaticamente pelo Azure DHCP.",
      "O Balanceador de Carga Standard altera os cabeçalhos IP de todas as consultas DNS.",
      "O gateway NAT realiza a tradução de portas DNS em tempo real."
    ],
    answer: 0,
    explanation: "Quando um Ponto de Extremidade Privado é criado, o Azure atualiza o registro CNAME canônico da conta de armazenamento no DNS público para apontar para '<nome_da_conta>.privatelink.blob.core.windows.net'. Ao vincular a Zona de DNS Privado correspondente ('privatelink.blob.core.windows.net') à VNet com o registro A (10.1.2.5), os clientes internos continuam usando a URL padrão da conta e são redirecionados automaticamente para o IP privado."
  },
  {
    id: 118,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem um arquivo de log de 20 GB armazenado na camada de Arquivamento (Archive) do Azure Blob Storage. A equipe de segurança precisa auditar urgentemente esse arquivo devido a um incidente em andamento. Eles solicitam que o processo de reidratação (Rehydration) para a camada Hot seja concluído no menor tempo possível (em menos de 1 hora). Qual prioridade de reidratação você deve selecionar?",
    options: [
      "Prioridade Alta (High Priority Rehydration).",
      "Prioridade Padrão (Standard Priority Rehydration).",
      "Prioridade de Lote (Batch Priority).",
      "Prioridade Ultrarrápida com ExpressRoute."
    ],
    answer: 0,
    explanation: "A reidratação de blobs da camada Archive para Hot ou Cool suporta dois níveis de prioridade: 'Padrão' (Standard), que processa a solicitação em ordem de chegada e pode levar até 15 horas, e 'Alta' (High Priority), que prioriza a solicitação com capacidade dedicada, recuperando blobs de até 10 GB normalmente em menos de 1 hora, sob uma tarifa ligeiramente superior."
  },
  {
    id: 119,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você precisa criar uma regra de Gerenciamento de Ciclo de Vida que exclua automaticamente todos os blobs que estão localizados no contêiner 'telemetria' e cujo caminho de pasta inicie com 'logs/temporario/', quando esses arquivos completarem 14 dias de criação. Qual filtro você deve especificar na regra de ciclo de vida?",
    options: [
      "Definir o filtro de prefixo (prefixMatch) como 'telemetria/logs/temporario/' e a ação 'delete' para 14 dias após a criação.",
      "Definir a tag de serviço 'VirtualNetwork' com limite de 14 horas.",
      "Criar uma política de replicação assíncrona entre locatários.",
      "Configurar um alerta de log no Azure Monitor que dispare um script de exclusão."
    ],
    answer: 0,
    explanation: "As regras de Gerenciamento de Ciclo de Vida do Blob Storage permitem aplicar filtros de prefixo ('prefixMatch') no formato '<nome_do_conteiner>/<caminho_do_prefixo>'. Assim, especificando 'telemetria/logs/temporario/', a regra avalia exclusivamente os blobs desse diretório e executa a ação 'delete' após 14 dias da criação ou modificação."
  },
  {
    id: 120,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você está instalando o agente do Azure File Sync em um servidor Windows Server 2022 local. Ao tentar registrar o servidor no Serviço de Sincronização de Armazenamento (Storage Sync Service), o assistente exibe uma mensagem informando que o servidor já está registrado em outro Serviço de Sincronização. O que você deve fazer para registrar o servidor no novo Serviço de Sincronização de Armazenamento?",
    options: [
      "Cancelar o registro do servidor no Serviço de Sincronização de Armazenamento anterior antes de registrá-lo no novo serviço.",
      "Reinstalar o sistema operacional Windows Server do zero.",
      "Alterar o endereço IP estático do servidor de arquivos.",
      "Renomear os compartilhamentos SMB no Azure Files."
    ],
    answer: 0,
    explanation: "Um servidor local com o agente do Azure File Sync só pode ser registrado em um único Serviço de Sincronização de Armazenamento (Storage Sync Service) por vez. Para movê-lo para outro serviço, deve-se remover todos os pontos de extremidade de servidor (Server Endpoints) associados e cancelar formalmente o registro do servidor no serviço antigo pelo portal ou PowerShell antes de registrá-lo no novo."
  },

  // =========================================================================
  // DOMÍNIO 3: IMPLANTAR E GERENCIAR RECURSOS DE COMPUTAÇÃO (20-25% -> 11 Qs)
  // =========================================================================
  {
    id: 121,
    domain: 3,
    domainName: "Computação",
    question: "Sua equipe projeta uma arquitetura com nós de processamento stateless (sem estado) em máquinas virtuais Azure. Os nós gravam e leem dados temporários em alta velocidade no disco do sistema operacional, mas nenhuma alteração do disco precisa persistir caso a VM seja reiniciada ou realocada. Você precisa eliminar o custo de armazenamento de disco gerenciado remoto e reduzir a latência de I/O de disco para zero. Qual funcionalidade de disco de VM você deve selecionar durante a criação da máquina?",
    options: [
      "Disco de Sistema Operacional Efêmero (Ephemeral OS Disk).",
      "Disco Gerenciado Ultra Disk com IOPS provisionado.",
      "Disco Gerenciado Standard HDD com caching ReadOnly.",
      "Disco VHD montado via protocolo iSCSI sobre a internet."
    ],
    answer: 0,
    explanation: "Discos de SO Efêmeros (Ephemeral OS Disks) são criados diretamente no armazenamento local da VM (na memória cache ou no disco temporário local do host físico) em vez de no armazenamento remoto do Azure Storage. Eles oferecem latência ultrabaixa de leitura/gravação, reimplementação rápida de imagem e custo de armazenamento zero, sendo ideais para cargas de trabalho sem estado."
  },
  {
    id: 122,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa provisionar uma máquina virtual para um servidor de desenvolvimento que opera a maior parte do tempo com menos de 10% de uso de CPU, mas ocasionalmente necessita disparar compilações de código de curta duração que utilizam 100% da CPU por alguns minutos. Qual série de tamanho de máquina virtual do Azure é especificamente otimizada para essa carga de trabalho com o menor custo?",
    options: [
      "Série B com capacidade de intermitência (B-series burstable).",
      "Série D (Computação de Propósito Geral).",
      "Série F (Otimizada para Computação).",
      "Série M (Otimizada para Memória)."
    ],
    answer: 0,
    explanation: "As máquinas virtuais da série B (burstable) são ideais para cargas de trabalho que não precisam do desempenho total contínuo da CPU. Quando a VM opera abaixo da sua linha de base (baseline), ela acumula créditos de CPU. Quando ocorre um pico de processamento, a VM utiliza esses créditos acumulados para atingir até 100% da capacidade de CPU sem custo adicional."
  },
  {
    id: 123,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa configurar atualizações automáticas de sistema operacional em um Conjunto de Dimensionamento de Máquinas Virtuais (VMSS) do Azure para que novas imagens de plataforma com patches de segurança sejam aplicadas periodicamente. A atualização deve atualizar as instâncias em lotes graduais, garantindo que o serviço web permaneça sempre online e que instâncias problemáticas não continuem a ser propagadas. Qual modo de atualização de imagem de SO do VMSS você deve configurar?",
    options: [
      "Atualizações Automáticas de Imagem de SO (Automatic OS Image Upgrades) com Modo de Atualização Rolante (Rolling Upgrade).",
      "Modo Manual com scripts agendados no Cron.",
      "Substituição Imediata de Todas as Instâncias (Simultaneous Reimage).",
      "Atualização Desativada permanente."
    ],
    answer: 0,
    explanation: "O recurso 'Automatic OS Image Upgrades' com política de atualização contínua (Rolling Upgrades) monitora a publicação de novas imagens de SO pelo fabricante. Quando uma atualização é disponibilizada, o VMSS atualiza as instâncias em lotes controlados (rolantes), verificando a integridade das instâncias atualizadas por meio das sondas do balanceador de carga antes de avançar para o próximo lote."
  },
  {
    id: 124,
    domain: 3,
    domainName: "Computação",
    question: "Você tem um aplicativo Web hospedado no Azure App Service com o plano Standard. Você deseja vincular um domínio personalizado chamado 'app.contoso.com' ao aplicativo web. Antes de vincular o domínio no portal do Azure, você precisa validar a propriedade do domínio no seu provedor de DNS público. Qual registro DNS você deve criar para comprovar a propriedade com validação de ID de aplicativo?",
    options: [
      "Um registro TXT com o nome 'asuid.app.contoso.com' contendo o ID de Verificação de Domínio Personalizado (Custom Domain Verification ID) fornecido pelo App Service.",
      "Um registro MX apontando para smtp.azure.com.",
      "Um registro NS delegando o domínio inteiro para a AWS.",
      "Um registro PTR apontando para o IP privado da sub-rede."
    ],
    answer: 0,
    explanation: "Para validar a propriedade de um domínio personalizado no Azure App Service sem tempo de inatividade, a Microsoft exige a criação de um registro TXT com o prefixo 'asuid.<subdominio>' contendo o identificador de verificação exclusivo da instância do App Service. Isso comprova que você controla o DNS do domínio antes de configurar o roteamento de tráfego via CNAME."
  },
  {
    id: 125,
    domain: 3,
    domainName: "Computação",
    question: "Uma aplicação corporativa em Node.js no Azure App Service precisa se conectar a um banco de dados Azure SQL. As diretrizes de segurança da empresa proíbem expressamente armazenar nomes de usuário e senhas no código-fonte, em variáveis de ambiente ou em arquivos de configuração. Como a aplicação deve autenticar-se no Azure SQL?",
    options: [
      "Habilitar uma Identidade Gerenciada Atribuída pelo Sistema (System-assigned Managed Identity) no App Service e conceder permissões à identidade no banco de dados Azure SQL.",
      "Armazenar a senha do banco de dados em um compartilhamento de arquivos aberto.",
      "Configurar a autenticação básica no servidor web com credenciais de administrador local.",
      "Conectar a aplicação ao banco de dados via chave pré-compartilhada WPA2."
    ],
    answer: 0,
    explanation: "Identidades Gerenciadas (Managed Identities) para recursos do Azure fornecem ao aplicativo do App Service uma identidade gerenciada automaticamente no Microsoft Entra ID. A aplicação pode solicitar tokens do Entra ID diretamente pela infraestrutura da plataforma para se autenticar no Banco de Dados SQL do Azure sem precisar manipular ou armazenar credenciais no código."
  },
  {
    id: 126,
    domain: 3,
    domainName: "Computação",
    question: "Qual é a diferença fundamental no Azure App Service entre 'Scale Up' (Escalar Verticalmente) e 'Scale Out' (Escalar Horizontalmente)?",
    options: [
      "'Scale Up' altera o plano de serviço para um nível de preço superior com mais CPU, memória RAM e recursos dedicados; 'Scale Out' aumenta a quantidade de instâncias de máquinas virtuais idênticas que executam a aplicação.",
      "'Scale Up' adiciona discos de dados; 'Scale Out' move a aplicação para outra região.",
      "'Scale Up' reinicia o aplicativo; 'Scale Out' altera a versão do PHP.",
      "'Scale Up' duplica o custo mensal obrigatoriamente; 'Scale Out' é totalmente gratuito."
    ],
    answer: 0,
    explanation: "Na terminologia do Azure App Service, 'Scale Up' refere-se ao redimensionamento de hardware (escalabilidade vertical), mudando para um nível com mais vCPUs, RAM e recursos como slots de implantação. 'Scale Out' refere-se ao aumento do número de instâncias de computação (escalabilidade horizontal), distribuindo a carga de requisições por múltiplos nós de trabalho idênticos."
  },
  {
    id: 127,
    domain: 3,
    domainName: "Computação",
    question: "Sua empresa utiliza os Aplicativos de Contêiner do Azure (Azure Container Apps - ACA) para hospedar microsserviços. Você preparou uma nova versão de um contêiner e deseja testá-la em ambiente de produção enviando exatamente 20% do tráfego real de clientes para a nova revisão e mantendo 80% do tráfego na revisão anterior. Como você deve configurar o Azure Container Apps?",
    options: [
      "Configurar o Modo de Múltiplas Revisões (Multiple Revisions Mode) e definir a divisão de tráfego de entrada (Traffic Splitting) como 80% para a revisão antiga e 20% para a nova revisão.",
      "Criar dois balanceadores de carga com portas diferentes.",
      "Instalar o NGINX em uma VM separada para controlar a distribuição.",
      "Configurar uma política de Acesso Condicional com base em porcentagem de usuários."
    ],
    answer: 0,
    explanation: "O Azure Container Apps suporta o 'Modo de Múltiplas Revisões' (Multiple Revisions Mode) com divisão de tráfego integrada (Traffic Splitting). Isso permite executar diferentes versões do contêiner simultaneamente e definir percentuais exatos de encaminhamento de tráfego HTTP para implantações do tipo Blue/Green ou Canary."
  },
  {
    id: 128,
    domain: 3,
    domainName: "Computação",
    question: "Você precisa implantar uma aplicação nas Instâncias de Contêiner do Azure (ACI) que consiste em dois contêineres: um contêiner web principal e um contêiner auxiliar (sidecar) de coleta de logs. Os dois contêineres devem compartilhar a mesma interface de rede, ser acessíveis entre si através do endereço 'localhost' e compartilhar o mesmo ciclo de vida. O que você deve implantar?",
    options: [
      "Um único Grupo de Contêineres (Container Group) contendo a definição dos dois contêineres.",
      "Duas instâncias de contêiner em grupos de recursos separados conectadas via VNet Peering.",
      "Um cluster do Kubernetes (AKS) com 10 nós.",
      "Um Conjunto de Disponibilidade com duas VMs Linux."
    ],
    answer: 0,
    explanation: "Nas Instâncias de Contêiner do Azure (ACI), um 'Grupo de Contêineres' (Container Group) é uma coleção de contêineres programados no mesmo computador host. Eles compartilham um ciclo de vida comum, o mesmo namespace de rede e porta de loopback (localhost) e volumes de armazenamento compartilhados, sendo a implementação nativa do padrão sidecar no ACI."
  },
  {
    id: 129,
    domain: 3,
    domainName: "Computação",
    question: "Você tem um modelo de implantação automatizada que provisiona 10 máquinas virtuais Windows Server. Após a inicialização das VMs, você precisa que um script PowerShell customizado seja baixado e executado automaticamente para instalar funções de servidor e softwares proprietários. Qual extensão de máquina virtual do Azure deve ser adicionada à configuração?",
    options: [
      "Extensão de Script Personalizado (Custom Script Extension).",
      "Agente de Diagnóstico do Windows.",
      "Extensão de Proteção de Ponto de Extremidade da Microsoft.",
      "Extensão de Backup de Banco de Dados."
    ],
    answer: 0,
    explanation: "A 'Extensão de Script Personalizado' (Custom Script Extension) baixa e executa scripts em máquinas virtuais do Azure. Ela é amplamente utilizada para configuração pós-inicialização, instalação de softwares, personalização do sistema operacional e qualquer tarefa de configuração de gerenciamento de carga de trabalho."
  },
  {
    id: 130,
    domain: 3,
    domainName: "Computação",
    question: "Ao criar instantâneos (snapshots) de discos gerenciados de máquinas virtuais do Azure para fins de contingência e backup, qual é a principal vantagem de escolher um 'Instantâneo Incremental' (Incremental Snapshot) em comparação com um 'Instantâneo Completo' (Full Snapshot)?",
    options: [
      "Instantâneos incrementais gravam apenas os blocos que foram alterados desde o último snapshot, consumindo menos espaço em disco e com custo de armazenamento significativamente menor.",
      "Instantâneos incrementais não exigem que a VM seja desligada nunca.",
      "Instantâneos incrementais são salvos obrigatoriamente em servidores locais.",
      "Instantâneos incrementais aumentam o IOPS da máquina virtual em 50%."
    ],
    answer: 0,
    explanation: "Instantâneos incrementais de discos gerenciados do Azure copiam apenas os blocos de dados delta que foram modificados desde o instantâneo mais recente. Por serem diferenciais, ocupam muito menos espaço no armazenamento de backup e são cobrados por uma taxa de armazenamento de blocos inferior à de snapshots completos independentes."
  },
  {
    id: 131,
    domain: 3,
    domainName: "Computação",
    question: "Você gerencia um aplicativo crítico no Azure App Service. Você precisa garantir que, durante um evento de alta demanda, quando a carga de CPU ultrapassar 80%, a plataforma aumente automaticamente o número de instâncias de 2 para até 10, e que, quando a carga de CPU diminuir para menos de 30%, a plataforma reduza gradualmente para 2 instâncias. Qual recurso você deve configurar no plano do App Service?",
    options: [
      "Regras de Dimensionamento Automático (Autoscale Rules) no painel Escalar Horizontalmente (Scale Out).",
      "Slots de Implantação com troca automática.",
      "Redimensionamento Manual no painel Escalar Verticalmente (Scale Up).",
      "Ponto de Extremidade de Serviço com controle de fluxo."
    ],
    answer: 0,
    explanation: "As regras de Dimensionamento Automático (Autoscale) do Azure Monitor integradas ao App Service permitem configurar condições de escala métrica (scale-out e scale-in). Define-se o número mínimo (2) e máximo (10) de instâncias e as regras métricas baseadas no uso médio de CPU para reagir automaticamente à flutuação de tráfego."
  },

  // =========================================================================
  // DOMÍNIO 4: CONFIGURAR E GERENCIAR REDE VIRTUAL (15-20% -> 10 Qs)
  // =========================================================================
  {
    id: 132,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem uma rede virtual chamada VNet1. Você precisa criar uma sub-rede para hospedar serviços do Azure Container Instances (ACI) ou Azure App Service VNet Integration. Ao criar a sub-rede, você configura a propriedade 'Delegação de Sub-rede' (Subnet Delegation) para 'Microsoft.ContainerInstance/containerGroups'. O que essa configuração de delegação causa na sub-rede?",
    options: [
      "Concede ao serviço especificado permissões dedicadas para gerenciar a sub-rede e restringe a sub-rede para que apenas recursos daquele tipo de serviço possam ser implantados nela.",
      "Desativa o firewall de rede e permite conexões sem autenticação.",
      "Transforma a sub-rede em uma rede pública exposta diretamente à internet.",
      "Bloqueia qualquer tipo de tráfego de saída das VMs da rede."
    ],
    answer: 0,
    explanation: "A 'Delegação de Sub-rede' (Subnet Delegation) atribui permissões explícitas a um serviço PaaS gerenciado do Azure para provisionar interfaces de rede e gerenciar o endereçamento daquela sub-rede. Como consequência, somente instâncias daquele serviço delegado podem ser provisionadas nessa sub-rede, impedindo a criação concomitante de máquinas virtuais convencionais."
  },
  {
    id: 133,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Duas redes virtuais, VNet1 e VNet2, estão conectadas com sucesso via VNet Peering. Devido à expansão da empresa, você adiciona um novo espaço de endereçamento IP (novo prefixo CIDR) à VNet1. Os administradores percebem que as VMs na VNet2 não conseguem se comunicar com os novos endereços da VNet1. O que deve ser feito para propagar o novo espaço de endereçamento entre as redes?",
    options: [
      "Executar a operação de Sincronização (Sync) no emparelhamento de redes virtuais da VNet1 e da VNet2.",
      "Excluir e recriar as duas redes virtuais.",
      "Reiniciar todas as máquinas virtuais em ambas as VNets.",
      "Instalar o protocolo RIPv2 nos adaptadores de rede."
    ],
    answer: 0,
    explanation: "Quando um novo espaço de endereço IP é adicionado a uma rede virtual que já possui VNet Peering ativo, o emparelhamento entra no estado que requer sincronização. Para que o novo espaço de endereçamento passe a ser roteado, é necessário acionar a operação de sincronização ('Sync') no emparelhamento da rede virtual para atualizar as rotas de sistema de forma transparente e sem interrupção."
  },
  {
    id: 134,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem um Grupo de Segurança de Rede (NSG) com as seguintes regras de entrada (Inbound):\n- Regra 100: Prioridade 100 | Porta 80 | Ação: Deny\n- Regra 200: Prioridade 200 | Porta 80 | Ação: Allow\n- Regra Padrão 65000: Prioridade 65000 | AllowVNetInBound | Ação: Allow\nQuando uma solicitação HTTP na porta 80 chega a uma máquina virtual associada a este NSG, o que acontece?",
    options: [
      "A conexão é bloqueada (Deny) porque a Regra 100 tem prioridade numérica mais baixa e é avaliada primeiro.",
      "A conexão é permitida (Allow) porque a Regra 200 substitui a Regra 100.",
      "A conexão é permitida pela regra 65000.",
      "A solicitação entra em loop de roteamento indefinido."
    ],
    answer: 0,
    explanation: "No Azure NSG, as regras são processadas em ordem rigorosa de prioridade, onde números menores têm maior precedência (são avaliados primeiro). Assim que uma regra corresponde aos critérios do tráfego (Regra 100 com prioridade 100 e ação Deny), o processamento é interrompido e a ação é aplicada imediatamente, ignorando regras com números de prioridade maiores."
  },
  {
    id: 135,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem um Balanceador de Carga Standard do Azure distribuindo tráfego para um pool de servidores de backend. Você precisa adicionar novas instâncias de servidores que residem em sub-redes e redes virtuais diferentes (emparelhadas) na mesma região. Qual configuração do Pool de Backend do Balanceador de Carga Standard deve ser utilizada?",
    options: [
      "Configuração de pool de backend baseada em Endereço IP (IP-based backend pool).",
      "Configuração de pool de backend baseada em Interface de Rede (NIC-based).",
      "Balanceador de Carga Básico legado.",
      "Sonda de integridade UDP simples."
    ],
    answer: 0,
    explanation: "O Azure Standard Load Balancer suporta pools de back-end configurados com base em 'Endereço IP' (IP-based). Esse modo permite adicionar membros de back-end com base em seus endereços IPv4 privados em qualquer rede virtual conectada (via VNet Peering) na mesma região, superando a limitação antiga que exigia que todas as NICs estivessem na mesma VNet."
  },
  {
    id: 136,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua organização utiliza o Firewall de Aplicativo Web (WAF) no Gateway de Aplicativo do Azure (Application Gateway). Você precisa configurar o WAF para que ele monitore o tráfego em tempo real, registre ameaças como injeção de SQL e Cross-Site Scripting (XSS) nos logs do Log Analytics, mas NÃO bloqueie as solicitações dos clientes enquanto a equipe ajusta possíveis falsos positivos. Qual modo de operação do WAF deve ser selecionado?",
    options: [
      "Modo de Detecção (Detection Mode).",
      "Modo de Prevenção (Prevention Mode).",
      "Modo Desativado (Disabled).",
      "Modo Estrito de Quarentena."
    ],
    answer: 0,
    explanation: "O Azure WAF oferece dois modos de operação: 'Detecção' (Detection), no qual o WAF avalia e registra todas as ameaças detectadas nos logs de diagnóstico sem interferir no tráfego dos clientes (ideal para testes e homologação), e 'Prevenção' (Prevention), no qual as solicitações que violam as regras do OWASP são bloqueadas imediatamente com código HTTP 403."
  },
  {
    id: 137,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Uma empresa parceira (fornecedora de software) hospeda uma aplicação em sua própria assinatura do Azure. Sua empresa precisa consumir esse serviço de backend diretamente de dentro da sua rede virtual corporativa através de um IP privado interno, sem expor os dados à internet pública e sem precisar criar um emparelhamento de VNets (VNet Peering) abrangente entre os dois locatários. Qual tecnologia do Azure atende a esse cenário?",
    options: [
      "Serviço Azure Private Link (Private Link Service com Private Endpoint).",
      "Gateway de VPN Site-to-Site com chave IPsec aberta.",
      "Balanceador de Carga Público com portas flutuantes.",
      "Roteamento de BGP dinâmico."
    ],
    answer: 0,
    explanation: "O Azure Private Link permite que provedores de serviços publiquem seus serviços (hospedados atrás de um Standard Load Balancer interno) como um 'Private Link Service'. O consumidor cria um 'Ponto de Extremidade Privado' (Private Endpoint) em sua própria VNet, permitindo comunicação unidirecional segura sobre o backbone privado da Microsoft sem expor redes completas como ocorre no VNet Peering."
  },
  {
    id: 138,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você precisa configurar uma conexão VPN Ponto a Site (Point-to-Site - P2S) no Gateway de VPN do Azure para permitir que 500 colaboradores móveis conectem seus computadores Windows à rede corporativa na nuvem. A política da empresa exige que a autenticação dos usuários seja feita com suas credenciais corporativas do Microsoft Entra ID com suporte a MFA e Acesso Condicional. Qual tipo de túnel e método de autenticação devem ser selecionados?",
    options: [
      "Tipo de túnel: OpenVPN | Tipo de autenticação: Autenticação do Microsoft Entra ID (Azure Active Directory).",
      "Tipo de túnel: SSTP | Tipo de autenticação: Autenticação por Certificado Autoassinado.",
      "Tipo de túnel: IKEv2 | Tipo de autenticação: Chave Pré-Compartilhada (PSK).",
      "Tipo de túnel: PPTP | Tipo de autenticação: Senha de texto sem formatação."
    ],
    answer: 0,
    explanation: "O suporte à autenticação baseada no Microsoft Entra ID para VPN Ponto a Site (P2S) no Azure exige o uso do protocolo de túnel OpenVPN e do cliente oficial 'Azure VPN Client'. Esse modelo permite integrar a autenticação com MFA do Entra ID, políticas de Acesso Condicional e gerenciamento centralizado de identidades corporativas."
  },
  {
    id: 139,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você gerencia uma zona de DNS pública no Azure para o domínio 'contoso.com'. Você precisa criar um registro DNS para o ápice da zona (domínio raiz '@' ou contoso.com) que aponte diretamente para o endereço IP público padrão de um Balanceador de Carga do Azure. O IP público pode ser recriado no futuro. Qual tipo de registro DNS deve ser criado no Azure DNS?",
    options: [
      "Um Conjunto de Registros do tipo Alias (Alias Record Set) do tipo A apontando para o recurso do Endereço IP Público do Azure.",
      "Um registro CNAME para a raiz do domínio '@'.",
      "Um registro TXT com o ID do recurso ARM.",
      "Um registro PTR apontando para o gateway de aplicativo."
    ],
    answer: 0,
    explanation: "O padrão DNS da internet (RFC 1034) proíbe a criação de registros CNAME no ápice da zona (raiz de domínio como 'contoso.com'). O Azure DNS resolve essa limitação por meio de 'Registros de Alias' (Alias Records), permitindo que um registro do tipo A no ápice aponte diretamente para um recurso do Azure (como um Endereço IP Público ou perfil do Front Door), atualizando automaticamente o IP caso o recurso mude."
  },
  {
    id: 140,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você precisa auditar e visualizar fluxos de tráfego de rede permitidos e negados nos Grupos de Segurança de Rede (NSGs) de todas as redes virtuais da empresa. Você deseja obter relatórios gráficos no portal exibindo os principais IPs de origem com tráfego malicioso e portas mais utilizadas. Quais DOIS recursos você deve configurar?",
    options: [
      "Logs de Fluxo de NSG (NSG Flow Logs) e Análise de Tráfego (Traffic Analytics) no Network Watcher com envio para o Log Analytics.",
      "Captura de Pacotes local e Wireshark.",
      "Tabela de Rotas Definidas pelo Usuário com rota para 0.0.0.0/0.",
      "Agente de Diagnóstico Clássico do Windows."
    ],
    answer: 0,
    explanation: "Os 'Logs de Fluxo de NSG' (NSG Flow Logs) do Network Watcher registram informações de 5 tuplas sobre o tráfego IP que atravessa os NSGs. Ao habilitar o recurso 'Análise de Tráfego' (Traffic Analytics), esses logs são processados e enriquecidos com inteligência de ameaças no Azure Log Analytics, gerando painéis visuais interativos sobre consumo, fluxos e segurança de rede."
  },
  {
    id: 141,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua empresa possui dois firewalls virtuais de alta disponibilidade (NVAs) em uma rede virtual que utilizam o protocolo BGP para trocar tabelas de rotas dinâmicas com outros roteadores. Você deseja eliminar a necessidade de criar e atualizar manualmente tabelas de rotas definidas pelo usuário (UDR) na sub-rede sempre que novas rotas forem aprendidas pelos firewalls. Qual serviço gerenciado do Azure você deve implantar?",
    options: [
      "Servidor de Rota do Azure (Azure Route Server).",
      "Gateway NAT do Azure.",
      "Balanceador de Carga Básico.",
      "Azure Bastion Standard."
    ],
    answer: 0,
    explanation: "O Azure Route Server simplifica o roteamento dinâmico entre seus dispositivos virtuais de rede (NVAs) e a rede virtual do Azure. Ele estabelece uma sessão de emparelhamento BGP diretamente com os NVAs e programa automaticamente as rotas aprendidas no roteador de malha da rede virtual do Azure, eliminando a sobrecarga de gerenciar UDRs estáticas."
  },

  // =========================================================================
  // DOMÍNIO 5: MONITORAR E MANTER RECURSOS DO AZURE (10-15% -> 9 Qs)
  // =========================================================================
  {
    id: 142,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você gerencia o monitoramento de uma API de comércio eletrônico no Azure Monitor. O volume de requisições varia drasticamente dependendo do dia da semana e do horário comercial. Você precisa configurar um alerta que detecte anomalias repentinas de tráfego (quedas bruscas ou picos inesperados) sem precisar fixar limites estáticos numéricos de limite de requisições. Qual tipo de limite você deve selecionar na regra de alerta métrico?",
    options: [
      "Limites Dinâmicos (Dynamic Thresholds) baseados em algoritmos de Machine Learning.",
      "Limites Estáticos Simples (Static Thresholds).",
      "Filtro de contagem de logs estáticos.",
      "Alerta de auditoria do Service Health."
    ],
    answer: 0,
    explanation: "Os 'Limites Dinâmicos' (Dynamic Thresholds) do Azure Monitor utilizam algoritmos avançados de aprendizado de máquina para analisar séries temporais de dados históricos de métricas. O sistema calcula automaticamente padrões de sazonalidade (horária, diária e semanal) e ajusta a faixa aceitável de comportamento normal, alertando quando os valores desviam significativamente do padrão sem limites estáticos fixos."
  },
  {
    id: 143,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você tem 100 máquinas virtuais monitoradas pelo Agente do Azure Monitor conectadas a um espaço de trabalho do Log Analytics. Você precisa criar uma regra de alerta que envie um e-mail de emergência caso qualquer uma das máquinas virtuais pare de enviar o sinal de heartbeat para o Log Analytics por mais de 15 minutos (indicando parada do SO ou falha no agente). Qual consulta em KQL deve ser a base desse alerta?",
    options: [
      "Heartbeat | summarize LastCall = max(TimeGenerated) by Computer | where LastCall < ago(15m)",
      "AzureActivity | where OperationName == 'Stop VM'",
      "Perf | where CounterName == 'Available MBytes'",
      "Event | take 1"
    ],
    answer: 0,
    explanation: "A tabela 'Heartbeat' armazena sinais periódicos de presença enviados pelos agentes das VMs. Ao calcular a hora da última ocorrência de cada computador ('| summarize LastCall = max(TimeGenerated) by Computer') e filtrar aqueles cujo último sinal foi anterior a 15 minutos atrás ('| where LastCall < ago(15m)'), a consulta identifica com precisão as VMs que deixaram de se comunicar."
  },
  {
    id: 144,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Sua organização precisa transmitir logs de eventos e métricas de desempenho coletados no Log Analytics continuamente para uma ferramenta externa de gerenciamento de eventos de segurança (SIEM) localizada em um data center local. A solução deve exportar os dados em tempo real conforme são ingeridos. Qual funcionalidade do Log Analytics você deve configurar?",
    options: [
      "Exportação de Dados do Espaço de Trabalho do Log Analytics (Log Analytics Workspace Data Export) para Hubs de Eventos do Azure (Azure Event Hubs).",
      "Executar o comando 'azcopy copy' manualmente a cada 60 minutos.",
      "Imprimir os relatórios em PDF semanalmente.",
      "Criar uma pasta compartilhada no Azure Files com sincronização DFS."
    ],
    answer: 0,
    explanation: "A funcionalidade de 'Exportação de Dados do Espaço de Trabalho' (Data Export) do Azure Log Analytics permite transmitir dados de tabelas selecionadas de forma contínua e em tempo real para Hubs de Eventos do Azure (Event Hubs) ou Contas de Armazenamento, permitindo a ingestão automatizada por sistemas SIEM/SOAR de terceiros sem sobrecarga de consultas manuais."
  },
  {
    id: 145,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "No ecossistema do Azure Backup, você precisa distinguir quando utilizar um 'Cofre dos Serviços de Recuperação' (Recovery Services Vault) versus um 'Cofre de Backup' (Backup Vault). Qual das seguintes cargas de trabalho é suportada exclusivamente pelo Cofre dos Serviços de Recuperação?",
    options: [
      "Máquinas Virtuais do Azure (Azure VMs IaaS), Arquivos do Azure (Azure Files) e SQL Server em VMs do Azure.",
      "Armazenamento de Blobs do Azure (Blob Operational Backup).",
      "Discos Gerenciados do Azure (Azure Disks Backup).",
      "Servidores Flexíveis do Banco de Dados do Azure para PostgreSQL."
    ],
    answer: 0,
    explanation: "O 'Cofre dos Serviços de Recuperação' (Recovery Services Vault) é o modelo tradicional e consolidado que dá suporte a Máquinas Virtuais do Azure, Azure Files, SQL Server em VMs e cargas de trabalho locais via agente MARS/MABS. O 'Cofre de Backup' (Backup Vault) é a arquitetura mais recente destinada a cargas específicas, como backup operacional de Blobs, Discos Gerenciados isolados e Banco de Dados PostgreSQL."
  },
  {
    id: 146,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Para se proteger contra ameaças internas (como administradores desonestos) e ataques de ransomware, sua diretoria exige que operações críticas de backup — como desativar a Exclusão Suave (Soft Delete) ou excluir políticas de backup do cofre — exijam aprovação formal obrigatória de um oficial de segurança independente. Qual recurso do Azure Backup implementa essa autorização em duas etapas?",
    options: [
      "Autorização de Vários Usuários (Multi-User Authorization - MUA) com o Azure Resource Guard.",
      "Bloqueio de recursos CanNotDelete no grupo de recursos.",
      "PIN gerado pelo suporte da Microsoft por chamada telefônica.",
      "Autenticação de passagem via Kerberos."
    ],
    answer: 0,
    explanation: "A Autorização de Vários Usuários (Multi-User Authorization - MUA) para o Azure Backup utiliza o recurso 'Resource Guard'. O Resource Guard pode ser provisionado em uma assinatura diferente ou até em um locatário diferente administrado pelo oficial de segurança. Sempre que uma operação destrutiva no cofre é solicitada, o Azure exige uma autorização explícita no Resource Guard para liberar a ação."
  },
  {
    id: 147,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Uma aplicação Web no Azure App Service apresenta lentidão intermitente. Os desenvolvedores precisam inspecionar o rastreamento distribuído (Distributed Tracing), visualizar o mapa de dependências de aplicativos para identificar gargalos em consultas de banco de dados e observar exceções de código em tempo real. Qual ferramenta do Azure Monitor deve ser vinculada à aplicação?",
    options: [
      "Application Insights.",
      "Observador de Rede (Network Watcher).",
      "Azure Cost Management.",
      "Cofre dos Serviços de Recuperação."
    ],
    answer: 0,
    explanation: "O Application Insights é o recurso de Gerenciamento de Desempenho de Aplicativos (APM) do Azure Monitor. Ele coleta telemetria detalhada de código, tempos de resposta HTTP, mapa de aplicativo (Application Map), métricas em tempo real (Live Metrics) e rastreamento de chamadas e dependências de bancos de dados para identificar gargalos de software."
  },
  {
    id: 148,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você gerencia operações de TI em uma empresa de varejo. Você precisa garantir que a equipe de infraestrutura seja alertada imediatamente por um canal do Microsoft Teams ou Webhook sempre que a Microsoft publicar um aviso de incidente de plataforma que afete o serviço de 'Máquinas Virtuais' especificamente na região 'Sul do Brasil'. Qual ferramenta deve ser configurada para emitir esse alerta?",
    options: [
      "Alertas do Azure Service Health vinculados a um Grupo de Ações (Action Group).",
      "Regra de alerta de métrica de CPU no Azure Monitor.",
      "Relatório de Conformidade do Azure Policy.",
      "Aviso de segurança no Microsoft Defender for Endpoint."
    ],
    answer: 0,
    explanation: "O Azure Service Health permite criar regras de alerta de integridade do serviço ('Service Health Alerts'). Essas regras podem ser filtradas por assinaturas, regiões específicas (ex: Sul do Brasil) e serviços afetados (ex: Máquinas Virtuais), acionando automaticamente um Grupo de Ações (Action Group) com Webhook, Teams, e-mail ou SMS quando incidentes de infraestrutura do Azure ocorrem."
  },
  {
    id: 149,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "O Assistente do Azure (Azure Advisor) exibe recomendações sob a categoria de 'Confiabilidade' (Reliability, anteriormente Alta Disponibilidade). Qual das seguintes alternativas representa uma recomendação de Confiabilidade gerada pelo Azure Advisor?",
    options: [
      "Habilitar a proteção de exclusão suave (Soft Delete) em contas de armazenamento para evitar perda acidental de dados.",
      "Excluir interfaces de rede não conectadas para economizar dinheiro.",
      "Bloquear a porta 22 em todos os grupos de segurança.",
      "Comprar instâncias reservadas de 3 anos."
    ],
    answer: 0,
    explanation: "A categoria de Confiabilidade (Reliability) do Azure Advisor avalia a resiliência e a continuidade dos seus negócios. Recomendações típicas incluem a ativação de Soft Delete em contas de armazenamento e Key Vaults, migração de recursos para Zonas de Disponibilidade e configuração de políticas de backup para máquinas virtuais desprotegidas."
  },
  {
    id: 150,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você precisa solucionar um problema complexo de comunicação de rede em uma máquina virtual Linux que hospeda um servidor web. Você precisa capturar pacotes de rede brutos que entram e saem da interface de rede (NIC) da máquina virtual e salvar a captura em formato '.cap' em uma conta de armazenamento para análise detalhada no Wireshark. Qual ferramenta do Azure Network Watcher você deve utilizar?",
    options: [
      "Captura de Pacotes (Packet Capture).",
      "Próximo Salto (Next Hop).",
      "Verificação de Fluxo de IP (IP Flow Verify).",
      "Diagnóstico de Segurança de NSG."
    ],
    answer: 0,
    explanation: "A ferramenta 'Captura de Pacotes' (Packet Capture) do Azure Network Watcher permite gravar pacotes de rede brutos diretamente na interface de rede de uma máquina virtual. A captura é armazenada como um arquivo com extensão padrão '.cap' ou '.pcap' em uma conta de armazenamento do Azure ou no disco local da VM, permitindo inspeção profunda em ferramentas como o Wireshark."
  }
];
