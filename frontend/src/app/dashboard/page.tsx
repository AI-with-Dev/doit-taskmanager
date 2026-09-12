'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import { useTaskStore } from '../../store/useTaskStore';
import { StatsCard } from '../../components/StatsCard';
import { TaskCard } from '../../components/TaskCard';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { LoadingState } from '../../components/LoadingState';
import {
  CheckCircle2,
  Clock,
  Flame,
  ListTodo,
  Plus,
  ArrowRight,
  Sparkles,
  BarChart3,
  CheckSquare,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, signInDemo } = useAuthStore();
  const {
    tasks,
    summary,
    isLoading: tasksLoading,
    fetchTasks,
    fetchSummary,
    openCreateModal,
  } = useTaskStore();

  useEffect(() => {
    if (!authLoading && user) {
      fetchTasks();
      fetchSummary();
    }
  }, [authLoading, user, fetchTasks, fetchSummary]);

  // If user is not logged in after auth finishes loading
  if (!authLoading && !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl neo-border-thick neo-shadow-xl p-8 max-w-md text-center space-y-4">
          <div className="w-14 h-14 bg-[#fde047] text-black rounded-2xl neo-border-sm flex items-center justify-center mx-auto">
            <CheckSquare className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-black">Sign in to view your Dashboard</h2>
          <p className="text-xs font-bold text-zinc-600">
            Log in to view your tasks, track metrics, and manage your daily goals.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="lime"
              size="md"
              onClick={() => {
                signInDemo();
                fetchTasks();
                fetchSummary();
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

  const highPriorityPending = tasks.filter((t) => t.status === 'pending' && t.priority === 'high');
  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  const totalCount = summary?.total ?? tasks.length;
  const completedCount = summary?.completed ?? completedTasks.length;
  const pendingCount = summary?.pending ?? pendingTasks.length;
  const completionRate = summary?.completion_rate ?? (totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full space-y-8">
      {/* 1. WELCOME BANNER */}
      <div className="bg-[#7c3aed] text-white rounded-3xl neo-border-thick neo-shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#a3e635] text-black text-xs font-black rounded-lg neo-border-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAILY WORKSPACE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Hey, {user?.email?.split('@')[0] || 'Maker'}! ⚡️
          </h1>
          <p className="text-zinc-200 text-xs sm:text-sm font-bold max-w-lg">
            {pendingCount === 0 && totalCount > 0
              ? '🎉 All tasks completed! You are completely on top of your game today.'
              : `You have ${pendingCount} pending task${pendingCount === 1 ? '' : 's'} waiting for you today. Let's conquer them.`}
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0 w-full sm:w-auto">
          <Button
            variant="lime"
            size="lg"
            leftIcon={<Plus className="w-5 h-5 stroke-[3]" />}
            onClick={openCreateModal}
            className="w-full sm:w-auto"
          >
            Create Task
          </Button>

          <Link href="/tasks" className="hidden sm:inline-block">
            <Button variant="white" size="lg">
              All Tasks
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Tasks"
          value={totalCount}
          subtitle="All tasks created in your workspace"
          icon={<ListTodo className="w-6 h-6 stroke-[2.5]" />}
          accentColor="purple"
        />

        <StatsCard
          title="Completed"
          value={completedCount}
          subtitle={`${completionRate}% overall velocity`}
          icon={<CheckCircle2 className="w-6 h-6 stroke-[2.5]" />}
          accentColor="lime"
          progress={completionRate}
        />

        <StatsCard
          title="Pending"
          value={pendingCount}
          subtitle="Tasks still in progress"
          icon={<Clock className="w-6 h-6 stroke-[2.5]" />}
          accentColor="yellow"
        />

        <StatsCard
          title="High Priority"
          value={highPriorityPending.length}
          subtitle={highPriorityPending.length > 0 ? 'Requires your focus today' : 'No urgent bottlenecks'}
          icon={<Flame className="w-6 h-6 stroke-[2.5]" />}
          accentColor="pink"
        />
      </div>

      {/* 3. TODAY'S FOCUS: HIGH PRIORITY TASKS */}
      {highPriorityPending.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f43f5e] animate-pulse" />
              <h2 className="text-xl font-black text-black tracking-tight">
                High Priority Focus
              </h2>
            </div>
            <span className="text-xs font-black text-[#f43f5e] px-2.5 py-0.5 rounded-lg bg-red-100 neo-border-sm">
              {highPriorityPending.length} Urgent
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {highPriorityPending.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* 4. RECENT TASKS FEED */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-black tracking-tight">Recent Tasks</h2>
            <span className="text-xs font-bold text-zinc-500">({tasks.length})</span>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/productivity">
              <Button variant="ghost" size="sm" leftIcon={<BarChart3 className="w-3.5 h-3.5" />}>
                Productivity Stats
              </Button>
            </Link>
            <Link href="/tasks">
              <Button
                variant="white"
                size="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View All
              </Button>
            </Link>
          </div>
        </div>

        {tasksLoading ? (
          <LoadingState message="Fetching your workspace tasks..." count={3} />
        ) : tasks.length === 0 ? (
          <EmptyState
            title="Your task list is clean!"
            description="Start building your productive day by creating your first task."
            actionText="Create a Task"
            onAction={openCreateModal}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.slice(0, 6).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
