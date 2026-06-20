# 🍽️ Sabor da Mesa - Vertical Slice Architecture

Uma plataforma digital focada na venda e entrega de refeições caseiras preparadas por cozinheiros locais.

## 📋 Descrição

Sabor da Mesa conecta pessoas que buscam comida de qualidade com pequenos produtores e cozinheiros independentes. A plataforma permite que usuários escolham refeições, façam pedidos e acompanhem entregas em tempo real.

## 🎯 Missão

Levar refeições caseiras de qualidade para o dia a dia das pessoas, valorizando cozinheiros locais e promovendo alimentação acessível.

## 🚀 Visão

Ser a principal plataforma de comida caseira da América Latina.

## 💡 Diferenciais

- ✅ Comida caseira feita por cozinheiros locais
- ✅ Opções saudáveis e fitness
- ✅ Pratos regionais variados
- ✅ Entrega rápida
- ✅ Rastreamento em tempo real
- ✅ Preços mais acessíveis que restaurantes tradicionais

## 📦 Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados
- **Socket.IO** - Comunicação em tempo real
- **bcryptjs** - Hash de senhas

### Frontend
- **React** - Framework UI
- **Next.js** - Framework React com SSR
- **Tailwind CSS** - Estilização
- **Axios** - HTTP Client
- **Socket.IO Client** - Cliente de tempo real

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 🏗️ Arquitetura - Vertical Slice

```
sabor-da-mesa/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── env.js
│   │   │   └── cors.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   ├── auth.js
│   │   │   └── validator.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── errors.js
│   │   │   └── responses.js
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── routes.js
│   │   │   │   ├── controller.js
│   │   │   │   ├── service.js
│   │   │   │   ├── repository.js
│   │   │   │   └── model.js
│   │   │   ├── users/
│   │   │   │   ├── routes.js
│   │   │   │   ├── controller.js
│   │   │   │   ├── service.js
│   │   │   │   ├── repository.js
│   │   │   │   └── model.js
│   │   │   ├── meals/
│   │   │   │   ├── routes.js
│   │   │   │   ├── controller.js
│   │   │   │   ├── service.js
│   │   │   │   ├── repository.js
│   │   │   │   └── model.js
│   │   │   ├── orders/
│   │   │   │   ├── routes.js
│   │   │   │   ├── controller.js
│   │   │   │   ├── service.js
│   │   │   │   ├── repository.js
│   │   │   │   └── model.js
│   │   │   └── ratings/
│   │   │       ├── routes.js
│   │   │       ├── controller.js
│   │   │       ├── service.js
│   │   │       ├── repository.js
│   │   │       └── model.js
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── frontend-next/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   └── loading.tsx
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── RegisterForm.tsx
│   │   │   │   │   └── AuthCard.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.ts
│   │   │   │   └── services/
│   │   │   │       └── authService.ts
│   │   │   ├── meals/
│   │   │   │   ├── components/
│   │   │   │   │   ├── MealCard.tsx
│   │   │   │   │   ├── MealList.tsx
│   │   │   │   │   ├── MealDetail.tsx
│   │   │   │   │   └── MealFilter.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useMeals.ts
│   │   │   │   └── services/
│   │   │   │       └── mealService.ts
│   │   │   ├── orders/
│   │   │   │   ├── components/
│   │   │   │   │   ├── OrderCart.tsx
│   │   │   │   │   ├── OrderHistory.tsx
│   │   │   │   │   ├── OrderTracking.tsx
│   │   │   │   │   └── OrderForm.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useOrders.ts
│   │   │   │   └── services/
│   │   │   │       └── orderService.ts
│   │   │   └── common/
│   │   │       ├── components/
│   │   │       │   ├── Header.tsx
│   │   │       │   ├── Footer.tsx
│   │   │       │   ├── Navigation.tsx
│   │   │       │   └── Loading.tsx
│   │   │       ├── hooks/
│   │   │       │   └── useApi.ts
│   │   │       └── services/
│   │   │           └── apiClient.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   ├── user.ts
│   │   │   ├── meal.ts
│   │   │   └── order.ts
│   │   └── utils/
│   │       ├── constants.ts
│   │       └── helpers.ts
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── Dockerfile
├── mysql/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

## 📝 Requisitos Funcionais

- **RF01** – Cadastro e autenticação de usuários
- **RF02** – Busca de refeições
- **RF03** – Montagem de pedidos
- **RF04** – Rastreamento de pedidos
- **RF05** – Avaliação de cozinheiros e pratos
- **RF06** – Agendamento de refeições

## 🚀 Como Executar

### Com Docker (Recomendado)

```bash
docker-compose up
```

### Sem Docker

#### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

#### Frontend
```bash
cd frontend-next
cp .env.example .env.local
npm install
npm run dev
```

### Acessar a aplicação

- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api
- phpMyAdmin: http://localhost:8080

## 📚 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout
- `GET /api/auth/me` - Obter dados do usuário autenticado

### Usuários
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Obter usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Refeições
- `POST /api/meals` - Criar refeição
- `GET /api/meals` - Listar refeições
- `GET /api/meals/:id` - Obter refeição
- `GET /api/meals/category/:category` - Buscar por categoria
- `PUT /api/meals/:id` - Atualizar refeição
- `DELETE /api/meals/:id` - Deletar refeição

### Pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders` - Listar pedidos
- `GET /api/orders/:id` - Obter pedido
- `GET /api/orders/user/:userId` - Pedidos do usuário
- `PATCH /api/orders/:id/status` - Atualizar status
- `DELETE /api/orders/:id` - Deletar pedido

### Avaliações
- `POST /api/ratings` - Criar avaliação
- `GET /api/ratings` - Listar avaliações
- `GET /api/ratings/meal/:mealId` - Avaliações da refeição
- `GET /api/ratings/chef/:chefId` - Avaliações do chef
- `DELETE /api/ratings/:id` - Deletar avaliação

## 📄 Licença

MIT

## 👥 Autor

**Vquintiliano**