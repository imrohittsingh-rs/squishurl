# Shortly 🔗 - Modern URL Shortener & Analytics Platform

Shortly is a full-featured, self-hostable, modern URL shortener built with a React frontend and a Node.js/Express backend. It allows users to quickly shorten long URLs, generate QR codes, and track detailed visit analytics.

<p align="left">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?logo=vite" alt="Vite" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js--Express-339933?logo=node.js" alt="Node.js & Express" /></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb" alt="MongoDB" /></a>
  <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-black?logo=JSON%20web%20tokens&logoColor=546E7A" alt="JWT" /></a>
</p>

---

## 🌟 Key Features

### For Guest Users
* **Instant URL Shortening**: Create short links without needing to register.
* **Smart Limits**: Guests are limited to 1 active link per IP address at a time to prevent abuse.
* **Auto-Expiration**: Guest links automatically expire and are deleted from the database after 15 minutes.

### For Registered Users
* **Interactive Dashboard**: View, create, search, and manage all your shortened links in one place.
* **Detailed Analytics**: Track your link's performance with click metrics, client IP tracking, referer data, and User-Agent details.
* **Link Management**: Update the destination URL of any active link or delete links you no longer need.
* **Dynamic QR Codes**: Generate and download high-quality QR codes for your short links instantly.

### Security & Optimization
* **Global Rate Limiting**: Protection against DDoS (Distributed Denial of Service) and scraping (100 requests per 15 minutes).
* **Strict Auth Limiting**: Prevent brute-force login or sign-up attempts (maximum of 5 attempts per 15 minutes).
* **Security Essentials**: Hashed passwords (using `bcrypt`), JWT-based HTTP-only cookies, and configured CORS policies.
* **Automatic TTL Expiry**: MongoDB indexes handle link expiration automatically, keeping the database light.

---

## 🛠️ Technology Stack

### Frontend (Client)
* **Core**: [React 19](https://react.dev/) & [Vite](https://vite.dev/) (Fast Hot Module Replacement)
* **Styling**: [TailwindCSS v4](https://tailwindcss.com/) & [Framer Motion (Motion)](https://motion.dev/)
* **Routing**: [React Router DOM v7](https://reactrouter.com/)
* **Utility Libraries**:
  * [qrcode.react](https://www.npmjs.com/package/qrcode.react) for client-side QR code generation.
  * [React Toastify](https://fkhadra.github.io/react-toastify/) for interactive toast notifications.
  * [React Icons](https://react-icons.github.io/react-icons/) for modern, accessible UI icons.
  * [Axios](https://axios-http.com/) for handling API requests.

### Backend (Server)
* **Core**: [Node.js](https://nodejs.org/) & [Express v5](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
* **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Cookie Parser](https://github.com/expressjs/cookie-parser)
* **Safety & Utilities**:
  * [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) for request rate limiting.
  * [nanoid](https://github.com/ai/nanoid) for generating unique, secure 8-character URL codes.
  * [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing.

---

## 📂 Project Structure

```text
SHORT-URL/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/            # Axios API config
│   │   ├── components/     # UI Components (Modals, Navbar, Cards)
│   │   ├── context/        # Authentication State Context
│   │   ├── pages/          # App Pages (Dashboard, Profile, Login, Home)
│   │   ├── routes/         # Routing Configurations
│   │   └── services/       # Network calls & functions
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Express Backend
│   ├── connection/         # MongoDB Connection Configuration
│   ├── controllers/        # Express route controller logic
│   ├── middlewares/        # Authentication & Rate Limit Middlewares
│   ├── models/             # Mongoose Schemas (URL, User)
│   ├── routes/             # Express API Endpoints
│   ├── utils/              # API Error & Response Helpers
│   ├── index.js            # Entry Point (Database connection & listener)
│   ├── app.js              # Express app definitions
│   └── package.json
│
└── README.md               # Main Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) installed (v18+ recommended)
* A running [MongoDB](https://www.mongodb.com/try/download/community) instance (local or MongoDB Atlas connection string)

### Server Setup (Backend)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update the environment variables in `.env`:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:5173
   BASE_URL=http://localhost:8000
   COOKIE_NAME=uid
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   ```
5. Start the backend in development mode (using nodemon):
   ```bash
   npm run dev
   ```

---

### Client Setup (Frontend)

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update the environment variables in `.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_BACKEND_URL=http://localhost:8000
   ```
5. Start the frontend development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Reference

### Public Authentication Routes
* `POST /api/users/register` - Registers a new user.
* `POST /api/users/login` - Authenticates user & sets secure cookie.
* `POST /api/users/logout` - Clears cookie & logs out.

### Short Link Services
* `POST /api/urls/` - Create a short URL. (Available to both guests and logged-in users).
* `GET /:shortId` - Redirects to the original destination URL, recording click statistics.

### Private / Authenticated User Routes
* `GET /api/users/me` - Fetch details of currently logged-in user.
* `GET /api/urls/` - Fetch all URLs created by the authenticated user.
* `GET /api/urls/analytics/:shortId` - Retrieve detailed statistics (IP, referrer, device) for a specific link.
* `PATCH /api/urls/:id` - Update the target destination URL of a link.
* `DELETE /api/urls/:id` - Delete a shortened link.

---

## 🌐 Deployment

This application is ready to be deployed with the backend on **Render** and the frontend on **Vercel**.

### 1. Backend Deployment (Render)

Render is used to host the Express server. Follow these steps:

1. **Create a New Web Service** on Render and link your GitHub repository.
2. **Root Directory**: Set this to `server`.
3. **Runtime**: Select `Node`.
4. **Build Command**: `npm install`
5. **Start Command**: `node index.js` (or `npm start`)
6. **Environment Variables**: Add the following keys under the **Environment** tab:
   - `PORT`: `8000` (Render will override this, but good to have)
   - `NODE_ENV`: `production`
   - `MONGO_URI`: *Your MongoDB connection string*
   - `JWT_SECRET`: *A secure random secret key*
   - `CORS_ORIGIN`: *Your deployed Vercel frontend URL* (e.g., `https://your-app.vercel.app`)
   - `BASE_URL`: *Your deployed Render service URL* (e.g., `https://your-backend.onrender.com`)
   - `COOKIE_NAME`: `uid`
   - `JWT_EXPIRES_IN`: `1d`

> [!NOTE]
> The Express server has `app.set("trust proxy", 1)` enabled, which is required for correct IP logging and rate-limiting when operating behind Render's reverse proxy.

---

### 2. Frontend Deployment (Vercel)

Vercel is used to host the React/Vite client. Follow these steps:

1. **Import your repository** in Vercel and create a new project.
2. **Root Directory**: Select `client`.
3. **Framework Preset**: Select **Vite** (Vercel should automatically detect this).
4. **Build & Development Settings**: Keep defaults (Build command: `npm run build`, Output directory: `dist`).
5. **Environment Variables**: Add the following keys:
   - `VITE_API_URL`: *Your deployed Render backend URL + `/api`* (e.g., `https://your-backend.onrender.com/api`)
   - `VITE_BACKEND_URL`: *Your deployed Render backend base URL* (e.g., `https://your-backend.onrender.com`)

> [!TIP]
> The repository includes a `client/vercel.json` file. This handles Single Page Application (SPA) routing redirection so that client-side page updates and refreshes work flawlessly.

---

## 🛡️ License

Distributed under the ISC License. See `server/package.json` for details.

