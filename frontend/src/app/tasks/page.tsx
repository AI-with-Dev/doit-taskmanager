'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../../store/useAuthStore';
import { useTaskStore } from '../../store/useTaskStore';
import { FilterBar } from '../../components/FilterBar';
import { TaskCard } from '../../components/TaskCard';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { LoadingState } from '../../components/LoadingState';
import { Plus, ListTodo, Sparkles, CheckSquare } from 'lucide-react';

export default function TasksPage() {
  const { user, isLoading: authLoading, signInDemo } = useAuthStore();
  const {
    tasks,
    isLoading: tasksLoading,
    fetchTasks,
    openCreateModal,
    filters,
    resetFilters,
  } = useTaskStore();

  useEffect(() => {
    if (!authLoading && user) {
      fetchTasks();
    }
  }, [authLoading, user, fetchTasks]);

  // Auth gate
  if (!authLoading && !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl neo-border-thick neo-shadow-xl p-8 max-w-md text-center space-y-4">
          <div className="w-14 h-14 bg-[#a3e635] text-black rounded-2xl neo-border-sm flex items-center justify-center mx-auto">
            <CheckSquare className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-black">Sign in to view your Tasks</h2>
          <p className="text-xs font-bold text-zinc-600">
            Log in to manage, filter, and organize your tasks.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="lime"
              size="md"
              onClick={() => {
                signInDemo();
                fetchTasks();
              }}
              className="w-full"
            >
              Continue in Demo Mode
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="white" size="md" className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isFiltered =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.search.trim() !== '';

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fde047] text-black text-xs font-black rounded-lg neo-border-sm mb-2">
            <ListTodo className="w-3.5 h-3.5" />
            <span>ALL TASKS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight flex items-center gap-3">
            <span>Tasks Center</span>
            <span className="px-3 py-1 bg-black text-white text-sm font-black rounded-xl neo-border-sm">
              {tasks.length}
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-zinc-600 mt-1">
            Search, filter, and organize everything on your radar
          </p>
        </div>

        <Button
          variant="lime"
          size="md"
          leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
          onClick={openCreateModal}
          className="shrink-0"
        >
          New Task
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar />

      {/* Task List Grid */}
      {tasksLoading ? (
        <LoadingState message="Filtering tasks..." count={6} />
      ) : tasks.length === 0 ? (
        <EmptyState
          title={isFiltered ? 'No matching tasks found' : 'Your task list is empty!'}
          description={
            isFiltered
              ? 'Try changing or clearing your search filters to see other tasks.'
              : 'Add your first task and start making progress on your goals.'
          }
          actionText={isFiltered ? 'Reset Filters' : 'Create Task'}
          onAction={isFiltered ? resetFilters : openCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
