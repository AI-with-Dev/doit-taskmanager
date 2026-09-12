export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  priority?: TaskPriority;
  category?: string;
  due_date?: string | null;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  due_date?: string | null;
}

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  completion_rate: number;
  high_priority_pending: number;
  by_priority: {
    low: number;
    medium: number;
    high: number;
  };
  by_category: Record<string, number>;
}

export interface TaskFilterState {
  status: string; // 'all' | 'pending' | 'completed'
  priority: string; // 'all' | 'low' | 'medium' | 'high'
  category: string; // 'all' | string
  search: string;
}
