# AZ-104 Command Center — Guia Completo e Estrutura do Projeto

Plataforma completa e avançada de estudos e preparação para o exame **Microsoft Certified: Azure Administrator Associate (AZ-104)**. 

O projeto conta com **150 questões de simulados autorais rigorosamente calibradas**, modo exame cronometrado no estilo do exame da Microsoft, algoritmo de repetição espaçada (SM-2 / Anki) nos flashcards, detector automatizado de pontos fracos, tutor inteligente integrado com Google Gemini, debugger interativo de comandos Azure CLI/PowerShell, geração e edição de simulados personalizados por IA, gamificação (streaks e conquistas), backup/sincronização de dados e suporte offline como PWA (Progressive Web App).

> **Aviso Legal / Disclaimer:** Este projeto é uma ferramenta independente de estudos e preparação técnica com **questões autorais**. Não possui qualquer vínculo, afiliação, endosso ou patrocínio pela **Microsoft Corporation**. Todas as marcas registradas mencionadas (como Microsoft, Azure, Entra ID, etc.) pertencem aos seus respectivos proprietários.

---

## 📋 Pré-requisitos

- **Node.js**: Versão **18.x, 20.x ou superior** (LTS recomendado).
  ```bash
  node -v
  npm -v
  ```
- **Navegador moderno**: Chrome, Edge, Firefox ou Safari.
- **Chave de API do Gemini (Opcional)**: Necessária apenas para recursos de IA online (Tutor IA, debugger interativo de CLI e geração de novos simulados). Todos os demais recursos (150 questões de simulados, resumos, matrizes, flashcards, relatórios e backup) funcionam 100% offline.

---

## 🚀 Como Executar Localmente

### 1. Clonar ou Extrair o Projeto
Navegue até a pasta do projeto no terminal:
```bash
cd az-104-command-center
```

### 2. Configurar Variáveis de Ambiente (`.env`)
Crie ou edite o arquivo `.env` na raiz do projeto (consulte `.env.example` como referência):
```env
# Porta do servidor (padrão: 3000)
PORT=3000

# Chave do Google Gemini (obtenha gratuitamente em https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=sua_chave_gemini_aqui

# Modelo padrão do Gemini para o Tutor IA e geração de simulados (opcional; padrão: gemini-3.1-flash-lite)
GEMINI_MODEL=gemini-3.1-flash-lite
```

### 3. Instalar Dependências
```bash
npm install
```
*(Caso encontre conflito de peer dependencies no Windows ou npm recente, utilize `npm install --legacy-peer-deps`)*

### 4. Executar em Desenvolvimento
```bash
npm run dev
```
Acesse no navegador: **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor backend Express (com middleware Vite) em `http://localhost:3000`. |
| `npm run build` | Compila o frontend React (Vite) e empacota o backend (`server.ts` -> `dist/server.cjs`). |
| `npm start` | Executa a versão compilada em ambiente de produção (`node dist/server.cjs`). |
| `npm run preview` | Executa o servidor de pré-visualização estática do Vite para inspecionar os arquivos da pasta `dist`. |
| `npm run lint` | Executa a validação de tipagem estática do TypeScript (`tsc --noEmit`). |
| `npm run clean` | Remove as pastas de compilação temporárias (`dist`). |

---

## 🏠 Hospedagem em Servidor Caseiro (Home Server / Homelab)

Para executar a aplicação 24/7 na sua própria infraestrutura doméstica (notebook antigo, Mini PC, Raspberry Pi ou Docker):

- Consulte o guia completo e detalhado no arquivo **[`HOME_SERVER_DEPLOY.md`](./HOME_SERVER_DEPLOY.md)**.
- Inclui instruções para execução com **PM2**, containerização com **Docker Compose**, acesso seguro remoto com **Cloudflare Tunnel** ou **Tailscale VPN** e rotinas de backup.

---

## 🏗️ Estrutura Detalhada do Projeto

Abaixo está o mapa completo da arquitetura e organização dos arquivos:

```text
az-104-command-center/
├── .github/                               # Automação de CI/CD e workflows do GitHub
│   └── workflows/
│       └── deploy.yml                     # Workflow de build e automação CI/CD
│
├── .data/                                # Armazenamento persistente local no backend
│   └── user_storage.json                 # Backup sincronizado de respostas, simulados e histórico
│
├── public/                               # Arquivos estáticos e suporte a PWA Offline
│   ├── 404.html                          # Redirecionamento SPA para roteamento de páginas estáticas
│   ├── manifest.json                     # Manifesto do Progressive Web App (instalável)
│   └── sw.js                             # Service Worker para cache e funcionamento offline
│
├── src/                                  # Código-fonte da aplicação React + TypeScript
│   ├── components/                       # Componentes de interface e modais
│   │   ├── AchievementsModal.tsx         # Modal de conquistas e gamificação de estudo
│   │   ├── AiTutorTab.tsx                # Aba do Tutor IA Gemini, chat com busca e flashcards
│   │   ├── BackupModal.tsx               # Modal de Backup/Restauração JSON e sincronização
│   │   ├── CliDebuggerTab.tsx            # Analisador e validador de comandos Azure CLI / PowerShell
│   │   ├── DashboardTab.tsx              # Painel geral com métricas por domínio e prontidão global
│   │   ├── DecisionMatrixTab.tsx         # Matriz comparativa de decisão para cenários de prova
│   │   ├── ExamHistoryView.tsx           # Gráfico temporal de evolução e histórico de tentativas
│   │   ├── Header.tsx                    # Barra superior com % de prontidão, Pomodoro e streak
│   │   ├── ManageQuestionsModal.tsx      # Modal para editar e excluir questões em simulados IA
│   │   ├── Navigation.tsx                # Barra de navegação por abas com auto-hide ao rolar
│   │   ├── ProgressReportModal.tsx       # Relatório executivo de prontidão formatado para PDF/print
│   │   ├── SimuladosTab.tsx              # Motor dos Simulados (Modo Estudo e Exame Cronometrado)
│   │   ├── SpacedFlashcardsTab.tsx       # Aba dedicada de Flashcards com algoritmo SM-2 (Anki)
│   │   ├── SummariesTab.tsx              # Resumos teóricos profundos, pegadinhas e especificações
│   │   ├── SyllabusTab.tsx               # Guia oficial de objetivos de estudo e pesos do exame
│   │   └── WeakSpotDetector.tsx          # Detector inteligente de pontos fracos e diagnósticos
│   │
│   ├── data/                             # Banco de questões autorais, resumos e dados técnicos
│   │   ├── flashcards.ts                 # Base de flashcards com intervalos SM-2 dos 5 domínios
│   │   ├── questions.ts                  # Agregador e exportador central de todas as questões
│   │   ├── questionsSimulado1.ts         # Simulado 1: Questões 1 a 50 (balanceadas)
│   │   ├── questionsSimulado2.ts         # Simulado 2: Questões 51 a 100 (respostas calibradas)
│   │   ├── questionsSimulado3.ts         # Simulado 3: Questões 101 a 150 (respostas calibradas)
│   │   ├── summaries.ts                  # Guias teóricos aprofundados dos 5 domínios do exame
│   │   ├── syllabus.ts                   # Ementa técnica oficial da certificação AZ-104
│   │   └── transcript.ts                 # Transcrições e notas de aulas do curso preparatório
│   │
│   ├── utils/                            # Utilitários puros e algoritmos de suporte
│   │   ├── gamification.ts               # Cálculo de streak diário e desbloqueio de conquistas
│   │   └── spacedRepetition.ts           # Implementação do algoritmo SuperMemo SM-2 para flashcards
│   │
│   ├── types.ts                          # Definições de tipos, interfaces e modelos de dados
│   ├── App.tsx                           # Componente raiz, gerenciamento de estado e rotas de abas
│   ├── main.tsx                          # Ponto de entrada do React e registro do Service Worker
│   └── index.css                         # Estilos globais e importação do Tailwind CSS v4
│
├── server.ts                             # Servidor Express com rotas de API, proxy Gemini e persistência
├── vite.config.ts                        # Configurações do Vite (React, Tailwind, base relativa e watchers)
├── tsconfig.json                         # Configuração do compilador TypeScript
├── package.json                          # Dependências, metadados e scripts de execução
├── metadata.json                         # Metadados e permissões da aplicação no AI Studio
├── .env.example                          # Modelo de configuração de variáveis de ambiente
├── HOME_SERVER_DEPLOY.md                 # Guia de implantação em servidor doméstico / homelab
└── README.md                             # Documentação geral e guia do projeto
```

---

## 🌟 Funcionalidades Principais

### 1. Simulados com Questões Autorais & Calibração de Respostas
- **150 questões exclusivas e autorais** divididas em 3 simulados com 50 questões cada, cobrindo os 5 domínios do exame.
- **Distribuição estatística balanceada**: As alternativas corretas são distribuídas homogeneamente entre as posições A, B, C e D (~25% cada).
- **Eliminação de viés de tamanho**: Distratores enriquecidos tecnicamente com parâmetros oficiais do Azure, garantindo que o tamanho da resposta não revele a alternativa correta.

### 2. Modo Exame Cronometrado & Histórico de Tentativas
- Simulação fiel ao exame real da Microsoft: tempo corrido sem pausas, nota calculada na escala **0 a 1000** (pontuação de aprovação: **700**).
- Diagnóstico de resultado detalhado por domínio (percentual de acerto e status de aprovação).
- **Histórico de tentativas gravado**: Gráfico de linha temporal e tabela para acompanhar a evolução da sua nota ao longo do tempo.

### 3. Revisão Inteligente & Repetição Espaçada (SM-2)
- **Algoritmo SM-2 (estilo Anki)**: Classifique cards como *Errei*, *Difícil* ou *Fácil* para que o sistema agende as revisões futuras com base no seu nível de retenção.
- **Detector de Pontos Fracos**: Cruza automaticamente as respostas com os pesos de cada domínio, emitindo diagnósticos e atalhos diretos para os tópicos que precisam de reforço.

### 4. Gestão e Edição de Simulados por IA
- Gere simulados inéditos sob medida utilizando o modelo Gemini (padrão: **Gemini 3.1 Flash Lite**, customizável via `GEMINI_MODEL`).
- **Edição e exclusão granular**: Edite enunciados, alternativas, explicações ou remova questões individuais dentro de simulados criados por IA.

### 5. Persistência Dupla e Backup
- **Navegador**: Gravação síncrona no `localStorage` para resposta instantânea.
- **Servidor / Disco**: Sincronização persistente em arquivo (`.data/user_storage.json`) que sobrevive a limpezas de cache do navegador.
- **Exportação/Importação JSON**: Baixe e restaure backups completos de progresso em um clique.
- **Relatório Executivo PDF**: Gere relatórios formatados prontos para impressão ou arquivamento digital.

### 6. Backend com Rate Limiting e Fallback Inteligente
- Proteção contra esgotamento de cotas da API com limitador por IP integrado (`express-rate-limit` manual na rota `/api/ai/*`).
- Sistema de fallback inteligente: se a conexão com a API falhar, o servidor consulta a base de conhecimento local e continua respondendo às dúvidas técnicas.

---

## 🎯 Domínios Abordados no AZ-104

| Domínio | Descrição | Peso no Exame |
| :---: | :--- | :---: |
| **Domínio 1** | Gerenciar Identidades e Governança do Azure (*Entra ID, PIM, SSPR, RBAC, Policy, Locks*) | 20–25% |
| **Domínio 2** | Implementar e Gerenciar Armazenamento (*Storage Accounts, Blobs, Camadas Hot/Cool/Archive, Ciclo de Vida, SAS, Azure Files*) | 15–20% |
| **Domínio 3** | Implantar e Gerenciar Recursos de Computação (*VMs, VMSS, Disponibilidade, Containers, App Service*) | 20–25% |
| **Domínio 4** | Configurar e Gerenciar Redes Virtuais (*VNets, Peering, NSG, ASG, Bastion, Load Balancers, DNS*) | 15–20% |
| **Domínio 5** | Monitorar e Manter Recursos do Azure (*Azure Monitor, Log Analytics, KQL, Alertas, Backup, ASR*) | 10–15% |
