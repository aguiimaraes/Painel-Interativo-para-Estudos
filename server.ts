import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { theoreticalSummaries } from "./src/data/summaries";
import { allSimuladosQuestions, questionsOneNote } from "./src/data/questions";
import { defaultFlashcards } from "./src/data/flashcards";
import { notebookTranscript } from "./src/data/transcript";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to provide domain-grounded knowledge from in-depth theoretical guides
function getDomainGrounding(domainNumber?: number): string {
  const topics = domainNumber
    ? theoreticalSummaries.filter((s) => s.domainNumber === Number(domainNumber))
    : theoreticalSummaries;

  return topics
    .map(
      (t) => `### TÓPICO: ${t.title} (Domínio ${t.domainNumber})
Resumo: ${t.summary}
Fundamentação Técnica:
${t.deepExplanation}
Especificações Chave e Limites:
${t.keySpecifications.map((k) => `- ${k}`).join("\n")}
Pegadinhas e Armadilhas de Prova:
${t.examTraps.map((tr) => `- ${tr}`).join("\n")}`
    )
    .join("\n\n---\n\n");
}

// Fallback intelligent domain responder if Gemini API has external connectivity issues
function generateDomainFallbackResponse(userMessage: string): string {
  const clean = (userMessage || "").toLowerCase();

  let bestTopic: (typeof theoreticalSummaries)[0] | null = null;
  let highestScore = 0;

  for (const topic of theoreticalSummaries) {
    let score = 0;
    const titleWords = topic.title.toLowerCase().split(/\s+/);
    const keywords = [
      ...titleWords,
      topic.category.toLowerCase(),
      `domínio ${topic.domainNumber}`,
      `dominio ${topic.domainNumber}`,
    ];

    for (const kw of keywords) {
      if (kw.length > 2 && clean.includes(kw)) {
        score += 3;
      }
    }

    if (topic.id.includes("vnet") && (clean.includes("vnet") || clean.includes("rede") || clean.includes("peering"))) score += 6;
    if (topic.id.includes("nsg") && (clean.includes("nsg") || clean.includes("asg") || clean.includes("firewall") || clean.includes("porta"))) score += 6;
    if (topic.id.includes("entra") && (clean.includes("entra") || clean.includes("active directory") || clean.includes("sspr") || clean.includes("licen"))) score += 6;
    if (topic.id.includes("storage") && (clean.includes("storage") || clean.includes("blob") || clean.includes("archive") || clean.includes("lrs") || clean.includes("grs"))) score += 6;
    if (topic.id.includes("backup") && (clean.includes("backup") || clean.includes("vault") || clean.includes("recovery"))) score += 6;
    if (topic.id.includes("monitor") && (clean.includes("monitor") || clean.includes("kql") || clean.includes("log") || clean.includes("alerta"))) score += 6;
    if ((clean.includes("vm") || clean.includes("máquina virtual") || clean.includes("availability set") || clean.includes("vmss")) && (topic.id.includes("compute") || topic.id.includes("vm"))) score += 6;

    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && highestScore > 0) {
    const commandsText =
      bestTopic.commands && bestTopic.commands.length > 0
        ? `\n\n**Comandos Chave para o Exame:**\n` +
          bestTopic.commands
            .map((c) => `*${c.tool}* - ${c.description}:\n\`\`\`bash\n${c.cmd}\n\`\`\``)
            .join("\n\n")
        : "";

    return `### **${bestTopic.title} (Domínio ${bestTopic.domainNumber})**

${bestTopic.deepExplanation}

**Especificações Chave e Limites para a Prova AZ-104:**
${bestTopic.keySpecifications.map((k) => `- ${k}`).join("\n")}

**Pegadinhas e Armadilhas Clássicas da Prova:**
${bestTopic.examTraps.map((t) => `- **Atenção:** ${t}`).join("\n")}${commandsText}`;
  }

  return `### **Guia Técnico de Preparação AZ-104**

Para resolver esse cenário no exame Microsoft Certified: Azure Administrator Associate, considere os 5 pilares do exame:

1. **Domínio 1 - Identidades & Governança (20-25%):**
   - Microsoft Entra ID (licenças P1 para Acesso Condicional/Grupos Dinâmicos, P2 para PIM e Identity Protection).
   - SSPR com Password Writeback para AD local.
   - Azure Policy para imposição e Auditoria; Bloqueios de Recursos (ReadOnly vs CanNotDelete).

2. **Domínio 2 - Armazenamento (15-20%):**
   - Redundância LRS, ZRS, GRS (emparelhamento geográfico), GZRS.
   - Camadas Hot, Cool, Cold e Archive (tempo de reidratação Standard até 15h, High < 1h).
   - Azure Files com SMB 3.0 e NFS 4.1.

3. **Domínio 3 - Computação (20-25%):**
   - Máquinas Virtuais em Zonas de Disponibilidade (SLA 99.99%) vs Conjuntos de Disponibilidade (SLA 99.95%, até 3 Domínios de Falha e 20 Domínios de Atualização).
   - VMSS com autoscale baseado em métricas ou agendamento.
   - Containers: ACR (Azure Container Registry) e ACI (Azure Container Instances).

4. **Domínio 4 - Redes Virtuais (15-20%):**
   - VNet Peering não transitivo por padrão; requer NVA com UDR.
   - NSG avaliado por menor prioridade (100 a 4096); regras de inbound e outbound independentes.
   - Azure Bastion Standard para conectividade sem IP público.

5. **Domínio 5 - Monitoramento & Backup (10-15%):**
   - Azure Monitor Agent (AMA) com Data Collection Rules (DCR).
   - Recovery Services Vault (VMs/Azure Files) vs Backup Vault (Blobs/Discos).
   - Consultas KQL para logs no Log Analytics Workspace.

Como posso aprofundar um desses tópicos específicos para a sua dúvida?`;
}

// Initialize Gemini SDK
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const PRIMARY_MODEL = "gemini-3.8-flash";
const FALLBACK_MODEL = "gemini-3.1-flash-lite";

function isTransientError(error: any): boolean {
  const status = error?.status || error?.code || error?.error?.code;
  const message = String(error?.message || "");
  return (
    status === 503 ||
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 504 ||
    status === 403 ||
    message.includes("503") ||
    message.includes("429") ||
    message.includes("403") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand") ||
    message.includes("RESOURCE_EXHAUSTED") ||
    message.includes("rate limit") ||
    message.includes("quota") ||
    message.includes("denied access") ||
    message.includes("PERMISSION_DENIED")
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateContentWithRetry(
  ai: GoogleGenAI,
  params: any,
  maxRetries = 2
): Promise<any> {
  const modelsToTry = [params.model || PRIMARY_MODEL, FALLBACK_MODEL];
  const uniqueModels = [...new Set(modelsToTry)];
  let lastError: any = null;

  for (const model of uniqueModels) {
    let currentParams = { ...params, model };

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent(currentParams);
        return response;
      } catch (err: any) {
        lastError = err;
        const transient = isTransientError(err);
        const errMsg = err?.message || String(err);
        console.warn(
          `[Gemini API] Tentativa ${attempt + 1}/${maxRetries + 1} com modelo ${model} falhou:`,
          errMsg
        );

        // If tools (like googleSearch) caused a quota or permission error, remove tools and retry immediately
        if (
          currentParams.config?.tools &&
          (err?.status === 429 ||
            err?.status === 403 ||
            errMsg.includes("quota") ||
            errMsg.includes("denied") ||
            errMsg.includes("RESOURCE_EXHAUSTED"))
        ) {
          console.warn("[Gemini API] Removendo ferramenta externa (googleSearch) devido a limite de cota e retentando diretamente com o modelo.");
          const cleanConfig = { ...currentParams.config };
          delete cleanConfig.tools;
          currentParams = { ...currentParams, config: cleanConfig };
          continue;
        }

        if (!transient || attempt === maxRetries) {
          break;
        }

        const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        await delay(backoffMs);
      }
    }
  }

  throw lastError;
}

// System prompt for the AZ-104 AI Mentor
const SYSTEM_INSTRUCTION = `Você é o Instrutor Especialista e Mentor no Exame Microsoft Azure Administrator Associate (AZ-104).
Sua missão é explicar conceitos técnicos com precisão arquitetural, apontar armadilhas e pegadinhas comuns da prova da Microsoft, sugerir comandos corretos em Azure CLI e PowerShell/Bicep, e fornecer justificativas claras em Português do Brasil.
Responda de forma didática, direta e estruturada com títulos em negrito, tópicos e blocos de código quando apropriado.`;

// Rate limiter para proteger a cota do Gemini no backend
const ipRateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_MINUTE = 40;

function aiRateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "anonymous";
  const now = Date.now();
  const record = ipRateLimits.get(ip);

  if (!record || now > record.resetTime) {
    ipRateLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    const secondsRemaining = Math.ceil((record.resetTime - now) / 1000);
    return res.status(429).json({
      error: `Limite de requisições excedido (${MAX_REQUESTS_PER_MINUTE} req/min). Por favor, aguarde ${secondsRemaining} segundos antes de tentar novamente.`,
      retryAfterSeconds: secondsRemaining,
    });
  }

  record.count += 1;
  return next();
}

app.use("/api/ai", aiRateLimiter);

// Persistência em disco no servidor (sobrevive a limpeza de cache do navegador)
const DATA_DIR = path.join(__dirname, ".data");
const STORAGE_FILE_PATH = path.join(DATA_DIR, "user_storage.json");
const LEGACY_STORAGE_FILE_PATH = path.join(__dirname, "data", "user_storage.json");

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  console.warn("Aviso ao criar diretório de dados:", e);
}

// Salvar backup completo no servidor
app.post("/api/storage/sync", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ error: "Payload inválido para sincronização." });
    }
    const dataToWrite = {
      ...payload,
      lastServerSync: new Date().toISOString(),
    };
    await fs.promises.writeFile(STORAGE_FILE_PATH, JSON.stringify(dataToWrite, null, 2), "utf-8");
    return res.json({ success: true, savedAt: dataToWrite.lastServerSync });
  } catch (err: any) {
    console.error("Erro ao salvar sincronização no servidor:", err);
    return res.status(500).json({ error: `Falha ao persistir no servidor: ${err.message}` });
  }
});

// Carregar backup do servidor
app.get("/api/storage/load", async (_req, res) => {
  try {
    let filePathToRead = STORAGE_FILE_PATH;
    if (!fs.existsSync(filePathToRead)) {
      if (fs.existsSync(LEGACY_STORAGE_FILE_PATH)) {
        filePathToRead = LEGACY_STORAGE_FILE_PATH;
      } else {
        return res.json({ empty: true });
      }
    }
    const raw = await fs.promises.readFile(filePathToRead, "utf-8");
    const parsed = JSON.parse(raw);
    return res.json({ empty: false, data: parsed });
  } catch (err: any) {
    console.error("Erro ao carregar dados do servidor:", err);
    return res.status(500).json({ error: `Falha ao carregar do servidor: ${err.message}` });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. Chat Tutor
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history, useSearch } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Mensagem obrigatória." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const fallbackReply = generateDomainFallbackResponse(message);
      return res.json({ reply: fallbackReply });
    }

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const h of history) {
        if (h && h.text) {
          contents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          });
        }
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    };

    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    try {
      const response = await generateContentWithRetry(ai, {
        model: PRIMARY_MODEL,
        contents,
        config,
      });

      const reply = response.text || generateDomainFallbackResponse(message);
      res.json({ reply });
    } catch (genError: any) {
      console.warn("Gemini call failed in /api/ai/chat, serving grounded domain fallback:", genError?.message);
      const fallbackReply = generateDomainFallbackResponse(message);
      res.json({ reply: fallbackReply });
    }
  } catch (error: any) {
    console.error("Erro inesperado em /api/ai/chat:", error);
    const fallback = generateDomainFallbackResponse(req.body?.message || "");
    res.json({ reply: fallback });
  }
});

// 2. Query Notebook Transcript
app.post("/api/ai/query-notebook", async (req, res) => {
  try {
    const { query, transcript } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Pergunta do aluno é obrigatória." });
    }

    const activeTranscript = transcript || notebookTranscript;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `### Anotações da Aula (Modo Direto)\n\nCom base nas transcrições do curso AZ-104:\n\n${generateDomainFallbackResponse(query)}`,
      });
    }

    const prompt = `Você é o monitor assistente da aula de Azure AZ-104.
Abaixo está o conteúdo e transcrição da aula gravada pelo professor:

--- INÍCIO DA TRANSCRIÇÃO DA AULA ---
${activeTranscript}
--- FIM DA TRANSCRIÇÃO ---

Pergunta do aluno: "${query}"

Responda fundamentando-se exatamente nos ensinamentos do professor no vídeo/notebook e agregue valor com referências da prova oficial AZ-104 da Microsoft em Português.`;

    try {
      const response = await generateContentWithRetry(ai, {
        model: PRIMARY_MODEL,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.4,
        },
      });

      res.json({ reply: response.text || generateDomainFallbackResponse(query) });
    } catch (apiErr: any) {
      console.warn("Gemini failed in /api/ai/query-notebook, using transcript grounding:", apiErr?.message);
      res.json({
        reply: `### Resumo da Aula e Caderno de Estudos AZ-104\n\n${generateDomainFallbackResponse(query)}`,
      });
    }
  } catch (error: any) {
    console.error("Erro em /api/ai/query-notebook:", error);
    res.json({
      reply: `### Anotações do Caderno AZ-104\n\n${generateDomainFallbackResponse(req.body?.query || "")}`,
    });
  }
});

// 3. Generate Structured JSON Question
app.post("/api/ai/generate-question", async (req, res) => {
  try {
    const { domainNumber } = req.body;
    const domainText = domainNumber ? `Domínio ${domainNumber}` : "qualquer domínio do exame AZ-104";
    const grounding = getDomainGrounding(domainNumber);

    const ai = getGeminiClient();

    if (!ai) {
      // Pick from questions pool
      const filtered = domainNumber
        ? allSimuladosQuestions.filter((q) => q.domain === Number(domainNumber))
        : allSimuladosQuestions;
      const chosen = filtered[Math.floor(Math.random() * filtered.length)] || allSimuladosQuestions[0];
      return res.json({
        question: chosen.question,
        domainName: chosen.domainName,
        options: chosen.options,
        correctAnswerIndex: chosen.answer,
        explanation: chosen.explanation,
        technicalTip: "Dica de prova: Avalie sempre a restrição de menor privilégio administrativo e custo mínimo da solução.",
      });
    }

    const prompt = `Você é um elaborador sênior de exames da certificação Microsoft Certified: Azure Administrator Associate (AZ-104).
Gere uma questão inédita, realista, desafiadora e com cenário corporativo complexo focada em ${domainText}.

BASEIE-SE ESTRITAMENTE NOS GUIAS TEÓRICOS APROFUNDADOS OFICIAIS ABAIXO:
--- INÍCIO DOS GUIAS TEÓRICOS DE REFERÊNCIA ---
${grounding}
--- FIM DOS GUIAS TEÓRICOS ---

DIRETRIZES DE QUALIDADE PEDAGÓGICA E REGRAS DE EXECUÇÃO:
1. Randomização da Alternativa Correta:
   - A primeira alternativa (índice 0) NÃO deve ser a correta por padrão.
   - Distribua a alternativa correta (correctAnswerIndex) de forma verdadeiramente aleatória e imprevisível entre 0, 1, 2 ou 3.
2. Elevação do Nível de Dificuldade:
   - Enunciados com cenários corporativos que exigem interpretação, arquitetura técnica, comandos CLI/PowerShell, análise de custos ou SLAs.
   - Distratores plausíveis que representam armadilhas conceituais reais descritas nos Guias Teóricos (ex: não transitividade nativa do VNet peering, não herança de tags, bloqueio ReadOnly vs CanNotDelete, limitações de camadas Archive vs Cold/Cool, requisitos de SSPR com Password Writeback, etc.).
3. Justificativa Técnica Completa:
   - Explicação detalhada justificando por que a alternativa correta é a melhor solução e apontando as falhas técnicas de cada uma das opções incorretas.
4. Dica Técnica de Memorização:
   - Uma dica rápida e mnemônica para o candidato lembrar no momento da prova.`;

    try {
      const response = await generateContentWithRetry(ai, {
        model: PRIMARY_MODEL,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              domainName: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              technicalTip: { type: Type.STRING },
            },
            required: ["question", "domainName", "options", "correctAnswerIndex", "explanation", "technicalTip"],
          },
        },
      });

      const json = JSON.parse(response.text || "{}");
      res.json(json);
    } catch (genErr: any) {
      console.warn("Gemini question generator fallback invoked:", genErr?.message);
      const filtered = domainNumber
        ? allSimuladosQuestions.filter((q) => q.domain === Number(domainNumber))
        : allSimuladosQuestions;
      const chosen = filtered[Math.floor(Math.random() * filtered.length)] || allSimuladosQuestions[0];
      res.json({
        question: chosen.question,
        domainName: chosen.domainName,
        options: chosen.options,
        correctAnswerIndex: chosen.answer,
        explanation: chosen.explanation,
        technicalTip: "Dica de prova: Foque nas características exclusivas de cada SKU e nos requisitos de segurança de menor privilégio.",
      });
    }
  } catch (error: any) {
    console.error("Erro em /api/ai/generate-question:", error);
    const chosen = allSimuladosQuestions[0];
    res.json({
      question: chosen.question,
      domainName: chosen.domainName,
      options: chosen.options,
      correctAnswerIndex: chosen.answer,
      explanation: chosen.explanation,
      technicalTip: "Dica de prova: Preste atenção aos detalhes do cenário enunciado.",
    });
  }
});

// 4. Generate Structured JSON Flashcards
app.post("/api/ai/generate-flashcards", async (req, res) => {
  try {
    const { domainNumber } = req.body;
    const domainText = domainNumber ? `Domínio ${domainNumber}` : "qualquer domínio do AZ-104";

    const ai = getGeminiClient();
    if (!ai) {
      return res.json(defaultFlashcards.slice(0, 3));
    }

    const prompt = `Crie exatamente 3 novos flashcards objetivos de revisão rápida (Pergunta na frente, Resposta técnica com pegadinha no verso, e tag do assunto) para o exame AZ-104 focando em ${domainText}.`;

    try {
      const response = await generateContentWithRetry(ai, {
        model: PRIMARY_MODEL,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tag: { type: Type.STRING },
                front: { type: Type.STRING },
                back: { type: Type.STRING },
              },
              required: ["tag", "front", "back"],
            },
          },
        },
      });

      const flashcards = JSON.parse(response.text || "[]");
      res.json(flashcards.length > 0 ? flashcards : defaultFlashcards.slice(0, 3));
    } catch (genErr: any) {
      console.warn("Flashcards generator fallback:", genErr?.message);
      res.json(defaultFlashcards.slice(0, 3));
    }
  } catch (error: any) {
    console.error("Erro em /api/ai/generate-flashcards:", error);
    res.json(defaultFlashcards.slice(0, 3));
  }
});

// 5. Code & Error Debugger
app.post("/api/ai/debug-code", async (req, res) => {
  try {
    const { code, errorOutput } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Código ou comando é obrigatório." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: `### Diagnóstico de Infraestrutura Azure (Auditoria Estática)

**1. Comando Analisado:**
\`\`\`bash
${code}
\`\`\`

**2. Verificações Críticas para o Exame AZ-104:**
- **Grupo de Recursos & Assinatura:** Certifique-se de que o contexto ativo (\`az account set --subscription\` ou \`Set-AzContext\`) aponta para a assinatura desejada e que o Resource Group existe na região correta.
- **Funções RBAC Mínimas Requeridas:** Para criar recursos de computação/rede, a identidade requer pelo menos **Virtual Machine Contributor** e **Network Contributor** (ou função personalizada com permissões \`Microsoft.Compute/virtualMachines/*\` e \`Microsoft.Network/virtualNetworks/subnets/join/action\`).
- **Nomenclatura e Parâmetros Obrigatórios:** No Azure CLI, garanta que os parâmetros de localização (\`--location\`), nome (\`--name\`) e dependências (\`--subnet\`, \`--vnet-name\`) estejam informados de acordo com a sintaxe oficial.`,
      });
    }

    const prompt = `Analise o seguinte script ou comando de infraestrutura Azure (CLI, PowerShell, ARM ou Bicep):
\`\`\`
${code}
\`\`\`

Mensagem de erro ou comportamento inesperado relatado:
\`\`\`
${errorOutput || "Nenhum erro explícito fornecido. Faça auditoria de sintaxe, parâmetros obrigatórios e permissões necessárias."}
\`\`\`

Diagnostique:
1. A causa raiz do problema ou erro.
2. A correção precisa com o código/comando ajustado.
3. Permissões de RBAC necessárias para executar esse comando no Azure.
4. Boas práticas do exame AZ-104 associadas.`;

    try {
      const response = await generateContentWithRetry(ai, {
        model: PRIMARY_MODEL,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
        },
      });

      res.json({ reply: response.text });
    } catch (genErr: any) {
      console.warn("Debug code fallback:", genErr?.message);
      res.json({
        reply: `### Diagnóstico do Comando Azure

**Código Submetido:**
\`\`\`bash
${code}
\`\`\`

**Diretrizes de Correção e Boas Práticas (AZ-104):**
1. **Auditoria de Escopo e Permissões:** Verifique se sua identidade possui a atribuição de função correta no escopo do Resource Group (ex: \`Contributor\` ou \`Network Contributor\`).
2. **Dependências de Rede:** Se estiver provisionando interfaces de rede ou VMs, a Sub-rede especificada não pode possuir bloqueios do tipo \`ReadOnly\` e deve ter IPs disponíveis no bloco CIDR.
3. **Sintaxe Atualizada do Azure CLI:** Use parâmetros explícitos com aspas duplas em argumentos com espaços e confirme o resultado com \`az --output table\`.`,
      });
    }
  } catch (error: any) {
    console.error("Erro em /api/ai/debug-code:", error);
    res.json({
      reply: `### Auditoria de Código Azure\n\nVerifique a sintaxe dos comandos no Azure CLI/PowerShell e certifique-se de que a autenticação foi realizada via \`az login\` ou \`Connect-AzAccount\`.`,
    });
  }
});

// 6. Architecture Diagram Generator
app.post("/api/ai/generate-diagram", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Tópico de arquitetura é obrigatório." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: `### Arquitetura de Referência: ${topic}

\`\`\`mermaid
graph TD
    User([Usuário / Internet]) -->|HTTPS 443| AppGW[Application Gateway WAF v2]
    AppGW -->|Subnet Frontend| HubVNet[Hub VNet - 10.0.0.0/16]
    HubVNet -->|Inspeção de Tráfego| FW[Azure Firewall Standard]
    FW -->|VNet Peering| SpokeVNet1[Spoke 1: Compute VNet - 10.1.0.0/16]
    FW -->|VNet Peering| SpokeVNet2[Spoke 2: Data VNet - 10.2.0.0/16]
    SpokeVNet1 --> VM1[VMSS Workloads]
    SpokeVNet2 --> Storage[Azure Storage Account Private Endpoint]
\`\`\`

**Componentes e Diretrizes Técnicas:**
1. **Hub VNet:** Centraliza a conectividade externa, firewall e roteamento.
2. **Spokes VNets:** Isolam as cargas de trabalho computacionais e dados.
3. **Roteamento Transitivo:** Requer rotas definidas pelo usuário (UDR 0.0.0.0/0 direcionando para a IP privada do Azure Firewall).
4. **Alta Disponibilidade:** Distribuição entre Zonas de Disponibilidade (Availability Zones 1, 2 e 3).`,
      });
    }

    const prompt = `Gere uma especificação arquitetural clara para o cenário Azure: "${topic}".
Estruture sua resposta contendo:
1. Um diagrama de arquitetura em formato Mermaid.js (dentro de um bloco \`\`\`mermaid ... \`\`\`) mostrando os componentes, sub-redes, fluxo de tráfego e serviços envolvidos.
2. Componentes e responsabilidades de cada serviço Azure.
3. Regras de conectividade, NSG e roteamento (UDR/Gateways).
4. Dicas de alta disponibilidade e tolerância a falhas para o exame AZ-104.`;

    try {
      const response = await generateContentWithRetry(ai, {
        model: PRIMARY_MODEL,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.5,
        },
      });

      res.json({ reply: response.text });
    } catch (genErr: any) {
      console.warn("Diagram generator fallback:", genErr?.message);
      res.json({
        reply: `### Arquitetura Azure: ${topic}

\`\`\`mermaid
graph TD
    Client([Cliente]) -->|Internet| AGW[Azure Application Gateway]
    AGW -->|Subnet DMZ| VNet[VNet Principal - 10.0.0.0/16]
    VNet -->|NSG Porta 80/443| SubnetWeb[Subnet Web - 10.0.1.0/24]
    SubnetWeb --> VMSS[Conjunto de Escala de VMs - VMSS]
    VMSS -->|Private Endpoint| SA[(Azure Storage - Private Link)]
\`\`\`

**Especificações para o Exame AZ-104:**
- **Segurança de Borda:** Use NSGs vinculados à sub-rede com regras de prioridade bem definidas.
- **Conectividade Segura:** Acesso a dados de armazenamento deve usar Pontos de Extremidade Privados (Private Endpoints) para não expor tráfego à internet.
- **Redundância:** Habilite Zonas de Disponibilidade para SLA de 99.99%.`,
      });
    }
  } catch (error: any) {
    console.error("Erro em /api/ai/generate-diagram:", error);
    res.json({
      reply: `### Diagrama Arquitetural Azure\n\nConsulte a documentação oficial da Microsoft Architecture Center para arquiteturas de referência Hub-and-Spoke.`,
    });
  }
});

// 7. Generate Batch of Questions for Custom Simulado
app.post("/api/ai/generate-simulado-questions", async (req, res) => {
  try {
    const { domainNumber, count = 5, theme = "Geral AZ-104" } = req.body;
    const requestedCount = Math.min(Math.max(Number(count) || 5, 1), 20);

    const domainMapping: Record<number, string> = {
      1: "Domínio 1: Identidade & Governança (Entra ID, Licenciamento P1/P2, AUs, RBAC, Policies, Locks)",
      2: "Domínio 2: Armazenamento (Storage Accounts, LRS/ZRS/GRS/GZRS, Lifecycle, SAS, Azure Files)",
      3: "Domínio 3: Computação (VMs, Availability Sets/Zones, VMSS, Containers ACR/ACI/ACA, App Service)",
      4: "Domínio 4: Redes Virtuais (VNets, Peering transitivo, NSGs, ASGs, Bastion, Load Balancers, DNS)",
      5: "Domínio 5: Monitoramento & Backup (Azure Monitor, Log Analytics, KQL, Recovery Services Vault, Backup Vault)",
    };

    const targetDomainText =
      domainNumber && domainMapping[Number(domainNumber)]
        ? domainMapping[Number(domainNumber)]
        : "distribuídas equilibradamente entre os 5 domínios oficiais do exame AZ-104";

    const grounding = getDomainGrounding(domainNumber);
    const ai = getGeminiClient();

    const fallbackQuestions = () => {
      const pool = domainNumber
        ? allSimuladosQuestions.filter((q) => q.domain === Number(domainNumber))
        : allSimuladosQuestions;
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, requestedCount);
    };

    if (!ai) {
      return res.json({ questions: fallbackQuestions() });
    }

    const prompt = `Você é um especialista em elaboração de exames e simulados para a certificação oficial Microsoft Azure Administrator (AZ-104).
Sua tarefa é gerar exatamente ${requestedCount} questões inéditas, realistas e de alto nível de exigência técnica focando em: ${targetDomainText}.
Tema/Contexto desejado: "${theme}".

UTILIZE OBRIGATORIAMENTE COMO BASE TÉCNICA OS SEGUINTES GUIAS TEÓRICOS APROFUNDADOS E SUAS RESPECTIVAS PEGADINHAS:
--- INÍCIO DOS GUIAS TEÓRICOS ---
${grounding}
--- FIM DOS GUIAS TEÓRICOS ---

DIRETRIZES DE QUALIDADE PEDAGÓGICA E REGRAS DE EXECUÇÃO:
1. Randomização da Alternativa Correta:
   - A primeira alternativa (índice 0 / A) NÃO deve ser a correta por padrão.
   - Distribua a alternativa correta de forma verdadeiramente aleatória e equilibrada entre as opções disponíveis (0, 1, 2, 3).
2. Elevação do Nível de Dificuldade:
   - Enunciados com cenários corporativos que exigem interpretação, arquitetura técnica, comandos Azure CLI/PowerShell, análise de custos e SLAs.
3. Justificativa Técnica Aprofundada:
   - Explique por que a alternativa correta é a melhor solução e analise as deficiências de cada distrator.

Cada questão deve conter:
- Cenário corporativo realista com requisitos específicos.
- O número do domínio (1 a 5) e o nome do domínio.
- Exatamente 4 opções plausíveis de resposta em Português.
- O índice da resposta oficial correta (0 a 3).
- Uma explicação técnica completa e detalhada.`;

    try {
      const response = await generateContentWithRetry(ai, {
        model: PRIMARY_MODEL,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                domain: { type: Type.INTEGER },
                domainName: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                answer: { type: Type.INTEGER },
                explanation: { type: Type.STRING },
              },
              required: ["question", "domain", "domainName", "options", "answer", "explanation"],
            },
          },
        },
      });

      const parsed = JSON.parse(response.text || "[]");
      res.json({ questions: parsed.length > 0 ? parsed : fallbackQuestions() });
    } catch (genErr: any) {
      console.warn("Simulado questions generator fallback:", genErr?.message);
      res.json({ questions: fallbackQuestions() });
    }
  } catch (error: any) {
    console.error("Erro em /api/ai/generate-simulado-questions:", error);
    res.json({ questions: allSimuladosQuestions.slice(0, 5) });
  }
});

// Vite Middleware / Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: {
          ignored: ["**/.data/**", "**/data/**", "**/user_storage.json", "**/*.json"],
        },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AZ-104 Server running at http://localhost:${PORT}`);
  });
}

startServer();
