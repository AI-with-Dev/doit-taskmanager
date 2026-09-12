import { CreateTaskDTO, Task, TaskFilterState, TaskSummary, UpdateTaskDTO } from '../types/task';
import { useAuthStore } from '../store/useAuthStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || `HTTP error! Status: ${response.status}`);
  }

  return json;
}

export const taskApi = {
  // GET /api/tasks
  getTasks: async (filters?: Partial<TaskFilterState>): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    if (filters?.priority && filters.priority !== 'all') {
      params.append('priority', filters.priority);
    }
    if (filters?.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters?.search && filters.search.trim()) {
      params.append('search', filters.search.trim());
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await request<{ success: boolean; data: Task[] }>(`/tasks${queryString}`);
    return res.data;
  },

  // GET /api/tasks/:id
  getTaskById: async (id: string): Promise<Task> => {
    const res = await request<{ success: boolean; data: Task }>(`/tasks/${id}`);
    return res.data;
  },

  // POST /api/tasks
  createTask: async (dto: CreateTaskDTO): Promise<Task> => {
    const res = await request<{ success: boolean; data: Task }>('/tasks', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return res.data;
  },

  // PATCH /api/tasks/:id
  updateTask: async (id: string, dto: UpdateTaskDTO): Promise<Task> => {
    const res = await request<{ success: boolean; data: Task }>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });
    return res.data;
  },

  // DELETE /api/tasks/:id
  deleteTask: async (id: string): Promise<void> => {
    await request<{ success: boolean }>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  // GET /api/tasks/summary
  getSummary: async (): Promise<TaskSummary> => {
    const res = await request<{ success: boolean; data: TaskSummary }>('/tasks/summary');
    return res.data;
  },
};
