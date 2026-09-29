import { Question } from '../types';

export const questionsSimulado1: Question[] = [
  // =========================================================================
  // DOMÍNIO 1: GERENCIAR IDENTIDADES E GOVERNANÇA DO AZURE (20-25% -> 11 Qs)
  // =========================================================================
  {
    id: 1,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem um locatário do Microsoft Entra ID chamado contoso.com que contém 5.000 usuários em filiais regionais. Você precisa delegar permissões para que um administrador de suporte técnico local possa gerenciar contas de usuários e redefinir senhas apenas dos colaboradores da filial de São Paulo. O administrador não deve visualizar nem alterar contas de usuários de outras filiais. A solução deve minimizar os privilégios administrativos. O que você deve criar?",
    options: [
      "Um grupo de segurança com associação dinâmica.",
      "Um grupo de gerenciamento no nível da assinatura.",
      "Uma unidade administrativa que contenha os usuários de São Paulo.",
      "Uma política de Acesso Condicional para a filial de São Paulo."
    ],
    answer: 2,
    explanation: "Unidades Administrativas (Administrative Units) permitem delegar funções administrativas com escopo restrito a um subconjunto de usuários e grupos no Microsoft Entra ID, garantindo que o administrador local gerencie exclusivamente os objetos daquela unidade sem privilégios globais no locatário."
  },
  {
    id: 2,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem uma assinatura Azure que contém 30 máquinas virtuais. Você precisa garantir que nenhuma nova máquina virtual possa ser provisionada na assinatura a menos que contenha uma marca (tag) chamada 'CentroCusto'. O que você deve usar?",
    options: [
      "Um bloqueio de recurso do tipo ReadOnly no grupo de recursos.",
      "Uma definição do Azure Policy com o efeito Deny atribuída à assinatura.",
      "Um grupo de ações do Azure Monitor.",
      "Uma regra de conformidade do Microsoft Defender for Cloud."
    ],
    answer: 1,
    explanation: "Uma definição do Azure Policy com o efeito 'Deny' avalia as propriedades do recurso no momento da criação pelo ARM. Se a solicitação de criação da VM não contiver a tag obrigatória 'CentroCusto', a operação é bloqueada imediatamente."
  },
  {
    id: 3,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem uma assinatura Azure que contém dois grupos de recursos chamados RG1 e RG2. O RG1 contém uma máquina virtual chamada VM1 e possui um bloqueio de recurso do tipo CanNotDelete. Você precisa mover a VM1 do RG1 para o RG2. O que você deve fazer primeiro?",
    options: [
      "Remover o bloqueio de recurso do RG1.",
      "Desalocar a máquina virtual VM1.",
      "Aplicar um bloqueio do tipo ReadOnly no RG2.",
      "Criar uma nova interface de rede no RG2."
    ],
    answer: 0,
    explanation: "Durante a movimentação de recursos entre grupos de recursos, tanto o grupo de origem quanto o de destino são bloqueados para gravação. Se houver um bloqueio do tipo CanNotDelete no grupo de origem, a operação falhará até que o bloqueio seja removido."
  },
  {
    id: 4,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem um locatário do Microsoft Entra ID que gerencia quatro assinaturas do Azure. Você precisa garantir que todas as assinaturas permitam a implantação de recursos exclusivamente nas regiões Sul do Brasil e Leste dos EUA. A solução deve minimizar o esforço administrativo. O que você deve fazer?",
    options: [
      "Configurar regras de NSG em cada rede virtual de cada assinatura.",
      "Criar um alerta de orçamento no Gerenciamento de Custos para cada assinatura.",
      "Aplicar marcas de localização em todos os grupos de recursos.",
      "Criar um Grupo de Gerenciamento, mover as quatro assinaturas para ele e atribuir uma Azure Policy de locais permitidos no escopo do grupo."
    ],
    answer: 3,
    explanation: "Grupos de Gerenciamento (Management Groups) fornecem um nível de governança acima das assinaturas. Atribuir a política de 'Locais permitidos' no Grupo de Gerenciamento propaga a regra automaticamente por herança para todas as assinaturas filhas com esforço centralizado mínimo."
  },
  {
    id: 5,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem uma assinatura Azure. Você está criando uma nova função personalizada (Custom Role) do Azure RBAC usando a seguinte definição de ações no JSON:\n\n\"Actions\": [\n  \"Microsoft.Storage/storageAccounts/read\",\n  \"Microsoft.Storage/storageAccounts/write\"\n],\n\"NotActions\": []\n\nQuais operações um usuário com essa função pode executar em contas de armazenamento?",
    options: [
      "Apenas ler dados dentro dos contêineres de blobs.",
      "Excluir contas de armazenamento existentes.",
      "Criar e ler propriedades de contas de armazenamento.",
      "Delegar permissões RBAC de armazenamento para outros usuários."
    ],
    answer: 2,
    explanation: "A ação 'Microsoft.Storage/storageAccounts/read' permite exibir as propriedades e configurações da conta de armazenamento, e 'Microsoft.Storage/storageAccounts/write' permite criar e atualizar contas de armazenamento. Exclusões exigem a permissão '/delete', e delegações exigem Microsoft.Authorization."
  },
  {
    id: 6,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem uma assinatura Azure chamada Sub1. Você precisa conceder a um usuário chamado User1 a capacidade de gerenciar o acesso e as atribuições de funções de outros usuários em todos os recursos da Sub1. User1 não deve ter permissão para criar ou excluir máquinas virtuais ou redes virtuais. A solução deve seguir o princípio do privilégio mínimo. Qual função do Azure RBAC você deve atribuir ao User1?",
    options: [
      "Colaborador (Contributor)",
      "Administrador de Acesso do Usuário (User Access Administrator)",
      "Proprietário (Owner)",
      "Leitor (Reader)"
    ],
    answer: 1,
    explanation: "A função nativa 'Administrador de Acesso do Usuário' (User Access Administrator) concede permissão para gerenciar as atribuições de funções RBAC dos usuários aos recursos do Azure sem conceder direitos de gerenciamento sobre os recursos técnicos em si (como criar ou excluir VMs)."
  },
  {
    id: 7,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem um locatário do Microsoft Entra ID. Você precisa garantir que o acesso de usuários convidados externos a aplicativos confidenciais seja revisado automaticamente a cada 90 dias, e que o acesso seja revogado caso o gestor não confirme a necessidade de permanência. O que você deve configurar?",
    options: [
      "Revisões de acesso (Access Reviews) no Microsoft Entra Identity Governance.",
      "Uma regra de associação dinâmica em grupos de segurança.",
      "Uma política de senha no Microsoft Entra Connect.",
      "Uma política de Acesso Condicional com MFA obrigatório."
    ],
    answer: 0,
    explanation: "As Revisões de Acesso (Access Reviews) do Microsoft Entra ID permitem configurar processos periódicos e automatizados para auditar e confirmar se colaboradores internos ou convidados externos ainda necessitam de acesso a grupos ou aplicativos, aplicando revogação automática se não houver resposta."
  },
  {
    id: 8,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem um grupo de recursos chamado RG-PROD que contém máquinas virtuais críticas. Você precisa garantir que nenhum usuário, incluindo membros da função Proprietário (Owner), possa excluir os recursos do RG-PROD acidentalmente. Usuários autorizados ainda devem conseguir iniciar, parar e modificar as configurações das máquinas virtuais. O que você deve aplicar ao RG-PROD?",
    options: [
      "Uma marca (tag) com o nome 'Status' e valor 'Producao'.",
      "Uma política de Acesso Condicional restringindo a autenticação.",
      "Um bloqueio de recurso do tipo ReadOnly.",
      "Um bloqueio de recurso do tipo CanNotDelete."
    ],
    answer: 3,
    explanation: "Um bloqueio de recurso do tipo 'CanNotDelete' permite que usuários autorizados leiam e modifiquem as configurações do recurso, mas impede a exclusão por qualquer usuário (incluindo Proprietários) até que o bloqueio seja explicitamente removido."
  },
  {
    id: 9,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você precisa criar um script do Azure PowerShell que liste todas as assinaturas do Azure ativas vinculadas à sua conta autenticada no locatário. Qual cmdlet você deve executar?",
    options: [
      "Get-AzSubscription",
      "Get-AzResourceGroup",
      "Set-AzContext",
      "Get-AzTenant"
    ],
    answer: 0,
    explanation: "O cmdlet 'Get-AzSubscription' lista todas as assinaturas do Azure disponíveis e associadas à conta autenticada na sessão atual do PowerShell."
  },
  {
    id: 10,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você tem uma assinatura Azure que contém um grupo de recursos chamado RG1. Você precisa conceder a um usuário chamado User1 a capacidade de criar, reiniciar, redimensionar e excluir máquinas virtuais no RG1. O User1 não deve ter permissão para conceder acesso ao RG1 a outros usuários. A solução deve usar o princípio de privilégios mínimos. Qual função você deve atribuir ao User1 no escopo do RG1?",
    options: [
      "Proprietário (Owner)",
      "Leitor (Reader)",
      "Colaborador (Contributor)",
      "Operador de Computação"
    ],
    answer: 2,
    explanation: "A função nativa 'Colaborador' (Contributor) concede direitos totais para gerenciar todos os tipos de recursos técnicos do Azure no escopo (incluindo criar e excluir VMs), mas não permite conceder nem delegar permissões de acesso a outras pessoas."
  },
  {
    id: 11,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa deseja implementar autenticação multifator (MFA) obrigatória automaticamente apenas quando o sistema detectar que uma tentativa de entrada de usuário possui um risco médio ou alto calculado por Machine Learning (como detecção de viagem impossível). Qual recurso do Microsoft Entra ID você deve implementar?",
    options: [
      "Padrões de segurança (Security Defaults).",
      "Políticas de risco de entrada do Microsoft Entra ID Protection.",
      "Redefinição de senha de autoatendimento (SSPR).",
      "Unidades administrativas com MFA forçado."
    ],
    answer: 1,
    explanation: "O Microsoft Entra ID Protection (que exige licenciamento P2) analisa sinais de telemetria em tempo real e calcula o risco do usuário e o risco de entrada (ex: IP anônimo, viagem impossível), permitindo acionar políticas de Acesso Condicional que exigem MFA ou redefinição de senha com base no risco."
  },

  // =========================================================================
  // DOMÍNIO 2: IMPLEMENTAR E GERENCIAR O ARMAZENAMENTO (15-20% -> 9 Qs)
  // =========================================================================
  {
    id: 12,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem uma conta de armazenamento chamada storage1 que contém um contêiner de blobs. Os blobs são acessados com alta frequência durante os primeiros 30 dias após a criação. Após 30 dias, os dados raramente são acessados, mas devem permanecer disponíveis imediatamente para leitura. Você precisa reduzir os custos de armazenamento de forma automática. O que você deve configurar?",
    options: [
      "Uma política de replicação de objetos (BOR) para uma conta LRS.",
      "Um alerta de capacidade no Azure Monitor.",
      "Uma regra de gerenciamento de ciclo de vida (Lifecycle Management) para mover os blobs para a camada Cool após 30 dias.",
      "Um script do PowerShell agendado para reidratar os blobs semanalmente."
    ],
    answer: 2,
    explanation: "O Gerenciamento de Ciclo de Vida (Lifecycle Management) permite definir regras automáticas baseadas em regras de tempo decorrido desde a modificação ou criação, movendo blobs da camada Hot para a camada Cool após 30 dias, reduzindo os custos de armazenamento enquanto mantém os dados online."
  },
  {
    id: 13,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua empresa tem um compartilhamento de arquivos do Azure Files chamado share1. Usuários em uma filial local tentam mapear o share1 via protocolo SMB em computadores Windows 11, mas a conexão atinge tempo limite. Você descobre que o provedor de internet local bloqueia a porta TCP 445 na saída para a internet. O que você deve implementar para permitir que os usuários acessem os arquivos sem alterar o provedor de internet?",
    options: [
      "Configurar uma conexão VPN Ponto a Site (P2S) ou implantar o Azure File Sync no servidor local.",
      "Alterar a camada de acesso do compartilhamento de arquivos para Premium.",
      "Habilitar o protocolo NFS 4.1 no compartilhamento de arquivos existente.",
      "Gerar uma chave de acesso SAS com porta 80 liberada."
    ],
    answer: 0,
    explanation: "O protocolo SMB opera na porta TCP 445. Quando o provedor de internet bloqueia a porta 445 na saída para a internet pública, a solução recomendada pela Microsoft é estabelecer uma VPN (P2S ou S2S) para encapsular o tráfego de forma privada ou utilizar o Azure File Sync com cache local."
  },
  {
    id: 14,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem uma conta de armazenamento chamada storage1. Um aplicativo de parceiro externo precisa baixar arquivos de um contêiner específico durante uma janela de 2 horas. Você precisa fornecer acesso ao aplicativo sem compartilhar as chaves de acesso da conta e garantindo que o acesso expire automaticamente após 2 horas. O que você deve gerar?",
    options: [
      "Uma nova chave de acesso primária (Key1).",
      "Uma política de imutabilidade no contêiner.",
      "Um ponto de extremidade de serviço de rede virtual.",
      "Uma Assinatura de Acesso Compartilhado (SAS) de serviço com permissão de leitura e expiração de 2 horas."
    ],
    answer: 3,
    explanation: "Uma Shared Access Signature (SAS) de serviço permite conceder permissões limitadas (como somente leitura) em um contêiner específico, por um período de tempo delimitado (2 horas) e com imposição de HTTPS, sem revelar as chaves da conta de armazenamento."
  },
  {
    id: 15,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você precisa criar uma conta de armazenamento para um sistema financeiro crítico que atenda aos seguintes requisitos:\n- Fornecer resiliência contra a falha de um datacenter inteiro na região primária.\n- Replicar dados de forma assíncrona para uma região geográfica secundária a centenas de quilômetros.\n- Oferecer durabilidade mínima de dados de 16 noves (99,99999999999999%).\nQual tipo de redundância de armazenamento você deve selecionar?",
    options: [
      "GZRS (Armazenamento com redundância de zona geográfica)",
      "LRS (Armazenamento com redundância local)",
      "ZRS (Armazenamento com redundância de zona)",
      "GRS (Armazenamento com redundância geográfica)"
    ],
    answer: 0,
    explanation: "O GZRS (Geo-Zone-Redundant Storage) combina os recursos do ZRS e do GRS. Ele grava 3 cópias síncronas entre três Zonas de Disponibilidade na região primária (protegendo contra desastres no datacenter) e replica de forma assíncrona para a região secundária, fornecendo 16 noves de durabilidade."
  },
  {
    id: 16,
    domain: 2,
    domainName: "Armazenamento",
    question: "Sua empresa possui servidores de arquivos locais em quatro filiais. Você precisa centralizar os compartilhamentos de arquivos na nuvem usando o Azure Files, garantindo que os usuários locais continuem acessando arquivos frequentemente usados em alta velocidade através de um cache local, mesmo se a conexão com a internet oscilar. Qual serviço você deve implementar?",
    options: [
      "Replicação de objetos de blob (BOR)",
      "Importação/Exportação do Azure",
      "Azure File Sync com Nuvem em Camadas (Cloud Tiering)",
      "Gerenciador de Armazenamento do Azure"
    ],
    answer: 2,
    explanation: "O Azure File Sync centraliza os compartilhamentos de arquivos da organização no Azure Files, enquanto mantém o desempenho de um servidor de arquivos local. O recurso Cloud Tiering mantém arquivos frequentemente acessados no servidor local e arquiva arquivos pouco usados na nuvem."
  },
  {
    id: 17,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem um contêiner de armazenamento de blobs que armazena registros médicos. Você precisa garantir que os registros não possam ser excluídos nem modificados por ninguém (incluindo Administradores Globais) durante um período de 365 dias para atender a uma exigência legal de conformidade regulatória. O que você deve configurar?",
    options: [
      "Um bloqueio de recurso do tipo ReadOnly no grupo de recursos.",
      "Uma política de armazenamento imutável baseada em tempo no nível do contêiner.",
      "Uma regra de gerenciamento de ciclo de vida para mover para Archive.",
      "A criptografia de serviço de armazenamento com chaves gerenciadas pela Microsoft."
    ],
    answer: 1,
    explanation: "O Armazenamento Imutável para o Azure Blob Storage permite armazenar dados no formato WORM (Write Once, Read Many). Uma política de retenção baseada em tempo bloqueada impede que os blobs sejam alterados ou excluídos durante o período estipulado, inclusive por administradores."
  },
  {
    id: 18,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você precisa migrar 2 TB de arquivos de imagem de um servidor local Windows Server para um contêiner do Azure Blob Storage. A solução deve transferir os arquivos pela rede com velocidade máxima aproveitando o upload paralelo e permitindo retomar transferências interrompidas. Qual ferramenta você deve utilizar?",
    options: [
      "AzCopy",
      "Portal do Azure via upload do navegador",
      "Explorador de Arquivos do Windows via WebDAV",
      "Agente MARS do Azure Backup"
    ],
    answer: 0,
    explanation: "O AzCopy é o utilitário oficial de linha de comando da Microsoft otimizado para transferir grandes volumes de dados para o Azure Storage com paralelismo de alta velocidade, suporte a sincronização e retomada de operações interrompidas."
  },
  {
    id: 19,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem uma rede virtual chamada VNet1 que contém uma sub-rede chamada Subnet1. Você tem uma conta de armazenamento chamada storage1. Você precisa garantir que as máquinas virtuais na Subnet1 possam acessar o storage1 diretamente pela rede de fibra óptica interna da Microsoft, bloqueando o acesso público de endereços IP da internet. O que você deve configurar?",
    options: [
      "Uma tabela de rotas com próximo salto do tipo Internet.",
      "Um grupo de segurança de rede associado à VNet1 inteira.",
      "A replicação geográfica de acesso de leitura (RA-GRS).",
      "Um ponto de extremidade de serviço (Service Endpoint) para Microsoft.Storage na Subnet1 e configurar o firewall do storage1."
    ],
    answer: 3,
    explanation: "Configurar um Service Endpoint para 'Microsoft.Storage' na Subnet1 estende o espaço de endereçamento IP privado da sub-rede para o serviço de armazenamento pela rede de backbone da Microsoft. Combinado com o firewall da conta de armazenamento configurado para 'Redes selecionadas', o acesso público é bloqueado."
  },
  {
    id: 20,
    domain: 2,
    domainName: "Armazenamento",
    question: "Você tem um arquivo de backup crítico de 5 GB armazenado na camada de Arquivo (Archive) de uma conta de armazenamento. Você precisa recuperar esse arquivo e disponibilizá-lo para leitura com urgência em menos de uma hora. O que você deve fazer?",
    options: [
      "Executar o failover manual da conta de armazenamento.",
      "Reidratar o blob definindo a camada como Hot com prioridade de reidratação Alta (High Priority).",
      "Alterar a redundância da conta de armazenamento de LRS para GRS.",
      "Baixar o blob diretamente usando o Gerenciador de Armazenamento do Azure."
    ],
    answer: 1,
    explanation: "Blobs na camada Archive não podem ser lidos diretamente. Para disponibilizá-los com urgência (< 1 hora para blobs menores que 10 GB), deve-se iniciar a reidratação para a camada Hot especificando a prioridade de reidratação Alta (High Priority)."
  },

  // =========================================================================
  // DOMÍNIO 3: IMPLANTAR E GERENCIAR RECURSOS DE COMPUTAÇÃO (20-25% -> 11 Qs)
  // =========================================================================
  {
    id: 21,
    domain: 3,
    domainName: "Computação",
    question: "Você planeja implantar seis máquinas virtuais Azure na mesma região em um Conjunto de Disponibilidade (Availability Set). O conjunto de disponibilidade está configurado com 3 Domínios de Falha (Fault Domains) e 5 Domínios de Atualização (Update Domains). Qual é o número máximo de máquinas virtuais que compartilharão o mesmo hardware físico de energia e rede?",
    options: [
      "2",
      "3",
      "5",
      "6"
    ],
    answer: 0,
    explanation: "As 6 máquinas virtuais são distribuídas igualmente entre os 3 Domínios de Falha (FD 0, FD 1, FD 2). Portanto, 6 / 3 = 2 máquinas virtuais residirão no mesmo Domínio de Falha e compartilharão o mesmo rack/hardware físico."
  },
  {
    id: 22,
    domain: 3,
    domainName: "Computação",
    question: "Sua equipe de desenvolvedores precisa executar uma tarefa de processamento em lote diária que leva 15 minutos em um contêiner Linux Docker. A solução deve iniciar o contêiner sob demanda em segundos, sem a necessidade de provisionar máquinas virtuais, gerenciar servidores ou configurar clusters de orquestração. Qual serviço você deve escolher?",
    options: [
      "Serviço de Kubernetes do Azure (AKS)",
      "Máquinas Virtuais do Azure",
      "Instâncias de Contêiner do Azure (ACI)",
      "Conjuntos de Dimensionamento de Máquinas Virtuais (VMSS)"
    ],
    answer: 2,
    explanation: "O Azure Container Instances (ACI) é o serviço de contêineres sem servidor (serverless) do Azure. Ele executa contêineres individuais sob demanda em segundos sem exigir o provisionamento de VMs ou gerenciamento de clusters."
  },
  {
    id: 23,
    domain: 3,
    domainName: "Computação",
    question: "Você tem um aplicativo web sem estado que experimenta picos imprevistos de tráfego de usuários. Você precisa configurar uma solução que aumente automaticamente o número de instâncias de máquinas virtuais idênticas quando o uso médio de CPU ultrapassar 75% e reduza o número de instâncias quando a demanda diminuir. O que você deve implantar?",
    options: [
      "Um Conjunto de Disponibilidade com 3 domínios de falha.",
      "Uma única máquina virtual com disco Ultra SSD.",
      "Duas máquinas virtuais em Zonas de Disponibilidade distintas.",
      "Um Conjunto de Dimensionamento de Máquinas Virtuais (VMSS) com regras de Dimensionamento Automático (Autoscale)."
    ],
    answer: 3,
    explanation: "Os Conjuntos de Dimensionamento de Máquinas Virtuais (VMSS) permitem implantar e gerenciar um grupo de VMs idênticas com suporte nativo a regras de Dimensionamento Automático (Autoscale) baseadas em métricas de desempenho (como % de CPU)."
  },
  {
    id: 24,
    domain: 3,
    domainName: "Computação",
    question: "Você tem uma máquina virtual Azure chamada VM1 que executa Ubuntu Linux. Você precisa garantir que o disco do sistema operacional e todos os discos de dados conectados à VM1 sejam criptografados em repouso usando o recurso nativo DM-Crypt com chaves armazenadas no Azure Key Vault. Qual solução você deve implementar?",
    options: [
      "Criptografia do Lado do Servidor padrão com chaves gerenciadas pela plataforma.",
      "Azure Disk Encryption (ADE).",
      "Bloqueio de recurso do tipo ReadOnly.",
      "Criptografia de ponta a ponta com certificados autoassinados no Linux."
    ],
    answer: 1,
    explanation: "O Azure Disk Encryption (ADE) utiliza o BitLocker no Windows e o DM-Crypt no Linux para fornecer criptografia de volume completo no sistema operacional e discos de dados, integrando-se com o Azure Key Vault para custódia e controle das chaves."
  },
  {
    id: 25,
    domain: 3,
    domainName: "Computação",
    question: "Você tem um aplicativo Web hospedado no Serviço de Aplicativo do Azure (App Service) usando o plano Standard. Você precisa testar uma nova versão do aplicativo em um ambiente isolado idêntico antes de liberá-la para os clientes finais. A publicação para o ambiente de produção deve ocorrer sem nenhum tempo de inatividade (zero downtime) e permitir retorno imediato à versão anterior caso ocorram falhas. O que você deve utilizar?",
    options: [
      "Um segundo plano de Serviço de Aplicativo na camada Basic.",
      "A duplicação manual de instâncias de máquinas virtuais.",
      "Um Slot de Implantação (Deployment Slot) com a ação de Troca (Swap).",
      "Uma restauração de backup em um novo aplicativo web."
    ],
    answer: 2,
    explanation: "Os Slots de Implantação (Deployment Slots), disponíveis a partir do plano Standard, permitem implantar código em um ambiente de homologação (staging). Ao executar o 'Swap', as instâncias são pré-aquecidas e o tráfego é redirecionado instantaneamente com zero downtime e suporte a rollback imediato."
  },
  {
    id: 26,
    domain: 3,
    domainName: "Computação",
    question: "Você tem um aplicativo Web no Serviço de Aplicativo do Azure chamado webapp1. O webapp1 precisa se conectar a uma instância de banco de dados SQL que está hospedada em uma máquina virtual privada na VNet1. O banco de dados não possui endereço IP público e não pode ser acessado pela internet. O que você deve configurar no webapp1?",
    options: [
      "A Integração de Rede Virtual (VNet Integration).",
      "Um endereço IP público estático no webapp1.",
      "Uma rota UDR na VNet1 apontando para a internet.",
      "A replicação geográfica de dados no App Service."
    ],
    answer: 0,
    explanation: "O recurso de Integração de Rede Virtual (VNet Integration) do Azure App Service permite que o aplicativo web envie tráfego de saída diretamente para recursos com IP privado dentro de uma VNet do Azure, sem expor os recursos à internet."
  },
  {
    id: 27,
    domain: 3,
    domainName: "Computação",
    question: "Você tem uma máquina virtual Azure chamada VM1 que está no estado 'Desalocado' (Stopped/Deallocated). Você precisa iniciar a máquina virtual usando o Azure PowerShell para que ela retome o processamento. Qual cmdlet você deve executar?",
    options: [
      "Restart-AzVM",
      "Start-AzVM",
      "Resume-AzVM",
      "New-AzVM"
    ],
    answer: 1,
    explanation: "O cmdlet 'Start-AzVM' inicia uma máquina virtual parada ou desalocada no Azure. O cmdlet Restart-AzVM é usado apenas para reiniciar uma VM que já está em execução."
  },
  {
    id: 28,
    domain: 3,
    domainName: "Computação",
    question: "Sua empresa planeja implantar uma arquitetura de microsserviços em contêineres Docker que exige orquestração avançada, descoberta de serviços integrada, dimensionamento horizontal automático de pods e gerenciamento de rede corporativa. Você precisa selecionar um serviço gerenciado pelo Azure no qual os nós mestres do plano de controle sejam gratuitos e totalmente administrados pela Microsoft. Qual serviço você deve escolher?",
    options: [
      "Instâncias de Contêiner do Azure (ACI)",
      "Máquinas Virtuais com Docker instalado",
      "Conjuntos de Dimensionamento de Máquinas Virtuais (VMSS)",
      "Serviço de Kubernetes do Azure (AKS)"
    ],
    answer: 3,
    explanation: "O Azure Kubernetes Service (AKS) é a plataforma de orquestração de contêineres corporativa gerenciada pela Microsoft. O plano de controle (master nodes) é fornecido e administrado gratuitamente pelo Azure, e o cliente paga apenas pelas máquinas virtuais que atuam como worker nodes."
  },
  {
    id: 29,
    domain: 3,
    domainName: "Computação",
    question: "Você tem um aplicativo no Serviço de Aplicativo do Azure. O aplicativo precisa acessar um banco de dados local que reside no datacenter corporativo da sua empresa. A política de segurança da sua empresa impede a abertura de portas de entrada no firewall corporativo local e não há VPN configurada. O que você deve usar para estabelecer essa comunicação segura?",
    options: [
      "Acesso Condicional no Entra ID.",
      "Um ponto de extremidade de serviço.",
      "Conexões Híbridas (Hybrid Connections) do Serviço de Aplicativo.",
      "Um gateway de rede virtual com emparelhamento."
    ],
    answer: 2,
    explanation: "As Conexões Híbridas (Hybrid Connections) do Azure App Service utilizam o Azure Relay para criar um túnel de comunicação seguro entre o aplicativo na nuvem e o recurso local on-premises, exigindo apenas conectividade de saída pela porta 443 na rede local."
  },
  {
    id: 30,
    domain: 3,
    domainName: "Computação",
    question: "Você tem uma máquina virtual Azure chamada VM1 com o tamanho Standard_D2s_v3 (2 vCPUs e 8 GB de RAM). A VM1 está apresentando lentidão devido ao aumento no volume de dados. Você precisa dobrar a quantidade de núcleos de CPU e memória RAM para o tamanho Standard_D4s_v3. Qual ação você deve executar?",
    options: [
      "Redimensionar (Resize) a máquina virtual.",
      "Criar uma nova interface de rede.",
      "Adicionar um disco de dados temporário.",
      "Mover a máquina virtual para outra Zona de Disponibilidade."
    ],
    answer: 0,
    explanation: "A operação de Redimensionamento (Resize) altera o tamanho (SKU) da máquina virtual, alocando mais vCPUs, memória RAM e limites de transferência. Se a nova série não estiver disponível no cluster físico atual, a VM deve ser desalocada antes do redimensionamento."
  },
  {
    id: 31,
    domain: 3,
    domainName: "Computação",
    question: "Você tem uma assinatura Azure. Você planeja armazenar imagens de contêiner Docker privadas para uso pela equipe de desenvolvimento em duas regiões: Leste dos EUA e Sul do Brasil. Você precisa garantir que as imagens sejam replicadas automaticamente entre ambas as regiões para minimizar a latência no download das imagens (pull). Qual serviço e SKU você deve implantar?",
    options: [
      "Registro de Contêiner do Azure (ACR) na camada Basic.",
      "Registro de Contêiner do Azure (ACR) na camada Premium com replicação geográfica ativada.",
      "Conta de Armazenamento com replicação LRS.",
      "Instâncias de Contêiner do Azure com pool compartilhado."
    ],
    answer: 1,
    explanation: "A funcionalidade de Replicação Geográfica (Geo-Replication) do Azure Container Registry (ACR) é exclusiva da camada Premium. Ela permite gerenciar um único registro que replica imagens automaticamente entre regiões selecionadas com endpoints locais rápidos."
  },

  // =========================================================================
  // DOMÍNIO 4: CONFIGURAR E GERENCIAR REDES VIRTUAIS (15-20% -> 11 Qs)
  // =========================================================================
  {
    id: 32,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem duas redes virtuais chamadas VNet1 e VNet2 na mesma região do Azure. Você precisa conectar as duas redes para que as máquinas virtuais em ambas se comuniquem usando seus endereços IP privados através do backbone de fibra da Microsoft, com latência mínima e sem passar pela internet pública. O que você deve configurar?",
    options: [
      "Uma conexão VPN Ponto a Site.",
      "Um circuito do ExpressRoute.",
      "Um emparelhamento de rede virtual (VNet Peering).",
      "Um Gateway NAT do Azure."
    ],
    answer: 2,
    explanation: "O VNet Peering conecta redes virtuais diretamente através da infraestrutura de rede privada da Microsoft, proporcionando largura de banda máxima e latência mínima com endereçamento IP privado, sem tráfego na internet e sem exigir gateways."
  },
  {
    id: 33,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem três redes virtuais chamadas VNet-A, VNet-B e VNet-C. Existe um emparelhamento entre VNet-A e VNet-B, e outro emparelhamento entre VNet-B e VNet-C. Não há rotas personalizadas nem firewalls configurados. As máquinas virtuais na VNet-A tentam se comunicar diretamente com as máquinas virtuais na VNet-C. Qual será o resultado da comunicação?",
    options: [
      "A comunicação funcionará automaticamente com balanceamento de carga.",
      "A comunicação falhará porque o emparelhamento de rede virtual não é transitivo por padrão.",
      "A comunicação funcionará se as redes estiverem na mesma região.",
      "A comunicação funcionará somente se os endereços IP forem estáticos."
    ],
    answer: 1,
    explanation: "Por padrão, o VNet Peering NÃO é transitivo. O fato de VNet-A falar com VNet-B e VNet-B falar com VNet-C não permite que VNet-A fale diretamente com VNet-C. Para habilitar essa comunicação, é necessário um peering direto entre A e C ou um roteamento através de um NVA (Firewall) com UDRs."
  },
  {
    id: 34,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem máquinas virtuais Azure que residem em uma sub-rede privada sem endereços IP públicos. Você precisa permitir que os administradores se conectem com segurança às máquinas virtuais via RDP e SSH diretamente através do Portal do Azure em seus navegadores web, sem expor as portas 3389 ou 22 à internet. Qual serviço você deve implantar?",
    options: [
      "Azure Front Door",
      "Observador de Rede do Azure",
      "Área de Trabalho Virtual do Azure",
      "Azure Bastion"
    ],
    answer: 3,
    explanation: "O Azure Bastion é um serviço PaaS totalmente gerenciado que fornece conectividade RDP e SSH segura e direta para VMs através do Portal do Azure em uma sessão HTML5 segura (porta 443), sem que as VMs precisem de IPs públicos ou portas abertas para a internet."
  },
  {
    id: 35,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você planeja implantar o serviço Azure Bastion em uma rede virtual chamada VNet1. Quais são os dois requisitos obrigatórios de configuração da sub-rede para a implantação do Bastion? Cada resposta correta apresenta parte da solução.",
    options: [
      "A sub-rede deve ser nomeada exatamente como 'AzureBastionSubnet'.",
      "A sub-rede deve ter um tamanho de prefixo mínimo de /26 ou maior.",
      "A sub-rede deve ser nomeada como 'GatewaySubnet'.",
      "A sub-rede deve conter pelo menos uma máquina virtual existente."
    ],
    answer: 0,
    explanation: "O Azure Bastion exige uma sub-rede dedicada com o nome estrito 'AzureBastionSubnet' e com uma máscara de sub-rede de no mínimo /26 (ou /25, /24) para suportar a escalabilidade de instâncias gerenciadas do serviço."
  },
  {
    id: 36,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Sua empresa hospeda um portal de comércio eletrônico no Azure. Você precisa implantar um balanceador de carga que direcione o tráfego HTTP para servidores específicos com base no caminho da URL (roteando requisições de '/imagens/*' para um pool e '/checkout/*' para outro pool) e forneça proteção integrada contra ataques web OWASP (como injeção de SQL). Qual serviço você deve implantar?",
    options: [
      "Azure Load Balancer Básico",
      "Azure Traffic Manager",
      "Gateway de Aplicativo do Azure (Application Gateway) com WAF v2",
      "Azure NAT Gateway"
    ],
    answer: 2,
    explanation: "O Azure Application Gateway opera na Camada 7 (Aplicação) e suporta roteamento baseado em caminho de URL (URL Path-based routing) e hospeda o Web Application Firewall (WAF v2), que protege contra vulnerabilidades comuns como SQL Injection e XSS."
  },
  {
    id: 37,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem 15 máquinas virtuais que executam a camada de banco de dados na VNet1. Você precisa simplificar o gerenciamento de segurança no Grupo de Segurança de Rede (NSG), permitindo que você agrupe as interfaces de rede dessas 15 VMs sob um único rótulo lógico para usar como destino em regras de NSG, sem precisar digitar nem atualizar endereços IP individuais. O que você deve criar?",
    options: [
      "Um Grupo de IP.",
      "Um Grupo de Segurança de Aplicativo (ASG).",
      "Uma Tabela de Rotas (UDR).",
      "Um Ponto de Extremidade Privado."
    ],
    answer: 1,
    explanation: "Os Grupos de Segurança de Aplicativo (ASGs) permitem agrupar placas de rede (NICs) com base em suas funções de aplicativo. As regras do NSG utilizam o ASG como origem ou destino, e novas VMs vinculadas a esse ASG herdam as regras automaticamente sem manutenção manual de IPs."
  },
  {
    id: 38,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você precisa conectar a rede local de um escritório corporativo a uma rede virtual do Azure através de um túnel VPN seguro criptografado com IPsec/IKE pela internet pública. O dispositivo de firewall local possui um endereço IP público estático. Qual tipo de conexão do Gateway de VPN do Azure você deve configurar?",
    options: [
      "Conexão Ponto a Site (P2S)",
      "Emparelhamento de rede virtual (VNet Peering)",
      "Conexão do ExpressRoute",
      "Conexão Site a Site (S2S)"
    ],
    answer: 3,
    explanation: "Uma conexão VPN Site a Site (S2S) do Gateway de VPN do Azure conecta redes inteiras através de túneis criptografados com IPsec/IKE entre a VNet do Azure e o dispositivo VPN local com IP público estático."
  },
  {
    id: 39,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem 50 máquinas virtuais em uma sub-rede privada na VNet1. As VMs não possuem endereços IP públicos. As VMs precisam acessar repositórios públicos na internet para atualizar pacotes de software com alta confiabilidade, sem riscos de esgotamento de portas SNAT e sem permitir conexões de entrada originadas da internet. O que você deve associar à sub-rede?",
    options: [
      "Um Gateway NAT do Azure (NAT Gateway)",
      "Um Azure Bastion",
      "Um Balanceador de Carga Básico",
      "Um Ponto de Extremidade de Serviço"
    ],
    answer: 0,
    explanation: "O Azure NAT Gateway fornece conectividade de saída (outbound) dedicada para a internet para sub-redes privadas. Ele elimina problemas de esgotamento de portas SNAT e não permite que hosts da internet iniciem conexões de entrada com as máquinas virtuais."
  },
  {
    id: 40,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem uma máquina virtual chamada VM1 conectada a uma sub-rede com regras de NSG. Usuários relatam que não conseguem acessar um serviço web na porta 80 na VM1. Você precisa diagnosticar rapidamente se o tráfego da porta 80 está sendo bloqueado por uma regra de NSG e identificar o nome da regra responsável. Qual ferramenta do Observador de Rede (Network Watcher) você deve usar?",
    options: [
      "Captura de Pacotes (Packet Capture)",
      "Próximo Salto (Next Hop)",
      "Verificação de Fluxo de IP (IP Flow Verify)",
      "Solução de Problemas de VPN"
    ],
    answer: 2,
    explanation: "A ferramenta Verificação de Fluxo de IP (IP Flow Verify) do Azure Network Watcher testa se um pacote de rede (especificado por IP de origem/destino, porta e protocolo) é permitido ou negado em uma interface de rede, retornando o nome exato da regra de NSG que causou a ação."
  },
  {
    id: 41,
    domain: 4,
    domainName: "Redes Virtuais",
    question: "Você tem uma zona de DNS privado do Azure chamada 'corp.internal'. Você vincula a zona à sua rede virtual VNet1. Você precisa garantir que, à medida que novas máquinas virtuais forem criadas na VNet1, seus registros de host DNS (tipo A) sejam adicionados automaticamente à zona 'corp.internal' sem intervenção manual. O que você deve habilitar?",
    options: [
      "O DNS Dinâmico no Windows Server.",
      "O registro automático (Auto-registration) no link da rede virtual.",
      "A resolução de nomes recursiva pública.",
      "O serviço Azure Front Door."
    ],
    answer: 1,
    explanation: "Ao criar um link de rede virtual entre uma VNet e uma zona DNS privada do Azure, marcar a opção 'Habilitar registro automático' (Auto-registration) faz com que o Azure crie e exclua automaticamente os registros DNS do tipo A para as VMs criadas naquela VNet."
  },

  // =========================================================================
  // DOMÍNIO 5: MONITORAR E MANTER RECURSOS DO AZURE (10-15% -> 9 Qs)
  // =========================================================================
  {
    id: 42,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você gerencia 40 máquinas virtuais de missão crítica em uma assinatura do Azure. Você precisa configurar o Azure Monitor para que, caso o uso médio de CPU de qualquer VM exceda 85% por mais de 10 minutos contínuos, uma mensagem SMS seja disparada imediatamente para a equipe de plantão e um incidente seja aberto automaticamente no sistema ITSM da empresa. Qual recurso você deve configurar para orquestrar essas notificações e integrações?",
    options: [
      "Um Grupo de Ações (Action Group) do Azure Monitor contendo uma ação do tipo SMS e uma ação do tipo ITSM ou Webhook.",
      "Uma regra de Notificação de Alerta no Azure Advisor.",
      "Uma Regra de Coleta de Dados (Data Collection Rule - DCR) vinculada ao Log Analytics.",
      "Um Grupo de Gerenciamento com política de diagnóstico habilitada."
    ],
    answer: 0,
    explanation: "Grupos de Ações (Action Groups) são recipientes de notificações e automações reutilizáveis do Azure Monitor. Quando uma regra de alerta métrico é disparada (CPU > 85%), o Azure Monitor invoca o Action Group associado, que pode executar múltiplos tipos de ações simultâneas, como envio de SMS/e-mail para os técnicos de plantão e chamadas diretas para conectores ITSM (ou Webhooks) para criar tickets."
  },
  {
    id: 43,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você tem uma assinatura Azure. Uma máquina virtual foi excluída misteriosamente ontem à noite. Você precisa descobrir quem iniciou a operação de exclusão e em qual horário exato a solicitação foi enviada ao Azure Resource Manager. O que você deve consultar?",
    options: [
      "O Log de Atividades do Azure (Activity Log).",
      "As métricas de uso de CPU do Azure Monitor.",
      "As recomendações de segurança do Assistente do Azure.",
      "O log de integridade do serviço (Service Health)."
    ],
    answer: 0,
    explanation: "O Log de Atividades do Azure (Activity Log) registra eventos do plano de controle sobre ações de gerenciamento de recursos no ARM (quem realizou a operação, qual comando foi executado, quando e qual foi o status da solicitação)."
  },
  {
    id: 44,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você tem um espaço de trabalho do Log Analytics com dados coletados de 100 servidores. Você está escrevendo uma consulta em KQL (Kusto Query Language) e precisa filtrar apenas os registros ocorridos nas últimas 24 horas cujo campo 'EventLevelName' seja igual a 'Error'. Qual operador KQL você deve usar para essa filtragem?",
    options: [
      "project",
      "summarize",
      "where",
      "render"
    ],
    answer: 2,
    explanation: "Na Kusto Query Language (KQL), o operador 'where' é utilizado para filtrar linhas de dados com base em expressões condicionais lógicas (ex: where TimeGenerated > ago(24h) and EventLevelName == 'Error')."
  },
  {
    id: 45,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você precisa configurar o Azure Monitor para que, sempre que o uso de CPU de uma máquina virtual crítica exceder 85% por mais de cinco minutos contínuos, uma mensagem SMS seja enviada ao administrador de plantão e um aplicativo de automação Webhook seja disparado. Quais dois elementos você deve configurar?",
    options: [
      "Uma Tabela de Rotas e uma regra de NSG.",
      "Uma regra de alerta de métrica e um Grupo de Ações (Action Group).",
      "Uma política do Azure Policy e uma marca de auditoria.",
      "Um Cofre dos Serviços de Recuperação e um ponto de restauração."
    ],
    answer: 1,
    explanation: "No Azure Monitor, as 'Regras de Alerta' definem as condições de acionamento (ex: CPU > 85% por 5 min), enquanto os 'Grupos de Ações' (Action Groups) definem os destinatários e as ações executadas quando o alerta é disparado (SMS, e-mail, Webhook, Azure Function, Runbook)."
  },
  {
    id: 46,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você tem várias máquinas virtuais Azure protegidas em um Cofre dos Serviços de Recuperação (Recovery Services Vault). Para se proteger contra ataques de ransomware ou exclusão acidental por operadores descontentes, você precisa garantir que, se um backup for excluído, os dados ainda permaneçam retidos de forma segura e recuperável por 14 dias adicionais. Qual recurso você deve habilitar?",
    options: [
      "Replicação LRS.",
      "Acesso Condicional.",
      "Backup em nível de item.",
      "Exclusão Suave (Soft Delete) para backups."
    ],
    answer: 3,
    explanation: "O recurso de Exclusão Suave (Soft Delete) no Cofre dos Serviços de Recuperação mantém itens de backup excluídos retidos por 14 dias adicionais no estado excluído temporariamente, permitindo a recuperação dos dados e impedindo a perda imediata."
  },
  {
    id: 47,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você precisa configurar o backup de 20 máquinas virtuais Azure que executam cargas de trabalho de produção. A solução deve capturar instantâneos consistentes com o sistema operacional e aplicativos em execução no nível do hipervisor, sem desligar as máquinas virtuais e sem instalar servidores de backup dedicados. O que você deve utilizar?",
    options: [
      "O serviço nativo de Backup de VM do Azure em um Cofre dos Serviços de Recuperação.",
      "A ferramenta AzCopy agendada via PowerShell.",
      "A exportação manual de discos gerenciados.",
      "O utilitário Windows Server Backup dentro de cada VM."
    ],
    answer: 0,
    explanation: "O Azure Backup nativo para VMs do Azure utiliza o Cofre dos Serviços de Recuperação. Ele interage diretamente com o hipervisor e a extensão de backup da VM para criar instantâneos consistentes com a aplicação (via VSS no Windows ou scripts no Linux) sem exigir tempo de inatividade."
  },
  {
    id: 48,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você tem um Cofre dos Serviços de Recuperação configurado com armazenamento com redundância geográfica (GRS). Você precisa realizar um teste de simulação de recuperação de desastres restaurando duas máquinas virtuais na região secundária emparelhada, sem que haja nenhuma falha ou indisponibilidade na região primária. Qual funcionalidade você deve habilitar no cofre?",
    options: [
      "Replicação de objetos de blob (BOR).",
      "Failover forçado da conta de armazenamento.",
      "Restauração entre Regiões (Cross-Region Restore - CRR).",
      "Backup de múltiplos nós no Kubernetes."
    ],
    answer: 2,
    explanation: "O recurso Restauração entre Regiões (Cross-Region Restore - CRR) em cofres com redundância GRS permite que os administradores restaurem itens de backup (como VMs) na região secundária a qualquer momento, mesmo quando a região primária estiver saudável."
  },
  {
    id: 49,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você gerencia a proteção de dados de uma empresa que possui 10 assinaturas do Azure e múltiplos cofres de backup em três regiões geográficas. Você precisa de um painel unificado e centralizado para gerenciar tarefas, monitorar políticas, auditar a conformidade de itens não protegidos e receber relatórios de capacidade de todas as assinaturas em um único lugar. O que você deve utilizar?",
    options: [
      "Assistente do Azure (Azure Advisor).",
      "Centro de Backup do Azure (Azure Backup Center).",
      "Log de Atividades do Azure.",
      "Gerenciador de Custos + Faturamento."
    ],
    answer: 1,
    explanation: "O Centro de Backup do Azure (Azure Backup Center) fornece uma experiência de gerenciamento centralizada e unificada em escala, permitindo governar, monitorar, operar e auditar backups em múltiplos cofres, assinaturas e regiões a partir de um único painel."
  },
  {
    id: 50,
    domain: 5,
    domainName: "Monitoramento & Backup",
    question: "Você tem uma máquina virtual chamada VM1 na VNet1. Um aplicativo na VM1 não consegue se comunicar com um servidor de banco de dados externo através da porta TCP 1433. Você precisa testar a conectividade de rede fim a fim a partir da VM1 até o destino, medindo a latência e identificando em qual nó intermediário ou regra de segurança o tráfego está falhando. Qual ferramenta do Observador de Rede você deve usar?",
    options: [
      "Diagnóstico de NSG",
      "Logs de Fluxo (Flow Logs)",
      "Topologia de Rede",
      "Solução de Problemas de Conexão (Connection Troubleshoot)"
    ],
    answer: 3,
    explanation: "A ferramenta Solução de Problemas de Conexão (Connection Troubleshoot) do Azure Network Watcher avalia a conectividade fim a fim entre uma máquina virtual e outro endpoint/porta, inspecionando a rota, a latência de cada salto e informando exatamente se há bloqueio por NSG ou problemas de roteamento."
  }
];
