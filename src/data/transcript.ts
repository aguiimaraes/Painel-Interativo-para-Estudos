export const notebookTranscript = `
Caderno de Estudos Aprofundados - Exame Microsoft Azure Administrator Associate (AZ-104)

=============================================================================
AULA 01: MICROSOFT ENTRA ID & IDENTIDADES
=============================================================================
- Recursos do Microsoft Entra ID (antigo Azure Active Directory):
  * Gerenciamento de identidade baseado em nuvem, controle de acesso seguro aos serviços e recursos do Azure.
  * Autenticação moderna via HTTP/REST: SAML 2.0, OAuth 2.0, OpenID Connect e WS-Federation. Diferente do AD DS local que usa Kerberos, NTLM e LDAP.
  * Estrutura plana (flat): não possui Unidades Organizacionais (OUs) nem GPOs.

- Dispositivos no Entra ID:
  1. Dispositivos Registrados (Azure AD Registered): Cenário BYOD (Traga Seu Próprio Dispositivo). Login com conta Microsoft pessoal/corporativa, controle via MDM (Microsoft Intune). Sistemas: Windows 10+, iOS, Android, macOS.
  2. Dispositivos Associados (Azure AD Joined): Organizações cloud-only. Dispositivos da empresa ingressados exclusivamente no Entra ID. Suporte a Acesso Condicional e SSO. Windows 10+.
  3. Dispositivos Híbridos (Hybrid Azure AD Joined): Ingressados no AD local e no Entra ID. Mantêm GPO e autenticação de máquina Kerberos/NTLM para apps legados Win32. Windows 7+.

- SSPR (Self-Service Password Reset):
  * Regras: 1º Determinar quem pode usar (Nenhum, Selecionado, Todos); 2º Escolher número e métodos de autenticação (email, telefone, SMS, perguntas, app autenticador); 3º Exigir registro prévio no momento do MFA.
  * Password Writeback: Sincronização reversa da senha alterada na nuvem para o AD DS local em tempo real. Exige licença Microsoft Entra ID P1 ou P2.

- Contas e Grupos no Entra ID:
  * Criação em massa (Bulk Create) via modelo CSV baixado do Portal.
  * Grupos de Segurança: Usados para gerenciar acesso e permissões a recursos; aceitam usuários e dispositivos; sem expiração automática.
  * Grupos Microsoft 365: Foco em colaboração (SharePoint, Exchange, Teams); aceitam apenas usuários; expiram após 30+ dias.
  * Tipos de Associação: Atribuída (manual) ou Dinâmica (baseada em atributos; exige licença P1/P2 por membro). Dispositivo Dinâmico é exclusivo de Grupos de Segurança.
  * Usuários Externos (B2B): Convites por email ou lote CSV. Erro de "Exceção genérica de autorização" ao convidar parceiro externo ocorre quando a política em Configurações de Usuários > Colaboração Externa bloqueia convites por membros.
  * Licença e Local de Uso (Usage Location): Parâmetro obrigatório no perfil antes de atribuir licença P1/P2.

- Unidades Administrativas (Administrative Units - AUs):
  * Blocos lógicos para descentralizar a administração no modelo plano do Entra ID (equivalente moderno das OUs).
  * Permitem delegar funções com escopo restrito (ex: Administrador de Senhas ou Suporte Técnico apenas para usuários da filial de São Paulo ou do departamento de RH).
  * Exigem licença Entra ID P1 ou P2 para administradores com funções delegadas na AU.

- Matriz de Licenças:
  * Free: Até 500k objetos, SSO ilimitado, B2B, MFA básico.
  * Premium P1: Grupos Dinâmicos, Acesso Condicional por localização/IP, SSPR com Password Writeback.
  * Premium P2: Identity Protection (detecção de risco de usuário e entrada com Machine Learning como viagem impossível), Privileged Identity Management (PIM) para elevação temporária Just-In-Time e revisões de acesso.

=============================================================================
AULA 02: GOVERNANÇA, ASSINATURAS, RBAC & ARM TEMPLATES
=============================================================================
- Hierarquia de Governança:
  Root Management Group -> Management Groups (até 6 níveis de profundidade, até 10.000 grupos) -> Subscriptions -> Resource Groups (até 980 por assinatura) -> Resources individuais. Herança descendente automática de RBAC, Policies e Locks.

- Regras de Grupos de Recursos (Resource Groups):
  Recursos pertencem a apenas um grupo. Grupos não podem ser aninhados nem renomeados. Mover recursos bloqueia os RGs de origem e destino durante a operação. Serviços que não podem ser movidos: Azure AD Domain Services, ExpressRoute e Site Recovery.

- Resource Locks (Bloqueios de Recursos):
  Atuam no plano de controle do ARM.
  * CanNotDelete: Permite leitura e modificação; impede exclusão.
  * ReadOnly: Impede qualquer modificação e exclusão; permite apenas leitura (impede até ligar/desligar VMs pois altera metadados de alocação de computação).
  * Um usuário com permissão de Owner não consegue excluir recurso com CanNotDelete sem antes remover o bloqueio manualmente.

- Resource Tags:
  Metadados (Key:Value) para organização e faturamento (FinOps). Limite de até 50 tags por recurso. NÃO são herdadas automaticamente de grupos de recursos; exigem Azure Policy para propagação.

- Azure RBAC (Controle de Acesso Baseado em Função):
  * 3 pilares: Quem (Security Principal), O que (Role Definition) e Onde (Scope).
  * Funções nativas: Owner (acesso total + delegar acesso), Contributor (cria e gerencia todos os recursos técnicos, mas não pode conceder acesso a outros), Reader (somente leitura), User Access Administrator (gerencia acessos RBAC sem gerenciar recursos técnicos).
  * Custom Roles via JSON: Definem "actions", "notActions", "dataActions", "notDataActions" e "assignableScopes". Criadas via CLI (\`az role definition create --role-definition "@arquivo.json"\`) ou PowerShell (\`New-AzRoleDefinition\`).

- Azure Policy:
  * Regras técnicas em JSON ("if" e "then") com efeitos: "deny" (bloqueia requisição no ARM), "audit" (registra não conformidade), "modify" (altera tags/propriedades) e "deployIfNotExists" (implanta recursos faltantes).
  * Iniciativas de Política: Conjuntos de políticas agrupadas (ex: conformidade ISO ou CIS).

- ARM Templates & Bicep:
  * Sintaxe declarativa de Infraestrutura como Código (IaC).
  * Seções do ARM JSON: $schema, contentVersion, parameters (tipos string, securestring, int, bool, array, object), variables, resources (type, apiVersion, name, location, dependsOn) e outputs.
  * Modos de Implantação: Incremental (padrão; mantém recursos existentes) versus Complete (exclui do Resource Group tudo o que não constar no template).
  * Bicep: Linguagem concisa, modular e com segurança de tipos que compila diretamente para ARM JSON.

=============================================================================
AULA 03: ARMAZENAMENTO (STORAGE ACCOUNTS, BLOBS, FILES & SYNC)
=============================================================================
- Tipos de Contas de Armazenamento:
  * GPv2 (General Purpose v2): Padrão recomendado; suporta Blobs, Files, Queues, Tables, todas as camadas de acesso e BOR.
  * GPv1: Legado; sem suporte a camadas de acesso.
  * BlockBlobStorage Premium: Alto IOPS e baixa latência para blobs de bloco.

- Redundância de Armazenamento:
  * LRS: 3 cópias em 1 datacenter local (11 noves de durabilidade).
  * ZRS: 3 cópias em 3 Zonas de Disponibilidade distintas na mesma região (12 noves).
  * GRS: 3 cópias locais em LRS + 3 cópias assíncronas em LRS em região par secundária (16 noves).
  * RA-GRS: GRS com endpoint de somente leitura permanente na região secundária sem necessidade de failover.
  * GZRS / RA-GZRS: 3 cópias ZRS primárias + 3 cópias LRS secundárias.
  * Failover Gerenciado pelo Cliente: Transforma a secundária em primária e converte a conta para LRS.

- Camadas de Blobs:
  * Hot (Frequente): Retenção mínima 0 dias; menor custo de transação, maior custo de armazenamento.
  * Cool (Esporádico): Retenção mínima cobrada de 30 dias.
  * Cold (Frio): Retenção mínima cobrada de 90 dias; dados online com disponibilidade imediata.
  * Archive (Arquivo): Retenção mínima cobrada de 180 dias; menor custo por GB. Fica OFFLINE e não pode ser lido diretamente. Reidratação Padrão (até 15h) ou Alta Prioridade (<1h para <10GB).
  * Lifecycle Management: Regras automáticas diárias baseadas em dias após modificação, criação ou último acesso.

- Segurança e Acesso:
  * Access Keys (Key1 e Key2): Acesso total sem restrição.
  * SAS (Shared Access Signatures): Token temporário com permissões granulares, expiração, restrição por IP e protocolo HTTPS. Tipos: User Delegation SAS (com Entra ID; mais segura), Service SAS e Account SAS.
  * Stored Access Policies (SAP): Políticas no contêiner que permitem revogar SAS instantaneamente sem rotacionar as Access Keys da conta inteira.
  * Armazenamento Imutável (WORM): Retenção baseada em tempo (1 a 146.000 dias) versus Retenção Legal (Legal Hold para auditoria judicial).

- Azure Files & Migração:
  * Protocolos SMB 3.0 (porta TCP 445) e NFS 4.1.
  * Identity-Based Access (IBA): Permissões SMB atribuídas diretamente a identidades do Microsoft Entra ID.
  * Azure File Sync: Cache local em Windows Server com Cloud Tiering (arquivos frios na nuvem como ponteiros).
  * Ferramentas: Storage Explorer (GUI), AzCopy (CLI otimizada paralela), Azure Data Box (dispositivos físicos de 40 TB a 1 PB para contornar internet lenta) e Import/Export Job.

=============================================================================
AULA 04: REDES VIRTUAIS, PEERING, SEGURANÇA & BALANCEAMENTO
=============================================================================
- Regras de VNet e Subnets:
  * O Azure reserva compulsoriamente os 4 PRIMEIROS IPs (.0 rede, .1 gateway, .2/.3 DNS/mapeamento) e o ÚLTIMO IP (broadcast) de toda sub-rede. O primeiro IP disponível para uma VM em um /24 é sempre o .4.
  * VNet Peering: Comunicação de baixa latência pelo backbone da Microsoft. É NÃO-TRANSITIVO por padrão. Para ligar Spoke 1 e Spoke 2 através do Hub, é obrigatório NVA (Firewall) e tabela de rotas UDR nas sub-redes com Next Hop = "VirtualAppliance".

- Segurança de Rede:
  * Network Security Groups (NSGs): Filtragem stateful em camadas 3 e 4 por 5-tupla (IP origem/destino, porta origem/destino, protocolo). Prioridade de 100 a 4096 (números menores têm precedência).
  * Regras padrão: 65000 (AllowVNetInBound), 65001 (AllowAzureLoadBalancerInBound) e 65500 (DenyAllInBound).
  * Application Security Groups (ASGs): Agrupamento lógico de interfaces de rede (NICs) por função (ex: asg-web) para simplificar regras de NSG sem digitar IPs.
  * Azure Bastion: Conexão segura RDP (3389) e SSH (22) via navegador web (porta 443) sem expor IPs públicos. Requer a sub-rede obrigatória "AzureBastionSubnet" com prefixo mínimo /26 e IP público estático Standard.

- Balanceamento de Carga:
  * Azure Load Balancer (Camada 4): Distribuição de tráfego TCP/UDP por hash de 5-tupla. Standard Load Balancer suporta Zonas de Disponibilidade e é seguro por padrão (exige NSG para entrada).
  * Azure Application Gateway (Camada 7): Proxy reverso HTTP/HTTPS com roteamento baseado em URL (/imagens vs /videos), roteamento multi-site, terminação SSL e WAF integrado com regras OWASP. Requer sub-rede dedicada.
  * Azure Traffic Manager: Balanceamento global baseado em DNS para endpoints públicos.
  * Azure Front Door: Aceleração global Anycast na camada 7, CDN, terminação SSL e WAF de borda.

- Conectividade Híbrida:
  * VPN Gateway: P2S (funcionários remotos), S2S (redes inteiras via IPsec/IKE com IP público local) e VNet-to-VNet. Requer a sub-rede reservada "GatewaySubnet".
  * Azure ExpressRoute: Link de fibra dedicado e privado através de operadora, sem passar pela internet pública, baixa latência e suporte a BGP.
  * Azure NAT Gateway: Saída para internet para sub-redes privadas sem IP público, prevenindo esgotamento de portas SNAT.
  * Private Endpoint: Projeta interface de rede com IP PRIVADO da VNet para o serviço PaaS, eliminando qualquer acesso público.

=============================================================================
AULA 05: COMPUTAÇÃO (VMS & APP SERVICE) E MONITORAMENTO (BACKUP & KQL)
=============================================================================
- Máquinas Virtuais (VMs):
  * Discos: OS Disk (persistente), Temporary Disk (drive D: volátil, apagado ao reiniciar), Data Disk (persistente até 32 TB).
  * Azure Disk Encryption (ADE): BitLocker/DM-Crypt com chaves gerenciadas no Key Vault.
  * FQDN da VM: <nome>.<regiao>.cloudapp.azure.com.
  * Desalocação: Para não pagar computação (CPU/RAM), a VM deve estar no estado "Stopped (Deallocated)".
  * Alta Disponibilidade: Availability Sets (Fault Domains e Update Domains no mesmo datacenter, SLA 99.95%) versus Availability Zones (datacenters separados na mesma região, SLA 99.99%).
  * VM Scale Sets (VMSS): Autoscaling elástico de VMs em modo Uniforme (stateless) ou Flexível (stateful).

- Azure App Service:
  * Planos de Hospedagem: Free, Shared, Basic, Standard, Premium e Isolated.
  * Deployment Slots (a partir do plano Standard): Ambientes de staging para testes e swap para produção com zero downtime e rollback imediato.
  * VNet Integration: Permite saída para recursos com IP privado; exige sub-rede dedicada /28 no mínimo.
  * Conexões Híbridas: Conexão com bancos de dados on-premises via Azure Relay pela porta 443 sem abrir portas de entrada no firewall local.

- Contêineres no Azure:
  * ACR (Azure Container Registry): Registro Docker privado com replicação geográfica na SKU Premium.
  * ACI (Azure Container Instances): Execução rápida de contêineres serverless sem gerenciar VMs.
  * AKS (Azure Kubernetes Service): Orquestração Kubernetes corporativa com master nodes gratuitos gerenciados pelo Azure.
  * Azure Container Apps (ACA): Microsserviços serverless com Dapr e KEDA (escala até zero).

- Backup e Recuperação:
  * Recovery Services Vault (RSV): Backup de VMs Azure completas, Azure Files, SQL/SAP em VMs e cargas locais com Agente MARS.
  * Backup Vault: Snapshots operacionais de Managed Disks, Blobs operacionais e PostgreSQL flexível.
  * Cross-Region Restore (CRR): Permite restaurar VMs na região secundária mesmo com a primária ativa.
  * Soft Delete: 14 dias de retenção para itens de backup excluídos.

- Observabilidade e Diagnóstico:
  * Azure Monitor: Métricas numéricas leves (séries temporais de 1 min para autoscale) versus Logs estruturados no Log Analytics consultados com KQL.
  * Tabelas KQL: AzureActivity (auditoria do plano de controle ARM), Heartbeat (sinal de vida das VMs), Perf (CPU e memória).
  * Operadores KQL: where, project, summarize count() by Computer, render timechart.
  * Network Watcher: IP Flow Verify (testa se NSG permite ou nega pacote), Next Hop (informa próximo salto de roteamento UDR), Connection Troubleshoot, Packet Capture e Flow Logs.
  * Azure Service Health: Status global de serviços, notificações de incidentes específicos das suas assinaturas e manutenções planejadas.
`;
