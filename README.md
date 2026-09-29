# AZ-104 Command Center — Guia de Instalação e Execução Local

Plataforma de estudos avançada para a certificação **Microsoft Certified: Azure Administrator Associate (AZ-104)**, com 150 questões de simulados oficiais, gerador de simulados por IA com Google Gemini, resumos técnicos aprofundados, analisador de comandos CLI/PowerShell, e tutor de inteligência artificial.

---

## 📋 Pré-requisitos

Antes de iniciar no seu notebook ou computador local, certifique-se de ter instalado:

1. **Node.js**: Versão **18.x, 20.x ou superior** (LTS recomendado).
   - Para verificar no terminal:
     ```bash
     node -v
     npm -v
     ```
2. **Git** (opcional, caso esteja clonando o repositório).

---

## 🚀 Passo a Passo de Instalação

### 1. Descompactar ou Clonar o Projeto
Extraia o arquivo ZIP na pasta desejada do seu computador ou clone o repositório:
```bash
cd az-104-command-center
```

### 2. Configurar as Variáveis de Ambiente (.env)
Crie um arquivo chamado `.env` na raiz do projeto (mesma pasta onde está o `package.json`):

```env
# Porta do servidor (padrão: 3000)
PORT=3000

# Chave de API do Google Gemini (obtenha gratuitamente em https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=sua_chave_gemini_aqui
```

> **Nota:** A chave `GEMINI_API_KEY` é necessária para as funcionalidades de IA (Tutor Gemini, gerador de simulados e debugger de CLI). O restante dos simulados (150 questões oficiais), resumos teóricos e matriz de decisão funcionam normalmente offline.

---

### 3. Instalar as Dependências

No terminal da pasta do projeto, execute:

```bash
npm install
```

💡 **Dica para resolução de Peer Dependencies no Windows/Linux:**  
Se o npm exibir um aviso de conflito de dependências (`ERESOLVE` / `peer dependency`), use a flag recomendada:
```bash
npm install --legacy-peer-deps
```

---

### 4. Executar em Modo de Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o seu navegador de preferência e acesse:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor backend Express e o frontend Vite integrado na porta 3000. |
| `npm run build` | Compila o frontend e o backend em pacote de produção na pasta `/dist`. |
| `npm start` | Executa a versão compilada de produção (`node dist/server.cjs`). |
| `npm run lint` | Valida tipagens TypeScript e possíveis inconsistências no código. |

---

## 🏗️ Estrutura do Projeto

```
az-104-command-center/
├── src/
│   ├── components/       # Componentes da interface (Simulados, Resumos, Tutor IA, etc.)
│   ├── data/             # 150 questões oficiais (5 domínios), flashcards e resumos
│   ├── types.ts          # Tipos e interfaces TypeScript
│   ├── App.tsx           # Componente raiz da aplicação
│   └── main.tsx          # Ponto de entrada React
├── server.ts             # Backend Express com integração ao Google Gemini 3
├── package.json          # Dependências e scripts
└── README.md             # Instruções de uso
```

---

## 🎯 Domínios Abordados no AZ-104

1. **Domínio 1 (20–25%):** Gerenciar Identidades e Governança do Azure (Microsoft Entra ID, Licenças P1/P2, AUs, RBAC, Policies, Locks).
2. **Domínio 2 (15–20%):** Implementar e Gerenciar Armazenamento (Storage Accounts, LRS/ZRS/GRS/GZRS, Lifecycle, SAS, Azure Files).
3. **Domínio 3 (20–25%):** Implantar e Gerenciar Recursos de Computação do Azure (VMs, Availability Sets/Zones, VMSS, Containers, App Service).
4. **Domínio 4 (15–20%):** Configurar e Gerenciar Redes Virtuais (VNets, Subnets, Peering, NSGs, ASGs, Bastion, Load Balancers, DNS).
5. **Domínio 5 (10–15%):** Monitorar e Manter Recursos do Azure (Azure Monitor, Log Analytics, KQL, Alertas, Recovery Services Vault, Backup Vault).
