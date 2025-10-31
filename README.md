# 🚀 Trade Master Backend

This backend powers the Trade Master online filmmaking academy—a comprehensive platform for aspiring filmmakers to learn how to create powerful and profitable documentary films. Built with Express and TypeScript, it provides robust APIs for user authentication, shopping cart, and secure payments, supporting a modern Next.js + Sanity CMS frontend.

🎬 **About**

Trade Master is the most comprehensive online filmmaking academy, designed to help aspiring filmmakers create impactful and profitable documentary films. The backend delivers all core data and business logic for an immersive learning experience, including interactive course content, user management, and expert-led course delivery.

## ✨ Features

- 🔐 **User Authentication**: Register, login, JWT-based authentication, and user role management (user/admin).
- 🛒 **Shopping Cart**: Add/remove courses to cart, view cart summary, and manage cart items per user.
- 💳 **Payment Integration**: Stripe payment intent creation and retrieval for secure checkout.
- 📄 **API Documentation**: Swagger UI available at `/api-docs`.
- 🛡️ **Security**: Helmet, CORS, rate limiting, and environment-based configuration.
- 📈 **Logging**: Winston-based logging for requests and errors.

## 🛠️ Tech Stack

- 🟩 **Node.js** + **Express**
- 🟦 **TypeScript**
- 🐘 **PostgreSQL** (via `pg`)
- 💸 **Stripe** (payments)
- 🔑 **JWT** (authentication)
- 📃 **Swagger** (API docs)
- 📊 **Winston** (logging)

## 🚦 Getting Started

### ⚙️ Prerequisites

- 🟩 Node.js (v18+ recommended)
- 🐘 PostgreSQL database

### 📦 Installation

1. 📥 Clone the repository:
   ```bash
   git clone https://github.com/SilverDigitalBus-LLC/trade-master-backend.git
   cd backend
   ```
2. 📦 Install dependencies:
   ```bash
   npm install
   ```
3. 📝 Set up environment variables. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=DATABASE NAME
   STRIPE_SECRET_KEY=sk_test_your_stripe_key
   ```
4. 🗄️ Initialize the database:
   ```bash
   psql -U <db_user> -d <db_name> -f database/init.sql
   ```

### ▶️ Running the Server

- 🛠️ For development (with hot reload):
  ```bash
  npm run dev
  ```
- 🚀 For production build:
  ```bash
  npm run build
  npm start
  ```

### 📚 API Documentation

- Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for Swagger UI.

## 🔗 Main Endpoints

### 👤 Auth

- `GET /api/auth/profile` — Get user profile (auth required)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login

### 🛒 Cart

- `GET /api/cart` — Get user cart (auth required)
- `GET /api/cart/count` — Get cart item count (auth required)
- `GET /api/cart/summary` — Get cart summary (auth required)
- `POST /api/cart` — Add course to cart (auth required)
- `DELETE /api/cart` — Remove course from cart (auth required)
- `DELETE /api/cart/clear` — Clear cart (auth required)

### 💳 Payment

- `GET /api/payment/:id` — Retrieve Stripe payment intent
- `POST /api/payment` — Create Stripe payment intent

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/         # ⚙️ Config files (db, logger, swagger)
│   ├── controllers/    # 🎮 Express controllers
│   ├── middleware/     # 🛡️ Auth, validation, etc.
│   ├── routes/         # 🚦 Express routers
│   ├── services/       # 🧠 Business logic (cart, stripe, user)
│   ├── types/          # 📝 TypeScript types/interfaces
│   ├── utils/          # 🧰 Helper functions
│   └── index.ts        # 🚀 App entry point
├── database/
│   └── init.sql        # 🗄️ DB schema
├── logs/               # 🗃️ Log files
├── package.json
├── tsconfig.json
└── ...
```

## 📝 License

MIT
