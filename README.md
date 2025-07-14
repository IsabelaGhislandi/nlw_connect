# NLW Connect - Ranking and Referral System

A ranking application with referral system developed during NLW (Next Level Week). Allows users to register for events through invite links and track their position in the ranking.

## 🚀 Features

- **User Registration**: User signup with name, email, and phone
- **Invite Links**: Automatic generation of unique referral links
- **Dynamic Ranking**: Scoring system based on sent invites
- **Click Tracking**: Access tracking for invite links
- **REST API**: Complete endpoints for all functionalities
- **Auto Documentation**: Integrated Swagger UI

## 🛠️ Technologies Used

- **Backend**: Node.js with Fastify
- **Database**: PostgreSQL with Drizzle ORM
- **Cache/Ranking**: Redis with Sorted Sets
- **Validation**: Zod for schemas and type validation
- **Documentation**: Swagger/OpenAPI
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js (version 18 or higher)
- PostgreSQL
- Redis
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
git clone https://github.com/IsabelaGhislandi/nlw_connect.git
cd nlw_connect

2. **Install dependencies**
npm install

3. **Configure environment variables**
cp .env.example .env

Edit the .env file with your settings:
PORT=3333
POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect"
REDIS_URL="redis://localhost:6379"
WEB_URL="http://localhost:3333"

4. **Run database migrations**
npx drizzle-kit push:pg

5. **Start the server**
npm run dev

##📊 Database
subscriptions table structure

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

**Redis - Data structures used**
Sorted Set: referral:ranking - User ranking by score
Hash: referral:access-count - Access count per user

##🔗 API Endpoints

**Subscriptions**
- POST /subscription - Create new subscription
- GET /subscribers/{id}/ranking/clicks - Get user clicks

**Invites**
- GET /invites/{subscriberId} - Access invite link (redirects)

**Ranking**
- GET /ranking - Get complete ranking
- GET /subscribers/{id}/ranking/position - Get specific ranking position

##📝 Usage Examples

**Create a subscription**
curl -X POST http://localhost:3333/subscription \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sponge bob",
    "email": "bob@email.com",
    "telephone": "11999999999",
    "referrer": "referring-user-uuid"
  }'
  
**Get ranking**
curl http://localhost:3333/ranking

##🏗️ Project Structure##
src/
├── drizzle/
│   ├── client.ts          # Drizzle ORM configuration
│   ├── migrations/        # Database migrations
│   └── tables/           # Table definitions
├── functions/            # Business logic
├── redis/               # Redis client and configurations
├── routes/              # API routes
├── env.ts               # Environment variables configuration
└── server.ts            # Server configuration

##🧪 Available Scripts##
npm run dev        # Start development server
npm run build      # Build for production

##🐳 Docker
To run PostgreSQL and Redis with Docker:

# PostgreSQL
docker run -d \
  --name postgres \
  -e POSTGRES_USER=docker \
  -e POSTGRES_PASSWORD=docker \
  -e POSTGRES_DB=connect \
  -p 5432:5432 \
  postgres:13

# Redis
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:alpine

##📈 How the Ranking System Works##
1. Registration: User signs up optionally with referral code
2. Scoring: Referring user gains 1 point
3. Link Access: Each click on invite link increments counter
4. Ranking: Redis Sorted Set automatically maintains ordered ranking
