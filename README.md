# Task Manager System 📝

<img width="1508" height="606" alt="image" src="https://github.com/user-attachments/assets/63159475-b4be-49d4-b5cb-b375d6543d2c" />


## 👋 Introdução
Sistema de gerenciamento de tasks usando uma arquitetura de serviços distribuidos. Usa serviços Nest Js com comunicação asyncrona via Rabbit Mq entre os serviços.

## 👋 Arquitetura
<img width="1358" height="462" alt="image" src="https://github.com/user-attachments/assets/89f50354-b5c0-4f5b-9915-4cc6cea4ae55" />

### 🔄 Descrição simples do fluxo (criação de task)

* **Autenticação:** O cliente solicita login ao Gateway, que encaminha a requisição para o **Serviço de Autenticação**. Este devolve um **Token JWT (RS256)** e um *refresh token*.
* **Segurança:** A partir deste momento, todas as requisições são verificadas pelo **Gateway** de forma independente utilizando a **Chave Pública**.
* **Criação de Task:** O cliente solicita a criação de uma tarefa. O Gateway valida o token e encaminha para o **Serviço de Tasks**.
* **Persistência e Evento:** O Serviço de Tasks salva os dados no banco de dados e, em seguida, publica um evento no **RabbitMQ**.
* **Processamento de Notificação:** O **Serviço de Notificação** consome o evento da fila e registra a notificação no seu próprio banco de dados.
* **Tempo Real:** O Serviço de Notificação envia o alerta ao cliente via **WebSocket** (através do túnel mantido pelo Gateway).

## 🛠️ Tecnologias e Ferramentas

### Backend (Microserviços)
* **NestJS**: Framework core para os microserviços e gateway.
* **RabbitMQ**: Message Broker para comunicação assíncrona entre serviços.
* **TypeORM**: ORM para abstração e gerenciamento do banco de dados.
* **Passport & JWT (RS256)**: Estratégia de autenticação e proteção de rotas.
* **Socket.io**: Comunicação bidirecional (WebSockets) para notificações em tempo real.
 
### Frontend
* **React && Vite**
* **shadcn/ui**: Componentes de UI acessíveis e customizáveis (Radix UI + Tailwind).
* **TanStack Router**: Roteamento baseado em tipos para o React.
* **TanStack Query (React Query)**: Gerenciamento de estado de dados e cache de requisições.
* **Zustand**: Gerenciamento de estado global simples e performático.
* **Zod**: Validação de esquemas e contratos de dados.

### Infraestrutura & DevTools
* **Turborepo**: Orquestração do monorepo e cache de build/dev.
* **Docker & Docker Compose**: Containerização da infraestrutura (DB, RabbitMQ).
* **Biome**: Ferramenta rápida para linting e formatação de código.
* **TypeScript**: Tipagem estática em todo o projeto (Back e Front).

## 📂 Organização do Projeto

### Backend: Arquitetura Modular (NestJS)
Cada microserviço em `apps/` organiza-se em módulos independentes:
* **`src/modules/`**: Divisão por domínio (Auth, Task, Notification).
    * `controllers`: Portas de entrada da API.
    * `services`: Lógica de negócio.
    * `repositories`: Abtração type orm.
    * `entities/dto`: Definições de dados e validações.
* **`src/config/`**: Configurações de infraestrutura (DB, RabbitMQ, Env).

### Frontend: Feature-Based Architecture
O frontend segue uma organização orientada a funcionalidades:
* **`src/features/`**: Divisão por domínio (ex: `tasks`, `auth`).
* **`src/routes/`**: Definição de rotas tipadas com **TanStack Router**.
* **`src/hooks/`**: Hooks globais e gerenciamento de cache com **TanStack Query**.
* **`src/components/`**: Componentes de UI genéricos (shadcn/ui).
* **`src/store/`**: Gerenciamento de estado global com **Zustand**.

### Divisão de Responsabilidades (Serviços)
* **`api-gateway`**: Centralizador, validação de RS256 e proxy reverso.
* **`auth-service`**: Gestão de usuários e emissão de tokens.
* **`tasks-service`**: Domínio de tarefas, comentários e histórico.
* **`notifications-service`**: Consumer de RabbitMQ e servidor de WebSockets.

## 🧠 Decisões Técnicas

#### API Gateway como Ponto Único de Entrada
O Gateway foi implementado para centralizar o tráfego externo. Ele é responsável por:
* **Abstração de Complexidade:** O cliente não precisa conhecer o endereço de cada microserviço, apenas o do Gateway.
* **Segurança Centralizada:** A validação do Token JWT acontece aqui, evitando que cada serviço precise implementar sua própria lógica de autenticação.
* **Gestão de WebSockets:** O Gateway atua como o túnel que permite a comunicação real-time entre os serviços internos e o cliente.

#### Autenticação RS256 (Assimetria)
Diferente do HS256 (chave única), o **RS256** utiliza um par de chaves pública/privada:
* **Privacidade:** Apenas o Serviço de Autenticação possui a chave privada para assinar os tokens.
* **Desacoplamento:** O Gateway utiliza apenas a chave pública para verificar a integridade do token. Isso significa que, se o Gateway for invadido, o invasor não conseguirá gerar novos tokens falsos.

#### Comunicação Interna via HTTP
Optou-se pelo protocolo **HTTP** para a comunicação entre o Gateway e os serviços internos devido à:
* **Simplicidade e Padronização:** Facilita a depuração (logs claros) e possui suporte nativo em praticamente todos os frameworks.
* **Semântica:** O uso de métodos (GET, POST, DELETE) e Status Codes (201, 401, 500) torna o fluxo de dados autoexplicativo dentro da infraestrutura.

## 🚧 Problemas Conhecidos e Melhorias Futuras
- **Testes:** O foco atual foi a implementação de regra de negocio e infraestrutura. E de extrema importância a implementação de testes unitários, integração e e2e para deploys em produção.
- **Observabilidade Centralizada:** Por ser uma arquitetura distribuida, a depuração de erros pode ser um processo delicado a implementção de um tracing distribuido (como Jaeger ou OpenTelemetry) facilitaria o processo.
- **Resiliência na Mensageria:** As mensagens que falham durante o processo deveriam ser enviadas para uma fila de reprocessamento evitando perda de dados.
- **Filtros de busca:** Hoje taks não possuem filtros de busca além da paginação. Ter a possibilidade de filtrar por status e prioridade melhoraria muito experiência do usuário.
- **Virtualização:** Hoje há um sistema de rolagem infinita na pagina de tasks, mas não há virtualização, isso pode atrapalhar na performance da página e na experiencia do usuário, uma vez que quando há muitos elementos renderizados em tela a apliciação pode começar a travar.
- **Segurança:** Hoje todos os usuário tem permissão de excluir uma task, pensando em uma aplicação para produção o ideal seria implementar um sistema de **Role based authentication**
- **Melhorias na experiência do usuário:** Melhorias simples que podem ser feitas que vão agregar muito na experiencia do usuário são: modais de confirmação, filtros de busca, separar tasks em colunas. 


## 🛠️ Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado em sua máquina:

* **Node.js**: Versão 22 ou superior.
* **Package Manager**: `npm`, `pnpm` ou `yarn`.
* **Docker & Docker Compose**: Essencial para subir os containers do **RabbitMQ** e dos **Bancos de Dados**.

## 🌪️ Quick Start

1. Clone o projeto
```sh
git clone https://github.com/maikonalexandre/task_manager_system
```

<<<<<<< HEAD
### WebSocket Events

* `task:created` – tarefa foi criada
* `task:updated` – tarefa foi atualizada
* `comment:new` – novo comentário

---

## 🏗️ Estrutura do Monorepo (sugerida)

```
.
├── apps/
│   ├── web/
│   │   ├── src/                  # React + TanStack Router + shadcn + Tailwind
│   │   ├── Dockerfile
│   │   ├── .env.example          # variáveis de ambiente do frontend
│   │   ├── package.json
│   ├── api-gateway/
│   │   ├── src/                  # HTTP + WebSocket + Swagger
│   │   ├── Dockerfile
│   │   ├── .env.example          # variáveis do API Gateway (Nest.js)
│   │   ├── package.json
│   ├── auth-service/
│   │   ├── src/                  # Nest.js (microserviço de autenticação)
│   │   ├── migrations/
│   │   ├── Dockerfile
│   │   ├── .env.example          # variáveis do serviço de autenticação
│   │   ├── package.json
│   ├── tasks-service/
│   │   ├── src/                  # Nest.js (microserviço RabbitMQ)
│   │   ├── migrations/
│   │   ├── Dockerfile
│   │   ├── .env.example          # variáveis do serviço de tarefas
│   │   ├── package.json
│   └── notifications-service/
│       ├── src/                  # Nest.js (microserviço RabbitMQ + WebSocket)
│       ├── migrations/
│       ├── Dockerfile
│       ├── .env.example          # variáveis do serviço de notificações
│       ├── package.json
├── packages/
│   ├── types/
│   ├── utils/
│   ├── eslint-config/
│   └── tsconfig/
├── docker-compose.yml
├── turbo.json
├── package.json
└── README.md
=======
2. Vá para pasta do projeto
```sh
cd task_manager_system
>>>>>>> f1ff7d64c288227572d92f02d4369d8a40f5f241
```

3. Instale as dependências
```sh
npm install
```

4. Env:
- Configure o .env de cada serviço (utilize .env.example como exemplo)

#### 🤖 Executando o projeto
```bash
npm run dev
```

## 🔑 Gerando Chaves RS256 (Base64)
Como o projeto utiliza criptografia assimétrica, você precisa gerar um par de chaves e adicioná-las às variáveis de ambiente em formato Base64.

### 1. Gerar os arquivos .pem

No seu terminal, execute:

```bash
# Gerar chave privada
openssl genrsa -out private.pem 2048

# Gerar chave pública
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

### 2. Converter para base64

```bash
# Converter chave privada
base64 -w 0 private.pem > private_base64.txt

# Converter chave pública
base64 -w 0 public.pem > public_base64.txt
```

> Como uma alternativa voce pode acessar https://www.base64encode.org/ para fazer o encoding.

## ⏱️ Tempo Gasto e Esforço

| Categoria | Descrição | Tempo Estimado |
| :--- | :--- | :--- |
| **Infra & Setup** | Configuração do Monorepo (Turborepo), Docker, ambientes e arquitetura base. | ≃8h |
| **Auth & Gateway** | Implementação do Auth Service + api gateway, geração de chaves RS256 e lógica de Refresh Token. | ≃21h |
| **Serviço de Tasks** | Desenvolvimento do CRUD de tarefas, persistência em banco de dados e integração RabbitMQ. | ≃18h |
| **Serviço de Notificação** | Consumo de mensageria, persistência de alertas e lógica de WebSocket. | ≃12h |
| **Front-end** | Interface do usuário, integração com Gateway (Auth/Tasks) e listener de notificações. | ≃16h |
| **Documentação/Refino** | Escrita do README, diagramas e testes finais. | ≃6h |
