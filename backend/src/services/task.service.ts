import crypto from 'crypto';
import { getSupabaseClient } from '../lib/supabase';
import {
  Task,
  CreateTaskDTO,
  UpdateTaskDTO,
  TaskFilters,
  TaskSummary,
} from '../types/task.types';

// In-memory fallback store for instant local development before Supabase keys are configured
const mockTasksStore: Map<string, Task[]> = new Map();

// Seed mock tasks for demo user
const seedMockTasks = (userId: string) => {
  if (!mockTasksStore.has(userId)) {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    mockTasksStore.set(userId, [
      {
        id: crypto.randomUUID(),
        user_id: userId,
        title: 'Launch DO.IT v1.0 on Product Hunt 🚀',
        description: 'Prepare landing page screenshots, write maker comment, and ping early testers.',
        status: 'pending',
        priority: 'high',
        category: 'Launch',
        due_date: tomorrow.toISOString(),
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        user_id: userId,
        title: 'Polish Neo-Brutalist CSS & Dark Shadows ✨',
        description: 'Verify 4px solid borders, electric purple badges, and smooth tilt hover states.',
        status: 'completed',
        priority: 'medium',
        category: 'Design',
        due_date: now.toISOString(),
        created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        user_id: userId,
        title: 'Set up Supabase Row Level Security 🔒',
        description: 'Run SQL migration in Supabase SQL editor to ensure strict tenant isolation.',
        status: 'completed',
        priority: 'high',
        category: 'DevOps',
        due_date: now.toISOString(),
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        user_id: userId,
        title: 'Record 30s TikTok demo for Gen-Z productivity 📱',
        description: 'Show the funky dopamine checkoff sound and neo-brutalist widget aesthetics.',
        status: 'pending',
        priority: 'medium',
        category: 'Marketing',
        due_date: nextWeek.toISOString(),
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        user_id: userId,
        title: 'Iced Matcha Latte Break 🍵',
        description: 'Essential brain fuel after completing full-stack CRUD features.',
        status: 'pending',
        priority: 'low',
        category: 'Wellness',
        due_date: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }
};

const isMockMode = (): boolean => {
  return (
    process.env.USE_MOCK_DATA === 'true' ||
    !process.env.SUPABASE_URL ||
    process.env.SUPABASE_URL.includes('placeholder')
  );
};

export class TaskService {
  // 1. Get all tasks with optional filters
  static async getTasks(userId: string, filters: TaskFilters): Promise<Task[]> {
    if (isMockMode()) {
      seedMockTasks(userId);
      let userTasks = mockTasksStore.get(userId) || [];

      if (filters.status) {
        userTasks = userTasks.filter((t) => t.status === filters.status);
      }
      if (filters.priority) {
        userTasks = userTasks.filter((t) => t.priority === filters.priority);
      }
      if (filters.category && filters.category !== 'All') {
        userTasks = userTasks.filter(
          (t) => t.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        userTasks = userTasks.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query)
        );
      }

      // Sort by created_at desc
      return [...userTasks].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // Production Supabase Query
    const supabase = getSupabaseClient();
    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId);

    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.priority) {
      query = query.eq('priority', filters.priority);
    }
    if (filters.category && filters.category !== 'All') {
      query = query.eq('category', filters.category);
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    return (data || []) as Task[];
  }

  // 2. Get task by ID
  static async getTaskById(userId: string, taskId: string): Promise<Task | null> {
    if (isMockMode()) {
      seedMockTasks(userId);
      const userTasks = mockTasksStore.get(userId) || [];
      const task = userTasks.find((t) => t.id === taskId);
      return task || null;
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    return (data as Task) || null;
  }

  // 3. Create a new task
  static async createTask(userId: string, data: CreateTaskDTO): Promise<Task> {
    const newTaskPayload = {
      title: data.title.trim(),
      description: data.description?.trim() || '',
      priority: data.priority || 'medium',
      category: data.category?.trim() || 'General',
      due_date: data.due_date || null,
      status: 'pending' as const,
    };

    if (isMockMode()) {
      seedMockTasks(userId);
      const created: Task = {
        id: crypto.randomUUID(),
        user_id: userId,
        ...newTaskPayload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const userTasks = mockTasksStore.get(userId) || [];
      userTasks.unshift(created);
      mockTasksStore.set(userId, userTasks);
      return created;
    }

    const supabase = getSupabaseClient();
    const { data: inserted, error } = await supabase
      .from('tasks')
      .insert({
        ...newTaskPayload,
        user_id: userId,
      })
      .select('*')
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    return inserted as Task;
  }

  // 4. Update an existing task
  static async updateTask(userId: string, taskId: string, data: UpdateTaskDTO): Promise<Task | null> {
    if (isMockMode()) {
      seedMockTasks(userId);
      const userTasks = mockTasksStore.get(userId) || [];
      const index = userTasks.findIndex((t) => t.id === taskId);
      if (index === -1) return null;

      const updated: Task = {
        ...userTasks[index],
        ...(data.title !== undefined ? { title: data.title.trim() } : {}),
        ...(data.description !== undefined ? { description: data.description.trim() } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.priority !== undefined ? { priority: data.priority } : {}),
        ...(data.category !== undefined ? { category: data.category.trim() } : {}),
        ...(data.due_date !== undefined ? { due_date: data.due_date } : {}),
        updated_at: new Date().toISOString(),
      };

      userTasks[index] = updated;
      mockTasksStore.set(userId, userTasks);
      return updated;
    }

    const supabase = getSupabaseClient();
    const { data: updated, error } = await supabase
      .from('tasks')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
      .eq('user_id', userId)
      .select('*')
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    return (updated as Task) || null;
  }

  // 5. Delete a task
  static async deleteTask(userId: string, taskId: string): Promise<boolean> {
    if (isMockMode()) {
      seedMockTasks(userId);
      const userTasks = mockTasksStore.get(userId) || [];
      const index = userTasks.findIndex((t) => t.id === taskId);
      if (index === -1) return false;

      userTasks.splice(index, 1);
      mockTasksStore.set(userId, userTasks);
      return true;
    }

    const supabase = getSupabaseClient();
    const { error, count } = await supabase
      .from('tasks')
      .delete({ count: 'exact' })
      .eq('id', taskId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    return (count ?? 1) > 0;
  }

  // 6. Get productivity summary statistics
  static async getSummary(userId: string): Promise<TaskSummary> {
    const tasks = await this.getTasks(userId, {});

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = total - completed;
    const completion_rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const high_priority_pending = tasks.filter(
      (t) => t.status === 'pending' && t.priority === 'high'
    ).length;

    const by_priority = {
      low: tasks.filter((t) => t.priority === 'low').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      high: tasks.filter((t) => t.priority === 'high').length,
    };

    const by_category: Record<string, number> = {};
    tasks.forEach((t) => {
      const cat = t.category || 'General';
      by_category[cat] = (by_category[cat] || 0) + 1;
    });

    return {
      total,
      completed,
      pending,
      completion_rate,
      high_priority_pending,
      by_priority,
      by_category,
    };
  }
}
