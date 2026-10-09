import { Question } from '../types';

/**
 * Questões autorais autênticas extraídas do caderno de estudos e revisões teóricas (OneNote).
 * Cada questão foi estruturada com foco em cenários de exames da Microsoft,
 * alternativas balanceadas e justificativas técnicas fundamentadas nos Guias Teóricos.
 */
export const questionsOneNote: Question[] = [
  {
    id: 201,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Você possui um locatário do Microsoft Entra ID chamado contoso.onmicrosoft.com. A função de Administrador de Usuários está atribuída a um usuário chamado Admin1. Um parceiro externo possui uma conta Microsoft que usa o login user1@outlook.com. Admin1 tenta convidar o parceiro externo para colaborar no locatário do Microsoft Entra ID e recebe a seguinte mensagem de erro: 'Incapaz de convidar o usuário user1@outlook.com: Exceção genérica de autorização'. Você precisa garantir que Admin1 consiga convidar o parceiro externo para fazer logon no locatário com o menor privilégio administrativo. O que você deve fazer?",
    options: [
      "Na aba Nomes de Domínios Personalizados, adicionar e verificar um domínio corporativo próprio.",
      "Na aba Funções e Administradores, atribuir a função de Administrador Global para Admin1.",
      "Na aba Configurações de Usuários, acessar as Configurações de Colaboração Externa e permitir que membros do locatário enviem convites a parceiros externos.",
      "Na aba Relacionamentos Organizacionais, cadastrar um novo provedor de identidade SAML/WS-Fed."
    ],
    answer: 2,
    explanation: "A mensagem 'Exceção genérica de autorização' ao convidar usuários externos (B2B) indica que as configurações de colaboração externa do locatário estão definidas para restringir o envio de convites apenas a funções específicas (ou apenas Administradores Globais). Ao acessar Microsoft Entra ID > Configurações de Usuários > Gerenciar Configurações de Colaboração Externa e habilitar a opção para que membros do diretório possam enviar convites, Admin1 poderá convidar o parceiro externo sem necessidade de receber funções de privilégio excessivo como Administrador Global."
  },
  {
    id: 202,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa possui um locatário do Microsoft Entra ID chamado contoso.com. Você precisa garantir que um auditor terceirizado chamado User1 possa revisar e auditar todas as configurações, usuários, grupos, logs de entrada e políticas do locatário. User1 deve ser estritamente impedido de alterar qualquer configuração ou redefinir senhas. Qual função você deve atribuir a User1 respeitando o princípio do menor privilégio?",
    options: [
      "Leitores de Diretório (Directory Readers)",
      "Leitores de Segurança (Security Readers)",
      "Leitores de Relatórios (Reports Reader)",
      "Leitores Globais (Global Reader)"
    ],
    answer: 3,
    explanation: "A função nativa 'Global Reader' (Leitor Global) é a contraparte de somente leitura do Administrador Global. Ela concede permissão para visualizar todas as configurações, propriedades administrativas, usuários, grupos e políticas em todo o Microsoft Entra ID e serviços M365 integrados, sem conceder nenhuma permissão de gravação, exclusão ou redefinição de senhas. Funções como Directory Readers ou Security Readers são limitadas a subconjuntos de recursos e não permitem revisar todas as configurações do locatário."
  },
  {
    id: 203,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Uma empresa deseja restringir o acesso a seus aplicativos corporativos baseados em nuvem para colaboradores remotos, permitindo a autenticação apenas quando os colaboradores estiverem conectados através de uma VPN corporativa com uma faixa de endereços IP de saída pré-definida (Localização Nomeada). Qual edição mínima do Microsoft Entra ID deve ser adotada para configurar essa política de Acesso Condicional com o menor custo de licenciamento?",
    options: [
      "Microsoft Entra ID Free",
      "Microsoft Entra ID Premium P1",
      "Microsoft Entra ID Premium P2",
      "Microsoft Entra ID Governance"
    ],
    answer: 1,
    explanation: "A funcionalidade de Acesso Condicional (Conditional Access) com base em Localizações Nomeadas (Named Locations / faixas de IP de rede confiável) exige no mínimo a licença Microsoft Entra ID Premium P1. A versão Free não oferece Acesso Condicional (apenas Security Defaults), e a versão Premium P2 adiciona recursos de detecção de risco com Machine Learning (Identity Protection) e PIM, que têm custo superior e não são necessários para filtros de IP estáticos."
  },
  {
    id: 204,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua empresa possui um locatário do Microsoft 365 e um locatário do Microsoft Entra ID chamado contoso.com. A infraestrutura utiliza vários compartilhamentos de arquivos do Azure Files (SMB), cada um destinado a um departamento diferente. O atributo 'Department' no perfil dos usuários do Microsoft Entra ID já está preenchido para todos os colaboradores. Você precisa garantir que os colaboradores tenham acesso aos compartilhamentos de arquivos do seu respectivo departamento com o mínimo de esforço administrativo contínuo. Qual tipo de grupo você deve utilizar?",
    options: [
      "Um Grupo do Microsoft 365 que utiliza o tipo de associação dinâmica de usuário.",
      "Um Grupo de Segurança que utiliza o tipo de associação dinâmica de usuário.",
      "Um Grupo de Distribuição com sincronização híbrida com o Active Directory.",
      "Um Grupo do Microsoft 365 com associação atribuída manualmente por administradores."
    ],
    answer: 1,
    explanation: "Compartilhamentos de arquivos do Azure Files (SMB) utilizam o Azure RBAC para permissões de nível de compartilhamento e ACLs NTFS. Eles oferecem suporte exclusivo para Grupos de Segurança (Security Groups) e NÃO suportam Grupos do Microsoft 365 nem Grupos de Distribuição para autorização de armazenamento. A associação dinâmica (Dynamic User) com regra 'user.department -eq \"Engenharia\"' garante que novos colaboradores adicionados ao departamento entrem no grupo de segurança automaticamente, exigindo zero manutenção administrativa manual."
  },
  {
    id: 205,
    domain: 1,
    domainName: "Identidade & Governança",
    question: "Sua organização tem três escritórios regionais (São Paulo, Rio de Janeiro e Curitiba) e uma assinatura do Azure vinculada a um locatário do Microsoft Entra ID. Você precisa conceder permissões de gerenciamento de usuários e redefinição de senhas para um administrador local em cada escritório, garantindo que o administrador de uma filial não possa visualizar nem gerenciar os colaboradores de outros escritórios. O que você deve implementar?",
    options: [
      "Criar três Grupos de Gerenciamento (Management Groups) e aplicar políticas de Azure Policy.",
      "Configurar políticas de Acesso Condicional restringindo a autenticação por geolocalização.",
      "Criar três Unidades Administrativas (Administrative Units), adicionar os usuários de cada escritório à sua respectiva AU e delegar as funções administrativas no escopo de cada AU.",
      "Criar três assinaturas separadas do Azure e desmembrar o diretório do Entra ID."
    ],
    answer: 2,
    explanation: "Unidades Administrativas (Administrative Units - AUs) são recipientes lógicos do Microsoft Entra ID projetados para descentralizar a administração no modelo de diretório plano. Elas permitem agrupar os usuários e grupos de cada escritório e delegar papéis administrativos (como Administrador de Usuários ou Administrador de Suporte Técnico) restritos exclusivamente aos membros daquela unidade, garantindo o princípio do menor privilégio entre filiais."
  }
];
