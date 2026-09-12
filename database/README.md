# Supabase Setup Guide for DO.IT Task Manager

Welcome! Follow these simple steps to connect Supabase to your DO.IT application.

## 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in or create a free account.
2. Click **"New Project"**.
3. Choose an organization, enter a name (e.g. `doit-tasks`), set a database password, and choose a nearby region.
4. Wait ~1-2 minutes for the database to provision.

## 2. Apply the Database Schema
1. In your Supabase Dashboard, click on **"SQL Editor"** (the `>_` icon on the left navigation bar).
2. Click **"New query"**.
3. Open `database/schema.sql` in this project, copy the entire SQL script, and paste it into the query editor.
4. Click **"Run"** (or press Ctrl+Enter / Cmd+Enter).
5. You should see `Success. No rows returned`.
6. Go to **"Table Editor"** and verify that the `tasks` table is created with RLS enabled!

## 3. Retrieve Your API Keys
1. In your Supabase Dashboard, go to **Project Settings** (gear icon) -> **API**.
2. Copy the following values:
   - **Project URL** (e.g. `https://xyzproject.supabase.co`)
   - **Project API Anon Key** (`public` key)
   - **Service Role Secret** (`secret` key - backend only!)

## 4. Set Up Environment Variables

### In `backend/.env`:
```env
PORT=5001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
# Optional: Set to 'true' if you want mock mode before setting up Supabase
USE_MOCK_DATA=false
```

### In `frontend/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## Why Row Level Security (RLS)?
PostgreSQL Row Level Security ensures that even if two users are querying the exact same database table, the database itself enforces that **User A can NEVER view or mutate User B's records**.
