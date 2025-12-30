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

## Decisões técnicas



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

2. Vá para pasta do projeto
```sh
cd task_manager_system
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

## ⏱️ Tempo Gasto e Esforço

| Categoria | Descrição | Tempo Estimado |
| :--- | :--- | :--- |
| **Infra & Setup** | Configuração do Monorepo (Turborepo), Docker, ambientes e arquitetura base. | ≃8h |
| **Auth & Gateway** | Implementação do Auth Service + api gateway, geração de chaves RS256 e lógica de Refresh Token. | ≃21h |
| **Serviço de Tasks** | Desenvolvimento do CRUD de tarefas, persistência em banco de dados e integração RabbitMQ. | ≃18h |
| **Serviço de Notificação** | Consumo de mensageria, persistência de alertas e lógica de WebSocket. | ≃12h |
| **Front-end** | Interface do usuário, integração com Gateway (Auth/Tasks) e listener de notificações. | ≃16h |
| **Documentação/Refino** | Escrita do README, diagramas e testes finais. | ≃6h |
