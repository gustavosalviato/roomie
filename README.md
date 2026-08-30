# Roomie

🏢 **Sistema de Reserva de Salas para Reunião** | Meeting Room Reservation System

---

## 📋 Visão Geral

Roomie é uma API moderna para gerenciamento e reserva de salas de reunião, construída com arquitetura bem-definida e desacoplada. O projeto utiliza **DDD (Domain-Driven Design)** e **Clean Architecture** para distribuir responsabilidades entre camadas, seguindo os princípios **SOLID**.

**Objetivo**: Criar uma API de alta qualidade que serve como referência de boas práticas em desenvolvimento backend com Node.js e TypeScript.

---

## 🎯 Principais Funcionalidades

- ✅ Cadastro e autenticação de usuários
- ✅ Gerenciamento de salas (criação, edição, exclusão)
- ✅ Reserva de salas com validação de conflitos
- ✅ Visualização de reservas e disponibilidade
- ✅ Cancelamento de reservas com restrições de tempo
- ✅ Sistema de permissões (usuário comum vs administrador)

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Runtime** | Node.js | v20+ |
| **Linguagem** | TypeScript | 5.5+ |
| **Framework Web** | Fastify | 4.28+ |
| **ORM/Query Builder** | Prisma | 5.17+ |
| **Banco de Dados** | PostgreSQL | 12+ |
| **Validação** | Zod | 3.23+ |
| **Criptografia** | Bcrypt | 5.1+ |
| **Build** | Tsup | 8.2+ |
| **Testes** | Vitest | 1.6+ |
| **Dev Server** | tsx | 4.16+ |

### Padrões de Arquitetura
- 🏗️ **DDD** (Domain-Driven Design)
- 🧹 **Clean Architecture**
- 💎 **SOLID Principles**
- 🎯 **Either Pattern** (Functional Error Handling)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js v20 ou superior
- PostgreSQL (local ou remoto)
- pnpm (recomendado) ou npm

```bash
# Verificar versão do Node.js
node --version

# Instalar pnpm globalmente (opcional mas recomendado)
npm install -g pnpm
```

### 1. Clonar o repositório

```bash
git clone https://github.com/gustavosalviato/roomie.git
cd roomie
```

### 2. Instalar dependências

```bash
pnpm install
# ou
npm install
```

### 3. Configurar Banco de Dados

#### Opção A: Docker (Recomendado)

```bash
docker-compose up -d
```

O arquivo `docker-compose.yml` inicia um PostgreSQL na porta `5432`.

#### Opção B: PostgreSQL Local

1. Certifique-se de que PostgreSQL está rodando
2. Crie um banco de dados:

```sql
CREATE DATABASE roomie;
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Edite `.env` e configure:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/roomie"

# Server
NODE_ENV=development
PORT=3000

# JWT (futuro)
JWT_SECRET=sua-chave-secreta-aqui
```

### 5. Executar Migrations do Banco de Dados

```bash
pnpm exec prisma migrate dev
```

Isso irá:
- Criar as tabelas no banco
- Gerar o cliente Prisma

### 6. Executar em Desenvolvimento

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### 7. Executar Testes

```bash
# Testes em watch mode
pnpm test:watch

# Testes uma única vez
pnpm run test
```

### 8. Build para Produção

```bash
pnpm build

# Executar versão compilada
pnpm start
```

---

## 📐 Arquitetura e Decisões Técnicas

### Estrutura de Diretórios

```
src/
├── core/                  # Código compartilhado e tipos
│   ├── either.ts         # Monad Either para tratamento de erros
│   ├── entities/         # Entidades base
│   │   └── unique-entity-id.ts
│   ├── errors/           # Definição de erros customizados
│   │   ├── use-case-error.ts
│   │   └── errors/
│   │       └── resource-not-found-error.ts
│   └── types/            # Types e utilities TypeScript
│       └── optional.ts
│
├── domain/                # Lógica de negócio pura (sem dependências)
│   ├── entities/         # Aggregates do DDD
│   │   ├── user.ts
│   │   ├── room.ts
│   │   └── reservation.ts
│   ├── repositories/     # Interfaces (contratos)
│   │   ├── users-repository.ts
│   │   ├── rooms-repository.ts
│   │   └── reservations-repository.ts
│   └── value-objects/   # Value Objects imutáveis
│
├── application/           # Orquestração de regras de negócio
│   ├── use-cases/       # Casos de uso
│   │   ├── register-user.ts
│   │   ├── create-room.ts
│   │   ├── make-reservation.ts
│   │   └── cancel-reservation.ts
│   └── dtos/            # Data Transfer Objects
│       ├── user.dto.ts
│       ├── room.dto.ts
│       └── reservation.dto.ts
│
├── infra/                 # Implementação técnica
│   ├── database/         # Implementação do Prisma
│   │   ├── prisma-users-repository.ts
│   │   ├── prisma-rooms-repository.ts
│   │   └── prisma-reservations-repository.ts
│   ├── http/             # Controllers e rotas
│   │   ├── controllers/
│   │   └── routes/
│   └── server.ts         # Configuração do Fastify
│
└── test/                  # Testes
    ├── unit/             # Testes unitários
    └── integration/      # Testes de integração
```

### 1. **DDD (Domain-Driven Design)**

O projeto separa claramente a **lógica de negócio** da infraestrutura:

- **Domain Layer**: Contém `Entities` (User, Room, Reservation) e `Repositories` (interfaces)
- **Application Layer**: Contém `Use Cases` que orquestram a lógica de negócio
- **Infrastructure Layer**: Implementa os repositórios com Prisma e expõe via Fastify

**Benefício**: A lógica de negócio é testável, agnóstica e reutilizável.

### 2. **Clean Architecture**

```
┌─────────────────────────────────────────┐
│        Presentation (HTTP/Fastify)      │
├─────────────────────────────────────────┤
│        Application (Use Cases)          │
├─────────────────────────────────────────┤
│        Domain (Entities & Rules)        │
├─────────────────────────────────────────┤
│   Infrastructure (Banco & External)     │
└─────────────────────────────────────────┘
```

As camadas internas **não dependem** das externas, facilitando mudanças tecnológicas.

### 3. **Either Pattern (Functional Error Handling)**

Em vez de exceções, usamos um padrão funcional com `Either<Error, Success>`:

```typescript
// Sem try/catch puro
const result = await useCase.execute(input)

if (result.isLeft()) {
  // Erro: result.value contém o erro
  return response.status(400).send(result.value)
}

// Sucesso: result.value contém os dados
return response.status(201).send(result.value)
```

**Benefício**: Erros são previsíveis, type-safe e não queimam o stack.

### 4. **Por que Fastify?**

- ⚡ **Performance**: Uma das frameworks mais rápidas do Node.js
- 🔌 **Plugin System**: Fácil de estender e organizar
- 📦 **Tipagem**: Suporte excelente a TypeScript
- 📊 **Ecosistema**: Muitos plugins oficiais disponíveis

### 5. **Prisma como ORM**

- 🔒 **Type-Safe**: Schemas gerados automaticamente
- 🛡️ **Migrations**: Versionamento do banco de dados
- 🔍 **Introspection**: Pode gerar models a partir de banco existente
- 📝 **Developer Experience**: Autocomplete excelente

### 6. **Zod para Validação**

Validação **type-safe** em tempo de compilação:

```typescript
const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

type CreateUserInput = z.infer<typeof createUserSchema>
```

---

## 📚 Regras de Negócio

### Cadastro e Autenticação de Usuários
- Cada usuário deve ter um **e-mail único** para registro
- Senhas são armazenadas de forma segura com **hash bcrypt**
- Validação de email antes do cadastro

### Gerenciamento de Salas
- Apenas **administradores** podem criar, editar ou deletar salas
- Cada sala deve ter:
  - Nome único
  - Capacidade (número de pessoas)
  - Recursos (TV, whiteboard, etc.)
  - Localização

### Reserva de Salas
- Usuários podem reservar salas para **data e hora específicas**
- **Reservas não podem se sobrepor**
- Duração mínima: **30 minutos**
- Duração máxima: **4 horas**
- Sistema de validação de conflitos

### Visualização de Reservas
- Usuários veem apenas **suas próprias reservas**
- Visualização de **disponibilidade** em tempo real
- Dashboard com calendário de reservas

### Cancelamento de Reservas
- Usuários podem cancelar até **1 hora antes** do horário de início
- Soft delete (registro mantido para auditoria)
- Notificação opcional (futuro)

---

## 📖 Exemplos de Uso

### Registrar Usuário

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "SenhaForte123!"
  }'
```

**Resposta (201)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@example.com",
  "createdAt": "2024-09-15T10:00:00Z"
}
```

### Criar Sala (Admin)

```bash
curl -X POST http://localhost:3000/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sala Executiva",
    "location": "Andar 5",
    "capacity": 10,
    "resources": ["TV 55\"", "Whiteboard", "Videoconferência"]
  }'
```

### Reservar Sala

```bash
curl -X POST http://localhost:3000/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "roomId": "660e8400-e29b-41d4-a716-446655440001",
    "startDate": "2024-09-20T14:00:00Z",
    "endDate": "2024-09-20T15:30:00Z"
  }'
```

**Resposta (201)**:
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "roomId": "660e8400-e29b-41d4-a716-446655440001",
  "startDate": "2024-09-20T14:00:00Z",
  "endDate": "2024-09-20T15:30:00Z",
  "createdAt": "2024-09-15T10:30:00Z",
  "status": "confirmed"
}
```

### Visualizar Disponibilidade

```bash
curl http://localhost:3000/rooms/660e8400-e29b-41d4-a716-446655440001/availability?date=2024-09-20
```

### Cancelar Reserva

```bash
curl -X DELETE http://localhost:3000/reservations/770e8400-e29b-41d4-a716-446655440002
```

---

## 🐳 Docker & Docker Compose

O projeto inclui `docker-compose.yml` para facilitar o setup:

```bash
# Iniciar container PostgreSQL
docker-compose up -d

# Parar container
docker-compose down

# Ver logs
docker-compose logs -f
```

O serviço PostgreSQL estará em:
- **Host**: localhost
- **Porta**: 5432
- **Usuário**: postgres
- **Senha**: postgres
- **Banco**: roomie

---

## 🚢 Deploy

### Variáveis de Ambiente Necessárias

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/dbname"

# Server
NODE_ENV=production
PORT=3000

# Segurança
JWT_SECRET=sua-chave-jwt-super-segura

# Logs
LOG_LEVEL=info
```

### Plataformas Recomendadas

#### Railway
```bash
railway link  # Conectar repositório
railway up    # Deploy automático
```

#### Render
- Conectar repositório GitHub
- Configurar variáveis de ambiente no dashboard
- Deploy automático a cada push

#### Heroku (legacy)
```bash
heroku login
heroku create roomie-app
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

#### AWS/DigitalOcean (VPS)
```bash
# Build
pnpm build

# Upload de build/
# Instalar pm2 para manter processo rodando
npm i -g pm2
pm2 start build/infra/server.js
```

---

## 🧪 Testes

### Executar Testes

```bash
# Watch mode (reexecuta a cada mudança)
pnpm test:watch

# Uma única execução
pnpm test

# Com coverage
pnpm test -- --coverage
```

### Estrutura de Testes

```
test/
├── unit/
│   └── domain/          # Testes das entities e regras de negócio
└── integration/         # Testes de repositórios e use cases
```

### Exemplo de Teste

```typescript
import { describe, it, expect } from 'vitest'
import { User } from '@/domain/entities/user'

describe('User Entity', () => {
  it('should create a user with valid data', () => {
    const user = new User({
      name: 'João',
      email: 'joao@example.com',
      password: 'hashed_password'
    })

    expect(user.name).toBe('João')
    expect(user.email).toBe('joao@example.com')
  })
})
```

---

## 📊 Decisões de Design

### Entidades vs Value Objects

- **Entities** (User, Room, Reservation): Têm identidade única
- **Value Objects**: Imutáveis, igualdade por valor (ex: Email, DateRange)

### Soft Deletes

Reservas canceladas não são deletadas, mas marcadas com `canceled_at`. Isso permite:
- Auditoria completa
- Recuperação de dados
- Análise histórica

### UUID vs Auto-increment

Usamos **UUID** porque:
- Distribuído e único globalmente
- Não expõe quantidade de registros
- Melhor para replicação de banco

---

## 🗺️ Roadmap / Próximas Melhorias

- [ ] **Autenticação JWT** com refresh tokens
- [ ] **Notificações por Email** para confirmação/cancelamento de reservas
- [ ] **Dashboard Administrativo** (frontend React/Vue)
- [ ] **API GraphQL** como alternativa ao REST
- [ ] **Testes de Integração** com banco de dados real
- [ ] **CI/CD com GitHub Actions** (lint, tests, deploy)
- [ ] **Documentação Swagger/OpenAPI** interativa
- [ ] **Rate Limiting** e proteção contra DDoS
- [ ] **Cache com Redis** para availability checking
- [ ] **Logs Estruturados** com Winston/Pino
- [ ] **Observabilidade** com OpenTelemetry
- [ ] **Multi-tenancy** para diferentes organizações
- [ ] **Mobile App** (React Native/Flutter)

---

## 📝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a **Licença ISC** - veja o arquivo LICENSE para detalhes.

---

## 🤝 Suporte

Encontrou um bug ou tem sugestões? 
- Abra uma [Issue](https://github.com/gustavosalviato/roomie/issues)
- Entre em contato via [Email](mailto:seu-email@example.com)

---

## 👨‍💻 Autor

**Gustavo Salviato**
- GitHub: [@gustavosalviato](https://github.com/gustavosalviato)
- Email: [seu-email@example.com]

---

<div align="center">

**Feito com ❤️ usando Node.js, TypeScript e Clean Architecture**

⭐ Se este projeto foi útil, considere dar uma estrela! ⭐

</div>
