# Guia de Hospedagem em Servidor Caseiro (Self-Hosting / Homelab)

Este guia ensina o passo a passo completo para hospedar o **AZ-104 Command Center** no seu próprio servidor em casa (notebook antigo, Mini PC, Raspberry Pi ou máquina virtual Linux/Windows), mantendo a aplicação online 24/7 com suporte total ao Tutor IA e persistência em disco.

---

## 🎯 Vantagens de Hospedar em Casa
1. **Tutor IA 100% Funcional**: A sua chave `GEMINI_API_KEY` fica armazenada de forma segura no seu servidor privado (nunca exposta no navegador dos clientes).
2. **Persistência Centralizada**: O arquivo `.data/user_storage.json` é gravado no disco rígido do servidor, servindo como backup central para todos os seus dispositivos.
3. **Custo Zero de Nuvem**: Não há mensalidades de plataformas de cloud (AWS, Azure, DigitalOcean) para manter a aplicação ativa.

---

## 💻 Requisitos Mínimos
- **Hardware**: Qualquer processador dual-core (Intel/AMD x64 ou ARM64) e no mínimo 1 GB de memória RAM livre.
- **Sistema Operacional**: Ubuntu 22.04/24.04 LTS, Debian 12, Raspberry Pi OS, Fedora ou Windows 10/11.
- **Node.js**: Versão 20 LTS ou superior instalada (`node -v`).

---

## 🚀 Método 1: Instalação Direta com Node.js e PM2 (Recomendado)

O **PM2** é o gerenciador de processos padrão do Node.js. Ele garante que a aplicação continue rodando em segundo plano e reinicie automaticamente caso o servidor reinicie.

### 1. Instalar o PM2 Globalmente
```bash
npm install -g pm2
```

### 2. Clonar ou Copiar o Projeto
```bash
git clone <url-do-seu-repositorio> az-104-command-center
cd az-104-command-center
```

### 3. Configurar as Variáveis de Ambiente
Crie o arquivo `.env`:
```bash
nano .env
```
Adicione o conteúdo:
```env
PORT=3000
GEMINI_API_KEY="sua_chave_do_gemini"
GEMINI_MODEL="gemini-3.1-flash-lite"
```
*(Salve com `Ctrl + O` e saia com `Ctrl + X`)*.

### 4. Instalar Dependências e Compilar
```bash
npm install --legacy-peer-deps
npm run build
```

### 5. Iniciar com o PM2
```bash
pm2 start dist/server.cjs --name "az104-app"
```

### 6. Configurar Inicialização Automática no Boot
Para que a aplicação suba automaticamente se o computador reiniciar ou faltar energia:
```bash
pm2 startup
pm2 save
```

Para verificar o status e logs:
```bash
pm2 status
pm2 logs az104-app
```

---

## 🐳 Método 2: Instalação com Docker e Docker Compose

Se você prefere gerenciar serviços via containers Docker:

### 1. Criar o `Dockerfile` na raiz do projeto (se necessário)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/server.cjs"]
```

### 2. Criar o `docker-compose.yml`
```yaml
version: '3.8'

services:
  az104-command-center:
    build: .
    container_name: az104-server
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - GEMINI_MODEL=gemini-3.1-flash-lite
    volumes:
      - ./data_storage:/app/.data
```

### 3. Subir o container
```bash
docker compose up -d --build
```

---

## 🌐 Como Acessar a Aplicação Fora de Casa (Remotamente)

Para acessar o simulador pelo celular ou notebook no trabalho sem precisar abrir portas vulneráveis no seu roteador (e contornando operadoras com CGNAT):

### Opção A: Cloudflare Tunnel (Acesso Público com Domínio Próprio e HTTPS Gratuito)
1. Crie uma conta gratuita na Cloudflare e instale o `cloudflared`:
   ```bash
   sudo apt install cloudflared
   ```
2. Autentique e crie um túnel apontando para `http://localhost:3000`.
3. Pronto! Você terá um endereço como `https://az104.seudominio.com` com certificado SSL automático.

### Opção B: Tailscale VPN (Acesso Seguro e Privado Ponto a Ponto)
1. Instale o Tailscale no servidor caseiro e no seu celular/notebook (`curl -fsSL https://tailscale.com/install.sh | sh`).
2. Conecte ambos na mesma conta (MagicDNS).
3. Acesse diretamente pelo IP seguro da sua rede mesh Tailscale: `http://100.x.y.z:3000`.

---

## 🔄 Como Atualizar a Aplicação no Servidor Caseiro
Quando você subir alterações no GitHub:
```bash
cd az-104-command-center
git pull origin main
npm install --legacy-peer-deps
npm run build
pm2 restart az104-app
```
