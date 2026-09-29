import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { theoreticalSummaries } from "./src/data/summaries";

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

// Initialize Gemini SDK lazily or with check
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
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand") ||
    message.includes("RESOURCE_EXHAUSTED") ||
    message.includes("rate limit")
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
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          ...params,
          model,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const transient = isTransientError(err);
        console.warn(
          `[Gemini API] Tentativa ${attempt + 1}/${maxRetries + 1} com modelo ${model} falhou:`,
          err?.message || err
        );

        if (!transient || attempt === maxRetries) {
          break;
        }

        const backoffMs = Math.pow(2, attempt) * 1200 + Math.random() * 600;
        await delay(backoffMs);
      }
    }
  }

  if (isTransientError(lastError)) {
    throw new Error(
      "Os servidores do modelo Gemini estão temporariamente com alta demanda global (código 503/429). Por favor, aguarde alguns instantes e tente novamente."
    );
  }

  throw lastError;
}

// System prompt for the AZ-104 AI Mentor
const SYSTEM_INSTRUCTION = `Você é o Instrutor Especialista e Mentor no Exame Microsoft Azure Administrator Associate (AZ-104).
Sua missão é explicar conceitos técnicos com precisão arquitetural, apontar armadilhas e pegadinhas comuns da prova da Microsoft, sugerir comandos corretos em Azure CLI e PowerShell/Bicep, e fornecer justificativas claras em Português do Brasil.
Responda de forma didática, direta e estruturada com títulos em negrito, tópicos e blocos de código quando apropriado.`;

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. Chat Tutor
app.post("/api/ai/chat", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "Chave GEMINI_API_KEY não configurada no ambiente (.env)." });
    }

    const { message, history, useSearch } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Mensagem obrigatória." });
    }

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
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

    const response = await generateContentWithRetry(ai, {
      model: PRIMARY_MODEL,
      contents,
      config
    });

    const reply = response.text || "Não foi possível gerar uma resposta no momento.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Erro em /api/ai/chat:", error);
    res.status(500).json({ error: error?.message || "Erro ao consultar Gemini AI" });
  }
});

// 2. Query Notebook Transcript
app.post("/api/ai/query-notebook", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "Chave GEMINI_API_KEY não configurada." });
    }

    const { query, transcript } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Pergunta do aluno é obrigatória." });
    }

    const prompt = `Você é o monitor assistente da aula de Azure AZ-104.
Abaixo está o conteúdo e transcrição da aula gravada pelo professor:

--- INÍCIO DA TRANSCRIÇÃO DA AULA ---
${transcript || "Transcrição de aula sobre Entra ID, Tenants, Subscriptions, Management Groups e Unidades Administrativas."}
--- FIM DA TRANSCRIÇÃO ---

Pergunta do aluno: "${query}"

Responda fundamentando-se exatamente nos ensinamentos do professor no vídeo/notebook e agregue valor com referências da prova oficial AZ-104 da Microsoft em Português.`;

    const response = await generateContentWithRetry(ai, {
      model: PRIMARY_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Erro em /api/ai/query-notebook:", error);
    res.status(500).json({ error: error?.message || "Erro ao analisar o notebook" });
  }
});

// 3. Generate Structured JSON Question
app.post("/api/ai/generate-question", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "Chave GEMINI_API_KEY não configurada." });
    }

    const { domainNumber } = req.body;
    const domainText = domainNumber ? `Domínio ${domainNumber}` : "qualquer domínio do exame AZ-104";
    const grounding = getDomainGrounding(domainNumber);

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
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            technicalTip: { type: Type.STRING }
          },
          required: ["question", "domainName", "options", "correctAnswerIndex", "explanation", "technicalTip"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    res.json(json);
  } catch (error: any) {
    console.error("Erro em /api/ai/generate-question:", error);
    res.status(500).json({ error: error?.message || "Erro ao gerar questão estruturada" });
  }
});

// 4. Generate Structured JSON Flashcards
app.post("/api/ai/generate-flashcards", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "Chave GEMINI_API_KEY não configurada." });
    }

    const { domainNumber } = req.body;
    const domainText = domainNumber ? `Domínio ${domainNumber}` : "qualquer domínio do AZ-104";

    const prompt = `Crie exatamente 3 novos flashcards objetivos de revisão rápida (Pergunta na frente, Resposta técnica com pegadinha no verso, e tag do assunto) para o exame AZ-104 focando em ${domainText}.`;

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
              back: { type: Type.STRING }
            },
            required: ["tag", "front", "back"]
          }
        }
      }
    });

    const flashcards = JSON.parse(response.text || "[]");
    res.json(flashcards);
  } catch (error: any) {
    console.error("Erro em /api/ai/generate-flashcards:", error);
    res.status(500).json({ error: error?.message || "Erro ao gerar flashcards" });
  }
});

// 5. Code & Error Debugger
app.post("/api/ai/debug-code", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "Chave GEMINI_API_KEY não configurada." });
    }

    const { code, errorOutput } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Código ou comando é obrigatório." });
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

    const response = await generateContentWithRetry(ai, {
      model: PRIMARY_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Erro em /api/ai/debug-code:", error);
    res.status(500).json({ error: error?.message || "Erro no debugger de código" });
  }
});

// 6. Architecture Diagram Generator (Generates clear Mermaid diagram + architectural breakdown)
app.post("/api/ai/generate-diagram", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "Chave GEMINI_API_KEY não configurada." });
    }

    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Tópico de arquitetura é obrigatório." });
    }

    const prompt = `Gere uma especificação arquitetural clara para o cenário Azure: "${topic}".
Estruture sua resposta contendo:
1. Um diagrama de arquitetura em formato Mermaid.js (dentro de um bloco \`\`\`mermaid ... \`\`\`) mostrando os componentes, sub-redes, fluxo de tráfego e serviços envolvidos.
2. Componentes e responsabilidades de cada serviço Azure.
3. Regras de conectividade, NSG e roteamento (UDR/Gateways).
4. Dicas de alta disponibilidade e tolerância a falhas para o exame AZ-104.`;

    const response = await generateContentWithRetry(ai, {
      model: PRIMARY_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Erro em /api/ai/generate-diagram:", error);
    res.status(500).json({ error: error?.message || "Erro ao gerar diagrama arquitetural" });
  }
});

// 7. Generate Batch of Questions for Custom Simulado
app.post("/api/ai/generate-simulado-questions", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "Chave GEMINI_API_KEY não configurada." });
    }

    const { domainNumber, count = 5, theme = "Geral AZ-104" } = req.body;
    const requestedCount = Math.min(Math.max(Number(count) || 5, 1), 20);

    const domainMapping: Record<number, string> = {
      1: "Domínio 1: Identidade & Governança (Entra ID, Licenciamento P1/P2, AUs, RBAC, Policies, Locks)",
      2: "Domínio 2: Armazenamento (Storage Accounts, LRS/ZRS/GRS/GZRS, Lifecycle, SAS, Azure Files)",
      3: "Domínio 3: Computação (VMs, Availability Sets/Zones, VMSS, Containers ACR/ACI/ACA, App Service)",
      4: "Domínio 4: Redes Virtuais (VNets, Peering transitivo, NSGs, ASGs, Bastion, Load Balancers, DNS)",
      5: "Domínio 5: Monitoramento & Backup (Azure Monitor, Log Analytics, KQL, Recovery Services Vault, Backup Vault)",
    };

    const targetDomainText = domainNumber && domainMapping[Number(domainNumber)]
      ? domainMapping[Number(domainNumber)]
      : "distribuídas equilibradamente entre os 5 domínios oficiais do exame AZ-104";

    const grounding = getDomainGrounding(domainNumber);

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
   - Evite repetições consecutivas do mesmo índice de resposta correta.
2. Elevação do Nível de Dificuldade:
   - Enunciados com cenários corporativos que exigem interpretação, arquitetura técnica, comandos Azure CLI/PowerShell, análise de custos e SLAs (99,95% vs 99,99%).
   - Distratores plausíveis que representam armadilhas conceituais reais documentadas nos Guias Teóricos (ex: falta de transitividade nativa no peering, regras de herança de tags via Azure Policy, escopos de RBAC vs Funções do Entra ID, reidratação de Archive, etc.).
3. Justificativa Técnica Aprofundada:
   - Explique por que a alternativa correta é a melhor solução e analise as deficiências de cada distrator.

Cada questão deve conter:
- Cenário corporativo realista com requisitos específicos (custo mínimo, alta disponibilidade, menor esforço administrativo).
- O número do domínio (1 a 5) e o nome do domínio.
- Exatamente 4 opções plausíveis de resposta em Português.
- O índice da resposta oficial correta (0 a 3).
- Uma explicação técnica completa e detalhada justificando por que a correta é a melhor opção segundo as boas práticas da Microsoft e apontando as armadilhas das demais opções.`;

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
                items: { type: Type.STRING }
              },
              answer: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "domain", "domainName", "options", "answer", "explanation"]
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || "[]");
    res.json({ questions: parsed });
  } catch (error: any) {
    console.error("Erro em /api/ai/generate-simulado-questions:", error);
    res.status(500).json({ error: error?.message || "Erro ao gerar questões de simulado" });
  }
});

// Vite Middleware / Static Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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
