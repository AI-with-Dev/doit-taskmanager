'use client';

import { create } from 'zustand';
import { CreateTaskDTO, Task, TaskFilterState, TaskSummary, UpdateTaskDTO } from '../types/task';
import { taskApi } from '../lib/api';

interface TaskStoreState {
  tasks: Task[];
  summary: TaskSummary | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;

  // Filter state
  filters: TaskFilterState;

  // Modal states
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDetailModalOpen: boolean;
  isDeleteModalOpen: boolean;
  activeTask: Task | null;
  taskToDelete: Task | null;

  // Actions
  fetchTasks: () => Promise<void>;
  fetchSummary: () => Promise<void>;
  addTask: (dto: CreateTaskDTO) => Promise<boolean>;
  updateTask: (id: string, dto: UpdateTaskDTO) => Promise<boolean>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<boolean>;

  setFilter: <K extends keyof TaskFilterState>(key: K, value: TaskFilterState[K]) => void;
  resetFilters: () => void;

  // Modal helpers
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (task: Task) => void;
  closeEditModal: () => void;
  openDetailModal: (task: Task) => void;
  closeDetailModal: () => void;
  openDeleteModal: (task: Task) => void;
  closeDeleteModal: () => void;

  clearError: () => void;
}

const initialFilters: TaskFilterState = {
  status: 'all',
  priority: 'all',
  category: 'all',
  search: '',
};

export const useTaskStore = create<TaskStoreState>((set, get) => ({
  tasks: [],
  summary: null,
  isLoading: false,
  isSubmitting: false,
  error: null,

  filters: initialFilters,

  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDetailModalOpen: false,
  isDeleteModalOpen: false,
  activeTask: null,
  taskToDelete: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const filters = get().filters;
      const tasks = await taskApi.getTasks(filters);
      set({ tasks, isLoading: false });
    } catch (err: any) {
      console.error('Failed to fetch tasks:', err);
      set({
        isLoading: false,
        error: err.message || 'Failed to load tasks. Check API connection.',
      });
    }
  },

  fetchSummary: async () => {
    try {
      const summary = await taskApi.getSummary();
      set({ summary });
    } catch (err: any) {
      console.error('Failed to fetch summary:', err);
    }
  },

  addTask: async (dto: CreateTaskDTO) => {
    set({ isSubmitting: true, error: null });
    try {
      const newTask = await taskApi.createTask(dto);
      set((state) => ({
        tasks: [newTask, ...state.tasks],
        isSubmitting: false,
        isCreateModalOpen: false,
      }));
      // Refresh summary
      get().fetchSummary();
      return true;
    } catch (err: any) {
      set({
        isSubmitting: false,
        error: err.message || 'Failed to create task.',
      });
      return false;
    }
  },

  updateTask: async (id: string, dto: UpdateTaskDTO) => {
    set({ isSubmitting: true, error: null });
    try {
      const updated = await taskApi.updateTask(id, dto);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
        activeTask: state.activeTask?.id === id ? updated : state.activeTask,
        isSubmitting: false,
        isEditModalOpen: false,
      }));
      // Refresh summary
      get().fetchSummary();
      return true;
    } catch (err: any) {
      set({
        isSubmitting: false,
        error: err.message || 'Failed to update task.',
      });
      return false;
    }
  },

  toggleTask: async (id: string) => {
    const currentTasks = get().tasks;
    const task = currentTasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    // Optimistic UI update: immediately change status in local store
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
      activeTask: state.activeTask?.id === id ? { ...state.activeTask, status: newStatus } : state.activeTask,
    }));

    try {
      await taskApi.updateTask(id, { status: newStatus });
      get().fetchSummary();
    } catch (err: any) {
      // Rollback on failure
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, status: task.status } : t)),
        error: 'Failed to update task status. Changes were reverted.',
      }));
    }
  },

  deleteTask: async (id: string) => {
    set({ isSubmitting: true, error: null });
    try {
      await taskApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        isSubmitting: false,
        isDeleteModalOpen: false,
        taskToDelete: null,
        activeTask: state.activeTask?.id === id ? null : state.activeTask,
      }));
      get().fetchSummary();
      return true;
    } catch (err: any) {
      set({
        isSubmitting: false,
        error: err.message || 'Failed to delete task.',
      });
      return false;
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
    // Re-fetch tasks whenever filters change
    get().fetchTasks();
  },

  resetFilters: () => {
    set({ filters: initialFilters });
    get().fetchTasks();
  },

  openCreateModal: () => set({ isCreateModalOpen: true, error: null }),
  closeCreateModal: () => set({ isCreateModalOpen: false, error: null }),

  openEditModal: (task: Task) => set({ isEditModalOpen: true, activeTask: task, error: null }),
  closeEditModal: () => set({ isEditModalOpen: false, error: null }),

  openDetailModal: (task: Task) => set({ isDetailModalOpen: true, activeTask: task, error: null }),
  closeDetailModal: () => set({ isDetailModalOpen: false }),

  openDeleteModal: (task: Task) => set({ isDeleteModalOpen: true, taskToDelete: task, error: null }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false, taskToDelete: null }),

  clearError: () => set({ error: null }),
}));
