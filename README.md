# ⚡️ DO.IT — Gen-Z Neo-Brutalist Task Manager

A production-grade, full-stack Task Manager web application featuring a funky Gen-Z Neo-Brutalist aesthetic. Built with modern architecture, clean modular code, and multi-tenant security.

![DO.IT Preview](https://img.shields.io/badge/Architecture-Full--Stack-7C3AED?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/Express-REST_API-lime?style=for-the-badge&logo=express)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_RLS-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-cyan?style=for-the-badge&logo=tailwind-css)

---

## 🌟 Key Features

- **⚡️ High-Energy Neo-Brutalist UI**: Thick dark borders, vibrant electric accents, hard drop shadows, and playful tactile hover states.
- **📋 Complete Task CRUD**: Create, read, edit, delete, and toggle tasks with instant optimistic UI updates.
- **🏷️ Smart Categorization & Priorities**: Organize by category (`Launch`, `Design`, `Marketing`, `DevOps`, `Wellness`, `General`) and priorities (`Low`, `Medium`, `High`).
- **🔍 Live Search & Filter Bar**: Instant client-side search by title or description, status pills (`All`, `Pending`, `Done`), and priority toggles.
- **📊 Real-Time Productivity Analytics**: Visual completion meters, priority distributions, category breakdowns, and achievement badges (`Velocity Master`, `Inbox Zero Hero`).
- **🔒 Multi-Tenant Row-Level Security**: PostgreSQL RLS policies ensure that each user can strictly and exclusively access their own records.
- **🚀 Built-in Instant Demo Mode**: Zero-friction onboarding allowing anyone to test all features instantly without mandatory cloud signup.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Neo-Brutalist design tokens)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: Node.js
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: TypeScript
- **Tooling**: `tsx` (fast watch mode)
- **Architecture**: Controller-Service-Route pattern with strict input validation & error handling middleware

### Database & Authentication
- **Database**: [Supabase](https://supabase.com/) Cloud PostgreSQL
- **Security**: PostgreSQL Row Level Security (RLS)
- **Authentication**: Supabase Auth (JWT Bearer tokens)

---

## 📐 Architecture & Data Flow

```
Next.js App Router (Client UI)
       │
       ▼
Zustand State Store (Optimistic Updates & Filters)
       │ (HTTP Requests with Bearer JWT)
       ▼
Express.js REST API Server
       │
       ├── auth.middleware.ts     (Validates JWT)
       ├── validate.middleware.ts (Validates inputs)
       └── task.service.ts        (Executes queries)
       │
       ▼
Supabase PostgreSQL Database (Enforces RLS: auth.uid() = user_id)
```

---

## 🚀 Quick Start (Local Development)

### 1. Clone Repository & Install Dependencies
```bash
git clone <your-repo-url>
cd Ai_webapp_session

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Run Both Servers
```bash
# From the root directory:
npm run dev

# Or in separate terminal tabs:
# Terminal 1:
npm run dev:backend   # Express API on http://localhost:5001

# Terminal 2:
npm run dev:frontend  # Next.js App on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) to use the application!

---

## 🗄️ Database Setup (Supabase)

To connect your own live Supabase PostgreSQL database:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Run the schema script located at [`database/schema.sql`](database/schema.sql).
4. Update your `.env` files:

**`backend/.env`**:
```env
PORT=5001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
USE_MOCK_DATA=false
```

**`frontend/.env.local`**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API welcome & status check | No |
| `GET` | `/health` | Server health check | No |
| `GET` | `/api/tasks` | Get user tasks (supports filters & search) | Yes |
| `GET` | `/api/tasks/:id` | Get single task by ID | Yes |
| `POST` | `/api/tasks` | Create a new task | Yes |
| `PATCH`| `/api/tasks/:id` | Update task or toggle status | Yes |
| `DELETE`| `/api/tasks/:id`| Delete task | Yes |
| `GET` | `/api/tasks/summary` | Get productivity summary metrics | Yes |

---

## 📄 License
MIT License. Crafted with ❤️ as a modern full-stack developer portfolio reference.
