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
```bash
git clone https://github.com/IsabelaGhislandi/nlw_connect.git
cd nlw_connect
```

**2. Install dependencies**
```
npm install
```

**3. Configure environment variables**
Create a `.env` file in the root directory:

Edit the .env file with your settings:
```
PORT=3333 
POSTGRES_URL="postgresql://docker:docker@localhost:5432/connect" 
REDIS_URL="redis://localhost:6379" 
WEB_URL="http://localhost:3333"
```

**4. Start the services with Docker**
```
docker-compose up -d
```

**5. Run database migrations**
```
npx drizzle-kit push
```

**6. Start the development server**
```
npm run dev
```
## 📊 Database Schema
subscriptions table
```
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
```

**Redis - Data structures used**
Sorted Set: referral:ranking - User ranking by score
Hash: referral:access-count - Access count per user

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

### Create a subscription with referrer
```
POST /subscription
Content-Type: application/json

{
  "name": "Terry Riley",
  "email": "terry@email.com",
  "telephone": "11999999999",
  "referrer": "referring-user-uuid"
}
```
...or without referrer
```
POST /subscription
Content-Type: application/json

{
  "name": "Tony Conrad",
  "email": "Tony@email.com",
  "telephone": "11999999999",
}
```
**Get ranking**
curl http://localhost:3333/ranking

**Response example**
```
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
```
## 🧪 Available Scripts
```
npm run dev        # Start development server
```

```
npm run build      # Build for production
```


## 📈 How the Ranking System Works
1. Registration: User signs up optionally with referral code
2. Scoring: Referring user gains 1 point
3. Link Access: Each click on invite link increments counter
4. Ranking: Redis Sorted Set automatically maintains ordered ranking
