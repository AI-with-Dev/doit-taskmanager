-- ==========================================================
-- DO.IT Task Manager - Supabase PostgreSQL Database Schema
-- ==========================================================
-- This script creates the tasks table, indexes, updated_at trigger,
-- and Row Level Security (RLS) policies to ensure multi-tenant privacy.

-- 1. Enable pgcrypto / uuid-ossp if needed (Supabase usually has gen_random_uuid built-in)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create the tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT '',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    category VARCHAR(50) NOT NULL DEFAULT 'General',
    due_date TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create indexes for high-performance querying and filtering
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON public.tasks(category);

-- 4. Enable Row Level Security (RLS)
-- Crucial: Prevents any user from reading or modifying another user's tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security Policies
-- SELECT policy: Users can only see tasks they created
CREATE POLICY "Users can select own tasks"
    ON public.tasks
    FOR SELECT
    USING (auth.uid() = user_id);

-- INSERT policy: Users can only insert tasks where user_id matches their own auth ID
CREATE POLICY "Users can insert own tasks"
    ON public.tasks
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- UPDATE policy: Users can only update their own tasks
CREATE POLICY "Users can update own tasks"
    ON public.tasks
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- DELETE policy: Users can only delete their own tasks
CREATE POLICY "Users can delete own tasks"
    ON public.tasks
    FOR DELETE
    USING (auth.uid() = user_id);

-- 6. Trigger to automatically update 'updated_at' on any row modification
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_tasks_updated_at ON public.tasks;
CREATE TRIGGER set_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
