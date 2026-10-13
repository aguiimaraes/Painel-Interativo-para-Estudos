import { SummaryTopic } from '../types';

export const theoreticalSummaries: SummaryTopic[] = [
  // =========================================================================
  // DOMÍNIO 1: IDENTIDADE E GOVERNANÇA (20-25%)
  // =========================================================================
  {
    id: 'entra-licensing',
    title: 'Microsoft Entra ID: Identidades, Dispositivos, SSPR & Licenciamento',
    category: 'Identidade',
    domainNumber: 1,
    icon: 'IdCard',
    color: 'text-blue-400',
    summary: 'Serviço de gerenciamento de identidade baseado em nuvem, protocolos modernos (OAuth 2.0, OpenID, SAML), dispositivos (Registered, Joined, Hybrid), SSPR e matriz de licenças Free, P1 e P2.',
    deepExplanation: `O Microsoft Entra ID (anteriormente Azure Active Directory) é um serviço de identidade e acesso multilocatário (multi-tenant) baseado em nuvem. Diferente do Active Directory Domain Services (AD DS) local que opera com LDAP, Kerberos e NTLM, o Entra ID opera sobre protocolos web REST/HTTP: OAuth 2.0 (autorização), OpenID Connect (autenticação) e SAML 2.0 / WS-Federation. Não possui estrutura de árvore hierárquica de Unidades Organizacionais (OUs) nem Objetos de Diretiva de Grupo (GPOs), adotando uma estrutura plana (flat).

Gerenciamento de Dispositivos no Entra ID:
1. Dispositivos Registrados no Azure AD: Foco em Traga Seu Próprio Dispositivo (BYOD). Usuários entram com conta pessoal da Microsoft ou conta corporativa que concede acesso condicional controlado via MDM (Microsoft Intune). Sistemas: Windows 10+, iOS, Android, macOS.
2. Dispositivos Associados ao Azure AD (Azure AD Joined): Destinado a organizações "cloud-only" ou cloud-first. Dispositivos de propriedade da empresa ingressados exclusivamente no Entra ID (exige conta organizacional corporativa). Suporta Acesso Condicional e Single Sign-On (SSO). Sistemas: Windows 10+.
3. Dispositivos Híbridos do Azure AD (Hybrid Azure AD Joined): Dispositivos corporativos ingressados tanto no Active Directory local quanto no Entra ID. Indicados para empresas que usam aplicações Win32 herdadas dependentes de autenticação de máquina Kerberos/NTLM e desejam manter gerenciamento via GPO existente. Sistemas: Windows 7, 8.1, 10+ e Windows Server 2008 R2+.

Redefinição de Senha por Autoatendimento (SSPR - Self-Service Password Reset):
Regras de implementação obrigatórias:
1º Determinar o público: habilitar para 'Nenhum', 'Selecionado' (um grupo específico) ou 'Todos'.
2º Métodos de autenticação: definir a quantidade necessária (1 ou 2 métodos) e os métodos disponíveis (Email, SMS, Notificação/Código no Microsoft Authenticator, Perguntas de Segurança).
3º Registro prévio: exigir que os usuários se registrem no SSPR no momento do login (combinado com o registro de MFA).
Sincronização reversa (Password Write-back): Permite que a senha alterada na nuvem seja gravada de volta no AD local via Entra Connect, exigindo licença P1 ou P2.

Tipos de Contas de Grupo:
- Grupos de Segurança: Usados para gerenciar permissões de acesso a recursos do Azure, pastas e aplicações. Podem conter usuários e dispositivos e NÃO possuem expiração automática.
- Grupos do Microsoft 365: Voltados para colaboração (incluem caixa compartilhada, calendário do Exchange, pasta de equipe no SharePoint e Teams). Aceitam APENAS usuários (não dispositivos) e podem ser configurados para expirar automaticamente após período mínimo de 30 dias.
- Modos de Associação: Atribuída (manual) ou Dinâmica (Dynamic User / Dynamic Device, baseada em consultas de atributos como departamento ou sistema operacional, exigindo licença P1/P2 por membro).`,
    keySpecifications: [
      'Entra ID Free: Até 500.000 objetos, Single Sign-On (SSO) ilimitado, colaboração B2B, autenticação multifator básica (Security Defaults). Sem acesso condicional, sem grupos dinâmicos.',
      'Entra ID P1: Grupos Dinâmicos, Acesso Condicional (Conditional Access por IP/localização/dispositivo), SSPR com Password Writeback para AD local, Microsoft Cloud App Discovery, SLA de 99.9%.',
      'Entra ID P2: Todos os recursos da P1 + Identity Protection (detecção de risco de usuário e risco de entrada por Machine Learning como "viagem impossível"), Privileged Identity Management (PIM) para elevação Just-In-Time (JIT) e revisões de acesso (Access Reviews).',
      'Local de Uso (Usage Location): Parâmetro MANDATÓRIO no perfil do usuário antes de atribuir qualquer licença paga P1 ou P2; sem ele o Azure gera erro de provisionamento.',
      'Restauração de Contas: Usuários excluídos entram no estado de exclusão reversível (soft delete) e podem ser restaurados em até 30 dias.'
    ],
    examTraps: [
      'Writeback de senhas para o AD local: Se o enunciado mencionar ambiente híbrido onde o usuário troca a senha na nuvem e o AD local deve atualizar imediatamente, a resposta SEMPRE é licença Entra ID P1 ou P2 com "Password Writeback".',
      'Convidar parceiros externos B2B falha com "Exceção genérica de autorização": Para resolver, acesse Microsoft Entra ID > Configurações de Usuários > Gerenciar Configurações de Colaboração Externa e habilite a permissão de envio de convites por membros.',
      'Grupos Dinâmicos de Dispositivos: Regras de dispositivos dinâmicos são exclusivas de Grupos de Segurança (Grupos M365 só aceitam usuários) e as regras só podem referenciar atributos do objeto de dispositivo.',
      'Revisar configurações do tenant sem permissão de alteração: A função correta de menor privilégio é "Global Reader" (Leitor Global).'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az ad user create --display-name "Carlos Silva" --user-principal-name "carlos@contoso.com" --password "SenhaForte@2026" --force-change-password-next-sign-in true',
        description: 'Cria usuário no Entra ID forçando troca de senha no primeiro logon.'
      },
      {
        tool: 'PowerShell',
        cmd: 'Connect-AzAccount\nSet-AzContext -Subscription "MinhaAssinaturaProd"',
        description: 'Autentica no Azure e define a assinatura ativa para os cmdlets.'
      }
    ]
  },
  {
    id: 'administrative-units',
    title: 'Unidades Administrativas (AUs) & Delegação Descentralizada',
    category: 'Identidade',
    domainNumber: 1,
    icon: 'Network',
    color: 'text-indigo-400',
    summary: 'Contêineres lógicos para delegação granular de controle sobre usuários e grupos, atuando como o equivalente moderno das Unidades Organizacionais (OUs) do AD on-premises.',
    deepExplanation: `Como o Microsoft Entra ID adota um modelo de diretório plano (flat structure), as Unidades Administrativas (AUs) funcionam como recipientes lógicos ("caixas") para segmentar identidades e decentralizar a administração sem conceder papéis globais no tenant inteiro.

Cenários Típicos de Utilização:
1. Empresas com Filiais Autônomas: Exemplo com sede e filiais em São Paulo, Rio de Janeiro e Belo Horizonte. Administradores locais de cada filial recebem permissão para redefinir senhas e gerenciar contas apenas dos funcionários alocados na sua respectiva AU regional, sem enxergar nem alterar dados de outras filiais.
2. Segmentação por Departamento: Delegação de privilégios para gestores de RH ou TI restritos aos colaboradores da sua área específica.
3. Limitação de Escopo de Funções Privilegiadas: Atribuição de papéis como "Helpdesk Administrator", "User Administrator" ou "Authentication Administrator" com escopo delimitado à AU, reduzindo a superfície de ataque em caso de comprometimento de conta.

Tipos de Associação de Membros:
- Associação Atribuída (Manual): O administrador adiciona ou remove usuários/grupos individualmente.
- Associação Dinâmica: Regras de consulta automatizadas com base em atributos (ex: department == 'Vendas-SP'), exigindo licença Entra ID P1 ou P2.`,
    keySpecifications: [
      'Objetos suportados: Usuários, Grupos e Dispositivos podem ser membros de uma AU.',
      'Licenciamento: O uso de Unidades Administrativas com funções delegadas exige licença Microsoft Entra ID P1 ou P2.',
      'Funções Suportadas: Administrador de Usuários, Administrador de Suporte Técnico (Helpdesk), Administrador de Autenticação, Administrador de Grupos e Administrador de Senhas.',
      'Multi-AU: Um mesmo usuário ou dispositivo pode pertencer a múltiplas Unidades Administrativas simultaneamente.'
    ],
    examTraps: [
      'Unidade Administrativa vs Management Group: Management Groups agrupam ASSINATURAS (Subscriptions) no nível do ARM para Azure Policy e RBAC de infraestrutura. Unidades Administrativas agrupam OBJETOS DO ENTRA ID (usuários/grupos). Nunca confunda ambos na prova!',
      'Escopo de Gestão de Grupos em AUs: Um administrador de grupos em uma AU pode alterar membros daquele grupo, mas NÃO pode alterar atributos cadastrais de usuários do grupo que estejam fora da sua AU.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az rest --method post --uri https://graph.microsoft.com/v1.0/directory/administrativeUnits --body \'{"displayName": "Filial-SaoPaulo", "description": "Usuarios e Grupos de SP"}\'',
        description: 'Cria uma nova Unidade Administrativa via API Microsoft Graph no Azure CLI.'
      }
    ]
  },
  {
    id: 'rbac-custom-roles-json',
    title: 'Azure RBAC: Funções Nativas, Custom Roles & Definições JSON',
    category: 'Governança',
    domainNumber: 1,
    icon: 'ShieldCheck',
    color: 'text-sky-400',
    summary: 'Controle de Acesso Baseado em Função no Azure Resource Manager (ARM), os 3 pilares (Quem, O que, Onde), hierarquia de herança, criação de Custom Roles via JSON, CLI e PowerShell.',
    deepExplanation: `O Azure RBAC (Role-Based Access Control) é o sistema de autorização baseado no Azure Resource Manager (ARM) focado em QUEM pode fazer O QUÊ e ONDE nos recursos do Azure.

Os Três Pilares do RBAC:
1. Quem (Security Principal): Entidade que solicita acesso (Usuário, Grupo de Segurança, Service Principal ou Managed Identity).
2. O que (Role Definition): Coleção de ações autorizadas (Actions/DataActions) ou proibidas (NotActions/NotDataActions).
3. Onde (Scope): O limite de aplicação do acesso na hierarquia de 4 níveis:
   Management Group -> Subscription -> Resource Group -> Resource individual.
Regra de Ouro da Herança: Todas as permissões concedidas em um nível superior são herdadas incondicionalmente por todos os níveis e recursos filhos.

Funções Nativas Essenciais (Built-in Roles):
- Owner (Proprietário): Acesso total a todos os recursos + permissão para conceder e delegar acesso a outros usuários.
- Contributor (Colaborador): Pode criar e gerenciar todos os tipos de recursos técnicos do Azure, mas NÃO pode conceder acesso a outras pessoas.
- Reader (Leitor): Visualiza e audita todos os recursos, sem permissão de alteração ou delegação.
- User Access Administrator: Gerencia exclusivamente o acesso e atribuições de funções de usuários aos recursos do Azure (não gerencia os recursos técnicos em si).

Estrutura JSON de uma Custom Role (Função Personalizada):
Quando as funções nativas não atendem ao princípio do menor privilégio, cria-se uma Custom Role através de um arquivo JSON contendo:
- "Name" e "Description"
- "Actions": Operações permitidas no plano de controle do ARM (ex: "Microsoft.Compute/virtualMachines/start/action").
- "NotActions": Operações excluídas do escopo de Actions.
- "DataActions": Operações no plano de dados do recurso (ex: ler blobs no Storage Account).
- "AssignableScopes": Onde a função pode ser atribuída (ex: "/subscriptions/{sub-id}" ou "/subscriptions/{sub-id}/resourceGroups/{rg-name}").`,
    keySpecifications: [
      'Precedência de Negação: O RBAC opera com modelo de "negação por padrão" (Deny by default). Se não houver uma permissão explícita de "Allow", a ação é negada.',
      'Limite de Custom Roles: Até 5.000 funções personalizadas por diretório/locatário.',
      'RBAC do Azure vs Funções do Entra ID: O Azure RBAC gerencia recursos técnicos do ARM (VMs, VNets, Storage) com escopo hierárquico. As Funções do Entra ID gerenciam o diretório (usuários, domínios, licenças) no escopo do tenant.'
    ],
    examTraps: [
      'NotActions NÃO é uma regra de negação (Deny): O campo "NotActions" apenas subtrai permissões da lista de "Actions". Se o usuário receber a permissão subtraída por meio de outra atribuição de função, a ação será PERMITIDA!',
      'Diferença entre Contributor e Owner: O Contributor pode criar, editar e excluir qualquer recurso técnico, mas a tentativa de delegar função a outro usuário resulta em "Acesso Negado".'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az role definition create --role-definition "@custom-vm-operator.json"\naz role assignment create --assignee "admin-dev@contoso.com" --role "Virtual Machine Operator Custom" --resource-group "rg-vms-prod"',
        description: 'Cria função personalizada via JSON e atribui a um usuário em um Resource Group com Azure CLI.'
      },
      {
        tool: 'PowerShell',
        cmd: '$role = Get-Content -Raw -Path "customRole.json" | ConvertFrom-Json\nNew-AzRoleDefinition -InputObject $role\nNew-AzRoleAssignment -SignInName "user@contoso.com" -RoleDefinitionName "Contributor" -ResourceGroupName "rg-core"',
        description: 'Cria Custom Role a partir de JSON e atribui com Azure PowerShell.'
      }
    ]
  },
  {
    id: 'governance-hierarchy',
    title: 'Hierarquia de Governança, Management Groups, Locks & Tags',
    category: 'Governança',
    domainNumber: 1,
    icon: 'FolderTree',
    color: 'text-emerald-400',
    summary: 'Estrutura hierárquica oficial, limites de cotas, Resource Groups, bloqueios (CanNotDelete vs ReadOnly) e taxonomia de Resource Tags.',
    deepExplanation: `A governança do Microsoft Azure baseia-se em uma hierarquia estrita de contêineres:
1. Locatário Raiz (Root Management Group): Ponto de ancoragem global no tenant.
2. Grupos de Gerenciamento (Management Groups): Agrupam assinaturas para aplicar políticas e custos em escala (até 6 níveis de profundidade além da raiz, suportando até 10.000 grupos por tenant).
3. Assinaturas (Subscriptions): Limite legal, fiscal e de cotas de recursos técnicos.
4. Grupos de Recursos (Resource Groups): Agrupamentos lógicos de recursos que compartilham o mesmo ciclo de vida (implantar, monitorar e excluir juntos).
5. Recursos (Resources): Instâncias individuais de serviços.

Regras Fundamentais de Resource Groups:
- Cada recurso só pode existir em exatamente um Resource Group por vez.
- Grupos de recursos não podem ser aninhados nem renomeados.
- Podem conter recursos de tipos variados e localizados em regiões geográficas diferentes do próprio grupo de recursos.
- Ao mover recursos entre Resource Groups, tanto o grupo de origem quanto o de destino são temporariamente bloqueados durante a operação. (Serviços que não suportam movimentação: Azure AD Domain Services, ExpressRoute e Site Recovery).

Bloqueios de Recursos (Resource Locks):
Atuam no plano de controle do ARM para prevenir exclusões e alterações acidentais:
- CanNotDelete (Excluir): Usuários autorizados podem ler e modificar o recurso, mas não podem excluí-lo.
- ReadOnly (Somente Leitura): Impede exclusão E qualquer alteração/modificação de propriedades. Permite apenas leitura.
Herança de Locks: Bloqueios aplicados em uma Subscription ou Resource Group propagam compulsoriamente para todos os recursos filhos. Um bloqueio 'ReadOnly' sobrepõe privilégios de 'Owner'.

Marcação de Recursos (Tags):
Pares chave-valor (Key:Value) usados para organizar taxonomias, relatórios de faturamento (FinOps) e centros de custo.
Regra Crítica: Tags NÃO são herdadas automaticamente de grupos de recursos para os recursos filhos! Para forçar a herança de tags, é obrigatório utilizar uma Azure Policy (efeito modify ou append).`,
    keySpecifications: [
      'Limite de Tags: Até 50 pares de tags por recurso, grupo de recursos ou assinatura (chave até 512 caracteres, valor até 256 caracteres).',
      'Bloqueio ReadOnly em VMs: Impede até mesmo ligar ou desligar (desalocar) a máquina virtual, pois a operação altera os metadados de alocação de computação no ARM.',
      'Limite de Resource Groups: Até 980 grupos de recursos por assinatura.',
      'Owner vs Lock: Um administrador com a função "Owner" não consegue excluir um recurso bloqueado até que o bloqueio seja removido manualmente.'
    ],
    examTraps: [
      'Herança de Tags: Uma das questões mais recorrentes. "Os recursos herdam automaticamente as tags do seu Resource Group?" Resposta: NÃO. É necessária uma Azure Policy com efeito "modify" ou "append" para aplicar as tags automaticamente aos recursos.',
      'Lock não protege o plano de dados: Bloqueios de ARM impedem comandos de gerenciamento (deletar a Storage Account), mas NÃO impedem a exclusão de dados de dentro do contêiner blob (plano de dados).'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az lock create --name "LockDeleteProd" --lock-type CanNotDelete --resource-group "rg-core-prod"\naz tag create --name "CentroCusto" --resource-id "/subscriptions/{sub-id}/resourceGroups/rg-core-prod"',
        description: 'Cria bloqueio de exclusão em Resource Group e aplica tag de centro de custo.'
      },
      {
        tool: 'PowerShell',
        cmd: 'Get-AzResourceGroup -Name "az104-*" | Remove-AzResourceGroup -Force -AsJob',
        description: 'Exclui grupos de recursos correspondentes ao padrão sem pedir confirmação em segundo plano.'
      }
    ]
  },
  {
    id: 'azure-policy-json-governance',
    title: 'Azure Policy: Governança em Escala, Efeitos & Sintaxe JSON',
    category: 'Governança',
    domainNumber: 1,
    icon: 'FileText',
    color: 'text-teal-400',
    summary: 'Avaliação de conformidade técnica, efeitos (Deny, Audit, Modify, DeployIfNotExists), estrutura JSON de regras e iniciativas de políticas.',
    deepExplanation: `O Azure Policy é o serviço corporativo que impõe regras e padrões de conformidade técnica sobre os recursos do Azure no momento em que eles são criados ou atualizados via Azure Resource Manager.

Diferença entre RBAC e Azure Policy:
- RBAC: Foca em QUEM pode realizar operações (usuários e permissões).
- Azure Policy: Foca nas PROPRIEDADES DO RECURSO (quais SKUs de VMs são permitidas, quais regiões geográficas são autorizadas, quais tags são obrigatórias, se o IP público deve ser bloqueado).

Estrutura JSON de uma Definição de Política:
A regra de política é composta pelos blocos:
- "if": Condições lógicas com operadores de comparação ("equals", "notEquals", "like", "in", "contains") e operadores lógicos ("allOf", "anyOf", "not").
- "then": Ação e efeito executados quando as condições forem atendidas.

Efeitos de Política Mais Cobrados:
1. Deny (Negar): Interrompe a requisição no ARM imediatamente e retorna código de erro ao usuário (impede a criação ou alteração do recurso fora do padrão).
2. Audit (Auditar): Permite a implantação, mas marca o recurso como "Não compatível" (Non-compliant) no painel do Azure Policy.
3. Modify: Adiciona, atualiza ou remove propriedades ou tags do recurso durante a criação.
4. DeployIfNotExists: Implanta automaticamente um recurso subordinado ausente quando a condição for atendida (ex: habilitar o agente de monitoramento ou configurar backup de VM automaticamente).
5. AuditIfNotExists: Audita a ausência de um recurso relacionado.

Iniciativas de Política (Policy Initiatives):
Também chamadas de "Policy Sets", consistem em agrupamentos lógicos de múltiplas definições de políticas sob um único nome para avaliar conformidade em escala (ex: Iniciativa de Conformidade ISO 27001 ou Benchmark CIS do Azure).`,
    keySpecifications: [
      'Escopo de Atribuição: Grupos de Gerenciamento, Assinaturas ou Grupos de Recursos (herda para todos os recursos filhos).',
      'Exclusões (NotScopes): É possível definir exclusões específicas dentro do escopo de atribuição para que certos grupos de recursos fiquem isentos da política.',
      'Modos de Política: "Indexed" (avalia apenas recursos que suportam tags e locais) e "All" (avalia todos os provedores de recursos).'
    ],
    examTraps: [
      'Qual efeito usar para bloquear provisionamento: Se a diretoria exige que nenhuma VM com tamanho G-Series seja criada, o efeito SEMPRE é "Deny". Se exigir apenas listar quem criou, é "Audit".',
      'Precedência de Escopo: Políticas aplicadas no Management Group sobrepõem qualquer configuração local e impedem requisições mesmo que o usuário seja Owner da assinatura.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az policy definition create --name "deny-public-storage" --rules \'{"if":{"allOf":[{"field":"type","equals":"Microsoft.Storage/storageAccounts"},{"field":"Microsoft.Storage/storageAccounts/allowBlobPublicAccess","notEquals":"false"}]},"then":{"effect":"deny"}}\' --mode All\naz policy assignment create --name "deny-public-storage-assign" --policy "deny-public-storage" --scope "/subscriptions/{sub-id}"',
        description: 'Cria e atribui política JSON que nega storage accounts com acesso público de blob habilitado.'
      },
      {
        tool: 'PowerShell',
        cmd: 'New-AzPolicyDefinition -Name "deny-storage-public" -Rules "policy.json" -Mode All\nNew-AzPolicyAssignment -Name "deny-storage-public-assign" -PolicyDefinitionName "deny-storage-public" -Scope "/subscriptions/{sub-id}"',
        description: 'Cria e vincula atribuição de política no escopo da assinatura via PowerShell.'
      }
    ]
  },
  {
    id: 'arm-templates-bicep',
    title: 'Automação com ARM Templates & Azure Bicep (IaC)',
    category: 'Governança',
    domainNumber: 1,
    icon: 'Layers',
    color: 'text-amber-400',
    summary: 'Infraestrutura como Código (IaC), sintaxe declarativa, seções JSON do ARM Template (Parameters, Variables, Resources, Outputs) e comparativo com Azure Bicep.',
    deepExplanation: `O Azure Resource Manager suporta Infraestrutura como Código (IaC) declarativa, permitindo definir o estado final desejado de recursos sem a necessidade de scripts imperativos complexos de passo a passo.

Modelos do Azure Resource Manager (ARM Templates):
Arquivos de texto no formato JSON com estrutura padronizada em 6 seções principais:
1. $schema: Define a versão da linguagem do template e do esquema JSON do ARM.
2. contentVersion: Versão da documentação do modelo (ex: "1.0.0.0").
3. parameters: Entradas fornecidas pelo operador durante o deployment (suporta string, securestring, int, bool, object, secureObject, array, defaultValue, allowedValues, minValue/maxValue).
4. variables: Valores calculados e expressões internas reutilizadas no modelo para simplificar o código.
5. resources: Matriz contendo a lista dos recursos a serem implantados, suas versões de API (apiVersion), dependências (dependsOn), SKUs, propriedades e recursos aninhados.
6. outputs: Valores retornados após a conclusão do provisionamento (ex: IP público provisionado ou FQDN).

Azure Bicep (DSL - Domain Specific Language):
O Bicep é uma linguagem de domínio criada pela Microsoft como evolução transparente dos ARM Templates JSON:
- Sintaxe muito mais concisa, legível e limpa (elimina a complexidade de aspas e chaves do JSON).
- Segurança de tipos com validação imediata no VS Code via IntelliSense.
- Modularização nativa: arquivos Bicep podem importar módulos locais ou remotos de registros privados (ACR).
- Transpilação Transparente: Todo arquivo .bicep compila diretamente para um ARM Template JSON antes de ser submetido ao motor do ARM. Não requer arquivos de estado separados (diferente do Terraform).`,
    keySpecifications: [
      'Modos de Implantação do ARM: "Incremental" (padrão - adiciona ou atualiza recursos sem excluir recursos não listados no template) versus "Complete" (exclui do Resource Group qualquer recurso que não esteja especificado no template!).',
      'Rollback Automático: Em caso de falha de implantação, o ARM permite reverter automaticamente para a última implantação bem-sucedida conhecida.',
      'Parâmetros Seguros: Senhas e chaves de API DEVEM usar os tipos "securestring" ou "secureObject" para que nunca sejam expostos em logs de implantação.'
    ],
    examTraps: [
      'Modo Complete perigoso: Em exames, preste atenção se o enunciado menciona que recursos órfãos devem ser excluídos. O modo "Complete" apaga recursos existentes no Resource Group que não constem no arquivo JSON.',
      'Dependências com dependsOn: Se uma máquina virtual depende de uma placa de rede (NIC) e de uma Storage Account, o bloco da VM deve conter o "dependsOn" com o ID dos recursos dependentes para garantir a ordem correta de provisionamento.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az deployment group create --resource-group "rg-infra" --template-file "main.bicep" --parameters environment="prod"',
        description: 'Implanta infraestrutura definida em arquivo Bicep com parâmetros via Azure CLI.'
      },
      {
        tool: 'PowerShell',
        cmd: 'New-AzResourceGroupDeployment -ResourceGroupName "rg-infra" -TemplateFile "azuredeploy.json" -Mode Incremental',
        description: 'Executa implantação incremental de template ARM via PowerShell.'
      }
    ]
  },

  // =========================================================================
  // DOMÍNIO 2: ARMAZENAMENTO - STORAGE (15-20%)
  // =========================================================================
  {
    id: 'storage-redundancy',
    title: 'Storage Accounts: Tipos, Redundância (LRS a GZRS) & BOR',
    category: 'Storage',
    domainNumber: 2,
    icon: 'Database',
    color: 'text-emerald-400',
    summary: 'Contas GPv2, Blob Storage, tipos de replicação local e geográfica, failover manual gerenciado pelo cliente e replicação de objetos (Blob Object Replication - BOR).',
    deepExplanation: `As Contas de Armazenamento do Azure (Storage Accounts) representam o contêiner central para Blobs (contêineres), Files (SMB/NFS), Queues (mensageria assíncrona) e Tables (NoSQL de chave/valor).

Tipos de Contas de Armazenamento:
- General Purpose v2 (GPv2): Tipo recomendado para 99% das cargas de trabalho. Oferece o menor custo por GB e suporta todas as funcionalidades modernas (todas as 4 camadas de acesso, ciclo de vida, BOR, Azure Files).
- General Purpose v1 (GPv1): Legado; não suporta camadas de acesso (Hot/Cool/Archive) nem gerenciamento de ciclo de vida.
- BlockBlobStorage: Armazenamento Premium com discos SSD para cargas que exigem taxas de transação ultrarrápidas e baixa latência constante.

Matriz de Redundância e Durabilidade:
- LRS (Locally Redundant Storage): 3 cópias síncronas dentro de 1 único datacenter na mesma região. Protege contra falhas de disco/rack. Durabilidade de 11 noves (99,999999999%).
- ZRS (Zone-Redundant Storage): 3 cópias síncronas distribuídas em 3 Zonas de Disponibilidade independentes na mesma região. Tolera falha total de um datacenter. Durabilidade de 12 noves.
- GRS (Geo-Redundant Storage): 3 cópias síncronas em LRS na região primária + replicação assíncrona para uma região par secundária a centenas de quilômetros (onde mantém mais 3 cópias LRS). Total de 6 cópias. Durabilidade de 16 noves.
- RA-GRS (Read-Access Geo-Redundant Storage): Idêntico ao GRS, mas disponibiliza um endpoint de somente leitura permanente na região secundária (ex: contoso-secondary.blob.core.windows.net).
- GZRS / RA-GZRS (Geo-Zone-Redundant Storage): O nível máximo de resiliência: 3 cópias ZRS na região primária + 3 cópias LRS assíncronas na região secundária. Durabilidade de 16 noves.

Replicação de Objetos de Blob (BOR - Blob Object Replication):
Permite copiar blobs de bloco de forma assíncrona entre contêineres de contas de armazenamento de origem e destino na mesma região ou em regiões diferentes. Requisitos obrigatórios:
- Ambas as contas devem ser GPv2 ou Premium BlockBlob.
- O Feed de Alterações (Change Feed) deve estar habilitado na conta de origem.
- O Controle de Versão de Blobs (Versioning) deve estar habilitado em ambas as contas (origem e destino).`,
    keySpecifications: [
      'Customer-Managed Failover: O administrador pode iniciar o failover manual da conta GRS/GZRS se a região primária sofrer desastre. A região secundária assume como primária e a conta é automaticamente reconfigurada para LRS.',
      'Perda de Dados no Failover (RPO): Como a geo-replicação é assíncrona, dados não sincronizados até o Last Sync Time são perdidos.',
      'Namespace Exclusivo: O nome da Storage Account deve ser globalmente exclusivo em todo o Azure, conter entre 3 e 24 caracteres e usar apenas letras minúsculas e números.'
    ],
    examTraps: [
      'Acesso de leitura imediato na secundária sem failover: O GRS padrão NÃO permite ler dados na região secundária antes de um failover! Para ter leitura ativa sem failover, a conta deve ser obrigatoriamente RA-GRS ou RA-GZRS.',
      'Requisitos do BOR: Para habilitar a Replicação de Objetos (BOR), tanto o Versionamento quanto o Change Feed DEVEM estar ligados. Sem eles a opção fica indisponível.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az storage account create --name "stprodbr001" --resource-group "rg-storage" --location "brazilsouth" --sku "Standard_GZRS" --kind "StorageV2"',
        description: 'Cria storage account GPv2 com replicação geográfica zonal (GZRS).'
      },
      {
        tool: 'Azure CLI',
        cmd: 'az storage account failover --name "stprodbr001" --resource-group "rg-storage" --yes',
        description: 'Inicia failover manual da conta de armazenamento para a região secundária.'
      }
    ]
  },
  {
    id: 'storage-lifecycle-tiers',
    title: 'Camadas de Blobs (Hot, Cool e Archive) & Ciclo de Vida',
    category: 'Storage',
    domainNumber: 2,
    icon: 'Layers',
    color: 'text-amber-300',
    summary: 'Camadas de acesso oficiais Hot, Cool e Archive, períodos mínimos de retenção, reidratação de dados arquivados e políticas de Lifecycle Management.',
    deepExplanation: `O Azure Blob Storage oferece três camadas de acesso principais avaliadas no exame oficial AZ-104 para balancear custo de armazenamento por GB e custo de transações de leitura/escrita:

1. Hot (Frequente):
- Ideal para dados ativamente utilizados, lidos e modificados com alta frequência (ex: imagens de perfil em apps ativos).
- Maior custo de armazenamento por GB, mas menor custo por transação de acesso. Retenção mínima: 0 dias.

2. Cool (Esporádico / Pouco Frequente):
- Otimizada para dados lidos esporadicamente que permanecem armazenados por pelo menos 30 dias (ex: relatórios mensais, backups recentes).
- Custo de armazenamento menor que a Hot, custo de transação moderado. Período mínimo de cobrança: 30 dias.

3. Archive (Arquivo de Longo Prazo):
- Otimizada para dados históricos, conformidade regulatória e retenção de longo prazo de pelo menos 180 dias.
- Menor custo de armazenamento por GB no Azure, custo de transação e recuperação elevado.
- O blob fica OFFLINE e não pode ser lido diretamente por nenhuma aplicação!

Reidratação de Blobs Arquivados:
Para ler um blob no Archive, é obrigatório reidratá-lo para Hot ou Cool.
Prioridades de Reidratação:
- Padrão (Standard Priority): Demora até 15 horas.
- Alta Prioridade (High Priority): Concluída em menos de 1 hora para blobs com menos de 10 GB.
Alternativa de Cópia: É possível usar a API "Copy Blob" para copiar o blob do Archive diretamente para um destino Hot ou Cool sem alterar a camada do blob original.

Gerenciamento de Ciclo de Vida (Lifecycle Management):
Regras automatizadas executadas diariamente pelo Azure que movem ou excluem blobs com base em:
- "daysAfterModificationGreaterThan"
- "daysAfterCreationGreaterThan"
- "daysAfterLastAccessTimeGreaterThan" (exige habilitar o rastreamento de tempo de acesso).

Nota Técnica sobre a Nomenclatura no Exame AZ-104:
- Na prova oficial AZ-104, as três camadas canônicas cobradas são Hot, Cool e Archive. Em contas de armazenamento Standard GPv2, o padrão configurável da conta é apenas Hot ou Cool.
- A camada Archive só pode ser definida em nível de blob individual (Block Blobs), nunca como padrão da conta de armazenamento inteira.`,
    keySpecifications: [
      'Camadas Padrão da Conta: Uma conta de armazenamento de uso geral v2 (GPv2) suporta apenas Hot e Cool como camada de acesso padrão. Archive não pode ser definido como padrão da conta.',
      'Penalidade de Exclusão Antecipada: Excluir ou mover um blob de Cool antes de 30 dias ou de Archive antes de 180 dias acarreta cobrança residual proporcional!',
      'Tipos de Blobs: Blobs de Bloco (até 4,77 TB para arquivos e vídeos), Blobs de Acréscimo (Append Blobs até 195 GB otimizados para logs) e Blobs de Página (Page Blobs até 8 TB otimizados para VHDs de VMs).',
      'Camada Archive disponível apenas para Blobs de Bloco em contas GPv2 ou Blob Storage.'
    ],
    examTraps: [
      'Pegadinha de Camadas: O exame cobra rigorosamente a tríade Hot (0 dias) -> Cool (30 dias) -> Archive (180 dias, offline). Lembre-se: em contas de armazenamento, a camada padrão só pode ser Hot ou Cool.',
      'Leitura direta no Archive: Questão clássica. "Uma aplicação tenta ler um blob na camada Archive". Resultado: Falha com erro de cliente! O blob deve ser reidratado primeiro ou copiado via Copy Blob para Hot ou Cool.',
      'Reidratação vs Cópia: Usar Copy Blob permite criar uma versão Hot em outro contêiner mantendo o arquivo arquivado original intocado.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az storage blob set-tier --account-name "stprodbr001" --container-name "auditoria" --name "ano2024.tar.gz" --tier "Archive" --auth-mode login',
        description: 'Altera a camada de acesso de um blob para Archive usando credenciais Entra ID.'
      }
    ]
  },
  {
    id: 'storage-security-sas',
    title: 'Segurança em Storage: SAS Tokens, SAP & Armazenamento Imutável',
    category: 'Storage',
    domainNumber: 2,
    icon: 'Key',
    color: 'text-teal-400',
    summary: 'Chaves de Acesso, Shared Access Signatures (User Delegation, Service e Account SAS), Stored Access Policies e Armazenamento Imutável WORM (retenção vs legal hold).',
    deepExplanation: `Métodos de Autenticação no Azure Storage:
1. Microsoft Entra ID (RBAC): Método mais seguro e recomendado (funções como Storage Blob Data Contributor/Reader).
2. Chaves de Acesso da Conta (Access Keys): Duas chaves de 512 bits (Key1 e Key2) que concedem controle irrestrito de superusuário sobre todos os dados e serviços da conta.
3. Assinatura de Acesso Compartilhado (SAS - Shared Access Signature): Token criptográfico anexado a uma URI que delega acesso granular delimitado por tempo, IP, protocolo (apenas HTTPS) e permissões específicas (r, w, d, l).

Tipos de SAS:
- User Delegation SAS: Assinada com credenciais do Microsoft Entra ID (não expõe chaves da conta; mais segura).
- Service SAS: Concede acesso a recursos de apenas um serviço de armazenamento (ex: apenas um contêiner de blobs).
- Account SAS: Concede acesso a múltiplos serviços (blobs, filas, tabelas e arquivos) e operações de gerenciamento.

Políticas de Acesso Armazenadas (SAP - Stored Access Policies):
Definidas diretamente no contêiner blob ou compartilhamento de arquivos. Quando uma SAS é associada a uma SAP, seus parâmetros (tempo de validade e permissões) são herdados da política.
Vantagem Crítica: Permite revogar ou alterar a validade do token SAS instantaneamente apenas modificando ou deletando a SAP, sem precisar rotacionar as Access Keys da Storage Account!

Armazenamento Imutável para Blobs (WORM - Write Once, Read Many):
Protege dados críticos contra modificação ou exclusão acidental ou maliciosa (anti-ransomware e conformidade regulatória SEC/FINRA):
1. Políticas de Retenção Baseadas em Tempo: Define um período de retenção (de 1 a 146.000 dias) durante o qual os dados não podem ser alterados ou excluídos nem por administradores.
2. Retenções Legais (Legal Hold): Bloqueia modificações e exclusões por tempo indeterminado até que a tag de retenção legal seja expressamente removida por um auditor autorizado.`,
    keySpecifications: [
      'Revogação de SAS: Sem Stored Access Policy, a ÚNICA maneira de revogar uma SAS comprometida é regenerar a Access Key da conta inteira, derrubando todas as outras aplicações vinculadas àquela chave!',
      'Armazenamento Imutável: Pode ser aplicado no nível do contêiner ou no nível de versões de blobs individuais.',
      'Firewalls de Storage: Por padrão, todo tráfego público é aceito. Ao restringir para "Redes selecionadas", exige Service Endpoints ou Private Endpoints.'
    ],
    examTraps: [
      'Como revogar uma SAS sem afetar outros apps: Resposta de prova: vincular a SAS a uma "Stored Access Policy (SAP)". Ao excluir ou alterar a SAP, a SAS é invalidada imediatamente.',
      'Permissão para User Delegation SAS: O usuário emissor deve possuir a função RBAC "Storage Blob Data Contributor" ou "Reader".'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az storage container policy create --account-name "stprodbr001" --container-name "docs" --name "PoliticaAuditoria" --permissions "r" --expiry "2026-12-31T23:59:59Z" --auth-mode login',
        description: 'Cria uma Stored Access Policy vinculada a um contêiner blob.'
      },
      {
        tool: 'Azure CLI',
        cmd: 'az storage container immutability-policy create --account-name "stprodbr001" --container-name "contratos" --period 365',
        description: 'Define política de imutabilidade baseada em tempo de 365 dias para o contêiner.'
      }
    ]
  },
  {
    id: 'storage-files-sync-migration',
    title: 'Azure Files, File Sync, Identidades (IBA) & Migração em Massa',
    category: 'Storage',
    domainNumber: 2,
    icon: 'FolderSync',
    color: 'text-cyan-400',
    summary: 'Compartilhamentos SMB e NFS, Identity-Based Access (IBA) com Entra ID, Azure File Sync com Cloud Tiering, AzCopy, Storage Explorer e Azure Data Box.',
    deepExplanation: `Azure Files:
Serviço totalmente gerenciado de compartilhamentos de arquivos em nuvem acessíveis via protocolos padrão da indústria:
- Protocolo SMB (Server Message Block 3.0): Suporta criptografia em trânsito e montagem simultânea em múltiplos clientes Windows, Linux e macOS, na nuvem ou on-premises.
- Protocolo NFS (Network File System 4.1): Ideal para cargas corporativas Linux e Kubernetes, exigindo armazenamento Premium.

Acesso Baseado em Identidade (Identity-Based Access - IBA):
Permite que os usuários acessem os compartilhamentos de arquivos SMB usando suas identidades reais do Microsoft Entra ID (ou AD DS local sincronizado) com controle de acesso em dois níveis:
1. Nível de Compartilhamento (Azure RBAC): Funções "Storage File Data SMB Share Reader", "Contributor" ou "Elevated Contributor".
2. Nível de Diretório e Arquivo: Listas de Controle de Acesso (ACLs) NTFS clássicas do Windows configuradas no sistema de arquivos.

Azure File Sync:
Transforma servidores Windows locais em caches rápidos para os compartilhamentos do Azure Files:
- Sincronização Bidirecional contínua entre múltiplos escritórios e a nuvem.
- Cloud Tiering (Nuvem em Camadas): Mantém os arquivos frequentemente acessados no servidor local e arquiva arquivos pouco usados na nuvem como "ponteiros", economizando até 80% do espaço em disco local.
- Recuperação Rápida de Desastres: Em caso de falha de hardware local, basta instalar o agente em um novo servidor e sincronizar os metadados em minutos.

Ferramentas de Migração e Transferência:
- Azure Storage Explorer: Ferramenta gráfica gratuita (GUI) para inspeção manual de blobs, filas, tabelas e arquivos, gerenciamento de permissões e edição de metadados.
- AzCopy: Utilitário de linha de comando de alta performance otimizado para transferências paralelas em lote de grandes volumes de dados e sincronização de diretórios com Azure Blob e File Storage.
- Azure Data Box: Dispositivos de armazenamento físico reforçados enviados pela Microsoft para transferir dezenas de Terabytes a Petabytes quando a largura de banda da internet for um gargalo inviável:
  * Data Box Disk: Até 40 TB (8 TB por disco SSD).
  * Data Box: Até 100 TB de capacidade utilizável.
  * Data Box Heavy: Até 1 PB para migrações massivas de datacenters.
- Azure Import/Export Job: Utilização de discos rígidos/SSDs próprios do cliente criptografados com BitLocker enviados por correio diretamente para os datacenters do Azure.`,
    keySpecifications: [
      'Snapshots do Azure Files: Cópias pontuais somente leitura de um compartilhamento de arquivos para proteção contra exclusão acidental ou corrupção de dados.',
      'Soft Delete em Azure Files: Retém compartilhamentos excluídos por um período configurável de 7 a 365 dias antes da remoção permanente.',
      'Porta de Rede SMB: O protocolo SMB exige a porta TCP 445 aberta na saída da rede local para a internet. Muitos provedores de internet residenciais bloqueiam a porta 445, exigindo VPN ou ExpressRoute para contornar.'
    ],
    examTraps: [
      'Migração de Petabytes com internet lenta: Se o cenário mencionar transferir 500 TB com link de internet saturado ou lento, a resposta NUNCA é AzCopy online; é SEMPRE o "Azure Data Box" (dispositivo físico).',
      'Porta 445 bloqueada: Se uma filial não consegue montar um compartilhamento Azure Files via SMB, a causa raiz costuma ser o bloqueio da porta TCP 445 pelo ISP. A solução é usar VPN P2S/S2S ou configurar o Azure File Sync.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az storage share-rm create --resource-group "rg-storage" --storage-account "stprodbr001" --name "projetos" --quota 2048',
        description: 'Cria compartilhamento SMB do Azure Files com cota de 2 TB.'
      },
      {
        tool: 'Azure CLI',
        cmd: 'azcopy copy "C:\\dados\\*" "https://stprodbr001.blob.core.windows.net/backups?{sas-token}" --recursive',
        description: 'Executa cópia paralela rápida de pasta local para contêiner blob via AzCopy.'
      }
    ]
  },

  // =========================================================================
  // DOMÍNIO 3: COMPUTAÇÃO - VMS, CONTAINERS & APP SERVICE (20-25%)
  // =========================================================================
  {
    id: 'vm-availability',
    title: 'Máquinas Virtuais: Zonas, Availability Sets & Scale Sets (VMSS)',
    category: 'Computação',
    domainNumber: 3,
    icon: 'Server',
    color: 'text-rose-400',
    summary: 'Fault Domains, Update Domains, Zonas de Disponibilidade (SLA 99.99%), Virtual Machine Scale Sets (Uniform vs Flexible) e Autoscale.',
    deepExplanation: `A disponibilidade de infraestrutura de VMs no Azure é estruturada em 3 níveis fundamentais:

1. VM Isolada com Premium SSD / Ultra Disk: SLA de 99.9% de disponibilidade.
2. Availability Sets (Conjuntos de Disponibilidade):
Garantem a distribuição de VMs entre múltiplos servidores físicos independentes dentro do MESMO datacenter:
- Fault Domains (FD - Domínios de Falha): Compartilham a mesma fonte de alimentação de energia e switch de rede física. Suporta até 3 FDs (FD 0, FD 1, FD 2).
- Update Domains (UD - Domínios de Atualização): Grupos de VMs que são reiniciados sequencialmente durante manutenções programadas pela Microsoft. Suporta até 20 UDs.
SLA: 99.95% de disponibilidade para 2 ou mais VMs no mesmo conjunto.
3. Availability Zones (Zonas de Disponibilidade):
Datacenters fisicamente separados e independentes dentro da mesma região geográfica (com energia, resfriamento e conectividade de rede dedicados).
SLA: 99.99% de disponibilidade para 2 ou mais VMs distribuídas em zonas distintas.
4. Virtual Machine Scale Sets (VMSS):
Permitem implantar e gerenciar um grupo de VMs idênticas com balanceamento de carga e dimensionamento automático (Autoscale) baseado em métricas de uso de CPU/memória ou cronogramas temporais.
Modos de Orquestração do VMSS:
- Uniform (Uniforme): Otimizado para cargas de trabalho sem estado (stateless) em grande escala usando imagens idênticas.
- Flexible (Flexível): Permite gerenciar VMs com estado (stateful), suportando diferentes tipos e tamanhos de VMs no mesmo grupo.`,
    keySpecifications: [
      'Inclusão de VM existente em Availability Set: NÃO É POSSÍVEL adicionar uma VM já criada a um Availability Set existente. A VM deve ser excluída (mantendo o disco do SO) e recriada apontando para o Availability Set!',
      'Alinhamento com Managed Disks: Em Availability Sets, os Discos Gerenciados são alinhados automaticamente aos mesmos Fault Domains da VM para evitar pontos únicos de falha de armazenamento.',
      'SLA Oficial da Microsoft: 1 VM com Premium SSD = 99.9%; 2 VMs em Availability Set = 99.95%; 2 VMs em Zonas de Disponibilidade = 99.99%.'
    ],
    examTraps: [
      'Mover VM em execução para Availability Set: Questão clássica do AZ-104. A única forma é excluir a VM preservando seu disco OS e recriá-la dentro do Availability Set.',
      'Update Domains e manutenção: O Azure nunca atualiza e reinicia mais de um Update Domain simultaneamente, garantindo capacidade operacional durante manutenções de plataforma.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az vm availability-set create --resource-group "rg-compute" --name "as-web-prod" --platform-fault-domain-count 3 --platform-update-domain-count 5',
        description: 'Cria Availability Set com 3 domínios de falha e 5 domínios de atualização.'
      },
      {
        tool: 'Azure CLI',
        cmd: 'az vmss create --resource-group "rg-compute" --name "vmss-web" --image "Ubuntu2204" --vm-sku "Standard_D2s_v3" --instance-count 3 --orchestration-mode "Uniform"',
        description: 'Cria VM Scale Set com 3 instâncias em modo de orquestração uniforme.'
      }
    ]
  },
  {
    id: 'vm-storage-disks-ade-mgmt',
    title: 'Discos de VMs, Criptografia (ADE), NICs & Comandos Essenciais',
    category: 'Computação',
    domainNumber: 3,
    icon: 'HardDrive',
    color: 'text-orange-400',
    summary: 'Discos OS, Temporário e de Dados, Discos Gerenciados (Managed Disks), Azure Disk Encryption com Key Vault, interfaces de rede (NICs) e comandos CLI/PowerShell.',
    deepExplanation: `Tipos de Discos em VMs do Azure:
1. OS Disk (Disco do Sistema Operacional): Armazena o sistema operacional (Windows/Linux) e arquivos de boot. Volume persistente registrado como C: ou /dev/sda, com tamanho padrão de 127 GB (redimensionável).
2. Temporary Disk (Disco Temporário): Volume de alta velocidade (rotulado como D: no Windows ou /dev/sdb no Linux) montado localmente no host físico. Conteúdo é VOLÁTIL e APAGADO a cada reinicialização ou desalocação da VM! Não deve armazenar dados que exijam persistência.
3. Data Disk (Disco de Dados): Armazenamento persistente anexado à VM via SCSI para bancos de dados e aplicações. Uma VM suporta de 1 até 64 discos de dados conforme o tamanho da VM (até 32.767 GiB por disco).

Desempenho de Discos Gerenciados:
- Ultra Disk: Cargas de trabalho intensivas de I/O (SAP HANA, Oracle, SQL corporativo). Permite alterar IOPS e Throughput em tempo de execução sem reiniciar a VM.
- Premium SSD: Cargas de produção com desempenho previsível de baixa latência.
- Standard SSD: Servidores web de tráfego leve e ambientes de teste.
- Standard HDD: Armazenamento econômico para backups e arquivos raramente acessados.

Azure Disk Encryption (ADE):
Utiliza o BitLocker (Windows) ou DM-Crypt (Linux) para fornecer criptografia de volume total no disco do sistema operacional e discos de dados. As chaves de criptografia e chaves mestras de chave (KEK) são armazenadas de forma segura no Azure Key Vault.

Configuração de Interfaces de Rede (NICs) em VMs:
- Uma VM pode ter múltiplas NICs para segregação de tráfego (gerenciamento vs tráfego de dados).
- Cada NIC conecta-se a uma sub-rede da VNet e pode receber um IP privado (estático/dinâmico) e um IP público.
- FQDN da VM segue a sintaxe: <nome-da-vm>.<regiao>.cloudapp.azure.com (1 a 15 caracteres alfanuméricos sem espaços).`,
    keySpecifications: [
      'Alocação de IP Privado: O IP dinâmico atribuído por DHCP permanece o mesmo enquanto a VM estiver em execução ou reiniciada; ele só é alterado se a VM for DESALOCADA (Stopped/Deallocated). Para fixá-lo permanentemente, alterne para IP estático.',
      'Redimensionamento de VM: Se a família de tamanho desejada não estiver disponível no cluster físico atual, a VM deve ser DESALOCADA antes de executar o comando de resize.',
      'Pares de Regiões (Region Pairs): Cada região do Azure é pareada com outra na mesma geografia (ex: East US com West US; Brazil South com South Central US) para atualizações planejadas sequenciais e contingência de desastres.'
    ],
    examTraps: [
      'Dados perdidos no drive D: Se uma questão relatar que uma aplicação perdeu dados gravados após a VM ser reiniciada ou migrada, a causa é ter salvo os dados no "Temporary Disk".',
      'Desalocar VM para não pagar computação: Parar a VM dentro do sistema operacional (Shutdown) deixa a VM no estado "Stopped" (ainda cobra computação e hardware reservado). Para cessar a cobrança de CPU/RAM, ela DEVE ser colocada no estado "Stopped (Deallocated)" pelo Portal, CLI ou PowerShell.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az vm create --resource-group "rg-vms" --name "vm-app01" --image "Ubuntu2204" --size "Standard_D2s_v3" --admin-username "azureuser" --generate-ssh-keys\naz vm deallocate --resource-group "rg-vms" --name "vm-app01"\naz vm resize --resource-group "rg-vms" --name "vm-app01" --size "Standard_D4s_v3"\naz vm start --resource-group "rg-vms" --name "vm-app01"',
        description: 'Criação de VM Linux com chave SSH, desalocação, redimensionamento de CPU/RAM e reinício.'
      },
      {
        tool: 'PowerShell',
        cmd: '$cred = Get-Credential\nNew-AzVM -ResourceGroupName "MeuGrupoVM" -Name "MinhaVMWin" -Location "EastUS" -Image "Win2022Datacenter" -Credential $cred -OpenPorts 3389\nStop-AzVM -ResourceGroupName "MeuGrupoVM" -Name "MinhaVMWin" -Force',
        description: 'Criação de VM Windows Server com porta RDP 3389 aberta e desligamento desalocado via PowerShell.'
      }
    ]
  },
  {
    id: 'app-service-slots-vnet',
    title: 'Azure App Service: Planos, Deployment Slots & VNet Integration',
    category: 'Computação',
    domainNumber: 3,
    icon: 'Globe',
    color: 'text-pink-400',
    summary: 'Hospedagem PaaS (Web Apps, APIs), planos de serviço, Deployment Slots com zero downtime swap, escalabilidade e integração com VNet (/28).',
    deepExplanation: `O Azure App Service é uma plataforma como serviço (PaaS) totalmente gerenciada para publicação de sites, APIs REST e aplicações móveis sem necessidade de administrar servidores físicos ou aplicar patches em sistemas operacionais.

Camadas de Preço do App Service Plan:
- Free & Shared: Compartilhados com outros clientes; recursos limitados para testes básicos sem suporte a domínio customizado nem SSL.
- Basic: Recursos de computação dedicados para cargas leves.
- Standard: Produção padrão. Suporta até 5 Deployment Slots, dimensionamento automático (Autoscale até 10 instâncias) e backups automáticos.
- Premium (v2/v3): Alto desempenho, até 20 Deployment Slots, autoscale de até 30 instâncias, suporte a instâncias maiores e VNet Integration rápida.
- Isolated (App Service Environment - ASE): Executa em hardware e redes virtuais totalmente dedicadas para máxima segurança e isolamento corporativo.

Deployment Slots (Slots de Implantação):
Permitem implantar novas versões de aplicações em ambientes de homologação (staging) isolados associados ao mesmo App Service:
- Zero Downtime: A operação de troca (Swap) aquece previamente as instâncias do slot de staging antes de direcionar o tráfego do slot de produção, eliminando quedas.
- Rollback Instantâneo: Se um erro for detectado em produção após o swap, uma nova troca imediata restaura a versão estável anterior em segundos.
- Configurações Vinculadas (Slot Settings): É possível marcar strings de conexão e variáveis de ambiente como "aderentes ao slot" (sticky to slot), garantindo que apontamentos para bancos de teste permaneçam no slot de teste durante o swap.

Integração com Rede Virtual (VNet Integration):
Permite que o aplicativo web envie tráfego de saída diretamente para recursos com IP privado dentro de uma VNet (como bancos de dados SQL privados ou VMs):
- Exige uma sub-rede DEDICADA dentro da VNet delegada ao serviço "Microsoft.Web/serverFarms".
- Tamanho mínimo recomendado da sub-rede: Máscara /28 (16 endereços IP) para permitir a escala elástica das instâncias.

Conexões Híbridas (Hybrid Connections):
Recurso baseado no Azure Relay que permite ao App Service conectar-se com segurança a bancos de dados ou APIs locais on-premises utilizando apenas uma porta TCP de saída (porta HTTPS 443), sem exigir a abertura de portas de entrada no firewall corporativo da empresa.`,
    keySpecifications: [
      'Deployment Slots disponíveis apenas a partir do plano Standard (até 5) ou Premium (até 20).',
      'Escalabilidade: Scale Up (vertical - aumentar CPU/RAM alterando o plano de preço) vs Scale Out (horizontal - aumentar número de instâncias de VMs).',
      'Backup de App Service: Suportado a partir do plano Standard; armazena código e banco de dados vinculado em uma Storage Account.'
    ],
    examTraps: [
      'Deployment Slots no plano Basic: Questão clássica. "O cliente quer testar versão em slot de staging no plano Basic". Erro: O plano Basic NÃO suporta Deployment Slots! É obrigatório migrar (Scale Up) para o plano Standard ou superior.',
      'Subnet de VNet Integration: A sub-rede deve ser vazia e delegada exclusivamente para o App Service; você não pode colocar VMs dentro da mesma sub-rede de VNet Integration.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az webapp deployment slot create --name "app-loja-prod" --resource-group "rg-apps" --slot "staging"\naz webapp deployment slot swap --name "app-loja-prod" --resource-group "rg-apps" --slot "staging" --target-slot "production"',
        description: 'Cria slot de staging e executa o swap seguro para produção sem tempo de inatividade.'
      }
    ]
  },
  {
    id: 'containers-acr-aci-aks-aca',
    title: 'Contêineres no Azure: ACR, ACI, AKS & Azure Container Apps',
    category: 'Computação',
    domainNumber: 3,
    icon: 'Box',
    color: 'text-violet-400',
    summary: 'Registro privado Docker (ACR), contêineres sem servidor (ACI), orquestração Kubernetes gerenciada (AKS) e microsserviços com Container Apps (ACA).',
    deepExplanation: `O Azure oferece uma matriz completa de serviços para hospedagem e orquestração de contêineres Docker / OCI:

1. Azure Container Registry (ACR):
Serviço gerenciado de registro privado para armazenamento e governança de imagens de contêiner e artefatos OCI:
- Skus: Basic, Standard e Premium (suporta replicação geográfica de imagens em múltiplas regiões, integração com Private Link e chaves gerenciadas pelo cliente).
- Segurança: Varredura de vulnerabilidades pelo Microsoft Defender for Cloud e controle de acesso granular via RBAC.
- Tarefas automatizadas (ACR Tasks): Constrói imagens no Azure automaticamente quando o código-fonte for atualizado no GitHub.

2. Azure Container Instances (ACI):
A maneira mais rápida e simples de executar contêineres sem servidor (serverless) no Azure, sem necessidade de gerenciar VMs, nós ou clusters de orquestração:
- Inicialização em segundos; ideal para tarefas pontuais de processamento em lote, pipelines de CI/CD e ambientes de teste temporários.
- Grupos de Contêineres (Container Groups): Coleção de contêineres que compartilham o mesmo ciclo de vida, recursos de computação, rede local e volumes de armazenamento.

3. Azure Kubernetes Service (AKS):
Serviço de orquestração gerenciado de clusters Kubernetes de nível empresarial:
- Plano de Controle Gerenciado: O Azure gerencia e arca com os custos dos nós de controle (master nodes) gratuitamente. O cliente paga apenas pelas VMs dos nós de trabalho (worker nodes).
- Autoscaling: Suporte a Horizontal Pod Autoscaler (HPA) para pods e Cluster Autoscaler para nós de trabalho em VMSS.
- Modelos de Rede: Kubenet (básico, com economia de IPs privados) versus Azure CNI (cada pod recebe um IP real da VNet).

4. Azure Container Apps (ACA):
Ambiente de contêineres serverless construído sobre Kubernetes, porém abstraindo toda a complexidade de gerenciamento de clusters. Projetado para microsserviços modernos com suporte nativo a Dapr (Distributed Application Runtime) e KEDA para escalonamento automático até zero instâncias (scale-to-zero).`,
    keySpecifications: [
      'ACR Geo-Replication: Exclusivo da SKU Premium; permite que uma única imagem seja replicada em datacenters globais com pull local de baixa latência.',
      'ACI vs AKS: ACI é ideal para cargas de trabalho simples e pontuais; AKS é obrigatório quando há necessidade de descoberta de serviço avançada, ingress controller e microsserviços complexos.',
      'SLA do ARO (Azure Red Hat OpenShift): Cluster Kubernetes gerenciado com suporte conjunto Microsoft e Red Hat com 99,95% de SLA.'
    ],
    examTraps: [
      'Executar contêiner rápido sem gerenciar VM: Se o enunciado pedir "executar uma tarefa em contêiner em menos de 1 minuto sem provisionar cluster ou infraestrutura de máquinas", a resposta é sempre "Azure Container Instances (ACI)".',
      'Economia de IPs em clusters AKS: Ao escolher entre Kubenet e Azure CNI, o Kubenet é recomendado quando a VNet possui espaço limitado de endereçamento IP.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az acr create --resource-group "rg-containers" --name "acrprodbr01" --sku "Standard" --admin-enabled true\naz container create --resource-group "rg-containers" --name "aci-job" --image "acrprodbr01.azurecr.io/batchjob:v1" --cpu 1 --memory 1.5 --restart-policy OnFailure',
        description: 'Cria registro ACR e instancia contêiner serverless ACI para execução de tarefa.'
      }
    ]
  },

  // =========================================================================
  // DOMÍNIO 4: REDES VIRTUAIS - VNETS (15-20%)
  // =========================================================================
  {
    id: 'vnet-peering',
    title: 'Redes Virtuais (VNets), Peering & Topologia Hub-and-Spoke',
    category: 'Redes',
    domainNumber: 4,
    icon: 'GitFork',
    color: 'text-cyan-400',
    summary: 'Reserva de IPs pelo Azure (.0 a .3), VNet Peering, não-transitividade e uso de Network Virtual Appliances (NVA) com UDRs.',
    deepExplanation: `A Virtual Network (VNet) é o bloco fundamental de rede privada no Azure, permitindo que VMs e outros serviços comuniquem-se com segurança entre si, com a internet e com redes locais.

Reserva Obrigatória de Endereços IP no Azure:
Dentro de cada sub-rede criada no Azure, os QUATRO PRIMEIROS endereços IP e o ÚLTIMO endereço IP de broadcast são reservados para uso interno da plataforma e não podem ser atribuídos a nenhuma VM:
- .0: Endereço de rede.
- .1: Gateway padrão da sub-rede atribuído pelo Azure.
- .2 e .3: Servidores DNS e serviços de mapeamento interno do Azure.
- .255 (em uma rede /24): Endereço de broadcast.
Regra Prática: Em uma sub-rede /24 (256 endereços teóricos), existem apenas 251 IPs utilizáveis, e o primeiro IP disponível para uma máquina virtual é sempre o endereço .4!

VNet Peering (Emparelhamento de Redes Virtuais):
Conecta duas VNets de forma direta através da rede de fibra óptica privada da Microsoft, com latência mínima e sem passar pela internet pública:
- VNet Peering: Mesma região do Azure.
- Global VNet Peering: Regiões geográficas diferentes.

A REGRA DA NÃO-TRANSITIVIDADE DO PEERING:
Por padrão, o VNet Peering NÃO é transitivo!
Se a VNet Spoke 1 está conectada à VNet Hub, e a VNet Spoke 2 está conectada à VNet Hub, a VNet Spoke 1 NÃO consegue se comunicar com a Spoke 2 utilizando apenas os peerings do Hub!
Para interligar as Spokes através da Hub, é obrigatório:
1. Instalar um Network Virtual Appliance (NVA - como o Azure Firewall ou roteador virtual) na VNet Hub.
2. Criar Tabelas de Roteamento Definidas pelo Usuário (UDR - Route Tables) nas sub-redes das Spokes, apontando a rota de destino para o IP privado do NVA com Next Hop = "VirtualAppliance".`,
    keySpecifications: [
      'CIDR Overlapping: Não é permitido criar peering entre VNets que possuam intervalos de endereços IP sobrepostos.',
      'Status de Conexão: O peering deve ser configurado em AMBOS os sentidos (de VNet A para B e de B para A). O status só estará operacional quando indicar "Connected" em ambos os lados.',
      'Gateway Transit: Permite que uma VNet spoke utilize o Gateway de VPN ou ExpressRoute da VNet Hub (configuração "Allow Gateway Transit" no Hub e "Use Remote Gateways" na Spoke).'
    ],
    examTraps: [
      'Primeiro IP disponível para host: Se o CIDR for 10.0.1.0/24, qual o IP da primeira VM criada? Resposta: 10.0.1.4 (pois .0, .1, .2 e .3 são reservados pelo Azure).',
      'Status "Initiated": Configurar o peering apenas de um lado deixa a conexão como "Initiated" e o tráfego é bloqueado até que o peering reverso seja criado.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az network vnet peering create --name "Hub-to-Spoke1" --resource-group "rg-redes" --vnet-name "vnet-hub" --remote-vnet "vnet-spoke1" --allow-vnet-access --allow-gateway-transit',
        description: 'Cria emparelhamento do Hub para a Spoke autorizando trânsito de gateway.'
      },
      {
        tool: 'Azure CLI',
        cmd: 'az network route-table route create --resource-group "rg-redes" --route-table-name "rt-spoke1" --name "RotaParaSpoke2" --address-prefix "10.2.0.0/16" --next-hop-type VirtualAppliance --next-hop-ip-address "10.0.1.4"',
        description: 'Cria rota UDR direcionando tráfego inter-spoke para o NVA do Hub.'
      }
    ]
  },
  {
    id: 'nsg-asg-security',
    title: 'Network Security Groups (NSGs) vs Application Security Groups (ASGs)',
    category: 'Redes',
    domainNumber: 4,
    icon: 'ShieldAlert',
    color: 'text-purple-400',
    summary: 'Filtragem por 5-tuple, prioridades de regras (100 a 4096), regras padrão imutáveis e agrupamento lógico de NICs com ASGs.',
    deepExplanation: `O Network Security Group (NSG) atua como o firewall básico de filtragem com estado (stateful) nas camadas 3 e 4 do modelo OSI. Ele pode ser associado a uma Sub-rede inteira ou diretamente à Placa de Rede (NIC) de uma VM.

Avaliação de Regras baseada em 5-Tupla:
Cada regra avalia:
1. Endereço IP / CIDR de Origem (Source)
2. Porta de Origem (Source Port)
3. Endereço IP / CIDR de Destino (Destination)
4. Porta de Destino (Destination Port)
5. Protocolo (TCP, UDP, ICMP ou Any)

Prioridade de Processamento:
As regras personalizadas possuem prioridades entre 100 e 4096. Números MENORES têm maior precedência e são processados primeiro. Assim que uma regra corresponde aos pacotes, a ação (Allow ou Deny) é aplicada imediatamente e o processamento cessa.

Regras Padrão (Default Rules - imutáveis, prioridade 65000 a 65500):
- 65000 (AllowVNetInBound): Permite todo o tráfego interno originado dentro da VirtualNetwork.
- 65001 (AllowAzureLoadBalancerInBound): Permite que sondas de integridade do balanceador alcancem os servidores backend.
- 65500 (DenyAllInBound): Bloqueia todo o tráfego de entrada não autorizado explicitamente.

Application Security Groups (ASGs):
Os ASGs fornecem agrupamento lógico de interfaces de rede (NICs) baseado na função da aplicação (ex: "asg-web", "asg-database"):
- O ASG NÃO possui regras próprias de Allow/Deny.
- Ele atua como rótulo de destino ou origem dentro das regras do NSG.
- Benefício Crítico: Quando uma nova máquina virtual é provisionada e vinculada ao "asg-web", ela herda instantaneamente todas as regras de firewall do NSG sem que o administrador precise cadastrar o novo endereço IP manualmente!`,
    keySpecifications: [
      'NSG na Subnet vs NSG na NIC: Para tráfego de entrada (Inbound), o NSG da Subnet é avaliado primeiro; se aprovado, o tráfego passa pelo NSG da NIC. Para tráfego de saída (Outbound), a ordem inverte: o NSG da NIC é processado primeiro, seguido pelo NSG da Subnet!',
      'Comunicação Stateful: As respostas ao tráfego de entrada permitido são liberadas automaticamente na saída sem exigir uma regra reversa manual.'
    ],
    examTraps: [
      'Onde associar o ASG: O ASG é vinculado à INTERFACE DE REDE (NIC) da VM, e nunca a uma sub-rede.',
      'Prioridade de regras: Se a regra 200 bloquear a porta 80 e a regra 300 permitir a porta 80, a porta 80 SERÁ BLOQUEADA (número 200 prevalece sobre 300).'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az network asg create --resource-group "rg-redes" --name "asg-web"\naz network nsg rule create --resource-group "rg-redes" --nsg-name "nsg-dmz" --name "Allow-HTTP-to-Web" --priority 200 --direction Inbound --access Allow --protocol Tcp --destination-asgs "asg-web" --destination-port-ranges 80',
        description: 'Cria ASG e vincula como destino em uma regra de NSG.'
      }
    ]
  },
  {
    id: 'azure-bastion',
    title: 'Azure Bastion Host: Acesso RDP & SSH Seguro sem IP Público',
    category: 'Redes',
    domainNumber: 4,
    icon: 'Terminal',
    color: 'text-teal-400',
    summary: 'Serviço PaaS totalmente gerenciado para administração de VMs via navegador web (porta HTTPS 443), sem expor portas 3389 e 22 à internet.',
    deepExplanation: `O Azure Bastion é um serviço PaaS de intermediação implantado dentro de uma VNet corporativa. Ele fornece conectividade remota RDP (porta 3389) e SSH (porta 22) para todas as máquinas virtuais daquela VNet e de VNets conectadas via peering diretamente pelo navegador web (Portal do Azure) através de uma sessão HTML5 criptografada com TLS (porta 443).

Principais Vantagens de Segurança:
- Elimina a necessidade de atribuir endereços IP públicos às interfaces de rede das VMs de infraestrutura.
- Não expõe portas de gerenciamento vulneráveis (RDP 3389 / SSH 22) à internet pública, neutralizando ataques de força bruta, varreduras de portas e malwares automatizados.
- Não exige instalação de nenhum software cliente adicional nem agentes nas máquinas virtuais.

Requisitos de Arquitetura Obrigatórios:
1. Sub-rede Dedicada: Deve ser implantada exclusivamente em uma sub-rede com o nome exato "AzureBastionSubnet".
2. Tamanho Mínimo da Sub-rede: Requer uma máscara de pelo menos /26 (64 endereços) para acomodar a escalabilidade automática de instâncias da plataforma.
3. IP Público Dedicado: Requer um endereço IP público estático com a SKU Standard.`,
    keySpecifications: [
      'SKUs Disponíveis: Developer (instância compartilhada de baixo custo), Basic (acesso direto via portal) e Standard/Premium (permite usar clientes nativos RDP/SSH do Windows/Linux via Azure CLI, gravação de sessões e compartilhamento de links).',
      'Suporte a VNet Peering: Uma única instância de Bastion em uma VNet Hub pode acessar VMs em todas as VNets Spokes conectadas por peering sem necessidade de implantar múltiplos bastions.'
    ],
    examTraps: [
      'Nome e tamanho da Sub-rede do Bastion: A sub-rede DEVE ter o nome exato "AzureBastionSubnet" e ter prefixo /26 ou maior (/25, /24). Qualquer erro de nomenclatura impede a criação do recurso.',
      'Regras de NSG na AzureBastionSubnet: A sub-rede exige regras específicas no NSG (permitir 443 Inbound da Internet e GatewayManager; permitir 3389/22 Outbound para VirtualNetwork). Regras de negação incorretas derrubam a conectividade do serviço.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az network vnet subnet create --resource-group "rg-redes" --vnet-name "vnet-prod" --name "AzureBastionSubnet" --address-prefixes "10.0.10.0/26"\naz network public-ip create --resource-group "rg-redes" --name "pip-bastion" --sku Standard --location "brazilsouth"\naz network bastion create --name "bastion-sp" --public-ip-address "pip-bastion" --resource-group "rg-redes" --vnet-name "vnet-prod"',
        description: 'Criação da AzureBastionSubnet /26, IP público Standard e recurso Azure Bastion.'
      }
    ]
  },
  {
    id: 'load-balancer-vs-appgw',
    title: 'Azure Load Balancer vs Application Gateway: Decisão L4 vs L7',
    category: 'Redes',
    domainNumber: 4,
    icon: 'Split',
    color: 'text-yellow-400',
    summary: 'Comparativo arquitetural de balanceamento de carga Camada 4 (TCP/UDP, latência ultrabaixa) versus Camada 7 (HTTP/HTTPS, roteamento por URL, WAF e terminação SSL).',
    deepExplanation: `A escolha do balanceador de carga correto no Azure depende da camada do modelo OSI e dos recursos exigidos pela aplicação:

1. Azure Load Balancer (Camada 4 - Transporte):
- Opera nos protocolos TCP e UDP brutos.
- Não inspeciona o conteúdo das requisições (não lê URLs, cookies nem cabeçalhos HTTP).
- Algoritmo de Distribuição: Baseado em Hash de 5-tupla (IP de origem, porta de origem, IP de destino, porta de destino e protocolo).
- Suporta persistência de sessão configurando tupla de 2 elementos (IP de origem e IP de destino) ou 3 elementos (+ protocolo).
- Skus: Basic (legado, sem zonas) e Standard (recomendado, seguro por padrão com Deny-All exigindo NSG explícito, suporta Zonas de Disponibilidade e métricas do Monitor).

2. Azure Application Gateway (Camada 7 - Aplicação):
- Atua como um proxy reverso dedicado para tráfego web HTTP, HTTPS e WebSocket.
- Roteamento Inteligente baseado em atributos HTTP:
  * Roteamento baseado em caminho de URL (URL Path-based: ex: direcionar /imagens para um pool e /api para outro).
  * Roteamento multi-site (hospedar múltiplos domínios web diferentes no mesmo gateway com certificados TLS distintos).
- Terminação SSL/TLS: Descarrega o processamento criptográfico pesado dos servidores backend.
- Web Application Firewall (WAF v2): Integrado com conjuntos de regras OWASP para proteção contra ataques comuns da web (SQL Injection, Cross-Site Scripting - XSS).`,
    keySpecifications: [
      'Sub-rede Exclusiva: O Application Gateway EXIGE uma sub-rede dedicada dentro da VNet contendo apenas as instâncias do gateway.',
      'Sondas de Integridade (Health Probes): Load Balancer suporta sondas TCP, HTTP e HTTPS. Se a VM falhar nas tentativas consecutivas, o tráfego é interrompido para ela.',
      'Balanceador Público vs Interno (ILB): Ambos os serviços podem ser provisionados com IP público (virados para a internet) ou com IP privado (para arquiteturas internas de múltiplas camadas).'
    ],
    examTraps: [
      'Qual balanceador escolher para roteamento por caminho de URL (/carrinho): Se o cenário mencionar atributos HTTP, cookies ou URL, a resposta é invariavelmente o "Application Gateway".',
      'Portas de Alta Disponibilidade (HA Ports): O Azure Load Balancer Standard Interno permite criar uma regra de portas HA que balanceia todos os fluxos TCP/UDP em todas as portas simultaneamente (recurso indispensável para pares de firewalls NVAs).'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az network lb create --resource-group "rg-redes" --name "lb-public" --sku "Standard" --frontend-ip-name "LoadBalancerFrontEnd" --backend-pool-name "Pool-VMs"\naz network lb probe create --resource-group "rg-redes" --lb-name "lb-public" --name "HealthProbe80" --protocol "Http" --port 80 --path "/"',
        description: 'Cria Standard Load Balancer com sonda de integridade HTTP.'
      }
    ]
  },
  {
    id: 'hybrid-networking-vpn-expressroute',
    title: 'Redes Híbridas: VPN Gateway (P2S, S2S, VNet-to-VNet), ExpressRoute & NAT',
    category: 'Redes',
    domainNumber: 4,
    icon: 'Radio',
    color: 'text-indigo-400',
    summary: 'Conectividade híbrida com túneis IPsec/IKE (Point-to-Site e Site-to-Site), VNet-to-VNet, links dedicados de alta velocidade ExpressRoute e saída segura via NAT Gateway.',
    deepExplanation: `Soluções de Conectividade Híbrida do Azure:

1. Azure VPN Gateway:
Gateway de rede virtual que envia tráfego criptografado através da internet pública:
- VPN Point-to-Site (P2S): Permite que computadores individuais de funcionários remotos conectem-se com segurança à VNet corporativa a partir de qualquer local via clientes OpenVPN, SSTP ou IKEv2. Autenticação via Microsoft Entra ID, RADIUS ou certificados digitais.
- VPN Site-to-Site (S2S): Conecta a rede local on-premises inteira à VNet do Azure através de túneis IPsec/IKE entre o Virtual Network Gateway e o dispositivo firewall/roteador local (que deve possuir um IP público estático).
- VNet-to-VNet: Conecta duas VNets utilizando gateways de VPN com túneis IPsec criptografados (alternativa ao VNet Peering quando se exige criptografia dedicada de ponta a ponta ou entre assinaturas de diferentes locatários).

2. Azure ExpressRoute:
Conexão privada direta e dedicada entre a infraestrutura local e os datacenters da Microsoft estabelecida através de provedores de conectividade (telcos):
- O tráfego NÃO trafega pela internet pública, garantindo maior confiabilidade, velocidade constante, latência ultrabaixa e segurança máxima.
- Suporta roteamento dinâmico com protocolo BGP (Border Gateway Protocol).
- Ideal para migrações em massa de datacenters, transmissão contínua de grandes volumes de dados e aplicações corporativas de missão crítica com SLA rígido.

3. Azure NAT Gateway:
Serviço totalmente gerenciado que fornece conectividade de saída (outbound) para a internet para todas as máquinas virtuais em sub-redes privadas sem expor seus IPs privados:
- Elimina o problema de esgotamento de portas SNAT (SNAT port exhaustion).
- Cada instância suporta até 16.000 conexões simultâneas por segundo e até 64.000 endereços IP públicos no pool.

4. Service Endpoints vs Private Endpoints:
- Service Endpoint: Estende o espaço de endereçamento da sua VNet diretamente até o serviço PaaS do Azure através do backbone da Microsoft, mantendo o IP público do serviço, mas restringindo o acesso apenas a sub-redes autorizadas.
- Private Endpoint: Cria uma interface de rede (NIC) com um ENDEREÇO IP PRIVADO da sua própria sub-rede para o serviço PaaS do Azure (ex: Azure Storage ou Azure SQL), removendo completamente qualquer exposição à internet pública e eliminando o risco de exfiltração de dados (Private Link).`,
    keySpecifications: [
      'Sub-rede do Gateway de VPN: Deve ser nomeada OBRIGATORIAMENTE como "GatewaySubnet" (recomendado máscara /27 ou /28).',
      'ExpressRoute vs VPN: O ExpressRoute oferece maior largura de banda (até 100 Gbps) e menor latência, mas possui custo superior e requer contratação de circuito com operadora de telecom.',
      'NAT Gateway: Uma sub-rede associada ao NAT Gateway direciona automaticamente todo o tráfego de saída da internet por ele, com prioridade sobre as regras de saída do Load Balancer.'
    ],
    examTraps: [
      'Escolha entre ExpressRoute e VPN Gateway: Se a pergunta exigir "conexão privada sem passar pela internet pública com baixa latência para tráfego massivo", a resposta é EXPRESSROUTE. Se o critério for "baixo custo e rapidez de configuração", é VPN Site-to-Site.',
      'Private Endpoint e DNS: Ao usar Private Endpoints, é obrigatório integrar com Zonas DNS Privadas do Azure (privatelink.blob.core.windows.net) para que as aplicações resolvam o nome do serviço para o IP privado da VNet.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az network vnet subnet create --resource-group "rg-redes" --vnet-name "vnet-prod" --name "GatewaySubnet" --address-prefixes "10.0.255.0/27"\naz network nat gateway create --resource-group "rg-redes" --name "nat-gw-sp" --location "brazilsouth"',
        description: 'Cria a GatewaySubnet reservada e instancia um Azure NAT Gateway.'
      }
    ]
  },
  {
    id: 'azure-dns-traffic-manager-frontdoor',
    title: 'Resolução de Nomes (Azure DNS/Private DNS) & Balanceamento Global',
    category: 'Redes',
    domainNumber: 4,
    icon: 'Compass',
    color: 'text-blue-300',
    summary: 'Azure DNS público e privado com registro automático, Traffic Manager (roteamento por DNS global) e Azure Front Door com aceleração Anycast e WAF.',
    deepExplanation: `Serviços de Resolução de Nomes e Balanceamento Global no Azure:

1. Azure DNS (Zonas Públicas):
Hospeda zonas de domínios públicos no backbone global de servidores Anycast da Microsoft, garantindo respostas de resolução ultrarrápidas e alta disponibilidade com SLA de 100%.

2. Azure Private DNS (Zonas DNS Privadas):
Fornece resolução de nomes de domínio confiável e segura para máquinas virtuais dentro de Redes Virtuais sem a necessidade de manter servidores DNS customizados:
- Virtual Network Link: Vincula a zona privada (ex: corp.local) a uma ou mais VNets.
- Registro Automático (Auto-Registration): Quando ativado no link de rede, as VMs criadas na VNet têm seus registros de host (tipo A) criados e removidos automaticamente na zona privada.

3. Azure Traffic Manager (Balanceamento Global Camada 7 baseado em DNS):
Distribui o tráfego de usuários globalmente para endpoints públicos usando o sistema de resolução DNS:
- Métodos de Roteamento: Prioridade (Active-Passive failover), Ponderado (distribuição percentual de tráfego), Desempenho (envia o usuário para a região com menor latência de rede), Geográfico e Sub-rede.
- Não inspeciona o tráfego HTTP nem intercepta pacotes (trabalha exclusivamente na resposta da consulta DNS).

4. Azure Front Door (CDN Global, Balanceamento e Segurança L7):
Plataforma moderna de entrega de aplicativos web globais que combina:
- Roteamento Anycast global na camada 7 (HTTP/HTTPS) com aceleração de tráfego TCP (Split TCP).
- Web Application Firewall (WAF) global integrado com proteção contra DDoS da camada 7 e mitigação de bots.
- Cache de conteúdo estático (CDN) e terminação SSL nas bordas da rede da Microsoft (Edge Locations).`,
    keySpecifications: [
      'Traffic Manager vs Front Door: O Traffic Manager só faz roteamento no nível de DNS (bom para tráfego não-HTTP ou quando não se deseja proxy reverso). O Azure Front Door atua como proxy reverso Anycast na camada 7, sendo ideal para aplicações web.',
      'SLA do Azure DNS: 100% de disponibilidade para consultas de resolução de nomes.',
      'Zonas Privadas do Azure: Podem ser vinculadas a até centenas de VNets para compartilhamento de resolução entre filiais.'
    ],
    examTraps: [
      'Auto-registration de DNS: Apenas UMA VNet pode ser vinculada à zona DNS privada com a opção de "Registro Automático" ativada ao mesmo tempo. As demais VNets podem ser vinculadas apenas para resolução (Resolution VNets).',
      'Failover de aplicação global: Se o cenário exigir failover automático entre duas regiões com endpoints web e inspeção de cabeçalhos/WAF, a resposta é Azure Front Door.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az network private-dns zone create --resource-group "rg-redes" --name "corp.internal"\naz network private-dns link vnet create --resource-group "rg-redes" --zone-name "corp.internal" --name "link-vnet-prod" --virtual-network "vnet-prod" --registration-enabled true',
        description: 'Cria zona DNS privada e vincula à VNet com registro automático de VMs ativado.'
      }
    ]
  },

  // =========================================================================
  // DOMÍNIO 5: MONITORAMENTO E BACKUP (10-15%)
  // =========================================================================
  {
    id: 'backup-recovery-vault',
    title: 'Backup & Disaster Recovery: Recovery Services Vault vs Backup Vault',
    category: 'Monitoramento',
    domainNumber: 5,
    icon: 'Lock',
    color: 'text-amber-400',
    summary: 'Distinção entre Recovery Services Vault e Backup Vault, Azure Backup Center, Agente MARS para máquinas locais, Cross-Region Restore e Soft Delete.',
    deepExplanation: `O Azure oferece dois tipos especializados de cofres para gerenciamento de cópias de segurança e proteção de dados:

1. Recovery Services Vault (RSV - Cofre dos Serviços de Recuperação):
Projetado para infraestrutura clássica IaaS, cargas de trabalho locais e contingência de desastres:
- Backup nativo de Azure Virtual Machines (captura snapshots consistentes com a aplicação no nível do hipervisor usando a extensão de backup, sem desligar a VM).
- Backup de compartilhamentos do Azure Files.
- Cargas de trabalho locais via MARS Agent (Microsoft Azure Recovery Services) para arquivos e pastas do Windows Server local ou via MABS/DPM.
- Bancos de dados SQL Server e SAP HANA executando em VMs do Azure.
- Azure Site Recovery (ASR) para replicação de máquinas virtuais entre regiões do Azure ou de ambientes VMware/físicos locais para o Azure.

2. Backup Vault (Cofre de Backup):
Projetado para cargas modernas, nativas da nuvem e orientadas a dados:
- Snapshots operacionais de Discos Gerenciados (Azure Managed Disks).
- Backup operacional de contêineres de Blob do Azure Storage.
- Bancos de dados relacionais PaaS (Azure Database for PostgreSQL Flexible Server).
- Backup de volumes do Azure Kubernetes Service (AKS).

Azure Backup Center:
Painel unificado centralizado para governar, monitorar e auditar todas as políticas de backup em múltiplas assinaturas, regiões e cofres a partir de uma interface única com relatórios e integração com Azure Policy.

Agente MARS (Microsoft Azure Recovery Services):
Instalado em servidores Windows locais ou dentro de VMs do Azure para realizar backup no nível de arquivos e pastas diretamente para um Recovery Services Vault:
- Não exige a implantação de servidores adicionais de backup.
- Não suporta backup de estado do sistema em computadores clientes (apenas em Windows Server).`,
    keySpecifications: [
      'Redundância do Cofre: LRS ou GRS. A escolha da redundância DEVE ser feita antes de associar os primeiros itens protegidos.',
      'Cross-Region Restore (CRR): Disponível quando o cofre utiliza redundância GRS. Permite que o administrador restaure VMs na região secundária emparelhada mesmo quando a região primária estiver saudável (essencial para simulações e auditorias de DR).',
      'Soft Delete em Backups: Retém dados de backup excluídos por 14 dias adicionais sem custo extra, prevenindo exclusões maliciosas por ransomware ou erros acidentais.'
    ],
    examTraps: [
      'Qual cofre usar para Managed Disks ou Blobs: Se o enunciado pedir para proteger "Azure Managed Disks snapshots" ou "Blob Storage operacional", a resposta é BACKUP VAULT. Se pedir "VM Azure completa com sistema operacional", a resposta é RECOVERY SERVICES VAULT.',
      'Backup de VM sem impacto de desempenho: O Azure Backup tira instantâneos consistentes com a aplicação e transfere apenas os blocos alterados (backup incremental).'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az backup vault create --resource-group "rg-backup" --vault-name "rsv-corp-sp" --location "brazilsouth"\naz backup protection enable-for-vm --resource-group "rg-backup" --vault-name "rsv-corp-sp" --vm "vm-prod-sp" --policy-name "DefaultPolicy"',
        description: 'Cria Recovery Services Vault e habilita a proteção nativa de backup para uma VM.'
      }
    ]
  },
  {
    id: 'azure-monitor-kql',
    title: 'Azure Monitor, Log Analytics & Consultas KQL (Kusto Query Language)',
    category: 'Monitoramento',
    domainNumber: 5,
    icon: 'Activity',
    color: 'text-rose-400',
    summary: 'Arquitetura de Métricas vs Logs, tabelas essenciais (Heartbeat, Perf, AzureActivity), consultas KQL, Application Insights e regras de alerta.',
    deepExplanation: `O Azure Monitor é a espinha dorsal de observabilidade para coleta, análise e acionamento de telemetria em todo o ambiente de nuvem e local:

Categorias de Dados do Azure Monitor:
1. Métricas: Dados numéricos leves de séries temporais (time-series) coletados em intervalos de 1 minuto em tempo quase real. Ideais para acionamento rápido de alertas e dimensionamento automático (Autoscale).
2. Logs: Registros de eventos com texto estruturado e metadados organizados em tabelas dentro de um Log Analytics Workspace, consultados com a linguagem KQL.

Agente de Coleta:
O Azure Monitor Agent (AMA) é o agente unificado moderno para Windows e Linux que substitui os legados Log Analytics Agent (MMA) e Telegraf. Ele utiliza Regras de Coleta de Dados (DCR - Data Collection Rules) para filtrar eventos antes do envio, economizando custos de ingestão de dados.

Tabelas Essenciais do Log Analytics:
- AzureActivity: Registra auditoria de todas as operações do plano de controle do ARM (quem fez o quê, quando e em qual recurso).
- Heartbeat: Sinal de vida emitido por VMs e agentes a cada 1 minuto (usado para alertar se uma VM parou de responder).
- Perf: Dados de telemetria de desempenho do sistema operacional (% de uso de CPU, memória livre, IOPS de disco).

Sintaxe e Operadores KQL Mais Cobrados:
- \`where\`: Filtra linhas com base em condições lógicas (ex: \`where TimeGenerated > ago(1h) and Level == "Error"\`).
- \`project\`: Seleciona colunas específicas a serem exibidas no resultado.
- \`summarize\`: Executa agregações e cálculos estatísticos (ex: \`summarize count() by Computer\`).
- \`order by\` / \`sort by\`: Ordena os resultados.
- \`render\`: Renderiza visualizações gráficas imediatas (ex: \`render timechart\`, \`render barchart\`).`,
    keySpecifications: [
      'Activity Log vs Resource Logs: O Activity Log é gratuito, retém dados por 90 dias e audita o plano de controle (ex: criação/exclusão de recursos). Os Resource Logs (antigos Diagnostic Logs) mostram operações internas do recurso (plano de dados) e exigem exportação para o Log Analytics.',
      'Application Insights: Focado no monitoramento profundo de código de aplicações web (rastreamento de requisições, dependências lentas, exceções de código e visualização do Application Map).'
    ],
    examTraps: [
      'Diferença entre Azure Monitor e Application Insights: O Azure Monitor é para a infraestrutura como um todo (VMs, redes, bancos). O Application Insights é para desenvolvedores monitorarem o comportamento interno e código da aplicação.',
      'Retenção do Log Analytics: A retenção padrão é de 30 dias (incluída), podendo ser estendida até 730 dias (2 anos), ou até 12 anos em modo Archive Data.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az monitor log-analytics workspace create --resource-group "rg-monitor" --workspace-name "law-corp-sp"\naz monitor log-analytics query -w "law-corp-sp" --analytics-query \'Heartbeat | summarize LastCall = max(TimeGenerated) by Computer\'',
        description: 'Cria workspace do Log Analytics e executa consulta KQL via CLI.'
      }
    ]
  },
  {
    id: 'network-watcher-service-health',
    title: 'Diagnósticos de Rede (Network Watcher) & Azure Service Health',
    category: 'Monitoramento',
    domainNumber: 5,
    icon: 'RadioTower',
    color: 'text-purple-400',
    summary: 'Ferramentas de solução de problemas de rede do Network Watcher (IP Flow Verify, Next Hop, Connection Troubleshoot, Packet Capture) e painel de Service Health.',
    deepExplanation: `O Azure Network Watcher é o conjunto oficial de ferramentas de diagnóstico, monitoramento e auditoria de tráfego para Redes Virtuais do Azure.

Ferramentas Críticas de Diagnóstico do Network Watcher:
1. IP Flow Verify:
Verifica se um pacote de rede (especificado por IP de origem/destino, porta e protocolo) é PERMITIDO ou NEGADO para uma máquina virtual com base nas regras ativas de NSG. Se negado, aponta o nome exato da regra de NSG responsável pelo bloqueio.
2. Next Hop:
Determina o próximo salto de roteamento para o tráfego saindo de uma VM para um endereço IP específico. Identifica se o tráfego irá para a Internet, VirtualNetworkGateway, VirtualAppliance ou se cairá em um buraco negro (None).
3. Effective Security Rules:
Exibe a lista consolidada e agregada de todas as regras de NSG efetivas aplicadas a uma Interface de Rede (NIC), combinando regras herdadas da sub-rede e regras da própria placa de rede.
4. Connection Troubleshoot:
Testa a conectividade fim a fim entre uma VM e outra VM, URL ou endereço IP/porta, avaliando latência, saltos intermediários e identificando falhas de firewall ou roteamento.
5. Packet Capture:
Captura o tráfego de rede em tempo real em nível de pacotes de uma VM e salva em arquivo .cap/pcap em uma Storage Account para análise detalhada no Wireshark.
6. VPN Troubleshoot:
Diagnostica a integridade e problemas de handshake de chaves em Virtual Network Gateways e conexões VPN Site-to-Site.
7. NSG Flow Logs & Traffic Analytics:
Registra todo o fluxo de tráfego IP (IPs, portas, tráfego aceito/recusado) passando pelos NSGs, gerando mapas visuais de tráfego e alertas de segurança de rede no Log Analytics.

Azure Service Health:
Serviço gratuito que fornece uma visão personalizada e contextualizada sobre a saúde dos serviços e datacenters da Microsoft que impactam diretamente seus recursos:
- Status do Serviço (Service Status): Visão global de todos os serviços do Azure em todas as regiões.
- Service Health: Exibe apenas os incidentes ativos, degradações e interrupções que afetam especificamente as suas assinaturas e regiões em uso.
- Planned Maintenance: Notificações antecipadas sobre manutenções de infraestrutura programadas pela Microsoft que possam exigir reinicialização de VMs.
- Health Advisories: Avisos sobre descontinuação de recursos e alterações que exigem ação do administrador.`,
    keySpecifications: [
      'Network Watcher Ativação: O Azure habilita o Network Watcher automaticamente para cada região onde você cria uma VNet.',
      'Extensão de Agente: Ferramentas como Packet Capture e Connection Troubleshoot exigem que a extensão "NetworkWatcherAgent" esteja instalada na VM.'
    ],
    examTraps: [
      'Como verificar rapidamente se uma porta está bloqueada por NSG: A ferramenta correta é SEMPRE o "IP Flow Verify".',
      'Como diagnosticar se uma rota UDR está enviando pacotes para o NVA: A ferramenta correta é o "Next Hop".'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az network watcher test-ip-flow --direction Inbound --protocol TCP --local 10.0.1.4:80 --remote 192.168.1.5:45000 --vm "vm-web01" --nic "nic-web01" --resource-group "rg-redes"',
        description: 'Testa fluxo de IP com IP Flow Verify para validar se a porta 80 está liberada.'
      },
      {
        tool: 'Azure CLI',
        cmd: 'az network watcher show-next-hop --resource-group "rg-redes" --vm "vm-web01" --source-ip "10.0.1.4" --dest-ip "10.2.0.4"',
        description: 'Verifica o próximo salto de rede para o destino via Next Hop.'
      }
    ]
  },
  {
    id: 'cost-management-advisor-alerts',
    title: 'FinOps: Azure Cost Management, Azure Advisor & Alertas',
    category: 'Governança',
    domainNumber: 1,
    icon: 'PiggyBank',
    color: 'text-emerald-300',
    summary: 'Gerenciamento de custos na nuvem (FinOps), orçamentos e previsões, Azure Reservations, Azure Hybrid Benefit, os 5 pilares do Azure Advisor e regras de alerta com Action Groups.',
    deepExplanation: `A disciplina de FinOps e governança financeira no Azure visa maximizar o retorno sobre investimento (ROI) e evitar gastos inesperados:

Azure Cost Management & Billing:
- Análise de Custos (Cost Analysis): Visualização gráfica detalhada de despesas passadas e projeções futuras, filtradas por serviço, assinatura, grupo de recursos, localização ou tag.
- Orçamentos de Custo (Budgets): Definição de limites financeiros para assinaturas ou grupos de recursos com disparo de alertas quando gastos reais ou previstos atingirem porcentagens do limite (ex: 80%, 100%, 120%).
- Exportação de Dados: Agendamento de exportação diária de dados de faturamento brutos em CSV para uma conta de armazenamento do Azure.

Estratégias Chave de Redução de Custos:
1. Azure Reservations (Instâncias Reservadas): Economia de até 72% em comparação com preços pay-as-you-go ao se comprometer com planos de 1 ou 3 anos para VMs, SQL Database ou armazenamento.
2. Azure Hybrid Benefit (Benefício Híbrido): Permite utilizar licenças locais existentes do Windows Server e SQL Server com Software Assurance para abater o custo de licenciamento de VMs no Azure (economia de até 85% quando combinado com Instâncias Reservadas).
3. Desligamento / Desalocação: Desligar máquinas de desenvolvimento e testes fora do horário comercial (estado Deallocated).

Azure Advisor:
Serviço gratuito de consultoria personalizada que analisa continuamente a telemetria do seu ambiente e emite recomendações acionáveis divididas em CINCO PILARES:
1. Custos: Recomenda desligar ou redimensionar VMs ociosas (Right-sizing) e comprar reservas.
2. Segurança: Identifica vulnerabilidades e ausência de MFA (integrado ao Defender for Cloud).
3. Confiabilidade / Disponibilidade: Recomenda configurar backups, zonas de disponibilidade e balanceadores de carga redundantes.
4. Desempenho: Identifica gargalos em consultas de banco de dados e gargalos de rede.
5. Excelência Operacional: Avalia conformidade com políticas do Azure e melhores práticas de gerenciamento.

Alertas do Azure Monitor & Action Groups:
- Regras de Alerta: Disparadas com base em limites de métricas (ex: CPU > 85% por 5 min) ou resultados de consultas KQL (ex: mais de 10 tentativas de login com falha).
- Grupos de Ação (Action Groups): Coleções reutilizáveis de destinatários de notificações (Email, SMS, Chamada de Voz, Push notification) e automações de remediação (Azure Functions, Logic Apps, Webhooks e Runbooks do Azure Automation).
- Regras de Processamento de Alerta (Alert Processing Rules): Permitem suprimir notificações durante janelas programadas de manutenção técnica programada.`,
    keySpecifications: [
      'Alocação de Custos: Tags bem planejadas são a ferramenta indispensável para atribuir centros de custo a departamentos em relatórios de FinOps.',
      'Cota de Recursos (Quota Limits): Limites padrão de núcleos de CPU e assinaturas; aumentos podem ser solicitados gratuitamente abrindo chamado de suporte no portal.'
    ],
    examTraps: [
      'Como economizar na licença do Windows Server em VMs: A resposta é "Azure Hybrid Benefit" (utilizando Software Assurance existente).',
      'Como suprimir alertas durante manutenção de fim de semana: A resposta é utilizar uma "Regra de Processamento de Alerta (Alert Processing Rule)" com ação de supressão no intervalo de data/hora planejado.'
    ],
    commands: [
      {
        tool: 'Azure CLI',
        cmd: 'az consumption budget create --budget-name "Budget-TI-2026" --amount 5000 --time-grain "monthly" --start-date "2026-01-01" --end-date "2026-12-31" --resource-group "rg-core"',
        description: 'Cria orçamento de custo mensal de $5.000 com Azure CLI.'
      },
      {
        tool: 'Azure CLI',
        cmd: 'az advisor recommendation list --category Cost',
        description: 'Lista todas as recomendações de redução de custos ativas do Azure Advisor.'
      }
    ]
  }
];
