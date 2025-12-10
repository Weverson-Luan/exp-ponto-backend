# ExpPonto

API backend completa para gestão corporativa de ponto e jornadas de trabalho, permitindo registrar entradas, saídas, intervalos e eventos de forma segura, auditável e conforme regras definidas por cada empresa.
Desenvolvida em Node.js + NestJS, com Prisma ORM e PostgreSQL, a plataforma oferece autenticação segura, controle de dispositivos autorizados, cálculo automático de jornadas, gerenciamento de colaboradores e regras personalizadas por CNPJ.
Documentação gerada automaticamente via Swagger, além de testes automatizados com Vitest, garantindo estabilidade, confiabilidade e evolução contínua do sistema.

---

## 🧭 Sumário

- [Visão Geral](#-visão-geral)
- [Principais Recursos](#-principais-recursos)
- [Stack Tecnológica](#-stack-tecnológica)
- [Arquitetura](#-arquitetura)
- [Requisitos](#-requisitos)
- [Começando](#-começando)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Instalação](#instalação)
  - [Banco de Dados](#banco-de-dados)
- [Executando o Projeto](#-executando-o-projeto)
  - [Modo Desenvolvimento](#modo-desenvolvimento)
  - [Produção](#produção)
  - [Docker](#docker)
- [Documentação da API (Swagger)](#-documentação-da-api-swagger)
- [Testes](#-testes)
- [Padrões de Código](#-padrões-de-código)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Fluxo de CI/CD](#-fluxo-de-cicd)
- [Rotas de Exemplo](#-rotas-de-exemplo)
- [Checklist de PR](#-checklist-de-pr)
- [Convencional Commits](#-convencional-commits)
- [Licença](#-licença)

---

## 📌 Visão Geral

O Sistema Corporativo de Marcação de Ponto permite que empresas registrem a jornada de seus colaboradores com segurança, rastreabilidade e conformidade legal.

## ✨ Principais Recursos

- Registro de Ponto Completo<br>
- Entrada e saída<br>
- Intervalo (início/retorno)<br>
- Origem: mobile, web, QR Code, admin<br>
- Geolocalização (lat/lng)<br>
- Auditoria antifraude<br>
- Controle de Jornada (Tabela journeys)<br>
- Cálculo automático de jornada diária<br>
- Totais em segundos (conversão interna de precisão)<br>
- Horas extras, atrasos e faltas<br>
- Atualização automática ao final do dia<br>

## 🧰 Stack Tecnológica

- **Node.js** (>= 18)
- **NestJS** (REST Architecture)
- **Prisma ORM** + **PostgreSQL 14**
- **Vitest** (unit/E2E)
- **Swagger** (OpenAPI 3)
- **ESLint** + **Prettier**
- **Docker** + **Docker Compose** (opcional)

## 🏗️ Arquitetura

- **Camadas**: Controller → UseCases → Repository (Prisma) → DB
- **Padrões**: DTOs, Validators, Interceptors (logging), Filters (errors), Guards (auth)
- **Config**: `config/` centraliza envs e chaves
- **Observabilidade**: endpoints `/health` e `/metrics` (se usar Prometheus)

## ✅ Requisitos

- Node 18+
- PNPM/NPM
- PostgreSQL 14+ (local ou Docker)
- (Opcional) Docker Desktop

## 🚀 Começando

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz a partir do env.exemplo abaixo:

```bash

## 🔧 APP CONFIG
PORT=3001
NODE_ENV=development


# 🗄️ DATABASE (PostgreSQL)
DATABASE_URL=

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DB=

# 🔐 AUTH / JWT
JWT_SECRET_KEY=
JWT_EXPIRES_IN=

# 📘 SWAGGER
SWAGGER_ENABLED=true
SWAGGER_PATH=api-docs
SWAGGER_TITLE=Ponto API
SWAGGER_DESCRIPTION=API para ponto
SWAGGER_VERSION=1.0.0

# 👥 ID OF ROLES USER
ROLE_ADMIN_ID=
ROLE_SUPERVISOR_ID=
ROLE_EMPLOYEE_ID=
ROLE_SISTEMA_ID=

## NAME OF ROLES USERS
ADMIN= ##  gestor do sistema, RH, configurações
SUPERVISOR= ##  líderes que aprovam jornadas
EMPLOYEE=## funcionário comum que registra ponto
SISTEMA= ## rotinas automáticas


```

### Instalação

```bash
# 1) Clonar
git clone https://github.com/Weverson-Luan/exp-ponto-backend.git
cd exp-ponto-backend

# 2) Instalar deps
npm install install
```

### Banco de Dados

```bash
# 1) Gerar Prisma Client\
npx prisma generate

# 2) Aplicar migrations
npx prisma migrate dev --name init

# 3) (Opcional) Popular dados de exemplo
npx prisma db seed
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento

```bash
pnpm start:dev
```

Aplicação sobe em `http://localhost:${PORT}` (padrão: 3001).

### Produção

```bash
pnpm build && pnpm start:prod
```

### Docker

`docker-compose.dev.yml` de exemplo:

```yaml
version: '3.7'

services:
  postgres:
    image: postgres:16
    restart: always
    environment:
      - POSTGRES_DB=
      - POSTGRES_USER=
      - POSTGRES_PASSWORD=
    ports:
      - '0000:0000'
    networks:
      - prisma-network
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ponto_backend  -d postgres']
      interval: 5s
      timeout: 2s
      retries: 20
    volumes:
      - postgres_data:/var/lib/postgresql/data
    command: postgres -c listen_addresses='*'
    logging:
      options:
        max-size: '10m'
        max-file: '3'

networks:
  prisma-network:

volumes:
  postgres_data:
```

Subir docker:

```bash
docker compose up -d --build
```

## 📜 Documentação da API (Swagger)

Se `SWAGGER_ENABLED=true`, acesse: `http://localhost:3001/api-docs`.

- Esquemas de DTOs documentados
- Exemplos de requests/responses

## 🧪 Testes

Scripts sugeridos:

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --dir src",
    "test:e2e": "vitest run --project e2e",
    "coverage": "vitest run --coverage"
  }
}
```

Comandos:

```bash
pnpm run test
pnpm run test:unit
pnpm run test:e2e
pnpm run start:dev
```

## 🧹 Padrões de Código

- ESLint + Prettier
- Husky + lint-staged (pré-commit)

```bash
pnpm run lint
pnpm run format
```

## 🗂️ Estrutura de Pastas

```
@src
  config/
  domain/
    use-cases/
      users/
      coin-packages/
      gyms/
      payments/
      reviews/
      roles/
      schedules/
      trainings/
      users/
      wallets/
      wallets-transactions/
  infra/
    auth/
    database/
    http/
      controllers/
      http.module.ts
  core/shared/
    dtos/
    errors/
    lib/
    utils/
  app.module.ts
  main.ts
prisma/
  schema.prisma
  migrations/
  seed.ts
```

## 🔌 Rotas de Exemplo

```bash
# Health
curl -i http://localhost:3001/health

# Auth - Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@srcmail.com","password":"123456"}'
```

## 🏷️ Convencional Commits

Ex.: `feat(auth): refresh token` | `fix(user): validação de email` | `chore(ci): ajusta workflow`

<!--- Descreva autor(a) da atividades --->

## ©️ License

Este projeto está sob licença [MIT](./LICENSE).

Feito por [Weverson Luan](http://wltech.com.br/) ❤️
