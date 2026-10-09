# Documentação Técnica — AZ-104 Command Center

Esta documentação técnica descreve de forma objetiva a arquitetura, o fluxo de dados, a stack tecnológica, os contratos de API, os modelos de dados e os mecanismos de resiliência do **AZ-104 Command Center**.

> **Aviso Legal:** O projeto é uma iniciativa educacional e independente de preparação para o exame AZ-104 com **questões autorais**. Não possui qualquer vínculo institucional, endosso ou afiliação à Microsoft Corporation.

---

## 1. Visão Geral do Sistema

O **AZ-104 Command Center** é uma aplicação web full-stack desenvolvida para preparação e treinamento avançado para a certificação **Microsoft Certified: Azure Administrator Associate (AZ-104)** com questões de simulados autorais.

### Objetivos Técnicos Principais
- **Simulação Fiel do Exame:** Execução de simulados com questões autorais e tempo corrido, pontuação na escala de referência Microsoft (0 a 1000, nota de corte 700) e calibração estatística de respostas.
- **Aprendizado Ativo e Retenção:** Algoritmo SuperMemo SM-2 para repetição espaçada em flashcards e detecção automática de lacunas de conhecimento com navegação direta para tópicos teóricos.
- **Tutor IA com Resiliência Offline:** Integração server-side com Google Gemini (modelo `gemini-3.1-flash-lite`), com grounding em apostilas técnicas e fallback determinístico local para indisponibilidade de rede ou ausência de chave de API.
- **Persistência Híbrida e PWA:** Funcionamento offline via Service Worker, armazenamento síncrono no `localStorage` e persistência centralizada em arquivo no backend.

---

## 2. Stack Tecnológica

### Frontend
- **Framework & Biblioteca:** React 19 (`react`, `react-dom`)
- **Linguagem:** TypeScript 5.8+ (Strict Mode)
- **Build Tool:** Vite 8 (Hot Module Replacement em dev, bundling otimizado em prod)
- **Estilização:** Tailwind CSS v4 (importado nativamente via `@import "tailwindcss";`)
- **Iconografia:** Lucide React (`lucide-react`)
- **Animações:** Motion (`motion`)
- **Capacidades Offline:** Service Worker (`public/sw.js`) e Web App Manifest (`public/manifest.json`)

### Backend & Runtime
- **Runtime:** Node.js 20+ LTS
- **Servidor HTTP:** Express 4.21+
- **Compilação / Bundling:** 
  - Desenvolvimento: `tsx server.ts` com middleware Vite integrado (`vite.middlewares`).
  - Produção: `esbuild server.ts --bundle --platform=node --format=cjs --packages=external --outfile=dist/server.cjs`.
- **Inteligência Artificial:** SDK oficial `@google/genai` (Google Gen AI SDK v2.4+).
- **Variáveis de Ambiente:** `dotenv`.

---

## 3. Arquitetura da Aplicação

A aplicação adota o padrão de **SPA Full-Stack Desacoplada com Proxy Seguro de IA**:

```
+-------------------------------------------------------------------------+
|                              CLIENT (Browser)                           |
|  +-------------------------------------------------------------------+  |
|  | React 19 SPA (Tabs: Dashboard, Quiz, AI Tutor, Resumos, CLI, etc.)|  |
|  | - Gerenciamento de Estado Local (React Hooks)                     |  |
|  | - Cache Imediato: Window LocalStorage                             |  |
|  | - Service Worker (Cache de Assets Estáticos & PWA)                |  |
|  +---------------------------------+---------------------------------+  |
+------------------------------------|------------------------------------+
                                     | HTTP / JSON (/api/*)
+------------------------------------v------------------------------------+
|                         EXPRESS BACKEND (server.ts)                     |
|  +-----------------------+  +-------------------+  +-----------------+  |
|  |  Static & Vite Proxy  |  |  IP Rate Limiter  |  | Storage Handler |  |
|  |  (Dev: Vite Server /  |  |  (40 req/min por  |  | (Leitura/Escrita|  |
|  |   Prod: dist/ static) |  |   endereço IP)    |  |  em disco)      |  |
|  +-----------------------+  +---------+---------+  +--------+--------+  |
|                                       |                     |           |
|                                       v                     v           |
|                             +-------------------+  +-----------------+  |
|                             | AI Controller &   |  | Persistência    |  |
|                             | Grounding Engine  |  | .data/          |  |
|                             +----+---------+----+  | user_storage    |  |
|                                  |         |       | .json           |  |
+----------------------------------|---------|-------+-----------------+--+
                                   |         |
                  API Key Válida   |         | Falha de Conexão / Sem API Key
                                   v         v
                  +------------------+     +-------------------------+
                  | Google Gemini    |     | Engine de Fallback      |
                  | 3.1 Flash Lite   |     | Determinístico Local    |
                  | (Google GenAI)   |     | (summaries.ts / data)   |
                  +------------------+     +-------------------------+
```

### Princípios Arquiteturais Chave:
1. **Segurança de Credenciais:** A chave `GEMINI_API_KEY` nunca trafega nem é exposta ao cliente web. Todas as requisições de IA passam pelo backend Express via proxy `/api/ai/*`.
2. **Resiliência a Falhas de Rede:** Se a API externa do Gemini retornar erro temporário (503, 429, limite de cota) ou se a chave não for configurada, o backend aciona imediatamente a `generateDomainFallbackResponse`, que faz parsing semântico e responde utilizando a base técnica interna.
3. **Persistência Dupla (Dual Storage):** A escrita de progresso ocorre sincronicamente no `localStorage` do navegador para latência zero na UI e é assincronamente sincronizada com o backend (`/api/storage/sync`), persistindo em `.data/user_storage.json`.

---

## 4. Estrutura de Diretórios

```text
/
├── .data/                               # Armazenamento em disco do backend
│   └── user_storage.json                # Estado serializado dos usuários
├── public/                              # Assets públicos e PWA
│   ├── manifest.json                    # Manifesto PWA instalável
│   └── sw.js                            # Service Worker para cache offline
├── src/
│   ├── components/                      # Componentes visuais do React
│   │   ├── AchievementsModal.tsx        # Modal de gamificação e conquistas
│   │   ├── AiTutorTab.tsx               # Chat do Tutor IA, busca e caderno
│   │   ├── BackupModal.tsx              # Gerenciador de backup e sincronização
│   │   ├── CliDebuggerTab.tsx           # Validador de comandos Azure CLI / PowerShell
│   │   ├── DashboardTab.tsx             # Métricas por domínio e prontidão
│   │   ├── DecisionMatrixTab.tsx        # Matriz de decisão para cenários de prova
│   │   ├── ExamHistoryView.tsx          # Histórico e gráfico de evolução temporal
│   │   ├── Header.tsx                   # Topbar com streak, Pomodoro e score global
│   │   ├── ManageQuestionsModal.tsx     # Editor/exclusão de questões em simulados customizados
│   │   ├── Navigation.tsx               # Navegação responsiva por abas
│   │   ├── ProgressReportModal.tsx      # Modal de relatório executivo para PDF/impressão
│   │   ├── SimuladosTab.tsx             # Motor de simulados (Estudo e Exame cronometrado)
│   │   ├── SpacedFlashcardsTab.tsx      # Sistema de flashcards com algoritmo SM-2
│   │   ├── SummariesTab.tsx             # Guias teóricos aprofundados com pegadinhas
│   │   ├── SyllabusTab.tsx              # Ementa oficial e pesos por domínio
│   │   └── WeakSpotDetector.tsx         # Detector de pontos fracos e atalho para resumos
│   ├── data/                            # Bases de dados estáticas calibradas
│   │   ├── flashcards.ts                # Flashcards padrão dos 5 domínios
│   │   ├── questions.ts                 # Exportador consolidado do banco de questões
│   │   ├── questionsSimulado1.ts        # Simulado 1 (50 questões)
│   │   ├── questionsSimulado2.ts        # Simulado 2 (50 questões)
│   │   ├── questionsSimulado3.ts        # Simulado 3 (50 questões)
│   │   ├── summaries.ts                 # Resumos arquiteturais e armadilhas de prova
│   │   ├── syllabus.ts                  # Pesos e objetivos da Microsoft
│   │   └── transcript.ts                # Notas e transcrições de aula para o Tutor
│   ├── utils/                           # Módulos utilitários puros
│   │   ├── gamification.ts              # Regras de streak e desbloqueio de badges
│   │   └── spacedRepetition.ts          # Implementação do algoritmo SuperMemo SM-2
│   ├── App.tsx                          # Estado central da aplicação e roteamento de abas
│   ├── index.css                        # Configuração global de estilos Tailwind CSS v4
│   ├── main.tsx                         # Bootstrap do React e registro do Service Worker
│   └── types.ts                         # Modelos e interfaces TypeScript
├── server.ts                            # Servidor Express, endpoints REST e proxy Gemini
├── package.json                         # Dependências e scripts de execução
├── tsconfig.json                        # Configuração estrita do compilador TypeScript
├── vite.config.ts                       # Configuração do Vite (plugins e proxy)
├── HOME_SERVER_DEPLOY.md                # Guia de implantação em homelab/servidores privados
└── README.md                            # Guia geral e instruções de uso rápido
```

---

## 5. Modelos de Dados Principais (`src/types.ts`)

### 5.1 Questão de Simulado (`Question`)
```typescript
export interface Question {
  id: number;
  domain: number;          // 1 a 5
  domainName: string;      // Nome oficial do domínio
  question: string;        // Enunciado detalhado do cenário corporativo
  options: string[];       // 4 alternativas calibradas
  answer: number;          // Índice da resposta correta (0 a 3)
  explanation: string;     // Fundamentação técnica completa e análise de distratores
}
```

### 5.2 Flashcard com Repetição Espaçada (`SpacedFlashcard`)
```typescript
export interface SpacedFlashcard extends Flashcard {
  id: string;
  domainNumber: number;
  interval: number;         // Intervalo atual em dias até a próxima revisão
  repetitions: number;      // Número consecutivo de acertos
  easeFactor: number;       // Fator de facilidade SM-2 (padrão: 2.5, mínimo: 1.3)
  dueDate: string;          // Data limite da próxima revisão (YYYY-MM-DD)
  lastReviewed?: string;    // Data da última revisão
  history?: {
    date: string;
    grade: number;          // 0: Errei, 1: Difícil, 2: Bom, 3: Fácil
  }[];
}
```

### 5.3 Tentativa de Exame (`ExamAttempt`)
```typescript
export interface ExamAttempt {
  id: string;
  simuladoId: string;
  simuladoTitle: string;
  timestamp: string;        // ISO 8601
  score: number;            // 0 a 1000 (escala Microsoft)
  passed: boolean;          // score >= 700
  percentage: number;       // Percentual de acerto (0 a 100)
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  domainBreakdown: {
    domainId: number;
    domainName: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
}
```

### 5.4 Estrutura de Backup Completo (`AppDataBackup`)
```typescript
export interface AppDataBackup {
  version: number;
  exportedAt: string;
  userAnswers: Record<number, number>;
  customSimulados: CustomSimulado[];
  examAttempts: ExamAttempt[];
  streak: StudyStreak;
  flashcardProgress?: Record<string, SpacedFlashcard>;
}
```

---

## 6. Endpoints da API REST (`server.ts`)

Todos os endpoints operam sobre JSON e estão agrupados em duas famílias principais:

### 6.1 Persistência e Sistema
| Método | Rota | Descrição | Payload / Resposta |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Verificação de integridade do serviço. | `{ status: "ok", timestamp: string }` |
| `POST` | `/api/storage/sync` | Grava o backup completo do usuário em `.data/user_storage.json`. | Body: `AppDataBackup`<br>Retorno: `{ success: true, savedAt: string }` |
| `GET` | `/api/storage/load` | Carrega os dados persistidos no servidor. | Retorno: `{ empty: boolean, data?: AppDataBackup }` |

### 6.2 Inteligência Artificial (Google Gemini Proxy)
*Nota: Todas as rotas sob `/api/ai/*` passam pelo middleware de rate limiting (`aiRateLimiter`: 40 req/min por IP).*

| Método | Rota | Descrição | Fallback Local |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/chat` | Chat do Tutor IA com suporte opcional a busca na web (`useSearch: boolean`) e histórico de mensagens. | Sim (busca semântica em `summaries.ts`) |
| `POST` | `/api/ai/query-notebook` | Consulta com grounding nas notas e transcrições do curso (`transcript.ts`). | Sim (retorno fundamentado no transcript local) |
| `POST` | `/api/ai/generate-question` | Gera uma questão inédita estruturada em JSON (`responseSchema`) para um domínio específico. | Sim (sorteio balanceado do banco interno) |
| `POST` | `/api/ai/generate-flashcards` | Cria 3 novos flashcards objetivos em JSON com pergunta, resposta técnica e tag. | Sim (retorno de cards padrão do domínio) |
| `POST` | `/api/ai/debug-code` | Audita scripts Azure CLI, PowerShell ou Bicep apontando causa raiz, correção e permissões RBAC. | Sim (auditoria estática baseada em regras) |
| `POST` | `/api/ai/generate-diagram` | Produz especificação arquitetural com diagrama Mermaid.js integrado. | Sim (diagrama de arquitetura Hub-Spoke padrão) |
| `POST` | `/api/ai/generate-simulado-questions` | Gera lote de questões (1 a 20) com distribuição balanceada de alternativas para simulados personalizados. | Sim (amostragem aleatória do banco interno) |

---

## 7. Algoritmos e Lógica de Negócio

### 7.1 Algoritmo de Repetição Espaçada SuperMemo SM-2 (`src/utils/spacedRepetition.ts`)
Para cada avaliação de flashcard pelo usuário (onde a nota $q \in \{0, 1, 2, 3\}$ representa `Errei`, `Difícil`, `Bom` ou `Fácil`):
1. **Atualização do Fator de Facilidade (Ease Factor - $EF$):**
   $$EF' = EF + (0.1 - (3 - q) \times (0.08 + (3 - q) \times 0.02))$$
   Com limite inferior: $EF' \ge 1.3$.
2. **Atualização de Repetições e Intervalo ($I$ em dias):**
   - Se $q < 2$ (erro ou dificuldade extrema):
     $$Repetições = 0, \quad I = 1$$
   - Se $q \ge 2$ (acerto):
     - Para $Repetições = 0 \implies I = 1$
     - Para $Repetições = 1 \implies I = 6$
     - Para $Repetições \ge 2 \implies I = \lceil I_{anterior} \times EF' \rceil$
     - $Repetições = Repetições + 1$
3. **Agendamento ($dueDate$):** Data atual somada a $I$ dias no formato ISO `YYYY-MM-DD`.

### 7.2 Motor de Cálculo do Exame Microsoft (`SimuladosTab.tsx`)
- **Escala de Pontuação:** 0 a 1000 pontos ponderados proporcionalmente:
  $$Score = \text{round}\left(\frac{\text{Acertos}}{\text{Total de Questões}} \times 1000\right)$$
- **Critério de Aprovação:** $Score \ge 700$.
- **Tempo Limite:** 100 minutos contínuos para simulados completos de 50 questões (estilo exame oficial).

### 7.3 Detector de Pontos Fracos e Roteamento Contextual (`WeakSpotDetector.tsx`)
- Calcula a taxa de aproveitamento individual em cada um dos 5 domínios.
- Aplica os pesos oficiais do exame AZ-104 (ex: Domínio 1 e Domínio 3 têm peso 20–25%, enquanto Domínio 5 tem 10–15%).
- Identifica o domínio crítico com menor pontuação e dispara o evento `onOpenSummary(domainId)`.
- O `App.tsx` transiciona o estado para a aba `resumos`, pré-seleciona o filtro daquele domínio, expande o primeiro guia teórico correspondente e realiza scroll suave até o conteúdo.

---

## 8. Segurança e Tratamento de Erros

1. **Proteção de Quota e Rate Limiting:**
   - O backend limita requisições de IA a 40 requisições por minuto por IP.
   - Em caso de estouro, retorna HTTP 429 com cabeçalho `retryAfterSeconds`.
2. **Retry com Backoff Exponencial:**
   - A função `generateContentWithRetry` efetua até 2 tentativas adicionais em erros transitórios (503, 500, 502, 504, 429).
   - O tempo de espera é calculado com backoff exponencial: $2^{\text{attempt}} \times 1000\text{ms} + \text{jitter}$.
3. **Fallback Sem Queda de Serviço:**
   - Caso a ferramenta externa `googleSearch` cause erro de cota ou recusa de permissão, o sistema remove a ferramenta da requisição e tenta imediatamente em modo de inferência pura.
   - Caso o modelo primário (`gemini-3.1-flash-lite`) encontre indisponibilidade permanente, a requisição transiciona de forma transparente para a base local de conhecimento sem lançar erro não tratado para o frontend.

---

## 9. Build, Execução e Deploy

### 9.1 Scripts de Execução (`package.json`)
- `npm run dev`: Inicializa o servidor Express rodando `tsx server.ts`, com o Vite montado como middleware para Hot Module Replacement.
- `npm run build`: Executa `vite build` (gera os estáticos em `dist/`) e empacota o backend com esbuild (`dist/server.cjs`).
- `npm start`: Executa o bundle otimizado de produção via `node dist/server.cjs`.
- `npm run lint`: Executa a verificação estática de tipos do TypeScript sem emitir arquivos (`tsc --noEmit`).

### 9.2 Variáveis de Ambiente (`.env`)
```env
# Porta de escuta do servidor HTTP (padrão: 3000)
PORT=3000

# Chave de API do Google Gemini (necessária para os recursos online de IA)
GEMINI_API_KEY=sua_chave_aqui

# Modelo padrão do Google Gemini utilizado pelo backend
GEMINI_MODEL=gemini-3.1-flash-lite
```

---

## 10. Resumo dos 5 Domínios do Exame AZ-104

| Domínio | Nome Oficial | Peso no Exame |
| :---: | :--- | :---: |
| **Domínio 1** | Gerenciar Identidades e Governança do Azure (*Entra ID, RBAC, PIM, Policies, Locks*) | 20–25% |
| **Domínio 2** | Implementar e Gerenciar Armazenamento (*Storage Accounts, Blobs Hot/Cool/Archive, SAS, Azure Files*) | 15–20% |
| **Domínio 3** | Implantar e Gerenciar Recursos de Computação (*VMs, Availability Zones/Sets, VMSS, Containers ACR/ACI*) | 20–25% |
| **Domínio 4** | Configurar e Gerenciar Redes Virtuais (*VNets, Peering, NSG, ASG, Bastion, Load Balancers, DNS*) | 15–20% |
| **Domínio 5** | Monitorar e Manter Recursos do Azure (*Azure Monitor, Log Analytics, KQL, Backup Vaults, ASR*) | 10–15% |
