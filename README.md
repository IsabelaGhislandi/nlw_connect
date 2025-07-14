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

**1. Clone the repository**
git clone https://github.com/IsabelaGhislandi/nlw_connect.git
cd nlw_connect

**2. Install dependencies**
npm install

**3. Configure environment variables**
Create a `.env` file in the root directory:

Edit the .env file with your settings:
PORT=3333 POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect" REDIS_URL="redis://localhost:6379" WEB_URL="http://localhost:3333"

**4. Start the services with Docker**
docker-compose up -d

**5. Run database migrations**
npx drizzle-kit push

**6. Start the development server**
npm run dev

## 🗃️ Database Setup
### Using Docker Compose (Recommended)
The project includes a `docker-compose.yml` file with PostgreSQL and Redis services:

``yaml
services:
    service-pg: 
        image: bitnami/postgresql
        ports:
            - '5432:5432'
        environment:
            - POSTGRES_USER=docker
            - POSTGRES_PASSWORD=docker
            - POSTGRES_DB=connect
    service-redis:
        image: bitnami/redis
        ports:
            - '6379:6379'
        environment:
            - ALLOW_EMPTY_PASSWORD=yes
            
##📊 Database Schema
subscriptions table

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

## 🔗 API Endpoints

## 🔗 API Endpoints

### Subscriptions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/subscription` | Create new subscription |
| `GET` | `/subscribers/{id}/ranking/clicks` | Get user clicks |

### Invites
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/invites/{subscriberId}` | Access invite link (redirects) |

### Ranking
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/ranking` | Get complete ranking |
| `GET` | `/subscribers/{id}/ranking/position` | Get specific ranking position |

### Documentation
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/docs` | Swagger UI |

## 📝 Usage Examples

### Create a subscription
``json
POST /subscription
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@email.com",
  "telephone": "11999999999",
  "referrer": "referring-user-uuid"
}
  
**Get ranking**
curl http://localhost:3333/ranking

**Response example**
{
  "ranking": [
    {
      "id": "USER ZERO",
      "name": "Sponge Bob",
      "score": 10
    },
    {
      "id": "USER ONE",
      "name": "Patrick",
      "score": 8
    }
  ]
}

## 🧪 Available Scripts
npm run dev        # Start development server
npm run build      # Build for production


##📈 How the Ranking System Works
1. Registration: User signs up optionally with referral code
2. Scoring: Referring user gains 1 point
3. Link Access: Each click on invite link increments counter
4. Ranking: Redis Sorted Set automatically maintains ordered ranking
